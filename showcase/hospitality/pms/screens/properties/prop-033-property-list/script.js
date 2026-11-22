(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Canonical property extension data (Type / Area) — reused by every  */
  /* PROP-0xx screen that needs these fields, keyed by the shared       */
  /* MM.MOCK_PROPERTIES id so villa attributes stay identical across    */
  /* every screen in the Properties module.                             */
  /* ------------------------------------------------------------------ */
  var PROPERTY_EXT = {
    'PV-101': { type: 'Pool Villa', area: 'Sentosa Cove' },
    'PV-102': { type: 'Pool Villa', area: 'Ocean Drive' },
    'PV-103': { type: 'Beachfront Villa', area: 'Wategos' },
    'PV-104': { type: 'Hillside Villa', area: 'Bangalow' },
    'PV-105': { type: 'Pool Villa', area: 'Paradise Island' },
    'PV-106': { type: 'Garden Villa', area: 'Noosaville' },
    'PV-107': { type: 'Pool Villa', area: 'Sunshine Beach' },
    'PV-108': { type: 'Beachfront Villa', area: 'Belongil' }
  };
  var DEFAULT_EXT = { type: 'Pool Villa', area: 'New Area' };

  var STORAGE_NEW = 'mm_prop_properties_new';
  var STORAGE_OVERRIDES = 'mm_prop_properties_overrides';
  var STORAGE_DELETED = 'mm_prop_properties_deleted';

  function readJSON(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; }
  }

  function ownerForProperty(propId) {
    var owner = MM.MOCK_OWNERS.filter(function (o) { return o.properties.indexOf(propId) !== -1; })[0];
    return owner ? owner.name : null;
  }

  function getAllProperties() {
    var extra = readJSON(STORAGE_NEW, []);
    var overrides = readJSON(STORAGE_OVERRIDES, {});
    var deleted = readJSON(STORAGE_DELETED, []);
    var base = MM.MOCK_PROPERTIES.concat(extra);
    return base
      .filter(function (p) { return deleted.indexOf(p.id) === -1; })
      .map(function (p) {
        var merged = Object.assign({}, p, overrides[p.id] || {});
        var ext = PROPERTY_EXT[merged.id] || DEFAULT_EXT;
        merged.type = merged.type || ext.type;
        merged.area = merged.area || ext.area;
        merged.owner = merged.owner || ownerForProperty(merged.id);
        return merged;
      });
  }

  var state = { search: '', bu: '', status: '', concierge: '', activeOnly: true, sort: 'name-asc', group: '' };

  var statusLabel = { active: 'Active', onboarding: 'Onboarding', paused: 'Paused', closed: 'Closed' };
  var statusBadge = { active: 'badge-success', onboarding: 'badge-info', paused: 'badge-warning', closed: 'badge-danger' };

  function applyFilters(list) {
    return list.filter(function (p) {
      if (state.activeOnly && (p.status === 'closed' || p.status === 'paused')) return false;
      if (state.search) {
        var q = state.search.toLowerCase();
        var hay = (p.name + ' ' + p.id + ' ' + (p.owner || '')).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      if (state.bu && p.bu !== state.bu) return false;
      if (state.status && p.status !== state.status) return false;
      if (state.concierge === 'assigned' && !p.concierge) return false;
      if (state.concierge === 'unassigned' && p.concierge) return false;
      return true;
    });
  }

  function applySort(list) {
    var sorted = list.slice();
    switch (state.sort) {
      case 'name-desc': sorted.sort(function (a, b) { return b.name.localeCompare(a.name); }); break;
      case 'bedrooms-desc': sorted.sort(function (a, b) { return b.bedrooms - a.bedrooms; }); break;
      case 'status': sorted.sort(function (a, b) { return a.status.localeCompare(b.status); }); break;
      default: sorted.sort(function (a, b) { return a.name.localeCompare(b.name); });
    }
    return sorted;
  }

  function rowHtml(p) {
    var ownerCell = p.owner
      ? '<a href="../../owner-management/own-001-owner-agency-list/index.html" class="owner-link">' + p.owner + '</a>'
      : '<span class="owner-pending">Pending assignment</span>';
    var conciergeCell = p.concierge ? p.concierge : '<span class="text-muted">Unassigned</span>';
    return '<tr>' +
      '<td><div class="property-name-wrap"><span class="cell-strong">' + p.name + '</span><span class="cell-sub">' + p.id + ' &middot; ' + p.bedrooms + ' bed</span></div></td>' +
      '<td>' + p.bu + '</td>' +
      '<td>' + p.type + '</td>' +
      '<td>' + p.area + '</td>' +
      '<td>' + ownerCell + '</td>' +
      '<td>' + conciergeCell + '</td>' +
      '<td><span class="badge ' + (statusBadge[p.status] || 'badge-neutral') + '">' + (statusLabel[p.status] || p.status) + '</span></td>' +
      '<td><div class="row-actions">' +
        '<button class="icon-action" title="View details" data-view="' + p.id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>' +
        '<button class="icon-action" title="Edit property" data-edit="' + p.id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
        '<button class="icon-action" title="Service settings" data-service="' + p.id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></button>' +
        '<button class="icon-action" title="Inventory" data-inventory="' + p.id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg></button>' +
        '<button class="icon-action" title="Download guest contract" data-contract="' + p.id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></button>' +
        '<button class="icon-action" title="Duplicate" data-duplicate="' + p.id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>' +
        '<button class="icon-action danger" title="Delete" data-delete="' + p.id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
      '</div></td>' +
      '</tr>';
  }

  var GROUP_LABELS_BU = ['Sentosa Collection', 'Byron Bay Retreats', 'Noosa Estates'];
  var GROUP_LABELS_STATUS = ['active', 'onboarding', 'paused', 'closed'];

  function render() {
    var all = getAllProperties();
    var filtered = applyFilters(all);
    var sorted = applySort(filtered);

    var tbody = document.getElementById('properties-tbody');
    var empty = document.getElementById('properties-empty');

    if (!sorted.length) {
      tbody.innerHTML = '';
      empty.hidden = false;
    } else {
      empty.hidden = true;
      if (state.group === 'bu') {
        var html = '';
        GROUP_LABELS_BU.forEach(function (bu) {
          var rows = sorted.filter(function (p) { return p.bu === bu; });
          if (!rows.length) return;
          html += '<tr class="group-heading"><td colspan="8">' + bu + ' &middot; ' + rows.length + '</td></tr>';
          html += rows.map(rowHtml).join('');
        });
        tbody.innerHTML = html;
      } else if (state.group === 'status') {
        var html2 = '';
        GROUP_LABELS_STATUS.forEach(function (st) {
          var rows = sorted.filter(function (p) { return p.status === st; });
          if (!rows.length) return;
          html2 += '<tr class="group-heading"><td colspan="8">' + (statusLabel[st] || st) + ' &middot; ' + rows.length + '</td></tr>';
          html2 += rows.map(rowHtml).join('');
        });
        tbody.innerHTML = html2;
      } else {
        tbody.innerHTML = sorted.map(rowHtml).join('');
      }
    }

    document.getElementById('result-count').textContent = sorted.length + ' of ' + all.length + ' properties';
    document.getElementById('pg-count').textContent = sorted.length;
    document.getElementById('pg-total').textContent = sorted.length;

    document.getElementById('stat-total').textContent = all.length;
    document.getElementById('stat-active').textContent = all.filter(function (p) { return p.status === 'active'; }).length;
    document.getElementById('stat-onboarding').textContent = all.filter(function (p) { return p.status === 'onboarding'; }).length;
    document.getElementById('stat-noconcierge').textContent = all.filter(function (p) { return !p.concierge; }).length;

    wireRowActions(all);
  }

  function wireRowActions(all) {
    var tbody = document.getElementById('properties-tbody');
    tbody.querySelectorAll('[data-view]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.location.href = '../prop-035-view-property-details/index.html?id=' + btn.getAttribute('data-view');
      });
    });
    tbody.querySelectorAll('[data-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.location.href = '../prop-050-add-edit-property-details/index.html?id=' + btn.getAttribute('data-edit') + '&tab=identification';
      });
    });
    tbody.querySelectorAll('[data-service]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.location.href = '../prop-050-add-edit-property-details/index.html?id=' + btn.getAttribute('data-service') + '&tab=service';
      });
    });
    tbody.querySelectorAll('[data-inventory]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.location.href = '../prop-044-property-inventory-management/index.html?id=' + btn.getAttribute('data-inventory');
      });
    });
    tbody.querySelectorAll('[data-contract]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var p = all.filter(function (x) { return x.id === btn.getAttribute('data-contract'); })[0];
        document.getElementById('gc-property-name').textContent = p ? p.name : '';
        MM.openModal('guest-contract-modal');
      });
    });
    tbody.querySelectorAll('[data-duplicate]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var p = all.filter(function (x) { return x.id === btn.getAttribute('data-duplicate'); })[0];
        if (!p) return;
        document.getElementById('dup-source-name').textContent = p.name;
        document.getElementById('duplicate-form').dataset.sourceId = p.id;
        document.getElementById('dup-new-name').value = p.name + ' (Copy)';
        MM.openModal('duplicate-property-modal');
      });
    });
    tbody.querySelectorAll('[data-delete]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var p = all.filter(function (x) { return x.id === btn.getAttribute('data-delete'); })[0];
        document.getElementById('del-property-name').textContent = p ? p.name : '';
        document.getElementById('confirm-delete-btn').dataset.id = btn.getAttribute('data-delete');
        MM.openModal('delete-property-modal');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();

    document.getElementById('search-input').addEventListener('input', function (e) {
      state.search = e.target.value.trim();
      render();
    });

    document.getElementById('filter-apply').addEventListener('click', function () {
      state.bu = document.getElementById('filter-bu').value;
      state.status = document.getElementById('filter-status').value;
      state.concierge = document.getElementById('filter-concierge').value;
      var chip = document.getElementById('filter-chip');
      var hasFilters = state.bu || state.status || state.concierge;
      chip.classList.toggle('has-filters', !!hasFilters);
      document.getElementById('filter-chip-label').textContent = hasFilters ? 'Filter (active)' : 'Filter';
      document.getElementById('filter-popover').classList.remove('open');
      render();
    });
    document.getElementById('filter-clear').addEventListener('click', function () {
      state.bu = state.status = state.concierge = '';
      document.getElementById('filter-bu').value = '';
      document.getElementById('filter-status').value = '';
      document.getElementById('filter-concierge').value = '';
      document.getElementById('filter-chip').classList.remove('has-filters');
      document.getElementById('filter-chip-label').textContent = 'Filter';
      render();
    });

    var sortLabels = { 'name-asc': 'Sort: Name A–Z', 'name-desc': 'Sort: Name Z–A', 'bedrooms-desc': 'Sort: Bedrooms', 'status': 'Sort: Status' };
    document.querySelectorAll('#sort-options input').forEach(function (radio) {
      radio.addEventListener('change', function () {
        state.sort = radio.value;
        document.getElementById('sort-chip-label').textContent = sortLabels[radio.value];
        render();
      });
    });

    var groupLabels = { '': 'Group: None', 'bu': 'Group: Business Unit', 'status': 'Group: Status' };
    document.querySelectorAll('#group-options input').forEach(function (radio) {
      radio.addEventListener('change', function () {
        state.group = radio.value;
        document.getElementById('group-chip-label').textContent = groupLabels[radio.value];
        render();
      });
    });

    document.getElementById('active-toggle').addEventListener('click', function () {
      state.activeOnly = !state.activeOnly;
      this.dataset.active = state.activeOnly ? '1' : '0';
      document.getElementById('active-toggle-label').textContent = state.activeOnly ? 'Showing: Active' : 'Showing: All';
      render();
    });

    document.getElementById('clear-filters-btn').addEventListener('click', function () {
      state = { search: '', bu: '', status: '', concierge: '', activeOnly: true, sort: 'name-asc', group: '' };
      document.getElementById('search-input').value = '';
      document.getElementById('filter-bu').value = '';
      document.getElementById('filter-status').value = '';
      document.getElementById('filter-concierge').value = '';
      document.getElementById('filter-chip').classList.remove('has-filters');
      document.getElementById('filter-chip-label').textContent = 'Filter';
      document.getElementById('active-toggle-label').textContent = 'Showing: Active';
      render();
    });

    /* Duplicate property */
    var dupForm = document.getElementById('duplicate-form');
    MM.bindFormValidation(dupForm);
    document.getElementById('duplicate-submit-btn').addEventListener('click', function () {
      if (!MM.validateForm(dupForm)) return;
      var btn = this;
      var sourceId = dupForm.dataset.sourceId;
      var source = getAllProperties().filter(function (p) { return p.id === sourceId; })[0];
      MM.simulateSave(btn, 'Duplicating...', function () {
        var newProp = Object.assign({}, source, {
          id: MM.uid('PV'),
          name: document.getElementById('dup-new-name').value.trim(),
          status: 'onboarding',
          onboarding: 'onboarding',
          concierge: null,
          photosComplete: false
        });
        var list = readJSON(STORAGE_NEW, []);
        list.push(newProp);
        localStorage.setItem(STORAGE_NEW, JSON.stringify(list));
        MM.closeModal('duplicate-property-modal');
        MM.showToast('Property duplicated as "' + newProp.name + '"');
        render();
      });
    });

    /* Download guest contract */
    document.getElementById('gc-language').addEventListener('blur', function () { MM.validateField(this); });
    document.getElementById('gc-electricity').addEventListener('blur', function () { MM.validateField(this); });
    document.getElementById('gc-download-btn').addEventListener('click', function () {
      var lang = document.getElementById('gc-language');
      var elec = document.getElementById('gc-electricity');
      var valid = MM.validateField(lang) && MM.validateField(elec);
      if (!valid) return;
      var btn = this;
      MM.simulateSave(btn, 'Preparing PDF...', function () {
        MM.closeModal('guest-contract-modal');
        MM.showToast('Guest contract PDF ready — check your downloads.');
      });
    });

    /* Delete */
    document.getElementById('confirm-delete-btn').addEventListener('click', function () {
      var id = this.dataset.id;
      var deleted = readJSON(STORAGE_DELETED, []);
      deleted.push(id);
      localStorage.setItem(STORAGE_DELETED, JSON.stringify(deleted));
      MM.closeModal('delete-property-modal');
      MM.showToast('Property removed from the list.', { danger: true });
      render();
    });
  });
})();
