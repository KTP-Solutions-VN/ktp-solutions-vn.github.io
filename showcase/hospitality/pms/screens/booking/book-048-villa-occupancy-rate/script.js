document.addEventListener('DOMContentLoaded', function () {
  var buSelect = document.getElementById('bu-filter');
  var typeSelect = document.getElementById('type-filter');

  MM.BOOK.BUSINESS_UNITS.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSelect.appendChild(o);
  });
  MM.BOOK.PROPERTY_TYPES.forEach(function (t) {
    var o = document.createElement('option'); o.value = t; o.textContent = t; typeSelect.appendChild(o);
  });

  function monthLabel(d) { return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }); }
  function bandClass(pct) { return pct >= 60 ? 'badge-success' : pct >= 30 ? 'badge-warning' : 'badge-danger'; }

  function render() {
    var bu = buSelect.value, type = typeSelect.value;
    var months = [];
    var cursor = new Date(); cursor.setDate(1); cursor.setHours(0, 0, 0, 0);
    for (var i = 0; i < 6; i++) {
      var start = new Date(cursor.getFullYear(), cursor.getMonth() + i, 1);
      var end = new Date(cursor.getFullYear(), cursor.getMonth() + i + 1, 1);
      months.push({ label: monthLabel(start), start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) });
    }

    var perMonth = months.map(function (m) { return MM.BOOK.analyseOccupancy(bu, m.start, m.end, type); });
    var villas = MM.BOOK.VILLAS.filter(function (v) {
      if (bu && v.bu !== bu) return false;
      if (type && MM.BOOK.villaPropertyType(v.id) !== type) return false;
      return true;
    });

    // Summary cards from the current month's analysis.
    var current = perMonth[0];
    document.getElementById('summary-cards').innerHTML =
      '<div class="stat-card"><div class="stat-card__label">Villas in Scope</div><div class="stat-card__value">' + current.numberOfProperties + '</div></div>' +
      '<div class="stat-card accent"><div class="stat-card__label">Avg. Occupancy (' + months[0].label + ')</div><div class="stat-card__value">' + current.occupancyPercent + '%</div></div>' +
      '<div class="stat-card success"><div class="stat-card__label">Highest Villa</div><div class="stat-card__value">' + current.hiPercent + '%</div></div>' +
      '<div class="stat-card warning"><div class="stat-card__label">Lowest Villa</div><div class="stat-card__value">' + current.loPercent + '%</div></div>';

    var head = '<th>Villa</th><th>Rate / night</th>' + months.map(function (m) { return '<th>' + m.label + '</th>'; }).join('');
    document.getElementById('occ-head').innerHTML = head;

    var tbody = document.getElementById('occ-rows');
    if (!villas.length) {
      tbody.innerHTML = '<tr><td colspan="' + (months.length + 2) + '"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>' +
        '<h3>No villas match this filter</h3><p>Try a different business unit or villa category.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = villas.map(function (v) {
      var cells = perMonth.map(function (analysis) {
        var row = analysis.perVilla.filter(function (p) { return p.villaId === v.id; })[0];
        var pct = row ? row.occupancyPercent : 0;
        return '<td class="cell-num"><span class="badge ' + bandClass(pct) + '">' + pct + '%</span></td>';
      }).join('');
      return '<tr><td class="cell-strong">' + v.name + '</td><td class="cell-num">' + (v.rate ? MM.BOOK.fmtMoney(v.rate) : '—') + '</td>' + cells + '</tr>';
    }).join('');
  }

  document.getElementById('filter-btn').addEventListener('click', render);
  buSelect.addEventListener('change', render);
  typeSelect.addEventListener('change', render);
  document.getElementById('download-btn').addEventListener('click', function () {
    MM.showToast('Occupancy report exported (demo).');
  });

  render();
});
