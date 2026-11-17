
  document.getElementById('exportBtn').addEventListener('click', function () { CJToast('Report exported (demo).'); });
  
    document.getElementById('listTbody').innerHTML = DATA_MA_GIAM_GIA.map(function (p) {
      return '<tr><td class="cell-strong">' + p.name + '</td><td><code>' + p.code + '</code></td><td>' + p.type + '</td><td class="tabular-nums">' + p.usedCount + ' / ' + p.usageLimit + '</td><td>' + CJBadge(p.status, {Draft:'neutral',Scheduled:'info',Active:'success',Expired:'error'}) + '</td></tr>';
    }).join('');
    
  