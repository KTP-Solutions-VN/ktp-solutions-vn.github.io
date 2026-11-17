(function () {
  'use strict';
  var MNT = MM.MNT;
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var log = id ? MNT.getLog(id) : null;

  document.addEventListener('DOMContentLoaded', function () {
    if (!log || log.status !== 'Pending') {
      document.getElementById('detail-wrap').hidden = true;
      document.getElementById('not-found').hidden = false;
      return;
    }
    document.getElementById('d-villa').textContent = log.property;
    document.getElementById('d-category').textContent = MNT.categoryName(log.category);
    document.getElementById('d-priority').innerHTML = MNT.priorityBadge(log.priority);
    document.getElementById('d-due').textContent = MNT.date(log.dueDate);
    document.getElementById('d-openby').textContent = log.openBy;
    document.getElementById('d-opendate').textContent = MNT.date(log.openDate);
    document.getElementById('d-description').textContent = log.description;

    document.getElementById('accept-btn').addEventListener('click', function () {
      MM.simulateSave(document.getElementById('accept-btn'), 'Accepting...', function () {
        MNT.updateLog(id, function (l) { l.status = 'Open'; l.assignee = 'Somchai Anuwat'; });
        MNT.addHistory(id, { by: 'Somchai Anuwat', comment: 'Task accepted.', status: 'Open', date: new Date().toISOString().slice(0, 16).replace('T', ' ') });
        MM.showToast('Task accepted — moved to Open');
        setTimeout(function () { window.location.href = '../mnt-001-maintenance-ticket-list/index.html'; }, 700);
      });
    });

    document.getElementById('reject-btn').addEventListener('click', function () {
      MM.simulateSave(document.getElementById('reject-btn'), 'Rejecting...', function () {
        MNT.updateLog(id, function (l) { l.status = 'Rejected'; });
        MNT.addHistory(id, { by: 'Somchai Anuwat', comment: 'Task rejected.', status: 'Rejected', date: new Date().toISOString().slice(0, 16).replace('T', ' ') });
        MM.showToast('Task rejected', { danger: true });
        setTimeout(function () { window.location.href = '../mnt-001-maintenance-ticket-list/index.html'; }, 700);
      });
    });
  });
})();
