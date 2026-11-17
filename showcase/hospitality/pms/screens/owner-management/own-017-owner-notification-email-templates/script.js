(function () {
  'use strict';
  document.querySelectorAll('[data-tpl]').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelectorAll('[data-tpl]').forEach(function (i) { i.classList.toggle('active', i === item); });
    });
  });
  var form = document.getElementById('tpl-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () { MM.showToast('Email template saved'); });
  });
})();
