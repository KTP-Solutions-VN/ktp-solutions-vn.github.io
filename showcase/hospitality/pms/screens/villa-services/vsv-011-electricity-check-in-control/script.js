(function () {
  'use strict';
  var VSV = MM.VSV;
  var STORAGE_KEY = 'mm_vsv_checkin_control';
  var TODAY = '2026-09-02';

  var nameToId = {};
  MM.MOCK_PROPERTIES.forEach(function (p) { nameToId[p.name] = p.id; });

  var ROWS = [
    { id: 'BK-40501', property: 'Villa Sapphire Cliff', guest: 'James Whitfield', channel: 'Direct', checkIn: TODAY, checkOut: '2026-09-09', concierge: 'Somchai Anuwat', status: 'done', meter: 4210, photo: true, doneOn: '2026-09-02 13:05', paymentAmount: null, confirmed: false },
    { id: 'BK-40502', property: 'Villa Coral Horizon', guest: 'Anna Kowalski', channel: 'Booking.com', checkIn: TODAY, checkOut: '2026-09-06', concierge: 'Somchai Anuwat', status: 'done', meter: 3860, photo: true, doneOn: '2026-09-02 14:20', paymentAmount: 450, confirmed: false },
    { id: 'BK-40503', property: 'Villa Emerald Bay', guest: 'Michael Tan', channel: 'Airbnb', checkIn: TODAY, checkOut: '2026-09-05', concierge: 'Wayan Kertha', status: 'pending', meter: null, photo: false, doneOn: null, paymentAmount: null, confirmed: false },
    { id: 'BK-40504', property: 'Villa Marble Cove', guest: 'Sophia Rossi', channel: 'Direct', checkIn: '2026-09-01', checkOut: '2026-09-05', concierge: 'Somchai Anuwat', status: 'done-late', meter: 2510, photo: true, doneOn: '2026-09-02 09:10', paymentAmount: null, confirmed: false },
    { id: 'BK-40505', property: 'Villa Lotus Terrace', guest: 'David Chen', channel: 'Agoda', checkIn: '2026-09-01', checkOut: '2026-09-04', concierge: 'Nok Pattaya', status: 'not-done', meter: null, photo: false, doneOn: null, paymentAmount: null, confirmed: false },
    { id: 'BK-40506', property: 'Villa Golden Palm', guest: 'Priya Nair', channel: 'Direct', checkIn: TODAY, checkOut: '2026-09-08', concierge: 'Nok Pattaya', status: 'done', meter: 1780, photo: true, doneOn: '2026-09-02 11:45', paymentAmount: 600, confirmed: true },
    { id: 'BK-40507', property: 'Villa Silver Tide', guest: 'Isabelle Moreau', channel: 'Direct', checkIn: TODAY, checkOut: '2026-09-10', concierge: 'Wayan Kertha', status: 'done', meter: 6040, photo: true, doneOn: '2026-09-02 10:00', paymentAmount: 900, confirmed: false }
  ];

  function loadOverrides() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; } }
  function saveOverrides(map) { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); }

  function effectiveRows() {
    var overrides = loadOverrides();
    return ROWS.map(function (r) {
      var o = overrides[r.id] || {};
      return Object.assign({}, r, o);
    });
  }

  function populateFilters() {
    var buSel = document.getElementById('f-bu');
    VSV.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o); });
    var conSel = document.getElementById('f-concierge');
    VSV.CONCIERGES.forEach(function (c) { var o = document.createElement('option'); o.value = c.name; o.textContent = c.name; conSel.appendChild(o); });
    document.getElementById('f-dateselector').addEventListener('change', function () {
      document.getElementById('f-date').hidden = this.value !== 'pick';
      render();
    });
    ['f-bu', 'f-status', 'f-concierge', 'f-date'].forEach(function (id) { document.getElementById(id).addEventListener('change', render); });
  }

  function currentRows() {
    var bu = document.getElementById('f-bu').value;
    var status = document.getElementById('f-status').value;
    var concierge = document.getElementById('f-concierge').value;
    return effectiveRows().filter(function (r) {
      var propId = nameToId[r.property];
      var prop = VSV.propertyById(propId);
      if (!prop) return false;
      if (bu && prop.bu !== bu) return false;
      if (status && r.status !== status) return false;
      if (concierge && r.concierge !== concierge) return false;
      return true;
    }).map(function (r) { return { row: r, prop: VSV.propertyById(nameToId[r.property]), cfg: VSV.ELECTRICITY[nameToId[r.property]] || {} }; });
  }

  var STATUS_LABEL = { pending: 'Pending', done: 'Done', 'done-late': 'Done Late', 'not-done': 'Not Done' };

  function renderKpis(rows) {
    var pending = rows.filter(function (r) { return r.row.status === 'pending'; }).length;
    var late = rows.filter(function (r) { return r.row.status === 'done-late'; }).length;
    var done = rows.filter(function (r) { return r.row.status === 'done' || r.row.status === 'done-late'; }).length;
    var fixedCollected = rows.filter(function (r) { return r.cfg.method === 'Collect-Fixed' && r.row.confirmed; })
      .reduce(function (s, r) { return s + (r.row.paymentAmount || 0); }, 0);
    var recorded = rows.filter(function (r) { return r.row.meter !== null; }).length;
    document.getElementById('kpi-pending').textContent = pending;
    document.getElementById('kpi-late').textContent = late;
    document.getElementById('kpi-done').textContent = done;
    document.getElementById('kpi-fixed').textContent = VSV.fmtMoney(fixedCollected, 'THB');
    document.getElementById('kpi-recorded').textContent = recorded;
  }

  function actionButtons(entry) {
    var r = entry.row;
    var out = ['<button class="btn btn-outline btn-sm" data-view="' + r.id + '">View</button>'];
    if (r.status === 'pending' || r.status === 'done-late' || r.status === 'not-done') {
      out.push('<button class="btn btn-primary btn-sm" data-correct="' + r.id + '">Correct Meter-in</button>');
    }
    if (r.status === 'done' && entry.cfg.method === 'Collect-Fixed' && !r.confirmed) {
      out.push('<button class="btn btn-primary btn-sm" data-confirm="' + r.id + '">Confirm</button>');
    }
    if (r.status === 'not-done') {
      out.push('<button class="btn btn-ghost btn-sm" data-flag="' + r.id + '">Flag</button>');
    }
    return out.join('');
  }

  function render() {
    var rows = currentRows();
    renderKpis(rows);
    var tbody = document.getElementById('control-tbody');
    var empty = document.getElementById('control-empty');
    document.getElementById('result-count').textContent = rows.length + ' booking' + (rows.length === 1 ? '' : 's');
    document.getElementById('select-all').checked = false;
    if (!rows.length) { tbody.innerHTML = ''; empty.hidden = false; updateBulkBar(); return; }
    empty.hidden = true;
    tbody.innerHTML = rows.map(function (entry) {
      var r = entry.row, prop = entry.prop, cfg = entry.cfg;
      var badgeClass = r.status === 'done' ? 'badge-success' : r.status === 'done-late' ? 'badge-warning' : r.status === 'pending' ? 'badge-info' : 'badge-danger';
      return '<tr data-row="' + r.id + '">' +
        '<td><input type="checkbox" class="row-check" data-id="' + r.id + '"></td>' +
        '<td class="vsv-status-cell"><span class="badge ' + badgeClass + '">' + STATUS_LABEL[r.status] + '</span><span class="status-date">' + VSV.fmtDate(r.checkIn) + '</span></td>' +
        '<td class="vsv-meta-cell"><strong>' + prop.name + '</strong><span class="meta-sub">' + r.guest + ' &middot; ' + r.channel + ' &middot; ' + r.id + '</span><span class="meta-sub">Out ' + VSV.fmtDate(r.checkOut) + '</span></td>' +
        '<td>' + (VSV.METHOD_LABELS[cfg.method] || '&mdash;') + '</td>' +
        '<td class="vsv-meta-cell">' + (r.meter !== null ? r.meter + ' kWh' : '<span class="text-muted">&mdash;</span>') + '<span class="meta-sub">' + (r.photo ? 'Photo on file' : 'No photo') + '</span></td>' +
        '<td class="vsv-meta-cell">' + (r.paymentAmount !== null ? VSV.fmtMoney(r.paymentAmount, cfg.currency) : '<span class="text-muted">&mdash;</span>') + (r.confirmed ? '<span class="meta-sub">Confirmed</span>' : '') + '</td>' +
        '<td>' + (r.confirmed ? '<span class="badge badge-success">Confirmed</span>' : 'Front desk fund') + '</td>' +
        '<td style="text-align:right;"><div class="vsv-action-stack">' + actionButtons(entry) + '</div></td>' +
        '</tr>';
    }).join('');
    bindRowActions();
    updateBulkBar();
  }

  function bindRowActions() {
    document.querySelectorAll('[data-view]').forEach(function (btn) { btn.addEventListener('click', function () { openView(btn.getAttribute('data-view')); }); });
    document.querySelectorAll('[data-correct]').forEach(function (btn) { btn.addEventListener('click', function () { openCorrect(btn.getAttribute('data-correct')); }); });
    document.querySelectorAll('[data-confirm]').forEach(function (btn) { btn.addEventListener('click', function () { openConfirmFixed(btn.getAttribute('data-confirm')); }); });
    document.querySelectorAll('[data-flag]').forEach(function (btn) { btn.addEventListener('click', function () { openFlag(btn.getAttribute('data-flag')); }); });
    document.querySelectorAll('.row-check').forEach(function (cb) { cb.addEventListener('change', updateBulkBar); });
  }

  function updateBulkBar() {
    var checked = Array.prototype.slice.call(document.querySelectorAll('.row-check:checked'));
    var toolbar = document.getElementById('bulk-toolbar');
    toolbar.style.display = checked.length ? '' : 'none';
    document.getElementById('bulk-count').textContent = checked.length + ' selected';
  }

  document.getElementById('select-all').addEventListener('change', function () {
    var checked = this.checked;
    document.querySelectorAll('.row-check').forEach(function (cb) { cb.checked = checked; });
    updateBulkBar();
  });

  function selectedIds() {
    return Array.prototype.slice.call(document.querySelectorAll('.row-check:checked')).map(function (cb) { return cb.getAttribute('data-id'); });
  }

  document.getElementById('bulk-remind').addEventListener('click', function () {
    document.getElementById('br-count').textContent = selectedIds().length;
    MM.openModal('bulk-remind-modal');
  });
  document.getElementById('bulk-remind-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Sending...', function () {
      MM.closeModal('bulk-remind-modal');
      MM.showToast('Reminder sent to the responsible concierges.');
    });
  });

  document.getElementById('bulk-confirm').addEventListener('click', function () {
    document.getElementById('bc-count').textContent = selectedIds().length;
    MM.openModal('bulk-confirm-modal');
  });
  document.getElementById('bulk-confirm-btn').addEventListener('click', function () {
    var btn = this;
    var ids = selectedIds();
    MM.simulateSave(btn, 'Confirming...', function () {
      var overrides = loadOverrides();
      ids.forEach(function (id) { overrides[id] = Object.assign({}, overrides[id], { confirmed: true }); });
      saveOverrides(overrides);
      MM.closeModal('bulk-confirm-modal');
      MM.showToast('Payment confirmed for ' + ids.length + ' booking(s).');
      render();
    });
  });

  /* -------------------- View detail -------------------- */
  function openView(id) {
    var entry = currentRows().find(function (e) { return e.row.id === id; }) || effectiveRows().map(function (r) { return { row: r, prop: VSV.propertyById(nameToId[r.property]), cfg: VSV.ELECTRICITY[nameToId[r.property]] || {} }; }).find(function (e) { return e.row.id === id; });
    if (!entry) return;
    var r = entry.row, prop = entry.prop, cfg = entry.cfg;
    document.getElementById('vm-subtitle').textContent = prop.name + ' · ' + r.guest;
    document.getElementById('vm-booking').innerHTML =
      '<div class="vsv-detail-row"><span class="dr-label">Villa</span><span class="dr-value">' + prop.name + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Check-in</span><span class="dr-value">' + VSV.fmtDate(r.checkIn) + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Check-out</span><span class="dr-value">' + VSV.fmtDate(r.checkOut) + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Guest</span><span class="dr-value">' + r.guest + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Channel</span><span class="dr-value">' + r.channel + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Payment Method</span><span class="dr-value">' + (VSV.METHOD_LABELS[cfg.method] || '&mdash;') + '</span></div>';
    document.getElementById('vm-meter').innerHTML =
      '<div class="vsv-detail-row"><span class="dr-label">Start Meter</span><span class="dr-value">' + (r.meter !== null ? r.meter + ' kWh' : 'N/A') + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Meter Photo</span><span class="dr-value">' + (r.photo ? '<a href="#" data-open-lightbox>View photo</a>' : 'Not uploaded') + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Done On</span><span class="dr-value">' + (r.doneOn || '&mdash;') + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">By</span><span class="dr-value">' + r.concierge + '</span></div>';
    document.getElementById('vm-payment').innerHTML =
      '<div class="vsv-detail-row"><span class="dr-label">Payment</span><span class="dr-value">' + (r.paymentAmount !== null ? VSV.fmtMoney(r.paymentAmount, cfg.currency) : '&mdash;') + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Account</span><span class="dr-value">Front desk fund</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Reception Confirmed</span><span class="dr-value">' + (r.confirmed ? 'Yes' : 'No') + '</span></div>';
    document.querySelectorAll('[data-open-lightbox]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); MM.openModal('lightbox-modal'); }); });
    MM.openModal('view-modal');
  }

  /* -------------------- Correct meter -------------------- */
  var correctingId = null;
  function openCorrect(id) {
    correctingId = id;
    var entry = effectiveRows().map(function (r) { return { row: r, prop: VSV.propertyById(nameToId[r.property]) }; }).find(function (e) { return e.row.id === id; });
    if (!entry) return;
    document.getElementById('cm-subtitle').textContent = entry.prop.name + ' · ' + entry.row.guest;
    document.getElementById('correct-form').reset();
    document.getElementById('cf-meter').value = entry.row.meter || '';
    document.getElementById('cf-date').value = entry.row.checkIn;
    document.getElementById('cf-time').value = '14:00';
    document.getElementById('correct-form').querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
    MM.openModal('correct-modal');
  }
  document.getElementById('correct-save-btn').addEventListener('click', function () {
    var form = document.getElementById('correct-form');
    if (!MM.validateForm(form)) { MM.showToast('Please complete the required fields.', { danger: true }); return; }
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var overrides = loadOverrides();
      overrides[correctingId] = Object.assign({}, overrides[correctingId], {
        meter: Number(document.getElementById('cf-meter').value),
        photo: true,
        status: 'done-late',
        doneOn: document.getElementById('cf-date').value + ' ' + document.getElementById('cf-time').value
      });
      saveOverrides(overrides);
      MM.closeModal('correct-modal');
      MM.showToast('Meter-in corrected.');
      render();
    });
  });

  /* -------------------- Confirm fixed / Flag -------------------- */
  var pendingId = null;
  function openConfirmFixed(id) {
    pendingId = id;
    var entry = effectiveRows().map(function (r) { return { row: r, prop: VSV.propertyById(nameToId[r.property]) }; }).find(function (e) { return e.row.id === id; });
    document.getElementById('cf-confirm-name').textContent = entry.prop.name + ' · ' + entry.row.guest;
    MM.openModal('confirm-fixed-modal');
  }
  document.getElementById('confirm-fixed-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Confirming...', function () {
      var overrides = loadOverrides();
      overrides[pendingId] = Object.assign({}, overrides[pendingId], { confirmed: true });
      saveOverrides(overrides);
      MM.closeModal('confirm-fixed-modal');
      MM.showToast('Fixed amount confirmed as received.');
      render();
    });
  });

  function openFlag(id) {
    pendingId = id;
    var entry = effectiveRows().map(function (r) { return { row: r, prop: VSV.propertyById(nameToId[r.property]) }; }).find(function (e) { return e.row.id === id; });
    document.getElementById('flag-name').textContent = entry.prop.name + ' · ' + entry.row.guest;
    MM.openModal('flag-modal');
  }
  document.getElementById('flag-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Flagging...', function () {
      MM.closeModal('flag-modal');
      MM.showToast('Booking flagged for the business unit manager.');
    });
  });

  populateFilters();
  render();
})();
