(function () {
  'use strict';

  var ADDED_KEY = 'mm_cms_cct_added';
  var EDITS_KEY = 'mm_cms_cct_edits';
  var DELETED_KEY = 'mm_cms_cct_deleted';
  var editingId = null;

  function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }

  function getItems() {
    var added = readJson(ADDED_KEY, []);
    var edits = readJson(EDITS_KEY, {});
    var deleted = readJson(DELETED_KEY, []);
    var base = (MM.CMS.COLLECTION_COMMON_TEXT || []).concat(added);
    return base.filter(function (i) { return deleted.indexOf(i.id) === -1; })
      .map(function (i) { return edits[i.id] ? Object.assign({}, i, edits[i.id]) : i; });
  }

  function typeLabel(value) {
    var t = (MM.CMS.COMMON_TEXT_TYPES || []).filter(function (t) { return t.value === value; })[0];
    return t ? t.label : value;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var langSelect = document.getElementById('language-filter');
    var search = document.getElementById('search-input');

    function render() {
      var lang = langSelect.value;
      var q = search.value.trim().toLowerCase();
      var tbody = document.getElementById('table-body');
      var all = getItems().filter(function (i) { return (i.language || 'en') === lang; });
      var rows = all.filter(function (i) {
        return !q || i.title.toLowerCase().indexOf(q) !== -1 || (i.text || '').toLowerCase().indexOf(q) !== -1;
      });
      tbody.innerHTML = '';
      rows.forEach(function (item) {
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td class="cell-strong">' + item.title + '</td>' +
          '<td>' + typeLabel(item.type) + '</td>' +
          '<td class="cct-content-cell" title="' + (item.text || '').replace(/"/g, '&quot;') + '">' + (item.text || '') + '</td>' +
          '<td><span class="badge ' + (MM.CMS.STATUS_BADGE[item.status] || 'badge-neutral') + '">' + (MM.CMS.STATUS_LABEL[item.status] || item.status) + '</span></td>' +
          '<td class="row-actions">' +
            '<button class="btn btn-ghost btn-sm" data-edit="' + item.id + '">Edit</button>' +
            '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '" data-name="' + item.title + '" style="color:var(--color-accent);">Delete</button>' +
          '</td>';
        tbody.appendChild(tr);
      });
      document.getElementById('empty-state').style.display = rows.length ? 'none' : 'block';
      document.getElementById('pagination-label').textContent = 'Showing ' + rows.length + ' of ' + all.length + ' items (' + lang.toUpperCase() + ')';
    }

    langSelect.addEventListener('change', render);
    document.getElementById('language-search-btn').addEventListener('click', render);
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
      MM.showToast('Common text record deleted.');
      pendingId = null;
      render();
    });

    var langField = document.getElementById('field-language');
    var typeField = document.getElementById('field-type');
    var titleField = document.getElementById('field-title');
    var textField = document.getElementById('field-text');

    function openDrawer(item) {
      editingId = item ? item.id : null;
      document.getElementById('cct-drawer-title').textContent = item ? 'Edit Snippet' : 'Add Snippet';
      document.getElementById('save-btn').textContent = item ? 'Save Changes' : 'Save';
      document.getElementById('cct-form').reset();
      if (item) {
        langField.value = item.language || 'en';
        typeField.value = item.type || '';
        titleField.value = (item.title || '').replace(/_/g, ' ');
        textField.value = item.text || '';
      } else {
        langField.value = 'en';
      }
      MM.openModal('cct-drawer');
    }

    document.getElementById('add-cct-btn').addEventListener('click', function () { openDrawer(null); });
    var emptyAddBtn = document.getElementById('empty-add-cct-btn');
    if (emptyAddBtn) emptyAddBtn.addEventListener('click', function () { openDrawer(null); });

    var form = document.getElementById('cct-form');
    MM.bindFormValidation(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!MM.validateForm(form)) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }

      var payload = {
        language: langField.value,
        type: typeField.value,
        title: titleField.value.trim().replace(/\s+/g, '_'),
        text: textField.value.trim(),
        status: 'active'
      };

      var btn = document.getElementById('save-btn');
      MM.simulateSave(btn, editingId ? 'Saving...' : 'Creating...', function () {
        if (editingId) {
          var edits = readJson(EDITS_KEY, {});
          edits[editingId] = payload;
          localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
          MM.showToast('Common text updated.');
        } else {
          var added = readJson(ADDED_KEY, []);
          added.push(Object.assign({ id: MM.uid('CCT') }, payload));
          localStorage.setItem(ADDED_KEY, JSON.stringify(added));
          MM.showToast('Common text created.');
        }
        MM.closeModal('cct-drawer');
        render();
      });
    });

    render();
  });
})();
