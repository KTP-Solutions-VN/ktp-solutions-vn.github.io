(function () {
  const session = POS.getSession();
  const allTxns = POS.getTransactions();
  const completed = allTxns.filter(t => t.status === 'Completed');

  function money(n) { return POS.fmtCurrency(n); }

  function renderHeader() {
    document.getElementById('sessionMeta').textContent =
      session.sessionId + ' · Cashier: ' + session.cashierName + ' · Opened ' + POS.fmtDateTime(session.openedAt) +
      (session.status === 'closed' ? ' · Closed ' + POS.fmtDateTime(session.closedAt) : '');
  }

  function renderKpis() {
    const totalSales = completed.reduce((s, t) => s + t.total, 0);
    const cashSales = completed.filter(t => t.paymentMethod === 'Cash').reduce((s, t) => s + t.total, 0);
    const nonCashSales = totalSales - cashSales;
    const overrideCount = completed.reduce((s, t) => s + t.items.filter(i => i.override).length, 0);
    const loyaltyPointsRedeemed = completed.reduce((s, t) => s + (t.loyaltyPointsRedeemed || 0), 0);
    const promoRedemptions = completed.filter(t => t.promoCode).length;

    const cards = [
      { label: 'Transactions', value: completed.length, variant: 'primary', sub: allTxns.length - completed.length ? (allTxns.length - completed.length) + ' voided' : 'All completed' },
      { label: 'Total Sales', value: money(totalSales), variant: 'accent', sub: 'incl. GST' },
      { label: 'Cash Sales', value: money(cashSales), variant: 'success', sub: 'Cash payment method' },
      { label: 'Card / EFTPOS Sales', value: money(nonCashSales), variant: 'primary', sub: 'Card + EFTPOS' },
      { label: 'Supervisor Overrides', value: overrideCount, variant: overrideCount ? 'warning' : 'success', sub: 'Price overrides this session' },
      { label: 'Loyalty & Promo', value: loyaltyPointsRedeemed.toLocaleString('en-AU') + ' pts', variant: 'success', sub: promoRedemptions + ' promo code redemption(s)' },
    ];
    document.getElementById('kpiRow').innerHTML = cards.map(c => `
      <div class="stat-card stat-card--${c.variant}">
        <div class="stat-card__label">${c.label}</div>
        <div class="stat-card__value">${c.value}</div>
        <div class="stat-card__sub">${c.sub}</div>
      </div>
    `).join('');

    return { totalSales, cashSales };
  }

  function renderTable() {
    document.getElementById('txnCountBadge').textContent = allTxns.length;
    document.getElementById('txnTableBody').innerHTML = allTxns.slice().reverse().map(t => {
      const flags = [];
      if (t.status === 'Voided') flags.push('<span class="badge badge-error">Voided</span>');
      if (t.items.some(i => i.override)) flags.push('<span class="badge badge-override">Override</span>');
      if (t.linkedPrescriptionId) flags.push('<span class="badge badge-info">Rx</span>');
      if (t.loyaltyPointsRedeemed) flags.push('<span class="badge badge-success">⭐ ' + t.loyaltyPointsRedeemed.toLocaleString('en-AU') + ' pts</span>');
      if (t.promoCode) flags.push('<span class="badge badge-neutral">' + t.promoCode + '</span>');
      return `<tr>
        <td class="cell-strong">${t.transactionNo}</td>
        <td>${POS.fmtTime(t.timestamp)}</td>
        <td>${t.items.reduce((s, i) => s + i.qty, 0)}</td>
        <td>${t.paymentMethod}${t.customerName ? '<div class="text-caption text-muted">' + t.customerName + '</div>' : ''}</td>
        <td class="tabular">${money(t.total)}</td>
        <td>${flags.join(' ') || '<span class="text-muted text-caption">—</span>'}</td>
      </tr>`;
    }).join('');
  }

  function renderOverrides() {
    const entries = [];
    completed.forEach(t => {
      t.items.forEach(i => {
        if (i.override) entries.push({ txn: t, item: i });
      });
    });
    const list = document.getElementById('overridesList');
    if (!entries.length) {
      list.innerHTML = '<div class="empty-state" style="padding:var(--sp-4);"><div class="empty-state__title">No overrides this session</div><div>Price overrides will appear here with full audit detail.</div></div>';
      return;
    }
    list.innerHTML = entries.map(({ txn, item }) => `
      <div class="override-entry">
        <div class="override-entry__top"><span>${item.name}</span><span>${txn.transactionNo}</span></div>
        <div class="override-entry__price"><s>${money(item.override.originalPrice)}</s> → <b>${money(item.override.newPrice)}</b></div>
        <div class="override-entry__meta">${item.override.reason}</div>
        <div class="override-entry__meta">Authorized by ${item.override.authorizedBy} · ${POS.fmtDateTime(item.override.authorizedAt)}</div>
      </div>
    `).join('');
  }

  function renderReconciliation(totals) {
    document.getElementById('openingFloatOut').textContent = money(session.openingFloat);
    document.getElementById('cashSalesOut').textContent = money(totals.cashSales);
    const expected = session.openingFloat + totals.cashSales;
    document.getElementById('expectedCashOut').textContent = money(expected);

    function updateVariance() {
      const countedRaw = document.getElementById('countedCash').value;
      const badge = document.getElementById('varianceBadge');
      if (countedRaw === '') { badge.textContent = '—'; badge.className = 'badge badge-neutral'; return; }
      const counted = parseFloat(countedRaw) || 0;
      const variance = +(counted - expected).toFixed(2);
      if (Math.abs(variance) < 0.01) { badge.textContent = 'Balanced'; badge.className = 'badge badge-success'; }
      else { badge.textContent = (variance > 0 ? '+' : '') + money(variance) + (variance > 0 ? ' over' : ' short'); badge.className = 'badge badge-warning'; }
    }
    document.getElementById('countedCash').addEventListener('input', updateVariance);
    if (session.countedCash != null) { document.getElementById('countedCash').value = session.countedCash; updateVariance(); }

    if (session.status === 'closed') {
      document.getElementById('countedCash').disabled = true;
      const btn = document.getElementById('closeSessionBtn');
      btn.disabled = true;
      btn.textContent = 'Session Closed';
      document.getElementById('closedNote').style.display = 'block';
      document.getElementById('closedNote').textContent = 'Closed at ' + POS.fmtDateTime(session.closedAt) + '. View the full report in Pharmacy Reports.';
    }

    document.getElementById('closeSessionBtn').addEventListener('click', () => {
      const countedRaw = document.getElementById('countedCash').value;
      if (countedRaw === '') { POS.toast('Enter the counted cash amount before closing.', 'warning'); return; }
      if (!confirm('Close out this shift? This cannot be undone.')) return;
      const counted = parseFloat(countedRaw) || 0;
      const variance = +(counted - expected).toFixed(2);
      session.status = 'closed';
      session.closedAt = new Date().toISOString();
      session.countedCash = counted;
      session.variance = variance;
      POS.saveSession(session);
      POS.toast('Shift closed out.', 'success');
      document.querySelector('[data-session-pill]')?.classList.add('session-pill--closed');
      const label = document.querySelector('[data-session-label]');
      if (label) label.textContent = 'Session Closed';
      document.getElementById('countedCash').disabled = true;
      const btn = document.getElementById('closeSessionBtn');
      btn.disabled = true;
      btn.textContent = 'Session Closed';
      document.getElementById('closedNote').style.display = 'block';
      document.getElementById('closedNote').textContent = 'Closed at ' + POS.fmtDateTime(session.closedAt) + '. View the full report in Pharmacy Reports.';
      renderHeader();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    const totals = renderKpis();
    renderTable();
    renderOverrides();
    renderReconciliation(totals);
  });
})();
