(function () {
  'use strict';

  var bookingId = GST.getActiveBookingId();
  var booking = GST.getBooking(bookingId);

  // Legacy behavior: an invalid/missing booking_id redirects back to the
  // booking list rather than showing a broken hub page.
  if (!booking) { window.location.href = '../gst-002-guest-booking-list/index.html'; return; }

  var villa = GST.getVilla(booking.propertyId);
  var firstName = GST.GUEST.name.split(' ')[0];

  document.getElementById('access-heading').textContent = "You're all set, " + firstName;
  document.getElementById('access-sub').textContent = 'Everything for your stay at ' + villa.name + ' is right here.';
  document.getElementById('concierge-name').textContent = villa.concierge;
  var phoneLink = document.getElementById('concierge-phone-link');
  phoneLink.textContent = villa.conciergePhone;
  phoneLink.href = 'tel:' + villa.conciergePhone.replace(/\s+/g, '');
})();
