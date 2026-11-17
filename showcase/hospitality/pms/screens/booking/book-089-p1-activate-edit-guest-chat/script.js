(function () {
  'use strict';
  var BOOK = MM.BOOK;

  var params = new URLSearchParams(window.location.search);
  var bookingId = params.get('id');
  var mode = params.get('mode');

  var booking = bookingId ? BOOK.getBookingById(bookingId) : null;
  if (!booking) {
    document.getElementById('pg-content').hidden = true;
    document.getElementById('pg-not-found').hidden = false;
    return;
  }

  var thread = BOOK.getChatThread(bookingId);
  var isEdit = mode === 'edit' || !!(thread && thread.channel);

  document.getElementById('pg-title').textContent = isEdit ? 'Edit Guest Chat' : 'Activate Guest Chat';
  document.getElementById('pg-crumb').textContent = isEdit ? 'Edit Guest Chat' : 'Activate Guest Chat';
  document.getElementById('pg-subtitle').textContent = isEdit
    ? 'Update the chat leader, concierge team, or contact details for this booking.'
    : 'Assign the chat leader and concierge team, then activate the messaging channel for this booking.';

  document.getElementById('bk-summary-grid').innerHTML = [
    ['Booking ID', booking.id], ['Property', booking.property], ['Guest', booking.guest],
    ['Check-in', booking.checkIn], ['Check-out', booking.checkOut], ['Referer', booking.referer || '—']
  ].map(function (row) { return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>'; }).join('');

  var country = (thread && thread.country) || booking.country || '';
  var countries = (BOOK.WATCH_ALL_COUNTRIES && BOOK.WATCH_ALL_COUNTRIES.length ? BOOK.WATCH_ALL_COUNTRIES : BOOK.ALL_GUESTS.map(function (g) { return g.country; })).filter(function (v, i, a) { return a.indexOf(v) === i; });
  if (country && countries.indexOf(country) === -1) countries.push(country);
  document.getElementById('f-country').innerHTML = countries.map(function (c) { return '<option' + (c === country ? ' selected' : '') + '>' + c + '</option>'; }).join('');

  document.getElementById('f-phone').value = (thread && thread.phone) || booking.mobile || '';
  document.getElementById('f-email').value = (thread && thread.email) || '';
  document.getElementById('f-ota-email').value = booking.referer && booking.referer !== 'Direct' && booking.referer !== 'Azura Website' ? booking.guest.toLowerCase().replace(/\s+/g, '.') + '@guest.' + booking.referer.toLowerCase().replace(/[^a-z]/g, '') + '.com' : '—';
  document.getElementById('f-ota').value = booking.referer || '—';
  document.getElementById('f-platform').value = (thread && thread.channel) || 'Whatsapp AI';

  function checkPhone() {
    var val = document.getElementById('f-phone').value.trim();
    var looksInvalid = val && (!/^[+0-9()\-\s]{7,}$/.test(val) || /0000/.test(val));
    document.getElementById('f-phone-warn').hidden = !looksInvalid;
  }
  document.getElementById('f-phone').addEventListener('input', checkPhone);
  checkPhone();

  document.getElementById('btn-call').addEventListener('click', function () {
    MM.showToast('Calling ' + (document.getElementById('f-phone').value || 'guest') + '... (simulated)');
  });

  if (isEdit) {
    document.getElementById('f-openedby-row').hidden = false;
    document.getElementById('f-openeddate-row').hidden = false;
    document.getElementById('f-openedby').value = (thread && thread.concierge) || 'Somchai Anuwat';
    document.getElementById('f-openeddate').value = (thread && thread.lastMessageTime) ? thread.lastMessageTime.slice(0, 10) : new Date().toISOString().slice(0, 10);
  }

  var staffOptions = MM.MOCK_STAFF.map(function (s) { return s.name; });
  var leaderOptions = [booking.guest].concat(staffOptions.filter(function (n) { return n !== booking.guest; }));
  document.getElementById('f-leader').innerHTML = leaderOptions.map(function (n) { return '<option>' + n + '</option>'; }).join('');
  document.getElementById('f-leader').value = (thread && thread.leader) || booking.guest;

  function renderChipRow(elId, options, selectedName) {
    document.getElementById(elId).innerHTML = options.map(function (name) {
      return '<label class="chip' + (name === selectedName ? ' active' : '') + '"><input type="radio" name="' + elId + '" value="' + name + '" style="display:none;"' + (name === selectedName ? ' checked' : '') + '>' + name + '</label>';
    }).join('');
    document.getElementById(elId).addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      this.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      chip.querySelector('input').checked = true;
    });
  }
  renderChipRow('f-concierge-row', staffOptions.filter(function (n) { return MM.MOCK_STAFF.filter(function (s) { return s.name === n; })[0].role === 'Concierge'; }), (thread && thread.concierge) || MM.MOCK_STAFF[0].name);
  renderChipRow('f-owner-row', MM.MOCK_OWNERS.map(function (o) { return o.name; }), (thread && thread.ownerManager) || MM.MOCK_OWNERS[0].name);

  function refreshWelcomeOptions() {
    var lang = country;
    var matches = BOOK.WELCOME_MESSAGES.filter(function (w) { return w.country === lang; });
    var pool = matches.length ? matches : BOOK.WELCOME_MESSAGES;
    document.getElementById('f-welcome-title').innerHTML = pool.map(function (w) { return '<option value="' + w.id + '">' + w.title + '</option>'; }).join('');
    var assignment = BOOK.VILLA_WELCOME_ASSIGNMENTS.filter(function (a) { return a.property === booking.property; })[0];
    if (assignment) document.getElementById('f-welcome-title').value = assignment.messageId;
    document.getElementById('f-welcome-hint').textContent = matches.length ? 'Matched to guest nationality (' + lang + ').' : 'No template matches this nationality — showing all templates.';
  }
  document.getElementById('f-country').addEventListener('change', function () { country = this.value; refreshWelcomeOptions(); });
  refreshWelcomeOptions();

  document.getElementById('chat-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    ['f-phone', 'f-leader'].forEach(function (id) {
      var input = document.getElementById(id);
      if (input.hasAttribute('required') && !input.value.trim()) { valid = false; input.closest('.form-group').classList.add('has-error'); }
      else input.closest('.form-group').classList.remove('has-error');
    });
    if (!valid) { MM.showToast('Please fill in the required fields', { danger: true }); return; }

    MM.simulateSave(document.getElementById('btn-save'), 'Saving...', function () {
      var concierge = document.querySelector('#f-concierge-row input:checked');
      var owner = document.querySelector('#f-owner-row input:checked');
      BOOK.saveChatThreadEdit(bookingId, {
        guest: booking.guest, property: booking.property, country: country,
        language: (thread && thread.language) || 'English',
        phone: document.getElementById('f-phone').value.trim(),
        email: document.getElementById('f-email').value.trim(),
        channel: document.getElementById('f-platform').value,
        leader: document.getElementById('f-leader').value,
        concierge: concierge ? concierge.value : ((thread && thread.concierge) || MM.MOCK_STAFF[0].name),
        ownerManager: owner ? owner.value : ((thread && thread.ownerManager) || MM.MOCK_OWNERS[0].name),
        status: 'active',
        whatsappStatus: document.getElementById('f-platform').value === 'Whatsapp AI' ? 'connected' : null
      });
      MM.showToast(isEdit ? 'Chat updated' : 'Chat activated');
      setTimeout(function () { window.location.href = '../book-089-villa-chat-list-villa-chat/index.html'; }, 500);
    });
  });
})();
