(function () {
  'use strict';
  document.getElementById('list-tbody').innerHTML = MM.MOCK_STAFF.map(function (s, i) {
    var late = i === 1;
    return '<tr><td class="cell-strong">' + s.name + '</td><td class="cell-sub">' + s.role + '</td><td>' + (late ? '09:14' : '08:58') + '</td><td>18:0' + (2 + i) + '</td>' +
      '<td>' + (late ? '<span class="badge badge-warning">Late</span>' : '<span class="badge badge-success">On Time</span>') + '</td></tr>';
  }).join('');
})();
