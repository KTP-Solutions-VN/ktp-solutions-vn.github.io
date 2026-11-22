(function () {
  'use strict';
  var BASE_DATA = [
    { id: 'pd1', method: 'Bank Transfer', bank: 'DBS Bank', account: 'Richard Halstead' }
  ];
  var editingId = null;

  function render() {
    var stored = JSON.parse(localStorage.getItem('mm_own_payment_details') || '[]');
    var data = BASE_DATA.concat(stored);
    document.getElementById('list-tbody').innerHTML = data.map(function (p) {
      return '<tr><td>' + p.method + '</td><td class="cell-strong">' + p.bank + '</td><td>' + p.account + '</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="' + p.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button></td></tr>';
    }).join('');
  }
  render();

  document.getElementById('add-btn').addEventListener('click', function () {
    editingId = null;
    document.getElementById('payment-form').reset();
    MM.openModal('payment-modal');
  });

  document.getElementById('save-btn').addEventListener('click', function () {
    var form = document.getElementById('payment-form');
    if (!MM.validateForm(form)) return;
    MM.simulateSave(this, 'Saving...', function () {
      var stored = JSON.parse(localStorage.getItem('mm_own_payment_details') || '[]');
      stored.push({ id: MM.uid('pd'), method: 'Bank Transfer', bank: document.getElementById('f-bank').value.trim(), account: document.getElementById('f-account').value.trim() });
      localStorage.setItem('mm_own_payment_details', JSON.stringify(stored));
      MM.closeModal('payment-modal');
      MM.showToast('Payment detail saved');
      render();
    });
  });
})();
