(function () {
  'use strict';
  var statusMap = { ok: 'badge-success', low: 'badge-warning', out: 'badge-danger' };
  var editingId = null;

  function currentData() {
    var stored = JSON.parse(localStorage.getItem('mm_inv_items') || '{}');
    var newItems = JSON.parse(localStorage.getItem('mm_inv_new_items') || '[]');
    return MM.INV.ITEMS.map(function (it) { return stored[it.id] ? Object.assign({}, it, stored[it.id]) : it; }).concat(newItems);
  }

  function rows(data) {
    document.getElementById('list-tbody').innerHTML = data.map(function (it) {
      return '<tr><td class="cell-sub">' + it.sku + '</td><td class="cell-strong">' + it.name + '</td><td class="cell-sub">' + it.category + '</td>' +
        '<td class="cell-num">' + it.qty + ' ' + it.unit + '</td><td><span class="badge ' + statusMap[it.status] + '">' + it.status + '</span></td>' +
        '<td class="row-actions"><button class="btn btn-outline btn-sm" data-adjust="' + it.id + '">Adjust</button></td></tr>';
    }).join('');
    document.getElementById('result-count').textContent = data.length + ' items';
  }
  rows(currentData());

  document.getElementById('search-input').addEventListener('input', function () {
    var q = this.value.trim().toLowerCase();
    rows(currentData().filter(function (it) { return it.name.toLowerCase().indexOf(q) !== -1 || it.sku.toLowerCase().indexOf(q) !== -1; }));
  });

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-adjust]');
    if (!btn) return;
    editingId = btn.dataset.adjust;
    var item = currentData().find(function (d) { return d.id === editingId; });
    document.getElementById('adjust-item-name').textContent = item.name + ' — currently ' + item.qty + ' ' + item.unit;
    MM.openModal('adjust-modal');
  });

  document.getElementById('f-action').addEventListener('change', function () {
    document.getElementById('qty-group').style.display = this.value === 'delete' ? 'none' : '';
  });

  document.getElementById('save-adjust-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Saving...', function () {
      var action = document.getElementById('f-action').value;
      var qty = parseInt(document.getElementById('f-qty').value, 10) || 0;
      var stored = JSON.parse(localStorage.getItem('mm_inv_items') || '{}');
      var item = currentData().find(function (d) { return d.id === editingId; });
      if (action === 'delete') {
        stored[editingId] = Object.assign({}, item, { qty: 0, status: 'out' });
      } else {
        var newQty = action === 'add-more' ? item.qty + qty : Math.max(0, item.qty - qty);
        var status = newQty === 0 ? 'out' : newQty < item.reorderLevel ? 'low' : 'ok';
        stored[editingId] = Object.assign({}, item, { qty: newQty, status: status });
      }
      localStorage.setItem('mm_inv_items', JSON.stringify(stored));
      var log = JSON.parse(localStorage.getItem('mm_inv_log_extra') || '[]');
      log.unshift({ id: MM.uid('lg'), item: item.name, action: action === 'add-more' ? 'Stock added' : action === 'sub-more' ? 'Stock deducted' : 'Item removed', qty: action === 'add-more' ? '+' + qty : '-' + qty, by: 'Daniel Tan', date: new Date().toISOString().slice(0, 16).replace('T', ' ') });
      localStorage.setItem('mm_inv_log_extra', JSON.stringify(log));
      MM.closeModal('adjust-modal');
      MM.showToast('Inventory updated');
      rows(currentData());
    });
  });

  // --- Add Item drawer (merged in from INV-002) ---
  var itemForm = document.getElementById('item-form');
  MM.bindFormValidation(itemForm);

  document.getElementById('add-item-btn').addEventListener('click', function () {
    itemForm.reset();
    itemForm.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
    MM.openModal('add-item-drawer');
  });

  itemForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(itemForm)) return;
    MM.simulateSave(document.getElementById('save-item-btn'), 'Adding...', function () {
      var stored = JSON.parse(localStorage.getItem('mm_inv_new_items') || '[]');
      stored.push({
        id: MM.uid('it'), sku: document.getElementById('f-sku').value.trim(), name: document.getElementById('f-item-name').value.trim(),
        category: document.getElementById('f-category').value, unit: document.getElementById('f-unit').value.trim(),
        qty: parseInt(document.getElementById('f-item-qty').value, 10) || 0, reorderLevel: parseInt(document.getElementById('f-reorder').value, 10) || 0,
        status: 'ok'
      });
      localStorage.setItem('mm_inv_new_items', JSON.stringify(stored));
      MM.closeModal('add-item-drawer');
      MM.showToast('Item added to inventory');
      rows(currentData());
    });
  });
})();
