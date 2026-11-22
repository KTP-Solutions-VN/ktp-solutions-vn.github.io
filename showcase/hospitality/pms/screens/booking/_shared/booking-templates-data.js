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
  BOOK.LANGUAGES = ['English', 'Malay', 'Chinese', 'French', 'German'];
  BOOK.CURRENCIES = ['USD', 'SGD', 'AUD', 'EUR'];
  BOOK.FX_RATES = { USD: 1, SGD: 1.34, AUD: 1.52, EUR: 0.92 };
  BOOK.CURRENCY_SYMBOL = { USD: '$', SGD: 'S$', AUD: 'A$', EUR: '€' };
  BOOK.BUSINESS_UNITS = ['Sentosa Collection', 'Byron Bay Retreats', 'Noosa Estates'];

  BOOK.fmtCurrency = function (n, code) {
    code = code || 'USD';
    if (n === null || n === undefined || isNaN(n)) return '—';
    var sym = BOOK.CURRENCY_SYMBOL[code] || code + ' ';
    var decimals = code === 'AUD' ? 0 : 0;
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
      businessUnits: ['Sentosa Collection', 'Byron Bay Retreats', 'Noosa Estates'],
      createdBy: 'Daniel Tan', on: '2026-03-02',
      companyName: 'Azura Stays Villas', address1: '88 Ocean Drive', address2: 'Sentosa Cove', address3: 'Singapore 098297',
      phone: '+65 6612 3456', email: 'reservations@azurastays.example', website: 'www.azurastays.example',
      taxId: '201912345K', companyShortName: 'Azura Stays', signatoryName: 'Daniel Tan',
      currency: 'USD', replyEmail: 'no-reply@azurastays.example', logo: null
    },
    {
      id: 'CT-02', language: 'Malay', templateName: 'Standard Owner Confirmation (MS)',
      businessUnits: ['Sentosa Collection'],
      createdBy: 'Warren Kelly', on: '2026-03-10',
      companyName: 'Azura Stays Villas', address1: '88 Ocean Drive', address2: 'Sentosa Cove', address3: 'Singapura 098297',
      phone: '+65 6612 3456', email: 'reservations@azurastays.example', website: 'www.azurastays.example',
      taxId: '201912345K', companyShortName: 'Azura Stays', signatoryName: 'Daniel Tan',
      currency: 'SGD', replyEmail: 'no-reply@azurastays.example', logo: null
    },
    {
      id: 'CT-03', language: 'Chinese', templateName: 'Standard Owner Confirmation (ZH)',
      businessUnits: ['Byron Bay Retreats'],
      createdBy: 'Nicole Parker', on: '2026-04-01',
      companyName: 'Azura Stays Villas', address1: '21 Lawson Street', address2: 'Byron Bay', address3: 'NSW 2481, Australia',
      phone: '+61 2 6685 0199', email: 'reservations.byronbay@azurastays.example', website: 'www.azurastays.example',
      taxId: '51 824 753 556', companyShortName: 'Azura Stays Byron Bay', signatoryName: 'Nicole Parker',
      currency: 'AUD', replyEmail: 'no-reply@azurastays.example', logo: null
    },
    {
      id: 'CT-04', language: 'French', templateName: 'Confirmation Propriétaire Standard (FR)',
      businessUnits: ['Byron Bay Retreats', 'Noosa Estates'],
      createdBy: 'Daniel Tan', on: '2026-05-14',
      companyName: 'Azura Stays Villas', address1: '88 Ocean Drive', address2: 'Sentosa Cove', address3: 'Singapour 098297',
      phone: '+65 6612 3456', email: 'reservations@azurastays.example', website: 'www.azurastays.example',
      taxId: '201912345K', companyShortName: 'Azura Stays', signatoryName: 'Daniel Tan',
      currency: 'EUR', replyEmail: 'no-reply@azurastays.example', logo: null
    },
    {
      id: 'CT-05', language: 'German', templateName: 'Standard-Eigentümerbestätigung (DE)',
      businessUnits: ['Noosa Estates'],
      createdBy: 'Warren Kelly', on: '2026-06-02',
      companyName: 'Azura Stays Villas', address1: '88 Ocean Drive', address2: 'Sentosa Cove', address3: 'Singapore 098297',
      phone: '+65 6612 3456', email: 'reservations@azurastays.example', website: 'www.azurastays.example',
      taxId: '201912345K', companyShortName: 'Azura Stays', signatoryName: 'Warren Kelly',
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
    var row = Object.assign({ id: id, createdBy: 'Daniel Tan', on: new Date().toISOString().slice(0, 10) }, fields);
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
    'TXT-01': { Malay: 'Pengesahan Tempahan', French: 'Confirmation de réservation' },
    'TXT-02': { Malay: 'Pemilik Vila yang dihormati,', French: 'Cher propriétaire,' },
    'TXT-03': { Malay: 'Nama Tetamu', French: 'Nom du client' },
    'TXT-04': { Malay: 'Tarikh Daftar Masuk', French: 'Date d’arrivée' },
    'TXT-05': { Malay: 'Tarikh Daftar Keluar', French: 'Date de départ' },
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
      { id: 'EX-C01', keyword: 'Halstead Family (Owner)', addedBy: 'Daniel Tan', on: '2026-01-12' },
      { id: 'EX-C02', keyword: 'Test Booking - Ignore', addedBy: 'Warren Kelly', on: '2026-02-03' },
      { id: 'EX-C03', keyword: 'Chen Owner Stay', addedBy: 'Daniel Tan', on: '2026-03-18' }
    ],
    nill_value: [
      { id: 'EX-N01', keyword: 'Staff Comp Night', addedBy: 'Nicole Parker', on: '2026-02-20' },
      { id: 'EX-N02', keyword: 'Moreau Friends & Family', addedBy: 'Warren Kelly', on: '2026-04-05' }
    ],
    early: [
      { id: 'EX-E01', keyword: 'Early Access QA - Nair', addedBy: 'Daniel Tan', on: '2026-05-11' }
    ],
    late: [
      { id: 'EX-L01', keyword: 'Late Season Adjustment - Moreau', addedBy: 'Nicole Parker', on: '2026-06-22' },
      { id: 'EX-L02', keyword: 'Late Cancellation Waiver', addedBy: 'Warren Kelly', on: '2026-07-02' }
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
