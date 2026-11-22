/* Accounting & HR - shared mock data & generic CRUD helper, reused across
   screens/accounting-hr/acc-0XX-*, each screen's own script.js. Loaded after global.js. */
(function () {
  'use strict';
  window.MM = window.MM || {};
  var ACC = window.MM.ACC = window.MM.ACC || {};

  ACC.PHONES = [
    { id: 'ph1', number: '+65 9234 5678', assignedTo: 'Daniel Tan', status: 'Active' },
    { id: 'ph2', number: '+61 423 456 789', assignedTo: 'Warren Kelly', status: 'Active' }
  ];
  ACC.COMPUTERS = [
    { id: 'cp1', asset: 'MacBook Pro 14" — MB-0231', assignedTo: 'Daniel Tan', status: 'In Use' },
    { id: 'cp2', asset: 'Dell Latitude 5420 — DL-0087', assignedTo: 'Karen Seah', status: 'In Use' }
  ];
  ACC.SIM_CARDS = [
    { id: 'sim1', number: '9234 5678', carrier: 'Singtel', assignedTo: 'Daniel Tan' },
    { id: 'sim2', number: '+61 423-456-789', carrier: 'Telstra', assignedTo: 'Warren Kelly' }
  ];
  ACC.WAGE_PERIODS = [
    { id: 'wp1', name: 'August 2026', start: '2026-08-01', end: '2026-08-31', status: 'Open' },
    { id: 'wp2', name: 'July 2026', start: '2026-07-01', end: '2026-07-31', status: 'Closed' }
  ];
  ACC.PUBLIC_HOLIDAYS = [
    { id: 'ph_1', name: 'Chinese New Year', date: '2027-02-06', country: 'Singapore' },
    { id: 'ph_2', name: 'ANZAC Day', date: '2027-04-25', country: 'Australia' }
  ];
  ACC.RECURRING_EXPENSES = [
    { id: 're1', name: 'Office Rent — Sentosa HQ', amount: 1200, frequency: 'Monthly' },
    { id: 're2', name: 'Software Licenses', amount: 340, frequency: 'Monthly' }
  ];
  ACC.EXPENSE_TYPES = [
    { id: 'et1', name: 'Travel', category: 'Operations' },
    { id: 'et2', name: 'Office Supplies', category: 'Administration' },
    { id: 'et3', name: 'Marketing', category: 'Sales' }
  ];
  ACC.SUPPLIERS_PRODUCT = [
    { id: 'sp1', name: 'Straits Linen Supply', category: 'Linen', contact: 'sales@straitslinen.example.com' },
    { id: 'sp2', name: 'Byron Amenities Co.', category: 'Amenities', contact: 'sales@byronamenities.example.com' }
  ];
  ACC.SUPPLIERS_SERVICES = [
    { id: 'ss1', name: 'Coral Pool Services', category: 'Pool', contact: 'ops@coralpool.example.com' },
    { id: 'ss2', name: 'Byron Bloom Gardens', category: 'Garden', contact: 'ops@byronbloom.example.com' }
  ];
  ACC.PRODUCTS = [
    { id: 'pr1', name: 'Bath Towel Set (Queen)', supplier: 'Straits Linen Supply', unitPrice: 24 },
    { id: 'pr2', name: 'Welcome Amenity Kit', supplier: 'Byron Amenities Co.', unitPrice: 8 }
  ];
  ACC.SERVICES = [
    { id: 'sv1', name: 'Pool Cleaning (Weekly)', supplier: 'Coral Pool Services', unitPrice: 45 },
    { id: 'sv2', name: 'Garden Maintenance (Weekly)', supplier: 'Byron Bloom Gardens', unitPrice: 60 }
  ];
  ACC.REBILLS = [
    { id: 'rb1', description: 'Extra guest cleaning — Villa Sapphire Cliff', amount: 80, status: 'Pending' },
    { id: 'rb2', description: 'Broken glassware — Villa Coral Horizon', amount: 25, status: 'Billed' }
  ];
  ACC.PETTY_CASH = [
    { id: 'pc1', type: 'Advance', requestedBy: 'Karen Seah', amount: 200, status: 'Approved' },
    { id: 'pc2', type: 'Reimbursement', requestedBy: 'Ben Sullivan', amount: 65, status: 'Pending' }
  ];
  ACC.EXPENSE_PAYMENTS = [
    { id: 'ep1', description: 'Pool Cleaning — August', amount: 45, status: 'Paid' },
    { id: 'ep2', description: 'Garden Maintenance — August', amount: 60, status: 'Pending' }
  ];
  ACC.PAYMENT_REQUESTS = [
    { id: 'pr_1', description: 'Renovation contractor payment', amount: 3900, requestedBy: 'Warren Kelly', status: 'Pending' },
    { id: 'pr_2', description: 'Photography invoice', amount: 600, requestedBy: 'Daniel Tan', status: 'Approved' }
  ];

  /* Generic simple CRUD list used by most ACC sub-modules — mirrors
     MM.BU.wireCrudScreen / MM.CS.wireCrudScreen for consistency. */
  ACC.wireList = function (cfg) {
    function currentData() {
      var stored = JSON.parse(localStorage.getItem(cfg.storageKey) || '[]');
      var hidden = JSON.parse(localStorage.getItem(cfg.storageKey + '_hidden') || '[]');
      return cfg.baseData.filter(function (d) { return hidden.indexOf(d.id) === -1; }).concat(stored);
    }
    var data = currentData();
    document.getElementById('list-tbody').innerHTML = data.map(cfg.rowHtml).join('') || '<tr><td colspan="' + cfg.colCount + '" class="text-muted text-sm">No ' + cfg.entityLabel + 's yet.</td></tr>';
    return data;
  };

  /* Full add/edit/delete CRUD wiring — mirrors MM.BU.wireCrudScreen. */
  ACC.wireCrudScreen = function (cfg) {
    var editingId = null;

    function currentData() {
      var stored = JSON.parse(localStorage.getItem(cfg.storageKey) || '[]');
      var hidden = JSON.parse(localStorage.getItem(cfg.storageKey + '_hidden') || '[]');
      return cfg.baseData.filter(function (d) { return hidden.indexOf(d.id) === -1; }).concat(stored);
    }

    function render() {
      var data = currentData();
      document.getElementById('list-tbody').innerHTML = data.map(cfg.rowHtml).join('') || '<tr><td colspan="' + cfg.colCount + '" class="text-muted text-sm">No ' + cfg.entityLabel + 's yet.</td></tr>';
      return data;
    }
    var data = render();

    var addBtn = document.getElementById('add-btn');
    if (addBtn) addBtn.addEventListener('click', function () {
      editingId = null;
      document.getElementById('modal-title').textContent = 'Add ' + cfg.entityTitle;
      document.getElementById('item-form').reset();
      MM.openModal('item-modal');
    });

    document.getElementById('list-tbody').addEventListener('click', function (e) {
      var editBtn = e.target.closest('[data-edit]'), delBtn = e.target.closest('[data-delete]');
      if (editBtn) {
        var item = data.find(function (d) { return d.id === editBtn.dataset.edit; });
        if (!item) return;
        editingId = item.id;
        document.getElementById('modal-title').textContent = 'Edit ' + cfg.entityTitle;
        cfg.fields.forEach(function (f) { document.getElementById(f.id).value = item[f.key] || ''; });
        MM.openModal('item-modal');
      }
      if (delBtn) {
        var target = data.find(function (d) { return d.id === delBtn.dataset.delete; });
        if (!target) return;
        editingId = target.id;
        var delNameEl = document.getElementById('del-name');
        if (delNameEl) delNameEl.textContent = target[cfg.nameField];
        MM.openModal('delete-modal');
      }
    });

    var saveBtn = document.getElementById('save-btn');
    if (saveBtn) saveBtn.addEventListener('click', function () {
      var form = document.getElementById('item-form');
      if (!MM.validateForm(form)) return;
      MM.simulateSave(saveBtn, 'Saving...', function () {
        var stored = JSON.parse(localStorage.getItem(cfg.storageKey) || '[]');
        var record = editingId ? { id: editingId } : { id: MM.uid(cfg.storageKey) };
        cfg.fields.forEach(function (f) { record[f.key] = document.getElementById(f.id).value.trim(); });
        if (editingId) {
          var idx = stored.findIndex(function (d) { return d.id === editingId; });
          if (idx > -1) stored[idx] = Object.assign({}, stored[idx], record); else stored.push(record);
        } else { stored.push(record); }
        localStorage.setItem(cfg.storageKey, JSON.stringify(stored));
        MM.closeModal('item-modal');
        MM.showToast(editingId ? cfg.entityTitle + ' updated' : cfg.entityTitle + ' added');
        data = render();
      });
    });

    var confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', function () {
      var stored = JSON.parse(localStorage.getItem(cfg.storageKey) || '[]').filter(function (d) { return d.id !== editingId; });
      localStorage.setItem(cfg.storageKey, JSON.stringify(stored));
      var hidden = JSON.parse(localStorage.getItem(cfg.storageKey + '_hidden') || '[]');
      if (cfg.baseData.some(function (d) { return d.id === editingId; })) { hidden.push(editingId); localStorage.setItem(cfg.storageKey + '_hidden', JSON.stringify(hidden)); }
      MM.closeModal('delete-modal');
      MM.showToast(cfg.entityTitle + ' deleted', { danger: true });
      data = render();
    });
  };
})();
