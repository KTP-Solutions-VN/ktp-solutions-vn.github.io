(function () {
  'use strict';

  var LS_KEY = 'mm_acc_statements';

  var ACCOUNTS = [
    { id: 'acc1', name: 'Operations \u2013 SGD', currency: 'SGD', sign: 'S$' },
    { id: 'acc2', name: 'Owner Payouts \u2013 SGD', currency: 'SGD', sign: 'S$' },
    { id: 'acc3', name: 'Petty Cash \u2013 SGD', currency: 'SGD', sign: 'S$' },
    { id: 'acc4', name: 'Marketing \u2013 EUR', currency: 'EUR', sign: '\u20ac' }
  ];

  var MOCK_ENTRIES = [
    { id: 'st1', account_id: 'acc1', date: '2026-08-01', ref: 'Ops-SGD-00001', bu: 'Sentosa Collection', category: 'Manual Adjustment', description: 'Opening balance', property: '', payee: 'N/A', type: 'credit', amount: 4800, created_at: '2026-08-01 09:00:00', is_opening: true, is_reconcile: true },
    { id: 'st2', account_id: 'acc1', date: '2026-08-14', ref: 'Ops-SGD-00002', bu: 'Sentosa Collection', category: 'Booking Payout', description: 'Booking.com payout for BK-10231', property: 'Villa Sapphire Cliff', payee: 'N/A', type: 'credit', amount: 1540, created_at: '2026-08-14 10:12:04', is_opening: false, is_reconcile: true },
    { id: 'st3', account_id: 'acc1', date: '2026-08-18', ref: 'Ops-SGD-00003', bu: 'Sentosa Collection', category: 'Pool/Garden Maintenance', description: 'Monthly pool service \u2014 Coral Pool Services', property: 'Villa Coral Horizon', payee: 'N/A', type: 'debit', amount: 250, created_at: '2026-08-18 14:40:11', is_opening: false, is_reconcile: true },
    { id: 'st4', account_id: 'acc1', date: '2026-08-22', ref: 'Ops-SGD-00004', bu: 'Byron Bay Retreats', category: 'Staff Expenses', description: 'Housekeeping supplies reimbursement', property: '', payee: 'Karen Seah', type: 'debit', amount: 100, created_at: '2026-08-22 08:05:44', is_opening: false, is_reconcile: false },
    { id: 'st5', account_id: 'acc1', date: '2026-08-25', ref: 'Ops-SGD-00005', bu: 'Byron Bay Retreats', category: 'Booking Payout', description: 'Booking.com payout for BK-10233', property: 'Villa Emerald Bay', payee: 'N/A', type: 'credit', amount: 2080, created_at: '2026-08-25 11:22:31', is_opening: false, is_reconcile: false },
    { id: 'st6', account_id: 'acc1', date: '2026-08-29', ref: 'Ops-SGD-00006', bu: 'Noosa Estates', category: 'Utilities', description: 'Electricity \u2014 Villa Lotus Terrace', property: 'Villa Lotus Terrace', payee: 'N/A', type: 'debit', amount: 165, created_at: '2026-08-29 09:50:02', is_opening: false, is_reconcile: false },

    { id: 'st10', account_id: 'acc2', date: '2026-08-05', ref: 'Owner-SGD-00001', bu: 'Byron Bay Retreats', category: 'Manual Adjustment', description: 'Opening balance', property: '', payee: 'N/A', type: 'credit', amount: 10400, created_at: '2026-08-05 09:00:00', is_opening: true, is_reconcile: true },
    { id: 'st11', account_id: 'acc2', date: '2026-08-20', ref: 'Owner-SGD-00002', bu: 'Byron Bay Retreats', category: 'Owner Payout', description: 'Monthly payout \u2014 Isabelle Moreau', property: 'Villa Emerald Bay', payee: 'N/A', type: 'debit', amount: 3540, created_at: '2026-08-20 16:10:00', is_opening: false, is_reconcile: false },

    { id: 'st20', account_id: 'acc3', date: '2026-08-02', ref: 'Petty-SGD-00001', bu: 'Sentosa Collection', category: 'Manual Adjustment', description: 'Opening balance', property: '', payee: 'N/A', type: 'credit', amount: 600, created_at: '2026-08-02 09:00:00', is_opening: true, is_reconcile: true },
    { id: 'st21', account_id: 'acc3', date: '2026-08-19', ref: 'Petty-SGD-00002', bu: 'Sentosa Collection', category: 'Staff Expenses', description: 'Fuel reimbursement \u2014 field team', property: '', payee: 'Daniel Tan', type: 'debit', amount: 52, created_at: '2026-08-19 13:00:00', is_opening: false, is_reconcile: false },

    { id: 'st30', account_id: 'acc4', date: '2026-08-03', ref: 'Mktg-EUR-00001', bu: 'Noosa Estates', category: 'Manual Adjustment', description: 'Opening balance', property: '', payee: 'N/A', type: 'credit', amount: 8000, created_at: '2026-08-03 09:00:00', is_opening: true, is_reconcile: false }
  ];

  function load() {
    try { var raw = localStorage.getItem(LS_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
    return MOCK_ENTRIES.slice();
  }
  function save(data) { localStorage.setItem(LS_KEY, JSON.stringify(data)); }

  var entries = load();
  var currentAccount = ACCOUNTS[0].id;
  var sortNewestFirst = true;

  function fmtDate(s) {
    var d = new Date(s + 'T00:00:00');
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + String(d.getFullYear()).slice(2);
  }
  function money(n) { return Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function accountById(id) { return ACCOUNTS.filter(function (a) { return a.id === id; })[0]; }

  function renderTabs() {
    var wrap = document.getElementById('stmt-account-tabs');
    wrap.innerHTML = ACCOUNTS.map(function (a) {
      return '<button type="button" class="stmt-account-tab' + (a.id === currentAccount ? ' active' : '') + '" data-acc="' + a.id + '">' + a.name + '</button>';
    }).join('');
  }

  function nextRef(accId) {
    var acc = accountById(accId);
    var prefix = acc.name.split(' ')[0].replace(/[^A-Za-z]/g, '') + '-' + acc.currency;
    var accEntries = entries.filter(function (e) { return e.account_id === accId; });
    var max = 0;
    accEntries.forEach(function (e) {
      var m = /(\d+)$/.exec(e.ref);
      if (m) max = Math.max(max, parseInt(m[1], 10));
    });
    return prefix + '-' + String(max + 1).padStart(5, '0');
  }

  function render() {
    var acc = accountById(currentAccount);
    document.getElementById('stmt-modal-sub').textContent = acc.name;
    var q = (document.getElementById('stmt-search').value || '').toLowerCase();
    var rows = entries.filter(function (e) { return e.account_id === currentAccount; });
    rows.sort(function (a, b) { return sortNewestFirst ? (a.date < b.date ? 1 : -1) : (a.date > b.date ? 1 : -1); });

    // Running balance computed in chronological (ascending) order regardless of display sort
    var chrono = entries.filter(function (e) { return e.account_id === currentAccount; }).slice()
      .sort(function (a, b) { return a.date === b.date ? (a.created_at < b.created_at ? -1 : 1) : (a.date < b.date ? -1 : 1); });
    var running = 0;
    var balanceMap = {};
    chrono.forEach(function (e) {
      running += (e.type === 'credit' ? Number(e.amount) : -Number(e.amount));
      balanceMap[e.id] = running;
    });

    var filtered = rows.filter(function (e) {
      if (!q) return true;
      return (e.ref + ' ' + e.description + ' ' + e.property + ' ' + e.bu + ' ' + e.category).toLowerCase().indexOf(q) > -1;
    });

    document.getElementById('stmt-tbody').innerHTML = filtered.map(function (e) {
      var actions = '<div class="row-actions">';
      if (!e.is_opening) {
        actions += '<button class="btn btn-ghost btn-sm" data-edit-stmt="' + e.id + '">Edit</button>' +
          '<button class="btn btn-ghost btn-sm" data-delete-stmt="' + e.id + '">Delete</button>';
      } else {
        actions += '<span class="text-xs text-muted">Opening</span>';
      }
      actions += '</div>';
      return '<tr>' +
        '<td>' + fmtDate(e.date) + '</td>' +
        '<td class="cell-strong">' + e.ref + (e.is_reconcile ? ' <span class="badge badge-success">Reconciled</span>' : '') + '</td>' +
        '<td>' + e.bu + '</td>' +
        '<td>' + (e.category || 'Unassigned') + '</td>' +
        '<td>' + e.description + '</td>' +
        '<td>' + (e.property || 'Unassigned') + '</td>' +
        '<td>' + e.payee + '</td>' +
        '<td class="cell-num" style="text-align:right;">' + (e.type === 'credit' ? '<span class="amount-in">' + acc.sign + money(e.amount) + '</span>' : '') + '</td>' +
        '<td class="cell-num" style="text-align:right;">' + (e.type === 'debit' ? '<span class="amount-out">' + acc.sign + money(e.amount) + '</span>' : '') + '</td>' +
        '<td class="cell-num balance-cell" style="text-align:right;">' + acc.sign + money(balanceMap[e.id]) + '</td>' +
        '<td class="cell-sub">' + e.created_at.slice(0, 10) + '</td>' +
        '<td>' + actions + '</td>' +
      '</tr>';
    }).join('');

    document.getElementById('stmt-empty').hidden = filtered.length > 0;
    document.getElementById('stmt-result-count').textContent = filtered.length + ' of ' + rows.length + ' entries \u00b7 balance ' + acc.sign + money(running);
  }

  renderTabs();
  render();

  document.getElementById('stmt-account-tabs').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-acc]');
    if (!btn) return;
    currentAccount = btn.getAttribute('data-acc');
    renderTabs();
    render();
  });

  document.getElementById('stmt-search').addEventListener('input', render);
  document.getElementById('stmt-clear-btn').addEventListener('click', function () { document.getElementById('stmt-search').value = ''; render(); });

  document.getElementById('stmt-sort-chip').addEventListener('click', function () {
    sortNewestFirst = !sortNewestFirst;
    document.getElementById('stmt-sort-label').textContent = sortNewestFirst ? 'Newest first' : 'Oldest first';
    render();
  });

  var form = document.getElementById('stmt-form');
  MM.bindFormValidation(form);
  var editingId = null;

  function resetForm() {
    ['f-date','f-bu','f-category','f-description','f-property','f-type','f-amount'].forEach(function (id) {
      document.getElementById(id).value = '';
    });
    document.querySelectorAll('#stmt-modal .form-group').forEach(function (g) { g.classList.remove('has-error'); });
    document.querySelectorAll('#stmt-form input, #stmt-form select, #stmt-form textarea').forEach(function (el) { el.disabled = false; });
    document.getElementById('stmt-locked-banner').hidden = true;
  }

  document.getElementById('add-stmt-btn').addEventListener('click', function () {
    editingId = null;
    resetForm();
    document.getElementById('stmt-modal-title').textContent = 'Add Statement Entry';
    document.getElementById('f-ref').value = nextRef(currentAccount);
    document.getElementById('stmt-save-btn').textContent = 'Save Entry';
    MM.openModal('stmt-modal');
  });

  document.addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit-stmt]');
    if (editBtn) {
      var rec = entries.filter(function (x) { return x.id === editBtn.getAttribute('data-edit-stmt'); })[0];
      editingId = rec.id;
      resetForm();
      document.getElementById('f-date').value = rec.date;
      document.getElementById('f-ref').value = rec.ref;
      document.getElementById('f-bu').value = rec.bu;
      document.getElementById('f-category').value = rec.category;
      document.getElementById('f-description').value = rec.description;
      document.getElementById('f-property').value = rec.property;
      document.getElementById('f-type').value = rec.type;
      document.getElementById('f-amount').value = rec.amount;
      document.getElementById('stmt-modal-title').textContent = 'Edit Statement Entry';
      document.getElementById('stmt-save-btn').textContent = 'Update Entry';
      if (rec.is_reconcile) {
        document.getElementById('stmt-locked-banner').hidden = false;
        document.querySelectorAll('#stmt-form input, #stmt-form select, #stmt-form textarea').forEach(function (el) { el.disabled = true; });
        document.getElementById('stmt-save-btn').disabled = true;
      } else {
        document.getElementById('stmt-save-btn').disabled = false;
      }
      MM.openModal('stmt-modal');
    }
    var delBtn = e.target.closest('[data-delete-stmt]');
    if (delBtn) {
      editingId = delBtn.getAttribute('data-delete-stmt');
      var recD = entries.filter(function (x) { return x.id === editingId; })[0];
      document.getElementById('del-stmt-ref').textContent = recD.ref;
      MM.openModal('delete-stmt-modal');
    }
  });

  document.getElementById('stmt-save-btn').addEventListener('click', function () {
    if (this.disabled) return;
    if (!MM.validateForm(form)) return;
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var data = {
        account_id: currentAccount,
        date: document.getElementById('f-date').value,
        ref: document.getElementById('f-ref').value,
        bu: document.getElementById('f-bu').value,
        category: document.getElementById('f-category').value,
        description: document.getElementById('f-description').value.trim(),
        property: document.getElementById('f-property').value,
        payee: 'N/A',
        type: document.getElementById('f-type').value,
        amount: parseFloat(document.getElementById('f-amount').value)
      };
      if (editingId) {
        entries = entries.map(function (e) { return e.id === editingId ? Object.assign({}, e, data) : e; });
      } else {
        data.id = MM.uid('st');
        data.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        data.is_opening = false;
        data.is_reconcile = false;
        entries.push(data);
      }
      save(entries);
      render();
      MM.closeModal('stmt-modal');
      MM.showToast((editingId ? 'Updated' : 'Added') + ' statement entry successfully');
    });
  });

  document.getElementById('confirm-delete-stmt-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Deleting...', function () {
      entries = entries.filter(function (e) { return e.id !== editingId; });
      save(entries);
      render();
      MM.closeModal('delete-stmt-modal');
      MM.showToast('Statement entry deleted', { danger: true });
    });
  });
})();
