(function () {
  'use strict';
  var BOOK = MM.BOOK;
  var buSelect = document.getElementById('f-bu');
  var dateInput = document.getElementById('f-date');

  (BOOK.BUSINESS_UNITS || []).forEach(function (bu) {
    var opt = document.createElement('option'); opt.value = bu; opt.textContent = bu; buSelect.appendChild(opt);
  });

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  dateInput.value = todayStr();

  function mapLink(loc) {
    if (!loc) return null;
    return 'https://www.google.com/maps?q=' + encodeURIComponent(loc);
  }

  function fmtDT(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) + ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  function render() {
    var date = dateInput.value || todayStr();
    var buFilter = buSelect.value;
    var rows = BOOK.getTimesheetRows(date).filter(function (r) { return !buFilter || r.team === buFilter; });
    document.getElementById('result-count').textContent = rows.length + (rows.length === 1 ? ' staff member' : ' staff members');

    var tbody = document.getElementById('ts-tbody');
    tbody.innerHTML = rows.map(function (r) {
      var rowClass = r.sickLeave ? ' class="sick-leave-row"' : '';

      var clockInCell;
      if (r.dayOff) {
        clockInCell = '<span class="ts-dayoff">Day Off</span>';
      } else if (r.clockIn) {
        clockInCell = (r.clockInManual ? '<span class="ts-manual">' + r.clockIn + ' (Updated by Somchai Anuwat)</span>' : r.clockIn);
      } else {
        clockInCell = '<button type="button" class="ts-missing-link" data-add-clockin="' + r.staffId + '">No — add manually</button>';
      }

      var clockInLoc = (!r.dayOff && r.clockInLoc) ? '<a class="ts-loc-link" href="' + mapLink(r.clockInLoc) + '" target="_blank" rel="noopener">Open Map</a>' : '<span class="text-muted">—</span>';

      var clockOutCell;
      if (r.dayOff) clockOutCell = '<span class="ts-dayoff">Day Off</span>';
      else if (r.sickLeave) clockOutCell = '<span class="text-muted">—</span>';
      else if (r.clockOut) clockOutCell = r.clockOut;
      else if (r.clockIn) clockOutCell = '<span style="color:var(--color-danger); font-weight:700;">No</span>';
      else clockOutCell = '<span class="text-muted">—</span>';

      var clockOutLoc = (!r.dayOff && r.clockOutLoc) ? '<a class="ts-loc-link" href="' + mapLink(r.clockOutLoc) + '" target="_blank" rel="noopener">Open Map</a>' : '<span class="text-muted">—</span>';

      var validatedCell;
      if (r.validated) {
        validatedCell = '<span class="badge badge-success">Validated</span><div class="cell-sub" style="margin-top:4px;">' + (r.validatedBy || '—') + (r.validatedOn ? ' · ' + fmtDT(r.validatedOn) : '') + '</div>';
      } else if (r.clockOut) {
        validatedCell = '<button type="button" class="btn btn-outline btn-sm" data-validate="' + r.staffId + '">Validate</button>';
      } else {
        validatedCell = '<span class="badge badge-neutral">Pending</span>';
      }

      var trackerCell;
      if (r.dayOff) trackerCell = '<span class="ts-dayoff">Day Off</span>';
      else if (r.sickLeave) trackerCell = '<a href="#" class="ts-loc-link" data-cert="1">Download certificate</a>';
      else if (r.tracker) trackerCell = '<button type="button" class="btn btn-ghost btn-sm" data-track="' + r.staffId + '" data-track-name="' + r.name + '">Track</button>';
      else trackerCell = '<span class="text-muted">—</span>';

      return '<tr' + rowClass + '>' +
        '<td class="cell-strong">' + r.name + '</td>' +
        '<td class="cell-sub">' + r.department + '</td>' +
        '<td>' + clockInCell + '</td>' +
        '<td>' + clockInLoc + '</td>' +
        '<td>' + clockOutCell + '</td>' +
        '<td>' + clockOutLoc + '</td>' +
        '<td>' + validatedCell + '</td>' +
        '<td class="cell-sub">' + (r.createdAt || '—') + '</td>' +
        '<td>' + trackerCell + '</td>' +
        '</tr>';
    }).join('');
  }

  document.getElementById('f-bu').addEventListener('change', render);
  dateInput.addEventListener('change', render);

  document.getElementById('ts-tbody').addEventListener('click', function (e) {
    var addBtn = e.target.closest('[data-add-clockin]');
    var validateBtn = e.target.closest('[data-validate]');
    var trackBtn = e.target.closest('[data-track]');
    var certLink = e.target.closest('[data-cert]');

    if (addBtn) {
      var cell = addBtn.parentNode;
      var staffId = addBtn.dataset.addClockin;
      cell.innerHTML = '<span class="ts-inline-time"><input type="time" id="inline-time-' + staffId + '"><button type="button" class="btn btn-primary btn-sm" data-save-clockin="' + staffId + '">Save</button></span>';
      return;
    }
    var saveBtn = e.target.closest('[data-save-clockin]');
    if (saveBtn) {
      var sId = saveBtn.dataset.saveClockin;
      var timeVal = document.getElementById('inline-time-' + sId).value;
      if (!timeVal) { MM.showToast('Enter a time first', { danger: true }); return; }
      BOOK.saveTimesheetOverride(dateInput.value || todayStr(), sId, { clockIn: timeVal, clockInManual: true });
      MM.showToast('Clock-in recorded');
      render();
      return;
    }
    if (validateBtn) {
      BOOK.saveTimesheetOverride(dateInput.value || todayStr(), validateBtn.dataset.validate, {
        validated: true, validatedBy: 'Somchai Anuwat', validatedOn: new Date().toISOString()
      });
      MM.showToast('Timesheet validated');
      render();
      return;
    }
    if (trackBtn) {
      document.getElementById('track-title').textContent = 'Movement Track — ' + trackBtn.dataset.trackName;
      renderTrackMap();
      MM.openModal('modal-track');
      return;
    }
    if (certLink) {
      e.preventDefault();
      MM.showToast('Sick leave certificate downloaded (demo)');
      return;
    }
  });

  function renderTrackMap() {
    var svg = document.getElementById('track-map');
    var points = [[40, 200], [140, 120], [260, 150], [360, 60], [480, 90]];
    var path = points.map(function (p, i) { return (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]; }).join(' ');
    var dots = points.map(function (p, i) {
      var label = i === 0 ? 'Office' : (i === points.length - 1 ? 'Villa' : '');
      return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" fill="' + (i === 0 || i === points.length - 1 ? 'var(--color-primary-dark)' : 'var(--color-primary)') + '" stroke="white" stroke-width="2"/>' +
        (label ? '<text x="' + p[0] + '" y="' + (p[1] - 14) + '" text-anchor="middle" font-size="11" fill="var(--color-gray-700)" font-weight="700">' + label + '</text>' : '');
    }).join('');
    svg.innerHTML = '<path d="' + path + '" fill="none" stroke="var(--color-primary)" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round"/>' + dots;
  }

  render();
})();
