(function () {
  'use strict';
  var VSV = MM.VSV;

  /* Mock stay + electricity bill history — independent of the check-in/check-out
     screens' own localStorage so this lookup tool always has data to demo with. */
  var STAYS = [
    { property: 'PV-101', guest: 'James Whitfield', checkIn: '2026-08-12', checkOut: '2026-08-19', meterIn: 4020, meterOut: 4245, unitsConsumed: 225, freeUnits: 0, charge: 77, discount: 0, amountPaid: 77, means: 'Cash' },
    { property: 'PV-101', guest: 'Sophia Rossi', checkIn: '2026-08-20', checkOut: '2026-08-25', meterIn: 4245, meterOut: 4402, unitsConsumed: 157, freeUnits: 0, charge: 53, discount: 4, amountPaid: 49, means: 'Credit Card' },
    { property: 'PV-101', guest: 'James Whitfield', checkIn: '2026-09-02', checkOut: '2026-09-09', meterIn: 4820, meterOut: null, unitsConsumed: null, freeUnits: 0, charge: null, discount: 0, amountPaid: null, means: null },
    { property: 'PV-102', guest: 'Anna Kowalski', checkIn: '2026-08-15', checkOut: '2026-08-21', meterIn: 3512, meterOut: 3512, unitsConsumed: 0, freeUnits: 0, charge: 18, discount: 0, amountPaid: 18, means: 'Online Payment' },
    { property: 'PV-102', guest: 'Michael Tan', checkIn: '2026-08-28', checkOut: '2026-09-01', meterIn: 3512, meterOut: 3512, unitsConsumed: 0, freeUnits: 0, charge: 18, discount: 0, amountPaid: 18, means: 'Cash' },
    { property: 'PV-103', guest: 'Isabelle Moreau', checkIn: '2026-08-10', checkOut: '2026-08-18', meterIn: 2100, meterOut: 2340, unitsConsumed: 240, freeUnits: 50, charge: 76, discount: 0, amountPaid: 76, means: 'Bank Transfer' },
    { property: 'PV-106', guest: 'David Chen', checkIn: '2026-08-05', checkOut: '2026-08-11', meterIn: 6980, meterOut: 7124, unitsConsumed: 144, freeUnits: 0, charge: 50, discount: 0, amountPaid: 50, means: 'Platform Collected' },
    { property: 'PV-108', guest: 'Priya Nair', checkIn: '2026-08-22', checkOut: '2026-08-29', meterIn: 5510, meterOut: 5510, unitsConsumed: 0, freeUnits: 0, charge: 39, discount: 0, amountPaid: 39, means: 'Bank Transfer' }
  ];

  function propName(id) { var p = VSV.propertyById(id); return p ? p.name : id; }
  function managedProperties() { return MM.MOCK_PROPERTIES.filter(function (p) { return VSV.ELECTRICITY[p.id] && VSV.ELECTRICITY[p.id].managed; }); }

  function populateSelects() {
    var buSel = document.getElementById('rf-bu');
    VSV.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o); });
    [document.getElementById('rf-villa'), document.getElementById('cf-villa')].forEach(function (sel) {
      managedProperties().forEach(function (p) { var o = document.createElement('option'); o.value = p.id; o.textContent = p.name; sel.appendChild(o); });
    });
  }

  /* ---------------- By Date Range ---------------- */
  function daysBetween(a, b) { return Math.abs((new Date(a + 'T00:00:00') - new Date(b + 'T00:00:00')) / 86400000); }

  function nearestStayEvent(propId, targetDate, field) {
    var stays = STAYS.filter(function (s) { return s.property === propId; });
    if (!stays.length) return null;
    var best = null, bestDist = Infinity;
    stays.forEach(function (s) {
      var dist = daysBetween(s[field], targetDate);
      if (dist <= 1 && dist < bestDist) { best = s; bestDist = dist; }
    });
    return best;
  }

  document.getElementById('range-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var form = e.target;
    if (!MM.validateForm(form)) { MM.showToast('Please complete the required fields.', { danger: true }); return; }
    var propId = document.getElementById('rf-villa').value;
    var start = document.getElementById('rf-start').value;
    var end = document.getElementById('rf-end').value;
    var checkinEvent = nearestStayEvent(propId, start, 'checkIn');
    var checkoutEvent = nearestStayEvent(propId, end, 'checkOut');
    var rows = [];
    if (checkinEvent) rows.push({ date: checkinEvent.checkIn, paid: null, meterOut: null, meterIn: checkinEvent.meterIn });
    if (checkoutEvent && checkoutEvent.meterOut !== null) rows.push({ date: checkoutEvent.checkOut, paid: checkoutEvent.amountPaid, meterOut: checkoutEvent.meterOut, meterIn: null });

    var tbody = document.getElementById('range-tbody');
    var empty = document.getElementById('range-empty');
    var currency = (VSV.ELECTRICITY[propId] || {}).currency || 'SGD';
    if (!rows.length) { tbody.innerHTML = ''; empty.hidden = false; return; }
    empty.hidden = true;
    tbody.innerHTML = rows.map(function (r) {
      return '<tr>' +
        '<td class="cell-strong">' + VSV.fmtDate(r.date) + '</td>' +
        '<td class="cell-num">' + (r.paid !== null ? VSV.fmtMoney(r.paid, currency) : '&mdash;') + '</td>' +
        '<td class="cell-num">' + (r.meterOut !== null ? r.meterOut + ' kWh' : '&mdash;') + '</td>' +
        '<td class="cell-num">' + (r.meterIn !== null ? r.meterIn + ' kWh' : '&mdash;') + '</td>' +
        '</tr>';
    }).join('');
  });

  /* ---------------- By Check-in Date ---------------- */
  document.getElementById('checkin-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var form = e.target;
    if (!MM.validateForm(form)) { MM.showToast('Please complete the required fields.', { danger: true }); return; }
    var propId = document.getElementById('cf-villa').value;
    var date = document.getElementById('cf-date').value;
    var stay = STAYS.find(function (s) { return s.property === propId && s.checkIn === date; });
    var resultCard = document.getElementById('checkin-result-card');
    var emptyCard = document.getElementById('checkin-empty');
    var currency = (VSV.ELECTRICITY[propId] || {}).currency || 'SGD';

    if (!stay) {
      resultCard.hidden = true;
      emptyCard.hidden = false;
      document.getElementById('checkin-empty-title').textContent = 'No check-in for property';
      document.getElementById('checkin-empty-text').textContent = propName(propId) + ' has no recorded check-in on ' + VSV.fmtDate(date) + '.';
      return;
    }

    emptyCard.hidden = true;
    resultCard.hidden = false;
    document.getElementById('ck-title').textContent = propName(propId) + ' &middot; ' + stay.guest;
    document.getElementById('ck-title').innerHTML = propName(propId) + ' &middot; ' + stay.guest;
    document.getElementById('ck-checkin').textContent = VSV.fmtDate(stay.checkIn);
    document.getElementById('ck-meter-in').textContent = stay.meterIn + ' kWh';
    document.getElementById('ck-checkout').textContent = stay.checkOut ? VSV.fmtDate(stay.checkOut) : 'Still in stay';
    document.getElementById('ck-meter-out').textContent = stay.meterOut !== null ? stay.meterOut + ' kWh' : 'Not yet recorded';
    document.getElementById('ck-units').textContent = stay.unitsConsumed !== null ? stay.unitsConsumed + ' kWh' : '&mdash;';
    document.getElementById('ck-units').innerHTML = stay.unitsConsumed !== null ? stay.unitsConsumed + ' kWh' : '&mdash;';
    document.getElementById('ck-free').textContent = stay.freeUnits + ' kWh';
    document.getElementById('ck-charge').innerHTML = stay.charge !== null ? VSV.fmtMoney(stay.charge, currency) : '&mdash;';
    document.getElementById('ck-discount').innerHTML = stay.discount ? VSV.fmtMoney(stay.discount, currency) : '&mdash;';
    document.getElementById('ck-paid').innerHTML = stay.amountPaid !== null ? VSV.fmtMoney(stay.amountPaid, currency) : '<span class="text-muted">Not yet collected</span>';
    document.getElementById('ck-means').textContent = stay.means || '&mdash;';
  });

  populateSelects();
})();
