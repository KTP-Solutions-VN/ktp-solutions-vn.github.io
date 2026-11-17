(function () {
  'use strict';

  var bookingId = GST.getActiveBookingId();
  var booking = GST.getBooking(bookingId);
  var villa = booking ? GST.getVilla(booking.propertyId) : GST.getVilla('PV-101');

  document.getElementById('villa-heading').textContent = villa.name;
  document.getElementById('villa-description').textContent = villa.description;
  document.getElementById('fact-bedrooms').textContent = villa.bedrooms;
  document.getElementById('fact-guests').textContent = villa.maxGuests;
  document.getElementById('fact-address').textContent = villa.address;
  document.getElementById('fact-checkin').textContent = villa.standardCheckIn;
  document.getElementById('fact-checkout').textContent = villa.standardCheckOut;
  document.getElementById('fact-concierge').textContent = villa.concierge;
  var phoneEl = document.getElementById('fact-concierge-phone');
  phoneEl.textContent = villa.conciergePhone;
  phoneEl.href = 'tel:' + villa.conciergePhone.replace(/\s+/g, '');
  document.getElementById('fact-map-link').href = villa.mapUrl;
  document.getElementById('wifi-ssid').textContent = villa.wifiSsid;
  document.getElementById('wifi-password').textContent = villa.wifiPassword;

  var iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>';
  document.getElementById('amenities-list').innerHTML = villa.amenities.map(function (a) {
    return '<div class="info-row">' + iconSvg + '<div class="info-row__text">' + a + '</div></div>';
  }).join('');
})();
