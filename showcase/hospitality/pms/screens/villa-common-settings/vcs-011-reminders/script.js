(function () {
  'use strict';
  MM.VCS.renderSideNav('vcs-011-reminders');
  var STORAGE_KEY = 'mm_vcs_reminders';
  var editingId = null;

  function loadAll() {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    var order = JSON.parse(localStorage.getItem(STORAGE_KEY + '_order') || 'null');
    var data = MM.VCS.REMINDERS.filter(function (d) { return hidden.indexOf(d.id) === -1; }).concat(stored);
    if (order) {
      data.sort(function (a, b) { return (order.indexOf(a.id)) - (order.indexOf(b.id)); });
    } else {
      data.sort(function (a, b) { return (a.order || 99) - (b.order || 99); });
    }
    return data;
  }

  function saveOrder(data) {
    localStorage.setItem(STORAGE_KEY + '_order', JSON.stringify(data.map(function (d) { return d.id; })));
  }

  function render() {
    var data = loadAll();
    var tbody = document.getElementById('list-tbody');
    var empty = document.getElementById('list-empty');
    if (!data.length) { tbody.innerHTML = ''; empty.hidden = false; return; }
    empty.hidden = true;
    tbody.innerHTML = data.map(function (item, idx) {
      var up = idx > 0 ? '<button class="btn btn-ghost btn-sm" data-up="' + item.id + '" title="Move up"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>' : '';
      var down = idx < data.length - 1 ? '<button class="btn btn-ghost btn-sm" data-down="' + item.id + '" title="Move down"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 5v14M5 12l7 7 7-7"/></svg></button>' : '';
      return '<tr><td class="cell-num">' + (idx + 1) + '</td>' +
        '<td class="cell-strong">' + item.name + '</td>' +
        '<td class="cell-sub">' + (item.createdAt || '\u2014') + '</td>' +
        '<td class="row-actions">' + up + down +
        '<button class="btn btn-ghost btn-sm" data-edit="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('');
    document.getElementById('result-count').textContent = data.length + ' reminder' + (data.length === 1 ? '' : 's');
  }
  render();

  document.getElementById('search-input').addEventListener('input', function () {
    var q = this.value.trim().toLowerCase();
    var data = loadAll().filter(function (item) { return item.name.toLowerCase().indexOf(q) > -1; });
    var tbody = document.getElementById('list-tbody');
    tbody.innerHTML = data.map(function (item, idx) {
      return '<tr><td>' + (idx + 1) + '</td><td class="cell-strong">' + item.name + '</td><td class="cell-sub">' + (item.createdAt || '\u2014') + '</td><td></td></tr>';
    }).join('');
    document.getElementById('list-empty').hidden = !!data.length;
    document.getElementById('result-count').textContent = data.length + ' reminder' + (data.length === 1 ? '' : 's');
  });

  document.getElementById('clear-search-btn').addEventListener('click', function () { document.getElementById('search-input').value = ''; render(); });

  document.getElementById('add-btn').addEventListener('click', function () {
    editingId = null;
    document.getElementById('modal-title').textContent = 'Add Reminder';
    document.getElementById('item-form').reset();
    MM.openModal('item-modal');
  });

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]'), delBtn = e.target.closest('[data-delete]');
    var upBtn = e.target.closest('[data-up]'), downBtn = e.target.closest('[data-down]');
    var data = loadAll();
    if (editBtn) {
      var item = data.find(function (d) { return d.id === editBtn.dataset.edit; });
      if (!item) return;
      editingId = item.id;
      document.getElementById('modal-title').textContent = 'Edit Reminder';
      document.getElementById('f-name').value = item.name;
      MM.openModal('item-modal');
    }
    if (delBtn) {
      var target = data.find(function (d) { return d.id === delBtn.dataset.delete; });
      if (!target) return;
      editingId = target.id;
      document.getElementById('del-name').textContent = target.name;
      MM.openModal('delete-modal');
    }
    if (upBtn || downBtn) {
      var id = (upBtn || downBtn).dataset.up || (upBtn || downBtn).dataset.down;
      var idx = data.findIndex(function (d) { return d.id === id; });
      var swapIdx = upBtn ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= data.length) return;
      var tmp = data[idx]; data[idx] = data[swapIdx]; data[swapIdx] = tmp;
      saveOrder(data);
      render();
      MM.showToast('Reminder order updated');
    }
  });

  document.getElementById('save-btn').addEventListener('click', function () {
    var form = document.getElementById('item-form');
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
      var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      var name = document.getElementById('f-name').value.trim();
      if (editingId) {
        var idx = stored.findIndex(function (d) { return d.id === editingId; });
        if (idx > -1) stored[idx].name = name;
        else stored.push({ id: editingId, name: name, createdAt: new Date().toISOString().slice(0, 10) });
      } else {
        stored.push({ id: MM.uid('rm'), name: name, createdAt: new Date().toISOString().slice(0, 10) + ' ' + new Date().toTimeString().slice(0, 5) });
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      MM.closeModal('item-modal');
      MM.showToast(editingId ? 'Reminder updated' : 'Reminder added');
      render();
    });
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter(function (d) { return d.id !== editingId; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    if (MM.VCS.REMINDERS.some(function (d) { return d.id === editingId; })) { hidden.push(editingId); localStorage.setItem(STORAGE_KEY + '_hidden', JSON.stringify(hidden)); }
    MM.closeModal('delete-modal');
    MM.showToast('Reminder deleted', { danger: true });
    render();
  });
})();
