(function () {
  'use strict';

  var COUNTRY_BY_REGION = {
    'Phuket Collection': 'Thailand',
    'Bali Retreats': 'Indonesia',
    'Koh Samui Estates': 'Thailand'
  };

  var GALLERY_KEY = 'mm_cms_dest_gallery';
  var LANGUAGES = (window.MM && MM.CMS && MM.CMS.LANGUAGES) || ['English', 'French', 'German', 'Thai', 'Chinese'];

  function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }
  function writeJson(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  function defaultRows(destName) {
    return [
      { id: MM.uid('IMG'), hasImage: true, imageLabel: 'hero-view.jpg', captions: { English: destName + ' — Overview' } },
      { id: MM.uid('IMG'), hasImage: true, imageLabel: 'street-scene.jpg', captions: { English: 'Life around ' + destName } }
    ];
  }

  function formatDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso + 'T09:00:00');
    if (isNaN(d.getTime())) return iso;
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var hh = String(d.getHours()).padStart(2, '0');
    var mm = String(d.getMinutes()).padStart(2, '0');
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' ' + hh + ':' + mm;
  }

  function getItems() {
    return (MM.CMS.DESTINATIONS || []).slice().sort(function (a, b) {
      var ca = COUNTRY_BY_REGION[a.region] || '', cb = COUNTRY_BY_REGION[b.region] || '';
      if (ca !== cb) return ca.localeCompare(cb);
      if (a.region !== b.region) return a.region.localeCompare(b.region);
      return a.name.localeCompare(b.name);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    function render() {
      var search = document.getElementById('search-input').value.trim().toLowerCase();
      var tbody = document.getElementById('table-body');
      var all = getItems();
      var rows = all.filter(function (i) {
        if (!search) return true;
        var country = (COUNTRY_BY_REGION[i.region] || '').toLowerCase();
        return i.name.toLowerCase().indexOf(search) !== -1 ||
          i.region.toLowerCase().indexOf(search) !== -1 ||
          country.indexOf(search) !== -1;
      });
      tbody.innerHTML = '';
      rows.forEach(function (item, idx) {
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td>' + (idx + 1) + '</td>' +
          '<td>' + (COUNTRY_BY_REGION[item.region] || '—') + '</td>' +
          '<td>' + item.region + '</td>' +
          '<td class="cell-strong">' + item.name + '</td>' +
          '<td>' + item.villaCount + '</td>' +
          '<td><span class="badge ' + (MM.CMS.STATUS_BADGE[item.status] || 'badge-neutral') + '">' + (MM.CMS.STATUS_LABEL[item.status] || item.status) + '</span></td>' +
          '<td>' + formatDate(item.updatedAt) + '</td>' +
          '<td class="row-actions">' +
            '<button class="btn btn-ghost btn-sm" data-edit="' + item.id + '">Edit</button>' +
          '</td>';
        tbody.appendChild(tr);
      });
      document.getElementById('empty-state').style.display = rows.length ? 'none' : 'block';
      document.getElementById('pagination-count').textContent = 'Showing ' + rows.length + ' of ' + all.length + ' items';
    }

    document.getElementById('search-input').addEventListener('input', render);

    document.getElementById('table-body').addEventListener('click', function (e) {
      var editBtn = e.target.closest('[data-edit]');
      if (!editBtn) return;
      var item = getItems().filter(function (d) { return d.id === editBtn.getAttribute('data-edit'); })[0];
      if (item) openDrawer(item);
    });

    var langSelect = document.getElementById('field-language');
    var rowsWrap = document.getElementById('image-rows');
    var rowsError = document.getElementById('rows-error');
    var currentDestId = null;
    var rows = [];

    function currentLang() { return langSelect.value; }

    function renderRows() {
      rowsWrap.innerHTML = '';
      rows.forEach(function (row, idx) {
        var wrap = document.createElement('div');
        wrap.className = 'logo-tile';
        wrap.style.alignItems = 'flex-start';
        wrap.dataset.rowId = row.id;
        wrap.innerHTML =
          '<div class="cms-upload-tile' + (row.hasImage ? ' has-file' : '') + '" style="cursor:pointer;" data-upload>' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' +
          '</div>' +
          '<div class="logo-tile__body">' +
            '<div class="form-hint" style="margin-bottom:6px;" data-img-label>' + (row.hasImage ? row.imageLabel : 'No image selected — click to upload') + '</div>' +
            '<input type="text" data-caption placeholder="Caption for ' + currentLang() + '..." value="' + (row.captions[currentLang()] || '').replace(/"/g, '&quot;') + '" style="width:100%; border:1px solid var(--color-gray-300); border-radius: var(--radius-sm); padding:8px 10px; font-size: var(--font-size-sm);">' +
          '</div>' +
          '<button type="button" class="btn btn-ghost btn-sm" data-remove-row title="Remove" style="color:var(--color-accent); flex-shrink:0;">' +
            (idx === 0 ? '' : '&times; Remove') +
          '</button>';
        rowsWrap.appendChild(wrap);
      });
    }

    rowsWrap.addEventListener('click', function (e) {
      var uploadTile = e.target.closest('[data-upload]');
      if (uploadTile) {
        var rowEl = uploadTile.closest('[data-row-id]');
        var row = rows.filter(function (r) { return r.id === rowEl.dataset.rowId; })[0];
        row.hasImage = true;
        row.imageLabel = 'destination-photo-' + (rows.indexOf(row) + 1) + '.jpg';
        renderRows();
        rowsError.textContent = '';
        return;
      }
      var removeBtn = e.target.closest('[data-remove-row]');
      if (removeBtn) {
        var rEl = removeBtn.closest('[data-row-id]');
        var rid = rEl.dataset.rowId;
        var idx = rows.findIndex(function (r) { return r.id === rid; });
        if (idx > 0) { rows.splice(idx, 1); renderRows(); }
      }
    });

    rowsWrap.addEventListener('input', function (e) {
      if (!e.target.matches('[data-caption]')) return;
      var rowEl = e.target.closest('[data-row-id]');
      var row = rows.filter(function (r) { return r.id === rowEl.dataset.rowId; })[0];
      row.captions[currentLang()] = e.target.value;
    });

    document.getElementById('add-row-btn').addEventListener('click', function () {
      rows.push({ id: MM.uid('IMG'), hasImage: false, imageLabel: '', captions: {} });
      renderRows();
    });

    langSelect.addEventListener('change', renderRows);

    function openDrawer(destination) {
      currentDestId = destination.id;
      document.getElementById('dest-drawer-title').textContent = 'Edit Destination Content';
      document.getElementById('field-title').value = destination.name;
      langSelect.innerHTML = LANGUAGES.map(function (l) { return '<option value="' + l + '">' + l + '</option>'; }).join('');
      langSelect.value = 'English';

      var store = readJson(GALLERY_KEY, {});
      if (!store[currentDestId]) {
        store[currentDestId] = { rows: defaultRows(destination.name) };
        writeJson(GALLERY_KEY, store);
      }
      rows = store[currentDestId].rows;
      renderRows();
      rowsError.textContent = '';
      MM.openModal('dest-drawer');
    }

    var form = document.getElementById('dest-form');
    MM.bindFormValidation(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      if (!rows.length || !rows[0].hasImage || !(rows[0].captions[currentLang()] || '').trim()) {
        rowsError.textContent = 'The first image and its caption are required.';
        valid = false;
      } else {
        rowsError.textContent = '';
      }
      if (!valid) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }

      var btn = document.getElementById('save-btn');
      MM.simulateSave(btn, 'Saving...', function () {
        var s = readJson(GALLERY_KEY, {});
        s[currentDestId] = { rows: rows };
        writeJson(GALLERY_KEY, s);
        MM.closeModal('dest-drawer');
        MM.showToast('Destination content updated.');
      });
    });

    render();
  });
})();
