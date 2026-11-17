/* ==========================================================================
   Villa Common Settings — shared mock data & generic list+modal CRUD
   renderer, reused by every screens/villa-common-settings/vcs-0XX.../script.js.
   Loaded after assets/js/global.js. Mirrors the common-lookup-settings
   module's cs-shared.js pattern.
   ========================================================================== */

(function () {
  'use strict';

  window.MM = window.MM || {};
  var VCS = window.MM.VCS = window.MM.VCS || {};

  VCS.AMENITIES = [
    { id: 'am1', name: 'Private Infinity Pool', createdAt: '2024-01-08 10:02' },
    { id: 'am2', name: 'Beachfront Access', createdAt: '2024-01-08 10:04' },
    { id: 'am3', name: 'In-villa Chef Service', createdAt: '2024-01-09 09:15' },
    { id: 'am4', name: 'Home Theatre Room', createdAt: '2024-01-09 09:20' },
    { id: 'am5', name: 'Air Conditioning (All Rooms)', createdAt: '2024-01-10 14:41' },
    { id: 'am6', name: 'Complimentary WiFi', createdAt: '2024-01-10 14:44' }
  ];

  VCS.PRICE_CATEGORIES = [
    { id: 'pc1', name: 'Low Season', description: 'Off-peak pricing, May–Jun & Sep–Oct', createdAt: '2024-01-05 08:00' },
    { id: 'pc2', name: 'High Season', description: 'Peak demand, Jul–Aug & Dec–Jan', createdAt: '2024-01-05 08:02' },
    { id: 'pc3', name: 'Festive Peak', description: 'Christmas, New Year and Songkran surcharge tier', createdAt: '2024-01-05 08:05' }
  ];

  VCS.PROPERTY_CATEGORIES = ['Flat', 'House', 'Resort'];

  VCS.PROPERTY_TYPES = [
    { id: 'pt1', name: 'Beachfront Villa', category: 'House', updatedAt: '2024-02-01', updatedBy: 'Somchai A.' },
    { id: 'pt2', name: 'Hillside Retreat', category: 'House', updatedAt: '2024-02-02', updatedBy: 'Somchai A.' },
    { id: 'pt3', name: 'Penthouse Suite', category: 'Flat', updatedAt: '2024-02-03', updatedBy: 'Wayan K.' },
    { id: 'pt4', name: 'Boutique Resort Bungalow', category: 'Resort', updatedAt: '2024-02-05', updatedBy: 'Nok P.' }
  ];

  VCS.SERVICES = [
    { id: 'sv1', name: 'Daily Housekeeping', createdAt: '2024-01-12 11:00' },
    { id: 'sv2', name: 'Airport Transfer', createdAt: '2024-01-12 11:05' },
    { id: 'sv3', name: 'Private Chef', createdAt: '2024-01-12 11:08' },
    { id: 'sv4', name: 'Pool & Garden Maintenance', createdAt: '2024-01-13 09:30' },
    { id: 'sv5', name: 'In-villa Spa Treatment', createdAt: '2024-01-13 09:35' }
  ];

  VCS.CONTRACT_SERVICE_TYPES = [
    { id: 'cst1', name: 'Daily Housekeeping + Pool & Garden Maintenance', serviceIds: ['sv1', 'sv4'], createdAt: '2024-01-14 10:00' },
    { id: 'cst2', name: 'Airport Transfer + Private Chef', serviceIds: ['sv2', 'sv3'], createdAt: '2024-01-14 10:05' }
  ];

  VCS.PROVIDER_SERVICES = [
    { id: 'ps1', name: 'Pool Maintenance', createdAt: '2024-01-02 09:00' },
    { id: 'ps2', name: 'Garden Maintenance', createdAt: '2024-01-02 09:02' },
    { id: 'ps3', name: 'Linen & Laundry', createdAt: '2024-01-02 09:04' },
    { id: 'ps4', name: 'Photography', createdAt: '2024-01-02 09:06' }
  ];

  VCS.BUSINESS_UNITS = ['Phuket Collection', 'Bali Retreats', 'Koh Samui Estates'];

  VCS.SERVICE_PROVIDERS = [
    { id: 'sp1', name: 'Andaman Pool Services', serviceIds: ['ps1'], businessUnits: ['Phuket Collection'], contactPerson: 'Nattapong S.', address: '221 Thalang Rd, Phuket', country: 'Thailand', phone: '+66 76 123 456', email: 'contact@andamanpool.example', status: 'Active', createdAt: '2024-01-15', createdBy: 'Somchai A.' },
    { id: 'sp2', name: 'Bali Bloom Gardens', serviceIds: ['ps2'], businessUnits: ['Bali Retreats'], contactPerson: 'Made Wirawan', address: 'Jl. Petitenget No. 12, Seminyak', country: 'Indonesia', phone: '+62 361 555 210', email: 'hello@balibloom.example', status: 'Active', createdAt: '2024-01-16', createdBy: 'Wayan K.' },
    { id: 'sp3', name: 'Siam Linen Supply', serviceIds: ['ps3'], businessUnits: ['Phuket Collection', 'Koh Samui Estates'], contactPerson: 'Pranee K.', address: '88 Chalong Bay Rd, Phuket', country: 'Thailand', phone: '+66 76 998 112', email: 'sales@siamlinen.example', status: 'Inactive', createdAt: '2024-01-18', createdBy: 'Nok P.' },
    { id: 'sp4', name: 'Phuket Frame Photography', serviceIds: ['ps4'], businessUnits: ['Phuket Collection'], contactPerson: 'Anurak T.', address: '15 Rawai Beach Rd, Phuket', country: 'Thailand', phone: '+66 81 234 987', email: 'book@phuketframe.example', status: 'Active', createdAt: '2024-01-20', createdBy: 'Somchai A.' }
  ];

  VCS.PROPERTY_USAGE = [
    { id: 'pu1', name: 'Holiday Rental', createdAt: '2024-01-03 08:10' },
    { id: 'pu2', name: 'Long-term Lease', createdAt: '2024-01-03 08:12' },
    { id: 'pu3', name: 'Owner Personal Use', createdAt: '2024-01-03 08:14' }
  ];

  VCS.VILLA_ACTIVITIES = [
    { id: 'va1', name: 'Sunrise Yoga', createdAt: '2024-01-06 09:00' },
    { id: 'va2', name: 'Private Cooking Class', createdAt: '2024-01-06 09:05' },
    { id: 'va3', name: 'Sunset Fishing Trip', createdAt: '2024-01-06 09:10' },
    { id: 'va4', name: 'Snorkelling Excursion', createdAt: '2024-01-06 09:15' }
  ];

  VCS.ACCESSIBILITY = [
    { id: 'ac1', name: 'Close to the Beach (< 5 min walk)', createdAt: '2024-01-07 10:00' },
    { id: 'ac2', name: 'Far from Downtown (> 30 min drive)', createdAt: '2024-01-07 10:05' },
    { id: 'ac3', name: 'Wheelchair Accessible', createdAt: '2024-01-07 10:10' }
  ];

  VCS.TRANSPORT = [
    { id: 'tr1', name: 'Private Car with Driver', createdAt: '2024-01-11 11:00' },
    { id: 'tr2', name: 'Speedboat Transfer', createdAt: '2024-01-11 11:05' },
    { id: 'tr3', name: 'Motorbike Rental', createdAt: '2024-01-11 11:10' }
  ];

  VCS.REMINDERS = [
    { id: 'rm1', name: 'Confirm airport pickup time 24h before arrival', order: 1, createdAt: '2024-01-02 08:00' },
    { id: 'rm2', name: 'Restock welcome amenities before check-in', order: 2, createdAt: '2024-01-02 08:05' },
    { id: 'rm3', name: 'Test pool heater 2 days before arrival (Dec–Feb)', order: 3, createdAt: '2024-01-02 08:10' },
    { id: 'rm4', name: 'Send pre-arrival guest questionnaire', order: 4, createdAt: '2024-01-02 08:15' }
  ];

  /* Settings side-nav definition — shared across all 11 VCS screens.
     Each item has its own icon (distinct per item, not a repeated generic
     gear) so the vertical settings nav is scannable at a glance. */
  VCS.NAV_ITEMS = [
    { code: 'vcs-001-amenities-list', label: 'Amenities', icon: '<path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M8.5 13.5 6 21l6-3 6 3-2.5-7.5"/>' },
    { code: 'vcs-002-price-categories', label: 'Price Categories', icon: '<path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z"/><circle cx="7" cy="7" r="1.2"/>' },
    { code: 'vcs-003-property-types', label: 'Property Types', icon: '<path d="M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><path d="M9 22V12h6v10"/>' },
    { code: 'vcs-004-services', label: 'Services', icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' },
    { code: 'vcs-005-contract-service-types', label: 'Contract Service Types', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' },
    { code: 'vcs-006-service-providers', label: 'Service Providers', icon: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>' },
    { code: 'vcs-007-property-usage', label: 'Property Usage', icon: '<circle cx="7" cy="17" r="4"/><path d="M10.5 13.5 21 3M17 7l3 3M14 4l3 3"/>' },
    { code: 'vcs-008-villa-activities', label: 'Villa Activities', icon: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>' },
    { code: 'vcs-009-accessibility', label: 'Accessibility', icon: '<circle cx="12" cy="5" r="2"/><path d="M6 21l4-8 2 4 4 4M8 13h8"/><circle cx="17" cy="19" r="3"/>' },
    { code: 'vcs-010-transport', label: 'Transport', icon: '<path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>' },
    { code: 'vcs-011-reminders', label: 'Reminders', icon: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>' }
  ];

  VCS.renderSideNav = function (activeCode) {
    var nav = document.getElementById('vcs-side-nav');
    if (!nav) return;
    nav.innerHTML = VCS.NAV_ITEMS.map(function (item) {
      var active = item.code === activeCode ? ' active' : '';
      return '<a class="settings-nav__item' + active + '" href="../' + item.code + '/index.html">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">' + item.icon + '</svg>' +
        '<span>' + item.label + '</span></a>';
    }).join('');
  };

  /* Generic list renderer: merges base + localStorage rows, wires search. */
  VCS.renderSimpleList = function (opts) {
    var stored = JSON.parse(localStorage.getItem(opts.storageKey) || '[]');
    var hidden = JSON.parse(localStorage.getItem(opts.storageKey + '_hidden') || '[]');
    var data = opts.baseData.filter(function (d) { return hidden.indexOf(d.id) === -1; }).concat(stored);
    if (opts.sort) data.sort(opts.sort);

    function renderRows(filtered) {
      var tbody = document.getElementById(opts.tbodyId);
      var empty = document.getElementById(opts.emptyId);
      if (!filtered.length) {
        tbody.innerHTML = '';
        if (empty) empty.hidden = false;
        return;
      }
      if (empty) empty.hidden = true;
      tbody.innerHTML = filtered.map(opts.rowHtml).join('');
    }

    renderRows(data);
    var countEl = document.getElementById(opts.countId);
    if (countEl) countEl.textContent = data.length + ' ' + opts.entityLabel + (data.length === 1 ? '' : 's');

    var searchInput = document.getElementById(opts.searchId);
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        var q = searchInput.value.trim().toLowerCase();
        var filtered = data.filter(function (item) {
          return JSON.stringify(item).toLowerCase().indexOf(q) !== -1;
        });
        renderRows(filtered);
        if (countEl) countEl.textContent = filtered.length + ' ' + opts.entityLabel + (filtered.length === 1 ? '' : 's');
      });
    }

    return { data: data, refresh: renderRows };
  };

  /* Config-driven CRUD wiring for the simple name-only (+optional extra text
     fields) lookup screens: VCS-001,002,003,004,007,008,009,010. */
  VCS.wireCrudScreen = function (cfg) {
    VCS.renderSideNav(cfg.navCode);
    var editingId = null;

    function rowHtml(item, idx) {
      var cells = '<td>' + (idx + 1) + '</td>' + cfg.columns.map(function (col) {
        var val = col.render ? col.render(item) : item[col.key];
        if (Array.isArray(val)) val = val.join(', ');
        return '<td class="' + (col.cellClass || '') + '">' + (val || '—') + '</td>';
      }).join('');
      return '<tr>' + cells +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }

    var state = VCS.renderSimpleList({
      storageKey: cfg.storageKey, baseData: cfg.baseData, tbodyId: 'list-tbody', emptyId: 'list-empty',
      searchId: 'search-input', countId: 'result-count', entityLabel: cfg.entityLabel, rowHtml: rowHtml, sort: cfg.sort
    });

    var clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) clearBtn.addEventListener('click', function () {
      document.getElementById('search-input').value = '';
      document.getElementById('search-input').dispatchEvent(new Event('input'));
    });

    document.getElementById('add-btn').addEventListener('click', function () {
      editingId = null;
      document.getElementById('modal-title').textContent = 'Add ' + cfg.entityTitle;
      document.getElementById('item-form').reset();
      if (cfg.onOpenForm) cfg.onOpenForm(null);
      MM.openModal('item-modal');
    });

    document.getElementById('list-tbody').addEventListener('click', function (e) {
      var editBtn = e.target.closest('[data-edit]'), delBtn = e.target.closest('[data-delete]');
      if (editBtn) {
        var item = state.data.find(function (d) { return d.id === editBtn.dataset.edit; });
        if (!item) return;
        editingId = item.id;
        document.getElementById('modal-title').textContent = 'Edit ' + cfg.entityTitle;
        cfg.fields.forEach(function (f) {
          var el = document.getElementById(f.id);
          if (!el) return;
          var val = item[f.key];
          el.value = Array.isArray(val) ? val.join(', ') : (val || '');
        });
        if (cfg.onOpenForm) cfg.onOpenForm(item);
        MM.openModal('item-modal');
      }
      if (delBtn) {
        var target = state.data.find(function (d) { return d.id === delBtn.dataset.delete; });
        if (!target) return;
        editingId = target.id;
        document.getElementById('del-name').textContent = target[cfg.nameField || 'name'];
        MM.openModal('delete-modal');
      }
    });

    document.getElementById('save-btn').addEventListener('click', function () {
      var form = document.getElementById('item-form');
      if (!MM.validateForm(form)) return;
      if (cfg.customValidate && !cfg.customValidate()) return;
      MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
        var stored = JSON.parse(localStorage.getItem(cfg.storageKey) || '[]');
        var record = editingId ? { id: editingId } : { id: MM.uid(cfg.storageKey) };
        cfg.fields.forEach(function (f) {
          var raw = document.getElementById(f.id).value.trim();
          record[f.key] = f.multi ? raw.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : raw;
        });
        if (cfg.beforeSave) cfg.beforeSave(record);
        if (!record.createdAt) record.createdAt = new Date().toISOString().slice(0, 10) + ' ' + new Date().toTimeString().slice(0, 5);
        if (editingId) {
          var idx = stored.findIndex(function (d) { return d.id === editingId; });
          if (idx > -1) stored[idx] = Object.assign({}, stored[idx], record);
          else stored.push(record);
        } else {
          stored.push(record);
        }
        localStorage.setItem(cfg.storageKey, JSON.stringify(stored));
        MM.closeModal('item-modal');
        MM.showToast(editingId ? cfg.entityTitle + ' updated' : cfg.entityTitle + ' added');
        setTimeout(function () { window.location.reload(); }, 500);
      });
    });

    document.getElementById('confirm-delete-btn').addEventListener('click', function () {
      var stored = JSON.parse(localStorage.getItem(cfg.storageKey) || '[]').filter(function (d) { return d.id !== editingId; });
      localStorage.setItem(cfg.storageKey, JSON.stringify(stored));
      var hidden = JSON.parse(localStorage.getItem(cfg.storageKey + '_hidden') || '[]');
      if (cfg.baseData.some(function (d) { return d.id === editingId; })) { hidden.push(editingId); localStorage.setItem(cfg.storageKey + '_hidden', JSON.stringify(hidden)); }
      MM.closeModal('delete-modal');
      MM.showToast(cfg.entityTitle + ' deleted', { danger: true });
      setTimeout(function () { window.location.reload(); }, 500);
    });

    return state;
  };
})();
