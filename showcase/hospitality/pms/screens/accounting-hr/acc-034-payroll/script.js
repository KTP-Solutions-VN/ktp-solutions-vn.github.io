(function () {
  'use strict';
  document.getElementById('list-tbody').innerHTML = MM.MOCK_STAFF.map(function (s, i) {
    var days = 22 + (i % 3);
    var pay = days * 22;
    return '<tr><td class="cell-strong">' + s.name + '</td><td class="cell-num">' + days + '</td><td class="cell-num">$' + pay + '</td><td><span class="badge badge-success">Paid</span></td></tr>';
  }).join('');
  document.getElementById('run-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Processing...', function () { MM.showToast('Payroll processed for August 2026'); });
  });
})();
