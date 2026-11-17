(function () {
  'use strict';

  window.MM_USR_STAFF_BASE = [
    { id: 'STF-01', employeeNumber: 'EMP-1001', title: 'Mr.', firstName: 'Somchai', familyName: 'Anuwat', usageName: 'Somchai A.', initials: 'SA', role: 'Business Unit Manager', userType: 'Business Unit Manager', dept: 'Management', bu: 'Phuket Collection', company: 'Azura Stays Co., Ltd.', subsidiary: 'Head Office', nationality: 'Thailand', dob: '1985-04-12', email: 'somchai.a@azurastays.example', workEmail: 'somchai.a@work.azurastays.example', username: 'somchai.a', phone: '+66 81 234 5671', status: 'active', salaryType: 'Monthly', startDate: '2019-03-15', createdAt: '2019-03-10', dayOff: 'Sunday', leaderId: null, bankAccounts: [{ bank: 'Bangkok Bank', swift: 'BKKBTHBK', currency: 'THB', holder: 'Somchai Anuwat', number: '123-4-56789-0' }] },
    { id: 'STF-02', employeeNumber: 'EMP-1014', title: 'Mr.', firstName: 'Wayan', familyName: 'Kertha', usageName: 'Wayan K.', initials: 'WK', role: 'Concierge', userType: 'Team Leader', dept: 'Concierge', bu: 'Bali Retreats', company: 'Azura Stays Bali Pte.', subsidiary: 'Bali Branch', nationality: 'Indonesia', dob: '1990-11-02', email: 'wayan.k@azurastays.example', workEmail: 'wayan.k@work.azurastays.example', username: 'wayan.k', phone: '+62 812 345 6789', status: 'active', salaryType: 'Monthly', startDate: '2020-06-01', createdAt: '2020-05-20', dayOff: 'Monday', leaderId: 'STF-01', bankAccounts: [{ bank: 'Bank Mandiri', swift: 'BMRIIDJA', currency: 'IDR', holder: 'Wayan Kertha', number: '009-8877-6655' }] },
    { id: 'STF-03', employeeNumber: 'EMP-1022', title: 'Mrs.', firstName: 'Nok', familyName: 'Pattaya', usageName: 'Nok P.', initials: 'NP', role: 'Concierge', userType: 'Employee', dept: 'Concierge', bu: 'Koh Samui Estates', company: 'Azura Stays Samui Ltd.', subsidiary: 'Samui Branch', nationality: 'Thailand', dob: '1993-07-19', email: 'nok.p@azurastays.example', workEmail: 'nok.p@work.azurastays.example', username: 'nok.p', phone: '+66 89 555 1234', status: 'active', salaryType: 'Monthly', startDate: '2021-01-10', createdAt: '2021-01-05', dayOff: 'Tuesday', leaderId: 'STF-01', bankAccounts: [] },
    { id: 'STF-04', employeeNumber: 'EMP-1030', title: 'Mrs.', firstName: 'Kanya', familyName: 'Srisawat', usageName: 'Kanya S.', initials: 'KS', role: 'Housekeeping Lead', userType: 'Team Leader', dept: 'Housekeeping', bu: 'Phuket Collection', company: 'Azura Stays Co., Ltd.', subsidiary: 'Head Office', nationality: 'Thailand', dob: '1988-02-27', email: 'kanya.s@azurastays.example', workEmail: 'kanya.s@work.azurastays.example', username: 'kanya.s', phone: '+66 81 777 2345', status: 'active', salaryType: 'Daily', startDate: '2020-09-01', createdAt: '2020-08-28', dayOff: 'Sunday', leaderId: 'STF-01', bankAccounts: [{ bank: 'Kasikorn Bank', swift: 'KASITHBK', currency: 'THB', holder: 'Kanya Srisawat', number: '456-7-89012-3' }] },
    { id: 'STF-05', employeeNumber: 'EMP-1041', title: 'Mr.', firstName: 'Budi', familyName: 'Santoso', usageName: 'Budi S.', initials: 'BS', role: 'Maintenance Technician', userType: 'Employee', dept: 'Maintenance', bu: 'Bali Retreats', company: 'Azura Stays Bali Pte.', subsidiary: 'Bali Branch', nationality: 'Indonesia', dob: '1991-09-30', email: 'budi.s@azurastays.example', workEmail: 'budi.s@work.azurastays.example', username: 'budi.s', phone: '+62 813 222 8890', status: 'active', salaryType: 'Monthly', startDate: '2022-02-14', createdAt: '2022-02-10', dayOff: 'Wednesday', leaderId: 'STF-02', bankAccounts: [] },
    { id: 'STF-06', employeeNumber: 'EMP-1052', title: 'Mr.', firstName: 'James', familyName: 'Okoro', usageName: 'James O.', initials: 'JO', role: 'Maintenance Technician', userType: 'Employee', dept: 'Maintenance', bu: 'Koh Samui Estates', company: 'Azura Stays Samui Ltd.', subsidiary: 'Samui Branch', nationality: 'Nigeria', dob: '1994-12-08', email: 'james.o@azurastays.example', workEmail: 'james.o@work.azurastays.example', username: 'james.o', phone: '+66 90 111 4567', status: 'active', salaryType: 'Monthly', startDate: '2023-05-20', createdAt: '2023-05-15', dayOff: 'Thursday', leaderId: 'STF-03', bankAccounts: [] },
    { id: 'STF-07', employeeNumber: 'EMP-1060', title: 'Mrs.', firstName: 'Litda', familyName: 'Souvannah', usageName: 'Litda S.', initials: 'LS', role: 'Housekeeping', userType: 'Employee', dept: 'Housekeeping', bu: 'Koh Samui Estates', company: 'Azura Stays Samui Ltd.', subsidiary: 'Samui Branch', nationality: 'Laos', dob: '1996-03-22', email: 'litda.s@azurastays.example', workEmail: 'litda.s@work.azurastays.example', username: 'litda.s', phone: '+66 92 333 9988', status: 'active', salaryType: 'Daily', startDate: '2023-11-01', createdAt: '2023-10-28', dayOff: 'Friday', leaderId: 'STF-04', bankAccounts: [] },
    { id: 'STF-08', employeeNumber: 'EMP-1005', title: 'Mr.', firstName: 'Chalermchai', familyName: 'Boonmee', usageName: 'Chalermchai B.', initials: 'CB', role: 'Team Leader', userType: 'Team Leader', dept: 'Management', bu: 'Phuket Collection', company: 'Azura Stays Co., Ltd.', subsidiary: 'Head Office', nationality: 'Thailand', dob: '1982-06-05', email: 'chalermchai.b@azurastays.example', workEmail: 'chalermchai.b@work.azurastays.example', username: 'chalermchai.b', phone: '+66 81 999 0001', status: 'inactive', salaryType: 'Monthly', startDate: '2018-01-05', createdAt: '2018-01-01', dayOff: 'Saturday', leaderId: null, bankAccounts: [{ bank: 'Siam Commercial Bank', swift: 'SICOTHBK', currency: 'THB', holder: 'Chalermchai Boonmee', number: '778-2-11234-5' }] }
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
