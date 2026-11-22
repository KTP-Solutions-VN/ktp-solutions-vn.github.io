(function () {
  'use strict';
  var TRN = MM.TRN;
  var statusFilter = '';
  var deletingId = null;

  function render() {
    var q = document.getElementById('search-input').value.trim().toLowerCase();
    var data = TRN.getTutorials().filter(function (t) {
      if (statusFilter && t.status !== statusFilter) return false;
      if (q && t.title.toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
    document.getElementById('list-tbody').innerHTML = data.map(function (t) {
      return '<tr><td class="cell-strong">' + t.title + '</td>' +
        '<td class="cell-sub">' + TRN.rolesText(t.roles) + '</td>' +
        '<td>' + TRN.levelBadge(t.accessLevel) + '</td>' +
        '<td>' + TRN.statusBadge(t.status) + '</td>' +
        '<td class="cell-sub">' + t.createdBy + '</td>' +
        '<td class="cell-sub">' + t.createdAt + '</td>' +
        '<td class="row-actions" style="text-align:right;">' +
        '<a href="../trn-004-view-tutorial-details/index.html?id=' + t.id + '" class="btn btn-ghost btn-sm" title="View"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg></a>' +
        '<a href="../trn-005-edit-tutorial/index.html?id=' + t.id + '" class="btn btn-ghost btn-sm" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></a>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + t.id + '" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('');
    document.getElementById('list-empty').hidden = !!data.length;
    document.getElementById('result-count').textContent = data.length + ' tutorial' + (data.length === 1 ? '' : 's');
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();
    document.getElementById('search-input').addEventListener('input', render);
    document.querySelectorAll('[data-status-filter]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.querySelectorAll('[data-status-filter]').forEach(function (c) { c.classList.toggle('active', c === chip); });
        statusFilter = chip.getAttribute('data-status-filter');
        render();
      });
    });

    document.getElementById('add-btn').addEventListener('click', function () { window.location.href = '../trn-003-add-tutorial-and-slide/index.html'; });

    document.getElementById('list-tbody').addEventListener('click', function (e) {
      var delBtn = e.target.closest('[data-delete]');
      if (!delBtn) return;
      var t = TRN.getTutorial(delBtn.dataset.delete);
      if (!t) return;
      deletingId = t.id;
      document.getElementById('del-name').textContent = t.title;
      MM.openModal('delete-modal');
    });

    document.getElementById('confirm-delete-btn').addEventListener('click', function () {
      TRN.deleteTutorial(deletingId);
      MM.closeModal('delete-modal');
      MM.showToast('Lesson deleted', { danger: true });
      render();
    });
  });
})();
