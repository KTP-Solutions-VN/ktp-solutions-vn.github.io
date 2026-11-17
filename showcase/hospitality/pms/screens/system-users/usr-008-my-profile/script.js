(function () {
  'use strict';

  /* ---------------------------------------------------------------- */
  /* Profile form                                                       */
  /* ---------------------------------------------------------------- */

  var form = document.getElementById('profile-form');
  var saveBtn = document.getElementById('save-profile-btn');
  MM.bindFormValidation(form);

  // Load any previously saved profile edits for this demo session.
  (function loadSavedProfile() {
    var saved = JSON.parse(localStorage.getItem('mm_usr_my_profile') || 'null');
    if (!saved) return;
    document.getElementById('first_name').value = saved.firstName;
    document.getElementById('family_name').value = saved.familyName;
    document.getElementById('nationality').value = saved.nationality;
    document.getElementById('email').value = saved.email;
    document.getElementById('phone_number').value = saved.phone;
  })();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) {
      MM.showToast('Please fix the highlighted fields.', { danger: true });
      return;
    }
    MM.simulateSave(saveBtn, 'Saving...', function () {
      localStorage.setItem('mm_usr_my_profile', JSON.stringify({
        firstName: document.getElementById('first_name').value.trim(),
        familyName: document.getElementById('family_name').value.trim(),
        nationality: document.getElementById('nationality').value,
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone_number').value.trim()
      }));
      MM.showToast('Profile updated.');
    });
  });

  /* ---------------------------------------------------------------- */
  /* USR-008-P1 — Change Password                                       */
  /* ---------------------------------------------------------------- */

  var pwdForm = document.getElementById('change-password-form');
  var pwdError = document.getElementById('pwd-error');
  var pwdBtn = document.getElementById('change-password-btn');
  MM.bindFormValidation(pwdForm);

  pwdBtn.addEventListener('click', function () {
    pwdError.hidden = true;
    if (!MM.validateForm(pwdForm)) return;

    var oldPwd = document.getElementById('old_password').value;
    var newPwd = document.getElementById('new_password').value;
    var confirmPwd = document.getElementById('confirm_password').value;

    if (newPwd !== confirmPwd) {
      var group = document.getElementById('confirm_password').closest('.form-group');
      group.classList.add('has-error');
      group.querySelector('.form-error').textContent = 'Passwords do not match.';
      return;
    }

    MM.simulateSave(pwdBtn, 'Changing...', function () {
      if (oldPwd === 'wrongpass') {
        pwdError.hidden = false;
        return;
      }
      MM.closeModal('change-password-modal');
      MM.showToast('Password changed — signing you out...');
      setTimeout(function () {
        window.location.href = '../../auth/log-001-login/index.html';
      }, 1200);
    });
  });
})();
