(function () {
  'use strict';
  var extra = JSON.parse(localStorage.getItem('mm_inv_log_extra') || '[]');
  var data = extra.concat(MM.INV.LOG);
  document.getElementById('list-tbody').innerHTML = data.map(function (l) {
    return '<tr><td class="cell-sub">' + l.date + '</td><td class="cell-strong">' + l.item + '</td><td>' + l.action + '</td><td class="cell-num">' + l.qty + '</td><td class="cell-sub">' + l.by + '</td></tr>';
  }).join('');
})();
