(function () {
  'use strict';
  var VISITS = MM.MOCK_PROPERTIES.slice(0, 5).map(function (p, i) {
    return {
      id: 'pv' + i, property: p.name, vendor: VSV.POOL_VENDORS[i % VSV.POOL_VENDORS.length],
      status: i === 2 ? 'Has Issue' : 'Cleaned', gps: i === 3 ? 'Mismatch' : 'Verified',
      quote: i === 2 ? { vendor: VSV.POOL_VENDORS[0], amount: 320, description: 'Pump motor replacement' } : null
    };
  });

  document.getElementById('list-tbody').innerHTML = VISITS.map(function (v) {
    return '<tr><td class="cell-strong">' + v.property + '</td><td class="cell-sub">' + v.vendor + '</td>' +
      '<td><span class="badge ' + (v.status === 'Cleaned' ? 'badge-success' : 'badge-danger') + '">' + v.status + '</span></td>' +
      '<td><span class="badge ' + (v.gps === 'Verified' ? 'badge-info' : 'badge-warning') + '">' + v.gps + '</span></td>' +
      '<td class="row-actions">' + (v.quote ? '<button class="btn btn-outline btn-sm" data-quote="' + v.id + '">View Quotation</button>' : '<span class="text-muted text-sm">—</span>') + '</td></tr>';
  }).join('');

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-quote]');
    if (!btn) return;
    var v = VISITS.find(function (d) { return d.id === btn.dataset.quote; });
    document.getElementById('quote-detail').textContent = v.vendor + ' quoted $' + v.quote.amount + ' for: ' + v.quote.description;
    MM.openModal('quote-modal');
  });

  document.getElementById('approve-quote-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Approving...', function () { MM.closeModal('quote-modal'); MM.showToast('Quotation approved'); });
  });
})();
