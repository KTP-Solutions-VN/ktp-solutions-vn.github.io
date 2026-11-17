document.addEventListener('DOMContentLoaded', function () {
  var buSelect = document.getElementById('bu-filter');
  var periodSelect = document.getElementById('period-filter');
  var intervalSelect = document.getElementById('interval-filter');
  var currencySelect = document.getElementById('currency-filter');
  var NOW = new Date('2026-09-03T12:00:00');

  MM.BOOK.BUSINESS_UNITS.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSelect.appendChild(o);
  });
  MM.BOOK.CURRENCIES.forEach(function (c) {
    var o = document.createElement('option'); o.value = c; o.textContent = c; if (c === 'USD') o.selected = true; currencySelect.appendChild(o);
  });

  function periodCutoff() {
    var v = periodSelect.value;
    var d = new Date(NOW);
    if (v === '24h') d.setDate(d.getDate() - 1);
    else if (v === '7d') d.setDate(d.getDate() - 7);
    else if (v === '30d') d.setDate(d.getDate() - 30);
    else return null;
    return d;
  }

  function filteredRows() {
    var cutoff = periodCutoff();
    return MM.BOOK.getAllBookings().filter(function (b) {
      if (!b.bookingDate) return false;
      var villa = MM.BOOK.villaByName(b.property);
      if (buSelect.value && (!villa || villa.bu !== buSelect.value)) return false;
      if (cutoff && new Date(b.bookingDate) < cutoff) return false;
      return true;
    }).sort(function (a, b) { return new Date(b.bookingDate) - new Date(a.bookingDate); });
  }

  function convert(amountUsd) {
    var code = currencySelect.value || 'USD';
    var rate = MM.BOOK.FX_RATES[code] || 1;
    return amountUsd * rate;
  }

  function renderTable() {
    var rows = filteredRows();
    var tbody = document.getElementById('latest-rows');
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' +
        '<h3>No bookings in this period</h3><p>Widen the period filter or clear the business unit filter.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(function (b) {
      var net = (b.amount || b.total || 0) - (b.commission || 0);
      return '<tr>' +
        '<td class="cell-num">' + MM.BOOK.fmtDateTime(b.bookingDate) + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(b.checkIn) + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(b.checkOut) + '</td>' +
        '<td>' + (b.referer || 'Direct') + '</td>' +
        '<td class="cell-strong">' + b.property + '</td>' +
        '<td>' + b.guest + '</td>' +
        '<td>' + (currencySelect.value || 'USD') + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtCurrency(convert(net), currencySelect.value) + '</td>' +
        '<td><a class="btn btn-ghost btn-sm" href="../book-028-booking-details-full/index.html?id=' + encodeURIComponent(b.id) + '">View</a></td>' +
      '</tr>';
    }).join('');
  }

  function renderChart() {
    var rows = filteredRows();
    var interval = intervalSelect.value;
    var buckets = {};
    rows.forEach(function (b) {
      var d = new Date(b.bookingDate);
      var key;
      if (interval === 'day') key = d.toISOString().slice(0, 10);
      else if (interval === 'month') key = d.toISOString().slice(0, 7);
      else { var week = Math.ceil(d.getDate() / 7); key = d.toISOString().slice(0, 7) + '-W' + week; }
      var net = (b.amount || b.total || 0) - (b.commission || 0);
      buckets[key] = (buckets[key] || 0) + net;
    });
    var keys = Object.keys(buckets).sort();
    var svg = document.getElementById('revenue-chart');
    if (!keys.length) { svg.innerHTML = ''; return; }
    var max = Math.max.apply(null, keys.map(function (k) { return buckets[k]; }));
    var w = 700, h = 200, padB = 24, barGap = 8;
    var barW = Math.max(10, (w - keys.length * barGap) / keys.length);
    var html = '';
    keys.forEach(function (k, i) {
      var val = buckets[k];
      var barH = max > 0 ? (val / max) * (h - padB - 16) : 0;
      var x = i * (barW + barGap) + barGap / 2;
      var y = h - padB - barH;
      html += '<rect class="chart-bar" x="' + x + '" y="' + y + '" width="' + barW + '" height="' + barH + '" rx="3"><title>' + k + ': ' + MM.BOOK.fmtCurrency(convert(val), currencySelect.value) + '</title></rect>';
      html += '<text class="chart-axis-label" x="' + (x + barW / 2) + '" y="' + (h - 6) + '" text-anchor="middle">' + k.slice(5) + '</text>';
    });
    svg.innerHTML = html;
  }

  function renderAll() { renderTable(); renderChart(); }

  [buSelect, periodSelect, intervalSelect, currencySelect].forEach(function (el) { el.addEventListener('change', renderAll); });
  document.getElementById('download-btn').addEventListener('click', function () {
    MM.showToast('Latest bookings report queued for download.');
  });

  renderAll();
});
