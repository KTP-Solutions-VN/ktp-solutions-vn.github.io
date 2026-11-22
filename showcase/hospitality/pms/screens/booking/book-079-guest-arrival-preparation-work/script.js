document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var bookingId = params.get('booking_id') || 'BK-10233';
  var bu = params.get('bu') || MM.BOOK.BUSINESS_UNITS[0];
  var booking = MM.BOOK.getBookingById(bookingId);

  function fieldHtml(label, value) {
    return '<div><div class="detail-field__label">' + label + '</div><div class="detail-field__value">' + value + '</div></div>';
  }

  document.getElementById('booking-summary').innerHTML = booking ?
    fieldHtml('Villa', booking.property) +
    fieldHtml('Guest Name', booking.guest) +
    fieldHtml('Check-in Date', MM.BOOK.fmtDate(booking.checkIn)) +
    fieldHtml('Check-out Date', MM.BOOK.fmtDate(booking.checkOut)) +
    fieldHtml('Booking No.', booking.id) +
    fieldHtml('Status', MM.BOOK.statusBadge(booking.status)) :
    '<p class="text-muted">Booking not found — showing a blank preparation log.</p>';

  function renderHistory() {
    var history = MM.BOOK.getVipPrepHistory(bookingId);
    var card = document.getElementById('history-card');
    var list = document.getElementById('history-list');
    if (!history.length) { card.style.display = 'none'; return; }
    card.style.display = '';
    list.innerHTML = history.slice().reverse().map(function (h) {
      return '<div class="prep-history-item">' +
        '<div class="prep-history-item__meta"><strong>' + h.author + '</strong> &middot; ' + MM.BOOK.fmtDateTime(h.date) + '</div>' +
        '<p><b>Cleaning:</b> ' + h.cleaning + '</p>' +
        '<p><b>Check-in prep:</b> ' + h.checkin + '</p>' +
      '</div>';
    }).join('');
  }
  renderHistory();

  var form = document.getElementById('prep-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) { MM.showToast('Please fill in both cleaning and check-in preparation notes.', { danger: true }); return; }
    var btn = document.getElementById('ready-btn');
    MM.simulateSave(btn, 'Saving…', function () {
      MM.BOOK.addVipPrepEntry(bookingId, {
        cleaning: document.getElementById('cleaning-input').value.trim(),
        checkin: document.getElementById('checkin-input').value.trim(),
        author: 'Daniel Tan',
        date: new Date().toISOString()
      });
      MM.showToast("Preparation log saved — off to VIP Guest List.");
      setTimeout(function () {
        window.location.href = '../book-078-vip-guest-list-vip-guests/index.html?bu=' + encodeURIComponent(bu);
      }, 500);
    });
  });
});
