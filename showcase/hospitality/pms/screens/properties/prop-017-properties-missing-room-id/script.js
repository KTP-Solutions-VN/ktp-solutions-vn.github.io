(function () {
  'use strict';
  var data = MM.MOCK_PROPERTIES.slice(0, 2);
  document.getElementById('list-tbody').innerHTML = data.map(function (p) {
    return '<tr><td class="cell-strong">' + p.name + '</td><td class="cell-sub">' + p.bu + '</td><td><span class="badge badge-success">Open</span></td></tr>';
  }).join('') || '<tr><td colspan="3" class="text-muted text-sm">All open properties have a room ID.</td></tr>';
  document.getElementById('export-btn').addEventListener('click', function () { MM.showToast('List exported to Excel'); });
})();
