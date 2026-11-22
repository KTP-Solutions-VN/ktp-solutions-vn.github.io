
  var STORE_KEY = 'admin_orders';
  var state = { search: '', status: '', source: '', sort: 'date_desc', grouped: false, selected: {} };

  function getData() {
    return CJStore.mergeOverrides(DATA_DON_HANG, STORE_KEY, 'id');
  }
  function badge(status) {
    var map = {"Cart":"neutral","Ordered":"info","Paid":"info","Processing":"warning","Delivered":"success","Ready for Collection":"success","Completed":"success","Cancelled":"error","Refunded":"neutral"};
    return '<span class="badge badge-' + (map[status] || 'neutral') + '">' + status + '</span>';
  }
  function sourceTag(src) {
    var map = {"Event":"source-event","Hospital Tour":"source-tour","Online":"source-online","Retail":"source-retail"};
    return '<span class="source-tag ' + (map[src] || '') + '">' + src + '</span>';
  }
  function rowHtml(o) {
    var checked = state.selected[o.id] ? 'checked' : '';
    return '<tr>' +
      '<td class="checkbox-cell"><input type="checkbox" class="rowSel" data-id="' + o.id + '" ' + checked + '></td>' +
      '<td class="cell-strong"><a href="../../../screens/don-hang/chi-tiet-don-hang/index.html?id=' + o.id + '" class="openOrderLink" data-order-id="' + o.id + '">' + o.id + '</a></td>' +
      '<td>' + o.customerName + '</td>' +
      '<td>' + sourceTag(o.purchaseSource) + '</td>' +
      '<td>' + o.items.length + ' item(s)</td>' +
      '<td>' + badge(o.status) + '</td>' +
      '<td class="tabular-nums">' + o.createdAt.split(' ')[0] + '</td>' +
      '<td class="tabular-nums">' + o.total.toFixed(2) + '</td>' +
      '<td class="row-actions"><a class="btn btn-ghost btn-sm btn-icon-only openOrderLink" href="../../../screens/don-hang/chi-tiet-don-hang/index.html?id=' + o.id + '" data-order-id="' + o.id + '" title="View">' + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"></path><circle cx="12" cy="12" r="3"></circle></svg>' + '</a></td>' +
      '</tr>';
  }

  /* ---------------- Order Overview drawer (opened from a row) ---------- */
  function openOrderDetail(id) {
    var order = getData().find(function (o) { return o.id === id; });
    if (!order) return;
    document.getElementById('drOrdId').textContent = order.id;
    document.getElementById('drOrdMeta').textContent = 'Created ' + order.createdAt + ' · Last updated ' + order.updatedAt;
    document.getElementById('drOrdStatusBadge').innerHTML = badge(order.status);
    document.getElementById('drOrdCustomer').innerHTML = '<strong>' + order.customerName + '</strong> (' + order.customerId + ')';
    document.getElementById('drOrdItems').innerHTML = order.items.map(function (it) {
      return '<tr><td class="cell-strong">' + it.name + '</td><td>' + it.variant + '</td><td>' + it.qty + '</td><td class="tabular-nums">' + it.price.toFixed(2) + '</td></tr>';
    }).join('');
    document.getElementById('drOrdSubtotal').textContent = 'AUD ' + order.subtotal.toFixed(2);
    document.getElementById('drOrdDiscount').textContent = '- AUD ' + order.discount.toFixed(2);
    document.getElementById('drOrdGst').textContent = 'AUD ' + order.gst.toFixed(2);
    document.getElementById('drOrdTotal').textContent = 'AUD ' + order.total.toFixed(2);
    document.getElementById('drStatusSelect').value = order.status in {Ordered:1,Paid:1,Processing:1,Delivered:1,'Ready for Collection':1,Completed:1,Cancelled:1,Refunded:1} ? order.status : 'Ordered';
    document.getElementById('drOrdSourceTag').innerHTML = sourceTag(order.purchaseSource);
    document.getElementById('drOrdFulfillment').textContent = order.fulfillmentMethod;
    if (order.referredBy) { document.getElementById('drOrdReferred').textContent = order.referredBy; document.getElementById('drOrdReferredWrap').style.display = ''; }
    else { document.getElementById('drOrdReferredWrap').style.display = 'none'; }
    document.getElementById('drRefundBtn').href = '../../../screens/don-hang/duyet-yeu-cau-hoan-tien/index.html?order=' + order.id;

    function renderNotes() {
      var extra = CJStore.getExtra(STORE_KEY + '_notes_' + order.id);
      var all = order.notes.concat(extra);
      var wrap = document.getElementById('drOrdNotes');
      if (!all.length) { wrap.innerHTML = '<p style="color:var(--gray-500);font-size:13px;">No internal notes yet.</p>'; return; }
      wrap.innerHTML = all.map(function (n) {
        var initials = n.author.split(' ').map(function(w){return w[0];}).slice(0,2).join('');
        return '<div class="timeline-item"><div class="timeline-avatar">' + initials + '</div><div class="timeline-content" style="flex:1;"><strong>' + n.author + '</strong><p>' + n.text + '</p></div><div class="timeline-time">' + n.at + '</div></div>';
      }).join('');
    }
    renderNotes();

    var addNoteBtn = document.getElementById('drAddNoteBtn');
    addNoteBtn.onclick = function () {
      var input = document.getElementById('drNoteInput');
      var val = input.value.trim();
      if (!val) { CJToast('Enter a note before saving.'); return; }
      CJStore.addExtra(STORE_KEY + '_notes_' + order.id, { author: 'You (Admin)', text: val, at: new Date().toISOString().slice(0,16).replace('T',' ') });
      input.value = '';
      renderNotes();
      CJToast('Note added.');
    };

    var saveStatusBtn = document.getElementById('drSaveStatusBtn');
    saveStatusBtn.onclick = function () {
      var btn = this; var newStatus = document.getElementById('drStatusSelect').value;
      btn.disabled = true; btn.textContent = 'Updating...';
      setTimeout(function () {
        CJStore.setOverride(STORE_KEY, order.id, { status: newStatus, updatedAt: new Date().toISOString().slice(0,16).replace('T',' ') });
        btn.disabled = false; btn.textContent = 'Update Status';
        document.getElementById('drOrdStatusBadge').innerHTML = badge(newStatus);
        CJToast('Order status updated to "' + newStatus + '". Synced back to backend systems.');
        render();
    }, 500);
    };

    CJDrawer.open('orderDetailOverlay');
  }
  function bindOpenOrderLinks() {
    document.querySelectorAll('.openOrderLink').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openOrderDetail(link.getAttribute('data-order-id'));
      });
    });
  }
  CJDrawer.bind('orderDetailOverlay');

  /* ---------------- Assisted Order Entry drawer ------------------------ */
  CJDrawer.bind('manualOrderOverlay');
  document.getElementById('createOrderBtn').addEventListener('click', function () {
    document.querySelectorAll('#manualOrderOverlay .tab-btn').forEach(function (b, i) { b.classList.toggle('active', i === 0); });
    document.querySelectorAll('#manualOrderOverlay .tab-panel').forEach(function (p, i) { p.classList.toggle('active', i === 0); });
    CJDrawer.open('manualOrderOverlay');
  });
  document.querySelectorAll('#manualOrderOverlay .tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#manualOrderOverlay .tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('#manualOrderOverlay .tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelector('#manualOrderOverlay [data-panel="' + btn.getAttribute('data-tab') + '"]').classList.add('active');
    });
  });
  document.getElementById('sendOrderBtn').addEventListener('click', function () {
    CJDrawer.close('manualOrderOverlay');
    CJToast('Manual order created and payment request sent to customer.');
  });

  /* Deep-link support: ?openOrder=ID or ?openCreateOrder=1 (used by the thin
     standalone Order Overview / Assisted Order Entry redirect wrappers so old bookmarks/links keep working) */
  function handleDeepLink() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('openOrder')) { openOrderDetail(params.get('openOrder')); }
    else if (params.get('openCreateOrder')) { document.getElementById('createOrderBtn').click(); }
  }
  function apply(list) {
    var s = state.search.toLowerCase();
    list = list.filter(function (o) {
      if (s && (o.id.toLowerCase().indexOf(s) === -1 && o.customerName.toLowerCase().indexOf(s) === -1)) return false;
      if (state.status && o.status !== state.status) return false;
      if (state.source && o.purchaseSource !== state.source) return false;
      return true;
    });
    list.sort(function (a, b) {
      if (state.sort === 'date_desc') return a.createdAt < b.createdAt ? 1 : -1;
      if (state.sort === 'date_asc') return a.createdAt > b.createdAt ? 1 : -1;
      if (state.sort === 'total_desc') return b.total - a.total;
      if (state.sort === 'total_asc') return a.total - b.total;
      return 0;
    });
    return list;
  }
  function render() {
    var list = apply(getData());
    var tbody = document.getElementById('orderTbody');
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state"><div class="es-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg></div><h3>No orders match your filters</h3><p>Try clearing the search or filters above.</p></div></td></tr>';
      return;
    }
    if (!state.grouped) {
      tbody.innerHTML = list.map(rowHtml).join('');
    } else {
      var groups = {};
      list.forEach(function (o) { (groups[o.status] = groups[o.status] || []).push(o); });
      var html = '';
      Object.keys(groups).forEach(function (g) {
        html += '<tr style="background:var(--gray-50);"><td colspan="9" style="font-weight:700;color:var(--primary-dark);">' + g + ' (' + groups[g].length + ')</td></tr>';
        html += groups[g].map(rowHtml).join('');
      });
      tbody.innerHTML = html;
    }
    bindRowChecks();
    bindOpenOrderLinks();
    updateBulkBtn();
  }
  function bindRowChecks() {
    document.querySelectorAll('.rowSel').forEach(function (cb) {
      cb.addEventListener('change', function () {
        if (cb.checked) state.selected[cb.getAttribute('data-id')] = true;
        else delete state.selected[cb.getAttribute('data-id')];
        updateBulkBtn();
      });
    });
  }
  function updateBulkBtn() {
    var count = Object.keys(state.selected).length;
    var btn = document.getElementById('bulkBtn');
    btn.style.display = count ? 'inline-flex' : 'none';
    btn.textContent = 'Bulk update status (' + count + ')';
  }

  document.getElementById('tbSearch').addEventListener('input', function () { state.search = this.value; render(); });
  document.getElementById('statusFilter').addEventListener('change', function () { state.status = this.value; render(); });
  document.getElementById('sourceFilter').addEventListener('change', function () { state.source = this.value; render(); });
  document.getElementById('sortSelect').addEventListener('change', function () { state.sort = this.value; render(); });
  document.getElementById('groupToggle').addEventListener('click', function () {
    state.grouped = !state.grouped;
    this.classList.toggle('active', state.grouped);
    render();
});
  document.getElementById('selectAll').addEventListener('change', function () {
    var checked = this.checked;
    apply(getData()).forEach(function (o) { if (checked) state.selected[o.id] = true; else delete state.selected[o.id]; });
    render();
});
  document.getElementById('bulkBtn').addEventListener('click', function () {
    var next = prompt('Set status for ' + Object.keys(state.selected).length + ' selected order(s) to:\n(Processing / Delivered / Completed / Cancelled)', 'Processing');
    if (!next) return;
    Object.keys(state.selected).forEach(function (id) { CJStore.setOverride(STORE_KEY, id, { status: next, updatedAt: new Date().toISOString().slice(0,16).replace('T',' ') }); });
    state.selected = {};
    CJToast('Updated status for selected orders.');
    render();
});
  document.getElementById('resetDemo').addEventListener('click', function () {
    CJStore.resetAll(STORE_KEY);
    state.selected = {};
    CJToast('Demo data reset.');
    render();
});

  render();
  handleDeepLink();
