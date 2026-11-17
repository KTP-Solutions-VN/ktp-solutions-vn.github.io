(function () {
  'use strict';
  var BOOK = MM.BOOK;

  var params = new URLSearchParams(window.location.search);
  var bookingId = params.get('booking_id') || params.get('id');
  var booking = bookingId ? BOOK.getBookingById(bookingId) : null;
  if (!booking) booking = BOOK.getAllBookings()[0];

  document.getElementById('booking-summary').innerHTML = [
    ['Booking Date', BOOK.fmtDate ? BOOK.fmtDate(booking.bookingDate || booking.checkIn) : (booking.bookingDate || '').slice(0, 10)],
    ['Check In Date', booking.checkIn], ['Check Out Date', booking.checkOut],
    ['Property Name', booking.property], ['Guest Name', booking.guest],
    ['Guest Phone Number', booking.mobile || booking.phone || '—']
  ].map(function (row) { return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>'; }).join('');

  document.getElementById('sf-status').innerHTML = (BOOK.SHA_STATUSES || ['Unknown']).map(function (s) { return '<option>' + s + '</option>'; }).join('');

  var current = BOOK.getShaStatus(booking.id);
  document.getElementById('sf-status').value = current.status;
  document.getElementById('sf-comments').value = current.comments;

  var shaForm = document.getElementById('sha-form');
  MM.bindFormValidation(shaForm);
  document.getElementById('sha-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(shaForm)) return;
    MM.simulateSave(document.getElementById('sha-save-btn'), 'Saving...', function () {
      BOOK.saveShaStatus(booking.id, {
        status: document.getElementById('sf-status').value,
        comments: document.getElementById('sf-comments').value.trim()
      });
      MM.showToast('SHA+ status updated');
      setTimeout(function () { window.location.href = '../book-002-booking-list/index.html'; }, 600);
    });
  });
})();
