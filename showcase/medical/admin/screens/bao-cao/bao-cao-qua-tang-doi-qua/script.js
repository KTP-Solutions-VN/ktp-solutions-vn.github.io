
  document.getElementById('exportBtn').addEventListener('click', function () { CJToast('Report exported (demo).'); });
  
    document.getElementById('listTbody').innerHTML = DATA_QUA_TANG_KEM.map(function (g) {
      return '<tr><td class="cell-strong">' + g.name + '</td><td>' + g.giftName + '</td><td class="tabular-nums">' + g.ordersApplied + '</td><td class="tabular-nums">' + g.collectionStatus.pending + '</td><td class="tabular-nums">' + g.collectionStatus.collected + '</td><td class="tabular-nums">' + g.collectionStatus.shipped + '</td></tr>';
    }).join('');
    
  