(function () {
  'use strict';
  var statusMap = { confirmed: 'badge-info', 'checked-in': 'badge-success', pending: 'badge-warning', cancelled: 'badge-danger' };
  document.getElementById('cal-tbody').innerHTML = MM.MOCK_BOOKINGS.filter(function (b) { return b.property === 'Villa Sapphire Cliff'; }).map(function (b) {
    return '<tr><td class="cell-strong">' + b.id + '</td><td>' + b.guest + '</td><td class="cell-sub">' + b.checkIn + '</td><td class="cell-sub">' + b.checkOut + '</td><td><span class="badge ' + (statusMap[b.status] || 'badge-neutral') + '">' + b.status + '</span></td></tr>';
  }).join('') || '<tr><td colspan="5" class="text-muted text-sm">No bookings for this property yet.</td></tr>';
})();
