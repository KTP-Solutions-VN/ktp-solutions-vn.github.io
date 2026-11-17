(function () {
  'use strict';
  document.getElementById('list-tbody').innerHTML = MM.FUND.INVESTORS.map(function (iv) {
    return '<tr><td class="cell-strong">' + iv.name + '</td><td class="cell-num">$' + iv.balance.toLocaleString() + '</td>' +
      '<td><input type="number" class="rate-input" step="0.1" value="' + iv.interestRate + '" data-investor="' + iv.id + '"> %</td></tr>';
  }).join('');

  document.getElementById('save-rates-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Saving...', function () {
      MM.showToast('Interest rates saved for all investors');
    });
  });
})();
