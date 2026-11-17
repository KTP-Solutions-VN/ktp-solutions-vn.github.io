(function () {
  'use strict';
  function currentData() {
    var stored = JSON.parse(localStorage.getItem('mm_acc_petty_cash') || '[]');
    return MM.ACC.PETTY_CASH.concat(stored);
  }
  function render() {
    document.getElementById('list-tbody').innerHTML = currentData().map(function (p) {
      return '<tr><td class="cell-strong">' + p.type + '</td><td>' + p.requestedBy + '</td><td class="cell-num">$' + p.amount + '</td><td><span class="badge ' + (p.status === 'Approved' ? 'badge-success' : 'badge-warning') + '">' + p.status + '</span></td></tr>';
    }).join('');
  }
  render();
  document.getElementById('add-btn').addEventListener('click', function () { document.getElementById('item-form').reset(); MM.openModal('item-modal'); });
  document.getElementById('save-btn').addEventListener('click', function () {
    var form = document.getElementById('item-form');
    if (!MM.validateForm(form)) return;
    MM.simulateSave(this, 'Submitting...', function () {
      var stored = JSON.parse(localStorage.getItem('mm_acc_petty_cash') || '[]');
      stored.push({ id: MM.uid('pc'), type: document.getElementById('f-type').value, requestedBy: 'Somchai Anuwat', amount: parseFloat(document.getElementById('f-amount').value) || 0, status: 'Pending' });
      localStorage.setItem('mm_acc_petty_cash', JSON.stringify(stored));
      MM.closeModal('item-modal');
      MM.showToast('Request submitted');
      render();
    });
  });
})();
