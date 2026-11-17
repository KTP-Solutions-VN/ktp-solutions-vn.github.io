(function () {
  'use strict';
  document.getElementById('submit-btn').addEventListener('click', function () {
    if (!MM.validateForm(document.getElementById('incident-form'))) return;
    MM.simulateSave(document.getElementById('submit-btn'), 'Submitting...', function () {
      MM.showToast('Incident reported — business unit notified by email', { danger: true });
      setTimeout(function () { window.location.href = '../opr-003-pool-job-list/index.html'; }, 500);
    });
  });
})();
