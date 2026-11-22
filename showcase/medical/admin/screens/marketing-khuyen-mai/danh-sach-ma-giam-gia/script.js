
  var STORE_KEY = 'admin_promos';
  function getData() { return CJStore.mergeOverrides(DATA_MA_GIAM_GIA, STORE_KEY, 'id').concat(CJStore.getExtra(STORE_KEY)); }
  var searchEl = document.getElementById('tbSearch');
  function render() {
    var s = (searchEl.value || '').toLowerCase();
    var list = getData().filter(function (o) { return !s || (String(o.name).toLowerCase().indexOf(s) > -1 || String(o.code).toLowerCase().indexOf(s) > -1); });
    var tbody = document.getElementById('listTbody');
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="8"><div class="empty-state"><div class="es-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg></div><h3>No promotions found</h3><p>Try adjusting your search.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (o) { return '<tr>' + '<td class="cell-strong">' + o.name + '</td>' + '<td><code>' + o.code + '</code></td>' + '<td>' + o.type + '</td>' + '<td>' + (o.type === 'Percentage' ? o.value + '%' : '$' + o.value) + '</td>' + '<td>' + CJBadge(o.status, {"Draft":"neutral","Scheduled":"info","Active":"success","Expired":"error"}) + '</td>' + '<td>' + o.startDate + ' → ' + o.endDate + '</td>' + '<td class="tabular-nums">' + o.usedCount + ' / ' + o.usageLimit + '</td>' + '<td class="row-actions"><a class="btn btn-ghost btn-sm btn-icon-only openDiscountLink" href="../../../screens/marketing-khuyen-mai/tao-chinh-sua-ma-giam-gia/index.html?id=' + o.id + '" data-id="' + o.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg></a></td>' + '</tr>'; }).join('');
    document.querySelectorAll('.openDiscountLink').forEach(function (link) {
      link.addEventListener('click', function (e) { e.preventDefault(); openDiscountDrawer(link.getAttribute('data-id')); });
    });
  }
  searchEl.addEventListener('input', render);

  /* ---------------- Voucher Editor drawer ----------------------- */
  var editingId = null;
  CJDrawer.bind('discountOverlay');

  function resetTabs() {
    document.querySelectorAll('#discountOverlay .tab-btn').forEach(function (b, i) { b.classList.toggle('active', i === 0); });
    document.querySelectorAll('#discountOverlay .tab-panel').forEach(function (p, i) { p.classList.toggle('active', i === 0); });
  }
  document.querySelectorAll('#discountOverlay .tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#discountOverlay .tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('#discountOverlay .tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelector('#discountOverlay [data-panel="' + btn.getAttribute('data-tab') + '"]').classList.add('active');
    });
  });

  function openDiscountDrawer(id) {
    var o = id ? getData().find(function (x) { return x.id === id; }) : null;
    editingId = o ? o.id : null;
    document.getElementById('dDrawerTitle').textContent = o ? 'Edit Voucher' : 'New Voucher';
    document.getElementById('dName').value = o ? o.name : '';
    document.getElementById('dCode').value = o ? o.code : '';
    document.getElementById('dType').value = o ? o.type : 'Percentage';
    document.getElementById('dValue').value = o ? o.value : '';
    document.getElementById('dAppliesTo').value = (o && ['Maternity Package', 'Confinement Meals', 'Parenting Class', 'All categories'].indexOf(o.appliesTo) > -1) ? o.appliesTo : 'All categories';
    document.getElementById('dStackable').checked = !!(o && o.stackable);
    document.getElementById('dStart').value = o ? o.startDate : '';
    document.getElementById('dEnd').value = o ? o.endDate : '';
    document.getElementById('dMinCart').value = o ? o.minCartValue : '';
    document.getElementById('dUsageLimit').value = o ? o.usageLimit : '';
    document.getElementById('dLimitPerCustomer').value = '1 use per customer';
    document.getElementById('dTargetSegment').value = o ? o.targetSegment : 'All Customers';
    document.getElementById('dCsv').value = '';
    resetTabs();
    CJDrawer.open('discountOverlay');
  }
  document.getElementById('createDiscountBtn').addEventListener('click', function () { openDiscountDrawer(null); });

  document.getElementById('dSaveBtn').addEventListener('click', function () {
    var patch = {
      name: document.getElementById('dName').value.trim() || 'Untitled Promotion',
      code: document.getElementById('dCode').value.trim().toUpperCase(),
      type: document.getElementById('dType').value,
      value: Number(document.getElementById('dValue').value) || 0,
      appliesTo: document.getElementById('dAppliesTo').value,
      stackable: document.getElementById('dStackable').checked,
      startDate: document.getElementById('dStart').value,
      endDate: document.getElementById('dEnd').value,
      minCartValue: Number(document.getElementById('dMinCart').value) || 0,
      usageLimit: Number(document.getElementById('dUsageLimit').value) || 0,
      targetSegment: document.getElementById('dTargetSegment').value
    };
    if (editingId) {
      CJStore.setOverride(STORE_KEY, editingId, patch);
      CJToast('"' + patch.name + '" updated.');
    } else {
      patch.id = 'PROMO-' + Date.now().toString().slice(-6);
      patch.status = 'Draft';
      patch.usedCount = 0;
      CJStore.addExtra(STORE_KEY, patch);
      CJToast('"' + patch.name + '" created as a draft.');
    }
    CJDrawer.close('discountOverlay');
    render();
  });

  function handleDeepLink() {
    var id = new URLSearchParams(window.location.search).get('openId');
    if (id) { openDiscountDrawer(id); }
    else if (new URLSearchParams(window.location.search).get('openCreate')) { openDiscountDrawer(null); }
  }

  render();
  handleDeepLink();
