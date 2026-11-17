(function () {
  'use strict';
  var MNT = MM.MNT;
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var log = id ? MNT.getLog(id) : null;

  document.addEventListener('DOMContentLoaded', function () {
    if (!log) {
      document.getElementById('detail-wrap').hidden = true;
      document.getElementById('not-found').hidden = false;
      return;
    }
    document.getElementById('page-title').textContent = log.id + ' — ' + log.property;
    document.getElementById('d-villa').textContent = log.property;
    document.getElementById('d-category').textContent = MNT.categoryName(log.category);
    document.getElementById('d-priority').innerHTML = MNT.priorityBadge(log.priority);
    document.getElementById('d-status').innerHTML = MNT.statusBadge(log.status);
    document.getElementById('d-openby').textContent = log.openBy;
    document.getElementById('d-opendate').textContent = MNT.date(log.openDate);
    document.getElementById('d-description').textContent = log.description;

    if (log.closeBy) {
      document.getElementById('closeby-group').hidden = false;
      document.getElementById('closedate-group').hidden = false;
      document.getElementById('d-closeby').textContent = log.closeBy;
      document.getElementById('d-closedate').textContent = MNT.date(log.closeDate);
    }

    var photoGrid = document.getElementById('photo-grid');
    if (log.status === 'Closed' || log.status === 'Open') {
      photoGrid.innerHTML = '<div class="photo-placeholder"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></div><div class="photo-placeholder"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></div>';
    } else {
      photoGrid.hidden = true;
      document.getElementById('no-photos').hidden = false;
    }

    var hist = MNT.getHistory(id);
    var tbody = document.getElementById('history-tbody');
    if (!hist.length) {
      tbody.innerHTML = '<tr><td colspan="5" class="text-sm text-muted" style="text-align:center;padding:18px;">No processing history yet.</td></tr>';
    } else {
      tbody.innerHTML = hist.map(function (h, i) {
        return '<tr><td>' + (i + 1) + '</td><td class="cell-strong">' + h.by + '</td><td class="cell-sub">' + h.comment + '</td><td>' + MNT.statusBadge(h.status) + '</td><td class="cell-sub">' + h.date + '</td></tr>';
      }).join('');
    }

    var buttons = '<a href="../mnt-006-maintenance-cost/index.html?id=' + id + '" class="btn btn-outline">Maintenance Cost</a>';
    if (log.status === 'Open') buttons += ' <a href="../mnt-004-update-maintenance-log-processing/index.html?id=' + id + '" class="btn btn-primary">Update Processing</a>';
    document.getElementById('header-actions').innerHTML = '<a href="../mnt-001-maintenance-ticket-list/index.html" class="btn btn-ghost">Back to List</a> ' + buttons;
  });
})();
