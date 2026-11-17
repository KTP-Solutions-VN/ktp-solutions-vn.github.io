(function () {
  'use strict';
  document.getElementById('settings-form').addEventListener('submit', function (e) {
    e.preventDefault();
    MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () { MM.showToast('Settings saved'); });
  });
})();
