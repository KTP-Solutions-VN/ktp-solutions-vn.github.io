document.addEventListener('DOMContentLoaded', function () {
  var STORE_KEY = 'mm_bookings_extra';
  function getExtra() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); } catch (e) { return []; }
  }
  function render(q) {
    q = (q || '').toLowerCase();
    var rows = getExtra().filter(function (b) {
      return !q || (b.guest + ' ' + b.property).toLowerCase().indexOf(q) !== -1;
    });
    var tbody = document.getElementById('rows');
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="7"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M9 21V10"/></svg>' +
        '<h3>No manual bookings yet</h3><p>Bookings you add via "Add New Booking" will appear here for approval tracking.</p>' +
        '<a class="btn btn-primary" href="../book-036-add-new-booking/index.html">New Reservation</a></div></td></tr>';
    } else {
      tbody.innerHTML = rows.map(function (b, i) {
        return '<tr>' +
          '<td>' + (i + 1) + '</td>' +
          '<td class="cell-strong">' + b.guest + '</td>' +
          '<td>' + b.property + '</td>' +
          '<td>' + (b.referer || '—') + '</td>' +
          '<td>' + MM.BOOK.fmtDate(b.bookingDate ? b.bookingDate.slice(0,10) : '') + '</td>' +
          '<td>' + MM.BOOK.statusBadge(b.status) + '</td>' +
          '<td><a class="btn btn-ghost btn-sm" href="../book-036-add-new-booking/index.html?id=' + encodeURIComponent(b.id) + '">Edit</a></td>' +
        '</tr>';
      }).join('');
    }
    document.getElementById('result-count').textContent = rows.length + ' booking' + (rows.length === 1 ? '' : 's');
  }
  MM.BOOK.wireSearch(document.getElementById('search-input'), render);
  render('');
});
