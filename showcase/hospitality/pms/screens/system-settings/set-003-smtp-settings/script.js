(function () {
  'use strict';
  var STORAGE_KEY = 'mm_set_smtp';
  var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  if (stored) {
    document.getElementById('f-email').value = stored.email;
    document.getElementById('f-host').value = stored.host;
    document.getElementById('f-port').value = stored.port;
    document.getElementById('f-password').value = stored.password;
  }

  var form = document.getElementById('smtp-form');
  MM.bindFormValidation(form);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        email: document.getElementById('f-email').value,
        host: document.getElementById('f-host').value,
        port: document.getElementById('f-port').value,
        password: document.getElementById('f-password').value
      }));
      MM.showToast('SMTP settings saved');
    });
  });
})();
