(function () {
  const TAX_RATE = 0.10;
  const LOYALTY_POINTS_PER_DOLLAR = 100; // established rate, same as Storefront checkout (1 point = A$0.01)

  const ICONS = {
    vitamin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 20.5 3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7Z"/><path d="m8.5 8.5 7 7"/></svg>',
    bottle: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2h6M10 2v4.2c0 .5-.2 1-.6 1.4L8 9c-.6.6-1 1.5-1 2.4V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8.6c0-.9-.4-1.8-1-2.4l-1.4-1.4A2 2 0 0 1 14 6.2V2"/></svg>',
    pill: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(45 12 12)"/><path d="m8.5 8.5 7 7"/></svg>',
    thermometer: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.5a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M14 8h-4"/></svg>',
    box: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8l9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/></svg>',
  };

  const PERSON_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>';
  const CHEVRON_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
  const CLOSE_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  const STAR_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.5l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.8-6.2 3.8 1.6-7-5.4-4.8 7.1-.7Z"/></svg>';

  function freshCart() {
    const c = POS.getCart();
    c.customer = c.customer || null;
    c.loyaltyRedeemPoints = c.loyaltyRedeemPoints || 0;
    c.promoCode = c.promoCode || null;
    return c;
  }

  let cart = freshCart();
  let selectedCategory = 'All';
  let overrideTargetSku = null;

  function money(n) { return POS.fmtCurrency(n); }

  function productBySku(sku) { return DATA_PRODUCT.find(p => p.sku === sku); }

  /* ---------------- Customer & Rewards: totals math ---------------- */
  function computePromoDiscount(subtotal) {
    if (!cart.promoCode) return { amount: 0, promo: null };
    const promo = DATA_PROMOTION.find(p => p.code === cart.promoCode);
    if (!promo) return { amount: 0, promo: null };
    if (subtotal < promo.minSpend) return { amount: 0, promo };
    let amount = promo.type === 'percentage' ? subtotal * (promo.value / 100) : promo.value;
    if (amount > subtotal) amount = subtotal;
    return { amount: +amount.toFixed(2), promo };
  }

  function maxRedeemablePoints() {
    if (!cart.customer) return 0;
    const subtotal = cart.items.reduce((s, i) => s + i.lineTotal, 0);
    const promoResult = computePromoDiscount(subtotal);
    const afterPromo = Math.max(subtotal - promoResult.amount, 0);
    return Math.max(0, Math.min(cart.customer.loyaltyPointsBalance, Math.floor(afterPromo * LOYALTY_POINTS_PER_DOLLAR)));
  }

  function computeTotals() {
    const subtotal = cart.items.reduce((s, i) => s + i.lineTotal, 0);
    const promoResult = computePromoDiscount(subtotal);
    const afterPromo = Math.max(subtotal - promoResult.amount, 0);

    let redeemedPoints = 0;
    let loyaltyDiscount = 0;
    if (cart.customer && cart.loyaltyRedeemPoints > 0) {
      const maxPoints = Math.max(0, Math.min(cart.customer.loyaltyPointsBalance, Math.floor(afterPromo * LOYALTY_POINTS_PER_DOLLAR)));
      redeemedPoints = Math.min(cart.loyaltyRedeemPoints, maxPoints);
      loyaltyDiscount = +(redeemedPoints / LOYALTY_POINTS_PER_DOLLAR).toFixed(2);
    }

    const discount = +(promoResult.amount + loyaltyDiscount).toFixed(2);
    const taxable = Math.max(subtotal - discount, 0);
    const tax = +(taxable * TAX_RATE).toFixed(2);
    const total = +(taxable + tax).toFixed(2);

    // keep the cart's persisted fields in sync so the Rx sub-flow (popup screens), which finalizes
    // the sale via the shared POS.completeSale() in global.js, carries the same discount through.
    cart.promoDiscountAmount = promoResult.amount;
    cart.loyaltyDiscountAmount = loyaltyDiscount;
    cart.redeemedPoints = redeemedPoints;
    cart.discount = discount;

    return { subtotal, promoDiscount: promoResult.amount, promo: promoResult.promo, loyaltyDiscount, redeemedPoints, discount, tax, total };
  }

  /* ---------------- Product grid & cart lines ---------------- */
  function renderProductGrid() {
    const grid = document.getElementById('productGrid');
    const filtered = DATA_PRODUCT.filter(p => {
      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Prescription') return p.requiresPrescription;
      if (selectedCategory === 'OTC') return p.category === 'OTC';
      if (selectedCategory === 'Retail') return !p.requiresPrescription && p.category !== 'OTC';
      return true;
    });
    grid.innerHTML = filtered.map(p => `
      <button class="product-tile ${p.requiresPrescription ? 'is-rx' : ''}" data-sku="${p.sku}">
        <div class="product-tile__icon">${ICONS[p.icon] || ICONS.box}</div>
        <div class="product-tile__name">${p.name}</div>
        <div class="product-tile__meta">
          <span class="product-tile__price">${money(p.price)}</span>
          ${p.requiresPrescription ? '<span class="badge badge-info">Rx</span>' : `<span class="product-tile__stock ${p.stockQty <= 10 ? 'is-low' : ''}">${p.stockQty} in stock</span>`}
        </div>
      </button>
    `).join('');
    grid.querySelectorAll('.product-tile').forEach(btn => {
      btn.addEventListener('click', () => addToCart(btn.dataset.sku));
    });
  }

  function addToCart(sku) {
    const product = productBySku(sku);
    if (!product) { POS.toast('Item not found for this barcode/SKU.', 'warning'); return; }
    const existing = cart.items.find(i => i.sku === sku && !i.override);
    if (existing) {
      existing.qty += 1;
      existing.lineTotal = +(existing.qty * existing.unitPrice).toFixed(2);
    } else {
      cart.items.push({
        sku: product.sku, name: product.name, qty: 1,
        unitPrice: product.price, lineTotal: product.price,
        requiresPrescription: product.requiresPrescription,
        override: null,
      });
    }
    POS.saveCart(cart);
    renderCart();
  }

  function changeQty(sku, delta) {
    const line = cart.items.find(i => i.sku === sku);
    if (!line) return;
    line.qty = Math.max(1, line.qty + delta);
    const unit = line.override ? line.override.newPrice : line.unitPrice;
    line.lineTotal = +(line.qty * unit).toFixed(2);
    POS.saveCart(cart);
    renderCart();
  }

  function removeLine(sku) {
    cart.items = cart.items.filter(i => i.sku !== sku);
    POS.saveCart(cart);
    renderCart();
  }

  function renderTotals() {
    const totals = computeTotals();
    document.getElementById('sumSubtotal').textContent = money(totals.subtotal);

    const promoRow = document.getElementById('sumPromoRow');
    if (totals.promoDiscount > 0) {
      promoRow.style.display = 'flex';
      document.getElementById('sumPromoLabel').textContent = 'Promo (' + totals.promo.code + ')';
      document.getElementById('sumPromo').textContent = '– ' + money(totals.promoDiscount);
    } else {
      promoRow.style.display = 'none';
    }

    const loyaltyRow = document.getElementById('sumLoyaltyRow');
    if (totals.loyaltyDiscount > 0) {
      loyaltyRow.style.display = 'flex';
      document.getElementById('sumLoyaltyLabel').textContent = 'Loyalty redeemed (' + totals.redeemedPoints.toLocaleString('en-AU') + ' pts)';
      document.getElementById('sumLoyalty').textContent = '– ' + money(totals.loyaltyDiscount);
    } else {
      loyaltyRow.style.display = 'none';
    }

    document.getElementById('sumTax').textContent = money(totals.tax);
    document.getElementById('sumTotal').textContent = money(totals.total);
    const chargeBtn = document.getElementById('chargeBtn');
    chargeBtn.textContent = 'Charge ' + money(totals.total);
    chargeBtn.disabled = cart.items.length === 0;

    POS.saveCart(cart);
    return totals;
  }

  function renderCart() {
    const list = document.getElementById('cartList');
    const count = cart.items.reduce((s, i) => s + i.qty, 0);
    document.getElementById('cartCount').textContent = count + (count === 1 ? ' item' : ' items');

    if (!cart.items.length) {
      list.innerHTML = `
        <div class="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          <div class="empty-state__title">Cart is empty</div>
          <div>Scan a barcode or tap an item to start a sale.</div>
        </div>`;
    } else {
      list.innerHTML = cart.items.map(line => `
        <div class="cart-line" data-sku="${line.sku}">
          <div class="cart-line__top">
            <div>
              <div class="cart-line__name">${line.name}</div>
              <div class="cart-line__sku">${line.sku}${line.requiresPrescription ? ' · Prescription item' : ''}</div>
            </div>
            <div style="text-align:right;">
              ${line.override ? `<span class="cart-line__price-orig">${money(line.override.originalPrice)}</span>` : ''}
              <span class="cart-line__price">${money(line.lineTotal)}</span>
            </div>
          </div>
          <div class="cart-line__actions">
            <div class="qty-stepper">
              <button class="qty-btn" data-action="dec" title="Decrease quantity">−</button>
              <span class="qty-value">${line.qty}</span>
              <button class="qty-btn" data-action="inc" title="Increase quantity">+</button>
            </div>
            <div style="display:flex;gap:6px;">
              <button class="line-icon-btn ${line.override ? 'is-override' : ''}" data-action="override" title="Price override (supervisor authorization)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
              </button>
              <button class="line-icon-btn" data-action="remove" title="Remove item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
              </button>
            </div>
          </div>
          ${line.override ? `<div class="cart-line__override-note"><span class="badge badge-override"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg> Supervisor Override — ${line.override.authorizedBy}</span></div>` : ''}
        </div>
      `).join('');

      list.querySelectorAll('[data-action="inc"]').forEach(b => b.addEventListener('click', e => changeQty(e.target.closest('.cart-line').dataset.sku, 1)));
      list.querySelectorAll('[data-action="dec"]').forEach(b => b.addEventListener('click', e => changeQty(e.target.closest('.cart-line').dataset.sku, -1)));
      list.querySelectorAll('[data-action="remove"]').forEach(b => b.addEventListener('click', e => removeLine(e.target.closest('.cart-line').dataset.sku)));
      list.querySelectorAll('[data-action="override"]').forEach(b => b.addEventListener('click', e => openOverrideModal(e.target.closest('.cart-line').dataset.sku)));
    }

    renderTotals();
  }

  /* ---------------- Customer & Rewards panel ---------------- */
  function promoBlockHTML() {
    const applied = cart.promoCode ? DATA_PROMOTION.find(p => p.code === cart.promoCode) : null;
    if (applied) {
      return `
        <div class="promo-block">
          <div class="field" style="margin-bottom:0;"><label>Promotion / Discount Code</label></div>
          <div class="promo-applied">
            <span class="promo-applied__text">✓ "${applied.code}" applied — ${applied.description}</span>
            <button class="promo-applied__remove" id="promoRemoveBtn" title="Remove code">${CLOSE_ICON}</button>
          </div>
        </div>`;
    }
    return `
      <div class="promo-block">
        <div class="field" id="promoField" style="margin-bottom:0;">
          <label for="promoInput">Promotion / Discount Code</label>
          <div class="promo-input-row">
            <input type="text" class="input" id="promoInput" placeholder="Enter promo code" autocomplete="off">
            <button class="btn btn-outline" id="promoApplyBtn">Apply</button>
          </div>
          <span class="error-text" id="promoError"></span>
        </div>
      </div>`;
  }

  function redeemBlockHTML() {
    const redeemOn = (cart.loyaltyRedeemPoints || 0) > 0;
    return `
      <div class="redeem-row">
        <div class="redeem-row__head">
          <span>Redeem Points</span>
          <button type="button" class="toggle ${redeemOn ? 'is-on' : ''}" id="redeemToggle"><span class="toggle-track"></span></button>
        </div>
        <div class="redeem-input-wrap" id="redeemInputWrap" style="${redeemOn ? '' : 'display:none;'}">
          <input type="number" class="input" id="redeemPointsInput" min="0" step="10" value="${cart.loyaltyRedeemPoints || 0}">
          <button class="btn btn-outline" id="redeemAllBtn">Use Max</button>
        </div>
        <div class="redeem-hint">${LOYALTY_POINTS_PER_DOLLAR} pts = A$1.00 · up to ${cart.customer.loyaltyPointsBalance.toLocaleString('en-AU')} pts available</div>
        <div class="redeem-error" id="redeemError"></div>
      </div>`;
  }

  function renderRewardsPanel() {
    const panel = document.getElementById('rewardsPanel');
    if (!cart.customer) {
      panel.innerHTML = `
        <button type="button" class="lookup-btn" id="customerLookupOpenBtn">
          <span class="lookup-btn__icon">${PERSON_ICON}</span>
          <span class="lookup-btn__text">
            <div class="lookup-btn__title">No customer attached</div>
            <div class="lookup-btn__sub">Look up Customer</div>
          </span>
          ${CHEVRON_ICON}
        </button>
        ${promoBlockHTML()}
      `;
    } else {
      const c = cart.customer;
      const initials = c.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
      panel.innerHTML = `
        <div class="customer-card">
          <div class="customer-card__top">
            <div class="customer-card__avatar">${initials}</div>
            <div class="customer-card__info">
              <div class="customer-card__name">${c.name}</div>
              <div class="customer-card__meta">${c.phone}${c.membershipType && c.membershipType !== 'None' ? ' · ' + c.membershipType + ' Member' : ''}</div>
            </div>
            <button class="customer-card__remove" id="customerRemoveBtn" title="Remove customer">${CLOSE_ICON}</button>
          </div>
          <div class="customer-card__points">
            <span class="points-star">${STAR_ICON}</span>
            <span><b>${c.loyaltyPointsBalance.toLocaleString('en-AU')}</b> points available</span>
          </div>
          ${c.loyaltyPointsBalance > 0 ? redeemBlockHTML() : ''}
        </div>
        ${promoBlockHTML()}
      `;
    }
    wireRewardsPanelEvents();
  }

  function wireRewardsPanelEvents() {
    const openBtn = document.getElementById('customerLookupOpenBtn');
    if (openBtn) openBtn.addEventListener('click', openCustomerModal);

    const removeBtn = document.getElementById('customerRemoveBtn');
    if (removeBtn) removeBtn.addEventListener('click', () => {
      cart.customer = null;
      cart.loyaltyRedeemPoints = 0;
      POS.saveCart(cart);
      renderRewardsPanel();
      renderTotals();
      POS.toast('Customer removed from sale.', 'warning');
    });

    const toggle = document.getElementById('redeemToggle');
    if (toggle) toggle.addEventListener('click', () => {
      const isOn = toggle.classList.contains('is-on');
      cart.loyaltyRedeemPoints = isOn ? 0 : maxRedeemablePoints();
      POS.saveCart(cart);
      renderRewardsPanel();
      renderTotals();
    });

    const useMaxBtn = document.getElementById('redeemAllBtn');
    if (useMaxBtn) useMaxBtn.addEventListener('click', () => {
      cart.loyaltyRedeemPoints = maxRedeemablePoints();
      POS.saveCart(cart);
      renderRewardsPanel();
      renderTotals();
    });

    const redeemInput = document.getElementById('redeemPointsInput');
    if (redeemInput) {
      redeemInput.addEventListener('input', () => {
        let val = parseInt(redeemInput.value, 10);
        if (isNaN(val) || val < 0) val = 0;
        const max = maxRedeemablePoints();
        const errorEl = document.getElementById('redeemError');
        if (val > max) {
          val = max;
          if (errorEl) { errorEl.textContent = 'Capped at ' + max.toLocaleString('en-AU') + ' pts — can\'t exceed balance or sale total.'; errorEl.classList.add('is-visible'); }
        } else if (errorEl) {
          errorEl.classList.remove('is-visible');
        }
        cart.loyaltyRedeemPoints = val;
        POS.saveCart(cart);
        renderTotals();
      });
      redeemInput.addEventListener('blur', () => { redeemInput.value = cart.loyaltyRedeemPoints || 0; });
    }

    const promoApplyBtn = document.getElementById('promoApplyBtn');
    if (promoApplyBtn) promoApplyBtn.addEventListener('click', applyPromoCode);
    const promoInput = document.getElementById('promoInput');
    if (promoInput) promoInput.addEventListener('keydown', e => { if (e.key === 'Enter') applyPromoCode(); });

    const promoRemoveBtn = document.getElementById('promoRemoveBtn');
    if (promoRemoveBtn) promoRemoveBtn.addEventListener('click', () => {
      cart.promoCode = null;
      POS.saveCart(cart);
      renderRewardsPanel();
      renderTotals();
      POS.toast('Promo code removed.', 'warning');
    });
  }

  function applyPromoCode() {
    const input = document.getElementById('promoInput');
    const errorEl = document.getElementById('promoError');
    const fieldEl = document.getElementById('promoField');
    const raw = (input.value || '').trim().toUpperCase();

    if (!raw) { fieldEl.classList.add('has-error'); errorEl.textContent = 'Enter a code to apply.'; return; }

    const promo = DATA_PROMOTION.find(p => p.code === raw);
    const subtotal = cart.items.reduce((s, i) => s + i.lineTotal, 0);

    if (!promo) { fieldEl.classList.add('has-error'); errorEl.textContent = 'Code not recognized — check the code or ask the customer for another.'; return; }
    if (promo.status === 'expired') { fieldEl.classList.add('has-error'); errorEl.textContent = 'This code expired on ' + promo.endDate + '.'; return; }
    if (promo.status === 'scheduled') { fieldEl.classList.add('has-error'); errorEl.textContent = 'This code isn\'t active yet — starts ' + promo.startDate + '.'; return; }
    if (subtotal < promo.minSpend) { fieldEl.classList.add('has-error'); errorEl.textContent = 'Minimum spend of ' + money(promo.minSpend) + ' not met (current subtotal ' + money(subtotal) + ').'; return; }

    fieldEl.classList.remove('has-error');
    cart.promoCode = promo.code;
    POS.saveCart(cart);
    renderRewardsPanel();
    renderTotals();
    POS.toast('Promo code "' + promo.code + '" applied.', 'success');
  }

  /* ---------------- Customer lookup modal (touch keypad) ---------------- */
  function normalizeLookup(v) { return (v || '').toString().replace(/[\s\-]/g, '').toUpperCase().replace(/^\+61/, '0'); }

  function renderCustomerQuickPicks() {
    const wrap = document.getElementById('customerQuickPicks');
    wrap.innerHTML = DATA_CUSTOMER.map(c => `<button type="button" class="chip" data-phone="${c.phone}">${c.name.split(' ')[0]} · ${c.phone}</button>`).join('');
    wrap.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.getElementById('customerLookupInput').value = chip.dataset.phone;
        searchCustomer(chip.dataset.phone);
      });
    });
  }

  function openCustomerModal() {
    document.getElementById('customerLookupInput').value = '';
    document.getElementById('customerLookupField').classList.remove('has-error');
    renderCustomerQuickPicks();
    document.getElementById('customerScrim').style.display = 'flex';
    document.getElementById('customerLookupInput').focus();
  }
  function closeCustomerModal() { document.getElementById('customerScrim').style.display = 'none'; }

  function searchCustomer(rawValue) {
    const q = normalizeLookup(rawValue);
    const errorEl = document.getElementById('customerLookupError');
    const fieldEl = document.getElementById('customerLookupField');
    if (!q) { fieldEl.classList.add('has-error'); errorEl.textContent = 'Enter a phone number or membership ID.'; return; }

    const match = DATA_CUSTOMER.find(c =>
      normalizeLookup(c.phone) === q ||
      normalizeLookup(c.membershipId) === q ||
      normalizeLookup(c.id) === q ||
      normalizeLookup(c.phone).endsWith(q)
    );
    if (!match) {
      fieldEl.classList.add('has-error');
      errorEl.textContent = 'No customer found for "' + (rawValue || '').trim() + '". Check the details or continue as walk-in.';
      return;
    }
    fieldEl.classList.remove('has-error');
    cart.customer = { id: match.id, name: match.name, phone: match.phone, membershipId: match.membershipId, membershipType: match.membershipType, loyaltyPointsBalance: match.loyaltyPointsBalance };
    cart.loyaltyRedeemPoints = 0;
    POS.saveCart(cart);
    closeCustomerModal();
    renderRewardsPanel();
    renderTotals();
    POS.toast(match.name + ' attached — ' + match.loyaltyPointsBalance.toLocaleString('en-AU') + ' pts available.', 'success');
  }

  /* ---------------- Supervisor override modal ---------------- */
  function openOverrideModal(sku) {
    overrideTargetSku = sku;
    const line = cart.items.find(i => i.sku === sku);
    document.getElementById('overrideItemName').textContent = line.name;
    document.getElementById('overrideOriginalPrice').textContent = money(line.override ? line.override.originalPrice : line.unitPrice);
    document.getElementById('overrideNewPrice').value = line.override ? line.override.newPrice : '';
    document.getElementById('overrideReason').value = line.override ? line.override.reason : '';
    document.getElementById('overridePin').value = '';
    document.getElementById('overrideReasonError').style.display = 'none';
    document.getElementById('overridePinError').style.display = 'none';
    document.getElementById('overrideScrim').style.display = 'flex';
  }
  function closeOverrideModal() { document.getElementById('overrideScrim').style.display = 'none'; overrideTargetSku = null; }

  function confirmOverride() {
    const newPriceRaw = document.getElementById('overrideNewPrice').value;
    const reason = document.getElementById('overrideReason').value.trim();
    const pin = document.getElementById('overridePin').value.trim();
    let hasError = false;
    if (!reason) { document.getElementById('overrideReasonError').style.display = 'block'; hasError = true; }
    else { document.getElementById('overrideReasonError').style.display = 'none'; }
    if (!POS.checkPin(pin)) { document.getElementById('overridePinError').style.display = 'block'; hasError = true; }
    else { document.getElementById('overridePinError').style.display = 'none'; }
    if (newPriceRaw === '' || isNaN(newPriceRaw)) { hasError = true; }
    if (hasError) return;

    const newPrice = parseFloat(newPriceRaw);
    const line = cart.items.find(i => i.sku === overrideTargetSku);
    const originalPrice = line.override ? line.override.originalPrice : line.unitPrice;
    const authorizedAt = new Date().toISOString();
    line.override = { originalPrice, newPrice, reason, authorizedBy: 'Supervisor — Natalie Cooper', authorizedAt };
    line.lineTotal = +(line.qty * newPrice).toFixed(2);
    POS.saveCart(cart);
    POS.addAuditEntry({
      type: 'price_override', sku: line.sku, itemName: line.name,
      originalPrice, newPrice, reason, authorizedBy: 'Supervisor — Natalie Cooper',
      cashier: POS.getSession().cashierName, at: authorizedAt,
    });
    closeOverrideModal();
    renderCart();
    POS.toast('Override authorized and logged to audit trail.', 'warning');
  }

  /* ---------------- Payment & checkout ---------------- */
  function selectPayment(method) {
    document.querySelectorAll('.pay-btn').forEach(b => b.classList.toggle('is-selected', b.dataset.pay === method));
    cart.paymentMethod = method;
    POS.saveCart(cart);
  }

  function charge() {
    if (!cart.items.length) return;
    const rxItem = cart.items.find(i => i.requiresPrescription);
    if (rxItem && !cart.linkedPrescriptionId) {
      cart.pendingRxSku = rxItem.sku;
      POS.saveCart(cart);
      POS.toast('This sale includes a prescription item — collect patient information first.', 'warning');
      setTimeout(() => { window.location.href = '../nhap-thong-tin-nhan-khau-hoc-lam-sang-benh-nhan/index.html'; }, 500);
      return;
    }
    completeSale();
  }

  function completeSale() {
    const totals = computeTotals();
    const txn = {
      id: 'TXN-' + Date.now().toString().slice(-6),
      transactionNo: 'TXN-2026-' + Date.now().toString().slice(-4),
      cashierName: POS.getSession().cashierName,
      timestamp: new Date().toISOString(),
      items: cart.items.map(i => ({ sku: i.sku, name: i.name, qty: i.qty, unitPrice: i.override ? i.override.newPrice : i.unitPrice, lineTotal: i.lineTotal, override: i.override })),
      subtotal: totals.subtotal, discount: totals.discount, tax: totals.tax, total: totals.total,
      promoCode: totals.promo ? totals.promo.code : null,
      promoDiscountAmount: totals.promoDiscount,
      customerId: cart.customer ? cart.customer.id : null,
      customerName: cart.customer ? cart.customer.name : null,
      loyaltyPointsRedeemed: totals.redeemedPoints,
      loyaltyDiscountAmount: totals.loyaltyDiscount,
      paymentMethod: cart.paymentMethod || 'Cash',
      cashTendered: (cart.paymentMethod || 'Cash') === 'Cash' ? totals.total : null,
      changeGiven: 0,
      status: 'Completed',
      linkedPrescriptionId: cart.linkedPrescriptionId || null,
      supervisorOverrideUsed: cart.items.some(i => i.override),
    };
    POS.addTransaction(txn);
    POS.clearCart();
    POS.clearDraftRx();
    cart = freshCart();
    renderCart();
    renderRewardsPanel();
    POS.toast('Payment successful — ' + money(totals.total) + ' via ' + txn.paymentMethod + '.', 'success');
  }

  /* ---------------- Barcode / scan input ---------------- */
  function handleBarcodeSubmit(value) {
    const v = value.trim();
    if (!v) return;
    const product = DATA_PRODUCT.find(p => p.barcode === v || p.sku.toLowerCase() === v.toLowerCase());
    if (product) { addToCart(product.sku); POS.toast(product.name + ' added to sale.'); }
    else {
      const byName = DATA_PRODUCT.filter(p => p.name.toLowerCase().includes(v.toLowerCase()));
      if (byName.length === 1) { addToCart(byName[0].sku); POS.toast(byName[0].name + ' added to sale.'); }
      else POS.toast('No matching item for "' + v + '".', 'warning');
    }
  }

  /* ---------------- Init ---------------- */
  document.addEventListener('DOMContentLoaded', () => {
    renderProductGrid();
    renderRewardsPanel();
    renderCart();

    // if the sale was interrupted mid Rx-flow and is now returning completed, cart.linkedPrescriptionId may be set
    if (cart.paymentMethod) selectPayment(cart.paymentMethod); else selectPayment('Cash');

    document.getElementById('categoryChips').addEventListener('click', e => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      selectedCategory = btn.dataset.cat;
      document.querySelectorAll('#categoryChips .chip').forEach(c => c.classList.toggle('is-selected', c === btn));
      renderProductGrid();
    });

    document.getElementById('barcodeInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') { handleBarcodeSubmit(e.target.value); e.target.value = ''; }
    });

    document.getElementById('payMethods').addEventListener('click', e => {
      const btn = e.target.closest('.pay-btn');
      if (btn) selectPayment(btn.dataset.pay);
    });

    document.getElementById('chargeBtn').addEventListener('click', charge);
    document.getElementById('newRxBtn').addEventListener('click', () => { window.location.href = '../nhap-thong-tin-nhan-khau-hoc-lam-sang-benh-nhan/index.html'; });
    document.getElementById('voidCartBtn').addEventListener('click', () => {
      if (!cart.items.length) return;
      if (confirm('Void current sale? This cannot be undone.')) {
        POS.clearCart(); POS.clearDraftRx();
        cart = freshCart();
        renderCart();
        renderRewardsPanel();
        POS.toast('Sale voided.', 'warning');
      }
    });

    document.getElementById('overrideCloseBtn').addEventListener('click', closeOverrideModal);
    document.getElementById('overrideCancelBtn').addEventListener('click', closeOverrideModal);
    document.getElementById('overrideConfirmBtn').addEventListener('click', confirmOverride);
    document.getElementById('overrideScrim').addEventListener('click', e => { if (e.target.id === 'overrideScrim') closeOverrideModal(); });

    document.getElementById('customerCloseBtn').addEventListener('click', closeCustomerModal);
    document.getElementById('customerWalkInBtn').addEventListener('click', closeCustomerModal);
    document.getElementById('customerSearchBtn').addEventListener('click', () => searchCustomer(document.getElementById('customerLookupInput').value));
    document.getElementById('customerLookupInput').addEventListener('keydown', e => { if (e.key === 'Enter') searchCustomer(e.target.value); });
    document.getElementById('customerScrim').addEventListener('click', e => { if (e.target.id === 'customerScrim') closeCustomerModal(); });
    document.getElementById('customerKeypad').addEventListener('click', e => {
      const btn = e.target.closest('.keypad-btn');
      if (!btn) return;
      const key = btn.dataset.key;
      const input = document.getElementById('customerLookupInput');
      if (key === 'clear') input.value = '';
      else if (key === 'back') input.value = input.value.slice(0, -1);
      else input.value += key;
      input.focus();
    });

    const cashierEl = document.querySelector('[data-device-cashier-initial]');
    if (cashierEl) {
      const name = POS.getSession().cashierName;
      cashierEl.textContent = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    }
  });
})();
