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

  function chatBadge(status) {
    var map = { 'Active': 'success', 'Not started': 'neutral', 'Guest replied': 'info', 'Closed': 'neutral' };
    return '<span class="badge badge-' + (map[status] || 'neutral') + '">' + status + '</span>';
  }

  function rowHtml(r, idx) {
    return '<tr>' +
      '<td class="cell-num">' + (idx + 1) + '</td>' +
      '<td><span class="check-by-pill ' + (r.checkBy === 'Check-in' ? 'checkin' : 'checkout') + '">' + r.checkBy + '</span></td>' +
      '<td><a href="../book-040-villa-planning-calendar/index.html?date=' + state.date + '&villa=' + encodeURIComponent(r.villa) + '" class="cell-strong">' + r.villa + '</a></td>' +
      '<td>' + r.channel + '</td>' +
      '<td>' + r.name + '</td>' +
      '<td>' + r.country + '</td>' +
      '<td class="cell-num">' + r.time + '</td>' +
      '<td>' + r.by + '</td>' +
      '<td class="text-sm text-muted">' + r.request + '</td>' +
      '<td>' + r.concierge + '</td>' +
      '<td>' + chatBadge(r.chatStatus) + '</td>' +
    '</tr>';
  }

  function render() {
    var rows = MM.BOOK.getPlanningRows(state.date, state.bu);
    document.getElementById('result-count').textContent = rows.length + ' row' + (rows.length === 1 ? '' : 's');
    var tbody = document.getElementById('planning-rows');
    tbody.innerHTML = rows.length ? rows.map(rowHtml).join('') :
      '<tr><td colspan="11"><div class="empty-state"><h3>No planning activity</h3><p>No check-ins or check-outs match this date and business unit.</p></div></td></tr>';
  }

  document.getElementById('btn-export').addEventListener('click', function () {
    MM.showToast('Planning list exported for ' + MM.BOOK.fmtDate(state.date) + '.');
  });

  render();
});
