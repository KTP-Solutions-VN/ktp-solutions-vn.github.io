(function () {
  'use strict';
  function render() {
    document.getElementById('report-tbody').innerHTML = MM.MOCK_BOOKINGS.map(function (b) {
      var gross = b.total, commission = Math.round(gross * 0.15), net = gross - commission, payout = Math.round(net * 0.8);
      return '<tr><td class="cell-strong">' + b.id + '</td><td class="cell-sub">Booking.com</td><td>' + b.guest + '</td>' +
        '<td class="cell-num">$' + gross.toLocaleString() + '</td><td class="cell-num">$' + commission.toLocaleString() + '</td>' +
        '<td class="cell-num">$' + net.toLocaleString() + '</td><td class="cell-num">$' + payout.toLocaleString() + '</td></tr>';
    }).join('');
  }
  render();
  document.getElementById('generate-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Generating...', function () { render(); MM.showToast('Report generated'); });
  });
  document.getElementById('export-btn').addEventListener('click', function () { MM.showToast('Report exported to Excel'); });
})();
