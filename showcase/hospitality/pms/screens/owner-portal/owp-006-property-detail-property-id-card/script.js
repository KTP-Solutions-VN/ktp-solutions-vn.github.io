(function () {
  'use strict';
  var params = new URLSearchParams(window.location.search);
  var p = MM.MOCK_PROPERTIES.find(function (d) { return d.id === params.get('id'); }) || MM.MOCK_PROPERTIES[0];
  document.getElementById('prop-name').textContent = p.name;
  document.getElementById('p-bedrooms').textContent = p.bedrooms;
  document.getElementById('p-bu').textContent = p.bu;
  document.getElementById('p-concierge').textContent = p.concierge || 'Not yet assigned';
  document.getElementById('p-status').innerHTML = '<span class="badge badge-success">Active</span>';
})();
