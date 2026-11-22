(function () {
  'use strict';
  var VSV = MM.VSV;
  var STORAGE_KEY = 'mm_vsv_longstay_periods';
  var TODAY = '2026-09-02';
  var CURRENT_USER = 'Daniel Tan';

  var nameToId = {};
  MM.MOCK_PROPERTIES.forEach(function (p) { nameToId[p.name] = p.id; });

  var LONGSTAY_BOOKINGS = [
    { id: 'BK-30401', property: 'Villa Sapphire Cliff', guest: 'James Whitfield', checkIn: '2026-06-01', checkOut: '2026-10-01' },
    { id: 'BK-30402', property: 'Villa Coral Horizon', guest: 'Isabelle Moreau', checkIn: '2026-07-15', checkOut: '2026-11-15' },
    { id: 'BK-30403', property: 'Villa Silver Tide', guest: 'David Chen', checkIn: '2026-05-20', checkOut: '2026-12-20' },
    { id: 'BK-30404', property: 'Villa Lotus Terrace', guest: 'Priya Nair', checkIn: '2026-08-01', checkOut: '2027-02-01' }
  ];

  function seedIfEmpty() {
    if (localStorage.getItem(STORAGE_KEY)) return;
    var seed = {};
    seed['BK-30401'] = [
      { startMeter: 1000, endMeter: 1420, date: '2026-07-01', amount: 143, status: 'Cleared', enteredBy: 'Daniel Tan' },
      { startMeter: 1420, endMeter: 1855, date: '2026-08-01', amount: 148, status: 'Cleared', enteredBy: 'Daniel Tan' }
    ];
    seed['BK-30403'] = [
      { startMeter: 500, endMeter: 990, date: '2026-06-20', amount: 170, status: 'Cleared', enteredBy: 'Warren Kelly' }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }
  seedIfEmpty();

  function loadPeriods() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; } }
  function savePeriods(map) { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); }

  function nights(ci, co) {
    var d1 = new Date(ci + 'T00:00:00'), d2 = new Date(co + 'T00:00:00');
    return Math.max(1, Math.round((d2 - d1) / 86400000));
  }

  function populateFilters() {
    var buSel = document.getElementById('f-bu');
    VSV.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o); });
    var villaSel = document.getElementById('f-villa');
    MM.MOCK_PROPERTIES.forEach(function (p) { var o = document.createElement('option'); o.value = p.id; o.textContent = p.name; villaSel.appendChild(o); });
    ['f-bu', 'f-villa', 'f-guest', 'f-cin', 'f-cout'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', renderList);
      document.getElementById(id).addEventListener('change', renderList);
    });
  }

  function currentRows() {
    var bu = document.getElementById('f-bu').value;
    var villaId = document.getElementById('f-villa').value;
    var guest = document.getElementById('f-guest').value.trim().toLowerCase();
    var cin = document.getElementById('f-cin').value;
    var cout = document.getElementById('f-cout').value;
    var periods = loadPeriods();
    return LONGSTAY_BOOKINGS.filter(function (b) {
      var propId = nameToId[b.property];
      var prop = VSV.propertyById(propId);
      if (!prop) return false;
      if (bu && prop.bu !== bu) return false;
      if (villaId && propId !== villaId) return false;
      if (guest && b.guest.toLowerCase().indexOf(guest) === -1) return false;
      if (cin && b.checkIn < cin) return false;
      if (cout && b.checkOut > cout) return false;
      return true;
    }).map(function (b) {
      return { booking: b, prop: VSV.propertyById(nameToId[b.property]), history: periods[b.id] || [] };
    });
  }

  function renderList() {
    var rows = currentRows();
    var tbody = document.getElementById('ls-tbody');
    var empty = document.getElementById('ls-empty');
    document.getElementById('result-count').textContent = rows.length + ' booking' + (rows.length === 1 ? '' : 's');
    if (!rows.length) { tbody.innerHTML = ''; empty.hidden = false; return; }
    empty.hidden = true;
    tbody.innerHTML = rows.map(function (r) {
      var b = r.booking, last = r.history[r.history.length - 1];
      return '<tr>' +
        '<td class="cell-strong">' + r.prop.name + '</td>' +
        '<td>' + b.guest + '</td>' +
        '<td>' + VSV.fmtDate(b.checkIn) + '</td>' +
        '<td>' + VSV.fmtDate(b.checkOut) + '</td>' +
        '<td class="cell-num">' + nights(b.checkIn, b.checkOut) + '</td>' +
        '<td class="cell-num">' + r.history.length + '</td>' +
        '<td class="cell-sub">' + (r.history[0] ? r.history[0].enteredBy : '&mdash;') + '</td>' +
        '<td class="cell-sub">' + (last ? last.enteredBy : '&mdash;') + '</td>' +
        '<td style="text-align:right;"><button class="btn btn-primary btn-sm" data-enter="' + b.id + '">Enter</button></td>' +
        '</tr>';
    }).join('');
    tbody.querySelectorAll('[data-enter]').forEach(function (btn) {
      btn.addEventListener('click', function () { openMeterModal(btn.getAttribute('data-enter')); });
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
    var b = row.booking, prop = row.prop, history = row.history;
    var cfg = VSV.ELECTRICITY[prop.id] || {};
    document.getElementById('mm-subtitle').textContent = prop.name + ' · ' + b.guest;
    document.getElementById('mm-readonly').innerHTML =
      '<div class="ro-item"><span class="ro-label">Guest</span><span class="ro-value">' + b.guest + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Villa</span><span class="ro-value">' + prop.name + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Stay</span><span class="ro-value">' + VSV.fmtDate(b.checkIn) + ' → ' + VSV.fmtDate(b.checkOut) + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Default Rate</span><span class="ro-value">' + (VSV.METHOD_LABELS[cfg.method] || 'Not configured') + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Booking</span><span class="ro-value">' + b.id + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Periods so far</span><span class="ro-value">' + history.length + '</span></div>';

    var histWrap = document.getElementById('mm-history');
    var histRows = document.getElementById('mm-history-rows');
    if (history.length) {
      histWrap.style.display = '';
      histRows.innerHTML = history.map(function (p) {
        return '<div class="vsv-history-row"><span>' + VSV.fmtDate(p.date) + ' &middot; ' + p.startMeter + ' → ' + p.endMeter + ' kWh</span><span>' + VSV.fmtMoney(p.amount, cfg.currency) + ' · ' + p.status + '</span></div>';
      }).join('');
    } else {
      histWrap.style.display = 'none';
      histRows.innerHTML = '';
    }

    document.getElementById('meter-form').reset();
    var lastPeriod = history[history.length - 1];
    document.getElementById('mf-start').value = lastPeriod ? lastPeriod.endMeter : 0;
    document.getElementById('mf-date').value = TODAY;
    document.getElementById('mf-time').value = '10:00';
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
    var start = Number(document.getElementById('mf-start').value) || 0;
    return VSV.computeDefaultBill(row.prop.id, start, meter);
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
      var map = loadPeriods();
      var list = map[currentBookingId] || (map[currentBookingId] = []);
      var amount = Number(document.getElementById('mf-amount').value);
      list.push({
        startMeter: Number(document.getElementById('mf-start').value),
        endMeter: Number(document.getElementById('mf-meter').value),
        date: document.getElementById('mf-date').value,
        amount: amount,
        reason: document.getElementById('mf-reason').value.trim(),
        discount: document.getElementById('mf-discount').value ? Number(document.getElementById('mf-discount').value) : 0,
        approvedBy: document.getElementById('mf-approved').value,
        paidBy: document.getElementById('mf-paidby').value,
        refund: document.getElementById('mf-refund').value ? Number(document.getElementById('mf-refund').value) : 0,
        comment: document.getElementById('mf-comment').value.trim(),
        status: (amount === defaultBillForCurrent()) ? 'Cleared' : 'Under review',
        enteredBy: CURRENT_USER
      });
      savePeriods(map);
      MM.closeModal('confirm-meter-modal');
      MM.closeModal('meter-modal');
      MM.showToast('Reading period saved.');
      renderList();
    });
  });

  populateFilters();
  renderList();
})();
