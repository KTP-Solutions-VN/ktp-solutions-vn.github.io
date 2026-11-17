
  var DATA = DATA_QUA_TANG_KEM;
  var searchEl = document.getElementById('tbSearch');
  function render() {
    var s = (searchEl.value || '').toLowerCase();
    var list = DATA.filter(function (o) { return !s || (String(o.name).toLowerCase().indexOf(s) > -1 || String(o.giftName).toLowerCase().indexOf(s) > -1); });
    var tbody = document.getElementById('listTbody');
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><div class="es-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7Z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z"></path></svg></div><h3>No gift rules configured</h3><p>Try adjusting your search.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (o) { return '<tr>' + '<td class="cell-strong">' + o.name + '</td>' + '<td>' + o.conditionType + ': ' + o.conditionValue + '</td>' + '<td>' + o.giftName + ' (' + o.giftSku + ')</td>' + '<td>' + o.fulfillmentPartner + '</td>' + '<td>' + CJBadge(o.status, {Active:'success',Inactive:'neutral'}) + '</td>' + '<td class="row-actions"><button class="btn btn-ghost btn-sm btn-icon-only"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg></button></td>' + '</tr>'; }).join('');
  }
  searchEl.addEventListener('input', render);
  render();
  
  