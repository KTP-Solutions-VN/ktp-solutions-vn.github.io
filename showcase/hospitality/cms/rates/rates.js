/* Rates & Revenue screen behaviour — renders a 14-day sticky price grid
   with click-to-edit cells (price / min stay / stop sell). */

(function () {
  'use strict';

  var ROOMS = ['Room 1 — Garden View', 'Room 2 — Pool View', 'Room 3 — Family Suite', 'Room 4 — Beachfront'];
  var DAYS_VISIBLE = 14;

  var rangeStart = new Date();
  rangeStart.setHours(0, 0, 0, 0);

  // priceData[roomIndex][dateISO] = { price, minStay, availability }
  var priceData = {};

  function addDays(date, n) {
    var d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
  }

  function toISODate(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function seedPrice(roomIndex, dayIndex) {
    var basePrices = [120, 150, 260, 340];
    var weekendBump = ([5, 6].indexOf(addDays(rangeStart, dayIndex).getDay()) > -1) ? 1.15 : 1;
    return Math.round(basePrices[roomIndex] * weekendBump * (1 + (dayIndex % 5) * 0.02));
  }

  function ensureData() {
    ROOMS.forEach(function (room, r) {
      if (!priceData[r]) priceData[r] = {};
      for (var i = 0; i < DAYS_VISIBLE; i++) {
        var date = addDays(rangeStart, i);
        var key = toISODate(date);
        if (!priceData[r][key]) {
          priceData[r][key] = {
            price: seedPrice(r, i),
            minStay: 1,
            availability: (r === 2 && i === 3) ? 'stop-sell' : 'open'
          };
        }
      }
    });
  }

  function renderTable() {
    ensureData();

    var table = document.getElementById('rate-table');
    var dates = [];
    for (var i = 0; i < DAYS_VISIBLE; i++) dates.push(addDays(rangeStart, i));

    var startLabel = dates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    var endLabel = dates[dates.length - 1].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    document.getElementById('rate-range').textContent = startLabel + ' – ' + endLabel;

    var theadHtml = '<thead><tr><th>Room</th>' + dates.map(function (d) {
      return '<th><div class="rate-day-label"><span class="dow">' + d.toLocaleDateString('en-US', { weekday: 'short' }) + '</span><span class="dom">' + d.getDate() + '</span></div></th>';
    }).join('') + '</tr></thead>';

    var tbodyHtml = '<tbody>' + ROOMS.map(function (room, r) {
      var cells = dates.map(function (d) {
        var key = toISODate(d);
        var cell = priceData[r][key];
        var stopSell = cell.availability === 'stop-sell';
        return '<td class="rate-cell' + (stopSell ? ' stop-sell' : '') + '" data-room="' + r + '" data-date="' + key + '">' +
          '<div class="rate-cell__price">$' + cell.price + '</div>' +
          '<div class="rate-cell__avail">' + (stopSell ? 'Stop Sell' : 'Min ' + cell.minStay + 'n') + '</div>' +
        '</td>';
      }).join('');
      return '<tr><td class="cell-strong">' + room + '</td>' + cells + '</tr>';
    }).join('') + '</tbody>';

    table.innerHTML = theadHtml + tbodyHtml;

    table.querySelectorAll('.rate-cell').forEach(function (td) {
      td.addEventListener('click', function () {
        openQuickEdit(Number(td.getAttribute('data-room')), td.getAttribute('data-date'));
      });
    });
  }

  document.getElementById('rate-prev').addEventListener('click', function () {
    rangeStart = addDays(rangeStart, -DAYS_VISIBLE);
    renderTable();
  });

  document.getElementById('rate-next').addEventListener('click', function () {
    rangeStart = addDays(rangeStart, DAYS_VISIBLE);
    renderTable();
  });

  document.getElementById('rate-property-filter').addEventListener('change', function () {
    window.CM.showToast('Loaded rates for ' + this.value);
    renderTable();
  });

  /* --- Quick edit modal --- */

  var qeRoom = null, qeDate = null;

  function openQuickEdit(roomIndex, dateKey) {
    qeRoom = roomIndex;
    qeDate = dateKey;
    var cell = priceData[roomIndex][dateKey];
    var d = new Date(dateKey + 'T00:00:00');

    document.getElementById('qe-title').textContent = 'Edit Price';
    document.getElementById('qe-subtitle').textContent = ROOMS[roomIndex] + ' · ' + d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    document.getElementById('qe-price').value = cell.price;
    document.getElementById('qe-minstay').value = cell.minStay;
    document.getElementById('qe-availability').value = cell.availability;

    window.CM.openModal('modal-quick-edit');
  }

  document.getElementById('qe-save-btn').addEventListener('click', function () {
    if (qeRoom === null) return;
    priceData[qeRoom][qeDate] = {
      price: Number(document.getElementById('qe-price').value) || 0,
      minStay: Number(document.getElementById('qe-minstay').value) || 1,
      availability: document.getElementById('qe-availability').value
    };
    window.CM.closeModal('modal-quick-edit');
    window.CM.showToast('Rate updated — will sync to Channex & Beds24.');
    renderTable();
  });

  renderTable();
})();
