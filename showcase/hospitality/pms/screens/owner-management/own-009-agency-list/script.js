(function () {
  'use strict';
  var STORAGE_KEY = 'mm_own_agencies';
  var EDITS_KEY = 'mm_own_agencies_edits';
  var editingId = null;

  var AGENCIES_SEED = [
    { id: 'ag1', name: 'Coral Coast Villas Group', shortName: 'CCV', country: 'Singapore', createdBy: 'Daniel Tan', startDate: '2024-03-12', status: 'Active', phone: '+65 6612 3456', website: 'coralcoastvillasgroup.example', email: 'contact@coralcoastvillasgroup.example', bu: 'Sentosa Collection, Noosa Estates' },
    { id: 'ag2', name: 'Aegean Retreats', shortName: 'AGR', country: 'Australia', createdBy: 'Daniel Tan', startDate: '2024-07-01', status: 'Active', phone: '+61 2 6685 7654', website: 'aegeanretreats.example', email: 'hello@aegeanretreats.example', bu: 'Byron Bay Retreats' },
    { id: 'ag3', name: 'Sunshine Coast Rentals', shortName: 'SCR', country: 'Australia', createdBy: 'Karen Seah', startDate: '2023-11-20', status: 'Inactive', phone: '+61 7 5447 4567', website: 'sunshinecoastrentals.example', email: 'info@sunshinecoastrentals.example', bu: 'Sentosa Collection' }
  ];

  function currentData() {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
    return AGENCIES_SEED.concat(stored).map(function (a) {
      return edits[a.id] ? Object.assign({}, a, edits[a.id]) : a;
    });
  }

  function rows(data) {
    document.getElementById('list-tbody').innerHTML = data.map(function (a) {
      return '<tr><td class="cell-strong">' + a.name + '</td><td>' + a.country + '</td><td class="cell-sub">' + a.createdBy + '</td>' +
        '<td class="row-actions">' +
          '<button class="btn btn-ghost btn-sm" data-view="' + a.id + '" title="View Agency Details"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg></button> ' +
          '<button class="btn btn-ghost btn-sm" data-edit="' + a.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '</td></tr>';
    }).join('');
    document.getElementById('result-count').textContent = data.length + ' agencies';
  }

  function applySearch() {
    var q = document.getElementById('search-input').value.trim().toLowerCase();
    var data = currentData().filter(function (a) { return a.name.toLowerCase().indexOf(q) !== -1; });
    rows(data);
  }
  applySearch();

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var viewBtn = e.target.closest('[data-view]');
    if (viewBtn) {
      var a = currentData().filter(function (x) { return x.id === viewBtn.getAttribute('data-view'); })[0];
      if (!a) return;
      document.getElementById('view-agency-detail').innerHTML = [
        ['Agency Name', a.name], ['Short Name', a.shortName], ['Country', a.country], ['Start Date', a.startDate],
        ['Status', a.status], ['Phone Number', a.phone], ['Website', a.website], ['Email', a.email], ['Business Unit', a.bu]
      ].map(function (row) { return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>'; }).join('');
      MM.openModal('view-agency-modal');
      return;
    }
    var editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      var agency = currentData().filter(function (x) { return x.id === editBtn.getAttribute('data-edit'); })[0];
      openDrawer(agency);
    }
  });

  document.getElementById('search-input').addEventListener('input', applySearch);

  function openDrawer(agency) {
    editingId = agency ? agency.id : null;
    document.getElementById('agency-drawer-title').textContent = agency ? 'Edit Agency' : 'Add New Agency';
    document.getElementById('agency-save-btn').textContent = agency ? 'Save Changes' : 'Create Agency';
    document.getElementById('agency-form').reset();
    if (agency) {
      document.getElementById('f-name').value = agency.name;
      document.getElementById('f-country').value = agency.country;
      document.getElementById('f-email').value = agency.email || '';
    }
    MM.openModal('agency-drawer');
  }

  document.getElementById('add-agency-btn').addEventListener('click', function () { openDrawer(null); });

  var form = document.getElementById('agency-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('agency-save-btn'), editingId ? 'Saving...' : 'Creating...', function () {
      var name = document.getElementById('f-name').value.trim();
      var country = document.getElementById('f-country').value;
      var email = document.getElementById('f-email').value.trim();
      if (editingId) {
        var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
        edits[editingId] = { name: name, country: country, email: email };
        localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
        MM.showToast('Agency updated');
      } else {
        var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        stored.push({ id: MM.uid('ag'), name: name, shortName: name.slice(0, 3).toUpperCase(), country: country, createdBy: 'Daniel Tan', startDate: new Date().toISOString().slice(0, 10), status: 'Active', phone: '—', website: '—', email: email, bu: '—' });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        MM.showToast('Agency created');
      }
      MM.closeModal('agency-drawer');
      applySearch();
    });
  });
})();
