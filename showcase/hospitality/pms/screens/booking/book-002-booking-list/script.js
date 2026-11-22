document.addEventListener('DOMContentLoaded', function () {
  var STORE_KEY = 'mm_bookings_extra';
  var DELETED_KEY = 'mm_bookings_deleted';
  var state = { q: '', bu: '', channel: '', status: '', sortKey: null, sortDir: 'asc' };

  function villaBu(propertyName) {
    var v = MM.BOOK.villaByName(propertyName);
    return v ? v.bu : '';
  }

  function getAll() {
    return MM.BOOK.getAllBookings();
  }

  function populateFilters(rows) {
    var buSel = document.getElementById('bu-filter');
    var bus = Array.from(new Set(rows.map(function (r) { return villaBu(r.property); }).filter(Boolean))).sort();
    bus.forEach(function (bu) {
      var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o);
    });
    var chSel = document.getElementById('channel-filter');
    var channels = Array.from(new Set(rows.map(function (r) { return r.referer; }).filter(Boolean))).sort();
    channels.forEach(function (c) {
      var o = document.createElement('option'); o.value = c; o.textContent = c; chSel.appendChild(o);
    });
  }

  function applyFilters(rows) {
    var q = state.q;
    return rows.filter(function (r) {
      if (state.bu && villaBu(r.property) !== state.bu) return false;
      if (state.channel && r.referer !== state.channel) return false;
      if (state.status && (r.status || '').toLowerCase() !== state.status) return false;
      if (q) {
        var hay = (r.id + ' ' + r.guest + ' ' + r.property).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function rowHtml(r) {
    var nights = MM.BOOK.nights(r.checkIn, r.checkOut);
    var vid = encodeURIComponent(r.id);
    return '<tr class="clickable" data-id="' + r.id + '">' +
      '<td class="cell-strong">' + r.id + '</td>' +
      '<td>' + r.property + '</td>' +
      '<td>' + r.guest + '</td>' +
      '<td class="row-country">' + (r.country || '—') + '</td>' +
      '<td class="cell-num">' + MM.BOOK.fmtDate(r.checkIn) + '</td>' +
      '<td class="cell-num">' + MM.BOOK.fmtDate(r.checkOut) + '</td>' +
      '<td class="cell-num">' + nights + '</td>' +
      '<td>' + (r.referer || '—') + '</td>' +
      '<td>' + MM.BOOK.statusBadge(r.status) + '</td>' +
      '<td class="cell-num cell-strong">' + MM.BOOK.fmtMoney(r.total) + '</td>' +
      '<td><div class="row-actions">' +
        '<a class="btn btn-ghost btn-sm" href="../book-002-p1-booking-quick-view/index.html?id=' + vid + '" title="View" onclick="event.stopPropagation()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></a>' +
        '<a class="btn btn-ghost btn-sm" href="../book-037-edit-booking/index.html?id=' + vid + '" title="Edit" onclick="event.stopPropagation()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg></a>' +
        '<a class="btn btn-ghost btn-sm" href="../book-110-sha-plus-detail/index.html?booking_id=' + vid + '" title="Health Certification" onclick="event.stopPropagation()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z"/></svg></a>' +
        '<button class="btn btn-ghost btn-sm" title="Delete" data-delete="' + r.id + '" onclick="event.stopPropagation()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg></button>' +
      '</div></td>' +
    '</tr>';
  }

  function render() {
    var all = getAll();
    var filtered = applyFilters(all);
    if (state.sortKey) filtered = MM.BOOK.sortRows(filtered, state.sortKey, state.sortDir,
      state.sortKey === 'total' || state.sortKey === 'nights' ? 'number' :
      state.sortKey === 'checkIn' || state.sortKey === 'checkOut' ? 'date' : 'string');
    else filtered = filtered.map(function(r){return r;});

    var tbody = document.getElementById('booking-rows');
    if (!filtered.length) {
      tbody.innerHTML = '<tr><td colspan="11"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' +
        '<h3>No bookings match these filters</h3><p>Try clearing the search or status filter.</p>' +
        '</div></td></tr>';
    } else {
      tbody.innerHTML = filtered.map(rowHtml).join('');
    }
    document.getElementById('result-count').textContent = filtered.length + ' booking' + (filtered.length === 1 ? '' : 's');
    document.getElementById('pager-label').textContent = 'Showing ' + filtered.length + ' of ' + all.length;

    document.getElementById('kpi-total').textContent = all.length;
    document.getElementById('kpi-confirmed').textContent = all.filter(function (r) { return (r.status || '').toLowerCase() === 'confirmed'; }).length;
    document.getElementById('kpi-pending').textContent = all.filter(function (r) { return ['new', 'pending', 'request'].indexOf((r.status || '').toLowerCase()) !== -1; }).length;
    var rev = filtered.reduce(function (s, r) { return s + (Number(r.total) || 0); }, 0);
    document.getElementById('kpi-revenue').textContent = MM.BOOK.fmtMoney(rev);

    tbody.querySelectorAll('tr[data-id]').forEach(function (tr) {
      tr.addEventListener('click', function () {
        window.location.href = '../book-002-p1-booking-quick-view/index.html?id=' + encodeURIComponent(tr.getAttribute('data-id'));
      });
    });
    tbody.querySelectorAll('[data-delete]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-delete');
        var row = all.filter(function(r){ return r.id === id; })[0];
        MM.BOOK.confirmAction('Delete booking ' + id + ' (' + (row ? row.guest : '') + ')? This cannot be undone.', function () {
          var deleted = [];
          try { deleted = JSON.parse(localStorage.getItem(DELETED_KEY) || '[]'); } catch (e) {}
          deleted.push(id);
          localStorage.setItem(DELETED_KEY, JSON.stringify(deleted));
          MM.showToast('Booking ' + id + ' deleted.', { danger: true });
          render();
        }, { title: 'Delete booking' });
      });
    });
  }

  MM.wireSearch = MM.wireSearch || MM.BOOK.wireSearch;
  MM.BOOK.wireSearch(document.getElementById('search-input'), function (q) { state.q = q; render(); });
  document.getElementById('bu-filter').addEventListener('change', function (e) { state.bu = e.target.value; render(); });
  document.getElementById('channel-filter').addEventListener('change', function (e) { state.channel = e.target.value; render(); });
  document.querySelectorAll('#status-chips [data-status]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('#status-chips .chip').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      state.status = chip.getAttribute('data-status');
      render();
    });
  });
  document.querySelectorAll('th.sortable').forEach(function (th) {
    th.addEventListener('click', function () {
      var key = th.getAttribute('data-sort');
      if (state.sortKey === key) state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      else { state.sortKey = key; state.sortDir = 'asc'; }
      document.querySelectorAll('th.sortable .sort-arrow').forEach(function (a) { a.remove(); });
      var arrow = document.createElement('span');
      arrow.className = 'sort-arrow';
      arrow.textContent = state.sortDir === 'asc' ? '\u2191' : '\u2193';
      th.appendChild(arrow);
      render();
    });
  });

  populateFilters(getAll());
  render();
});
