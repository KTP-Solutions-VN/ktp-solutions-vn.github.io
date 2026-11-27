(function () {
  'use strict';
  var BOOK = MM.BOOK;
  var analyseForm = document.getElementById('analyse-form');
  MM.bindFormValidation(analyseForm);

  var buSelect = document.getElementById('f-bu');
  (BOOK.BUSINESS_UNITS || []).forEach(function (bu) {
    var opt = document.createElement('option'); opt.value = bu; opt.textContent = bu; buSelect.appendChild(opt);
  });
  var typeSelect = document.getElementById('f-type');
  (BOOK.PROPERTY_TYPES || []).forEach(function (t) {
    var opt = document.createElement('option'); opt.value = t; opt.textContent = t; typeSelect.appendChild(opt);
  });

  function toISO(d) { return d.toISOString().slice(0, 10); }
  var today = new Date();
  var plus30 = new Date(today.getTime() + 30 * 86400000);
  document.getElementById('f-start').value = toISO(today);
  document.getElementById('f-end').value = toISO(plus30);

  var analysis = null;

  function hashSeed(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    return h >>> 0;
  }

  function setStep(n) {
    [1, 2, 3].forEach(function (i) {
      var el = document.getElementById('step' + i + '-ind');
      el.classList.remove('active', 'done');
      if (i < n) el.classList.add('done');
      if (i === n) el.classList.add('active');
    });
  }

  function drawChart(days, avg, seedKey) {
    var svg = document.getElementById('occ-chart');
    var W = 640, H = 220, padL = 40, padR = 12, padT = 16, padB = 28;
    var innerW = W - padL - padR, innerH = H - padT - padB;
    var n = Math.min(days, 30);
    var points = [];
    for (var i = 0; i < n; i++) {
      var seed = hashSeed(seedKey + '|' + i);
      var wobble = ((seed % 40) - 20);
      var val = Math.max(5, Math.min(100, avg + wobble));
      var x = padL + (n > 1 ? (innerW / (n - 1)) * i : 0);
      var y = padT + innerH - (val / 100) * innerH;
      points.push({ x: x, y: y, val: val, i: i });
    }
    var linePath = points.map(function (p, i) { return (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' ');
    var areaPath = linePath + ' L' + points[points.length - 1].x.toFixed(1) + ',' + (padT + innerH) + ' L' + points[0].x.toFixed(1) + ',' + (padT + innerH) + ' Z';
    var gridLines = '';
    for (var g = 0; g <= 3; g++) {
      var gy = padT + (innerH / 3) * g;
      gridLines += '<line x1="' + padL + '" y1="' + gy + '" x2="' + (W - padR) + '" y2="' + gy + '" stroke="var(--color-gray-100)" stroke-width="1"/>';
    }
    svg.innerHTML =
      '<defs><linearGradient id="occFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0"/></linearGradient></defs>' +
      gridLines +
      '<path d="' + areaPath + '" fill="url(#occFill)"/>' +
      '<path d="' + linePath + '" fill="none" stroke="var(--color-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      points.map(function (p) { return '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="3" fill="var(--color-primary)"><title>Day ' + (p.i + 1) + ': ' + p.val + '%</title></circle>'; }).join('');
  }

  document.getElementById('btn-analyse').addEventListener('click', function () {
    if (!MM.validateForm(analyseForm)) return;
    var start = document.getElementById('f-start').value;
    var end = document.getElementById('f-end').value;
    if (new Date(end) < new Date(start)) {
      var g = document.getElementById('f-end').closest('.form-group');
      g.classList.add('has-error'); g.querySelector('.form-error').textContent = 'End date must be after start date.';
      return;
    }
    var bu = buSelect.value, type = typeSelect.value;
    var result = BOOK.analyseOccupancy(bu, type);
    var days = Math.max(1, Math.round((new Date(end) - new Date(start)) / 86400000) + 1);
    var belowLow = result.rows.filter(function (r) { return r.occupancy < result.loPercent; }).length;
    var aboveHigh = result.rows.filter(function (r) { return r.occupancy > result.hiPercent; }).length;

    analysis = { bu: bu, type: type, start: start, end: end, days: days, rows: result.rows, average: result.average, loPercent: result.loPercent, hiPercent: result.hiPercent, belowLow: belowLow, aboveHigh: aboveHigh };

    document.getElementById('r-days').textContent = days;
    document.getElementById('r-villas').textContent = result.rows.length;
    document.getElementById('r-avg').textContent = result.average + '%';
    document.getElementById('r-thresh-count').textContent = belowLow + ' / ' + aboveHigh;
    document.getElementById('f-high').value = result.hiPercent;
    document.getElementById('f-low').value = result.loPercent;

    drawChart(days, result.average, bu + '|' + type + '|' + start);

    document.getElementById('analysis-results').hidden = false;
    document.getElementById('villa-actions-card').hidden = true;
    document.getElementById('save-row').hidden = true;
    setStep(2);
    document.getElementById('analysis-results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  document.getElementById('btn-check-actions').addEventListener('click', function () {
    if (!analysis) return;
    var high = Number(document.getElementById('f-high').value);
    var low = Number(document.getElementById('f-low').value);
    if (isNaN(high) || high < 0 || high > 100 || isNaN(low) || low < 0 || low > 100) {
      MM.showToast('Enter valid thresholds between 0 and 100', { danger: true });
      return;
    }
    analysis.highPercent = high;
    analysis.lowPercent = low;

    document.getElementById('villa-tbody').innerHTML = analysis.rows.map(function (r) {
      var cls = r.occupancy < low ? 'occ-red' : (r.occupancy > high ? 'occ-green' : 'occ-amber');
      var suggestion = r.occupancy < low
        ? 'Low occupancy — consider a promotional rate.'
        : (r.occupancy > high ? 'High demand — consider a rate increase.' : '');
      return '<tr>' +
        '<td class="cell-strong">' + r.villaName + '</td>' +
        '<td class="' + cls + '">' + r.occupancy + '%</td>' +
        '<td><input type="text" data-note="' + r.villaId + '" value="' + suggestion.replace(/"/g, '&quot;') + '" placeholder="Action note for this villa"></td>' +
        '</tr>';
    }).join('');

    document.getElementById('villa-actions-card').hidden = false;
    document.getElementById('save-row').hidden = false;
    setStep(3);
    document.getElementById('villa-actions-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  document.getElementById('btn-save-action').addEventListener('click', function () {
    if (!analysis) return;
    var villas = analysis.rows.map(function (r) {
      var input = document.querySelector('[data-note="' + r.villaId + '"]');
      return { villaId: r.villaId, villaName: r.villaName, occupancy: r.occupancy, action: input ? input.value.trim() : '' };
    });
    var btn = document.getElementById('btn-save-action');
    MM.simulateSave(btn, 'Saving...', function () {
      BOOK.addAction({
        bu: analysis.bu || 'All Business Units',
        propertyType: analysis.type || '',
        startDate: analysis.start,
        endDate: analysis.end,
        numberOfDays: analysis.days,
        numberOfProperties: analysis.rows.length,
        occupancyPercent: analysis.average,
        highPercent: analysis.highPercent,
        lowPercent: analysis.lowPercent,
        propertyLowOccupancy: analysis.belowLow,
        propertyHighOccupancy: analysis.aboveHigh,
        villas: villas
      });
      MM.showToast('Occupancy action saved');
      setTimeout(function () { window.location.href = '../book-103-occupancy-based-action-list/index.html'; }, 500);
    });
  });
})();
