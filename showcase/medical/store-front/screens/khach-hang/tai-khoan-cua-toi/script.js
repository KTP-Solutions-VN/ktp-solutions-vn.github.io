(function () {
  var TRACK_URL = '../../../screens/don-hang/theo-doi-trang-thai-don-hang/index.html';
  var EDIT_URL = '../../../screens/khach-hang/chinh-sua-thong-tin-ca-nhan/index.html';

  var STATUS_BADGE = {
    Placed: 'badge-info', Paid: 'badge-info', Processing: 'badge-warning', Ready: 'badge-warning',
    Completed: 'badge-success', Cancelled: 'badge-neutral', RefundRequested: 'badge-warning'
  };

  function currentCustomer() {
    var auth = CJ.getAuth();
    return DATA_KHACH_HANG.find(function (c) { return c.id === auth.customerId; }) || DATA_KHACH_HANG[0];
  }

  function render() {
    var cust = currentCustomer();
    var orders = DATA_DON_HANG.filter(function (o) { return o.customerId === cust.id; })
      .sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });
    var inProgress = orders.filter(function (o) { return o.status === 'Processing' || o.status === 'Ready'; }).length;
    var ledger = DATA_SO_GIAO_DICH_DIEM.filter(function (l) { return l.customerId === cust.id; })
      .sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    var pointsBalance = ledger.length ? ledger[0].balanceAfter : cust.loyaltyPointsBalance;

    document.getElementById('profile-first-name').textContent = cust.name.split(' ')[0];
    document.getElementById('profile-avatar').textContent = CJ.initials(cust.name);
    document.getElementById('profile-membership-line').textContent =
      (cust.membershipType !== 'None' ? cust.membershipType + ' Member · ' + cust.membershipStatus : 'No membership yet') +
      ' · CareJourney since ' + (cust.createdAt ? CJ.formatDate(cust.createdAt) : '—');

    document.getElementById('stat-points').textContent = pointsBalance.toLocaleString('en-AU');
    document.getElementById('stat-total-orders').textContent = orders.length;
    document.getElementById('stat-in-progress').textContent = inProgress;
    document.getElementById('stat-membership').textContent = cust.membershipType !== 'None' ? cust.membershipType : 'None';
    document.getElementById('stat-membership-meta').textContent = cust.membershipStatus === 'Active' && cust.memberSince
      ? 'Active since ' + CJ.formatDate(cust.memberSince)
      : (cust.membershipStatus === 'Pending' ? 'Application pending review' : 'Not enrolled');

    document.getElementById('detail-name').textContent = cust.name;
    document.getElementById('detail-otp').textContent = cust.oneMeridianPassId;
    document.getElementById('detail-email').textContent = cust.email;
    document.getElementById('detail-phone').textContent = cust.phone;

    var recentEl = document.getElementById('recent-orders');
    if (!orders.length) {
      recentEl.innerHTML = '<div class="empty-state"><svg class="icon-lg" viewBox="0 0 24 24"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/></svg><h3>No orders yet</h3><p>Start browsing to place your first order.</p></div>';
      return;
    }
    recentEl.innerHTML = orders.slice(0, 4).map(function (o) {
      var badgeCls = STATUS_BADGE[o.status] || 'badge-neutral';
      return '<div class="order-row">' +
        '<div><strong class="cell-strong">' + o.orderId + '</strong><div class="text-sm text-muted">' + CJ.formatDate(o.createdAt) + ' · ' + o.items.length + ' item(s)</div></div>' +
        '<div class="flex-gap-3"><span class="badge ' + badgeCls + '">' + o.status + '</span><span class="cell-strong">' + CJ.formatSGD(o.total) + '</span>' +
        '<a class="btn btn-sm btn-outline" href="' + TRACK_URL + '?id=' + o.orderId + '">Track</a></div>' +
      '</div>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();
    var editBtn = document.getElementById('btn-edit-profile');
    if (editBtn) editBtn.addEventListener('click', function () { window.location.href = EDIT_URL; });
  });
})();
