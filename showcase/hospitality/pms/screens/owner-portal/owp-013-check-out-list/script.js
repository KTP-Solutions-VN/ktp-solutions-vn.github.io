(function () {
  'use strict';
  var owner = MM.MOCK_OWNERS[0];
  var myProps = MM.MOCK_PROPERTIES.filter(function (p) { return owner.properties.indexOf(p.id) !== -1; }).map(function (p) { return p.name; });
  document.getElementById('list-tbody').innerHTML = MM.MOCK_BOOKINGS.filter(function (b) { return myProps.indexOf(b.property) !== -1 && b.status !== 'cancelled'; }).map(function (b) {
    return '<tr><td class="cell-strong">' + b.id + '</td><td>' + b.property + '</td><td>' + b.guest + '</td><td class="cell-sub">' + b.checkOut + '</td></tr>';
  }).join('') || '<tr><td colspan="4" class="text-muted text-sm">No upcoming check-outs.</td></tr>';
})();
