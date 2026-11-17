(function () {
  'use strict';

  var restaurant = GST.getRestaurant(GST.getActiveRestaurantId()) || GST.RESTAURANTS[0];

  document.getElementById('crumb-name').textContent = restaurant.name;
  document.getElementById('rest-name').textContent = restaurant.name;
  document.getElementById('rest-cuisine').innerHTML = restaurant.cuisine + ' &middot; ' + restaurant.distanceM + 'm from the villa';
  document.getElementById('rest-rating').innerHTML = GST.starsHtml(restaurant.rating);
  document.getElementById('rest-description').textContent = restaurant.description;
  document.getElementById('rest-address').textContent = restaurant.address;
  document.getElementById('rest-hours').textContent = restaurant.hours;
  document.getElementById('rest-map-link').href = restaurant.mapUrl;

  var phoneRow = document.getElementById('rest-phone-row');
  var phoneLink = document.getElementById('rest-phone');
  if (restaurant.phone) {
    phoneLink.textContent = restaurant.phone;
    phoneLink.href = 'tel:' + restaurant.phone.replace(/\s+/g, '');
  } else {
    phoneRow.hidden = true;
  }

  var menuLink = document.getElementById('rest-menu-link');
  if (restaurant.menuUrl) {
    menuLink.href = restaurant.menuUrl;
  } else {
    menuLink.classList.add('btn-ghost');
    menuLink.removeAttribute('href');
    menuLink.style.pointerEvents = 'none';
    menuLink.style.opacity = '0.5';
    menuLink.lastChild.textContent = ' Menu not available online';
  }

  var GALLERY_VIEWS = [
    { label: 'Dining Room', cls: 'photo-tile--a' },
    { label: 'Terrace View', cls: 'photo-tile--c' },
    { label: 'Signature Dish', cls: 'photo-tile--b' }
  ];

  function renderGallery(activeIndex) {
    var main = '<div class="rest-gallery__main"><div class="photo-tile ' + GALLERY_VIEWS[activeIndex].cls + '"><div><div class="photo-tile__label">' + restaurant.name + '</div><div class="photo-tile__sub">' + GALLERY_VIEWS[activeIndex].label + '</div></div></div></div>';
    var thumbs = '<div class="rest-gallery__thumbs">' + GALLERY_VIEWS.map(function (v, i) {
      return '<button type="button" class="rest-gallery__thumb ' + v.cls + (i === activeIndex ? ' active' : '') + '" data-gallery-index="' + i + '">' + v.label + '</button>';
    }).join('') + '</div>';
    document.getElementById('rest-gallery').innerHTML = main + thumbs;

    document.querySelectorAll('[data-gallery-index]').forEach(function (btn) {
      btn.addEventListener('click', function () { renderGallery(parseInt(btn.getAttribute('data-gallery-index'), 10)); });
    });
  }
  renderGallery(0);
})();
