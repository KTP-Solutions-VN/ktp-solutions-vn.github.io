
  var STORE_KEY = 'admin_refunds';
  var STEPS = ['Initiated', 'Pending Approval', 'Approved', 'Refund API Sent', 'Completed'];
  var qId = new URLSearchParams(window.location.search).get('id');
  var qOrder = new URLSearchParams(window.location.search).get('order');
  var state = { search: '', status: '', selectedId: null };

  function getData() { return CJStore.mergeOverrides(DATA_YEU_CAU_HOAN_TIEN, STORE_KEY, 'id'); }
  function badge(status) {
    var map = {"Initiated":"info","Pending Approval":"warning","Approved":"success","Rejected":"error","Refund API Sent":"primary","Completed":"success"};
    return '<span class="badge badge-' + (map[status] || 'neutral') + '">' + status + '</span>';
  }

  function initSelection() {
    var all = getData();
    var found = null;
    if (qId) found = all.find(function (r) { return r.id === qId; });
    if (!found && qOrder) found = all.find(function (r) { return r.orderId === qOrder; });
    if (!found) found = all.find(function (r) { return r.status === 'Pending Approval' || r.status === 'Initiated'; }) || all[0];
    state.selectedId = found ? found.id : null;
  }

  function renderQueue() {
    var list = getData();
    var s = state.search.toLowerCase();
    list = list.filter(function (r) {
      if (s && r.id.toLowerCase().indexOf(s) === -1 && r.orderId.toLowerCase().indexOf(s) === -1) return false;
      if (state.status && r.status !== state.status) return false;
      return true;
    });
    var tbody = document.getElementById('queueTbody');
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="4"><div class="empty-state"><div class="es-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path></svg></div><h3>No refund requests</h3><p>No requests match your filters.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (r) {
      var sel = r.id === state.selectedId ? 'style="background:var(--primary-50);"' : '';
      return '<tr ' + sel + ' data-id="' + r.id + '" class="queueRow">' +
        '<td class="cell-strong">' + r.id + '</td><td>' + r.orderId + '</td><td class="tabular-nums">SGD ' + r.amount.toFixed(2) + '</td><td>' + badge(r.status) + '</td></tr>';
    }).join('');
    document.querySelectorAll('.queueRow').forEach(function (tr) {
      tr.addEventListener('click', function () { state.selectedId = tr.getAttribute('data-id'); renderQueue(); renderDetail(); });
    });
  }

  function stepIndex(status) {
    if (status === 'Rejected') return -1;
    var i = STEPS.indexOf(status);
    return i === -1 ? 0 : i;
  }

  function renderStepper(status) {
    if (status === 'Rejected') {
      return '<div class="badge badge-error" style="font-size:13px;padding:6px 16px;margin-bottom:var(--sp-4);"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Rejected — refund not processed</div>';
    }
    var idx = stepIndex(status);
    var html = '<div class="stepper">';
    STEPS.forEach(function (s, i) {
      var cls = i < idx ? 'done' : (i === idx ? 'current' : '');
      html += '<div class="stepper-step ' + cls + '"><div class="stepper-circle">' + (i < idx ? '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : (i + 1)) + '</div><div class="stepper-label">' + s + '</div></div>';
      if (i < STEPS.length - 1) html += '<div class="stepper-line ' + (i < idx ? 'done' : '') + '"></div>';
    });
    html += '</div>';
    return html;
  }

  function renderDetail() {
    var r = getData().find(function (x) { return x.id === state.selectedId; });
    var panel = document.getElementById('detailPanel');
    if (!r) { panel.innerHTML = '<div class="empty-state"><h3>Select a refund request</h3><p>Choose a request from the queue on the left.</p></div>'; return; }

    var canApprove = r.status === 'Initiated' || r.status === 'Pending Approval';
    var actionsHtml = canApprove
      ? '<button class="btn btn-accent" id="approveBtn"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Approve</button><button class="btn btn-danger" id="rejectBtn"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Reject</button>'
      : '<p style="color:var(--gray-500);font-size:13px;">No further action available — this request is ' + r.status.toLowerCase() + '.</p>';

    var chainHtml = r.approvalChain.map(function (c) {
      var initials = c.approver.split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('');
      var decColor = c.decision === 'Approved' ? 'success' : (c.decision === 'Rejected' ? 'error' : 'warning');
      return '<div class="timeline-item"><div class="timeline-avatar">' + initials + '</div><div class="timeline-content" style="flex:1;">' +
        '<strong>Level ' + c.level + ' — ' + c.approver + '</strong>' +
        '<p><span class="badge badge-' + decColor + '" style="margin-right:6px;">' + c.decision + '</span>' + (c.comment || '') + '</p></div>' +
        '<div class="timeline-time">' + (c.at || 'Pending') + '</div></div>';
    }).join('');

    panel.innerHTML =
      '<div class="page-header" style="margin-bottom:var(--sp-4);">' +
        '<div><h2 style="margin-bottom:4px;">' + r.id + '</h2><div style="font-size:12.5px;color:var(--gray-500);">Order <a href="../../../screens/don-hang/chi-tiet-don-hang/index.html?id=' + r.orderId + '">' + r.orderId + '</a> · ' + r.customerName + ' · Initiated by ' + r.initiatedBy + '</div></div>' +
        badge(r.status) +
      '</div>' +
      renderStepper(r.status) +
      '<div class="section-title">Reason</div><p style="margin-bottom:var(--sp-4);">' + r.reason + '</p>' +
      '<div class="section-title">Amount</div><p style="font-size:20px;font-weight:700;color:var(--primary-dark);margin-bottom:var(--sp-4);">SGD ' + r.amount.toFixed(2) + '</p>' +
      '<div class="section-title">Multi-level Approval Chain</div><div class="timeline" style="margin-bottom:var(--sp-4);">' + chainHtml + '</div>' +
      '<hr class="hr">' +
      '<div style="display:flex;gap:var(--sp-2);">' + actionsHtml + '</div>';

    if (canApprove) {
      document.getElementById('approveBtn').addEventListener('click', function () {
        var btn = this; btn.disabled = true; btn.textContent = 'Approving...';
        setTimeout(function () {
          var nextStatus = r.status === 'Initiated' ? 'Pending Approval' : 'Refund API Sent';
          var chain = r.approvalChain.slice();
          var pendingEntry = chain.find(function (c) { return c.decision === 'Pending'; });
          if (pendingEntry) { pendingEntry.decision = 'Approved'; pendingEntry.at = new Date().toISOString().slice(0,16).replace('T',' '); pendingEntry.comment = 'Approved via Admin Portal.'; }
          CJStore.setOverride(STORE_KEY, r.id, { status: nextStatus, approvalChain: chain });
          CJToast('Refund ' + r.id + ' approved — status is now "' + nextStatus + '".');
          renderQueue(); renderDetail();
        }, 500);
      });
      document.getElementById('rejectBtn').addEventListener('click', function () {
        var reason = prompt('Reason for rejecting this refund request:');
        if (!reason) { CJToast('Rejection cancelled — a reason is required.'); return; }
        var chain = r.approvalChain.slice();
        var pendingEntry = chain.find(function (c) { return c.decision === 'Pending'; });
        if (pendingEntry) { pendingEntry.decision = 'Rejected'; pendingEntry.at = new Date().toISOString().slice(0,16).replace('T',' '); pendingEntry.comment = reason; }
        CJStore.setOverride(STORE_KEY, r.id, { status: 'Rejected', approvalChain: chain });
        CJToast('Refund ' + r.id + ' rejected.');
        renderQueue(); renderDetail();
      });
    }
  }

  document.getElementById('tbSearch').addEventListener('input', function () { state.search = this.value; renderQueue(); });
  document.getElementById('statusFilter').addEventListener('change', function () { state.status = this.value; renderQueue(); });
  document.getElementById('resetDemo').addEventListener('click', function () { CJStore.resetAll(STORE_KEY); CJToast('Demo data reset.'); renderQueue(); renderDetail(); });

  initSelection();
  renderQueue();
  renderDetail();
  