(function () {
  'use strict';
  var LOGS = [
    { owner: 'Richard Halstead', property: 'Villa Sapphire Cliff', lastLogin: '2026-08-25', tag: 'all' },
    { owner: 'Isabelle Moreau', property: 'Villa Emerald Bay', lastLogin: '2026-05-02', tag: 'stale' },
    { owner: 'David Chen', property: 'Villa Azure Ridge', lastLogin: '2026-08-20', tag: 'all' },
    { owner: 'Priya Nair', property: 'Villa Lotus Terrace', lastLogin: 'Never', tag: 'never' }
  ];
  function render(filter) {
    var data = filter === 'all' ? LOGS : LOGS.filter(function (l) { return l.tag === filter; });
    document.getElementById('list-tbody').innerHTML = data.map(function (l) {
      return '<tr><td class="cell-strong">' + l.owner + '</td><td class="cell-sub">' + l.property + '</td><td>' + (l.lastLogin === 'Never' ? '<span class="badge badge-warning">Never</span>' : l.lastLogin) + '</td></tr>';
    }).join('');
  }
  render('all');
  document.querySelectorAll('[data-tab]').forEach(function (tab) {
    tab.addEventListener('click', function () { render(tab.dataset.tab); });
  });
})();
