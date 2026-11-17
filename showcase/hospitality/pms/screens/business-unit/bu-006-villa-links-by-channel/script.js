(function () {
  'use strict';

  // BU name -> matches MM.MOCK_PROPERTIES `bu` field from assets/js/global.js
  var OTA_LINKS = {
    'PV-101': 'https://www.airbnb.com/rooms/villa-sapphire-cliff',
    'PV-102': 'https://www.airbnb.com/rooms/villa-coral-horizon',
    'PV-103': null,
    'PV-104': 'https://www.booking.com/hotel/villa-azure-ridge.html',
    'PV-105': null,
    'PV-106': 'https://www.airbnb.com/rooms/villa-lotus-terrace',
    'PV-107': null,
    'PV-108': 'https://www.booking.com/hotel/villa-silver-tide.html'
  };

  function render() {
    var buFilter = document.getElementById('bu-filter').value;
    var properties = (window.MM && MM.MOCK_PROPERTIES) ? MM.MOCK_PROPERTIES : [];
    var rows = properties.filter(function (p) { return !buFilter || p.bu === buFilter; });

    var grid = document.getElementById('villa-grid');
    grid.innerHTML = rows.map(function (p) {
      var link = OTA_LINKS[p.id];
      var initials = p.name.split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
      var linkHtml = link
        ? '<a class="villa-link-card__link" href="' + link + '" target="_blank" rel="noopener">' +
            '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Open OTA link</a>'
        : '<span class="villa-link-card__link no-link">No OTA link set</span>';
      return '<div class="villa-link-card">' +
        '<div class="villa-link-card__thumb">' + initials + '</div>' +
        '<div class="villa-link-card__body">' +
          '<div class="villa-link-card__name">' + p.name + '</div>' +
          '<div class="text-xs text-muted" style="margin-bottom:6px;">' + p.bu + '</div>' +
          linkHtml +
        '</div>' +
      '</div>';
    }).join('');

    document.getElementById('villa-empty').hidden = rows.length > 0;
    document.getElementById('villa-result-count').textContent = rows.length + ' villas';
  }

  document.getElementById('bu-filter').addEventListener('change', render);
  render();
})();
