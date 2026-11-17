(function () {
  'use strict';
  var VSV = MM.VSV;
  var STORAGE_KEY = 'mm_vsv_checkout_control';
  var TODAY = '2026-09-02';

  var nameToId = {};
  MM.MOCK_PROPERTIES.forEach(function (p) { nameToId[p.name] = p.id; });

  var ROWS = [
    { id: 'BK-50601', property: 'Villa Sapphire Cliff', guest: 'James Whitfield', channel: 'Direct', checkIn: '2026-08-26', checkInStatus: 'done', checkOut: TODAY, concierge: 'Somchai Anuwat', status: 'collected', meter: 4210, amount: 2635, discount: false, discountApproved: false, confirmed: true },
    { id: 'BK-50602', property: 'Villa Coral Horizon', guest: 'Anna Kowalski', channel: 'Booking.com', checkIn: '2026-08-29', checkInStatus: 'done', checkOut: TODAY, concierge: 'Somchai Anuwat', status: 'pending', meter: 3860, amount: 2080, discount: false, discountApproved: false, confirmed: false },
    { id: 'BK-50603', property: 'Villa Emerald Bay', guest: 'Michael Tan', channel: 'Airbnb', checkIn: '2026-08-30', checkInStatus: 'done', checkOut: TODAY, concierge: 'Wayan Kertha', status: 'pending', meter: 5120, amount: 2024, discount: true, discountApproved: false, confirmed: false },
    { id: 'BK-50604', property: 'Villa Marble Cove', guest: 'Sophia Rossi', channel: 'Direct', checkIn: '2026-08-25', checkInStatus: 'not-done', checkOut: TODAY, concierge: 'Somchai Anuwat', status: 'blocked', meter: null, amount: null, discount: false, discountApproved: false, confirmed: false },
    { id: 'BK-50605', property: 'Villa Lotus Terrace', guest: 'David Chen', channel: 'Agoda', checkIn: '2026-08-28', checkInStatus: 'done', checkOut: '2026-09-01', concierge: 'Nok Pattaya', status: 'done-late', meter: 2990, amount: 2076, discount: false, discountApproved: false, confirmed: true },
    { id: 'BK-50606', property: 'Villa Golden Palm', guest: 'Priya Nair', channel: 'Direct', checkIn: '2026-08-31', checkInStatus: 'done-late', checkOut: TODAY, concierge: 'Nok Pattaya', status: 'collected', meter: 1780, amount: 600, discount: true, discountApproved: true, confirmed: true },
    { id: 'BK-50607', property: 'Villa Silver Tide', guest: 'Isabelle Moreau', channel: 'Direct', checkIn: '2026-08-24', checkInStatus: 'done', checkOut: TODAY, concierge: 'Wayan Kertha', status: 'pending', meter: 6040, amount: 900, discount: false, discountApproved: false, confirmed: false }
  ];

  function loadOverrides() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; } }
  function saveOverrides(map) { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); }
  function effectiveRows() {
    var overrides = loadOverrides();
    return ROWS.map(function (r) { return Object.assign({}, r, overrides[r.id] || {}); });
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
    ['f-bu', 'f-status', 'f-checkinstatus', 'f-concierge', 'f-date'].forEach(function (id) { document.getElementById(id).addEventListener('change', render); });
  }

  function currentRows() {
    var bu = document.getElementById('f-bu').value;
    var status = document.getElementById('f-status').value;
    var checkinStatus = document.getElementById('f-checkinstatus').value;
    var concierge = document.getElementById('f-concierge').value;
    return effectiveRows().filter(function (r) {
      var propId = nameToId[r.property];
      var prop = VSV.propertyById(propId);
      if (!prop) return false;
      if (bu && prop.bu !== bu) return false;
      if (status && r.status !== status) return false;
      if (checkinStatus && r.checkInStatus !== checkinStatus) return false;
      if (concierge && r.concierge !== concierge) return false;
      return true;
    }).map(function (r) { return { row: r, prop: VSV.propertyById(nameToId[r.property]), cfg: VSV.ELECTRICITY[nameToId[r.property]] || {} }; });
  }

  var STATUS_LABEL = { blocked: 'Blocked', pending: 'Pending', collected: 'Collected', 'done-late': 'Done Late' };
  var CHECKIN_LABEL = { done: 'Check-in Done', 'done-late': 'Check-in Done Late', 'not-done': 'Check-in Not Done' };

  function renderKpis(rows) {
    var blocked = rows.filter(function (r) { return r.row.status === 'blocked'; }).length;
    var pending = rows.filter(function (r) { return r.row.status === 'pending' || r.row.status === 'done-late'; }).length;
    var discounts = rows.filter(function (r) { return r.row.discount; }).length;
    var collected = rows.filter(function (r) { return r.row.status === 'collected'; }).length;
    var amount = rows.filter(function (r) { return r.row.confirmed; }).reduce(function (s, r) { return s + (r.row.amount || 0); }, 0);
    document.getElementById('kpi-blocked').textContent = blocked;
    document.getElementById('kpi-pending').textContent = pending;
    document.getElementById('kpi-discounts').textContent = discounts;
    document.getElementById('kpi-collected').textContent = collected;
    document.getElementById('kpi-amount').textContent = VSV.fmtMoney(amount, 'THB');
  }

  function actionButtons(entry) {
    var r = entry.row;
    var out = ['<button class="btn btn-outline btn-sm" data-view="' + r.id + '">View</button>'];
    if (r.status !== 'blocked') {
      out.push('<button class="btn btn-primary btn-sm" data-correct="' + r.id + '">Correct Meter-out</button>');
    }
    if (r.discount && !r.discountApproved) {
      out.push('<button class="btn btn-ghost btn-sm" data-validate="' + r.id + '">Validate Discount</button>');
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
      var badgeClass = r.status === 'collected' ? 'badge-success' : r.status === 'blocked' ? 'badge-danger' : r.status === 'done-late' ? 'badge-warning' : 'badge-info';
      return '<tr data-row="' + r.id + '">' +
        '<td><input type="checkbox" class="row-check" data-id="' + r.id + '"></td>' +
        '<td class="vsv-status-cell"><span class="badge ' + badgeClass + '">' + STATUS_LABEL[r.status] + '</span><span class="status-date">' + VSV.fmtDate(r.checkOut) + '</span></td>' +
        '<td class="vsv-meta-cell"><strong>' + prop.name + '</strong><span class="meta-sub">' + r.guest + ' &middot; ' + r.channel + ' &middot; ' + r.id + '</span><span class="meta-sub">' + CHECKIN_LABEL[r.checkInStatus] + '</span></td>' +
        '<td>' + (VSV.METHOD_LABELS[cfg.method] || '&mdash;') + '</td>' +
        '<td class="vsv-meta-cell">' + (r.meter !== null ? r.meter + ' kWh' : '<span class="text-muted">Blocked</span>') + '</td>' +
        '<td class="vsv-meta-cell">' + (r.amount !== null ? VSV.fmtMoney(r.amount, cfg.currency) : '<span class="text-muted">&mdash;</span>') +
          (r.discount ? '<span class="meta-sub">' + (r.discountApproved ? 'Discount approved' : 'Discount pending') + '</span>' : '') + '</td>' +
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
    document.querySelectorAll('[data-validate]').forEach(function (btn) { btn.addEventListener('click', function () { openValidate(btn.getAttribute('data-validate')); }); });
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
  function selectedIds() { return Array.prototype.slice.call(document.querySelectorAll('.row-check:checked')).map(function (cb) { return cb.getAttribute('data-id'); }); }

  document.getElementById('bulk-remind').addEventListener('click', function () { document.getElementById('br-count').textContent = selectedIds().length; MM.openModal('bulk-remind-modal'); });
  document.getElementById('bulk-remind-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Sending...', function () { MM.closeModal('bulk-remind-modal'); MM.showToast('Reminder sent to the responsible concierges.'); });
  });

  document.getElementById('bulk-validate').addEventListener('click', function () {
    var ids = selectedIds();
    if (!ids.length) { MM.showToast('Select at least one booking first.', { danger: true }); return; }
    var btn = this;
    MM.simulateSave(btn, 'Validating...', function () {
      var overrides = loadOverrides();
      ids.forEach(function (id) { overrides[id] = Object.assign({}, overrides[id], { discountApproved: true }); });
      saveOverrides(overrides);
      MM.showToast('Discounts validated for ' + ids.length + ' booking(s).');
      render();
    });
  });

  document.getElementById('bulk-confirm').addEventListener('click', function () { document.getElementById('bc-count').textContent = selectedIds().length; MM.openModal('bulk-confirm-modal'); });
  document.getElementById('bulk-confirm-btn').addEventListener('click', function () {
    var btn = this;
    var ids = selectedIds();
    MM.simulateSave(btn, 'Confirming...', function () {
      var overrides = loadOverrides();
      ids.forEach(function (id) { overrides[id] = Object.assign({}, overrides[id], { confirmed: true, status: 'collected' }); });
      saveOverrides(overrides);
      MM.closeModal('bulk-confirm-modal');
      MM.showToast('Payment confirmed for ' + ids.length + ' booking(s).');
      render();
    });
  });

  /* -------------------- View detail -------------------- */
  function findEntry(id) {
    return effectiveRows().map(function (r) { return { row: r, prop: VSV.propertyById(nameToId[r.property]), cfg: VSV.ELECTRICITY[nameToId[r.property]] || {} }; }).find(function (e) { return e.row.id === id; });
  }

  function openView(id) {
    var entry = findEntry(id);
    if (!entry) return;
    var r = entry.row, prop = entry.prop, cfg = entry.cfg;
    document.getElementById('vm-subtitle').textContent = prop.name + ' · ' + r.guest;
    document.getElementById('vm-booking').innerHTML =
      '<div class="vsv-detail-row"><span class="dr-label">Villa</span><span class="dr-value">' + prop.name + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Guest / Channel</span><span class="dr-value">' + r.guest + ' &middot; ' + r.channel + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Check-in / Check-out</span><span class="dr-value">' + VSV.fmtDate(r.checkIn) + ' → ' + VSV.fmtDate(r.checkOut) + '</span></div>';
    document.getElementById('vm-checkin').innerHTML =
      '<div class="vsv-detail-row"><span class="dr-label">Check-in Status</span><span class="dr-value">' + CHECKIN_LABEL[r.checkInStatus] + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Payment Method (check-in)</span><span class="dr-value">' + (VSV.METHOD_LABELS[cfg.method] || '&mdash;') + '</span></div>';
    document.getElementById('vm-checkout').innerHTML =
      '<div class="vsv-detail-row"><span class="dr-label">End Meter</span><span class="dr-value">' + (r.meter !== null ? r.meter + ' kWh' : 'N/A (blocked)') + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Meter Photo</span><span class="dr-value">' + (r.meter !== null ? '<a href="#" data-open-lightbox>View photo</a>' : 'Not uploaded') + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Payment</span><span class="dr-value">' + (r.amount !== null ? VSV.fmtMoney(r.amount, cfg.currency) : '&mdash;') + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Discount</span><span class="dr-value">' + (r.discount ? (r.discountApproved ? 'Approved' : 'Pending approval') : 'None') + '</span></div>' +
      '<div class="vsv-detail-row"><span class="dr-label">Reception Confirmed</span><span class="dr-value">' + (r.confirmed ? 'Yes' : 'No') + '</span></div>';
    document.querySelectorAll('[data-open-lightbox]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); MM.openModal('lightbox-modal'); }); });
    MM.openModal('view-modal');
  }

  /* -------------------- Correct meter-out -------------------- */
  var correctingId = null;
  function openCorrect(id) {
    correctingId = id;
    var entry = findEntry(id);
    if (!entry) return;
    document.getElementById('cm-subtitle').textContent = entry.prop.name + ' · ' + entry.row.guest;
    document.getElementById('correct-form').reset();
    document.getElementById('cf-meter').value = entry.row.meter || '';
    document.getElementById('cf-date').value = entry.row.checkOut;
    document.getElementById('cf-time').value = '11:00';
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
        status: 'done-late'
      });
      saveOverrides(overrides);
      MM.closeModal('correct-modal');
      MM.showToast('Meter-out corrected.');
      render();
    });
  });

  /* -------------------- Validate discount -------------------- */
  var validatingId = null;
  function openValidate(id) {
    validatingId = id;
    var entry = findEntry(id);
    document.getElementById('vd-name').textContent = entry.prop.name + ' · ' + entry.row.guest;
    MM.openModal('validate-discount-modal');
  }
  document.getElementById('validate-discount-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Approving...', function () {
      var overrides = loadOverrides();
      overrides[validatingId] = Object.assign({}, overrides[validatingId], { discountApproved: true });
      saveOverrides(overrides);
      MM.closeModal('validate-discount-modal');
      MM.showToast('Discount approved.');
      render();
    });
  });

  populateFilters();
  render();
})();
