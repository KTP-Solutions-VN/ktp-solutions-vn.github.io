(function () {
  'use strict';
  document.getElementById('f-villa').innerHTML = '<option value="">Select villa</option>' + MM.OPR.propertyOptions();
  document.getElementById('list-tbody').innerHTML = MM.OPR.CLEANING_ROUNDS.map(function (r) {
    var action = r.status === 'Completed' ? '<a class="btn btn-ghost btn-sm" href="../opr-008-perform-cleaning-by-inspection-point/index.html">View</a>' : '<a class="btn btn-outline btn-sm" href="../opr-008-perform-cleaning-by-inspection-point/index.html">Continue</a>';
    return '<tr><td class="cell-strong">' + r.property + '</td><td class="cell-sub">' + r.date + '</td><td>' + MM.OPR.badge(r.status) + '</td><td class="row-actions">' + action + '</td></tr>';
  }).join('');
  document.getElementById('start-btn').addEventListener('click', function () {
    if (!MM.validateForm(document.getElementById('start-form'))) return;
    MM.simulateSave(document.getElementById('start-btn'), 'Starting...', function () {
      MM.showToast('Cleaning List started');
      setTimeout(function () { window.location.href = '../opr-008-perform-cleaning-by-inspection-point/index.html'; }, 500);
    });
  });
})();
