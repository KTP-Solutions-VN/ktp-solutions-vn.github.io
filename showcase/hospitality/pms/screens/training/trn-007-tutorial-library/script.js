(function () {
  'use strict';
  var TRN = MM.TRN;
  var showHidden = false;

  function slideCount(t) { return (t.slides || []).length; }

  function render() {
    var bu = document.getElementById('f-bu').value;
    var sort = document.getElementById('f-sort').value;
    var records = TRN.getRecords().filter(function (r) { return r.staffId === TRN.CURRENT_USER_ID; });

    var data = TRN.getTutorials().filter(function (t) {
      if (!showHidden && t.status !== 'active') return false;
      if (bu && t.businessUnit !== bu) return false;
      return true;
    });

    if (sort === 'title') data.sort(function (a, b) { return a.title.localeCompare(b.title); });
    else if (sort === 'level') { var order = { staff: 0, manager: 1, admin: 2 }; data.sort(function (a, b) { return order[a.accessLevel] - order[b.accessLevel]; }); }
    else if (sort === 'due') {
      data.sort(function (a, b) {
        var ra = records.find(function (r) { return r.tutorialId === a.id; });
        var rb = records.find(function (r) { return r.tutorialId === b.id; });
        var sa = TRN.dueStatus(a, ra ? ra.lastReadDate : null).label;
        var sb = TRN.dueStatus(b, rb ? rb.lastReadDate : null).label;
        var rank = { 'Overdue': 0, 'Due Now': 1, 'New': 2, 'Up to date': 3 };
        return (rank[sa] === undefined ? 4 : rank[sa]) - (rank[sb] === undefined ? 4 : rank[sb]);
      });
    }

    document.getElementById('list-tbody').innerHTML = data.map(function (t) {
      var rec = records.find(function (r) { return r.tutorialId === t.id; });
      var due = TRN.dueStatus(t, rec ? rec.lastReadDate : null);
      var hideShowLabel = t.status === 'active' ? 'Hide' : 'Show';
      return '<tr><td class="cell-strong">' + t.title + (t.status !== 'active' ? ' <span class="badge badge-neutral">Draft</span>' : '') + '</td>' +
        '<td class="cell-sub">' + TRN.rolesText(t.roles) + '</td>' +
        '<td>' + TRN.levelBadge(t.accessLevel) + '</td>' +
        '<td class="cell-num">' + slideCount(t) + '</td>' +
        '<td class="cell-sub">' + (t.releaseDate ? TRN.dateShort(t.releaseDate) : '—') + '</td>' +
        '<td><span class="badge ' + due.cls + '">' + due.label + '</span></td>' +
        '<td class="row-actions" style="text-align:right;">' +
        '<a href="../trn-009-read-tutorial/index.html?id=' + t.id + '" class="btn btn-outline btn-sm">Read</a>' +
        '<button class="btn btn-ghost btn-sm" data-toggle-hide="' + t.id + '" title="' + hideShowLabel + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">' + (t.status === 'active' ? '<path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.7 21.7 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.7 21.7 0 0 1-3.22 4.44M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>' : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/>') + '</svg></button></td></tr>';
    }).join('');
    document.getElementById('list-empty').hidden = !!data.length;
    document.getElementById('result-count').textContent = data.length + ' tutorial' + (data.length === 1 ? '' : 's');
  }

  document.addEventListener('DOMContentLoaded', function () {
    TRN.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; document.getElementById('f-bu').appendChild(o); });
    render();
    document.getElementById('f-bu').addEventListener('change', render);
    document.getElementById('f-sort').addEventListener('change', render);
    document.getElementById('show-hidden-toggle').addEventListener('click', function () {
      showHidden = !showHidden;
      this.classList.toggle('active', !showHidden);
      this.textContent = showHidden ? 'Show Draft/Hidden' : 'Hide Draft/Hidden';
      render();
    });

    document.getElementById('list-tbody').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-toggle-hide]');
      if (!btn) return;
      var id = btn.getAttribute('data-toggle-hide');
      TRN.updateTutorial(id, function (t) { t.status = t.status === 'active' ? 'inactive' : 'active'; });
      MM.showToast('Lesson visibility updated');
      render();
    });
  });
})();
