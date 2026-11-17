(function () {
  'use strict';
  var STORAGE_KEY = 'mm_vsv_feature_notify_cleaning';

  function loadList() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { return []; } }
  function saveList(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

  var form = document.getElementById('notify-form');
  var emailInput = document.getElementById('notify-email');
  var btn = document.getElementById('notify-btn');

  MM.bindFormValidation(form);

  (function restoreState() {
    var list = loadList();
    if (list.length) {
      btn.disabled = true;
      btn.textContent = 'You’re on the list';
    }
  })();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) { MM.showToast('Enter a valid email address.', { danger: true }); return; }
    MM.simulateSave(btn, 'Saving...', function () {
      var list = loadList();
      list.push({ email: emailInput.value.trim(), requestedAt: new Date().toISOString() });
      saveList(list);
      btn.disabled = true;
      btn.textContent = 'You’re on the list';
      MM.showToast('We’ll email you when the Cleaning overview launches.');
    });
  });
})();
