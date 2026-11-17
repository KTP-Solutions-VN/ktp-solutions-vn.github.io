(function () {
  var CHECKOUT_URL = '../../../screens/gio-hang/thanh-toan/index.html';

  var CHANNEL_META = {
    'online': { label: 'Online', badgeCls: 'badge-channel-online', icon: 'monitor', bg: 'var(--channel-online-bg)', color: 'var(--channel-online)' },
    'hospital-tour': { label: 'Hospital Tour Visit', badgeCls: 'badge-channel-tour', icon: 'building', bg: 'var(--channel-tour-bg)', color: 'var(--channel-tour)' },
    'event': { label: 'Event', badgeCls: 'badge-channel-event', icon: 'ticket', bg: 'var(--channel-event-bg)', color: 'var(--channel-event)' }
  };
  var FULFILLMENT_LABEL = { 'delivery': 'Delivery to home', 'self-collection': 'Self-Collection', 'booking-confirmation': 'Booking Confirmation' };

  function seedCartIfEmpty() {
    if (CJ.getCart().length) return;
    CJ.setCart([
      { lineId: 'CL-seed-1', productId: 'PRD-1006', name: 'Prenatal Vitamins & Supplements Starter Pack', variant: '30-Day Supply', qty: 1, unitPrice: 79.00, purchaseSource: 'online', eventName: null, fulfillmentMethod: 'delivery' },
      { lineId: 'CL-seed-2', productId: 'PRD-1001', name: 'Meridian Prenatal Wellness Package', variant: '2nd Trimester Bundle', qty: 1, unitPrice: 748.00, purchaseSource: 'hospital-tour', eventName: null, fulfillmentMethod: 'booking-confirmation', slot: { date: '2026-09-22', timeSlot: '9:00 AM – 9:40 AM', location: 'Meridian Specialists Suite 5' } },
      { lineId: 'CL-seed-3', productId: 'PRD-1005', name: 'Newborn Baby Welcome Bundle', variant: '—', qty: 1, unitPrice: 328.00, purchaseSource: 'event', eventName: 'Baby Expo 2026', fulfillmentMethod: 'self-collection' },
      { lineId: 'CL-seed-4', productId: 'PRD-1008', name: 'Postnatal Recovery Spa & Wellness Voucher', variant: '60-Minute Session', qty: 1, unitPrice: 128.00, purchaseSource: 'event', eventName: 'Baby Expo 2026', fulfillmentMethod: 'self-collection' }
    ]);
  }

  var appliedDiscount = null;

  function groupKey(item) { return item.purchaseSource + (item.eventName || ''); }

  function groupCart(items) {
    var groups = {};
    var order = [];
    items.forEach(function (item) {
      var key = groupKey(item);
      if (!groups[key]) { groups[key] = { source: item.purchaseSource, eventName: item.eventName, fulfillment: item.fulfillmentMethod, items: [] }; order.push(key); }
      groups[key].items.push(item);
    });
    return order.map(function (k) { return groups[k]; });
  }

  function groupSubtotal(g) { return g.items.reduce(function (s, i) { return s + i.unitPrice * i.qty; }, 0); }

  function renderIcon(key) {
    var icons = {
      monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
      building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h6M9 11h6M9 15h2"/>',
      ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>'
    };
    return '<svg class="icon" viewBox="0 0 24 24">' + icons[key] + '</svg>';
  }

  function render() {
    var cart = CJ.getCart();
    var groupsWrap = document.getElementById('cart-groups');

    if (!cart.length) {
      groupsWrap.innerHTML = '<div class="card empty-state"><svg class="icon-lg" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><h3>Your cart is empty</h3><p>Browse our packages and services to get started.</p><a class="btn btn-primary mt-3" href="../../../screens/san-pham-dich-vu/danh-sach-san-pham-dich-vu/index.html">Shop Now</a></div>';
      updateSummary(0, 0);
      return;
    }

    var groups = groupCart(cart);
    groupsWrap.innerHTML = groups.map(function (g) {
      var meta = CHANNEL_META[g.source];
      var title = meta.label + (g.eventName ? ': ' + g.eventName : '');
      var sub = groupSubtotal(g);
      return '<div class="channel-group">' +
        '<div class="channel-group__head">' +
          '<div class="channel-group__title"><span class="channel-icon" style="background:' + meta.bg + ';color:' + meta.color + ';">' + renderIcon(meta.icon) + '</span>' + title + '<span class="badge ' + meta.badgeCls + '">' + g.items.length + ' item(s)</span></div>' +
          '<span class="badge badge-neutral">' + FULFILLMENT_LABEL[g.fulfillment] + '</span>' +
        '</div>' +
        g.items.map(function (item) { return cartLineHTML(item); }).join('') +
        '<div class="flex-between" style="padding:var(--sp-3) var(--sp-4);background:var(--gray-50);"><span class="text-sm text-muted">Group subtotal</span><strong>' + CJ.formatSGD(sub) + '</strong></div>' +
      '</div>';
    }).join('');

    document.querySelectorAll('[data-qty-plus]').forEach(function (btn) { btn.addEventListener('click', function () { changeQty(btn.getAttribute('data-qty-plus'), 1); }); });
    document.querySelectorAll('[data-qty-minus]').forEach(function (btn) { btn.addEventListener('click', function () { changeQty(btn.getAttribute('data-qty-minus'), -1); }); });
    document.querySelectorAll('[data-remove-line]').forEach(function (btn) { btn.addEventListener('click', function () { removeLine(btn.getAttribute('data-remove-line')); }); });

    var subtotal = cart.reduce(function (s, i) { return s + i.unitPrice * i.qty; }, 0);
    updateSummary(subtotal, cart.length);
  }

  function cartLineHTML(item) {
    var slotInfo = item.slot ? '<div class="text-sm text-muted">' + CJ.formatDate(item.slot.date) + ' · ' + item.slot.timeSlot + '</div>' : '';
    return '<div class="cart-line">' +
      '<div class="cart-line__media"><svg class="icon" viewBox="0 0 24 24"><path d="M12 21s-8-4.6-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.4-8 11-8 11z"/></svg></div>' +
      '<div class="cart-line__body"><strong>' + item.name + '</strong><div class="text-sm text-muted">' + item.variant + '</div>' + slotInfo + '</div>' +
      '<div class="qty-stepper"><button data-qty-minus="' + item.lineId + '" aria-label="Decrease">&minus;</button><span>' + item.qty + '</span><button data-qty-plus="' + item.lineId + '" aria-label="Increase">+</button></div>' +
      '<div style="width:90px;text-align:right;"><strong class="cell-strong">' + CJ.formatSGD(item.unitPrice * item.qty) + '</strong></div>' +
      '<button class="icon-btn" style="background:none;border:none;color:var(--gray-400);" data-remove-line="' + item.lineId + '" aria-label="Remove"><svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>' +
    '</div>';
  }

  function changeQty(lineId, delta) {
    var cart = CJ.getCart();
    var item = cart.find(function (i) { return i.lineId === lineId; });
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    CJ.setCart(cart);
    render();
  }

  function removeLine(lineId) {
    var cart = CJ.getCart().filter(function (i) { return i.lineId !== lineId; });
    CJ.setCart(cart);
    CJ.toast('Item removed from cart.', 'warning');
    render();
  }

  function updateSummary(subtotal, itemCount) {
    var discountAmount = 0;
    if (appliedDiscount) {
      discountAmount = appliedDiscount.type === 'percentage' ? subtotal * (appliedDiscount.value / 100) : appliedDiscount.value;
      if (discountAmount > subtotal) discountAmount = subtotal;
    }
    var afterDiscount = subtotal - discountAmount;
    var gst = afterDiscount * 0.09;
    var total = afterDiscount + gst;

    document.getElementById('sum-subtotal').textContent = CJ.formatSGD(subtotal);
    document.getElementById('sum-gst').textContent = CJ.formatSGD(gst);
    document.getElementById('sum-total').textContent = CJ.formatSGD(total);
    var discountRow = document.getElementById('sum-discount-row');
    if (discountAmount > 0) {
      discountRow.style.display = 'flex';
      document.getElementById('sum-discount').textContent = '-' + CJ.formatSGD(discountAmount);
    } else {
      discountRow.style.display = 'none';
    }
    document.getElementById('btn-checkout').disabled = itemCount === 0;
    CJ.storage.set('tj_applied_discount', appliedDiscount);
  }

  document.addEventListener('DOMContentLoaded', function () {
    seedCartIfEmpty();
    appliedDiscount = CJ.storage.get('tj_applied_discount', null);
    render();

    document.getElementById('btn-apply-discount').addEventListener('click', function () {
      var code = document.getElementById('discount-input').value.trim().toUpperCase();
      var errorEl = document.getElementById('discount-error');
      var match = DATA_MA_GIAM_GIA.find(function (d) { return d.code === code && d.status === 'active'; });
      if (!match) {
        errorEl.classList.add('is-visible');
        appliedDiscount = null;
        render();
        return;
      }
      errorEl.classList.remove('is-visible');
      appliedDiscount = match;
      CJ.toast('Discount code "' + code + '" applied.', 'success');
      render();
    });

    document.getElementById('btn-checkout').addEventListener('click', function () {
      window.location.href = CHECKOUT_URL;
    });
  });
})();
