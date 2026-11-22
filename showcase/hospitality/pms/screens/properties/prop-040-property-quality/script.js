(function () {
  'use strict';

  var QUALITY_KEY = 'mm_prop_quality';
  var QUALITY_DELETED_KEY = 'mm_prop_quality_deleted';
  var REDO_KEY = 'mm_prop_redo_requests';
  var TODOS_KEY = 'mm_prop_todos';

  var OTAS = ['Airbnb', 'Booking.com', 'Agoda', 'Expedia'];

  function readJSON(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; }
  }
  function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  var MOCK_QUALITY = [
    { id: 'QL-01', villaId: 'PV-105', ota: 'Airbnb', type: 'listing', date: '2026-08-12', user: 'Daniel Tan', comment: 'Title updated to mention the new infinity pool.' },
    { id: 'QL-02', villaId: 'PV-105', ota: 'Booking.com', type: 'listing', date: '2026-07-30', user: 'Karen Seah', comment: 'Amenity list out of date — missing EV charger.' },
    { id: 'QL-03', villaId: 'PV-105', ota: 'Airbnb', type: 'review', date: '2026-08-18', user: 'Daniel Tan', reviews: 42, score: 9.4, comment: 'Guests consistently praise the sea view and staff.' },
    { id: 'QL-04', villaId: 'PV-105', ota: 'Agoda', type: 'review', date: '2026-08-01', user: 'Karen Seah', reviews: 18, score: 7.8, comment: 'A few complaints about slow Wi-Fi in the guest house.' },
    { id: 'QL-05', villaId: 'PV-105', ota: 'Airbnb', type: 'home-improvement', date: '2026-06-05', user: 'Ben Sullivan', comment: 'Repainted the pool deck; replaced two sun loungers.' }
  ];

  var MOCK_REDO = {
    'PV-105|Airbnb': { status: 'redone', lastRequested: '2026-06-20', log: [{ doneDate: '2026-06-28', doneBy: 'Sentosa Frame Photography', requestedBy: 'Daniel Tan' }] },
    'PV-105|Booking.com': { status: 'requested', lastRequested: '2026-08-20', log: [] },
    'PV-105|Agoda': { status: 'none', lastRequested: null, log: [] },
    'PV-105|Expedia': { status: 'none', lastRequested: null, log: [] }
  };

  var statusLabel = { none: 'Up to date', requested: 'Redo Requested', redone: 'Redone' };
  var statusBadge = { none: 'badge-success', requested: 'badge-warning', redone: 'badge-info' };

  function getAllQuality() {
    var extra = readJSON(QUALITY_KEY, []);
    var deleted = readJSON(QUALITY_DELETED_KEY, []);
    return MOCK_QUALITY.concat(extra).filter(function (r) { return deleted.indexOf(r.id) === -1; });
  }

  var buFilter = document.getElementById('filter-bu');
  var entryLevelFilter = document.getElementById('filter-entry-level');
  var propertyFilter = document.getElementById('filter-property');
  var otaFilter = document.getElementById('filter-ota');

  function populateProperties() {
    var bu = buFilter.value;
    var props = MM.MOCK_PROPERTIES.filter(function (p) { return !bu || p.bu === bu; });
    propertyFilter.innerHTML = props.map(function (p) { return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
    if (props.some(function (p) { return p.id === 'PV-105'; })) propertyFilter.value = 'PV-105';
  }

  function currentRows(type) {
    var villaId = propertyFilter.value;
    var ota = otaFilter.value;
    return getAllQuality().filter(function (r) {
      if (r.type !== type) return false;
      if (r.villaId !== villaId) return false;
      if (ota && r.ota !== ota) return false;
      return true;
    }).sort(function (a, b) { return b.date.localeCompare(a.date); });
  }

  function actionCell(r) {
    return '<div class="row-actions">' +
      '<button class="icon-action" data-edit="' + r.id + '" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
      '<button class="icon-action danger" data-delete="' + r.id + '" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
      '</div>';
  }

  function renderListings() {
    var rows = currentRows('listing');
    document.getElementById('listings-count').textContent = rows.length + ' listing note' + (rows.length === 1 ? '' : 's');
    document.getElementById('listings-tbody').innerHTML = rows.length ? rows.map(function (r) {
      return '<tr><td class="cell-sub">' + r.date + '</td><td>' + r.user + '</td><td>' + r.comment + '</td><td>' + actionCell(r) + '</td></tr>';
    }).join('') : '<tr><td colspan="4"><div class="empty-state" style="padding:20px 0;"><p>No listing notes logged for this property/OTA.</p></div></td></tr>';
  }

  function renderReviews() {
    var rows = currentRows('review');
    document.getElementById('reviews-count').textContent = rows.length + ' review entr' + (rows.length === 1 ? 'y' : 'ies');
    document.getElementById('reviews-tbody').innerHTML = rows.length ? rows.map(function (r) {
      return '<tr><td class="cell-sub">' + r.date + '</td><td class="cell-num">' + r.reviews + '</td><td class="cell-num">' + r.score + '</td><td>' + r.comment + '</td><td>' + actionCell(r) + '</td></tr>';
    }).join('') : '<tr><td colspan="5"><div class="empty-state" style="padding:20px 0;"><p>No reviews logged for this property/OTA.</p></div></td></tr>';
  }

  function renderHomeImprovement() {
    var rows = currentRows('home-improvement');
    document.getElementById('hi-count').textContent = rows.length + ' note' + (rows.length === 1 ? '' : 's');
    document.getElementById('hi-tbody').innerHTML = rows.length ? rows.map(function (r) {
      return '<tr><td class="cell-sub">' + r.date + '</td><td>' + r.user + '</td><td>' + r.comment + '</td><td>' + actionCell(r) + '</td></tr>';
    }).join('') : '<tr><td colspan="4"><div class="empty-state" style="padding:20px 0;"><p>No Home Improvement notes logged for this property.</p></div></td></tr>';
  }

  function renderRedo() {
    var villaId = propertyFilter.value;
    var redo = readJSON(REDO_KEY, MOCK_REDO);
    document.getElementById('redo-tbody').innerHTML = OTAS.map(function (ota) {
      var rec = redo[villaId + '|' + ota] || { status: 'none', lastRequested: null, log: [] };
      var actions = '<div class="row-actions">' +
        '<button class="btn btn-ghost btn-sm" data-view-log="' + ota + '">View Log</button>' +
        (rec.status === 'none' ? '<a class="btn btn-outline btn-sm" href="../prop-031-request-ota-listing-redo/index.html?villa=' + villaId + '&channel=' + encodeURIComponent(ota) + '">Request Redo</a>' : '') +
        '</div>';
      return '<tr><td class="cell-strong">' + ota + '</td><td><span class="badge ' + statusBadge[rec.status] + '">' + statusLabel[rec.status] + '</span></td>' +
        '<td class="cell-sub">' + (rec.lastRequested || '—') + '</td><td>' + actions + '</td></tr>';
    }).join('');
  }

  function renderAll() {
    var isProperty = entryLevelFilter.value === 'property';
    document.getElementById('entry-level-note').hidden = isProperty;
    document.getElementById('quality-content').hidden = !isProperty;
    if (!isProperty) return;
    renderListings();
    renderReviews();
    renderHomeImprovement();
    renderRedo();
  }

  buFilter.addEventListener('change', function () { populateProperties(); renderAll(); });
  entryLevelFilter.addEventListener('change', renderAll);
  propertyFilter.addEventListener('change', renderAll);
  otaFilter.addEventListener('change', renderAll);

  /* Add/Edit entry modal */
  var entryForm = document.getElementById('entry-form');
  MM.bindFormValidation(entryForm);
  var editingType = null, editingId = null;

  function openEntryModal(type, record) {
    editingType = type;
    editingId = record ? record.id : null;
    var titles = { listing: 'Listing Note', review: 'Review', 'home-improvement': 'Home Improvement Note' };
    document.getElementById('entry-modal-title').textContent = (record ? 'Edit ' : 'Log ') + titles[type];
    document.getElementById('entry-modal-sub').textContent = propertyFilter.options[propertyFilter.selectedIndex].text + ' — ' + (otaFilter.value || 'All OTAs');
    document.getElementById('entry-date').value = record ? record.date : new Date().toISOString().slice(0, 10);
    document.getElementById('entry-reviews-group').hidden = type !== 'review';
    document.getElementById('entry-score-group').hidden = type !== 'review';
    document.getElementById('entry-reviews').value = record ? (record.reviews || '') : '';
    document.getElementById('entry-score').value = record ? (record.score || '') : '';
    document.getElementById('entry-comment').value = record ? record.comment : '';
    entryForm.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
    MM.openModal('entry-modal');
  }

  document.querySelectorAll('[data-add]').forEach(function (btn) {
    btn.addEventListener('click', function () { openEntryModal(btn.getAttribute('data-add'), null); });
  });

  document.getElementById('quality-content').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      var rec = getAllQuality().filter(function (r) { return r.id === editBtn.getAttribute('data-edit'); })[0];
      if (rec) openEntryModal(rec.type, rec);
      return;
    }
    var delBtn = e.target.closest('[data-delete]');
    if (delBtn) {
      document.getElementById('confirm-delete-btn').dataset.id = delBtn.getAttribute('data-delete');
      MM.openModal('delete-modal');
      return;
    }
    var logBtn = e.target.closest('[data-view-log]');
    if (logBtn) openRedoLog(logBtn.getAttribute('data-view-log'));
  });

  document.getElementById('entry-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(entryForm)) return;
    if (editingType === 'review') {
      var ok1 = MM.validateField(document.getElementById('entry-reviews'));
      var ok2 = MM.validateField(document.getElementById('entry-score'));
      if (!ok1 || !ok2) return;
    }
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var extra = readJSON(QUALITY_KEY, []);
      var record = {
        id: editingId || MM.uid('QL'),
        villaId: propertyFilter.value,
        ota: otaFilter.value || OTAS[0],
        type: editingType,
        date: document.getElementById('entry-date').value,
        user: 'Daniel Tan',
        comment: document.getElementById('entry-comment').value.trim()
      };
      if (editingType === 'review') {
        record.reviews = parseInt(document.getElementById('entry-reviews').value, 10) || 0;
        record.score = parseFloat(document.getElementById('entry-score').value) || 0;
      }
      if (editingId) {
        var existing = MOCK_QUALITY.concat(extra).filter(function (r) { return r.id === editingId; })[0];
        record.villaId = existing ? existing.villaId : record.villaId;
        record.ota = existing ? existing.ota : record.ota;
        extra = extra.filter(function (r) { return r.id !== editingId; });
      }
      extra.push(record);
      saveJSON(QUALITY_KEY, extra);
      MM.closeModal('entry-modal');
      MM.showToast((editingId ? 'Record updated.' : 'Record logged.'));
      renderAll();
    });
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    var id = this.dataset.id;
    var deleted = readJSON(QUALITY_DELETED_KEY, []);
    deleted.push(id);
    saveJSON(QUALITY_DELETED_KEY, deleted);
    MM.closeModal('delete-modal');
    MM.showToast('Record deleted.', { danger: true });
    renderAll();
  });

  /* PROP-057 Redo Log popup */
  function openRedoLog(ota) {
    var villaId = propertyFilter.value;
    var redo = readJSON(REDO_KEY, MOCK_REDO);
    var rec = redo[villaId + '|' + ota] || { log: [] };
    document.getElementById('redo-log-sub').textContent = propertyFilter.options[propertyFilter.selectedIndex].text + ' — ' + ota;
    var tbody = document.getElementById('redo-log-tbody');
    var empty = document.getElementById('redo-log-empty');
    if (!rec.log || !rec.log.length) {
      tbody.innerHTML = '';
      empty.hidden = false;
    } else {
      empty.hidden = true;
      tbody.innerHTML = rec.log.map(function (l) {
        return '<tr><td class="cell-sub">' + l.doneDate + '</td><td>' + l.doneBy + '</td><td>' + l.requestedBy + '</td></tr>';
      }).join('');
    }
    MM.openModal('redo-log-modal');
  }

  /* Add To Do modal */
  var todoForm = document.getElementById('todo-form');
  MM.bindFormValidation(todoForm);
  document.getElementById('add-todo-btn').addEventListener('click', function () {
    document.getElementById('todo-received-by').innerHTML = MM.MOCK_STAFF.map(function (s) {
      return '<option value="' + s.id + '">' + s.name + ' — ' + s.role + '</option>';
    }).join('');
    todoForm.reset();
    todoForm.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
    MM.openModal('todo-modal');
  });
  document.getElementById('todo-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(todoForm)) return;
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var todos = readJSON(TODOS_KEY, []);
      todos.push({
        id: MM.uid('TODO'), villaId: propertyFilter.value,
        notice: document.getElementById('todo-notice').value.trim(),
        deadline: document.getElementById('todo-deadline').value,
        receivedBy: document.getElementById('todo-received-by').value
      });
      saveJSON(TODOS_KEY, todos);
      MM.closeModal('todo-modal');
      MM.showToast('To Do created.');
    });
  });

  populateProperties();
  renderAll();
})();
