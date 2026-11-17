(function () {
  'use strict';
  var owner = MM.MOCK_OWNERS[0];
  var myProps = MM.MOCK_PROPERTIES.filter(function (p) { return owner.properties.indexOf(p.id) !== -1; });
  document.getElementById('props-grid').innerHTML = myProps.map(function (p) {
    return '<div class="card owp-prop-card">' +
      '<div class="owp-prop-card__thumb"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><path d="M9 22V12h6v10"/></svg></div>' +
      '<div><h3 style="margin:0 0 4px;color:var(--color-primary-dark);">' + p.name + '</h3><p class="text-sm text-muted" style="margin:0;">' + p.bedrooms + ' bedrooms &middot; ' + p.bu + '</p></div>' +
      '<div class="owp-prop-card__actions">' +
        '<a class="btn btn-outline btn-sm" href="../owp-006-property-detail-property-id-card/index.html?id=' + p.id + '">View Details</a>' +
        '<a class="btn btn-outline btn-sm" href="../owp-008-property-booking-calendar/index.html?id=' + p.id + '">Calendar</a>' +
        '<a class="btn btn-outline btn-sm" href="../owp-016-monthly-owner-payment-report/index.html?id=' + p.id + '">Payments</a>' +
      '</div></div>';
  }).join('');
})();
