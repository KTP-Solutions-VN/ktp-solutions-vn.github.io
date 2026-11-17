(function () {
  'use strict';

  var MNT = MM.MNT;
  var sortKey = 'villa';
  var statusFilter = '';

  function populateFilters() {
    var catSel = document.getElementById('f-category');
    MNT.getCategories().forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c.id; opt.textContent = c.name;
      catSel.appendChild(opt);
    });
    var priSel = document.getElementById('f-priority');
    MNT.getPriorities().forEach(function (p) {
      var opt = document.createElement('option');
      opt.value = p.id; opt.textContent = p.name;
      priSel.appendChild(opt);
    });
  }

  function propertyBu(name) {
    var p = (MM.MOCK_PROPERTIES || []).find(function (x) { return x.name === name; });
    return p ? p.bu : '—';
  }

  function isOverdue(log) {
    if (log.status === 'Closed' || log.status === 'Rejected') return false;
    return new Date(log.dueDate + 'T00:00:00') < new Date('2026-08-27T00:00:00');
  }

  function sortedList(list) {
    var arr = list.slice();
    if (sortKey === 'villa') arr.sort(function (a, b) { return a.property.localeCompare(b.property); });
    else if (sortKey === 'priority') {
      var order = { pr1: 0, pr2: 1, pr3: 2, pr4: 3 };
      arr.sort(function (a, b) { return (order[a.priority] || 9) - (order[b.priority] || 9); });
    } else if (sortKey === 'due') arr.sort(function (a, b) { return a.dueDate.localeCompare(b.dueDate); });
    else if (sortKey === 'area') arr.sort(function (a, b) { return propertyBu(a.property).localeCompare(propertyBu(b.property)); });
    return arr;
  }

  function render() {
    var all = MNT.getLogs();
    var q = document.getElementById('search-input').value.trim().toLowerCase();
    var cat = document.getElementById('f-category').value;
    var pri = document.getElementById('f-priority').value;

    var filtered = all.filter(function (log) {
      if (statusFilter && log.status !== statusFilter) return false;
      if (cat && log.category !== cat) return false;
      if (pri && log.priority !== pri) return false;
      if (q) {
        var hay = (log.property + ' ' + log.description).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    filtered = sortedList(filtered);

    // KPIs computed from the full (unfiltered) dataset
    document.getElementById('stat-open').textContent = all.filter(function (l) { return l.status === 'Open'; }).length;
    document.getElementById('stat-pending').textContent = all.filter(function (l) { return l.status === 'Pending'; }).length;
    document.getElementById('stat-overdue').textContent = all.filter(isOverdue).length;
    document.getElementById('stat-closed').textContent = all.filter(function (l) { return l.status === 'Closed'; }).length;

    var tbody = document.getElementById('list-tbody');
    tbody.innerHTML = filtered.map(function (log) {
      var overdue = isOverdue(log);
      var dueCell = '<span class="' + (overdue ? 'overdue-cell' : '') + '">' + MNT.date(log.dueDate) + '</span>';
      var assignee = log.assignee || '<span class="text-muted">Unassigned</span>';
      var actionBtn = '';
      if (log.status === 'Pending') {
        actionBtn = '<a href="../mnt-003-accept-reject-maintenance-task/index.html?id=' + log.id + '" class="btn btn-outline btn-sm">Accept/Reject</a>';
      } else if (log.status === 'Open') {
        actionBtn = '<a href="../mnt-004-update-maintenance-log-processing/index.html?id=' + log.id + '" class="btn btn-outline btn-sm">Update</a>';
      } else {
        actionBtn = '<a href="../mnt-005-view-maintenance-log-details/index.html?id=' + log.id + '" class="btn btn-ghost btn-sm">View</a>';
      }
      return '<tr class="clickable" data-row-id="' + log.id + '">' +
        '<td class="cell-strong">' + log.property + '</td>' +
        '<td class="cell-sub">' + MNT.categoryName(log.category) + '</td>' +
        '<td>' + MNT.priorityBadge(log.priority) + '</td>' +
        '<td class="cell-sub">' + assignee + '</td>' +
        '<td>' + dueCell + '</td>' +
        '<td class="cell-sub">' + propertyBu(log.property) + '</td>' +
        '<td>' + MNT.statusBadge(log.status) + '</td>' +
        '<td class="row-actions" style="text-align:right;">' + actionBtn + ' <a href="../mnt-005-view-maintenance-log-details/index.html?id=' + log.id + '" class="btn btn-ghost btn-sm" title="View details"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg></a></td>' +
        '</tr>';
    }).join('');

    document.getElementById('list-empty').hidden = !!filtered.length;
    document.getElementById('result-count').textContent = filtered.length + ' log' + (filtered.length === 1 ? '' : 's');

    tbody.querySelectorAll('tr[data-row-id]').forEach(function (tr) {
      tr.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        var id = tr.getAttribute('data-row-id');
        var log = all.find(function (l) { return l.id === id; });
        if (!log) return;
        if (log.status === 'Pending') window.location.href = '../mnt-003-accept-reject-maintenance-task/index.html?id=' + id;
        else if (log.status === 'Open') window.location.href = '../mnt-004-update-maintenance-log-processing/index.html?id=' + id;
        else window.location.href = '../mnt-005-view-maintenance-log-details/index.html?id=' + id;
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    populateFilters();
    render();

    document.querySelectorAll('[data-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('[data-tab]').forEach(function (t) { t.classList.toggle('active', t === tab); });
        sortKey = tab.getAttribute('data-tab');
        render();
      });
    });

    document.querySelectorAll('[data-status-filter]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.querySelectorAll('[data-status-filter]').forEach(function (c) { c.classList.toggle('active', c === chip); });
        statusFilter = chip.getAttribute('data-status-filter');
        render();
      });
    });

    document.getElementById('f-category').addEventListener('change', render);
    document.getElementById('f-priority').addEventListener('change', render);
    document.getElementById('search-input').addEventListener('input', render);

    document.getElementById('clear-search-btn').addEventListener('click', function () {
      document.getElementById('search-input').value = '';
      document.getElementById('f-category').value = '';
      document.getElementById('f-priority').value = '';
      statusFilter = '';
      document.querySelectorAll('[data-status-filter]').forEach(function (c) { c.classList.toggle('active', c.getAttribute('data-status-filter') === ''); });
      render();
    });

    document.getElementById('add-btn').addEventListener('click', function () {
      window.location.href = '../mnt-002-add-new-maintenance-log/index.html';
    });
  });
})();
