(function () {
  'use strict';

  var STAFF = [
    { id: 'STF-01', name: 'Somchai Anuwat', dept: 'Management' },
    { id: 'STF-02', name: 'Wayan Kertha', dept: 'Concierge' },
    { id: 'STF-03', name: 'Nok Pattaya', dept: 'Concierge' },
    { id: 'STF-04', name: 'Kanya Srisawat', dept: 'Housekeeping' },
    { id: 'STF-05', name: 'Budi Santoso', dept: 'Maintenance' },
    { id: 'STF-06', name: 'James Okoro', dept: 'Maintenance' },
    { id: 'STF-07', name: 'Litda Souvannah', dept: 'Housekeeping' },
    { id: 'STF-08', name: 'Chalermchai Boonmee', dept: 'Management' }
  ];

  var BASE_LEAVES = [
    { id: 'LV-01', staffId: 'STF-02', startDate: '2026-06-01', endDate: '2026-06-05', totalDays: 5 },
    { id: 'LV-02', staffId: 'STF-02', startDate: '2026-01-10', endDate: '2026-01-12', totalDays: 3 },
    { id: 'LV-03', staffId: 'STF-04', startDate: '2026-07-20', endDate: '2026-07-22', totalDays: 3 }
  ];
  window.MM_USR_STAFF_SIMPLE = STAFF;

  function loadLeaves() {
    var added = JSON.parse(localStorage.getItem('mm_usr_leaves') || '[]');
    return BASE_LEAVES.concat(added);
  }

  var deptFilter = document.getElementById('dept-filter');
  var tbody = document.getElementById('leaves-tbody');
  var resultCount = document.getElementById('result-count');

  function formatRange(l) {
    var s = new Date(l.startDate + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    var e = new Date(l.endDate + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return s + ' &rarr; ' + e + ' <span class="text-xs text-muted">(' + l.totalDays + 'd)</span>';
  }

  function render() {
    var leaves = loadLeaves();
    var dept = deptFilter.value;
    var filtered = STAFF.filter(function (s) { return !dept || s.dept === dept; });

    tbody.innerHTML = filtered.map(function (s) {
      var mine = leaves.filter(function (l) { return l.staffId === s.id; })
        .sort(function (a, b) { return new Date(b.endDate) - new Date(a.endDate); });
      var recent = mine[0] ? formatRange(mine[0]) : '<span class="leave-none">No Leaves</span>';
      var previous = mine[1] ? formatRange(mine[1]) : '<span class="leave-none">No Leaves</span>';
      return '<tr><td class="cell-strong">' + s.name + '</td><td class="leave-range">' + recent + '</td><td class="leave-range">' + previous + '</td>' +
        '<td style="text-align:right;"><a href="../usr-011-assign-leaves/index.html?id=' + s.id + '" class="btn btn-outline btn-sm">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Add Leave</a></td></tr>';
    }).join('');

    resultCount.textContent = filtered.length + ' staff shown';
  }

  deptFilter.addEventListener('change', render);
  render();
})();
