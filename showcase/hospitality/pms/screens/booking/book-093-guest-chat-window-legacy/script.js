(function () {
  'use strict';
  var BOOK = MM.BOOK;

  var TEMPLATES = ['Booking Confirmation', 'Check-in Reminder', 'Welcome Message', 'Checkout Instructions'];

  var params = new URLSearchParams(window.location.search);
  var bookingId = params.get('id') || 'BK-10232';
  var booking = BOOK.getBookingById(bookingId) || BOOK.getAllBookings()[0];
  var thread = BOOK.getChatThread(booking.id);

  document.getElementById('pg-title').textContent = 'Guest Chat Window (Legacy) — ' + booking.guest;
  document.getElementById('chat-summary').innerHTML = [
    ['Guest Name', booking.guest], ['Property', booking.property],
    ['WhatsApp Status', (thread && thread.whatsappStatus) || 'Not connected']
  ].map(function (row) { return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>'; }).join('');

  var showTemplate = !thread || !thread.whatsappStatus || thread.whatsappStatus === 'waiting';
  document.getElementById('template-row').style.display = showTemplate ? '' : 'none';
  document.getElementById('f-template').innerHTML = '<option value="">Select a template...</option>' + TEMPLATES.map(function (t) { return '<option>' + t + '</option>'; }).join('');

  function renderHistory() {
    var messages = BOOK.getChatMessages(booking.id);
    var el = document.getElementById('chat-history');
    el.innerHTML = messages.length ? messages.map(function (m) {
      return '<div class="legacy-chat-bubble legacy-chat-bubble--' + m.from + '">' + m.text + '<div class="legacy-chat-bubble__time">' + BOOK.fmtChatTime(m.time) + '</div></div>';
    }).join('') : '<p class="text-sm text-muted">No message history for this booking yet.</p>';
    el.scrollTop = el.scrollHeight;
  }
  renderHistory();

  document.getElementById('send-btn').addEventListener('click', function () {
    var template = document.getElementById('f-template').value;
    var text = document.getElementById('f-text').value.trim();
    if (!template && !text) { MM.showToast('Select a template or type a message', { danger: true }); return; }
    MM.simulateSave(document.getElementById('send-btn'), 'Sending...', function () {
      BOOK.appendChatMessage(booking.id, { from: 'staff', text: text || ('Template sent: ' + template), time: new Date().toISOString() });
      document.getElementById('f-text').value = '';
      document.getElementById('f-template').value = '';
      MM.showToast('Message sent');
      renderHistory();
    });
  });
})();
