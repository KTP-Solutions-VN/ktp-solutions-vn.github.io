(function () {
  'use strict';

  var ADDED_KEY = 'mm_cms_arrivals_added';
  var EDITS_KEY = 'mm_cms_arrivals_edits';
  var DELETED_KEY = 'mm_cms_arrivals_deleted';
  var LANGS = [{ code: 'en', name: 'English' }, { code: 'fr', name: 'French' }, { code: 'zh', name: 'Chinese' }];
  var FIELD_MAP = [
    ['airport_text', 'field-airport'],
    ['pier_text', 'field-pier'],
    ['car_rental_text', 'field-car-rental'],
    ['other_text', 'field-other'],
    ['check_in_text', 'field-checkin'],
    ['stay_text', 'field-stay']
  ];
  var editingId = null;
  var editingItem = null;

  function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }

  function getItems() {
    var added = readJson(ADDED_KEY, []);
    var edits = readJson(EDITS_KEY, {});
    var deleted = readJson(DELETED_KEY, []);
    var base = (MM.CMS.ARRIVALS || []).concat(added);
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
        var villa = MM.CMS.villaById(item.villaId);
        var langs = Object.keys(item.content || {}).map(function (l) { return l.toUpperCase(); });
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td>' + (idx + 1) + '</td>' +
          '<td class="cell-strong">' + item.title + '</td>' +
          '<td>' + (villa ? villa.name : item.villaId) + '</td>' +
          '<td>' + (langs.join(', ') || '—') + '</td>' +
          '<td><span class="badge ' + (MM.CMS.STATUS_BADGE[item.status] || 'badge-neutral') + '">' + (MM.CMS.STATUS_LABEL[item.status] || item.status) + '</span></td>' +
          '<td class="row-actions">' +
            '<button class="btn btn-ghost btn-sm" data-edit="' + item.id + '">Edit</button>' +
            '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '" data-name="' + item.title + '" style="color:var(--color-accent);">Delete</button>' +
          '</td>';
        tbody.appendChild(tr);
      });
      document.getElementById('empty-state').style.display = rows.length ? 'none' : 'block';
      document.getElementById('pagination-label').textContent = 'Showing ' + rows.length + ' of ' + all.length + ' records';
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
      MM.showToast('Arrival content deleted.');
      pendingId = null;
      render();
    });

    var titleField = document.getElementById('field-title');
    var langTabsEl = document.getElementById('lang-tabs');
    var completeBadge = document.getElementById('complete-badge');
    var contentState = {};
    var currentLang = 'en';

    function fieldsEl() { return FIELD_MAP.map(function (m) { return document.getElementById(m[1]); }); }

    function loadLangIntoFields() {
      var data = contentState[currentLang] || {};
      FIELD_MAP.forEach(function (m) { document.getElementById(m[1]).value = data[m[0]] || ''; });
      updateCompleteBadge();
    }
    function saveFieldsIntoState() {
      var data = contentState[currentLang] || {};
      FIELD_MAP.forEach(function (m) { data[m[0]] = document.getElementById(m[1]).value; });
      contentState[currentLang] = data;
    }
    function updateCompleteBadge() {
      var data = contentState[currentLang] || {};
      var complete = FIELD_MAP.every(function (m) { return (data[m[0]] || '').trim(); }) && titleField.value.trim();
      completeBadge.style.display = complete ? 'inline-flex' : 'none';
    }

    function renderLangTabs() {
      langTabsEl.innerHTML = LANGS.map(function (l) {
        return '<div class="lang-tab' + (l.code === currentLang ? ' active' : '') + '" data-lang="' + l.code + '">' + l.name + '</div>';
      }).join('');
    }
    langTabsEl.addEventListener('click', function (e) {
      var tab = e.target.closest('[data-lang]');
      if (!tab) return;
      saveFieldsIntoState();
      currentLang = tab.getAttribute('data-lang');
      renderLangTabs();
      loadLangIntoFields();
    });

    fieldsEl().forEach(function (el) { el.addEventListener('input', function () { saveFieldsIntoState(); updateCompleteBadge(); }); });
    titleField.addEventListener('input', updateCompleteBadge);

    function openDrawer(item) {
      editingId = item ? item.id : null;
      editingItem = item || null;
      document.getElementById('arrival-drawer-title').textContent = item ? 'Edit Getting-There Guide' : 'Add Getting-There Guide';
      document.getElementById('save-btn').textContent = item ? 'Save Changes' : 'Save';
      document.getElementById('arrival-form').reset();

      contentState = {};
      Object.keys((item && item.content) || {}).forEach(function (lang) { contentState[lang] = Object.assign({}, item.content[lang]); });
      currentLang = 'en';
      titleField.value = item ? (item.title || '') : '';

      renderLangTabs();
      loadLangIntoFields();
      MM.openModal('arrival-drawer');
    }

    document.getElementById('add-arrival-btn').addEventListener('click', function () { openDrawer(null); });
    var emptyAddBtn = document.getElementById('empty-add-arrival-btn');
    if (emptyAddBtn) emptyAddBtn.addEventListener('click', function () { openDrawer(null); });

    var form = document.getElementById('arrival-form');
    MM.bindFormValidation(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      saveFieldsIntoState();

      if (!MM.validateForm(form)) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }

      var isEdit = !!editingId;
      var payload = {
        title: titleField.value.trim(),
        content: isEdit ? contentState : (function () { var o = {}; o[currentLang] = contentState[currentLang]; return o; })(),
        status: (editingItem && editingItem.status) || 'draft'
      };

      var btn = document.getElementById('save-btn');
      MM.simulateSave(btn, isEdit ? 'Saving...' : 'Creating...', function () {
        if (isEdit) {
          var edits = readJson(EDITS_KEY, {});
          edits[editingId] = Object.assign({}, edits[editingId], payload);
          localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
          MM.showToast('Arrival content updated.');
        } else {
          var added = readJson(ADDED_KEY, []);
          added.push(Object.assign({ id: MM.uid('ARR'), updatedAt: new Date().toISOString().slice(0, 10) }, payload));
          localStorage.setItem(ADDED_KEY, JSON.stringify(added));
          MM.showToast('Arrival content created.');
        }
        MM.closeModal('arrival-drawer');
        render();
      });
    });

    render();
  });
})();
