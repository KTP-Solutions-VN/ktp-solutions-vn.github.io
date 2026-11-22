(function () {
  'use strict';

  /* ---------------------------------------------------------------- */
  /* Base mock staff roster — reused across USR-004/005/006/007/009/  */
  /* 010/011 so the same 8 people appear consistently everywhere.      */
  /* ---------------------------------------------------------------- */

  window.MM_USR_STAFF_BASE = [
    { id: 'STF-01', employeeNumber: 'EMP-1001', title: 'Mr.', firstName: 'Daniel', familyName: 'Tan', usageName: 'Daniel T.', initials: 'DT', role: 'Business Unit Manager', userType: 'Business Unit Manager', dept: 'Management', bu: 'Sentosa Collection', company: 'Azura Stays Pte. Ltd.', subsidiary: 'Head Office', nationality: 'Singapore', dob: '1985-04-12', email: 'daniel.t@azurastays.example', workEmail: 'daniel.t@work.azurastays.example', username: 'daniel.t', phone: '+65 9234 5671', status: 'active', salaryType: 'Monthly', startDate: '2019-03-15', createdAt: '2019-03-10', dayOff: 'Sunday', leaderId: null,
      homeAddress: '221 Telok Blangah Road, Singapore', isClockIn: true, isTracker: true, isRemoteWork: false, timesPerWeek: '5',
      workPermitStatus: 'Not Required', permitExpiry: '', visaExpiry: '', nextNotificationDate: '', processingAgency: '', drivingEligibility: 'Yes', ssn: 'S8504121J',
      totalSalary: 3400, firstHalf: 1700, dailyAmount: null, currency: 'SGD', isLockSalary: false,
      bankAccounts: [{ bank: 'DBS Bank', swift: 'DBSSSGSG', type: 'Salary', currency: 'SGD', holder: 'Daniel Tan', number: '123-456789-0' }] },
    { id: 'STF-02', employeeNumber: 'EMP-1014', title: 'Mr.', firstName: 'Warren', familyName: 'Kelly', usageName: 'Warren K.', initials: 'WK', role: 'Concierge', userType: 'Team Leader', dept: 'Concierge', bu: 'Byron Bay Retreats', company: 'Azura Stays Byron Bay Pty Ltd', subsidiary: 'Byron Bay Branch', nationality: 'Australia', dob: '1990-11-02', email: 'warren.k@azurastays.example', workEmail: 'warren.k@work.azurastays.example', username: 'warren.k', phone: '+61 423 456 789', status: 'active', salaryType: 'Monthly', startDate: '2020-06-01', createdAt: '2020-05-20', dayOff: 'Monday', leaderId: 'STF-01',
      homeAddress: '12 Bangalow Road, Byron Bay', isClockIn: true, isTracker: true, isRemoteWork: false, timesPerWeek: '6',
      workPermitStatus: 'Approved', permitExpiry: '2027-04-30', visaExpiry: '2027-04-30', nextNotificationDate: '2027-03-01', processingAgency: 'Byron Bay Visa Partners', drivingEligibility: 'Yes', ssn: '288 201 193',
      totalSalary: 1830, firstHalf: 915, dailyAmount: null, currency: 'AUD', isLockSalary: false,
      bankAccounts: [{ bank: 'Westpac', swift: 'WPACAU2S', type: 'Salary', currency: 'AUD', holder: 'Warren Kelly', number: '009-8877-6655' }] },
    { id: 'STF-03', employeeNumber: 'EMP-1022', title: 'Mrs.', firstName: 'Nicole', familyName: 'Parker', usageName: 'Nicole P.', initials: 'NP', role: 'Concierge', userType: 'Employee', dept: 'Concierge', bu: 'Noosa Estates', company: 'Azura Stays Noosa Pty Ltd', subsidiary: 'Noosa Branch', nationality: 'Australia', dob: '1993-07-19', email: 'nicole.p@azurastays.example', workEmail: 'nicole.p@work.azurastays.example', username: 'nicole.p', phone: '+61 495 551 234', status: 'active', salaryType: 'Monthly', startDate: '2021-01-10', createdAt: '2021-01-05', dayOff: 'Tuesday', leaderId: 'STF-01',
      homeAddress: '55 Hastings Street, Noosa Heads', isClockIn: true, isTracker: false, isRemoteWork: false, timesPerWeek: '5',
      workPermitStatus: 'Not Required', permitExpiry: '', visaExpiry: '', nextNotificationDate: '', processingAgency: '', drivingEligibility: 'Yes', ssn: '188 422 018',
      totalSalary: 1390, firstHalf: 695, dailyAmount: null, currency: 'AUD', isLockSalary: false,
      bankAccounts: [] },
    { id: 'STF-04', employeeNumber: 'EMP-1030', title: 'Mrs.', firstName: 'Karen', familyName: 'Seah', usageName: 'Karen S.', initials: 'KS', role: 'Housekeeping Lead', userType: 'Team Leader', dept: 'Housekeeping', bu: 'Sentosa Collection', company: 'Azura Stays Pte. Ltd.', subsidiary: 'Head Office', nationality: 'Singapore', dob: '1988-02-27', email: 'karen.s@azurastays.example', workEmail: 'karen.s@work.azurastays.example', username: 'karen.s', phone: '+65 9777 2345', status: 'active', salaryType: 'Daily', startDate: '2020-09-01', createdAt: '2020-08-28', dayOff: 'Sunday', leaderId: 'STF-01',
      homeAddress: '9 Telok Blangah Crescent, Singapore', isClockIn: true, isTracker: true, isRemoteWork: false, timesPerWeek: '6',
      workPermitStatus: 'Not Required', permitExpiry: '', visaExpiry: '', nextNotificationDate: '', processingAgency: '', drivingEligibility: 'No', ssn: 'S8802273F',
      totalSalary: null, firstHalf: null, dailyAmount: 38, currency: 'SGD', isLockSalary: true,
      bankAccounts: [{ bank: 'UOB', swift: 'UOVBSGSG', type: 'Salary', currency: 'SGD', holder: 'Karen Seah', number: '456-789012-3' }] },
    { id: 'STF-05', employeeNumber: 'EMP-1041', title: 'Mr.', firstName: 'Ben', familyName: 'Sullivan', usageName: 'Ben S.', initials: 'BS', role: 'Maintenance Technician', userType: 'Employee', dept: 'Maintenance', bu: 'Byron Bay Retreats', company: 'Azura Stays Byron Bay Pty Ltd', subsidiary: 'Byron Bay Branch', nationality: 'Australia', dob: '1991-09-30', email: 'ben.s@azurastays.example', workEmail: 'ben.s@work.azurastays.example', username: 'ben.s', phone: '+61 432 228 890', status: 'active', salaryType: 'Monthly', startDate: '2022-02-14', createdAt: '2022-02-10', dayOff: 'Wednesday', leaderId: 'STF-02',
      homeAddress: '88 Shirley Street, Byron Bay', isClockIn: true, isTracker: true, isRemoteWork: false, timesPerWeek: '5',
      workPermitStatus: 'Pending', permitExpiry: '2026-09-15', visaExpiry: '2026-09-15', nextNotificationDate: '2026-09-01', processingAgency: 'Byron Bay Visa Partners', drivingEligibility: 'Yes', ssn: '255 103 382',
      totalSalary: 1650, firstHalf: 825, dailyAmount: null, currency: 'AUD', isLockSalary: false,
      bankAccounts: [] },
    { id: 'STF-06', employeeNumber: 'EMP-1052', title: 'Mr.', firstName: 'James', familyName: 'Okoro', usageName: 'James O.', initials: 'JO', role: 'Maintenance Technician', userType: 'Employee', dept: 'Maintenance', bu: 'Noosa Estates', company: 'Azura Stays Noosa Pty Ltd', subsidiary: 'Noosa Branch', nationality: 'Nigeria', dob: '1994-12-08', email: 'james.o@azurastays.example', workEmail: 'james.o@work.azurastays.example', username: 'james.o', phone: '+61 401 114 567', status: 'active', salaryType: 'Monthly', startDate: '2023-05-20', createdAt: '2023-05-15', dayOff: 'Thursday', leaderId: 'STF-03',
      homeAddress: '31 David Low Way, Peregian Beach', isClockIn: true, isTracker: true, isRemoteWork: false, timesPerWeek: '5',
      workPermitStatus: 'Expired', permitExpiry: '2026-07-01', visaExpiry: '2026-07-01', nextNotificationDate: '2026-08-01', processingAgency: 'Noosa Work Visa Bureau', drivingEligibility: 'Yes', ssn: '390 124 421',
      totalSalary: 1560, firstHalf: 780, dailyAmount: null, currency: 'AUD', isLockSalary: false,
      bankAccounts: [] },
    { id: 'STF-07', employeeNumber: 'EMP-1060', title: 'Mrs.', firstName: 'Lorna', familyName: 'Santos', usageName: 'Lorna S.', initials: 'LS', role: 'Housekeeping', userType: 'Employee', dept: 'Housekeeping', bu: 'Noosa Estates', company: 'Azura Stays Noosa Pty Ltd', subsidiary: 'Noosa Branch', nationality: 'Philippines', dob: '1996-03-22', email: 'lorna.s@azurastays.example', workEmail: 'lorna.s@work.azurastays.example', username: 'lorna.s', phone: '+61 423 339 988', status: 'active', salaryType: 'Daily', startDate: '2023-11-01', createdAt: '2023-10-28', dayOff: 'Friday', leaderId: 'STF-04',
      homeAddress: '4 Gympie Terrace, Noosaville', isClockIn: true, isTracker: false, isRemoteWork: false, timesPerWeek: '6',
      workPermitStatus: 'Pending', permitExpiry: '2027-01-20', visaExpiry: '2027-01-20', nextNotificationDate: '2026-12-01', processingAgency: 'Noosa Work Visa Bureau', drivingEligibility: 'No', ssn: '311 879 004',
      totalSalary: null, firstHalf: null, dailyAmount: 37, currency: 'AUD', isLockSalary: false,
      bankAccounts: [] },
    { id: 'STF-08', employeeNumber: 'EMP-1005', title: 'Mr.', firstName: 'Colin', familyName: 'Beh', usageName: 'Colin B.', initials: 'CB', role: 'Team Leader', userType: 'Team Leader', dept: 'Management', bu: 'Sentosa Collection', company: 'Azura Stays Pte. Ltd.', subsidiary: 'Head Office', nationality: 'Singapore', dob: '1982-06-05', email: 'colin.b@azurastays.example', workEmail: 'colin.b@work.azurastays.example', username: 'colin.b', phone: '+65 9999 0001', status: 'inactive', salaryType: 'Monthly', startDate: '2018-01-05', createdAt: '2018-01-01', dayOff: 'Saturday', leaderId: null,
      homeAddress: '18 Telok Blangah Heights, Singapore', isClockIn: false, isTracker: false, isRemoteWork: false, timesPerWeek: '5',
      workPermitStatus: 'Not Required', permitExpiry: '', visaExpiry: '', nextNotificationDate: '', processingAgency: '', drivingEligibility: 'Yes', ssn: 'S8206054B',
      totalSalary: 2200, firstHalf: 1100, dailyAmount: null, currency: 'SGD', isLockSalary: true,
      bankAccounts: [{ bank: 'Standard Chartered', swift: 'SCBLSGSG', type: 'Both', currency: 'SGD', holder: 'Colin Beh', number: '778-211234-5' }] }
  ];

  function loadStaff() {
    var deleted = JSON.parse(localStorage.getItem('mm_usr_staff_deleted') || '[]');
    var added = JSON.parse(localStorage.getItem('mm_usr_staff') || '[]');
    var edits = JSON.parse(localStorage.getItem('mm_usr_staff_edits') || '{}');
    var base = window.MM_USR_STAFF_BASE.filter(function (s) { return deleted.indexOf(s.id) === -1; })
      .map(function (s) { return edits[s.id] ? Object.assign({}, s, edits[s.id]) : s; });
    var addedFiltered = added.filter(function (s) { return deleted.indexOf(s.id) === -1; });
    return base.concat(addedFiltered);
  }
  window.MM_USR_loadStaff = loadStaff;

  /* ---------------------------------------------------------------- */
  /* List screen logic                                                  */
  /* ---------------------------------------------------------------- */

  var tbody = document.getElementById('staff-tbody');
  var emptyEl = document.getElementById('staff-empty');
  var searchInput = document.getElementById('search-input');
  var buFilter = document.getElementById('bu-filter');
  var deptFilter = document.getElementById('dept-filter');
  var salaryFilter = document.getElementById('salary-filter');
  var statusToggle = document.getElementById('status-toggle');
  var statusLabel = document.getElementById('status-toggle-label');
  var resultCount = document.getElementById('result-count');

  var deleteTargetId = null;

  function permitBadge(s) {
    if (s.workPermitStatus === 'Not Required') return '<span class="badge badge-neutral">Not Required</span>';
    if (s.workPermitStatus === 'Approved') return '<span class="badge badge-success">Approved</span>';
    if (s.workPermitStatus === 'Pending') return '<span class="badge badge-warning">Pending</span>';
    if (s.workPermitStatus === 'Expired') return '<span class="badge badge-danger">Expired</span>';
    return '<span class="badge badge-neutral">' + s.workPermitStatus + '</span>';
  }

  function formatDate(d) {
    if (!d) return '–';
    var dt = new Date(d + 'T00:00:00');
    return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function render() {
    var all = loadStaff();
    var q = searchInput.value.trim().toLowerCase();
    var bu = buFilter.value, dept = deptFilter.value, salary = salaryFilter.value;
    var statusMode = statusToggle.dataset.status;

    var filtered = all.filter(function (s) {
      if (statusMode !== 'all' && s.status !== statusMode) return false;
      if (bu && s.bu !== bu) return false;
      if (dept && s.dept !== dept) return false;
      if (salary && s.salaryType !== salary) return false;
      if (q) {
        var hay = (s.firstName + ' ' + s.familyName + ' ' + s.employeeNumber + ' ' + s.email).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    tbody.innerHTML = filtered.map(function (s, i) {
      return '<tr>' +
        '<td class="cell-num">' + (i + 1) + '</td>' +
        '<td><div class="staff-cell"><span class="avatar">' + s.initials + '</span><div><div class="staff-cell__name">' + s.firstName + ' ' + s.familyName + '</div><div class="staff-cell__sub">' + s.usageName + ' &middot; ' + s.employeeNumber + '</div></div></div></td>' +
        '<td>' + s.role + '</td>' +
        '<td>' + s.userType + '</td>' +
        '<td>' + s.bu + '</td>' +
        '<td>' + permitBadge(s) + '</td>' +
        '<td class="cell-sub">' + formatDate(s.createdAt) + '</td>' +
        '<td><div class="row-actions">' +
          '<a class="row-icon-btn" href="../usr-007-view-user-details/index.html?id=' + s.id + '" aria-label="View details" title="View details"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></a>' +
          '<a class="row-icon-btn" href="../usr-006-edit-user/index.html?id=' + s.id + '" aria-label="Edit" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></a>' +
          '<button class="row-icon-btn danger" data-delete="' + s.id + '" aria-label="Delete" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg></button>' +
        '</div></td>' +
        '</tr>';
    }).join('');

    emptyEl.hidden = filtered.length !== 0;
    document.getElementById('pg-count').textContent = filtered.length;
    document.getElementById('pg-total').textContent = filtered.length;
    resultCount.textContent = filtered.length + ' of ' + all.length + ' staff';

    var activeCount = all.filter(function (s) { return s.status === 'active'; }).length;
    var expiring = all.filter(function (s) { return s.workPermitStatus === 'Pending'; }).length;
    var expired = all.filter(function (s) { return s.workPermitStatus === 'Expired'; }).length;
    document.getElementById('stat-total').textContent = all.length;
    document.getElementById('stat-active').textContent = activeCount;
    document.getElementById('stat-expiring').textContent = expiring;
    document.getElementById('stat-expired').textContent = expired;
  }

  searchInput.addEventListener('input', render);
  buFilter.addEventListener('change', render);
  deptFilter.addEventListener('change', render);
  salaryFilter.addEventListener('change', render);
  statusToggle.addEventListener('click', function () {
    var current = statusToggle.dataset.status;
    var next = current === 'active' ? 'inactive' : current === 'inactive' ? 'all' : 'active';
    statusToggle.dataset.status = next;
    statusLabel.textContent = 'Showing: ' + (next === 'all' ? 'All' : next.charAt(0).toUpperCase() + next.slice(1));
    render();
  });
  document.getElementById('clear-filters-btn').addEventListener('click', function () {
    searchInput.value = ''; buFilter.value = ''; deptFilter.value = ''; salaryFilter.value = '';
    statusToggle.dataset.status = 'active'; statusLabel.textContent = 'Showing: Active';
    render();
  });
  document.getElementById('export-btn').addEventListener('click', function () {
    MM.showToast('HR report export started — you will receive a download shortly.');
  });

  document.addEventListener('click', function (e) {
    var delBtn = e.target.closest('[data-delete]');
    if (delBtn) {
      deleteTargetId = delBtn.getAttribute('data-delete');
      var s = loadStaff().find(function (x) { return x.id === deleteTargetId; });
      document.getElementById('del-staff-name').textContent = s ? (s.firstName + ' ' + s.familyName) : 'this staff member';
      MM.openModal('delete-staff-modal');
    }
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    if (!deleteTargetId) return;
    var deleted = JSON.parse(localStorage.getItem('mm_usr_staff_deleted') || '[]');
    deleted.push(deleteTargetId);
    localStorage.setItem('mm_usr_staff_deleted', JSON.stringify(deleted));
    MM.closeModal('delete-staff-modal');
    MM.showToast('Staff member deleted.', { danger: true });
    deleteTargetId = null;
    render();
  });

  render();
})();
