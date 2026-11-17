(function () {
  'use strict';
  var statusMap = ['badge-success">Sent', 'badge-warning">Pending', 'badge-neutral">Not Necessary'];
  document.getElementById('list-tbody').innerHTML = MM.MOCK_PROPERTIES.map(function (p, i) {
    return '<tr><td class="cell-strong">' + p.name + '</td><td><span class="badge ' + statusMap[i % 3] + '</span></td>' +
      '<td class="row-actions"><a class="btn btn-outline btn-sm" href="../prop-061-upload-property-report/index.html?id=' + p.id + '">Upload</a></td></tr>';
  }).join('');
})();
