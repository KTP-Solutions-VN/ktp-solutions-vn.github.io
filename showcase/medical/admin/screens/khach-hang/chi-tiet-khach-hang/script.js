
  var id = new URLSearchParams(window.location.search).get('id') || DATA_KHACH_HANG[0].id;
  var c = DATA_KHACH_HANG.find(function (x) { return x.id === id; });
  if (!c) { document.getElementById('notFound').style.display = 'block'; document.getElementById('content').style.display = 'none'; }
  else {
    document.getElementById('custAvatar').textContent = c.name.split(' ').map(function(w){return w[0];}).slice(0,2).join('');
    document.getElementById('custName').textContent = c.name;
    document.getElementById('custEmail').textContent = c.email + ' · ' + c.id;
    document.getElementById('custStatusBadge').innerHTML = CJBadge(c.status, {Active:'success','Pending Deletion':'warning',Deleted:'error'});
    document.getElementById('custPhone').value = c.phone;
    document.getElementById('custSource').value = c.acquisitionSource;
    document.getElementById('custJoined').value = c.joinedAt;
    document.getElementById('custSegments').innerHTML = c.segment.map(function (s) { return '<span class="badge badge-primary">' + s + '</span>'; }).join('') || '<span style="color:var(--gray-500);font-size:12.5px;">No segments assigned.</span>';
    document.getElementById('custPoints').textContent = c.loyaltyPoints.toLocaleString();
    var orders = DATA_DON_HANG.filter(function (o) { return o.customerId === c.id; });
    document.getElementById('custOrders').innerHTML = orders.length ? orders.map(function (o) {
      return '<tr><td class="cell-strong"><a href="../../../screens/don-hang/chi-tiet-don-hang/index.html?id=' + o.id + '">' + o.id + '</a></td><td>' + o.createdAt.split(' ')[0] + '</td><td>' + CJBadge(o.status, {Completed:'success',Cancelled:'error',Refunded:'neutral'}) + '</td><td class="tabular-nums">SGD ' + o.total.toFixed(2) + '</td></tr>';
    }).join('') : '<tr><td colspan="4" style="text-align:center;color:var(--gray-500);padding:var(--sp-4);">No orders yet.</td></tr>';
    document.getElementById('editBtn').addEventListener('click', function () {
      document.getElementById('custPhone').disabled = false;
      CJToast('Editing enabled — phone number is now editable (demo only).');
    });
  }
  