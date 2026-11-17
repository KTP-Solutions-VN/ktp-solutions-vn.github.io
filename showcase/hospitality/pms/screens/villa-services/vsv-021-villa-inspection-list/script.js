(function () {
  'use strict';
  document.getElementById('f-bu').innerHTML = '<option value="">All Business Units</option>' + VSV.BUSINESS_UNITS.map(function (b) { return '<option>' + b + '</option>'; }).join('');
  document.getElementById('f-villa').innerHTML += MM.MOCK_PROPERTIES.map(function (p) { return '<option>' + p.name + '</option>'; }).join('');

  var REPORTS = MM.MOCK_PROPERTIES.slice(0, 6).map(function (p, i) {
    var statuses = ['Open', 'In Progress', 'Completed', 'Archived'];
    return {
      id: 'insp' + i, bu: p.bu, property: p.name, task: 'Quarterly Inspection', status: statuses[i % 4],
      createdBy: 'Somchai Anuwat', on: '2026-08-' + (10 + i),
      points: [
        { title: 'Living Room — Furniture Condition', desc: 'Check for wear, stains, or damage on sofas and chairs.', comments: [] },
        { title: 'Kitchen — Appliance Check', desc: 'Verify all appliances are functioning correctly.', comments: [] }
      ]
    };
  });

  function render() {
    var bu = document.getElementById('f-bu').value;
    var villa = document.getElementById('f-villa').value;
    var showArchive = document.getElementById('f-archive').checked;
    var filtered = REPORTS.filter(function (r) {
      if (!showArchive && r.status === 'Archived') return false;
      if (bu && r.bu !== bu) return false;
      if (villa && r.property !== villa) return false;
      return true;
    });
    var statusMap = { Open: 'badge-info', 'In Progress': 'badge-warning', Completed: 'badge-success', Archived: 'badge-neutral' };
    document.getElementById('insp-tbody').innerHTML = filtered.map(function (r, i) {
      return '<tr><td><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></td><td>' + (i + 1) + '</td><td class="cell-sub">' + r.bu + '</td><td class="cell-strong">' + r.property + '</td><td>' + r.task + '</td>' +
        '<td><span class="badge ' + statusMap[r.status] + '">' + r.status + '</span></td><td class="cell-sub">' + r.createdBy + '</td><td class="cell-sub">' + r.on + '</td>' +
        '<td class="row-actions"><button class="btn btn-outline btn-sm" data-view="' + r.id + '">View Points</button> <a class="btn btn-outline btn-sm" href="../vsv-022-inspection-edit/index.html?id=' + r.id + '">Edit</a></td></tr>';
    }).join('');
    document.getElementById('insp-empty').hidden = filtered.length !== 0;
    document.getElementById('result-count').textContent = filtered.length + ' reports';
  }
  render();
  document.getElementById('f-bu').addEventListener('change', render);
  document.getElementById('f-villa').addEventListener('change', render);
  document.getElementById('f-archive').addEventListener('change', render);

  var currentReport = null, currentPointIdx = 0;

  function showPoint() {
    var pt = currentReport.points[currentPointIdx];
    document.getElementById('vp-title').textContent = pt.title;
    document.getElementById('vp-subtitle').textContent = currentReport.property;
    document.getElementById('vp-desc').textContent = pt.desc;
    document.getElementById('vp-assign-row').hidden = true;
    document.getElementById('vp-comments').innerHTML = pt.comments.map(function (c) { return '<p class="text-sm text-muted">' + c + '</p>'; }).join('') || '<p class="text-sm text-muted">No comments yet.</p>';
    document.getElementById('vp-position').textContent = (currentPointIdx + 1) + ' of ' + currentReport.points.length;
    document.getElementById('vp-prev').disabled = currentPointIdx === 0;
    document.getElementById('vp-next').textContent = currentPointIdx === currentReport.points.length - 1 ? 'Finish' : 'Next →';
  }

  document.getElementById('insp-tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-view]');
    if (!btn) return;
    currentReport = REPORTS.find(function (r) { return r.id === btn.dataset.view; });
    currentPointIdx = 0;
    showPoint();
    MM.openModal('view-point-modal');
  });

  document.getElementById('vp-prev').addEventListener('click', function () { if (currentPointIdx > 0) { currentPointIdx--; showPoint(); } });
  document.getElementById('vp-next').addEventListener('click', function () {
    if (currentPointIdx < currentReport.points.length - 1) { currentPointIdx++; showPoint(); } else { MM.closeModal('view-point-modal'); }
  });
  document.getElementById('vp-add-comment').addEventListener('click', function () {
    var text = document.getElementById('vp-comment-input').value.trim();
    if (!text) return;
    currentReport.points[currentPointIdx].comments.push(text);
    document.getElementById('vp-comment-input').value = '';
    showPoint();
    MM.showToast('Comment added');
  });
  document.getElementById('vp-assign-task').addEventListener('click', function () { MM.showToast('Task assigned to maintenance team'); });
  document.getElementById('vp-delete-point').addEventListener('click', function () { MM.showToast('Point deleted', { danger: true }); MM.closeModal('view-point-modal'); });
})();
