(function () {
  'use strict';

  /* ---------------------------------------------------------------- */
  /* Base mock staff roster — reused across USR-004/005/006/007/009/  */
  /* 010/011 so the same 8 people appear consistently everywhere.      */
  /* ---------------------------------------------------------------- */

  window.MM_USR_STAFF_BASE = [
    { id: 'STF-01', employeeNumber: 'EMP-1001', title: 'Mr.', firstName: 'Somchai', familyName: 'Anuwat', usageName: 'Somchai A.', initials: 'SA', role: 'Business Unit Manager', userType: 'Business Unit Manager', dept: 'Management', bu: 'Phuket Collection', company: 'Azura Stays Co., Ltd.', subsidiary: 'Head Office', nationality: 'Thailand', dob: '1985-04-12', email: 'somchai.a@azurastays.example', workEmail: 'somchai.a@work.azurastays.example', username: 'somchai.a', phone: '+66 81 234 5671', status: 'active', salaryType: 'Monthly', startDate: '2019-03-15', createdAt: '2019-03-10', dayOff: 'Sunday', leaderId: null,
      homeAddress: '221 Sukhumvit Rd, Phuket', isClockIn: true, isTracker: true, isRemoteWork: false, timesPerWeek: '5',
      workPermitStatus: 'Not Required', permitExpiry: '', visaExpiry: '', nextNotificationDate: '', processingAgency: '', drivingEligibility: 'Yes', ssn: '1-1029-48210-33-1',
      totalSalary: 85000, firstHalf: 42500, dailyAmount: null, currency: 'THB', isLockSalary: false,
      bankAccounts: [{ bank: 'Bangkok Bank', swift: 'BKKBTHBK', type: 'Salary', currency: 'THB', holder: 'Somchai Anuwat', number: '123-4-56789-0' }] },
    { id: 'STF-02', employeeNumber: 'EMP-1014', title: 'Mr.', firstName: 'Wayan', familyName: 'Kertha', usageName: 'Wayan K.', initials: 'WK', role: 'Concierge', userType: 'Team Leader', dept: 'Concierge', bu: 'Bali Retreats', company: 'Azura Stays Bali Pte.', subsidiary: 'Bali Branch', nationality: 'Indonesia', dob: '1990-11-02', email: 'wayan.k@azurastays.example', workEmail: 'wayan.k@work.azurastays.example', username: 'wayan.k', phone: '+62 812 345 6789', status: 'active', salaryType: 'Monthly', startDate: '2020-06-01', createdAt: '2020-05-20', dayOff: 'Monday', leaderId: 'STF-01',
      homeAddress: 'Jl. Kuta Raya 12, Bali', isClockIn: true, isTracker: true, isRemoteWork: false, timesPerWeek: '6',
      workPermitStatus: 'Approved', permitExpiry: '2027-04-30', visaExpiry: '2027-04-30', nextNotificationDate: '2027-03-01', processingAgency: 'Bali Immigration Partners', drivingEligibility: 'Yes', ssn: '2-8820-11934-22-4',
      totalSalary: 42000, firstHalf: 21000, dailyAmount: null, currency: 'THB', isLockSalary: false,
      bankAccounts: [{ bank: 'Bank Mandiri', swift: 'BMRIIDJA', type: 'Salary', currency: 'IDR', holder: 'Wayan Kertha', number: '009-8877-6655' }] },
    { id: 'STF-03', employeeNumber: 'EMP-1022', title: 'Mrs.', firstName: 'Nok', familyName: 'Pattaya', usageName: 'Nok P.', initials: 'NP', role: 'Concierge', userType: 'Employee', dept: 'Concierge', bu: 'Koh Samui Estates', company: 'Azura Stays Samui Ltd.', subsidiary: 'Samui Branch', nationality: 'Thailand', dob: '1993-07-19', email: 'nok.p@azurastays.example', workEmail: 'nok.p@work.azurastays.example', username: 'nok.p', phone: '+66 89 555 1234', status: 'active', salaryType: 'Monthly', startDate: '2021-01-10', createdAt: '2021-01-05', dayOff: 'Tuesday', leaderId: 'STF-01',
      homeAddress: '55 Chaweng Beach Rd, Koh Samui', isClockIn: true, isTracker: false, isRemoteWork: false, timesPerWeek: '5',
      workPermitStatus: 'Not Required', permitExpiry: '', visaExpiry: '', nextNotificationDate: '', processingAgency: '', drivingEligibility: 'Yes', ssn: '1-8842-20185-11-9',
      totalSalary: 32000, firstHalf: 16000, dailyAmount: null, currency: 'THB', isLockSalary: false,
      bankAccounts: [] },
    { id: 'STF-04', employeeNumber: 'EMP-1030', title: 'Mrs.', firstName: 'Kanya', familyName: 'Srisawat', usageName: 'Kanya S.', initials: 'KS', role: 'Housekeeping Lead', userType: 'Team Leader', dept: 'Housekeeping', bu: 'Phuket Collection', company: 'Azura Stays Co., Ltd.', subsidiary: 'Head Office', nationality: 'Thailand', dob: '1988-02-27', email: 'kanya.s@azurastays.example', workEmail: 'kanya.s@work.azurastays.example', username: 'kanya.s', phone: '+66 81 777 2345', status: 'active', salaryType: 'Daily', startDate: '2020-09-01', createdAt: '2020-08-28', dayOff: 'Sunday', leaderId: 'STF-01',
      homeAddress: '9 Patong Soi 4, Phuket', isClockIn: true, isTracker: true, isRemoteWork: false, timesPerWeek: '6',
      workPermitStatus: 'Not Required', permitExpiry: '', visaExpiry: '', nextNotificationDate: '', processingAgency: '', drivingEligibility: 'No', ssn: '1-2093-77410-08-2',
      totalSalary: null, firstHalf: null, dailyAmount: 950, currency: 'THB', isLockSalary: true,
      bankAccounts: [{ bank: 'Kasikorn Bank', swift: 'KASITHBK', type: 'Salary', currency: 'THB', holder: 'Kanya Srisawat', number: '456-7-89012-3' }] },
    { id: 'STF-05', employeeNumber: 'EMP-1041', title: 'Mr.', firstName: 'Budi', familyName: 'Santoso', usageName: 'Budi S.', initials: 'BS', role: 'Maintenance Technician', userType: 'Employee', dept: 'Maintenance', bu: 'Bali Retreats', company: 'Azura Stays Bali Pte.', subsidiary: 'Bali Branch', nationality: 'Indonesia', dob: '1991-09-30', email: 'budi.s@azurastays.example', workEmail: 'budi.s@work.azurastays.example', username: 'budi.s', phone: '+62 813 222 8890', status: 'active', salaryType: 'Monthly', startDate: '2022-02-14', createdAt: '2022-02-10', dayOff: 'Wednesday', leaderId: 'STF-02',
      homeAddress: 'Jl. Legian 88, Bali', isClockIn: true, isTracker: true, isRemoteWork: false, timesPerWeek: '5',
      workPermitStatus: 'Pending', permitExpiry: '2026-09-15', visaExpiry: '2026-09-15', nextNotificationDate: '2026-09-01', processingAgency: 'Bali Immigration Partners', drivingEligibility: 'Yes', ssn: '2-5510-33820-19-6',
      totalSalary: 38000, firstHalf: 19000, dailyAmount: null, currency: 'THB', isLockSalary: false,
      bankAccounts: [] },
    { id: 'STF-06', employeeNumber: 'EMP-1052', title: 'Mr.', firstName: 'James', familyName: 'Okoro', usageName: 'James O.', initials: 'JO', role: 'Maintenance Technician', userType: 'Employee', dept: 'Maintenance', bu: 'Koh Samui Estates', company: 'Azura Stays Samui Ltd.', subsidiary: 'Samui Branch', nationality: 'Nigeria', dob: '1994-12-08', email: 'james.o@azurastays.example', workEmail: 'james.o@work.azurastays.example', username: 'james.o', phone: '+66 90 111 4567', status: 'active', salaryType: 'Monthly', startDate: '2023-05-20', createdAt: '2023-05-15', dayOff: 'Thursday', leaderId: 'STF-03',
      homeAddress: '31 Lamai Rd, Koh Samui', isClockIn: true, isTracker: true, isRemoteWork: false, timesPerWeek: '5',
      workPermitStatus: 'Expired', permitExpiry: '2026-07-01', visaExpiry: '2026-07-01', nextNotificationDate: '2026-08-01', processingAgency: 'Samui Work Permit Bureau', drivingEligibility: 'Yes', ssn: '3-9012-44210-27-8',
      totalSalary: 36000, firstHalf: 18000, dailyAmount: null, currency: 'THB', isLockSalary: false,
      bankAccounts: [] },
    { id: 'STF-07', employeeNumber: 'EMP-1060', title: 'Mrs.', firstName: 'Litda', familyName: 'Souvannah', usageName: 'Litda S.', initials: 'LS', role: 'Housekeeping', userType: 'Employee', dept: 'Housekeeping', bu: 'Koh Samui Estates', company: 'Azura Stays Samui Ltd.', subsidiary: 'Samui Branch', nationality: 'Laos', dob: '1996-03-22', email: 'litda.s@azurastays.example', workEmail: 'litda.s@work.azurastays.example', username: 'litda.s', phone: '+66 92 333 9988', status: 'active', salaryType: 'Daily', startDate: '2023-11-01', createdAt: '2023-10-28', dayOff: 'Friday', leaderId: 'STF-04',
      homeAddress: '4 Bophut Village, Koh Samui', isClockIn: true, isTracker: false, isRemoteWork: false, timesPerWeek: '6',
      workPermitStatus: 'Pending', permitExpiry: '2027-01-20', visaExpiry: '2027-01-20', nextNotificationDate: '2026-12-01', processingAgency: 'Samui Work Permit Bureau', drivingEligibility: 'No', ssn: '3-1187-90045-14-2',
      totalSalary: null, firstHalf: null, dailyAmount: 850, currency: 'THB', isLockSalary: false,
      bankAccounts: [] },
    { id: 'STF-08', employeeNumber: 'EMP-1005', title: 'Mr.', firstName: 'Chalermchai', familyName: 'Boonmee', usageName: 'Chalermchai B.', initials: 'CB', role: 'Team Leader', userType: 'Team Leader', dept: 'Management', bu: 'Phuket Collection', company: 'Azura Stays Co., Ltd.', subsidiary: 'Head Office', nationality: 'Thailand', dob: '1982-06-05', email: 'chalermchai.b@azurastays.example', workEmail: 'chalermchai.b@work.azurastays.example', username: 'chalermchai.b', phone: '+66 81 999 0001', status: 'inactive', salaryType: 'Monthly', startDate: '2018-01-05', createdAt: '2018-01-01', dayOff: 'Saturday', leaderId: null,
      homeAddress: '18 Rawai Soi 2, Phuket', isClockIn: false, isTracker: false, isRemoteWork: false, timesPerWeek: '5',
      workPermitStatus: 'Not Required', permitExpiry: '', visaExpiry: '', nextNotificationDate: '', processingAgency: '', drivingEligibility: 'Yes', ssn: '1-0912-55810-06-3',
      totalSalary: 55000, firstHalf: 27500, dailyAmount: null, currency: 'THB', isLockSalary: true,
      bankAccounts: [{ bank: 'Siam Commercial Bank', swift: 'SICOTHBK', type: 'Both', currency: 'THB', holder: 'Chalermchai Boonmee', number: '778-2-11234-5' }] }
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
