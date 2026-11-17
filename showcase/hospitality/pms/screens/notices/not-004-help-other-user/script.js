(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  document.getElementById('f-notice').value = params.get('id') || 'NOT-1001';
  document.getElementById('f-user').innerHTML = MM.MOCK_STAFF.map(function (s) { return '<option>' + s.name + '</option>'; }).join('');

  var form = document.getElementById('help-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Reassigning...', function () {
      MM.showToast('Task reassigned');
      setTimeout(function () { window.location.href = '../not-002-notice-task-list/index.html'; }, 600);
    });
  });
})();
