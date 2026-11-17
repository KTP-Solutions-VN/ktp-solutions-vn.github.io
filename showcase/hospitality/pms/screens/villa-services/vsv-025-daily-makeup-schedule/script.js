(function () {
  'use strict';
  document.getElementById('list-tbody').innerHTML = MM.MOCK_BOOKINGS.filter(function (b) { return b.status === 'checked-in' || b.status === 'confirmed'; }).map(function (b, i) {
    var pct = [30, 65, 100][i % 3];
    return '<tr><td class="cell-strong">' + b.property + '</td><td>' + b.guest + '</td><td class="cell-sub">' + VSV.CLEANING_STAFF[i % VSV.CLEANING_STAFF.length] + '</td>' +
      '<td><div class="ren-budget-bar" style="width:120px;height:6px;border-radius:999px;background:var(--color-gray-100);overflow:hidden;"><div style="height:100%;width:' + pct + '%;background:' + (pct === 100 ? 'var(--color-success)' : 'var(--color-primary)') + ';"></div></div><span class="cell-sub"> ' + pct + '%</span></td></tr>';
  }).join('') || '<tr><td colspan="4" class="text-muted text-sm">No makeup cleaning scheduled today.</td></tr>';
})();
