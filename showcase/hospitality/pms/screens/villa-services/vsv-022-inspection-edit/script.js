(function () {
  'use strict';

  var DEPARTMENTS = [
    { key: 'maintenance', label: 'Maintenance', staff: ['Kumar Rajan', 'Alan Beh', 'Samuel Chong'] },
    { key: 'cleaning', label: 'Cleaning', staff: VSV.CLEANING_STAFF || [] },
    { key: 'purchasing', label: 'Purchasing', staff: ['Wendy Seng', 'Charles Tham'] },
    { key: 'gardening', label: 'Gardening', staff: VSV.GARDEN_STAFF || [] },
    { key: 'renovation', label: 'Renovation', staff: ['Peter Kwek', 'Nigel Wan'] }
  ];

  var REPORTS = MM.MOCK_PROPERTIES.slice(0, 6).map(function (p, i) {
    var statuses = ['Open', 'In Progress', 'Completed', 'Archived'];
    var deptSets = [
      ['maintenance', 'cleaning'], ['cleaning', 'purchasing', 'gardening'], ['maintenance', 'renovation'],
      ['cleaning'], ['maintenance', 'cleaning', 'gardening'], ['purchasing', 'renovation']
    ];
    return {
      id: 'insp' + i, bu: p.bu, property: p.name, task: 'Quarterly Inspection', status: statuses[i % 4],
      createdBy: 'Daniel Tan', on: '2026-08-' + (10 + i), itemCount: 2 + (i % 3),
      inProgress: statuses[i % 4] === 'In Progress',
      approvedBy: statuses[i % 4] === 'Completed' ? 'Warren Kelly' : null,
      approvedOn: statuses[i % 4] === 'Completed' ? '2026-08-20' : null,
      departments: deptSets[i % deptSets.length]
    };
  });

  var params = new URLSearchParams(window.location.search);
  var report = REPORTS.filter(function (r) { return r.id === params.get('id'); })[0] || REPORTS[0];

  document.getElementById('report-subtitle').textContent = report.property + ' — ' + report.task;
  document.getElementById('report-summary').innerHTML = [
    ['Villa', report.property], ['Inspector', report.createdBy], ['Inspection Date', report.on],
    ['Flagged Items', report.itemCount], ['Status', report.status]
  ].concat(report.approvedBy ? [['Approved By', report.approvedBy + ' on ' + report.approvedOn]] : [])
    .map(function (row) { return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>'; }).join('');

  document.getElementById('dept-fields').innerHTML = DEPARTMENTS.filter(function (d) { return report.departments.indexOf(d.key) !== -1; }).map(function (d) {
    return '<div class="dept-field-row">' +
      '<label for="dept-' + d.key + '">' + d.label + '</label>' +
      '<div><select id="dept-' + d.key + '" data-dept="' + d.key + '"><option value="">Select supervisor...</option>' + d.staff.map(function (s) { return '<option>' + s + '</option>'; }).join('') + '</select>' +
      '<div class="field-error-text" id="err-' + d.key + '">Please select the supervisor.</div></div>' +
    '</div>';
  }).join('');

  document.getElementById('start-btn').addEventListener('click', function () {
    var valid = true;
    DEPARTMENTS.filter(function (d) { return report.departments.indexOf(d.key) !== -1; }).forEach(function (d) {
      var sel = document.getElementById('dept-' + d.key);
      var err = document.getElementById('err-' + d.key);
      if (!sel.value) { err.classList.add('show'); valid = false; } else { err.classList.remove('show'); }
    });
    if (!valid) return;
    if (report.inProgress) {
      MM.openModal('continue-modal');
    } else {
      goToDetails();
    }
  });

  function goToDetails() {
    MM.showToast('Starting inspection processing...');
    setTimeout(function () { window.location.href = '../vsv-022-p1-inspection-edit-details/index.html?id=' + report.id; }, 500);
  }

  document.getElementById('continue-btn').addEventListener('click', function () { MM.closeModal('continue-modal'); goToDetails(); });
  document.getElementById('start-over-btn').addEventListener('click', function () { MM.closeModal('continue-modal'); MM.showToast('Starting over'); goToDetails(); });
})();
