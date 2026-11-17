(function () {
  'use strict';
  var VSV = MM.VSV;
  var STORAGE_KEY = 'mm_vsv_checkin_meters';
  var TODAY = '2026-09-02';
  var CURRENT_USER = 'Somchai Anuwat';

  var nameToId = {};
  MM.MOCK_PROPERTIES.forEach(function (p) { nameToId[p.name] = p.id; });

  /* Extra demo bookings so the check-in list has more than one row to work with. */
  var EXTRA_BOOKINGS = [
    { id: 'BK-10241', property: 'Villa Coral Horizon', guest: 'Michael Tan', checkIn: '2026-09-02', checkOut: '2026-09-06', status: 'confirmed' },
    { id: 'BK-10242', property: 'Villa Lotus Terrace', guest: 'Sophia Rossi', checkIn: '2026-09-03', checkOut: '2026-09-08', status: 'confirmed' },
    { id: 'BK-10243', property: 'Villa Emerald Bay', guest: 'Anna Kowalski', checkIn: '2026-09-02', checkOut: '2026-09-05', status: 'confirmed' },
    { id: 'BK-10244', property: 'Villa Silver Tide', guest: 'James Whitfield', checkIn: '2026-09-04', checkOut: '2026-09-09', status: 'confirmed' }
  ];

  var ALL_BOOKINGS = MM.MOCK_BOOKINGS.filter(function (b) { return b.status !== 'cancelled'; }).concat(EXTRA_BOOKINGS);

  /* Pre-seed one booking as already recorded, for status diversity. */
  function seedIfEmpty() {
    if (localStorage.getItem(STORAGE_KEY)) return;
    var seed = {};
    seed['BK-10241'] = { startMeter: 4820, startDate: '2026-09-02', meterTime: '13:10', comment: '', paymentCollection: 'no', enteredBy: 'Somchai Anuwat', enteredAt: '2026-09-02 13:12' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }
  seedIfEmpty();

  function loadReadings() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; } }
  function saveReadings(map) { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); }

  function nights(ci, co) {
    var d1 = new Date(ci + 'T00:00:00'), d2 = new Date(co + 'T00:00:00');
    return Math.max(1, Math.round((d2 - d1) / 86400000));
  }

  function populateFilters() {
    var buSel = document.getElementById('f-bu');
    VSV.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o); });
    var villaSel = document.getElementById('f-villa');
    MM.MOCK_PROPERTIES.forEach(function (p) { var o = document.createElement('option'); o.value = p.id; o.textContent = p.name; villaSel.appendChild(o); });
    document.getElementById('f-date').value = TODAY;
    [buSel, villaSel, document.getElementById('f-date')].forEach(function (el) { el.addEventListener('change', renderList); });
  }

  function currentRows() {
    var bu = document.getElementById('f-bu').value;
    var villaId = document.getElementById('f-villa').value;
    var date = document.getElementById('f-date').value;
    var readings = loadReadings();
    return ALL_BOOKINGS.filter(function (b) {
      var propId = nameToId[b.property];
      var prop = VSV.propertyById(propId);
      if (!prop) return false;
      var cfg = VSV.ELECTRICITY[propId];
      if (!cfg || !cfg.managed) return false;
      if (date && b.checkIn !== date) return false;
      if (bu && prop.bu !== bu) return false;
      if (villaId && propId !== villaId) return false;
      return true;
    }).map(function (b) {
      return { booking: b, prop: VSV.propertyById(nameToId[b.property]), reading: readings[b.id] };
    });
  }

  function renderList() {
    var rows = currentRows();
    var tbody = document.getElementById('checkin-tbody');
    var empty = document.getElementById('checkin-empty');
    document.getElementById('result-count').textContent = rows.length + ' check-in' + (rows.length === 1 ? '' : 's');
    if (!rows.length) { tbody.innerHTML = ''; empty.hidden = false; return; }
    empty.hidden = true;
    tbody.innerHTML = rows.map(function (r) {
      var b = r.booking;
      var actionCell = r.reading
        ? '<span class="badge badge-success">Recorded</span>'
        : '<button class="btn btn-primary btn-sm" data-enter="' + b.id + '">Enter</button>';
      return '<tr>' +
        '<td class="cell-strong">' + r.prop.name + '</td>' +
        '<td>' + b.guest + '</td>' +
        '<td>' + VSV.fmtDate(b.checkIn) + '</td>' +
        '<td>' + VSV.fmtDate(b.checkOut) + '</td>' +
        '<td class="cell-num">' + nights(b.checkIn, b.checkOut) + '</td>' +
        '<td class="cell-sub">' + (r.reading ? r.reading.enteredBy : '&mdash;') + '</td>' +
        '<td style="text-align:right;">' + actionCell + '</td>' +
        '</tr>';
    }).join('');
    tbody.querySelectorAll('[data-enter]').forEach(function (btn) {
      btn.addEventListener('click', function () { openMeterModal(btn.getAttribute('data-enter')); });
    });
  }

  /* -------------------- Modal -------------------- */
  var currentBookingId = null;

  function paymethodOptions() {
    var sel = document.getElementById('mf-paymethod');
    if (sel.options.length) return;
    VSV.PAID_BY.forEach(function (m) { var o = document.createElement('option'); o.value = m; o.textContent = m; sel.appendChild(o); });
  }

  function openMeterModal(bookingId) {
    currentBookingId = bookingId;
    var row = currentRows().find(function (r) { return r.booking.id === bookingId; });
    if (!row) return;
    var b = row.booking, prop = row.prop;
    var cfg = VSV.ELECTRICITY[prop.id] || {};
    document.getElementById('mm-subtitle').textContent = prop.name + ' &middot; ' + b.guest;
    document.getElementById('mm-readonly').innerHTML =
      '<div class="ro-item"><span class="ro-label">Guest</span><span class="ro-value">' + b.guest + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Villa</span><span class="ro-value">' + prop.name + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Check-in / out</span><span class="ro-value">' + VSV.fmtDate(b.checkIn) + ' &rarr; ' + VSV.fmtDate(b.checkOut) + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Default Rate</span><span class="ro-value">' + (VSV.METHOD_LABELS[cfg.method] || 'Not configured') + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Booking</span><span class="ro-value">' + b.id + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Last Updated By</span><span class="ro-value">' + (row.reading ? row.reading.enteredBy : 'Not yet recorded') + '</span></div>';

    document.getElementById('meter-form').reset();
    document.getElementById('mf-date').value = b.checkIn;
    document.getElementById('mf-time').value = '14:00';
    document.getElementById('mf-collect').value = 'no';
    paymethodOptions();
    toggleDepositFields();
    document.getElementById('meter-form').querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
    MM.openModal('meter-modal');
  }

  function toggleDepositFields() {
    var collect = document.getElementById('mf-collect').value === 'yes';
    ['mf-deposit-group', 'mf-currency-group', 'mf-paymethod-group'].forEach(function (id) {
      var g = document.getElementById(id);
      g.hidden = !collect;
      var input = g.querySelector('input,select');
      if (input) { if (collect) input.setAttribute('required', 'required'); else input.removeAttribute('required'); }
    });
  }
  document.getElementById('mf-collect').addEventListener('change', toggleDepositFields);

  document.getElementById('meter-save-btn').addEventListener('click', function () {
    var form = document.getElementById('meter-form');
    if (!MM.validateForm(form)) { MM.showToast('Please complete the required fields.', { danger: true }); return; }
    document.getElementById('confirm-meter-value').textContent = document.getElementById('mf-meter').value;
    MM.openModal('confirm-meter-modal');
  });

  document.getElementById('confirm-meter-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var map = loadReadings();
      map[currentBookingId] = {
        startMeter: Number(document.getElementById('mf-meter').value),
        startDate: document.getElementById('mf-date').value,
        meterTime: document.getElementById('mf-time').value,
        comment: document.getElementById('mf-comment').value.trim(),
        paymentCollection: document.getElementById('mf-collect').value,
        depositReceived: document.getElementById('mf-deposit').value ? Number(document.getElementById('mf-deposit').value) : null,
        currency: document.getElementById('mf-currency').value,
        checkInPaymentMethod: document.getElementById('mf-paymethod').value,
        enteredBy: CURRENT_USER,
        enteredAt: document.getElementById('mf-date').value + ' ' + document.getElementById('mf-time').value
      };
      saveReadings(map);
      MM.closeModal('confirm-meter-modal');
      MM.closeModal('meter-modal');
      MM.showToast('Start meter reading saved.');
      renderList();
    });
  });

  populateFilters();
  renderList();
})();
