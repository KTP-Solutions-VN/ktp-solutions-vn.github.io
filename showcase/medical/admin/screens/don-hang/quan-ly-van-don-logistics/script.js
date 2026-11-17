
  var rows = DATA_DON_HANG.filter(function (o) { return o.fulfillmentMethod === 'Delivery' || o.fulfillmentMethod === 'Self-collection'; });
  document.getElementById('tbody').innerHTML = rows.map(function (o) {
    var badgeClass = {"Cart":"neutral","Ordered":"info","Paid":"info","Processing":"warning","Delivered":"success","Ready for Collection":"success","Completed":"success","Cancelled":"error","Refunded":"neutral"}[o.status] || 'neutral';
    return '<tr><td class="cell-strong"><a href="../../../screens/don-hang/chi-tiet-don-hang/index.html?id=' + o.id + '">' + o.id + '</a></td><td>' + o.customerName + '</td><td>' + o.fulfillmentMethod + '</td>' +
      '<td>' + (o.trackingNo || '<span style="color:var(--gray-400);">— not assigned —</span>') + '</td>' +
      '<td><span class="badge badge-' + badgeClass + '">' + o.status + '</span></td><td>' + o.updatedAt + '</td>' +
      '<td class="row-actions"><button class="btn btn-ghost btn-sm">Update tracking</button></td></tr>';
  }).join('');
  