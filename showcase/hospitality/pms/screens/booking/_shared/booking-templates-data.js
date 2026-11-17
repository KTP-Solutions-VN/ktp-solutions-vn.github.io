/* ==========================================================================
   Booking module — additional shared mock data & helpers for BOOK-056..065
   (OTA revenue-share reconciliation, confirmation templates + translations,
   booking exclusions, unlinked bookings). Extends window.MM.BOOK — never
   redefines anything already in booking-data.js. Loaded after
   booking-data.js and before the screen's own script.js.
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

  /* ---------------------------------------------------------------- */
  /* Shared lookups                                                     */
  /* ---------------------------------------------------------------- */
  BOOK.LANGUAGES = ['English', 'Thai', 'Bahasa Indonesia', 'French', 'German'];
  BOOK.CURRENCIES = ['USD', 'THB', 'IDR', 'EUR'];
  BOOK.FX_RATES = { USD: 1, THB: 36.2, IDR: 15850, EUR: 0.92 };
  BOOK.CURRENCY_SYMBOL = { USD: '$', THB: '฿', IDR: 'Rp', EUR: '€' };
  BOOK.BUSINESS_UNITS = ['Phuket Collection', 'Bali Retreats', 'Koh Samui Estates'];

  BOOK.fmtCurrency = function (n, code) {
    code = code || 'USD';
    if (n === null || n === undefined || isNaN(n)) return '—';
    var sym = BOOK.CURRENCY_SYMBOL[code] || code + ' ';
    var decimals = code === 'IDR' ? 0 : 0;
    return sym + Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  /* ---------------------------------------------------------------- */
  /* Seeded PRNG (mulberry32) — deterministic "random" mock numbers so  */
  /* the same villa/channel/period always renders the same reconciled  */
  /* figures instead of flickering on every re-render.                  */
  /* ---------------------------------------------------------------- */
  function hashStr(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) { h = (Math.imul(31, h) + s.charCodeAt(i)) | 0; }
    return h >>> 0;
  }
  function seededRand(seed) {
    var t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  BOOK.seededRand = seededRand;
  BOOK.hashStr = hashStr;

  /* ---------------------------------------------------------------- */
  /* BOOK-056 — OTA revenue-share reconciliation                        */
  /* Deterministic mock reconciliation numbers per villa/channel/period.*/
  /* ---------------------------------------------------------------- */
  BOOK.otaShareForVilla = function (villaId, periodOffset) {
    return BOOK.OTA_CHANNELS.map(function (ch) {
      var seed = hashStr(villaId + '|' + ch + '|' + periodOffset);
      var r1 = seededRand(seed);
      var r2 = seededRand(seed + 17);
      var revenue = Math.round(4000 + r1 * 16000);
      var commissionRate = 0.06 + r2 * 0.09; // 6%-15%
      var commission = Math.round(revenue * commissionRate);
      return { channel: ch, revenue: revenue, commission: commission, commissionRate: commissionRate };
    });
  };

  /* ---------------------------------------------------------------- */
  /* BOOK-057/058/059/060 — Booking confirmation templates              */
  /* One row per language (spec: "each language has only 1 template"). */
  /* ---------------------------------------------------------------- */
  BOOK.CONFIRMATION_TEMPLATES = [
    {
      id: 'CT-01', language: 'English', templateName: 'Standard Owner Confirmation (EN)',
      businessUnits: ['Phuket Collection', 'Bali Retreats', 'Koh Samui Estates'],
      createdBy: 'Somchai Anuwat', on: '2026-03-02',
      companyName: 'Azura Stays Villas', address1: '88 Beach Road', address2: 'Kathu District', address3: 'Phuket 83150, Thailand',
      phone: '+66 76 123 456', email: 'reservations@azurastays.example', website: 'www.azurastays.example',
      taxId: '0105558012345', companyShortName: 'Azura Stays', signatoryName: 'Somchai Anuwat',
      currency: 'USD', replyEmail: 'no-reply@azurastays.example', logo: null
    },
    {
      id: 'CT-02', language: 'Thai', templateName: 'Standard Owner Confirmation (TH)',
      businessUnits: ['Phuket Collection'],
      createdBy: 'Wayan Kertha', on: '2026-03-10',
      companyName: 'Azura Stays Villas', address1: '88 ถนนหาดใหญ่', address2: 'อำเภอกะทู้', address3: 'ภูเก็ต 83150',
      phone: '+66 76 123 456', email: 'reservations@azurastays.example', website: 'www.azurastays.example',
      taxId: '0105558012345', companyShortName: 'คลับ มิรากูล', signatoryName: 'Somchai Anuwat',
      currency: 'THB', replyEmail: 'no-reply@azurastays.example', logo: null
    },
    {
      id: 'CT-03', language: 'Bahasa Indonesia', templateName: 'Standard Owner Confirmation (ID)',
      businessUnits: ['Bali Retreats'],
      createdBy: 'Nok Pattaya', on: '2026-04-01',
      companyName: 'Azura Stays Villas', address1: 'Jl. Pantai Berawa No. 21', address2: 'Canggu', address3: 'Bali 80361, Indonesia',
      phone: '+62 361 555 0199', email: 'reservations.bali@azurastays.example', website: 'www.azurastays.example',
      taxId: '01.234.567.8-901.000', companyShortName: 'Azura Stays Bali', signatoryName: 'Nok Pattaya',
      currency: 'IDR', replyEmail: 'no-reply@azurastays.example', logo: null
    },
    {
      id: 'CT-04', language: 'French', templateName: 'Confirmation Propriétaire Standard (FR)',
      businessUnits: ['Bali Retreats', 'Koh Samui Estates'],
      createdBy: 'Somchai Anuwat', on: '2026-05-14',
      companyName: 'Azura Stays Villas', address1: '88 Beach Road', address2: 'Kathu District', address3: 'Phuket 83150, Thaïlande',
      phone: '+66 76 123 456', email: 'reservations@azurastays.example', website: 'www.azurastays.example',
      taxId: '0105558012345', companyShortName: 'Azura Stays', signatoryName: 'Somchai Anuwat',
      currency: 'EUR', replyEmail: 'no-reply@azurastays.example', logo: null
    },
    {
      id: 'CT-05', language: 'German', templateName: 'Standard-Eigentümerbestätigung (DE)',
      businessUnits: ['Koh Samui Estates'],
      createdBy: 'Wayan Kertha', on: '2026-06-02',
      companyName: 'Azura Stays Villas', address1: '88 Beach Road', address2: 'Kathu District', address3: 'Phuket 83150, Thailand',
      phone: '+66 76 123 456', email: 'reservations@azurastays.example', website: 'www.azurastays.example',
      taxId: '0105558012345', companyShortName: 'Azura Stays', signatoryName: 'Wayan Kertha',
      currency: 'EUR', replyEmail: 'no-reply@azurastays.example', logo: null
    }
  ];

  var CT_EXTRA_KEY = 'mm_confirmation_templates_extra';
  var CT_EDITS_KEY = 'mm_confirmation_templates_edits';
  var CT_DELETED_KEY = 'mm_confirmation_templates_deleted';

  BOOK.getAllTemplates = function () {
    var extra = safeParse(CT_EXTRA_KEY, []);
    var edits = safeParse(CT_EDITS_KEY, {});
    var deleted = safeParse(CT_DELETED_KEY, []);
    var merged = BOOK.CONFIRMATION_TEMPLATES.concat(extra).filter(function (t) { return deleted.indexOf(t.id) === -1; });
    return merged.map(function (t) { return edits[t.id] ? Object.assign({}, t, edits[t.id]) : t; });
  };
  BOOK.getTemplateById = function (id) {
    var found = null;
    BOOK.getAllTemplates().forEach(function (t) { if (t.id === id) found = t; });
    return found;
  };
  BOOK.addTemplate = function (fields) {
    var extra = safeParse(CT_EXTRA_KEY, []);
    var id = MM.uid('CT');
    var row = Object.assign({ id: id, createdBy: 'Somchai Anuwat', on: new Date().toISOString().slice(0, 10) }, fields);
    extra.unshift(row);
    safeSet(CT_EXTRA_KEY, extra);
    return row;
  };
  BOOK.saveTemplateEdit = function (id, fields) {
    var edits = safeParse(CT_EDITS_KEY, {});
    edits[id] = Object.assign({}, edits[id] || {}, fields);
    safeSet(CT_EDITS_KEY, edits);
  };
  BOOK.deleteTemplate = function (id) {
    var deleted = safeParse(CT_DELETED_KEY, []);
    deleted.push(id);
    safeSet(CT_DELETED_KEY, deleted);
  };

  /* ---------------------------------------------------------------- */
  /* BOOK-061 — Confirmation template translations                      */
  /* ---------------------------------------------------------------- */
  BOOK.CONFIRMATION_TEXT_STRINGS = [
    { id: 'TXT-01', text: 'Booking Confirmation' },
    { id: 'TXT-02', text: 'Dear Villa Owner,' },
    { id: 'TXT-03', text: 'Guest Name' },
    { id: 'TXT-04', text: 'Check-in Date' },
    { id: 'TXT-05', text: 'Check-out Date' },
    { id: 'TXT-06', text: 'Number of Nights' },
    { id: 'TXT-07', text: 'Total Booking Value' },
    { id: 'TXT-08', text: 'Commission' },
    { id: 'TXT-09', text: 'Net Payable to Owner' },
    { id: 'TXT-10', text: 'Thank you for your continued partnership with Azura Stays.' }
  ];

  BOOK.CONFIRMATION_TRANSLATIONS_SEED = {
    'TXT-01': { Thai: 'การยืนยันการจอง', French: 'Confirmation de réservation' },
    'TXT-02': { Thai: 'เรียน เจ้าของวิลลา', French: 'Cher propriétaire,' },
    'TXT-03': { Thai: 'ชื่อแขก', French: 'Nom du client' },
    'TXT-04': { Thai: 'วันเช็กอิน', French: 'Date d’arrivée' },
    'TXT-05': { Thai: 'วันเช็คเกาส์', French: 'Date de départ' },
    'TXT-06': { French: 'Nombre de nuits' },
    'TXT-07': { French: 'Valeur totale de la réservation' }
  };

  var CTX_EXTRA_KEY = 'mm_confirmation_text_strings_extra';
  var CTX_DELETED_KEY = 'mm_confirmation_text_strings_deleted';
  var CTX_TRANSLATIONS_KEY = 'mm_confirmation_translations';

  BOOK.getTextStrings = function () {
    var extra = safeParse(CTX_EXTRA_KEY, []);
    var deleted = safeParse(CTX_DELETED_KEY, []);
    return BOOK.CONFIRMATION_TEXT_STRINGS.concat(extra).filter(function (t) { return deleted.indexOf(t.id) === -1; });
  };
  BOOK.addTextString = function (text) {
    var extra = safeParse(CTX_EXTRA_KEY, []);
    var row = { id: MM.uid('TXT'), text: text };
    extra.push(row);
    safeSet(CTX_EXTRA_KEY, extra);
    return row;
  };
  BOOK.deleteTextString = function (id) {
    var deleted = safeParse(CTX_DELETED_KEY, []);
    deleted.push(id);
    safeSet(CTX_DELETED_KEY, deleted);
    var overrides = safeParse(CTX_TRANSLATIONS_KEY, {});
    delete overrides[id];
    safeSet(CTX_TRANSLATIONS_KEY, overrides);
  };
  BOOK.getTranslation = function (stringId, lang) {
    var overrides = safeParse(CTX_TRANSLATIONS_KEY, {});
    if (overrides[stringId] && overrides[stringId][lang] !== undefined) return overrides[stringId][lang];
    var seed = BOOK.CONFIRMATION_TRANSLATIONS_SEED[stringId];
    return (seed && seed[lang]) || '';
  };
  BOOK.saveTranslation = function (stringId, lang, text) {
    var overrides = safeParse(CTX_TRANSLATIONS_KEY, {});
    overrides[stringId] = Object.assign({}, overrides[stringId] || {}, {});
    overrides[stringId][lang] = text;
    safeSet(CTX_TRANSLATIONS_KEY, overrides);
  };
  BOOK.deleteTranslation = function (stringId, lang) {
    var overrides = safeParse(CTX_TRANSLATIONS_KEY, {});
    if (overrides[stringId]) { overrides[stringId][lang] = ''; }
    safeSet(CTX_TRANSLATIONS_KEY, overrides);
  };

  /* ---------------------------------------------------------------- */
  /* BOOK-062 — Booking exclusions (4 tabs)                              */
  /* ---------------------------------------------------------------- */
  BOOK.EXCLUSION_TABS = [
    { key: 'complete', label: 'Complete' },
    { key: 'nill_value', label: 'Nill Value' },
    { key: 'early', label: 'Early' },
    { key: 'late', label: 'Late' }
  ];

  BOOK.EXCLUSION_KEYWORDS = {
    complete: [
      { id: 'EX-C01', keyword: 'Halstead Family (Owner)', addedBy: 'Somchai Anuwat', on: '2026-01-12' },
      { id: 'EX-C02', keyword: 'Test Booking - Ignore', addedBy: 'Wayan Kertha', on: '2026-02-03' },
      { id: 'EX-C03', keyword: 'Chen Owner Stay', addedBy: 'Somchai Anuwat', on: '2026-03-18' }
    ],
    nill_value: [
      { id: 'EX-N01', keyword: 'Staff Comp Night', addedBy: 'Nok Pattaya', on: '2026-02-20' },
      { id: 'EX-N02', keyword: 'Moreau Friends & Family', addedBy: 'Wayan Kertha', on: '2026-04-05' }
    ],
    early: [
      { id: 'EX-E01', keyword: 'Early Access QA - Nair', addedBy: 'Somchai Anuwat', on: '2026-05-11' }
    ],
    late: [
      { id: 'EX-L01', keyword: 'Late Season Adjustment - Moreau', addedBy: 'Nok Pattaya', on: '2026-06-22' },
      { id: 'EX-L02', keyword: 'Late Cancellation Waiver', addedBy: 'Wayan Kertha', on: '2026-07-02' }
    ]
  };

  BOOK.getExclusions = function (tab) {
    var raw = localStorage.getItem('mm_booking_exclusions_' + tab);
    if (raw) { try { return JSON.parse(raw); } catch (e) { /* fall through */ } }
    return (BOOK.EXCLUSION_KEYWORDS[tab] || []).slice();
  };
  BOOK.saveExclusions = function (tab, arr) {
    localStorage.setItem('mm_booking_exclusions_' + tab, JSON.stringify(arr));
  };

  /* ---------------------------------------------------------------- */
  /* BOOK-063 — Unlinked bookings                                       */
  /* Booking ids sourced from an OTA channel whose Booking.is_channel_   */
  /* modify flag is still 0 in this demo dataset (not yet synced).      */
  /* ---------------------------------------------------------------- */
  BOOK.UNLINKED_BOOKING_IDS = ['BK-10231', 'BK-10232', 'BK-10233', 'BK-10238', 'BK-10239'];

})();
