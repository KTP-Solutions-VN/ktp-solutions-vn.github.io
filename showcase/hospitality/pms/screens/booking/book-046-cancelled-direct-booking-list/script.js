document.addEventListener('DOMContentLoaded', function () {
  var sortState = { key: null, dir: 'asc' };
  var query = '';

  function rows() {
    return MM.BOOK.CANCELLED_DIRECT_BOOKINGS.slice();
  }

  function render() {
    var data = rows().filter(function (r) {
      if (!query) return true;
      var hay = (r.guest + ' ' + r.property).toLowerCase();
      return hay.indexOf(query) !== -1;
    });
    if (sortState.key) data = MM.BOOK.sortRows(data, sortState.key, sortState.dir, sortState.key === 'checkIn' ? 'date' : 'text');

    var tbody = document.getElementById('rows');
    if (!data.length) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m5 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>' +
        '<h3>No cancelled requests</h3><p>Every direct booking request is either pending or confirmed.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = data.map(function (r, i) {
      return '<tr>' +
        '<td class="cell-num">' + (i + 1) + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(r.checkIn) + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(r.checkOut) + '</td>' +
        '<td class="cell-strong">' + r.guest + '</td>' +
        '<td>' + (r.property || '—') + '</td>' +
        '<td><button class="btn btn-ghost btn-sm" data-view="' + r.id + '">View Details</button></td>' +
      '</tr>';
    }).join('');

    tbody.querySelectorAll('[data-view]').forEach(function (btn) {
      btn.addEventListener('click', function () { openView(btn.getAttribute('data-view')); });
    });
  }

  function openView(id) {
    var r = rows().filter(function (x) { return x.id === id; })[0];
    if (!r) return;
    document.getElementById('vw-guest').textContent = r.guest;
    document.getElementById('vw-property').textContent = r.property || '—';
    document.getElementById('vw-type').textContent = r.type || '—';
    document.getElementById('vw-checkin').textContent = MM.BOOK.fmtDate(r.checkIn);
    document.getElementById('vw-checkout').textContent = MM.BOOK.fmtDate(r.checkOut);
    document.getElementById('vw-amount').textContent = r.amount ? MM.BOOK.fmtMoney(r.amount) : 'N/A';
    document.getElementById('vw-email').textContent = r.email || '—';
    document.getElementById('vw-phone').textContent = r.phone || '—';
    document.getElementById('vw-cancelledon').textContent = MM.BOOK.fmtDate(r.cancelledOn);
    document.getElementById('vw-cancelledby').textContent = r.cancelledBy || '—';
    document.getElementById('vw-reason').textContent = r.reason || '—';
    MM.openModal('view-modal');
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

  render();
});
