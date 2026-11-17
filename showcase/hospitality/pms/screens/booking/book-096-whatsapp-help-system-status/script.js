(function () {
  'use strict';
  var BOOK = MM.BOOK;

  var LABELS = { whatsappToken: 'WhatsApp Token', geminiAi: 'Gemini AI', firebase: 'Firebase' };
  document.getElementById('diag-grid').innerHTML = Object.keys(BOOK.SYSTEM_STATUS).map(function (key) {
    var s = BOOK.SYSTEM_STATUS[key];
    return '<div class="diag-card' + (s.ok ? '' : ' diag-card--error') + '">' +
      '<div class="diag-card__label">' + LABELS[key] + '</div>' +
      '<div class="diag-card__value">' + (s.ok ? 'OK' : 'Error') + '</div>' +
      '<div class="diag-card__message">' + s.message + '</div>' +
    '</div>';
  }).join('');

  document.getElementById('f-date').value = new Date().toISOString().slice(0, 10);

  function renderLogs() {
    var date = document.getElementById('f-date').value;
    var rows = BOOK.WHATSAPP_API_LOGS.filter(function (l) { return l.date === date; });
    document.getElementById('log-tbody').innerHTML = rows.length ? rows.map(function (l) {
      return '<tr><td>' + l.time + '</td><td class="cell-strong">' + l.bookingId + '</td><td>' + l.direction + '</td><td>' + l.endpoint + '</td>' +
        '<td><span class="badge badge-' + (l.status === 200 ? 'success' : 'danger') + '">' + l.status + '</span></td><td class="text-sm text-muted">' + l.summary + '</td></tr>';
    }).join('') : '<tr><td colspan="6"><div class="empty-state"><p>No API log entries for this date.</p></div></td></tr>';
  }

  document.getElementById('search-btn').addEventListener('click', renderLogs);
  renderLogs();
})();
