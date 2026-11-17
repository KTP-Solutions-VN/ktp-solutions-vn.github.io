(function () {
  'use strict';
  var PHO = MM.PHO;
  var STORAGE_UPLOADS = 'mm_pho_villa_uploads';
  var STORAGE_DELETED_SETS = 'mm_pho_villa_deleted_sets';

  function qs(name) { return new URLSearchParams(window.location.search).get(name); }
  function readJSON(key, fallback) { try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; } }

  var villaId = qs('id') || MM.MOCK_PROPERTIES[0].id;
  var villa = PHO.propertyById(villaId) || MM.MOCK_PROPERTIES[0];
  var photoRow = PHO.PROPERTY_PHOTOS[villa.id] || { sets: {}, lastShoot: null, agentLink: null };
  var selectedFiles = [];

  function deletedSets() { return (readJSON(STORAGE_DELETED_SETS, {})[villa.id]) || []; }

  function mergedSets() {
    var sets = JSON.parse(JSON.stringify(photoRow.sets || {}));
    var uploads = (readJSON(STORAGE_UPLOADS, {})[villa.id]) || {};
    Object.keys(uploads).forEach(function (k) {
      sets[k] = sets[k] || { count: 0, required: 0, score: null, sizeMB: 0 };
      sets[k].count += uploads[k];
    });
    var deleted = deletedSets();
    deleted.forEach(function (k) { delete sets[k]; });
    return sets;
  }

  function renderHeader() {
    document.getElementById('bc-villa').textContent = villa.name;
    document.getElementById('villa-title').textContent = villa.name;
    document.getElementById('villa-sub').textContent = villa.bu + ' · ' + villa.id + ' · ' + villa.bedrooms + ' bedrooms';
  }

  function renderMetrics() {
    var sets = mergedSets();
    var keys = Object.keys(sets);
    document.getElementById('stat-sets').textContent = keys.length;
    var ota = sets.ota;
    document.getElementById('stat-score').textContent = ota && ota.score !== null && ota.score !== undefined ? ota.score.toFixed(1) : '–';
    document.getElementById('stat-shoot').textContent = photoRow.lastShoot ? new Date(photoRow.lastShoot).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'No shoot yet';
  }

  function renderSetCards() {
    var sets = mergedSets();
    var keys = PHO.SET_TYPES.filter(function (t) { return sets[t.key]; });
    var wrap = document.getElementById('set-cards');
    if (!keys.length) {
      wrap.innerHTML = '<div class="empty-state"><svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><h3>No photo sets yet</h3><p>Upload the first set using the form on the right.</p></div>';
      return;
    }
    wrap.innerHTML = keys.map(function (t) {
      var s = sets[t.key];
      var scoreBadge = s.score !== null && s.score !== undefined ? '<span class="badge ' + (PHO.scoreClass(s.score) === 'good' ? 'badge-success' : PHO.scoreClass(s.score) === 'ok' ? 'badge-warning' : 'badge-danger') + '">' + s.score.toFixed(1) + '</span>' : '';
      return '<div class="residence-card" style="margin-bottom:10px;">' +
        '<div class="residence-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>' +
        '<div class="residence-card__body"><div class="residence-card__title">' + t.label + ' ' + scoreBadge + '</div><div class="residence-card__meta">' + s.count + ' photos' + (s.required ? ' of ' + s.required + ' required' : '') + ' &middot; ' + (s.sizeMB || 0) + ' MB</div></div>' +
        '<div class="row-actions">' +
          '<button class="btn btn-outline btn-sm" data-open="' + t.key + '">Open</button>' +
          '<button class="icon-action" title="Download" data-download="' + t.key + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></button>' +
          '<button class="icon-action danger" title="Delete" data-delete="' + t.key + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
        '</div>' +
      '</div>';
    }).join('');

    wrap.querySelectorAll('[data-open]').forEach(function (b) { b.addEventListener('click', function () { window.location.href = '../pho-007-property-photo-set-detail/index.html?id=' + villa.id + '&set=' + b.getAttribute('data-open'); }); });
    wrap.querySelectorAll('[data-download]').forEach(function (b) { b.addEventListener('click', function () { MM.showToast('Preparing download for the ' + b.getAttribute('data-download').toUpperCase() + ' set...'); }); });
    wrap.querySelectorAll('[data-delete]').forEach(function (b) { b.addEventListener('click', function () {
      var key = b.getAttribute('data-delete');
      var t = PHO.SET_TYPES.filter(function (x) { return x.key === key; })[0];
      document.getElementById('del-set-name').textContent = t ? t.label : key;
      document.getElementById('confirm-delete-set-btn').dataset.key = key;
      MM.openModal('delete-set-modal');
    }); });
  }

  function renderResidenceBlock() {
    var resId = PHO.VILLA_RESIDENCE[villa.id];
    var block = document.getElementById('residence-block');
    if (!resId) { block.hidden = true; return; }
    var res = PHO.RESIDENCES.filter(function (r) { return r.id === resId; })[0];
    if (!res) { block.hidden = true; return; }
    block.hidden = false;
    document.getElementById('residence-name-sub').textContent = res.name + ' · ' + res.district;
    document.getElementById('residence-page-btn').href = '../pho-004-residence-common-area-photos/index.html?id=' + res.id;
    var keys = PHO.SET_TYPES.filter(function (t) { return res.sets[t.key]; });
    document.getElementById('residence-sets').innerHTML = keys.length
      ? keys.map(function (t) { return '<span class="set-pill" data-open-res-set="' + t.key + '">' + t.label + ' &middot; ' + res.sets[t.key].count + '</span>'; }).join(' ')
      : '<span class="text-muted text-sm">No common area photos uploaded yet.</span>';
    document.querySelectorAll('[data-open-res-set]').forEach(function (el) {
      el.addEventListener('click', function () { window.location.href = '../pho-005-common-area-photo-set-detail/index.html?id=' + res.id + '&set=' + el.getAttribute('data-open-res-set'); });
    });
  }

  function render() {
    renderHeader();
    renderMetrics();
    renderSetCards();
    renderResidenceBlock();
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();

    document.getElementById('panoramic-hero').addEventListener('click', function () { document.getElementById('panoramic-input').click(); });
    document.getElementById('panoramic-input').addEventListener('change', function (e) {
      if (e.target.files && e.target.files.length) MM.showToast('Panoramic photo uploaded.');
    });

    var setSource = document.getElementById('set-source');
    var shootDateGroup = document.getElementById('shoot-date-group');
    function toggleShootDate() { shootDateGroup.style.display = setSource.value === 'internal' || setSource.value === 'owner' ? 'none' : ''; }
    setSource.addEventListener('change', toggleShootDate);
    toggleShootDate();

    var dropzone = document.getElementById('dropzone');
    var input = document.getElementById('photo-input');
    dropzone.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function () { selectedFiles = Array.from(input.files || []); dzCount(); });
    ['dragover', 'dragenter'].forEach(function (evt) { dropzone.addEventListener(evt, function (e) { e.preventDefault(); dropzone.classList.add('drag-over'); }); });
    ['dragleave', 'drop'].forEach(function (evt) { dropzone.addEventListener(evt, function (e) { e.preventDefault(); dropzone.classList.remove('drag-over'); }); });
    dropzone.addEventListener('drop', function (e) { var files = Array.from((e.dataTransfer && e.dataTransfer.files) || []); if (files.length) { selectedFiles = files; dzCount(); } });
    function dzCount() { document.getElementById('dropzone-count').textContent = selectedFiles.length ? selectedFiles.length + ' file(s) selected' : ''; }

    document.getElementById('remove-all-btn').addEventListener('click', function () { selectedFiles = []; input.value = ''; dzCount(); });

    document.getElementById('set-type').addEventListener('blur', function () { MM.validateField(this); });
    document.getElementById('set-source').addEventListener('blur', function () { MM.validateField(this); });

    document.getElementById('upload-btn').addEventListener('click', function () {
      var typeEl = document.getElementById('set-type');
      var srcEl = document.getElementById('set-source');
      var valid = MM.validateField(typeEl) && MM.validateField(srcEl);
      var photosError = document.getElementById('photos-error');
      if (!selectedFiles.length) { photosError.textContent = 'Select at least one photo.'; valid = false; } else { photosError.textContent = ''; }
      if (!valid) return;

      var btn = this;
      MM.simulateSave(btn, 'Uploading...', function () {
        var all = readJSON(STORAGE_UPLOADS, {});
        all[villa.id] = all[villa.id] || {};
        all[villa.id][typeEl.value] = (all[villa.id][typeEl.value] || 0) + selectedFiles.length;
        localStorage.setItem(STORAGE_UPLOADS, JSON.stringify(all));
        MM.showToast(selectedFiles.length + ' photo(s) uploaded to ' + typeEl.value.toUpperCase() + '.');
        selectedFiles = []; input.value = ''; dzCount();
        typeEl.value = ''; srcEl.value = ''; toggleShootDate();
        renderMetrics(); renderSetCards();
      });
    });

    document.getElementById('confirm-delete-set-btn').addEventListener('click', function () {
      var key = this.dataset.key;
      var all = readJSON(STORAGE_DELETED_SETS, {});
      all[villa.id] = (all[villa.id] || []).concat([key]);
      localStorage.setItem(STORAGE_DELETED_SETS, JSON.stringify(all));
      MM.closeModal('delete-set-modal');
      MM.showToast('Photo set deleted.', { danger: true });
      renderMetrics(); renderSetCards();
    });

    if (window.location.hash === '#upload') document.getElementById('upload').scrollIntoView({ behavior: 'smooth' });
  });
})();
