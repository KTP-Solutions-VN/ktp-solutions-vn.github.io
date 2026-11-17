/* ==========================================================================
   Booking module — shared data for the BOOK-039/040/041 "Planning" screen
   group (Planning List, Villa Planning Calendar, Team Work Schedule).
   Extends window.MM.BOOK (defined in booking-data.js). Loaded after
   booking-data.js and before each of these 3 screens' own script.js.
   Reserved for this screen group — do not use for other Booking screens.
   ========================================================================== */

(function () {
  'use strict';

  window.MM = window.MM || {};
  var BOOK = window.MM.BOOK = window.MM.BOOK || {};

  var CONCIERGE_STAFF = (window.MM.MOCK_STAFF || []).filter(function (s) { return s.role === 'Concierge'; });
  var CHAT_STATUSES = ['Active', 'Not started', 'Guest replied', 'Closed'];

  function seedOf(str) {
    var s = 0;
    for (var i = 0; i < str.length; i++) s += str.charCodeAt(i);
    return s;
  }

  function deterministicTime(id, offset) {
    var s = seedOf(id) + (offset || 0);
    var hour = 9 + (s % 9); // 09:00 - 17:00
    var minute = (s * 7) % 60;
    return (hour < 10 ? '0' : '') + hour + ':' + (minute < 10 ? '0' : '') + minute;
  }

  function conciergeFor(booking, i) {
    if (booking.concierge) return booking.concierge;
    return CONCIERGE_STAFF[i % CONCIERGE_STAFF.length].name;
  }

  /* ==================================================================
     BOOK-039 — Planning List: flattened check-in/check-out events for a
     given date, across the whole portfolio (or filtered by BU).
     ================================================================== */
  BOOK.getPlanningRows = function (dateStr, buFilter) {
    var bookings = BOOK.getAllBookings().filter(function (b) { return (b.status || '').toLowerCase() !== 'cancelled'; });
    var rows = [];
    bookings.forEach(function (b, i) {
      var villa = BOOK.villaByName(b.property);
      if (buFilter && (!villa || villa.bu !== buFilter)) return;
      if (b.checkIn === dateStr) {
        rows.push({
          checkBy: 'Check-in', villa: b.property, bu: villa ? villa.bu : '', channel: b.referer || 'Direct',
          name: b.guest, country: b.country || '—', time: deterministicTime(b.id, 0),
          by: conciergeFor(b, i), request: b.notes ? b.notes : 'None', concierge: conciergeFor(b, i),
          chatStatus: CHAT_STATUSES[seedOf(b.id) % CHAT_STATUSES.length], bookingId: b.id
        });
      }
      if (b.checkOut === dateStr) {
        rows.push({
          checkBy: 'Check-out', villa: b.property, bu: villa ? villa.bu : '', channel: b.referer || 'Direct',
          name: b.guest, country: b.country || '—', time: deterministicTime(b.id, 5),
          by: conciergeFor(b, i), request: 'None', concierge: conciergeFor(b, i),
          chatStatus: CHAT_STATUSES[(seedOf(b.id) + 1) % CHAT_STATUSES.length], bookingId: b.id
        });
      }
    });
    rows.sort(function (a, b2) { return a.time.localeCompare(b2.time); });
    return rows;
  };

  /* ==================================================================
     BOOK-040 — Villa Planning Calendar: per-villa check-in/out + shift
     rows for a given date ("Planning" mode), and a simple readiness
     summary per villa for "Team Availability" mode.
     ================================================================== */
  BOOK.getVillaPlanningRows = function (dateStr, buFilter) {
    var villas = buFilter ? BOOK.VILLAS.filter(function (v) { return v.bu === buFilter; }) : BOOK.VILLAS;
    var bookings = BOOK.getAllBookings().filter(function (b) { return (b.status || '').toLowerCase() !== 'cancelled'; });
    return villas.map(function (v) {
      var events = [];
      bookings.forEach(function (b, i) {
        if (b.property !== v.name) return;
        if (b.checkIn === dateStr) events.push({ name: b.guest, kind: 'Check-in', checkIn: b.checkIn, checkOut: b.checkOut, start: deterministicTime(b.id, 0), end: deterministicTime(b.id, 2), staff: conciergeFor(b, i), bookingId: b.id });
        if (b.checkOut === dateStr) events.push({ name: b.guest, kind: 'Check-out', checkIn: b.checkIn, checkOut: b.checkOut, start: deterministicTime(b.id, 5), end: deterministicTime(b.id, 7), staff: conciergeFor(b, i), bookingId: b.id });
      });
      return { villaId: v.id, villaName: v.name, bu: v.bu, events: events };
    });
  };

  BOOK.getTeamAvailability = function (dateStr, buFilter) {
    var staff = buFilter ? CONCIERGE_STAFF.filter(function (s) { return s.team === buFilter; }) : CONCIERGE_STAFF;
    var rows = BOOK.getVillaPlanningRows(dateStr, buFilter);
    return staff.map(function (s) {
      var assigned = [];
      rows.forEach(function (r) { r.events.forEach(function (e) { if (e.staff === s.name) assigned.push(r.villaName + ' (' + e.kind + ')'); }); });
      return { name: s.name, team: s.team, assignments: assigned, available: assigned.length < 2 };
    });
  };

  /* ==================================================================
     BOOK-041 — Team (Team Work Schedule): same events, grouped by staff
     member instead of by villa.
     ================================================================== */
  BOOK.getTeamSchedule = function (dateStr, buFilter) {
    var staff = buFilter ? CONCIERGE_STAFF.filter(function (s) { return s.team === buFilter; }) : CONCIERGE_STAFF;
    var villaRows = BOOK.getVillaPlanningRows(dateStr, buFilter);
    return staff.map(function (s) {
      var tasks = [];
      villaRows.forEach(function (r) {
        r.events.forEach(function (e) {
          if (e.staff === s.name) tasks.push({ villa: r.villaName, guest: e.name, kind: e.kind, checkIn: e.checkIn, checkOut: e.checkOut, start: e.start, end: e.end, bookingId: e.bookingId });
        });
      });
      tasks.sort(function (a, b) { return a.start.localeCompare(b.start); });
      return { staffId: s.id, name: s.name, team: s.team, tasks: tasks };
    });
  };

})();
