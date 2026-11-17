(function () {
  'use strict';
  var BOOK = MM.BOOK;

  var params = new URLSearchParams(window.location.search);
  var bookingId = params.get('id') || 'BK-10231';
  var booking = BOOK.getBookingById(bookingId) || BOOK.getAllBookings()[0];
  var thread = BOOK.getChatThread(booking.id);

  document.getElementById('pg-title').textContent = 'WhatsApp Chat — ' + booking.guest;
  document.getElementById('chat-summary').innerHTML = [
    ['Villa', booking.property], ['Guest', booking.guest], ['Phone Number', (thread && thread.phone) || booking.mobile || '—'],
    ['WhatsApp Status', (thread && thread.whatsappStatus) || 'Not connected'], ['Access Code', (thread && thread.accessCode) || '—'],
    ['Number Changed', thread && thread.numberChanged ? 'Yes' : 'No']
  ].map(function (row) { return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>'; }).join('');

  document.getElementById('f-template').innerHTML = '<option>Welcome to azurastays</option><option>Booking Confirmation</option><option>Check-in Reminder</option><option>Checkout Instructions</option>';

  function renderHistory() {
    var messages = BOOK.getChatMessages(booking.id);
    var el = document.getElementById('chat-history');
    el.innerHTML = messages.length ? messages.map(function (m) {
      return '<div class="legacy-chat-bubble legacy-chat-bubble--' + m.from + '">' + m.text + '<div class="legacy-chat-bubble__time">' + BOOK.fmtChatTime(m.time) + (m.from === 'staff' ? ' · Sent' : '') + '</div></div>';
    }).join('') : '<p class="text-sm text-muted">No messages yet.</p>';
    el.scrollTop = el.scrollHeight;
  }
  renderHistory();

  document.getElementById('send-btn').addEventListener('click', function () {
    var text = document.getElementById('f-text').value.trim();
    var template = document.getElementById('f-template').value;
    if (!text && !template) { MM.showToast('Type a message or choose a template', { danger: true }); return; }
    MM.simulateSave(document.getElementById('send-btn'), 'Sending...', function () {
      BOOK.appendChatMessage(booking.id, { from: 'staff', text: text || template, time: new Date().toISOString() });
      document.getElementById('f-text').value = '';
      MM.showToast('Message sent');
      renderHistory();
    });
  });

  document.getElementById('end-chat-btn').addEventListener('click', function () { MM.openModal('finish-modal'); });
  document.getElementById('confirm-finish-btn').addEventListener('click', function () {
    BOOK.saveChatThreadEdit(booking.id, { status: 'archived' });
    MM.closeModal('finish-modal');
    MM.showToast('Chat ended — you can close this tab now.');
  });
})();
