(function () {
  'use strict';
  var REN = window.MM.REN;
  var params = new URLSearchParams(window.location.search);
  var projectId = params.get('id') || REN.getProjects()[0].id;
  var project = REN.getProject(projectId);

  document.getElementById('proj-title').textContent = project.title + ' — Progress & Cost Report';
  document.getElementById('proj-sub').textContent = project.villaName + ' · ' + project.bu;
  document.getElementById('stat-status').innerHTML = REN.statusBadge(project.status);

  var budget = REN.itemBudgetTotal(project), actual = REN.itemRealTotal(project), variance = actual - budget;
  document.getElementById('stat-budget').textContent = REN.money(budget);
  document.getElementById('stat-actual').textContent = REN.money(actual);
  document.getElementById('stat-variance').innerHTML = '<span class="ren-variance ' + (variance > 0 ? 'positive' : variance < 0 ? 'negative' : 'zero') + '">' + (variance > 0 ? '+' : '') + REN.money(variance) + '</span>';

  document.getElementById('items-tbody').innerHTML = project.items.map(function (it) {
    var v = (it.realAmount || 0) - (it.budget || 0);
    return '<tr><td class="cell-strong">' + it.name + '</td><td class="cell-num">' + REN.money(it.budget) + '</td><td class="cell-num">' + REN.money(it.realAmount) + '</td>' +
      '<td class="cell-num"><span class="ren-variance ' + (v > 0 ? 'positive' : v < 0 ? 'negative' : 'zero') + '">' + (v > 0 ? '+' : '') + REN.money(v) + '</span></td></tr>';
  }).join('') || '<tr><td colspan="4" class="text-muted text-sm">No budget items yet.</td></tr>';

  document.getElementById('export-btn').addEventListener('click', function () { MM.showToast('Report exported as CSV'); });
})();
