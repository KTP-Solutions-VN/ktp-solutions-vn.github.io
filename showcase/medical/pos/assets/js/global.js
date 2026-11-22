/* ==========================================================================
   CareJourney — POS App — Shared chrome behavior & helpers
   No sidebar/login chrome (kiosk mode). This file provides:
   - live clock + session pill wiring
   - currency formatting
   - toast helper
   - localStorage read/merge helpers for the shared data layer
   - supervisor PIN gate
   - reset-demo-data
   ========================================================================== */

const POS = (() => {
  const DEMO_PIN = '1234';
  const LS_KEYS = {
    session: 'pos_session',
    cart: 'pos_active_transaction',
    transactions: 'pos_transactions_extra',
    prescriptions: 'pos_prescriptions_extra',
    auditLog: 'pos_audit_log',
    draftRx: 'pos_draft_prescription',
  };

  function fmtCurrency(n) {
    const v = Number(n) || 0;
    return 'A$' + v.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function fmtDateTime(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleString('en-AU', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function fmtTime(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
  }

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore quota errors in demo */ }
  }

  function getSession() {
    let s = readJSON(LS_KEYS.session, null);
    if (!s) {
      s = {
        sessionId: 'SES-' + new Date().toISOString().slice(0, 10).replace(/-/g, ''),
        cashierName: 'Lucy Edwards',
        outlet: 'Meridian Health — Randwick Pharmacy',
        openedAt: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
        openingFloat: 200.00,
        status: 'open',
        closedAt: null,
        countedCash: null,
        variance: null,
      };
      writeJSON(LS_KEYS.session, s);
    }
    return s;
  }
  function saveSession(s) { writeJSON(LS_KEYS.session, s); }

  function getCart() {
    return readJSON(LS_KEYS.cart, { items: [], linkedPrescriptionId: null, discount: 0 });
  }
  function saveCart(cart) { writeJSON(LS_KEYS.cart, cart); }
  function clearCart() { localStorage.removeItem(LS_KEYS.cart); }

  function getTransactions() {
    const base = (typeof DATA_TRANSACTION !== 'undefined') ? DATA_TRANSACTION : [];
    const extra = readJSON(LS_KEYS.transactions, []);
    return base.concat(extra);
  }
  function addTransaction(txn) {
    const extra = readJSON(LS_KEYS.transactions, []);
    extra.push(txn);
    writeJSON(LS_KEYS.transactions, extra);
  }

  function getPrescriptions() {
    const base = (typeof DATA_PRESCRIPTION !== 'undefined') ? DATA_PRESCRIPTION : [];
    const extra = readJSON(LS_KEYS.prescriptions, []);
    // extra entries with matching id override base entries
    const map = new Map(base.map(p => [p.id, p]));
    extra.forEach(p => map.set(p.id, p));
    return Array.from(map.values());
  }
  function upsertPrescription(rx) {
    const extra = readJSON(LS_KEYS.prescriptions, []);
    const idx = extra.findIndex(p => p.id === rx.id);
    if (idx >= 0) extra[idx] = rx; else extra.push(rx);
    writeJSON(LS_KEYS.prescriptions, extra);
  }

  const TAX_RATE = 0.10;
  function computeCartTotals(cart) {
    const subtotal = cart.items.reduce((s, i) => s + i.lineTotal, 0);
    const discount = cart.discount || 0;
    const taxable = Math.max(subtotal - discount, 0);
    const tax = +(taxable * TAX_RATE).toFixed(2);
    const total = +(taxable + tax).toFixed(2);
    return { subtotal: +subtotal.toFixed(2), discount, tax, total };
  }

  /** Completes the sale currently held in the active cart (if any items exist),
   *  records it in DATA_TRANSACTION (+ localStorage), clears the cart, and
   *  returns the created transaction (or null if the cart was empty — e.g. a
   *  walk-in prescription intake with no retail line to bill right away). */
  function completeSale(extra) {
    extra = extra || {};
    const cart = getCart();
    if (!cart.items.length) return null;
    const totals = computeCartTotals(cart);
    const txn = {
      id: 'TXN-' + Date.now().toString().slice(-6),
      transactionNo: 'TXN-2026-' + Date.now().toString().slice(-4),
      cashierName: getSession().cashierName,
      timestamp: new Date().toISOString(),
      items: cart.items.map(i => ({ sku: i.sku, name: i.name, qty: i.qty, unitPrice: i.override ? i.override.newPrice : i.unitPrice, lineTotal: i.lineTotal, override: i.override })),
      subtotal: totals.subtotal, discount: totals.discount, tax: totals.tax, total: totals.total,
      // Customer & Rewards panel (Sales Terminal) keeps these synced onto the cart on every
      // total recalculation, so a sale finalized here after the Rx sub-flow (popup screens) still
      // carries the same promo/loyalty detail through to Shift Close-Out.
      promoCode: cart.promoCode || null,
      promoDiscountAmount: cart.promoDiscountAmount || 0,
      customerId: cart.customer ? cart.customer.id : null,
      customerName: cart.customer ? cart.customer.name : null,
      loyaltyPointsRedeemed: cart.redeemedPoints || 0,
      loyaltyDiscountAmount: cart.loyaltyDiscountAmount || 0,
      paymentMethod: cart.paymentMethod || 'Cash',
      cashTendered: (cart.paymentMethod || 'Cash') === 'Cash' ? totals.total : null,
      changeGiven: 0,
      status: 'Completed',
      linkedPrescriptionId: extra.linkedPrescriptionId || cart.linkedPrescriptionId || null,
      supervisorOverrideUsed: cart.items.some(i => i.override),
    };
    addTransaction(txn);
    clearCart();
    return txn;
  }

  function getAuditLog() { return readJSON(LS_KEYS.auditLog, []); }
  function addAuditEntry(entry) {
    const log = readJSON(LS_KEYS.auditLog, []);
    log.push(entry);
    writeJSON(LS_KEYS.auditLog, log);
  }

  function getDraftRx() { return readJSON(LS_KEYS.draftRx, null); }
  function saveDraftRx(rx) { writeJSON(LS_KEYS.draftRx, rx); }
  function clearDraftRx() { localStorage.removeItem(LS_KEYS.draftRx); }

  function resetDemoData() {
    Object.values(LS_KEYS).forEach(k => localStorage.removeItem(k));
    location.reload();
  }

  function checkPin(value) { return value === DEMO_PIN; }

  function toast(message, variant) {
    let stack = document.querySelector('.toast-stack');
    if (!stack) {
      stack = document.createElement('div');
      stack.className = 'toast-stack';
      const host = document.querySelector('.pos-device') || document.body;
      host.appendChild(stack);
    }
    const el = document.createElement('div');
    el.className = 'toast' + (variant ? ' toast--' + variant : '');
    el.innerHTML = message;
    stack.appendChild(el);
    setTimeout(() => { el.style.transition = 'opacity 200ms ease-in'; el.style.opacity = '0'; setTimeout(() => el.remove(), 220); }, 2600);
  }

  function initClock(el) {
    function tick() {
      const now = new Date();
      el.textContent = now.toLocaleString('en-AU', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    tick();
    setInterval(tick, 1000);
  }

  function wireResetButtons() {
    document.querySelectorAll('.reset-demo-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Reset all demo data and return to Sales Terminal?')) resetDemoData();
      });
    });
  }

  function wireDeviceBar() {
    const clockEl = document.querySelector('[data-device-clock]');
    if (clockEl) initClock(clockEl);
    const cashierEl = document.querySelector('[data-device-cashier]');
    const outletEl = document.querySelector('[data-device-outlet]');
    const sessionPill = document.querySelector('[data-session-pill]');
    const s = getSession();
    if (cashierEl) cashierEl.textContent = s.cashierName;
    if (outletEl) outletEl.textContent = s.outlet;
    if (sessionPill) {
      sessionPill.classList.toggle('session-pill--closed', s.status === 'closed');
      const label = sessionPill.querySelector('[data-session-label]');
      if (label) label.textContent = s.status === 'closed' ? 'Session Closed' : 'Session Open';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    wireDeviceBar();
    wireResetButtons();
  });

  return {
    DEMO_PIN, LS_KEYS, TAX_RATE,
    fmtCurrency, fmtDateTime, fmtTime,
    readJSON, writeJSON,
    getSession, saveSession,
    getCart, saveCart, clearCart,
    getTransactions, addTransaction, computeCartTotals, completeSale,
    getPrescriptions, upsertPrescription,
    getAuditLog, addAuditEntry,
    getDraftRx, saveDraftRx, clearDraftRx,
    resetDemoData, checkPin, toast, initClock,
  };
})();
