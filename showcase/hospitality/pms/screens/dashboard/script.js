(function () {
  'use strict';

  /* ---------------------------------------------------------------- */
  /* Revenue line chart (last 7 days) — pure SVG, no libraries          */
  /* ---------------------------------------------------------------- */

  var revenueData = [
    { day: 'Wed', value: 58000 }, { day: 'Thu', value: 64000 }, { day: 'Fri', value: 71000 },
    { day: 'Sat', value: 96000 }, { day: 'Sun', value: 88000 }, { day: 'Mon', value: 60000 },
    { day: 'Tue', value: 74000 }
  ];

  (function renderRevenueChart() {
    var svg = document.getElementById('revenue-chart');
    var W = 560, H = 220, padL = 44, padR = 12, padT = 16, padB = 30;
    var innerW = W - padL - padR, innerH = H - padT - padB;
    var max = Math.max.apply(null, revenueData.map(function (d) { return d.value; })) * 1.15;

    var points = revenueData.map(function (d, i) {
      var x = padL + (innerW / (revenueData.length - 1)) * i;
      var y = padT + innerH - (d.value / max) * innerH;
      return { x: x, y: y, d: d };
    });

    var linePath = points.map(function (p, i) { return (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' ');
    var areaPath = linePath + ' L' + points[points.length - 1].x.toFixed(1) + ',' + (padT + innerH) + ' L' + points[0].x.toFixed(1) + ',' + (padT + innerH) + ' Z';

    var gridLines = '';
    for (var g = 0; g <= 3; g++) {
      var gy = padT + (innerH / 3) * g;
      gridLines += '<line x1="' + padL + '" y1="' + gy + '" x2="' + (W - padR) + '" y2="' + gy + '" stroke="var(--color-gray-100)" stroke-width="1"/>';
    }

    var labels = points.map(function (p) {
      return '<text x="' + p.x + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="var(--color-gray-500)">' + p.d.day + '</text>';
    }).join('');

    var dots = points.map(function (p) {
      return '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="4" fill="var(--color-primary-dark)" stroke="white" stroke-width="2"><title>' + p.d.day + ': $' + p.d.value.toLocaleString() + '</title></circle>';
    }).join('');

    svg.innerHTML =
      '<defs><linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.35"/>' +
      '<stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0"/></linearGradient></defs>' +
      gridLines +
      '<path d="' + areaPath + '" fill="url(#revFill)"/>' +
      '<path d="' + linePath + '" fill="none" stroke="var(--color-primary-dark)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      dots + labels;
  })();

  /* ---------------------------------------------------------------- */
  /* Occupancy donut chart by Business Unit                            */
  /* ---------------------------------------------------------------- */

  (function renderOccupancyChart() {
    var svg = document.getElementById('occupancy-chart');
    var data = [
      { label: 'Phuket Collection', value: 82, color: 'var(--color-primary-dark)' },
      { label: 'Bali Retreats', value: 71, color: 'var(--color-primary)' },
      { label: 'Koh Samui Estates', value: 64, color: 'var(--color-accent)' }
    ];
    var cx = 70, cy = 100, r = 54, sw = 16;

    // Each ring represents its own % out of 100, drawn as concentric arcs for clarity.
    var rings = data.map(function (d, i) {
      var ring_r = r - i * (sw + 4);
      var circ = 2 * Math.PI * ring_r;
      var dash = (d.value / 100) * circ;
      return '<circle cx="' + cx + '" cy="' + cy + '" r="' + ring_r + '" fill="none" stroke="var(--color-gray-100)" stroke-width="' + sw + '"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + ring_r + '" fill="none" stroke="' + d.color + '" stroke-width="' + sw + '" ' +
        'stroke-dasharray="' + dash.toFixed(1) + ' ' + circ.toFixed(1) + '" stroke-linecap="round" transform="rotate(-90 ' + cx + ' ' + cy + ')"><title>' + d.label + ': ' + d.value + '%</title></circle>';
    }).join('');

    var legend = data.map(function (d, i) {
      return '<g transform="translate(150,' + (56 + i * 34) + ')">' +
        '<rect width="10" height="10" rx="3" fill="' + d.color + '"/>' +
        '<text x="16" y="9" font-size="12" fill="var(--color-gray-700)">' + d.label + '</text>' +
        '<text x="16" y="24" font-size="13" font-weight="700" fill="var(--color-primary-dark)">' + d.value + '%</text>' +
        '</g>';
    }).join('');

    svg.innerHTML = rings + legend;
  })();

  /* ---------------------------------------------------------------- */
  /* Recent activity table — from shared mock bookings                 */
  /* ---------------------------------------------------------------- */

  (function renderRecentActivity() {
    var tbody = document.getElementById('recent-activity-body');
    var statusMap = {
      confirmed: 'badge-info', 'checked-in': 'badge-success', pending: 'badge-warning', cancelled: 'badge-danger'
    };
    tbody.innerHTML = MM.MOCK_BOOKINGS.slice(0, 5).map(function (b) {
      return '<tr class="clickable" onclick="window.location.href=\'../booking/book-002-booking-list/index.html\'">' +
        '<td class="cell-strong">' + b.id + '</td>' +
        '<td>' + b.property + '</td>' +
        '<td>' + b.guest + '</td>' +
        '<td class="cell-sub">' + b.checkIn + ' &rarr; ' + b.checkOut + '</td>' +
        '<td><span class="badge ' + (statusMap[b.status] || 'badge-neutral') + '">' + b.status.replace('-', ' ') + '</span></td>' +
        '<td class="cell-num">$' + b.total.toLocaleString() + '</td>' +
        '</tr>';
    }).join('');
  })();

  /* ---------------------------------------------------------------- */
  /* Property Readiness — signature moment, derived from real fields   */
  /* ---------------------------------------------------------------- */

  (function renderReadiness() {
    var props = MM.MOCK_PROPERTIES;
    var noConcierge = props.filter(function (p) { return !p.concierge; }).length;
    var missingPhotos = props.filter(function (p) { return !p.photosComplete; }).length;
    var stuckOnboarding = props.filter(function (p) { return p.onboarding === 'onboarding'; }).length;
    var ready = props.filter(function (p) { return p.concierge && p.photosComplete && p.onboarding === 'live'; }).length;
    var pct = Math.round((ready / props.length) * 100);

    document.getElementById('readiness-concierge').textContent = noConcierge;
    document.getElementById('readiness-photos').textContent = missingPhotos;
    document.getElementById('readiness-onboarding').textContent = stuckOnboarding;
    document.getElementById('readiness-pct').textContent = pct + '%';

    var ring = document.getElementById('readiness-ring');
    var r = 50, circ = 2 * Math.PI * r;
    ring.setAttribute('stroke-dasharray', (circ * pct / 100).toFixed(1) + ' ' + circ.toFixed(1));
    ring.setAttribute('stroke', pct >= 75 ? 'var(--color-success)' : pct >= 50 ? 'var(--color-warning)' : 'var(--color-accent)');
  })();
})();
