document.addEventListener('DOMContentLoaded', function () {
  var sortState = { key: 'paidOn', dir: 'desc' };
  var query = '';

  var buSelect = document.getElementById('bu-filter');
  var businessUnits = Array.from(new Set(MM.BOOK.VILLAS.map(function (v) { return v.bu; })));
  businessUnits.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSelect.appendChild(o);
  });

  function allPayments() { return MM.BOOK.loadMerged('mm_partner_payments', MM.BOOK.PARTNER_PAYMENTS); }

  function rows() {
    return allPayments().filter(function (p) { return p.stage === 'paid'; }).filter(function (p) {
      if (buSelect.value) {
        var v = MM.BOOK.villaByName(p.property);
        if (!v || v.bu !== buSelect.value) return false;
      }
      if (query) {
        var hay = (p.property + ' ' + p.bookingNo).toLowerCase();
        if (hay.indexOf(query) === -1) return false;
      }
      return true;
    });
  }

  function render() {
    var data = rows();
    if (sortState.key) data = MM.BOOK.sortRows(data, sortState.key, sortState.dir, sortState.key === 'amount' ? 'number' : 'date');
    var tbody = document.getElementById('rows');
    if (!data.length) {
      tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6 9 17l-5-5"/></svg>' +
        '<h3>No paid payments yet</h3><p>Confirmed payouts will appear here once marked as paid from Due Now.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = data.map(function (p, i) {
      return '<tr>' +
        '<td class="cell-num">' + (i + 1) + '</td>' +
        '<td class="cell-strong">' + p.property + '</td>' +
        '<td>' + p.bookingNo + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(p.checkIn) + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(p.checkOut) + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtMoney(p.amount) + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(p.paidOn) + '</td>' +
        '<td>' + (p.paidBy || '—') + '</td>' +
        '<td>' + (p.paidThrough || '—') + '</td>' +
      '</tr>';
    }).join('');
  }

  MM.BOOK.wireSearch(document.getElementById('search-input'), function (q) { query = q; render(); });
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
  buSelect.addEventListener('change', render);

  render();
});
