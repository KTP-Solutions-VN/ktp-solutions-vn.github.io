(function () {
  'use strict';
  document.getElementById('f-villa').innerHTML = '<option value="">Select villa</option>' + MM.OPR.propertyOptions();
  document.getElementById('list-tbody').innerHTML = MM.OPR.INSPECTIONS.map(function (r) {
    var action = r.status === 'Completed'
      ? '<a class="btn btn-ghost btn-sm" href="../opr-012-view-completed-inspection-results/index.html?id=' + r.id + '">View</a>'
      : '<a class="btn btn-outline btn-sm" href="../opr-013-manage-in-progress-inspection/index.html?id=' + r.id + '">Manage</a>';
    return '<tr><td class="cell-strong">' + r.property + '</td><td class="cell-sub">' + r.date + '</td><td>' + MM.OPR.badge(r.status) + '</td>' +
      '<td class="row-actions">' + action + ' <button class="btn btn-ghost btn-sm" data-archive="' + r.id + '" title="Archive"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
  }).join('');
  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-archive]');
    if (btn) { btn.closest('tr').style.opacity = '0.4'; MM.showToast('Inspection archived', { danger: true }); }
  });
  document.getElementById('start-btn').addEventListener('click', function () {
    if (!MM.validateForm(document.getElementById('start-form'))) return;
    MM.simulateSave(document.getElementById('start-btn'), 'Starting...', function () {
      MM.showToast('Inspection started');
      setTimeout(function () { window.location.href = '../opr-011-perform-villa-inspection-by-point/index.html'; }, 500);
    });
  });
})();
