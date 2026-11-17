(function () {
  'use strict';
  var STORAGE_KEY = 'mm_own_agency_staff';
  var EDITS_KEY = 'mm_own_agency_staff_edits';
  var editingId = null;

  var STAFF_SEED = [
    { id: 'as1', name: 'Ananya Suksawat', agency: 'Andaman Villas Group', role: 'Property Manager', email: 'ananya@andamanvillas.example.com' },
    { id: 'as2', name: 'Nikos Papadakis', agency: 'Aegean Retreats', role: 'Reservations Lead', email: 'nikos@aegeanretreats.example.com' }
  ];

  function currentData() {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
    return STAFF_SEED.concat(stored).map(function (s) {
      return edits[s.id] ? Object.assign({}, s, edits[s.id]) : s;
    });
  }

  function render() {
    var data = currentData();
    document.getElementById('list-tbody').innerHTML = data.map(function (s) {
      return '<tr><td class="cell-strong">' + s.name + '</td><td class="cell-sub">' + s.agency + '</td><td>' + s.role + '</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="' + s.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button></td></tr>';
    }).join('');
  }
  render();

  function openDrawer(staff) {
    editingId = staff ? staff.id : null;
    document.getElementById('staff-drawer-title').textContent = staff ? 'Edit Agency Staff' : 'Add New Agency Staff';
    document.getElementById('staff-save-btn').textContent = staff ? 'Save Changes' : 'Create Staff Account';
    document.getElementById('staff-form').reset();
    if (staff) {
      document.getElementById('f-name').value = staff.name;
      document.getElementById('f-agency').value = staff.agency;
      document.getElementById('f-email').value = staff.email || '';
      document.getElementById('f-role').value = staff.role || '';
    }
    MM.openModal('staff-drawer');
  }

  document.getElementById('add-staff-btn').addEventListener('click', function () { openDrawer(null); });

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    if (!editBtn) return;
    var s = currentData().find(function (d) { return d.id === editBtn.dataset.edit; });
    openDrawer(s);
  });

  var form = document.getElementById('staff-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('staff-save-btn'), editingId ? 'Saving...' : 'Creating...', function () {
      var name = document.getElementById('f-name').value.trim();
      var agency = document.getElementById('f-agency').value;
      var email = document.getElementById('f-email').value.trim();
      var role = document.getElementById('f-role').value.trim();
      if (editingId) {
        var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
        edits[editingId] = { name: name, agency: agency, email: email, role: role };
        localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
        MM.showToast('Staff account updated');
      } else {
        var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        stored.push({ id: MM.uid('as'), name: name, agency: agency, email: email, role: role });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        MM.showToast('Agency staff account created');
      }
      MM.closeModal('staff-drawer');
      render();
    });
  });
})();
