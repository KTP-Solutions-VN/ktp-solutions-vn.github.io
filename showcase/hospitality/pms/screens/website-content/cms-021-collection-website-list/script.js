(function () {
  'use strict';
  var STORAGE_KEY = 'mm_cms_collections';
  var DELETE_KEY = 'mm_cms_collections_deleted';

  var MOCK = [
    { id: 'GCW-01', title: 'Coral Beachfront Collection', url: 'https://azurastays.example/themes/coral-beachfront', created: '2026-04-02 09:15' },
    { id: 'GCW-02', title: 'Byron Hinterland Retreats', url: 'https://azurastays.example/themes/byron-hinterland', created: '2026-05-18 14:40' },
    { id: 'GCW-03', title: 'Family-Friendly Villas', url: 'https://azurastays.example/themes/family-friendly', created: '2026-06-10 11:22' },
    { id: 'GCW-04', title: 'Wedding & Celebration Villas', url: 'https://azurastays.example/themes/wedding-celebration', created: '2026-07-05 16:05' },
    { id: 'GCW-05', title: 'Pet-Friendly Escapes', url: 'https://azurastays.example/themes/pet-friendly', created: '2026-08-01 10:30' }
  ];

  function readJSON(key, fallback) { try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; } }
  function writeJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  function getAll() {
    var added = readJSON(STORAGE_KEY, []);
    var deleted = readJSON(DELETE_KEY, []);
    var byId = {};
    var order = [];
    MOCK.concat(added).forEach(function (c) {
      if (!byId[c.id]) order.push(c.id);
      byId[c.id] = c;
    });
    return order.map(function (id) { return byId[id]; }).filter(function (c) { return deleted.indexOf(c.id) === -1; });
  }

  var state = { search: '' };
  var pendingDeleteId = null;
  var editingRecord = null;

  function render() {
    var all = getAll();
    var filtered = all.filter(function (c) {
      if (!state.search) return true;
      var q = state.search.toLowerCase();
      return c.title.toLowerCase().indexOf(q) !== -1 || c.url.toLowerCase().indexOf(q) !== -1;
    });

    var body = document.getElementById('collections-body');
    var empty = document.getElementById('empty-state');

    if (!filtered.length) {
      body.innerHTML = '';
      empty.hidden = false;
    } else {
      empty.hidden = true;
      body.innerHTML = filtered.map(function (c, i) {
        return '<tr>' +
          '<td class="cell-num">' + (i + 1) + '</td>' +
          '<td class="cell-strong">' + c.title + '</td>' +
          '<td><span class="url-link">' + c.url + '</span></td>' +
          '<td class="cell-sub">' + c.created + '</td>' +
          '<td><div class="row-actions">' +
            '<a class="btn btn-ghost btn-sm" href="../cms-023-collection-website-content-management-5-sub-tabs/index.html?id=' + c.id + '">Manage</a>' +
            '<button class="btn btn-ghost btn-sm" data-edit="' + c.id + '">Edit</button>' +
            '<button class="btn btn-ghost btn-sm" data-delete="' + c.id + '" data-name="' + c.title + '">Delete</button>' +
          '</div></td>' +
        '</tr>';
      }).join('');
    }

    document.getElementById('result-count').textContent = filtered.length + ' of ' + all.length + ' websites';
    document.getElementById('pagination-label').textContent = 'Showing 1–' + filtered.length + ' of ' + filtered.length + ' websites';

    document.querySelectorAll('[data-delete]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        pendingDeleteId = btn.getAttribute('data-delete');
        document.getElementById('delete-modal-name').textContent = btn.getAttribute('data-name');
        MM.openModal('delete-modal');
      });
    });
    document.querySelectorAll('[data-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var record = getAll().filter(function (c) { return c.id === btn.getAttribute('data-edit'); })[0];
        openDrawer(record);
      });
    });
  }

  function openDrawer(record) {
    editingRecord = record || null;
    document.getElementById('collection-drawer-title').textContent = record ? 'Edit Themed Site' : 'Add Themed Site';
    document.getElementById('save-btn').textContent = record ? 'Save Changes' : 'Save';
    document.getElementById('collection-form').reset();
    if (record) {
      document.getElementById('title').value = record.title;
      document.getElementById('url').value = record.url;
    } else {
      document.getElementById('url').value = 'https://azurastays.example/themes/';
    }
    MM.openModal('collection-drawer');
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();

    var flash = sessionStorage.getItem('mm_flash');
    if (flash) { MM.showToast(flash); sessionStorage.removeItem('mm_flash'); }

    document.getElementById('search-input').addEventListener('input', function (e) {
      state.search = e.target.value.trim();
      render();
    });

    document.getElementById('confirm-delete-btn').addEventListener('click', function (e) {
      MM.simulateSave(e.currentTarget, 'Deleting...', function () {
        var deleted = readJSON(DELETE_KEY, []);
        deleted.push(pendingDeleteId);
        writeJSON(DELETE_KEY, deleted);
        MM.closeModal('delete-modal');
        MM.showToast('Collection website deleted.');
        render();
      });
    });

    document.getElementById('add-collection-btn').addEventListener('click', function () { openDrawer(null); });
    var emptyAddBtn = document.getElementById('empty-add-collection-btn');
    if (emptyAddBtn) emptyAddBtn.addEventListener('click', function () { openDrawer(null); });

    var form = document.getElementById('collection-form');
    MM.bindFormValidation(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!MM.validateForm(form)) return;

      MM.simulateSave(document.getElementById('save-btn'), editingRecord ? 'Saving...' : 'Creating...', function () {
        var list = readJSON(STORAGE_KEY, []);
        var titleVal = document.getElementById('title').value.trim();
        var urlVal = document.getElementById('url').value.trim();
        if (editingRecord) {
          var idx = list.findIndex(function (c) { return c.id === editingRecord.id; });
          var updated = { id: editingRecord.id, title: titleVal, url: urlVal, created: editingRecord.created };
          if (idx > -1) { list[idx] = updated; } else { list.push(updated); }
        } else {
          list.push({ id: MM.uid('GCW'), title: titleVal, url: urlVal, created: new Date().toISOString().slice(0, 16).replace('T', ' ') });
        }
        writeJSON(STORAGE_KEY, list);
        MM.closeModal('collection-drawer');
        MM.showToast(editingRecord ? 'Collection website updated.' : 'Collection website created.');
        render();
      });
    });
  });
})();
