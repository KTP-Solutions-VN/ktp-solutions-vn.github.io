(function () {
  'use strict';
  var form = document.getElementById('reset-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    if (document.getElementById('f-password').value !== document.getElementById('f-confirm').value) {
      document.getElementById('f-confirm').closest('.form-group').classList.add('has-error');
      document.getElementById('f-confirm').closest('.form-group').querySelector('.form-error').textContent = 'Passwords do not match.';
      return;
    }
    MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
      MM.showToast('Password updated — sign in with your new password');
      setTimeout(function () { window.location.href = '../owp-001-login/index.html'; }, 800);
    });
  });
})();
