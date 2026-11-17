(function () {
  'use strict';

  var DETAILS = {
    'OWN-01': { username: 'r.halstead', phone: '+44 7700 900123', password: '••••••••', company: '—', language: 'English' },
    'OWN-02': { username: 'i.moreau', phone: '+33 6 12 34 56 78', password: '••••••••', company: '—', language: 'French' },
    'OWN-03': { username: 'd.chen', phone: '+65 8123 4567', password: '••••••••', company: '—', language: 'English' },
    'OWN-04': { username: 'p.nair', phone: '+65 9123 4567', password: '••••••••', company: '—', language: 'English' }
  };

  var BU_BY_OWNER = { 'OWN-01': 'Phuket Collection', 'OWN-02': 'Bali Retreats', 'OWN-03': 'Bali Retreats', 'OWN-04': 'Koh Samui Estates' };
  var NATIONALITY = { 'OWN-01': 'United Kingdom', 'OWN-02': 'France', 'OWN-03': 'Singapore', 'OWN-04': 'Singapore' };

  var editingId = null;

  function currentData() {
    var stored = JSON.parse(localStorage.getItem('mm_own_owners') || '[]');
    return MM.MOCK_OWNERS.map(function (o) {
      var parts = o.name.split(' ');
      return {
        id: o.id, first: parts[0], family: parts.slice(1).join(' '), email: o.email,
        nationality: NATIONALITY[o.id] || 'International', properties: o.properties.length,
        bu: BU_BY_OWNER[o.id] || 'Phuket Collection', status: o.payoutStatus === 'overdue' ? 'active' : 'active',
        payoutStatus: o.payoutStatus, createdAt: '2025-11-02'
      };
    }).concat(stored.map(function (o) {
      return { id: o.id, first: o.name.split(' ')[0], family: o.name.split(' ').slice(1).join(' '), email: '', nationality: '—', properties: 0, bu: o.bu || '', status: 'active', payoutStatus: 'current', createdAt: new Date().toISOString().slice(0, 10) };
    }));
  }

  function renderStats(data) {
    document.getElementById('stat-total').textContent = data.length;
    document.getElementById('stat-active').textContent = data.filter(function (o) { return o.status === 'active'; }).length;
    document.getElementById('stat-overdue').textContent = data.filter(function (o) { return o.payoutStatus === 'overdue'; }).length;
    document.getElementById('stat-properties').textContent = data.reduce(function (s, o) { return s + o.properties; }, 0);
    document.getElementById('tab-owner-count').textContent = data.length;
  }

  function rowHtml(o, idx) {
    return '<tr>' +
      '<td>' + (idx + 1) + '</td>' +
      '<td class="cell-strong">' + o.family + '</td>' +
      '<td>' + o.first + '</td>' +
      '<td class="cell-sub">' + o.email + '</td>' +
      '<td>' + o.nationality + '</td>' +
      '<td class="cell-num">' + o.properties + '</td>' +
      '<td class="cell-sub">' + o.createdAt + '</td>' +
      '<td class="row-actions">' +
        '<button class="btn btn-ghost btn-sm" data-view="' + o.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>' +
        '<a class="btn btn-ghost btn-sm" href="../own-003-edit-owner/index.html"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></a>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + o.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>' +
      '</td></tr>';
  }

  var allData = currentData();
  renderStats(allData);

  function applyFilters() {
    var q = document.getElementById('search-input').value.trim().toLowerCase();
    var bu = document.getElementById('bu-filter').value;
    var filtered = allData.filter(function (o) {
      var matchesQ = !q || (o.first + ' ' + o.family + ' ' + o.email).toLowerCase().indexOf(q) !== -1;
      var matchesBu = !bu || o.bu === bu;
      return matchesQ && matchesBu;
    });
    document.getElementById('owners-tbody').innerHTML = filtered.map(rowHtml).join('');
    document.getElementById('owners-empty').hidden = filtered.length !== 0;
    document.getElementById('result-count').textContent = filtered.length + ' owners';
    document.getElementById('pg-count').textContent = filtered.length;
    document.getElementById('pg-total').textContent = filtered.length;
  }
  applyFilters();

  document.getElementById('search-input').addEventListener('input', applyFilters);
  document.getElementById('bu-filter').addEventListener('change', applyFilters);
  document.getElementById('clear-filters-btn').addEventListener('click', function () {
    document.getElementById('search-input').value = '';
    document.getElementById('bu-filter').value = '';
    applyFilters();
  });

  document.getElementById('status-toggle').addEventListener('click', function () {
    var showingActive = this.dataset.status === 'active';
    this.dataset.status = showingActive ? 'all' : 'active';
    document.getElementById('status-toggle-label').textContent = showingActive ? 'Showing: All' : 'Showing: Active';
  });

  document.getElementById('owners-tbody').addEventListener('click', function (e) {
    var viewBtn = e.target.closest('[data-view]');
    var delBtn = e.target.closest('[data-delete]');
    if (viewBtn) {
      var o = allData.find(function (d) { return d.id === viewBtn.dataset.view; });
      var d = DETAILS[o.id] || { username: '—', phone: '—', password: '—', company: '—', language: 'English' };
      document.getElementById('vo-name').textContent = o.first + ' ' + o.family;
      document.getElementById('vo-first').textContent = o.first;
      document.getElementById('vo-family').textContent = o.family;
      document.getElementById('vo-nationality').textContent = o.nationality;
      document.getElementById('vo-username').textContent = d.username;
      document.getElementById('vo-phone').textContent = d.phone;
      document.getElementById('vo-password').textContent = d.password;
      document.getElementById('vo-email').textContent = o.email;
      document.getElementById('vo-company').textContent = d.company;
      document.getElementById('vo-bu').textContent = o.bu;
      document.getElementById('vo-language').textContent = d.language;
      MM.openModal('view-owner-modal');
    }
    if (delBtn) {
      editingId = delBtn.dataset.delete;
      var owner = allData.find(function (d) { return d.id === editingId; });
      document.getElementById('del-owner-name').textContent = owner.first + ' ' + owner.family;
      MM.openModal('delete-owner-modal');
    }
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Deleting...', function () {
      var stored = JSON.parse(localStorage.getItem('mm_own_owners') || '[]').filter(function (o) { return o.id !== editingId; });
      localStorage.setItem('mm_own_owners', JSON.stringify(stored));
      MM.closeModal('delete-owner-modal');
      MM.showToast('Owner deleted', { danger: true });
      allData = currentData();
      renderStats(allData);
      applyFilters();
    });
  });

  function openOwnerDrawer() {
    document.getElementById('owner-drawer-title').textContent = 'Add New Owner';
    document.getElementById('owner-save-btn').textContent = 'Create Owner';
    document.getElementById('owner-form').reset();
    document.getElementById('f-send-email').checked = true;
    MM.openModal('owner-drawer');
  }

  document.getElementById('add-owner-btn').addEventListener('click', openOwnerDrawer);

  var ownerForm = document.getElementById('owner-form');
  MM.bindFormValidation(ownerForm);
  ownerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(ownerForm)) return;
    MM.simulateSave(document.getElementById('owner-save-btn'), 'Creating...', function () {
      var stored = JSON.parse(localStorage.getItem('mm_own_owners') || '[]');
      stored.push({
        id: MM.uid('own'), name: document.getElementById('f-first').value.trim() + ' ' + document.getElementById('f-last').value.trim(),
        email: document.getElementById('f-email').value.trim(), bu: document.getElementById('f-bu').value, properties: []
      });
      localStorage.setItem('mm_own_owners', JSON.stringify(stored));
      MM.showToast('Owner created');
      MM.closeModal('owner-drawer');
      allData = currentData();
      renderStats(allData);
      applyFilters();
    });
  });
})();
