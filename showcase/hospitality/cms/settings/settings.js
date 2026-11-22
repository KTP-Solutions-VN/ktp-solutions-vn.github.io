/* Settings screen behaviour — tab switching is handled by the shared
   layout.js [data-tabs] logic. This file only wires up local feedback
   (save confirmations) specific to this screen. */

(function () {
  'use strict';

  document.querySelectorAll('.settings-panels .btn-primary').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.CM.showToast('Configuration saved.');
    });
  });

  document.querySelectorAll('.settings-panels .btn-outline').forEach(function (btn) {
    if (btn.textContent.trim() === 'Request Data Export') {
      btn.addEventListener('click', function () {
        window.CM.showToast('Data export request submitted.');
      });
    }
  });
})();
