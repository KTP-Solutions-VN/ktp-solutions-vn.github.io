(function () {
  'use strict';
  var PHO = MM.PHO;

  /* Shared with PHO-006 (Property Photo Page) so uploads/deletions made on
     either screen are reflected on the other. */
  var STORAGE_UPLOADS = 'mm_pho_villa_uploads';
  var STORAGE_DELETED_SETS = 'mm_pho_villa_deleted_sets';
  /* PHO-007-specific stores. */
  var STORAGE_DELETED_PHOTOS = 'mm_pho_villa_deleted_photos';
  var STORAGE_TAG_OVERRIDES = 'mm_pho_villa_photo_tags';
  var STORAGE_QUALITY = 'mm_pho_quality_scores';
  /* Shared with PHO-008 (Photo Standard Settings). */
  var STORAGE_STANDARDS_OVERRIDES = 'mm_pho_standards_overrides';

  function qs(name) { return new URLSearchParams(window.location.search).get(name); }
  function readJSON(key, fallback) { try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; } }
  function writeJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  var villaId = qs('id') || MM.MOCK_PROPERTIES[0].id;
  var villa = PHO.propertyById(villaId) || MM.MOCK_PROPERTIES[0];
  var photoRow = PHO.PROPERTY_PHOTOS[villa.id] || { sets: {}, lastShoot: null, agentLink: null };
  var currentSet = qs('set') || Object.keys(photoRow.sets || {})[0] || 'ota';
  var selectedFiles = [];
  var pendingDeletePhotoId = null;
  var viewList = [];
  var viewIndex = -1;

  var CRITERIA = [
    { key: 'composition', label: 'Composition & Lighting' },
    { key: 'technical', label: 'Technical Quality (Focus / Exposure)' },
    { key: 'styling', label: 'Styling & Presentation' }
  ];

  var AREA_MATCHERS = {
    drone: function (p) { return p.category === 'Drone / Aerial'; },
    exterior: function (p) { return p.category === 'Exterior'; },
    pool_day: function (p) { return p.category === 'Pool' && !p.night; },
    pool_night: function (p) { return p.category === 'Pool' && !!p.night; },
    living: function (p) { return p.category === 'Living Area'; },
    dining: function (p) { return p.category === 'Dining'; },
    kitchen: function (p) { return p.category === 'Kitchen'; },
    bedrooms_bathrooms: function (p) { return p.category === 'Bedroom' || p.category === 'Bathroom'; }
  };

  /* ---------------------------------------------------------------- */
  /* Set-level data (shared store with PHO-006)                        */
  /* ---------------------------------------------------------------- */

  function deletedSetsForVilla() { return (readJSON(STORAGE_DELETED_SETS, {})[villa.id]) || []; }

  function mergedSets() {
    var sets = JSON.parse(JSON.stringify(photoRow.sets || {}));
    var uploads = (readJSON(STORAGE_UPLOADS, {})[villa.id]) || {};
    Object.keys(uploads).forEach(function (k) {
      sets[k] = sets[k] || { count: 0, required: 0, score: null, sizeMB: 0 };
      sets[k].count += uploads[k];
    });
    deletedSetsForVilla().forEach(function (k) { delete sets[k]; });
    return sets;
  }

  function availableSetKeys() { return Object.keys(mergedSets()); }

  if (availableSetKeys().indexOf(currentSet) === -1 && availableSetKeys().length) {
    currentSet = availableSetKeys()[0];
  }

  function setCountFor(key) { var s = mergedSets()[key]; return s ? s.count : 0; }
  function requiredFor(key) { return (photoRow.sets[key] && photoRow.sets[key].required) || 0; }
  function baselineScoreFor(key) { return photoRow.sets[key] ? photoRow.sets[key].score : null; }

  /* ---------------------------------------------------------------- */
  /* Photo-level data (per villa + set)                                */
  /* ---------------------------------------------------------------- */

  function storeKey() { return villa.id + ':' + currentSet; }

  function deletedPhotoIds() { return (readJSON(STORAGE_DELETED_PHOTOS, {})[storeKey()]) || []; }

  function tagOverrides() { return (readJSON(STORAGE_TAG_OVERRIDES, {})[storeKey()]) || {}; }

  function allPhotos() {
    var count = setCountFor(currentSet);
    var deleted = deletedPhotoIds();
    var overrides = tagOverrides();
    return PHO.samplePhotos(count, currentSet)
      .filter(function (p) { return deleted.indexOf(p.id) === -1; })
      .map(function (p) {
        var o = overrides[p.id];
        return o ? Object.assign({}, p, o) : p;
      });
  }

  function categoryFilterValue() {
    var el = document.getElementById('category-filter');
    return el && !el.hidden ? el.value : '';
  }

  function visiblePhotos() {
    var cat = categoryFilterValue();
    var photos = allPhotos();
    if (currentSet === 'ota' && cat) photos = photos.filter(function (p) { return p.category === cat; });
    return photos;
  }

  /* ---------------------------------------------------------------- */
  /* Quality score                                                     */
  /* ---------------------------------------------------------------- */

  function qualityStore() { return readJSON(STORAGE_QUALITY, {}); }

  function currentQuality() {
    var stored = qualityStore()[storeKey()];
    if (stored) return stored;
    var base = baselineScoreFor(currentSet);
    var d = base !== null && base !== undefined ? clamp(Math.round(base), 1, 3) : 2;
    var q = {};
    CRITERIA.forEach(function (c) { q[c.key] = d; });
    return q;
  }

  function saveQuality(q) {
    var all = qualityStore();
    all[storeKey()] = q;
    writeJSON(STORAGE_QUALITY, all);
  }

  function finalScore(q) {
    var sum = CRITERIA.reduce(function (acc, c) { return acc + q[c.key]; }, 0);
    return sum / CRITERIA.length;
  }

  /* ---------------------------------------------------------------- */
  /* Standards (shared with PHO-008)                                    */
  /* ---------------------------------------------------------------- */

  function standardAreasFor(type) {
    var override = readJSON(STORAGE_STANDARDS_OVERRIDES, {})[type];
    if (override && override.areas) return override.areas;
    return (PHO.STANDARDS[type] && PHO.STANDARDS[type].areas) || [];
  }

  /* ---------------------------------------------------------------- */
  /* Rendering                                                          */
  /* ---------------------------------------------------------------- */

  function setTypeDef(key) { return PHO.SET_TYPES.filter(function (t) { return t.key === key; })[0] || { key: key, label: key }; }

  function renderHeader() {
    var typeDef = setTypeDef(currentSet);
    document.getElementById('bc-villa').textContent = villa.name;
    document.getElementById('bc-villa').href = '../pho-006-property-photo-page/index.html?id=' + villa.id;
    document.getElementById('bc-set').textContent = typeDef.label;
    document.getElementById('set-title').textContent = villa.name + ' — ' + typeDef.label;
    document.getElementById('set-sub').textContent = (typeDef.note ? typeDef.note + ' · ' : '') + villa.bu + ' · ' + villa.bedrooms + ' bedrooms';
    document.getElementById('del-set-name').textContent = typeDef.label;

    var agentBtn = document.getElementById('agent-link-btn');
    if (photoRow.agentLink) {
      agentBtn.href = photoRow.agentLink;
      agentBtn.target = '_blank';
      document.getElementById('agent-link-label').textContent = 'Agent Link';
    } else {
      agentBtn.href = '../../booking/book-054-ota-overview/index.html';
      agentBtn.removeAttribute('target');
      document.getElementById('agent-link-label').textContent = 'Agent Link Not Set Up';
    }

    var resId = PHO.VILLA_RESIDENCE[villa.id];
    var caBtn = document.getElementById('common-areas-btn');
    if (resId) {
      caBtn.hidden = false;
      caBtn.href = '../pho-004-residence-common-area-photos/index.html?id=' + resId;
    } else {
      caBtn.hidden = true;
    }

    document.getElementById('property-page-btn').href = '../pho-006-property-photo-page/index.html?id=' + villa.id;
  }

  function renderSwitch() {
    var sel = document.getElementById('set-switch');
    var keys = availableSetKeys();
    if (!keys.length) keys = [currentSet];
    sel.innerHTML = keys.map(function (k) {
      var t = setTypeDef(k);
      return '<option value="' + k + '"' + (k === currentSet ? ' selected' : '') + '>' + t.label + ' (' + setCountFor(k) + ')</option>';
    }).join('');
  }

  function renderCategoryFilter() {
    var el = document.getElementById('category-filter');
    if (currentSet !== 'ota') { el.hidden = true; el.innerHTML = ''; return; }
    el.hidden = false;
    if (!el.dataset.built) {
      el.innerHTML = '<option value="">All Categories</option>' + PHO.PHOTO_CATEGORIES.map(function (c) { return '<option value="' + c + '">' + c + '</option>'; }).join('');
      el.dataset.built = '1';
    }
  }

  function tagsFor(p) {
    var tags = [];
    if (p.essential) tags.push('Essential');
    if (p.drone) tags.push('Bird view');
    if (p.ai) tags.push('AI');
    if (p.night) tags.push('Night');
    return tags;
  }

  function renderPhotoGrid() {
    viewList = visiblePhotos();
    document.getElementById('photo-count-sub').textContent = viewList.length + ' photo(s) shown of ' + allPhotos().length + ' in this set';
    var grid = document.getElementById('photo-grid');
    if (!viewList.length) {
      grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;"><h3>No photos to show</h3><p>Upload photos below, or clear the category filter.</p></div>';
      updateBulkBar();
      return;
    }
    grid.innerHTML = viewList.map(function (p) {
      var tags = tagsFor(p);
      return '<div class="photo-item" data-photo="' + p.id + '">' +
        '<div class="photo-item__thumb" data-open-photo="' + p.id + '">' +
          '<input type="checkbox" class="photo-item__check" data-select="' + p.id + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' +
          '<div class="photo-item__tags">' + tags.map(function (t) { return '<span class="photo-item__tag">' + t + '</span>'; }).join('') + '</div>' +
        '</div>' +
        '<div class="photo-item__name" data-open-photo="' + p.id + '">' + p.name + '</div>' +
      '</div>';
    }).join('');
    grid.querySelectorAll('[data-select]').forEach(function (cb) {
      cb.addEventListener('click', function (e) { e.stopPropagation(); });
      cb.addEventListener('change', updateBulkBar);
    });
    grid.querySelectorAll('[data-open-photo]').forEach(function (el) {
      el.addEventListener('click', function () { openViewModal(el.getAttribute('data-open-photo')); });
    });
  }

  function updateBulkBar() {
    var selected = document.querySelectorAll('[data-select]:checked');
    var n = selected.length;
    document.getElementById('bulk-delete-btn').hidden = n === 0;
    document.getElementById('bulk-delete-btn').textContent = 'Delete Selected (' + n + ')';
    document.getElementById('bulk-tag-select').hidden = n === 0;
    document.getElementById('bulk-tag-btn').hidden = n === 0;
  }

  function renderKPIs() {
    var photos = allPhotos();
    var essential = photos.filter(function (p) { return p.essential; }).length;
    var ainight = photos.filter(function (p) { return p.ai || p.night; }).length;
    var required = requiredFor(currentSet);
    var missing = Math.max(0, required - photos.length);
    document.getElementById('kpi-count').textContent = photos.length;
    document.getElementById('kpi-essential').textContent = essential;
    document.getElementById('kpi-score').textContent = finalScore(currentQuality()).toFixed(1);
    document.getElementById('kpi-missing').textContent = missing;
    document.getElementById('kpi-ainight').textContent = ainight;
  }

  function renderQuality() {
    var q = currentQuality();
    var grid = document.getElementById('quality-grid');
    grid.innerHTML = CRITERIA.map(function (c) {
      return '<div class="quality-score-card">' +
        '<div class="quality-score-card__label">' + c.label + '</div>' +
        '<div class="quality-score-card__pts">' +
          [1, 2, 3].map(function (n) {
            return '<button type="button" data-crit="' + c.key + '" data-val="' + n + '" class="' + (q[c.key] === n ? 'active' : '') + '">' + n + '</button>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');
    document.getElementById('final-score').textContent = finalScore(q).toFixed(1);

    grid.querySelectorAll('[data-crit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var q2 = currentQuality();
        q2[btn.getAttribute('data-crit')] = parseInt(btn.getAttribute('data-val'), 10);
        saveQuality(q2);
        renderQuality();
        renderKPIs();
      });
    });
  }

  function renderCompleteness() {
    var villaType = PHO.villaTypeFor(villa.id);
    var bedroomIdx = clamp((villa.bedrooms || 3), 1, 8) - 1;
    var areas = standardAreasFor(villaType);
    var photos = allPhotos();
    document.getElementById('completeness-sub').textContent = villaType + ' · ' + villa.bedrooms + ' bedrooms · compared against the ' + setTypeDef(currentSet).label + ' set';

    var tbody = document.getElementById('completeness-tbody');
    if (!areas.length) {
      tbody.innerHTML = '<tr><td colspan="4"><div class="empty-state"><p>No photo standard configured for ' + villaType + ' yet.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = areas.map(function (area) {
      var required = (area.req && area.req[bedroomIdx]) || 0;
      var matcher = AREA_MATCHERS[area.code] || function () { return false; };
      var current = photos.filter(matcher).length;
      var pct = required > 0 ? Math.min(100, Math.round((current / required) * 100)) : (current > 0 ? 100 : 0);
      var barClass = pct >= 100 ? '' : (pct >= 60 ? 'warn' : 'bad');
      return '<tr>' +
        '<td><div style="font-weight:600;">' + area.name + '</div>' + (area.note ? '<div class="text-xs text-muted">' + area.note + '</div>' : '') + '</td>' +
        '<td>' + required + '</td>' +
        '<td>' + current + '</td>' +
        '<td><div class="flex-gap-8"><div class="completeness-bar-track" style="flex:1;"><div class="completeness-bar-fill ' + barClass + '" style="width:' + pct + '%;"></div></div><span class="text-xs text-muted" style="width:36px;">' + pct + '%</span></div></td>' +
      '</tr>';
    }).join('');
  }

  function render() {
    renderHeader();
    renderSwitch();
    renderCategoryFilter();
    renderPhotoGrid();
    renderKPIs();
    renderQuality();
    renderCompleteness();
  }

  /* ---------------------------------------------------------------- */
  /* Photo view / lightbox modal                                       */
  /* ---------------------------------------------------------------- */

  function openViewModal(photoId) {
    viewList = visiblePhotos();
    viewIndex = viewList.findIndex(function (p) { return p.id === photoId; });
    if (viewIndex === -1) viewIndex = 0;
    renderViewModal();
    MM.openModal('photo-view-modal');
  }

  function renderViewModal() {
    if (!viewList.length) return;
    var p = viewList[viewIndex];
    document.getElementById('view-photo-name').textContent = p.name;
    document.getElementById('view-photo-meta').textContent = p.category;
    document.getElementById('view-photo-tags').innerHTML = tagsFor(p).map(function (t) { return '<span class="photo-item__tag">' + t + '</span>'; }).join('');
    document.getElementById('view-photo-position').textContent = 'Photo ' + (viewIndex + 1) + ' of ' + viewList.length;
    document.getElementById('view-delete-btn').dataset.photoId = p.id;
  }

  /* ---------------------------------------------------------------- */
  /* Events                                                             */
  /* ---------------------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', function () {
    render();

    document.getElementById('load-set-btn').addEventListener('click', function () {
      currentSet = document.getElementById('set-switch').value;
      window.history.replaceState(null, '', '?id=' + villa.id + '&set=' + currentSet);
      render();
    });

    document.getElementById('category-filter').addEventListener('change', renderPhotoGrid);

    document.getElementById('bulk-delete-btn').addEventListener('click', function () {
      var count = document.querySelectorAll('[data-select]:checked').length;
      document.getElementById('del-photos-count').textContent = count;
      MM.openModal('delete-photos-modal');
    });
    document.getElementById('confirm-delete-photos-btn').addEventListener('click', function () {
      var ids = Array.from(document.querySelectorAll('[data-select]:checked')).map(function (cb) { return cb.getAttribute('data-select'); });
      var all = readJSON(STORAGE_DELETED_PHOTOS, {});
      all[storeKey()] = (all[storeKey()] || []).concat(ids);
      writeJSON(STORAGE_DELETED_PHOTOS, all);
      MM.closeModal('delete-photos-modal');
      MM.showToast(ids.length + ' photo(s) deleted from this set.', { danger: true });
      render();
    });

    document.getElementById('bulk-tag-btn').addEventListener('click', function () {
      var tagKey = document.getElementById('bulk-tag-select').value;
      var ids = Array.from(document.querySelectorAll('[data-select]:checked')).map(function (cb) { return cb.getAttribute('data-select'); });
      if (!ids.length) return;
      var all = readJSON(STORAGE_TAG_OVERRIDES, {});
      all[storeKey()] = all[storeKey()] || {};
      ids.forEach(function (id) {
        all[storeKey()][id] = Object.assign({}, all[storeKey()][id], (function () { var o = {}; o[tagKey] = true; return o; })());
      });
      writeJSON(STORAGE_TAG_OVERRIDES, all);
      MM.showToast(ids.length + ' photo(s) tagged.');
      render();
    });

    document.getElementById('delete-set-btn').addEventListener('click', function () { MM.openModal('delete-set-modal'); });
    document.getElementById('confirm-delete-set-btn').addEventListener('click', function () {
      var all = readJSON(STORAGE_DELETED_SETS, {});
      all[villa.id] = (all[villa.id] || []).concat([currentSet]);
      writeJSON(STORAGE_DELETED_SETS, all);
      MM.closeModal('delete-set-modal');
      MM.showToast('Photo set deleted.', { danger: true });
      setTimeout(function () { window.location.href = '../pho-006-property-photo-page/index.html?id=' + villa.id; }, 700);
    });

    /* Upload more photos */
    var dropzone = document.getElementById('dropzone');
    var input = document.getElementById('photo-input');
    dropzone.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function () { selectedFiles = Array.from(input.files || []); renderDzCount(); });
    ['dragover', 'dragenter'].forEach(function (evt) { dropzone.addEventListener(evt, function (e) { e.preventDefault(); dropzone.classList.add('drag-over'); }); });
    ['dragleave', 'drop'].forEach(function (evt) { dropzone.addEventListener(evt, function (e) { e.preventDefault(); dropzone.classList.remove('drag-over'); }); });
    dropzone.addEventListener('drop', function (e) {
      var files = Array.from((e.dataTransfer && e.dataTransfer.files) || []);
      if (files.length) { selectedFiles = files; renderDzCount(); }
    });
    function renderDzCount() { document.getElementById('dropzone-count').textContent = selectedFiles.length ? selectedFiles.length + ' file(s) selected' : ''; }

    document.getElementById('upload-btn').addEventListener('click', function () {
      if (!selectedFiles.length) { MM.showToast('Select at least one photo first.', { danger: true }); return; }
      var btn = this;
      MM.simulateSave(btn, 'Uploading...', function () {
        var all = readJSON(STORAGE_UPLOADS, {});
        all[villa.id] = all[villa.id] || {};
        all[villa.id][currentSet] = (all[villa.id][currentSet] || 0) + selectedFiles.length;
        writeJSON(STORAGE_UPLOADS, all);
        MM.showToast(selectedFiles.length + ' photo(s) added to this set.');
        selectedFiles = [];
        input.value = '';
        renderDzCount();
        render();
      });
    });

    /* Photo view modal navigation */
    document.getElementById('view-prev-btn').addEventListener('click', function () {
      if (!viewList.length) return;
      viewIndex = (viewIndex - 1 + viewList.length) % viewList.length;
      renderViewModal();
    });
    document.getElementById('view-next-btn').addEventListener('click', function () {
      if (!viewList.length) return;
      viewIndex = (viewIndex + 1) % viewList.length;
      renderViewModal();
    });
    document.getElementById('view-download-btn').addEventListener('click', function () {
      var p = viewList[viewIndex];
      MM.showToast('Preparing download for ' + (p ? p.name : 'photo') + '...');
    });
    document.getElementById('view-delete-btn').addEventListener('click', function () {
      pendingDeletePhotoId = this.dataset.photoId;
      var p = viewList[viewIndex];
      document.getElementById('del-photo-name').textContent = p ? p.name : 'this photo';
      MM.closeModal('photo-view-modal');
      MM.openModal('delete-photo-modal');
    });
    document.getElementById('confirm-delete-photo-btn').addEventListener('click', function () {
      if (!pendingDeletePhotoId) return;
      var all = readJSON(STORAGE_DELETED_PHOTOS, {});
      all[storeKey()] = (all[storeKey()] || []).concat([pendingDeletePhotoId]);
      writeJSON(STORAGE_DELETED_PHOTOS, all);
      pendingDeletePhotoId = null;
      MM.closeModal('delete-photo-modal');
      MM.showToast('Photo deleted.', { danger: true });
      render();
    });
  });
})();
