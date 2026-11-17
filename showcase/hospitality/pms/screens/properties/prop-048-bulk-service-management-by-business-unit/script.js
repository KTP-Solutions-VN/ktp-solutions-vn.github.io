(function () {
  'use strict';
  document.getElementById('upload-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Importing...', function () { MM.showToast('Service configuration imported'); });
  });
  document.getElementById('contracts-tbody').innerHTML = MM.MOCK_PROPERTIES.map(function (p, i) {
    var status = i % 3 === 0 ? 'badge-warning" >Missing Info' : i % 3 === 1 ? 'badge-neutral">No Contract' : 'badge-success">Ready';
    return '<tr><td class="cell-strong">' + p.name + '</td><td><span class="badge ' + status + '</span></td></tr>';
  }).join('');
})();
