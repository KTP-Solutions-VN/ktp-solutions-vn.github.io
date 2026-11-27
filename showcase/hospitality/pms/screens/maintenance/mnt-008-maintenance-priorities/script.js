(function () {
  'use strict';
  var MNT = MM.MNT;
  var editingId = null;
  var deletingId = null;

  function render() {
    var q = document.getElementById('search-input').value.trim().toLowerCase();
    var data = MNT.getPriorities().filter(function (p) { return !q || p.name.toLowerCase().indexOf(q) > -1; });
    document.getElementById('list-tbody').innerHTML = data.map(function (p, i) {
      return '<tr><td>' + (i + 1) + '</td><td class="cell-strong">' + p.name + '</td><td class="cell-sub">' + p.responseTime + ' hrs</td>' +
        '<td><span class="color-swatch" style="background:' + p.color + ';"></span></td>' +
        '<td class="cell-sub">' + MNT.date(p.createdAt) + '</td>' +
        '<td class="row-actions" style="text-align:right;">' +
        '<button class="btn btn-ghost btn-sm" data-edit="' + p.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + p.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('');
    document.getElementById('list-empty').hidden = !!data.length;
    document.getElementById('result-count').textContent = data.length + ' priorit' + (data.length === 1 ? 'y' : 'ies');
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();
    MM.bindFormValidation(document.getElementById('item-form'));
    document.getElementById('search-input').addEventListener('input', render);

    document.getElementById('add-btn').addEventListener('click', function () {
      editingId = null;
      document.getElementById('modal-title').textContent = 'Add Priority';
      document.getElementById('item-form').reset();
      document.getElementById('f-color').value = '#D4A85A';
      MM.openModal('item-modal');
    });

    document.getElementById('list-tbody').addEventListener('click', function (e) {
      var editBtn = e.target.closest('[data-edit]'), delBtn = e.target.closest('[data-delete]');
      if (editBtn) {
        var p = MNT.getPriorities().find(function (x) { return x.id === editBtn.dataset.edit; });
        if (!p) return;
        editingId = p.id;
        document.getElementById('modal-title').textContent = 'Edit Priority';
        document.getElementById('f-name').value = p.name;
        document.getElementById('f-response').value = p.responseTime;
        document.getElementById('f-color').value = p.color;
        MM.openModal('item-modal');
      }
      if (delBtn) {
        var target = MNT.getPriorities().find(function (x) { return x.id === delBtn.dataset.delete; });
        if (!target) return;
        deletingId = target.id;
        document.getElementById('del-name').textContent = target.name;
        MM.openModal('delete-modal');
      }
    });

    document.getElementById('save-btn').addEventListener('click', function () {
      if (!MM.validateForm(document.getElementById('item-form'))) return;
      MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
        var list = MNT.getPriorities();
        var name = document.getElementById('f-name').value.trim();
        var responseTime = parseInt(document.getElementById('f-response').value, 10);
        var color = document.getElementById('f-color').value;
        if (editingId) {
          var item = list.find(function (x) { return x.id === editingId; });
          item.name = name; item.responseTime = responseTime; item.color = color;
        } else {
          list.unshift({ id: MM.uid('pr'), name: name, responseTime: responseTime, color: color, createdAt: new Date().toISOString().slice(0, 10) });
        }
        MNT.savePriorities(list);
        MM.closeModal('item-modal');
        MM.showToast(editingId ? 'Priority updated' : 'Priority added');
        render();
      });
    });

    document.getElementById('confirm-delete-btn').addEventListener('click', function () {
      var list = MNT.getPriorities().filter(function (x) { return x.id !== deletingId; });
      MNT.savePriorities(list);
      MM.closeModal('delete-modal');
      MM.showToast('Priority deleted', { danger: true });
      render();
    });
  });
})();
