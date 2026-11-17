(function () {
  'use strict';
  var VSV = MM.VSV;
  var STORAGE_KEY = 'mm_vsv_garden_teams_shifts';
  var TODAY = '2026-09-03';
  var teams = [];
  var addingToTeamIndex = null;

  function loadAll() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; } }
  function saveAll(map) { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); }

  function key(date, bu) { return date + '|' + bu; }

  function staffName(id) { var s = VSV.GARDEN_STAFF.find(function (x) { return x.id === id; }); return s ? s.name : id; }

  function defaultTeams() {
    return [
      { start: '08:00', end: '16:00', breakHr: 1, members: [] },
      { start: '08:00', end: '16:00', breakHr: 1, members: [] }
    ];
  }

  function populateBU() {
    var sel = document.getElementById('f-bu');
    VSV.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; sel.appendChild(o); });
    sel.value = VSV.BUSINESS_UNITS[0];
    document.getElementById('f-date').value = TODAY;
  }

  function currentCtx() { return { date: document.getElementById('f-date').value, bu: document.getElementById('f-bu').value }; }

  function loadTeamsForContext() {
    var ctx = currentCtx();
    var all = loadAll();
    var saved = all[key(ctx.date, ctx.bu)];
    teams = saved ? JSON.parse(JSON.stringify(saved)) : defaultTeams();
    render();
  }

  function render() {
    var container = document.getElementById('teams-container');
    document.getElementById('team-count').textContent = teams.length + ' team' + (teams.length === 1 ? '' : 's');
    container.innerHTML = teams.map(function (t, i) {
      return '<div class="card gt-team-card" data-team="' + i + '">' +
        '<div class="card__header"><h3>Garden Team ' + (i + 1) + '</h3>' + (teams.length > 1 ? '<button class="gt-remove-team" data-remove-team="' + i + '" type="button">Remove Team</button>' : '') + '</div>' +
        '<div class="gt-shift-row">' +
          '<div class="form-group"><label>Start<span class="req">*</span></label><input type="time" data-field="start" data-team="' + i + '" value="' + t.start + '"></div>' +
          '<div class="form-group"><label>End<span class="req">*</span></label><input type="time" data-field="end" data-team="' + i + '" value="' + t.end + '"></div>' +
          '<div class="form-group"><label>Break (Hr)<span class="req">*</span></label><input type="number" min="0" max="4" step="0.5" data-field="breakHr" data-team="' + i + '" value="' + t.breakHr + '"></div>' +
        '</div>' +
        '<div class="gt-members">' +
          t.members.map(function (mid) { return '<span class="gt-member-chip">' + staffName(mid) + '<button type="button" data-remove-member="' + i + '|' + mid + '" aria-label="Remove">&times;</button></span>'; }).join('') +
          '<button class="gt-add-member" type="button" data-add-member="' + i + '">+ Add Member</button>' +
        '</div>' +
      '</div>';
    }).join('');

    container.querySelectorAll('[data-field]').forEach(function (input) {
      input.addEventListener('change', function () {
        var idx = Number(input.getAttribute('data-team'));
        teams[idx][input.getAttribute('data-field')] = input.type === 'number' ? Number(input.value) : input.value;
      });
    });
    container.querySelectorAll('[data-remove-team]').forEach(function (btn) {
      btn.addEventListener('click', function () { teams.splice(Number(btn.getAttribute('data-remove-team')), 1); render(); });
    });
    container.querySelectorAll('[data-remove-member]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var parts = btn.getAttribute('data-remove-member').split('|');
        var idx = Number(parts[0]), mid = parts[1];
        teams[idx].members = teams[idx].members.filter(function (m) { return m !== mid; });
        render();
      });
    });
    container.querySelectorAll('[data-add-member]').forEach(function (btn) {
      btn.addEventListener('click', function () { openAddMember(Number(btn.getAttribute('data-add-member'))); });
    });
  }

  function openAddMember(teamIndex) {
    addingToTeamIndex = teamIndex;
    var ctx = currentCtx();
    var team = teams[teamIndex];
    document.getElementById('am-subtitle').textContent = 'Garden Team ' + (teamIndex + 1) + ' · ' + ctx.bu;
    var sel = document.getElementById('am-member');
    sel.innerHTML = '';
    var available = VSV.GARDEN_STAFF.filter(function (s) { return s.bu === ctx.bu && team.members.indexOf(s.id) === -1; });
    if (!available.length) {
      var o = document.createElement('option');
      o.value = ''; o.textContent = 'No more staff available for this BU';
      sel.appendChild(o);
    } else {
      available.forEach(function (s) { var o = document.createElement('option'); o.value = s.id; o.textContent = s.name; sel.appendChild(o); });
    }
    MM.openModal('add-member-modal');
  }

  document.getElementById('am-save').addEventListener('click', function () {
    var val = document.getElementById('am-member').value;
    if (!val) { MM.showToast('No staff available to add.', { danger: true }); return; }
    var btn = this;
    MM.simulateSave(btn, 'Adding...', function () {
      teams[addingToTeamIndex].members.push(val);
      MM.closeModal('add-member-modal');
      render();
      MM.showToast('Member added to the team.');
    });
  });

  document.getElementById('add-team-btn').addEventListener('click', function () {
    teams.push({ start: '08:00', end: '16:00', breakHr: 1, members: [] });
    render();
  });

  document.getElementById('validate-btn').addEventListener('click', function () {
    var valid = true;
    teams.forEach(function (t) { if (!t.start || !t.end) valid = false; });
    if (!valid) { MM.showToast('Every team needs a start and end time.', { danger: true }); return; }
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var ctx = currentCtx();
      var all = loadAll();
      all[key(ctx.date, ctx.bu)] = teams;
      saveAll(all);
      MM.showToast('Garden team shifts saved for ' + ctx.bu + ', ' + VSV.fmtDate(ctx.date) + '.');
    });
  });

  document.getElementById('f-bu').addEventListener('change', loadTeamsForContext);
  document.getElementById('f-date').addEventListener('change', loadTeamsForContext);
  document.getElementById('date-prev').addEventListener('click', function () { shiftDate(-1); });
  document.getElementById('date-next').addEventListener('click', function () { shiftDate(1); });
  function shiftDate(delta) {
    var input = document.getElementById('f-date');
    var d = new Date(input.value + 'T00:00:00');
    d.setDate(d.getDate() + delta);
    input.value = d.toISOString().slice(0, 10);
    loadTeamsForContext();
  }

  populateBU();
  loadTeamsForContext();
})();
