
  document.getElementById('exportBtn').addEventListener('click', function () { CJToast('Report exported (demo).'); });
  
    document.getElementById('listTbody').innerHTML = DATA_LICH_DAT_DICH_VU.map(function (s) {
      return '<tr><td class="cell-strong">' + s.productName + '</td><td>' + s.date + ' ' + s.time + '</td><td class="tabular-nums">' + s.capacity + '</td><td class="tabular-nums">' + s.booked + '</td><td>' + CJBadge(s.status, {Scheduled:'info',Confirmed:'success',Rescheduled:'warning',Cancelled:'error',Completed:'neutral'}) + '</td></tr>';
    }).join('');
    
  