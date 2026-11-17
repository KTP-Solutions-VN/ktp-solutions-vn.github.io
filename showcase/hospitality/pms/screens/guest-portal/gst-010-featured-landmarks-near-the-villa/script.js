(function () {
  'use strict';

  var bookingId = GST.getActiveBookingId();
  var booking = GST.getBooking(bookingId);

  // Legacy behavior: an invalid/missing booking_id redirects back to the booking list.
  if (!booking) { window.location.href = '../gst-002-guest-booking-list/index.html'; return; }

  var villa = GST.getVilla(booking.propertyId);
  document.getElementById('landmarks-sub').textContent = 'A few of our favourite spots around ' + villa.district + ', close to ' + villa.name + '.';

  var TILE_CLASSES = ['photo-tile--b', 'photo-tile--a', 'photo-tile--c', 'photo-tile--d'];

  document.getElementById('landmark-grid').innerHTML = GST.LANDMARKS.map(function (lm, i) {
    return (
      '<div class="card landmark-card">' +
        '<div class="photo-tile ' + TILE_CLASSES[i % TILE_CLASSES.length] + '">' +
          '<svg class="photo-tile__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3 4 8l4 5-4 5 4 3M16 3l4 5-4 5 4 5-4 3"/></svg>' +
          '<div class="photo-tile__label">' + lm.name + '</div>' +
        '</div>' +
        '<div class="landmark-card__body"><p>' + lm.blurb + '</p></div>' +
      '</div>'
    );
  }).join('');
})();
