(function () {
  'use strict';
  var data = [{ label: 'Phuket Collection', value: 820000 }, { label: 'Bali Retreats', value: 640000 }, { label: 'Koh Samui Estates', value: 380000 }];
  var svg = document.getElementById('bu-chart');
  var W = 560, H = 220, padL = 140, padR = 40, padT = 10, barH = 34, gap = 24;
  var max = Math.max.apply(null, data.map(function (d) { return d.value; })) * 1.1;
  var innerW = W - padL - padR;
  var bars = data.map(function (d, i) {
    var y = padT + i * (barH + gap);
    var w = (d.value / max) * innerW;
    return '<text x="' + (padL - 10) + '" y="' + (y + barH / 2 + 4) + '" text-anchor="end" font-size="12" fill="var(--color-gray-700)">' + d.label + '</text>' +
      '<rect x="' + padL + '" y="' + y + '" width="' + w + '" height="' + barH + '" rx="6" fill="var(--color-primary-dark)"/>' +
      '<text x="' + (padL + w + 8) + '" y="' + (y + barH / 2 + 4) + '" font-size="12" font-weight="700" fill="var(--color-primary-dark)">$' + d.value.toLocaleString() + '</text>';
  }).join('');
  svg.innerHTML = bars;
})();
