(function () {
  var ACCOUNT_URL = '../../../screens/khach-hang/tai-khoan-cua-toi/index.html';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.tab-item').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.tab-item').forEach(function (t) { t.classList.remove('is-active'); });
        document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('is-active'); });
        tab.classList.add('is-active');
        document.getElementById('panel-' + tab.getAttribute('data-tab')).classList.add('is-active');
      });
    });

    function goToAccount() {
      CJ.setAuth({ loggedIn: true, customerId: 'CUS-1001', name: 'Grace Lim Wei Ting' });
      window.location.href = ACCOUNT_URL;
    }

    document.getElementById('btn-otp-login').addEventListener('click', function () {
      this.disabled = true;
      this.innerHTML = 'Redirecting to One Meridian Pass…';
      setTimeout(goToAccount, 700);
    });

    document.getElementById('login-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var id = document.getElementById('login-id').value.trim();
      var pw = document.getElementById('login-pw').value.trim();
      var errorEl = document.getElementById('login-error');
      if (!id || !pw) { errorEl.classList.add('is-visible'); return; }
      errorEl.classList.remove('is-visible');
      var btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = 'Logging in…';
      setTimeout(goToAccount, 500);
    });

    document.getElementById('register-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = 'Creating account…';
      setTimeout(goToAccount, 500);
    });
  });
})();
