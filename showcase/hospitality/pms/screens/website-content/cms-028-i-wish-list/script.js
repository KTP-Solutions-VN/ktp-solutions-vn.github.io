(function () {
  'use strict';

  var ADDED_KEY = 'mm_cms_iwish_added';
  var EDITS_KEY = 'mm_cms_iwish_edits';
  var DELETED_KEY = 'mm_cms_iwish_deleted';
  var LANGS = [{ code: 'en', name: 'English' }, { code: 'fr', name: 'French' }, { code: 'th', name: 'Thai' }];
  var editingId = null;
  var editingItem = null;

  function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }

  function getItems() {
    var added = readJson(ADDED_KEY, []);
    var edits = readJson(EDITS_KEY, {});
    var deleted = readJson(DELETED_KEY, []);
    var base = (MM.CMS.IWISH || []).concat(added);
    return base.filter(function (i) { return deleted.indexOf(i.id) === -1; })
      .map(function (i) { return edits[i.id] ? Object.assign({}, i, edits[i.id]) : i; });
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
        var imgCount = [item.image_1, item.image_2, item.image_3].filter(Boolean).length;
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td>' + (idx + 1) + '</td>' +
          '<td class="cell-strong">' + item.title + '</td>' +
          '<td>' + imgCount + ' / 3</td>' +
          '<td><span class="badge ' + (MM.CMS.STATUS_BADGE[item.status] || 'badge-neutral') + '">' + (MM.CMS.STATUS_LABEL[item.status] || item.status) + '</span></td>' +
          '<td class="row-actions">' +
            '<button class="btn btn-ghost btn-sm" data-edit="' + item.id + '">Edit</button>' +
            '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '" data-name="' + item.title + '" style="color:var(--color-accent);">Delete</button>' +
          '</td>';
        tbody.appendChild(tr);
      });
      document.getElementById('empty-state').style.display = rows.length ? 'none' : 'block';
      document.getElementById('pagination-label').textContent = 'Showing ' + rows.length + ' of ' + all.length + ' items';
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
      MM.showToast('"I Wish" item deleted.');
      pendingId = null;
      render();
    });

    var titleField = document.getElementById('field-title');
    var text1Field = document.getElementById('field-text1');
    var text2Field = document.getElementById('field-text2');
    var langTabsEl = document.getElementById('lang-tabs');

    var text1State = {};
    var text2State = {};
    var currentLang = 'en';
    var images = { 1: false, 2: false, 3: false };

    function renderLangTabs() {
      langTabsEl.innerHTML = LANGS.map(function (l) {
        return '<div class="lang-tab' + (l.code === currentLang ? ' active' : '') + '" data-lang="' + l.code + '">' + l.name + '</div>';
      }).join('');
    }
    langTabsEl.addEventListener('click', function (e) {
      var tab = e.target.closest('[data-lang]');
      if (!tab) return;
      text1State[currentLang] = text1Field.value;
      text2State[currentLang] = text2Field.value;
      currentLang = tab.getAttribute('data-lang');
      text1Field.value = text1State[currentLang] || '';
      text2Field.value = text2State[currentLang] || '';
      renderLangTabs();
    });

    document.querySelectorAll('[data-upload-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var slot = btn.getAttribute('data-upload-btn');
        images[slot] = true;
        document.querySelector('#iwish-drawer .cms-upload-tile[data-slot="' + slot + '"]').classList.add('has-file');
        MM.showToast('Image ' + slot + ' selected.');
      });
    });

    function openDrawer(item) {
      editingId = item ? item.id : null;
      editingItem = item || null;
      document.getElementById('iwish-drawer-title').textContent = item ? 'Edit I Wish Item' : 'Add I Wish Item';
      document.getElementById('save-btn').textContent = item ? 'Save Changes' : 'Save';
      document.getElementById('iwish-form').reset();

      text1State = Object.assign({}, (item && item.text_1) || {});
      text2State = Object.assign({}, (item && item.text_2) || {});
      currentLang = 'en';
      images = { 1: item ? !!(item && item.image_1) : false, 2: item ? !!(item && item.image_2) : false, 3: item ? !!(item && item.image_3) : false };

      titleField.value = item ? (item.title || '') : '';
      text1Field.value = text1State[currentLang] || '';
      text2Field.value = text2State[currentLang] || '';
      renderLangTabs();
      [1, 2, 3].forEach(function (slot) {
        var tile = document.querySelector('#iwish-drawer .cms-upload-tile[data-slot="' + slot + '"]');
        tile.classList.toggle('has-file', !!images[slot]);
      });

      MM.openModal('iwish-drawer');
    }

    document.getElementById('add-iwish-btn').addEventListener('click', function () { openDrawer(null); });
    var emptyAddBtn = document.getElementById('empty-add-iwish-btn');
    if (emptyAddBtn) emptyAddBtn.addEventListener('click', function () { openDrawer(null); });

    var form = document.getElementById('iwish-form');
    MM.bindFormValidation(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      text1State[currentLang] = text1Field.value;
      text2State[currentLang] = text2Field.value;

      if (!MM.validateForm(form)) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }

      var isEdit = !!editingId;
      var payload = {
        title: titleField.value.trim(),
        text_1: isEdit ? text1State : (function () { var o = {}; o[currentLang] = text1State[currentLang]; return o; })(),
        text_2: isEdit ? text2State : (function () { var o = {}; o[currentLang] = text2State[currentLang]; return o; })(),
        image_1: images[1], image_2: images[2], image_3: images[3],
        status: (editingItem && editingItem.status) || 'draft'
      };

      var btn = document.getElementById('save-btn');
      MM.simulateSave(btn, isEdit ? 'Saving...' : 'Creating...', function () {
        if (isEdit) {
          var edits = readJson(EDITS_KEY, {});
          edits[editingId] = Object.assign({}, edits[editingId], payload);
          localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
          MM.showToast('Item updated.');
        } else {
          var added = readJson(ADDED_KEY, []);
          added.push(Object.assign({ id: MM.uid('IW') }, payload));
          localStorage.setItem(ADDED_KEY, JSON.stringify(added));
          MM.showToast('Item created.');
        }
        MM.closeModal('iwish-drawer');
        render();
      });
    });

    render();
  });
})();
