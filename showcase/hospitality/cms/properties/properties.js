/* Properties screen behaviour — renders mock property cards, opens detail modal. */

(function () {
  'use strict';

  var PROPERTIES = [
    { name: 'Villa Andaman Breeze', type: 'Villa', location: 'Phuket, Thailand', rooms: 4, status: 'active', tags: ['Beachfront', 'Pool Villa'], channels: ['bdc', 'abnb', 'agoda'] },
    { name: 'Aegean Sunset Villa', type: 'Villa', location: 'Santorini, Greece', rooms: 1, status: 'active', tags: ['Sea View', 'Romantic'], channels: ['bdc', 'abnb'] },
    { name: 'Sunset Cove Bungalow', type: 'Bungalow', location: 'Key West, Florida', rooms: 2, status: 'active', tags: ['Family Friendly'], channels: ['bdc', 'expedia'] },
    { name: 'Palm Grove Residence', type: 'Residence', location: 'Nassau, Bahamas', rooms: 3, status: 'active', tags: ['Beachfront', 'Long Stay'], channels: ['abnb', 'agoda'] },
    { name: 'Caribbean Blue Villa', type: 'Villa', location: 'Punta Cana, Dominican Republic', rooms: 5, status: 'inactive', tags: ['Pool Villa'], channels: ['bdc'] },
    { name: 'Sunshine Coast Bungalow', type: 'Bungalow', location: 'Phuket, Thailand', rooms: 2, status: 'active', tags: ['Beachfront'], channels: ['bdc', 'abnb', 'expedia'] }
  ];

  var CHANNEL_LABEL = { bdc: 'B', abnb: 'A', agoda: 'Ag', expedia: 'Ex' };
  var CHANNEL_NAME = { bdc: 'Booking.com', abnb: 'Airbnb', agoda: 'Agoda', expedia: 'Expedia' };

  var grid = document.getElementById('property-grid');

  PROPERTIES.forEach(function (p) {
    var card = document.createElement('div');
    card.className = 'property-card';

    var channelsHtml = p.channels.map(function (c) {
      return '<div class="channel-dot ' + c + '" title="' + CHANNEL_NAME[c] + '">' + CHANNEL_LABEL[c] + '</div>';
    }).join('');

    var tagsHtml = p.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('');

    card.innerHTML =
      '<div class="property-card__image">' + p.type +
        '<span class="property-card__status"><span class="badge ' + (p.status === 'active' ? 'badge-success' : 'badge-neutral') + '">' + (p.status === 'active' ? 'Active' : 'Inactive') + '</span></span>' +
      '</div>' +
      '<div class="property-card__body">' +
        '<div class="property-card__name">' + p.name + '</div>' +
        '<div class="property-card__meta">' + p.location + ' &middot; ' + p.rooms + ' room' + (p.rooms > 1 ? 's' : '') + '</div>' +
        '<div class="property-card__tags">' + tagsHtml + '</div>' +
        '<div class="property-card__footer">' +
          '<div class="property-card__channels">' + channelsHtml + '</div>' +
          '<button class="btn btn-sm btn-outline">Manage</button>' +
        '</div>' +
      '</div>';

    card.addEventListener('click', function (e) {
      if (e.target.closest('button')) return;
      openDetail(p);
    });

    card.querySelector('button').addEventListener('click', function (e) {
      e.stopPropagation();
      openDetail(p);
    });

    grid.appendChild(card);
  });

  function openDetail(p) {
    document.getElementById('pd-name').textContent = p.name;
    document.getElementById('pd-location').textContent = p.location + ' · ' + p.rooms + ' room' + (p.rooms > 1 ? 's' : '');
    window.CM.openModal('modal-property-detail');
  }
})();
