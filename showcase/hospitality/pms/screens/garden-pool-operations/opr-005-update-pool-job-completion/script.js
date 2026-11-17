(function () {
  'use strict';
  setTimeout(function () { document.getElementById('gps-status').textContent = 'Location captured (42m from villa)'; document.getElementById('gps-status').className = 'badge badge-success'; }, 900);
  document.getElementById('cancel-btn').addEventListener('click', function () { window.location.href = '../opr-003-pool-job-list/index.html'; });
  document.getElementById('finish-btn').addEventListener('click', function () {
    if (!MM.validateForm(document.getElementById('complete-form'))) return;
    MM.simulateSave(document.getElementById('finish-btn'), 'Finishing...', function () {
      MM.showToast('Pool job marked complete');
      setTimeout(function () { window.location.href = '../opr-003-pool-job-list/index.html'; }, 500);
    });
  });
})();
