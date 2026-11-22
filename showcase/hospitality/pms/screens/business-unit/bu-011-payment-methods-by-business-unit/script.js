(function () {
  'use strict';
  var BUS = ['Sentosa Collection', 'Byron Bay Retreats', 'Noosa Estates'];
  var METHODS = ['bank-transfer', 'credit-card', 'cash'];
  var STORAGE_KEY = 'mm_bu_payment_matrix';

  function defaultMatrix() {
    var m = {};
    BUS.forEach(function (bu) { m[bu] = { 'bank-transfer': true, 'credit-card': bu !== 'Noosa Estates', cash: true }; });
    return m;
  }
  var matrix = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || defaultMatrix();

  function render() {
    document.getElementById('matrix-tbody').innerHTML = BUS.map(function (bu) {
      return '<tr><td class="cell-strong">' + bu + '</td>' + METHODS.map(function (m) {
        return '<td><label class="switch"><input type="checkbox" data-bu="' + bu + '" data-method="' + m + '" ' + (matrix[bu][m] ? 'checked' : '') + '><span class="switch-slider"></span></label></td>';
      }).join('') + '</tr>';
    }).join('');
  }
  render();

  document.getElementById('matrix-tbody').addEventListener('change', function (e) {
    if (!e.target.matches('input[type="checkbox"]')) return;
    matrix[e.target.dataset.bu][e.target.dataset.method] = e.target.checked;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matrix));
    MM.showToast('Payment method updated for ' + e.target.dataset.bu);
  });
})();
