(function () {
  'use strict';
  var TRN = MM.TRN;

  function render() {
    var bu = document.getElementById('f-bu').value;
    var sort = document.getElementById('f-sort').value;
    var records = TRN.getRecords().filter(function (r) { return r.staffId === TRN.CURRENT_USER_ID; });

    var rows = records.map(function (r) {
      var t = TRN.getTutorial(r.tutorialId);
      return { rec: r, t: t };
    }).filter(function (row) { return row.t && (!bu || row.t.businessUnit === bu); });

    if (sort === 'title') rows.sort(function (a, b) { return a.t.title.localeCompare(b.t.title); });
    else if (sort === 'level') { var order = { staff: 0, manager: 1, admin: 2 }; rows.sort(function (a, b) { return order[a.t.accessLevel] - order[b.t.accessLevel]; }); }
    else if (sort === 'due') {
      var rank = { 'Overdue': 0, 'Due Now': 1, 'New': 2, 'Up to date': 3 };
      rows.sort(function (a, b) {
        var sa = TRN.dueStatus(a.t, a.rec.lastReadDate).label, sb = TRN.dueStatus(b.t, b.rec.lastReadDate).label;
        return (rank[sa] === undefined ? 4 : rank[sa]) - (rank[sb] === undefined ? 4 : rank[sb]);
      });
    }

    document.getElementById('list-tbody').innerHTML = rows.map(function (row) {
      var due = TRN.dueStatus(row.t, row.rec.lastReadDate);
      return '<tr><td class="cell-strong">' + row.t.title + '</td>' +
        '<td>' + TRN.levelBadge(row.t.accessLevel) + '</td>' +
        '<td class="cell-sub">' + TRN.rolesText(row.t.roles) + '</td>' +
        '<td class="cell-num">' + row.rec.viewCount + '</td>' +
        '<td class="cell-sub">' + TRN.dateShort(row.rec.lastReadDate) + '</td>' +
        '<td><span class="badge ' + due.cls + '">' + due.label + '</span></td>' +
        '<td class="row-actions" style="text-align:right;"><a href="../trn-009-read-tutorial/index.html?id=' + row.t.id + '" class="btn btn-outline btn-sm">Read</a></td></tr>';
    }).join('');
    document.getElementById('list-empty').hidden = !!rows.length;
    document.getElementById('result-count').textContent = rows.length + ' lesson' + (rows.length === 1 ? '' : 's');

    document.getElementById('stat-read').textContent = rows.length;
    document.getElementById('stat-due').textContent = rows.filter(function (r) { return TRN.dueStatus(r.t, r.rec.lastReadDate).label === 'Due Now'; }).length;
    document.getElementById('stat-overdue').textContent = rows.filter(function (r) { return TRN.dueStatus(r.t, r.rec.lastReadDate).label === 'Overdue'; }).length;
    document.getElementById('stat-ok').textContent = rows.filter(function (r) { var l = TRN.dueStatus(r.t, r.rec.lastReadDate).label; return l === 'Up to date' || l.indexOf('Due on') === 0; }).length;
  }

  document.addEventListener('DOMContentLoaded', function () {
    TRN.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; document.getElementById('f-bu').appendChild(o); });
    render();
    document.getElementById('f-bu').addEventListener('change', render);
    document.getElementById('f-sort').addEventListener('change', render);
  });
})();
