(function () {
  'use strict';

  var STORAGE_NEW = 'mm_prop_properties_new';
  var STORAGE_OVERRIDES = 'mm_prop_properties_overrides';
  var STORAGE_DELETED = 'mm_prop_properties_deleted';
  var STORAGE_DETAILS = 'mm_prop_villa_details';

  function readJSON(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; }
  }
  function writeJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  function getAllProperties() {
    var extra = readJSON(STORAGE_NEW, []);
    var overrides = readJSON(STORAGE_OVERRIDES, {});
    var deleted = readJSON(STORAGE_DELETED, []);
    return MM.MOCK_PROPERTIES.concat(extra)
      .filter(function (p) { return deleted.indexOf(p.id) === -1; })
      .map(function (p) { return Object.assign({}, p, overrides[p.id] || {}); });
  }

  function saveOverride(id, fields) {
    var overrides = readJSON(STORAGE_OVERRIDES, {});
    overrides[id] = Object.assign({}, overrides[id] || {}, fields);
    writeJSON(STORAGE_OVERRIDES, overrides);
  }

  function getDetails(id) {
    var all = readJSON(STORAGE_DETAILS, {});
    return all[id] || { ota: [], documents: [] };
  }
  function saveDetails(id, patch) {
    var all = readJSON(STORAGE_DETAILS, {});
    all[id] = Object.assign({}, all[id] || { ota: [], documents: [] }, patch);
    writeJSON(STORAGE_DETAILS, all);
    return all[id];
  }

  var params = new URLSearchParams(window.location.search);
  var currentId = params.get('id') || null;
  var isAddMode = !currentId;

  function unlockTabs() {
    document.querySelectorAll('.settings-nav__item[data-locked]').forEach(function (item) {
      item.removeAttribute('data-locked');
    });
  }

  function populateOwnerSelect() {
    var sel = document.getElementById('id-owner');
    MM.MOCK_OWNERS.forEach(function (o) {
      var opt = document.createElement('option');
      opt.value = o.name; opt.textContent = o.name;
      sel.appendChild(opt);
    });
  }

  function populateCopyFromSelect(excludeId) {
    var sel = document.getElementById('ctrl-copy-from');
    getAllProperties().filter(function (p) { return p.id !== excludeId; }).forEach(function (p) {
      var opt = document.createElement('option');
      opt.value = p.id; opt.textContent = p.name;
      sel.appendChild(opt);
    });
  }

  function prefillIdentification(p) {
    document.getElementById('id-name').value = p.name || '';
    document.getElementById('id-bu').value = p.bu || '';
    document.getElementById('id-owner').value = p.owner || '';
    document.getElementById('id-type').value = p.type || '';
  }

  function renderServiceSummary(p) {
    var poolVendor = (p.bu === 'Bali Retreats') ? 'Bali Bloom Gardens' : 'Andaman Pool Services';
    var rows = [
      ['Concierge', p.concierge || 'Unassigned'],
      ['Common Area', 'In-house housekeeping team'],
      ['Electricity', 'Metered — municipal grid'],
      ['Cleaning', 'Siam Linen Supply'],
      ['Water', 'Municipal supply'],
      ['Internet', 'Fibre, 500 Mbps'],
      ['Television', 'Cable + streaming bundle'],
      ['Pool', poolVendor],
      ['Garden', poolVendor],
      ['Pest Control', 'Quarterly contract']
    ];
    document.getElementById('service-summary').innerHTML = rows.map(function (r) {
      return '<div class="service-summary-item"><div><div class="service-summary-item__label">' + r[0] + '</div><div class="service-summary-item__value">' + r[1] + '</div></div></div>';
    }).join('');
  }

  var otaLinks = [];
  function renderOtaTable() {
    var tbody = document.getElementById('ota-tbody');
    var empty = document.getElementById('ota-empty');
    if (!otaLinks.length) { tbody.innerHTML = ''; empty.hidden = false; return; }
    empty.hidden = true;
    tbody.innerHTML = otaLinks.map(function (o, i) {
      return '<tr><td>' + o.email + '</td><td class="cell-strong">' + o.listingId + '</td><td class="cell-sub">' + o.link + '</td><td>' + (o.otaId || '—') + '</td><td>' + (o.vat || '—') + '</td>' +
        '<td><div class="row-actions">' +
        '<button class="icon-action" data-ota-edit="' + i + '" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
        '<button class="icon-action danger" data-ota-delete="' + i + '" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
        '</div></td></tr>';
    }).join('');
    tbody.querySelectorAll('[data-ota-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () { openOtaModal(parseInt(btn.getAttribute('data-ota-edit'), 10)); });
    });
    tbody.querySelectorAll('[data-ota-delete]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        otaLinks.splice(parseInt(btn.getAttribute('data-ota-delete'), 10), 1);
        if (currentId) saveDetails(currentId, { ota: otaLinks });
        renderOtaTable();
        MM.showToast('OTA link removed.');
      });
    });
  }

  var editingOtaIndex = null;
  function openOtaModal(index) {
    var form = document.getElementById('ota-form');
    editingOtaIndex = (typeof index === 'number') ? index : null;
    document.getElementById('ota-modal-title').textContent = editingOtaIndex === null ? 'Add OTA link' : 'Edit OTA link';
    if (editingOtaIndex !== null) {
      var o = otaLinks[editingOtaIndex];
      document.getElementById('ota-email').value = o.email;
      document.getElementById('ota-listing-id').value = o.listingId;
      document.getElementById('ota-link').value = o.link;
      document.getElementById('ota-id').value = o.otaId || '';
      document.getElementById('ota-vat').value = o.vat || '';
    } else {
      form.reset();
    }
    MM.openModal('ota-modal');
  }

  var docs = [];
  function renderDocTable() {
    var tbody = document.getElementById('doc-tbody');
    if (!docs.length) {
      tbody.innerHTML = '<tr><td colspan="4" class="text-muted text-sm">No documents uploaded yet.</td></tr>';
      return;
    }
    tbody.innerHTML = docs.map(function (d, i) {
      return '<tr><td class="cell-strong">' + d.title + '</td><td>' + d.type + '</td><td class="cell-sub">' + d.date + '</td>' +
        '<td><div class="row-actions"><button class="icon-action danger" data-doc-delete="' + i + '" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div></td></tr>';
    }).join('');
    tbody.querySelectorAll('[data-doc-delete]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        docs.splice(parseInt(btn.getAttribute('data-doc-delete'), 10), 1);
        if (currentId) saveDetails(currentId, { documents: docs });
        renderDocTable();
      });
    });
  }

  var controlPointCount = 0;
  function addControlPointRow(legend) {
    controlPointCount++;
    var wrap = document.getElementById('control-points');
    var row = document.createElement('div');
    row.className = 'control-point-row';
    row.innerHTML = '<div class="upload-dropzone" data-upload="cp-' + controlPointCount + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><span>Photo</span></div>' +
      '<input type="text" placeholder="Control point description" value="' + (legend || '') + '">' +
      '<button type="button" class="icon-action" title="Remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
    row.querySelector('.icon-action').addEventListener('click', function () { row.remove(); });
    row.querySelector('.upload-dropzone').addEventListener('click', function () {
      this.classList.add('has-file'); this.querySelector('span').textContent = 'Uploaded';
    });
    wrap.appendChild(row);
  }

  function addReminderRow() {
    var wrap = document.getElementById('custom-reminders');
    var row = document.createElement('div');
    row.className = 'custom-reminder-row';
    row.innerHTML = '<input type="text" placeholder="Custom reminder text">' +
      '<button type="button" class="icon-action" title="Remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
    row.querySelector('.icon-action').addEventListener('click', function () { row.remove(); });
    wrap.appendChild(row);
  }

  function toast(msg) { MM.showToast(msg); }

  document.addEventListener('DOMContentLoaded', function () {
    populateOwnerSelect();

    var all = getAllProperties();
    var current = currentId ? all.filter(function (p) { return p.id === currentId; })[0] : null;
    if (!current) { currentId = null; isAddMode = true; }

    if (current) {
      unlockTabs();
      prefillIdentification(current);
      document.getElementById('pv-title').textContent = 'Edit Property — ' + current.name;
      document.getElementById('pv-subtitle').textContent = current.id + ' · ' + current.bu;
      document.getElementById('bc-current').textContent = current.name;
      document.getElementById('delete-villa-btn').hidden = false;
      document.getElementById('del-villa-name').textContent = current.name;
      document.getElementById('bs-status').value = current.status || 'active';
      renderServiceSummary(current);
      document.getElementById('service-settings-link').href = '../prop-049-property-service-utility-settings/index.html?id=' + current.id;
      var details = getDetails(current.id);
      otaLinks = details.ota || [];
      docs = details.documents || [];
    } else {
      renderServiceSummary({ concierge: null, bu: 'Phuket Collection' });
      document.getElementById('service-settings-link').href = '../prop-049-property-service-utility-settings/index.html';
    }
    renderOtaTable();
    renderDocTable();
    populateCopyFromSelect(currentId);
    addControlPointRow('Living room switched off, doors locked');

    var tabParam = params.get('tab');
    if (tabParam) {
      var navMap = { identification: 'identification', service: 'service', 'service and utilities': 'service' };
      var target = navMap[tabParam] || tabParam;
      var navItem = document.querySelector('[data-settings-nav-item="' + target + '"]');
      if (navItem && !navItem.hasAttribute('data-locked')) navItem.click();
    }

    /* Block clicks on locked tabs before global.js's handler runs */
    document.addEventListener('click', function (e) {
      var item = e.target.closest('[data-settings-nav-item]');
      if (item && item.hasAttribute('data-locked')) {
        e.stopImmediatePropagation();
        e.preventDefault();
        MM.showToast('Save the Identification tab first to unlock this section.', { danger: true });
      }
    }, true);

    /* Identification save */
    var idForm = document.getElementById('form-identification');
    MM.bindFormValidation(idForm);
    document.getElementById('save-identification-btn').addEventListener('click', function () {
      if (!MM.validateForm(idForm)) return;
      var name = document.getElementById('id-name').value.trim();
      var dupe = getAllProperties().some(function (p) { return p.id !== currentId && p.name.toLowerCase() === name.toLowerCase(); });
      var nameGroup = document.getElementById('id-name').closest('.form-group');
      if (dupe) {
        nameGroup.classList.add('has-error');
        nameGroup.querySelector('.form-error').textContent = 'A property with this name already exists.';
        return;
      }
      var btn = this;
      MM.simulateSave(btn, 'Saving...', function () {
        var fields = {
          name: name,
          bu: document.getElementById('id-bu').value,
          owner: document.getElementById('id-owner').value || null,
          type: document.getElementById('id-type').value
        };
        if (currentId) {
          saveOverride(currentId, fields);
          toast('Identification details saved.');
        } else {
          var newId = MM.uid('PV');
          var newProp = Object.assign({ id: newId, concierge: null, photosComplete: false, onboarding: 'onboarding', bedrooms: 0, status: 'onboarding' }, fields);
          var list = readJSON(STORAGE_NEW, []);
          list.push(newProp);
          writeJSON(STORAGE_NEW, list);
          currentId = newId;
          isAddMode = false;
          var url = new URL(window.location.href);
          url.searchParams.set('id', newId);
          window.history.replaceState({}, '', url);
          unlockTabs();
          document.getElementById('pv-title').textContent = 'Edit Property — ' + name;
          document.getElementById('bc-current').textContent = name;
          document.getElementById('delete-villa-btn').hidden = false;
          document.getElementById('del-villa-name').textContent = name;
          populateCopyFromSelect(currentId);
          toast('Property created — continue completing the remaining tabs.');
        }
      });
    });

    /* Business Situation: ownership sub-form toggle */
    document.getElementById('bs-ownership').addEventListener('change', function () {
      document.querySelectorAll('.situation-sub').forEach(function (el) {
        el.hidden = el.getAttribute('data-situation') !== this.value;
      }, this);
    });

    /* Property Type: pool toggle */
    var poolToggle = document.getElementById('pt-is-pool');
    function syncPoolFields() { document.getElementById('pt-pool-fields').style.display = poolToggle.checked ? 'grid' : 'none'; }
    poolToggle.addEventListener('change', syncPoolFields);
    syncPoolFields();

    /* Finance: for-sale toggle */
    var forSaleToggle = document.getElementById('fin-for-sale');
    function syncSaleFields() { document.getElementById('fin-sale-fields').style.display = forSaleToggle.checked ? 'grid' : 'none'; }
    forSaleToggle.addEventListener('change', syncSaleFields);
    syncSaleFields();

    /* Generic tab-save buttons */
    document.querySelectorAll('[data-tab-save]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tab = btn.getAttribute('data-tab-save');
        if (tab === 'finance' && forSaleToggle.checked) {
          var priceInput = document.getElementById('fin-sale-price');
          if (!priceInput.value) {
            priceInput.closest('.form-group').classList.add('has-error');
            priceInput.closest('.form-group').querySelector('.form-error').textContent = 'Selling price is required when listed for sale.';
            return;
          }
        }
        if (tab === 'portal') {
          var version = document.getElementById('portal-version');
          if (!MM.validateField(version)) return;
        }
        MM.simulateSave(btn, 'Saving...', function () {
          if (tab === 'situation' && currentId) {
            saveOverride(currentId, { status: document.getElementById('bs-status').value });
          }
          if (tab === 'type' && currentId) {
            var beds = parseInt(document.getElementById('pt-beds').value, 10);
            if (beds) saveOverride(currentId, { bedrooms: beds });
          }
          toast('Changes saved.');
        });
      });
    });

    /* OTA Management */
    document.getElementById('add-ota-btn').addEventListener('click', function () { openOtaModal(null); });
    var otaForm = document.getElementById('ota-form');
    MM.bindFormValidation(otaForm);
    document.getElementById('ota-save-btn').addEventListener('click', function () {
      if (!MM.validateForm(otaForm)) return;
      var entry = {
        email: document.getElementById('ota-email').value,
        listingId: document.getElementById('ota-listing-id').value.trim(),
        link: document.getElementById('ota-link').value.trim(),
        otaId: document.getElementById('ota-id').value.trim(),
        vat: document.getElementById('ota-vat').value.trim()
      };
      var btn = this;
      MM.simulateSave(btn, 'Saving...', function () {
        if (editingOtaIndex !== null) otaLinks[editingOtaIndex] = entry; else otaLinks.push(entry);
        if (currentId) saveDetails(currentId, { ota: otaLinks });
        renderOtaTable();
        MM.closeModal('ota-modal');
        toast('OTA link saved.');
      });
    });

    /* Documents */
    var docForm = document.getElementById('form-document');
    MM.bindFormValidation(docForm);
    document.getElementById('add-doc-btn').addEventListener('click', function () {
      if (!MM.validateForm(docForm)) return;
      docs.push({
        title: document.getElementById('doc-title').value.trim(),
        type: document.getElementById('doc-type').value,
        date: new Date().toISOString().slice(0, 10)
      });
      if (currentId) saveDetails(currentId, { documents: docs });
      renderDocTable();
      document.getElementById('doc-title').value = '';
      document.getElementById('doc-type').value = '';
      toast('Document added.');
    });

    /* Control tab */
    document.getElementById('add-control-point-btn').addEventListener('click', function () { addControlPointRow(''); });
    document.getElementById('add-reminder-btn').addEventListener('click', addReminderRow);
    document.getElementById('ctrl-copy-btn').addEventListener('click', function () {
      var sel = document.getElementById('ctrl-copy-from');
      if (!sel.value) { MM.showToast('Select a property to copy from first.', { danger: true }); return; }
      addControlPointRow('Copied: verify pool cover is on');
      addControlPointRow('Copied: check minibar restocked');
      MM.showToast('Control points copied from ' + sel.options[sel.selectedIndex].textContent + '.');
    });

    /* Upload dropzones (generic — cosmetic only) */
    document.querySelectorAll('.upload-dropzone[data-upload]').forEach(function (dz) {
      dz.addEventListener('click', function () {
        if (dz.closest('.control-point-row')) return; // handled separately
        dz.classList.add('has-file');
        var span = dz.querySelector('span');
        if (span) span.textContent = 'File attached';
      });
    });

    /* Delete property */
    document.getElementById('delete-villa-btn').addEventListener('click', function () { MM.openModal('delete-villa-modal'); });
    document.getElementById('confirm-delete-villa-btn').addEventListener('click', function () {
      if (!currentId) return;
      var deleted = readJSON(STORAGE_DELETED, []);
      deleted.push(currentId);
      writeJSON(STORAGE_DELETED, deleted);
      window.location.href = '../prop-033-property-list/index.html';
    });
  });
})();
