
  var DATA = DATA_KHACH_HANG;
  var searchEl = document.getElementById('tbSearch');
  function render() {
    var s = (searchEl.value || '').toLowerCase();
    var list = DATA.filter(function (o) { return !s || (String(o.name).toLowerCase().indexOf(s) > -1 || String(o.email).toLowerCase().indexOf(s) > -1 || String(o.phone).toLowerCase().indexOf(s) > -1); });
    var tbody = document.getElementById('listTbody');
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="7"><div class="empty-state"><div class="es-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div><h3>No customers found</h3><p>Try adjusting your search.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (o) { return '<tr>' + '<td class="cell-strong"><a href="../../../screens/khach-hang/chi-tiet-khach-hang/index.html?id=' + o.id + '" class="openCustomerLink" data-id="' + o.id + '">' + o.name + '</a></td>' + '<td>' + o.email + '<div style="font-size:11.5px;color:var(--gray-500);">' + o.phone + '</div></td>' + '<td>' + o.segment.map(function(s){return '<span class="badge badge-primary" style="margin-right:3px;">' + s + '</span>';}).join('') + '</td>' + '<td>' + (o.membership === 'None' ? '—' : '<span class="badge badge-info">' + o.membership + '</span>') + '</td>' + '<td>' + o.acquisitionSource + '</td>' + '<td>' + CJBadge(o.status, {Active:'success','Pending Deletion':'warning',Deleted:'error'}) + '</td>' + '<td class="row-actions"><a class="btn btn-ghost btn-sm btn-icon-only openCustomerLink" href="../../../screens/khach-hang/chi-tiet-khach-hang/index.html?id=' + o.id + '" data-id="' + o.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"></path><circle cx="12" cy="12" r="3"></circle></svg></a></td>' + '</tr>'; }).join('');
    document.querySelectorAll('.openCustomerLink').forEach(function (link) {
      link.addEventListener('click', function (e) { e.preventDefault(); openCustomerDrawer(link.getAttribute('data-id')); });
    });
  }
  searchEl.addEventListener('input', render);

  /* ---------------- #35 Customer Detail drawer ---------------------------- */
  CJDrawer.bind('customerDetailOverlay');
  function openCustomerDrawer(id) {
    var c = DATA.find(function (x) { return x.id === id; });
    if (!c) return;
    document.getElementById('dcAvatar').textContent = c.name.split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('');
    document.getElementById('dcName').textContent = c.name;
    document.getElementById('dcEmail').textContent = c.email + ' · ' + c.id;
    document.getElementById('dcStatusBadge').innerHTML = CJBadge(c.status, { Active: 'success', 'Pending Deletion': 'warning', Deleted: 'error' });
    var phoneInput = document.getElementById('dcPhone');
    phoneInput.value = c.phone;
    phoneInput.disabled = true;
    document.getElementById('dcSource').value = c.acquisitionSource;
    document.getElementById('dcJoined').value = c.joinedAt;
    document.getElementById('dcSegments').innerHTML = c.segment.map(function (s) { return '<span class="badge badge-primary">' + s + '</span>'; }).join('') || '<span style="color:var(--gray-500);font-size:12.5px;">No segments assigned.</span>';
    document.getElementById('dcPoints').textContent = c.loyaltyPoints.toLocaleString();
    var orders = (typeof DATA_DON_HANG !== 'undefined' ? DATA_DON_HANG : []).filter(function (o) { return o.customerId === c.id; });
    document.getElementById('dcOrders').innerHTML = orders.length ? orders.map(function (o) {
      return '<tr><td class="cell-strong"><a href="../../../screens/don-hang/danh-sach-don-hang/index.html?openOrder=' + o.id + '">' + o.id + '</a></td><td>' + o.createdAt.split(' ')[0] + '</td><td>' + CJBadge(o.status, { Completed: 'success', Cancelled: 'error', Refunded: 'neutral' }) + '</td><td class="tabular-nums">SGD ' + o.total.toFixed(2) + '</td></tr>';
    }).join('') : '<tr><td colspan="4" style="text-align:center;color:var(--gray-500);padding:var(--sp-4);">No orders yet.</td></tr>';
    document.getElementById('dcEditBtn').onclick = function () {
      phoneInput.disabled = false;
      phoneInput.focus();
      CJToast('Editing enabled — phone number is now editable (demo only).');
    };
    CJDrawer.open('customerDetailOverlay');
  }

  function handleDeepLink() {
    var id = new URLSearchParams(window.location.search).get('openId');
    if (id) { openCustomerDrawer(id); }
  }

  render();
  handleDeepLink();
