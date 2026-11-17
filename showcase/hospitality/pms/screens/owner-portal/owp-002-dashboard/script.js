(function () {
  'use strict';
  var owner = MM.MOCK_OWNERS[0];
  var myProps = MM.MOCK_PROPERTIES.filter(function (p) { return owner.properties.indexOf(p.id) !== -1; });
  document.getElementById('stat-props').textContent = myProps.length;
  document.getElementById('props-list').innerHTML = myProps.map(function (p) {
    return '<div class="owp-prop-row"><div><div class="cell-strong">' + p.name + '</div><div class="cell-sub">' + p.bedrooms + ' bedrooms &middot; ' + p.bu + '</div></div><span class="badge badge-success">Active</span></div>';
  }).join('');
  document.getElementById('bookings-list').innerHTML = MM.MOCK_BOOKINGS.filter(function (b) { return myProps.some(function (p) { return p.name === b.property; }); }).slice(0, 3).map(function (b) {
    return '<tr><td class="cell-strong">' + b.id + '</td><td>' + b.property + '</td><td class="cell-sub">' + b.checkIn + '</td></tr>';
  }).join('');
})();
