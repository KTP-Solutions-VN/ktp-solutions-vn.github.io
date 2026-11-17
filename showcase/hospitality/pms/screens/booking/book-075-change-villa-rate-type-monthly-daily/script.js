document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var buId = params.get('bu');
  var villaId = params.get('villa');
  var action = (params.get('action') || '').toLowerCase();
  var villa = villaId ? BOOK.villaById(villaId) : null;

  if (!villa || (action !== 'monthly' && action !== 'daily')) {
    document.getElementById('invalid-state').hidden = false;
    MM.showToast('Missing or invalid business_unit_id / villa_id / action.', { danger: true });
    return;
  }

  document.getElementById('page-title').textContent = action === 'monthly' ? 'Switch to Monthly Rate' : 'Switch to Daily Rate';
  document.getElementById('page-sub').textContent = villa.name + ' — ' + villa.bu;

  if (action === 'monthly') {
    var form = document.getElementById('monthly-form');
    form.hidden = false;
    MM.bindFormValidation && MM.bindFormValidation(form);

    var daySel = document.getElementById('m-day');
    for (var d = 1; d <= 31; d++) { var o = document.createElement('option'); o.value = d; o.textContent = d; daySel.appendChild(o); }

    document.getElementById('m-due-type').addEventListener('change', function (e) {
      document.getElementById('m-day-group').hidden = e.target.value !== 'day_of_month';
    });

    document.getElementById('btn-confirm-monthly').addEventListener('click', function () {
      if (MM.validateForm && !MM.validateForm(form)) return;
      var btn = this;
      var original = btn.textContent;
      btn.disabled = true; btn.textContent = 'Saving…';
      MM.simulateSave(function () {
        btn.disabled = false; btn.textContent = original;
        var dueType = document.getElementById('m-due-type').value;
        var fields = {
          type: 'Monthly',
          monthlyRent: Number(document.getElementById('m-rent').value),
          deposit: Number(document.getElementById('m-deposit').value),
          rentDueDateType: dueType,
          dayOfMonth: dueType === 'day_of_month' ? Number(document.getElementById('m-day').value) : null,
          expectedTerminationDate: document.getElementById('m-termination').value,
          nextDueDate: document.getElementById('m-start').value
        };
        BOOK.saveRateStatusOverride(villaId, fields);
        BOOK.appendRateStatusLog(villaId, { since: document.getElementById('m-start').value, till: null, status: 'Monthly', note: 'Switched to Monthly — rent ' + BOOK.fmtMoney(fields.monthlyRent) + '/month.' });
        MM.showToast(villa.name + ' switched to Monthly rate.');
        setTimeout(function () { window.location.href = '../book-067-villa-rate-update-status/index.html'; }, 700);
      });
    });
  } else {
    document.getElementById('daily-confirm').hidden = false;
    document.getElementById('daily-text').innerHTML = '<strong>' + villa.name + '</strong> goes back to daily rate. There is no outstanding monthly Rent due.';
    document.getElementById('btn-confirm-daily').addEventListener('click', function () {
      var btn = this;
      var original = btn.textContent;
      btn.disabled = true; btn.textContent = 'Processing…';
      MM.simulateSave(function () {
        btn.disabled = false; btn.textContent = original;
        BOOK.saveRateStatusOverride(villaId, { type: 'Daily', monthlyRent: null, nextDueDate: null });
        BOOK.appendRateStatusLog(villaId, { since: new Date().toISOString().slice(0, 10), till: null, status: 'Daily', note: 'Switched back to Daily rate.' });
        MM.showToast(villa.name + ' switched to Daily rate.');
        setTimeout(function () { window.location.href = '../book-067-villa-rate-update-status/index.html'; }, 700);
      });
    });
  }
});
