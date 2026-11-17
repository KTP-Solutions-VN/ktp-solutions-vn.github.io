(function () {
  'use strict';
  var data = [
    { period: 'August 2026', lang: 'English', bus: 'Phuket Collection, Bali Retreats' },
    { period: 'July 2026', lang: 'English', bus: 'All Business Units' }
  ];
  document.getElementById('list-tbody').innerHTML = data.map(function (n) {
    return '<tr><td class="cell-strong">' + n.period + '</td><td>' + n.lang + '</td><td class="cell-sub">' + n.bus + '</td>' +
      '<td class="row-actions"><button class="btn btn-ghost btn-sm"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button></td></tr>';
  }).join('');
  document.getElementById('add-btn').addEventListener('click', function () { MM.showToast('Newsletter editor opened (demo)'); });
})();
