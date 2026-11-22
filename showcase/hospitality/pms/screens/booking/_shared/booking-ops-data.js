/* ==========================================================================
   Booking module — shared data for the BOOK-097..BOOK-110 screen group
   (FAQ/Wiki, Property Status, Timesheet, Occupancy Actions, Nationalities,
   Standard Time / Deadline settings, Revenue Report, SHA+ Detail).
   Extends window.MM.BOOK (defined in booking-data.js). Loaded after
   booking-data.js and before each of these screens' own script.js.
   Reserved for this screen group — do not use for other Booking screens.
   ========================================================================== */

(function () {
  'use strict';

  window.MM = window.MM || {};
  var BOOK = window.MM.BOOK = window.MM.BOOK || {};

  function safeParse(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function safeSave(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  /* ---------------------------------------------------------------- */
  /* Business units + country mapping. The source spec assumes a      */
  /* Singapore/Greece/France portfolio; this prototype's mock cast only */
  /* has Singapore- and Australia-based business units, so BOOK-106/108 */
  /* country filters are adapted to the countries that actually exist  */
  /* in BOOK.VILLAS rather than inventing BUs with no underlying data. */
  /* ---------------------------------------------------------------- */
  BOOK.BUSINESS_UNITS = Array.from(new Set(BOOK.VILLAS.map(function (v) { return v.bu; })));
  BOOK.BU_COUNTRY = { 'Sentosa Collection': 'Singapore', 'Noosa Estates': 'Australia', 'Byron Bay Retreats': 'Australia' };
  BOOK.buCountry = function (bu) { return BOOK.BU_COUNTRY[bu] || 'Singapore'; };

  var TYPE_MAP = {
    'PV-101': 'Hillside Villa', 'PV-102': 'Beachfront Villa', 'PV-103': 'Beachfront Villa',
    'PV-104': 'Hillside Villa', 'PV-105': 'Pool Villa', 'PV-106': 'Garden Villa',
    'PV-107': 'Pool Villa', 'PV-108': 'Beachfront Villa'
  };
  BOOK.PROPERTY_TYPES = Array.from(new Set(Object.keys(TYPE_MAP).map(function (k) { return TYPE_MAP[k]; })));
  BOOK.villaPropertyType = function (villaId) { return TYPE_MAP[villaId] || 'Pool Villa'; };

  /* ==================================================================
     BOOK-097 / 098 / 099 / 100 — FAQ / Wiki
     ================================================================== */

  BOOK.FAQ_CATEGORIES_BASE = [
    { id: 'FC-01', name: 'General', createdAt: '2025-11-02T09:00:00' },
    { id: 'FC-02', name: 'Booking Policies', createdAt: '2025-11-02T09:05:00' },
    { id: 'FC-03', name: 'Payments & Refunds', createdAt: '2025-11-04T10:20:00' },
    { id: 'FC-04', name: 'Check-in / Check-out', createdAt: '2025-11-06T14:10:00' },
    { id: 'FC-05', name: 'Property Amenities', createdAt: '2025-12-01T11:30:00' },
    { id: 'FC-06', name: 'In-Stay Services', createdAt: '2025-12-10T08:45:00' },
    { id: 'FC-07', name: 'Transportation', createdAt: '2026-01-15T13:00:00' }
  ];
  BOOK.getFaqCategories = function () {
    return BOOK.loadMerged('mm_faq_categories', BOOK.FAQ_CATEGORIES_BASE.slice()).filter(function (c) {
      var deleted = safeParse('mm_faq_categories_deleted', []);
      return deleted.indexOf(c.id) === -1;
    });
  };
  BOOK.saveFaqCategory = function (cat) {
    var all = BOOK.getFaqCategories();
    var idx = -1;
    all.forEach(function (c, i) { if (c.id === cat.id) idx = i; });
    if (idx >= 0) all[idx] = cat; else all.unshift(cat);
    BOOK.saveAll('mm_faq_categories', all);
  };
  BOOK.deleteFaqCategory = function (id) {
    var deleted = safeParse('mm_faq_categories_deleted', []);
    if (deleted.indexOf(id) === -1) deleted.push(id);
    safeSave('mm_faq_categories_deleted', deleted);
  };

  BOOK.FAQ_LANGUAGES = ['English', 'Malay', 'French', 'German'];

  BOOK.FAQ_QUESTIONS_BASE = [
    { id: 'FQ-01', categoryId: 'FC-02', language: 'English', question: 'What is the minimum stay for a villa booking?', answer: 'Minimum stay varies by villa and season, typically 2-5 nights. Peak season (Christmas/New Year) usually requires a 7-night minimum. The exact minimum stay for each villa is shown on the availability calendar.', businessUnits: [], createdAt: '2025-11-03T10:00:00' },
    { id: 'FQ-02', categoryId: 'FC-03', language: 'English', question: 'When is the security deposit released?', answer: 'The security deposit is released within 5-7 business days after check-out, once the villa inspection confirms no damage or missing items.', businessUnits: ['Sentosa Collection', 'Noosa Estates'], createdAt: '2025-11-05T09:30:00' },
    { id: 'FQ-03', categoryId: 'FC-04', language: 'English', question: 'What time is standard check-in and check-out?', answer: 'Standard check-in is 14:00 and check-out is 11:00, unless a different standard time has been configured for the business unit. Early check-in and late check-out can be requested subject to availability.', businessUnits: [], createdAt: '2025-11-07T15:00:00' },
    { id: 'FQ-04', categoryId: 'FC-05', language: 'English', question: 'Is a private chef included with the villa rental?', answer: 'A private chef is not included by default but can be arranged through In-Stay Services for an additional fee. Some premium villas include a complimentary breakfast service prepared by villa staff.', businessUnits: ['Byron Bay Retreats'], createdAt: '2025-12-02T08:00:00' },
    { id: 'FQ-05', categoryId: 'FC-06', language: 'English', question: 'How do I request extra cleaning during my stay?', answer: 'Guests can request extra cleaning at any time through the Guest Hub or by contacting their assigned concierge directly. Standard mid-stay cleaning is already included for stays of 7 nights or more.', businessUnits: [], createdAt: '2025-12-11T09:15:00' },
    { id: 'FQ-06', categoryId: 'FC-07', language: 'English', question: 'Is airport transfer included in the booking?', answer: 'Airport transfer is not included by default. It can be added as a paid extra during booking or arranged afterwards through your concierge, subject to vehicle availability.', businessUnits: [], createdAt: '2026-01-16T11:00:00' },
    { id: 'FQ-07', categoryId: 'FC-01', language: 'English', question: 'Can I bring pets to the villa?', answer: 'Pet policy varies by villa. Most villas do not allow pets due to landscaping and pool safety considerations. A small number of pet-friendly villas are marked accordingly in the property listing.', businessUnits: [], createdAt: '2026-01-20T10:00:00' },
    { id: 'FQ-08', categoryId: 'FC-03', language: 'French', question: 'Quand le dépôt de garantie est-il remboursé ?', answer: 'Le dépôt de garantie est remboursé dans un délai de 5 à 7 jours ouvrés après le départ, une fois l’inspection de la villa confirmée sans dommage.', businessUnits: ['Byron Bay Retreats'], createdAt: '2026-02-01T09:00:00' },
    { id: 'FQ-09', categoryId: 'FC-04', language: 'Malay', question: 'Bilakah waktu daftar masuk dan daftar keluar standard?', answer: 'Daftar masuk standard pada jam 14:00 dan daftar keluar pada jam 11:00. Daftar masuk awal atau daftar keluar lewat boleh dipohon tertakluk kepada ketersediaan vila.', businessUnits: ['Sentosa Collection'], createdAt: '2026-02-10T13:30:00' }
  ];
  BOOK.getFaqQuestions = function () {
    return BOOK.loadMerged('mm_faq_questions', BOOK.FAQ_QUESTIONS_BASE.slice()).filter(function (q) {
      var deleted = safeParse('mm_faq_questions_deleted', []);
      return deleted.indexOf(q.id) === -1;
    });
  };
  BOOK.getFaqQuestionById = function (id) {
    var found = null;
    BOOK.getFaqQuestions().forEach(function (q) { if (q.id === id) found = q; });
    return found;
  };
  BOOK.saveFaqQuestion = function (q) {
    var all = BOOK.getFaqQuestions();
    var idx = -1;
    all.forEach(function (r, i) { if (r.id === q.id) idx = i; });
    if (idx >= 0) all[idx] = q; else all.unshift(q);
    BOOK.saveAll('mm_faq_questions', all);
  };
  BOOK.deleteFaqQuestion = function (id) {
    var deleted = safeParse('mm_faq_questions_deleted', []);
    if (deleted.indexOf(id) === -1) deleted.push(id);
    safeSave('mm_faq_questions_deleted', deleted);
  };

  /* ==================================================================
     BOOK-101 / P1 / P2 — Property Status
     ================================================================== */

  BOOK.CLEANING_SCOPES = [
    { value: '1', label: 'Cleaning By Azura' },
    { value: '2', label: 'Cleaning By Azura & Owner' }
  ];

  var PROPERTY_STATUS_SEED = {
    'PV-101': { guestStatus: 'in-house', cleaningStatus: 'clean', makeupStatus: 'clean', bookingId: 'BK-10231', checkoutStaff: 'Daniel Tan', cleaningStaff: 'Karen Seah', makeupStaff: 'Karen Seah' },
    'PV-102': { guestStatus: 'checking-out', cleaningStatus: 'to-be-cleaned', makeupStatus: 'to-be-cleaned', bookingId: 'BK-10241', checkoutStaff: 'Daniel Tan', cleaningStaff: null, makeupStaff: null },
    'PV-103': { guestStatus: 'vacant', cleaningStatus: 'clean', makeupStatus: 'clean', bookingId: null, checkoutStaff: null, cleaningStaff: 'Ben Sullivan', makeupStaff: 'Ben Sullivan' },
    'PV-104': { guestStatus: 'checked-out', cleaningStatus: 'cleaning-in-progress', makeupStatus: 'to-be-cleaned', bookingId: 'BK-10234', checkoutStaff: 'Warren Kelly', cleaningStaff: 'Ben Sullivan', makeupStaff: null },
    'PV-105': { guestStatus: 'vacant', cleaningStatus: 'to-be-cleaned', makeupStatus: 'to-be-cleaned', bookingId: null, checkoutStaff: null, cleaningStaff: null, makeupStaff: null },
    'PV-106': { guestStatus: 'arriving-today', cleaningStatus: 'clean', makeupStatus: 'clean', bookingId: 'BK-10236', checkoutStaff: null, cleaningStaff: 'Nicole Parker', makeupStaff: 'Nicole Parker' },
    'PV-107': { guestStatus: 'vacant', cleaningStatus: 'clean', makeupStatus: 'clean', bookingId: null, checkoutStaff: null, cleaningStaff: 'Nicole Parker', makeupStaff: 'Nicole Parker' },
    'PV-108': { guestStatus: 'in-house', cleaningStatus: 'clean', makeupStatus: 'to-be-cleaned', bookingId: 'BK-10237', checkoutStaff: null, cleaningStaff: 'Karen Seah', makeupStaff: null }
  };
  BOOK.GUEST_STATUS_META = {
    'in-house': { cls: 'info', label: 'In-house' },
    'checking-out': { cls: 'warning', label: 'Checking-out' },
    'checked-out': { cls: 'neutral', label: 'Checked-out' },
    'arriving-today': { cls: 'warning', label: 'Arriving today' },
    'vacant': { cls: 'neutral', label: 'Vacant' }
  };
  BOOK.CLEAN_STATUS_META = {
    'clean': { cls: 'success', label: 'Clean' },
    'to-be-cleaned': { cls: 'danger', label: 'To be Cleaned' },
    'cleaning-in-progress': { cls: 'warning', label: 'Cleaning in Progress' }
  };

  BOOK.getPropertyStatusRows = function () {
    var overrides = safeParse('mm_property_status_overrides', {});
    return BOOK.VILLAS.map(function (v) {
      var base = PROPERTY_STATUS_SEED[v.id] || { guestStatus: 'vacant', cleaningStatus: 'clean', makeupStatus: 'clean', bookingId: null, checkoutStaff: null, cleaningStaff: null, makeupStaff: null };
      var row = Object.assign({}, base, overrides[v.id] || {});
      row.villaId = v.id; row.villaName = v.name; row.bu = v.bu;
      return row;
    });
  };
  BOOK.savePropertyStatusOverride = function (villaId, fields) {
    var overrides = safeParse('mm_property_status_overrides', {});
    overrides[villaId] = Object.assign({}, overrides[villaId] || {}, fields);
    safeSave('mm_property_status_overrides', overrides);
  };

  var STAFF_DETAIL_SEED = {
    'PV-101': { checkoutStart: '10:12', checkoutStartLoc: 'Villa Sapphire Cliff', checkoutStartDist: '0.0 km', checkoutEnd: '10:38', checkoutEndLoc: 'Office — Sentosa Collection', checkoutEndDist: '6.4 km', cleanDate: '2026-09-01', makeupDate: '2026-09-01', lat: 1.244, lng: 103.842 },
    'PV-102': { checkoutStart: '—', checkoutStartLoc: '—', checkoutStartDist: '—', checkoutEnd: '—', checkoutEndLoc: '—', checkoutEndDist: '—', cleanDate: null, makeupDate: null, lat: 1.247, lng: 103.839 },
    'PV-104': { checkoutStart: '11:05', checkoutStartLoc: 'Villa Azure Ridge', checkoutStartDist: '0.0 km', checkoutEnd: '11:30', checkoutEndLoc: 'Villa Marble Cove', checkoutEndDist: '3.1 km', cleanDate: '2026-08-25', makeupDate: null, lat: -28.65, lng: 153.612 },
    'PV-106': { checkoutStart: '—', checkoutStartLoc: '—', checkoutStartDist: '—', checkoutEnd: '—', checkoutEndLoc: '—', checkoutEndDist: '—', cleanDate: '2026-09-12', makeupDate: '2026-09-12', lat: -26.392, lng: 153.091 },
    'PV-108': { checkoutStart: '—', checkoutStartLoc: '—', checkoutStartDist: '—', checkoutEnd: '—', checkoutEndLoc: '—', checkoutEndDist: '—', cleanDate: '2026-09-13', makeupDate: null, lat: -28.64, lng: 153.62 }
  };
  BOOK.getVillaStaffDetail = function (villaId) {
    var v = BOOK.villaById(villaId);
    var row = BOOK.getPropertyStatusRows().filter(function (r) { return r.villaId === villaId; })[0];
    var seed = STAFF_DETAIL_SEED[villaId] || { checkoutStart: '—', checkoutStartLoc: '—', checkoutStartDist: '—', checkoutEnd: '—', checkoutEndLoc: '—', checkoutEndDist: '—', cleanDate: null, makeupDate: null, lat: 0, lng: 0 };
    return { villa: v, row: row, seed: seed };
  };

  /* ==================================================================
     BOOK-102 — Timesheet
     ================================================================== */

  var TIMESHEET_SEED = [
    { staffId: 'STF-01', clockIn: '08:02', clockInManual: false, clockInLoc: '1.2441,103.8419', clockOut: '17:10', clockOutLoc: '1.2438,103.8415', sickLeave: false, dayOff: false, createdAt: '08:02', tracker: true },
    { staffId: 'STF-02', clockIn: '08:15', clockInManual: false, clockInLoc: '-28.6474,153.6120', clockOut: null, clockOutLoc: null, sickLeave: false, dayOff: false, createdAt: '08:15', tracker: true },
    { staffId: 'STF-03', clockIn: null, clockInManual: false, clockInLoc: null, clockOut: null, clockOutLoc: null, sickLeave: true, certificate: true, dayOff: false, createdAt: '—', tracker: false },
    { staffId: 'STF-04', clockIn: '07:58', clockInManual: true, clockInLoc: '1.2460,103.8372', clockOut: '16:45', clockOutLoc: '1.2457,103.8368', sickLeave: false, dayOff: false, createdAt: '08:20 (Updated by Daniel Tan)', tracker: true, validated: true, validatedBy: 'Daniel Tan', validatedOn: '2026-09-02T18:00:00' },
    { staffId: 'STF-05', clockIn: null, clockInManual: false, clockInLoc: null, clockOut: null, clockOutLoc: null, sickLeave: false, dayOff: true, createdAt: '—', tracker: false }
  ];
  BOOK.getTimesheetRows = function (dateStr) {
    var overrides = safeParse('mm_timesheet_overrides', {});
    return (MM.MOCK_STAFF || []).map(function (staff, i) {
      var seed = TIMESHEET_SEED[i] || TIMESHEET_SEED[0];
      var key = dateStr + '|' + staff.id;
      var row = Object.assign({ dept: staff.role, name: staff.name, staffId: staff.id }, seed, overrides[key] || {});
      return row;
    });
  };
  BOOK.saveTimesheetOverride = function (dateStr, staffId, fields) {
    var overrides = safeParse('mm_timesheet_overrides', {});
    var key = dateStr + '|' + staffId;
    overrides[key] = Object.assign({}, overrides[key] || {}, fields);
    safeSave('mm_timesheet_overrides', overrides);
  };

  /* ==================================================================
     BOOK-103 / 104 / 105 — Occupancy-Based Actions
     ================================================================== */

  BOOK.OCCUPANCY_ACTIONS_BASE = [
    {
      id: 'VA-1004', businessUnit: 'Sentosa Collection', startDate: '2026-09-01', endDate: '2026-09-30',
      villaType: '', createdBy: 'Daniel Tan', createdAt: '2026-08-20T09:00:00',
      numberOfDays: 30, numberOfProperties: 3, occupancyPercent: 48, propertyLowOccupancy: 1, propertyHighOccupancy: 1,
      highPercent: 74, lowPercent: 24,
      villas: [
        { villaId: 'PV-101', occupancyPercent: 62, note: 'Solid demand — hold current rate through end of month.' },
        { villaId: 'PV-102', occupancyPercent: 41, note: 'Below average — offer a 10% mid-week discount.' },
        { villaId: 'PV-105', occupancyPercent: 18, note: 'Still onboarding, rate not yet published — exclude from comparison next cycle.' }
      ]
    },
    {
      id: 'VA-1003', businessUnit: 'Byron Bay Retreats', startDate: '2026-08-01', endDate: '2026-08-31',
      villaType: 'Beachfront Villa', createdBy: 'Warren Kelly', createdAt: '2026-07-22T11:30:00',
      numberOfDays: 31, numberOfProperties: 2, occupancyPercent: 55, propertyLowOccupancy: 0, propertyHighOccupancy: 1,
      highPercent: 77, lowPercent: 27,
      villas: [
        { villaId: 'PV-103', occupancyPercent: 68, note: 'High season pricing performing well, no change needed.' },
        { villaId: 'PV-108', occupancyPercent: 52, note: 'Stable — monitor into September.' }
      ]
    },
    {
      id: 'VA-1002', businessUnit: 'Noosa Estates', startDate: '2026-07-01', endDate: '2026-07-31',
      villaType: '', createdBy: 'Nicole Parker', createdAt: '2026-06-18T08:45:00',
      numberOfDays: 31, numberOfProperties: 2, occupancyPercent: 33, propertyLowOccupancy: 2, propertyHighOccupancy: 0,
      highPercent: 66, lowPercent: 16,
      villas: [
        { villaId: 'PV-106', occupancyPercent: 21, note: 'Low season — ran a 15% flash sale via OTA channels.' },
        { villaId: 'PV-107', occupancyPercent: 14, note: 'Onboarding villa, no rate yet — exclude until launch.' }
      ]
    },
    {
      id: 'VA-1001', businessUnit: 'Sentosa Collection', startDate: '2026-06-01', endDate: '2026-06-30',
      villaType: 'Hillside Villa', createdBy: 'Daniel Tan', createdAt: '2026-05-20T10:00:00',
      numberOfDays: 30, numberOfProperties: 2, occupancyPercent: 60, propertyLowOccupancy: 0, propertyHighOccupancy: 1,
      highPercent: 80, lowPercent: 30,
      villas: [
        { villaId: 'PV-101', occupancyPercent: 71, note: 'Strong month — increase weekend rate 8% next cycle.' },
        { villaId: 'PV-104', occupancyPercent: 49, note: 'On target, no action.' }
      ]
    }
  ];
  BOOK.getOccupancyActions = function () {
    var extra = safeParse('mm_occupancy_actions_extra', []);
    return extra.concat(BOOK.OCCUPANCY_ACTIONS_BASE).sort(function (a, b) {
      return b.id.localeCompare(a.id);
    });
  };
  BOOK.getOccupancyActionById = function (id) {
    var found = null;
    BOOK.getOccupancyActions().forEach(function (a) { if (a.id === id) found = a; });
    return found;
  };
  BOOK.saveOccupancyAction = function (action) {
    var extra = safeParse('mm_occupancy_actions_extra', []);
    extra.unshift(action);
    safeSave('mm_occupancy_actions_extra', extra);
  };
  BOOK.nextOccupancyActionId = function () {
    var all = BOOK.getOccupancyActions();
    var max = 1000;
    all.forEach(function (a) { var n = parseInt(a.id.replace('VA-', ''), 10); if (n > max) max = n; });
    return 'VA-' + (max + 1);
  };

  /* Live occupancy analysis over the real booking data — used by both
     BOOK-104 (Analyse step) and BOOK-105 (current-figures comparison). */
  BOOK.analyseOccupancy = function (bu, startDate, endDate, villaType) {
    var villas = BOOK.VILLAS.filter(function (v) {
      if (bu && v.bu !== bu) return false;
      if (villaType && BOOK.villaPropertyType(v.id) !== villaType) return false;
      return true;
    });
    var start = new Date(startDate), end = new Date(endDate);
    var days = Math.max(1, Math.round((end - start) / 86400000) + 1);
    var bookings = BOOK.getAllBookings().filter(function (b) { return (b.status || '').toLowerCase() !== 'cancelled'; });
    var perVilla = villas.map(function (v) {
      var bookedNights = 0;
      bookings.forEach(function (b) {
        if (b.property !== v.name) return;
        var bs = new Date(b.checkIn), be = new Date(b.checkOut);
        var overlapStart = bs > start ? bs : start;
        var overlapEnd = be < end ? be : end;
        var nights = Math.round((overlapEnd - overlapStart) / 86400000);
        if (nights > 0) bookedNights += nights;
      });
      var pct = Math.min(100, Math.round((bookedNights / days) * 100));
      return { villaId: v.id, villaName: v.name, occupancyPercent: pct };
    });
    var avg = perVilla.length ? Math.round(perVilla.reduce(function (s, p) { return s + p.occupancyPercent; }, 0) / perVilla.length) : 0;
    var loPercent = Math.round(avg / 2);
    var hiPercent = Math.min(100, 50 + loPercent);
    var daily = [];
    for (var d = 0; d < Math.min(days, 30); d++) {
      var day = new Date(start.getTime() + d * 86400000);
      var occupied = 0;
      villas.forEach(function (v) {
        bookings.forEach(function (b) {
          if (b.property !== v.name) return;
          if (day >= new Date(b.checkIn) && day < new Date(b.checkOut)) occupied++;
        });
      });
      daily.push({ date: day.toISOString().slice(0, 10), pct: villas.length ? Math.round((occupied / villas.length) * 100) : 0 });
    }
    return {
      numberOfDays: days, numberOfProperties: perVilla.length, occupancyPercent: avg,
      loPercent: loPercent, hiPercent: hiPercent, perVilla: perVilla, daily: daily
    };
  };

  /* ==================================================================
     BOOK-106 — Nationalities
     ================================================================== */

  BOOK.ALL_NATIONALITIES = Array.from(new Set(BOOK.ALL_GUESTS.map(function (g) { return g.country; }))).sort();

  BOOK.NATIONALITY_GROUPS_BASE = [
    { id: 'NG-01', country: 'Singapore', name: 'European Guests', nationalityIds: ['United Kingdom', 'Poland', 'Germany', 'Sweden', 'Ireland', 'Italy'], behaviour: 'Generally book well in advance, expect detailed pre-arrival communication and value quiet, private settings. Respond well to early-bird offers.' },
    { id: 'NG-02', country: 'Singapore', name: 'Asia-Pacific Guests', nationalityIds: ['Singapore'], behaviour: 'Frequently book shorter last-minute stays, prefer WhatsApp/WeChat communication, and place high value on responsive concierge service.' },
    { id: 'NG-03', country: 'Australia', name: 'European Guests — Byron Bay', nationalityIds: ['Italy'], behaviour: 'Longer average stays (7+ nights), high interest in private chef and wellness add-ons.' }
  ];
  BOOK.getNationalityGroups = function () {
    return BOOK.loadMerged('mm_nationality_groups', BOOK.NATIONALITY_GROUPS_BASE.map(function (g) { return Object.assign({}, g); })).filter(function (g) {
      var deleted = safeParse('mm_nationality_groups_deleted', []);
      return deleted.indexOf(g.id) === -1;
    });
  };
  BOOK.saveNationalityGroup = function (group) {
    var all = BOOK.getNationalityGroups();
    var idx = -1;
    all.forEach(function (g, i) { if (g.id === group.id) idx = i; });
    if (idx >= 0) all[idx] = group; else all.unshift(group);
    BOOK.saveAll('mm_nationality_groups', all);
  };
  BOOK.deleteNationalityGroup = function (id) {
    var deleted = safeParse('mm_nationality_groups_deleted', []);
    if (deleted.indexOf(id) === -1) deleted.push(id);
    safeSave('mm_nationality_groups_deleted', deleted);
  };

  /* ==================================================================
     BOOK-107 — Standard Check-in/Check-out Time
     ================================================================== */

  BOOK.STANDARD_TIMES_BASE = [
    { id: 'ST-01', businessUnitId: 'Sentosa Collection', checkInTime: '14:00', checkOutTime: '11:00' },
    { id: 'ST-02', businessUnitId: 'Byron Bay Retreats', checkInTime: '15:00', checkOutTime: '12:00' }
    // Noosa Estates intentionally not yet configured (00:00:00 => hidden from the list), per spec.
  ];
  BOOK.getStandardTimes = function () {
    return BOOK.loadMerged('mm_standard_times', BOOK.STANDARD_TIMES_BASE.map(function (s) { return Object.assign({}, s); })).filter(function (s) {
      var deleted = safeParse('mm_standard_times_deleted', []);
      return deleted.indexOf(s.id) === -1;
    });
  };
  BOOK.saveStandardTime = function (row) {
    var all = BOOK.getStandardTimes();
    var idx = -1;
    all.forEach(function (r, i) { if (r.id === row.id) idx = i; });
    if (idx >= 0) all[idx] = row; else all.unshift(row);
    BOOK.saveAll('mm_standard_times', all);
  };
  BOOK.deleteStandardTime = function (id) {
    var deleted = safeParse('mm_standard_times_deleted', []);
    if (deleted.indexOf(id) === -1) deleted.push(id);
    safeSave('mm_standard_times_deleted', deleted);
  };

  /* ==================================================================
     BOOK-108 — Online Check-in Deadline Settings
     ================================================================== */

  BOOK.DEADLINE_GROUPS_BASE = [
    { id: 'DL-01', days: 3, businessUnits: ['Sentosa Collection'], updatedBy: 'Daniel Tan', updatedAt: '2026-08-10T09:00:00' },
    { id: 'DL-02', days: 7, businessUnits: ['Byron Bay Retreats', 'Noosa Estates'], updatedBy: 'Warren Kelly', updatedAt: '2026-08-14T11:20:00' }
  ];
  BOOK.getDeadlineGroups = function () {
    var saved = safeParse('mm_checkin_deadline_groups', null);
    return saved || BOOK.DEADLINE_GROUPS_BASE.map(function (g) { return Object.assign({}, g); });
  };
  BOOK.saveDeadlineGroups = function (groups) {
    safeSave('mm_checkin_deadline_groups', groups);
  };

  /* ==================================================================
     BOOK-109 — Revenue Report
     ================================================================== */

  BOOK.CURRENCIES = ['USD', 'SGD', 'AUD', 'EUR'];
  BOOK.CURRENCY_RATES = { USD: 1, SGD: 1.34, AUD: 1.52, EUR: 0.92 };
  BOOK.convertCurrency = function (amountUsd, code) {
    var rate = BOOK.CURRENCY_RATES[code] || 1;
    return amountUsd * rate;
  };
  BOOK.MONTH_OPTIONS = ['2026-06', '2026-07', '2026-08', '2026-09', '2026-10'];
  BOOK.monthLabel = function (ym) {
    var parts = ym.split('-');
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, 1);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  // Company/Subsidiary is a single-level mock here: one company, subsidiaries mirror business units.
  BOOK.COMPANY = { id: 'CO-01', name: 'Azura Stays Group' };

  /* Builds revenue rows (grouped Company -> Subsidiary/BU -> Villa) for the
     given set of month keys ('YYYY-MM'), computed live from booking data
     whose check-in date falls in that month. */
  BOOK.buildRevenueReport = function (months, buFilter) {
    var bookings = BOOK.getAllBookings().filter(function (b) { return (b.status || '').toLowerCase() !== 'cancelled'; });
    var villas = BOOK.VILLAS.filter(function (v) { return !buFilter || v.bu === buFilter; });
    var villaRows = villas.map(function (v) {
      var monthTotals = {};
      months.forEach(function (m) { monthTotals[m] = 0; });
      var bookingsCount = 0;
      bookings.forEach(function (b) {
        if (b.property !== v.name) return;
        var ym = (b.checkIn || '').slice(0, 7);
        if (months.indexOf(ym) === -1) return;
        monthTotals[ym] += Number(b.total || b.amount || 0);
        bookingsCount++;
      });
      var total = months.reduce(function (s, m) { return s + monthTotals[m]; }, 0);
      return {
        villaId: v.id, villaName: v.name, bu: v.bu, monthTotals: monthTotals,
        total: total, ownerTotal: Math.round(total * 0.65), bookings: bookingsCount,
        missingRate: !v.rate
      };
    });
    var byBu = {};
    villaRows.forEach(function (r) {
      byBu[r.bu] = byBu[r.bu] || { bu: r.bu, monthTotals: {}, total: 0, ownerTotal: 0, bookings: 0, villas: [] };
      months.forEach(function (m) { byBu[r.bu].monthTotals[m] = (byBu[r.bu].monthTotals[m] || 0) + r.monthTotals[m]; });
      byBu[r.bu].total += r.total; byBu[r.bu].ownerTotal += r.ownerTotal; byBu[r.bu].bookings += r.bookings;
      byBu[r.bu].villas.push(r);
    });
    var missingRateVillas = villaRows.filter(function (r) { return r.missingRate; });
    return { groups: Object.keys(byBu).map(function (k) { return byBu[k]; }), missingRateVillas: missingRateVillas };
  };

  /* ==================================================================
     BOOK-110 — SHA Plus Detail
     ================================================================== */

  BOOK.SHA_STATUSES = ['Unknown', 'Not Applicable', 'Pending Certification', 'Certified', 'Expired'];
  BOOK.getShaRecord = function (bookingId) {
    var all = safeParse('mm_sha_plus', {});
    return all[bookingId] || { status: 'Unknown', comments: '' };
  };
  BOOK.saveShaRecord = function (bookingId, fields) {
    var all = safeParse('mm_sha_plus', {});
    all[bookingId] = Object.assign({ status: 'Unknown', comments: '' }, all[bookingId] || {}, fields, { updatedAt: new Date().toISOString() });
    safeSave('mm_sha_plus', all);
  };

})();
