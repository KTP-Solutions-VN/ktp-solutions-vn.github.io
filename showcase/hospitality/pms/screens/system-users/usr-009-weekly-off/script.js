(function () {
  'use strict';

  var STAFF = [
    { id: 'STF-01', name: 'Daniel Tan', dept: 'Management', dayOff: 'Sunday' },
    { id: 'STF-02', name: 'Warren Kelly', dept: 'Concierge', dayOff: 'Monday' },
    { id: 'STF-03', name: 'Nicole Parker', dept: 'Concierge', dayOff: 'Tuesday' },
    { id: 'STF-04', name: 'Karen Seah', dept: 'Housekeeping', dayOff: 'Sunday' },
    { id: 'STF-05', name: 'Ben Sullivan', dept: 'Maintenance', dayOff: 'Wednesday' },
    { id: 'STF-06', name: 'James Okoro', dept: 'Maintenance', dayOff: 'Thursday' },
    { id: 'STF-07', name: 'Lorna Santos', dept: 'Housekeeping', dayOff: 'Friday' },
    { id: 'STF-08', name: 'Colin Beh', dept: 'Management', dayOff: 'Saturday' }
  ];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var deptFilter = document.getElementById('dept-filter');
  var tbody = document.getElementById('weekly-off-tbody');
  var resultCount = document.getElementById('result-count');

  function loadOverrides() { return JSON.parse(localStorage.getItem('mm_usr_weekly_off') || '{}'); }
  function saveOverride(staffId, day) {
    var overrides = loadOverrides();
    overrides[staffId] = day;
    localStorage.setItem('mm_usr_weekly_off', JSON.stringify(overrides));
  }

  function render() {
    var overrides = loadOverrides();
    var dept = deptFilter.value;
    var filtered = STAFF.filter(function (s) { return !dept || s.dept === dept; });

    tbody.innerHTML = filtered.map(function (s) {
      var current = overrides[s.id] || s.dayOff;
      var cells = DAYS.map(function (d) {
        var checked = current === d ? 'checked' : '';
        return '<td><input type="radio" name="off-' + s.id + '" value="' + d + '" data-staff="' + s.id + '" ' + checked + '></td>';
      }).join('');
      return '<tr><td class="staff-name">' + s.name + '</td>' + cells + '</tr>';
    }).join('');

    resultCount.textContent = filtered.length + ' staff shown';
  }

  deptFilter.addEventListener('change', render);

  tbody.addEventListener('change', function (e) {
    if (e.target.type !== 'radio') return;
    var staffId = e.target.getAttribute('data-staff');
    var day = e.target.value;
    saveOverride(staffId, day);
    var staff = STAFF.find(function (s) { return s.id === staffId; });
    MM.showToast('Day off updated for ' + staff.name + ' — ' + day + '.');
  });

  render();
})();
