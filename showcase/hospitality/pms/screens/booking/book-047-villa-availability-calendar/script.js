document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var startDate = new Date(); startDate.setHours(0, 0, 0, 0);
  var DAYS = 14;

  var buSelect = document.getElementById('bu-filter');
  var villaSelect = document.getElementById('villa-filter');
  var startInput = document.getElementById('start-date');
  startInput.valueAsDate = startDate;

  var businessUnits = Array.from(new Set(MM.BOOK.VILLAS.map(function (v) { return v.bu; })));
  businessUnits.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu;
    if (bu === params.get('bu')) o.selected = true;
    buSelect.appendChild(o);
  });
  MM.BOOK.VILLAS.forEach(function (v) {
    var o = document.createElement('option'); o.value = v.id; o.textContent = v.name;
    if (v.id === params.get('villa_id')) o.selected = true;
    villaSelect.appendChild(o);
  });

  function bookedOn(villaName, day) {
    return MM.BOOK.getAllBookings().some(function (b) {
      if (b.property !== villaName) return false;
      if ((b.status || '').toLowerCase() === 'cancelled') return false;
      return new Date(b.checkIn) <= day && day < new Date(b.checkOut);
    });
  }

  function render() {
    startDate = startInput.valueAsDate || startDate;
    var villas = MM.BOOK.VILLAS.filter(function (v) {
      if (buSelect.value && v.bu !== buSelect.value) return false;
      if (villaSelect.value && v.id !== villaSelect.value) return false;
      return true;
    });
    var days = [];
    for (var i = 0; i < DAYS; i++) { var d = new Date(startDate); d.setDate(startDate.getDate() + i); days.push(d); }

    var head = '<thead><tr><th class="villa-col">Villa</th><th>Rate / night</th>' + days.map(function (d) {
      return '<th' + (d.toDateString() === new Date().toDateString() ? ' class="today-col"' : '') + '>' + d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) + '</th>';
    }).join('') + '</tr></thead>';

    var body;
    if (!villas.length) {
      body = '<tbody><tr><td colspan="' + (DAYS + 2) + '"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>' +
        '<h3>No villas match this filter</h3><p>Try a different business unit or villa.</p></div></td></tr></tbody>';
    } else {
      body = '<tbody>' + villas.map(function (v) {
        return '<tr><td class="villa-col">' + v.name + '</td><td class="cell-num">' + (v.rate ? MM.BOOK.fmtMoney(v.rate) : '—') + '</td>' +
          days.map(function (d) {
            var booked = bookedOn(v.name, d);
            return '<td class="' + (booked ? 'booked' : 'avail') + '"' + (!booked ? ' data-book="' + v.id + '" data-date="' + d.toISOString().slice(0, 10) + '" style="cursor:pointer;"' : '') + '>' + (booked ? 'Booked' : 'Open') + '</td>';
          }).join('') +
        '</tr>';
      }).join('') + '</tbody>';
    }
    var table = document.getElementById('avail-grid');
    table.innerHTML = head + body;
    table.querySelectorAll('[data-book]').forEach(function (cell) {
      cell.addEventListener('click', function () {
        window.location.href = '../book-036-add-new-booking/index.html?villa_id=' + encodeURIComponent(cell.getAttribute('data-book')) + '&check_in=' + cell.getAttribute('data-date');
      });
    });
  }

  document.getElementById('filter-btn').addEventListener('click', render);
  buSelect.addEventListener('change', render);
  villaSelect.addEventListener('change', render);
  document.getElementById('date-prev').addEventListener('click', function () {
    var d = startInput.valueAsDate || startDate; d.setDate(d.getDate() - DAYS); startInput.valueAsDate = d; render();
  });
  document.getElementById('date-next').addEventListener('click', function () {
    var d = startInput.valueAsDate || startDate; d.setDate(d.getDate() + DAYS); startInput.valueAsDate = d; render();
  });
  document.getElementById('download-btn').addEventListener('click', function () {
    MM.showToast('Availability calendar exported (demo).');
  });

  render();
});
