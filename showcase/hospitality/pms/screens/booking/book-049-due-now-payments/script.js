document.addEventListener('DOMContentLoaded', function () {
  var sortState = { key: null, dir: 'asc' };
  var query = '';
  var selected = {};

  var buSelect = document.getElementById('bu-filter');
  var businessUnits = Array.from(new Set(MM.BOOK.VILLAS.map(function (v) { return v.bu; })));
  businessUnits.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSelect.appendChild(o);
  });

  function allPayments() { return MM.BOOK.loadMerged('mm_partner_payments', MM.BOOK.PARTNER_PAYMENTS); }
  function savePayments(arr) { MM.BOOK.saveAll('mm_partner_payments', arr); }

  function rows() {
    return allPayments().filter(function (p) { return p.stage === 'due'; }).filter(function (p) {
      if (buSelect.value) {
        var v = MM.BOOK.villaByName(p.property);
        if (!v || v.bu !== buSelect.value) return false;
      }
      if (query) {
        var hay = (p.property + ' ' + p.bookingNo).toLowerCase();
        if (hay.indexOf(query) === -1) return false;
      }
      return true;
    });
  }

  function updatePaidBtn() {
    var count = Object.keys(selected).filter(function (k) { return selected[k]; }).length;
    var btn = document.getElementById('paid-btn');
    btn.disabled = count === 0;
    btn.textContent = count ? 'Mark ' + count + ' Selected as Paid' : 'Mark Selected as Paid';
  }

  function render() {
    var data = rows();
    if (sortState.key) data = MM.BOOK.sortRows(data, sortState.key, sortState.dir, sortState.key === 'amount' ? 'number' : 'date');
    var tbody = document.getElementById('rows');
    if (!data.length) {
      tbody.innerHTML = '<tr><td colspan="7"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m5 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>' +
        '<h3>Nothing due right now</h3><p>All partner payments are either upcoming or already paid.</p></div></td></tr>';
      updatePaidBtn();
      return;
    }
    tbody.innerHTML = data.map(function (p, i) {
      return '<tr>' +
        '<td><input type="checkbox" class="row-check" data-id="' + p.id + '"' + (selected[p.id] ? ' checked' : '') + '></td>' +
        '<td class="cell-num">' + (i + 1) + '</td>' +
        '<td class="cell-strong">' + p.property + '</td>' +
        '<td>' + p.bookingNo + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(p.checkIn) + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtDate(p.checkOut) + '</td>' +
        '<td class="cell-num">' + MM.BOOK.fmtMoney(p.amount) + '</td>' +
      '</tr>';
    }).join('');
    tbody.querySelectorAll('.row-check').forEach(function (cb) {
      cb.addEventListener('change', function () {
        selected[cb.getAttribute('data-id')] = cb.checked;
        document.getElementById('select-all').checked = tbody.querySelectorAll('.row-check').length === tbody.querySelectorAll('.row-check:checked').length;
        updatePaidBtn();
      });
    });
    updatePaidBtn();
  }

  document.getElementById('select-all').addEventListener('change', function (e) {
    rows().forEach(function (p) { selected[p.id] = e.target.checked; });
    render();
  });

  MM.BOOK.wireSearch(document.getElementById('search-input'), function (q) { query = q; render(); });
  document.querySelectorAll('[data-sort]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var key = chip.getAttribute('data-sort');
      if (sortState.key === key) { sortState.dir = sortState.dir === 'asc' ? 'desc' : 'asc'; }
      else { sortState.key = key; sortState.dir = 'asc'; }
      document.querySelectorAll('[data-sort]').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      render();
    });
  });
  buSelect.addEventListener('change', function () { selected = {}; render(); });

  document.getElementById('paid-btn').addEventListener('click', function () {
    var ids = Object.keys(selected).filter(function (k) { return selected[k]; });
    if (!ids.length) return;
    document.getElementById('pay-summary').textContent = ids.length + ' payment' + (ids.length > 1 ? 's' : '') + ' selected, totalling ' +
      MM.BOOK.fmtMoney(allPayments().filter(function (p) { return ids.indexOf(p.id) !== -1; }).reduce(function (s, p) { return s + (p.amount || 0); }, 0)) + '.';
    document.getElementById('pay-date').valueAsDate = new Date();
    document.getElementById('pay-method').value = '';
    document.querySelectorAll('#pay-form .form-group').forEach(function (g) { g.classList.remove('has-error'); });
    MM.openModal('pay-modal');
  });

  var payForm = document.getElementById('pay-form');
  MM.bindFormValidation(payForm);
  document.getElementById('pay-confirm-btn').addEventListener('click', function () {
    if (!MM.validateForm(payForm)) { MM.showToast('Please fill in the payment details.', { danger: true }); return; }
    var ids = Object.keys(selected).filter(function (k) { return selected[k]; });
    var paidOn = document.getElementById('pay-date').value;
    var paidThrough = document.getElementById('pay-method').value;
    var btn = this;
    MM.simulateSave(btn, 'Confirming…', function () {
      var all = allPayments().map(function (p) {
        if (ids.indexOf(p.id) === -1) return p;
        return Object.assign({}, p, { stage: 'paid', paidOn: paidOn, paidBy: 'Daniel Tan', paidThrough: paidThrough });
      });
      savePayments(all);
      MM.closeModal('pay-modal');
      MM.showToast(ids.length + ' payment' + (ids.length > 1 ? 's' : '') + ' marked as paid.');
      selected = {};
      setTimeout(function () { window.location.href = '../book-051-paid-payments/index.html'; }, 700);
    });
  });

  render();
});
