(function () {
  'use strict';
  var LS_KEY = 'mm_acc_statements';

  var ACCOUNTS = [
    { id: 'acc1', name: 'Operations \u2013 THB', currency: 'THB', sign: '\u0e3f' },
    { id: 'acc2', name: 'Owner Payouts \u2013 THB', currency: 'THB', sign: '\u0e3f' },
    { id: 'acc3', name: 'Petty Cash \u2013 THB', currency: 'THB', sign: '\u0e3f' },
    { id: 'acc4', name: 'Marketing \u2013 EUR', currency: 'EUR', sign: '\u20ac' }
  ];

  var MOCK_ENTRIES = [
    { id: 'st1', account_id: 'acc1', date: '2026-08-01', ref: 'Ops-THB-00001', type: 'credit', amount: 120000, created_at: '2026-08-01 09:00:00', is_opening: true, is_reconcile: true },
    { id: 'st2', account_id: 'acc1', date: '2026-08-14', ref: 'Ops-THB-00002', type: 'credit', amount: 38400, created_at: '2026-08-14 10:12:04', is_opening: false, is_reconcile: true },
    { id: 'st3', account_id: 'acc1', date: '2026-08-18', ref: 'Ops-THB-00003', type: 'debit', amount: 6200, created_at: '2026-08-18 14:40:11', is_opening: false, is_reconcile: true },
    { id: 'st4', account_id: 'acc1', date: '2026-08-22', ref: 'Ops-THB-00004', type: 'debit', amount: 2450, created_at: '2026-08-22 08:05:44', is_opening: false, is_reconcile: false },
    { id: 'st5', account_id: 'acc1', date: '2026-08-25', ref: 'Ops-THB-00005', type: 'credit', amount: 51900, created_at: '2026-08-25 11:22:31', is_opening: false, is_reconcile: false },
    { id: 'st6', account_id: 'acc1', date: '2026-08-29', ref: 'Ops-THB-00006', type: 'debit', amount: 4100, created_at: '2026-08-29 09:50:02', is_opening: false, is_reconcile: false },
    { id: 'st10', account_id: 'acc2', date: '2026-08-05', ref: 'Owner-THB-00001', type: 'credit', amount: 260000, created_at: '2026-08-05 09:00:00', is_opening: true, is_reconcile: true },
    { id: 'st11', account_id: 'acc2', date: '2026-08-20', ref: 'Owner-THB-00002', type: 'debit', amount: 88500, created_at: '2026-08-20 16:10:00', is_opening: false, is_reconcile: false },
    { id: 'st20', account_id: 'acc3', date: '2026-08-02', ref: 'Petty-THB-00001', type: 'credit', amount: 15000, created_at: '2026-08-02 09:00:00', is_opening: true, is_reconcile: true },
    { id: 'st21', account_id: 'acc3', date: '2026-08-19', ref: 'Petty-THB-00002', type: 'debit', amount: 1300, created_at: '2026-08-19 13:00:00', is_opening: false, is_reconcile: false },
    { id: 'st30', account_id: 'acc4', date: '2026-08-03', ref: 'Mktg-EUR-00001', type: 'credit', amount: 8000, created_at: '2026-08-03 09:00:00', is_opening: true, is_reconcile: false }
  ];

  function load() { try { var r = localStorage.getItem(LS_KEY); if (r) return JSON.parse(r); } catch (e) {} return MOCK_ENTRIES.slice(); }
  function save(d) { localStorage.setItem(LS_KEY, JSON.stringify(d)); }
  var entries = load();

  function money(n) { return Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function accountById(id) { return ACCOUNTS.filter(function (a) { return a.id === id; })[0]; }

  var sel = document.getElementById('rc-account');
  ACCOUNTS.forEach(function (a) {
    var o = document.createElement('option'); o.value = a.id; o.textContent = a.name; sel.appendChild(o);
  });

  var pending = [];
  var startBalance = 0;

  function refreshStartBalance() {
    var accId = sel.value;
    document.getElementById('rc-start-balance').value = '';
    if (!accId) return;
    var accEntries = entries.filter(function (e) { return e.account_id === accId; }).sort(function (a, b) { return a.id < b.id ? -1 : 1; });
    var oldest = accEntries.filter(function (e) { return !e.is_reconcile; })[0];
    var acc = accountById(accId);
    startBalance = oldest ? Number(oldest.amount) * (oldest.type === 'credit' ? 1 : -1) : 0;
    document.getElementById('rc-start-balance').value = acc.sign + money(Math.abs(startBalance)) + (oldest ? (oldest.type === 'debit' ? ' (debit)' : ' (credit)') : '');
  }
  sel.addEventListener('change', refreshStartBalance);

  function search() {
    var accId = sel.value;
    var endDate = document.getElementById('rc-ending-date').value;
    if (!accId || !endDate) {
      document.getElementById('rc-no-account').hidden = false;
      document.getElementById('rc-results').hidden = true;
      return;
    }
    var acc = accountById(accId);
    pending = entries.filter(function (e) { return e.account_id === accId && !e.is_reconcile && !e.is_opening && e.date <= endDate; });
    document.getElementById('rc-no-account').hidden = true;
    document.getElementById('rc-results').hidden = false;
    document.getElementById('rc-results-sub').textContent = acc.name + ' \u00b7 through ' + endDate;
    renderRows();
  }

  document.getElementById('rc-search-btn').addEventListener('click', search);

  function renderRows() {
    var acc = accountById(sel.value);
    document.getElementById('rc-tbody').innerHTML = pending.map(function (e) {
      return '<tr>' +
        '<td><input type="checkbox" class="rc-check" data-id="' + e.id + '" data-type="' + e.type + '" data-amount="' + e.amount + '"></td>' +
        '<td>' + e.date + '</td>' +
        '<td class="cell-strong">' + e.ref + '</td>' +
        '<td class="cell-num" style="text-align:right;" data-in="' + e.id + '">' + (e.type === 'credit' ? acc.sign + money(e.amount) : '') + '</td>' +
        '<td class="cell-num" style="text-align:right;" data-out="' + e.id + '">' + (e.type === 'debit' ? acc.sign + money(e.amount) : '') + '</td>' +
        '<td class="cell-sub">' + e.created_at + '</td>' +
        '<td style="text-align:right;"><button class="btn btn-ghost btn-sm" data-qedit="' + e.id + '">Edit amount</button></td>' +
      '</tr>';
    }).join('');
    if (!pending.length) {
      document.getElementById('rc-tbody').innerHTML = '<tr><td colspan="7" class="text-muted text-sm" style="text-align:center;padding:24px;">No unreconciled entries on or before this date.</td></tr>';
    }
    recalc();
  }

  function recalc() {
    var acc = accountById(sel.value);
    var target = parseFloat(document.getElementById('rc-ending-amount').value) || 0;
    var running = startBalance;
    var checked = document.querySelectorAll('.rc-check:checked');
    checked.forEach(function (cb) {
      var amt = parseFloat(cb.getAttribute('data-amount'));
      running += (cb.getAttribute('data-type') === 'credit' ? amt : -amt);
    });
    var diff = target - running;
    document.getElementById('rc-sum-start').textContent = acc.sign + money(startBalance);
    document.getElementById('rc-sum-target').textContent = acc.sign + money(target);
    var diffRow = document.getElementById('rc-sum-diff').parentElement;
    document.getElementById('rc-sum-diff').textContent = acc.sign + money(diff);
    var isBalanced = Math.abs(diff) < 0.005;
    diffRow.classList.toggle('is-balanced', isBalanced);
    diffRow.classList.toggle('is-off', !isBalanced);
    document.getElementById('rc-finish-btn').disabled = !isBalanced || checked.length === 0;
    var allChecked = pending.length > 0 && checked.length === pending.length;
    document.getElementById('rc-adjustment-btn').hidden = !(allChecked && !isBalanced);
    document.getElementById('adj-amount').value = acc.sign + money(diff);
  }

  document.getElementById('rc-ending-amount').addEventListener('input', recalc);
  document.addEventListener('change', function (e) { if (e.target.classList.contains('rc-check')) recalc(); });

  document.addEventListener('click', function (e) {
    var qbtn = e.target.closest('[data-qedit]');
    if (qbtn) {
      var id = qbtn.getAttribute('data-qedit');
      var rec = pending.filter(function (p) { return p.id === id; })[0];
      var cellSel = rec.type === 'credit' ? '[data-in="' + id + '"]' : '[data-out="' + id + '"]';
      var cell = document.querySelector(cellSel);
      cell.innerHTML = '<input type="number" class="rc-qedit-input" step="0.01" value="' + rec.amount + '" data-qedit-input="' + id + '">';
      cell.querySelector('input').focus();
    }
    var saveBtn = e.target.closest('[data-qedit-save]');
    return;
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.matches('[data-qedit-input]')) {
      var id = e.target.getAttribute('data-qedit-input');
      var newAmt = parseFloat(e.target.value);
      pending = pending.map(function (p) { return p.id === id ? Object.assign({}, p, { amount: newAmt }) : p; });
      entries = entries.map(function (en) { return en.id === id ? Object.assign({}, en, { amount: newAmt }) : en; });
      save(entries);
      MM.showToast('Entry amount updated');
      renderRows();
    }
  });
  document.addEventListener('focusout', function (e) {
    if (e.target.matches('[data-qedit-input]')) {
      var id = e.target.getAttribute('data-qedit-input');
      var newAmt = parseFloat(e.target.value) || 0;
      pending = pending.map(function (p) { return p.id === id ? Object.assign({}, p, { amount: newAmt }) : p; });
      entries = entries.map(function (en) { return en.id === id ? Object.assign({}, en, { amount: newAmt }) : en; });
      save(entries);
      renderRows();
    }
  });

  document.getElementById('rc-finish-btn').addEventListener('click', function () {
    var btn = this;
    var checkedIds = Array.prototype.map.call(document.querySelectorAll('.rc-check:checked'), function (cb) { return cb.getAttribute('data-id'); });
    MM.simulateSave(btn, 'Finishing...', function () {
      entries = entries.map(function (e) { return checkedIds.indexOf(e.id) > -1 ? Object.assign({}, e, { is_reconcile: true }) : e; });
      save(entries);
      MM.showToast('Reconciliation complete \u2014 ' + checkedIds.length + ' entries marked reconciled');
      search();
    });
  });

  document.getElementById('rc-adjustment-btn').addEventListener('click', function () {
    document.getElementById('adj-date').value = document.getElementById('rc-ending-date').value;
    document.getElementById('adj-description').value = '';
    MM.openModal('adjustment-modal');
  });

  document.getElementById('adj-save-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var accId = sel.value;
      var acc = accountById(accId);
      var target = parseFloat(document.getElementById('rc-ending-amount').value) || 0;
      var running = startBalance;
      pending.forEach(function (e) { running += (e.type === 'credit' ? Number(e.amount) : -Number(e.amount)); });
      var diff = target - running;
      var newEntry = {
        id: MM.uid('st'),
        account_id: accId,
        date: document.getElementById('adj-date').value,
        ref: acc.name.split(' ')[0].replace(/[^A-Za-z]/g, '') + '-' + acc.currency + '-ADJ-' + Math.floor(Math.random() * 900 + 100),
        type: diff >= 0 ? 'debit' : 'credit',
        amount: Math.abs(diff),
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        is_opening: false,
        is_reconcile: true,
        is_manual_adjustment: true
      };
      entries.push(newEntry);
      save(entries);
      MM.closeModal('adjustment-modal');
      MM.showToast('Manual adjustment added \u2014 reconciliation balanced');
      search();
    });
  });
})();
