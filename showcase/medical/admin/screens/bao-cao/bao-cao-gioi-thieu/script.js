
  document.getElementById('exportBtn').addEventListener('click', function () { CJToast('Report exported (demo).'); });
  
    var rows = DATA_DON_HANG.filter(function (o) { return o.referredBy; });
    document.getElementById('listTbody').innerHTML = rows.map(function (o) {
      return '<tr><td class="cell-strong">' + o.id + '</td><td>' + o.customerName + '</td><td>' + o.referredBy + '</td><td class="tabular-nums">AUD ' + o.total.toFixed(2) + '</td></tr>';
    }).join('') || '<tr><td colspan="4" style="text-align:center;color:var(--gray-500);padding:var(--sp-6);">No referred orders in this period.</td></tr>';
    
  