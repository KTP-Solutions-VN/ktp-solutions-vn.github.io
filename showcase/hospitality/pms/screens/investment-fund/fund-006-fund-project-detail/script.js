(function () {
  'use strict';
  var params = new URLSearchParams(window.location.search);
  var stored = JSON.parse(localStorage.getItem('mm_fund_projects') || '[]');
  var project = MM.FUND.PROJECTS.concat(stored).find(function (p) { return p.id === params.get('id'); }) || MM.FUND.PROJECTS[0];

  document.getElementById('project-name').textContent = project.name;
  document.getElementById('bc-name').textContent = project.name;
  document.getElementById('stat-target').textContent = '$' + project.target.toLocaleString();
  document.getElementById('stat-raised').textContent = '$' + project.raised.toLocaleString();
  document.getElementById('stat-investors').textContent = project.investors;

  var contributors = MM.FUND.INVESTORS.slice(0, project.investors || 1);
  document.getElementById('list-tbody').innerHTML = contributors.map(function (iv, i) {
    var contribution = Math.round(project.raised / (contributors.length || 1));
    return '<tr><td class="cell-strong">' + iv.name + '</td><td class="cell-num">$' + contribution.toLocaleString() + '</td><td><span class="badge badge-success">Active</span></td></tr>';
  }).join('') || '<tr><td colspan="3" class="text-muted text-sm">No investors yet.</td></tr>';
})();
