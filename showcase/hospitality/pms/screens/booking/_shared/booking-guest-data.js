/* ==========================================================================
   Booking module — guest/arrival/VIP/recommendation/watch-list shared data.
   Extends window.MM.BOOK (defined in booking-data.js). Loaded after
   booking-data.js and before each screen's own script.js. Reserved for the
   BOOK-077..BOOK-088 screen group — do not use for other Booking screens.
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
  function hashStr(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; }
    return Math.abs(h);
  }

  /* ---------------------------------------------------------------- */
  /* Business units & property types (BOOK.VILLAS already carries `bu`) */
  /* ---------------------------------------------------------------- */
  BOOK.BUSINESS_UNITS = Array.from(new Set(BOOK.VILLAS.map(function (v) { return v.bu; })));

  var TYPE_MAP = {
    'PV-101': 'Hillside Villa', 'PV-102': 'Beachfront Villa', 'PV-103': 'Beachfront Villa',
    'PV-104': 'Hillside Villa', 'PV-105': 'Pool Villa', 'PV-106': 'Garden Villa',
    'PV-107': 'Pool Villa', 'PV-108': 'Beachfront Villa'
  };
  BOOK.PROPERTY_TYPES = Array.from(new Set(Object.keys(TYPE_MAP).map(function (k) { return TYPE_MAP[k]; })));
  BOOK.VILLAS.forEach(function (v) { v.propertyType = TYPE_MAP[v.id] || 'Pool Villa'; });
  BOOK.villaPropertyType = function (villaId) { return TYPE_MAP[villaId] || 'Pool Villa'; };

  /* ==================================================================
     BOOK-077 — Guest Arrival Management
     ================================================================== */

  BOOK.ARRIVAL_META = {
    'BK-10231': { companions: 4, passportUploaded: true, contractSigned: true, onlineCheckin: 'complete', portalSubmittedAt: '2026-08-28T09:12:00', portalReviewedAt: '2026-08-28T14:00:00', requestType: null, requestStatus: null, requestTime: null, groupChatStatus: 'active', checkoutTime: null },
    'BK-10232': { companions: 2, passportUploaded: false, contractSigned: false, onlineCheckin: 'in_progress', portalSubmittedAt: '2026-09-01T11:30:00', portalReviewedAt: null, requestType: null, requestStatus: null, requestTime: null, groupChatStatus: 'pending', checkoutTime: null },
    'BK-10236': { companions: 2, passportUploaded: false, contractSigned: false, onlineCheckin: 'in_progress', portalSubmittedAt: '2026-08-30T16:05:00', portalReviewedAt: null, requestType: null, requestStatus: null, requestTime: null, groupChatStatus: 'pending', checkoutTime: null },
    'BK-10237': { companions: 6, passportUploaded: true, contractSigned: false, onlineCheckin: 'not_started', portalSubmittedAt: null, portalReviewedAt: null, requestType: 'early_checkin', requestStatus: 'pending', requestTime: '11:00', groupChatStatus: 'pending', checkoutTime: null },
    'BK-10239': { companions: 3, passportUploaded: true, contractSigned: true, onlineCheckin: 'complete', portalSubmittedAt: '2026-08-20T08:00:00', portalReviewedAt: '2026-08-20T10:00:00', requestType: null, requestStatus: null, requestTime: null, groupChatStatus: 'active', checkoutTime: null },
    'BK-10241': { companions: 2, passportUploaded: true, contractSigned: true, onlineCheckin: 'complete', portalSubmittedAt: '2026-08-25T09:00:00', portalReviewedAt: '2026-08-25T10:00:00', requestType: 'late_checkout', requestStatus: 'pending', requestTime: '14:00', groupChatStatus: 'active', checkoutTime: null },
    'BK-10238': { companions: 2, passportUploaded: true, contractSigned: true, onlineCheckin: 'complete', portalSubmittedAt: '2026-08-19T10:00:00', portalReviewedAt: '2026-08-19T12:00:00', requestType: null, requestStatus: null, requestTime: null, groupChatStatus: 'active', checkoutTime: '10:40' }
  };

  function defaultArrivalMeta(b) {
    return {
      companions: Math.max(0, (Number(b.adults) || 2) + (Number(b.children) || 0) - 1),
      passportUploaded: false, contractSigned: false,
      onlineCheckin: 'not_started', portalSubmittedAt: null, portalReviewedAt: null,
      requestType: null, requestStatus: null, requestTime: null,
      groupChatStatus: 'none', checkoutTime: null
    };
  }

  BOOK.getArrivalRows = function () {
    var overrides = safeParse('mm_arrival_overrides', {});
    var dismissed = safeParse('mm_arrival_dismissed', []);
    return BOOK.getAllBookings().map(function (b) {
      var meta = Object.assign({}, defaultArrivalMeta(b), BOOK.ARRIVAL_META[b.id] || {}, overrides[b.id] || {});
      meta.dismissed = dismissed.indexOf(b.id) !== -1;
      var out = Object.assign({}, b);
      out.arrival = meta;
      return out;
    });
  };
  BOOK.saveArrivalOverride = function (bookingId, fields) {
    var overrides = safeParse('mm_arrival_overrides', {});
    overrides[bookingId] = Object.assign({}, overrides[bookingId] || {}, fields);
    safeSave('mm_arrival_overrides', overrides);
  };
  BOOK.dismissArrivalAlert = function (bookingId) {
    var dismissed = safeParse('mm_arrival_dismissed', []);
    if (dismissed.indexOf(bookingId) === -1) dismissed.push(bookingId);
    safeSave('mm_arrival_dismissed', dismissed);
  };

  /* ==================================================================
     BOOK-078 / BOOK-079 — VIP Guests & Preparation Work
     ================================================================== */

  BOOK.VIP_CRITERIA_DEFAULTS = {
    'Phuket Collection': { vip: { price: 45000, link: 'OR', duration: 8 }, vip5: { price: 120000, link: 'AND', duration: 15 } },
    'Bali Retreats': { vip: { price: 50000, link: 'AND', duration: 8 }, vip5: { price: 150000, link: 'AND', duration: 15 } },
    'Koh Samui Estates': { vip: { price: 40000, link: 'OR', duration: 7 }, vip5: { price: 110000, link: 'AND', duration: 14 } }
  };
  BOOK.getVipCriteria = function (bu) {
    var saved = safeParse('mm_vip_criteria', {});
    return saved[bu] || BOOK.VIP_CRITERIA_DEFAULTS[bu] || BOOK.VIP_CRITERIA_DEFAULTS['Phuket Collection'];
  };
  BOOK.saveVipCriteria = function (bu, data) {
    var saved = safeParse('mm_vip_criteria', {});
    saved[bu] = data;
    safeSave('mm_vip_criteria', saved);
  };

  BOOK.VIP_BOOKING_SEED = [
    { bookingId: 'BK-10233', bu: 'Bali Retreats', vipStatus: 'VIP 5*', criteria: '$11,200 value · 7 nights', chat: 'green' },
    { bookingId: 'BK-10237', bu: 'Bali Retreats', vipStatus: 'VIP', criteria: '$11,200 value · 7 nights', chat: 'blue' },
    { bookingId: 'BK-10231', bu: 'Phuket Collection', vipStatus: 'VIP', criteria: '$8,400 value · 7 nights', chat: 'red' },
    { bookingId: 'BK-10236', bu: 'Koh Samui Estates', vipStatus: 'VIP', criteria: '$6,300 value · 6 nights', chat: 'blue' },
    { bookingId: 'BK-10239', bu: 'Phuket Collection', vipStatus: 'VIP', criteria: '$4,800 value (OR rule)', chat: 'green' }
  ];
  BOOK.VIP_PREP_SEED = {
    'BK-10233': [{ cleaning: 'Deep clean completed, all linens changed, pool serviced.', checkin: 'Welcome fruit basket and chilled champagne set up in the master suite.', author: 'Wayan Kertha', date: '2026-08-30T09:15:00' }],
    'BK-10239': [{ cleaning: 'Standard turnover clean completed, AC units checked.', checkin: 'Villa manager briefed on guest preferences (anniversary trip).', author: 'Somchai Anuwat', date: '2026-08-26T08:40:00' }]
  };

  BOOK.getVipBookings = function (bu) {
    var banned = safeParse('mm_vip_banned', []);
    return BOOK.VIP_BOOKING_SEED
      .filter(function (s) { return (!bu || s.bu === bu) && banned.indexOf(s.bookingId) === -1; })
      .map(function (s) {
        var b = BOOK.getBookingById(s.bookingId);
        if (!b) return null;
        return Object.assign({}, b, { vipStatus: s.vipStatus, vipCriteria: s.criteria, chat: s.chat, bu: s.bu });
      })
      .filter(Boolean);
  };
  BOOK.banVipBooking = function (bookingId) {
    var banned = safeParse('mm_vip_banned', []);
    if (banned.indexOf(bookingId) === -1) banned.push(bookingId);
    safeSave('mm_vip_banned', banned);
  };
  BOOK.getVipPrepHistory = function (bookingId) {
    var extra = safeParse('mm_vip_prep_work', {});
    var seed = BOOK.VIP_PREP_SEED[bookingId] || [];
    return seed.concat(extra[bookingId] || []);
  };
  BOOK.addVipPrepEntry = function (bookingId, entry) {
    var extra = safeParse('mm_vip_prep_work', {});
    extra[bookingId] = (extra[bookingId] || []).concat([entry]);
    safeSave('mm_vip_prep_work', extra);
  };

  /* ==================================================================
     BOOK-080 / 081 / 082 — Villa Recommendation Criteria
     ================================================================== */

  BOOK.RECOMMENDATION_CRITERIA_BASE = [
    {
      id: 'CRIT-01', name: 'Standard Occupancy',
      lastMinute: { days: 14, under: 40, over: 70 },
      earlyBird: { days: 60, under: 30, over: 60 },
      upTo: 180, excludeDays: 7
    },
    {
      id: 'CRIT-02', name: 'Peak Season Strict',
      lastMinute: { days: 10, under: 55, over: 80 },
      earlyBird: { days: 45, under: 40, over: 70 },
      upTo: 120, excludeDays: 5
    },
    {
      id: 'CRIT-03', name: 'Low Season Relaxed',
      lastMinute: { days: 21, under: 25, over: 55 },
      earlyBird: { days: 75, under: 20, over: 45 },
      upTo: 270, excludeDays: 14
    }
  ];
  BOOK.getRecommendationCriteria = function () {
    return BOOK.loadMerged('mm_recommendation_criteria', BOOK.RECOMMENDATION_CRITERIA_BASE.map(function (c) {
      return Object.assign({}, c);
    })).filter(function (c) {
      var deleted = safeParse('mm_recommendation_criteria_deleted', []);
      return deleted.indexOf(c.id) === -1;
    });
  };
  BOOK.saveRecommendationCriterion = function (criterion) {
    var all = BOOK.getRecommendationCriteria();
    var idx = -1;
    all.forEach(function (c, i) { if (c.id === criterion.id) idx = i; });
    if (idx >= 0) all[idx] = criterion; else all.unshift(criterion);
    BOOK.saveAll('mm_recommendation_criteria', all);
  };
  BOOK.deleteRecommendationCriterion = function (id) {
    var deleted = safeParse('mm_recommendation_criteria_deleted', []);
    if (deleted.indexOf(id) === -1) deleted.push(id);
    safeSave('mm_recommendation_criteria_deleted', deleted);
  };

  /* ==================================================================
     BOOK-084 — Recommendation Check
     ================================================================== */

  // Deterministic pseudo-occupancy % (0-100) per villa + horizon, stable across renders.
  function occupancyPct(villaId, horizon) {
    return hashStr(villaId + '|' + horizon) % 61 + 20; // 20-80 range
  }
  function bandClass(pct, band) {
    if (pct < band.under) return 'danger';
    if (pct > band.over) return 'success';
    return 'neutral';
  }
  BOOK.computeRecommendationCheck = function (bu, propertyType, criteriaId) {
    var criteria = BOOK.getRecommendationCriteria().filter(function (c) { return c.id === criteriaId; })[0];
    if (!criteria) return { rows: [], average: null };
    var villas = BOOK.VILLAS.filter(function (v) {
      if (bu && v.bu !== bu) return false;
      if (propertyType && v.propertyType !== propertyType) return false;
      return true;
    });
    var logs = safeParse('mm_recommendation_logs', {});
    var rows = villas.map(function (v) {
      var lm = occupancyPct(v.id, 'lm');
      var reg = occupancyPct(v.id, 'reg');
      var eb = occupancyPct(v.id, 'eb');
      var villaLogs = logs[v.id] || [];
      var lastLog = villaLogs.length ? villaLogs[villaLogs.length - 1] : null;
      return {
        villaId: v.id, villaName: v.name,
        lastMinute: { pct: lm, cls: bandClass(lm, criteria.lastMinute) },
        regular: { pct: reg, cls: bandClass(reg, { under: (criteria.lastMinute.under + criteria.earlyBird.under) / 2, over: (criteria.lastMinute.over + criteria.earlyBird.over) / 2 }) },
        earlyBird: { pct: eb, cls: bandClass(eb, criteria.earlyBird) },
        lastLog: lastLog
      };
    });
    var avg = function (key) {
      if (!rows.length) return 0;
      return Math.round(rows.reduce(function (s, r) { return s + r[key].pct; }, 0) / rows.length);
    };
    var average = rows.length ? {
      lastMinute: { pct: avg('lastMinute'), cls: bandClass(avg('lastMinute'), criteria.lastMinute) },
      regular: { pct: avg('regular'), cls: 'neutral' },
      earlyBird: { pct: avg('earlyBird'), cls: bandClass(avg('earlyBird'), criteria.earlyBird) }
    } : null;
    return { rows: rows, average: average, criteria: criteria };
  };
  BOOK.saveRecommendationLog = function (villaId, comment, author) {
    var logs = safeParse('mm_recommendation_logs', {});
    logs[villaId] = (logs[villaId] || []).concat([{ comment: comment, author: author || 'Somchai Anuwat', date: new Date().toISOString() }]);
    safeSave('mm_recommendation_logs', logs);
  };

  /* ==================================================================
     BOOK-088 — Watch List
     ================================================================== */

  BOOK.WATCH_COUNTRIES_DEFAULT = {
    'Phuket Collection': ['Germany', 'Sweden'],
    'Bali Retreats': ['United Kingdom', 'Poland'],
    'Koh Samui Estates': ['Ireland', 'Singapore']
  };
  BOOK.getWatchCountries = function (bu) {
    var saved = safeParse('mm_watch_countries', {});
    return saved[bu] || BOOK.WATCH_COUNTRIES_DEFAULT[bu] || [];
  };
  BOOK.saveWatchCountries = function (bu, countries) {
    var saved = safeParse('mm_watch_countries', {});
    saved[bu] = countries;
    safeSave('mm_watch_countries', saved);
  };
  BOOK.WATCH_ALL_COUNTRIES = Array.from(new Set(BOOK.ALL_GUESTS.map(function (g) { return g.country; })));

  BOOK.getWatchListRows = function (bu) {
    var watched = BOOK.getWatchCountries(bu);
    if (!watched.length) return [];
    var seenMap = safeParse('mm_watch_seen', {});
    var yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1); yesterday.setHours(0, 0, 0, 0);
    return BOOK.getAllBookings().filter(function (b) {
      var v = BOOK.villaByName(b.property);
      if (!v || v.bu !== bu) return false;
      if (watched.indexOf(b.country) === -1) return false;
      if ((b.status || '').toLowerCase() === 'cancelled') return false;
      var co = new Date(b.checkOut);
      if (co < yesterday) return false;
      return true;
    }).map(function (b) {
      var chat = ['none', 'pending', 'active'][hashStr(b.id + 'chat') % 3];
      return Object.assign({}, b, { chatStatus: chat, seen: seenMap[b.id] || null });
    });
  };
  BOOK.markWatchSeen = function (bookingId, byName) {
    var seenMap = safeParse('mm_watch_seen', {});
    seenMap[bookingId] = { by: byName || 'Somchai Anuwat', at: new Date().toISOString() };
    safeSave('mm_watch_seen', seenMap);
  };

  /* ==================================================================
     BOOK-085 / 086 — Booking Enquiry Form
     ================================================================== */

  BOOK.villaBookedRanges = function (villaId) {
    var v = BOOK.villaById(villaId);
    if (!v) return [];
    return BOOK.getAllBookings().filter(function (b) {
      return b.property === v.name && (b.status || '').toLowerCase() !== 'cancelled';
    }).map(function (b) { return { checkIn: b.checkIn, checkOut: b.checkOut }; });
  };
  BOOK.rangesOverlap = function (aStart, aEnd, bStart, bEnd) {
    return new Date(aStart) < new Date(bEnd) && new Date(bStart) < new Date(aEnd);
  };
  BOOK.saveEnquiry = function (data) {
    var all = safeParse('mm_booking_enquiries', []);
    all.unshift(data);
    safeSave('mm_booking_enquiries', all);
  };

})();
