/* Reports screen behaviour — draws a mock SVG revenue trend line and
   renders horizontal occupancy bars, all from static mock data. */

(function () {
  'use strict';

  /* --- Revenue trend line (hand-built SVG path, no chart library) --- */

  var REVENUE = [62, 68, 71, 66, 74, 80, 86, 83, 90, 96, 92, 99];

  function buildTrend() {
    var svg = document.getElementById('trend-svg');
    var w = 520, h = 180, pad = 20;
    var max = Math.max.apply(null, REVENUE);
    var min = Math.min.apply(null, REVENUE);
    var stepX = (w - pad * 2) / (REVENUE.length - 1);

    function y(v) {
      return h - pad - ((v - min) / (max - min)) * (h - pad * 2);
    }

    var points = REVENUE.map(function (v, i) { return (pad + i * stepX) + ',' + y(v); });
    var linePath = 'M' + points.join(' L');
    var areaPath = linePath + ' L' + (pad + (REVENUE.length - 1) * stepX) + ',' + (h - pad) + ' L' + pad + ',' + (h - pad) + ' Z';

    var ns = 'http://www.w3.org/2000/svg';
    var defs = document.createElementNS(ns, 'defs');
    defs.innerHTML = '<linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#4C5FFF" stop-opacity="0.35"/>' +
      '<stop offset="100%" stop-color="#4C5FFF" stop-opacity="0"/>' +
      '</linearGradient>';
    svg.appendChild(defs);

    var area = document.createElementNS(ns, 'path');
    area.setAttribute('d', areaPath);
    area.setAttribute('fill', 'url(#trendFill)');
    svg.appendChild(area);

    var line = document.createElementNS(ns, 'path');
    line.setAttribute('d', linePath);
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', '#00084A');
    line.setAttribute('stroke-width', '2.5');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(line);

    REVENUE.forEach(function (v, i) {
      var dot = document.createElementNS(ns, 'circle');
      dot.setAttribute('cx', pad + i * stepX);
      dot.setAttribute('cy', y(v));
      dot.setAttribute('r', 3.5);
      dot.setAttribute('fill', '#00084A');
      var title = document.createElementNS(ns, 'title');
      title.textContent = '$' + (v * 1000).toLocaleString();
      dot.appendChild(title);
      svg.appendChild(dot);
    });
  }

  /* --- Occupancy by property horizontal bars --- */

  var OCCUPANCY = [
    { label: 'Villa Ocean Breeze', value: 88 },
    { label: 'Aegean Sunset Villa', value: 74 },
    { label: 'Sunset Cove Bungalow', value: 69 },
    { label: 'Palm Grove Residence', value: 81 },
    { label: 'Caribbean Blue Villa', value: 58 },
    { label: 'Sunshine Coast Bungalow', value: 77 }
  ];

  function buildBars() {
    var container = document.getElementById('hbar-list');
    OCCUPANCY.forEach(function (o) {
      var row = document.createElement('div');
      row.className = 'hbar-row';
      row.innerHTML =
        '<div class="hbar-row__label">' + o.label + '</div>' +
        '<div class="hbar-row__track"><div class="hbar-row__fill" style="width:' + o.value + '%"></div></div>' +
        '<div class="hbar-row__value">' + o.value + '%</div>';
      container.appendChild(row);
    });
  }

  buildTrend();
  buildBars();
})();
