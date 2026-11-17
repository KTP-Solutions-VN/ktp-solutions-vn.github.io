document.addEventListener('DOMContentLoaded', function () {
  var STAFF = MM.MOCK_STAFF.filter(function (s) { return s.role === 'Concierge'; });
  var state = { bu: '', mode: 'all', sort: 'property' };

  function keyOf(dateKey) { return 'mm_calendar_' + dateKey; }
  function loadOverrides(kind) { try { return JSON.parse(localStorage.getItem(keyOf(kind)) || '{}'); } catch (e) { return {}; } }
  function saveOverride(kind, bookingId, patch) {
    var all = loadOverrides(kind);
    all[bookingId] = Object.assign({}, all[bookingId] || {}, patch);
    localStorage.setItem(keyOf(kind), JSON.stringify(all));
  }

  var overrides = { concierge: loadOverrides('concierge'), remark: loadOverrides('remark'), request: loadOverrides('request') };

  var buSel = document.getElementById('bu-filter');
  Array.from(new Set(MM.BOOK.VILLAS.map(function (v) { return v.bu; }))).forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o);
  });
  buSel.addEventListener('change', function () { state.bu = buSel.value; render(); });
  document.getElementById('mode-filter').addEventListener('change', function (e) { state.mode = e.target.value; render(); });
  document.getElementById('sort-filter').addEventListener('change', function (e) { state.sort = e.target.value; render(); });

  function shiftDate(dateStr, delta) {
    var d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + delta);
    return d.toISOString().slice(0, 10);
  }

  var coDate = '2026-08-27';
  var ciDate = '2026-09-02';
  document.getElementById('co-date').value = coDate;
  document.getElementById('ci-date').value = ciDate;

  function villaBu(name) { var v = MM.BOOK.villaByName(name); return v ? v.bu : ''; }

  function requestIcon(status) {
    var map = { pending: ['warning', 'Pending approval'], approved: ['info', 'Approved'], completed: ['neutral', 'Completed'], none: ['neutral', 'No request'] };
    var m = map[status] || map.none;
    return '<button class="request-btn" data-req="' + status + '" title="' + m[1] + '"><span class="badge badge-' + m[0] + '">' + m[1] + '</span></button>';
  }

  function rowsFor(dateStr, field) {
    var all = MM.BOOK.getAllBookings().filter(function (b) { return b[field] === dateStr; });
    if (state.bu) all = all.filter(function (b) { return villaBu(b.property) === state.bu; });
    if (state.mode === 'concierge') all = all.filter(function (b) { return !!(overrides.concierge[b.id] && overrides.concierge[b.id].name) || !!b.concierge; });
    if (state.sort === 'property') all.sort(function (a, b) { return a.property.localeCompare(b.property); });
    else all.sort(function (a, b) { return (a[field] || '').localeCompare(b[field] || ''); });
    return all;
  }

  function rowHtml(b, kind) {
    var co = overrides.concierge[b.id];
    var concierge = co && co.name !== undefined ? co.name : b.concierge;
    var rm = overrides.remark[b.id];
    var remark = rm && rm.text !== undefined ? rm.text : '';
    var rq = overrides.request[b.id];
    var reqStatus = rq && rq.status ? rq.status : (kind === 'checkout' ? 'pending' : 'none');

    return '<tr data-id="' + b.id + '">' +
      '<td class="cell-strong">' + b.property + '</td>' +
      '<td>' + b.guest + '</td>' +
      '<td class="row-country">' + (b.country || '—') + '</td>' +
      '<td class="cell-num">' + MM.BOOK.nights(b.checkIn, b.checkOut) + '</td>' +
      '<td>' + (b.referer || '—') + '</td>' +
      '<td><button class="concierge-pill' + (concierge ? '' : ' unassigned') + '" data-assign="' + b.id + '">' +
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg>' +
        (concierge || 'Unassigned') + '</button></td>' +
      '<td class="remark-cell" data-remark="' + b.id + '">' + (remark ? remark : '<span class="remark-empty">&times; No remark</span>') + '</td>' +
      '<td>' + requestIcon(reqStatus) + '</td>' +
    '</tr>';
  }

  function render() {
    document.getElementById('checkout-date-label').textContent = MM.BOOK.fmtDate(coDate);
    document.getElementById('checkin-date-label').textContent = MM.BOOK.fmtDate(ciDate);
    document.getElementById('co-date').value = coDate;
    document.getElementById('ci-date').value = ciDate;

    var coRows = rowsFor(coDate, 'checkOut');
    var ciRows = rowsFor(ciDate, 'checkIn');

    document.getElementById('checkout-rows').innerHTML = coRows.length ? coRows.map(function (b) { return rowHtml(b, 'checkout'); }).join('') :
      '<tr><td colspan="8"><div class="empty-state"><h3>No check-outs</h3><p>No bookings check out on this date for the current filters.</p></div></td></tr>';
    document.getElementById('checkin-rows').innerHTML = ciRows.length ? ciRows.map(function (b) { return rowHtml(b, 'checkin'); }).join('') :
      '<tr><td colspan="8"><div class="empty-state"><h3>No check-ins</h3><p>No bookings check in on this date for the current filters.</p></div></td></tr>';

    wireRowActions();
  }

  function wireRowActions() {
    document.querySelectorAll('[data-assign]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-assign');
        var current = overrides.concierge[id] ? overrides.concierge[id].name : '';
        var idx = STAFF.map(function (s) { return s.name; }).indexOf(current);
        var next = STAFF[(idx + 1) % STAFF.length];
        overrides.concierge[id] = { name: next.name };
        saveOverride('concierge', id, { name: next.name });
        MM.showToast('Assigned ' + next.name + ' to ' + id + '.');
        render();
      });
    });
    document.querySelectorAll('[data-remark]').forEach(function (cell) {
      cell.addEventListener('click', function () {
        if (cell.querySelector('input')) return;
        var id = cell.getAttribute('data-remark');
        var current = overrides.remark[id] ? overrides.remark[id].text || '' : '';
        cell.innerHTML = '<input type="text" value="' + current.replace(/"/g, '&quot;') + '" placeholder="Add a remark…">';
        var input = cell.querySelector('input');
        input.focus();
        function commit() {
          overrides.remark[id] = { text: input.value.trim() };
          saveOverride('remark', id, { text: input.value.trim() });
          render();
        }
        input.addEventListener('blur', commit);
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter') input.blur(); });
      });
    });
    document.querySelectorAll('[data-req]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var cur = btn.getAttribute('data-req');
        var order = ['pending', 'approved', 'completed'];
        var id = btn.closest('tr').getAttribute('data-id');
        var next = order[(order.indexOf(cur) + 1) % order.length] || 'pending';
        if (cur === 'none') next = 'pending';
        overrides.request[id] = { status: next };
        saveOverride('request', id, { status: next });
        render();
      });
    });
  }

  document.getElementById('co-prev').addEventListener('click', function () { coDate = shiftDate(coDate, -1); render(); });
  document.getElementById('co-next').addEventListener('click', function () { coDate = shiftDate(coDate, 1); render(); });
  document.getElementById('ci-prev').addEventListener('click', function () { ciDate = shiftDate(ciDate, -1); render(); });
  document.getElementById('ci-next').addEventListener('click', function () { ciDate = shiftDate(ciDate, 1); render(); });
  document.getElementById('co-date').addEventListener('change', function (e) { coDate = e.target.value; render(); });
  document.getElementById('ci-date').addEventListener('change', function (e) { ciDate = e.target.value; render(); });

  render();
});
