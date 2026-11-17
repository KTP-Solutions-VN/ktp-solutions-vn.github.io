(function () {
  'use strict';
  var STORAGE_KEY = 'mm_vsv_launch_notify_item';

  function loadList() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { return []; } }
  function saveList(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

  var form = document.getElementById('notify-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    var btn = form.querySelector('button[type="submit"]');
    var email = document.getElementById('notify-email').value.trim();
    MM.simulateSave(btn, 'Saving...', function () {
      var list = loadList();
      if (list.indexOf(email) === -1) list.push(email);
      saveList(list);
      form.reset();
      MM.showToast("You're on the list — we'll email you when Item launches.");
    });
  });
})();
