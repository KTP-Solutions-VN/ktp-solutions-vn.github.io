document.addEventListener('DOMContentLoaded', function () {
  var state = { from: '', to: '', q: '', status: '' };

  function render() {
    var rows = MM.BOOK.getAllBookings().filter(function (b) {
      if (state.status && (b.status || '').toLowerCase() !== state.status) return false;
      if (state.from && b.checkIn < state.from) return false;
      if (state.to && b.checkIn > state.to) return false;
      if (state.q) {
        var hay = (b.guest + ' ' + b.property).toLowerCase();
        if (hay.indexOf(state.q) === -1) return false;
      }
      return true;
    });
    var tbody = document.getElementById('rows');
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="11"><div class="empty-state"><h3>No bookings match this search</h3><p>Widen the date range or clear the status filter.</p></div></td></tr>';
    } else {
      tbody.innerHTML = rows.map(function (b) {
        var href = '../book-028-booking-details-full/index.html?id=' + encodeURIComponent(b.id);
        var leader = (b.adults || 0) > 3 ? b.guest : '—';
        return '<tr class="clickable" data-href="' + href + '">' +
          '<td>' + MM.BOOK.fmtDate(b.bookingDate ? b.bookingDate.slice(0,10) : '') + '</td>' +
          '<td>' + MM.BOOK.fmtDate(b.checkIn) + '</td>' +
          '<td>' + MM.BOOK.fmtDate(b.checkOut) + '</td>' +
          '<td class="cell-strong">' + b.property + '</td>' +
          '<td>' + b.guest + '</td>' +
          '<td>' + (b.country || '—') + '</td>' +
          '<td>' + (b.referer || '—') + '</td>' +
          '<td><span class="badge badge-neutral">Not Submitted</span></td>' +
          '<td>' + leader + '</td>' +
          '<td>' + MM.BOOK.statusBadge(b.status) + '</td>' +
          '<td><a class="btn btn-ghost btn-sm" href="' + href + '" onclick="event.stopPropagation()">View</a></td>' +
        '</tr>';
      }).join('');
      tbody.querySelectorAll('tr[data-href]').forEach(function (tr) {
        tr.addEventListener('click', function () { window.location.href = tr.getAttribute('data-href'); });
      });
    }
    document.getElementById('result-count').textContent = rows.length + ' booking' + (rows.length === 1 ? '' : 's');
  }

  document.getElementById('f-from').addEventListener('change', function (e) { state.from = e.target.value; render(); });
  document.getElementById('f-to').addEventListener('change', function (e) { state.to = e.target.value; render(); });
  MM.BOOK.wireSearch(document.getElementById('search-input'), function (q) { state.q = q; render(); });
  document.querySelectorAll('#status-chips [data-status]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('#status-chips .chip').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      state.status = chip.getAttribute('data-status');
      render();
    });
  });

  render();
});
