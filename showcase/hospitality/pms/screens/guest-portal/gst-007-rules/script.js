(function () {
  'use strict';

  var bookingId = GST.getActiveBookingId();
  var booking = GST.getBooking(bookingId);
  var villa = booking ? GST.getVilla(booking.propertyId) : GST.getVilla('PV-101');

  var ESSENTIALS = [
    { icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>', text: 'Check-in from <strong>' + villa.standardCheckIn + '</strong>, check-out by <strong>' + villa.standardCheckOut + '</strong>.' },
    { icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>', text: 'Maximum occupancy of <strong>' + villa.maxGuests + ' guests</strong> across ' + villa.bedrooms + ' bedrooms — please let us know before your stay if this changes.' },
    { icon: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', text: 'No smoking indoors — a designated outdoor area is available on request.' },
    { icon: '<path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/>', text: 'Pets are welcome by prior arrangement only — please confirm with your concierge before arrival.' },
    { icon: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>', text: 'Quiet hours from <strong>22:00 to 08:00</strong> out of respect for neighbouring villas.' },
    { icon: '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-4"/>', text: 'No parties or events without prior written approval from Azura Stays.' },
    { icon: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>', text: 'Please switch off air-conditioning and lights when leaving the villa.' },
    { icon: '<path d="M20 6 9 17l-5-5"/>', text: 'Before departing, please return villa keys/fobs to the key box and leave used towels in the designated hamper.' }
  ];

  var SAFETY = [
    { text: 'Children must be supervised by an adult at all times around the pool.' },
    { text: 'No diving in the shallow end — depth markers are shown poolside.' },
    { text: 'Pool towels are provided — please keep bath towels for indoor use.' },
    { text: 'The villa\'s first-aid kit is located in the kitchen; dial your concierge for anything more serious.' },
    { text: 'Damage or loss beyond normal wear will be charged to the security deposit on file.' }
  ];

  document.getElementById('rules-essentials').innerHTML = ESSENTIALS.map(function (r) {
    return '<div class="info-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">' + r.icon + '</svg><div class="info-row__text">' + r.text + '</div></div>';
  }).join('');

  document.getElementById('rules-safety').innerHTML = SAFETY.map(function (r) {
    return '<div class="info-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><div class="info-row__text">' + r.text + '</div></div>';
  }).join('');

  if (booking) {
    document.getElementById('rules-sub').textContent = 'Please take a moment to review before your stay at ' + villa.name + ' begins.';
  }
})();
