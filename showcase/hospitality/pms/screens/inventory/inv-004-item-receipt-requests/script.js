(function () {
  'use strict';
  var pendingId = null;
  var statusMap = { pending: 'badge-warning', approved: 'badge-success' };

  function currentData() {
    var stored = JSON.parse(localStorage.getItem('mm_inv_receipt_status') || '{}');
    return MM.INV.REQUESTS_RECEIPT.map(function (r) { return stored[r.id] ? Object.assign({}, r, stored[r.id]) : r; });
  }

  function render() {
    document.getElementById('list-tbody').innerHTML = currentData().map(function (r) {
      return '<tr><td class="cell-strong">' + r.item + '</td><td class="cell-num">' + r.qty + '</td><td>' + r.requestedBy + '</td><td class="cell-sub">' + r.property + '</td>' +
        '<td><span class="badge ' + statusMap[r.status] + '">' + r.status + '</span></td>' +
        '<td class="row-actions">' + (r.status === 'pending' ? '<button class="btn btn-primary btn-sm" data-approve="' + r.id + '">Approve</button>' : '<span class="text-muted text-sm">Done</span>') + '</td></tr>';
    }).join('') || '<tr><td colspan="6" class="text-muted text-sm">No pending receipt requests.</td></tr>';
  }
  render();

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-approve]');
    if (!btn) return;
    pendingId = btn.dataset.approve;
    var r = currentData().find(function (d) { return d.id === pendingId; });
    document.getElementById('approve-item-name').textContent = r.item + ' — ' + r.qty + ' units';
    MM.openModal('approve-modal');
  });

  document.getElementById('confirm-approve-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Approving...', function () {
      var stored = JSON.parse(localStorage.getItem('mm_inv_receipt_status') || '{}');
      stored[pendingId] = { status: 'approved' };
      localStorage.setItem('mm_inv_receipt_status', JSON.stringify(stored));
      MM.closeModal('approve-modal');
      MM.showToast('Receipt approved and added to inventory');
      render();
    });
  });
})();
