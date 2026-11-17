(function () {
  'use strict';
  document.getElementById('list-tbody').innerHTML = [
    { property: 'Villa Sapphire Cliff', activity: 'Photo shoot completed', date: '2026-08-20', comment: 'Full set uploaded' },
    { property: 'Villa Coral Horizon', activity: 'Reshoot completed', date: '2026-08-15', comment: 'Pool angle redone' }
  ].map(function (l) { return '<tr><td class="cell-strong">' + l.property + '</td><td>' + l.activity + '</td><td class="cell-sub">' + l.date + '</td><td class="cell-sub">' + l.comment + '</td></tr>'; }).join('');
})();
