document.addEventListener('DOMContentLoaded', function () {
  var sortState = { key: null, dir: 'asc' };
  var query = '';

  var buSelect = document.getElementById('bu-filter');
  var businessUnits = Array.from(new Set(MM.BOOK.VILLAS.map(function (v) { return v.bu; })));
  businessUnits.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSelect.appendChild(o);
  });

  function allPayments() { return MM.BOOK.loadMerged('mm_partner_payments', MM.BOOK.PARTNER_PAYMENTS); }

  function rows() {
    return allPayments().filter(function (p) { return p.stage === 'later'; }).filter(function (p) {
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

  // Deterministic fake bank details for the demo — no real financial data.
  function bankDetails(ownerName) {
    var banks = ['Bangkok Bank', 'Kasikorn Bank', 'Siam Commercial Bank', 'Krungsri'];
    var h = 0; for (var i = 0; i < ownerName.length; i++) h = (h * 31 + ownerName.charCodeAt(i)) >>> 0;
    var bank = banks[h % banks.length];
    var last4 = String(1000 + (h % 8999));
    return bank + ' · Account holder: ' + ownerName + ' · •••• ' + last4;
  }

  function render() {
    var data = rows();
    if (sortState.key) data = MM.BOOK.sortRows(data, sortState.key, sortState.dir, sortState.key === 'amount' ? 'number' : 'date');
    var tbody = document.getElementById('rows');
    if (!data.length) {
      tbody.innerHTML = '<tr><td colspan="7"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' +
        '<h3>Nothing due later</h3><p>No confirmed partner bookings are awaiting a future payout date.</p></div></td></tr>';
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
        '<td><button class="btn btn-ghost btn-sm" data-view="' + p.id + '">View Details</button></td>' +
      '</tr>';
    }).join('');
    tbody.querySelectorAll('[data-view]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var p = data.filter(function (x) { return x.id === btn.getAttribute('data-view'); })[0];
        document.getElementById('vw-property').textContent = p.property;
        document.getElementById('vw-booking').textContent = p.bookingNo;
        document.getElementById('vw-amount').textContent = MM.BOOK.fmtMoney(p.amount);
        document.getElementById('vw-owner').textContent = p.owner || '—';
        document.getElementById('vw-bank').textContent = bankDetails(p.owner || 'Owner');
        MM.openModal('view-modal');
      });
    });
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
