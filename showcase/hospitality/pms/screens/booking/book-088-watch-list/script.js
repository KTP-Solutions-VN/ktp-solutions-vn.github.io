(function () {
  'use strict';
  var BOOK = MM.BOOK;

  var buSelect = document.getElementById('f-bu');
  buSelect.innerHTML = (BOOK.BUSINESS_UNITS || []).map(function (bu) {
    var name = typeof bu === 'string' ? bu : bu.name;
    return '<option>' + name + '</option>';
  }).join('');

  function renderCountrySelect() {
    var bu = buSelect.value;
    var watched = BOOK.getWatchCountries(bu);
    document.getElementById('f-countries').innerHTML = (BOOK.WATCH_ALL_COUNTRIES || []).map(function (c) {
      return '<option value="' + c + '"' + (watched.indexOf(c) !== -1 ? ' selected' : '') + '>' + c + '</option>';
    }).join('');
  }

  function chatBadge(status) {
    var map = { none: ['neutral', 'Not Started'], pending: ['warning', 'Pending'], active: ['success', 'Active'] };
    var m = map[status] || ['neutral', status];
    return '<a href="#" class="badge badge-' + m[0] + '" data-activate-chat="1">' + m[1] + '</a>';
  }

  function render() {
    var bu = buSelect.value;
    var rows = BOOK.getWatchListRows(bu);
    document.getElementById('watch-tbody').innerHTML = rows.length ? rows.map(function (r) {
      return '<tr><td>' + r.checkIn + '</td><td>' + r.checkOut + '</td><td class="cell-strong">' + r.property + '</td><td>' + r.guest + '</td><td>' + r.country + '</td><td>' + chatBadge(r.chatStatus) + '</td>' +
        '<td>' + (r.seen ? r.seen.by : '<button class="btn btn-ghost btn-sm" data-seen="' + r.id + '" title="Mark as seen"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>') + '</td></tr>';
    }).join('') : '<tr><td colspan="7"><div class="empty-state"><p>No bookings currently on the watch list for this business unit.</p></div></td></tr>';
  }

  buSelect.addEventListener('change', function () { renderCountrySelect(); render(); });

  document.getElementById('update-btn').addEventListener('click', function () {
    var selected = Array.prototype.filter.call(document.getElementById('f-countries').options, function (o) { return o.selected; }).map(function (o) { return o.value; });
    MM.simulateSave(document.getElementById('update-btn'), 'Saving...', function () {
      BOOK.saveWatchCountries(buSelect.value, selected);
      MM.showToast('Watch list updated');
      render();
    });
  });

  document.getElementById('watch-tbody').addEventListener('click', function (e) {
    var seenBtn = e.target.closest('[data-seen]');
    if (seenBtn) {
      BOOK.markWatchSeen(seenBtn.getAttribute('data-seen'), 'Daniel Tan');
      MM.showToast('Marked as seen');
      render();
      return;
    }
    var chatLink = e.target.closest('[data-activate-chat]');
    if (chatLink) { e.preventDefault(); MM.showToast('Opening group chat...'); }
  });

  document.getElementById('download-btn').addEventListener('click', function () {
    MM.showToast('Preparing Excel export...');
  });

  renderCountrySelect();
  render();
})();
