(function () {
  'use strict';

  var bookingId = GST.getActiveBookingId();
  var booking = GST.getBooking(bookingId);

  var HAPPENINGS = [
    { name: 'Quayside Isle', note: 'Every evening, a 5-minute walk from the villa — waterfront dining and live music.' },
    { name: 'Mid-Autumn Festival season', note: 'Lantern displays and mooncake stalls appear island-wide from mid-September — popular restaurants book out early, check ahead.' },
    { name: 'Full moon beach gatherings', note: 'Casual beach bar events along Tanjong Beach on clear evenings — ask your concierge for the next date.' }
  ];

  var TIPS = [
    { icon: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', text: 'Currency is the Singapore Dollar (SGD) — most restaurants accept card, but keep some cash for hawker centres and taxis.' },
    { icon: '<path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l8.42 8.42 8.42-8.42a5.4 5.4 0 0 0 0-7.65z"/>', text: 'Tipping isn\'t obligatory — most restaurants already add a 10% service charge — but a small note for your housekeeping team is appreciated.' },
    { icon: '<path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z"/>', text: 'Dress modestly (shoulders &amp; knees covered) when visiting temples such as the Buddha Tooth Relic Temple.' },
    { icon: '<path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/>', text: 'Peak traffic on the Sentosa Gateway is 17:00–19:00 — build in extra time for evening dinner reservations.' }
  ];

  document.getElementById('local-happenings').innerHTML = HAPPENINGS.map(function (h) {
    return '<div class="info-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/></svg><div class="info-row__text"><strong>' + h.name + '</strong><br><span class="text-muted">' + h.note + '</span></div></div>';
  }).join('');

  document.getElementById('good-to-know').innerHTML = TIPS.map(function (t) {
    return '<div class="info-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">' + t.icon + '</svg><div class="info-row__text">' + t.text + '</div></div>';
  }).join('');

  if (booking) {
    document.getElementById('holidays-sub').textContent = 'A few things worth knowing between ' + GST.fmtDate(booking.checkIn) + ' and ' + GST.fmtDate(booking.checkOut) + '.';
  }
})();
