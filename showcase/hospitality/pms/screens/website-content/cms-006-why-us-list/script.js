(function () {
  'use strict';

  var ADDED_KEY = 'mm_cms_whyus_added';
  var EDITS_KEY = 'mm_cms_whyus_edits';
  var DELETED_KEY = 'mm_cms_whyus_deleted';
  var LANG_TEXT_KEY = 'mm_cms_whyus_lang_text';
  var editingId = null;
  var hasImage = false;
  var sessionLangText = {};

  function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }
  function nextOrder() {
    var added = readJson(ADDED_KEY, []);
    var all = (MM.CMS.WHY_US || []).concat(added);
    return all.length ? Math.max.apply(null, all.map(function (i) { return i.order || 0; })) + 1 : 1;
  }

  function getItems() {
    var added = readJson(ADDED_KEY, []);
    var edits = readJson(EDITS_KEY, {});
    var deleted = readJson(DELETED_KEY, []);
    var base = (MM.CMS.WHY_US || []).concat(added);
    return base.filter(function (i) { return deleted.indexOf(i.id) === -1; })
      .map(function (i) { return edits[i.id] ? Object.assign({}, i, edits[i.id]) : i; })
      .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    function render() {
      var search = document.getElementById('search-input').value.trim().toLowerCase();
      var tbody = document.getElementById('table-body');
      var rows = getItems().filter(function (i) { return !search || i.title.toLowerCase().indexOf(search) !== -1; });
      tbody.innerHTML = '';
      rows.forEach(function (item, idx) {
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td>' + (idx + 1) + '</td>' +
          '<td><div class="thumb-cell"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div></td>' +
          '<td class="cell-strong">' + item.title + '</td>' +
          '<td><span class="badge ' + (MM.CMS.STATUS_BADGE[item.status] || 'badge-neutral') + '">' + (MM.CMS.STATUS_LABEL[item.status] || item.status) + '</span></td>' +
          '<td class="row-actions">' +
            '<button class="btn btn-ghost btn-sm" data-edit="' + item.id + '">Edit</button>' +
            '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '" data-name="' + item.title + '" style="color:var(--color-accent);">Delete</button>' +
          '</td>';
        tbody.appendChild(tr);
      });
      document.getElementById('empty-state').style.display = rows.length ? 'none' : 'block';
      document.getElementById('pagination-count').textContent = 'Showing ' + rows.length + ' of ' + getItems().length + ' items';
    }

    document.getElementById('search-input').addEventListener('input', render);

    var pendingId = null;
    document.getElementById('table-body').addEventListener('click', function (e) {
      var editBtn = e.target.closest('[data-edit]');
      if (editBtn) {
        var found = getItems().filter(function (d) { return d.id === editBtn.getAttribute('data-edit'); })[0];
        openDrawer(found);
        return;
      }
      var btn = e.target.closest('[data-delete]');
      if (!btn) return;
      pendingId = btn.getAttribute('data-delete');
      document.getElementById('delete-target-name').textContent = btn.getAttribute('data-name');
      MM.openModal('delete-modal');
    });
    document.getElementById('confirm-delete-btn').addEventListener('click', function () {
      if (!pendingId) return;
      var deleted = readJson(DELETED_KEY, []);
      deleted.push(pendingId);
      localStorage.setItem(DELETED_KEY, JSON.stringify(deleted));
      MM.closeModal('delete-modal');
      MM.showToast('Benefit deleted.');
      pendingId = null;
      render();
    });

    var uploadTile = document.getElementById('upload-tile');
    var langSelect = document.getElementById('field-language');
    var descField = document.getElementById('field-description');

    function openDrawer(item) {
      editingId = item ? item.id : null;
      hasImage = !!item;
      var langTextStore = readJson(LANG_TEXT_KEY, {});
      sessionLangText = editingId ? Object.assign({}, langTextStore[editingId] || {}) : {};
      if (item && item.description && item.language && !sessionLangText[item.language]) {
        sessionLangText[item.language] = item.description;
      }

      document.getElementById('whyus-drawer-title').textContent = item ? 'Edit Book-Direct Benefit' : 'Add Book-Direct Benefit';
      document.getElementById('save-btn').textContent = item ? 'Save Changes' : 'Save';

      var form = document.getElementById('whyus-form');
      form.reset();
      document.getElementById('field-title').value = item ? (item.title || '') : '';
      document.getElementById('field-status').value = item ? (item.status || 'active') : 'active';
      langSelect.value = item ? (item.language || 'English') : 'English';
      descField.value = sessionLangText[langSelect.value] || '';

      uploadTile.classList.toggle('has-file', hasImage);
      document.getElementById('image-hint').textContent = hasImage ? 'Current image kept unless replaced.' : 'Recommended ratio 3:2, < 1MB.';
      document.getElementById('fake-upload-btn').textContent = item ? 'Replace Image' : 'Upload Image';
      document.getElementById('image-error').textContent = '';

      MM.openModal('whyus-drawer');
    }

    document.getElementById('add-whyus-btn').addEventListener('click', function () { openDrawer(null); });
    var emptyAddBtn = document.getElementById('empty-add-whyus-btn');
    if (emptyAddBtn) emptyAddBtn.addEventListener('click', function () { openDrawer(null); });

    langSelect.addEventListener('change', function () {
      descField.value = sessionLangText[langSelect.value] || '';
    });

    document.getElementById('fake-upload-btn').addEventListener('click', function () {
      hasImage = true;
      uploadTile.classList.add('has-file');
      document.getElementById('image-hint').textContent = (editingId ? 'why-us-image-v2.jpg selected (replaces current image on save).' : 'why-us-image.jpg selected.');
      document.getElementById('image-error').textContent = '';
    });

    var form = document.getElementById('whyus-form');
    MM.bindFormValidation(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = MM.validateForm(form);
      if (!hasImage) { document.getElementById('image-error').textContent = 'An image is required.'; valid = false; }
      if (!valid) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }

      sessionLangText[langSelect.value] = descField.value.trim();

      var payload = {
        title: document.getElementById('field-title').value.trim(),
        description: descField.value.trim(),
        language: langSelect.value,
        status: document.getElementById('field-status').value
      };

      var btn = document.getElementById('save-btn');
      MM.simulateSave(btn, editingId ? 'Saving...' : 'Creating...', function () {
        if (editingId) {
          var edits = readJson(EDITS_KEY, {});
          edits[editingId] = payload;
          localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
          var langTextStore = readJson(LANG_TEXT_KEY, {});
          langTextStore[editingId] = sessionLangText;
          localStorage.setItem(LANG_TEXT_KEY, JSON.stringify(langTextStore));
          MM.showToast('Item updated.');
        } else {
          var added = readJson(ADDED_KEY, []);
          payload.id = MM.uid('WU');
          payload.order = nextOrder();
          added.push(payload);
          localStorage.setItem(ADDED_KEY, JSON.stringify(added));
          var langTextStore2 = readJson(LANG_TEXT_KEY, {});
          langTextStore2[payload.id] = sessionLangText;
          localStorage.setItem(LANG_TEXT_KEY, JSON.stringify(langTextStore2));
          MM.showToast('Item created.');
        }
        MM.closeModal('whyus-drawer');
        render();
      });
    });

    render();
  });
})();
