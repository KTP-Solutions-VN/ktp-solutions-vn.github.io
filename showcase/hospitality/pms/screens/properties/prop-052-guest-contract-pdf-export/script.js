(function () {
  'use strict';
  var params = new URLSearchParams(window.location.search);
  var p = MM.MOCK_PROPERTIES.find(function (d) { return d.id === params.get('id'); }) || MM.MOCK_PROPERTIES[0];
  document.getElementById('prop-sub').textContent = p.name;
  document.getElementById('download-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Generating...', function () { MM.showToast('Contract PDF downloaded'); });
  });
})();
