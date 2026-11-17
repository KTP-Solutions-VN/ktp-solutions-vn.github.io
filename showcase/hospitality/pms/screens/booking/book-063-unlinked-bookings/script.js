document.addEventListener('DOMContentLoaded', function () {
  var sortState = { key: null, dir: 'asc' };

  function rows() {
    return MM.BOOK.UNLINKED_BOOKING_IDS.map(function (id) {
      var b = MM.BOOK.getBookingById(id);
      if (!b) return null;
      var villa = MM.BOOK.villaByName(b.property);
      return {
        id: b.id, checkIn: b.checkIn, property: b.property, referer: b.referer || 'Direct',
        amount: b.amount || b.total || 0, bu: villa ? villa.bu : ''
      };
    }).filter(Boolean);
  }

  var buSelect = document.getElementById('bu-filter');
  MM.BOOK.BUSINESS_UNITS.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSelect.appendChild(o);
  });

  function render() {
    var data = rows().filter(function (r) { return !buSelect.value || r.bu === buSelect.value; });
    if (sortState.key) data = MM.BOOK.sortRows(data, sortState.key, sortState.dir, 'number');
    var tbody = document.getElementById('unlinked-rows');
    if (!data.length) {
      tbody.innerHTML = '<tr><td colspan="5"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m5 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>' +
        '<h3>No unlinked bookings</h3><p>Every booking in scope has been synced by the channel manager.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = data.map(function (r) {
      return '<tr>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(r.checkIn) + '</td>' +
        '<td class="cell-strong">' + r.property + '</td>' +
        '<td>' + r.referer + '</td>' +
        '<td>' + r.id + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtMoney(r.amount) + '</td>' +
      '</tr>';
    }).join('');
  }

  buSelect.addEventListener('change', render);
  document.querySelectorAll('[data-sort]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var key = chip.getAttribute('data-sort');
      if (sortState.key === key) { sortState.dir = sortState.dir === 'asc' ? 'desc' : 'asc'; }
      else { sortState.key = key; sortState.dir = 'asc'; }
      document.querySelectorAll('[data-sort]').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      render();
    });
  });

  render();
});
