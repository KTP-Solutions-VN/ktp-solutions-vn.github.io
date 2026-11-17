(function () {
  var ACCOUNT_URL = '../../../screens/khach-hang/tai-khoan-cua-toi/index.html';
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn-save-prefs').addEventListener('click', function () {
      var btn = this;
      btn.disabled = true;
      btn.textContent = 'Saving…';
      setTimeout(function () {
        CJ.toast('Contact preferences saved.', 'success');
        setTimeout(function () { window.location.href = ACCOUNT_URL; }, 500);
      }, 500);
    });
  });
})();
