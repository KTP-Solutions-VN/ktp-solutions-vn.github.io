(function () {
  'use strict';

  var LS_KEY = 'mm_bu_business_units';

  var MOCK_BUSINESS_UNITS = [
    { id: 'bu1', country: 'Thailand', region: 'Phuket', name: 'Phuket Collection', short_name: 'PHK', legal_entity: 'Azura Stays Co., Ltd.', branch: 'Phuket Branch', phone: '+66 76 123 456', email: 'ops.phuket@azurastays.example', address: '88 Bangtao Beach Road', city: 'Phuket', postal_code: '83110', currency: 'THB', ownership: 'Azura Stays', beds24: 'BD24-PHK-991', airbnb: 'Airbnb - Azura Stays Official', created_at: '2021-03-20', status: 'active' },
    { id: 'bu2', country: 'Thailand', region: 'Surat Thani (Koh Samui)', name: 'Koh Samui Estates', short_name: 'KSE', legal_entity: 'Azura Stays Co., Ltd.', branch: 'Koh Samui Branch', phone: '+66 77 987 654', email: 'ops.samui@azurastays.example', address: '12 Chaweng Beach Road', city: 'Koh Samui', postal_code: '84320', currency: 'THB', ownership: 'Azura Stays', beds24: '', airbnb: 'Airbnb - Azura Stays Official', created_at: '2021-10-02', status: 'active' },
    { id: 'bu3', country: 'Indonesia', region: 'Bali', name: 'Bali Retreats', short_name: 'BAL', legal_entity: 'Azura Stays Bali PT', branch: 'Bali Branch', phone: '+62 361 555 010', email: 'ops.bali@azurastays.example', address: 'Jl. Pantai Berawa No. 21', city: 'Canggu', postal_code: '80361', currency: 'IDR', ownership: 'Azura Stays', beds24: 'BD24-BAL-114', airbnb: 'Airbnb - Phuket Partner', created_at: '2022-06-10', status: 'active' },
    { id: 'bu4', country: 'Indonesia', region: 'West Nusa Tenggara (Lombok)', name: 'Lombok Escapes', short_name: 'LMB', legal_entity: 'Azura Stays Bali PT', branch: 'Bali Branch', phone: '+62 370 444 220', email: 'ops.lombok@azurastays.example', address: 'Jl. Pantai Selong Belanak', city: 'Lombok', postal_code: '83573', currency: 'USD', ownership: 'Partner', beds24: '', airbnb: 'Airbnb - Phuket Partner', created_at: '2023-02-14', status: 'paused' }
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
