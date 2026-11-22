(function () {
  'use strict';

  var STAFF = [
    { id: 'STF-01', name: 'Daniel Tan', initials: 'DT', dept: 'Management' },
    { id: 'STF-02', name: 'Warren Kelly', initials: 'WK', dept: 'Concierge' },
    { id: 'STF-03', name: 'Nicole Parker', initials: 'NP', dept: 'Concierge' },
    { id: 'STF-04', name: 'Karen Seah', initials: 'KS', dept: 'Housekeeping' },
    { id: 'STF-05', name: 'Ben Sullivan', initials: 'BS', dept: 'Maintenance' },
    { id: 'STF-06', name: 'James Okoro', initials: 'JO', dept: 'Maintenance' },
    { id: 'STF-07', name: 'Lorna Santos', initials: 'LS', dept: 'Housekeeping' },
    { id: 'STF-08', name: 'Colin Beh', initials: 'CB', dept: 'Management' }
  ];

  var BASE_LEAVES = [
    { id: 'LV-01', staffId: 'STF-02', startDate: '2026-06-01', endDate: '2026-06-05', totalDays: 5 },
    { id: 'LV-02', staffId: 'STF-02', startDate: '2026-01-10', endDate: '2026-01-12', totalDays: 3 },
    { id: 'LV-03', staffId: 'STF-04', startDate: '2026-07-20', endDate: '2026-07-22', totalDays: 3 }
  ];

  function loadLeaves() {
    var added = JSON.parse(localStorage.getItem('mm_usr_leaves') || '[]');
    return BASE_LEAVES.concat(added);
  }

  var params = new URLSearchParams(window.location.search);
  var staffId = params.get('id') || 'STF-01';
  var staff = STAFF.find(function (s) { return s.id === staffId; }) || STAFF[0];
  staffId = staff.id;

  document.getElementById('hdr-avatar').textContent = staff.initials;
  document.getElementById('hdr-name').textContent = 'Assign Leave — ' + staff.name;
  document.getElementById('hdr-sub').textContent = staff.dept + ' department';

  function formatDate(d) { return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); }

  function renderHistory() {
    var mine = loadLeaves().filter(function (l) { return l.staffId === staffId; })
      .sort(function (a, b) { return new Date(b.endDate) - new Date(a.endDate); }).slice(0, 2);
    var tbody = document.getElementById('history-tbody');
    var empty = document.getElementById('history-empty');
    if (!mine.length) { tbody.innerHTML = ''; empty.hidden = false; return; }
    empty.hidden = true;
    tbody.innerHTML = mine.map(function (l) {
      return '<tr><td>' + formatDate(l.startDate) + '</td><td>' + formatDate(l.endDate) + '</td><td class="cell-num">' + l.totalDays + '</td></tr>';
    }).join('');
  }
  renderHistory();

  var startInput = document.getElementById('leave_start');
  var endInput = document.getElementById('leave_end');
  var totalDisplay = document.getElementById('total-days-display');
  var overlapEmpty = document.getElementById('overlap-empty');
  var overlapList = document.getElementById('overlap-list');

  function rangesOverlap(aStart, aEnd, bStart, bEnd) {
    return new Date(aStart) <= new Date(bEnd) && new Date(bStart) <= new Date(aEnd);
  }

  function updateComputed() {
    var s = startInput.value, e = endInput.value;
    if (s && e && new Date(e) >= new Date(s)) {
      var days = Math.round((new Date(e) - new Date(s)) / 86400000) + 1;
      totalDisplay.textContent = days + ' day' + (days === 1 ? '' : 's');

      var overlaps = loadLeaves().filter(function (l) {
        var colleague = STAFF.find(function (x) { return x.id === l.staffId; });
        return colleague && colleague.dept === staff.dept && l.staffId !== staffId && rangesOverlap(s, e, l.startDate, l.endDate);
      });
      if (overlaps.length) {
        overlapEmpty.style.display = 'none';
        overlapList.style.display = 'flex';
        overlapList.innerHTML = overlaps.map(function (l) {
          var c = STAFF.find(function (x) { return x.id === l.staffId; });
          return '<li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
            c.name + ' is on leave ' + formatDate(l.startDate) + ' &rarr; ' + formatDate(l.endDate) + '</li>';
        }).join('');
      } else {
        overlapList.style.display = 'none';
        overlapEmpty.style.display = 'block';
        overlapEmpty.textContent = 'No overlapping leave found for the ' + staff.dept + ' department.';
      }
    } else {
      totalDisplay.textContent = '–';
      overlapList.style.display = 'none';
      overlapEmpty.style.display = 'block';
      overlapEmpty.textContent = 'Select a date range to check for overlapping leave in the same department.';
    }
  }
  startInput.addEventListener('change', updateComputed);
  endInput.addEventListener('change', updateComputed);

  var form = document.getElementById('assign-leave-form');
  MM.bindFormValidation(form);
  var saveBtn = document.getElementById('save-btn');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }
    var s = startInput.value, en = endInput.value;
    if (new Date(en) < new Date(s)) {
      endInput.closest('.form-group').classList.add('has-error');
      endInput.closest('.form-group').querySelector('.form-error').textContent = 'End date must be after start date.';
      return;
    }
    MM.simulateSave(saveBtn, 'Saving...', function () {
      var days = Math.round((new Date(en) - new Date(s)) / 86400000) + 1;
      var leaves = JSON.parse(localStorage.getItem('mm_usr_leaves') || '[]');
      leaves.push({ id: MM.uid('LV'), staffId: staffId, startDate: s, endDate: en, totalDays: days });
      localStorage.setItem('mm_usr_leaves', JSON.stringify(leaves));
      MM.showToast('Leave granted to ' + staff.name + '.');
      setTimeout(function () { window.location.href = '../usr-010-granted-leaves/index.html'; }, 700);
    });
  });
})();
