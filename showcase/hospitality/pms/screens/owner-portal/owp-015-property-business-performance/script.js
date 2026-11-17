(function () {
  'use strict';
  var months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  var values = [24000, 28500, 33000, 36800, 41200, 45500];
  var svg = document.getElementById('perf-chart');
  var W = 560, H = 200, padL = 40, padR = 10, padT = 10, padB = 26;
  var innerW = W - padL - padR, innerH = H - padT - padB;
  var max = Math.max.apply(null, values) * 1.15;
  var points = values.map(function (v, i) {
    var x = padL + (innerW / (values.length - 1)) * i;
    var y = padT + innerH - (v / max) * innerH;
    return { x: x, y: y };
  });
  var path = points.map(function (p, i) { return (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' ');
  var labels = months.map(function (m, i) { return '<text x="' + points[i].x + '" y="' + (H - 6) + '" text-anchor="middle" font-size="11" fill="var(--color-gray-500)">' + m + '</text>'; }).join('');
  svg.innerHTML = '<path d="' + path + '" fill="none" stroke="var(--color-primary-dark)" stroke-width="2.5"/>' + labels;
})();
