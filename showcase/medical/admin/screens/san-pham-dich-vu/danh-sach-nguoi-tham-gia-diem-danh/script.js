
  var sel = document.getElementById('sessionSelect');
  DATA_LICH_DAT_DICH_VU.forEach(function (s) {
    var o = document.createElement('option'); o.value = s.id; o.textContent = s.productName + ' — ' + s.date + ' ' + s.time;
    sel.appendChild(o);
  });
  var qSession = new URLSearchParams(window.location.search).get('session');
  if (qSession) sel.value = qSession;

  function render() {
    var s = DATA_LICH_DAT_DICH_VU.find(function (x) { return x.id === sel.value; });
    document.getElementById('sessionMeta').textContent = s.booked + '/' + s.capacity + ' registered · ' + s.staffInCharge;
    var tbody = document.getElementById('listTbody');
    if (!s.attendees.length) { tbody.innerHTML = '<tr><td colspan="3"><div class="empty-state"><div class="es-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div><h3>No attendees recorded</h3><p>This session has no registrants yet.</p></div></td></tr>'; return; }
    tbody.innerHTML = s.attendees.map(function (a) {
      var val = a.attended === true ? 'Present' : (a.attended === false ? 'Absent' : 'Not marked');
      var cls = a.attended === true ? 'success' : (a.attended === false ? 'error' : 'neutral');
      return '<tr><td class="cell-strong">' + a.name + '</td><td>' + a.customerId + '</td><td><span class="badge badge-' + cls + '">' + val + '</span></td></tr>';
    }).join('');
  }
  sel.addEventListener('change', render);
  document.getElementById('exportBtn').addEventListener('click', function () { CJToast('Check-in list exported (demo).'); });
  render();
  