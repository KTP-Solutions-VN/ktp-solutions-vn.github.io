(function () {
  'use strict';
  var STORAGE_KEY = 'mm_cms_concierges';
  var DELETE_KEY = 'mm_cms_concierges_deleted';

  function blankImages(n) {
    var arr = [];
    for (var i = 0; i < n; i++) arr.push({ legend: {} });
    return arr;
  }

  var MOCK = [
    { id: 'CNC-01', title: 'Airport VIP Meet & Greet', images: [
      { legend: { en: 'Meet & greet at arrivals hall', fr: 'Accueil au hall des arrivées' } },
      { legend: { en: 'Private car to the villa', fr: 'Voiture privée jusqu’à la villa' } }
    ] },
    { id: 'CNC-02', title: 'Private Chef Booking Concierge', images: [
      { legend: { en: 'Tasting menu preparation', fr: 'Préparation du menu dégustation' } }
    ] },
    { id: 'CNC-03', title: 'Spa & Wellness Concierge', images: blankImages(2) },
    { id: 'CNC-04', title: 'Adventure & Excursion Concierge', images: blankImages(5) },
    { id: 'CNC-05', title: 'Grocery & Provisioning Concierge', images: blankImages(1) },
    { id: 'CNC-06', title: 'Celebration & Event Concierge', images: blankImages(3) },
    { id: 'CNC-07', title: 'Yacht & Boat Charter Concierge', images: [] }
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
  var rowsData = [{ legend: {} }];
  var rowSeq = 0;

  function render() {
    var all = getAll();
    var filtered = all.filter(function (c) {
      if (!state.search) return true;
      return c.title.toLowerCase().indexOf(state.search.toLowerCase()) !== -1;
    });

    var body = document.getElementById('concierge-body');
    var empty = document.getElementById('empty-state');

    if (!filtered.length) {
      body.innerHTML = '';
      empty.hidden = false;
    } else {
      empty.hidden = true;
      body.innerHTML = filtered.map(function (c, i) {
        var imgCount = (c.images || []).length;
        return '<tr>' +
          '<td class="cell-num">' + (i + 1) + '</td>' +
          '<td class="cell-strong">' + c.title + '</td>' +
          '<td class="cell-sub">' + (imgCount > 0 ? imgCount + ' image' + (imgCount > 1 ? 's' : '') : 'No images yet') + '</td>' +
          '<td><div class="row-actions">' +
            '<button class="btn btn-ghost btn-sm" data-edit="' + c.id + '">Edit</button>' +
            '<button class="btn btn-ghost btn-sm" data-delete="' + c.id + '" data-name="' + c.title + '">Delete</button>' +
          '</div></td>' +
        '</tr>';
      }).join('');
    }

    document.getElementById('result-count').textContent = filtered.length + ' of ' + all.length + ' services';
    document.getElementById('pagination-label').textContent = 'Showing 1–' + filtered.length + ' of ' + filtered.length + ' services';

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

  function rowHtml(row, lang, canRemove) {
    rowSeq++;
    var caption = (row.legend && row.legend[lang]) || '';
    return '<div class="image-row" data-row="' + rowSeq + '">' +
      '<div class="image-row__thumb" title="Click to choose an image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>' +
      '<div class="image-row__fields">' +
        '<label class="text-xs" style="font-weight:700;color:var(--color-gray-700);">Caption (' + lang.toUpperCase() + ') <span class="req">*</span></label>' +
        '<input type="text" class="row-caption" value="' + caption.replace(/"/g, '&quot;') + '" placeholder="Describe this image" required>' +
      '</div>' +
      (canRemove ? '<button type="button" class="image-row__remove" title="Remove image">&times;</button>' : '') +
    '</div>';
  }

  function renderRows() {
    var lang = document.getElementById('language').value;
    var wrap = document.getElementById('image-rows');
    wrap.innerHTML = rowsData.map(function (row, i) { return rowHtml(row, lang, i > 0); }).join('');
    wrap.querySelectorAll('.image-row__remove').forEach(function (btn, idx) {
      btn.addEventListener('click', function () {
        rowsData.splice(idx + 1, 1);
        renderRows();
      });
    });
    wrap.querySelectorAll('.row-caption').forEach(function (input, idx) {
      input.addEventListener('blur', function () {
        rowsData[idx].legend = rowsData[idx].legend || {};
        rowsData[idx].legend[lang] = input.value;
      });
    });
  }

  function openDrawer(record) {
    editingRecord = record || null;
    document.getElementById('concierge-drawer-title').textContent = record ? 'Edit Concierge Service' : 'Add Concierge Service';
    document.getElementById('save-btn').textContent = record ? 'Save Changes' : 'Save';
    document.getElementById('concierge-form').reset();
    document.getElementById('title').value = record ? record.title : '';
    document.getElementById('language').value = 'en';
    rowsData = record ? JSON.parse(JSON.stringify(record.images)) : [{ legend: {} }];
    if (!rowsData.length) rowsData = [{ legend: {} }];
    renderRows();
    MM.openModal('concierge-drawer');
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
      var btn = e.currentTarget;
      MM.simulateSave(btn, 'Deleting...', function () {
        var deleted = readJSON(DELETE_KEY, []);
        deleted.push(pendingDeleteId);
        writeJSON(DELETE_KEY, deleted);
        MM.closeModal('delete-modal');
        MM.showToast('Concierge service deleted.');
        render();
      });
    });

    document.getElementById('add-concierge-btn').addEventListener('click', function () { openDrawer(null); });
    var emptyAddBtn = document.getElementById('empty-add-concierge-btn');
    if (emptyAddBtn) emptyAddBtn.addEventListener('click', function () { openDrawer(null); });

    document.getElementById('language').addEventListener('change', renderRows);

    document.getElementById('add-image-btn').addEventListener('click', function () {
      rowsData.push({ legend: {} });
      renderRows();
    });

    var form = document.getElementById('concierge-form');
    MM.bindFormValidation(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!MM.validateForm(form)) return;

      var saveBtn = document.getElementById('save-btn');
      MM.simulateSave(saveBtn, editingRecord ? 'Saving...' : 'Creating...', function () {
        var lang = document.getElementById('language').value;
        rowsData.forEach(function (row, idx) {
          var input = document.querySelectorAll('#image-rows .row-caption')[idx];
          row.legend = row.legend || {};
          if (input) row.legend[lang] = input.value;
        });

        var list = readJSON(STORAGE_KEY, []);
        if (editingRecord) {
          var idx2 = list.findIndex(function (c) { return c.id === editingRecord.id; });
          var updated = { id: editingRecord.id, title: document.getElementById('title').value.trim(), images: rowsData };
          if (idx2 > -1) { list[idx2] = updated; } else { list.push(updated); }
        } else {
          list.push({ id: MM.uid('CNC'), title: document.getElementById('title').value.trim(), images: rowsData });
        }
        writeJSON(STORAGE_KEY, list);
        MM.closeModal('concierge-drawer');
        MM.showToast(editingRecord ? 'Concierge service updated.' : 'Concierge service created.');
        render();
      });
    });
  });
})();
