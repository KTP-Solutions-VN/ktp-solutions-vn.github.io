(function () {
  'use strict';
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var job = MM.OPR.TASKS.find(function (t) { return t.id === id; }) || MM.OPR.TASKS[0];
  document.getElementById('d-villa').textContent = job.property;
  document.getElementById('d-service').textContent = job.service;
  document.getElementById('d-personnel').textContent = job.operator || 'Unassigned';
  document.getElementById('d-date').textContent = job.date;
  document.getElementById('d-time').textContent = job.start + ' \u2013 ' + (job.end || 'in progress');
  document.getElementById('d-plan').textContent = job.planned ? 'Yes' : 'No';
  document.getElementById('d-status').innerHTML = MM.OPR.badge(job.status);
  document.getElementById('photo-tbody').innerHTML = MM.OPR.GARDEN_JOB_PHOTOS.map(function (p) {
    return '<tr><td>' + p.no + '</td><td>' + p.photo + '</td><td class="cell-sub">' + p.description + '</td></tr>';
  }).join('');
})();
