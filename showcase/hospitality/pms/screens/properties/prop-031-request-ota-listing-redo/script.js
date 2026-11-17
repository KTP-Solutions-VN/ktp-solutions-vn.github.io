(function () {
  'use strict';
  var params = new URLSearchParams(window.location.search);
  var p = MM.MOCK_PROPERTIES.find(function (d) { return d.id === params.get('id'); }) || MM.MOCK_PROPERTIES[0];
  document.getElementById('prop-sub').textContent = 'Redo: ' + p.name;
  var form = document.getElementById('redo-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Sending...', function () {
      MM.showToast('Redo request sent');
      setTimeout(function () { window.location.href = '../prop-040-property-quality/index.html'; }, 600);
    });
  });
})();
