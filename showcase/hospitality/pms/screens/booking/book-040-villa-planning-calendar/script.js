document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var state = { bu: '', date: params.get('date') || '2026-09-02', mode: 'plan' };

  var buSel = document.getElementById('bu-filter');
  Array.from(new Set(MM.BOOK.VILLAS.map(function (v) { return v.bu; }))).forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o);
  });
  buSel.addEventListener('change', function () { state.bu = buSel.value; render(); });

  var dateInput = document.getElementById('date-filter');
  dateInput.value = state.date;
  dateInput.addEventListener('change', function () { state.date = dateInput.value; render(); });

  function shiftDate(delta) {
    var d = new Date(state.date + 'T00:00:00');
    d.setDate(d.getDate() + delta);
    state.date = d.toISOString().slice(0, 10);
    dateInput.value = state.date;
    render();
  }
  document.getElementById('date-prev').addEventListener('click', function () { shiftDate(-1); });
  document.getElementById('date-next').addEventListener('click', function () { shiftDate(1); });

  document.querySelectorAll('.mode-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.mode = btn.getAttribute('data-mode');
      document.querySelectorAll('.mode-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
      document.getElementById('panel-plan').hidden = state.mode !== 'plan';
      document.getElementById('panel-team').hidden = state.mode !== 'team';
      render();
    });
  });

  function planRowHtml(villaRow) {
    if (!villaRow.events.length) {
      return '<tr><td class="cell-strong">' + villaRow.villaName + '</td>' +
        '<td colspan="6" class="text-sm text-muted">No check-in/check-out activity on this date.</td></tr>';
    }
    return villaRow.events.map(function (e, i) {
      return '<tr>' +
        (i === 0 ? '<td class="cell-strong" rowspan="' + villaRow.events.length + '">' + villaRow.villaName + '</td>' : '') +
        '<td>' + e.name + '</td>' +
        '<td><span class="avatar-sm">' + MM.BOOK.initials(e.name) + '</span></td>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(e.checkIn) + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(e.checkOut) + '</td>' +
        '<td class="cell-num">' + e.start + '</td>' +
        '<td class="cell-num">' + e.end + '</td>' +
      '</tr>';
    }).join('');
  }

  function teamRowHtml(t) {
    return '<tr>' +
      '<td class="cell-strong">' + t.name + '</td>' +
      '<td>' + t.team + '</td>' +
      '<td>' + (t.assignments.length ? t.assignments.join(', ') : '<span class="text-muted">None</span>') + '</td>' +
      '<td>' + (t.available ? '<span class="badge badge-success">Available</span>' : '<span class="badge badge-warning">Fully Booked</span>') + '</td>' +
    '</tr>';
  }

  function render() {
    if (state.mode === 'plan') {
      var villaRows = MM.BOOK.getVillaPlanningRows(state.date, state.bu);
      document.getElementById('plan-rows').innerHTML = villaRows.length ? villaRows.map(planRowHtml).join('') :
        '<tr><td colspan="7"><div class="empty-state"><h3>No villas</h3><p>No villas match this business unit.</p></div></td></tr>';
    } else {
      var team = MM.BOOK.getTeamAvailability(state.date, state.bu);
      document.getElementById('team-rows').innerHTML = team.length ? team.map(teamRowHtml).join('') :
        '<tr><td colspan="4"><div class="empty-state"><h3>No concierge staff</h3><p>No staff match this business unit.</p></div></td></tr>';
    }
  }

  render();
});
