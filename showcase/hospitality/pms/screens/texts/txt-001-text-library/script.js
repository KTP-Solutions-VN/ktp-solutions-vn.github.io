(function () {
  'use strict';

  var LANGUAGES = ['English', 'Thai', 'Chinese', 'Russian', 'German'];
  var OTAS = ['Booking.com', 'Airbnb', 'Agoda', 'Expedia'];

  var UNITS = [
    { id: 'UNT-01', name: 'Villa Sapphire Cliff — Master Suite', status: 'complete', elements: 5, updatedBy: 'Somchai A.', updatedAt: '2026-08-18' },
    { id: 'UNT-02', name: 'Villa Lotus Bay — Garden Room', status: 'partial', elements: 3, updatedBy: 'Aroon P.', updatedAt: '2026-08-15' },
    { id: 'UNT-03', name: 'Villa Amber Ridge — Ocean View Room', status: 'none', elements: 0, updatedBy: '—', updatedAt: '—' }
  ];
  var RESIDENCES = [
    { id: 'RES-01', name: 'Coral Breeze Residence', status: 'complete', elements: 6, updatedBy: 'Nalin S.', updatedAt: '2026-08-20' },
    { id: 'RES-02', name: 'Jade Horizon Residence', status: 'partial', elements: 4, updatedBy: 'Piti K.', updatedAt: '2026-08-12' }
  ];

  var SHARED_SEED = [
    { id: 'SHT-01', title: 'Standard House Rules — Thailand', element: 'House Rules', group: 'Legal & Compliance', bu: 'Phuket Collection', usage: 12, status: 'complete' },
    { id: 'SHT-02', title: 'Pool Safety Notice', element: 'Amenities Summary', group: 'Safety', bu: 'All Business Units', usage: 24, status: 'complete' },
    { id: 'SHT-03', title: 'Check-in Instructions Template', element: 'Description', group: 'Guest Communication', bu: 'Koh Samui Collection', usage: 8, status: 'partial' }
  ];
  var PROFILE_SEED = [
    { id: 'PRF-01', title: 'Booking.com Standard Profile', element: 'Description', group: 'OTA Profiles', bu: 'All Business Units', usage: 18, status: 'complete' },
    { id: 'PRF-02', title: 'Airbnb Highlights Profile', element: 'Highlights', group: 'OTA Profiles', bu: 'All Business Units', usage: 15, status: 'partial' }
  ];
  var LANG_SEED = [
    { id: 'LNG-01', name: 'English', listings: 42, shared: 12, profiles: 6, updatedAt: '2026-08-20', inUse: true },
    { id: 'LNG-02', name: 'Thai', listings: 30, shared: 8, profiles: 4, updatedAt: '2026-08-19', inUse: true },
    { id: 'LNG-03', name: 'Chinese', listings: 18, shared: 5, profiles: 2, updatedAt: '2026-08-10', inUse: true },
    { id: 'LNG-04', name: 'Russian', listings: 5, shared: 1, profiles: 0, updatedAt: '2026-07-28', inUse: false }
  ];

  function getHidden(key) { return JSON.parse(localStorage.getItem(key + '_hidden') || '[]'); }
  function getExtra(key) { return JSON.parse(localStorage.getItem(key) || '[]'); }
  function getAll(key, seed) {
    var hidden = getHidden(key);
    return seed.filter(function (x) { return hidden.indexOf(x.id) === -1; }).concat(getExtra(key));
  }

  function badge(status) {
    var map = { complete: ['success', 'Complete'], partial: ['warning', 'Partially Complete'], none: ['neutral', 'Not Started'] };
    var m = map[status] || ['neutral', status];
    return '<span class="badge badge-' + m[0] + '">' + m[1] + '</span>';
  }

  function otaReadiness() {
    return OTAS.map(function (o) {
      var ready = Math.random() > 0.4;
      return '<span class="badge badge-' + (ready ? 'success' : 'neutral') + '" style="margin-right:4px;">' + o + '</span>';
    }).join('');
  }
  var readinessCache = {};
  function otaReadinessFor(id) {
    if (!readinessCache[id]) readinessCache[id] = otaReadiness();
    return readinessCache[id];
  }

  function fillSelect(el, options, placeholder) {
    el.innerHTML = (placeholder ? '<option value="">' + placeholder + '</option>' : '') +
      options.map(function (o) { return '<option>' + o + '</option>'; }).join('');
  }

  fillSelect(document.getElementById('f-bu'), MM.MOCK_PROPERTIES.map(function (p) { return p.bu; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));
  fillSelect(document.getElementById('f-lang'), LANGUAGES);
  fillSelect(document.getElementById('f-ota'), OTAS);
  fillSelect(document.getElementById('tf-bu'), MM.MOCK_PROPERTIES.map(function (p) { return p.bu; }).filter(function (v, i, a) { return a.indexOf(v) === i; }), 'Select...');
  fillSelect(document.getElementById('tf-lang'), LANGUAGES, 'Select...');

  function renderProperties() {
    document.getElementById('tbody-properties').innerHTML = MM.MOCK_PROPERTIES.map(function (p) {
      var status = p.photosComplete && p.onboarding === 'live' ? 'complete' : (p.photosComplete ? 'partial' : 'none');
      return '<tr><td>' + p.name + '</td><td>' + (status === 'complete' ? 5 : status === 'partial' ? 3 : 0) + ' of 5</td><td>' + badge(status) + '</td><td>' + p.concierge + ' · 2026-08-1' + (p.name.length % 9) + '</td><td>' + otaReadinessFor(p.id) + '</td>' +
        '<td style="text-align:right;"><button class="btn btn-ghost btn-sm" data-edit-text="' + p.id + '" data-edit-title="' + p.name + '">Edit</button></td></tr>';
    }).join('');
  }
  function renderSimple(tbodyId, rows) {
    document.getElementById(tbodyId).innerHTML = rows.map(function (r) {
      return '<tr><td>' + r.name + '</td><td>' + r.elements + ' of 6</td><td>' + badge(r.status) + '</td><td>' + r.updatedBy + ' · ' + r.updatedAt + '</td><td>' + otaReadinessFor(r.id) + '</td>' +
        '<td style="text-align:right;"><button class="btn btn-ghost btn-sm" data-edit-text="' + r.id + '" data-edit-title="' + r.name + '">Edit</button></td></tr>';
    }).join('');
  }
  function renderLibrary(tbodyId, key, seed) {
    var rows = getAll(key, seed);
    document.getElementById(tbodyId).innerHTML = rows.length ? rows.map(function (r) {
      return '<tr><td>' + r.title + '</td><td>' + r.element + '</td><td>' + r.group + '</td><td>' + r.bu + '</td><td><span class="usage-count">' + r.usage + '</span></td><td>' + badge(r.status) + '</td>' +
        '<td style="text-align:right;"><button class="btn btn-ghost btn-sm" data-edit-text="' + r.id + '" data-edit-title="' + r.title + '">Edit</button> <button class="btn btn-ghost btn-sm" data-delete="' + r.id + '" data-delete-key="' + key + '" data-delete-seed="' + (seed === SHARED_SEED ? 'shared' : 'profiles') + '">Delete</button></td></tr>';
    }).join('') : '<tr><td colspan="7"><div class="empty-state"><p>No items yet.</p></div></td></tr>';
  }
  function renderLanguages() {
    var rows = getAll('mm_txt_languages', LANG_SEED);
    document.getElementById('tbody-languages').innerHTML = rows.map(function (l) {
      return '<tr><td>' + l.name + '</td><td>' + l.listings + '</td><td>' + l.shared + '</td><td>' + l.profiles + '</td><td>' + l.updatedAt + '</td><td>' + (l.inUse ? badge('complete') : badge('none')) + '</td>' +
        '<td style="text-align:right;"><button class="btn btn-ghost btn-sm" data-delete="' + l.id + '" data-delete-key="mm_txt_languages" data-delete-seed="languages">Delete</button></td></tr>';
    }).join('');
  }

  function renderAll() {
    renderProperties();
    renderSimple('tbody-units', UNITS);
    renderSimple('tbody-residences', RESIDENCES);
    renderLibrary('tbody-shared', 'mm_txt_shared', SHARED_SEED);
    renderLibrary('tbody-profiles', 'mm_txt_profiles', PROFILE_SEED);
    renderLanguages();
  }
  renderAll();

  document.querySelectorAll('.tab-item').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.getElementById('new-text-wrap').style.display = tab.getAttribute('data-tab') === 'languages' ? 'none' : '';
    });
  });

  document.addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit-text]');
    if (editBtn) {
      document.getElementById('text-modal-title').textContent = 'Edit Text';
      document.getElementById('tf-title').value = editBtn.getAttribute('data-edit-title');
      document.getElementById('tf-element').value = 'Description';
      document.getElementById('tf-content').value = 'Sample content for ' + editBtn.getAttribute('data-edit-title') + '...';
      MM.openModal('text-modal');
      return;
    }
    var delBtn = e.target.closest('[data-delete]');
    if (delBtn) {
      pendingDelete = { id: delBtn.getAttribute('data-delete'), key: delBtn.getAttribute('data-delete-key'), seed: delBtn.getAttribute('data-delete-seed') };
      MM.openModal('delete-modal');
    }
  });

  document.getElementById('new-text-btn').addEventListener('click', function () {
    document.getElementById('text-modal-title').textContent = 'Add Text';
    document.getElementById('text-form').reset();
    MM.openModal('text-modal');
  });

  var textForm = document.getElementById('text-form');
  MM.bindFormValidation(textForm);
  textForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(textForm)) return;
    MM.simulateSave(document.getElementById('text-save-btn'), 'Saving...', function () {
      var stored = getExtra('mm_txt_shared');
      stored.push({ id: MM.uid('sht'), title: document.getElementById('tf-title').value.trim(), element: document.getElementById('tf-element').value, group: document.getElementById('tf-group').value.trim() || 'General', bu: document.getElementById('tf-bu').value, usage: 0, status: 'complete' });
      localStorage.setItem('mm_txt_shared', JSON.stringify(stored));
      MM.closeModal('text-modal');
      MM.showToast('Text saved');
      renderAll();
    });
  });

  document.getElementById('add-lang-btn').addEventListener('click', function () {
    document.getElementById('lang-form').reset();
    MM.openModal('lang-modal');
  });
  var langForm = document.getElementById('lang-form');
  MM.bindFormValidation(langForm);
  langForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(langForm)) return;
    MM.simulateSave(document.getElementById('lang-save-btn'), 'Adding...', function () {
      var stored = getExtra('mm_txt_languages');
      stored.push({ id: MM.uid('lng'), name: document.getElementById('lf-name').value.trim(), listings: 0, shared: 0, profiles: 0, updatedAt: new Date().toISOString().slice(0, 10), inUse: false });
      localStorage.setItem('mm_txt_languages', JSON.stringify(stored));
      MM.closeModal('lang-modal');
      MM.showToast('Language added');
      renderAll();
    });
  });

  var pendingDelete = null;
  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    if (!pendingDelete) return;
    var seedArr = pendingDelete.seed === 'shared' ? SHARED_SEED : pendingDelete.seed === 'profiles' ? PROFILE_SEED : LANG_SEED;
    var isSeed = seedArr.some(function (x) { return x.id === pendingDelete.id; });
    if (isSeed) {
      var hidden = getHidden(pendingDelete.key);
      hidden.push(pendingDelete.id);
      localStorage.setItem(pendingDelete.key + '_hidden', JSON.stringify(hidden));
    } else {
      var extra = getExtra(pendingDelete.key).filter(function (x) { return x.id !== pendingDelete.id; });
      localStorage.setItem(pendingDelete.key, JSON.stringify(extra));
    }
    pendingDelete = null;
    MM.closeModal('delete-modal');
    MM.showToast('Item deleted');
    renderAll();
  });
})();
