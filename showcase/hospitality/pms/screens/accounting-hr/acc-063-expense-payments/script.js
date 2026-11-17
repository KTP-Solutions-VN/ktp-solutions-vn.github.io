(function () {
  'use strict';
  document.getElementById('list-tbody').innerHTML = MM.ACC.EXPENSE_PAYMENTS.map(function (e) {
    return '<tr><td class="cell-strong">' + e.description + '</td><td class="cell-num">$' + e.amount + '</td><td><span class="badge ' + (e.status === 'Paid' ? 'badge-success' : 'badge-warning') + '">' + e.status + '</span></td></tr>';
  }).join('');
})();
