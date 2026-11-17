(function () {
  'use strict';
  document.getElementById('save-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Saving...', function () { MM.showToast('Settings saved'); });
  });
})();
