(function () {
  'use strict';
  var VSV = MM.VSV;

  /* Electricity ledger: one entry per guest check-out collection ("checkout")
     or provider invoice payment ("bill"), across a handful of villas. */
  var LEDGER = [
    { villa: 'PV-101', date: '2026-08-05', type: 'checkout', amount: 88 },
    { villa: 'PV-101', date: '2026-08-12', type: 'bill', amount: 78 },
    { villa: 'PV-101', date: '2026-08-20', type: 'checkout', amount: 96 },
    { villa: 'PV-101', date: '2026-08-27', type: 'checkout', amount: 105 },
    { villa: 'PV-102', date: '2026-08-06', type: 'checkout', amount: 83 },
    { villa: 'PV-102', date: '2026-08-15', type: 'bill', amount: 72 },
    { villa: 'PV-103', date: '2026-08-08', type: 'checkout', amount: 83 },
    { villa: 'PV-103', date: '2026-08-17', type: 'checkout', amount: 88 },
    { villa: 'PV-103', date: '2026-08-22', type: 'bill', amount: 91 },
    { villa: 'PV-105', date: '2026-08-10', type: 'checkout', amount: 64 },
    { villa: 'PV-106', date: '2026-07-30', type: 'checkout', amount: 63 },
    { villa: 'PV-106', date: '2026-08-11', type: 'bill', amount: 57 },
    { villa: 'PV-108', date: '2026-08-02', type: 'checkout', amount: 135 },
    { villa: 'PV-108', date: '2026-08-24', type: 'checkout', amount: 126 }
  ];

  /* Villas with at least one payment-missing incident, for the warning column. */
  var PAYMENT_MISSING = { 'PV-105': 1, 'PV-107': 2 };

  function populateFilters() {
    var buSel = document.getElementById('f-bu');
    VSV.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o); });
    var villaSel = document.getElementById('f-villa');
    MM.MOCK_PROPERTIES.forEach(function (p) {
      if (!VSV.ELECTRICITY[p.id] || !VSV.ELECTRICITY[p.id].managed) return;
      var o = document.createElement('option'); o.value = p.id; o.textContent = p.name; villaSel.appendChild(o);
    });
    document.getElementById('f-start').value = '2026-08-01';
    document.getElementById('f-end').value = '2026-08-31';
    [buSel, villaSel, document.getElementById('f-start'), document.getElementById('f-end')].forEach(function (el) {
      el.addEventListener('change', render);
    });
  }

  function inRange(date, start, end) { return (!start || date >= start) && (!end || date <= end); }

  function render() {
    var start = document.getElementById('f-start').value;
    var end = document.getElementById('f-end').value;
    var bu = document.getElementById('f-bu').value;
    var villaId = document.getElementById('f-villa').value;

    var summaryTable = document.getElementById('summary-table');
    var detailTable = document.getElementById('detail-table');

    if (villaId) {
      document.getElementById('mode-label').textContent = 'Daily breakdown for ' + VSV.propertyById(villaId).name;
      document.getElementById('table-title').textContent = VSV.propertyById(villaId).name + ' — Daily Breakdown';
      summaryTable.style.display = 'none';
      detailTable.style.display = '';
      renderDetail(villaId, start, end);
    } else {
      document.getElementById('mode-label').textContent = 'Portfolio summary';
      document.getElementById('table-title').textContent = 'Summary by Villa';
      summaryTable.style.display = '';
      detailTable.style.display = 'none';
      renderSummary(start, end, bu);
    }
  }

  function renderSummary(start, end, bu) {
    var byVilla = {};
    LEDGER.forEach(function (e) {
      if (!inRange(e.date, start, end)) return;
      var prop = VSV.propertyById(e.villa);
      if (!prop) return;
      if (bu && prop.bu !== bu) return;
      byVilla[e.villa] = byVilla[e.villa] || { received: 0, paid: 0 };
      if (e.type === 'checkout') byVilla[e.villa].received += e.amount;
      else byVilla[e.villa].paid += e.amount;
    });
    var villaIds = Object.keys(byVilla);
    var tbody = document.getElementById('summary-tbody');
    if (!villaIds.length) {
      tbody.innerHTML = '<tr><td colspan="5" class="text-sm text-muted" style="padding:24px;text-align:center;">No electricity activity in this range.</td></tr>';
    } else {
      tbody.innerHTML = villaIds.map(function (id) {
        var prop = VSV.propertyById(id);
        var cur = (VSV.ELECTRICITY[id] || {}).currency;
        var v = byVilla[id];
        var profit = v.received - v.paid;
        var missing = PAYMENT_MISSING[id] || 0;
        return '<tr>' +
          '<td class="cell-strong">' + prop.name + '</td>' +
          '<td class="cell-num">' + VSV.fmtMoney(v.received, cur) + '</td>' +
          '<td class="cell-num">' + VSV.fmtMoney(v.paid, cur) + '</td>' +
          '<td class="cell-num" style="color:' + (profit >= 0 ? 'var(--color-success-text)' : 'var(--color-danger-dark,#991b1b)') + ';font-weight:700;">' + VSV.fmtMoney(profit, cur) + '</td>' +
          '<td>' + (missing ? '<span class="badge badge-warning">' + missing + ' payment missing</span>' : '<span class="text-xs text-muted">&mdash;</span>') + '</td>' +
          '</tr>';
      }).join('');
    }

    var totalReceived = villaIds.reduce(function (s, id) { return s + byVilla[id].received; }, 0);
    var totalPaid = villaIds.reduce(function (s, id) { return s + byVilla[id].paid; }, 0);
    document.getElementById('summary-kpis').innerHTML =
      '<div class="stat-card success"><div class="stat-card__label">Total Received</div><div class="stat-card__value">' + VSV.fmtMoney(totalReceived, 'SGD') + '</div></div>' +
      '<div class="stat-card warning"><div class="stat-card__label">Total Paid to Providers</div><div class="stat-card__value">' + VSV.fmtMoney(totalPaid, 'SGD') + '</div></div>' +
      '<div class="stat-card accent"><div class="stat-card__label">Net Profit</div><div class="stat-card__value">' + VSV.fmtMoney(totalReceived - totalPaid, 'SGD') + '</div></div>' +
      '<div class="stat-card"><div class="stat-card__label">Villas With Missing Payments</div><div class="stat-card__value">' + Object.keys(PAYMENT_MISSING).length + '</div></div>';
  }

  function renderDetail(villaId, start, end) {
    var cur = (VSV.ELECTRICITY[villaId] || {}).currency;
    var entries = LEDGER.filter(function (e) { return e.villa === villaId && inRange(e.date, start, end); })
      .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var tbody = document.getElementById('detail-tbody');
    if (!entries.length) {
      tbody.innerHTML = '<tr><td colspan="5" class="text-sm text-muted" style="padding:24px;text-align:center;">No entries in this range.</td></tr>';
      document.getElementById('summary-kpis').innerHTML = '';
      return;
    }
    var net = 0, totalReceived = 0, totalPaid = 0;
    tbody.innerHTML = entries.map(function (e) {
      var received = e.type === 'checkout' ? e.amount : 0;
      var paid = e.type === 'bill' ? e.amount : 0;
      net += received - paid;
      totalReceived += received; totalPaid += paid;
      return '<tr>' +
        '<td>' + VSV.fmtDate(e.date) + '</td>' +
        '<td><span class="badge ' + (e.type === 'checkout' ? 'badge-info' : 'badge-neutral') + '">' + (e.type === 'checkout' ? 'Check out' : 'Bill') + '</span></td>' +
        '<td class="cell-num">' + (received ? VSV.fmtMoney(received, cur) : '&mdash;') + '</td>' +
        '<td class="cell-num">' + (paid ? VSV.fmtMoney(paid, cur) : '&mdash;') + '</td>' +
        '<td class="cell-num" style="font-weight:700;">' + VSV.fmtMoney(net, cur) + '</td>' +
        '</tr>';
    }).join('');
    document.getElementById('summary-kpis').innerHTML =
      '<div class="stat-card success"><div class="stat-card__label">Received in Range</div><div class="stat-card__value">' + VSV.fmtMoney(totalReceived, cur) + '</div></div>' +
      '<div class="stat-card warning"><div class="stat-card__label">Paid in Range</div><div class="stat-card__value">' + VSV.fmtMoney(totalPaid, cur) + '</div></div>' +
      '<div class="stat-card accent"><div class="stat-card__label">Running Net</div><div class="stat-card__value">' + VSV.fmtMoney(net, cur) + '</div></div>';
  }

  populateFilters();
  render();
})();
