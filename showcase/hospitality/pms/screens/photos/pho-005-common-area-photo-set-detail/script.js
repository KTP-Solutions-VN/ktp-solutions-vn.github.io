(function () {
  'use strict';
  var PHO = MM.PHO;
  var STORAGE_UPLOADS = 'mm_pho_residence_uploads';
  var STORAGE_DELETED_SETS = 'mm_pho_residence_deleted_sets';
  var STORAGE_DELETED_PHOTOS = 'mm_pho_deleted_photos';

  function qs(name) { return new URLSearchParams(window.location.search).get(name); }
  function readJSON(key, fallback) { try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; } }

  var residenceId = qs('id') || PHO.RESIDENCES[0].id;
  var residence = PHO.RESIDENCES.filter(function (r) { return r.id === residenceId; })[0] || PHO.RESIDENCES[0];
  var currentSet = qs('set') || Object.keys(residence.sets || {})[0] || 'ota';
  var selectedFiles = [];

  function deletedSetsFor() { return (readJSON(STORAGE_DELETED_SETS, {})[residence.id]) || []; }

  function availableSets() {
    var deleted = deletedSetsFor();
    return Object.keys(residence.sets || {}).filter(function (k) { return deleted.indexOf(k) === -1; });
  }

  function setCountFor(key) {
    var base = (residence.sets[key] && residence.sets[key].count) || 0;
    var uploaded = ((readJSON(STORAGE_UPLOADS, {})[residence.id] || {})[key]) || 0;
    return base + uploaded;
  }

  function deletedPhotoIds() {
    return readJSON(STORAGE_DELETED_PHOTOS, {})[residence.id + ':' + currentSet] || [];
  }

  function renderHeader() {
    var typeDef = PHO.SET_TYPES.filter(function (t) { return t.key === currentSet; })[0] || { label: currentSet };
    document.getElementById('bc-residence').textContent = residence.name;
    document.getElementById('bc-residence').href = '../pho-004-residence-common-area-photos/index.html?id=' + residence.id;
    document.getElementById('link-residence').href = '../pho-004-residence-common-area-photos/index.html?id=' + residence.id;
    document.getElementById('bc-set').textContent = typeDef.label;
    document.getElementById('set-title').textContent = residence.name + ' — ' + typeDef.label;
    document.getElementById('set-sub').textContent = typeDef.note || 'Shared common area photo set for this residence.';
    document.getElementById('del-set-name').textContent = typeDef.label;
  }

  function renderSwitch() {
    var sel = document.getElementById('set-switch');
    sel.innerHTML = availableSets().map(function (k) {
      var t = PHO.SET_TYPES.filter(function (x) { return x.key === k; })[0] || { label: k };
      return '<option value="' + k + '"' + (k === currentSet ? ' selected' : '') + '>' + t.label + ' (' + setCountFor(k) + ')</option>';
    }).join('');
  }

  function renderPhotos() {
    var count = setCountFor(currentSet);
    var photos = PHO.samplePhotos(count, currentSet).filter(function (p) { return deletedPhotoIds().indexOf(p.id) === -1; });
    document.getElementById('photo-count-sub').textContent = photos.length + ' photo(s) in this set';
    var grid = document.getElementById('photo-grid');
    if (!photos.length) {
      grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;"><h3>No photos in this set yet</h3><p>Upload photos using the form below.</p></div>';
      return;
    }
    grid.innerHTML = photos.map(function (p) {
      var tags = [];
      if (p.essential) tags.push('Essential');
      if (p.drone) tags.push('Bird view');
      if (p.ai) tags.push('AI');
      if (p.night) tags.push('Night');
      return '<div class="photo-item" data-photo="' + p.id + '">' +
        '<div class="photo-item__thumb">' +
          '<input type="checkbox" class="photo-item__check" data-select="' + p.id + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' +
          '<div class="photo-item__tags">' + tags.map(function (t) { return '<span class="photo-item__tag">' + t + '</span>'; }).join('') + '</div>' +
        '</div>' +
        '<div class="photo-item__name">' + p.name + '</div>' +
      '</div>';
    }).join('');
    grid.querySelectorAll('[data-select]').forEach(function (cb) {
      cb.addEventListener('change', updateBulkBar);
    });
  }

  function updateBulkBar() {
    var selected = document.querySelectorAll('[data-select]:checked');
    document.getElementById('bulk-delete-btn').hidden = selected.length === 0;
    document.getElementById('bulk-delete-btn').textContent = 'Delete Selected (' + selected.length + ')';
  }

  function render() {
    renderHeader();
    renderSwitch();
    renderPhotos();
    updateBulkBar();
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();

    document.getElementById('load-set-btn').addEventListener('click', function () {
      currentSet = document.getElementById('set-switch').value;
      window.history.replaceState(null, '', '?id=' + residence.id + '&set=' + currentSet);
      render();
    });

    document.getElementById('bulk-delete-btn').addEventListener('click', function () {
      var ids = Array.from(document.querySelectorAll('[data-select]:checked')).map(function (cb) { return cb.getAttribute('data-select'); });
      var all = readJSON(STORAGE_DELETED_PHOTOS, {});
      var key = residence.id + ':' + currentSet;
      all[key] = (all[key] || []).concat(ids);
      localStorage.setItem(STORAGE_DELETED_PHOTOS, JSON.stringify(all));
      MM.showToast(ids.length + ' photo(s) deleted from this set.', { danger: true });
      renderPhotos();
      updateBulkBar();
    });

    document.getElementById('delete-set-btn').addEventListener('click', function () { MM.openModal('delete-set-modal'); });
    document.getElementById('confirm-delete-set-btn').addEventListener('click', function () {
      var all = readJSON(STORAGE_DELETED_SETS, {});
      all[residence.id] = (all[residence.id] || []).concat([currentSet]);
      localStorage.setItem(STORAGE_DELETED_SETS, JSON.stringify(all));
      MM.closeModal('delete-set-modal');
      MM.showToast('Photo set deleted.', { danger: true });
      setTimeout(function () { window.location.href = '../pho-004-residence-common-area-photos/index.html?id=' + residence.id; }, 700);
    });

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
        all[residence.id] = all[residence.id] || {};
        all[residence.id][currentSet] = (all[residence.id][currentSet] || 0) + selectedFiles.length;
        localStorage.setItem(STORAGE_UPLOADS, JSON.stringify(all));
        MM.showToast(selectedFiles.length + ' photo(s) added to this set.');
        selectedFiles = [];
        input.value = '';
        renderDzCount();
        render();
      });
    });
  });
})();
