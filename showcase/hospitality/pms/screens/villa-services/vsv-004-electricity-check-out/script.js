(function () {
  'use strict';
  var VSV = MM.VSV;
  var STORAGE_KEY = 'mm_vsv_checkout_bills';
  var TODAY = '2026-09-02';
  var CURRENT_USER = 'Somchai Anuwat';

  var nameToId = {};
  MM.MOCK_PROPERTIES.forEach(function (p) { nameToId[p.name] = p.id; });

  /* Check-out bookings for demo purposes, mirroring VSV-003's arrivals but as
     departures today. One (Villa Marble Cove) deliberately has no start
     meter recorded, to demonstrate the blocking warning. */
  var CHECKOUT_BOOKINGS = [
    { id: 'BK-20301', property: 'Villa Sapphire Cliff', guest: 'James Whitfield', checkIn: '2026-08-27', checkOut: TODAY, startMeter: 4210, checkInBy: 'Somchai Anuwat' },
    { id: 'BK-20302', property: 'Villa Coral Horizon', guest: 'Anna Kowalski', checkIn: '2026-08-29', checkOut: TODAY, startMeter: 3860, checkInBy: 'Somchai Anuwat' },
    { id: 'BK-20303', property: 'Villa Emerald Bay', guest: 'Michael Tan', checkIn: '2026-08-30', checkOut: TODAY, startMeter: 5120, checkInBy: 'Wayan Kertha' },
    { id: 'BK-20304', property: 'Villa Marble Cove', guest: 'Sophia Rossi', checkIn: '2026-08-25', checkOut: TODAY, startMeter: null, checkInBy: null },
    { id: 'BK-20305', property: 'Villa Lotus Terrace', guest: 'David Chen', checkIn: '2026-08-28', checkOut: TODAY, startMeter: 2990, checkInBy: 'Nok Pattaya' },
    { id: 'BK-20306', property: 'Villa Golden Palm', guest: 'Priya Nair', checkIn: '2026-08-31', checkOut: TODAY, startMeter: 1780, checkInBy: 'Nok Pattaya' },
    { id: 'BK-20307', property: 'Villa Silver Tide', guest: 'Isabelle Moreau', checkIn: '2026-08-24', checkOut: TODAY, startMeter: 6040, checkInBy: 'Wayan Kertha' }
  ];

  function seedIfEmpty() {
    if (localStorage.getItem(STORAGE_KEY)) return;
    var seed = {};
    seed['BK-20307'] = { endMeter: 6210, amount: 1360, additionalFees: 0, note: 'Paid in cash on departure.', enteredBy: 'Wayan Kertha', enteredAt: '2026-09-02 09:40' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }
  seedIfEmpty();

  function loadBills() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; } }
  function saveBills(map) { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); }

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
    var bills = loadBills();
    return CHECKOUT_BOOKINGS.filter(function (b) {
      var propId = nameToId[b.property];
      var prop = VSV.propertyById(propId);
      if (!prop) return false;
      var cfg = VSV.ELECTRICITY[propId];
      if (!cfg || !cfg.managed) return false;
      if (date && b.checkOut !== date) return false;
      if (bu && prop.bu !== bu) return false;
      if (villaId && propId !== villaId) return false;
      return true;
    }).map(function (b) {
      return { booking: b, prop: VSV.propertyById(nameToId[b.property]), bill: bills[b.id] };
    });
  }

  function renderList() {
    var rows = currentRows();
    var tbody = document.getElementById('checkout-tbody');
    var empty = document.getElementById('checkout-empty');
    document.getElementById('result-count').textContent = rows.length + ' check-out' + (rows.length === 1 ? '' : 's');
    if (!rows.length) { tbody.innerHTML = ''; empty.hidden = false; return; }
    empty.hidden = true;
    tbody.innerHTML = rows.map(function (r) {
      var b = r.booking;
      var actionCell;
      if (r.bill) {
        actionCell = '<span class="badge badge-success">Recorded</span>';
      } else if (b.startMeter === null) {
        actionCell = '<button class="btn btn-outline btn-sm" data-warn="' + b.id + '">No Start Meter</button>';
      } else {
        actionCell = '<button class="btn btn-primary btn-sm" data-enter="' + b.id + '">Fill it now</button>';
      }
      return '<tr>' +
        '<td class="cell-strong">' + r.prop.name + '</td>' +
        '<td>' + b.guest + '</td>' +
        '<td>' + VSV.fmtDate(b.checkIn) + '</td>' +
        '<td>' + VSV.fmtDate(b.checkOut) + '</td>' +
        '<td class="cell-num">' + nights(b.checkIn, b.checkOut) + '</td>' +
        '<td class="cell-sub">' + (b.checkInBy || '&mdash;') + '</td>' +
        '<td class="cell-sub">' + (r.bill ? r.bill.enteredBy : '&mdash;') + '</td>' +
        '<td class="cell-num">' + (r.bill ? VSV.fmtMoney(r.bill.amount, (VSV.ELECTRICITY[r.prop.id] || {}).currency) : '&mdash;') + '</td>' +
        '<td class="cell-num">' + (r.bill && r.bill.additionalFees ? VSV.fmtMoney(r.bill.additionalFees, (VSV.ELECTRICITY[r.prop.id] || {}).currency) : '&mdash;') + '</td>' +
        '<td class="cell-sub">' + (r.bill && r.bill.note ? r.bill.note : '&mdash;') + '</td>' +
        '<td style="text-align:right;">' + actionCell + '</td>' +
        '</tr>';
    }).join('');
    tbody.querySelectorAll('[data-enter]').forEach(function (btn) {
      btn.addEventListener('click', function () { openMeterModal(btn.getAttribute('data-enter')); });
    });
    tbody.querySelectorAll('[data-warn]').forEach(function (btn) {
      btn.addEventListener('click', function () { MM.openModal('no-start-modal'); });
    });
  }

  /* -------------------- Modal -------------------- */
  var currentBookingId = null;

  function paidByOptions() {
    var sel = document.getElementById('mf-paidby');
    if (sel.options.length) return;
    VSV.PAID_BY.forEach(function (m) { var o = document.createElement('option'); o.value = m; o.textContent = m; sel.appendChild(o); });
  }
  function approvedByOptions() {
    var sel = document.getElementById('mf-approved');
    if (sel.options.length) return;
    VSV.BU_MANAGERS.forEach(function (m) { var o = document.createElement('option'); o.value = m; o.textContent = m; sel.appendChild(o); });
  }

  function openMeterModal(bookingId) {
    currentBookingId = bookingId;
    var row = currentRows().find(function (r) { return r.booking.id === bookingId; });
    if (!row) return;
    var b = row.booking, prop = row.prop;
    var cfg = VSV.ELECTRICITY[prop.id] || {};
    document.getElementById('mm-subtitle').textContent = prop.name + ' · ' + b.guest;
    document.getElementById('mm-readonly').innerHTML =
      '<div class="ro-item"><span class="ro-label">Guest</span><span class="ro-value">' + b.guest + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Villa</span><span class="ro-value">' + prop.name + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Check-in / out</span><span class="ro-value">' + VSV.fmtDate(b.checkIn) + ' → ' + VSV.fmtDate(b.checkOut) + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Start Meter</span><span class="ro-value">' + b.startMeter + ' kWh</span></div>' +
      '<div class="ro-item"><span class="ro-label">Default Rate</span><span class="ro-value">' + (VSV.METHOD_LABELS[cfg.method] || 'Not configured') + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Booking</span><span class="ro-value">' + b.id + '</span></div>';

    document.getElementById('meter-form').reset();
    document.getElementById('mf-date').value = b.checkOut;
    document.getElementById('mf-time').value = '11:00';
    document.getElementById('mf-meter').value = '';
    document.getElementById('mf-amount').value = '';
    paidByOptions();
    approvedByOptions();
    toggleDiscrepancyFields(true);
    document.getElementById('meter-form').querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
    MM.openModal('meter-modal');
  }

  function defaultBillForCurrent() {
    var row = currentRows().find(function (r) { return r.booking.id === currentBookingId; });
    if (!row) return 0;
    var meter = Number(document.getElementById('mf-meter').value) || 0;
    return VSV.computeDefaultBill(row.prop.id, row.booking.startMeter, meter);
  }

  function toggleDiscrepancyFields(force) {
    var amount = Number(document.getElementById('mf-amount').value);
    var defaultBill = defaultBillForCurrent();
    document.getElementById('mf-default-hint').textContent = 'System-calculated default: ' + defaultBill;
    var differs = force ? false : (document.getElementById('mf-amount').value !== '' && amount !== defaultBill);
    ['mf-reason-group', 'mf-approved-group'].forEach(function (id) {
      var g = document.getElementById(id);
      g.hidden = !differs;
      var input = g.querySelector('input,select');
      if (input) { if (differs) input.setAttribute('required', 'required'); else input.removeAttribute('required'); }
    });
    document.getElementById('mf-discount-group').hidden = !differs;
  }
  document.getElementById('mf-meter').addEventListener('input', function () { toggleDiscrepancyFields(); });
  document.getElementById('mf-amount').addEventListener('input', function () { toggleDiscrepancyFields(); });

  document.getElementById('meter-save-btn').addEventListener('click', function () {
    var form = document.getElementById('meter-form');
    if (!MM.validateForm(form)) { MM.showToast('Please complete the required fields.', { danger: true }); return; }
    document.getElementById('confirm-meter-value').textContent = document.getElementById('mf-meter').value;
    MM.openModal('confirm-meter-modal');
  });

  document.getElementById('confirm-meter-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var map = loadBills();
      map[currentBookingId] = {
        endMeter: Number(document.getElementById('mf-meter').value),
        endDate: document.getElementById('mf-date').value,
        meterTime: document.getElementById('mf-time').value,
        amount: Number(document.getElementById('mf-amount').value),
        reason: document.getElementById('mf-reason').value.trim(),
        discount: document.getElementById('mf-discount').value ? Number(document.getElementById('mf-discount').value) : 0,
        approvedBy: document.getElementById('mf-approved').value,
        paidBy: document.getElementById('mf-paidby').value,
        refund: document.getElementById('mf-refund').value ? Number(document.getElementById('mf-refund').value) : 0,
        additionalFees: document.getElementById('mf-addfees').value ? Number(document.getElementById('mf-addfees').value) : 0,
        note: document.getElementById('mf-comment').value.trim(),
        status: (Number(document.getElementById('mf-amount').value) === defaultBillForCurrent()) ? 'Cleared' : 'Under review',
        enteredBy: CURRENT_USER,
        enteredAt: document.getElementById('mf-date').value + ' ' + document.getElementById('mf-time').value
      };
      saveBills(map);
      MM.closeModal('confirm-meter-modal');
      MM.closeModal('meter-modal');
      MM.showToast('End meter reading saved.');
      renderList();
    });
  });

  populateFilters();
  renderList();
})();
