
  var PERIOD_DATA = {
    today:   { revenue: 'AUD 2,940', orders: 9,   refunds: 2, bookings: 6,  trend: [18,22,19,26,24,30] },
    week:    { revenue: 'AUD 11,860', orders: 41, refunds: 4, bookings: 19, trend: [60,72,68,80,76,92] },
    month:   { revenue: 'AUD 42,180', orders: 168, refunds: 5, bookings: 57, trend: [210,238,224,260,255,298] },
    quarter: { revenue: 'AUD 118,420', orders: 512, refunds: 11, bookings: 143, trend: [640,690,712,755,780,822] }
  };
  var ATTENTION_ROWS = (typeof DATA_YEU_CAU_HOAN_TIEN !== 'undefined')
    ? DATA_YEU_CAU_HOAN_TIEN.filter(function (r) { return r.status === 'Pending Approval' || r.status === 'Initiated'; })
    : [];

  function badgeForRefund(status) {
    var map = { 'Pending Approval': 'warning', 'Initiated': 'info', 'Approved': 'success', 'Rejected': 'error', 'Refund API Sent': 'primary', 'Completed': 'success' };
    return '<span class="badge badge-' + (map[status] || 'neutral') + '">' + status + '</span>';
  }

  function renderTrend(values) {
    var w = 560, h = 200, pad = 10;
    var max = Math.max.apply(null, values) * 1.15;
    var step = (w - pad * 2) / (values.length - 1);
    var pts = values.map(function (v, i) {
      var x = pad + i * step;
      var y = h - pad - (v / max) * (h - pad * 2);
      return x + ',' + y;
    });
    document.getElementById('trendLine').setAttribute('points', pts.join(' '));
    var areaPts = pts.slice();
    areaPts.push((pad + (values.length - 1) * step) + ',' + (h - pad));
    areaPts.push(pad + ',' + (h - pad));
    document.getElementById('trendArea').setAttribute('points', areaPts.join(' '));
  }

  function renderDonut() {
    var orders = (typeof DATA_DON_HANG !== 'undefined') ? DATA_DON_HANG : [];
    var counts = { Event: 0, 'Hospital Tour': 0, Online: 0, Retail: 0 };
    orders.forEach(function (o) { if (counts[o.purchaseSource] !== undefined) counts[o.purchaseSource]++; });
    var total = Object.values(counts).reduce(function (a, b) { return a + b; }, 0) || 1;
    var colors = { Event: '#B9770E', 'Hospital Tour': '#2A5DA6', Online: '#019770', Retail: '#4C5FFF' };
    var acc = 0;
    var stops = [];
    Object.keys(counts).forEach(function (k) {
      var pct = counts[k] / total * 100;
      stops.push(colors[k] + ' ' + acc + '% ' + (acc + pct) + '%');
      acc += pct;
    });
    document.getElementById('donutChart').style.background = 'conic-gradient(' + stops.join(',') + ')';
    var legend = document.getElementById('donutLegend');
    legend.innerHTML = Object.keys(counts).map(function (k) {
      return '<span><span class="legend-dot" style="background:' + colors[k] + ';"></span>' + k + ' — ' + counts[k] + ' orders</span>';
    }).join('');
  }

  function applyPeriod(period) {
    var d = PERIOD_DATA[period];
    document.getElementById('kpiRevenue').textContent = d.revenue;
    document.getElementById('kpiOrders').textContent = d.orders;
    document.getElementById('kpiRefunds').textContent = d.refunds;
    document.getElementById('kpiBookings').textContent = d.bookings;
    renderTrend(d.trend);
    document.querySelectorAll('.chip[data-period]').forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-period') === period);
    });
  }

  document.querySelectorAll('.chip[data-period]').forEach(function (chip) {
    chip.addEventListener('click', function () { applyPeriod(chip.getAttribute('data-period')); });
  });

  function renderAttention() {
    var tbody = document.querySelector('#attentionTable tbody');
    if (!ATTENTION_ROWS.length) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--gray-500);padding:var(--sp-6);">Nothing needs attention right now.</td></tr>';
      return;
    }
    tbody.innerHTML = ATTENTION_ROWS.map(function (r) {
      return '<tr><td class="cell-strong">' + r.id + '</td><td>' + r.customerName + ' — AUD ' + r.amount.toFixed(2) + '</td><td>' + badgeForRefund(r.status) + '</td>' +
        '<td class="row-actions"><a class="btn btn-ghost btn-sm" href="../../screens/don-hang/duyet-yeu-cau-hoan-tien/index.html">Review</a></td></tr>';
    }).join('');
  }

  applyPeriod('month');
  renderDonut();
  renderAttention();
  