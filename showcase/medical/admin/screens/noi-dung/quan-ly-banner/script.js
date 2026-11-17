
  var DATA = DATA_BANNER;
  var searchEl = document.getElementById('tbSearch');
  function render() {
    var s = (searchEl.value || '').toLowerCase();
    var list = DATA.filter(function (o) { return !s || (String(o.name).toLowerCase().indexOf(s) > -1); });
    var tbody = document.getElementById('listTbody');
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><div class="es-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div><h3>No banners found</h3><p>Try adjusting your search.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (o) { return '<tr>' + '<td class="cell-strong">' + o.name + '</td>' + '<td>' + o.placement + '</td>' + '<td>' + o.startDate + ' → ' + o.endDate + '</td>' + '<td style="font-size:12px;color:var(--gray-500);">' + o.personalizationRule + '</td>' + '<td>' + CJBadge(o.status, {Active:'success',Scheduled:'info',Expired:'error'}) + '</td>' + '<td class="row-actions"><button class="btn btn-ghost btn-sm btn-icon-only"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg></button></td>' + '</tr>'; }).join('');
  }
  searchEl.addEventListener('input', render);
  render();
  
  