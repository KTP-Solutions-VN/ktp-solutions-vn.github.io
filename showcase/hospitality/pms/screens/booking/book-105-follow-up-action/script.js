(function () {
  'use strict';
  var BOOK = MM.BOOK;

  function fmtShort(iso) {
    if (!iso) return '—';
    var d = new Date(iso + (iso.length <= 10 ? 'T00:00:00' : ''));
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  var params = new URLSearchParams(window.location.search);
  var rawId = params.get('id');
  var actionId = null;
  try { actionId = rawId ? window.atob(decodeURIComponent(rawId)) : null; } catch (e) { actionId = rawId; }
  var action = actionId ? BOOK.getActionById(actionId) : null;
  if (!action) action = BOOK.getActions()[0];

  document.getElementById('filter-summary').innerHTML = [
    ['Business Unit', action.bu || 'All Business Units'],
    ['Date Range', fmtShort(action.startDate) + ' – ' + fmtShort(action.endDate)],
    ['Villa Type', action.propertyType || 'All Types']
  ].map(function (row) { return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>'; }).join('');

  var current = BOOK.analyseOccupancy(action.bu, action.propertyType);
  var currentBelow = current.rows.filter(function (r) { return r.occupancy < (action.lowPercent || current.loPercent); }).length;
  var currentAbove = current.rows.filter(function (r) { return r.occupancy > (action.highPercent || current.hiPercent); }).length;

  function trendCell(then, now) {
    var cls = now > then ? 'trend-up' : (now < then ? 'trend-down' : '');
    var arrow = now > then ? '▲' : (now < then ? '▼' : '—');
    return '<td class="' + cls + '">' + now + ' ' + arrow + '</td>';
  }

  document.getElementById('compare-tbody').innerHTML =
    '<tr><td>Number of Days</td><td>' + action.numberOfDays + '</td><td>' + action.numberOfDays + '</td></tr>' +
    '<tr><td>Number of Villas</td><td>' + action.numberOfProperties + '</td><td>' + current.rows.length + '</td></tr>' +
    '<tr><td>Occupancy Rate</td><td>' + action.occupancyPercent + '%</td>' + trendCell(action.occupancyPercent, current.average) + '</tr>' +
    '<tr><td>Villas Below Low Threshold</td><td>' + action.propertyLowOccupancy + '</td>' + trendCell(action.propertyLowOccupancy, currentBelow) + '</tr>' +
    '<tr><td>Villas Above High Threshold</td><td>' + action.propertyHighOccupancy + '</td>' + trendCell(action.propertyHighOccupancy, currentAbove) + '</tr>';

  document.getElementById('villa-tbody').innerHTML = (action.villas || []).map(function (v) {
    return '<tr><td class="cell-strong">' + v.villaName + '</td><td>' + v.occupancy + '%</td><td>' + (v.action || '—') + '</td></tr>';
  }).join('');

  /* Simple two-point trend chart: at-creation vs current occupancy */
  (function drawChart() {
    var svg = document.getElementById('occ-trend-chart');
    var W = 640, H = 200, padL = 50, padR = 40, padT = 20, padB = 30;
    var innerW = W - padL - padR, innerH = H - padT - padB;
    var vals = [action.occupancyPercent, current.average];
    var labels = ['At Creation', 'Current'];
    var points = vals.map(function (v, i) {
      var x = padL + (innerW) * (i / (vals.length - 1));
      var y = padT + innerH - (v / 100) * innerH;
      return { x: x, y: y, v: v };
    });
    var linePath = points.map(function (p, i) { return (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' ');
    var gridLines = '';
    for (var g = 0; g <= 3; g++) {
      var gy = padT + (innerH / 3) * g;
      gridLines += '<line x1="' + padL + '" y1="' + gy + '" x2="' + (W - padR) + '" y2="' + gy + '" stroke="var(--color-gray-100)" stroke-width="1"/>';
    }
    svg.innerHTML = gridLines +
      '<path d="' + linePath + '" fill="none" stroke="var(--color-primary)" stroke-width="2.5" stroke-linecap="round"/>' +
      points.map(function (p, i) {
        return '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="5" fill="var(--color-primary)"/>' +
          '<text x="' + p.x.toFixed(1) + '" y="' + (p.y - 12) + '" text-anchor="middle" font-size="12" fill="var(--color-primary-dark)" font-weight="600">' + p.v + '%</text>' +
          '<text x="' + p.x.toFixed(1) + '" y="' + (H - 6) + '" text-anchor="middle" font-size="11" fill="var(--color-gray-500)">' + labels[i] + '</text>';
      }).join('');
  })();
})();
