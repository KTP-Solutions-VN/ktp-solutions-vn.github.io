/* Login screen behaviour — prototype only, no real authentication. */

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('login-form');
  var errorBox = document.getElementById('login-error');
  var email = document.getElementById('email');
  var password = document.getElementById('password');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!email.value.trim() || !password.value.trim()) {
      errorBox.hidden = false;
      return;
    }

    errorBox.hidden = true;

    var submitBtn = form.querySelector('.auth-submit');
    submitBtn.textContent = 'Signing in…';
    submitBtn.disabled = true;

    setTimeout(function () {
      window.location.href = 'dashboard/dashboard.html';
    }, 500);
  });
});
