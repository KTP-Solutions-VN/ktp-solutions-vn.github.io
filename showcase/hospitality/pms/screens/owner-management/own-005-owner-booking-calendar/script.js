(function () {
  'use strict';
  document.getElementById('cal-tbody').innerHTML = MM.MOCK_PROPERTIES.map(function (p, i) {
    var cells = [0, 1, 2, 3].map(function (d) {
      var booked = (i + d) % 3 !== 0;
      return '<td><span class="cal-cell ' + (booked ? 'booked' : 'vacant') + '"></span></td>';
    }).join('');
    return '<tr><td class="cell-strong">' + p.name + '</td>' + cells + '</tr>';
  }).join('');

  document.getElementById('export-btn').addEventListener('click', function () {
    MM.showToast('Booking calendar exported');
  });
})();
