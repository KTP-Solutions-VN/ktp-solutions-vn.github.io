(function () {
  'use strict';
  var BOOK = MM.BOOK;

  var params = new URLSearchParams(window.location.search);
  var bookingId = params.get('id');
  var booking = bookingId ? BOOK.getBookingById(bookingId) : BOOK.getAllBookings()[0];
  var thread = BOOK.getChatThread(booking.id);

  document.getElementById('current-summary').innerHTML = [
    ['Booking Date', (booking.bookingDate || '').slice(0, 10) || '—'],
    ['Check-in', booking.checkIn], ['Check-out', booking.checkOut],
    ['Villa', booking.property], ['Guest Name', booking.guest],
    ['Nationality', (thread && thread.country) || booking.country || '—'],
    ['Current Chat Status', BOOK.chatStatusMeta(thread ? thread.status : 'to-open').label]
  ].map(function (row) { return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>'; }).join('');

  document.getElementById('f-bu').innerHTML = (BOOK.BUSINESS_UNITS || []).map(function (bu) {
    var name = typeof bu === 'string' ? bu : bu.name;
    return '<option>' + name + '</option>';
  }).join('');

  function fillVillas() {
    var bu = document.getElementById('f-bu').value;
    var villas = BOOK.VILLAS.filter(function (v) { return v.bu === bu; });
    document.getElementById('f-villa').innerHTML = villas.map(function (v) { return '<option value="' + v.name + '">' + v.name + '</option>'; }).join('');
  }
  document.getElementById('f-bu').addEventListener('change', fillVillas);
  fillVillas();
  document.getElementById('f-villa').value = booking.property;

  var selectedTarget = null;

  document.getElementById('search-btn').addEventListener('click', function () {
    var villaName = document.getElementById('f-villa').value;
    var checkin = document.getElementById('f-checkin').value;
    var matches = BOOK.getAllBookings().filter(function (b) {
      if (b.id === booking.id) return false;
      if (b.property !== villaName) return false;
      if ((b.status || '').toLowerCase() === 'cancelled') return false;
      if (checkin && b.checkIn !== checkin) return false;
      return true;
    });
    var panel = document.getElementById('link-results');
    if (!matches.length) {
      panel.innerHTML = '<div class="empty-state"><p>No matching bookings found for this villa' + (checkin ? ' and check-in date' : '') + '.</p></div>';
      return;
    }
    panel.innerHTML = matches.map(function (b) {
      return '<div class="link-result-row"><div><strong>' + b.guest + '</strong> — ' + b.property + ' · ' + b.checkIn + ' to ' + b.checkOut + '</div>' +
        '<button class="btn btn-primary btn-sm" data-select="' + b.id + '">Select &amp; Link</button></div>';
    }).join('');
  });

  document.getElementById('link-results').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-select]');
    if (!btn) return;
    var targetId = btn.getAttribute('data-select');
    var target = BOOK.getBookingById(targetId);
    selectedTarget = target;
    document.getElementById('confirm-link-target').textContent = target.guest + ' (' + target.property + ', ' + target.checkIn + ')';
    MM.openModal('confirm-link-modal');
  });

  document.getElementById('confirm-link-btn').addEventListener('click', function () {
    if (!selectedTarget) return;
    MM.simulateSave(document.getElementById('confirm-link-btn'), 'Linking...', function () {
      BOOK.saveChatThreadEdit(booking.id, { status: 'link', linkedBookingId: selectedTarget.id, channel: 'Whatsapp AI', whatsappStatus: 'connected' });
      MM.closeModal('confirm-link-modal');
      MM.showToast('Chat linked to ' + selectedTarget.guest + "'s booking");
      setTimeout(function () { window.location.href = '../book-089-villa-chat-list-villa-chat/index.html'; }, 500);
    });
  });
})();
