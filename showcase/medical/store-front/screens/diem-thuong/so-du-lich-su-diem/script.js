(function () {
  var TYPE_BADGE = { Earned: 'badge-success', Redeemed: 'badge-info', Expired: 'badge-neutral', Adjusted: 'badge-warning' };

  function render() {
    var auth = CJ.getAuth();
    var customer = DATA_KHACH_HANG.find(function (c) { return c.id === auth.customerId; }) || DATA_KHACH_HANG[0];
    var entries = DATA_SO_GIAO_DICH_DIEM.filter(function (l) { return l.customerId === customer.id; })
      .sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

    var balance = entries.length ? entries[0].balanceAfter : customer.loyaltyPointsBalance;
    var lifetime = entries.filter(function (e) { return e.type === 'Earned'; }).reduce(function (s, e) { return s + e.points; }, 0);
    var expiring = entries.filter(function (e) { return e.type === 'Earned' && e.expiresOn && new Date(e.expiresOn) < new Date('2027-01-01'); });
    var expiringPoints = expiring.reduce(function (s, e) { return s + e.points; }, 0);

    document.getElementById('loy-balance').textContent = balance.toLocaleString('en-AU');
    document.getElementById('loy-lifetime').textContent = lifetime.toLocaleString('en-AU');
    document.getElementById('loy-expiring').textContent = expiringPoints.toLocaleString('en-AU');
    document.getElementById('loy-expiring-meta').textContent = expiring.length ? 'Expiring by ' + CJ.formatDate(expiring[0].expiresOn) : 'No points expiring soon';

    var tbody = document.getElementById('loyalty-tbody');
    if (!entries.length) {
      tbody.innerHTML = '<tr><td colspan="5"><div class="empty-state"><h3>No transactions yet</h3><p>Points will appear here after your first order.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = entries.map(function (e) {
      return '<tr>' +
        '<td data-label="Date">' + CJ.formatDate(e.date) + '</td>' +
        '<td data-label="Type"><span class="badge ' + (TYPE_BADGE[e.type] || 'badge-neutral') + '">' + e.type + '</span></td>' +
        '<td data-label="Description">' + e.description + '</td>' +
        '<td data-label="Points" class="' + (e.points > 0 ? '' : '') + '" style="color:' + (e.points > 0 ? 'var(--success)' : 'var(--gray-600)') + ';font-weight:700;">' + (e.points > 0 ? '+' : '') + e.points + '</td>' +
        '<td data-label="Balance After">' + e.balanceAfter.toLocaleString('en-AU') + '</td>' +
      '</tr>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', render);
})();
