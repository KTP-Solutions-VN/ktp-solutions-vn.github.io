(function () {
  'use strict';
  var STORAGE_KEY = 'mm_bu_banks';
  var EDITS_KEY = 'mm_bu_banks_edits';
  var editingId = null;

  function currentData() {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
    return MM.BU.BANKS.filter(function (b) { return hidden.indexOf(b.id) === -1; }).concat(stored)
      .map(function (b) { return edits[b.id] ? Object.assign({}, b, edits[b.id]) : b; });
  }

  function render() {
    var data = currentData();
    document.getElementById('bank-tbody').innerHTML = data.map(function (b) {
      return '<tr><td class="cell-strong">' + b.name + '</td><td>' + b.country + '</td><td class="cell-sub">' + (b.swift || '—') + '</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="' + b.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + b.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('');
  }
  render();

  function openDrawer(bank) {
    editingId = bank ? bank.id : null;
    document.getElementById('bank-drawer-title').textContent = bank ? 'Edit Bank' : 'Add Bank';
    document.getElementById('save-bank-btn').textContent = bank ? 'Save Changes' : 'Create Bank';
    document.getElementById('bank-form').reset();
    if (bank) {
      document.getElementById('f-name').value = bank.name;
      document.getElementById('f-country').value = bank.country || '';
      document.getElementById('f-swift').value = bank.swift || '';
    }
    MM.openModal('bank-drawer');
  }

  document.getElementById('add-bank-btn').addEventListener('click', function () { openDrawer(null); });

  document.getElementById('bank-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      var b = currentData().find(function (d) { return d.id === editBtn.dataset.edit; });
      openDrawer(b);
      return;
    }
    var delBtn = e.target.closest('[data-delete]');
    if (!delBtn) return;
    editingId = delBtn.dataset.delete;
    var b2 = currentData().find(function (d) { return d.id === editingId; });
    document.getElementById('del-bank-name').textContent = b2.name;
    MM.openModal('delete-bank-modal');
  });

  var form = document.getElementById('bank-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-bank-btn'), editingId ? 'Saving...' : 'Creating...', function () {
      var name = document.getElementById('f-name').value.trim();
      var country = document.getElementById('f-country').value;
      var swift = document.getElementById('f-swift').value.trim();
      if (editingId) {
        var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
        edits[editingId] = { name: name, country: country, swift: swift };
        localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
        MM.showToast('Bank updated');
      } else {
        var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        stored.push({ id: MM.uid('bank'), name: name, country: country, swift: swift });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        MM.showToast('Bank created');
      }
      MM.closeModal('bank-drawer');
      render();
    });
  });

  document.getElementById('confirm-delete-bank-btn').addEventListener('click', function () {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter(function (d) { return d.id !== editingId; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    if (MM.BU.BANKS.some(function (d) { return d.id === editingId; })) { hidden.push(editingId); localStorage.setItem(STORAGE_KEY + '_hidden', JSON.stringify(hidden)); }
    MM.closeModal('delete-bank-modal');
    MM.showToast('Bank deleted', { danger: true });
    render();
  });
})();
