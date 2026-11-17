/* ==========================================================================
   Booking module — shared mock data & helpers, reused across every
   screens/booking/<code>/script.js. Loaded after assets/js/global.js and
   before each screen's own script.js.
   Extends (never replaces) window.MM.MOCK_BOOKINGS / MOCK_PROPERTIES /
   MOCK_GUESTS / MOCK_STAFF from the shared global.js cast.
   ========================================================================== */

(function () {
  'use strict';

  window.MM = window.MM || {};
  var BOOK = window.MM.BOOK = window.MM.BOOK || {};

  /* ---------------------------------------------------------------- */
  /* Villas — extends MM.MOCK_PROPERTIES with booking-specific fields  */
  /* (nightly rate, minimum stay, open/closed status). Two villas are   */
  /* deliberately left without a rate/min-stay ("to fill") to seed      */
  /* BOOK-026/BOOK-027's real, non-empty flagged rows.                  */
  /* ---------------------------------------------------------------- */
  BOOK.VILLA_META = {
    'PV-101': { rate: 1200, minStay: 2, openStatus: 'Open' },
    'PV-102': { rate: 950,  minStay: 3, openStatus: 'Open' },
    'PV-103': { rate: 1450, minStay: 3, openStatus: 'Open' },
    'PV-104': { rate: 780,  minStay: 2, openStatus: 'Open' },
    'PV-105': { rate: null, minStay: null, openStatus: 'Open' },
    'PV-106': { rate: 1050, minStay: 4, openStatus: 'Open' },
    'PV-107': { rate: null, minStay: null, openStatus: 'Open' },
    'PV-108': { rate: 1600, minStay: 5, openStatus: 'Open' }
  };

  BOOK.VILLAS = (window.MM.MOCK_PROPERTIES || []).map(function (p) {
    var meta = BOOK.VILLA_META[p.id] || {};
    return {
      id: p.id, name: p.name, bu: p.bu, bedrooms: p.bedrooms,
      rate: meta.rate, minStay: meta.minStay, openStatus: meta.openStatus || 'Open'
    };
  });

  BOOK.villaById = function (id) {
    var found = null;
    BOOK.VILLAS.forEach(function (v) { if (v.id === id) found = v; });
    return found;
  };
  BOOK.villaByName = function (name) {
    var found = null;
    BOOK.VILLAS.forEach(function (v) { if (v.name === name) found = v; });
    return found;
  };

  /* ---------------------------------------------------------------- */
  /* Guests — reuse MM.MOCK_GUESTS, plus a few module-local additions   */
  /* so booking lists have enough row variety without inventing new    */
  /* recurring "cast" members that other modules would need to know.   */
  /* ---------------------------------------------------------------- */
  BOOK.EXTRA_GUESTS = [
    { id: 'GST-05', name: 'Klaus Richter', email: 'klaus.richter@example.com', country: 'Germany' },
    { id: 'GST-06', name: 'Emma Johansson', email: 'emma.johansson@example.com', country: 'Sweden' },
    { id: 'GST-07', name: "Liam O'Connor", email: 'liam.oconnor@example.com', country: 'Ireland' }
  ];
  BOOK.ALL_GUESTS = (window.MM.MOCK_GUESTS || []).concat(BOOK.EXTRA_GUESTS);

  BOOK.guestByName = function (name) {
    var found = null;
    BOOK.ALL_GUESTS.forEach(function (g) { if (g.name === name) found = g; });
    return found;
  };

  /* ---------------------------------------------------------------- */
  /* Bookings — the 5 shared MM.MOCK_BOOKINGS rows are kept verbatim    */
  /* (so BK-10231..BK-10235 look identical everywhere) and enriched     */
  /* here with channel/status-detail/guest-detail fields other Booking  */
  /* screens need; additional rows extend the set for list density.    */
  /* ---------------------------------------------------------------- */
  var BASE_EXTRA = {
    'BK-10231': { referer: 'Booking.com', bookingDate: '2026-08-02T10:14:00', amount: 8400, commission: 588, tax: 0, paymentStatus: 'Paid', country: 'United Kingdom', adults: 4, children: 1, mobile: '+44 7700 900123', concierge: 'Somchai Anuwat', notes: 'Anniversary trip — champagne on arrival requested.' },
    'BK-10232': { referer: 'Airbnb', bookingDate: '2026-08-06T15:40:00', amount: 5600, commission: 336, tax: 0, paymentStatus: 'Paid', country: 'Poland', adults: 2, children: 0, mobile: '+48 501 234 567', concierge: 'Somchai Anuwat', notes: '' },
    'BK-10233': { referer: 'Expedia', bookingDate: '2026-08-11T09:05:00', amount: 11200, commission: 896, tax: 0, paymentStatus: 'Awaiting deposit', country: 'Singapore', adults: 6, children: 2, mobile: '+65 8123 4567', concierge: 'Wayan Kertha', notes: 'Requested early check-in at 11:00.' },
    'BK-10234': { referer: 'Direct', bookingDate: '2026-07-28T11:20:00', amount: 4200, commission: 0, tax: 0, paymentStatus: 'Paid', country: 'Italy', adults: 2, children: 0, mobile: '+39 345 678 9012', concierge: 'Wayan Kertha', notes: '' },
    'BK-10235': { referer: 'Booking.com', bookingDate: '2026-06-30T14:02:00', amount: 3600, commission: 252, tax: 0, paymentStatus: 'Refunded', country: 'United Kingdom', adults: 2, children: 0, mobile: '+44 7700 900123', concierge: 'Somchai Anuwat', notes: 'Guest cancelled due to flight changes.' }
  };

  var EXTRA_ROWS = [
    { id: 'BK-10236', property: 'Villa Lotus Terrace', guest: 'Klaus Richter', checkIn: '2026-09-12', checkOut: '2026-09-18', status: 'new', total: 6300, referer: 'Azura Website', bookingDate: '2026-08-20T08:30:00', amount: 6300, commission: 0, tax: 0, paymentStatus: 'Unpaid', country: 'Germany', adults: 2, children: 0, mobile: '+49 170 1234567', concierge: 'Nok Pattaya', notes: 'First-time guest — welcome amenity requested.' },
    { id: 'BK-10237', property: 'Villa Silver Tide', guest: 'Emma Johansson', checkIn: '2026-09-14', checkOut: '2026-09-21', status: 'request', total: 11200, referer: 'Owner', bookingDate: '2026-08-22T13:10:00', amount: 11200, commission: 0, tax: 0, paymentStatus: 'Awaiting deposit', country: 'Sweden', adults: 5, children: 1, mobile: '+46 70 123 4567', concierge: 'Wayan Kertha', notes: '' },
    { id: 'BK-10238', property: 'Villa Golden Palm', guest: "Liam O'Connor", checkIn: '2026-08-24', checkOut: '2026-08-27', status: 'checked-out', total: 2340, referer: 'Airbnb', bookingDate: '2026-08-01T09:00:00', amount: 2340, commission: 140, tax: 0, paymentStatus: 'Paid', country: 'Ireland', adults: 2, children: 0, mobile: '+353 85 123 4567', concierge: 'Nok Pattaya', notes: '' },
    { id: 'BK-10239', property: 'Villa Sapphire Cliff', guest: 'Michael Tan', checkIn: '2026-10-02', checkOut: '2026-10-06', status: 'confirmed', total: 4800, referer: 'Booking.com', bookingDate: '2026-08-24T16:45:00', amount: 4800, commission: 336, tax: 0, paymentStatus: 'Paid', country: 'Singapore', adults: 3, children: 0, mobile: '+65 8123 4567', concierge: 'Somchai Anuwat', notes: '' },
    { id: 'BK-10240', property: 'Villa Emerald Bay', guest: 'Sophia Rossi', checkIn: '2026-06-18', checkOut: '2026-06-22', status: 'black', total: 5100, referer: 'Direct', bookingDate: '2026-06-01T10:00:00', amount: 5100, commission: 0, tax: 0, paymentStatus: 'Disputed', country: 'Italy', adults: 2, children: 0, mobile: '+39 345 678 9012', concierge: 'Wayan Kertha', notes: 'Flagged — chargeback dispute in progress.' },
    { id: 'BK-10241', property: 'Villa Coral Horizon', guest: 'James Whitfield', checkIn: '2026-09-01', checkOut: '2026-09-03', status: 'checked-in', total: 1900, referer: 'Azura Website', bookingDate: '2026-08-15T12:00:00', amount: 1900, commission: 0, tax: 0, paymentStatus: 'Paid', country: 'United Kingdom', adults: 2, children: 0, mobile: '+44 7700 900123', concierge: 'Somchai Anuwat', notes: '' }
  ];

  BOOK.BOOKINGS = (window.MM.MOCK_BOOKINGS || []).map(function (b) {
    var extra = BASE_EXTRA[b.id] || {};
    var merged = {};
    Object.keys(b).forEach(function (k) { merged[k] = b[k]; });
    Object.keys(extra).forEach(function (k) { merged[k] = extra[k]; });
    return merged;
  }).concat(EXTRA_ROWS);

  BOOK.bookingById = function (id) {
    var found = null;
    BOOK.BOOKINGS.forEach(function (b) { if (b.id === id) found = b; });
    return found;
  };

  function safeParse(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }

  /* Effective, demo-session-wide booking set: base cast + newly-added
     manual bookings (mm_bookings_extra) + field-level edits saved from
     BOOK-037 Edit Booking (mm_booking_edits, keyed by booking id) minus
     deleted rows (mm_bookings_deleted). Every Booking screen that reads
     bookings should call this instead of MM.BOOK.BOOKINGS directly, so
     an edit/delete/create made on one screen is reflected everywhere
     else in the same demo session. */
  BOOK.getAllBookings = function () {
    var extra = safeParse('mm_bookings_extra', []);
    var edits = safeParse('mm_booking_edits', {});
    var deleted = safeParse('mm_bookings_deleted', []);
    var merged = BOOK.BOOKINGS.concat(extra).filter(function (b) { return deleted.indexOf(b.id) === -1; });
    return merged.map(function (b) {
      return edits[b.id] ? Object.assign({}, b, edits[b.id]) : b;
    });
  };
  BOOK.getBookingById = function (id) {
    var found = null;
    BOOK.getAllBookings().forEach(function (b) { if (b.id === id) found = b; });
    return found;
  };
  BOOK.saveBookingEdit = function (id, fields) {
    var edits = safeParse('mm_booking_edits', {});
    edits[id] = Object.assign({}, edits[id] || {}, fields);
    localStorage.setItem('mm_booking_edits', JSON.stringify(edits));
  };

  /* ---------------------------------------------------------------- */
  /* Status → badge helpers, covering every real state referenced in    */
  /* the en-screens specs (Confirmed/Cancelled/New/Request/Black plus   */
  /* the operational checked-in/checked-out/pending states already in   */
  /* MM.MOCK_BOOKINGS).                                                  */
  /* ---------------------------------------------------------------- */
  var STATUS_MAP = {
    'confirmed': { cls: 'success', label: 'Confirmed' },
    'pending': { cls: 'warning', label: 'Pending' },
    'request': { cls: 'warning', label: 'Request' },
    'new': { cls: 'info', label: 'New' },
    'checked-in': { cls: 'info', label: 'Checked-in' },
    'checked-out': { cls: 'neutral', label: 'Checked-out' },
    'cancelled': { cls: 'danger', label: 'Cancelled' },
    'black': { cls: 'danger', label: 'Blacklisted' },
    'approved': { cls: 'success', label: 'Approved' },
    'rejected': { cls: 'danger', label: 'Rejected' },
    'sent': { cls: 'info', label: 'Sent' },
    'paid': { cls: 'success', label: 'Paid' },
    'due': { cls: 'warning', label: 'Due Now' },
    'later': { cls: 'neutral', label: 'Due Later' }
  };
  BOOK.statusMeta = function (status) {
    var key = (status || '').toString().toLowerCase();
    return STATUS_MAP[key] || { cls: 'neutral', label: status || 'Unknown' };
  };
  BOOK.statusBadge = function (status) {
    var m = BOOK.statusMeta(status);
    return '<span class="badge badge-' + m.cls + '">' + m.label + '</span>';
  };

  /* ---------------------------------------------------------------- */
  /* Formatting helpers                                                 */
  /* ---------------------------------------------------------------- */
  BOOK.fmtMoney = function (n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  };
  BOOK.fmtDate = function (iso) {
    if (!iso) return '—';
    var d = new Date(iso + (iso.length <= 10 ? 'T00:00:00' : ''));
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  BOOK.fmtDateTime = function (iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
      d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  BOOK.nights = function (checkIn, checkOut) {
    var a = new Date(checkIn), b = new Date(checkOut);
    if (isNaN(a.getTime()) || isNaN(b.getTime())) return 0;
    return Math.max(0, Math.round((b - a) / 86400000));
  };
  BOOK.initials = function (name) {
    if (!name) return '?';
    var parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
  };
  BOOK.flag = function (country) {
    // Small text badge placeholder (no emoji flags per craft-and-qa ban on decorative emoji).
    return '<span class="flag-chip">' + (country || '—') + '</span>';
  };

  /* ---------------------------------------------------------------- */
  /* localStorage merge helper — reads a JSON array under `key`,        */
  /* merges over the base mock array by `id`, returns a fresh array.    */
  /* ---------------------------------------------------------------- */
  BOOK.loadMerged = function (key, baseArr) {
    var out = baseArr.slice();
    try {
      var raw = localStorage.getItem(key);
      if (raw) {
        var saved = JSON.parse(raw);
        saved.forEach(function (row) {
          var idx = -1;
          out.forEach(function (r, i) { if (r.id === row.id) idx = i; });
          if (idx >= 0) out[idx] = row; else out.unshift(row);
        });
      }
    } catch (e) { /* ignore corrupt storage */ }
    return out;
  };
  BOOK.saveAll = function (key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
  };

  /* ---------------------------------------------------------------- */
  /* Direct bookings (BOOK-042/043/044/045/046)                         */
  /* ---------------------------------------------------------------- */
  BOOK.DIRECT_BOOKINGS = [
    { id: 'DB-501', property: 'Villa Sapphire Cliff', checkIn: '2026-09-20', checkOut: '2026-09-25', firstName: 'Richard', lastName: 'Halstead', email: 'r.halstead@example.com', phone: '+66 81 234 5678', guests: 3, type: 'Owner Stay', amount: 0, paid: 'N/A', specialConditions: 'Owner personal use — no charge.', requestedBy: 'Richard Halstead', on: '2026-08-18', status: 'approved', processedBy: 'Somchai Anuwat', reason: '' },
    { id: 'DB-502', property: 'Villa Coral Horizon', checkIn: '2026-09-28', checkOut: '2026-10-02', firstName: 'Isabelle', lastName: 'Moreau', email: 'i.moreau@example.com', phone: '+33 6 12 34 56 78', guests: 4, type: 'Friends & Family', amount: 3200, paid: 'Unpaid', specialConditions: 'Late check-out requested (14:00).', requestedBy: 'Isabelle Moreau', on: '2026-08-21', status: 'pending', processedBy: '', reason: '' },
    { id: 'DB-503', property: 'Villa Azure Ridge', checkIn: '2026-08-30', checkOut: '2026-09-02', firstName: 'David', lastName: 'Chen', email: 'd.chen@example.com', phone: '+66 89 555 1212', guests: 2, type: 'Owner Stay', amount: 0, paid: 'N/A', specialConditions: '', requestedBy: 'David Chen', on: '2026-08-10', status: 'rejected', processedBy: 'Wayan Kertha', reason: 'Villa already booked for those dates.' },
    { id: 'DB-504', property: 'Villa Lotus Terrace', checkIn: '2026-10-05', checkOut: '2026-10-09', firstName: 'Priya', lastName: 'Nair', email: 'p.nair@example.com', phone: '+66 86 777 3344', guests: 5, type: 'Partner Rate', amount: 2800, paid: 'Paid', specialConditions: 'Airport pickup requested at 15:30.', requestedBy: 'Priya Nair', on: '2026-08-23', status: 'pending', processedBy: '', reason: '' }
  ];

  BOOK.CANCELLED_DIRECT_BOOKINGS = [
    { id: 'DB-497', checkIn: '2026-08-05', checkOut: '2026-08-08', guest: 'Wayan Kertha', property: 'Villa Coral Horizon', email: 'wayan.k@example.com', phone: '+66 89 555 1212', type: 'Friends & Family', amount: 2100, cancelledOn: '2026-07-30', cancelledBy: 'Somchai Anuwat', reason: 'Guest schedule conflict — requested to rebook later.' },
    { id: 'DB-499', checkIn: '2026-08-14', checkOut: '2026-08-17', guest: 'Nok Pattaya', property: 'Villa Lotus Terrace', email: 'nok.p@example.com', phone: '+66 86 777 3344', type: 'Owner Stay', amount: 0, cancelledOn: '2026-08-09', cancelledBy: 'Wayan Kertha', reason: 'Owner travel plans changed.' },
    { id: 'DB-500', checkIn: '2026-08-22', checkOut: '2026-08-26', guest: 'Klaus Richter', property: 'Villa Emerald Bay', email: 'klaus.richter@example.com', phone: '+49 170 1234567', type: 'Partner Rate', amount: 3400, cancelledOn: '2026-08-15', cancelledBy: 'Wayan Kertha', reason: 'Partner agency cancelled on guest’s behalf.' },
    { id: 'DB-503B', checkIn: '2026-09-03', checkOut: '2026-09-06', guest: 'Emma Johansson', property: 'Villa Silver Tide', email: 'emma.johansson@example.com', phone: '+46 70 123 4567', type: 'Friends & Family', amount: 1980, cancelledOn: '2026-08-27', cancelledBy: 'Somchai Anuwat', reason: 'Duplicate request — guest booked directly with owner instead.' },
    { id: 'DB-505', checkIn: '2026-09-10', checkOut: '2026-09-14', guest: "Liam O'Connor", property: 'Villa Golden Palm', email: 'liam.oconnor@example.com', phone: '+353 85 123 4567', type: 'Owner Stay', amount: 0, cancelledOn: '2026-09-01', cancelledBy: 'Nok Pattaya', reason: 'Owner postponed stay to next quarter.' }
  ];

  /* ---------------------------------------------------------------- */
  /* Partner payments (BOOK-049/050/051/052/053)                        */
  /* ---------------------------------------------------------------- */
  BOOK.PARTNER_PAYMENTS = [
    { id: 'PP-901', property: 'Villa Emerald Bay', bookingNo: 'BK-10233', checkIn: '2026-09-08', checkOut: '2026-09-15', amount: 3920, stage: 'due', paidOn: null, paidBy: null, paidThrough: null, owner: 'Isabelle Moreau' },
    { id: 'PP-902', property: 'Villa Azure Ridge', bookingNo: 'BK-10234', checkIn: '2026-08-20', checkOut: '2026-08-25', amount: 1470, stage: 'due', paidOn: null, paidBy: null, paidThrough: null, owner: 'David Chen' },
    { id: 'PP-903', property: 'Villa Silver Tide', bookingNo: 'BK-10237', checkIn: '2026-09-14', checkOut: '2026-09-21', amount: 3920, stage: 'later', paidOn: null, paidBy: null, paidThrough: null, owner: 'David Chen' },
    { id: 'PP-904', property: 'Villa Lotus Terrace', bookingNo: 'BK-10236', checkIn: '2026-09-12', checkOut: '2026-09-18', amount: 2205, stage: 'later', paidOn: null, paidBy: null, paidThrough: null, owner: 'Priya Nair' },
    { id: 'PP-905', property: 'Villa Sapphire Cliff', bookingNo: 'BK-10231', checkIn: '2026-09-02', checkOut: '2026-09-09', amount: 2940, stage: 'paid', paidOn: '2026-08-15', paidBy: 'Somchai Anuwat', paidThrough: 'Bank Transfer', owner: 'Richard Halstead' },
    { id: 'PP-906', property: 'Villa Coral Horizon', bookingNo: 'BK-10232', checkIn: '2026-09-05', checkOut: '2026-09-10', amount: 1960, stage: 'paid', paidOn: '2026-08-18', paidBy: 'Somchai Anuwat', paidThrough: 'PromptPay', owner: 'Richard Halstead' }
  ];

  BOOK.PARTNER_BOOKINGS = [
    { id: 'PB-701', property: 'Villa Golden Palm', received: '2026-08-20', bookingNo: 'BK-10238', checkIn: '2026-08-24', checkOut: '2026-08-27', status: 'confirmed', lastActionBy: 'Nok Pattaya' },
    { id: 'PB-702', property: 'Villa Silver Tide', received: '2026-08-22', bookingNo: 'BK-10237', checkIn: '2026-09-14', checkOut: '2026-09-21', status: 'sent', lastActionBy: 'Wayan Kertha' },
    { id: 'PB-703', property: 'Villa Lotus Terrace', received: '2026-08-20', bookingNo: 'BK-10236', checkIn: '2026-09-12', checkOut: '2026-09-18', status: 'new', lastActionBy: '—' },
    { id: 'PB-704', property: 'Villa Sapphire Cliff', received: '2026-08-02', bookingNo: 'BK-10231', checkIn: '2026-09-02', checkOut: '2026-09-09', status: 'paid', lastActionBy: 'Somchai Anuwat' },
    { id: 'PB-705', property: 'Villa Emerald Bay', received: '2026-06-01', bookingNo: 'BK-10240', checkIn: '2026-06-18', checkOut: '2026-06-22', status: 'rejected', lastActionBy: 'Wayan Kertha' }
  ];

  /* ---------------------------------------------------------------- */
  /* Check-in / check-out control points (BOOK-029/030/031/033/034/035) */
  /* ---------------------------------------------------------------- */
  BOOK.CHECKIN_CONTROLS = [
    { id: 'CI-301', property: 'Villa Sapphire Cliff', staff: 'Somchai Anuwat', start: '13:42', end: '13:58', gps: '7.8804, 98.3923', comments: 'All amenities set up, welcome drinks placed.' },
    { id: 'CI-302', property: 'Villa Coral Horizon', staff: 'Somchai Anuwat', start: '14:05', end: '14:20', gps: '7.9012, 98.3011', comments: '' },
    { id: 'CI-303', property: 'Villa Azure Ridge', staff: 'Wayan Kertha', start: '—', end: '—', gps: '—', comments: 'Not yet started.' },
    { id: 'CI-304', property: 'Villa Emerald Bay', staff: 'Wayan Kertha', start: '11:10', end: '11:36', gps: '-8.6905, 115.1729', comments: 'AC unit in Bedroom 3 checked, running fine.' },
    { id: 'CI-305', property: 'Villa Lotus Terrace', staff: 'Nok Pattaya', start: '10:02', end: '10:19', gps: '9.5120, 100.0136', comments: 'Pool towels restocked.' }
  ];

  BOOK.CHECKOUT_CONTROLS = [
    { id: 'CO-401', property: 'Villa Marble Cove', staff: 'Somchai Anuwat', start: '10:15', end: '10:44', gps: '7.9501, 98.3312', damage: 'None', comments: 'Villa left in excellent condition.', satisfaction: 5 },
    { id: 'CO-402', property: 'Villa Golden Palm', staff: 'Nok Pattaya', start: '11:00', end: '11:35', gps: '9.5044, 100.0201', damage: '1 broken pool towel rail', comments: 'Guest notified, minor repair logged.', satisfaction: 4 },
    { id: 'CO-403', property: 'Villa Silver Tide', staff: 'Wayan Kertha', start: '—', end: '—', gps: '—', damage: '—', comments: 'Pending — check-out later today.', satisfaction: null }
  ];

  BOOK.VILLA_CONTROL_POINTS = BOOK.VILLAS.map(function (v, i) {
    return { id: v.id, property: v.name, bu: v.bu, controlPoints: 6 + (i % 4), reminders: 2 + (i % 3) };
  });

  /* ---------------------------------------------------------------- */
  /* OTA channels (BOOK-054/055)                                        */
  /* ---------------------------------------------------------------- */
  BOOK.OTA_CHANNELS = ['Booking.com', 'Airbnb', 'Expedia', 'Agoda', 'VRBO'];
  BOOK.OTA_UNLINKED = {
    'Booking.com': ['Villa Golden Palm'],
    'Airbnb': ['Villa Marble Cove', 'Villa Golden Palm'],
    'Expedia': ['Villa Emerald Bay', 'Villa Marble Cove', 'Villa Golden Palm'],
    'Agoda': ['Villa Golden Palm', 'Villa Azure Ridge'],
    'VRBO': ['Villa Sapphire Cliff', 'Villa Coral Horizon', 'Villa Emerald Bay', 'Villa Azure Ridge', 'Villa Marble Cove', 'Villa Lotus Terrace', 'Villa Golden Palm', 'Villa Silver Tide']
  };

  /* ---------------------------------------------------------------- */
  /* Generic list-screen helpers — reused by every Booking CRUD list    */
  /* screen's own script.js so sort/search/delete-confirm wiring isn't  */
  /* re-implemented from scratch on every screen.                       */
  /* ---------------------------------------------------------------- */

  // Debounced search box wiring: calls cb(lowercased query) on input.
  BOOK.wireSearch = function (inputEl, cb) {
    if (!inputEl) return;
    var t;
    inputEl.addEventListener('input', function () {
      clearTimeout(t);
      var v = inputEl.value;
      t = setTimeout(function () { cb(v.trim().toLowerCase()); }, 120);
    });
  };

  // Sort-chip wiring: chips carry data-sort="<key>"; clicking toggles asc/desc
  // and calls cb(key, dir). Adds .active + an arrow glyph to the active chip.
  BOOK.wireSortChips = function (container, cb) {
    if (!container) return { key: null, dir: 'asc' };
    var state = { key: null, dir: 'asc' };
    container.querySelectorAll('[data-sort]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var key = chip.getAttribute('data-sort');
        if (state.key === key) { state.dir = state.dir === 'asc' ? 'desc' : 'asc'; }
        else { state.key = key; state.dir = 'asc'; }
        container.querySelectorAll('[data-sort]').forEach(function (c) {
          c.classList.remove('active');
          c.querySelector('.sort-arrow') && c.querySelector('.sort-arrow').remove();
        });
        chip.classList.add('active');
        var arrow = document.createElement('span');
        arrow.className = 'sort-arrow';
        arrow.textContent = state.dir === 'asc' ? ' ↑' : ' ↓';
        chip.appendChild(arrow);
        cb(state.key, state.dir);
      });
    });
    return state;
  };

  BOOK.sortRows = function (rows, key, dir, type) {
    if (!key) return rows;
    var sorted = rows.slice().sort(function (a, b) {
      var av = a[key], bv = b[key];
      if (type === 'number') { av = Number(av) || 0; bv = Number(bv) || 0; return av - bv; }
      if (type === 'date') { av = new Date(av || 0).getTime(); bv = new Date(bv || 0).getTime(); return av - bv; }
      av = (av || '').toString().toLowerCase(); bv = (bv || '').toString().toLowerCase();
      return av < bv ? -1 : av > bv ? 1 : 0;
    });
    if (dir === 'desc') sorted.reverse();
    return sorted;
  };

  // Dynamically-built single confirm modal, reused across all list screens.
  BOOK.confirmAction = function (message, onConfirm, opts) {
    opts = opts || {};
    var overlay = document.getElementById('mm-confirm-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.id = 'mm-confirm-modal';
      overlay.innerHTML =
        '<div class="modal modal-sm">' +
          '<div class="modal__header"><h2>' + (opts.title || 'Confirm action') + '</h2>' +
          '<button class="modal__close" data-close-modal aria-label="Close">&times;</button></div>' +
          '<div class="modal__body"><p data-confirm-message></p></div>' +
          '<div class="modal__footer">' +
            '<button class="btn btn-ghost" data-close-modal type="button">Cancel</button>' +
            '<button class="btn btn-accent" data-confirm-yes type="button">Delete</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(overlay);
    }
    overlay.querySelector('[data-confirm-message]').textContent = message;
    var yesBtn = overlay.querySelector('[data-confirm-yes]');
    var newYes = yesBtn.cloneNode(true);
    yesBtn.parentNode.replaceChild(newYes, yesBtn);
    newYes.addEventListener('click', function () {
      window.MM.closeModal('mm-confirm-modal');
      onConfirm();
    });
    window.MM.openModal('mm-confirm-modal');
  };

})();
