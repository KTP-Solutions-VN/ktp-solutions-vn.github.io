(function () {
  'use strict';
  document.getElementById('legacy-save-btn').addEventListener('click', function () {
    MM.showToast('This legacy form does not save data \u2014 use Statement Reconcile instead', { danger: true });
  });
})();
