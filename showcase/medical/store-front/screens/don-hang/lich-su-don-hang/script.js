(function () {
  var TRACK_URL = '../../../screens/don-hang/theo-doi-trang-thai-don-hang/index.html';
  var STATUS_BADGE = {
    Placed: 'badge-info', Paid: 'badge-info', Processing: 'badge-warning', Ready: 'badge-warning',
    Completed: 'badge-success', Cancelled: 'badge-neutral', RefundRequested: 'badge-warning'
  };
  var CHANNEL_META = {
    'online': { label: 'Online', badgeCls: 'badge-channel-online' },
    'hospital-tour': { label: 'Hospital Tour', badgeCls: 'badge-channel-tour' },
    'event': { label: 'Event', badgeCls: 'badge-channel-event' }
  };
  var state = { q: '', status: 'all', channel: 'all' };

  function getOrders() {
    var auth = CJ.getAuth();
    var extra = CJ.storage.get('tj_last_orders', []) || [];
    var mine = DATA_DON_HANG.filter(function (o) { return o.customerId === auth.customerId; });
    var extraMine = extra.filter(function (o) { return o.customerId === auth.customerId || o.guestCheckout; });
    return extraMine.concat(mine).sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });
  }

  function renderChips() {
    var wrap = document.getElementById('channel-chips');
    var opts = [['all', 'All Channels']].concat(Object.keys(CHANNEL_META).map(function (k) { return [k, CHANNEL_META[k].label]; }));
    wrap.innerHTML = opts.map(function (o) { return '<button class="chip' + (state.channel === o[0] ? ' is-active' : '') + '" data-channel="' + o[0] + '">' + o[1] + '</button>'; }).join('');
    wrap.querySelectorAll('[data-channel]').forEach(function (btn) { btn.addEventListener('click', function () { state.channel = btn.getAttribute('data-channel'); render(); }); });
  }

  function render() {
    renderChips();
    var orders = getOrders().filter(function (o) {
      if (state.status !== 'all' && o.status !== state.status) return false;
      if (state.channel !== 'all' && o.purchaseSource !== state.channel) return false;
      if (state.q) {
        var q = state.q.toLowerCase();
        var hit = o.orderId.toLowerCase().indexOf(q) > -1 || o.items.some(function (i) { return i.name.toLowerCase().indexOf(q) > -1; });
        if (!hit) return false;
      }
      return true;
    });

    var tbody = document.getElementById('orders-tbody');
    var empty = document.getElementById('orders-empty');
    var table = document.getElementById('orders-table');
    if (!orders.length) {
      table.style.display = 'none';
      empty.style.display = 'block';
      empty.innerHTML = '<div class="empty-state"><svg class="icon-lg" viewBox="0 0 24 24"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/></svg><h3>No orders found</h3><p>Try a different filter or search term.</p></div>';
      return;
    }
    table.style.display = '';
    empty.style.display = 'none';
    tbody.innerHTML = orders.map(function (o) {
      var meta = CHANNEL_META[o.purchaseSource] || CHANNEL_META.online;
      return '<tr>' +
        '<td data-label="Order ID"><a class="cell-strong" href="' + TRACK_URL + '?id=' + o.orderId + '">' + o.orderId + '</a></td>' +
        '<td data-label="Date">' + CJ.formatDate(o.createdAt) + '</td>' +
        '<td data-label="Channel"><span class="badge ' + meta.badgeCls + '">' + meta.label + (o.eventName ? ': ' + o.eventName : '') + '</span></td>' +
        '<td data-label="Items">' + o.items.length + ' item(s)</td>' +
        '<td data-label="Status"><span class="badge ' + (STATUS_BADGE[o.status] || 'badge-neutral') + '">' + o.status + '</span></td>' +
        '<td data-label="Total">' + CJ.formatSGD(o.total) + '</td>' +
        '<td data-label=""><a class="btn btn-sm btn-outline" href="' + TRACK_URL + '?id=' + o.orderId + '">Track</a></td>' +
      '</tr>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('order-search').addEventListener('input', function (e) { state.q = e.target.value; render(); });
    document.getElementById('filter-status').addEventListener('change', function (e) { state.status = e.target.value; render(); });
    render();
  });
})();
