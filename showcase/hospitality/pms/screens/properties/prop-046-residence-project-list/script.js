(function () {
  'use strict';
  var RESIDENCES = [
    { id: 'res1', name: 'Cove Drive Residence', bu: 'Sentosa Collection', units: 12 },
    { id: 'res2', name: 'Belongil Beach Villas', bu: 'Byron Bay Retreats', units: 8 }
  ];
  function rows(data) {
    document.getElementById('residence-tbody').innerHTML = data.map(function (r) {
      return '<tr><td class="cell-strong">' + r.name + '</td><td class="cell-sub">' + r.bu + '</td><td class="cell-num">' + r.units + '</td>' +
        '<td class="row-actions"><a class="btn btn-ghost btn-sm" href="../prop-047-view-residence-project-details/index.html?id=' + r.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></a></td></tr>';
    }).join('');
    document.getElementById('result-count').textContent = data.length + ' residences';
    document.getElementById('residence-empty').hidden = data.length !== 0;
  }
  rows(RESIDENCES);
  document.getElementById('filter-bu').addEventListener('change', function () {
    var bu = this.value;
    rows(RESIDENCES.filter(function (r) { return !bu || r.bu === bu; }));
  });
})();
