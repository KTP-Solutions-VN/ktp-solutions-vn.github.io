(function () {
  'use strict';
  var params = new URLSearchParams(window.location.search);
  var investorId = params.get('id') || 'iv1';
  var investor = MM.FUND.INVESTORS.find(function (iv) { return iv.id === investorId; }) || MM.FUND.INVESTORS[0];

  document.getElementById('investor-name').textContent = investor.name;
  document.getElementById('stat-invested').textContent = '$' + investor.totalInvested.toLocaleString();
  document.getElementById('stat-balance').textContent = '$' + investor.balance.toLocaleString();
  document.getElementById('stat-rate').textContent = investor.interestRate + '%';

  var typeLabel = { invest: 'Invest', withdraw: 'Withdraw', payout: 'Payout', capitalize: 'Capitalize' };
  var typeBadge = { invest: 'badge-success', withdraw: 'badge-danger', payout: 'badge-info', capitalize: 'badge-neutral' };

  function render() {
    var stored = JSON.parse(localStorage.getItem('mm_fund_tx_' + investor.id) || '[]');
    var data = MM.FUND.TRANSACTIONS.filter(function (t) { return t.investor === investor.id; }).concat(stored);
    document.getElementById('list-tbody').innerHTML = data.map(function (t) {
      return '<tr><td class="cell-sub">' + t.date + '</td><td><span class="badge ' + typeBadge[t.type] + '">' + typeLabel[t.type] + '</span></td>' +
        '<td class="cell-num">' + (t.amount >= 0 ? '+' : '') + '$' + t.amount.toLocaleString() + '</td></tr>';
    }).join('');
  }
  render();

  document.getElementById('new-tx-btn').addEventListener('click', function () {
    document.getElementById('tx-form').reset();
    MM.openModal('tx-modal');
  });

  document.getElementById('save-tx-btn').addEventListener('click', function () {
    var form = document.getElementById('tx-form');
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-tx-btn'), 'Saving...', function () {
      var type = document.getElementById('f-type').value;
      var amount = parseFloat(document.getElementById('f-amount').value);
      var signed = (type === 'withdraw' || type === 'payout') ? -Math.abs(amount) : Math.abs(amount);
      var stored = JSON.parse(localStorage.getItem('mm_fund_tx_' + investor.id) || '[]');
      stored.push({ id: MM.uid('tx'), investor: investor.id, type: type, amount: signed, date: new Date().toISOString().slice(0, 10) });
      localStorage.setItem('mm_fund_tx_' + investor.id, JSON.stringify(stored));
      MM.closeModal('tx-modal');
      MM.showToast('Transaction recorded');
      render();
    });
  });
})();
