(function () {
  'use strict';
  var STORAGE_KEY = 'mm_opr_maintenance_tickets';
  var buFilter = '';

  function loadAll() {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return MM.OPR.MAINTENANCE_TICKETS.concat(stored);
  }

  function render() {
    var data = loadAll().filter(function (t) { return !buFilter || t.bu === buFilter; });
    document.getElementById('list-tbody').innerHTML = data.map(function (t) {
      return '<tr><td class="cell-strong">' + t.id + '</td><td class="cell-sub">' + t.bu + '</td><td>' + t.property + '</td><td>' + t.issue + '</td>' +
        '<td><span class="badge ' + (MM.OPR.PRIORITY_BADGE[t.priority] || 'badge-neutral') + '">' + t.priority + '</span></td>' +
        '<td>' + MM.OPR.badge(t.status) + '</td><td class="cell-sub">' + t.updated + '</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-quickview="' + t.id + '">View</button>' +
        '<a class="btn btn-ghost btn-sm" href="../opr-022-edit-maintenance-ticket/index.html?id=' + t.id + '">Manage</a></td></tr>';
    }).join('');
    document.getElementById('result-count').textContent = data.length + ' ticket' + (data.length === 1 ? '' : 's');
  }
  render();

  document.querySelectorAll('[data-bu-filter]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('[data-bu-filter]').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      buFilter = chip.dataset.buFilter;
      render();
    });
  });

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var qv = e.target.closest('[data-quickview]');
    if (!qv) return;
    var t = loadAll().find(function (x) { return x.id === qv.dataset.quickview; });
    document.getElementById('qv-title').textContent = 'Ticket ' + t.id;
    document.getElementById('qv-villa').textContent = t.property;
    document.getElementById('qv-issue').textContent = t.issue;
    document.getElementById('qv-priority').innerHTML = '<span class="badge ' + (MM.OPR.PRIORITY_BADGE[t.priority] || 'badge-neutral') + '">' + t.priority + '</span>';
    document.getElementById('qv-status').innerHTML = MM.OPR.badge(t.status);
    document.getElementById('qv-updated').textContent = t.updated;
    document.getElementById('qv-edit-link').href = '../opr-022-edit-maintenance-ticket/index.html?id=' + t.id;
    MM.openModal('quickview-modal');
  });
})();
