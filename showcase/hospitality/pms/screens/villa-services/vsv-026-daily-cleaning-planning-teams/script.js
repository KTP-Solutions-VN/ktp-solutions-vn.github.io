(function () {
  'use strict';
  document.getElementById('list-tbody').innerHTML = MM.MOCK_BOOKINGS.filter(function (b) { return b.checkOut === '2026-08-25' || b.status === 'checked-in'; }).map(function (b, i) {
    var status = ['Pending', 'In Progress', 'Completed'][i % 3];
    var cls = status === 'Completed' ? 'badge-success' : status === 'In Progress' ? 'badge-warning' : 'badge-neutral';
    return '<tr><td class="cell-strong">' + b.property + '</td><td class="cell-sub">' + VSV.CLEANING_STAFF[i % VSV.CLEANING_STAFF.length] + '</td><td>11:00</td><td><span class="badge ' + cls + '">' + status + '</span></td></tr>';
  }).join('') || '<tr><td colspan="4" class="text-muted text-sm">No turnover cleaning scheduled today.</td></tr>';
})();
