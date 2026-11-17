(function () {
  'use strict';
  var STORAGE_KEY = 'mm_bu_chat_platforms';
  var BASE_DATA = [
    { id: 'cp1', name: 'WhatsApp Business' },
    { id: 'cp2', name: 'LINE Official Account' },
    { id: 'cp3', name: 'Facebook Messenger' }
  ];
  var editingId = null;

  function currentData() {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    return BASE_DATA.filter(function (d) { return hidden.indexOf(d.id) === -1; }).concat(stored);
  }

  function rows(data) {
    var tbody = document.getElementById('cp-tbody');
    var empty = document.getElementById('cp-empty');
    if (!data.length) { tbody.innerHTML = ''; empty.hidden = false; return; }
    empty.hidden = true;
    tbody.innerHTML = data.map(function (c) {
      return '<tr><td class="cell-strong">' + c.name + '</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="' + c.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + c.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('');
    document.getElementById('cp-result-count').textContent = data.length + ' platforms';
  }
  var allData = currentData();
  rows(allData);

  document.getElementById('cp-search').addEventListener('input', function () {
    var q = this.value.trim().toLowerCase();
    rows(allData.filter(function (c) { return c.name.toLowerCase().indexOf(q) !== -1; }));
  });
  document.getElementById('cp-clear-btn').addEventListener('click', function () {
    document.getElementById('cp-search').value = '';
    rows(allData);
  });

  document.getElementById('add-cp-btn').addEventListener('click', function () {
    editingId = null;
    document.getElementById('cp-modal-title').textContent = 'Add Chat Platform';
    document.getElementById('cp-form').reset();
    MM.openModal('cp-modal');
  });

  document.getElementById('cp-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    var delBtn = e.target.closest('[data-delete]');
    if (editBtn) {
      var item = allData.find(function (d) { return d.id === editBtn.dataset.edit; });
      editingId = item.id;
      document.getElementById('cp-modal-title').textContent = 'Edit Chat Platform';
      document.getElementById('f-name').value = item.name;
      MM.openModal('cp-modal');
    }
    if (delBtn) {
      var target = allData.find(function (d) { return d.id === delBtn.dataset.delete; });
      editingId = target.id;
      document.getElementById('del-cp-name').textContent = target.name;
      MM.openModal('delete-cp-modal');
    }
  });

  document.getElementById('cp-save-btn').addEventListener('click', function () {
    var form = document.getElementById('cp-form');
    if (!MM.validateForm(form)) return;
    MM.simulateSave(this, 'Saving...', function () {
      var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      var name = document.getElementById('f-name').value.trim();
      if (editingId) {
        var idx = stored.findIndex(function (d) { return d.id === editingId; });
        if (idx > -1) stored[idx].name = name; else stored.push({ id: editingId, name: name });
      } else {
        stored.push({ id: MM.uid('cp'), name: name });
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      MM.closeModal('cp-modal');
      MM.showToast(editingId ? 'Platform updated' : 'Platform added');
      setTimeout(function () { window.location.reload(); }, 500);
    });
  });

  document.getElementById('confirm-delete-cp-btn').addEventListener('click', function () {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter(function (d) { return d.id !== editingId; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    if (BASE_DATA.some(function (d) { return d.id === editingId; })) { hidden.push(editingId); localStorage.setItem(STORAGE_KEY + '_hidden', JSON.stringify(hidden)); }
    MM.closeModal('delete-cp-modal');
    MM.showToast('Platform deleted', { danger: true });
    setTimeout(function () { window.location.reload(); }, 500);
  });
})();
