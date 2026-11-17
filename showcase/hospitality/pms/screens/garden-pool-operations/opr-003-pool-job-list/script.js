(function () {
  'use strict';
  function rows() { return MM.OPR.TASKS.filter(function (t) { return t.type === 'Pool'; }); }
  function render() {
    var bu = document.getElementById('bu-filter').value;
    var data = rows();
    var tbody = document.getElementById('list-tbody');
    tbody.innerHTML = data.map(function (item) {
      return '<tr class="clickable" data-view="' + item.id + '">' +
        '<td class="cell-strong">' + item.property + '</td><td>' + item.service + '</td><td>' + (item.operator || '<span class="text-muted">Unassigned</span>') + '</td>' +
        '<td class="cell-sub">' + item.date + '</td><td class="cell-sub">' + item.start + '</td><td class="cell-sub">' + (item.end || '\u2014') + '</td>' +
        '<td>' + MM.OPR.gpsBadge(item.gps) + '</td><td>' + (item.planned ? 'Yes' : 'No') + '</td>' +
        '<td class="row-actions"><a class="btn btn-ghost btn-sm" href="../opr-004-view-pool-job-details/index.html?id=' + item.id + '">View</a></td></tr>';
    }).join('');
    document.getElementById('result-count').textContent = data.length + ' jobs';
  }
  document.getElementById('bu-filter').addEventListener('change', render);
  render();
})();
