(function () {
  'use strict';
  var teams = JSON.parse(JSON.stringify(MM.OPR.GARDEN_TEAMS));

  function render() {
    document.getElementById('teams-container').innerHTML = teams.map(function (t, ti) {
      var memberRows = t.members.map(function (m, mi) {
        return '<span class="chip" style="cursor:default;">' + m + ' <button data-remove-member="' + ti + ':' + mi + '" style="border:none;background:none;color:var(--color-accent);cursor:pointer;font-weight:700;margin-left:4px;">&times;</button></span>';
      }).join(' ');
      return '<div class="card" style="box-shadow:none;border:1px solid var(--color-gray-200);">' +
        '<div class="card__body">' +
        '<div class="flex-between" style="margin-bottom:10px;"><strong style="color:var(--color-primary-dark);">' + t.name + '</strong>' +
        '<div class="flex-gap-8"><input type="time" value="' + t.start + '" data-start="' + ti + '" style="border:1px solid var(--color-gray-300);border-radius:6px;padding:6px;">' +
        '<span class="text-muted text-xs">to</span><input type="time" value="' + t.end + '" data-end="' + ti + '" style="border:1px solid var(--color-gray-300);border-radius:6px;padding:6px;"></div></div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px;">' + memberRows + '</div>' +
        '<div class="flex-gap-8"><select data-member-select="' + ti + '" style="border:1px solid var(--color-gray-300);border-radius:6px;padding:7px;">' +
        MM.MOCK_STAFF.map(function (s) { return '<option value="' + s.name + '">' + s.name + '</option>'; }).join('') +
        '</select><button class="btn btn-outline btn-sm" data-add-member="' + ti + '">Add Member</button></div>' +
        '</div></div>';
    }).join('');
  }
  render();

  document.getElementById('add-team-btn').addEventListener('click', function () {
    teams.push({ id: 'team-' + (teams.length + 1), name: 'Team ' + (teams.length + 1), start: '08:00', end: '16:00', members: [] });
    render();
  });

  document.getElementById('teams-container').addEventListener('click', function (e) {
    var addBtn = e.target.closest('[data-add-member]');
    var removeBtn = e.target.closest('[data-remove-member]');
    if (addBtn) {
      var ti = +addBtn.dataset.addMember;
      var sel = document.querySelector('[data-member-select="' + ti + '"]');
      if (teams[ti].members.indexOf(sel.value) === -1) teams[ti].members.push(sel.value);
      render();
    }
    if (removeBtn) {
      var parts = removeBtn.dataset.removeMember.split(':');
      teams[+parts[0]].members.splice(+parts[1], 1);
      render();
    }
  });

  document.getElementById('teams-container').addEventListener('change', function (e) {
    if (e.target.dataset.start !== undefined) teams[+e.target.dataset.start].start = e.target.value;
    if (e.target.dataset.end !== undefined) teams[+e.target.dataset.end].end = e.target.value;
  });

  document.getElementById('save-teams-btn').addEventListener('click', function () {
    MM.simulateSave(document.getElementById('save-teams-btn'), 'Saving...', function () {
      localStorage.setItem('mm_opr_garden_teams', JSON.stringify(teams));
      MM.showToast('Garden teams saved');
    });
  });
})();
