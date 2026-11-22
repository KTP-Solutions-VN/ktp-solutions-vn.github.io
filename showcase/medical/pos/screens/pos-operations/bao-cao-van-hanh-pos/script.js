(function () {
  function money(n) { return POS.fmtCurrency(n); }

  /* ---------------- Day-End Sales ---------------- */
  function renderSummary() {
    const txns = POS.getTransactions();
    const completed = txns.filter(t => t.status === 'Completed');
    const totalSales = completed.reduce((s, t) => s + t.total, 0);
    const avgBasket = completed.length ? totalSales / completed.length : 0;
    const overrideCount = completed.reduce((s, t) => s + t.items.filter(i => i.override).length, 0);

    const byMethod = { Cash: 0, Card: 0, EFTPOS: 0 };
    completed.forEach(t => { byMethod[t.paymentMethod] = (byMethod[t.paymentMethod] || 0) + t.total; });
    const maxMethod = Math.max(...Object.values(byMethod), 1);

    document.getElementById('panel-summary').innerHTML = `
      <div class="kpi-row">
        <div class="stat-card stat-card--primary"><div class="stat-card__label">Total Transactions</div><div class="stat-card__value">${completed.length}</div><div class="stat-card__sub">${txns.length - completed.length} voided</div></div>
        <div class="stat-card stat-card--accent"><div class="stat-card__label">Total Sales</div><div class="stat-card__value">${money(totalSales)}</div><div class="stat-card__sub">incl. GST</div></div>
        <div class="stat-card stat-card--success"><div class="stat-card__label">Average Basket Size</div><div class="stat-card__value">${money(avgBasket)}</div><div class="stat-card__sub">per completed sale</div></div>
        <div class="stat-card stat-card--warning"><div class="stat-card__label">Supervisor Overrides</div><div class="stat-card__value">${overrideCount}</div><div class="stat-card__sub">price overrides logged</div></div>
      </div>
      <div class="card">
        <h3>Sales by Payment Method</h3>
        <div class="payment-bars mt-3">
          ${Object.entries(byMethod).map(([method, amt]) => `
            <div>
              <div class="payment-bar__label"><span>${method}</span><span class="tabular">${money(amt)}</span></div>
              <div class="payment-bar__track"><div class="payment-bar__fill" style="width:${(amt / maxMethod * 100).toFixed(0)}%;"></div></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* ---------------- Shift Close-Outs ---------------- */
  function renderSession() {
    const session = POS.getSession();
    const txns = POS.getTransactions().filter(t => t.status === 'Completed');
    const cashSales = txns.filter(t => t.paymentMethod === 'Cash').reduce((s, t) => s + t.total, 0);
    const expected = session.openingFloat + cashSales;
    document.getElementById('panel-session').innerHTML = `
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Session</th><th>Cashier</th><th>Opened</th><th>Closed</th><th>Transactions</th><th>Total Sales</th><th>Variance</th><th>Status</th></tr></thead>
          <tbody>
            <tr>
              <td class="cell-strong">${session.sessionId}</td>
              <td>${session.cashierName}</td>
              <td>${POS.fmtDateTime(session.openedAt)}</td>
              <td>${session.status === 'closed' ? POS.fmtDateTime(session.closedAt) : '—'}</td>
              <td>${txns.length}</td>
              <td class="tabular">${money(txns.reduce((s, t) => s + t.total, 0))}</td>
              <td>${session.variance != null ? (session.variance === 0 ? '<span class="badge badge-success">Balanced</span>' : '<span class="badge badge-warning">' + money(session.variance) + '</span>') : '<span class="badge badge-neutral">Pending count</span>'}</td>
              <td>${session.status === 'closed' ? '<span class="badge badge-success">Closed</span>' : '<span class="badge badge-info">Open</span>'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-caption text-muted mt-3">Expected cash in drawer for the current session: <b>${money(expected)}</b> (opening float ${money(session.openingFloat)} + cash sales ${money(cashSales)}).
      ${session.status !== 'closed' ? ' <a href="../dong-ca-thu-ngan/index.html" style="color:var(--primary);font-weight:600;">Go to Shift Close-Out →</a>' : ''}</p>
    `;
  }

  /* ---------------- Transaction Log ---------------- */
  let txnSearch = '';
  let txnMethodFilter = 'All';
  function renderTransactions() {
    const panel = document.getElementById('panel-transactions');
    panel.innerHTML = `
      <div class="filter-row" style="margin-bottom:var(--sp-3);">
        <div class="field" style="margin-bottom:0;flex:1;min-width:220px;">
          <label>Search</label>
          <input type="text" class="input" id="txnSearchInput" placeholder="Search by transaction no. or cashier…">
        </div>
        <div class="chip-select" id="txnMethodChips">
          <button class="chip is-selected" data-method="All">All</button>
          <button class="chip" data-method="Cash">Cash</button>
          <button class="chip" data-method="Card">Card</button>
          <button class="chip" data-method="EFTPOS">EFTPOS</button>
        </div>
      </div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Txn No.</th><th>Cashier</th><th>Time</th><th>Payment</th><th>Total</th><th>Flags</th></tr></thead>
        <tbody id="txnTableBody"></tbody>
      </table></div>
    `;
    function paint() {
      const txns = POS.getTransactions().filter(t => {
        const matchesSearch = !txnSearch || t.transactionNo.toLowerCase().includes(txnSearch) || t.cashierName.toLowerCase().includes(txnSearch);
        const matchesMethod = txnMethodFilter === 'All' || t.paymentMethod === txnMethodFilter;
        return matchesSearch && matchesMethod;
      });
      const body = document.getElementById('txnTableBody');
      if (!txns.length) { body.innerHTML = '<tr><td colspan="6"><div class="empty-state">No transactions match this filter.</div></td></tr>'; return; }
      body.innerHTML = txns.slice().reverse().map(t => {
        const flags = [];
        if (t.status === 'Voided') flags.push('<span class="badge badge-error">Voided</span>');
        if (t.items.some(i => i.override)) flags.push('<span class="badge badge-override">Override</span>');
        if (t.linkedPrescriptionId) flags.push('<span class="badge badge-info">Rx</span>');
        if (t.loyaltyPointsRedeemed) flags.push('<span class="badge badge-success">⭐ ' + t.loyaltyPointsRedeemed.toLocaleString('en-AU') + ' pts</span>');
        if (t.promoCode) flags.push('<span class="badge badge-neutral">' + t.promoCode + '</span>');
        return `<tr>
          <td class="cell-strong">${t.transactionNo}</td>
          <td>${t.cashierName}</td>
          <td>${POS.fmtDateTime(t.timestamp)}${t.customerName ? '<div class="text-caption text-muted">' + t.customerName + '</div>' : ''}</td>
          <td>${t.paymentMethod}</td>
          <td class="tabular">${money(t.total)}</td>
          <td>${flags.join(' ') || '—'}</td>
        </tr>`;
      }).join('');
    }
    document.getElementById('txnSearchInput').addEventListener('input', e => { txnSearch = e.target.value.trim().toLowerCase(); paint(); });
    document.getElementById('txnMethodChips').addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      txnMethodFilter = chip.dataset.method;
      panel.querySelectorAll('#txnMethodChips .chip').forEach(c => c.classList.toggle('is-selected', c === chip));
      paint();
    });
    paint();
  }

  /* ---------------- Dispensing Trends ---------------- */
  function renderPatients() {
    const rx = POS.getPrescriptions();
    const trend = {};
    rx.forEach(r => { trend[r.medicationName] = (trend[r.medicationName] || 0) + 1; });
    const trendSorted = Object.entries(trend).sort((a, b) => b[1] - a[1]);
    const maxCount = Math.max(...Object.values(trend), 1);

    document.getElementById('panel-patients').innerHTML = `
      <div class="session-columns" style="display:grid;grid-template-columns:1.6fr 1fr;gap:var(--sp-4);align-items:start;">
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Prescription</th><th>Patient</th><th>Medication</th><th>Allergies</th><th>Status</th></tr></thead>
            <tbody>
              ${rx.map(r => {
                const hasAllergy = r.allergies && r.allergies.length && !(r.allergies.length === 1 && r.allergies[0] === 'None known');
                return `<tr>
                  <td class="cell-strong">${r.prescriptionNo}</td>
                  <td>${r.patientName}</td>
                  <td>${r.medicationName}</td>
                  <td>${hasAllergy ? '<span class="badge badge-error">' + r.allergies.join(', ') + '</span>' : '<span class="badge badge-neutral">None known</span>'}</td>
                  <td>${statusBadge(r.dispenseStatus)}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
        <div class="card">
          <h3>Medication Trend (by prescription count)</h3>
          <div class="mt-3">
            ${trendSorted.map(([name, count]) => `
              <div class="med-trend-row">
                <span class="med-trend-row__name">${name}</span>
                <div class="payment-bar__track" style="flex:1;"><div class="payment-bar__fill" style="width:${(count / maxCount * 100).toFixed(0)}%;background:var(--accent);"></div></div>
                <span class="med-trend-row__count">${count}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function statusBadge(status) {
    const map = {
      'Prescribed': 'badge-neutral',
      'Partially Dispensed': 'badge-warning',
      'Fully Dispensed': 'badge-info',
      'Counseling Documented': 'badge-info',
      'Record Submitted': 'badge-success',
    };
    return `<span class="badge ${map[status] || 'badge-neutral'}">${status}</span>`;
  }

  /* ---------------- Health Record Uploads ---------------- */
  let nehrFilter = 'All';
  function renderNehr() {
    const panel = document.getElementById('panel-nehr');
    panel.innerHTML = `
      <div class="nehr-filter-chips">
        <button class="chip is-selected" data-nehr="All">All</button>
        <button class="chip" data-nehr="Submitted">Submitted</button>
        <button class="chip" data-nehr="Pending">Pending</button>
      </div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Prescription</th><th>Patient</th><th>Medication</th><th>Status</th><th>Submitted At</th><th>Health Record Ref.</th></tr></thead>
        <tbody id="nehrTableBody"></tbody>
      </table></div>
    `;
    function paint() {
      const rx = POS.getPrescriptions().filter(r => {
        if (nehrFilter === 'Submitted') return r.nehrSubmitted;
        if (nehrFilter === 'Pending') return !r.nehrSubmitted;
        return true;
      });
      document.getElementById('nehrTableBody').innerHTML = rx.map(r => `
        <tr>
          <td class="cell-strong">${r.prescriptionNo}</td>
          <td>${r.patientName}</td>
          <td>${r.medicationName}</td>
          <td>${r.nehrSubmitted ? '<span class="badge badge-success">Submitted</span>' : '<span class="badge badge-warning">Pending</span>'}</td>
          <td>${r.nehrSubmittedAt ? POS.fmtDateTime(r.nehrSubmittedAt) : '—'}</td>
          <td>${r.nehrReference || '—'}</td>
        </tr>
      `).join('') || '<tr><td colspan="6"><div class="empty-state">No prescriptions match this filter.</div></td></tr>';
    }
    panel.querySelector('.nehr-filter-chips').addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      nehrFilter = chip.dataset.nehr;
      panel.querySelectorAll('.chip').forEach(c => c.classList.toggle('is-selected', c === chip));
      paint();
    });
    paint();
  }

  /* ---------------- Tabs ---------------- */
  const renderers = { summary: renderSummary, session: renderSession, transactions: renderTransactions, patients: renderPatients, nehr: renderNehr };
  function switchTab(tab) {
    Object.keys(renderers).forEach(t => {
      document.getElementById('panel-' + t).style.display = t === tab ? 'block' : 'none';
    });
    document.querySelectorAll('#reportTabs .tab-btn').forEach(b => b.classList.toggle('is-active', b.dataset.tab === tab));
    renderers[tab]();
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSummary();
    document.getElementById('reportTabs').addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (btn) switchTab(btn.dataset.tab);
    });
    document.getElementById('exportBtn').addEventListener('click', () => POS.toast('Export started (demo — no file generated).', 'success'));
  });
})();
