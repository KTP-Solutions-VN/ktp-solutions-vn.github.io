(function () {
  'use strict';
  var teams = JSON.parse(localStorage.getItem('mm_opr_garden_teams') || 'null') || MM.OPR.GARDEN_TEAMS;
  var assignments = JSON.parse(localStorage.getItem('mm_opr_planning_assignments') || '[]');
  var selectedVilla = null;

  document.getElementById('f-team').innerHTML = teams.map(function (t) { return '<option value="' + t.id + '">' + t.name + '</option>'; }).join('');

  function renderQueue() {
    document.getElementById('queue-tbody').innerHTML = MM.OPR.PLANNING_QUEUE.map(function (q, i) {
      return '<tr class="clickable" data-pick="' + i + '"><td><input type="radio" name="pick" ' + (selectedVilla === i ? 'checked' : '') + '></td><td class="cell-strong">' + q.property + '</td><td class="cell-sub">' + q.dueDate + '</td><td class="cell-sub">' + q.available + '</td><td class="cell-num">' + q.hours + '</td></tr>';
    }).join('');
  }
  renderQueue();

  document.getElementById('queue-tbody').addEventListener('click', function (e) {
    var row = e.target.closest('[data-pick]');
    if (!row) return;
    selectedVilla = +row.dataset.pick;
    renderQueue();
    document.getElementById('selected-hint').textContent = 'Assigning: ' + MM.OPR.PLANNING_QUEUE[selectedVilla].property;
    document.getElementById('assign-btn').disabled = false;
  });

  document.getElementById('assign-btn').addEventListener('click', function () {
    if (selectedVilla === null) return;
    var q = MM.OPR.PLANNING_QUEUE[selectedVilla];
    var teamId = document.getElementById('f-team').value;
    var slot = document.getElementById('f-slot').value;
    assignments.push({ teamId: teamId, villa: q.property, available: q.available, hours: q.hours, slot: slot, start: '08:00', end: '10:00' });
    localStorage.setItem('mm_opr_planning_assignments', JSON.stringify(assignments));
    MM.showToast('Assigned ' + q.property + ' to slot ' + slot);
    MM.OPR.PLANNING_QUEUE.splice(selectedVilla, 1);
    selectedVilla = null;
    document.getElementById('assign-btn').disabled = true;
    document.getElementById('selected-hint').textContent = 'Select a villa from the queue first.';
    renderQueue();
    renderTeamTabs();
  });

  function renderTeamTabs() {
    var tabsEl = document.getElementById('team-tabs');
    tabsEl.innerHTML = teams.map(function (t, i) { return '<div class="tab-item' + (i === 0 ? ' active' : '') + '" data-tab="' + t.id + '">' + t.name + '</div>'; }).join('') + '<div class="tab-item" data-tab="total">Team-Total</div>';
    var panels = document.getElementById('team-panels');
    panels.innerHTML = teams.map(function (t, i) {
      var rows = assignments.filter(function (a) { return a.teamId === t.id; });
      return '<div data-tab-panel="' + t.id + '" data-tabs-group="opr017" style="display:' + (i === 0 ? '' : 'none') + ';" class="card">' +
        '<div class="table-wrap"><table class="data-table"><thead><tr><th>Slot</th><th>Villa</th><th>Availability</th><th>Start/End</th><th>Hours</th></tr></thead><tbody>' +
        (rows.length ? rows.map(function (r) { return '<tr><td>' + r.slot + '</td><td class="cell-strong">' + r.villa + '</td><td class="cell-sub">' + r.available + '</td><td class="cell-sub">' + r.start + ' - ' + r.end + '</td><td class="cell-num">' + r.hours + '</td></tr>'; }).join('') : '<tr><td colspan="5" class="text-muted text-sm" style="text-align:center;padding:20px;">No villas assigned yet</td></tr>') +
        '</tbody></table></div></div>';
    }).join('') + '<div data-tab-panel="total" data-tabs-group="opr017" style="display:none;" class="card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Team</th><th>Villas Assigned</th><th>Total Hours</th></tr></thead><tbody>' +
      teams.map(function (t) {
        var rows = assignments.filter(function (a) { return a.teamId === t.id; });
        var hrs = rows.reduce(function (s, r) { return s + Number(r.hours); }, 0);
        return '<tr><td class="cell-strong">' + t.name + '</td><td class="cell-num">' + rows.length + '</td><td class="cell-num">' + hrs + 'h</td></tr>';
      }).join('') + '</tbody></table></div></div>';
  }
  renderTeamTabs();
})();
