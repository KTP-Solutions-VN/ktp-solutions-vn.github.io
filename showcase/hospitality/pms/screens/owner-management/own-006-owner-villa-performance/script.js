(function () {
  'use strict';
  var months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  var thisYear = [14000, 16500, 21000, 24800, 28200, 31500];
  var lastYear = [12000, 15000, 18500, 21000, 24500, 27000];
  var svg = document.getElementById('perf-chart');
  var W = 560, H = 200, padL = 40, padR = 10, padT = 10, padB = 26;
  var innerW = W - padL - padR, innerH = H - padT - padB;
  var max = Math.max.apply(null, thisYear.concat(lastYear)) * 1.15;
  function pathFor(data) {
    return data.map(function (v, i) {
      var x = padL + (innerW / (data.length - 1)) * i;
      var y = padT + innerH - (v / max) * innerH;
      return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');
  }
  var labels = months.map(function (m, i) {
    var x = padL + (innerW / (months.length - 1)) * i;
    return '<text x="' + x + '" y="' + (H - 6) + '" text-anchor="middle" font-size="11" fill="var(--color-gray-500)">' + m + '</text>';
  }).join('');
  svg.innerHTML =
    '<path d="' + pathFor(lastYear) + '" fill="none" stroke="var(--color-gray-300)" stroke-width="2" stroke-dasharray="4 3"/>' +
    '<path d="' + pathFor(thisYear) + '" fill="none" stroke="var(--color-primary)" stroke-width="2.5"/>' + labels;
})();
