(function () {
  'use strict';
  var days = [
    { label: 'Today \u2014 27 Aug 2026', status: 'assigned', team: 'Team 1', members: 3, vehicle: 'SGX-4821' },
    { label: 'Tomorrow \u2014 28 Aug 2026', status: 'pending', team: null, members: null, vehicle: null }
  ];
  document.getElementById('roster-cards').innerHTML = days.map(function (d) {
    var body;
    if (d.status === 'assigned') {
      body = '<div class="stat-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:0;">' +
        '<div class="stat-card success"><div class="stat-card__label">Team</div><div class="stat-card__value" style="font-size:18px;">' + d.team + '</div></div>' +
        '<div class="stat-card"><div class="stat-card__label">Members</div><div class="stat-card__value" style="font-size:18px;">' + d.members + '</div></div>' +
        '</div><p class="text-sm text-muted" style="margin-top:14px;">Vehicle: <strong>' + d.vehicle + '</strong></p>';
    } else if (d.status === 'weekoff') {
      body = '<div class="empty-state" style="padding:24px 0;"><h3>Weekly Day Off</h3><p>No assignment scheduled.</p></div>';
    } else {
      body = '<div class="empty-state" style="padding:24px 0;"><h3>Pending Assignment</h3><p>Your team lead has not published this schedule yet.</p></div>';
    }
    return '<div class="card"><div class="card__header"><h3>' + d.label + '</h3>' + MM.OPR.badge(d.status === 'assigned' ? 'Completed' : (d.status === 'weekoff' ? 'Draft' : 'Open')) + '</div><div class="card__body">' + body + '</div></div>';
  }).join('');
})();
