(function () {
  'use strict';
  var owner = MM.MOCK_OWNERS[0];
  var myProps = MM.MOCK_PROPERTIES.filter(function (p) { return owner.properties.indexOf(p.id) !== -1; });
  document.getElementById('f-property').innerHTML = myProps.map(function (p) { return '<option>' + p.name + '</option>'; }).join('');

  var form = document.getElementById('booking-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Adding...', function () {
      MM.showToast('Booking added');
      setTimeout(function () { window.location.href = '../owp-010-booking-list/index.html'; }, 600);
    });
  });
})();
