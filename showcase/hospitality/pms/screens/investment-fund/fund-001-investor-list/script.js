(function () {
  'use strict';
  var statusMap = { active: 'badge-success', suspended: 'badge-danger' };

  function rows(data) {
    document.getElementById('list-tbody').innerHTML = data.map(function (iv) {
      return '<tr class="clickable" data-goto="../fund-002-investor-transaction-statement/index.html?id=' + iv.id + '">' +
        '<td class="cell-strong">' + iv.name + '</td>' +
        '<td class="cell-num">$' + iv.totalInvested.toLocaleString() + '</td>' +
        '<td class="cell-num">$' + iv.balance.toLocaleString() + '</td>' +
        '<td class="cell-num">' + iv.interestRate + '%</td>' +
        '<td><span class="badge ' + statusMap[iv.status] + '">' + iv.status + '</span></td>' +
        '<td class="row-actions">' +
          '<button class="btn btn-outline btn-sm" data-assign="' + iv.id + '">Assign Project</button>' +
          '<a class="btn btn-ghost btn-sm" href="../fund-007-investor-interest-rate/index.html">Rate</a>' +
        '</td></tr>';
    }).join('');
    document.getElementById('result-count').textContent = data.length + ' investors';
  }
  rows(MM.FUND.INVESTORS);

  document.getElementById('search-input').addEventListener('input', function () {
    var q = this.value.trim().toLowerCase();
    rows(MM.FUND.INVESTORS.filter(function (iv) { return iv.name.toLowerCase().indexOf(q) !== -1; }));
  });

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var assignBtn = e.target.closest('[data-assign]');
    if (assignBtn) {
      var iv = MM.FUND.INVESTORS.find(function (d) { return d.id === assignBtn.dataset.assign; });
      document.getElementById('assign-investor-name').textContent = iv.name;
      document.getElementById('f-project').innerHTML = MM.FUND.PROJECTS.map(function (p) { return '<option>' + p.name + '</option>'; }).join('');
      MM.openModal('assign-project-modal');
      return;
    }
    var row = e.target.closest('[data-goto]');
    if (row && !e.target.closest('button') && !e.target.closest('a')) window.location.href = row.dataset.goto;
  });

  document.getElementById('save-assign-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Assigning...', function () {
      MM.closeModal('assign-project-modal');
      MM.showToast('Project assigned to investor');
    });
  });
})();
