(function () {
  'use strict';
  var VSV = MM.VSV;
  var STORAGE_KEY = 'mm_vsv_reconcile_status';

  var nameToId = {};
  MM.MOCK_PROPERTIES.forEach(function (p) { nameToId[p.name] = p.id; });

  /* Bills ending within the last 3 months. Excludes non-managed villas and
     villas whose electricity is included in the rate — same as the legacy
     spec's exclusion rules. */
  var BILLS = [
    { id: 'EB-01', property: 'Villa Sapphire Cliff', start: '2026-07-20', end: '2026-07-27', startMeter: 3900, endMeter: 4210, amountDue: 105, amountReceived: 105, paidBy: 'Cash' },
    { id: 'EB-02', property: 'Villa Coral Horizon', start: '2026-08-01', end: '2026-08-06', startMeter: 3600, endMeter: 3860, amountDue: 83, amountReceived: 83, paidBy: 'Credit Card' },
    { id: 'EB-03', property: 'Villa Emerald Bay', start: '2026-08-10', end: '2026-08-17', startMeter: 4900, endMeter: 5120, amountDue: 88, amountReceived: 88, paidBy: 'Online Payment' },
    { id: 'EB-04', property: 'Villa Silver Tide', start: '2026-08-24', end: null, startMeter: 6040, endMeter: null, amountDue: null, amountReceived: 0, paidBy: null },
    { id: 'EB-05', property: 'Villa Lotus Terrace', start: '2026-08-28', end: null, startMeter: 2990, endMeter: null, amountDue: null, amountReceived: 0, paidBy: null },
    { id: 'EB-06', property: 'Villa Golden Palm', start: '2026-06-15', end: '2026-06-22', startMeter: 1500, endMeter: 1780, amountDue: 112, amountReceived: 96, paidBy: 'Bank Transfer' }
  ];

  function loadStatus() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; } }
  function saveStatus(map) { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); }

  function populateFilters() {
    var buSel = document.getElementById('f-bu');
    VSV.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o); });
    buSel.addEventListener('change', renderAll);
  }

  function currentRows() {
    var bu = document.getElementById('f-bu').value;
    var status = loadStatus();
    return BILLS.filter(function (b) {
      var propId = nameToId[b.property];
      var prop = VSV.propertyById(propId);
      if (!prop) return false;
      var cfg = VSV.ELECTRICITY[propId];
      if (!cfg || !cfg.managed) return false;
      if (bu && prop.bu !== bu) return false;
      return true;
    }).map(function (b) {
      var cfg = VSV.ELECTRICITY[nameToId[b.property]] || {};
      var cleared = status[b.id] === 'Cleared' || (!!b.end && status[b.id] !== 'reopened');
      return { bill: b, prop: VSV.propertyById(nameToId[b.property]), currency: cfg.currency, cleared: cleared };
    });
  }

  function rowHtml(r, withAction) {
    var b = r.bill;
    return '<tr>' +
      '<td class="cell-strong">' + r.prop.name + '</td>' +
      '<td>' + VSV.fmtDate(b.start) + '</td>' +
      '<td>' + (b.end ? VSV.fmtDate(b.end) : '&mdash;') + '</td>' +
      '<td class="cell-num">' + b.startMeter + '</td>' +
      '<td class="cell-num">' + (b.endMeter === null ? '&mdash;' : b.endMeter) + '</td>' +
      '<td class="cell-num">' + (b.amountDue === null ? '&mdash;' : VSV.fmtMoney(b.amountDue, r.currency)) + '</td>' +
      '<td class="cell-num">' + VSV.fmtMoney(b.amountReceived, r.currency) + '</td>' +
      '<td>' + (b.paidBy || '&mdash;') + '</td>' +
      '<td><span class="badge ' + (r.cleared ? 'badge-success' : 'badge-warning') + '">' + (r.cleared ? 'Cleared' : (b.endMeter === null ? 'No End Meter' : 'Pending Review')) + '</span></td>' +
      (withAction ? '<td style="text-align:right;">' + (b.endMeter === null ? '<span class="text-xs text-muted">Awaiting end meter</span>' : '<button class="btn btn-outline btn-sm" data-recon="' + b.id + '">Mark Reconciled</button>') + '</td>' : '') +
      '</tr>';
  }

  function renderAll() {
    var rows = currentRows();
    var outstanding = rows.filter(function (r) { return !r.cleared; });
    var reconciled = rows.filter(function (r) { return r.cleared; });

    document.getElementById('kpi-reconciled').textContent = reconciled.length;
    document.getElementById('kpi-outstanding').textContent = outstanding.length;
    var dueSum = outstanding.reduce(function (s, r) { return s + (r.bill.amountDue || 0); }, 0);
    var recvSum = outstanding.reduce(function (s, r) { return s + (r.bill.amountReceived || 0); }, 0);
    document.getElementById('kpi-amount-due').textContent = VSV.fmtMoney(dueSum, 'SGD');
    document.getElementById('kpi-amount-recv').textContent = VSV.fmtMoney(recvSum, 'SGD');
    document.getElementById('result-count').textContent = rows.length + ' bill' + (rows.length === 1 ? '' : 's') + ' in range';

    var outBody = document.getElementById('outstanding-tbody');
    var outEmpty = document.getElementById('outstanding-empty');
    if (!outstanding.length) { outBody.innerHTML = ''; outEmpty.hidden = false; }
    else { outEmpty.hidden = true; outBody.innerHTML = outstanding.map(function (r) { return rowHtml(r, true); }).join(''); }

    var recBody = document.getElementById('reconciled-tbody');
    var recEmpty = document.getElementById('reconciled-empty');
    if (!reconciled.length) { recBody.innerHTML = ''; recEmpty.hidden = false; }
    else { recEmpty.hidden = true; recBody.innerHTML = reconciled.map(function (r) { return rowHtml(r, false); }).join(''); }

    outBody.querySelectorAll('[data-recon]').forEach(function (btn) {
      btn.addEventListener('click', function () { openConfirm(btn.getAttribute('data-recon')); });
    });
  }

  var pendingId = null;
  function openConfirm(billId) {
    pendingId = billId;
    var row = currentRows().find(function (r) { return r.bill.id === billId; });
    if (!row) return;
    document.getElementById('cr-villa').textContent = row.prop.name;
    document.getElementById('cr-range').textContent = VSV.fmtDate(row.bill.start) + ' – ' + VSV.fmtDate(row.bill.end);
    MM.openModal('confirm-recon-modal');
  }

  document.getElementById('confirm-recon-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Updating...', function () {
      var status = loadStatus();
      status[pendingId] = 'Cleared';
      saveStatus(status);
      MM.closeModal('confirm-recon-modal');
      MM.showToast('Bill marked as reconciled.');
      renderAll();
    });
  });

  populateFilters();
  renderAll();
})();
