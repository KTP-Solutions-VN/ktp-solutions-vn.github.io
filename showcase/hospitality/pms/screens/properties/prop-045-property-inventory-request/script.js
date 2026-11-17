(function () {
  'use strict';

  var STORAGE_KEY = 'mm_prop_inventory_requests';

  function readJSON(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; }
  }
  function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  var MOCK_REQUESTS = {
    'PV-105': [
      { id: 'REQ-01', item: 'Bath Towels (Large)', quantity: 12, status: 'pending', date: '2026-08-20' },
      { id: 'REQ-02', item: 'Pool Loungers', quantity: 4, status: 'confirmed', date: '2026-08-10' },
      { id: 'REQ-03', item: 'Dinnerware Set (12pc)', quantity: 2, status: 'returned', date: '2026-07-01' }
    ],
    'PV-101': [
      { id: 'REQ-04', item: 'Bath Towels (Large)', quantity: 10, status: 'pending', date: '2026-08-22' }
    ]
  };

  var statusLabel = { pending: 'Pending', confirmed: 'Confirmed', returned: 'Returned' };
  var statusBadge = { pending: 'badge-warning', confirmed: 'badge-info', returned: 'badge-success' };

  var propertySelect = document.getElementById('property-select');
  var villaTitle = document.getElementById('villa-title');
  var tbody = document.getElementById('requests-tbody');
  var emptyState = document.getElementById('requests-empty');

  function populateProperties() {
    var props = MM.MOCK_PROPERTIES;
    propertySelect.innerHTML = props.map(function (p) { return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
    var params = new URLSearchParams(window.location.search);
    var requested = params.get('id') || params.get('villa');
    propertySelect.value = (requested && props.some(function (p) { return p.id === requested; })) ? requested : 'PV-105';
  }

  function getRequests() {
    var villaId = propertySelect.value;
    var store = readJSON(STORAGE_KEY, {});
    var overrides = store[villaId] || { updates: {}, deleted: [] };
    var base = (MOCK_REQUESTS[villaId] || []).map(function (r) {
      return overrides.updates && overrides.updates[r.id] ? Object.assign({}, r, overrides.updates[r.id]) : r;
    });
    return base.filter(function (r) { return !(overrides.deleted || []).includes(r.id); });
  }

  function render() {
    var prop = MM.MOCK_PROPERTIES.filter(function (p) { return p.id === propertySelect.value; })[0];
    villaTitle.textContent = prop ? prop.name : propertySelect.value;
    document.querySelector('.card__header-sub').textContent = 'Inventory requests — ' + propertySelect.value;
    document.getElementById('back-to-inventory-link').href = '../prop-044-property-inventory-management/index.html?id=' + propertySelect.value;

    var reqs = getRequests();
    if (!reqs.length) {
      tbody.innerHTML = '';
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
      tbody.innerHTML = reqs.map(function (r) {
        var actions = '';
        if (r.status !== 'confirmed' && r.status !== 'returned') {
          actions += '<button class="icon-action" data-delete="' + r.id + '" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>';
        }
        if (r.status === 'confirmed') {
          actions += '<button class="icon-action" data-return="' + r.id + '" title="Return to warehouse"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg></button>';
        }
        return '<tr><td class="cell-strong">' + r.item + '</td><td class="cell-num">' + r.quantity + '</td>' +
          '<td><span class="badge ' + statusBadge[r.status] + '">' + statusLabel[r.status] + '</span></td>' +
          '<td class="cell-sub">' + r.date + '</td><td><div class="row-actions">' + (actions || '<span class="text-xs text-muted">—</span>') + '</div></td></tr>';
      }).join('');
    }
  }

  propertySelect.addEventListener('change', render);

  function setOverride(id, patch) {
    var villaId = propertySelect.value;
    var store = readJSON(STORAGE_KEY, {});
    store[villaId] = store[villaId] || { updates: {}, deleted: [] };
    store[villaId].updates = store[villaId].updates || {};
    store[villaId].updates[id] = Object.assign({}, store[villaId].updates[id], patch);
    saveJSON(STORAGE_KEY, store);
  }
  function markDeleted(id) {
    var villaId = propertySelect.value;
    var store = readJSON(STORAGE_KEY, {});
    store[villaId] = store[villaId] || { updates: {}, deleted: [] };
    store[villaId].deleted = store[villaId].deleted || [];
    store[villaId].deleted.push(id);
    saveJSON(STORAGE_KEY, store);
  }

  var pendingDeleteId = null, pendingReturnId = null;

  tbody.addEventListener('click', function (e) {
    var deleteBtn = e.target.closest('[data-delete]');
    if (deleteBtn) {
      pendingDeleteId = deleteBtn.getAttribute('data-delete');
      MM.openModal('delete-request-modal');
      return;
    }
    var returnBtn = e.target.closest('[data-return]');
    if (returnBtn) {
      pendingReturnId = returnBtn.getAttribute('data-return');
      var r = getRequests().filter(function (x) { return x.id === pendingReturnId; })[0];
      document.getElementById('return-modal-sub').textContent = r ? r.item : '';
      document.getElementById('return-quantity').value = r ? r.quantity : '';
      MM.openModal('return-modal');
    }
  });

  document.getElementById('confirm-delete-request-btn').addEventListener('click', function () {
    if (!pendingDeleteId) return;
    markDeleted(pendingDeleteId);
    MM.closeModal('delete-request-modal');
    MM.showToast('Inventory request deleted.', { danger: true });
    pendingDeleteId = null;
    render();
  });

  var returnForm = document.getElementById('return-form');
  MM.bindFormValidation(returnForm);
  document.getElementById('return-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(returnForm)) return;
    var btn = this;
    MM.simulateSave(btn, 'Confirming...', function () {
      setOverride(pendingReturnId, { status: 'returned' });
      MM.closeModal('return-modal');
      MM.showToast('Item confirmed returned to the Azura warehouse.');
      pendingReturnId = null;
      render();
    });
  });

  populateProperties();
  render();
})();
