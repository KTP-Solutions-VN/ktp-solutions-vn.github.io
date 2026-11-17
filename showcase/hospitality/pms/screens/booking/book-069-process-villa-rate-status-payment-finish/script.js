document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var buId = params.get('bu');
  var villaId = params.get('villa');
  var action = (params.get('action') || 'finish').toLowerCase();

  var villa = BOOK.villaById(villaId);
  var status = villaId ? BOOK.getEffectiveRateStatus(villaId) : null;

  var titleEl = document.getElementById('page-title');
  var subEl = document.getElementById('page-sub');
  var textEl = document.getElementById('confirm-text');
  var metaEl = document.getElementById('confirm-meta');
  var iconEl = document.getElementById('confirm-icon');
  var btn = document.getElementById('btn-confirm');

  if (!villa || !status || (action !== 'payment' && action !== 'finish') || status.type !== 'Monthly') {
    textEl.textContent = 'This villa does not have an active Monthly rate record to process. Redirecting is disabled in this prototype — use the button below to go back.';
    metaEl.innerHTML = '';
    btn.disabled = true;
    btn.textContent = 'Unavailable';
    MM.showToast('Invalid or missing parameters — no active Monthly record found.', { danger: true });
    return;
  }

  if (action === 'payment') {
    titleEl.textContent = 'Confirm Rent Payment';
    subEl.textContent = 'Mark this month’s rent as collected and roll the due date forward.';
    textEl.innerHTML = '<strong>' + villa.name + '</strong>, rent of <strong>' + BOOK.fmtMoney(status.monthlyRent) + '</strong> due on <strong>' + BOOK.fmtDate(status.nextDueDate) + '</strong>.';
    metaEl.innerHTML =
      '<span class="badge badge-info">Monthly</span>' +
      '<span class="badge badge-neutral">' + villa.bu + '</span>';
    btn.textContent = 'Paid';
    btn.addEventListener('click', function () {
      btn.disabled = true;
      var original = btn.textContent;
      btn.textContent = 'Processing…';
      setTimeout(function () {
        var next = new Date(status.nextDueDate + 'T00:00:00');
        next.setMonth(next.getMonth() + 1);
        var nextDueDate = next.toISOString().slice(0, 10);
        BOOK.saveRateStatusOverride(villaId, { nextDueDate: nextDueDate });
        BOOK.appendRateStatusLog(villaId, {
          since: new Date().toISOString().slice(0, 10), till: null, status: 'Monthly',
          note: 'Rent payment recorded — ' + BOOK.fmtMoney(status.monthlyRent) + '. Next due date rolled to ' + BOOK.fmtDate(nextDueDate) + '.'
        });
        MM.showToast('Payment recorded for ' + villa.name + '. Next due date: ' + BOOK.fmtDate(nextDueDate) + '.');
        setTimeout(function () { window.location.href = '../book-067-villa-rate-update-status/index.html'; }, 700);
      }, 500);
    });
  } else {
    titleEl.textContent = 'Confirm Contract Termination';
    subEl.textContent = 'Move this villa back to a Daily rate.';
    iconEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18M10.5 6.5A9 9 0 0 1 20 12M6.5 10.5A9 9 0 0 0 6 12a9 9 0 0 0 9 9 8.9 8.9 0 0 0 3-.5"/></svg>';
    textEl.innerHTML = '<strong>' + villa.name + '</strong> goes back to daily rate. There is no outstanding monthly Rent due.';
    metaEl.innerHTML = '<span class="badge badge-warning">Ends Monthly agreement</span><span class="badge badge-neutral">' + villa.bu + '</span>';
    btn.textContent = 'Confirm';
    btn.addEventListener('click', function () {
      btn.disabled = true;
      btn.textContent = 'Processing…';
      setTimeout(function () {
        BOOK.saveRateStatusOverride(villaId, { type: 'Daily', monthlyRent: null, nextDueDate: null });
        BOOK.appendRateStatusLog(villaId, {
          since: new Date().toISOString().slice(0, 10), till: null, status: 'Daily',
          note: 'Monthly agreement terminated — reverted to daily rate.'
        });
        MM.showToast(villa.name + ' reverted to Daily rate.');
        setTimeout(function () { window.location.href = '../book-067-villa-rate-update-status/index.html'; }, 700);
      }, 500);
    });
  }
});
