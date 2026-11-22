
  document.getElementById('exportBtn').addEventListener('click', function () { CJToast('Report exported (demo).'); });
  
    document.getElementById('listTbody').innerHTML = DATA_YEU_CAU_HOAN_TIEN.map(function (r) {
      return '<tr><td class="cell-strong">' + r.id + '</td><td>' + r.orderId + '</td><td>' + r.customerName + '</td><td class="tabular-nums">AUD ' + r.amount.toFixed(2) + '</td><td>' + CJBadge(r.status, {Initiated:'info','Pending Approval':'warning',Approved:'success',Rejected:'error','Refund API Sent':'primary',Completed:'success'}) + '</td></tr>';
    }).join('');
    
  