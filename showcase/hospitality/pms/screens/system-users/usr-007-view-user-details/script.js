(function () {
  'use strict';

  window.MM_USR_STAFF_BASE = [
    { id: 'STF-01', employeeNumber: 'EMP-1001', title: 'Mr.', firstName: 'Daniel', familyName: 'Tan', usageName: 'Daniel T.', initials: 'DT', role: 'Business Unit Manager', userType: 'Business Unit Manager', dept: 'Management', bu: 'Sentosa Collection', company: 'Azura Stays Pte. Ltd.', subsidiary: 'Head Office', nationality: 'Singapore', dob: '1985-04-12', email: 'daniel.t@azurastays.example', workEmail: 'daniel.t@work.azurastays.example', username: 'daniel.t', phone: '+65 9234 5671', status: 'active', salaryType: 'Monthly', startDate: '2019-03-15', createdAt: '2019-03-10', dayOff: 'Sunday', leaderId: null, bankAccounts: [{ bank: 'DBS Bank', swift: 'DBSSSGSG', currency: 'SGD', holder: 'Daniel Tan', number: '123-456789-0' }] },
    { id: 'STF-02', employeeNumber: 'EMP-1014', title: 'Mr.', firstName: 'Warren', familyName: 'Kelly', usageName: 'Warren K.', initials: 'WK', role: 'Concierge', userType: 'Team Leader', dept: 'Concierge', bu: 'Byron Bay Retreats', company: 'Azura Stays Byron Bay Pty Ltd', subsidiary: 'Byron Bay Branch', nationality: 'Australia', dob: '1990-11-02', email: 'warren.k@azurastays.example', workEmail: 'warren.k@work.azurastays.example', username: 'warren.k', phone: '+61 423 456 789', status: 'active', salaryType: 'Monthly', startDate: '2020-06-01', createdAt: '2020-05-20', dayOff: 'Monday', leaderId: 'STF-01', bankAccounts: [{ bank: 'Westpac', swift: 'WPACAU2S', currency: 'AUD', holder: 'Warren Kelly', number: '009-8877-6655' }] },
    { id: 'STF-03', employeeNumber: 'EMP-1022', title: 'Mrs.', firstName: 'Nicole', familyName: 'Parker', usageName: 'Nicole P.', initials: 'NP', role: 'Concierge', userType: 'Employee', dept: 'Concierge', bu: 'Noosa Estates', company: 'Azura Stays Noosa Pty Ltd', subsidiary: 'Noosa Branch', nationality: 'Australia', dob: '1993-07-19', email: 'nicole.p@azurastays.example', workEmail: 'nicole.p@work.azurastays.example', username: 'nicole.p', phone: '+61 495 551 234', status: 'active', salaryType: 'Monthly', startDate: '2021-01-10', createdAt: '2021-01-05', dayOff: 'Tuesday', leaderId: 'STF-01', bankAccounts: [] },
    { id: 'STF-04', employeeNumber: 'EMP-1030', title: 'Mrs.', firstName: 'Karen', familyName: 'Seah', usageName: 'Karen S.', initials: 'KS', role: 'Housekeeping Lead', userType: 'Team Leader', dept: 'Housekeeping', bu: 'Sentosa Collection', company: 'Azura Stays Pte. Ltd.', subsidiary: 'Head Office', nationality: 'Singapore', dob: '1988-02-27', email: 'karen.s@azurastays.example', workEmail: 'karen.s@work.azurastays.example', username: 'karen.s', phone: '+65 9777 2345', status: 'active', salaryType: 'Daily', startDate: '2020-09-01', createdAt: '2020-08-28', dayOff: 'Sunday', leaderId: 'STF-01', bankAccounts: [{ bank: 'UOB', swift: 'UOVBSGSG', currency: 'SGD', holder: 'Karen Seah', number: '456-789012-3' }] },
    { id: 'STF-05', employeeNumber: 'EMP-1041', title: 'Mr.', firstName: 'Ben', familyName: 'Sullivan', usageName: 'Ben S.', initials: 'BS', role: 'Maintenance Technician', userType: 'Employee', dept: 'Maintenance', bu: 'Byron Bay Retreats', company: 'Azura Stays Byron Bay Pty Ltd', subsidiary: 'Byron Bay Branch', nationality: 'Australia', dob: '1991-09-30', email: 'ben.s@azurastays.example', workEmail: 'ben.s@work.azurastays.example', username: 'ben.s', phone: '+61 432 228 890', status: 'active', salaryType: 'Monthly', startDate: '2022-02-14', createdAt: '2022-02-10', dayOff: 'Wednesday', leaderId: 'STF-02', bankAccounts: [] },
    { id: 'STF-06', employeeNumber: 'EMP-1052', title: 'Mr.', firstName: 'James', familyName: 'Okoro', usageName: 'James O.', initials: 'JO', role: 'Maintenance Technician', userType: 'Employee', dept: 'Maintenance', bu: 'Noosa Estates', company: 'Azura Stays Noosa Pty Ltd', subsidiary: 'Noosa Branch', nationality: 'Nigeria', dob: '1994-12-08', email: 'james.o@azurastays.example', workEmail: 'james.o@work.azurastays.example', username: 'james.o', phone: '+61 401 114 567', status: 'active', salaryType: 'Monthly', startDate: '2023-05-20', createdAt: '2023-05-15', dayOff: 'Thursday', leaderId: 'STF-03', bankAccounts: [] },
    { id: 'STF-07', employeeNumber: 'EMP-1060', title: 'Mrs.', firstName: 'Lorna', familyName: 'Santos', usageName: 'Lorna S.', initials: 'LS', role: 'Housekeeping', userType: 'Employee', dept: 'Housekeeping', bu: 'Noosa Estates', company: 'Azura Stays Noosa Pty Ltd', subsidiary: 'Noosa Branch', nationality: 'Philippines', dob: '1996-03-22', email: 'lorna.s@azurastays.example', workEmail: 'lorna.s@work.azurastays.example', username: 'lorna.s', phone: '+61 423 339 988', status: 'active', salaryType: 'Daily', startDate: '2023-11-01', createdAt: '2023-10-28', dayOff: 'Friday', leaderId: 'STF-04', bankAccounts: [] },
    { id: 'STF-08', employeeNumber: 'EMP-1005', title: 'Mr.', firstName: 'Colin', familyName: 'Beh', usageName: 'Colin B.', initials: 'CB', role: 'Team Leader', userType: 'Team Leader', dept: 'Management', bu: 'Sentosa Collection', company: 'Azura Stays Pte. Ltd.', subsidiary: 'Head Office', nationality: 'Singapore', dob: '1982-06-05', email: 'colin.b@azurastays.example', workEmail: 'colin.b@work.azurastays.example', username: 'colin.b', phone: '+65 9999 0001', status: 'inactive', salaryType: 'Monthly', startDate: '2018-01-05', createdAt: '2018-01-01', dayOff: 'Saturday', leaderId: null, bankAccounts: [{ bank: 'Standard Chartered', swift: 'SCBLSGSG', currency: 'SGD', holder: 'Colin Beh', number: '778-211234-5' }] }
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
  var r = allStaff.find(function (s) { return s.id === staffId; }) || allStaff[0];

  function formatDate(d) {
    if (!d) return '–';
    return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  document.getElementById('hdr-avatar').textContent = r.initials;
  document.getElementById('hdr-name').textContent = r.firstName + ' ' + r.familyName;
  document.getElementById('hdr-sub').textContent = r.employeeNumber + ' · ' + (r.status === 'active' ? 'Active' : 'Inactive');
  document.getElementById('edit-link').href = '../usr-006-edit-user/index.html?id=' + r.id;

  document.getElementById('vo-name').textContent = r.title + ' ' + r.firstName + ' ' + r.familyName;
  document.getElementById('vo-usage').textContent = r.usageName;
  document.getElementById('vo-nationality').textContent = r.nationality;
  document.getElementById('vo-email').textContent = r.email;
  document.getElementById('vo-workemail').textContent = r.workEmail || '–';
  document.getElementById('vo-username').textContent = r.username;
  document.getElementById('vo-phone').textContent = r.phone;
  document.getElementById('vo-company').textContent = r.company;
  document.getElementById('vo-bu').textContent = r.bu;
  document.getElementById('vo-role').textContent = r.userType + ' / ' + r.role;
  document.getElementById('vo-language').textContent = 'English';
  document.getElementById('vo-office').textContent = r.subsidiary;
  document.getElementById('vo-startdate').textContent = formatDate(r.startDate);
  document.getElementById('vo-access').textContent = r.userType;

  var bankTbody = document.getElementById('vo-bank-tbody');
  var bankEmpty = document.getElementById('vo-bank-empty');
  var accounts = r.bankAccounts || [];
  if (!accounts.length) {
    bankEmpty.hidden = false;
  } else {
    bankTbody.innerHTML = accounts.map(function (b, i) {
      return '<tr><td class="cell-num">' + (i + 1) + '</td><td class="cell-strong">' + b.bank + '</td><td>' + b.holder + '</td><td class="cell-num">' + b.number + '</td><td>' + b.swift + '</td><td>' + b.currency + '</td><td>' + r.nationality + '</td></tr>';
    }).join('');
  }
})();
