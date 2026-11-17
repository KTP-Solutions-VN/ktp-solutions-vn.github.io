(function () {
  'use strict';
  var configured = MM.MOCK_PROPERTIES.slice(0, 5);
  var missing = MM.MOCK_PROPERTIES.slice(5);
  document.getElementById('configured-tbody').innerHTML = configured.map(function (p, i) {
    return '<tr><td class="cell-strong">' + p.name + '</td><td class="cell-num">' + (0.95 + i * 0.02).toFixed(2) + '</td></tr>';
  }).join('');
  document.getElementById('missing-tbody').innerHTML = missing.map(function (p) {
    return '<tr><td class="cell-strong">' + p.name + '</td><td class="row-actions"><button class="btn btn-outline btn-sm">Set Coefficient</button></td></tr>';
  }).join('') || '<tr><td colspan="2" class="text-muted text-sm">All properties have a coefficient set.</td></tr>';
})();
