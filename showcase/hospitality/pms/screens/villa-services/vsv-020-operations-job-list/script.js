(function () {
  'use strict';
  var VSV = MM.VSV;
  var STORAGE_KEY = 'mm_vsv_ops_job_list';
  var TODAY = '2026-09-03';

  var JOBS = [
    { id: 'OJ-01', villaId: 'PV-101', operator: 'Prasert Wongsa', service: 'Lawn mowing & hedge trim', slotStart: '08:00', slotEnd: '10:00' },
    { id: 'OJ-02', villaId: 'PV-102', operator: 'Anurak Boonchu', service: 'Pest control spray', slotStart: '08:30', slotEnd: '09:30' },
    { id: 'OJ-03', villaId: 'PV-105', operator: 'Prasert Wongsa', service: 'Tropical planting refresh', slotStart: '10:30', slotEnd: '12:30' },
    { id: 'OJ-04', villaId: 'PV-108', operator: 'Wayan Suta', service: 'Irrigation check', slotStart: '09:00', slotEnd: '10:00' },
    { id: 'OJ-05', villaId: 'PV-106', operator: 'Somjai Phonsri', service: 'Lawn mowing & hedge trim', slotStart: '08:00', slotEnd: '09:30' },
    { id: 'OJ-06', villaId: 'PV-107', operator: 'Somjai Phonsri', service: 'Palm tree trimming', slotStart: '13:00', slotEnd: '15:00' }
  ];

  function loadOverrides() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; } }
  function saveOverrides(o) { localStorage.setItem(STORAGE_KEY, JSON.stringify(o)); }

  function populateOperators() {
    var sel = document.getElementById('f-operator');
    var names = Array.from(new Set(JOBS.map(function (j) { return j.operator; })));
    names.forEach(function (n) { var o = document.createElement('option'); o.value = n; o.textContent = n; sel.appendChild(o); });
    sel.addEventListener('change', render);
  }

  var STATUS_LABEL = { 'not-started': 'Not Started', 'in-progress': 'In Progress', done: 'Done' };
  var STATUS_BADGE = { 'not-started': 'badge-neutral', 'in-progress': 'badge-warning', done: 'badge-success' };

  function jobsWithState() {
    var ov = loadOverrides();
    return JOBS.map(function (j) { return Object.assign({}, j, { status: (ov[j.id] || {}).status || 'not-started', notes: (ov[j.id] || {}).notes || '' }); });
  }

  function render() {
    var operator = document.getElementById('f-operator').value;
    var rows = jobsWithState().filter(function (j) { return !operator || j.operator === operator; });
    document.getElementById('job-count').textContent = rows.length + ' job' + (rows.length === 1 ? '' : 's') + ' today';
    var grid = document.getElementById('jobs-grid');
    var empty = document.getElementById('jobs-empty');
    if (!rows.length) { grid.innerHTML = ''; empty.hidden = false; return; }
    empty.hidden = true;
    grid.innerHTML = rows.map(function (j) {
      var prop = VSV.propertyById(j.villaId);
      var actionBtn = j.status === 'done'
        ? '<button class="btn btn-outline btn-sm btn-block" data-view="' + j.id + '">View Summary</button>'
        : j.status === 'in-progress'
          ? '<button class="btn btn-primary btn-sm btn-block" data-view="' + j.id + '">Continue Shift</button>'
          : '<button class="btn btn-primary btn-sm btn-block" data-start="' + j.id + '">Start Shift</button>';
      return '<div class="card hoverable ops-job-card">' +
        '<div class="card__body">' +
          '<div class="ops-job-thumb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg></div>' +
          '<div><h3 style="margin:0 0 4px;font-size:var(--font-size-lg);color:var(--color-primary-dark);">' + prop.name + '</h3>' +
          '<div class="ops-job-meta">' + j.service + '</div>' +
          '<div class="ops-job-meta">' + j.slotStart + ' &ndash; ' + j.slotEnd + ' &middot; ' + j.operator + '</div></div>' +
          '<span class="badge ' + STATUS_BADGE[j.status] + '">' + STATUS_LABEL[j.status] + '</span>' +
          actionBtn +
        '</div></div>';
    }).join('');
    grid.querySelectorAll('[data-start]').forEach(function (b) { b.addEventListener('click', function () { setStatus(b.getAttribute('data-start'), 'in-progress'); openJobStatus(b.getAttribute('data-start')); }); });
    grid.querySelectorAll('[data-view]').forEach(function (b) { b.addEventListener('click', function () { openJobStatus(b.getAttribute('data-view')); }); });
  }

  function setStatus(id, status, extra) {
    var ov = loadOverrides();
    ov[id] = Object.assign({}, ov[id], { status: status }, extra || {});
    saveOverrides(ov);
  }

  var currentJobId = null;
  function openJobStatus(id) {
    currentJobId = id;
    var job = jobsWithState().find(function (j) { return j.id === id; });
    var prop = VSV.propertyById(job.villaId);
    document.getElementById('js-subtitle').textContent = prop.name + ' · ' + job.service;
    document.getElementById('js-panel').innerHTML =
      '<div class="ro-item"><span class="ro-label">Villa</span><span class="ro-value">' + prop.name + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Slot</span><span class="ro-value">' + job.slotStart + ' &ndash; ' + job.slotEnd + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Operator</span><span class="ro-value">' + job.operator + '</span></div>' +
      '<div class="ro-item"><span class="ro-label">Status</span><span class="ro-value">' + STATUS_LABEL[job.status] + '</span></div>';
    document.getElementById('js-notes').value = job.notes || '';
    document.getElementById('js-photo').value = '';
    var finishBtn = document.getElementById('js-finish');
    finishBtn.disabled = job.status === 'done';
    finishBtn.textContent = job.status === 'done' ? 'Already Finished' : 'Finish';
    MM.openModal('job-status-modal');
  }

  document.getElementById('js-stop').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Stopping...', function () {
      setStatus(currentJobId, 'not-started', { notes: document.getElementById('js-notes').value.trim() });
      MM.closeModal('job-status-modal');
      MM.showToast('Shift paused — job returned to Not Started.');
      render();
    });
  });

  document.getElementById('js-finish').addEventListener('click', function () {
    if (this.disabled) return;
    var btn = this;
    MM.simulateSave(btn, 'Finishing...', function () {
      setStatus(currentJobId, 'done', { notes: document.getElementById('js-notes').value.trim(), finishedAt: TODAY });
      MM.closeModal('job-status-modal');
      MM.showToast('Job marked as finished.');
      render();
    });
  });

  populateOperators();
  render();
})();
