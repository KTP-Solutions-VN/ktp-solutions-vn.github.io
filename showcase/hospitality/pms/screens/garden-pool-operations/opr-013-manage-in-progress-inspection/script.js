(function () {
  'use strict';
  document.getElementById('points-tbody').innerHTML = MM.OPR.INSPECTION_ITEMS.slice(0, 2).map(function (item, i) {
    return '<tr><td class="cell-strong">' + item + '</td><td>' + MM.OPR.INSPECTION_AREAS[i] + '</td><td class="cell-sub">Photo captured</td>' +
      '<td class="row-actions"><a class="btn btn-ghost btn-sm" href="../opr-011-perform-villa-inspection-by-point/index.html">Edit</a></td></tr>';
  }).join('');
})();
