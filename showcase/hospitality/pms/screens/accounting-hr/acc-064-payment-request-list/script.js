(function () {
  'use strict';
  function currentData() {
    var stored = JSON.parse(localStorage.getItem('mm_acc_payment_requests') || '[]');
    return MM.ACC.PAYMENT_REQUESTS.concat(stored);
  }
  function render() {
    document.getElementById('list-tbody').innerHTML = currentData().map(function (r) {
      return '<tr><td class="cell-strong">' + r.description + '</td><td>' + r.requestedBy + '</td><td class="cell-num">$' + r.amount + '</td><td><span class="badge ' + (r.status === 'Approved' ? 'badge-success' : 'badge-warning') + '">' + r.status + '</span></td>' +
        '<td class="row-actions">' + (r.status === 'Pending' ? '<button class="btn btn-primary btn-sm" data-approve="' + r.id + '">Approve</button>' : '<span class="text-muted text-sm">Done</span>') + '</td></tr>';
    }).join('');
  }
  render();
  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-approve]');
    if (!btn) return;
    MM.simulateSave(btn, 'Approving...', function () { MM.showToast('Payment request approved'); render(); });
  });
  document.getElementById('add-btn').addEventListener('click', function () { document.getElementById('item-form').reset(); MM.openModal('item-modal'); });
  document.getElementById('save-btn').addEventListener('click', function () {
    var form = document.getElementById('item-form');
    if (!MM.validateForm(form)) return;
    MM.simulateSave(this, 'Submitting...', function () {
      var stored = JSON.parse(localStorage.getItem('mm_acc_payment_requests') || '[]');
      stored.push({ id: MM.uid('preq'), description: document.getElementById('f-desc').value.trim(), requestedBy: 'Daniel Tan', amount: parseFloat(document.getElementById('f-amount').value) || 0, status: 'Pending' });
      localStorage.setItem('mm_acc_payment_requests', JSON.stringify(stored));
      MM.closeModal('item-modal');
      MM.showToast('Payment request submitted');
      render();
    });
  });
})();
