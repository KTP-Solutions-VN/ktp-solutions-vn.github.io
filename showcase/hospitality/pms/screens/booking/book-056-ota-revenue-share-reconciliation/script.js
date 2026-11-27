document.addEventListener('DOMContentLoaded', function () {
  var CHANNEL_COLORS = {
    'Booking.com': '#D4A85A',
    'Airbnb': '#F04438',
    'Expedia': '#F2A93C',
    'Agoda': '#2FAE6C',
    'VRBO': '#8A94A6'
  };

  var villaSel = document.getElementById('villa_id');
  MM.BOOK.VILLAS.forEach(function (v) {
    var o = document.createElement('option');
    o.value = v.id; o.textContent = v.name;
    villaSel.appendChild(o);
  });
  villaSel.value = 'PV-101';

  var monthOffset = 0;

  function periodLabel() {
    var base = new Date(2026, 6 + monthOffset, 1);
    return base.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  // Deterministic pseudo-random commission split per villa/month, seeded so the
  // same villa+period always renders the same numbers within a demo session.
  function seededSplit(seed) {
    var weights = MM.BOOK.OTA_CHANNELS.map(function (c, i) {
      var x = Math.sin(seed * 13 + i * 7.3) * 10000;
      return 0.4 + Math.abs(x - Math.floor(x));
    });
    var sum = weights.reduce(function (a, b) { return a + b; }, 0);
    return weights.map(function (w) { return w / sum; });
  }

  function render() {
    var villaId = villaSel.value;
    var villa = MM.BOOK.villaById(villaId);
    document.getElementById('chart-villa-label').textContent = villa ? villa.name + ' — ' + periodLabel() : 'Select a villa above';
    document.getElementById('period-label').textContent = periodLabel();

    var seed = (villaId ? villaId.length : 1) + monthOffset;
    var shares = seededSplit(seed);
    var baseCommission = 3200 + (seed % 5) * 420;
    var commissions = shares.map(function (s) { return Math.round(baseCommission * s); });
    var totalCommission = commissions.reduce(function (a, b) { return a + b; }, 0);

    // Donut chart via stacked circle strokes on a 42x42 viewBox (r=15.9, circumference ~100)
    var svg = document.getElementById('pie-chart');
    svg.innerHTML = '';
    var cumulative = 0;
    MM.BOOK.OTA_CHANNELS.forEach(function (ch, i) {
      var pct = totalCommission ? (commissions[i] / totalCommission) * 100 : 0;
      var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '21'); circle.setAttribute('cy', '21'); circle.setAttribute('r', '15.9');
      circle.setAttribute('fill', 'transparent');
      circle.setAttribute('stroke', CHANNEL_COLORS[ch]);
      circle.setAttribute('stroke-width', '7');
      circle.setAttribute('stroke-dasharray', pct.toFixed(2) + ' ' + (100 - pct).toFixed(2));
      circle.setAttribute('stroke-dashoffset', (-cumulative).toFixed(2));
      circle.setAttribute('transform', 'rotate(-90 21 21)');
      svg.appendChild(circle);
      cumulative += pct;
    });

    var legend = document.getElementById('pie-legend');
    legend.innerHTML = MM.BOOK.OTA_CHANNELS.map(function (ch, i) {
      var pct = totalCommission ? Math.round((commissions[i] / totalCommission) * 100) : 0;
      return '<div class="pie-legend__item"><span class="pie-legend__swatch" style="background:' + CHANNEL_COLORS[ch] + ';"></span>' + ch + ' — ' + pct + '%</div>';
    }).join('');

    document.getElementById('table-commission').innerHTML = MM.BOOK.OTA_CHANNELS.map(function (ch, i) {
      return '<tr><td>' + ch + '</td><td class="cell-num">' + MM.BOOK.fmtMoney(commissions[i]) + '</td></tr>';
    }).join('');

    var prevSeed = seed - 1;
    var prevShares = seededSplit(prevSeed);
    var prevBase = 3200 + (prevSeed % 5) * 420;
    var prevCommissions = prevShares.map(function (s) { return Math.round(prevBase * s); });

    var ranked = MM.BOOK.OTA_CHANNELS.map(function (ch, i) { return { ch: ch, cur: commissions[i], prev: prevCommissions[i] }; })
      .sort(function (a, b) { return b.cur - a.cur; });

    document.getElementById('table-comparison').innerHTML = ranked.map(function (r, idx) {
      var variation = r.prev ? Math.round(((r.cur - r.prev) / r.prev) * 100) : 0;
      var cls = variation >= 0 ? 'variation-up' : 'variation-down';
      var sign = variation >= 0 ? '+' : '';
      return '<tr><td>' + r.ch + '</td><td class="cell-num">' + MM.BOOK.fmtMoney(r.cur) + '</td><td>#' + (idx + 1) + '</td><td class="cell-num">' + MM.BOOK.fmtMoney(r.prev) + '</td><td class="' + cls + '">' + sign + variation + '%</td></tr>';
    }).join('');
  }

  villaSel.addEventListener('change', function () { MM.validateField(villaSel); render(); });
  document.getElementById('date_from').addEventListener('change', render);
  document.getElementById('date_to').addEventListener('change', render);
  document.getElementById('btn-prev-month').addEventListener('click', function () { monthOffset -= 1; render(); });
  document.getElementById('btn-next-month').addEventListener('click', function () { monthOffset += 1; render(); });

  render();
});
