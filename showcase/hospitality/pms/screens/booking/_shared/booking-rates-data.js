/* ==========================================================================
   Booking module — Rates & Seasons sub-module shared mock data & helpers.
   Extends window.MM.BOOK (defined in booking-data.js) with everything the
   BOOK-066..BOOK-076 "Villa Rate Management" screens need: rate-status
   records (Daily/Monthly/Yearly), rate-status change logs, monthly rent
   payment history, regions + seasons, seasonal price reconciliation, and
   the free-text rate change log.
   Load order: global.js -> booking-data.js -> booking-rates-data.js -> screen's own script.js.
   Do not edit booking-data.js from this file's screens (shared across all Booking batches).
   ========================================================================== */

(function () {
  'use strict';

  window.MM = window.MM || {};
  var BOOK = window.MM.BOOK = window.MM.BOOK || {};

  /* ---------------------------------------------------------------- */
  /* Business Units / Regions — derived from BOOK.VILLAS' `bu` field so */
  /* names stay identical to every other Booking screen.                */
  /* ---------------------------------------------------------------- */
  var BU_NAMES = Array.prototype.filter.call(
    (BOOK.VILLAS || []).map(function (v) { return v.bu; }),
    function (v, i, arr) { return v && arr.indexOf(v) === i; }
  );
  BOOK.BUSINESS_UNITS = BU_NAMES.map(function (name, i) {
    return { id: 'BU-0' + (i + 1), name: name };
  });
  BOOK.businessUnitByName = function (name) {
    var found = null;
    BOOK.BUSINESS_UNITS.forEach(function (bu) { if (bu.name === name) found = bu; });
    return found;
  };
  BOOK.businessUnitById = function (id) {
    var found = null;
    BOOK.BUSINESS_UNITS.forEach(function (bu) { if (bu.id === id) found = bu; });
    return found;
  };
  // Regions mirror business units 1:1 in this dataset (each BU is its own rate region).
  BOOK.REGIONS = BOOK.BUSINESS_UNITS.map(function (bu) { return { id: 'RG-' + bu.id.slice(3), name: bu.name }; });
  BOOK.regionByBu = function (buName) {
    var bu = BOOK.businessUnitByName(buName);
    if (!bu) return null;
    var found = null;
    BOOK.REGIONS.forEach(function (r) { if (r.id === 'RG-' + bu.id.slice(3)) found = r; });
    return found;
  };
  BOOK.villaRegionId = function (villaId) {
    var v = BOOK.villaById(villaId);
    var r = v ? BOOK.regionByBu(v.bu) : null;
    return r ? r.id : null;
  };

  function daysBetween(a, b) {
    return Math.round((new Date(b) - new Date(a)) / 86400000) + 1;
  }

  /* ---------------------------------------------------------------- */
  /* Villa Rate Status (BOOK-067/068/069/075/076) — current status per */
  /* villa (Daily/Monthly/Yearly) + full history log + monthly payment */
  /* history for the villas currently on a Monthly plan.                */
  /* ---------------------------------------------------------------- */
  BOOK.RATE_STATUS_LOG = {
    'PV-101': [
      { since: '2020-01-01', till: '2026-02-28', status: 'Daily', note: 'Default daily rate.' },
      { since: '2026-03-01', till: null, status: 'Monthly', note: 'Monthly rent 45,000 THB, due on the 5th of each month.' }
    ],
    'PV-102': [
      { since: '2020-01-01', till: null, status: 'Daily', note: 'Default daily rate.' }
    ],
    'PV-103': [
      { since: '2020-01-01', till: '2026-01-14', status: 'Daily', note: 'Default daily rate.' },
      { since: '2026-01-15', till: null, status: 'Monthly', note: 'Monthly rent 62,000 THB, due at month end.' }
    ],
    'PV-104': [
      { since: '2020-01-01', till: null, status: 'Daily', note: 'Default daily rate.' }
    ],
    'PV-105': [
      { since: '2020-01-01', till: null, status: 'Daily', note: 'Default daily rate.' }
    ],
    'PV-106': [
      { since: '2020-01-01', till: '2026-01-31', status: 'Daily', note: 'Default daily rate.' },
      { since: '2026-02-01', till: null, status: 'Monthly', note: 'Monthly rent 38,000 THB, due on the 25th of each month.' }
    ],
    'PV-107': [
      { since: '2020-01-01', till: '2025-12-31', status: 'Daily', note: 'Default daily rate.' },
      { since: '2026-01-01', till: null, status: 'Yearly', note: 'Annual lease agreement, 480,000 THB/year.' }
    ],
    'PV-108': [
      { since: '2020-01-01', till: '2025-05-31', status: 'Daily', note: 'Default daily rate.' },
      { since: '2025-06-01', till: '2026-01-14', status: 'Monthly', note: 'Monthly rent 38,000 THB.' },
      { since: '2026-01-15', till: null, status: 'Daily', note: 'Reverted to daily rate after contract ended.' }
    ]
  };

  // Current (active = till:null) status record per villa, enriched with the fields
  // BOOK-067/069/075/076 need for a Monthly record specifically.
  var RATE_STATUS_EXTRA = {
    'PV-101': { monthlyRent: 45000, deposit: 90000, rentDueDateType: 'day_of_month', dayOfMonth: 5, expectedTerminationDate: '2027-03-01', nextDueDate: '2026-09-05' },
    'PV-103': { monthlyRent: 62000, deposit: 124000, rentDueDateType: 'month_end', dayOfMonth: null, expectedTerminationDate: '2027-01-15', nextDueDate: '2026-09-30' },
    'PV-106': { monthlyRent: 38000, deposit: 76000, rentDueDateType: 'day_of_month', dayOfMonth: 25, expectedTerminationDate: '2027-02-01', nextDueDate: '2026-08-25' },
    'PV-107': { annualRent: 480000, deposit: 240000, expectedTerminationDate: '2027-01-01', nextDueDate: '2027-01-01' }
  };

  function activeLogEntry(villaId) {
    var log = BOOK.RATE_STATUS_LOG[villaId] || [];
    var found = null;
    log.forEach(function (e) { if (e.till === null) found = e; });
    return found || log[log.length - 1];
  }

  BOOK.RATE_STATUS = (BOOK.VILLAS || []).map(function (v) {
    var active = activeLogEntry(v.id);
    var extra = RATE_STATUS_EXTRA[v.id] || {};
    var bu = BOOK.businessUnitByName(v.bu);
    return {
      villaId: v.id, villaName: v.name, buId: bu ? bu.id : null, buName: v.bu,
      type: active ? active.status : 'Daily',
      startingDate: active ? active.since : '2020-01-01',
      monthlyRent: extra.monthlyRent || null,
      annualRent: extra.annualRent || null,
      deposit: extra.deposit || null,
      rentDueDateType: extra.rentDueDateType || null,
      dayOfMonth: extra.dayOfMonth || null,
      nextDueDate: extra.nextDueDate || null,
      expectedTerminationDate: extra.expectedTerminationDate || null
    };
  });

  BOOK.rateStatusByVilla = function (villaId) {
    var found = null;
    BOOK.RATE_STATUS.forEach(function (r) { if (r.villaId === villaId) found = r; });
    return found;
  };

  // System-wide Monthly overview (Table 1 on BOOK-067) — Monthly villas only, sorted by next due date.
  BOOK.monthlyOverview = function () {
    return BOOK.RATE_STATUS.filter(function (r) { return r.type === 'Monthly'; })
      .slice().sort(function (a, b) { return new Date(a.nextDueDate) - new Date(b.nextDueDate); });
  };

  BOOK.isOverdue = function (dateStr) {
    if (!dateStr) return false;
    var today = new Date('2026-09-02T00:00:00');
    return new Date(dateStr + 'T00:00:00') < today;
  };

  /* Monthly rent payment history (BOOK-076), keyed by villa id. */
  BOOK.RATE_PAYMENTS = {
    'PV-101': [
      { rentalMonth: 'March 2026', paymentDate: '2026-03-04' },
      { rentalMonth: 'April 2026', paymentDate: '2026-04-05' },
      { rentalMonth: 'May 2026', paymentDate: '2026-05-06' },
      { rentalMonth: 'June 2026', paymentDate: '2026-06-03' },
      { rentalMonth: 'July 2026', paymentDate: '2026-07-05' },
      { rentalMonth: 'August 2026', paymentDate: '2026-08-04' },
      { rentalMonth: 'September 2026', paymentDate: null, dueOn: '2026-09-05' }
    ],
    'PV-103': [
      { rentalMonth: 'January 2026', paymentDate: '2026-01-31' },
      { rentalMonth: 'February 2026', paymentDate: '2026-02-28' },
      { rentalMonth: 'March 2026', paymentDate: '2026-03-31' },
      { rentalMonth: 'April 2026', paymentDate: '2026-04-30' },
      { rentalMonth: 'May 2026', paymentDate: '2026-05-31' },
      { rentalMonth: 'June 2026', paymentDate: '2026-06-30' },
      { rentalMonth: 'July 2026', paymentDate: '2026-07-31' },
      { rentalMonth: 'August 2026', paymentDate: '2026-08-31' },
      { rentalMonth: 'September 2026', paymentDate: null, dueOn: '2026-09-30' }
    ],
    'PV-106': [
      { rentalMonth: 'February 2026', paymentDate: '2026-02-24' },
      { rentalMonth: 'March 2026', paymentDate: '2026-03-25' },
      { rentalMonth: 'April 2026', paymentDate: '2026-04-25' },
      { rentalMonth: 'May 2026', paymentDate: '2026-05-26' },
      { rentalMonth: 'June 2026', paymentDate: '2026-06-24' },
      { rentalMonth: 'July 2026', paymentDate: '2026-07-25' },
      { rentalMonth: 'August 2026', paymentDate: null, dueOn: '2026-08-25' }
    ]
  };

  /* localStorage-aware helpers so BOOK-069/075 "processing" actions feel real
     within a demo session without mutating the base arrays above. */
  function safeParse(key, fallback) {
    try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
  }
  BOOK.getRateStatusOverrides = function () { return safeParse('mm_rate_status_overrides', {}); };
  BOOK.saveRateStatusOverride = function (villaId, fields) {
    var overrides = BOOK.getRateStatusOverrides();
    overrides[villaId] = Object.assign({}, overrides[villaId] || {}, fields);
    localStorage.setItem('mm_rate_status_overrides', JSON.stringify(overrides));
  };
  BOOK.getRateStatusLogExtra = function () { return safeParse('mm_rate_status_log_extra', {}); };
  BOOK.appendRateStatusLog = function (villaId, entry) {
    var extra = BOOK.getRateStatusLogExtra();
    extra[villaId] = (extra[villaId] || []).concat([entry]);
    localStorage.setItem('mm_rate_status_log_extra', JSON.stringify(extra));
  };
  // Effective status + history, merging localStorage session overrides over the base mock.
  BOOK.getEffectiveRateStatus = function (villaId) {
    var base = BOOK.rateStatusByVilla(villaId);
    var overrides = BOOK.getRateStatusOverrides();
    return overrides[villaId] ? Object.assign({}, base, overrides[villaId]) : base;
  };
  BOOK.getEffectiveHistory = function (villaId) {
    var base = (BOOK.RATE_STATUS_LOG[villaId] || []).slice();
    var extra = BOOK.getRateStatusLogExtra()[villaId] || [];
    return base.concat(extra);
  };
  BOOK.getEffectiveMonthlyOverview = function () {
    var overrides = BOOK.getRateStatusOverrides();
    return BOOK.RATE_STATUS.map(function (r) {
      return overrides[r.villaId] ? Object.assign({}, r, overrides[r.villaId]) : r;
    }).filter(function (r) { return r.type === 'Monthly'; })
      .sort(function (a, b) { return new Date(a.nextDueDate || 0) - new Date(b.nextDueDate || 0); });
  };

  /* ---------------------------------------------------------------- */
  /* Seasons (BOOK-073/074) — declared per Region, shared by every     */
  /* villa in that region.                                              */
  /* ---------------------------------------------------------------- */
  var SEASON_COLORS = { 'Low Season': '#8A94A6', 'Mid Season': '#3141C0', 'High Season': '#F2A93C', 'Peak Season': '#F04438' };
  BOOK.seasonColor = function (name) { return SEASON_COLORS[name] || '#4C5FFF'; };

  BOOK.SEASONS_BASE = {
    'RG-01': [ // Phuket Collection
      { id: 'SSN-01', name: 'Low Season', start: '2026-01-01', end: '2026-02-28' },
      { id: 'SSN-02', name: 'Mid Season', start: '2026-03-01', end: '2026-06-30' },
      { id: 'SSN-03', name: 'High Season', start: '2026-07-01', end: '2026-10-31' },
      { id: 'SSN-04', name: 'Peak Season', start: '2026-11-01', end: '2026-12-31' }
    ],
    'RG-02': [ // Bali Retreats
      { id: 'SSN-05', name: 'Low Season', start: '2026-01-01', end: '2026-03-31' },
      { id: 'SSN-06', name: 'High Season', start: '2026-04-01', end: '2026-09-30' },
      { id: 'SSN-07', name: 'Peak Season', start: '2026-10-01', end: '2026-12-31' }
    ],
    'RG-03': [] // Koh Samui Estates — no seasons declared yet (realistic copy-to target)
  };
  BOOK.SEASONS_BASE['RG-01'].forEach(function (s) { s.duration = daysBetween(s.start, s.end); });
  BOOK.SEASONS_BASE['RG-02'].forEach(function (s) { s.duration = daysBetween(s.start, s.end); });

  BOOK.getSeasons = function (regionId) {
    var saved = safeParse('mm_seasons', {});
    if (saved[regionId]) return saved[regionId];
    return (BOOK.SEASONS_BASE[regionId] || []).slice();
  };
  BOOK.saveSeasons = function (regionId, seasons) {
    var saved = safeParse('mm_seasons', {});
    saved[regionId] = seasons;
    localStorage.setItem('mm_seasons', JSON.stringify(saved));
  };
  BOOK.regionsWithSeasons = function () {
    return BOOK.REGIONS.filter(function (r) { return BOOK.getSeasons(r.id).length > 0; });
  };
  BOOK.regionsWithoutSeasons = function () {
    return BOOK.REGIONS.filter(function (r) { return BOOK.getSeasons(r.id).length === 0; });
  };

  /* ---------------------------------------------------------------- */
  /* Seasonal price reconciliation (BOOK-074) — VM (internal) price vs */
  /* Beds24 (OTA) price, per villa per season, plus a daily price log   */
  /* for villas where the two sources already match.                   */
  /* ---------------------------------------------------------------- */
  BOOK.SEASON_PRICE_DATA = {
    'PV-101': { discrepancy: false }, // Villa Sapphire Cliff — matched, shows daily log
    'PV-102': { discrepancy: false }, // Villa Coral Horizon — matched
    'PV-103': { // Villa Emerald Bay — mismatch vs Beds24
      discrepancy: true,
      comparison: {
        'SSN-05': { vm: 1450, beds24: 1450 },
        'SSN-06': { vm: 1890, beds24: 'Missing' },
        'SSN-07': { vm: 2600, beds24: 'Mixed-up 2400-2750' }
      }
    },
    'PV-104': { discrepancy: false },
    'PV-106': {
      discrepancy: true,
      comparison: { 'SSN-05': { vm: 1050, beds24: 'N/A' }, 'SSN-06': { vm: 1050, beds24: 'Part. missing' }, 'SSN-07': { vm: 1050, beds24: 'N/A' } }
    },
    'PV-108': { discrepancy: false }
  };

  function ratedSeasonsForVilla(villaId) {
    var regionId = BOOK.villaRegionId(villaId);
    return BOOK.getSeasons(regionId);
  }
  BOOK.ratedSeasonsForVilla = ratedSeasonsForVilla;

  // Synthesized daily price log (last 6 recorded rows, most recent first) for
  // "matched" villas — each row carries a price per season + % change vs the row below it.
  BOOK.getDailyPriceLog = function (villaId) {
    var villa = BOOK.villaById(villaId);
    var seasons = ratedSeasonsForVilla(villaId);
    var baseRate = (villa && villa.rate) || 1000;
    var dates = ['2026-09-02', '2026-08-26', '2026-08-19', '2026-08-12', '2026-08-05', '2026-07-29'];
    var wobble = [0, -3, 2, -1, 4, 0]; // % applied per row, deterministic (no Math.random for stable demo)
    var rows = dates.map(function (d, i) {
      var prices = {};
      seasons.forEach(function (s, si) {
        var seasonFactor = 1 + si * 0.18; // later-declared seasons priced higher, deterministic
        prices[s.id] = Math.round(baseRate * seasonFactor * (1 + wobble[i] / 100) / 10) * 10;
      });
      return { date: d, prices: prices };
    });
    rows.forEach(function (row, i) {
      row.change = {};
      var prev = rows[i + 1];
      seasons.forEach(function (s) {
        if (!prev) { row.change[s.id] = null; return; }
        var diff = row.prices[s.id] - prev.prices[s.id];
        row.change[s.id] = diff === 0 ? 'flat' : (diff > 0 ? 'up' : 'down');
      });
    });
    return rows;
  };

  // Mode 2 "Season Revenue" KPI block — Last year / Current / Future for 4 metric groups.
  BOOK.getSeasonRevenueKpi = function (villaId, seasonId) {
    var seed = (villaId.charCodeAt(3) + seasonId.charCodeAt(4)) % 7;
    return {
      occupancy: { last: 62 + seed, current: 71 + seed, future: 66 + seed },
      price: { last: 950 + seed * 20, current: 1050 + seed * 20, future: 1120 + seed * 20 },
      revenue: { last: 3 + seed, current: 9 - seed, future: 5 + seed },
      advance: { last: 0, current: 12 + seed, future: 48 + seed * 3 }
    };
  };
  // Small deterministic series for the 3 in-page charts (Mode 2).
  BOOK.getSeasonCharts = function (villaId, seasonId) {
    var seed = (villaId.charCodeAt(3) + seasonId.charCodeAt(4)) % 5;
    function series(base, spread, n) {
      var out = [];
      for (var i = 0; i < n; i++) out.push(Math.round(base + Math.sin(i + seed) * spread));
      return out;
    }
    return {
      occupancy: series(60 + seed * 3, 14, 8),
      priceHistory: series(1000 + seed * 15, 60, 8),
      avgPriceByYear: { years: ['2022', '2023', '2024', '2025', '2026'], values: series(900 + seed * 10, 90, 5) }
    };
  };

  /* ---------------------------------------------------------------- */
  /* Rate Change Log (BOOK-070/071/072) — free-text notes at Property / */
  /* Residence / Unit level, enriched with old/new rate + reason so the */
  /* "Action" text reads as a real change record.                       */
  /* ---------------------------------------------------------------- */
  BOOK.RATE_CHANGE_LOG_BASE = [
    { id: 'RCL-01', date: '2026-08-25', entryLevel: 'Property', villaId: 'PV-101', oldRate: 1100, newRate: 1200, reason: 'High season adjustment', by: 'Somchai Anuwat' },
    { id: 'RCL-02', date: '2026-08-20', entryLevel: 'Property', villaId: 'PV-103', oldRate: 1350, newRate: 1450, reason: 'Owner-requested increase', by: 'Wayan Kertha' },
    { id: 'RCL-03', date: '2026-08-14', entryLevel: 'Property', villaId: 'PV-106', oldRate: 980, newRate: 1050, reason: 'Peak season adjustment', by: 'Nok Pattaya' },
    { id: 'RCL-04', date: '2026-08-05', entryLevel: 'Property', villaId: 'PV-108', oldRate: 1500, newRate: 1600, reason: 'Renovation completed — repositioned', by: 'Wayan Kertha' },
    { id: 'RCL-05', date: '2026-07-28', entryLevel: 'Property', villaId: 'PV-102', oldRate: 900, newRate: 950, reason: 'Annual review', by: 'Somchai Anuwat' },
    { id: 'RCL-06', date: '2026-07-19', entryLevel: 'Property', villaId: 'PV-104', oldRate: 820, newRate: 780, reason: 'Low season correction', by: 'Wayan Kertha' },
    { id: 'RCL-07', date: '2026-06-30', entryLevel: 'Property', villaId: 'PV-101', oldRate: 1000, newRate: 1100, reason: 'Mid season adjustment', by: 'Somchai Anuwat' },
    { id: 'RCL-08', date: '2026-06-12', entryLevel: 'Property', villaId: 'PV-103', oldRate: 1250, newRate: 1350, reason: 'Owner-requested increase', by: 'Wayan Kertha' }
  ];
  BOOK.getRateChangeLog = function () { return BOOK.loadMerged('mm_rate_change_log', BOOK.RATE_CHANGE_LOG_BASE); };
  BOOK.saveRateChangeLog = function (arr) { BOOK.saveAll('mm_rate_change_log', arr); };
  BOOK.rateChangeLogById = function (id) {
    var found = null;
    BOOK.getRateChangeLog().forEach(function (r) { if (r.id === id) found = r; });
    return found;
  };
  BOOK.rateChangeAction = function (r) {
    var villa = BOOK.villaById(r.villaId);
    return 'Rate changed from ' + BOOK.fmtMoney(r.oldRate) + ' to ' + BOOK.fmtMoney(r.newRate) + '/night — ' + r.reason + (villa ? '' : '');
  };

  /* ---------------------------------------------------------------- */
  /* Villa Rate Status list (BOOK-067/068 form helper) — flags villas   */
  /* that already have a rate-status log so "Search" auto-seeds a       */
  /* default Daily record only when one doesn't already exist.          */
  /* ---------------------------------------------------------------- */
  BOOK.ensureVillaHasRateLog = function (villaId) {
    if (BOOK.RATE_STATUS_LOG[villaId] && BOOK.RATE_STATUS_LOG[villaId].length) return false;
    var extra = BOOK.getRateStatusLogExtra();
    if (extra[villaId] && extra[villaId].length) return false;
    BOOK.appendRateStatusLog(villaId, { since: '2020-01-01', till: null, status: 'Daily', note: 'Default daily rate (auto-created on first lookup).' });
    return true;
  };

})();
