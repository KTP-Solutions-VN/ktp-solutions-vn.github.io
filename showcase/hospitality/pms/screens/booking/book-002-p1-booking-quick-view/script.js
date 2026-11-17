document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id') || 'BK-10231';
  var b = MM.BOOK.getBookingById(id);

  if (!b) {
    document.getElementById('bk-content').hidden = true;
    document.getElementById('bk-not-found').hidden = false;
    return;
  }

  document.getElementById('bk-title').textContent = 'Booking ' + b.id;
  document.getElementById('bk-subtitle').textContent = b.property + ' — booked via ' + (b.referer || 'Direct');
  document.getElementById('bk-status-badge').innerHTML = MM.BOOK.statusBadge(b.status);
  document.getElementById('full-details-link').href = '../book-028-booking-details-full/index.html?id=' + encodeURIComponent(b.id);

  var nights = MM.BOOK.nights(b.checkIn, b.checkOut);
  var commission = b.commission || 0;
  var net = (b.amount || b.total || 0) - commission;

  function field(label, value, cls) {
    return '<div><div class="detail-field__label">' + label + '</div><div class="detail-field__value' + (cls ? ' ' + cls : '') + '">' + value + '</div></div>';
  }

  document.getElementById('bk-details-grid').innerHTML = [
    field('Booking Code', b.id),
    field('Booking Channel', b.referer || '—'),
    field('Booking Date', MM.BOOK.fmtDateTime(b.bookingDate)),
    field('Check-in', MM.BOOK.fmtDate(b.checkIn)),
    field('Check-out', MM.BOOK.fmtDate(b.checkOut)),
    field('Nights', nights),
    field('Amount', MM.BOOK.fmtMoney(b.amount || b.total), 'money'),
    field('OTA Commission', MM.BOOK.fmtMoney(commission), 'money'),
    field('Net Amount', MM.BOOK.fmtMoney(net), 'money')
  ].join('');

  document.getElementById('bk-guest-grid').innerHTML = [
    field('Guest', b.guest),
    field('Language', b.country === 'United Kingdom' ? 'English' : (b.country ? 'N/A' : 'N/A')),
    field('Total Guests', (b.adults || 0) + (b.children || 0)),
    field('Adults', b.adults != null ? b.adults : '—'),
    field('Children', b.children != null ? b.children : '—'),
    field('Mobile', b.mobile || '—')
  ].join('');
});
