(function () {
  'use strict';
  var editingMethodId = null, editingAccountId = null;

  function methodsData() {
    var stored = JSON.parse(localStorage.getItem('mm_bu_payment_methods') || '[]');
    var hidden = JSON.parse(localStorage.getItem('mm_bu_payment_methods_hidden') || '[]');
    return MM.BU.PAYMENT_METHODS.filter(function (m) { return hidden.indexOf(m.id) === -1; }).concat(stored);
  }
  function renderMethods() {
    var data = methodsData();
    document.getElementById('methods-tbody').innerHTML = data.map(function (m) {
      return '<tr><td class="cell-strong">' + m.name + '</td><td class="cell-sub">' + m.type + '</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit-method="' + m.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button></td></tr>';
    }).join('');
  }
  renderMethods();

  function accountsData() {
    var stored = JSON.parse(localStorage.getItem('mm_bu_accounts') || '[]');
    var hidden = JSON.parse(localStorage.getItem('mm_bu_accounts_hidden') || '[]');
    var edits = JSON.parse(localStorage.getItem('mm_bu_accounts_edits') || '{}');
    return MM.BU.ACCOUNTS.filter(function (a) { return hidden.indexOf(a.id) === -1; }).concat(stored)
      .map(function (a) { return edits[a.id] ? Object.assign({}, a, edits[a.id]) : a; });
  }
  function renderAccounts() {
    var data = accountsData();
    document.getElementById('accounts-tbody').innerHTML = data.map(function (a) {
      return '<tr><td class="cell-strong">' + a.bank + '</td><td>' + a.accountName + '</td><td class="cell-sub">' + a.accountNumber + '</td><td>' + a.currency + '</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit-account="' + a.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete-account="' + a.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('');
  }
  renderAccounts();

  function openAccountDrawer(account) {
    editingAccountId = account ? account.id : null;
    document.getElementById('account-drawer-title').textContent = account ? 'Edit Account' : 'Add Account';
    document.getElementById('save-account-btn').textContent = account ? 'Save Changes' : 'Create Account';
    document.getElementById('account-form').reset();
    if (account) {
      document.getElementById('f-bank').value = account.bank;
      document.getElementById('f-account-name').value = account.accountName;
      document.getElementById('f-account-number').value = account.accountNumber;
      document.getElementById('f-currency').value = account.currency;
    }
    MM.openModal('account-drawer');
  }

  document.getElementById('add-account-btn').addEventListener('click', function () { openAccountDrawer(null); });

  document.getElementById('accounts-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit-account]');
    if (editBtn) {
      var a = accountsData().find(function (d) { return d.id === editBtn.dataset.editAccount; });
      openAccountDrawer(a);
    }
  });

  var accountForm = document.getElementById('account-form');
  MM.bindFormValidation(accountForm);
  accountForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(accountForm)) return;
    MM.simulateSave(document.getElementById('save-account-btn'), editingAccountId ? 'Saving...' : 'Creating...', function () {
      var bank = document.getElementById('f-bank').value;
      var accountName = document.getElementById('f-account-name').value.trim();
      var accountNumber = document.getElementById('f-account-number').value.trim();
      var currency = document.getElementById('f-currency').value;
      var storedAccounts = JSON.parse(localStorage.getItem('mm_bu_accounts') || '[]');
      if (editingAccountId) {
        var editsKey = 'mm_bu_accounts_edits';
        var idx = storedAccounts.findIndex(function (d) { return d.id === editingAccountId; });
        if (idx > -1) {
          storedAccounts[idx] = Object.assign({}, storedAccounts[idx], { bank: bank, accountName: accountName, accountNumber: accountNumber, currency: currency });
          localStorage.setItem('mm_bu_accounts', JSON.stringify(storedAccounts));
        } else {
          var edits = JSON.parse(localStorage.getItem(editsKey) || '{}');
          edits[editingAccountId] = { bank: bank, accountName: accountName, accountNumber: accountNumber, currency: currency };
          localStorage.setItem(editsKey, JSON.stringify(edits));
        }
        MM.showToast('Account updated');
      } else {
        storedAccounts.push({ id: MM.uid('ac'), bank: bank, accountName: accountName, accountNumber: accountNumber, currency: currency });
        localStorage.setItem('mm_bu_accounts', JSON.stringify(storedAccounts));
        MM.showToast('Account created');
      }
      MM.closeModal('account-drawer');
      renderAccounts();
    });
  });

  document.getElementById('add-method-btn').addEventListener('click', function () {
    editingMethodId = null;
    document.getElementById('method-modal-title').textContent = 'Add Payment Method';
    document.getElementById('method-form').reset();
    MM.openModal('method-modal');
  });

  document.getElementById('methods-tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-edit-method]');
    if (!btn) return;
    var m = methodsData().find(function (d) { return d.id === btn.dataset.editMethod; });
    editingMethodId = m.id;
    document.getElementById('method-modal-title').textContent = 'Edit Payment Method';
    document.getElementById('f-name').value = m.name;
    document.getElementById('f-type').value = m.type;
    MM.openModal('method-modal');
  });

  document.getElementById('save-method-btn').addEventListener('click', function () {
    var form = document.getElementById('method-form');
    if (!MM.validateForm(form)) return;
    MM.simulateSave(this, 'Saving...', function () {
      var stored = JSON.parse(localStorage.getItem('mm_bu_payment_methods') || '[]');
      var name = document.getElementById('f-name').value.trim(), type = document.getElementById('f-type').value;
      if (editingMethodId) {
        var idx = stored.findIndex(function (d) { return d.id === editingMethodId; });
        if (idx > -1) { stored[idx].name = name; stored[idx].type = type; } else stored.push({ id: editingMethodId, name: name, type: type });
      } else { stored.push({ id: MM.uid('pm'), name: name, type: type }); }
      localStorage.setItem('mm_bu_payment_methods', JSON.stringify(stored));
      MM.closeModal('method-modal');
      MM.showToast('Payment method saved');
      renderMethods();
    });
  });

  document.getElementById('accounts-tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-delete-account]');
    if (!btn) return;
    editingAccountId = btn.dataset.deleteAccount;
    document.getElementById('del-account-name').textContent = accountsData().find(function (d) { return d.id === editingAccountId; }).accountName;
    MM.openModal('delete-account-modal');
  });
  document.getElementById('confirm-delete-account-btn').addEventListener('click', function () {
    var stored = JSON.parse(localStorage.getItem('mm_bu_accounts') || '[]').filter(function (d) { return d.id !== editingAccountId; });
    localStorage.setItem('mm_bu_accounts', JSON.stringify(stored));
    var hidden = JSON.parse(localStorage.getItem('mm_bu_accounts_hidden') || '[]');
    if (MM.BU.ACCOUNTS.some(function (d) { return d.id === editingAccountId; })) { hidden.push(editingAccountId); localStorage.setItem('mm_bu_accounts_hidden', JSON.stringify(hidden)); }
    MM.closeModal('delete-account-modal');
    MM.showToast('Account deleted', { danger: true });
    renderAccounts();
  });
})();
