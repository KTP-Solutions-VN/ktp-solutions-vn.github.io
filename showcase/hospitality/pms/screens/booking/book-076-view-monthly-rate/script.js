document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var villaId = params.get('villa');
  var villa = villaId ? BOOK.villaById(villaId) : null;
  var status = villaId ? BOOK.getEffectiveRateStatus(villaId) : null;

  if (!villa || !status || status.type !== 'Monthly') {
    document.getElementById('content-wrap').hidden = true;
    document.getElementById('empty-state').hidden = false;
    return;
  }

  document.getElementById('page-sub').textContent = villa.name + ' — ' + villa.bu;

  var history = BOOK.getEffectiveHistory(villaId);
  var endedEntry = null;
  history.forEach(function (h, i) {
    if (h.status === 'Daily' && i > 0) endedEntry = h;
  });
  var endDate = endedEntry ? BOOK.fmtDate(endedEntry.since) : '-----';
  var depositText = status.deposit ? BOOK.fmtMoney(status.deposit) + ' deposited' : 'not yet deposited';

  document.getElementById('overview-paragraph').innerHTML =
    '<strong>' + villa.name + '</strong> has been on a Monthly rental agreement since <strong>' + BOOK.fmtDate(status.startingDate) + '</strong>, ending on <strong>' + endDate + '</strong>. ' +
    'Deposit: <strong>' + depositText + '</strong>. Monthly rent is <strong>' + BOOK.fmtMoney(status.monthlyRent) + '</strong>, with the next payment due on <strong>' + BOOK.fmtDate(status.nextDueDate) + '</strong>. ' +
    'The expected contract termination date is <strong>' + BOOK.fmtDate(status.expectedTerminationDate) + '</strong>.';

  var payments = BOOK.RATE_PAYMENTS[villaId] || [];
  var tbody = document.getElementById('payment-rows');
  if (!payments.length) {
    tbody.innerHTML = '<tr><td colspan="2"><div class="empty-state"><h3>No payments recorded yet</h3></div></td></tr>';
  } else {
    tbody.innerHTML = payments.slice().reverse().map(function (p) {
      var paidOn = p.paymentDate ? BOOK.fmtDate(p.paymentDate) : ('Due on: ' + BOOK.fmtDate(p.dueOn));
      return '<tr><td class="cell-strong">' + p.rentalMonth + '</td><td>' + (p.paymentDate ? paidOn : '<span class="badge badge-warning">' + paidOn + '</span>') + '</td></tr>';
    }).join('');
  }
});
