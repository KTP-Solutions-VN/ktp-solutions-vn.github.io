(function () {
  var ACCOUNT_URL = '../../../screens/khach-hang/tai-khoan-cua-toi/index.html';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.tab-item').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.tab-item').forEach(function (t) { t.classList.remove('is-active'); });
        document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('is-active'); });
        tab.classList.add('is-active');
        document.getElementById('tab-' + tab.getAttribute('data-tab')).classList.add('is-active');
      });
    });
    document.getElementById('btn-save-profile').addEventListener('click', function () {
      var btn = this;
      btn.disabled = true;
      btn.textContent = 'Saving…';
      setTimeout(function () {
        CJ.toast('Profile updated.', 'success');
        setTimeout(function () { window.location.href = ACCOUNT_URL; }, 500);
      }, 500);
    });
  });
})();
