/* ==========================================================================
   Booking module — shared mock data & helpers for the settings/reports
   screen group (BOOK-097..BOOK-110): FAQ/Wiki, Property Status, Timesheet,
   Occupancy-Based Actions, Nationalities, Standard Check-in/out Time,
   Online Check-in Deadline Settings, Revenue Report, SHA+ Detail.
   Extends window.MM.BOOK. Load order: global.js, booking-data.js,
   booking-ops-data.js, booking-guest-data.js, booking-settings-data.js,
   then the screen's own script.js.
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
  function safeSet(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  var hashStr = BOOK.hashStr || function (s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) { h = (Math.imul(31, h) + s.charCodeAt(i)) | 0; }
    return h >>> 0;
  };
  var seededRand = BOOK.seededRand || function (seed) {
    var t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  /* ==================================================================
     BOOK-097/098/099/100 — FAQ / Wiki
     ================================================================== */
  BOOK.FAQ_CATEGORIES_BASE = [
    { id: 'FC-01', name: 'Check-in & Check-out', createdAt: '2026-01-10T09:00:00' },
    { id: 'FC-02', name: 'Villa Amenities', createdAt: '2026-01-12T10:30:00' },
    { id: 'FC-03', name: 'Payments & Refunds', createdAt: '2026-02-02T14:00:00' },
    { id: 'FC-04', name: 'Housekeeping', createdAt: '2026-02-15T11:15:00' },
    { id: 'FC-05', name: 'Emergency Procedures', createdAt: '2026-03-01T08:45:00' }
  ];
  var FC_EXTRA = 'mm_faq_categories_extra', FC_EDITS = 'mm_faq_categories_edits', FC_DEL = 'mm_faq_categories_deleted';
  BOOK.getFaqCategories = function () {
    var extra = safeParse(FC_EXTRA, []), edits = safeParse(FC_EDITS, {}), del = safeParse(FC_DEL, []);
    return BOOK.FAQ_CATEGORIES_BASE.concat(extra).filter(function (c) { return del.indexOf(c.id) === -1; })
      .map(function (c) { return edits[c.id] ? Object.assign({}, c, edits[c.id]) : c; });
  };
  BOOK.faqCategoryById = function (id) {
    var f = null; BOOK.getFaqCategories().forEach(function (c) { if (c.id === id) f = c; }); return f;
  };
  BOOK.addFaqCategory = function (name) {
    var extra = safeParse(FC_EXTRA, []);
    var row = { id: MM.uid('FC'), name: name, createdAt: new Date().toISOString() };
    extra.unshift(row); safeSet(FC_EXTRA, extra); return row;
  };
  BOOK.saveFaqCategoryEdit = function (id, fields) {
    var edits = safeParse(FC_EDITS, {}); edits[id] = Object.assign({}, edits[id] || {}, fields); safeSet(FC_EDITS, edits);
  };
  BOOK.deleteFaqCategory = function (id) {
    var del = safeParse(FC_DEL, []); del.push(id); safeSet(FC_DEL, del);
  };

  BOOK.FAQ_QUESTIONS_BASE = [
    { id: 'FQ-01', categoryId: 'FC-01', language: 'English', question: 'What time is standard check-in?', answer: 'Standard check-in is 14:00 local time, and check-out is 11:00, unless a different time has been agreed with your concierge.', businessUnitIds: [], createdAt: '2026-01-11T09:00:00' },
    { id: 'FQ-02', categoryId: 'FC-01', language: 'English', question: 'Can we request an early check-in?', answer: 'Early check-in is subject to villa availability and is confirmed by the concierge team no earlier than 24 hours before arrival.', businessUnitIds: ['Phuket Collection'], createdAt: '2026-01-14T09:00:00' },
    { id: 'FQ-03', categoryId: 'FC-02', language: 'English', question: 'Is the pool heated?', answer: 'Pool heating is available on request for an additional fee at most villas; please confirm with your concierge at time of booking.', businessUnitIds: [], createdAt: '2026-01-20T09:00:00' },
    { id: 'FQ-04', categoryId: 'FC-03', language: 'English', question: 'What is the cancellation policy?', answer: 'Cancellations made more than 30 days before check-in receive a full refund minus the booking fee; later cancellations are non-refundable.', businessUnitIds: [], createdAt: '2026-02-05T09:00:00' },
    { id: 'FQ-05', categoryId: 'FC-03', language: 'Thai', question: 'นโยบายการยกเลิกเป็นอย่างไร', answer: 'การยกเลิกก่อนวันเข้าพัก 30 วันจะได้รับเงินคืนเต็มจำนวนหักค่าธรรมเนียมการจอง', businessUnitIds: ['Phuket Collection'], createdAt: '2026-02-06T09:00:00' },
    { id: 'FQ-06', categoryId: 'FC-04', language: 'English', question: 'How often is housekeeping provided during a stay?', answer: 'Daily housekeeping is included for stays of 3 nights or more; shorter stays include a single mid-stay clean on request.', businessUnitIds: [], createdAt: '2026-02-18T09:00:00' },
    { id: 'FQ-07', categoryId: 'FC-05', language: 'English', question: 'Who do we contact in a medical emergency?', answer: 'Call the 24-hour concierge hotline printed in your welcome pack, or dial local emergency services directly — the villa address is posted at the entrance.', businessUnitIds: [], createdAt: '2026-03-02T09:00:00' },
    { id: 'FQ-08', categoryId: 'FC-02', language: 'French', question: 'Le Wi-Fi est-il inclus ?', answer: 'Oui, le Wi-Fi haut débit est inclus gratuitement dans toutes les villas.', businessUnitIds: ['Bali Retreats', 'Koh Samui Estates'], createdAt: '2026-03-10T09:00:00' }
  ];
  var FQ_EXTRA = 'mm_faq_questions_extra', FQ_EDITS = 'mm_faq_questions_edits', FQ_DEL = 'mm_faq_questions_deleted';
  BOOK.getFaqQuestions = function () {
    var extra = safeParse(FQ_EXTRA, []), edits = safeParse(FQ_EDITS, {}), del = safeParse(FQ_DEL, []);
    return BOOK.FAQ_QUESTIONS_BASE.concat(extra).filter(function (q) { return del.indexOf(q.id) === -1; })
      .map(function (q) { return edits[q.id] ? Object.assign({}, q, edits[q.id]) : q; });
  };
  BOOK.faqQuestionById = function (id) {
    var f = null; BOOK.getFaqQuestions().forEach(function (q) { if (q.id === id) f = q; }); return f;
  };
  BOOK.addFaqQuestion = function (fields) {
    var extra = safeParse(FQ_EXTRA, []);
    var row = Object.assign({ id: MM.uid('FQ'), createdAt: new Date().toISOString() }, fields);
    extra.unshift(row); safeSet(FQ_EXTRA, extra); return row;
  };
  BOOK.saveFaqQuestionEdit = function (id, fields) {
    var edits = safeParse(FQ_EDITS, {}); edits[id] = Object.assign({}, edits[id] || {}, fields); safeSet(FQ_EDITS, edits);
  };
  BOOK.deleteFaqQuestion = function (id) {
    var del = safeParse(FQ_DEL, []); del.push(id); safeSet(FQ_DEL, del);
  };

  /* ==================================================================
     BOOK-101 — Property Status
     ================================================================== */
  BOOK.PROPERTY_STATUS_SEED = {
    'PV-101': { guestStatus: 'in-house', cleaningStatus: 'clean', makeupStatus: 'clean', checkoutStaff: 'Somchai Anuwat', checkoutStart: '10:40', checkoutStartLoc: 'Villa Sapphire Cliff', checkoutStartDist: '0.02 km', checkoutEnd: '11:05', checkoutEndLoc: 'Villa Sapphire Cliff', checkoutEndDist: '0.01 km', cleaningStaff: 'Kanya Srisawat', cleaningDate: '2026-09-02', makeupStaff: 'Kanya Srisawat', makeupDate: '2026-09-02' },
    'PV-102': { guestStatus: 'departed', cleaningStatus: 'to-clean', makeupStatus: 'to-clean', checkoutStaff: 'Somchai Anuwat', checkoutStart: '11:00', checkoutStartLoc: 'Villa Coral Horizon', checkoutStartDist: '0.03 km', checkoutEnd: '—', checkoutEndLoc: '—', checkoutEndDist: '—', cleaningStaff: null, cleaningDate: null, makeupStaff: null, makeupDate: null },
    'PV-103': { guestStatus: 'in-house', cleaningStatus: 'clean', makeupStatus: 'clean', checkoutStaff: 'Wayan Kertha', checkoutStart: '—', checkoutStartLoc: '—', checkoutStartDist: '—', checkoutEnd: '—', checkoutEndLoc: '—', checkoutEndDist: '—', cleaningStaff: 'Kanya Srisawat', cleaningDate: '2026-08-30', makeupStaff: 'Kanya Srisawat', makeupDate: '2026-08-30' },
    'PV-104': { guestStatus: 'vacant', cleaningStatus: 'to-clean', makeupStatus: 'to-clean', checkoutStaff: 'Wayan Kertha', checkoutStart: '09:15', checkoutStartLoc: 'Villa Azure Ridge', checkoutStartDist: '0.05 km', checkoutEnd: '09:50', checkoutEndLoc: 'Villa Azure Ridge', checkoutEndDist: '0.01 km', cleaningStaff: null, cleaningDate: null, makeupStaff: null, makeupDate: null },
    'PV-105': { guestStatus: 'vacant', cleaningStatus: 'clean', makeupStatus: 'clean', checkoutStaff: null, checkoutStart: '—', checkoutStartLoc: '—', checkoutStartDist: '—', checkoutEnd: '—', checkoutEndLoc: '—', checkoutEndDist: '—', cleaningStaff: 'Budi Santoso', cleaningDate: '2026-08-28', makeupStaff: 'Budi Santoso', makeupDate: '2026-08-28' },
    'PV-106': { guestStatus: 'in-house', cleaningStatus: 'to-clean', makeupStatus: 'clean', checkoutStaff: 'Nok Pattaya', checkoutStart: '—', checkoutStartLoc: '—', checkoutStartDist: '—', checkoutEnd: '—', checkoutEndLoc: '—', checkoutEndDist: '—', cleaningStaff: null, cleaningDate: null, makeupStaff: 'Kanya Srisawat', makeupDate: '2026-09-01' },
    'PV-107': { guestStatus: 'departed', cleaningStatus: 'checking', makeupStatus: 'to-clean', checkoutStaff: 'Nok Pattaya', checkoutStart: '10:05', checkoutStartLoc: 'Villa Golden Palm', checkoutStartDist: '0.04 km', checkoutEnd: '—', checkoutEndLoc: '—', checkoutEndDist: '—', cleaningStaff: 'Budi Santoso', cleaningDate: '2026-09-02', makeupStaff: null, makeupDate: null },
    'PV-108': { guestStatus: 'in-house', cleaningStatus: 'clean', makeupStatus: 'clean', checkoutStaff: 'Wayan Kertha', checkoutStart: '—', checkoutStartLoc: '—', checkoutStartDist: '—', checkoutEnd: '—', checkoutEndLoc: '—', checkoutEndDist: '—', cleaningStaff: 'Kanya Srisawat', cleaningDate: '2026-08-29', makeupStaff: 'Kanya Srisawat', makeupDate: '2026-08-29' }
  };
  BOOK.getPropertyStatusRows = function (bu) {
    var overrides = safeParse('mm_property_status_overrides', {});
    return BOOK.VILLAS.filter(function (v) { return !bu || v.bu === bu; }).map(function (v) {
      var base = BOOK.PROPERTY_STATUS_SEED[v.id] || {};
      return Object.assign({ villaId: v.id, villaName: v.name, bu: v.bu }, base, overrides[v.id] || {});
    });
  };
  BOOK.savePropertyStatusOverride = function (villaId, fields) {
    var overrides = safeParse('mm_property_status_overrides', {});
    overrides[villaId] = Object.assign({}, overrides[villaId] || {}, fields);
    safeSet('mm_property_status_overrides', overrides);
  };

  /* ==================================================================
     BOOK-102 — Timesheet
     ================================================================== */
  BOOK.TIMESHEET_SEED = [
    { staffId: 'STF-01', clockIn: '08:02', clockInManual: false, clockInLoc: '7.8804,98.3923', clockOut: '17:10', clockOutLoc: '7.8804,98.3923', validated: true, validatedBy: 'Somchai Anuwat', validatedOn: '2026-09-02T18:00:00', sickLeave: false, dayOff: false },
    { staffId: 'STF-02', clockIn: '08:15', clockInManual: false, clockInLoc: '-8.6905,115.1729', clockOut: null, clockOutLoc: null, validated: false, validatedBy: null, validatedOn: null, sickLeave: false, dayOff: false },
    { staffId: 'STF-03', clockIn: null, clockInManual: false, clockInLoc: null, clockOut: null, clockOutLoc: null, validated: false, validatedBy: null, validatedOn: null, sickLeave: true, dayOff: false },
    { staffId: 'STF-04', clockIn: '07:55', clockInManual: true, clockInLoc: '7.8804,98.3923', clockOut: '16:40', clockOutLoc: '7.8804,98.3923', validated: true, validatedBy: 'Somchai Anuwat', validatedOn: '2026-09-02T17:30:00', sickLeave: false, dayOff: false },
    { staffId: 'STF-05', clockIn: null, clockInManual: false, clockInLoc: null, clockOut: null, clockOutLoc: null, validated: false, validatedBy: null, validatedOn: null, sickLeave: false, dayOff: true }
  ];
  BOOK.getTimesheetRows = function (date) {
    var overrides = safeParse('mm_timesheet_overrides_' + date, {});
    return (window.MM.MOCK_STAFF || []).map(function (s) {
      var seed = BOOK.TIMESHEET_SEED.filter(function (t) { return t.staffId === s.id; })[0] || {};
      return Object.assign({ staffId: s.id, name: s.name, department: s.role, team: s.team }, seed, overrides[s.id] || {});
    });
  };
  BOOK.saveTimesheetOverride = function (date, staffId, fields) {
    var key = 'mm_timesheet_overrides_' + date;
    var overrides = safeParse(key, {});
    overrides[staffId] = Object.assign({}, overrides[staffId] || {}, fields);
    safeSet(key, overrides);
  };

  /* ==================================================================
     BOOK-103/104/105 — Occupancy-Based Actions
     ================================================================== */
  BOOK.VILLA_ACTIONS_SEED = [
    {
      id: 'VA-01', bu: 'Phuket Collection', propertyType: '', startDate: '2026-08-01', endDate: '2026-08-31',
      createdBy: 'Somchai Anuwat', createdAt: '2026-08-02T09:00:00',
      numberOfDays: 31, numberOfProperties: 4, occupancyPercent: 58, highPercent: 68, lowPercent: 29,
      propertyLowOccupancy: 1, propertyHighOccupancy: 2,
      villas: [
        { villaId: 'PV-101', villaName: 'Villa Sapphire Cliff', occupancy: 72, action: 'Occupancy strong — hold current rate through September.' },
        { villaId: 'PV-102', villaName: 'Villa Coral Horizon', occupancy: 61, action: 'Stable — no action needed.' },
        { villaId: 'PV-105', villaName: 'Villa Marble Cove', occupancy: 24, action: 'Low occupancy — approved a 10% promo for shoulder-season dates.' }
      ]
    },
    {
      id: 'VA-02', bu: 'Bali Retreats', propertyType: 'Beachfront Villa', startDate: '2026-07-01', endDate: '2026-07-31',
      createdBy: 'Wayan Kertha', createdAt: '2026-07-03T09:00:00',
      numberOfDays: 31, numberOfProperties: 2, occupancyPercent: 66, highPercent: 75, lowPercent: 33,
      propertyLowOccupancy: 0, propertyHighOccupancy: 2,
      villas: [
        { villaId: 'PV-103', villaName: 'Villa Emerald Bay', occupancy: 78, action: 'High demand — increase weekend rate by 8%.' },
        { villaId: 'PV-108', villaName: 'Villa Silver Tide', occupancy: 80, action: 'High demand — increase weekend rate by 8%.' }
      ]
    }
  ];
  BOOK.getActions = function () {
    return BOOK.loadMerged('mm_villa_actions', BOOK.VILLA_ACTIONS_SEED.map(function (a) { return Object.assign({}, a); }));
  };
  BOOK.getActionById = function (id) {
    var f = null; BOOK.getActions().forEach(function (a) { if (a.id === id) f = a; }); return f;
  };
  BOOK.addAction = function (data) {
    var all = BOOK.getActions();
    var row = Object.assign({ id: MM.uid('VA'), createdBy: 'Somchai Anuwat', createdAt: new Date().toISOString() }, data);
    all.unshift(row);
    BOOK.saveAll('mm_villa_actions', all);
    return row;
  };
  BOOK.analyseOccupancy = function (bu, propertyType) {
    var villas = BOOK.VILLAS.filter(function (v) {
      if (bu && bu !== '0' && v.bu !== bu) return false;
      if (propertyType && propertyType !== '0' && v.propertyType !== propertyType) return false;
      return true;
    });
    var rows = villas.map(function (v) {
      var pct = hashStr(v.id + '|occAction') % 61 + 20;
      return { villaId: v.id, villaName: v.name, occupancy: pct };
    });
    var avg = rows.length ? Math.round(rows.reduce(function (s, r) { return s + r.occupancy; }, 0) / rows.length) : 0;
    return { rows: rows, average: avg, loPercent: Math.round(avg / 2), hiPercent: Math.round(50 + avg / 2) };
  };

  /* ==================================================================
     BOOK-106 — Nationalities
     ================================================================== */
  BOOK.NATIONALITY_GROUPS_SEED = {
    Thailand: [
      { id: 'NG-01', name: 'Nordic Guests', nationalities: ['Sweden'], behaviour: 'Typically book long stays (10+ nights), value privacy and quiet villas away from nightlife areas.' },
      { id: 'NG-02', name: 'Western Europe', nationalities: ['United Kingdom', 'Germany', 'France', 'Italy'], behaviour: 'Family-oriented bookings, high interest in kids amenities and airport transfer add-ons.' }
    ],
    Greece: [
      { id: 'NG-03', name: 'Asia Pacific', nationalities: ['Singapore', 'Ireland'], behaviour: 'Shorter stays, frequent early check-in requests, prefer English-speaking concierge.' }
    ],
    France: [
      { id: 'NG-04', name: 'Eastern Europe', nationalities: ['Poland'], behaviour: 'Price-sensitive, book via OTA channels, respond well to early-bird promotions.' }
    ]
  };
  BOOK.ALL_NATIONALITIES = Array.from(new Set((BOOK.ALL_GUESTS || []).map(function (g) { return g.country; })
    .concat(['Sweden', 'United Kingdom', 'Germany', 'France', 'Italy', 'Singapore', 'Ireland', 'Poland'])));
  BOOK.getNationalityGroups = function (country) {
    return BOOK.loadMerged('mm_nationality_groups_' + country, (BOOK.NATIONALITY_GROUPS_SEED[country] || []).map(function (g) { return Object.assign({}, g); }));
  };
  BOOK.saveNationalityGroup = function (country, group) {
    var all = BOOK.getNationalityGroups(country);
    var idx = -1; all.forEach(function (g, i) { if (g.id === group.id) idx = i; });
    if (idx >= 0) all[idx] = group; else all.unshift(group);
    BOOK.saveAll('mm_nationality_groups_' + country, all);
  };
  BOOK.deleteNationalityGroup = function (country, id) {
    var all = BOOK.getNationalityGroups(country).filter(function (g) { return g.id !== id; });
    BOOK.saveAll('mm_nationality_groups_' + country, all);
  };

  /* ==================================================================
     BOOK-107 — Standard Check-in/Check-out Time
     ================================================================== */
  BOOK.STANDARD_TIME_SEED = [
    { id: 'STD-01', bu: 'Phuket Collection', checkInTime: '14:00', checkOutTime: '11:00' },
    { id: 'STD-02', bu: 'Bali Retreats', checkInTime: '15:00', checkOutTime: '12:00' }
  ];
  BOOK.getStandardTimes = function () {
    return BOOK.loadMerged('mm_standard_times', BOOK.STANDARD_TIME_SEED.map(function (s) { return Object.assign({}, s); }))
      .filter(function (s) { return s.checkInTime !== '00:00' && s.checkOutTime !== '00:00'; });
  };
  BOOK.saveStandardTime = function (row) {
    var raw = safeParse('mm_standard_times', null);
    var base = raw || BOOK.STANDARD_TIME_SEED.map(function (s) { return Object.assign({}, s); });
    var idx = -1; base.forEach(function (s, i) { if (s.id === row.id) idx = i; });
    if (idx >= 0) base[idx] = row; else base.unshift(row);
    safeSet('mm_standard_times', base);
  };
  BOOK.deleteStandardTime = function (id) {
    var raw = safeParse('mm_standard_times', null);
    var base = raw || BOOK.STANDARD_TIME_SEED.map(function (s) { return Object.assign({}, s); });
    base.forEach(function (s) { if (s.id === id) { s.checkInTime = '00:00'; s.checkOutTime = '00:00'; } });
    safeSet('mm_standard_times', base);
  };

  /* ==================================================================
     BOOK-108 — Online Check-in Deadline Settings
     ================================================================== */
  BOOK.DEADLINE_GROUPS_SEED = [
    { id: 'DG-01', days: 3, businessUnits: ['Phuket Collection'], updatedBy: 'Somchai Anuwat', updatedAt: '2026-08-10T09:00:00' },
    { id: 'DG-02', days: 7, businessUnits: ['Bali Retreats', 'Koh Samui Estates'], updatedBy: 'Wayan Kertha', updatedAt: '2026-08-15T09:00:00' }
  ];
  BOOK.getDeadlineGroups = function () {
    var saved = safeParse('mm_deadline_groups', null);
    return saved || BOOK.DEADLINE_GROUPS_SEED.map(function (g) { return Object.assign({}, g); });
  };
  BOOK.saveDeadlineGroups = function (arr) { safeSet('mm_deadline_groups', arr); };

  /* ==================================================================
     BOOK-109 — Revenue Report
     ================================================================== */
  BOOK.COMPANY_TREE = [
    { company: 'Azura Stays Holdings', subsidiary: 'Phuket Collection Co.', bu: 'Phuket Collection' },
    { company: 'Azura Stays Holdings', subsidiary: 'Bali Retreats Co.', bu: 'Bali Retreats' },
    { company: 'Azura Stays Holdings', subsidiary: 'Koh Samui Estates Co.', bu: 'Koh Samui Estates' }
  ];
  BOOK.getRevenueReport = function (bu, months) {
    return BOOK.COMPANY_TREE.filter(function (row) { return !bu || bu === '0' || row.bu === bu; }).map(function (row) {
      var villas = BOOK.VILLAS.filter(function (v) { return v.bu === row.bu; });
      var monthTotals = months.map(function (m) {
        return villas.reduce(function (sum, v) { return sum + Math.round(3000 + seededRand(hashStr(v.id + m)) * 9000); }, 0);
      });
      var villaRows = villas.map(function (v) {
        var perMonth = months.map(function (m) { return Math.round(3000 + seededRand(hashStr(v.id + m)) * 9000); });
        var total = perMonth.reduce(function (a, b) { return a + b; }, 0);
        return { villaId: v.id, villaName: v.name, perMonth: perMonth, total: total, owner: Math.round(total * 0.7), bookings: 2 + (hashStr(v.id) % 5) };
      });
      var total = monthTotals.reduce(function (a, b) { return a + b; }, 0);
      return {
        company: row.company, subsidiary: row.subsidiary, bu: row.bu,
        perMonth: monthTotals, total: total, owner: Math.round(total * 0.7),
        bookings: villaRows.reduce(function (s, v) { return s + v.bookings; }, 0),
        villas: villaRows
      };
    });
  };

  /* ==================================================================
     BOOK-110 — SHA Plus Detail
     ================================================================== */
  BOOK.SHA_STATUSES = ['Unknown', 'Pending Review', 'Approved', 'Not Applicable'];
  BOOK.getShaStatus = function (bookingId) {
    var all = safeParse('mm_sha_status', {});
    return all[bookingId] || { status: 'Unknown', comments: '' };
  };
  BOOK.saveShaStatus = function (bookingId, fields) {
    var all = safeParse('mm_sha_status', {});
    all[bookingId] = Object.assign({}, all[bookingId] || { status: 'Unknown', comments: '' }, fields);
    safeSet('mm_sha_status', all);
  };

})();
