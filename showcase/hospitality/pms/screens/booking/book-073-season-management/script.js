document.addEventListener('DOMContentLoaded', function () {
  var regionId = BOOK.REGIONS[0].id;
  var working = [];
  var pendingDeleteId = null;

  function daysBetween(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000) + 1; }
  function addDays(d, n) { var dt = new Date(d + 'T00:00:00'); dt.setDate(dt.getDate() + n); return dt.toISOString().slice(0, 10); }

  function populateRegionSelect() {
    var sel = document.getElementById('region-select');
    BOOK.REGIONS.forEach(function (r) {
      var o = document.createElement('option'); o.value = r.id; o.textContent = r.name; sel.appendChild(o);
    });
    sel.value = regionId;
  }

  function populateCopySelects() {
    var fromSel = document.getElementById('copy-from');
    var toSel = document.getElementById('copy-to');
    fromSel.innerHTML = ''; toSel.innerHTML = '';
    var withSeasons = BOOK.regionsWithSeasons();
    var withoutSeasons = BOOK.regionsWithoutSeasons();
    if (!withSeasons.length) { fromSel.innerHTML = '<option value="">No regions with seasons yet</option>'; }
    withSeasons.forEach(function (r) { var o = document.createElement('option'); o.value = r.id; o.textContent = r.name; fromSel.appendChild(o); });
    if (!withoutSeasons.length) { toSel.innerHTML = '<option value="">All regions already have seasons</option>'; }
    withoutSeasons.forEach(function (r) { var o = document.createElement('option'); o.value = r.id; o.textContent = r.name; toSel.appendChild(o); });
  }

  function load(rid) {
    regionId = rid;
    working = BOOK.getSeasons(regionId).map(function (s) { return Object.assign({}, s); });
    renderAll();
  }

  function renderAll() {
    working.sort(function (a, b) { return new Date(a.start) - new Date(b.start); });
    renderTable();
    renderTimeline();
    renderLegend();
    document.getElementById('season-count-sub').textContent = working.length + ' season' + (working.length === 1 ? '' : 's') + ' declared for ' + (BOOK.REGIONS.filter(function(r){return r.id===regionId;})[0] || {}).name;
  }

  function renderLegend() {
    var el = document.getElementById('season-legend');
    var seen = {};
    el.innerHTML = working.map(function (s) {
      if (seen[s.name]) return '';
      seen[s.name] = true;
      return '<span class="season-legend__item"><span class="season-legend__dot" style="background:' + BOOK.seasonColor(s.name) + '"></span>' + s.name + '</span>';
    }).join('');
    if (!working.length) el.innerHTML = '<span class="text-sm text-muted">No seasons to show.</span>';
  }

  function renderTimeline() {
    var timeline = document.getElementById('timeline');
    var monthsRow = document.getElementById('timeline-months');
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    monthsRow.innerHTML = months.map(function (m) { return '<span>' + m + '</span>'; }).join('');
    var yearStart = new Date('2026-01-01').getTime();
    var yearEnd = new Date('2026-12-31').getTime();
    var span = yearEnd - yearStart;
    timeline.innerHTML = working.map(function (s) {
      var start = Math.max(new Date(s.start + 'T00:00:00').getTime(), yearStart);
      var end = Math.min(new Date(s.end + 'T00:00:00').getTime(), yearEnd);
      var left = ((start - yearStart) / span) * 100;
      var width = Math.max(((end - start) / span) * 100, 1.5);
      return '<div class="season-timeline__block" style="left:' + left + '%; width:' + width + '%; background:' + BOOK.seasonColor(s.name) + ';" title="' + s.name + ': ' + BOOK.fmtDate(s.start) + ' – ' + BOOK.fmtDate(s.end) + '">' + s.name + '</div>';
    }).join('');
    if (!working.length) timeline.innerHTML = '<div class="empty-state" style="padding:14px;"><p>No seasons on the timeline yet — add one below.</p></div>';
  }

  function rowHtml(s, idx) {
    return '<tr class="season-row" data-idx="' + idx + '">' +
      '<td><span class="season-name-chip"><span class="season-name-chip__dot" style="background:' + BOOK.seasonColor(s.name) + '"></span>' + s.name + '</span></td>' +
      '<td class="rate-value-cell">' + BOOK.fmtDate(s.start) + '</td>' +
      '<td class="rate-value-cell">' + BOOK.fmtDate(s.end) + '</td>' +
      '<td class="rate-value-cell">' + daysBetween(s.start, s.end) + ' days</td>' +
      '<td>' + (s.autoFix ? '<span class="badge badge-info">' + s.autoFix + '</span>' : '—') + '</td>' +
      '<td><div class="row-actions">' +
        '<button class="btn btn-ghost btn-sm" data-edit="' + idx + '" title="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + idx + '" title="Delete"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg></button>' +
      '</div></td></tr>';
  }

  function editRowHtml(s, idx) {
    var names = ['Low Season', 'Mid Season', 'High Season', 'Peak Season'];
    return '<tr class="season-row" data-idx="' + idx + '">' +
      '<td><select data-f="name">' + names.map(function (n) { return '<option value="' + n + '"' + (n === s.name ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></td>' +
      '<td><input type="date" data-f="start" value="' + s.start + '"></td>' +
      '<td><input type="date" data-f="end" value="' + s.end + '"></td>' +
      '<td class="rate-value-cell">' + daysBetween(s.start, s.end) + ' days</td>' +
      '<td>—</td>' +
      '<td><div class="row-actions">' +
        '<button class="btn btn-ghost btn-sm" data-save-row="' + idx + '" title="Confirm"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="20 6 9 17 4 12"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-cancel-row="' + idx + '" title="Cancel"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
      '</div></td></tr>';
  }

  var editingIdx = null;

  function renderTable() {
    var tbody = document.getElementById('season-rows');
    if (!working.length) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' +
        '<h3>No seasons declared for this region</h3><p>Add one, use Smart Season Input, or replicate from another region.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = working.map(function (s, i) { return i === editingIdx ? editRowHtml(s, i) : rowHtml(s, i); }).join('');
    wireRowEvents();
  }

  function wireRowEvents() {
    document.querySelectorAll('[data-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () { editingIdx = Number(btn.getAttribute('data-edit')); renderTable(); });
    });
    document.querySelectorAll('[data-cancel-row]').forEach(function (btn) {
      btn.addEventListener('click', function () { editingIdx = null; renderTable(); });
    });
    document.querySelectorAll('[data-save-row]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = Number(btn.getAttribute('data-save-row'));
        var tr = btn.closest('tr');
        var name = tr.querySelector('[data-f="name"]').value;
        var start = tr.querySelector('[data-f="start"]').value;
        var end = tr.querySelector('[data-f="end"]').value;
        if (!start || !end || new Date(end) < new Date(start)) { MM.showToast('End date must be on/after start date.', { danger: true }); return; }
        working[idx] = Object.assign({}, working[idx], { name: name, start: start, end: end, autoFix: null });
        editingIdx = null;
        renderAll();
      });
    });
    document.querySelectorAll('[data-delete]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        pendingDeleteId = Number(btn.getAttribute('data-delete'));
        document.getElementById('delete-season-name').textContent = working[pendingDeleteId].name;
        document.getElementById('cutoff-date-group').hidden = true;
        window.MM.openModal('modal-delete-season');
      });
    });
  }

  document.querySelectorAll('[name="gap-method"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      document.getElementById('cutoff-date-group').hidden = document.querySelector('[name="gap-method"]:checked').value !== 'cutoff';
    });
  });

  document.getElementById('btn-confirm-delete-season').addEventListener('click', function () {
    if (pendingDeleteId === null) return;
    var method = document.querySelector('[name="gap-method"]:checked').value;
    var idx = pendingDeleteId;
    var removed = working[idx];
    var prev = working[idx - 1];
    var next = working[idx + 1];
    if (method === 'prev' && prev) { prev.end = removed.end; prev.autoFix = 'Extended to cover deleted ' + removed.name; }
    else if (method === 'next' && next) { next.start = removed.start; next.autoFix = 'Extended to cover deleted ' + removed.name; }
    else if (method === 'cutoff') {
      var cutoff = document.getElementById('cutoff-date').value;
      if (cutoff) {
        if (prev) { prev.end = cutoff; prev.autoFix = 'End date fixed at cut off'; }
        if (next) { next.start = addDays(cutoff, 1); next.autoFix = 'Start date fixed at cut off'; }
      }
    }
    working.splice(idx, 1);
    editingIdx = null;
    pendingDeleteId = null;
    window.MM.closeModal('modal-delete-season');
    MM.showToast('Season "' + removed.name + '" deleted.', { danger: true });
    renderAll();
  });

  document.getElementById('btn-add-season').addEventListener('click', function () {
    var lastEnd = working.length ? working[working.length - 1].end : '2025-12-31';
    var start = addDays(lastEnd, 1);
    var end = addDays(start, 29);
    working.push({ id: 'SSN-' + MM.uid(), name: 'Low Season', start: start, end: end, autoFix: null });
    editingIdx = working.length - 1;
    renderAll();
    editingIdx = working.length - 1;
    renderTable();
  });

  document.getElementById('btn-save-seasons').addEventListener('click', function () {
    var btn = this;
    var original = btn.textContent;
    btn.disabled = true; btn.textContent = 'Saving…';
    MM.simulateSave(function () {
      btn.disabled = false; btn.textContent = original;
      working.forEach(function (s) { s.duration = daysBetween(s.start, s.end); });
      BOOK.saveSeasons(regionId, working);
      MM.showToast('Seasons saved for this region.');
      populateCopySelects();
    });
  });

  document.getElementById('region-select').addEventListener('change', function () {});
  document.getElementById('btn-load').addEventListener('click', function () {
    load(document.getElementById('region-select').value);
  });

  /* Smart Season Input */
  document.getElementById('btn-clear-smart').addEventListener('click', function () {
    document.getElementById('smart-input').value = '';
  });
  document.getElementById('btn-interpret').addEventListener('click', function () {
    var raw = document.getElementById('smart-input').value.trim();
    if (!raw) { MM.showToast('Enter at least one season line first.', { danger: true }); return; }
    var lines = raw.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
    var parsed = [];
    var re = /^(.+?):\s*(\d{4}-\d{2}-\d{2})\s*-\s*(\d{4}-\d{2}-\d{2})$/;
    var bad = 0;
    lines.forEach(function (line) {
      var m = line.match(re);
      if (!m) { bad++; return; }
      parsed.push({ id: 'SSN-' + MM.uid(), name: m[1].trim(), start: m[2], end: m[3], autoFix: null });
    });
    if (!parsed.length) { MM.showToast('Could not parse any lines. Use "Name: YYYY-MM-DD - YYYY-MM-DD".', { danger: true }); return; }
    parsed.sort(function (a, b) { return new Date(a.start) - new Date(b.start); });
    for (var i = 0; i < parsed.length - 1; i++) {
      var curEnd = new Date(parsed[i].end + 'T00:00:00');
      var nextStart = new Date(parsed[i + 1].start + 'T00:00:00');
      var gapDays = Math.round((nextStart - curEnd) / 86400000) - 1;
      if (gapDays > 0) {
        var extendDays = Math.ceil(gapDays / 2); // favor preceding season on odd gaps
        var newEnd = new Date(curEnd); newEnd.setDate(newEnd.getDate() + extendDays);
        parsed[i].end = newEnd.toISOString().slice(0, 10);
        parsed[i].autoFix = 'Extended to fill gap before ' + parsed[i + 1].name;
        var newStart = new Date(newEnd); newStart.setDate(newStart.getDate() + 1);
        parsed[i + 1].start = newStart.toISOString().slice(0, 10);
      }
    }
    working = parsed;
    editingIdx = null;
    renderAll();
    MM.showToast('Interpreted ' + parsed.length + ' season' + (parsed.length === 1 ? '' : 's') + (bad ? ' (' + bad + ' line(s) skipped — check format)' : '') + '.');
  });

  /* Replicate from another region */
  var pendingCopy = null;
  document.getElementById('btn-preview').addEventListener('click', function () {
    var fromId = document.getElementById('copy-from').value;
    var toId = document.getElementById('copy-to').value;
    var preview = document.getElementById('copy-preview');
    if (!fromId || !toId) { MM.showToast('Choose both a source and target region.', { danger: true }); return; }
    var seasons = BOOK.getSeasons(fromId);
    preview.hidden = false;
    preview.innerHTML = '<strong>Preview — ' + seasons.length + ' season(s) to copy:</strong><ul>' +
      seasons.map(function (s) { return '<li>' + s.name + ': ' + BOOK.fmtDate(s.start) + ' – ' + BOOK.fmtDate(s.end) + '</li>'; }).join('') + '</ul>';
  });
  document.getElementById('btn-apply-copy').addEventListener('click', function () {
    var fromId = document.getElementById('copy-from').value;
    var toId = document.getElementById('copy-to').value;
    if (!fromId || !toId) { MM.showToast('Choose both a source and target region.', { danger: true }); return; }
    pendingCopy = { fromId: fromId, toId: toId };
    document.getElementById('copy-confirm-from').textContent = (BOOK.REGIONS.filter(function(r){return r.id===fromId;})[0] || {}).name;
    document.getElementById('copy-confirm-to').textContent = (BOOK.REGIONS.filter(function(r){return r.id===toId;})[0] || {}).name;
    window.MM.openModal('modal-copy-confirm');
  });
  document.getElementById('btn-confirm-copy').addEventListener('click', function () {
    if (!pendingCopy) return;
    var seasons = BOOK.getSeasons(pendingCopy.fromId).map(function (s) { return Object.assign({}, s, { id: 'SSN-' + MM.uid(), autoFix: 'Copied from ' + (BOOK.REGIONS.filter(function(r){return r.id===pendingCopy.fromId;})[0] || {}).name }); });
    BOOK.saveSeasons(pendingCopy.toId, seasons);
    window.MM.closeModal('modal-copy-confirm');
    MM.showToast('Seasons copied successfully.');
    document.getElementById('copy-preview').hidden = true;
    populateCopySelects();
    if (pendingCopy.toId === regionId) load(regionId);
    pendingCopy = null;
  });

  populateRegionSelect();
  populateCopySelects();
  load(regionId);
});
