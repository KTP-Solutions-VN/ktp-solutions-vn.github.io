(function () {
  'use strict';

  var LS_KEY = 'mm_bu_business_units';

  var MOCK_BUSINESS_UNITS = [
    { id: 'bu1', country: 'Singapore', region: 'Sentosa', name: 'Sentosa Collection', short_name: 'SEN', legal_entity: 'Azura Stays Pte. Ltd.', branch: 'Sentosa Branch', phone: '+65 6612 3456', email: 'ops.sentosa@azurastays.example', address: '88 Ocean Drive', city: 'Singapore', postal_code: '098374', currency: 'SGD', ownership: 'Azura Stays', beds24: 'BD24-SEN-991', airbnb: 'Airbnb - Azura Stays Official', created_at: '2021-03-20', status: 'active' },
    { id: 'bu2', country: 'Australia', region: 'Queensland (Noosa)', name: 'Noosa Estates', short_name: 'NSE', legal_entity: 'Azura Stays Pte. Ltd.', branch: 'Noosa Branch', phone: '+61 7 5447 7654', email: 'ops.noosa@azurastays.example', address: '12 Hastings Street', city: 'Noosa Heads', postal_code: '4567', currency: 'AUD', ownership: 'Azura Stays', beds24: '', airbnb: 'Airbnb - Azura Stays Official', created_at: '2021-10-02', status: 'active' },
    { id: 'bu3', country: 'Australia', region: 'Byron Bay', name: 'Byron Bay Retreats', short_name: 'BYR', legal_entity: 'Azura Stays Byron Bay Pty Ltd', branch: 'Byron Bay Branch', phone: '+61 2 6685 5010', email: 'ops.byronbay@azurastays.example', address: '21 Lawson Street', city: 'Byron Bay', postal_code: '2481', currency: 'AUD', ownership: 'Azura Stays', beds24: 'BD24-BYR-114', airbnb: 'Airbnb - Sentosa Partner', created_at: '2022-06-10', status: 'active' },
    { id: 'bu4', country: 'Australia', region: 'Queensland (Gold Coast)', name: 'Gold Coast Escapes', short_name: 'GCE', legal_entity: 'Azura Stays Byron Bay Pty Ltd', branch: 'Byron Bay Branch', phone: '+61 7 5535 4220', email: 'ops.goldcoast@azurastays.example', address: 'Goodwin Terrace', city: 'Burleigh Heads', postal_code: '4220', currency: 'USD', ownership: 'Partner', beds24: '', airbnb: 'Airbnb - Sentosa Partner', created_at: '2023-02-14', status: 'paused' }
  ];

  function load() {
    try { var raw = localStorage.getItem(LS_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
    return MOCK_BUSINESS_UNITS.slice();
  }
  function save(data) { localStorage.setItem(LS_KEY, JSON.stringify(data)); }

  var units = load();
  var statusFilter = 'active';

  function fmtDate(s) {
    var d = new Date(s + 'T00:00:00');
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + String(d.getFullYear()).slice(2);
  }
  function initials(name) { return (name || '?').split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase(); }

  function renderStats() {
    document.getElementById('stat-total').textContent = units.length;
    document.getElementById('stat-active').textContent = units.filter(function (u) { return u.status === 'active'; }).length;
    document.getElementById('stat-paused').textContent = units.filter(function (u) { return u.status === 'paused'; }).length;
    var legalEntities = {};
    units.forEach(function (u) { legalEntities[u.legal_entity] = true; });
    document.getElementById('stat-legal').textContent = Object.keys(legalEntities).length;
  }

  function render() {
    var q = (document.getElementById('bu-search').value || '').toLowerCase();
    var rows = units.filter(function (u) {
      var matchesStatus = u.status === statusFilter;
      var matchesQ = !q || u.name.toLowerCase().indexOf(q) > -1 || u.short_name.toLowerCase().indexOf(q) > -1 || u.country.toLowerCase().indexOf(q) > -1;
      return matchesStatus && matchesQ;
    }).sort(function (a, b) { return a.country.localeCompare(b.country) || a.name.localeCompare(b.name); });

    var tbody = document.getElementById('bu-tbody');
    tbody.innerHTML = rows.map(function (u, i) {
      var statusBadge = u.status === 'active' ? '<span class="badge badge-success">Active</span>' : '<span class="badge badge-neutral">Paused</span>';
      return '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + u.country + '</td>' +
        '<td class="flex-gap-8"><span class="logo-tile">' + initials(u.name) + '</span><span class="cell-strong">' + u.name + '</span></td>' +
        '<td>' + u.short_name + '</td>' +
        '<td><div class="cell-legal"><span>' + u.legal_entity + '</span><span class="cell-sub">' + u.branch + '</span></div></td>' +
        '<td>' + fmtDate(u.created_at) + '</td>' +
        '<td>' + statusBadge + '</td>' +
        '<td><div class="row-actions">' +
          '<a class="btn btn-ghost btn-sm" href="../bu-004-view-business-unit-details/index.html?id=' + u.id + '">View</a>' +
          '<a class="btn btn-ghost btn-sm" href="../bu-003-edit-business-unit/index.html?id=' + u.id + '">Edit</a>' +
          '<button class="btn btn-ghost btn-sm" data-toggle-status="' + u.id + '">' + (u.status === 'active' ? 'Pause' : 'Activate') + '</button>' +
          '<button class="btn btn-ghost btn-sm" data-delete-bu="' + u.id + '">Delete</button>' +
        '</div></td>' +
      '</tr>';
    }).join('');

    document.getElementById('bu-empty').hidden = rows.length > 0;
    document.getElementById('bu-result-count').textContent = rows.length + ' business unit' + (rows.length === 1 ? '' : 's');
    document.getElementById('pagination-label').textContent = 'Showing 1–' + rows.length + ' of ' + rows.length + ' business units';
    renderStats();
  }

  document.getElementById('bu-search').addEventListener('input', render);
  document.getElementById('bu-clear-btn').addEventListener('click', function () {
    document.getElementById('bu-search').value = '';
    statusFilter = 'active';
    updateStatusToggleUI();
    render();
  });

  function updateStatusToggleUI() {
    var btn = document.getElementById('status-toggle');
    btn.classList.toggle('active', true);
    document.getElementById('status-toggle-label').textContent = 'Showing: ' + (statusFilter === 'active' ? 'Active' : 'Paused');
  }

  document.getElementById('status-toggle').addEventListener('click', function () {
    statusFilter = statusFilter === 'active' ? 'paused' : 'active';
    updateStatusToggleUI();
    render();
  });

  var deleteId = null;
  document.addEventListener('click', function (e) {
    var toggleBtn = e.target.closest('[data-toggle-status]');
    if (toggleBtn) {
      var id = toggleBtn.getAttribute('data-toggle-status');
      units = units.map(function (u) {
        if (u.id !== id) return u;
        var next = u.status === 'active' ? 'paused' : 'active';
        return Object.assign({}, u, { status: next });
      });
      save(units);
      render();
      var updated = units.filter(function (u) { return u.id === id; })[0];
      MM.showToast(updated.name + ' is now ' + updated.status + '.');
    }
    var delBtn = e.target.closest('[data-delete-bu]');
    if (delBtn) {
      deleteId = delBtn.getAttribute('data-delete-bu');
      var rec = units.filter(function (u) { return u.id === deleteId; })[0];
      document.getElementById('del-bu-name').textContent = rec.name;
      MM.openModal('delete-bu-modal');
    }
  });

  document.getElementById('confirm-delete-bu-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Deleting...', function () {
      units = units.filter(function (u) { return u.id !== deleteId; });
      save(units);
      render();
      MM.closeModal('delete-bu-modal');
      MM.showToast('Business unit deleted', { danger: true });
    });
  });

  render();

  try {
    var flash = sessionStorage.getItem('mm_bu_flash');
    if (flash) { sessionStorage.removeItem('mm_bu_flash'); MM.showToast(flash); }
  } catch (e) {}
})();
