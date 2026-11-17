(function () {
  'use strict';

  var ADDED_KEY = 'mm_cms_logos_added';

  function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }
  function nextOrder() {
    var added = readJson(ADDED_KEY, []);
    var all = (MM.CMS.PARTNER_LOGOS || []).concat(added);
    return all.length ? Math.max.apply(null, all.map(function (i) { return i.order || 0; })) + 1 : 1;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('logo-form');
    var uploadTile = document.querySelector('.cms-upload-tile');
    var hasImage = false;

    document.getElementById('fake-upload-btn').addEventListener('click', function () {
      hasImage = true;
      uploadTile.classList.add('has-file');
      document.getElementById('image-hint').textContent = 'logo-image.png selected.';
      document.getElementById('image-error').textContent = '';
    });

    MM.bindFormValidation(form);

    document.getElementById('reset-form-btn').addEventListener('click', function () {
      form.reset();
      hasImage = false;
      uploadTile.classList.remove('has-file');
      document.getElementById('image-hint').textContent = 'Recommended ratio 3:2, < 1MB.';
      document.getElementById('image-error').textContent = '';
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = MM.validateForm(form);
      if (!hasImage) { document.getElementById('image-error').textContent = 'An image is required.'; valid = false; }
      if (!valid) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }

      var payload = {
        id: MM.uid('LOGO'),
        order: nextOrder(),
        name: document.getElementById('field-title').value.trim(),
        link: document.getElementById('field-link').value.trim(),
        status: 'active'
      };

      var btn = document.getElementById('save-btn');
      MM.simulateSave(btn, 'Saving...', function () {
        var added = readJson(ADDED_KEY, []);
        added.push(payload);
        localStorage.setItem(ADDED_KEY, JSON.stringify(added));
        window.location.href = '../cms-009-partner-logo-list/index.html?saved=created';
      });
    });
  });
})();
