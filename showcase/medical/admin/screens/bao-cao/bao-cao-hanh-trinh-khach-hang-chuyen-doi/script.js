
  document.getElementById('exportBtn').addEventListener('click', function () { CJToast('Report exported (demo).'); });
  
    document.getElementById('listTbody').innerHTML = DATA_THONG_TIN_LIEN_HE_SU_KIEN.map(function (l) {
      return '<tr><td class="cell-strong">' + l.name + '</td><td>' + l.boothCampaign + '</td><td>' + CJBadge(l.status, {Captured:'neutral',Contacted:'info',Converted:'success',Expired:'error'}) + '</td><td>' + (l.convertedOrderId || '—') + '</td><td>' + l.capturedAt + '</td></tr>';
    }).join('');
    
  