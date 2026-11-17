(function () {
  'use strict';
  var BOOK = MM.BOOK;

  var params = new URLSearchParams(window.location.search);
  var bookingId = params.get('id');
  var booking = bookingId ? BOOK.getBookingById(bookingId) : null;
  var thread = booking ? BOOK.getChatThread(booking.id) : null;

  if (!booking || !thread || !thread.linkedBookingId) {
    booking = BOOK.getBookingById('BK-10239');
    thread = BOOK.getChatThread(booking.id);
  }

  var linkedBooking = BOOK.getBookingById(thread.linkedBookingId);
  var linkedThread = BOOK.getChatThread(thread.linkedBookingId);

  function rows(b, t) {
    return [
      ['Booking Date', (b.bookingDate || '').slice(0, 10) || '—'],
      ['Check-in', b.checkIn], ['Check-out', b.checkOut],
      ['Villa', b.property], ['Guest Name', b.guest],
      ['Phone', (t && t.phone) || b.mobile || '—'],
      ['Nationality', (t && t.country) || b.country || '—']
    ].map(function (row) { return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>'; }).join('');
  }

  document.getElementById('current-summary').innerHTML = rows(booking, thread);
  document.getElementById('linked-summary').innerHTML = linkedBooking ? rows(linkedBooking, linkedThread) : '<p class="text-sm text-muted">Original booking not found.</p>';
})();
