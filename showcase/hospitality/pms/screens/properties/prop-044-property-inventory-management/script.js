(function () {
  'use strict';

  var STORAGE_KEY = 'mm_prop_inventory';
  var DELETED_KEY = 'mm_prop_inventory_deleted';
  var REQUESTS_KEY = 'mm_prop_inventory_requests';

  function readJSON(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; }
  }
  function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  var MOCK_INVENTORY = {
    'PV-105': [
      { id: 'INV-01', name: 'Bath Towels (Large)', initial: 24, available: 22, received: 24 },
      { id: 'INV-02', name: 'Pool Loungers', initial: 8, available: 8, received: 8 },
      { id: 'INV-03', name: 'Dinnerware Set (12pc)', initial: 4, available: 3, received: 4 },
      { id: 'INV-04', name: 'Bed Linen Set (King)', initial: 10, available: 9, received: 10 },
      { id: 'INV-05', name: 'Umbrella (Garden)', initial: 4, available: 2, received: 4 }
    ],
    'PV-101': [
      { id: 'INV-06', name: 'Bath Towels (Large)', initial: 30, available: 30, received: 30 },
      { id: 'INV-07', name: 'Pool Loungers', initial: 10, available: 10, received: 10 }
    ]
  };

  var propertySelect = document.getElementById('property-select');
  var villaTitle = document.getElementById('villa-title');
  var villaSubtitle = document.getElementById('villa-subtitle');
  var tbody = document.getElementById('inventory-tbody');
  var emptyState = document.getElementById('inventory-empty');

  function populateProperties() {
    var props = MM.MOCK_PROPERTIES;
    propertySelect.innerHTML = props.map(function (p) { return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
    var params = new URLSearchParams(window.location.search);
    var requested = params.get('id') || params.get('villa');
    propertySelect.value = (requested && props.some(function (p) { return p.id === requested; })) ? requested : 'PV-105';
  }

  function getItems() {
    var villaId = propertySelect.value;
    var overrides = readJSON(STORAGE_KEY, {});
    var deleted = readJSON(DELETED_KEY, []);
    var base = (MOCK_INVENTORY[villaId] || []).map(function (it) {
      return overrides[it.id] ? Object.assign({}, it, overrides[it.id]) : it;
    });
    return base.filter(function (it) { return deleted.indexOf(it.id) === -1; });
  }

  function render() {
    var prop = MM.MOCK_PROPERTIES.filter(function (p) { return p.id === propertySelect.value; })[0];
    villaTitle.textContent = 'Property Inventory Management';
    villaSubtitle.textContent = prop ? prop.name : propertySelect.value;
    document.querySelector('.card__header-sub').textContent = 'Inventory for ' + propertySelect.value;
    document.getElementById('all-request-link').href = '../prop-045-property-inventory-request/index.html?id=' + propertySelect.value;

    var items = getItems();
    if (!items.length) {
      tbody.innerHTML = '';
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
      tbody.innerHTML = items.map(function (it) {
        var low = it.available <= it.initial * 0.5;
        return '<tr>' +
          '<td class="cell-strong">' + it.name + '</td>' +
          '<td class="cell-num">' + it.initial + '</td>' +
          '<td class="cell-num ' + (low ? 'stock-low' : '') + '">' + it.available + '</td>' +
          '<td class="cell-num">' + it.received + '</td>' +
          '<td><div class="row-actions">' +
            '<button class="icon-action" data-damage="' + it.id + '" title="Report Damage/Remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></button>' +
            '<button class="icon-action danger" data-delete="' + it.id + '" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
          '</div></td>' +
          '</tr>';
      }).join('');
    }
  }

  propertySelect.addEventListener('change', render);

  var actionType = null, actionId = null;
  tbody.addEventListener('click', function (e) {
    var damageBtn = e.target.closest('[data-damage]');
    if (damageBtn) {
      actionType = 'damaged';
      actionId = damageBtn.getAttribute('data-damage');
      var it = getItems().filter(function (i) { return i.id === actionId; })[0];
      document.getElementById('item-action-title').textContent = 'Report Damage / Remove Stock';
      document.getElementById('item-action-sub').textContent = it ? it.name : '';
      document.getElementById('item-remark').value = '';
      document.getElementById('item-quantity').value = '';
      MM.openModal('item-action-modal');
      return;
    }
    var deleteBtn = e.target.closest('[data-delete]');
    if (deleteBtn) {
      var id = deleteBtn.getAttribute('data-delete');
      var item = getItems().filter(function (i) { return i.id === id; })[0];
      document.getElementById('delete-item-name').textContent = item ? item.name : '';
      document.getElementById('confirm-delete-item-btn').dataset.id = id;
      MM.openModal('delete-item-modal');
    }
  });

  var actionForm = document.getElementById('item-action-form');
  MM.bindFormValidation(actionForm);

  document.getElementById('item-action-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(actionForm)) return;
    var btn = this;
    MM.simulateSave(btn, 'Submitting...', function () {
      var qty = parseInt(document.getElementById('item-quantity').value, 10) || 0;
      var overrides = readJSON(STORAGE_KEY, {});
      var item = getItems().filter(function (i) { return i.id === actionId; })[0];
      var newAvailable = Math.max(0, (item ? item.available : 0) - qty);
      overrides[actionId] = { available: newAvailable };
      saveJSON(STORAGE_KEY, overrides);
      MM.closeModal('item-action-modal');
      MM.showToast('Discard request sent to admin for ' + qty + ' unit(s).');
      render();
    });
  });

  document.getElementById('confirm-delete-item-btn').addEventListener('click', function () {
    var id = this.dataset.id;
    var deleted = readJSON(DELETED_KEY, []);
    deleted.push(id);
    saveJSON(DELETED_KEY, deleted);
    MM.closeModal('delete-item-modal');
    MM.showToast('Inventory item removed.', { danger: true });
    render();
  });

  populateProperties();
  render();
})();
