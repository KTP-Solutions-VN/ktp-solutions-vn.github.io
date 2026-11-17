(function () {
  'use strict';
  var BOOK = MM.BOOK;
  var CURRENCY_RATES = { USD: 1, THB: 36.2, EUR: 0.92 };
  var CURRENCY_SYMBOL = { USD: '$', THB: '฿', EUR: '€' };

  function last12Months() {
    var out = [];
    var now = new Date();
    for (var i = 11; i >= 0; i--) {
      var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      out.push(d.toISOString().slice(0, 7));
    }
    return out;
  }
  var MONTHS = last12Months();
  var selectedMonths = MONTHS.slice(-3);

  document.getElementById('f-bu').innerHTML += (BOOK.BUSINESS_UNITS || []).map(function (bu) {
    var name = typeof bu === 'string' ? bu : bu.name;
    return '<option>' + name + '</option>';
  }).join('');

  function monthLabel(m) {
    var d = new Date(m + '-01T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  }

  function renderChips() {
    document.getElementById('month-chips').innerHTML = MONTHS.map(function (m) {
      return '<button type="button" class="chip' + (selectedMonths.indexOf(m) !== -1 ? ' active' : '') + '" data-month="' + m + '">' + monthLabel(m) + '</button>';
    }).join('');
  }
  document.getElementById('month-chips').addEventListener('click', function (e) {
    var chip = e.target.closest('[data-month]');
    if (!chip) return;
    var m = chip.getAttribute('data-month');
    var idx = selectedMonths.indexOf(m);
    if (idx === -1) selectedMonths.push(m); else selectedMonths.splice(idx, 1);
    renderChips();
  });
  renderChips();

  var lastReport = null;
  var expandedKeys = {};

  function fmtMoney(n, currency) {
    return CURRENCY_SYMBOL[currency] + Math.round(n * CURRENCY_RATES[currency]).toLocaleString();
  }

  function hasMissingRate() {
    return BOOK.VILLAS.some(function (v) { return v.rate === null || v.rate === undefined; });
  }

  document.getElementById('calc-btn').addEventListener('click', function () {
    if (!selectedMonths.length) {
      MM.showToast('Select at least one month', { danger: true });
      return;
    }
    var bu = document.getElementById('f-bu').value;
    var currency = document.getElementById('f-currency').value;
    var months = selectedMonths.slice().sort();
    var report = BOOK.getRevenueReport(bu, months);

    document.getElementById('missing-rate-warning').style.display = hasMissingRate() ? '' : 'none';

    var head = '<th>Company</th><th>Subsidiary</th><th>Property</th>' + months.map(function (m) { return '<th>' + monthLabel(m) + '</th>'; }).join('') + '<th>Total</th><th>Owner</th><th>Bookings</th>';
    document.getElementById('report-head').innerHTML = head;

    lastReport = { rows: report, months: months, currency: currency };
    renderTable();

    document.getElementById('report-empty').hidden = report.length !== 0;
  });

  function renderTable() {
    if (!lastReport) return;
    var currency = lastReport.currency;
    var rowsHtml = lastReport.rows.map(function (row, ri) {
      var key = 'r' + ri;
      var expanded = !!expandedKeys[key];
      var companyRow = '<tr class="report-row--company' + (expanded ? ' expanded' : '') + '" data-toggle="' + key + '">' +
        '<td><span class="report-chevron">▶</span>' + row.company + '</td><td>' + row.subsidiary + '</td><td>All</td>' +
        row.perMonth.map(function (v) { return '<td>' + fmtMoney(v, currency) + '</td>'; }).join('') +
        '<td class="cell-strong">' + fmtMoney(row.total, currency) + '</td><td>' + fmtMoney(row.owner, currency) + '</td><td>' + row.bookings + '</td></tr>';
      var villaRows = expanded ? row.villas.map(function (v) {
        return '<tr class="report-row--villa"><td>' + v.villaName + '</td><td>' + row.subsidiary + '</td><td>' + v.villaName + '</td>' +
          v.perMonth.map(function (m) { return '<td>' + fmtMoney(m, currency) + '</td>'; }).join('') +
          '<td>' + fmtMoney(v.total, currency) + '</td><td>' + fmtMoney(v.owner, currency) + '</td><td>' + v.bookings + '</td></tr>';
      }).join('') : '';
      return companyRow + villaRows;
    }).join('');
    document.getElementById('report-tbody').innerHTML = rowsHtml;
  }

  document.getElementById('report-tbody').addEventListener('click', function (e) {
    var row = e.target.closest('[data-toggle]');
    if (!row) return;
    var key = row.getAttribute('data-toggle');
    expandedKeys[key] = !expandedKeys[key];
    renderTable();
  });

  document.getElementById('download-btn').addEventListener('click', function () {
    if (!lastReport) { MM.showToast('Calculate the report first', { danger: true }); return; }
    MM.showToast('Preparing Excel download...');
  });

  document.getElementById('calc-btn').click();
})();
