(function () {
  'use strict';
  var params = new URLSearchParams(window.location.search);
  var office = MM.BU.OFFICES.find(function (o) { return o.id === params.get('id'); }) || MM.BU.OFFICES[0];
  document.getElementById('office-name').textContent = office.name;
  document.getElementById('v-bu').textContent = office.bu;
  document.getElementById('v-phone').textContent = office.phone;
  document.getElementById('v-address').textContent = office.address;
  document.getElementById('edit-office-link').href = '../bu-015-office-list/index.html?edit=' + encodeURIComponent(office.id);
})();
