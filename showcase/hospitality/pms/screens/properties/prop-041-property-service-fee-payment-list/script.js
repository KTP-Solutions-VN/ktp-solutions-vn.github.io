(function () {
  'use strict';
  var RECORD_EDITS_KEY = 'mm_prop_service_payments_edits';
  var BANK_KEY = 'mm_prop_bank_accounts';
  var editingRecordId = null;

  var params = new URLSearchParams(window.location.search);
  var p = MM.MOCK_PROPERTIES.find(function (d) { return d.id === params.get('id'); }) || MM.MOCK_PROPERTIES[0];
  document.getElementById('prop-sub').textContent = p.name;
  document.getElementById('bank-prop-sub').textContent = p.name;

  var BASE_RECORDS = [
    { id: 'svc1', service: 'Electricity', period: 'Aug 2026', amount: 320, payer: 'Owner' },
    { id: 'svc2', service: 'Internet', period: 'Aug 2026', amount: 45, payer: 'Azura Stays' }
  ];

  function currentRecords() {
    var edits = JSON.parse(localStorage.getItem(RECORD_EDITS_KEY) || '{}');
    return BASE_RECORDS.map(function (r) { return edits[r.id] ? Object.assign({}, r, edits[r.id]) : r; });
  }

  function render() {
    document.getElementById('list-tbody').innerHTML = currentRecords().map(function (r) {
      return '<tr><td class="cell-strong">' + r.service + '</td><td class="cell-sub">' + r.period + '</td><td class="cell-num">$' + r.amount + '</td><td>' + r.payer + '</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="' + r.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button></td></tr>';
    }).join('');
  }
  render();

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-edit]');
    if (!btn) return;
    var rec = currentRecords().find(function (r) { return r.id === btn.dataset.edit; });
    editingRecordId = rec.id;
    document.getElementById('f-service').value = rec.service;
    document.getElementById('f-amount').value = rec.amount;
    document.getElementById('f-payer').value = rec.payer;
    document.getElementById('f-period').value = '';
    MM.openModal('record-drawer');
  });

  var recordForm = document.getElementById('record-form');
  MM.bindFormValidation(recordForm);
  recordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(recordForm)) return;
    MM.simulateSave(document.getElementById('record-save-btn'), 'Saving...', function () {
      var edits = JSON.parse(localStorage.getItem(RECORD_EDITS_KEY) || '{}');
      edits[editingRecordId] = {
        service: document.getElementById('f-service').value,
        amount: Number(document.getElementById('f-amount').value),
        payer: document.getElementById('f-payer').value
      };
      localStorage.setItem(RECORD_EDITS_KEY, JSON.stringify(edits));
      MM.showToast('Payment record updated');
      MM.closeModal('record-drawer');
      render();
    });
  });

  // Bank account (per-property)
  document.getElementById('bank-account-btn').addEventListener('click', function () {
    var accounts = JSON.parse(localStorage.getItem(BANK_KEY) || '{}');
    var acc = accounts[p.id] || {};
    document.getElementById('f-account-name').value = acc.accountName || '';
    document.getElementById('f-account-number').value = acc.accountNumber || '';
    document.getElementById('f-bank').value = acc.bank || '';
    MM.openModal('bank-account-drawer');
  });

  var accountForm = document.getElementById('account-form');
  MM.bindFormValidation(accountForm);
  accountForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(accountForm)) return;
    MM.simulateSave(document.getElementById('account-save-btn'), 'Saving...', function () {
      var accounts = JSON.parse(localStorage.getItem(BANK_KEY) || '{}');
      accounts[p.id] = {
        accountName: document.getElementById('f-account-name').value.trim(),
        accountNumber: document.getElementById('f-account-number').value.trim(),
        bank: document.getElementById('f-bank').value
      };
      localStorage.setItem(BANK_KEY, JSON.stringify(accounts));
      MM.showToast('Bank account saved');
      MM.closeModal('bank-account-drawer');
    });
  });
})();
