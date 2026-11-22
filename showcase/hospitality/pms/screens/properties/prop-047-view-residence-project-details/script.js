(function () {
  'use strict';
  document.getElementById('res-location').textContent = 'Singapore — Sentosa — Sentosa Cove — Cove Drive';
  document.getElementById('props-tbody').innerHTML = MM.MOCK_PROPERTIES.slice(0, 3).map(function (p) {
    return '<tr><td class="cell-strong">' + p.name + '</td><td class="cell-num">' + p.bedrooms + '</td></tr>';
  }).join('');
  document.getElementById('owners-tbody').innerHTML = MM.MOCK_OWNERS.slice(0, 2).map(function (o) {
    return '<tr><td class="cell-strong">' + o.name + '</td><td class="cell-sub">' + o.email + '</td></tr>';
  }).join('');
})();
