
  var STORE_KEY = 'admin_products';
  var state = { search: '', status: '', bu: '', sort: 'name_asc' };
  function getData() {
    var base = CJStore.mergeOverrides(DATA_SAN_PHAM_DICH_VU, STORE_KEY, 'id');
    return base.concat(CJStore.getExtra(STORE_KEY));
  }
  function totalStock(p) { return p.variants.reduce(function (s, v) { return s + v.stock; }, 0); }
  function priceLabel(p) {
    if (p.salePrice) return '<span style="text-decoration:line-through;color:var(--gray-400);">' + p.listPrice.toFixed(0) + '</span> <strong style="color:var(--primary-dark);">' + p.salePrice.toFixed(0) + '</strong>';
    return p.listPrice ? p.listPrice.toFixed(0) : 'Free';
  }
  function populateBu() {
    var sel = document.getElementById('buFilter');
    var bus = Array.from(new Set(DATA_SAN_PHAM_DICH_VU.map(function (p) { return p.bu; })));
    bus.forEach(function (b) { var o = document.createElement('option'); o.textContent = b; sel.appendChild(o); });
  }
  function apply(list) {
    var s = state.search.toLowerCase();
    list = list.filter(function (p) {
      if (s && p.name.toLowerCase().indexOf(s) === -1) return false;
      if (state.status && p.status !== state.status) return false;
      if (state.bu && p.bu !== state.bu) return false;
      return true;
    });
    list.sort(function (a, b) {
      if (state.sort === 'name_asc') return a.name.localeCompare(b.name);
      if (state.sort === 'name_desc') return b.name.localeCompare(a.name);
      if (state.sort === 'stock_desc') return totalStock(b) - totalStock(a);
      if (state.sort === 'price_desc') return (b.salePrice || b.listPrice) - (a.salePrice || a.listPrice);
      return 0;
    });
    return list;
  }
  function render() {
    var list = apply(getData());
    var tbody = document.getElementById('listTbody');
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="8"><div class="empty-state"><div class="es-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg></div><h3>No products match your filters</h3><p>Try clearing the search or filters above.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (p) {
      return '<tr><td style="font-size:20px;">' + p.thumbnail + '</td>' +
        '<td class="cell-strong"><a href="../../../screens/san-pham-dich-vu/tao-chinh-sua-san-pham-dich-vu/index.html?id=' + p.id + '" class="openProductLink" data-id="' + p.id + '">' + p.name + '</a><div style="font-size:11.5px;color:var(--gray-500);font-weight:400;">' + p.category + '</div></td>' +
        '<td>' + p.type + '</td><td>' + p.bu + '</td>' +
        '<td class="tabular-nums">SGD ' + priceLabel(p) + '</td>' +
        '<td class="tabular-nums">' + totalStock(p) + '</td>' +
        '<td>' + CJBadge(p.status, {"Draft":"neutral","Published":"success","Scheduled Unpublish":"warning","Unpublished":"error"}) + '</td>' +
        '<td class="row-actions">' +
          '<a class="btn btn-ghost btn-sm btn-icon-only openProductLink" href="../../../screens/san-pham-dich-vu/tao-chinh-sua-san-pham-dich-vu/index.html?id=' + p.id + '" data-id="' + p.id + '" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg></a>' +
          '<button class="btn btn-ghost btn-sm btn-icon-only delBtn" data-id="' + p.id + '" data-name="' + p.name.replace(/"/g,'') + '" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>' +
        '</td></tr>';
    }).join('');
    document.querySelectorAll('.delBtn').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-id'); var name = b.getAttribute('data-name');
        CJConfirm('Delete "' + name + '"? This cannot be undone.', function () {
          CJStore.setOverride(STORE_KEY, id, { status: 'Unpublished', _deleted: true });
          CJToast('"' + name + '" deleted.');
          render();
        });
      });
    });
    document.querySelectorAll('.openProductLink').forEach(function (link) {
      link.addEventListener('click', function (e) { e.preventDefault(); openProductDrawer(link.getAttribute('data-id')); });
    });
  }
  document.getElementById('tbSearch').addEventListener('input', function () { state.search = this.value; render(); });
  document.getElementById('statusFilter').addEventListener('change', function () { state.status = this.value; render(); });
  document.getElementById('buFilter').addEventListener('change', function () { state.bu = this.value; render(); });
  document.getElementById('sortSelect').addEventListener('change', function () { state.sort = this.value; render(); });
  document.getElementById('resetDemo').addEventListener('click', function () { CJStore.resetAll(STORE_KEY); CJToast('Demo data reset.'); render(); });

  /* ---------------- #26 Create/Edit Product/Service drawer ---------------- */
  var editingProductId = null;
  var variantIdSeq = 0;
  CJDrawer.bind('productOverlay');

  function resetProductTabs() {
    document.querySelectorAll('#productOverlay .tab-btn').forEach(function (b, i) { b.classList.toggle('active', i === 0); });
    document.querySelectorAll('#productOverlay .tab-panel').forEach(function (p, i) { p.classList.toggle('active', i === 0); });
  }
  document.querySelectorAll('#productOverlay .tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#productOverlay .tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('#productOverlay .tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelector('#productOverlay [data-panel="' + btn.getAttribute('data-tab') + '"]').classList.add('active');
    });
  });

  function variantRowHtml(v) {
    return '<tr data-vid="' + variantIdSeq + '">' +
      '<td><input type="text" value="' + (v.name || '') + '" class="vName" style="border:none;background:none;padding:0;font-size:13px;"></td>' +
      '<td><input type="text" value="' + (v.sku || '') + '" class="vSku" style="border:none;background:none;padding:0;font-size:13px;"></td>' +
      '<td><input type="number" value="' + (v.stock != null ? v.stock : 0) + '" class="vStock" style="border:none;background:none;padding:0;font-size:13px;width:70px;"></td>' +
      '<td><input type="number" value="' + (v.price != null ? v.price : 0) + '" class="vPrice" style="border:none;background:none;padding:0;font-size:13px;width:80px;"></td>' +
      '<td><button type="button" class="removeVariantBtn" aria-label="Remove variant"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></td>' +
      '</tr>';
  }
  function renderVariants(variants) {
    var body = document.getElementById('fVariantsBody');
    body.innerHTML = variants.map(variantRowHtml).join('');
  }
  /* Event delegation (bound once) instead of re-binding per row — avoids
     accumulating duplicate listeners every time a variant row is added. */
  document.getElementById('fVariantsBody').addEventListener('click', function (e) {
    var btn = e.target.closest('.removeVariantBtn');
    if (!btn) return;
    if (document.querySelectorAll('#fVariantsBody tr').length <= 1) { CJToast('At least one variant is required.'); return; }
    btn.closest('tr').remove();
  });
  document.getElementById('addVariantBtn').addEventListener('click', function () {
    variantIdSeq++;
    document.getElementById('fVariantsBody').insertAdjacentHTML('beforeend', variantRowHtml({ name: '', sku: '', stock: 0, price: 0 }));
  });
  function collectVariants() {
    return Array.from(document.querySelectorAll('#fVariantsBody tr')).map(function (row, i) {
      return {
        id: 'V' + (i + 1),
        name: row.querySelector('.vName').value.trim() || 'Standard',
        sku: row.querySelector('.vSku').value.trim(),
        stock: Number(row.querySelector('.vStock').value) || 0,
        price: Number(row.querySelector('.vPrice').value) || 0
      };
    });
  }

  function updatePreview() {
    var lp = parseFloat(document.getElementById('fListPrice').value) || 0;
    var sp = parseFloat(document.getElementById('fSalePrice').value) || 0;
    document.getElementById('previewList').textContent = 'SGD ' + lp.toFixed(0);
    document.getElementById('previewSale').textContent = 'SGD ' + (sp || lp).toFixed(0);
  }
  document.getElementById('fListPrice').addEventListener('input', updatePreview);
  document.getElementById('fSalePrice').addEventListener('input', updatePreview);

  function validateField(el) {
    var field = el.closest('.field');
    var ok = el.value.trim() !== '';
    field.classList.toggle('has-error', !ok);
    return ok;
  }
  ['fName', 'fCategory'].forEach(function (id) {
    document.getElementById(id).addEventListener('blur', function () { validateField(this); });
  });

  function openProductDrawer(id) {
    var p = id ? getData().find(function (x) { return x.id === id; }) : null;
    editingProductId = p ? p.id : null;
    document.getElementById('pDrawerTitle').textContent = p ? 'Edit Product/Service' : 'Create Product/Service';
    document.getElementById('fName').value = p ? p.name : '';
    document.getElementById('fType').value = p ? p.type : 'Service';
    document.getElementById('fCategory').value = p ? p.category : '';
    document.getElementById('fBu').value = p ? p.bu : 'Meridian Specialists';
    document.getElementById('fLocation').value = (p && p.location) || '';
    document.getElementById('fDoctor').value = (p && p.doctor) || '';
    renderVariants(p ? p.variants : [{ name: 'Standard', sku: '', stock: 0, price: 0 }]);
    document.getElementById('fListPrice').value = p ? p.listPrice : '';
    document.getElementById('fSalePrice').value = (p && p.salePrice) || '';
    document.getElementById('fShipping').value = 'N/A — service/booking';
    document.getElementById('fGst').value = 'Inclusive of GST (per system default)';
    document.getElementById('fLeadTime').value = p ? (p.leadTimeDays || 0) : 2;
    document.getElementById('fBookingWindow').value = p ? (p.bookingWindowDays || 0) : 30;
    document.getElementById('fBlackout').value = p && p.blackoutDates ? p.blackoutDates.join(', ') : '';
    document.getElementById('fDigitalDelivery').checked = false;
    updatePreview();
    ['fName', 'fCategory'].forEach(function (fid) { document.getElementById(fid).closest('.field').classList.remove('has-error'); });
    resetProductTabs();
    CJDrawer.open('productOverlay');
  }
  document.getElementById('createProductBtn').addEventListener('click', function () { openProductDrawer(null); });

  function saveProduct(status) {
    var valid = ['fName', 'fCategory'].map(function (id) { return validateField(document.getElementById(id)); }).every(Boolean);
    if (!valid) { CJToast('Please complete the required fields before saving.'); return; }
    var variants = collectVariants();
    var listPrice = parseFloat(document.getElementById('fListPrice').value) || 0;
    var salePrice = parseFloat(document.getElementById('fSalePrice').value) || null;
    var patch = {
      name: document.getElementById('fName').value.trim(),
      type: document.getElementById('fType').value,
      category: document.getElementById('fCategory').value,
      bu: document.getElementById('fBu').value,
      location: document.getElementById('fLocation').value.trim(),
      doctor: document.getElementById('fDoctor').value.trim() || null,
      variants: variants,
      listPrice: listPrice,
      salePrice: salePrice,
      leadTimeDays: Number(document.getElementById('fLeadTime').value) || 0,
      bookingWindowDays: Number(document.getElementById('fBookingWindow').value) || 0,
      blackoutDates: document.getElementById('fBlackout').value.split(',').map(function (s) { return s.trim(); }).filter(Boolean),
      status: status
    };
    if (editingProductId) {
      CJStore.setOverride(STORE_KEY, editingProductId, patch);
      CJToast('"' + patch.name + '" updated.');
    } else {
      patch.id = 'PRD-NEW-' + Date.now().toString().slice(-4);
      patch.currency = 'SGD';
      patch.publishedAt = new Date().toISOString().slice(0, 10);
      patch.thumbnail = '✨';
      CJStore.addExtra(STORE_KEY, patch);
      CJToast('"' + patch.name + '" ' + (status === 'Draft' ? 'saved as a draft.' : 'created and published.'));
    }
    CJDrawer.close('productOverlay');
    render();
  }
  document.getElementById('productForm').addEventListener('submit', function (e) { e.preventDefault(); saveProduct('Published'); });
  document.getElementById('fSaveDraftBtn').addEventListener('click', function () { saveProduct('Draft'); });

  function handleDeepLink() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('openId')) { openProductDrawer(params.get('openId')); }
    else if (params.get('openCreate')) { openProductDrawer(null); }
  }

  populateBu();
  render();
  handleDeepLink();
