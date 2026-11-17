/* Inbox screen behaviour — mock conversations, thread rendering, canned
   messages and a mock "AI suggested reply" button. */

(function () {
  'use strict';

  var CHANNEL_COLORS = { 'Booking.com': '#003580', 'Airbnb': '#FF5A5F', 'Agoda': '#5A2D82', 'Direct': 'var(--color-primary-dark)' };
  var CHANNEL_INITIALS = { 'Booking.com': 'B', 'Airbnb': 'A', 'Agoda': 'Ag', 'Direct': 'D' };

  var CONVERSATIONS = [
    {
      id: 'c1', guest: 'Sophie Martin', property: 'Villa Andaman Breeze — Room 2', channel: 'Booking.com',
      unread: true, folder: 'unread', time: '10:42 AM',
      preview: 'Hi! Is early check-in possible on the 20th?',
      bookingId: 'RSV-1000', checkin: 'Jul 20, 2026', checkout: 'Jul 23, 2026', total: '$960',
      messages: [
        { from: 'guest', text: 'Hi! Is early check-in possible on the 20th? We land around 11am.', time: '10:40 AM' },
        { from: 'guest', text: 'No worries if not, just checking :)', time: '10:41 AM' }
      ]
    },
    {
      id: 'c2', guest: 'Diego Fernandez', property: 'Palm Grove Residence', channel: 'Airbnb',
      unread: true, folder: 'unread', time: '9:15 AM',
      preview: 'Thank you for confirming, see you soon!',
      bookingId: 'RSV-1001', checkin: 'Jul 22, 2026', checkout: 'Jul 26, 2026', total: '$1,340',
      messages: [
        { from: 'host', text: 'Your booking is confirmed! We\'ll send the door code the day before arrival.', time: '9:10 AM' },
        { from: 'guest', text: 'Thank you for confirming, see you soon!', time: '9:15 AM' }
      ]
    },
    {
      id: 'c3', guest: 'Lucas Meyer', property: 'Aegean Sunset Villa', channel: 'Agoda',
      unread: false, folder: 'pending', time: 'Yesterday',
      preview: 'Can I add breakfast for 2 more guests?',
      bookingId: 'RSV-1003', checkin: 'Jul 23, 2026', checkout: 'Jul 27, 2026', total: '$1,120',
      messages: [
        { from: 'guest', text: 'Can I add breakfast for 2 more guests?', time: 'Yesterday, 4:12 PM' }
      ]
    },
    {
      id: 'c4', guest: 'Anna Kowalski', property: 'Caribbean Blue Villa', channel: 'Booking.com',
      unread: false, folder: 'all', time: 'Yesterday',
      preview: 'Everything was perfect, thank you!',
      bookingId: 'RSV-1004', checkin: 'Jul 15, 2026', checkout: 'Jul 19, 2026', total: '$1,580',
      messages: [
        { from: 'guest', text: 'Everything was perfect, thank you!', time: 'Yesterday, 11:03 AM' },
        { from: 'host', text: 'So glad to hear that! Hope to host you again soon.', time: 'Yesterday, 11:20 AM' }
      ]
    },
    {
      id: 'c5', guest: 'Priya Sharma', property: 'Sunshine Coast Bungalow', channel: 'Direct', unread: false, folder: 'all', time: 'Mon',
      preview: 'Do you allow pets?',
      bookingId: 'RSV-1006', checkin: 'Jul 24, 2026', checkout: 'Jul 26, 2026', total: '$540',
      messages: [{ from: 'guest', text: 'Do you allow pets?', time: 'Mon, 2:30 PM' }]
    }
  ];

  var listEl = document.getElementById('inbox-list-items');
  var currentFolder = 'all';
  var activeId = CONVERSATIONS[0].id;

  function renderList() {
    listEl.innerHTML = '';
    var items = CONVERSATIONS.filter(function (c) {
      if (currentFolder === 'all') return true;
      if (currentFolder === 'unread') return c.unread;
      if (currentFolder === 'pending') return c.folder === 'pending';
      return true;
    });

    items.forEach(function (c) {
      var el = document.createElement('div');
      el.className = 'inbox-item' + (c.unread ? ' unread' : '') + (c.id === activeId ? ' active' : '');
      el.innerHTML =
        '<div class="inbox-item__channel-dot" style="background:' + CHANNEL_COLORS[c.channel] + '">' + CHANNEL_INITIALS[c.channel] + '</div>' +
        '<div class="inbox-item__body">' +
          '<div class="inbox-item__top"><span class="inbox-item__name">' + c.guest + '</span><span class="inbox-item__time">' + c.time + '</span></div>' +
          '<div class="inbox-item__preview">' + c.preview + '</div>' +
          '<div class="inbox-item__property">' + c.property + '</div>' +
        '</div>';
      el.addEventListener('click', function () {
        c.unread = false;
        activeId = c.id;
        renderList();
        renderThread(c);
      });
      listEl.appendChild(el);
    });
  }

  function renderThread(c) {
    document.getElementById('thread-guest').textContent = c.guest;
    document.getElementById('thread-property').textContent = c.property + ' · ' + c.channel;

    var messagesEl = document.getElementById('thread-messages');
    messagesEl.innerHTML = '';
    c.messages.forEach(function (m) {
      var div = document.createElement('div');
      div.className = 'msg ' + m.from;
      div.innerHTML = '<div class="msg-bubble">' + m.text + '</div><div class="msg-time">' + m.time + '</div>';
      messagesEl.appendChild(div);
    });
    messagesEl.scrollTop = messagesEl.scrollHeight;

    document.getElementById('ctx-id').textContent = c.bookingId;
    document.getElementById('ctx-checkin').textContent = c.checkin;
    document.getElementById('ctx-checkout').textContent = c.checkout;
    document.getElementById('ctx-total').textContent = c.total;
  }

  document.querySelector('[data-tabs="inbox-tabs"]').addEventListener('click', function (e) {
    var tab = e.target.closest('.tab-item');
    if (!tab) return;
    currentFolder = tab.getAttribute('data-tab');
    renderList();
  });

  document.getElementById('template-select').addEventListener('change', function () {
    if (this.value) document.getElementById('compose-input').value = this.value;
    this.selectedIndex = 0;
  });

  document.getElementById('ai-suggest-btn').addEventListener('click', function () {
    document.getElementById('compose-input').value = 'Thanks so much for reaching out! Yes, that works — we\'ll take care of it for you. Let us know if you need anything else before your stay.';
    window.CM.showToast('AI suggested reply inserted.');
  });

  document.getElementById('send-btn').addEventListener('click', function () {
    var input = document.getElementById('compose-input');
    var text = input.value.trim();
    if (!text) return;
    var current = CONVERSATIONS.find(function (c) { return c.id === activeId; });
    current.messages.push({ from: 'host', text: text, time: 'Just now' });
    input.value = '';
    renderThread(current);
    window.CM.showToast('Message sent.');
  });

  renderList();
  renderThread(CONVERSATIONS[0]);
})();
