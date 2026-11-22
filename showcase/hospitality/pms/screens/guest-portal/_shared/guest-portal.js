/* ==========================================================================
   Guest Portal — shared data & shell behavior (GST-001..GST-011)
   Loaded after assets/js/global.js and before each screen's own script.js.
   Exposes window.GST.* — mirrors the MM.* / CM.* namespace pattern used
   elsewhere in the prototype. All bookings/guest identity reuse the shared
   MM.MOCK_GUESTS / MM.MOCK_PROPERTIES / MM.MOCK_STAFF casts from global.js
   so "James Whitfield" / "Villa Sapphire Cliff" match the rest of the app.
   ========================================================================== */

(function () {
  'use strict';

  var SESSION_KEY = 'mm_guest_portal_session';
  var ACTIVE_BOOKING_KEY = 'mm_guest_portal_active_booking';
  var PREARRIVAL_KEY = 'mm_guest_portal_prearrival';
  var VALID_ACCESS_CODE = 'AZURA-JW2026';
  var TODAY_ISO = '2026-09-02';

  /* ---------------------------------------------------------------- */
  /* Guest identity — reuse MM.MOCK_GUESTS, don't invent a new one     */
  /* ---------------------------------------------------------------- */

  var GUEST = { id: 'GST-01', name: 'James Whitfield', email: 'james.whitfield@example.com', country: 'United Kingdom' };
  if (window.MM && MM.MOCK_GUESTS) {
    var found = MM.MOCK_GUESTS.filter(function (g) { return g.id === 'GST-01'; })[0];
    if (found) GUEST = found;
  }

  function initials(name) {
    return name.split(' ').filter(Boolean).map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase();
  }
  GUEST.initials = initials(GUEST.name);

  /* ---------------------------------------------------------------- */
  /* Villas — extends MM.MOCK_PROPERTIES (PV-101 / PV-105) with the    */
  /* guest-facing fields the legacy Villa/VillaLocation tables carried  */
  /* ---------------------------------------------------------------- */

  var VILLAS = {
    'PV-101': {
      id: 'PV-101', name: 'Villa Sapphire Cliff', bu: 'Sentosa Collection', bedrooms: 5, maxGuests: 10,
      concierge: 'Daniel Tan', conciergePhone: '+65 9234 5678',
      address: '8 Cove Drive, Sentosa Cove, Singapore 098297', district: 'Sentosa Cove',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tanjong+Beach+Sentosa+Singapore',
      standardCheckIn: '15:00', standardCheckOut: '11:00',
      wifiSsid: 'SapphireCliff_Guest', wifiPassword: 'Ocean2026!',
      description: 'Perched above the Singapore Strait, Villa Sapphire Cliff pairs five ocean-view suites with a 20-metre infinity pool, a private cinema and a full-time concierge team on call from the moment you land.',
      amenities: ['Private infinity pool', 'Full-time concierge', 'Daily housekeeping', 'Home theatre', 'Wine cellar', 'Gym & yoga deck', 'Complimentary airport transfer', 'High-speed Wi-Fi throughout']
    },
    'PV-105': {
      id: 'PV-105', name: 'Villa Marble Cove', bu: 'Sentosa Collection', bedrooms: 5, maxGuests: 9,
      concierge: 'Daniel Tan', conciergePhone: '+65 9234 5678',
      address: '12 Marble Cove Lane, Sentosa Cove, Singapore 098297', district: 'Sentosa Cove',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sentosa+Cove+Singapore',
      standardCheckIn: '15:00', standardCheckOut: '11:00',
      wifiSsid: 'MarbleCove_Guest', wifiPassword: 'Cove2026!',
      description: 'A cliffside retreat wrapped in tropical gardens, Villa Marble Cove looks out over a quiet cove just east of Tanjong Beach.',
      amenities: ['Private pool', 'Garden terrace', 'Daily housekeeping', 'BBQ pavilion']
    }
  };

  /* ---------------------------------------------------------------- */
  /* Bookings — James Whitfield's stays. BK-10231 also appears in      */
  /* MM.MOCK_BOOKINGS (Villa Sapphire Cliff, confirmed) and BK-10235   */
  /* (Villa Marble Cove, cancelled) — kept identical to that shared     */
  /* record for cross-module consistency. BK-10198 is a completed      */
  /* earlier stay, added here to give the guest a real "past" history. */
  /* ---------------------------------------------------------------- */

  var BOOKINGS = [
    { id: 'BK-10231', propertyId: 'PV-101', guestId: 'GST-01', checkIn: '2026-09-02', checkOut: '2026-09-09', status: 'confirmed', total: 8400 },
    { id: 'BK-10198', propertyId: 'PV-101', guestId: 'GST-01', checkIn: '2026-05-01', checkOut: '2026-05-06', status: 'completed', total: 3800 },
    { id: 'BK-10235', propertyId: 'PV-105', guestId: 'GST-01', checkIn: '2026-07-10', checkOut: '2026-07-14', status: 'cancelled', total: 3600 }
  ];

  function getBooking(id) { return BOOKINGS.filter(function (b) { return b.id === id; })[0] || null; }
  function getVilla(propertyId) { return VILLAS[propertyId] || null; }
  function upcomingBookings() { return BOOKINGS.filter(function (b) { return b.status === 'confirmed'; }); }
  function pastBookings() { return BOOKINGS.filter(function (b) { return b.status === 'completed' || b.status === 'cancelled'; }); }
  function nearestUpcoming() { var ups = upcomingBookings(); return ups.length ? ups[0] : null; }

  /* ---------------------------------------------------------------- */
  /* Session (access-code login)                                       */
  /* ---------------------------------------------------------------- */

  function getSession() { try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch (e) { return null; } }
  function setSession(s) { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); }
  function clearSession() { localStorage.removeItem(SESSION_KEY); }
  // Every other screen in this prototype is reachable without a real login gate
  // (Dashboard/Owner Portal work the same way) — auto-provision a session so
  // GST-002..011 render correctly if opened directly, while GST-001 itself
  // still implements the real access-code validation + redirect logic.
  function ensureSession() {
    var s = getSession();
    if (!s) { s = { guestId: GUEST.id, accessCode: VALID_ACCESS_CODE, loginAt: new Date().toISOString() }; setSession(s); }
    return s;
  }

  /* ---------------------------------------------------------------- */
  /* Active booking context (which stay the guest is currently viewing)*/
  /* ---------------------------------------------------------------- */

  function getActiveBookingId() {
    var stored = localStorage.getItem(ACTIVE_BOOKING_KEY);
    if (stored && getBooking(stored)) return stored;
    var nu = nearestUpcoming();
    return nu ? nu.id : (BOOKINGS[0] ? BOOKINGS[0].id : null);
  }
  function setActiveBookingId(id) { localStorage.setItem(ACTIVE_BOOKING_KEY, id); }

  /* ---------------------------------------------------------------- */
  /* Pre-arrival (estimated arrival/departure time confirmation)       */
  /* ---------------------------------------------------------------- */

  function getPreArrivalMap() { try { return JSON.parse(localStorage.getItem(PREARRIVAL_KEY)) || {}; } catch (e) { return {}; } }

  function defaultPreArrival(bookingId) {
    var b = getBooking(bookingId);
    if (b && b.status === 'completed') {
      return {
        arrival: { time: '15:30', place: 'at_the_property', status: 'approved', setBy: 'guest', updatedAt: b.checkIn + 'T10:00:00' },
        departure: { time: '10:30', status: 'approved', setBy: 'guest', updatedAt: b.checkIn + 'T10:05:00' }
      };
    }
    return {
      arrival: { time: '', place: 'at_the_property', status: 'no_action', setBy: null, updatedAt: null },
      departure: { time: '', status: 'no_action', setBy: null, updatedAt: null }
    };
  }

  function getPreArrival(bookingId) {
    var map = getPreArrivalMap();
    return map[bookingId] || defaultPreArrival(bookingId);
  }
  function setPreArrival(bookingId, data) {
    var map = getPreArrivalMap();
    map[bookingId] = data;
    localStorage.setItem(PREARRIVAL_KEY, JSON.stringify(map));
  }
  function resetPreArrival(bookingId) {
    var map = getPreArrivalMap();
    delete map[bookingId];
    localStorage.setItem(PREARRIVAL_KEY, JSON.stringify(map));
  }
  function isFullyConfirmed(bookingId) {
    var pa = getPreArrival(bookingId);
    return !!(pa.arrival.updatedAt && pa.departure.updatedAt);
  }

  /* ---------------------------------------------------------------- */
  /* "Home" smart redirect — mirrors legacy home_redirect behavior     */
  /* ---------------------------------------------------------------- */

  function homeHref() {
    var id = getActiveBookingId();
    if (!id) return '../gst-002-guest-booking-list/index.html';
    if (isFullyConfirmed(id)) return '../gst-004-amenities-access-portal/index.html';
    var b = getBooking(id);
    if (b && b.status === 'confirmed') return '../gst-003-my-booking-details/index.html';
    return '../gst-002-guest-booking-list/index.html';
  }

  /* ---------------------------------------------------------------- */
  /* Date formatting                                                    */
  /* ---------------------------------------------------------------- */

  var MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function fmtDate(iso) { var d = new Date(iso + 'T00:00:00'); return d.getDate() + ' ' + MONTHS_SHORT[d.getMonth()] + ' \'' + String(d.getFullYear()).slice(2); }
  function fmtDateLong(iso) { var d = new Date(iso + 'T00:00:00'); return DAYS_LONG[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS_LONG[d.getMonth()] + ' ' + d.getFullYear(); }
  function nightsBetween(checkIn, checkOut) { return Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000); }

  /* ---------------------------------------------------------------- */
  /* Restaurants near the villa (GST-008 / GST-009)                    */
  /* ---------------------------------------------------------------- */

  var RESTAURANTS = [
    { id: 'RST-01', name: 'The Cliff House', cuisine: 'Peranakan Fine Dining', rating: 4.8, address: '23 Tanjong Beach Walk, Sentosa, Singapore 098942', phone: '+65 6627 9118', hours: '17:00 – 23:00 daily', distanceM: 140, description: 'Clifftop Peranakan fine dining with candlelit tables over the Singapore Strait and a live jazz band most evenings.', menuUrl: 'https://example.com/menus/cliff-house', mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+Cliff+House+Sentosa' },
    { id: 'RST-02', name: 'The Beach Club Tanjong', cuisine: 'International, Beachfront', rating: 4.5, address: '5 Tanjong Beach Walk, Sentosa, Singapore 098942', phone: '+65 6627 9200', hours: '08:00 – 22:00 daily', distanceM: 90, description: 'Relaxed beachfront terrace serving all-day breakfast, wood-fired pizza and sunset cocktails, steps from the sand.', menuUrl: 'https://example.com/menus/beach-club-tanjong', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Beach+Club+Tanjong+Sentosa' },
    { id: 'RST-03', name: 'Sea Salt Restaurant & Bar', cuisine: 'Seafood, Fine Dining', rating: 4.7, address: '18 Ocean Way, Sentosa Cove, Singapore 098375', phone: '+65 6635 8888', hours: '12:00 – 22:30 daily', distanceM: 120, description: 'Elevated seafood tasting menus and an extensive wine list, set on a headland with panoramic ocean views.', menuUrl: 'https://example.com/menus/sea-salt', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sea+Salt+Restaurant+Sentosa' },
    { id: 'RST-04', name: 'Orchid Garden Restaurant', cuisine: 'Singaporean & Pan-Asian', rating: 4.4, address: '12 Cove Way, Sentosa Cove, Singapore 098296', phone: '+65 6627 9622', hours: '11:30 – 22:00 daily', distanceM: 165, description: 'Family-run garden restaurant known for its curries and fresh market seafood, a favourite with returning guests.', menuUrl: '', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Orchid+Garden+Restaurant+Sentosa' },
    { id: 'RST-05', name: 'Trattoria del Porto', cuisine: 'Italian', rating: 4.3, address: '38 Ocean Way, Sentosa Cove, Singapore 098375', phone: '+65 6627 9340', hours: '17:30 – 22:30, closed Tuesdays', distanceM: 180, description: 'Handmade pasta and wood-fired pizza from a Neapolitan chef, in a candlelit courtyard just off the beach road.', menuUrl: 'https://example.com/menus/trattoria-del-porto', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Trattoria+del+Porto+Sentosa' },
    { id: 'RST-06', name: 'Ember & Tide', cuisine: 'Grill & Seafood', rating: 4.6, address: '2 Ocean Way, Sentosa Cove, Singapore 098375', phone: '+65 6635 8900', hours: '17:00 – 23:00 daily', distanceM: 110, description: 'Open-flame grill house specialising in charcoal-fired seafood and prime cuts, best enjoyed at sunset.', menuUrl: 'https://example.com/menus/ember-and-tide', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ember+and+Tide+Sentosa' }
  ];
  function getRestaurant(id) { return RESTAURANTS.filter(function (r) { return r.id === id; })[0] || null; }

  var ACTIVE_RESTAURANT_KEY = 'mm_guest_portal_active_restaurant';
  function getActiveRestaurantId() { return localStorage.getItem(ACTIVE_RESTAURANT_KEY) || RESTAURANTS[0].id; }
  function setActiveRestaurantId(id) { localStorage.setItem(ACTIVE_RESTAURANT_KEY, id); }

  /* ---------------------------------------------------------------- */
  /* Landmarks near the villa (GST-010)                                */
  /* ---------------------------------------------------------------- */

  var LANDMARKS = [
    { id: 'LM-01', name: 'Tanjong Beach', blurb: 'A quieter stretch of sand than neighbouring Palawan — calm water, sunset views and beachfront cafés a short stroll from the villa.' },
    { id: 'LM-02', name: 'Fort Siloso Skywalk', blurb: 'One of Sentosa’s most photographed viewpoints, especially at sunset — roughly a 10-minute drive west.' },
    { id: 'LM-03', name: 'Supertree Grove', blurb: 'Towering vertical gardens at Gardens by the Bay with sweeping skyline views, about 30 minutes away.' },
    { id: 'LM-04', name: 'Buddha Tooth Relic Temple', blurb: 'Singapore’s most revered Buddhist temple complex, rich in gold detail and local ceremony — bring modest dress.' },
    { id: 'LM-05', name: 'Quayside Isle', blurb: 'Waterfront dining, boutiques and live music every evening, a 5-minute walk from the villa gate.' }
  ];

  /* ---------------------------------------------------------------- */
  /* Activities near the villa (GST-011) — static per legacy spec       */
  /* ---------------------------------------------------------------- */

  var ACTIVITY_LINKS = [
    { id: 'fitness-wellness', label: 'Fitness & Wellness', url: 'https://www.azurastays.example/green-season-activities/fitness-wellness.html', blurb: 'Sunrise yoga decks, boxing studios and spa retreats within easy reach of the villa.' },
    { id: 'shopping-entertainment', label: 'Shopping & Entertainment', url: 'https://www.azurastays.example/green-season-activities/shopping-entertainment.html', blurb: 'Boutique markets, beach bars and live entertainment along the Tanjong–Palawan coast.' },
    { id: 'indoor-outdoor-activities', label: 'Indoor & Outdoor Activities', url: 'https://www.azurastays.example/green-season-activities/indoor-outdoor-activities.html', blurb: 'From catamaran sunset cruises to cooking classes — things to do whatever the forecast.' }
  ];

  var ACTIVITY_SUGGESTIONS = [
    { id: 'ACT-01', name: 'Sunset Catamaran Cruise', category: 'Outdoor', note: 'Half-day, departs Sentosa Cove Marina' },
    { id: 'ACT-02', name: 'Peranakan Cooking Class', category: 'Indoor', note: '3 hours, small groups' },
    { id: 'ACT-03', name: 'Boxing Introductory Session', category: 'Fitness', note: '90 minutes, all levels' },
    { id: 'ACT-04', name: 'Night Safari Visit', category: 'Outdoor', note: 'Wildlife park after dark, half-day' },
    { id: 'ACT-05', name: 'Chinatown & Temple Tour', category: 'Outdoor', note: 'Half-day, private driver' },
    { id: 'ACT-06', name: 'Tanjong Beach Water Sports', category: 'Outdoor', note: 'Kayaking & stand-up paddleboard rental' }
  ];

  /* ---------------------------------------------------------------- */
  /* Rating stars (half-star aware)                                    */
  /* ---------------------------------------------------------------- */

  var STAR_FULL = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>';
  var STAR_HALF = '<svg viewBox="0 0 24 24"><defs><linearGradient id="half-grad"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent" stop-opacity="0"/></linearGradient></defs><path fill="url(#half-grad)" stroke="currentColor" stroke-width="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>';
  var STAR_EMPTY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>';

  function starsHtml(rating) {
    var full = Math.floor(rating);
    var half = (rating - full) >= 0.25 && (rating - full) < 0.75;
    var extraFull = (rating - full) >= 0.75;
    if (extraFull) full += 1;
    var empty = 5 - full - (half ? 1 : 0);
    var html = '<span class="stars">';
    for (var i = 0; i < full; i++) html += STAR_FULL;
    if (half) html += STAR_HALF;
    for (var j = 0; j < empty; j++) html += STAR_EMPTY;
    html += '<span class="stars__value">' + rating.toFixed(1) + '</span></span>';
    return html;
  }

  /* ---------------------------------------------------------------- */
  /* Shell wiring — logout links + nav dropdown click fallback          */
  /* (hover already opens the flyout via CSS on desktop/pointer input)  */
  /* ---------------------------------------------------------------- */

  function wireChrome() {
    var homeHrefValue = homeHref();
    document.querySelectorAll('[data-home-link]').forEach(function (el) { el.setAttribute('href', homeHrefValue); });

    document.querySelectorAll('[data-guest-logout]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        GST.clearSession();
        window.location.href = '../gst-001-guest-portal-login/index.html';
      });
    });

    document.querySelectorAll('.guest-nav__item[data-dropdown]').forEach(function (item) {
      var trigger = item.querySelector('.guest-nav__link');
      if (!trigger) return;
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        var wasOpen = item.classList.contains('open');
        document.querySelectorAll('.guest-nav__item.open').forEach(function (i) { i.classList.remove('open'); });
        if (!wasOpen) item.classList.add('open');
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.guest-nav__item')) {
        document.querySelectorAll('.guest-nav__item.open').forEach(function (i) { i.classList.remove('open'); });
      }
    });

    // Mobile nav toggle
    var mobileToggle = document.querySelector('[data-guest-nav-toggle]');
    var nav = document.querySelector('.guest-nav');
    if (mobileToggle && nav) {
      mobileToggle.addEventListener('click', function () { nav.classList.toggle('open'); });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    // The login screen (GST-001) manages the session itself (real access-code
    // validation + "already logged in" redirect) — every other screen just
    // needs a session to exist so it renders correctly when opened directly.
    if (document.body.hasAttribute('data-guest-login-page')) return;
    GST.ensureSession();
    GST.wireChrome();
  });

  window.GST = {
    TODAY_ISO: TODAY_ISO,
    GUEST: GUEST,
    VILLAS: VILLAS,
    BOOKINGS: BOOKINGS,
    RESTAURANTS: RESTAURANTS,
    LANDMARKS: LANDMARKS,
    ACTIVITY_LINKS: ACTIVITY_LINKS,
    ACTIVITY_SUGGESTIONS: ACTIVITY_SUGGESTIONS,
    getBooking: getBooking,
    getVilla: getVilla,
    upcomingBookings: upcomingBookings,
    pastBookings: pastBookings,
    nearestUpcoming: nearestUpcoming,
    getSession: getSession,
    setSession: setSession,
    clearSession: clearSession,
    ensureSession: ensureSession,
    getActiveBookingId: getActiveBookingId,
    setActiveBookingId: setActiveBookingId,
    getPreArrival: getPreArrival,
    setPreArrival: setPreArrival,
    resetPreArrival: resetPreArrival,
    isFullyConfirmed: isFullyConfirmed,
    homeHref: homeHref,
    fmtDate: fmtDate,
    fmtDateLong: fmtDateLong,
    nightsBetween: nightsBetween,
    initials: initials,
    getRestaurant: getRestaurant,
    getActiveRestaurantId: getActiveRestaurantId,
    setActiveRestaurantId: setActiveRestaurantId,
    starsHtml: starsHtml,
    wireChrome: wireChrome
  };
})();
