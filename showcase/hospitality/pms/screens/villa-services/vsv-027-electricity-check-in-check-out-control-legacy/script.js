(function () {
  'use strict';
  document.getElementById('checkout-tbody').innerHTML = MM.MOCK_BOOKINGS.filter(function (b) { return b.checkOut === '2026-08-25'; }).map(function (b) {
    return '<tr><td class="cell-strong" style="color:var(--color-danger);">' + b.property + '</td><td>' + b.guest + '</td></tr>';
  }).join('') || '<tr><td colspan="2" class="text-muted text-sm">None missing.</td></tr>';
  document.getElementById('checkin-tbody').innerHTML = MM.MOCK_BOOKINGS.filter(function (b) { return b.status === 'pending'; }).map(function (b) {
    return '<tr><td class="cell-strong" style="color:var(--color-primary-dark);">' + b.property + '</td><td>' + b.guest + '</td></tr>';
  }).join('') || '<tr><td colspan="2" class="text-muted text-sm">None missing.</td></tr>';
  document.getElementById('prev-day-btn').addEventListener('click', function () { MM.showToast('Showing previous day'); });
  document.getElementById('next-day-btn').addEventListener('click', function () { MM.showToast('Showing next day'); });
})();
