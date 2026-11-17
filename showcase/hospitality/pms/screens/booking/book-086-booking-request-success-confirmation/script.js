(function () {
  'use strict';
  var params = new URLSearchParams(window.location.search);
  var villa = params.get('villa') || 'the villa';
  var name = params.get('name') || '';
  var checkin = params.get('checkin') || '';
  var checkout = params.get('checkout') || '';

  document.getElementById('confirm-text').textContent = 'Your booking request for ' + villa + ' has been sent to the villa owner.';
  document.getElementById('confirm-detail').innerHTML = [
    ['Villa', villa], ['Guest', name || '—'], ['Check-in', checkin || '—'], ['Check-out', checkout || '—']
  ].map(function (row) { return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>'; }).join('');
})();
