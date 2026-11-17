(function () {
  'use strict';
  var params = new URLSearchParams(window.location.search);
  var p = MM.MOCK_PROPERTIES.find(function (d) { return d.id === params.get('id'); }) || MM.MOCK_PROPERTIES[0];
  document.getElementById('prop-sub').textContent = p.name;

  document.querySelectorAll('[data-svc]').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelectorAll('[data-svc]').forEach(function (i) { i.classList.toggle('active', i === item); });
    });
  });

  var form = document.getElementById('svc-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () { MM.showToast('Setting saved'); });
  });
})();
