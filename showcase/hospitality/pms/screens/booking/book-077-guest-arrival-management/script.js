document.addEventListener('DOMContentLoaded', function () {
  var state = { tab: 'arrivals', bu: '', date: '', onlineStatus: '', requestsOnly: false, q: '', limit: 25 };
  var todayStr = new Date().toISOString().slice(0, 10);
  document.getElementById('date-filter').value = todayStr;
  state.date = todayStr;

  function villaBu(propertyName) {
    var v = MM.BOOK.villaByName(propertyName);
    return v ? v.bu : '';
  }

  var buSel = document.getElementById('bu-filter');
  MM.BOOK.BUSINESS_UNITS.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o);
  });

  function daysUntil(dateStr) {
    var a = new Date(dateStr + 'T00:00:00'), b = new Date();
    b.setHours(0, 0, 0, 0);
    return Math.round((a - b) / 86400000);
  }

  function tabRows(all, tab) {
    return all.filter(function (r) {
      var st = (r.status || '').toLowerCase();
      if (tab === 'arrivals') {
        return st !== 'cancelled' && st !== 'checked-out' && r.checkIn >= state.date;
      }
      if (tab === 'online') {
        return r.arrival.portalSubmittedAt && !r.arrival.portalReviewedAt;
      }
      if (tab === 'alerts') {
        if (r.arrival.dismissed) return false;
        var soon = daysUntil(r.checkIn) <= 2 && daysUntil(r.checkIn) >= 0 && st !== 'checked-out' && st !== 'cancelled';
        var pendingRequest = r.arrival.requestType && r.arrival.requestStatus === 'pending';
        var overdueOnline = r.arrival.onlineCheckin === 'not_started' && daysUntil(r.checkIn) <= 3 && daysUntil(r.checkIn) >= 0;
        return soon || pendingRequest || overdueOnline;
      }
      if (tab === 'missing_checkout') {
        return st === 'checked-in' && !r.arrival.checkoutTime;
      }
      if (tab === 'archive') {
        return st === 'checked-out';
      }
      return false;
    });
  }

  function applyCommonFilters(rows) {
    return rows.filter(function (r) {
      if (state.bu && villaBu(r.property) !== state.bu) return false;
      if (state.onlineStatus && r.arrival.onlineCheckin !== state.onlineStatus) return false;
      if (state.requestsOnly && !r.arrival.requestType) return false;
      if (state.q) {
        var hay = (r.id + ' ' + r.guest + ' ' + r.property + ' ' + (r.referer || '')).toLowerCase();
        if (hay.indexOf(state.q) === -1) return false;
      }
      return true;
    });
  }

  function onlineBadge(status) {
    var map = { not_started: ['neutral', 'Not started'], in_progress: ['warning', 'In progress'], complete: ['success', 'Complete'] };
    var m = map[status] || map.not_started;
    return '<span class="badge badge-' + m[0] + '">' + m[1] + '</span>';
  }
  function chatBadge(status) {
    var map = { none: ['neutral', 'No chat group'], pending: ['warning', 'Chat opened'], active: ['success', 'Chat active'] };
    var m = map[status] || map.none;
    return '<span class="badge badge-' + m[0] + '">' + m[1] + '</span>';
  }
  function requestLabel(type) {
    return type === 'early_checkin' ? 'Early Check-in' : type === 'late_checkout' ? 'Late Check-out' : '';
  }

  function rowActions(r) {
    var out = '<div class="row-actions">';
    out += '<button class="btn btn-ghost btn-sm" data-occupancy="' + r.property + '" title="5-day occupancy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></button>';
    if (state.tab !== 'archive') {
      out += '<button class="btn btn-ghost btn-sm" data-guest-time="' + r.id + '" title="Update guest time"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></button>';
      out += '<button class="btn btn-ghost btn-sm" data-guest-count="' + r.id + '" title="Confirm guest count"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></button>';
    }
    out += '<button class="btn btn-ghost btn-sm" data-download="passports" title="Download passports"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></button>';
    out += '</div>';
    return out;
  }

  function rowHtml(r) {
    var a = r.arrival;
    var nights = MM.BOOK.nights(r.checkIn, r.checkOut);
    var reqCell = '<span class="text-muted text-xs">—</span>';
    if (a.requestType) {
      var statusBadge = a.requestStatus === 'pending' ? '<span class="badge badge-warning">Pending</span>' :
        a.requestStatus === 'approved' ? '<span class="badge badge-success">Approved ' + (a.requestTime || '') + '</span>' :
        '<span class="badge badge-danger">Rejected</span>';
      reqCell = '<div>' + requestLabel(a.requestType) + '</div><div style="margin-top:4px;">' + statusBadge + '</div>';
      if (a.requestStatus === 'pending') {
        reqCell += '<div style="margin-top:6px;"><button class="btn btn-outline btn-sm" data-decide="' + r.id + '">Decide</button></div>';
      }
    }
    var alertReason = '';
    if (state.tab === 'alerts') {
      var reasons = [];
      if (daysUntil(r.checkIn) <= 2 && daysUntil(r.checkIn) >= 0) reasons.push('Arriving within 48h');
      if (a.requestType && a.requestStatus === 'pending') reasons.push('Unapproved ' + requestLabel(a.requestType).toLowerCase() + ' request');
      if (a.onlineCheckin === 'not_started') reasons.push('Online check-in overdue');
      alertReason = '<div class="alert-reason">' + reasons.join(' · ') + '</div>';
    }
    var tabExtra = '';
    if (state.tab === 'online') {
      tabExtra = '<div style="margin-top:6px;"><button class="btn btn-primary btn-sm" data-approve-online="' + r.id + '">Review &amp; Approve</button></div>';
    }
    if (state.tab === 'alerts') {
      tabExtra = '<div style="margin-top:6px;"><button class="btn btn-outline btn-sm" data-dismiss="' + r.id + '">Dismiss</button></div>';
    }
    if (state.tab === 'missing_checkout') {
      tabExtra = '<div style="margin-top:6px;"><button class="btn btn-outline btn-sm" data-guest-time="' + r.id + '">Record departure time</button></div>';
    }

    return '<tr>' +
      '<td><div class="arrival-cell__villa">' + r.property + '</div><div class="arrival-cell__guest">' + r.guest + ' · ' + MM.BOOK.flag(r.country) + '</div></td>' +
      '<td><div>' + MM.BOOK.fmtDate(r.checkIn) + ' &rarr; ' + MM.BOOK.fmtDate(r.checkOut) + '</div><div class="arrival-cell__sub"><span>' + nights + ' nights</span><span>&middot;</span><span>' + a.companions + ' companions</span></div>' + alertReason + '</td>' +
      '<td><div>' + chatBadge(a.groupChatStatus) + '</div><div class="arrival-cell__sub"><span class="doc-pill' + (a.passportUploaded ? ' ok' : '') + '">Passport</span><span class="doc-pill' + (a.contractSigned ? ' ok' : '') + '">Contract</span></div>' + tabExtra + '</td>' +
      '<td>' + onlineBadge(a.onlineCheckin) + (a.checkoutTime ? '<div class="text-xs text-muted" style="margin-top:4px;">Departure ' + a.checkoutTime + '</div>' : '') + '</td>' +
      '<td>' + reqCell + '</td>' +
      '<td>' + rowActions(r) + '</td>' +
    '</tr>';
  }

  function render() {
    var all = MM.BOOK.getArrivalRows();
    var byTab = {};
    ['arrivals', 'online', 'alerts', 'missing_checkout', 'archive'].forEach(function (t) {
      byTab[t] = applyCommonFilters(tabRows(all, t));
    });
    Object.keys(byTab).forEach(function (t) {
      document.getElementById('count-' + t).textContent = byTab[t].length;
    });

    var currentRows = state.tab === 'arrivals' ? applyCommonFilters(tabRows(all, 'arrivals')) : byTab[state.tab];
    var shown = currentRows.slice(0, state.limit);
    var tbody = document.getElementById('arrival-rows');
    if (!shown.length) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' +
        '<h3>No bookings in this view</h3><p>Try clearing filters or checking another tab.</p></div></td></tr>';
    } else {
      tbody.innerHTML = shown.map(rowHtml).join('');
    }
    document.getElementById('pager-label').textContent = 'Showing ' + shown.length + ' of ' + currentRows.length;
    document.getElementById('load-more-btn').hidden = shown.length >= currentRows.length;

    wireRowActions(all);
  }

  function wireRowActions(all) {
    document.querySelectorAll('[data-occupancy]').forEach(function (btn) {
      btn.addEventListener('click', function () { openOccupancy(btn.getAttribute('data-occupancy')); });
    });
    document.querySelectorAll('[data-guest-time]').forEach(function (btn) {
      btn.addEventListener('click', function () { openGuestTime(btn.getAttribute('data-guest-time')); });
    });
    document.querySelectorAll('[data-guest-count]').forEach(function (btn) {
      btn.addEventListener('click', function () { openGuestCount(btn.getAttribute('data-guest-count')); });
    });
    document.querySelectorAll('[data-decide]').forEach(function (btn) {
      btn.addEventListener('click', function () { openDecide(btn.getAttribute('data-decide')); });
    });
    document.querySelectorAll('[data-approve-online]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-approve-online');
        MM.BOOK.saveArrivalOverride(id, { portalReviewedAt: new Date().toISOString() });
        MM.showToast('Online check-in reviewed and approved.');
        render();
      });
    });
    document.querySelectorAll('[data-dismiss]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        MM.BOOK.dismissArrivalAlert(btn.getAttribute('data-dismiss'));
        MM.showToast('Alert dismissed.');
        render();
      });
    });
    document.querySelectorAll('[data-download]').forEach(function (btn) {
      btn.addEventListener('click', function () { MM.showToast('Download started (demo).'); });
    });
  }

  var occTargetVilla = null;
  function openOccupancy(villaName) {
    occTargetVilla = villaName;
    document.getElementById('occ-villa-name').textContent = villaName;
    var v = MM.BOOK.villaByName(villaName);
    var bookings = MM.BOOK.getAllBookings().filter(function (b) { return b.property === villaName && (b.status || '').toLowerCase() !== 'cancelled'; });
    var days = [];
    var d = new Date(); d.setHours(0, 0, 0, 0);
    for (var i = 0; i < 5; i++) { var dd = new Date(d); dd.setDate(d.getDate() + i); days.push(dd); }
    var headRow = '<thead><tr><th class="villa-col">Villa</th>' + days.map(function (dd) {
      return '<th>' + dd.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) + '</th>';
    }).join('') + '</tr></thead>';
    var cellRow = '<tbody><tr><td class="villa-col">' + villaName + '</td>' + days.map(function (dd) {
      var booked = bookings.some(function (b) { return new Date(b.checkIn) <= dd && dd < new Date(b.checkOut); });
      return '<td class="' + (booked ? 'booked' : 'avail') + '">' + (booked ? 'Booked' : 'Open') + '</td>';
    }).join('') + '</tr></tbody>';
    document.getElementById('occ-grid').innerHTML = headRow + cellRow;
    MM.openModal('modal-occupancy');
  }

  var gtTargetId = null;
  function openGuestTime(id) {
    gtTargetId = id;
    var b = MM.BOOK.getBookingById(id);
    document.getElementById('gt-booking-label').textContent = b.id + ' — ' + b.property + ' · ' + b.guest;
    document.getElementById('gt-arrival').value = '';
    document.getElementById('gt-departure').value = b.arrival && b.arrival.checkoutTime || '';
    MM.openModal('modal-guest-time');
  }
  document.getElementById('guest-time-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(this)) return;
    var fields = {};
    var arr = document.getElementById('gt-arrival').value;
    var dep = document.getElementById('gt-departure').value;
    if (arr) fields.agreedArrivalTime = arr;
    if (dep) fields.checkoutTime = dep;
    var saveBtn = document.getElementById('gt-save-btn');
    MM.simulateSave(saveBtn, 'Saving…', function () {
      MM.BOOK.saveArrivalOverride(gtTargetId, fields);
      MM.closeModal('modal-guest-time');
      MM.showToast('Guest time updated.');
      render();
    });
  });

  var gcTargetId = null;
  function openGuestCount(id) {
    gcTargetId = id;
    var b = MM.BOOK.getBookingById(id);
    document.getElementById('gc-booking-label').textContent = b.id + ' — ' + b.property + ' · ' + b.guest;
    document.getElementById('gc-booked').textContent = (b.adults || 0) + ' adults, ' + (b.children || 0) + ' children';
    document.getElementById('gc-actual').textContent = b.arrival.companions + ' guests';
    MM.openModal('modal-guest-count');
  }
  document.getElementById('gc-confirm-btn').addEventListener('click', function () {
    MM.BOOK.saveArrivalOverride(gcTargetId, { guestCountConfirmed: true });
    MM.closeModal('modal-guest-count');
    MM.showToast('Guest count confirmed.');
    render();
  });

  var drTargetId = null;
  function openDecide(id) {
    drTargetId = id;
    var b = MM.BOOK.getBookingById(id);
    document.getElementById('dr-booking-label').textContent = b.id + ' — ' + b.property + ' · ' + b.guest;
    document.getElementById('dr-time').value = b.arrival.requestTime || '';
    MM.openModal('modal-decide-request');
  }
  document.getElementById('dr-approve-btn').addEventListener('click', function () {
    var time = document.getElementById('dr-time').value;
    MM.BOOK.saveArrivalOverride(drTargetId, { requestStatus: 'approved', requestTime: time || MM.BOOK.getBookingById(drTargetId).arrival.requestTime });
    MM.closeModal('modal-decide-request');
    MM.showToast('Request approved.');
    render();
  });
  document.getElementById('dr-reject-btn').addEventListener('click', function () {
    MM.BOOK.saveArrivalOverride(drTargetId, { requestStatus: 'rejected' });
    MM.closeModal('modal-decide-request');
    MM.showToast('Request rejected.', { danger: true });
    render();
  });

  document.querySelectorAll('[data-arrival-tab]').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('[data-arrival-tab]').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      state.tab = tab.getAttribute('data-arrival-tab');
      state.limit = 25;
      render();
    });
  });

  document.getElementById('bu-filter').addEventListener('change', function (e) { state.bu = e.target.value; render(); });
  document.getElementById('date-filter').addEventListener('change', function (e) { state.date = e.target.value; render(); });
  document.getElementById('online-status-filter').addEventListener('change', function (e) { state.onlineStatus = e.target.value; render(); });
  document.getElementById('requests-only-toggle').addEventListener('change', function (e) { state.requestsOnly = e.target.checked; render(); });
  MM.BOOK.wireSearch(document.getElementById('search-input'), function (q) { state.q = q; render(); });
  document.getElementById('load-more-btn').addEventListener('click', function () { state.limit += 25; render(); });

  render();
});
