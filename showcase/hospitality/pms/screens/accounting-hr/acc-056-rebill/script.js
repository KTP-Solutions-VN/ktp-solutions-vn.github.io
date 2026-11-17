(function () {
  'use strict';
  var editingId = null;
  function currentData() {
    var stored = JSON.parse(localStorage.getItem('mm_acc_rebills') || '[]');
    return MM.ACC.REBILLS.concat(stored);
  }
  function render() {
    document.getElementById('list-tbody').innerHTML = currentData().map(function (r) {
      return '<tr><td class="cell-strong">' + r.description + '</td><td class="cell-num">$' + r.amount + '</td><td><span class="badge ' + (r.status === 'Billed' ? 'badge-success' : 'badge-warning') + '">' + r.status + '</span></td>' +
        '<td class="row-actions"><span class="text-muted text-sm">—</span></td></tr>';
    }).join('');
  }
  render();
  document.getElementById('add-btn').addEventListener('click', function () { document.getElementById('item-form').reset(); MM.openModal('item-modal'); });
  document.getElementById('save-btn').addEventListener('click', function () {
    var form = document.getElementById('item-form');
    if (!MM.validateForm(form)) return;
    MM.simulateSave(this, 'Saving...', function () {
      var stored = JSON.parse(localStorage.getItem('mm_acc_rebills') || '[]');
      stored.push({ id: MM.uid('rb'), description: document.getElementById('f-name').value.trim(), amount: parseFloat(document.getElementById('f-sub').value) || 0, status: 'Pending' });
      localStorage.setItem('mm_acc_rebills', JSON.stringify(stored));
      MM.closeModal('item-modal');
      MM.showToast('Rebill added');
      render();
    });
  });
})();
