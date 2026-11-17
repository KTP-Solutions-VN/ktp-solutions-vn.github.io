(function () {
  'use strict';
  document.getElementById('list-tbody').innerHTML = MM.MOCK_STAFF.map(function (s, i) {
    var days = 22 + (i % 3), rate = 20 + (i % 2) * 2;
    return '<tr><td class="cell-strong">' + s.name + '</td><td class="cell-num">' + days + '</td><td class="cell-num">$' + rate + '</td><td class="cell-num">$' + (days * rate) + '</td></tr>';
  }).join('');
})();
