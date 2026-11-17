(function () {
  var ACCOUNT_URL = '../../../screens/khach-hang/tai-khoan-cua-toi/index.html';
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('membership-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Submitting…';
      setTimeout(function () {
        CJ.toast('Membership application submitted.', 'success');
        setTimeout(function () { window.location.href = ACCOUNT_URL; }, 500);
      }, 500);
    });
  });
})();
