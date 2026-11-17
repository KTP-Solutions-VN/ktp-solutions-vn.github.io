(function () {
  var TRACK_URL = '../../../screens/don-hang/theo-doi-trang-thai-don-hang/index.html';
  var CHANNEL_META = {
    'online': { label: 'Online', badgeCls: 'badge-channel-online' },
    'hospital-tour': { label: 'Hospital Tour Visit', badgeCls: 'badge-channel-tour' },
    'event': { label: 'Event', badgeCls: 'badge-channel-event' }
  };

  function render() {
    var orders = CJ.storage.get('tj_last_orders', null);
    if (!orders || !orders.length) {
      orders = [DATA_DON_HANG.find(function (o) { return o.orderId === 'ORD-58291'; })];
    }
    document.getElementById('confirm-sub').textContent = orders.length > 1
      ? orders.length + ' separate confirmation emails have been sent — one per purchase channel.'
      : 'A confirmation email has been sent with your order details.';

    document.getElementById('orders-list').innerHTML = orders.map(function (o) {
      var meta = CHANNEL_META[o.purchaseSource] || CHANNEL_META.online;
      return '<div class="card order-confirm-card">' +
        '<div class="flex-between mb-3" style="flex-wrap:wrap;gap:var(--sp-2);">' +
          '<div><span class="badge ' + meta.badgeCls + '">' + meta.label + (o.eventName ? ': ' + o.eventName : '') + '</span><h3 style="margin:6px 0 0;">Order ' + o.orderId + '</h3></div>' +
          '<span class="badge badge-success">' + o.status + '</span>' +
        '</div>' +
        o.items.map(function (i) { return '<div class="flex-between text-sm mb-2"><span>' + i.name + (i.variant && i.variant !== '—' ? ' — ' + i.variant : '') + ' &times;' + i.qty + '</span><span>' + CJ.formatSGD(i.unitPrice * i.qty) + '</span></div>'; }).join('') +
        '<hr class="divider">' +
        '<div class="flex-between mb-2"><span class="text-muted">Payment Method</span><span>' + o.paymentMethod + '</span></div>' +
        '<div class="flex-between mb-2"><span class="text-muted">Total Paid</span><strong class="cell-strong">' + CJ.formatSGD(o.total) + '</strong></div>' +
        (o.loyaltyPointsEarned ? '<div class="flex-between mb-2"><span class="text-muted">Loyalty Points Earned</span><span style="color:var(--accent-dark);font-weight:700;">+' + o.loyaltyPointsEarned + ' pts</span></div>' : '') +
        '<a class="btn btn-outline btn-sm mt-2" href="' + TRACK_URL + '?id=' + o.orderId + '">Track this order</a>' +
      '</div>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', render);
})();
