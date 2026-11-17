
  var SESSIONS = DATA_LICH_DAT_DICH_VU;
  var byDate = {};
  SESSIONS.forEach(function (s) { (byDate[s.date] = byDate[s.date] || []).push(s); });
  var statusColor = { Scheduled: 'var(--info)', Confirmed: 'var(--success)', Rescheduled: 'var(--warning)', Cancelled: 'var(--error)', Completed: 'var(--gray-400)' };

  function buildCalendar() {
    var grid = document.getElementById('calGrid');
    var dow = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    dow.forEach(function (d) { var el = document.createElement('div'); el.textContent = d; el.style.cssText = 'font-weight:700;color:var(--gray-500);text-align:center;padding:4px 0;'; grid.appendChild(el); });
    var firstDow = 5; // Aug 1 2026 is a Saturday -> index 5 (Mon=0)
    for (var i = 0; i < firstDow; i++) { grid.appendChild(document.createElement('div')); }
    for (var day = 1; day <= 31; day++) {
      var dateStr = '2026-08-' + (day < 10 ? '0' + day : day);
      var cell = document.createElement('div');
      cell.style.cssText = 'border:1px solid var(--gray-200);border-radius:6px;min-height:52px;padding:4px;cursor:pointer;';
      var dots = (byDate[dateStr] || []).map(function (s) { return '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:' + statusColor[s.status] + ';margin:1px;"></span>'; }).join('');
      cell.innerHTML = '<div style="font-weight:600;">' + day + '</div><div>' + dots + '</div>';
      if (byDate[dateStr]) { cell.style.background = 'var(--primary-50)'; cell.addEventListener('click', function (d) { return function () { showDay(d); }; }(dateStr)); }
      grid.appendChild(cell);
    }
  }
  function showDay(dateStr) {
    var list = byDate[dateStr] || [];
    var panel = document.getElementById('daySessions');
    panel.innerHTML = '<h3 style="margin-bottom:var(--sp-3);">Sessions — ' + dateStr + '</h3>' + list.map(function (s) {
      return '<div class="card-flat" style="margin-bottom:var(--sp-3);">' +
        '<div style="font-weight:700;color:var(--primary-dark);font-size:13px;">' + s.productName + '</div>' +
        '<div style="font-size:12px;color:var(--gray-500);margin:4px 0;">' + s.time + ' · ' + s.location + '</div>' +
        '<div style="font-size:12px;color:var(--gray-500);margin-bottom:6px;">Capacity: ' + s.booked + '/' + s.capacity + ' · ' + s.staffInCharge + '</div>' +
        '<span class="badge badge-info">' + s.status + '</span>' +
        '<div style="margin-top:8px;display:flex;gap:6px;"><a class="btn btn-outline btn-sm" href="../../../screens/san-pham-dich-vu/danh-sach-nguoi-tham-gia-diem-danh/index.html?session=' + s.id + '">Attendees</a><a class="btn btn-ghost btn-sm openRescheduleLink" href="../../../screens/san-pham-dich-vu/doi-lich-huy-buoi/index.html?session=' + s.id + '" data-session-id="' + s.id + '">Reschedule</a></div>' +
        '</div>';
    }).join('') || '<p style="color:var(--gray-500);font-size:13px;">No sessions.</p>';
    bindRescheduleLinks();
  }
  document.getElementById('createSlotBtn').addEventListener('click', function () { CJToast('Slot created (demo only — form not shown in this walkthrough).'); });
  buildCalendar();

  /* ---------------- #30 Reschedule/Cancel Session drawer ------------------ */
  CJDrawer.bind('rescheduleOverlay');
  function populateSessionSelect(selectedId) {
    var sel = document.getElementById('rSession');
    sel.innerHTML = SESSIONS.map(function (s) {
      return '<option value="' + s.id + '">' + s.productName + ' — ' + s.date + ' ' + s.time + '</option>';
    }).join('');
    if (selectedId) sel.value = selectedId;
  }
  function toggleActionFields() {
    var isCancel = document.getElementById('rAction').value === 'cancel';
    document.getElementById('rNewSlotField').style.display = isCancel ? 'none' : '';
    document.getElementById('rReasonField').style.display = isCancel ? '' : 'none';
  }
  document.getElementById('rAction').addEventListener('change', toggleActionFields);
  function openRescheduleDrawer(sessionId) {
    populateSessionSelect(sessionId);
    document.getElementById('rAction').value = 'reschedule';
    document.getElementById('rNewSlot').value = '';
    document.getElementById('rReason').value = '';
    document.getElementById('rNotify').checked = true;
    toggleActionFields();
    CJDrawer.open('rescheduleOverlay');
  }
  function bindRescheduleLinks() {
    document.querySelectorAll('.openRescheduleLink').forEach(function (link) {
      link.addEventListener('click', function (e) { e.preventDefault(); openRescheduleDrawer(link.getAttribute('data-session-id')); });
    });
  }
  document.getElementById('rConfirmBtn').addEventListener('click', function () {
    var action = document.getElementById('rAction').value;
    var sessionSel = document.getElementById('rSession');
    var label = sessionSel.options[sessionSel.selectedIndex] ? sessionSel.options[sessionSel.selectedIndex].text : 'Session';
    CJDrawer.close('rescheduleOverlay');
    if (action === 'cancel') { CJToast('"' + label + '" cancelled. Registered attendees notified.'); }
    else { CJToast('"' + label + '" rescheduled. Registered attendees notified.'); }
  });

  (function handleDeepLink() {
    var sessionId = new URLSearchParams(window.location.search).get('openReschedule');
    if (sessionId) { openRescheduleDrawer(sessionId); }
  })();
