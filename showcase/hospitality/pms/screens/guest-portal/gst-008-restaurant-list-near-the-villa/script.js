(function () {
  'use strict';

  var bookingId = GST.getActiveBookingId();
  var booking = GST.getBooking(bookingId);
  var villa = booking ? GST.getVilla(booking.propertyId) : GST.getVilla('PV-101');

  document.getElementById('restaurants-sub').textContent = 'Hand-picked spots within a short walk of ' + villa.name + '.';

  var TILE_CLASSES = ['photo-tile--a', 'photo-tile--c', 'photo-tile--b', 'photo-tile--d'];

  function cardHtml(r, i) {
    return (
      '<div class="card restaurant-card hoverable" data-open-restaurant="' + r.id + '" tabindex="0" role="button">' +
        '<div class="photo-tile ' + TILE_CLASSES[i % TILE_CLASSES.length] + '">' +
          '<svg class="photo-tile__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2M7 2v20M17 2a5 5 0 0 0-5 5v6h5m0-11v20"/></svg>' +
          '<div><div class="photo-tile__label">' + r.name + '</div><div class="photo-tile__sub">' + r.cuisine + '</div></div>' +
        '</div>' +
        '<div class="restaurant-card__body">' +
          GST.starsHtml(r.rating) +
          '<p class="text-sm text-muted" style="margin:2px 0 0;">' + r.description + '</p>' +
          '<div class="restaurant-card__meta">' + r.distanceM + 'm from the villa &middot; ' + r.hours + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  document.getElementById('restaurant-grid').innerHTML = GST.RESTAURANTS.map(cardHtml).join('');

  document.querySelectorAll('[data-open-restaurant]').forEach(function (el) {
    el.addEventListener('click', function () {
      GST.setActiveRestaurantId(el.getAttribute('data-open-restaurant'));
      window.location.href = '../gst-009-restaurant-details/index.html';
    });
  });
})();
