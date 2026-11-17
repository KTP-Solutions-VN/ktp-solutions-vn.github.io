(function () {
  'use strict';
  var VSV = MM.VSV;
  var TODAY = '2026-09-03';
  /* Shares the exact same storage key as VSV-017's Planning tab, so
     assignments made on either screen show up identically on both. */
  var PLANNING_KEY = 'mm_vsv_garden_planning';

  function loadJSON(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }
  function saveJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
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
    var sel = document.getElementById('plan-bu');
    VSV.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; sel.appendChild(o); });
    sel.value = VSV.BUSINESS_UNITS[0];
    document.getElementById('plan-date').value = TODAY;
  }

  var planTeamTab = 'team-1';
  document.querySelectorAll('[data-tabs="plan-team"] .tab-item').forEach(function (btn) {
    btn.addEventListener('click', function () { planTeamTab = btn.getAttribute('data-tab'); renderPlanning(); });
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
  renderPlanning();
})();
