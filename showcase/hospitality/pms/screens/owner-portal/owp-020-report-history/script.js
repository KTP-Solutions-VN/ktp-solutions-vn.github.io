(function () {
  'use strict';
  document.querySelectorAll('[data-download]').forEach(function (btn) {
    btn.addEventListener('click', function () { MM.showToast('Report downloaded'); });
  });
})();
