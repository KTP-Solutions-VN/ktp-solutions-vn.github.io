
  document.getElementById('exportBtn').addEventListener('click', function () { CJToast('Report exported (demo).'); });
  
    document.getElementById('listTbody').innerHTML = DATA_SO_GIAO_DICH_DIEM.map(function (l) {
      var map = {Earned:'success',Redeemed:'info','Manual Adjustment':'warning',Expired:'error'};
      return '<tr><td class="cell-strong">' + l.customerName + '</td><td>' + CJBadge(l.type, map) + '</td><td class="tabular-nums">' + (l.points > 0 ? '+' : '') + l.points + '</td><td>' + (l.orderId || '—') + '</td><td class="tabular-nums">' + l.balance + '</td><td>' + l.at + '</td></tr>';
    }).join('');
    
  