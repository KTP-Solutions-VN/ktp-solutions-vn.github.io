/* ==========================================================================
   Booking module — Guest Chat / WhatsApp shared mock data & helpers.
   Extends window.MM.BOOK (defined in booking-data.js). Loaded after
   booking-data.js and before each chat screen's own script.js.

   Reserved for the guest-communication screen group (BOOK-089..BOOK-096):
   Villa Chat List, Activate/Edit Chat, Link Chat, View Linked Chat,
   Welcome Message Settings, Guest Chat Window (Legacy), WhatsApp Manager
   (Legacy + New Version) and their chat windows, WhatsApp Help/Status.

   Every one of those screens renders from BOOK.CHAT_THREADS / CHAT_MESSAGES
   below (merged with localStorage) so a given booking's thread looks
   identical everywhere it appears.
   ========================================================================== */

(function () {
  'use strict';

  window.MM = window.MM || {};
  var BOOK = window.MM.BOOK = window.MM.BOOK || {};

  /* ---------------------------------------------------------------- */
  /* Chat threads — one row per booking currently in the guest-care     */
  /* messaging window. Statuses mirror the real GroupChat.status values */
  /* from BOOK-089: New / Active / Archived / Not required / To Open,   */
  /* plus "link" for a chat merged into another booking (BOOK-090/091). */
  /* ---------------------------------------------------------------- */
  BOOK.CHAT_THREADS = [
    {
      bookingId: 'BK-10231', guest: 'James Whitfield', property: 'Villa Sapphire Cliff',
      country: 'United Kingdom', referer: 'Booking.com', language: 'English',
      accessCode: 'SC-7841', portalCode: 'PT-2231', tdacCode: 'SGAC-88213',
      leader: 'James Whitfield', concierge: 'Daniel Tan', ownerManager: 'Richard Halstead',
      channel: 'Whatsapp AI', status: 'active', linkedBookingId: null,
      whatsappStatus: 'connected', phone: '+44 7700 900123', warnFakePhone: false,
      warnWhatsappBlocked: false, numberChanged: false,
      lastMessage: 'Perfect, see you both at check-in then!', lastMessageTime: '2026-09-02T09:14:00', unread: 2
    },
    {
      bookingId: 'BK-10232', guest: 'Anna Kowalski', property: 'Villa Coral Horizon',
      country: 'Poland', referer: 'Airbnb', language: 'Polish',
      accessCode: 'CH-3302', portalCode: 'PT-2232', tdacCode: 'SGAC-88214',
      leader: '', concierge: 'Daniel Tan', ownerManager: 'Richard Halstead',
      channel: null, status: 'new', linkedBookingId: null,
      whatsappStatus: null, phone: '+48 501 234 567', warnFakePhone: false,
      warnWhatsappBlocked: false, numberChanged: false,
      lastMessage: '', lastMessageTime: null, unread: 0
    },
    {
      bookingId: 'BK-10234', guest: 'Sophia Rossi', property: 'Villa Azure Ridge',
      country: 'Italy', referer: 'Direct', language: 'Italian',
      accessCode: 'AR-5510', portalCode: 'PT-2234', tdacCode: 'SGAC-88216',
      leader: 'Sophia Rossi', concierge: 'Warren Kelly', ownerManager: 'David Chen',
      channel: 'Whatsapp AI', status: 'archived', linkedBookingId: null,
      whatsappStatus: 'connected', phone: '+39 345 678 9012', warnFakePhone: false,
      warnWhatsappBlocked: false, numberChanged: false,
      lastMessage: 'Thank you for a wonderful stay, safe travels!', lastMessageTime: '2026-08-25T11:40:00', unread: 0
    },
    {
      bookingId: 'BK-10236', guest: 'Klaus Richter', property: 'Villa Lotus Terrace',
      country: 'Germany', referer: 'Azura Website', language: 'German',
      accessCode: 'LT-9012', portalCode: 'PT-2236', tdacCode: 'SGAC-88218',
      leader: '', concierge: 'Nicole Parker', ownerManager: 'Priya Nair',
      channel: null, status: 'new', linkedBookingId: null,
      whatsappStatus: null, phone: '+49 170 1234567', warnFakePhone: false,
      warnWhatsappBlocked: false, numberChanged: false,
      lastMessage: '', lastMessageTime: null, unread: 0
    },
    {
      bookingId: 'BK-10237', guest: 'Emma Johansson', property: 'Villa Silver Tide',
      country: 'Sweden', referer: 'Owner', language: 'Swedish',
      accessCode: 'ST-4471', portalCode: 'PT-2237', tdacCode: 'SGAC-88219',
      leader: '', concierge: 'Warren Kelly', ownerManager: 'David Chen',
      channel: null, status: 'not-required', linkedBookingId: null,
      whatsappStatus: null, phone: '+46 70 123 4567', warnFakePhone: false,
      warnWhatsappBlocked: false, numberChanged: false,
      lastMessage: '', lastMessageTime: null, unread: 0
    },
    {
      bookingId: 'BK-10238', guest: "Liam O'Connor", property: 'Villa Golden Palm',
      country: 'Ireland', referer: 'Airbnb', language: 'English',
      accessCode: 'GP-2290', portalCode: 'PT-2238', tdacCode: 'SGAC-88220',
      leader: "Liam O'Connor", concierge: 'Nicole Parker', ownerManager: 'Priya Nair',
      channel: 'Whatsapp AI', status: 'archived', linkedBookingId: null,
      whatsappStatus: 'connected', phone: '+353 85 123 4567', warnFakePhone: false,
      warnWhatsappBlocked: false, numberChanged: false,
      lastMessage: 'Checkout confirmed, thanks for having us!', lastMessageTime: '2026-08-27T10:52:00', unread: 0
    },
    {
      bookingId: 'BK-10233', guest: 'Michael Tan', property: 'Villa Emerald Bay',
      country: 'Singapore', referer: 'Expedia', language: 'English',
      accessCode: 'EB-6603', portalCode: 'PT-2233', tdacCode: 'SGAC-88215',
      leader: 'Michael Tan', concierge: 'Warren Kelly', ownerManager: 'Isabelle Moreau',
      channel: 'Whatsapp AI', status: 'archived', linkedBookingId: null,
      whatsappStatus: 'connected', phone: '+65 8123 4567', warnFakePhone: false,
      warnWhatsappBlocked: false, numberChanged: false,
      lastMessage: 'Chat merged into the new booking — closing this thread.', lastMessageTime: '2026-08-24T16:50:00', unread: 0
    },
    {
      bookingId: 'BK-10239', guest: 'Michael Tan', property: 'Villa Sapphire Cliff',
      country: 'Singapore', referer: 'Booking.com', language: 'English',
      accessCode: 'EB-6603', portalCode: 'PT-2239', tdacCode: 'SGAC-88221',
      leader: 'Michael Tan', concierge: 'Daniel Tan', ownerManager: 'Richard Halstead',
      channel: 'Whatsapp AI', status: 'link', linkedBookingId: 'BK-10233',
      whatsappStatus: 'connected', phone: '+65 8123 4567', warnFakePhone: false,
      warnWhatsappBlocked: false, numberChanged: false,
      lastMessage: 'Great, looking forward to our second stay with you!', lastMessageTime: '2026-08-24T16:52:00', unread: 1
    },
    {
      bookingId: 'BK-10240', guest: 'Sophia Rossi', property: 'Villa Emerald Bay',
      country: 'Italy', referer: 'Direct', language: 'Italian',
      accessCode: 'EB-1187', portalCode: 'PT-2240', tdacCode: 'SGAC-88222',
      leader: '', concierge: 'Warren Kelly', ownerManager: 'Isabelle Moreau',
      channel: null, status: 'to-open', linkedBookingId: null,
      whatsappStatus: 'waiting', phone: '+39 345 000 0000', warnFakePhone: true,
      warnWhatsappBlocked: true, numberChanged: false,
      lastMessage: '', lastMessageTime: null, unread: 0
    },
    {
      bookingId: 'BK-10241', guest: 'James Whitfield', property: 'Villa Coral Horizon',
      country: 'United Kingdom', referer: 'Azura Website', language: 'English',
      accessCode: 'CH-8842', portalCode: 'PT-2241', tdacCode: 'SGAC-88223',
      leader: 'James Whitfield', concierge: 'Daniel Tan', ownerManager: 'Richard Halstead',
      channel: 'Whatsapp AI', status: 'active', linkedBookingId: null,
      whatsappStatus: 'connected', phone: '+44 7700 900456', warnFakePhone: false,
      warnWhatsappBlocked: false, numberChanged: true,
      lastMessage: 'Noted, thank you for confirming the new number.', lastMessageTime: '2026-09-01T18:05:00', unread: 0
    }
  ];

  BOOK.chatThreadByBooking = function (bookingId) {
    var found = null;
    BOOK.CHAT_THREADS.forEach(function (t) { if (t.bookingId === bookingId) found = t; });
    return found;
  };

  function safeParseChat(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }

  /* Demo-session-wide chat thread set: base cast + field-level edits saved
     from the Activate/Edit Chat, Link Chat, and quick-activate inline forms
     (mm_chat_overlay, keyed by booking id). Every chat screen should read
     threads through this instead of BOOK.CHAT_THREADS directly, so an
     activation/link/edit made on one screen is reflected everywhere else
     in the same demo session (mirrors BOOK.getAllBookings()). */
  BOOK.getAllChatThreads = function () {
    var overlay = safeParseChat('mm_chat_overlay', {});
    return BOOK.CHAT_THREADS.map(function (t) {
      return overlay[t.bookingId] ? Object.assign({}, t, overlay[t.bookingId]) : t;
    });
  };
  BOOK.getChatThread = function (bookingId) {
    var found = null;
    BOOK.getAllChatThreads().forEach(function (t) { if (t.bookingId === bookingId) found = t; });
    return found;
  };
  BOOK.saveChatThreadEdit = function (bookingId, fields) {
    var overlay = safeParseChat('mm_chat_overlay', {});
    overlay[bookingId] = Object.assign({}, overlay[bookingId] || {}, fields);
    localStorage.setItem('mm_chat_overlay', JSON.stringify(overlay));
  };

  /* Per-booking communication-block flags (Mobile / WhatsApp / Do Not
     Disturb), set from the Villa Chat List row toggle. */
  BOOK.getChatBlock = function (bookingId) {
    var all = safeParseChat('mm_chat_block', {});
    return all[bookingId] || { blockMobile: false, blockWhatsapp: false, dnd: false };
  };
  BOOK.saveChatBlock = function (bookingId, fields) {
    var all = safeParseChat('mm_chat_block', {});
    all[bookingId] = Object.assign({}, all[bookingId] || {}, fields);
    localStorage.setItem('mm_chat_block', JSON.stringify(all));
  };

  var CHAT_STATUS_MAP = {
    'new': { cls: 'info', label: 'New' },
    'active': { cls: 'success', label: 'Active' },
    'archived': { cls: 'neutral', label: 'Archived' },
    'not-required': { cls: 'neutral', label: 'Not required' },
    'to-open': { cls: 'warning', label: 'To Open' },
    'link': { cls: 'info', label: 'Linked' }
  };
  BOOK.chatStatusMeta = function (status) {
    return CHAT_STATUS_MAP[status] || { cls: 'neutral', label: status || 'Unknown' };
  };
  BOOK.chatStatusBadge = function (status) {
    var m = BOOK.chatStatusMeta(status);
    return '<span class="badge badge-' + m.cls + '">' + m.label + '</span>';
  };

  /* ---------------------------------------------------------------- */
  /* Chat messages — keyed by booking id. Only bookings with an actual  */
  /* opened chat (active/archived/link) carry a conversation.           */
  /* ---------------------------------------------------------------- */
  BOOK.CHAT_MESSAGES = {
    'BK-10231': [
      { from: 'staff', text: "Hi James, welcome to Azura Stays! I'm Daniel, your concierge for Villa Sapphire Cliff. Is there anything you need before you arrive today?", time: '2026-08-31T09:02:00' },
      { from: 'guest', text: 'Hi Daniel, thanks! What time can we check in, and is early check-in possible?', time: '2026-08-31T10:15:00' },
      { from: 'staff', text: 'Standard check-in is 14:00. I can offer 12:00 today at no charge since the villa is ready early.', time: '2026-08-31T10:22:00' },
      { from: 'guest', text: 'That would be great, thank you. Also, could you arrange a baby cot for our daughter?', time: '2026-08-31T10:24:00' },
      { from: 'staff', text: 'Of course, a travel cot will be set up in the second bedroom before you arrive.', time: '2026-08-31T10:30:00' },
      { from: 'guest', text: 'Perfect, see you both at check-in then!', time: '2026-09-02T09:14:00' }
    ],
    'BK-10234': [
      { from: 'staff', text: 'Ciao Sophia, welcome to Villa Azure Ridge! Let us know if the AC or pool heater need adjusting.', time: '2026-08-20T15:05:00' },
      { from: 'guest', text: 'Everything is lovely, thank you. Could the housekeeper skip tomorrow morning, we want to sleep in?', time: '2026-08-21T08:12:00' },
      { from: 'staff', text: 'Noted — housekeeping rescheduled to 2pm tomorrow.', time: '2026-08-21T08:20:00' },
      { from: 'guest', text: 'Thank you for a wonderful stay, safe travels!', time: '2026-08-25T11:40:00' }
    ],
    'BK-10238': [
      { from: 'staff', text: "Hi Liam, welcome to Villa Golden Palm. Airport transfer is confirmed for 14:30.", time: '2026-08-24T09:00:00' },
      { from: 'guest', text: 'Great, thanks. Is there a late check-out option on the 27th?', time: '2026-08-26T19:30:00' },
      { from: 'staff', text: 'We can offer 12:00 noon check-out at no extra cost since no arrival is booked that afternoon.', time: '2026-08-26T19:40:00' },
      { from: 'guest', text: 'Checkout confirmed, thanks for having us!', time: '2026-08-27T10:52:00' }
    ],
    'BK-10233': [
      { from: 'staff', text: 'Hi Michael, welcome to Villa Emerald Bay! Let us know your estimated arrival time.', time: '2026-08-05T09:00:00' },
      { from: 'guest', text: 'Thanks, we should arrive around 16:00.', time: '2026-08-05T09:20:00' },
      { from: 'staff', text: 'Chat merged into the new booking — closing this thread.', time: '2026-08-24T16:50:00' }
    ],
    'BK-10239': [
      { from: 'staff', text: 'Welcome back to Azura Stays, Michael! This chat continues from your previous booking at Villa Emerald Bay.', time: '2026-08-24T16:51:00' },
      { from: 'guest', text: 'Great, looking forward to our second stay with you!', time: '2026-08-24T16:52:00' }
    ],
    'BK-10241': [
      { from: 'staff', text: 'Hi James, quick note — we noticed your contact number changed since your last booking. Can you confirm +44 7700 900456 is correct?', time: '2026-09-01T17:50:00' },
      { from: 'guest', text: "Yes that's right, updated my UK SIM.", time: '2026-09-01T18:02:00' },
      { from: 'staff', text: 'Noted, thank you for confirming the new number.', time: '2026-09-01T18:05:00' }
    ]
  };

  BOOK.getChatMessages = function (bookingId) {
    var base = BOOK.CHAT_MESSAGES[bookingId] || [];
    var extra = [];
    try {
      var raw = localStorage.getItem('mm_chat_messages');
      var all = raw ? JSON.parse(raw) : {};
      extra = all[bookingId] || [];
    } catch (e) { /* ignore corrupt storage */ }
    return base.concat(extra);
  };

  BOOK.appendChatMessage = function (bookingId, message) {
    var all = {};
    try { all = JSON.parse(localStorage.getItem('mm_chat_messages') || '{}'); } catch (e) { all = {}; }
    all[bookingId] = all[bookingId] || [];
    all[bookingId].push(message);
    localStorage.setItem('mm_chat_messages', JSON.stringify(all));
  };

  BOOK.fmtChatTime = function (iso) {
    if (!iso) return '';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    var today = new Date();
    var sameDay = d.toDateString() === today.toDateString();
    if (sameDay) return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) + ', ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  /* ---------------------------------------------------------------- */
  /* Welcome message templates (BOOK-092) — configured by Country/     */
  /* Region + language, or assigned individually per villa.             */
  /* ---------------------------------------------------------------- */
  BOOK.WELCOME_MESSAGES = [
    { id: 'WM-01', country: 'United Kingdom', region: 'Europe', language: 'English', title: 'Standard Welcome — English', body: "Welcome to Azura Stays, {guest_name}! We're delighted to host you at {villa_name}. Reply here any time for concierge assistance." },
    { id: 'WM-02', country: 'Germany', region: 'Europe', language: 'German', title: 'Standard Welcome — German', body: 'Willkommen bei Azura Stays, {guest_name}! Wir freuen uns, Sie in {villa_name} zu begrüßen. Schreiben Sie uns jederzeit für Unterstützung.' },
    { id: 'WM-03', country: 'Sweden', region: 'Europe', language: 'Swedish', title: 'Standard Welcome — Swedish', body: 'Välkommen till Azura Stays, {guest_name}! Vi ser fram emot att ta emot dig på {villa_name}.' },
    { id: 'WM-04', country: 'Singapore', region: 'Asia Pacific', language: 'English', title: 'Standard Welcome — English (APAC)', body: 'Welcome to Azura Stays, {guest_name}! Your concierge team at {villa_name} is on hand for anything you need.' },
    { id: 'WM-05', country: 'Italy', region: 'Europe', language: 'Italian', title: 'Standard Welcome — Italian', body: 'Benvenuto/a in Azura Stays, {guest_name}! Siamo lieti di ospitarti presso {villa_name}.' },
    { id: 'WM-06', country: 'Poland', region: 'Europe', language: 'Polish', title: 'Standard Welcome — Polish', body: 'Witamy w Azura Stays, {guest_name}! Cieszymy się, że będziesz gościć w {villa_name}.' }
  ];

  BOOK.VILLA_WELCOME_ASSIGNMENTS = [
    { property: 'Villa Sapphire Cliff', messageId: 'WM-01' },
    { property: 'Villa Coral Horizon', messageId: 'WM-04' },
    { property: 'Villa Emerald Bay', messageId: 'WM-05' }
  ];

  /* ---------------------------------------------------------------- */
  /* WhatsApp Manager staff notification levels (BOOK-095 Tab 2)        */
  /* ---------------------------------------------------------------- */
  BOOK.STAFF_NOTIFICATIONS = (window.MM.MOCK_STAFF || []).map(function (s, i) {
    var groups = ['Concierge', 'Concierge', 'Concierge', 'BU Manager', 'Admin'];
    var levels = ['Full', 'Full', 'Ltd', 'Full', 'Off'];
    return { id: s.id, name: s.name, group: groups[i] || 'Concierge', team: s.team, level: levels[i] || 'Full' };
  });

  /* ---------------------------------------------------------------- */
  /* System status (BOOK-096) + a handful of API response log rows.    */
  /* ---------------------------------------------------------------- */
  BOOK.SYSTEM_STATUS = {
    whatsappToken: { ok: true, message: 'Token valid, expires in 42 days.' },
    geminiAi: { ok: true, message: 'Test call to gemini-2.0-flash:generateContent succeeded (312ms).' },
    firebase: { ok: false, message: 'Realtime Database ping timed out after 5s — retrying.' }
  };

  BOOK.WHATSAPP_API_LOGS = [
    { date: '2026-09-02', time: '09:14:02', bookingId: 'BK-10231', direction: 'inbound', endpoint: '/v18.0/messages', status: 200, summary: 'Guest reply received and stored.' },
    { date: '2026-09-02', time: '08:40:11', bookingId: 'BK-10241', direction: 'outbound', endpoint: '/v18.0/messages', status: 200, summary: 'Template message sent.' },
    { date: '2026-09-01', time: '18:05:44', bookingId: 'BK-10241', direction: 'outbound', endpoint: '/v18.0/messages', status: 200, summary: 'Free-text reply sent.' },
    { date: '2026-09-01', time: '11:22:09', bookingId: 'BK-10240', direction: 'outbound', endpoint: '/v18.0/messages', status: 400, summary: 'Invalid recipient — phone number unverified.' },
    { date: '2026-08-27', time: '10:52:31', bookingId: 'BK-10238', direction: 'inbound', endpoint: '/v18.0/messages', status: 200, summary: 'Guest confirmed checkout.' }
  ];

})();
