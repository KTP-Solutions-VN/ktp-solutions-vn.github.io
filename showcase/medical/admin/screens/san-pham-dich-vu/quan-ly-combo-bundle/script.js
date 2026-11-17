
  var STORE_KEY = 'admin_combos';
  function getData() { return CJStore.mergeOverrides(DATA_COMBO_BUNDLE, STORE_KEY, 'id').concat(CJStore.getExtra(STORE_KEY)); }
  var searchEl = document.getElementById('tbSearch');
  function render() {
    var s = (searchEl.value || '').toLowerCase();
    var list = getData().filter(function (o) { return !s || (String(o.name).toLowerCase().indexOf(s) > -1); });
    var tbody = document.getElementById('listTbody');
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><div class="es-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg></div><h3>No combos found</h3><p>Try adjusting your search.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (o) { return '<tr>' + '<td style="font-size:20px;">' + o.thumbnail + '</td>' + '<td class="cell-strong">' + o.name + '</td>' + '<td>' + o.components.map(function(c){return c.name + ' ×' + c.qty;}).join(', ') + '</td>' + '<td class="tabular-nums">SGD ' + o.comboPrice.toFixed(0) + ' <span style="color:var(--gray-400);text-decoration:line-through;">' + o.sumOfComponents.toFixed(0) + '</span></td>' + '<td>' + CJBadge(o.status, {Draft:'neutral',Published:'success',Unpublished:'error'}) + '</td>' + '<td class="row-actions"><a class="btn btn-ghost btn-sm btn-icon-only openComboLink" href="../../../screens/san-pham-dich-vu/tao-chinh-sua-combo/index.html?id=' + o.id + '" data-id="' + o.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg></a></td>' + '</tr>'; }).join('');
    document.querySelectorAll('.openComboLink').forEach(function (link) {
      link.addEventListener('click', function (e) { e.preventDefault(); openComboDrawer(link.getAttribute('data-id')); });
    });
  }
  searchEl.addEventListener('input', render);

  /* ---------------- #65 Create/Edit Combo drawer --------------------------- */
  var editingComboId = null;
  CJDrawer.bind('comboOverlay');
  document.querySelectorAll('#comboOverlay .tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#comboOverlay .tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('#comboOverlay .tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelector('#comboOverlay [data-panel="' + btn.getAttribute('data-tab') + '"]').classList.add('active');
    });
  });
  function resetComboTabs() {
    document.querySelectorAll('#comboOverlay .tab-btn').forEach(function (b, i) { b.classList.toggle('active', i === 0); });
    document.querySelectorAll('#comboOverlay .tab-panel').forEach(function (p, i) { p.classList.toggle('active', i === 0); });
  }
  function populateAddComponentSelect() {
    var sel = document.getElementById('cbAddComponent');
    var products = typeof DATA_SAN_PHAM_DICH_VU !== 'undefined' ? DATA_SAN_PHAM_DICH_VU : [];
    sel.innerHTML = '<option value="">Select a product/service…</option>' + products.map(function (p) {
      return '<option value="' + p.id + '" data-name="' + p.name.replace(/"/g, '') + '">' + p.name + '</option>';
    }).join('');
  }
  function componentRowHtml(c) {
    return '<tr data-pid="' + c.productId + '">' +
      '<td>' + c.name + '</td>' +
      '<td><input type="number" value="' + c.qty + '" class="cQty" style="width:60px;border:none;background:none;padding:0;"></td>' +
      '<td><button type="button" class="removeComponentBtn" aria-label="Remove component"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></td>' +
      '</tr>';
  }
  /* Event delegation (bound once below) instead of re-binding per row — avoids
     accumulating duplicate listeners every time a component is added. */
  function renderComponents(components) {
    document.getElementById('cbComponentsBody').innerHTML = components.map(componentRowHtml).join('');
    updateSum();
  }
  function productPrice(productId) {
    var products = typeof DATA_SAN_PHAM_DICH_VU !== 'undefined' ? DATA_SAN_PHAM_DICH_VU : [];
    var p = products.find(function (x) { return x.id === productId; });
    return p ? (p.salePrice || p.listPrice || 0) : 0;
  }
  function updateSum() {
    var sum = Array.from(document.querySelectorAll('#cbComponentsBody tr')).reduce(function (total, row) {
      var qty = Number(row.querySelector('.cQty').value) || 0;
      return total + qty * productPrice(row.getAttribute('data-pid'));
    }, 0);
    document.getElementById('cbSum').value = 'SGD ' + sum.toFixed(0);
  }
  document.getElementById('cbAddComponent').addEventListener('change', function () {
    var opt = this.options[this.selectedIndex];
    if (!opt || !opt.value) return;
    document.getElementById('cbComponentsBody').insertAdjacentHTML('beforeend', componentRowHtml({ productId: opt.value, name: opt.getAttribute('data-name'), qty: 1 }));
    updateSum();
    this.value = '';
  });
  var cbComponentsBody = document.getElementById('cbComponentsBody');
  cbComponentsBody.addEventListener('click', function (e) {
    var btn = e.target.closest('.removeComponentBtn');
    if (!btn) return;
    if (document.querySelectorAll('#cbComponentsBody tr').length <= 1) { CJToast('A combo needs at least one component.'); return; }
    btn.closest('tr').remove();
    updateSum();
  });
  cbComponentsBody.addEventListener('input', function (e) {
    if (e.target.classList.contains('cQty')) updateSum();
  });
  function collectComponents() {
    return Array.from(document.querySelectorAll('#cbComponentsBody tr')).map(function (row) {
      return { productId: row.getAttribute('data-pid'), name: row.children[0].textContent, qty: Number(row.querySelector('.cQty').value) || 1 };
    });
  }

  function openComboDrawer(id) {
    var o = id ? getData().find(function (x) { return x.id === id; }) : null;
    editingComboId = o ? o.id : null;
    document.getElementById('cbDrawerTitle').textContent = o ? 'Edit Combo' : 'Create Combo';
    document.getElementById('cbName').value = o ? o.name : '';
    populateAddComponentSelect();
    renderComponents(o ? o.components : []);
    document.getElementById('cbPrice').value = o ? o.comboPrice : '';
    resetComboTabs();
    CJDrawer.open('comboOverlay');
  }
  document.getElementById('createComboBtn').addEventListener('click', function () { openComboDrawer(null); });

  document.getElementById('cbSaveBtn').addEventListener('click', function () {
    var name = document.getElementById('cbName').value.trim() || 'Untitled Combo';
    var components = collectComponents();
    if (!components.length) { CJToast('Add at least one component before saving.'); return; }
    var sumOfComponents = components.reduce(function (t, c) { return t + c.qty * productPrice(c.productId); }, 0);
    var patch = {
      name: name,
      components: components,
      comboPrice: Number(document.getElementById('cbPrice').value) || sumOfComponents,
      sumOfComponents: sumOfComponents
    };
    if (editingComboId) {
      CJStore.setOverride(STORE_KEY, editingComboId, patch);
      CJToast('"' + name + '" updated.');
    } else {
      patch.id = 'CMB-NEW-' + Date.now().toString().slice(-4);
      patch.status = 'Draft';
      patch.thumbnail = '🎁';
      CJStore.addExtra(STORE_KEY, patch);
      CJToast('"' + name + '" created as a draft.');
    }
    CJDrawer.close('comboOverlay');
    render();
  });

  function handleDeepLink() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('openId')) { openComboDrawer(params.get('openId')); }
    else if (params.get('openCreate')) { openComboDrawer(null); }
  }

  render();
  handleDeepLink();
