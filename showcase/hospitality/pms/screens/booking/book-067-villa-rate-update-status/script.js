document.addEventListener('DOMContentLoaded', function () {
  var BOOK = MM.BOOK;
  var buSel = document.getElementById('filter-bu');
  var villaSel = document.getElementById('filter-villa');

  BOOK.BUSINESS_UNITS.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu.id; o.textContent = bu.name; buSel.appendChild(o);
  });

  function populateVillas(buId) {
    villaSel.innerHTML = '<option value="">Select a villa…</option>';
    BOOK.VILLAS.filter(function (v) { var bu = BOOK.businessUnitByName(v.bu); return !buId || (bu && bu.id === buId); })
      .forEach(function (v) {
        var o = document.createElement('option'); o.value = v.id; o.textContent = v.name; villaSel.appendChild(o);
      });
  }
  buSel.value = BOOK.BUSINESS_UNITS[0] ? BOOK.BUSINESS_UNITS[0].id : '';
  populateVillas(buSel.value);
  buSel.addEventListener('change', function () { populateVillas(buSel.value); });

  function overviewRowHtml(r) {
    var overdue = BOOK.isOverdue(r.nextDueDate);
    return '<tr>' +
      '<td class="cell-strong">' + r.villaName + '</td>' +
      '<td><span class="badge badge-info">Monthly</span></td>' +
      '<td class="cell-num rate-value-cell">' + BOOK.fmtMoney(r.monthlyRent) + '/mo</td>' +
      '<td class="cell-num">' + BOOK.fmtDate(r.startingDate) + '</td>' +
      '<td class="cell-num' + (overdue ? '' : '') + '"><span style="' + (overdue ? 'color:var(--color-danger);font-weight:700;' : '') + '">' + BOOK.fmtDate(r.nextDueDate) + (overdue ? ' (overdue)' : '') + '</span></td>' +
      '<td><div class="row-actions">' +
        '<a class="btn btn-outline btn-sm" href="../book-069-process-villa-rate-status-payment-finish/index.html?bu=' + r.buId + '&villa=' + r.villaId + '&action=payment" title="Payment">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> Payment</a>' +
        '<a class="btn btn-ghost btn-sm" href="../book-069-process-villa-rate-status-payment-finish/index.html?bu=' + r.buId + '&villa=' + r.villaId + '&action=finish" title="Finish">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M20 6L9 17l-5-5"/></svg> Finish</a>' +
      '</div></td>' +
    '</tr>';
  }

  function renderOverview() {
    var rows = BOOK.getEffectiveMonthlyOverview();
    var tbody = document.getElementById('overview-rows');
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><h3>No villas on a Monthly rate</h3><p>Every villa is currently on a Daily or Yearly rate.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(overviewRowHtml).join('');
  }

  function historyRowHtml(e, buId, villaId) {
    var statusCell = e.status === 'Monthly'
      ? '<a href="../book-076-view-monthly-rate/index.html?bu=' + buId + '&villa=' + villaId + '" class="cell-strong">Monthly</a>'
      : '<span>' + e.status + '</span>';
    return '<tr>' +
      '<td class="cell-num">' + BOOK.fmtDate(e.since) + '</td>' +
      '<td class="cell-num">' + (e.till ? BOOK.fmtDate(e.till) : '<span class="badge badge-success">Active</span>') + '</td>' +
      '<td>' + statusCell + '</td>' +
      '<td>' + (e.note || '—') + '</td>' +
    '</tr>';
  }

  function renderHistory(villaId) {
    var villa = BOOK.villaById(villaId);
    var bu = BOOK.businessUnitByName(villa.bu);
    var buId = bu ? bu.id : '';
    var wasCreated = BOOK.ensureVillaHasRateLog(villaId);
    if (wasCreated) MM.showToast('No rate log existed yet — created a default Daily record starting 2020-01-01.');
    var history = BOOK.getEffectiveHistory(villaId).slice().sort(function (a, b) { return new Date(a.since) - new Date(b.since); });

    document.getElementById('history-title').textContent = villa.name + ' — Rate Status History';
    document.getElementById('history-sub').textContent = villa.bu;
    document.getElementById('history-rows').innerHTML = history.map(function (e) { return historyRowHtml(e, buId, villaId); }).join('');

    var latest = history[history.length - 1];
    var actions = document.getElementById('history-actions');
    if (latest && latest.status === 'Monthly') {
      actions.innerHTML =
        '<a class="btn btn-primary btn-sm" href="../book-069-process-villa-rate-status-payment-finish/index.html?bu=' + buId + '&villa=' + villaId + '&action=payment">Payment</a>' +
        '<a class="btn btn-outline btn-sm" href="../book-075-change-villa-rate-type-monthly-daily/index.html?bu=' + buId + '&villa=' + villaId + '&action=daily">Change to Daily</a>';
    } else {
      actions.innerHTML = '<a class="btn btn-primary btn-sm" href="../book-075-change-villa-rate-type-monthly-daily/index.html?bu=' + buId + '&villa=' + villaId + '&action=monthly">Change to Monthly</a>';
    }

    document.getElementById('panel-overview').hidden = true;
    document.getElementById('panel-history').hidden = false;
    document.getElementById('btn-clear').hidden = false;
  }

  document.getElementById('btn-search').addEventListener('click', function () {
    var villaId = villaSel.value;
    if (!villaId) { MM.showToast('Select a villa to search.', { danger: true }); return; }
    renderHistory(villaId);
  });
  document.getElementById('btn-clear').addEventListener('click', function () {
    document.getElementById('panel-overview').hidden = false;
    document.getElementById('panel-history').hidden = true;
    this.hidden = true;
    villaSel.value = '';
  });

  // Deep-link support: ?villa=PV-101 opens straight into the history view.
  var params = new URLSearchParams(window.location.search);
  var pre = params.get('villa');
  if (pre && BOOK.villaById(pre)) {
    var villa = BOOK.villaById(pre);
    var bu = BOOK.businessUnitByName(villa.bu);
    if (bu) buSel.value = bu.id;
    populateVillas(buSel.value);
    villaSel.value = pre;
    renderHistory(pre);
  }

  renderOverview();

  // --- Add Villa Rate Status drawer (legacy entry point, merged in from BOOK-068) ---
  var addForm = document.getElementById('add-status-form');
  var addBuSel = document.getElementById('business_unit');
  var addVillaSel = document.getElementById('villa');

  BOOK.BUSINESS_UNITS.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu.id; o.textContent = bu.name; addBuSel.appendChild(o);
  });

  addBuSel.addEventListener('change', function () {
    addVillaSel.innerHTML = '<option value="">Select a villa…</option>';
    addVillaSel.disabled = !addBuSel.value;
    if (!addBuSel.value) return;
    BOOK.VILLAS.filter(function (v) { var bu = BOOK.businessUnitByName(v.bu); return bu && bu.id === addBuSel.value; })
      .forEach(function (v) { var o = document.createElement('option'); o.value = v.id; o.textContent = v.name; addVillaSel.appendChild(o); });
  });

  function syncTypeFields() {
    var type = addForm.querySelector('input[name="type"]:checked').value;
    var isDaily = type === 'Daily';
    document.getElementById('group-until').style.display = isDaily ? 'none' : '';
    document.getElementById('group-due').style.display = isDaily ? 'none' : '';
    document.getElementById('until').required = !isDaily;
    document.getElementById('rent_due_date').required = !isDaily;
    if (isDaily) {
      document.getElementById('until').closest('.form-group').classList.remove('has-error');
      document.getElementById('rent_due_date').closest('.form-group').classList.remove('has-error');
    }
  }
  addForm.querySelectorAll('input[name="type"]').forEach(function (r) { r.addEventListener('change', syncTypeFields); });
  syncTypeFields();

  MM.bindFormValidation(addForm);

  document.getElementById('add-status-btn').addEventListener('click', function () {
    addForm.reset();
    addVillaSel.innerHTML = '<option value="">Select a business unit first…</option>';
    addVillaSel.disabled = true;
    addForm.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
    syncTypeFields();
    MM.openModal('add-status-drawer');
  });

  addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!addBuSel.value) { addBuSel.closest('.form-group').classList.add('has-error'); addBuSel.closest('.form-group').querySelector('.form-error').textContent = 'This field is required.'; return; }
    if (!addVillaSel.value) { addVillaSel.closest('.form-group').classList.add('has-error'); addVillaSel.closest('.form-group').querySelector('.form-error').textContent = 'This field is required.'; return; }
    if (!MM.validateForm(addForm)) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }

    var type = addForm.querySelector('input[name="type"]:checked').value;
    var until = document.getElementById('until').value;
    var dueDate = document.getElementById('rent_due_date').value;
    var savedVillaId = addVillaSel.value;
    var saveBtn = document.getElementById('btn-save');

    MM.simulateSave(saveBtn, 'Saving…', function () {
      var villa = BOOK.villaById(savedVillaId);
      var today = '2026-09-02';
      var note = type === 'Daily' ? 'Default daily rate.' :
        'Rate type set to ' + type + (dueDate ? ', due on day ' + dueDate + ' of the month' : '') + (until ? ', valid until ' + BOOK.fmtDate(until) : '') + '.';
      BOOK.appendRateStatusLog(savedVillaId, { since: today, till: null, status: type, note: note });
      BOOK.saveRateStatusOverride(savedVillaId, {
        type: type,
        nextDueDate: type === 'Monthly' && dueDate ? '2026-10-' + String(dueDate).padStart(2, '0') : null
      });
      MM.showToast('Rate status saved for ' + (villa ? villa.name : savedVillaId) + '.');
      MM.closeModal('add-status-drawer');
      var bu = villa ? BOOK.businessUnitByName(villa.bu) : null;
      if (bu) buSel.value = bu.id;
      populateVillas(buSel.value);
      villaSel.value = savedVillaId;
      renderHistory(savedVillaId);
      renderOverview();
    });
  });
});
