(function () {
  'use strict';
  document.getElementById('points-tbody').innerHTML = MM.OPR.INSPECTION_ITEMS.map(function (item, i) {
    return '<tr><td class="cell-strong">' + item + '</td><td>' + MM.OPR.INSPECTION_AREAS[i % MM.OPR.INSPECTION_AREAS.length] + '</td><td class="cell-sub">Photo captured</td><td class="cell-sub">No issues found</td></tr>';
  }).join('');
})();
