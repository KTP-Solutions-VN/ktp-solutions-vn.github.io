
  document.getElementById('exportBtn').addEventListener('click', function () { CJToast('Report exported (demo).'); });
  
    var colors = { Event: '#B9770E', 'Hospital Tour': '#2A5DA6', Online: '#019770', Retail: '#4C5FFF' };
    var totals = {};
    DATA_DON_HANG.forEach(function (o) { totals[o.purchaseSource] = (totals[o.purchaseSource] || 0) + o.total; });
    var max = Math.max.apply(null, Object.values(totals));
    document.getElementById('barChart').innerHTML = Object.keys(totals).map(function (k) {
      var h = Math.max(8, (totals[k] / max) * 140);
      return '<div style="flex:1;text-align:center;"><div style="height:' + h + 'px;background:' + colors[k] + ';border-radius:6px 6px 0 0;"></div><div style="font-size:11px;color:var(--gray-500);margin-top:6px;">' + k + '</div><div style="font-size:12px;font-weight:700;color:var(--primary-dark);">SGD ' + totals[k].toFixed(0) + '</div></div>';
    }).join('');
    document.getElementById('listTbody').innerHTML = DATA_DON_HANG.map(function (o) {
      return '<tr><td class="cell-strong">' + o.id + '</td><td>' + o.customerName + '</td><td>' + o.purchaseSource + '</td><td class="tabular-nums">' + (o.subtotal).toFixed(2) + '</td><td class="tabular-nums">' + o.discount.toFixed(2) + '</td><td class="tabular-nums cell-strong">' + o.total.toFixed(2) + '</td></tr>';
    }).join('');
    
  