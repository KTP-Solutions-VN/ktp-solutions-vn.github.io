/* Business Unit module - shared mock data & generic CRUD helper, reused
   across screens/business-unit/bu-0XX-*, each screen's own script.js. Loaded after global.js. */
(function () {
  'use strict';
  window.MM = window.MM || {};
  var BU = window.MM.BU = window.MM.BU || {};

  BU.ZONES = [
    { id: 'z1', name: 'Sentosa Coast Zone', region: 'Sentosa', businessUnits: 2 },
    { id: 'z2', name: 'Byron Coast Zone', region: 'Byron Bay', businessUnits: 1 },
    { id: 'z3', name: 'Sunshine Coast Zone', region: 'Noosa', businessUnits: 1 }
  ];

  BU.OFFICES = [
    { id: 'o1', name: 'Sentosa Head Office', bu: 'Sentosa Collection', address: '99 Sentosa Gateway, Singapore 098374', phone: '+65 6612 3456' },
    { id: 'o2', name: 'Byron Bay Operations Office', bu: 'Byron Bay Retreats', address: '8 Jonson Street, Byron Bay NSW 2481', phone: '+61 2 6685 7654' },
    { id: 'o3', name: 'Noosa Field Office', bu: 'Noosa Estates', address: '12 Thomas Street, Noosaville QLD 4566', phone: '+61 7 5447 4567' }
  ];

  BU.BANKS = [
    { id: 'b1', name: 'DBS Bank', country: 'Singapore', swift: 'DBSSSGSG' },
    { id: 'b2', name: 'OCBC Bank', country: 'Singapore', swift: 'OCBCSGSG' },
    { id: 'b3', name: 'Commonwealth Bank', country: 'Australia', swift: 'CTBAAU2S' }
  ];

  BU.PAYMENT_METHODS = [
    { id: 'pm1', name: 'Bank Transfer', type: 'Manual' },
    { id: 'pm2', name: 'Credit Card (Stripe)', type: 'Gateway' },
    { id: 'pm3', name: 'Cash', type: 'Manual' }
  ];

  BU.ACCOUNTS = [
    { id: 'ac1', bank: 'DBS Bank', accountName: 'Azura Stays Sentosa Ops', accountNumber: '123-456789-0', currency: 'SGD' },
    { id: 'ac2', bank: 'Commonwealth Bank', accountName: 'Azura Stays Byron Bay Ops', accountNumber: '987-654321-0', currency: 'AUD' }
  ];

  /* Generic simple-list CRUD used by most BU sub-modules (name-only or
     2-3 field lookups) — mirrors MM.CS.wireCrudScreen from the Common
     Lookup Settings module for consistency across the prototype. */
  BU.wireCrudScreen = function (cfg) {
    var editingId = null;

    function currentData() {
      var stored = JSON.parse(localStorage.getItem(cfg.storageKey) || '[]');
      var hidden = JSON.parse(localStorage.getItem(cfg.storageKey + '_hidden') || '[]');
      return cfg.baseData.filter(function (d) { return hidden.indexOf(d.id) === -1; }).concat(stored);
    }

    function rowHtml(item) {
      var cells = cfg.columns.map(function (col) { return '<td class="' + (col.cellClass || '') + '">' + (item[col.key] || '—') + '</td>'; }).join('');
      return '<tr>' + cells +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }

    function render() {
      var data = currentData();
      document.getElementById('list-tbody').innerHTML = data.map(rowHtml).join('') || '<tr><td colspan="' + (cfg.columns.length + 1) + '" class="text-muted text-sm">No ' + cfg.entityLabel + 's yet.</td></tr>';
      var countEl = document.getElementById('result-count');
      if (countEl) countEl.textContent = data.length + ' ' + cfg.entityLabel + (data.length === 1 ? '' : 's');
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
        document.getElementById('del-name').textContent = target[cfg.nameField];
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
        setTimeout(function () { window.location.reload(); }, 500);
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
      setTimeout(function () { window.location.reload(); }, 500);
    });
  };
})();
