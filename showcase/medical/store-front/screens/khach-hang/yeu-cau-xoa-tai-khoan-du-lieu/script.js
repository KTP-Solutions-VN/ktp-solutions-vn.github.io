(function () {
  var ACCOUNT_URL = '../../../screens/khach-hang/tai-khoan-cua-toi/index.html';
  document.addEventListener('DOMContentLoaded', function () {
    var ack = document.getElementById('ack-checkbox');
    var reason = document.getElementById('delete-reason');
    var btn = document.getElementById('btn-confirm-delete');
    function refresh() { btn.disabled = !(ack.checked && reason.value); }
    ack.addEventListener('change', refresh);
    reason.addEventListener('change', refresh);

    btn.addEventListener('click', function () {
      btn.disabled = true;
      btn.textContent = 'Submitting…';
      setTimeout(function () {
        CJ.toast('Account closure request submitted. Our team will process this per the Privacy Act 1988.', 'warning');
        setTimeout(function () { window.location.href = ACCOUNT_URL; }, 700);
      }, 500);
    });
  });
})();
