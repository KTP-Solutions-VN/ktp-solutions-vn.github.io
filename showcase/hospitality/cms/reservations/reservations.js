/* ==========================================================================
   Reservations — Google Calendar-style multi-property booking calendar.
   Vanilla JS, in-memory mock data. Bars use CSS Grid for column span
   (date range) and row (lane) so overlapping stays stack like Google
   Calendar's multi-day events, without any external calendar library.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Static reference data                                                */
  /* ------------------------------------------------------------------ */

  var PROPERTIES = [
    'Villa Andaman Breeze — Room 1',
    'Villa Andaman Breeze — Room 2',
    'Aegean Sunset Villa',
    'Sunset Cove Bungalow — Room 1',
    'Palm Grove Residence',
    'Caribbean Blue Villa',
    'Sunshine Coast Bungalow'
  ];

  var CHANNELS = ['Direct Booking', 'Booking.com', 'Airbnb', 'Agoda', 'Expedia'];

  var GUESTS = [
    'Sophie Martin', 'Marco Rossi', 'Emma Wilson', 'James Carter', 'Anna Kowalski',
    'Liam O’Brien', 'Nadia Petrova', 'Tom Becker', 'Chloe Dubois', 'Diego Fernandez',
    'Lucas Meyer', 'Isabella Novak', 'Ethan Walsh', 'Priya Sharma', 'Noah Andersen',
    'Mia Papadopoulos'
  ];

  var STATUS_LABELS = {
    confirmed: 'Confirmed',
    pending: 'Pending',
    'checked-in': 'Checked-in',
    completed: 'Completed',
    cancelled: 'Cancelled'
  };

  var MAX_LANES_MONTH = 3;
  var MAX_LANES_WEEK = 8;

  /* ------------------------------------------------------------------ */
  /* Date helpers                                                         */
  /* ------------------------------------------------------------------ */

  function addDays(date, n) {
    var d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
  }

  function startOfDay(date) {
    var d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function diffDays(a, b) {
    return Math.round((startOfDay(a) - startOfDay(b)) / 86400000);
  }

  function isSameDate(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function toISODate(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function fromISODate(s) {
    var parts = s.split('-').map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function mondayOfWeek(date) {
    var d = startOfDay(date);
    var dow = d.getDay(); // 0=Sun..6=Sat
    var offset = (dow === 0) ? -6 : (1 - dow);
    return addDays(d, offset);
  }

  /* ------------------------------------------------------------------ */
  /* Mock reservation data — dates generated relative to "today" so the  */
  /* demo always shows a populated calendar whenever it is opened.       */
  /* ------------------------------------------------------------------ */

  var TODAY = startOfDay(new Date());

  var SEED = [
    { offset: -12, nights: 3, p: 1, g: 5, c: 2, status: 'completed' },
    { offset: -9, nights: 2, p: 3, g: 4, c: 0, status: 'completed' },
    { offset: -6, nights: 3, p: 0, g: 0, c: 1, status: 'completed' },
    { offset: -3, nights: 2, p: 2, g: 1, c: 2, status: 'completed' },
    { offset: -1, nights: 4, p: 4, g: 2, c: 0, status: 'checked-in' },
    { offset: 0, nights: 2, p: 1, g: 3, c: 1, status: 'checked-in' },
    { offset: 1, nights: 3, p: 3, g: 4, c: 3, status: 'confirmed' },
    { offset: 2, nights: 5, p: 5, g: 5, c: 2, status: 'confirmed' },
    { offset: 3, nights: 2, p: 6, g: 6, c: 0, status: 'pending' },
    { offset: 4, nights: 1, p: 0, g: 7, c: 1, status: 'confirmed' },
    { offset: 5, nights: 3, p: 2, g: 8, c: 4, status: 'confirmed' },
    { offset: 6, nights: 2, p: 1, g: 9, c: 1, status: 'cancelled' },
    { offset: 7, nights: 4, p: 4, g: 10, c: 2, status: 'confirmed' },
    { offset: 7, nights: 2, p: 3, g: 12, c: 0, status: 'confirmed' },
    { offset: 9, nights: 2, p: 3, g: 11, c: 0, status: 'pending' },
    { offset: 10, nights: 6, p: 5, g: 12, c: 3, status: 'confirmed' },
    { offset: 12, nights: 2, p: 6, g: 13, c: 1, status: 'confirmed' },
    { offset: 13, nights: 3, p: 0, g: 14, c: 2, status: 'confirmed' },
    { offset: 14, nights: 2, p: 2, g: 15, c: 1, status: 'confirmed' },
    { offset: 15, nights: 2, p: 2, g: 15, c: 0, status: 'pending' },
    { offset: 17, nights: 4, p: 1, g: 0, c: 1, status: 'confirmed' },
    { offset: 18, nights: 2, p: 4, g: 1, c: 4, status: 'confirmed' },
    { offset: 20, nights: 3, p: 5, g: 2, c: 2, status: 'confirmed' },
    { offset: 22, nights: 2, p: 6, g: 3, c: 1, status: 'confirmed' }
  ];

  var RESERVATIONS = SEED.map(function (s, idx) {
    var checkIn = addDays(TODAY, s.offset);
    var checkOut = addDays(checkIn, s.nights);
    return {
      id: 'RSV-' + (1000 + idx),
      property: PROPERTIES[s.p],
      guest: GUESTS[s.g],
      channel: CHANNELS[s.c],
      status: s.status,
      checkIn: checkIn,
      checkOut: checkOut,
      adults: 2 + (idx % 3 === 0 ? 1 : 0),
      children: (idx % 4 === 0) ? 1 : 0,
      rate: 120 + ((idx * 47) % 480),
      notes: (idx % 5 === 0) ? 'Guest requested early check-in if possible.' : ''
    };
  });

  var nextIdCounter = RESERVATIONS.length + 1000;

  /* ------------------------------------------------------------------ */
  /* App state                                                            */
  /* ------------------------------------------------------------------ */

  var state = {
    view: 'month',
    monthCursor: new Date(TODAY.getFullYear(), TODAY.getMonth(), 1),
    weekCursor: new Date(TODAY),
    propertyFilter: 'all',
    editingId: null
  };

  /* ------------------------------------------------------------------ */
  /* DOM refs                                                             */
  /* ------------------------------------------------------------------ */

  var calendarTitle = document.getElementById('calendar-title');
  var calendarBody = document.getElementById('calendar-body');
  var propertyFilterEl = document.getElementById('property-filter');

  /* ------------------------------------------------------------------ */
  /* Populate static selects                                              */
  /* ------------------------------------------------------------------ */

  function populateSelects() {
    PROPERTIES.forEach(function (p) {
      var opt = document.createElement('option');
      opt.value = p;
      opt.textContent = p;
      propertyFilterEl.appendChild(opt.cloneNode(true));
      document.getElementById('res-property').appendChild(opt);
    });

    CHANNELS.forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      document.getElementById('res-channel').appendChild(opt);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Lane assignment (greedy interval scheduling, like Google Calendar)   */
  /* ------------------------------------------------------------------ */

  function assignLanes(events) {
    // events: [{ startCol, endCol, ... }] — mutates each with .lane
    var sorted = events.slice().sort(function (a, b) {
      if (a.startCol !== b.startCol) return a.startCol - b.startCol;
      return (b.endCol - b.startCol) - (a.endCol - a.startCol);
    });

    var laneEnds = []; // laneEnds[i] = last occupied column of lane i

    sorted.forEach(function (ev) {
      var placed = false;
      for (var i = 0; i < laneEnds.length; i++) {
        if (laneEnds[i] < ev.startCol) {
          ev.lane = i;
          laneEnds[i] = ev.endCol;
          placed = true;
          break;
        }
      }
      if (!placed) {
        ev.lane = laneEnds.length;
        laneEnds.push(ev.endCol);
      }
    });

    return sorted;
  }

  /* ------------------------------------------------------------------ */
  /* Reservation filtering helper                                        */
  /* ------------------------------------------------------------------ */

  function visibleReservations() {
    if (state.propertyFilter === 'all') return RESERVATIONS;
    return RESERVATIONS.filter(function (r) { return r.property === state.propertyFilter; });
  }

  function lastNight(res) {
    return addDays(res.checkOut, -1);
  }

  /* ------------------------------------------------------------------ */
  /* Render a single week row (used by both month view x6 and week view) */
  /* ------------------------------------------------------------------ */

  function renderWeekRow(weekDates, currentMonthIndex, opts) {
    var weekEl = document.createElement('div');
    weekEl.className = 'calendar-week';

    var weekStart = weekDates[0];
    var weekEnd = weekDates[6];

    // --- Day cells (normal flow) ---
    var daysEl = document.createElement('div');
    daysEl.className = 'calendar-week__days';

    weekDates.forEach(function (date) {
      var cell = document.createElement('div');
      cell.className = 'calendar-day';
      if (currentMonthIndex !== null && date.getMonth() !== currentMonthIndex) {
        cell.classList.add('is-outside');
      }
      if (isSameDate(date, TODAY)) cell.classList.add('is-today');

      var num = document.createElement('div');
      num.className = 'calendar-day__num';
      num.textContent = (date.getDate() === 1)
        ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : String(date.getDate());
      cell.appendChild(num);

      cell.addEventListener('click', function () {
        openNewReservation(date);
      });

      daysEl.appendChild(cell);
    });

    weekEl.appendChild(daysEl);

    // --- Bars overlay (absolutely positioned, CSS grid) ---
    var barsEl = document.createElement('div');
    barsEl.className = 'calendar-week__bars';

    var overlapping = visibleReservations().filter(function (r) {
      return r.checkIn <= weekEnd && lastNight(r) >= weekStart;
    }).map(function (r) {
      return {
        res: r,
        startCol: Math.max(0, diffDays(r.checkIn, weekStart)),
        endCol: Math.min(6, diffDays(lastNight(r), weekStart))
      };
    });

    var maxLanes = opts.maxLanes;
    var laned = assignLanes(overlapping);

    var overflowCountByDay = [0, 0, 0, 0, 0, 0, 0];

    laned.forEach(function (item) {
      if (item.lane >= maxLanes) {
        for (var c = item.startCol; c <= item.endCol; c++) overflowCountByDay[c]++;
        return;
      }

      var bar = document.createElement('div');
      bar.className = 'cal-bar status-' + item.res.status;
      bar.style.gridColumn = (item.startCol + 1) + ' / span ' + (item.endCol - item.startCol + 1);
      bar.style.gridRow = String(item.lane + 1);
      bar.title = item.res.property + ' — ' + item.res.guest + ' (' + STATUS_LABELS[item.res.status] + ')';

      var title = document.createElement('div');
      title.className = 'cal-bar-title';
      title.textContent = item.res.property;

      var desc = document.createElement('div');
      desc.className = 'cal-bar-desc';
      desc.textContent = item.res.guest;

      bar.appendChild(title);
      bar.appendChild(desc);

      bar.addEventListener('click', function (e) {
        e.stopPropagation();
        openEditReservation(item.res.id);
      });

      barsEl.appendChild(bar);
    });

    overflowCountByDay.forEach(function (count, col) {
      if (count === 0) return;
      var more = document.createElement('div');
      more.className = 'cal-more';
      more.style.gridColumn = String(col + 1);
      more.style.gridRow = String(maxLanes + 1);
      more.textContent = '+' + count + ' more';
      more.addEventListener('click', function (e) {
        e.stopPropagation();
        openDayAgenda(weekDates[col]);
      });
      barsEl.appendChild(more);
    });

    weekEl.appendChild(barsEl);
    return weekEl;
  }

  /* ------------------------------------------------------------------ */
  /* Month / Week render entry points                                    */
  /* ------------------------------------------------------------------ */

  function renderMonth() {
    var firstOfMonth = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth(), 1);
    var gridStart = mondayOfWeek(firstOfMonth);

    calendarTitle.textContent = firstOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    calendarBody.innerHTML = '';
    calendarBody.classList.remove('week-mode');

    for (var w = 0; w < 6; w++) {
      var weekStart = addDays(gridStart, w * 7);
      var weekDates = [];
      for (var i = 0; i < 7; i++) weekDates.push(addDays(weekStart, i));
      calendarBody.appendChild(renderWeekRow(weekDates, firstOfMonth.getMonth(), { maxLanes: MAX_LANES_MONTH }));
    }
  }

  function renderWeek() {
    var weekStart = mondayOfWeek(state.weekCursor);
    var weekDates = [];
    for (var i = 0; i < 7; i++) weekDates.push(addDays(weekStart, i));

    var startLabel = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    var endLabel = addDays(weekStart, 6).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    calendarTitle.textContent = startLabel + ' – ' + endLabel;

    calendarBody.innerHTML = '';
    calendarBody.classList.add('week-mode');
    calendarBody.appendChild(renderWeekRow(weekDates, null, { maxLanes: MAX_LANES_WEEK }));
  }

  function render() {
    if (state.view === 'month') renderMonth();
    else renderWeek();
  }

  /* ------------------------------------------------------------------ */
  /* Toolbar interactions                                                 */
  /* ------------------------------------------------------------------ */

  document.getElementById('btn-today').addEventListener('click', function () {
    state.monthCursor = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    state.weekCursor = new Date(TODAY);
    render();
  });

  document.getElementById('btn-prev').addEventListener('click', function () {
    if (state.view === 'month') {
      state.monthCursor = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth() - 1, 1);
    } else {
      state.weekCursor = addDays(state.weekCursor, -7);
    }
    render();
  });

  document.getElementById('btn-next').addEventListener('click', function () {
    if (state.view === 'month') {
      state.monthCursor = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth() + 1, 1);
    } else {
      state.weekCursor = addDays(state.weekCursor, 7);
    }
    render();
  });

  document.getElementById('view-toggle').addEventListener('click', function (e) {
    var btn = e.target.closest('.view-toggle__btn');
    if (!btn) return;
    document.querySelectorAll('.view-toggle__btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    state.view = btn.getAttribute('data-view');
    if (state.view === 'week') state.weekCursor = new Date(state.monthCursor);
    else state.monthCursor = new Date(state.weekCursor.getFullYear(), state.weekCursor.getMonth(), 1);
    render();
  });

  propertyFilterEl.addEventListener('change', function () {
    state.propertyFilter = propertyFilterEl.value;
    render();
  });

  document.getElementById('btn-print').addEventListener('click', function () {
    window.print();
  });

  /* ------------------------------------------------------------------ */
  /* Reservation form modal (create + edit)                               */
  /* ------------------------------------------------------------------ */

  var form = {
    property: document.getElementById('res-property'),
    guest: document.getElementById('res-guest'),
    channel: document.getElementById('res-channel'),
    checkin: document.getElementById('res-checkin'),
    checkout: document.getElementById('res-checkout'),
    adults: document.getElementById('res-adults'),
    children: document.getElementById('res-children'),
    status: document.getElementById('res-status'),
    rate: document.getElementById('res-rate'),
    notes: document.getElementById('res-notes')
  };

  var resModalTitle = document.getElementById('res-modal-title');
  var resModalSubtitle = document.getElementById('res-modal-subtitle');
  var resMeta = document.getElementById('res-meta');
  var resMetaId = document.getElementById('res-meta-id');
  var resDeleteBtn = document.getElementById('res-delete-btn');

  function openNewReservation(date) {
    state.editingId = null;
    resModalTitle.textContent = 'New Reservation';
    resModalSubtitle.textContent = 'Fill in the details below to create a reservation';
    resMeta.hidden = true;
    resDeleteBtn.style.display = 'none';

    form.property.selectedIndex = 0;
    form.guest.value = '';
    form.channel.selectedIndex = 0;
    form.checkin.value = toISODate(date);
    form.checkout.value = toISODate(addDays(date, 1));
    form.adults.value = 2;
    form.children.value = 0;
    form.status.value = 'confirmed';
    form.rate.value = '';
    form.notes.value = '';

    window.CM.openModal('modal-reservation');
  }

  function openEditReservation(id) {
    var res = RESERVATIONS.find(function (r) { return r.id === id; });
    if (!res) return;

    state.editingId = id;
    resModalTitle.textContent = res.property;
    resModalSubtitle.textContent = 'Guest: ' + res.guest;
    resMeta.hidden = false;
    resMetaId.textContent = 'Booking ID: ' + res.id + ' · Source: ' + res.channel;
    resDeleteBtn.style.display = '';

    form.property.value = res.property;
    form.guest.value = res.guest;
    form.channel.value = res.channel;
    form.checkin.value = toISODate(res.checkIn);
    form.checkout.value = toISODate(res.checkOut);
    form.adults.value = res.adults;
    form.children.value = res.children;
    form.status.value = res.status;
    form.rate.value = res.rate;
    form.notes.value = res.notes;

    window.CM.openModal('modal-reservation');
  }

  document.getElementById('res-save-btn').addEventListener('click', function () {
    var guestName = form.guest.value.trim();
    if (!guestName) {
      window.CM.showToast('Please enter a guest name.');
      return;
    }
    var checkIn = fromISODate(form.checkin.value);
    var checkOut = fromISODate(form.checkout.value);
    if (!(checkOut > checkIn)) {
      window.CM.showToast('Check-out must be after check-in.');
      return;
    }

    if (state.editingId) {
      var res = RESERVATIONS.find(function (r) { return r.id === state.editingId; });
      res.property = form.property.value;
      res.guest = guestName;
      res.channel = form.channel.value;
      res.checkIn = checkIn;
      res.checkOut = checkOut;
      res.adults = Number(form.adults.value) || 1;
      res.children = Number(form.children.value) || 0;
      res.status = form.status.value;
      res.rate = Number(form.rate.value) || 0;
      res.notes = form.notes.value;
      window.CM.showToast('Reservation updated.');
    } else {
      RESERVATIONS.push({
        id: 'RSV-' + (nextIdCounter++),
        property: form.property.value,
        guest: guestName,
        channel: form.channel.value,
        checkIn: checkIn,
        checkOut: checkOut,
        adults: Number(form.adults.value) || 1,
        children: Number(form.children.value) || 0,
        status: form.status.value,
        rate: Number(form.rate.value) || 0,
        notes: form.notes.value
      });
      window.CM.showToast('Reservation created.');
    }

    window.CM.closeModal('modal-reservation');
    render();
  });

  resDeleteBtn.addEventListener('click', function () {
    if (!state.editingId) return;
    RESERVATIONS = RESERVATIONS.filter(function (r) { return r.id !== state.editingId; });
    window.CM.closeModal('modal-reservation');
    window.CM.showToast('Reservation deleted.');
    render();
  });

  /* ------------------------------------------------------------------ */
  /* Day agenda modal ("+N more")                                        */
  /* ------------------------------------------------------------------ */

  var agendaTitle = document.getElementById('agenda-modal-title');
  var agendaSubtitle = document.getElementById('agenda-modal-subtitle');
  var agendaList = document.getElementById('agenda-list');

  function openDayAgenda(date) {
    agendaTitle.textContent = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    agendaSubtitle.textContent = 'All reservations active on this date';
    agendaList.innerHTML = '';

    var dayReservations = visibleReservations().filter(function (r) {
      return r.checkIn <= date && lastNight(r) >= date;
    });

    dayReservations.forEach(function (r) {
      var item = document.createElement('div');
      item.className = 'agenda-item';

      var dot = document.createElement('div');
      dot.className = 'agenda-item__dot';
      dot.style.background = {
        confirmed: 'var(--color-primary-dark)',
        pending: 'var(--color-warning)',
        'checked-in': 'var(--color-success)',
        completed: 'var(--color-primary)',
        cancelled: 'var(--color-gray-400)'
      }[r.status];

      var text = document.createElement('div');
      text.innerHTML = '<div class="agenda-item__title">' + r.property + '</div>' +
        '<div class="agenda-item__sub">' + r.guest + ' · ' + STATUS_LABELS[r.status] + ' · ' + r.channel + '</div>';

      item.appendChild(dot);
      item.appendChild(text);

      item.addEventListener('click', function () {
        window.CM.closeModal('modal-day-agenda');
        openEditReservation(r.id);
      });

      agendaList.appendChild(item);
    });

    window.CM.openModal('modal-day-agenda');
  }

  /* ------------------------------------------------------------------ */
  /* Page-level "+ New Reservation" button                                */
  /* ------------------------------------------------------------------ */

  document.getElementById('btn-new-reservation').addEventListener('click', function () {
    openNewReservation(TODAY);
  });

  /* ------------------------------------------------------------------ */
  /* Init                                                                 */
  /* ------------------------------------------------------------------ */

  populateSelects();
  render();
})();
