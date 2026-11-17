(function () {
  'use strict';
  var STORAGE_KEY = 'mm_opr_tasks';
  var editingId = null, actingId = null;
  var typeFilter = '';

  function loadAll() {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    var overrides = JSON.parse(localStorage.getItem(STORAGE_KEY + '_overrides') || '{}');
    var base = MM.OPR.TASKS.filter(function (d) { return hidden.indexOf(d.id) === -1; }).map(function (d) {
      return overrides[d.id] ? Object.assign({}, d, overrides[d.id]) : d;
    });
    return base.concat(stored).sort(function (a, b) { return b.date.localeCompare(a.date); });
  }

  function taskLabel(t) { return t.id + ' — ' + t.property; }

  function rowHtml(item) {
    var timeStr = item.start + (item.end ? ' – ' + item.end : ' (in progress)');
    return '<tr>' +
      '<td class="cell-strong">' + item.id + '</td>' +
      '<td>' + item.property + '</td>' +
      '<td>' + item.service + ' <span class="badge badge-neutral" style="margin-left:4px;">' + item.type + '</span></td>' +
      '<td>' + (item.operator || '<span class="text-muted">Unassigned</span>') + '</td>' +
      '<td class="cell-sub">' + item.date + '</td>' +
      '<td class="cell-sub">' + timeStr + '</td>' +
      '<td>' + MM.OPR.gpsBadge(item.gps) + '</td>' +
      '<td>' + MM.OPR.badge(item.status) + '</td>' +
      '<td class="row-actions">' +
      (item.status === 'In Progress' || item.status === 'Not Started' ? '<button class="btn btn-outline btn-sm" data-complete="' + item.id + '">Complete</button>' : '') +
      (item.status !== 'Problem' ? '<button class="btn btn-ghost btn-sm" data-incident="' + item.id + '" title="Report incident"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></button>' : '') +
      '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>' +
      '</td></tr>';
  }

  function render() {
    var all = loadAll();
    var q = document.getElementById('search-input').value.trim().toLowerCase();
    var filtered = all.filter(function (t) {
      if (typeFilter && t.type !== typeFilter) return false;
      if (!q) return true;
      return (t.property + ' ' + t.service + ' ' + (t.operator || '')).toLowerCase().indexOf(q) > -1;
    });
    var tbody = document.getElementById('list-tbody');
    var empty = document.getElementById('list-empty');
    if (!filtered.length) { tbody.innerHTML = ''; empty.hidden = false; } else { empty.hidden = true; tbody.innerHTML = filtered.map(rowHtml).join(''); }
    document.getElementById('result-count').textContent = filtered.length + ' task' + (filtered.length === 1 ? '' : 's');

    document.getElementById('stat-today').textContent = all.filter(function (t) { return t.date === '2026-08-27'; }).length;
    document.getElementById('stat-progress').textContent = all.filter(function (t) { return t.status === 'In Progress'; }).length;
    document.getElementById('stat-problem').textContent = all.filter(function (t) { return t.status === 'Problem'; }).length;
    document.getElementById('stat-done').textContent = all.filter(function (t) { return t.status === 'Cleaned' || t.status === 'Completed'; }).length;
  }

  document.querySelectorAll('[data-type-filter]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('[data-type-filter]').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      typeFilter = chip.dataset.typeFilter;
      render();
    });
  });
  document.getElementById('search-input').addEventListener('input', render);
  document.getElementById('clear-search-btn').addEventListener('click', function () {
    document.getElementById('search-input').value = '';
    typeFilter = '';
    document.querySelectorAll('[data-type-filter]').forEach(function (c) { c.classList.toggle('active', c.dataset.typeFilter === ''); });
    render();
  });

  document.getElementById('add-btn').addEventListener('click', function () {
    document.getElementById('item-form').reset();
    document.getElementById('f-property').innerHTML = MM.OPR.propertyOptions();
    document.getElementById('f-operator').innerHTML = '<option value="">Unassigned</option>' + MM.OPR.staffOptions();
    document.getElementById('f-date').value = '2026-08-27';
    MM.openModal('item-modal');
  });

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var all = loadAll();
    var completeBtn = e.target.closest('[data-complete]');
    var incidentBtn = e.target.closest('[data-incident]');
    var delBtn = e.target.closest('[data-delete]');
    if (completeBtn) {
      actingId = completeBtn.dataset.complete;
      var t = all.find(function (x) { return x.id === actingId; });
      document.getElementById('complete-task-name').textContent = taskLabel(t);
      MM.openModal('complete-modal');
    }
    if (incidentBtn) {
      actingId = incidentBtn.dataset.incident;
      var t2 = all.find(function (x) { return x.id === actingId; });
      document.getElementById('incident-task-name').textContent = taskLabel(t2);
      document.getElementById('incident-form').reset();
      MM.openModal('incident-modal');
    }
    if (delBtn) {
      editingId = delBtn.dataset.delete;
      document.getElementById('del-name').textContent = editingId;
      MM.openModal('delete-modal');
    }
  });

  function setOverride(id, patch) {
    var overrides = JSON.parse(localStorage.getItem(STORAGE_KEY + '_overrides') || '{}');
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var storedIdx = stored.findIndex(function (d) { return d.id === id; });
    if (storedIdx > -1) {
      stored[storedIdx] = Object.assign({}, stored[storedIdx], patch);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } else {
      overrides[id] = Object.assign({}, overrides[id], patch);
      localStorage.setItem(STORAGE_KEY + '_overrides', JSON.stringify(overrides));
    }
  }

  document.getElementById('finish-task-btn').addEventListener('click', function () {
    MM.simulateSave(document.getElementById('finish-task-btn'), 'Finishing...', function () {
      setOverride(actingId, { status: 'Cleaned', gps: 'OK', end: new Date().toTimeString().slice(0, 5) });
      MM.closeModal('complete-modal');
      MM.showToast('Task marked complete — GPS verified');
      render();
    });
  });
  document.getElementById('stop-task-btn').addEventListener('click', function () {
    setOverride(actingId, { status: 'Stopped' });
    MM.closeModal('complete-modal');
    MM.showToast('Task stopped', { danger: true });
    render();
  });

  document.getElementById('save-incident-btn').addEventListener('click', function () {
    if (!MM.validateForm(document.getElementById('incident-form'))) return;
    MM.simulateSave(document.getElementById('save-incident-btn'), 'Submitting...', function () {
      setOverride(actingId, { status: 'Problem' });
      MM.closeModal('incident-modal');
      MM.showToast('Incident reported — business unit notified', { danger: true });
      render();
    });
  });

  document.getElementById('save-btn').addEventListener('click', function () {
    if (!MM.validateForm(document.getElementById('item-form'))) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
      var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      var type = document.getElementById('f-type').value;
      var record = {
        id: (type === 'Garden' ? 'GJ-' : 'PJ-') + Math.floor(1000 + Math.random() * 9000),
        type: type,
        property: document.getElementById('f-property').value,
        service: document.getElementById('f-service').value.trim(),
        operator: document.getElementById('f-operator').value || null,
        date: document.getElementById('f-date').value,
        start: '08:00', end: null, status: 'Not Started', gps: '—',
        planned: document.getElementById('f-planned').value === 'true'
      };
      stored.push(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      MM.closeModal('item-modal');
      MM.showToast('Task created');
      render();
    });
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter(function (d) { return d.id !== editingId; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    if (MM.OPR.TASKS.some(function (d) { return d.id === editingId; })) { hidden.push(editingId); localStorage.setItem(STORAGE_KEY + '_hidden', JSON.stringify(hidden)); }
    MM.closeModal('delete-modal');
    MM.showToast('Task deleted', { danger: true });
    render();
  });

  render();
})();
