(function () {
  'use strict';

  var ADDED_KEY = 'mm_cms_contactforms_added';
  var EDITS_KEY = 'mm_cms_contactforms_edits';
  var DELETED_KEY = 'mm_cms_contactforms_deleted';
  var editingId = null;

  function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }

  function getItems() {
    var added = readJson(ADDED_KEY, []);
    var edits = readJson(EDITS_KEY, {});
    var deleted = readJson(DELETED_KEY, []);
    var base = (MM.CMS.CONTACT_FORMS || []).concat(added);
    return base.filter(function (i) { return deleted.indexOf(i.id) === -1; })
      .map(function (i) { return edits[i.id] ? Object.assign({}, i, edits[i.id]) : i; });
  }

  document.addEventListener('DOMContentLoaded', function () {
    function render() {
      var search = document.getElementById('search-input').value.trim().toLowerCase();
      var tbody = document.getElementById('table-body');
      var all = getItems();
      var rows = all.filter(function (i) {
        return !search || i.name.toLowerCase().indexOf(search) !== -1 || i.targetEmail.toLowerCase().indexOf(search) !== -1;
      });
      tbody.innerHTML = '';
      rows.forEach(function (item, idx) {
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td>' + (idx + 1) + '</td>' +
          '<td class="cell-strong">' + item.name + '</td>' +
          '<td>' + item.targetEmail + '</td>' +
          '<td>' + (item.scope || 'Global') + '</td>' +
          '<td><span class="badge ' + (MM.CMS.STATUS_BADGE[item.status] || 'badge-neutral') + '">' + (MM.CMS.STATUS_LABEL[item.status] || item.status) + '</span></td>' +
          '<td class="row-actions">' +
            '<button class="btn btn-ghost btn-sm" data-edit="' + item.id + '">Edit</button>' +
            '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '" data-name="' + item.name + '" style="color:var(--color-accent);">Delete</button>' +
          '</td>';
        tbody.appendChild(tr);
      });
      document.getElementById('empty-state').style.display = rows.length ? 'none' : 'block';
      document.getElementById('pagination-count').textContent = 'Showing ' + rows.length + ' of ' + all.length + ' items';
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
      MM.showToast('Contact form deleted.');
      pendingId = null;
      render();
    });

    function openDrawer(item) {
      editingId = item ? item.id : null;
      document.getElementById('contact-form-drawer-title').textContent = item ? 'Edit Contact Form' : 'Add Contact Form';
      document.getElementById('save-btn').textContent = item ? 'Save Changes' : 'Save';
      var form = document.getElementById('contact-form-form');
      form.reset();
      if (item) {
        document.getElementById('field-title').value = item.name || '';
        document.getElementById('field-email').value = item.targetEmail || '';
      }
      MM.openModal('contact-form-drawer');
    }

    document.getElementById('add-contact-form-btn').addEventListener('click', function () { openDrawer(null); });
    var emptyAddBtn = document.getElementById('empty-add-contact-form-btn');
    if (emptyAddBtn) emptyAddBtn.addEventListener('click', function () { openDrawer(null); });

    var form = document.getElementById('contact-form-form');
    MM.bindFormValidation(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!MM.validateForm(form)) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }

      var payload = {
        name: document.getElementById('field-title').value.trim(),
        targetEmail: document.getElementById('field-email').value.trim()
      };

      var btn = document.getElementById('save-btn');
      MM.simulateSave(btn, editingId ? 'Saving...' : 'Creating...', function () {
        if (editingId) {
          var edits = readJson(EDITS_KEY, {});
          edits[editingId] = payload;
          localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
          MM.showToast('Contact form updated.');
        } else {
          var added = readJson(ADDED_KEY, []);
          added.push(Object.assign({ id: MM.uid('CF'), scope: 'Global', status: 'active' }, payload));
          localStorage.setItem(ADDED_KEY, JSON.stringify(added));
          MM.showToast('Contact form created.');
        }
        MM.closeModal('contact-form-drawer');
        render();
      });
    });

    render();
  });
})();
