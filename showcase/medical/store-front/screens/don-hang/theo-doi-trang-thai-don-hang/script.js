(function () {
  var CHANNEL_META = {
    'online': { label: 'Online', badgeCls: 'badge-channel-online' },
    'hospital-tour': { label: 'Hospital Tour Visit', badgeCls: 'badge-channel-tour' },
    'event': { label: 'Event', badgeCls: 'badge-channel-event' }
  };
  var FULFILLMENT_LABEL = { 'delivery': 'Delivery to home', 'self-collection': 'Self-Collection', 'booking-confirmation': 'Booking Confirmation' };
  var ALL_STATUSES = ['Order Placed', 'Payment Confirmed', 'Processing', 'Delivered / Ready', 'Completed'];

  function qs(name) { return new URLSearchParams(window.location.search).get(name); }

  function findOrder(id) {
    var extra = CJ.storage.get('tj_last_orders', []) || [];
    return extra.find(function (o) { return o.orderId === id; }) || DATA_DON_HANG.find(function (o) { return o.orderId === id; });
  }

  function render() {
    var id = qs('id') || 'ORD-58291';
    var order = findOrder(id) || DATA_DON_HANG[0];
    document.getElementById('breadcrumb-id').textContent = order.orderId;

    var meta = CHANNEL_META[order.purchaseSource] || CHANNEL_META.online;
    var itemsHTML = order.items.map(function (i) {
      return '<div class="flex-between text-sm mb-2"><span>' + i.name + (i.variant && i.variant !== '—' ? ' — ' + i.variant : '') + ' &times;' + i.qty + '</span><span>' + CJ.formatSGD(i.unitPrice * i.qty) + '</span></div>';
    }).join('');

    var timelineHTML = order.trackingTimeline.map(function (t, idx) {
      var isLast = idx === order.trackingTimeline.length - 1;
      var cls = isLast ? 'is-active' : 'is-done';
      if (order.status === 'Cancelled' || order.status === 'RefundRequested') cls = idx === order.trackingTimeline.length - 1 ? 'is-active' : 'is-done';
      return '<div class="timeline__item ' + cls + '"><strong>' + t.status + '</strong><span>' + new Date(t.timestamp).toLocaleString('en-SG', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) + ' — ' + t.note + '</span></div>';
    }).join('');

    document.getElementById('track-root').innerHTML =
      '<div class="card mb-4">' +
        '<div class="flex-between mb-3" style="flex-wrap:wrap;gap:var(--sp-2);">' +
          '<div><span class="badge ' + meta.badgeCls + '">' + meta.label + (order.eventName ? ': ' + order.eventName : '') + '</span><h1 style="margin:6px 0 0;">Order ' + order.orderId + '</h1><p class="text-muted mb-0">Placed ' + CJ.formatDate(order.createdAt) + '</p></div>' +
          '<span class="badge badge-info" style="font-size:.85rem;padding:6px 14px;">' + order.status + '</span>' +
        '</div>' +
        '<div class="flex-gap-3 text-sm text-muted"><svg class="icon icon-sm" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' + FULFILLMENT_LABEL[order.fulfillmentMethod] + '</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:var(--sp-5);align-items:start;" id="track-grid">' +
        '<div class="card"><h3 style="margin-top:0;">Status Timeline</h3><div class="timeline">' + timelineHTML + '</div></div>' +
        '<div class="card"><h3 style="margin-top:0;">Order Summary</h3>' + itemsHTML + '<hr class="divider">' +
          '<div class="flex-between mb-2"><span class="text-muted">GST</span><span>' + CJ.formatSGD(order.gstAmount) + '</span></div>' +
          '<div class="flex-between"><span style="font-weight:700;">Total</span><strong class="cell-strong">' + CJ.formatSGD(order.total) + '</strong></div>' +
          '<a class="btn btn-outline btn-block mt-4" href="../../../screens/don-hang/lich-su-don-hang/index.html">Back to Order History</a>' +
        '</div>' +
      '</div>';
  }

  document.addEventListener('DOMContentLoaded', render);
})();
