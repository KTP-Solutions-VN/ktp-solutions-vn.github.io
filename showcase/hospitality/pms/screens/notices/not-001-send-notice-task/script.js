(function () {
  'use strict';
  document.getElementById('f-to').innerHTML = MM.MOCK_STAFF.map(function (s) { return '<option>' + s.name + '</option>'; }).join('');
  document.getElementById('f-property').innerHTML = MM.MOCK_PROPERTIES.map(function (p) { return '<option>' + p.name + '</option>'; }).join('');
  var form = document.getElementById('notice-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Sending...', function () {
      MM.showToast('Notice sent');
      setTimeout(function () { window.location.href = '../not-002-notice-task-list/index.html'; }, 600);
    });
  });
})();
