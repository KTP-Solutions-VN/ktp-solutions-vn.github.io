(function () {
  'use strict';
  var statusMap = ['badge-success">Ready', 'badge-neutral">No Contract', 'badge-warning">Missing Info'];
  document.getElementById('list-tbody').innerHTML = MM.MOCK_PROPERTIES.map(function (p, i) {
    return '<tr><td class="cell-strong">' + p.name + '</td><td class="cell-sub">' + p.bu + '</td><td><span class="badge ' + statusMap[i % 3] + '</span></td>' +
      '<td class="row-actions"><a class="btn btn-outline btn-sm" href="../prop-052-guest-contract-pdf-export/index.html?id=' + p.id + '">Preview</a></td></tr>';
  }).join('');
  document.getElementById('export-btn').addEventListener('click', function () { MM.showToast('Recap exported to Excel'); });
})();
