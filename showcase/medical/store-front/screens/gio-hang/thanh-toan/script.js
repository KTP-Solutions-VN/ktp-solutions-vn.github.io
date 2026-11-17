(function () {
  var CONFIRM_URL = '../../../screens/don-hang/xac-nhan-don-hang/index.html';

  var CHANNEL_META = {
    'online': { label: 'Online', badgeCls: 'badge-channel-online' },
    'hospital-tour': { label: 'Hospital Tour Visit', badgeCls: 'badge-channel-tour' },
    'event': { label: 'Event', badgeCls: 'badge-channel-event' }
  };
  var FULFILLMENT_LABEL = { 'delivery': 'Delivery to home address', 'self-collection': 'Self-Collection', 'booking-confirmation': 'Booking Confirmation' };

  function groupKey(item) { return item.purchaseSource + (item.eventName || ''); }
  function groupCart(items) {
    var groups = {}, order = [];
    items.forEach(function (item) {
      var key = groupKey(item);
      if (!groups[key]) { groups[key] = { source: item.purchaseSource, eventName: item.eventName, fulfillment: item.fulfillmentMethod, items: [] }; order.push(key); }
      groups[key].items.push(item);
    });
    return order.map(function (k) { return groups[k]; });
  }
  function groupSubtotal(g) { return g.items.reduce(function (s, i) { return s + i.unitPrice * i.qty; }, 0); }

  var customer, ledger, appliedDiscount, groups, subtotal;

  function computeTotals() {
    var discountAmount = 0;
    if (appliedDiscount) {
      discountAmount = appliedDiscount.type === 'percentage' ? subtotal * (appliedDiscount.value / 100) : appliedDiscount.value;
      if (discountAmount > subtotal) discountAmount = subtotal;
    }
    var afterDiscount = subtotal - discountAmount;
    var gst = afterDiscount * 0.09;

    var loyaltyToggle = document.getElementById('loyalty-toggle').checked;
    var loyaltyInput = parseInt(document.getElementById('loyalty-input').value, 10) || 0;
    var maxRedeemable = Math.min(getLoyaltyBalance(), Math.floor((afterDiscount + gst) * 100));
    var loyaltyPoints = loyaltyToggle ? Math.min(loyaltyInput, maxRedeemable) : 0;
    var loyaltyValue = loyaltyPoints * 0.01;

    var total = afterDiscount + gst - loyaltyValue;

    document.getElementById('co-subtotal').textContent = CJ.formatSGD(subtotal);
    document.getElementById('co-gst').textContent = CJ.formatSGD(gst);
    document.getElementById('co-total').textContent = CJ.formatSGD(total);
    document.getElementById('co-discount-row').style.display = discountAmount > 0 ? 'flex' : 'none';
    if (discountAmount > 0) {
      document.getElementById('co-discount').textContent = '-' + CJ.formatSGD(discountAmount);
      document.getElementById('co-discount-code').textContent = ' (' + appliedDiscount.code + ')';
    }
    document.getElementById('co-loyalty-row').style.display = loyaltyValue > 0 ? 'flex' : 'none';
    if (loyaltyValue > 0) document.getElementById('co-loyalty').textContent = '-' + CJ.formatSGD(loyaltyValue);

    return { discountAmount: discountAmount, gst: gst, afterDiscount: afterDiscount, loyaltyPoints: loyaltyPoints, loyaltyValue: loyaltyValue, total: total };
  }

  function getLoyaltyBalance() {
    var entries = ledger.filter(function (l) { return l.customerId === customer.id; }).sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    return entries.length ? entries[0].balanceAfter : customer.loyaltyPointsBalance;
  }

  function renderFulfillment() {
    document.getElementById('fulfillment-groups').innerHTML = groups.map(function (g) {
      var meta = CHANNEL_META[g.source];
      var title = meta.label + (g.eventName ? ': ' + g.eventName : '');
      var detail = '';
      if (g.fulfillment === 'delivery') detail = customer.addresses.length ? customer.addresses[0].line1 + ', Singapore ' + customer.addresses[0].postalCode : 'No saved address — add one at checkout';
      else if (g.fulfillment === 'self-collection') detail = g.eventName ? g.eventName + ' — Collection Point' : 'Meridian concierge counter';
      else detail = g.items.filter(function (i) { return i.slot; }).map(function (i) { return CJ.formatDate(i.slot.date) + ' ' + i.slot.timeSlot; }).join(', ') || 'Confirmed per selected slot';
      return '<div class="co-group-row"><span><span class="badge ' + meta.badgeCls + '">' + title + '</span> ' + FULFILLMENT_LABEL[g.fulfillment] + '</span><span class="text-sm text-muted">' + detail + '</span></div>';
    }).join('');
  }

  function renderSummaryGroups() {
    document.getElementById('checkout-summary-groups').innerHTML = groups.map(function (g) {
      var meta = CHANNEL_META[g.source];
      return '<div class="mb-3"><div class="flex-gap-2 mb-2"><span class="badge ' + meta.badgeCls + '">' + meta.label + (g.eventName ? ': ' + g.eventName : '') + '</span></div>' +
        g.items.map(function (i) { return '<div class="flex-between text-sm mb-2"><span>' + i.name + ' &times;' + i.qty + '</span><span>' + CJ.formatSGD(i.unitPrice * i.qty) + '</span></div>'; }).join('') +
      '</div>';
    }).join('');
    document.getElementById('co-order-count').textContent = groups.length;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var auth = CJ.getAuth();
    customer = DATA_KHACH_HANG.find(function (c) { return c.id === auth.customerId; }) || DATA_KHACH_HANG[0];
    ledger = DATA_SO_GIAO_DICH_DIEM;
    appliedDiscount = CJ.storage.get('tj_applied_discount', null);

    var cart = CJ.getCart();
    if (!cart.length) { window.location.href = '../../../screens/gio-hang/gio-hang/index.html'; return; }
    groups = groupCart(cart);
    subtotal = cart.reduce(function (s, i) { return s + i.unitPrice * i.qty; }, 0);

    document.getElementById('cc-name').textContent = customer.name;
    document.getElementById('cc-email').textContent = customer.email;
    document.getElementById('loyalty-balance-label').textContent = getLoyaltyBalance().toLocaleString('en-SG') + ' points available';

    var hasAssisted = cart.some(function (i) { return i.purchaseSource !== 'online'; });
    if (hasAssisted) document.getElementById('staff-assist-banner').style.display = 'block';

    renderFulfillment();
    renderSummaryGroups();
    computeTotals();

    document.getElementById('guest-toggle').addEventListener('change', function (e) {
      document.getElementById('account-contact-block').style.display = e.target.checked ? 'none' : 'block';
      document.getElementById('guest-contact-block').style.display = e.target.checked ? 'block' : 'none';
    });
    document.getElementById('loyalty-toggle').addEventListener('change', function (e) {
      document.getElementById('loyalty-input-wrap').style.display = e.target.checked ? 'block' : 'none';
      if (e.target.checked) document.getElementById('loyalty-input').value = Math.min(getLoyaltyBalance(), Math.floor(subtotal * 100));
      computeTotals();
    });
    document.getElementById('loyalty-input').addEventListener('input', computeTotals);

    document.getElementById('btn-pay').addEventListener('click', function () {
      var isGuest = document.getElementById('guest-toggle').checked;
      var errorEl = document.getElementById('checkout-error');
      if (isGuest) {
        var gName = document.getElementById('guest-name').value.trim();
        var gEmail = document.getElementById('guest-email').value.trim();
        var gPhone = document.getElementById('guest-phone').value.trim();
        if (!gName || !gEmail || !gPhone) { errorEl.classList.add('is-visible'); return; }
      }
      errorEl.classList.remove('is-visible');

      var btn = this;
      var original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Processing payment…';

      setTimeout(function () {
        var totals = computeTotals();
        var payMethod = document.querySelector('input[name="pay-method"]:checked').value;
        var referredBy = document.getElementById('referral-input').value.trim() || null;
        var now = new Date().toISOString();
        var orders = groups.map(function (g, idx) {
          var gSub = groupSubtotal(g);
          var share = gSub / subtotal;
          var gGst = totals.gst * share;
          var gDiscount = totals.discountAmount * share;
          var gLoyalty = totals.loyaltyValue * share;
          return {
            orderId: 'ORD-' + Math.floor(60000 + Math.random() * 9000) + idx,
            customerId: isGuest ? 'GUEST' : customer.id,
            customerName: isGuest ? document.getElementById('guest-name').value.trim() : customer.name,
            createdAt: now,
            status: 'Paid',
            purchaseSource: g.source,
            eventName: g.eventName,
            fulfillmentMethod: g.fulfillment,
            items: g.items,
            subtotal: gSub,
            discountCode: appliedDiscount ? appliedDiscount.code : null,
            discountAmount: gDiscount,
            gstRate: 0.09,
            gstAmount: gGst,
            loyaltyPointsUsed: Math.round(gLoyalty * 100),
            loyaltyPointsEarned: Math.round(gSub * 0.4),
            referredBy: referredBy,
            guestCheckout: isGuest,
            paymentMethod: payMethod,
            total: gSub - gDiscount + gGst - gLoyalty,
            currency: 'SGD',
            trackingTimeline: [
              { status: 'Order Placed', timestamp: now, note: 'Order placed via Guided Checkout' },
              { status: 'Payment Confirmed', timestamp: now, note: 'Paid via ' + payMethod }
            ]
          };
        });
        CJ.storage.set('tj_last_orders', orders);
        CJ.setCart([]);
        CJ.storage.remove('tj_applied_discount');
        window.location.href = CONFIRM_URL;
      }, 900);
    });
  });
})();
