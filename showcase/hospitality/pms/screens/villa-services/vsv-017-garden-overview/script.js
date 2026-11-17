(function () {
  'use strict';
  var VSV = MM.VSV;
  var TODAY = '2026-09-03';
  var REPORTS_KEY = 'mm_vsv_garden_reports';
  var TEAMS_KEY = 'mm_vsv_garden_teams';
  var PLANNING_KEY = 'mm_vsv_garden_planning';

  /* ================================================================ */
  /* Shared storage helpers                                            */
  /* ================================================================ */
  function loadJSON(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }
  function saveJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  function reportOverrides() { return loadJSON(REPORTS_KEY, { deleted: [], ownerAccess: {} }); }
  function saveReportOverrides(o) { saveJSON(REPORTS_KEY, o); }

  function teamRoster() { return loadJSON(TEAMS_KEY, {}); }
  function saveTeamRoster(o) { saveJSON(TEAMS_KEY, o); }

  function planningData() { return loadJSON(PLANNING_KEY, {}); }
  function savePlanningData(o) { saveJSON(PLANNING_KEY, o); }
  function scheduleFor(date, bu, team) {
    var all = planningData();
    return ((all[date] || {})[bu] || {})[team] || [];
  }
  function setScheduleFor(date, bu, team, list) {
    var all = planningData();
    all[date] = all[date] || {};
    all[date][bu] = all[date][bu] || {};
    all[date][bu][team] = list;
    savePlanningData(all);
  }

  function populateBUSelects() {
    ['rep-bu', 'team-bu', 'plan-bu'].forEach(function (id) {
      var sel = document.getElementById(id);
      if (id === 'rep-bu') { var ph = document.createElement('option'); ph.value = ''; ph.textContent = 'All Business Units'; sel.appendChild(ph); }
      VSV.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; sel.appendChild(o); });
    });
    document.getElementById('team-bu').value = VSV.BUSINESS_UNITS[0];
    document.getElementById('plan-bu').value = VSV.BUSINESS_UNITS[0];
    var villaSel = document.getElementById('rep-villa');
    MM.MOCK_PROPERTIES.forEach(function (p) { var o = document.createElement('option'); o.value = p.id; o.textContent = p.name; villaSel.appendChild(o); });
    document.getElementById('rep-date').value = '';
    document.getElementById('plan-date').value = TODAY;
  }

  /* ================================================================ */
  /* Top-level tab switching (Reports / Team / Planning)               */
  /* ================================================================ */
  document.querySelectorAll('[data-tabs="garden-main"] .tab-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.getAttribute('data-tab') === 'team') renderTeam();
      if (btn.getAttribute('data-tab') === 'planning') renderPlanning();
    });
  });

  /* ================================================================ */
  /* REPORTS TAB                                                       */
  /* ================================================================ */
  var reportsSubTab = 'by-date';
  document.querySelectorAll('[data-tabs="reports-sub"] .tab-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      reportsSubTab = btn.getAttribute('data-tab');
      document.getElementById('reports-date-col').style.display = reportsSubTab === 'by-property' ? '' : 'none';
      renderReports();
    });
  });

  function renderReports() {
    var bu = document.getElementById('rep-bu').value;
    var villaId = document.getElementById('rep-villa').value;
    var date = document.getElementById('rep-date').value;
    var ov = reportOverrides();

    var rows = VSV.GARDEN_REPORTS.filter(function (r) { return ov.deleted.indexOf(r.id) === -1; })
      .map(function (r) { return { report: r, prop: VSV.propertyById(r.villaId), ownerAccess: ov.ownerAccess.hasOwnProperty(r.id) ? ov.ownerAccess[r.id] : r.ownerAccess }; })
      .filter(function (e) { return !!e.prop; })
      .filter(function (e) { return !bu || e.prop.bu === bu; })
      .filter(function (e) { return !villaId || e.report.villaId === villaId; })
      .filter(function (e) { return !date || e.report.date === date; });

    rows.sort(function (a, b) {
      if (reportsSubTab === 'by-property') return a.prop.name.localeCompare(b.prop.name) || (a.report.date < b.report.date ? 1 : -1);
      return a.report.date < b.report.date ? 1 : -1;
    });

    document.getElementById('rep-count').textContent = rows.length + ' visit' + (rows.length === 1 ? '' : 's');
    var tbody = document.getElementById('reports-tbody');
    var empty = document.getElementById('reports-empty');
    if (!rows.length) { tbody.innerHTML = ''; empty.hidden = false; return; }
    empty.hidden = true;

    tbody.innerHTML = rows.map(function (e) {
      var r = e.report;
      var dateCell = reportsSubTab === 'by-property' ? '<td class="reports-date-col">' + VSV.fmtDate(r.date) + '</td>' : '<td class="reports-date-col" style="display:none;">' + VSV.fmtDate(r.date) + '</td>';
      var gpsBadge = r.gps === 'ok' ? '<span class="badge badge-success">OK</span>' : '<span class="badge badge-danger">NOK</span>';
      return '<tr>' +
        '<td class="cell-strong">' + e.prop.name + '</td>' +
        '<td>' + r.service + '</td>' +
        '<td>' + r.operator + '</td>' +
        dateCell +
        '<td class="cell-sub">' + r.start + ' &ndash; ' + r.end + '</td>' +
        '<td>' + gpsBadge + '</td>' +
        '<td>' + r.plan + '</td>' +
        '<td style="text-align:right;"><div class="row-actions">' +
          '<button class="btn btn-outline btn-sm" data-view="' + r.id + '">View</button>' +
          '<button class="btn btn-ghost btn-sm" data-toggle-access="' + r.id + '">' + (e.ownerAccess ? 'Revoke Owner Access' : 'Grant Owner Access') + '</button>' +
          '<button class="btn btn-ghost btn-sm" data-delete="' + r.id + '">Delete</button>' +
        '</div></td>' +
        '</tr>';
    }).join('');

    /* Sync the header Date column visibility with the row cells above. */
    document.querySelectorAll('#reports-tbody .reports-date-col').forEach(function (td) { td.style.display = reportsSubTab === 'by-property' ? '' : 'none'; });

    tbody.querySelectorAll('[data-view]').forEach(function (b) { b.addEventListener('click', function () { openReportView(b.getAttribute('data-view')); }); });
    tbody.querySelectorAll('[data-toggle-access]').forEach(function (b) { b.addEventListener('click', function () { toggleOwnerAccess(b.getAttribute('data-toggle-access')); }); });
    tbody.querySelectorAll('[data-delete]').forEach(function (b) { b.addEventListener('click', function () { openDeleteReport(b.getAttribute('data-delete')); }); });
  }

  function toggleOwnerAccess(id) {
    var ov = reportOverrides();
    var current = ov.ownerAccess.hasOwnProperty(id) ? ov.ownerAccess[id] : (VSV.GARDEN_REPORTS.find(function (r) { return r.id === id; }) || {}).ownerAccess;
    ov.ownerAccess[id] = !current;
    saveReportOverrides(ov);
    MM.showToast(ov.ownerAccess[id] ? 'Owner can now view this report.' : 'Owner access revoked for this report.');
    renderReports();
  }

  var PHOTO_DESCRIPTIONS = ['Before service', 'After service'];
  function openReportView(id) {
    var r = VSV.GARDEN_REPORTS.find(function (x) { return x.id === id; });
    if (!r) return;
    var prop = VSV.propertyById(r.villaId);
    document.getElementById('gv-subtitle').textContent = prop.name + ' · ' + r.service;
    document.getElementById('gv-panel').innerHTML =
      '<div class="ro-item"><span class="ro-label">Garden Service</span><span class="ro-value">' + r.service + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Operator</span><span class="ro-value">' + r.operator + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Cleaning Date</span><span class="ro-value">' + VSV.fmtDate(r.date) + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Start Time</span><span class="ro-value">' + r.start + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">End Time</span><span class="ro-value">' + r.end + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Planned</span><span class="ro-value">' + (r.planned ? 'Yes' : 'No') + '</span></div>';
    document.getElementById('gv-photos').innerHTML = PHOTO_DESCRIPTIONS.map(function (desc, i) {
      return '<tr><td>' + (i + 1) + '</td><td><div class="vsv-photo-thumb-sm">Photo ' + (i + 1) + '</div></td><td>' + desc + ' &mdash; ' + prop.name + ' garden area.</td></tr>';
    }).join('');
    MM.openModal('garden-view-modal');
  }

  var deletingReportId = null;
  function openDeleteReport(id) {
    var r = VSV.GARDEN_REPORTS.find(function (x) { return x.id === id; });
    if (!r) return;
    deletingReportId = id;
    document.getElementById('dr-name').textContent = VSV.propertyById(r.villaId).name + ' · ' + r.service;
    MM.openModal('delete-report-modal');
  }
  document.getElementById('delete-report-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Deleting...', function () {
      var ov = reportOverrides();
      ov.deleted.push(deletingReportId);
      saveReportOverrides(ov);
      MM.closeModal('delete-report-modal');
      MM.showToast('Garden visit report deleted.');
      renderReports();
    });
  });

  ['rep-bu', 'rep-villa', 'rep-date'].forEach(function (id) { document.getElementById(id).addEventListener('change', renderReports); });

  /* ================================================================ */
  /* TEAM TAB                                                          */
  /* ================================================================ */
  function renderTeam() {
    var bu = document.getElementById('team-bu').value;
    var roster = teamRoster();
    var selected = roster[bu] || VSV.GARDEN_STAFF.filter(function (s) { return s.bu === bu; }).map(function (s) { return s.id; });
    var sel = document.getElementById('team-members');
    sel.innerHTML = '';
    VSV.GARDEN_STAFF.filter(function (s) { return s.bu === bu; }).forEach(function (s) {
      var o = document.createElement('option');
      o.value = s.id; o.textContent = s.name;
      if (selected.indexOf(s.id) !== -1) o.selected = true;
      sel.appendChild(o);
    });
  }
  document.getElementById('team-bu').addEventListener('change', renderTeam);
  document.getElementById('team-save').addEventListener('click', function () {
    var btn = this;
    var bu = document.getElementById('team-bu').value;
    var selected = Array.prototype.slice.call(document.getElementById('team-members').selectedOptions).map(function (o) { return o.value; });
    MM.simulateSave(btn, 'Saving...', function () {
      var roster = teamRoster();
      roster[bu] = selected;
      saveTeamRoster(roster);
      MM.showToast('Garden team roster saved for ' + bu + '.');
    });
  });

  /* ================================================================ */
  /* PLANNING TAB                                                      */
  /* ================================================================ */
  var planTeamTab = 'team-1';
  document.querySelectorAll('[data-tabs="plan-team"] .tab-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      planTeamTab = btn.getAttribute('data-tab');
      renderPlanning();
    });
  });
  document.getElementById('plan-bu').addEventListener('change', renderPlanning);
  document.getElementById('plan-date').addEventListener('change', renderPlanning);

  function formatSlotTime(minutesFromEight) {
    var total = 8 * 60 + minutesFromEight;
    var h = Math.floor(total / 60), m = total % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  function renderPlanning() {
    var bu = document.getElementById('plan-bu').value;
    var date = document.getElementById('plan-date').value;
    var titleEl = document.getElementById('plan-schedule-title');
    var teamColHead = document.getElementById('plan-team-col-head');
    var tbody = document.getElementById('plan-schedule-tbody');
    var empty = document.getElementById('plan-schedule-empty');

    var teamLabel = { 'team-1': 'Team 1', 'team-2': 'Team 2', 'team-total': 'Team Total' }[planTeamTab];
    titleEl.textContent = teamLabel + ' Schedule';

    var rows;
    if (planTeamTab === 'team-total') {
      teamColHead.style.display = '';
      rows = ['team-1', 'team-2'].reduce(function (acc, team) {
        return acc.concat(scheduleFor(date, bu, team).map(function (s) { return Object.assign({}, s, { team: team === 'team-1' ? 'Team 1' : 'Team 2' }); }));
      }, []).sort(function (a, b) { return a.slot - b.slot; });
    } else {
      teamColHead.style.display = 'none';
      rows = scheduleFor(date, bu, planTeamTab);
    }

    if (!rows.length) { tbody.innerHTML = ''; empty.hidden = false; }
    else {
      empty.hidden = true;
      tbody.innerHTML = rows.map(function (s) {
        var prop = VSV.propertyById(s.villaId);
        return '<tr>' +
          '<td class="cell-num">' + s.slot + '</td>' +
          '<td class="cell-strong">' + (prop ? prop.name : s.villaId) + '</td>' +
          '<td><span class="badge ' + (s.availability === 'occupied' ? 'badge-warning' : 'badge-neutral') + '">' + (s.availability === 'occupied' ? 'Guest In' : 'Vacant') + '</span></td>' +
          '<td class="cell-sub">' + s.start + ' &ndash; ' + s.end + '</td>' +
          '<td class="cell-num">' + s.hours + '</td>' +
          (s.team ? '<td>' + s.team + '</td>' : '') +
          '</tr>';
      }).join('');
    }

    /* Due villas table — excludes anything already slotted today for this BU (either team). */
    var assignedIds = ['team-1', 'team-2'].reduce(function (acc, team) { return acc.concat(scheduleFor(date, bu, team).map(function (s) { return s.villaId; })); }, []);
    var due = VSV.GARDEN_VILLAS_DUE.filter(function (d) {
      var prop = VSV.propertyById(d.villaId);
      return prop && prop.bu === bu && d.dueDate <= date && assignedIds.indexOf(d.villaId) === -1;
    });
    document.getElementById('plan-due-count').textContent = due.length + ' villa' + (due.length === 1 ? '' : 's') + ' due';
    var dueTbody = document.getElementById('plan-due-tbody');
    var canAssign = planTeamTab !== 'team-total';
    dueTbody.innerHTML = due.length ? due.map(function (d) {
      var prop = VSV.propertyById(d.villaId);
      return '<tr>' +
        '<td class="cell-strong">' + prop.name + '</td>' +
        '<td>' + VSV.fmtDate(d.dueDate) + '</td>' +
        '<td><span class="badge ' + (d.available === 'occupied' ? 'badge-warning' : 'badge-neutral') + '">' + (d.available === 'occupied' ? 'Guest In' : 'Vacant') + '</span></td>' +
        '<td class="cell-num">' + d.manHours + '</td>' +
        '<td style="text-align:right;">' + (canAssign ? '<button class="btn btn-primary btn-sm" data-assign="' + d.id + '">Assign to ' + teamLabel + '</button>' : '<span class="text-muted text-xs">Switch to a team tab to assign</span>') + '</td>' +
        '</tr>';
    }).join('') : '<tr><td colspan="5" class="text-muted text-sm" style="text-align:center;padding:18px;">All due villas are already slotted.</td></tr>';

    dueTbody.querySelectorAll('[data-assign]').forEach(function (b) {
      b.addEventListener('click', function () { assignVilla(b.getAttribute('data-assign'), bu, date); });
    });
  }

  function assignVilla(dueId, bu, date) {
    var due = VSV.GARDEN_VILLAS_DUE.find(function (d) { return d.id === dueId; });
    if (!due) return;
    var list = scheduleFor(date, bu, planTeamTab);
    var startMin = list.reduce(function (sum, s) { return sum + s.hours * 60; }, 0);
    var start = formatSlotTime(startMin);
    var end = formatSlotTime(startMin + due.manHours * 60);
    list.push({ slot: list.length + 1, villaId: due.villaId, availability: due.available, start: start, end: end, hours: due.manHours });
    setScheduleFor(date, bu, planTeamTab, list);
    MM.showToast(VSV.propertyById(due.villaId).name + ' assigned to ' + { 'team-1': 'Team 1', 'team-2': 'Team 2' }[planTeamTab] + '.');
    renderPlanning();
  }

  populateBUSelects();
  renderReports();
  renderTeam();
  renderPlanning();
})();
