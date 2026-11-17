(function () {
  'use strict';

  var ADDED_KEY = 'mm_cms_logos_added';
  var EDITS_KEY = 'mm_cms_logos_edits';

  function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }

  function getItem(id) {
    var added = readJson(ADDED_KEY, []);
    var edits = readJson(EDITS_KEY, {});
    var base = (MM.CMS.PARTNER_LOGOS || []).concat(added);
    var item = base.filter(function (i) { return i.id === id; })[0];
    return item ? Object.assign({}, item, edits[id] || {}) : null;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    var item = id ? getItem(id) : null;
    if (!item) {
      document.querySelector('.page-content').innerHTML = '<div class="empty-state"><h3>Logo not found</h3><p>It may have been deleted.</p><a class="btn btn-primary btn-sm" href="../cms-009-partner-logo-list/index.html">Back to Partner Logos</a></div>';
      return;
    }

    document.getElementById('field-title').value = item.name || '';
    document.getElementById('field-link').value = item.link || '';

    document.getElementById('fake-upload-btn').addEventListener('click', function () {
      document.getElementById('image-hint').textContent = 'logo-image-v2.png selected (replaces current image on save).';
    });

    var form = document.getElementById('logo-form');
    MM.bindFormValidation(form);

    document.getElementById('reset-form-btn').addEventListener('click', function () {
      document.getElementById('field-title').value = item.name || '';
      document.getElementById('field-link').value = item.link || '';
      document.getElementById('image-hint').textContent = 'Current image kept unless replaced.';
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!MM.validateForm(form)) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }

      var payload = {
        name: document.getElementById('field-title').value.trim(),
        link: document.getElementById('field-link').value.trim()
      };

      var btn = document.getElementById('save-btn');
      MM.simulateSave(btn, 'Saving...', function () {
        var edits = readJson(EDITS_KEY, {});
        edits[id] = payload;
        localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
        window.location.href = '../cms-009-partner-logo-list/index.html?saved=updated';
      });
    });
  });
})();
