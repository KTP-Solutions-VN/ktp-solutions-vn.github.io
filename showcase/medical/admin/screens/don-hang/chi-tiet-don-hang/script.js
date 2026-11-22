
  var STORE_KEY = 'admin_orders';
  var id = new URLSearchParams(window.location.search).get('id') || (DATA_DON_HANG[0] && DATA_DON_HANG[0].id);
  var order = CJStore.mergeOverrides(DATA_DON_HANG, STORE_KEY, 'id').find(function (o) { return o.id === id; });

  function badge(status) {
    var map = {"Cart":"neutral","Ordered":"info","Paid":"info","Processing":"warning","Delivered":"success","Ready for Collection":"success","Completed":"success","Cancelled":"error","Refunded":"neutral"};
    return '<span class="badge badge-' + (map[status] || 'neutral') + '" style="font-size:13px;padding:5px 14px;">' + status + '</span>';
  }
  function sourceTag(src) {
    var map = {"Event":"source-event","Hospital Tour":"source-tour","Online":"source-online","Retail":"source-retail"};
    return '<span class="source-tag ' + (map[src] || '') + '">' + src + '</span>';
  }

  if (!order) {
    document.getElementById('orderNotFound').style.display = 'block';
    document.getElementById('orderContent').style.display = 'none';
  } else {
    document.getElementById('ordId').textContent = order.id;
    document.getElementById('ordMeta').textContent = 'Created ' + order.createdAt + ' · Last updated ' + order.updatedAt;
    document.getElementById('ordStatusBadge').innerHTML = badge(order.status);
    document.getElementById('ordCustomer').innerHTML = '<strong>' + order.customerName + '</strong> (' + order.customerId + ')';
    document.getElementById('ordItems').innerHTML = order.items.map(function (it) {
      return '<tr><td class="cell-strong">' + it.name + '</td><td>' + it.variant + '</td><td>' + it.qty + '</td><td class="tabular-nums">' + it.price.toFixed(2) + '</td></tr>';
    }).join('');
    document.getElementById('ordSubtotal').textContent = 'AUD ' + order.subtotal.toFixed(2);
    document.getElementById('ordDiscount').textContent = '- AUD ' + order.discount.toFixed(2);
    document.getElementById('ordGst').textContent = 'AUD ' + order.gst.toFixed(2);
    document.getElementById('ordTotal').textContent = 'AUD ' + order.total.toFixed(2);
    document.getElementById('statusSelect').value = order.status in {Ordered:1,Paid:1,Processing:1,Delivered:1,'Ready for Collection':1,Completed:1,Cancelled:1,Refunded:1} ? order.status : 'Ordered';
    document.getElementById('ordSourceTag').innerHTML = sourceTag(order.purchaseSource);
    document.getElementById('ordFulfillment').textContent = order.fulfillmentMethod;
    if (order.referredBy) { document.getElementById('ordReferred').textContent = order.referredBy; }
    else { document.getElementById('ordReferredWrap').style.display = 'none'; }
    document.getElementById('refundBtn').href = '../../../screens/don-hang/duyet-yeu-cau-hoan-tien/index.html' + '?order=' + order.id;

    function renderNotes() {
      var extra = CJStore.getExtra(STORE_KEY + '_notes_' + order.id);
      var all = order.notes.concat(extra);
      var wrap = document.getElementById('ordNotes');
      if (!all.length) { wrap.innerHTML = '<p style="color:var(--gray-500);font-size:13px;">No internal notes yet.</p>'; return; }
      wrap.innerHTML = all.map(function (n) {
        var initials = n.author.split(' ').map(function(w){return w[0];}).slice(0,2).join('');
        return '<div class="timeline-item"><div class="timeline-avatar">' + initials + '</div><div class="timeline-content" style="flex:1;"><strong>' + n.author + '</strong><p>' + n.text + '</p></div><div class="timeline-time">' + n.at + '</div></div>';
      }).join('');
    }
    renderNotes();

    document.getElementById('addNoteBtn').addEventListener('click', function () {
      var val = document.getElementById('noteInput').value.trim();
      if (!val) { CJToast('Enter a note before saving.'); return; }
      CJStore.addExtra(STORE_KEY + '_notes_' + order.id, { author: 'You (Admin)', text: val, at: new Date().toISOString().slice(0,16).replace('T',' ') });
      document.getElementById('noteInput').value = '';
      renderNotes();
      CJToast('Note added.');
    });

    document.getElementById('saveStatusBtn').addEventListener('click', function () {
      var btn = this; var newStatus = document.getElementById('statusSelect').value;
      btn.disabled = true; btn.textContent = 'Updating...';
      setTimeout(function () {
        CJStore.setOverride(STORE_KEY, order.id, { status: newStatus, updatedAt: new Date().toISOString().slice(0,16).replace('T',' ') });
        btn.disabled = false; btn.textContent = 'Update Status';
        document.getElementById('ordStatusBadge').innerHTML = badge(newStatus);
        CJToast('Order status updated to "' + newStatus + '". Synced back to backend systems.');
      }, 600);
    });
  }
  