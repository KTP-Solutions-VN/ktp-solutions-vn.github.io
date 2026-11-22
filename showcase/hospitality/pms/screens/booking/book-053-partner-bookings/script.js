document.addEventListener('DOMContentLoaded', function () {
  var sortState = { key: 'received', dir: 'desc' };
  var query = '';

  var buSelect = document.getElementById('bu-filter');
  var statusSelect = document.getElementById('status-filter');
  var businessUnits = Array.from(new Set(MM.BOOK.VILLAS.map(function (v) { return v.bu; })));
  businessUnits.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSelect.appendChild(o);
  });

  function allBookings() { return MM.BOOK.loadMerged('mm_partner_bookings', MM.BOOK.PARTNER_BOOKINGS); }
  function save(arr) { MM.BOOK.saveAll('mm_partner_bookings', arr); }

  function rows() {
    return allBookings().filter(function (p) {
      if (buSelect.value) {
        var v = MM.BOOK.villaByName(p.property);
        if (!v || v.bu !== buSelect.value) return false;
      }
      if (statusSelect.value && p.status !== statusSelect.value) return false;
      if (query) {
        var hay = (p.property + ' ' + p.bookingNo).toLowerCase();
        if (hay.indexOf(query) === -1) return false;
      }
      return true;
    });
  }

  function actionsHtml(p) {
    var out = '<div class="row-actions">';
    if (p.status === 'new' || p.status === 'sent') {
      out += '<button class="btn btn-outline btn-sm" data-confirm="' + p.id + '">Confirm</button>';
      out += '<button class="btn btn-ghost btn-sm" data-reject="' + p.id + '">Reject</button>';
    }
    if (p.status === 'confirmed') {
      out += '<button class="btn btn-ghost btn-sm" data-email="' + p.id + '" title="Send confirmation email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="15" height="15"><path d="M4 4h16v16H4z"/><path d="m4 6 8 7 8-7"/></svg> Email</button>';
    }
    if (p.status === 'rejected' || p.status === 'paid') {
      out += '<span class="text-xs text-muted">No actions</span>';
    }
    out += '</div>';
    return out;
  }

  function render() {
    var data = rows();
    if (sortState.key) data = MM.BOOK.sortRows(data, sortState.key, sortState.dir, 'date');
    var tbody = document.getElementById('rows');
    if (!data.length) {
      tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' +
        '<h3>No partner bookings match this filter</h3><p>Try a different business unit or status.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = data.map(function (p, i) {
      return '<tr>' +
        '<td class="cell-num">' + (i + 1) + '</td>' +
        '<td class="cell-strong">' + p.property + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(p.received) + '</td>' +
        '<td>' + p.bookingNo + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(p.checkIn) + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(p.checkOut) + '</td>' +
        '<td>' + MM.BOOK.statusBadge(p.status) + '</td>' +
        '<td>' + actionsHtml(p) + '</td>' +
        '<td>' + (p.lastActionBy || '—') + '</td>' +
      '</tr>';
    }).join('');

    tbody.querySelectorAll('[data-confirm]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-confirm');
        var p = allBookings().filter(function (x) { return x.id === id; })[0];
        MM.BOOK.confirmAction('Confirm partner booking ' + p.bookingNo + ' for ' + p.property + '? It will move into the partner payment pipeline.', function () {
          var all = allBookings().map(function (x) { return x.id === id ? Object.assign({}, x, { status: 'confirmed', lastActionBy: 'Daniel Tan' }) : x; });
          save(all);
          MM.showToast('Booking confirmed. It will now appear in Partner Payments.');
          render();
        }, { title: 'Confirm booking' });
      });
    });
    tbody.querySelectorAll('[data-reject]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-reject');
        var p = allBookings().filter(function (x) { return x.id === id; })[0];
        MM.BOOK.confirmAction('Reject partner booking ' + p.bookingNo + ' for ' + p.property + '? The owner will need to resubmit if this was in error.', function () {
          var all = allBookings().map(function (x) { return x.id === id ? Object.assign({}, x, { status: 'rejected', lastActionBy: 'Daniel Tan' }) : x; });
          save(all);
          MM.showToast('Booking rejected.', { danger: true });
          render();
        }, { title: 'Reject booking' });
      });
    });
    tbody.querySelectorAll('[data-email]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        MM.showToast('Confirmation email with PDF attachment sent to the villa owner (demo).');
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
  statusSelect.addEventListener('change', render);

  render();
});
