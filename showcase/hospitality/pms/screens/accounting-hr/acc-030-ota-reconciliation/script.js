(function () {
  'use strict';
  var LS_KEY = 'mm_acc_ota_overrides';

  var MOCK = [
    { id: 'BK-10231', property: 'Villa Sapphire Cliff', guest: 'James Whitfield', bu: 'Sentosa Collection', booking_date: '2026-07-02', check_in_date: '2026-09-02', check_out_date: '2026-09-09', refund_days: 7, payment_method: 'Bank Transfer', amount: 1540, commission: 231, fund_availability: '2026-09-14', is_received_payment: false, is_paid_commission: false, is_charge_virtual_card: false },
    { id: 'BK-10232', property: 'Villa Coral Horizon', guest: 'Anna Kowalski', bu: 'Sentosa Collection', booking_date: '2026-06-28', check_in_date: '2026-09-05', check_out_date: '2026-09-10', refund_days: 0, payment_method: 'Manual VC', amount: 860, commission: 129, fund_availability: '2026-09-10', is_received_payment: false, is_paid_commission: false, is_charge_virtual_card: false },
    { id: 'BK-10233', property: 'Villa Emerald Bay', guest: 'Michael Tan', bu: 'Byron Bay Retreats', booking_date: '2026-06-15', check_in_date: '2026-09-08', check_out_date: '2026-09-15', refund_days: 3, payment_method: 'Auto VC', amount: 2080, commission: 312, fund_availability: '2026-09-08', is_received_payment: true, is_paid_commission: false, is_charge_virtual_card: true },
    { id: 'BK-10234', property: 'Villa Azure Ridge', guest: 'Sophia Rossi', bu: 'Byron Bay Retreats', booking_date: '2026-06-01', check_in_date: '2026-08-20', check_out_date: '2026-08-25', refund_days: 0, payment_method: 'Bank Transfer', amount: 560, commission: 84, fund_availability: '2026-08-30', is_received_payment: true, is_paid_commission: true, is_charge_virtual_card: false },
    { id: 'BK-10240', property: 'Villa Lotus Terrace', guest: 'James Whitfield', bu: 'Noosa Estates', booking_date: '2026-08-01', check_in_date: '2026-09-20', check_out_date: '2026-09-27', refund_days: 14, payment_method: 'Third party', amount: 1080, commission: 162, fund_availability: '2026-09-27', is_received_payment: false, is_paid_commission: false, is_charge_virtual_card: false },
    { id: 'BK-10241', property: 'Villa Golden Palm', guest: 'Anna Kowalski', bu: 'Noosa Estates', booking_date: '2026-08-10', check_in_date: '2026-09-25', check_out_date: '2026-09-30', refund_days: 0, payment_method: 'Manual VC', amount: 760, commission: 114, fund_availability: '2026-09-25', is_received_payment: false, is_paid_commission: false, is_charge_virtual_card: false },
    { id: 'BK-10242', property: 'Villa Silver Tide', guest: 'Michael Tan', bu: 'Byron Bay Retreats', booking_date: '2026-08-16', check_in_date: '2026-09-01', check_out_date: '2026-09-06', refund_days: 0, payment_method: 'Bank Transfer', amount: 1340, commission: 201, fund_availability: '2026-09-11', is_received_payment: false, is_paid_commission: false, is_charge_virtual_card: false, locked: true },
    { id: 'BK-10243', property: 'Villa Marble Cove', guest: 'Sophia Rossi', bu: 'Sentosa Collection', booking_date: '2026-08-05', check_in_date: '2026-08-30', check_out_date: '2026-09-04', refund_days: 5, payment_method: 'Auto VC', amount: 880, commission: 132, fund_availability: '2026-09-04', is_received_payment: true, is_paid_commission: true, is_charge_virtual_card: true }
  ];

  function loadOverrides() { try { var r = localStorage.getItem(LS_KEY); if (r) return JSON.parse(r); } catch (e) {} return {}; }
  function saveOverrides(d) { localStorage.setItem(LS_KEY, JSON.stringify(d)); }
  var overrides = loadOverrides();

  function money(n) { return 'S$' + Math.round(n).toLocaleString('en-US'); }

  function getRows() {
    return MOCK.map(function (b) {
      var o = overrides[b.id] || {};
      return Object.assign({}, b, o);
    });
  }

  function reconStatus(b) {
    if (b.payment_method === 'Third party') return b.is_paid_commission ? 'received' : 'no-payment';
    if (b.is_received_payment) return 'received';
    if (b.payment_method === 'Bank Transfer') {
      return b.locked ? 'locked' : (Math.random() < 0 ? 'in-transit' : 'pending');
    }
    if (b.payment_method === 'Manual VC') return b.is_charge_virtual_card ? 'charged' : (b.locked ? 'locked' : 'charge-now');
    if (b.payment_method === 'Auto VC') return b.is_charge_virtual_card ? 'charged' : 'locked';
    return 'no-payment';
  }
  var STATUS_LABEL = { 'locked': 'Locked', 'pending': 'Pending', 'in-transit': 'In Transit', 'charged': 'Charged', 'received': 'Received', 'no-payment': 'No Payment', 'charge-now': 'Charge Now' };
  var STATUS_BADGE = { 'locked': 'badge-neutral', 'pending': 'badge-warning', 'in-transit': 'badge-info', 'charged': 'badge-info', 'received': 'badge-success', 'no-payment': 'badge-neutral', 'charge-now': 'badge-warning' };

  var TABS = [
    { key: 'all', label: 'All' },
    { key: 'locked', label: 'Locked' },
    { key: 'pending', label: 'Pending' },
    { key: 'in-transit', label: 'In Transit' },
    { key: 'charged', label: 'Charged' },
    { key: 'received', label: 'Received' },
    { key: 'no-payment', label: 'No Payment' }
  ];
  var activeTab = 'all';
  var sortBy = '';
  var sortAsc = true;

  function renderTabs() {
    var rows = getRows();
    document.getElementById('ota-status-tabs').innerHTML = TABS.map(function (t) {
      var count = t.key === 'all' ? rows.length : rows.filter(function (r) { return reconStatus(r) === t.key; }).length;
      return '<div class="tab-item' + (t.key === activeTab ? ' active' : '') + '" data-tab-key="' + t.key + '">' + t.label + '<span class="count">' + count + '</span></div>';
    }).join('');
  }

  function renderMonths() {
    var rows = getRows();
    var byMonth = {};
    rows.forEach(function (r) {
      var m = r.fund_availability.slice(0, 7);
      byMonth[m] = byMonth[m] || { expected: 0, commission: 0 };
      byMonth[m].expected += r.amount;
      byMonth[m].commission += r.commission;
    });
    var months = Object.keys(byMonth).sort();
    document.getElementById('ota-month-scroll').innerHTML = months.map(function (m) {
      var d = new Date(m + '-01T00:00:00');
      var label = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      return '<div class="ota-month-card"><div class="ota-month-card__label">' + label + '</div>' +
        '<div class="ota-month-card__value">' + money(byMonth[m].expected) + '</div>' +
        '<div class="ota-month-card__sub">Com. ' + money(byMonth[m].commission) + '</div></div>';
    }).join('');
  }

  function renderKpis() {
    var rows = getRows();
    var expected = rows.reduce(function (s, r) { return s + r.amount; }, 0);
    var commissionDue = rows.filter(function (r) { return reconStatus(r) === 'received' && !r.is_paid_commission; }).reduce(function (s, r) { return s + r.commission; }, 0);
    var pending = rows.filter(function (r) { return reconStatus(r) === 'charge-now'; }).length;
    document.getElementById('ota-kpi-expected').textContent = money(expected);
    document.getElementById('ota-kpi-commission').textContent = money(commissionDue);
    document.getElementById('ota-kpi-pending').textContent = pending;
  }

  function fmtD(s) {
    var d = new Date(s + 'T00:00:00');
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + String(d.getFullYear()).slice(2);
  }

  function actionFor(b, status) {
    if (b.payment_method === 'Third party' && !b.is_paid_commission) return { action: 'mark-seen', label: 'Mark as seen' };
    if (b.payment_method === 'Manual VC' && !b.is_charge_virtual_card && status !== 'locked') return { action: 'charge', label: 'Mark charged' };
    if (!b.is_received_payment && status !== 'locked' && status !== 'no-payment') return { action: 'receive', label: 'Mark received' };
    if (b.is_received_payment && !b.is_paid_commission) return { action: 'pay-commission', label: 'Pay commission' };
    return null;
  }

  function render() {
    renderTabs();
    renderMonths();
    renderKpis();
    var rows = getRows();
    var q = (document.getElementById('ota-search').value || '').toLowerCase();
    var filtered = rows.filter(function (r) {
      var st = reconStatus(r);
      if (activeTab !== 'all' && st !== activeTab) return false;
      if (q && (r.property + ' ' + r.guest).toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
    if (sortBy) {
      filtered.sort(function (a, b) {
        var av = a[sortBy], bv = b[sortBy];
        return sortAsc ? (av < bv ? -1 : 1) : (av > bv ? -1 : 1);
      });
    }
    document.getElementById('ota-tbody').innerHTML = filtered.map(function (r) {
      var st = reconStatus(r);
      var act = actionFor(r, st);
      var actionHtml = act
        ? '<button class="btn btn-outline btn-sm" data-ota-action="' + act.action + '" data-ota-id="' + r.id + '">' + act.label + '</button>'
        : '<span class="text-xs text-muted">&mdash;</span>';
      return '<tr>' +
        '<td><div class="ota-property">' + r.property + '</div><div class="ota-guest">' + r.guest + '</div><div class="ota-bu">' + r.bu + '</div></td>' +
        '<td class="ota-dates"><div>Book ' + fmtD(r.booking_date) + '</div><div>In ' + fmtD(r.check_in_date) + '</div><div>Out ' + fmtD(r.check_out_date) + '</div></td>' +
        '<td>' + (r.refund_days > 0 ? '<span class="badge badge-success">' + r.refund_days + ' Days</span>' : '<span class="badge badge-danger">Non</span>') + '</td>' +
        '<td><span class="badge badge-info">' + r.payment_method + '</span></td>' +
        '<td class="cell-num" style="text-align:right;">' + money(r.amount) + '<div class="cell-sub">Com ' + money(r.commission) + '</div></td>' +
        '<td>' + fmtD(r.fund_availability) + '</td>' +
        '<td><span class="badge ' + STATUS_BADGE[st] + '">' + STATUS_LABEL[st] + '</span></td>' +
        '<td style="text-align:right;">' + actionHtml + '</td>' +
      '</tr>';
    }).join('');
    document.getElementById('ota-empty').hidden = filtered.length > 0;
    document.getElementById('ota-result-count').textContent = filtered.length + ' of ' + rows.length + ' bookings';
  }
  render();

  document.getElementById('ota-search').addEventListener('input', render);
  document.getElementById('ota-sort').addEventListener('change', function () { sortBy = this.value; render(); });
  document.getElementById('ota-dir-btn').addEventListener('click', function () {
    sortAsc = !sortAsc;
    document.getElementById('ota-dir-label').textContent = sortAsc ? 'Oldest first' : 'Newest first';
    render();
  });
  document.getElementById('ota-status-tabs').addEventListener('click', function (e) {
    var tab = e.target.closest('[data-tab-key]');
    if (!tab) return;
    activeTab = tab.getAttribute('data-tab-key');
    render();
  });

  var pendingAction = null;
  var ACTION_MESSAGES = {
    'mark-seen': 'Mark this booking as seen? This clears the commission-due flag.',
    'charge': 'Mark this booking\u2019s virtual card as charged?',
    'receive': 'Mark this booking as payment received? A credit entry will be added to the linked Account Statement.',
    'pay-commission': 'Mark commission on this booking as paid?'
  };

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-ota-action]');
    if (!btn) return;
    pendingAction = { action: btn.getAttribute('data-ota-action'), id: btn.getAttribute('data-ota-id') };
    document.getElementById('ota-confirm-title').textContent = 'Confirm action';
    document.getElementById('ota-confirm-message').textContent = ACTION_MESSAGES[pendingAction.action];
    MM.openModal('ota-confirm-modal');
  });

  document.getElementById('ota-confirm-btn').addEventListener('click', function () {
    if (!pendingAction) return;
    var btn = this;
    MM.simulateSave(btn, 'Processing...', function () {
      var o = overrides[pendingAction.id] || {};
      if (pendingAction.action === 'mark-seen') o.is_paid_commission = true;
      if (pendingAction.action === 'charge') o.is_charge_virtual_card = true;
      if (pendingAction.action === 'receive') o.is_received_payment = true;
      if (pendingAction.action === 'pay-commission') o.is_paid_commission = true;
      overrides[pendingAction.id] = o;
      saveOverrides(overrides);
      MM.closeModal('ota-confirm-modal');
      var msg = pendingAction.action === 'receive' ? 'Payment marked received \u2014 statement entry created' : 'Booking updated successfully';
      MM.showToast(msg);
      pendingAction = null;
      render();
    });
  });
})();
