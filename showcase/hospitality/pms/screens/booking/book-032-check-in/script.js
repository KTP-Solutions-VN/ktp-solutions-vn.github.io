document.addEventListener('DOMContentLoaded', function () {
  function pendingRows() {
    return BOOK.getAllBookings().filter(function (b) {
      var st = (b.status || '').toLowerCase();
      return st !== 'checked-in' && st !== 'checked-out' && st !== 'cancelled' && st !== 'black';
    }).sort(function (a, b) { return new Date(a.checkIn) - new Date(b.checkIn); }).slice(0, 8);
  }

  function render() {
    var rows = pendingRows();
    var tbody = document.getElementById('checkin-rows');
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="4"><div class="empty-state"><h3>No check-ins pending</h3><p>Every upcoming arrival has already been checked in.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(function (b) {
      var villa = BOOK.villaByName(b.property);
      return '<tr>' +
        '<td class="cell-strong">' + b.property + '</td>' +
        '<td>' + BOOK.fmtDate(b.checkIn) + '</td>' +
        '<td><span class="badge badge-warning">Pending Check-in</span></td>' +
        '<td><button class="btn btn-primary btn-sm" data-begin="' + b.id + '" data-villa="' + (villa ? villa.id : '') + '">Begin Check-in</button></td>' +
      '</tr>';
    }).join('');
    tbody.querySelectorAll('[data-begin]').forEach(function (btn) {
      btn.addEventListener('click', function () { openGps(btn.getAttribute('data-begin'), btn.getAttribute('data-villa')); });
    });
  }

  var pending = null;
  function openGps(bookingId, villaId) {
    var b = BOOK.getBookingById(bookingId);
    pending = { bookingId: bookingId, villaId: villaId };
    document.getElementById('gps-villa-name').textContent = b.property;
    document.getElementById('gps-status').textContent = 'Locating device…';
    document.getElementById('btn-start-checkin').disabled = true;
    window.MM.openModal('modal-gps');
    setTimeout(function () {
      document.getElementById('gps-status').textContent = 'Location confirmed (within 40m of villa).';
      document.getElementById('btn-start-checkin').disabled = false;
    }, 900);
  }

  document.getElementById('btn-start-checkin').addEventListener('click', function () {
    if (!pending) return;
    var controlId = 'CI-' + MM.uid();
    var today = new Date().toISOString().slice(0, 10);
    window.location.href = '../book-033-check-in-progress/index.html?id=' + controlId + '&date=' + today + '&villa_id=' + pending.villaId + '&booking_id=' + pending.bookingId;
  });

  render();
});
