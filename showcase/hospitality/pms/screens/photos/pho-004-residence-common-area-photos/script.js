(function () {
  'use strict';
  var PHO = MM.PHO;
  var STORAGE = 'mm_pho_residence_uploads';

  function qs(name) { return new URLSearchParams(window.location.search).get(name); }
  function readJSON(key, fallback) { try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; } }

  var residenceId = qs('id') || PHO.RESIDENCES[0].id;
  var residence = PHO.RESIDENCES.filter(function (r) { return r.id === residenceId; })[0] || PHO.RESIDENCES[0];

  function mergedSets() {
    var overrides = readJSON(STORAGE, {})[residence.id] || {};
    var sets = JSON.parse(JSON.stringify(residence.sets || {}));
    Object.keys(overrides).forEach(function (key) {
      sets[key] = sets[key] || { count: 0, sizeMB: 0 };
      sets[key].count += overrides[key];
    });
    return sets;
  }

  function renderHeader() {
    document.getElementById('bc-residence').textContent = residence.name;
    document.getElementById('residence-title').textContent = residence.name;
    document.getElementById('residence-sub').textContent = residence.district + ' · ' + residence.bu + ' · shared common area photos for every villa in this residence.';
  }

  function renderSets() {
    var sets = mergedSets();
    var keys = PHO.SET_TYPES.filter(function (t) { return sets[t.key]; });
    var wrap = document.getElementById('set-cards');
    if (!keys.length) {
      wrap.innerHTML = '<div class="empty-state"><svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><h3>No common area photos yet</h3><p>Upload the first set using the form on the right.</p></div>';
      return;
    }
    wrap.innerHTML = keys.map(function (t) {
      var s = sets[t.key];
      return '<div class="residence-card" style="margin-bottom:10px;">' +
        '<div class="residence-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>' +
        '<div class="residence-card__body"><div class="residence-card__title">' + t.label + '</div><div class="residence-card__meta">' + s.count + ' photos &middot; ' + (s.sizeMB || 0) + ' MB</div></div>' +
        '<button class="btn btn-outline btn-sm" data-open-set="' + t.key + '">Open</button>' +
      '</div>';
    }).join('');
    wrap.querySelectorAll('[data-open-set]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.location.href = '../pho-005-common-area-photo-set-detail/index.html?id=' + residence.id + '&set=' + btn.getAttribute('data-open-set');
      });
    });
  }

  var selectedFiles = [];

  function renderDropzoneCount() {
    document.getElementById('dropzone-count').textContent = selectedFiles.length
      ? selectedFiles.length + ' file(s) selected'
      : '';
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderHeader();
    renderSets();

    var dropzone = document.getElementById('dropzone');
    var input = document.getElementById('photo-input');
    dropzone.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function () {
      selectedFiles = Array.from(input.files || []);
      renderDropzoneCount();
    });
    ['dragover', 'dragenter'].forEach(function (evt) {
      dropzone.addEventListener(evt, function (e) { e.preventDefault(); dropzone.classList.add('drag-over'); });
    });
    ['dragleave', 'drop'].forEach(function (evt) {
      dropzone.addEventListener(evt, function (e) { e.preventDefault(); dropzone.classList.remove('drag-over'); });
    });
    dropzone.addEventListener('drop', function (e) {
      var files = Array.from((e.dataTransfer && e.dataTransfer.files) || []);
      if (files.length) { selectedFiles = files; renderDropzoneCount(); }
    });

    document.getElementById('remove-all-btn').addEventListener('click', function () {
      selectedFiles = [];
      input.value = '';
      renderDropzoneCount();
    });

    document.getElementById('upload-btn').addEventListener('click', function () {
      var setTypeInput = document.getElementById('set-type');
      var valid = MM.validateField(setTypeInput);
      var photosError = document.getElementById('photos-error');
      if (!selectedFiles.length) { photosError.textContent = 'Select at least one photo.'; valid = false; }
      else { photosError.textContent = ''; }
      if (!valid) return;

      var btn = this;
      MM.simulateSave(btn, 'Uploading...', function () {
        var all = readJSON(STORAGE, {});
        all[residence.id] = all[residence.id] || {};
        var key = setTypeInput.value;
        all[residence.id][key] = (all[residence.id][key] || 0) + selectedFiles.length;
        localStorage.setItem(STORAGE, JSON.stringify(all));
        MM.showToast(selectedFiles.length + ' photo(s) uploaded to ' + key.toUpperCase() + '.');
        selectedFiles = [];
        input.value = '';
        renderDropzoneCount();
        setTypeInput.value = '';
        renderSets();
      });
    });

    document.getElementById('set-type').addEventListener('blur', function () { MM.validateField(this); });

    if (window.location.hash === '#upload') {
      document.getElementById('upload').scrollIntoView({ behavior: 'smooth' });
    }
  });
})();
