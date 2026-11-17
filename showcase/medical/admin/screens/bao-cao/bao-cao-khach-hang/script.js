
  document.getElementById('exportBtn').addEventListener('click', function () { CJToast('Report exported (demo).'); });
  
    document.getElementById('listTbody').innerHTML = DATA_KHACH_HANG.map(function (c) {
      function c2(v) { return v ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-neutral">No</span>'; }
      return '<tr><td class="cell-strong">' + c.name + '</td><td>' + c.segment.join(', ') + '</td><td>' + c.joinedAt + '</td><td>' + c2(c.consent.email) + '</td><td>' + c2(c.consent.phone) + '</td><td>' + c2(c.consent.sms) + '</td></tr>';
    }).join('');
    
  