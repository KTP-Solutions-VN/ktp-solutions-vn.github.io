(function () {
  'use strict';
  document.getElementById('resend-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Sending...', function () {
      MM.showToast('Revalidation request sent');
      setTimeout(function () { window.location.href = '../prop-020-onboarding-list/index.html'; }, 600);
    });
  });
})();
