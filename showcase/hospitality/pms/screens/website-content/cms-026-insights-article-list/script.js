(function () {
  'use strict';

  var ADDED_KEY = 'mm_cms_insights_added';
  var EDITS_KEY = 'mm_cms_insights_edits';
  var DELETED_KEY = 'mm_cms_insights_deleted';
  var LANGS = [{ code: 'en', name: 'English' }, { code: 'fr', name: 'French' }, { code: 'th', name: 'Thai' }];
  var editingId = null;
  var editingItem = null;

  function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }

  function getItems() {
    var added = readJson(ADDED_KEY, []);
    var edits = readJson(EDITS_KEY, {});
    var deleted = readJson(DELETED_KEY, []);
    var base = (MM.CMS.INSIGHTS || []).concat(added);
    return base.filter(function (i) { return deleted.indexOf(i.id) === -1; })
      .map(function (i) { return edits[i.id] ? Object.assign({}, i, edits[i.id]) : i; });
  }

  function destNames(ids) {
    return (ids || []).map(function (id) {
      var d = (MM.CMS.DESTINATIONS || []).filter(function (x) { return x.id === id; })[0];
      return d ? d.name : id;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var search = document.getElementById('search-input');

    function render() {
      var q = search.value.trim().toLowerCase();
      var tbody = document.getElementById('table-body');
      var all = getItems();
      var rows = all.filter(function (i) { return !q || i.title.toLowerCase().indexOf(q) !== -1; });
      tbody.innerHTML = '';
      rows.forEach(function (item, idx) {
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td>' + (idx + 1) + '</td>' +
          '<td class="cell-strong">' + item.title + '</td>' +
          '<td>' + destNames(item.destinationIds).map(function (n) { return '<span class="dest-tag">' + n + '</span>'; }).join('') + '</td>' +
          '<td><span class="badge ' + (MM.CMS.STATUS_BADGE[item.status] || 'badge-neutral') + '">' + (MM.CMS.STATUS_LABEL[item.status] || item.status) + '</span></td>' +
          '<td class="row-actions">' +
            '<button class="btn btn-ghost btn-sm" data-edit="' + item.id + '">Edit</button>' +
            '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '" data-name="' + item.title + '" style="color:var(--color-accent);">Delete</button>' +
          '</td>';
        tbody.appendChild(tr);
      });
      document.getElementById('empty-state').style.display = rows.length ? 'none' : 'block';
      document.getElementById('pagination-label').textContent = 'Showing ' + rows.length + ' of ' + all.length + ' articles';
    }

    search.addEventListener('input', render);

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
      MM.showToast('Insight deleted.');
      pendingId = null;
      render();
    });

    var titleField = document.getElementById('field-title');
    var textField = document.getElementById('field-text');
    var langTabsEl = document.getElementById('lang-tabs');
    var destListEl = document.getElementById('destinations-list');
    var uploadTile = document.querySelector('#insight-drawer .cms-upload-tile');

    var textState = {};
    var currentLang = 'en';
    var hasImage = false;
    var selectedDest = [];

    function renderLangTabs() {
      langTabsEl.innerHTML = LANGS.map(function (l) {
        return '<div class="lang-tab' + (l.code === currentLang ? ' active' : '') + '" data-lang="' + l.code + '">' + l.name + '</div>';
      }).join('');
    }
    langTabsEl.addEventListener('click', function (e) {
      var tab = e.target.closest('[data-lang]');
      if (!tab) return;
      textState[currentLang] = textField.value;
      currentLang = tab.getAttribute('data-lang');
      textField.value = textState[currentLang] || '';
      renderLangTabs();
    });

    function renderDestinations() {
      destListEl.innerHTML = (MM.CMS.DESTINATIONS || []).map(function (d) {
        var checked = selectedDest.indexOf(d.id) !== -1 ? 'checked' : '';
        return '<label class="dest-checkbox"><input type="checkbox" value="' + d.id + '" ' + checked + '> ' + d.name + '</label>';
      }).join('');
    }
    destListEl.addEventListener('change', function (e) {
      if (e.target.type !== 'checkbox') return;
      var val = e.target.value;
      if (e.target.checked) {
        if (selectedDest.length >= 3) { e.target.checked = false; MM.showToast('You can select up to 3 destinations.', { danger: true }); return; }
        selectedDest.push(val);
      } else {
        selectedDest = selectedDest.filter(function (x) { return x !== val; });
      }
      document.getElementById('destinations-error').textContent = '';
    });

    document.getElementById('fake-upload-btn').addEventListener('click', function () {
      hasImage = true;
      uploadTile.classList.add('has-file');
      document.getElementById('image-hint').textContent = 'insight-image.jpg selected.';
      document.getElementById('image-error').textContent = '';
    });

    function openDrawer(item) {
      editingId = item ? item.id : null;
      editingItem = item || null;
      document.getElementById('insight-drawer-title').textContent = item ? 'Edit Insight' : 'Add Insight';
      document.getElementById('save-btn').textContent = item ? 'Save Changes' : 'Save';
      document.getElementById('insight-form').reset();

      textState = Object.assign({}, (item && item.text) || {});
      currentLang = 'en';
      hasImage = item ? !!(item && item.image) : false;
      selectedDest = (item && item.destinationIds) ? item.destinationIds.slice() : [];

      titleField.value = item ? (item.title || '') : '';
      textField.value = textState[currentLang] || '';
      uploadTile.classList.toggle('has-file', hasImage);
      document.getElementById('image-hint').textContent = hasImage ? 'Current image kept unless replaced.' : 'Photo must be less than 1MB in size and respect the 3:2 ratio.';
      document.getElementById('image-error').textContent = '';
      document.getElementById('destinations-error').textContent = '';

      renderLangTabs();
      renderDestinations();
      MM.openModal('insight-drawer');
    }

    document.getElementById('add-insight-btn').addEventListener('click', function () { openDrawer(null); });
    var emptyAddBtn = document.getElementById('empty-add-insight-btn');
    if (emptyAddBtn) emptyAddBtn.addEventListener('click', function () { openDrawer(null); });

    var form = document.getElementById('insight-form');
    MM.bindFormValidation(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      textState[currentLang] = textField.value;

      var isEdit = !!editingId;
      var valid = MM.validateForm(form);
      if (!hasImage) { document.getElementById('image-error').textContent = 'An image is required.'; valid = false; }
      if (selectedDest.length < 1) { document.getElementById('destinations-error').textContent = 'Select at least 1 destination (max 3).'; valid = false; }
      if (!valid) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }

      var payload = {
        title: titleField.value.trim(),
        text: isEdit ? textState : (function () { var o = {}; o[currentLang] = textState[currentLang]; return o; })(),
        destinationIds: selectedDest,
        image: hasImage,
        status: (editingItem && editingItem.status) || 'draft'
      };

      var btn = document.getElementById('save-btn');
      MM.simulateSave(btn, isEdit ? 'Saving...' : 'Creating...', function () {
        if (isEdit) {
          var edits = readJson(EDITS_KEY, {});
          edits[editingId] = Object.assign({}, edits[editingId], payload);
          localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
          MM.showToast('Insight updated.');
        } else {
          var added = readJson(ADDED_KEY, []);
          added.push(Object.assign({ id: MM.uid('INS'), author: 'Somchai Anuwat', date: new Date().toISOString().slice(0, 10) }, payload));
          localStorage.setItem(ADDED_KEY, JSON.stringify(added));
          MM.showToast('Insight created.');
        }
        MM.closeModal('insight-drawer');
        render();
      });
    });

    render();
  });
})();
