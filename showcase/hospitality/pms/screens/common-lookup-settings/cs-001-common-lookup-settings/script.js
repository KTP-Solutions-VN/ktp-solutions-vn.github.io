(function () {
  'use strict';

  MM.CS.renderSideNav('cs-001-common-lookup-settings');

  var STORAGE_KEY = 'mm_cs_countries';
  var editingId = null;

  function rowHtml(item, idx) {
    return '<tr>' +
      '<td>' + (idx + 1) + '</td>' +
      '<td class="cell-strong">' + item.name + '</td>' +
      '<td class="cell-sub">' + (item.createdAt || '—') + '</td>' +
      '<td class="row-actions">' +
        '<button class="btn btn-ghost btn-sm" data-edit="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>' +
      '</td></tr>';
  }

  var state = MM.CS.renderSimpleList({
    storageKey: STORAGE_KEY,
    baseData: MM.CS.COUNTRIES,
    tbodyId: 'list-tbody',
    emptyId: 'list-empty',
    searchId: 'search-input',
    countId: 'result-count',
    entityLabel: 'country',
    rowHtml: rowHtml
  });

  document.getElementById('clear-search-btn').addEventListener('click', function () {
    document.getElementById('search-input').value = '';
    document.getElementById('search-input').dispatchEvent(new Event('input'));
  });

  document.getElementById('add-btn').addEventListener('click', function () {
    editingId = null;
    document.getElementById('modal-title').textContent = 'Add Country';
    document.getElementById('item-form').reset();
    MM.openModal('item-modal');
  });

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    var delBtn = e.target.closest('[data-delete]');
    if (editBtn) {
      var item = state.data.find(function (d) { return d.id === editBtn.dataset.edit; });
      if (!item) return;
      editingId = item.id;
      document.getElementById('modal-title').textContent = 'Edit Country';
      document.getElementById('f-name').value = item.name;
      MM.openModal('item-modal');
    }
    if (delBtn) {
      var target = state.data.find(function (d) { return d.id === delBtn.dataset.delete; });
      if (!target) return;
      editingId = target.id;
      document.getElementById('del-name').textContent = target.name;
      MM.openModal('delete-modal');
    }
  });

  document.getElementById('save-btn').addEventListener('click', function () {
    var form = document.getElementById('item-form');
    if (!MM.validateForm(form)) return;
    var saveBtn = document.getElementById('save-btn');
    MM.simulateSave(saveBtn, 'Saving...', function () {
      var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      var name = document.getElementById('f-name').value.trim();
      if (editingId) {
        var idx = stored.findIndex(function (d) { return d.id === editingId; });
        if (idx > -1) stored[idx].name = name;
        else stored.push({ id: editingId, name: name, createdAt: new Date().toISOString().slice(0, 10) });
      } else {
        stored.push({ id: MM.uid('country'), name: name, createdAt: new Date().toISOString().slice(0, 10) });
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      MM.closeModal('item-modal');
      MM.showToast(editingId ? 'Country updated' : 'Country added');
      setTimeout(function () { window.location.reload(); }, 500);
    });
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    stored = stored.filter(function (d) { return d.id !== editingId; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    if (MM.CS.COUNTRIES.some(function (d) { return d.id === editingId; })) {
      hidden.push(editingId);
      localStorage.setItem(STORAGE_KEY + '_hidden', JSON.stringify(hidden));
    }
    MM.closeModal('delete-modal');
    MM.showToast('Country deleted', { danger: true });
    setTimeout(function () { window.location.reload(); }, 500);
  });
})();
