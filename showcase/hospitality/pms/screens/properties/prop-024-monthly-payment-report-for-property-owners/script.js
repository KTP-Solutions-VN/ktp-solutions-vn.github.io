(function () {
  'use strict';
  document.getElementById('list-tbody').innerHTML = MM.MOCK_PROPERTIES.slice(0, 4).map(function (p, i) {
    var owner = MM.MOCK_OWNERS.find(function (o) { return o.properties.indexOf(p.id) !== -1; });
    return '<tr><td class="cell-strong">' + p.name + '</td><td>' + (owner ? owner.name : '—') + '</td><td class="cell-sub">2026-0' + (7 + (i % 2)) + '-28</td><td class="cell-sub">2026-09-28</td>' +
      '<td class="row-actions"><button class="btn btn-outline btn-sm">Download</button></td></tr>';
  }).join('');
})();
