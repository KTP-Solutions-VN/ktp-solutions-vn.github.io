(function () {
  'use strict';

  var form = document.getElementById('add-user-form');
  var saveBtn = document.getElementById('save-btn');
  MM.bindFormValidation(form);

  // Suggest the next employee number based on existing + added staff.
  (function suggestEmployeeNumber() {
    var added = JSON.parse(localStorage.getItem('mm_usr_staff') || '[]');
    var next = 1069 + added.length;
    document.getElementById('employee_number').value = 'EMP-' + next;
  })();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) {
      MM.showToast('Please fix the highlighted fields.', { danger: true });
      return;
    }

    MM.simulateSave(saveBtn, 'Saving...', function () {
      var id = MM.uid('STF');
      var firstName = document.getElementById('first_name').value.trim();
      var familyName = document.getElementById('family_name').value.trim();
      var initials = (firstName[0] || '').toUpperCase() + (familyName[0] || '').toUpperCase();

      var record = {
        id: id,
        employeeNumber: document.getElementById('employee_number').value.trim(),
        title: document.getElementById('title').value,
        firstName: firstName,
        familyName: familyName,
        usageName: document.getElementById('usage_name').value.trim(),
        initials: initials,
        role: 'Employee',
        userType: 'Employee',
        dept: 'Management',
        bu: document.getElementById('business_unit_id').value,
        company: document.getElementById('company_id').value,
        subsidiary: document.getElementById('subsidiary_id').value,
        nationality: document.getElementById('nationality').value,
        dob: document.getElementById('date_of_birth').value,
        email: document.getElementById('email').value.trim(),
        workEmail: document.getElementById('professional_email').value.trim(),
        username: document.getElementById('username').value.trim(),
        phone: document.getElementById('phone_number').value.trim(),
        status: document.getElementById('status').value,
        salaryType: 'Monthly',
        startDate: document.getElementById('starting_date').value,
        createdAt: new Date().toISOString().slice(0, 10),
        dayOff: document.getElementById('day').value,
        leaderId: document.getElementById('leader_id').value || null,
        homeAddress: '', isClockIn: true, isTracker: false, isRemoteWork: false, timesPerWeek: '5',
        workPermitStatus: 'Pending', permitExpiry: '', visaExpiry: '', nextNotificationDate: '', processingAgency: '', drivingEligibility: 'Yes', ssn: '',
        totalSalary: 0, firstHalf: 0, dailyAmount: null, currency: 'THB', isLockSalary: false,
        bankAccounts: []
      };

      var added = JSON.parse(localStorage.getItem('mm_usr_staff') || '[]');
      added.push(record);
      localStorage.setItem('mm_usr_staff', JSON.stringify(added));

      MM.showToast('Staff member created — continue completing their profile.');
      setTimeout(function () {
        window.location.href = '../usr-006-edit-user/index.html?id=' + id;
      }, 700);
    });
  });
})();
