(function () {
  'use strict';

  var LS_COMPANIES = 'mm_comp_companies';
  var LS_SUBS = 'mm_comp_subsidiaries';

  var MOCK_COMPANIES = [
    { id: 'c1', name: 'Azura Stays Pte. Ltd.', short_name: 'CM-SG', created_at: '2021-03-12' },
    { id: 'c2', name: 'Azura Stays Byron Bay Pty Ltd', short_name: 'CM-AU', created_at: '2022-06-01' }
  ];

  var MOCK_SUBS = [
    { id: 's1', company_id: 'c1', name: 'Sentosa Branch', short_name: 'SEN-BR', country: 'Singapore', business_units: ['SEN'], created_at: '2021-03-15', created_by: 'Daniel Tan' },
    { id: 's2', company_id: 'c1', name: 'Noosa Branch', short_name: 'NSE-BR', country: 'Australia', business_units: ['NSE'], created_at: '2021-09-20', created_by: 'Daniel Tan' },
    { id: 's3', company_id: 'c2', name: 'Byron Bay Branch', short_name: 'BYR-BR', country: 'Australia', business_units: ['BYR', 'GCE'], created_at: '2022-06-05', created_by: 'Warren Kelly' }
  ];

  function load(key, mock) {
    try {
      var raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return mock.slice();
  }
  function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

  var companies = load(LS_COMPANIES, MOCK_COMPANIES);
  var subs = load(LS_SUBS, MOCK_SUBS);

  function fmtDate(s) {
    var d = new Date(s + 'T00:00:00');
    if (isNaN(d)) return s;
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + String(d.getFullYear()).slice(2);
  }
  function companyName(id) { var c = companies.filter(function (x) { return x.id === id; })[0]; return c ? c.name : '—'; }
  function initials(name) { return (name || '?').split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase(); }

  /* ---------------- Company tab ---------------- */
  var activeTab = 'company-list';

  function renderCompanyFilterOptions() {
    var sel = document.getElementById('sub-legal-entity-filter');
    var current = sel.value;
    sel.innerHTML = '<option value="">All Legal Entities</option>' + companies.map(function (c) {
      return '<option value="' + c.id + '">' + c.name + '</option>';
    }).join('');
    sel.value = current;
  }

  function renderCompanies() {
    var q = (document.getElementById('company-search').value || '').toLowerCase();
    var rows = companies.filter(function (c) {
      return !q || c.name.toLowerCase().indexOf(q) > -1 || c.short_name.toLowerCase().indexOf(q) > -1;
    });
    var tbody = document.getElementById('company-tbody');
    tbody.innerHTML = rows.map(function (c, i) {
      return '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td class="cell-strong">' + c.name + '</td>' +
        '<td>' + c.short_name + '</td>' +
        '<td>' + fmtDate(c.created_at) + '</td>' +
        '<td><div class="row-actions">' +
          '<button class="btn btn-ghost btn-sm" data-edit-company="' + c.id + '">Edit</button>' +
          '<button class="btn btn-ghost btn-sm" data-delete-company="' + c.id + '">Delete</button>' +
        '</div></td>' +
      '</tr>';
    }).join('');
    document.getElementById('company-empty').hidden = rows.length > 0;
    document.getElementById('company-result-count').textContent = rows.length + ' of ' + companies.length + ' companies';
    document.getElementById('tab-company-count').textContent = companies.length;
  }

  function renderSubs() {
    var q = (document.getElementById('sub-search').value || '').toLowerCase();
    var filterId = document.getElementById('sub-legal-entity-filter').value;
    var rows = subs.filter(function (s) {
      var matchesQ = !q || s.name.toLowerCase().indexOf(q) > -1 || s.short_name.toLowerCase().indexOf(q) > -1;
      var matchesFilter = !filterId || s.company_id === filterId;
      return matchesQ && matchesFilter;
    });
    var tbody = document.getElementById('sub-tbody');
    tbody.innerHTML = rows.map(function (s, i) {
      return '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td><span class="logo-tile">' + initials(s.name) + '</span></td>' +
        '<td>' + companyName(s.company_id) + '</td>' +
        '<td class="cell-strong">' + s.name + '</td>' +
        '<td>' + s.short_name + '</td>' +
        '<td>' + s.country + '</td>' +
        '<td><div class="bu-chip-list">' + s.business_units.map(function (b) { return '<span class="badge badge-info">' + b + '</span>'; }).join('') + '</div></td>' +
        '<td>' + fmtDate(s.created_at) + '</td>' +
        '<td>' + s.created_by + '</td>' +
        '<td><div class="row-actions">' +
          '<button class="btn btn-ghost btn-sm" data-edit-sub="' + s.id + '">Edit</button>' +
          '<button class="btn btn-ghost btn-sm" data-delete-sub="' + s.id + '">Delete</button>' +
        '</div></td>' +
      '</tr>';
    }).join('');
    document.getElementById('sub-empty').hidden = rows.length > 0;
    document.getElementById('sub-result-count').textContent = rows.length + ' of ' + subs.length + ' legal entities';
    document.getElementById('tab-sub-count').textContent = subs.length;
  }

  function renderAll() { renderCompanyFilterOptions(); renderCompanies(); renderSubs(); }

  /* ---------------- Tab switching (extends global.js tab helper) ------- */
  document.querySelectorAll('.tabs[data-tabs="comp-tabs"] .tab-item').forEach(function (tab) {
    tab.addEventListener('click', function () {
      activeTab = tab.getAttribute('data-tab');
      document.getElementById('add-record-label').textContent = activeTab === 'company-list' ? 'Add Company' : 'Add Legal Entity';
    });
  });

  document.getElementById('company-search').addEventListener('input', renderCompanies);
  document.getElementById('company-clear-btn').addEventListener('click', function () { document.getElementById('company-search').value = ''; renderCompanies(); });
  document.getElementById('sub-search').addEventListener('input', renderSubs);
  document.getElementById('sub-legal-entity-filter').addEventListener('change', renderSubs);
  document.getElementById('sub-clear-btn').addEventListener('click', function () {
    document.getElementById('sub-search').value = '';
    document.getElementById('sub-legal-entity-filter').value = '';
    renderSubs();
  });

  /* ---------------- Modal: Add/Edit/Delete (4 scenarios + delete) ------ */
  var modalMode = 'add-company'; // add-company | edit-company | add-sub | edit-sub | delete-company | delete-sub
  var editingId = null;

  function resetModalFields() {
    document.getElementById('f-name').value = '';
    document.getElementById('f-sub-name').value = '';
    document.getElementById('f-short-name').value = '';
    document.getElementById('f-country').value = '';
    document.getElementById('f-company-id').innerHTML = '<option value="">Select legal entity...</option>' +
      companies.map(function (c) { return '<option value="' + c.id + '">' + c.name + '</option>'; }).join('');
    document.querySelectorAll('#comp-modal .form-group').forEach(function (g) { g.classList.remove('has-error'); });
  }

  function openCompanyModal(mode, record) {
    modalMode = mode;
    editingId = record ? record.id : null;
    resetModalFields();
    var isSub = mode.indexOf('sub') > -1;
    var isEdit = mode.indexOf('edit') > -1;
    document.getElementById('comp-delete-confirm').hidden = true;
    document.getElementById('comp-fields').hidden = false;
    document.getElementById('field-parent-company').hidden = !isSub;
    document.getElementById('field-company-name').hidden = isSub;
    document.getElementById('field-sub-name').hidden = !isSub;
    document.getElementById('field-country').hidden = !isSub;
    document.getElementById('field-logo').hidden = !isSub;
    document.getElementById('f-name').required = !isSub;
    document.getElementById('f-sub-name').required = isSub;
    document.getElementById('f-country').required = isSub;

    document.getElementById('comp-modal-title').textContent = (isEdit ? 'Edit ' : 'Add ') + (isSub ? 'Branch Entity' : 'Company');
    document.getElementById('comp-modal-subtitle').textContent = isSub
      ? 'A subsidiary/branch belonging to a parent legal entity.'
      : 'A top-level legal entity used to own Business Units.';
    document.getElementById('comp-save-btn').textContent = (isEdit ? 'Update' : 'Save') + ' ' + (isSub ? 'Branch Entity' : 'Company');

    if (record) {
      document.getElementById('f-short-name').value = record.short_name;
      if (isSub) {
        document.getElementById('f-company-id').value = record.company_id;
        document.getElementById('f-sub-name').value = record.name;
        document.getElementById('f-country').value = record.country;
      } else {
        document.getElementById('f-name').value = record.name;
      }
    }
    MM.openModal('comp-modal');
  }

  function openDeleteModal(mode, record) {
    modalMode = mode;
    editingId = record.id;
    document.getElementById('comp-fields').hidden = true;
    document.getElementById('comp-delete-confirm').hidden = false;
    document.getElementById('comp-delete-name').textContent = record.name;
    document.getElementById('comp-modal-title').textContent = 'Delete ' + (mode === 'delete-sub' ? 'Branch Entity' : 'Company');
    document.getElementById('comp-modal-subtitle').textContent = 'This action cannot be undone.';
    document.getElementById('comp-save-btn').textContent = 'Delete';
    MM.openModal('comp-modal');
  }

  document.getElementById('add-record-btn').addEventListener('click', function () {
    openCompanyModal(activeTab === 'company-list' ? 'add-company' : 'add-sub', null);
  });

  document.addEventListener('click', function (e) {
    var editC = e.target.closest('[data-edit-company]');
    if (editC) { var rec = companies.filter(function (c) { return c.id === editC.getAttribute('data-edit-company'); })[0]; openCompanyModal('edit-company', rec); }
    var delC = e.target.closest('[data-delete-company]');
    if (delC) { var recD = companies.filter(function (c) { return c.id === delC.getAttribute('data-delete-company'); })[0]; openDeleteModal('delete-company', recD); }
    var editS = e.target.closest('[data-edit-sub]');
    if (editS) { var recS = subs.filter(function (s) { return s.id === editS.getAttribute('data-edit-sub'); })[0]; openCompanyModal('edit-sub', recS); }
    var delS = e.target.closest('[data-delete-sub]');
    if (delS) { var recSD = subs.filter(function (s) { return s.id === delS.getAttribute('data-delete-sub'); })[0]; openDeleteModal('delete-sub', recSD); }
  });

  var form = document.getElementById('comp-form');
  MM.bindFormValidation(form);

  document.getElementById('comp-save-btn').addEventListener('click', function () {
    var btn = this;
    if (modalMode === 'delete-company') {
      MM.simulateSave(btn, 'Deleting...', function () {
        companies = companies.filter(function (c) { return c.id !== editingId; });
        save(LS_COMPANIES, companies);
        renderAll();
        MM.closeModal('comp-modal');
        MM.showToast('Company deleted', { danger: true });
      });
      return;
    }
    if (modalMode === 'delete-sub') {
      MM.simulateSave(btn, 'Deleting...', function () {
        subs = subs.filter(function (s) { return s.id !== editingId; });
        save(LS_SUBS, subs);
        renderAll();
        MM.closeModal('comp-modal');
        MM.showToast('Legal entity deleted', { danger: true });
      });
      return;
    }

    if (!MM.validateForm(form)) return;

    var isSub = modalMode.indexOf('sub') > -1;
    var isEdit = modalMode.indexOf('edit') > -1;

    MM.simulateSave(btn, 'Saving...', function () {
      if (isSub) {
        var companyId = document.getElementById('f-company-id').value;
        if (!companyId) { MM.showToast('Select a legal entity', { danger: true }); return; }
        if (isEdit) {
          subs = subs.map(function (s) {
            if (s.id !== editingId) return s;
            return Object.assign({}, s, { company_id: companyId, name: document.getElementById('f-sub-name').value.trim(), short_name: document.getElementById('f-short-name').value.trim(), country: document.getElementById('f-country').value });
          });
        } else {
          subs.push({ id: MM.uid('s'), company_id: companyId, name: document.getElementById('f-sub-name').value.trim(), short_name: document.getElementById('f-short-name').value.trim(), country: document.getElementById('f-country').value, business_units: [], created_at: new Date().toISOString().slice(0, 10), created_by: 'Daniel Tan' });
        }
        save(LS_SUBS, subs);
      } else {
        if (isEdit) {
          companies = companies.map(function (c) {
            if (c.id !== editingId) return c;
            return Object.assign({}, c, { name: document.getElementById('f-name').value.trim(), short_name: document.getElementById('f-short-name').value.trim() });
          });
        } else {
          companies.push({ id: MM.uid('c'), name: document.getElementById('f-name').value.trim(), short_name: document.getElementById('f-short-name').value.trim(), created_at: new Date().toISOString().slice(0, 10) });
        }
        save(LS_COMPANIES, companies);
      }
      renderAll();
      MM.closeModal('comp-modal');
      MM.showToast((isEdit ? 'Updated' : 'Added') + ' ' + (isSub ? 'legal entity' : 'company') + ' successfully');
    });
  });

  renderAll();
})();
