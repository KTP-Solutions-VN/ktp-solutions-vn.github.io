(function () {
  'use strict';
  document.getElementById('list-tbody').innerHTML = MM.MOCK_PROPERTIES.slice(0, 5).map(function (p, i) {
    return '<tr><td class="cell-strong">' + p.name + '</td><td>Guest Contract v2</td><td class="cell-sub">2026-0' + (3 + i) + '-15</td><td><span class="badge badge-success">Signed</span></td></tr>';
  }).join('');
})();
