/* ==========================================================================
   Common Lookup Settings - shared geo-hierarchy mock data & generic
   list+modal CRUD renderer, reused by every screens/common-lookup-settings/
   cs-0XX-* screen's own script.js. Loaded after assets/js/global.js.
   Hierarchy: Country > Region > District > Area > Residence > Unit
   ========================================================================== */

(function () {
  'use strict';

  window.MM = window.MM || {};
  var CS = window.MM.CS = window.MM.CS || {};

  CS.COUNTRIES = [
    { id: 'c1', name: 'Singapore', createdAt: '2024-02-10' },
    { id: 'c2', name: 'Australia', createdAt: '2024-02-10' }
  ];

  CS.LANGUAGES = [
    { id: 'l1', name: 'English', countries: ['Singapore', 'Australia'] },
    { id: 'l2', name: 'Malay', countries: ['Singapore'] },
    { id: 'l3', name: 'Chinese', countries: ['Australia'] }
  ];

  CS.REGIONS = [
    { id: 'r1', country: 'Singapore', name: 'Sentosa', active: 6, inactive: 1, villaCounts: '6 active / 1 inactive' },
    { id: 'r2', country: 'Australia', name: 'Noosa', active: 2, inactive: 0, villaCounts: '2 active / 0 inactive' },
    { id: 'r3', country: 'Australia', name: 'Byron Bay', active: 3, inactive: 1, villaCounts: '3 active / 1 inactive' }
  ];

  CS.DISTRICTS = [
    { id: 'd1', country: 'Singapore', region: 'Sentosa', name: 'Sentosa Cove' },
    { id: 'd2', country: 'Singapore', region: 'Sentosa', name: 'Siloso' },
    { id: 'd3', country: 'Australia', region: 'Byron Bay', name: 'Bangalow' },
    { id: 'd4', country: 'Australia', region: 'Byron Bay', name: 'Belongil' }
  ];

  CS.AREAS = [
    { id: 'a1', country: 'Singapore', region: 'Sentosa', district: 'Sentosa Cove', name: 'Ocean Drive' },
    { id: 'a2', country: 'Singapore', region: 'Sentosa', district: 'Sentosa Cove', name: 'Cove Drive' },
    { id: 'a3', country: 'Australia', region: 'Byron Bay', district: 'Belongil', name: 'Belongil Beach' }
  ];

  CS.RESIDENCES = [
    { id: 'res1', country: 'Singapore', area: 'Cove Drive', name: 'Cove Drive Residence', image: null },
    { id: 'res2', country: 'Singapore', area: 'Ocean Drive', name: 'Ocean Drive Beach Cluster', image: null },
    { id: 'res3', country: 'Australia', area: 'Belongil Beach', name: 'Belongil Beach Villas', image: null }
  ];

  CS.LOCATION_TYPES = [
    { id: 'lt1', name: 'Beachfront', createdAt: '2024-01-05 09:12' },
    { id: 'lt2', name: 'Hillside', createdAt: '2024-01-05 09:14' },
    { id: 'lt3', name: 'City Center', createdAt: '2024-01-05 09:15' },
    { id: 'lt4', name: 'Hinterland View', createdAt: '2024-01-05 09:16' }
  ];

  CS.UNITS = [
    { id: 'u1', country: 'Singapore', residence: 'Cove Drive Residence', name: 'Unit A1' },
    { id: 'u2', country: 'Singapore', residence: 'Cove Drive Residence', name: 'Unit A2' },
    { id: 'u3', country: 'Australia', residence: 'Belongil Beach Villas', name: 'Unit B1' }
  ];

  /* Settings side-nav definition — shared across all 8 screens */
  CS.NAV_ITEMS = [
    { code: 'cs-001-common-lookup-settings', label: 'Country Setup' },
    { code: 'cs-002-languages', label: 'Language Setup' },
    { code: 'cs-003-regions', label: 'Region Setup' },
    { code: 'cs-004-areas', label: 'Area Setup' },
    { code: 'cs-005-districts', label: 'District Setup' },
    { code: 'cs-006-residence', label: 'Residence Setup' },
    { code: 'cs-007-location-types', label: 'Location Tags' },
    { code: 'cs-008-units', label: 'Unit Setup' }
  ];

  CS.renderSideNav = function (activeCode) {
    var nav = document.getElementById('cs-side-nav');
    if (!nav) return;
    nav.innerHTML = CS.NAV_ITEMS.map(function (item) {
      var active = item.code === activeCode ? ' active' : '';
      return '<a class="settings-nav__item' + active + '" href="../' + item.code + '/index.html">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
        '<span>' + item.label + '</span></a>';
    }).join('');
  };

  /* Generic list renderer: merges base + localStorage rows, wires search,
     add/edit/delete modal for simple single-field lookups (name only). */
  CS.renderSimpleList = function (opts) {
    // opts: { storageKey, baseData, tbodyId, emptyId, searchId, countId,
    //         rowHtml(item, idx), formFields:['name',...], modalTitle, entityLabel }
    var stored = JSON.parse(localStorage.getItem(opts.storageKey) || '[]');
    var hidden = JSON.parse(localStorage.getItem(opts.storageKey + '_hidden') || '[]');
    var data = opts.baseData.filter(function (d) { return hidden.indexOf(d.id) === -1; }).concat(stored);

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

  /* Full config-driven CRUD screen wiring — used by cs-003..cs-008 to avoid
     repeating the same add/edit/delete/save/search plumbing per screen.
     cfg: { navCode, storageKey, baseData, entityLabel, columns:[{key,label,cellClass}],
            fields:[{id,key,label,type:'text'|'select',required,options,placeholder}] } */
  CS.wireCrudScreen = function (cfg) {
    CS.renderSideNav(cfg.navCode);
    var editingId = null;

    function rowHtml(item, idx) {
      var cells = '<td>' + (idx + 1) + '</td>' + cfg.columns.map(function (col) {
        var val = item[col.key];
        if (Array.isArray(val)) val = val.join(', ');
        return '<td class="' + (col.cellClass || '') + '">' + (val || '—') + '</td>';
      }).join('');
      return '<tr>' + cells +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }

    var state = CS.renderSimpleList({
      storageKey: cfg.storageKey, baseData: cfg.baseData, tbodyId: 'list-tbody', emptyId: 'list-empty',
      searchId: 'search-input', countId: 'result-count', entityLabel: cfg.entityLabel, rowHtml: rowHtml
    });

    document.getElementById('clear-search-btn').addEventListener('click', function () {
      document.getElementById('search-input').value = '';
      document.getElementById('search-input').dispatchEvent(new Event('input'));
    });

    document.getElementById('add-btn').addEventListener('click', function () {
      editingId = null;
      document.getElementById('modal-title').textContent = 'Add ' + cfg.entityTitle;
      document.getElementById('item-form').reset();
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
          var val = item[f.key];
          el.value = Array.isArray(val) ? val.join(', ') : (val || '');
        });
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
      MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
        var stored = JSON.parse(localStorage.getItem(cfg.storageKey) || '[]');
        var record = editingId ? { id: editingId } : { id: MM.uid(cfg.storageKey) };
        cfg.fields.forEach(function (f) {
          var raw = document.getElementById(f.id).value.trim();
          record[f.key] = f.multi ? raw.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : raw;
        });
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
  };
})();
