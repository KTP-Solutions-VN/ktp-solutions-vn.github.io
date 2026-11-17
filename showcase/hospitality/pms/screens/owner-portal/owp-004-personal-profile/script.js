(function () {
  'use strict';
  var profileForm = document.getElementById('profile-form');
  MM.bindFormValidation(profileForm);
  profileForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(profileForm)) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () { MM.showToast('Profile updated'); });
  });

  var pwdForm = document.getElementById('pwd-form');
  MM.bindFormValidation(pwdForm);
  pwdForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(pwdForm)) return;
    MM.simulateSave(document.getElementById('save-pwd-btn'), 'Updating...', function () { MM.showToast('Password updated'); pwdForm.reset(); });
  });
})();
