
  var DATA = DATA_NHOM_KHACH_HANG;
  var searchEl = document.getElementById('tbSearch');
  function render() {
    var s = (searchEl.value || '').toLowerCase();
    var list = DATA.filter(function (o) { return !s || (String(o.name).toLowerCase().indexOf(s) > -1); });
    var tbody = document.getElementById('listTbody');
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><div class="es-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div><h3>No segments found</h3><p>Try adjusting your search.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (o) { return '<tr>' + '<td class="cell-strong">' + o.name + '</td>' + '<td>' + CJBadge(o.ruleType, {Automatic:'info',Manual:'neutral'}) + '</td>' + '<td>' + o.condition + '</td>' + '<td class="tabular-nums">' + o.memberCount + '</td>' + '<td>' + (o.usedInPromotions.length ? o.usedInPromotions.join(', ') : '—') + '</td>' + '<td class="row-actions"><button class="btn btn-ghost btn-sm btn-icon-only"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"></path><circle cx="12" cy="12" r="3"></circle></svg></button></td>' + '</tr>'; }).join('');
  }
  searchEl.addEventListener('input', render);
  render();
  
  