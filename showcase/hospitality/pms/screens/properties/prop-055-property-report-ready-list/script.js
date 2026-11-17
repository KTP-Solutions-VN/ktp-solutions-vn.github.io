(function () {
  'use strict';
  var statusMap = ['badge-success">Ready and Secured', 'badge-info">Ready'];
  document.getElementById('list-tbody').innerHTML = MM.MOCK_PROPERTIES.slice(0, 5).map(function (p, i) {
    return '<tr><td class="cell-strong">' + p.name + '</td><td><span class="badge ' + statusMap[i % 2] + '</span></td>' +
      '<td class="row-actions"><button class="btn btn-primary btn-sm" data-generate="' + p.id + '">Generate Report</button></td></tr>';
  }).join('');
  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-generate]');
    if (!btn) return;
    MM.simulateSave(btn, 'Generating...', function () { MM.showToast('Owner revenue report generated'); });
  });
})();
