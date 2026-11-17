(function () {
  'use strict';
  var BOOK = MM.BOOK;

  var params = new URLSearchParams(window.location.search);
  var villaId = params.get('villa_id') || (MM.MOCK_PROPERTIES[0] && MM.MOCK_PROPERTIES[0].id);
  var villa = MM.MOCK_PROPERTIES.filter(function (p) { return p.id === villaId; })[0] || MM.MOCK_PROPERTIES[0];
  var minStay = (BOOK.VILLA_META && BOOK.VILLA_META[villa.id] && BOOK.VILLA_META[villa.id].minStay) || 2;

  document.getElementById('villa-name').textContent = villa.name;
  document.getElementById('villa-tagline').textContent = villa.bedrooms + ' bedrooms · ' + villa.bu;
  document.getElementById('greeting-text').textContent = 'Thank you for your interest in booking with us — ' + villa.name + '. Please fill in your details below and we will confirm availability shortly.';
  document.getElementById('min-stay-note').textContent = 'Minimum stay for this villa: ' + minStay + ' night' + (minStay === 1 ? '' : 's') + '.';

  /* Pre-fill from a 30-day "cookie" (simulated via localStorage) */
  var prefill = JSON.parse(localStorage.getItem('mm_enquiry_prefill') || '{}');
  if (prefill.first) document.getElementById('ef-first').value = prefill.first;
  if (prefill.last) document.getElementById('ef-last').value = prefill.last;
  if (prefill.phone) document.getElementById('ef-phone').value = prefill.phone;
  if (prefill.email) document.getElementById('ef-email').value = prefill.email;

  function overlaps(aStart, aEnd, bStart, bEnd) {
    return new Date(aStart) < new Date(bEnd) && new Date(bStart) < new Date(aEnd);
  }

  var form = document.getElementById('enquiry-form');
  MM.bindFormValidation(form);

  document.getElementById('submit-enquiry-btn').addEventListener('click', function () {
    if (!MM.validateForm(form)) return;
    var checkin = document.getElementById('ef-checkin').value;
    var checkout = document.getElementById('ef-checkout').value;
    if (new Date(checkout) <= new Date(checkin)) {
      var g = document.getElementById('ef-checkout').closest('.form-group');
      g.classList.add('has-error');
      g.querySelector('.form-error').textContent = 'Check-out must be after check-in.';
      return;
    }
    var nights = Math.round((new Date(checkout) - new Date(checkin)) / 86400000);
    if (nights < minStay) {
      MM.showToast('Minimum stay for this villa is ' + minStay + ' nights', { danger: true });
      return;
    }
    var existing = BOOK.getAllBookings().filter(function (b) { return b.property === villa.name; });
    var clash = existing.some(function (b) { return overlaps(checkin, checkout, b.checkIn, b.checkOut); });
    document.getElementById('overlap-warning').hidden = !clash;
    if (clash) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }

    var first = document.getElementById('ef-first').value.trim();
    var last = document.getElementById('ef-last').value.trim();
    var phone = document.getElementById('ef-phone').value.trim();
    var email = document.getElementById('ef-email').value.trim();
    localStorage.setItem('mm_enquiry_prefill', JSON.stringify({ first: first, last: last, phone: phone, email: email }));

    MM.simulateSave(document.getElementById('submit-enquiry-btn'), 'Sending...', function () {
      var q = new URLSearchParams({ villa: villa.name, name: first + ' ' + last, checkin: checkin, checkout: checkout }).toString();
      window.location.href = '../book-086-booking-request-success-confirmation/index.html?' + q;
    });
  });
})();
