(function () {
  'use strict';
  var params = new URLSearchParams(window.location.search);
  var item = MM.INV.ITEMS.find(function (it) { return it.id === params.get('id'); }) || MM.INV.ITEMS[0];
  document.getElementById('item-sub').textContent = 'Editing ' + item.name;
  document.getElementById('f-name').value = item.name;
  document.getElementById('f-category').value = item.category;
  document.getElementById('f-reorder').value = item.reorderLevel;

  var form = document.getElementById('item-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
      var stored = JSON.parse(localStorage.getItem('mm_inv_items') || '{}');
      stored[item.id] = { name: document.getElementById('f-name').value.trim(), category: document.getElementById('f-category').value.trim(), reorderLevel: parseInt(document.getElementById('f-reorder').value, 10) || item.reorderLevel };
      localStorage.setItem('mm_inv_items', JSON.stringify(stored));
      MM.showToast('Item updated');
      setTimeout(function () { window.location.href = '../inv-001-inventory-list/index.html'; }, 600);
    });
  });
})();
