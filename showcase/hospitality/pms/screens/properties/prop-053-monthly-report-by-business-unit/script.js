(function () {
  'use strict';
  document.getElementById('list-tbody').innerHTML = MM.MOCK_PROPERTIES.slice(0, 5).map(function (p) {
    var owner = MM.MOCK_OWNERS.find(function (o) { return o.properties.indexOf(p.id) !== -1; });
    return '<tr><td class="cell-strong">' + p.name + '</td><td>' + (owner ? owner.name : '—') + '</td><td><span class="badge badge-success">Sent</span></td></tr>';
  }).join('');
})();
