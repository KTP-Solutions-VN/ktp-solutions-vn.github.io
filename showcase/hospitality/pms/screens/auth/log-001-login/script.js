(function () {
  'use strict';

  var loginForm = document.getElementById('login-form');
  var loginMessage = document.getElementById('login_message');
  var submitBtn = document.getElementById('login-submit');
  var passwordInput = document.getElementById('password');
  var toggleBtn = document.getElementById('show_password');

  MM.bindFormValidation(loginForm);

  toggleBtn.addEventListener('click', function () {
    var showing = passwordInput.type === 'text';
    passwordInput.type = showing ? 'password' : 'text';
    toggleBtn.classList.toggle('is-visible', !showing);
    toggleBtn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
  });

  // Demo credential: any username/password works except this one, to show the error state.
  var DEMO_INVALID = { username: 'locked', password: 'locked' };

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    loginMessage.hidden = true;
    if (!MM.validateForm(loginForm)) return;

    var username = document.getElementById('username').value.trim();
    var password = passwordInput.value;

    MM.simulateSave(submitBtn, 'Signing in...', function () {
      if (username === DEMO_INVALID.username && password === DEMO_INVALID.password) {
        loginMessage.hidden = false;
        return;
      }
      localStorage.setItem('mm_current_user', JSON.stringify({ username: username, name: 'Daniel Tan', role: 'Business Unit Manager' }));
      window.location.href = '../../dashboard/index.html';
    });
  });

  // LOG-001-P1: Forgot Password
  var forgotForm = document.getElementById('forgot-form');
  var forgotSubmit = document.getElementById('forgot-submit');
  MM.bindFormValidation(forgotForm);

  forgotSubmit.addEventListener('click', function () {
    if (!MM.validateForm(forgotForm)) return;
    MM.simulateSave(forgotSubmit, 'Sending...', function () {
      MM.closeModal('forgot-password-modal');
      MM.showToast('Reset link sent — check your inbox.');
      forgotForm.reset();
    });
  });
})();
