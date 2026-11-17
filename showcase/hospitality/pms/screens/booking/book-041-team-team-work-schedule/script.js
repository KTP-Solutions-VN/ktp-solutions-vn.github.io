document.addEventListener('DOMContentLoaded', function () {
  var state = { bu: '', date: '2026-09-02' };

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

  function taskHtml(t) {
    var link = t.bookingId ? '../book-028-booking-details-full/index.html?id=' + encodeURIComponent(t.bookingId) : '#';
    return '<a class="team-task" href="' + link + '" style="text-decoration:none; color:inherit;">' +
      '<div><div class="team-task__villa">' + t.villa + '</div><div class="team-task__meta">' + t.kind + ' — ' + t.guest + '</div></div>' +
      '<div class="team-task__time">' + t.start + '&ndash;' + t.end + '</div>' +
    '</a>';
  }

  function cardHtml(member) {
    return '<div class="card">' +
      '<div class="card__header team-card__header">' +
        '<div class="team-card__avatar">' + MM.BOOK.initials(member.name) + '</div>' +
        '<div><h3 style="margin:0;">' + member.name + '</h3><div class="card__header-sub">' + member.team + '</div></div>' +
      '</div>' +
      '<div class="card__body">' +
        (member.tasks.length ? member.tasks.map(taskHtml).join('') :
          '<div class="empty-state" style="padding:20px 0;"><h3>No assignments</h3><p>No check-in/check-out tasks scheduled today.</p></div>') +
      '</div>' +
    '</div>';
  }

  function render() {
    var team = MM.BOOK.getTeamSchedule(state.date, state.bu);
    var host = document.getElementById('team-cards');
    host.innerHTML = team.length ? team.map(cardHtml).join('') :
      '<div class="card"><div class="card__body"><div class="empty-state"><h3>No staff</h3><p>No concierge staff match this business unit.</p></div></div></div>';
  }

  render();
});
