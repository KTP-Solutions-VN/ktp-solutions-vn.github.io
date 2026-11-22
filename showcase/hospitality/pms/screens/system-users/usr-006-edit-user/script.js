(function () {
  'use strict';

  /* Same base roster as USR-004 — kept in sync so records match across screens. */
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
    var addedFiltered = added.filter(function (s) { return deleted.indexOf(s.id) === -1; })
      .map(function (s) { return edits[s.id] ? Object.assign({}, s, edits[s.id]) : s; });
    return base.concat(addedFiltered);
  }

  var params = new URLSearchParams(window.location.search);
  var staffId = params.get('id') || 'STF-01';
  var allStaff = loadStaff();
  var record = allStaff.find(function (s) { return s.id === staffId; }) || allStaff[0];
  staffId = record.id;

  /* Populate Team Leader select with everyone except this record */
  var leaderSelect = document.getElementById('leader_id');
  allStaff.filter(function (s) { return s.id !== staffId; }).forEach(function (s) {
    var opt = document.createElement('option');
    opt.value = s.id; opt.textContent = s.firstName + ' ' + s.familyName;
    leaderSelect.appendChild(opt);
  });

  function setVal(id, val) { var el = document.getElementById(id); if (el) el.value = val == null ? '' : val; }
  function setChecked(id, val) { var el = document.getElementById(id); if (el) el.checked = !!val; }

  function populate(r) {
    document.getElementById('hdr-avatar').textContent = r.initials;
    document.getElementById('hdr-name').textContent = r.firstName + ' ' + r.familyName;
    document.getElementById('hdr-sub').textContent = r.role + ' &middot; ' + r.bu + ' &middot; ' + r.employeeNumber;
    document.getElementById('hdr-sub').innerHTML = r.role + ' &middot; ' + r.bu + ' &middot; ' + r.employeeNumber;

    setVal('employee_number', r.employeeNumber); setVal('title', r.title); setVal('first_name', r.firstName);
    setVal('family_name', r.familyName); setVal('usage_name', r.usageName); setVal('nationality', r.nationality);
    setVal('date_of_birth', r.dob); setVal('email', r.email); setVal('professional_email', r.workEmail);
    setVal('username', r.username); setVal('phone_number', r.phone); setVal('company_id', r.company);
    setVal('subsidiary_id', r.subsidiary); setVal('business_unit_id', r.bu); setVal('starting_date', r.startDate);
    setVal('status', r.status); setVal('day', r.dayOff); setVal('leader_id', r.leaderId || '');

    setChecked('is_clock_in', r.isClockIn); setChecked('is_tracker', r.isTracker); setChecked('is_remote_work_authorized', r.isRemoteWork);
    setVal('times_per_week', r.timesPerWeek); setVal('home_address', r.homeAddress);
    setVal('home_maps_link', r.homeAddress ? 'https://maps.example.com/?q=' + encodeURIComponent(r.homeAddress) : '');

    setVal('work_permit_status', r.workPermitStatus); setVal('expiry_date', r.permitExpiry);
    setVal('visa_expiry_date', r.visaExpiry); setVal('next_notification_date', r.nextNotificationDate);
    setVal('employment_agency', r.processingAgency); setVal('is_driving', r.drivingEligibility);
    setVal('social_security_number', r.ssn);

    var hint = document.getElementById('next-notif-hint');
    if (r.nextNotificationDate) {
      var overdue = new Date(r.nextNotificationDate) < new Date('2026-08-28');
      hint.textContent = overdue ? 'Overdue — follow up with the staff member.' : 'Upcoming reminder.';
      hint.style.color = overdue ? 'var(--color-accent)' : 'var(--color-gray-500)';
    } else { hint.textContent = ''; }

    setChecked('is_lock_sallery', r.isLockSalary);
    setVal('total_amount', r.totalSalary != null ? r.totalSalary : '');
    setVal('first_half_amount', r.firstHalf != null ? r.firstHalf : '');
    setVal('currency_id', r.currency);
    recalcPayroll();
    toggleSalaryLock();

    renderBankAccounts(r.bankAccounts || []);
  }

  function recalcPayroll() {
    var total = parseFloat(document.getElementById('total_amount').value) || 0;
    var first = parseFloat(document.getElementById('first_half_amount').value) || 0;
    var second = Math.max(total - first, 0);
    document.getElementById('second_half_amount').value = second ? second.toLocaleString() : '';
    document.getElementById('daily_amount').value = total ? Math.round(total / 30).toLocaleString() : (record.dailyAmount ? record.dailyAmount.toLocaleString() : '');
  }

  function toggleSalaryLock() {
    var locked = document.getElementById('is_lock_sallery').checked;
    ['total_amount', 'first_half_amount'].forEach(function (id) {
      document.getElementById(id).disabled = locked;
    });
  }

  document.getElementById('total_amount').addEventListener('input', recalcPayroll);
  document.getElementById('first_half_amount').addEventListener('input', recalcPayroll);
  document.getElementById('is_lock_sallery').addEventListener('change', function () {
    toggleSalaryLock();
    MM.showToast(this.checked ? 'Salary locked for editing.' : 'Salary unlocked.');
  });

  /* ---------------------------------------------------------------- */
  /* Bank accounts                                                      */
  /* ---------------------------------------------------------------- */

  var currentBankAccounts = [];
  var bankDeleteIndex = null;

  function renderBankAccounts(list) {
    currentBankAccounts = list;
    var tbody = document.getElementById('bank-tbody');
    var empty = document.getElementById('bank-empty');
    if (!list.length) {
      tbody.innerHTML = '';
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    tbody.innerHTML = list.map(function (b, i) {
      return '<tr><td class="cell-strong">' + b.bank + '</td><td>' + b.holder + '</td><td class="cell-num">' + b.number + '</td><td>' + b.swift + '</td><td>' + b.type + '</td><td>' + b.currency + '</td>' +
        '<td><button type="button" class="row-icon-btn danger" data-bank-delete="' + i + '" aria-label="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('');
  }

  var bankForm = document.getElementById('bank-form');
  MM.bindFormValidation(bankForm);
  document.getElementById('bank-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(bankForm)) return;
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      currentBankAccounts.push({
        bank: document.getElementById('bank-name').value,
        swift: document.getElementById('bank-swift').value.trim(),
        type: document.getElementById('bank-type').value,
        currency: document.getElementById('bank-currency').value,
        holder: document.getElementById('bank-holder').value.trim(),
        number: document.getElementById('bank-number').value.trim()
      });
      renderBankAccounts(currentBankAccounts);
      MM.closeModal('add-bank-modal');
      bankForm.reset();
      MM.showToast('Bank account added.');
    });
  });

  document.addEventListener('click', function (e) {
    var del = e.target.closest('[data-bank-delete]');
    if (del) {
      bankDeleteIndex = parseInt(del.getAttribute('data-bank-delete'), 10);
      document.getElementById('del-bank-label').textContent = currentBankAccounts[bankDeleteIndex].bank + ' (' + currentBankAccounts[bankDeleteIndex].number + ')';
      MM.openModal('delete-bank-modal');
    }
    if (e.target.closest('.doc-remove')) { e.target.closest('tr').remove(); }
    if (e.target.closest('.asset-remove')) { e.target.closest('tr').remove(); }
  });

  document.getElementById('confirm-bank-delete-btn').addEventListener('click', function () {
    if (bankDeleteIndex === null) return;
    currentBankAccounts.splice(bankDeleteIndex, 1);
    renderBankAccounts(currentBankAccounts);
    MM.closeModal('delete-bank-modal');
    MM.showToast('Bank account removed.', { danger: true });
    bankDeleteIndex = null;
  });

  document.getElementById('add-doc-row').addEventListener('click', function () {
    var tr = document.createElement('tr');
    tr.innerHTML = '<td><input type="text" placeholder="Document title"></td><td><input type="file"></td><td><button type="button" class="row-icon-btn danger doc-remove" aria-label="Remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></td>';
    document.getElementById('doc-rows').appendChild(tr);
  });
  document.getElementById('add-asset-row').addEventListener('click', function () {
    var tr = document.createElement('tr');
    tr.innerHTML = '<td><input type="text" placeholder="Asset name"></td><td><input type="date"></td><td><input type="date"></td><td><button type="button" class="row-icon-btn danger asset-remove" aria-label="Remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></td>';
    document.getElementById('asset-rows').appendChild(tr);
  });

  /* ---------------------------------------------------------------- */
  /* Save                                                                */
  /* ---------------------------------------------------------------- */

  var form = document.getElementById('edit-user-form');
  MM.bindFormValidation(form);
  var saveBtn = document.getElementById('save-btn');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) {
      MM.showToast('Please fix the highlighted fields.', { danger: true });
      return;
    }
    MM.simulateSave(saveBtn, 'Saving...', function () {
      var edits = JSON.parse(localStorage.getItem('mm_usr_staff_edits') || '{}');
      var firstName = document.getElementById('first_name').value.trim();
      var familyName = document.getElementById('family_name').value.trim();
      edits[staffId] = {
        employeeNumber: document.getElementById('employee_number').value.trim(),
        title: document.getElementById('title').value,
        firstName: firstName, familyName: familyName,
        initials: (firstName[0] || '').toUpperCase() + (familyName[0] || '').toUpperCase(),
        usageName: document.getElementById('usage_name').value.trim(),
        nationality: document.getElementById('nationality').value,
        dob: document.getElementById('date_of_birth').value,
        email: document.getElementById('email').value.trim(),
        workEmail: document.getElementById('professional_email').value.trim(),
        username: document.getElementById('username').value.trim(),
        phone: document.getElementById('phone_number').value.trim(),
        company: document.getElementById('company_id').value,
        subsidiary: document.getElementById('subsidiary_id').value,
        bu: document.getElementById('business_unit_id').value,
        startDate: document.getElementById('starting_date').value,
        status: document.getElementById('status').value,
        dayOff: document.getElementById('day').value,
        leaderId: document.getElementById('leader_id').value || null,
        isClockIn: document.getElementById('is_clock_in').checked,
        isTracker: document.getElementById('is_tracker').checked,
        isRemoteWork: document.getElementById('is_remote_work_authorized').checked,
        timesPerWeek: document.getElementById('times_per_week').value,
        homeAddress: document.getElementById('home_address').value.trim(),
        workPermitStatus: document.getElementById('work_permit_status').value,
        permitExpiry: document.getElementById('expiry_date').value,
        visaExpiry: document.getElementById('visa_expiry_date').value,
        nextNotificationDate: document.getElementById('next_notification_date').value,
        processingAgency: document.getElementById('employment_agency').value.trim(),
        drivingEligibility: document.getElementById('is_driving').value,
        ssn: document.getElementById('social_security_number').value.trim(),
        isLockSalary: document.getElementById('is_lock_sallery').checked,
        totalSalary: parseFloat(document.getElementById('total_amount').value) || 0,
        firstHalf: parseFloat(document.getElementById('first_half_amount').value) || 0,
        currency: document.getElementById('currency_id').value,
        bankAccounts: currentBankAccounts
      };
      localStorage.setItem('mm_usr_staff_edits', JSON.stringify(edits));
      MM.showToast('Staff profile saved.');
    });
  });

  populate(record);
})();
