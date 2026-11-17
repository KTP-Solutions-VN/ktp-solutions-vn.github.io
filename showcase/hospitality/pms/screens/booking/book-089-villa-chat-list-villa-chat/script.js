document.addEventListener('DOMContentLoaded', function () {
  var state = { q: '', bu: '', status: '', sort: 'newest', expandedId: null };
  var blockingBookingId = null;

  function villaBu(propertyName) {
    var v = MM.BOOK.villaByName(propertyName);
    return v ? v.bu : '';
  }

  function getAll() { return MM.BOOK.getAllChatThreads(); }

  function populateFilters(rows) {
    var buSel = document.getElementById('bu-filter');
    var bus = Array.from(new Set(rows.map(function (r) { return villaBu(r.property); }).filter(Boolean))).sort();
    bus.forEach(function (bu) {
      var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o);
    });
  }

  function applyFilters(rows) {
    var q = state.q;
    return rows.filter(function (r) {
      if (state.bu && villaBu(r.property) !== state.bu) return false;
      if (state.status && r.status !== state.status) return false;
      if (q) {
        var hay = (r.bookingId + ' ' + r.guest + ' ' + r.property).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function sortRows(rows) {
    var sorted = rows.slice();
    if (state.sort === 'checkin') sorted.sort(function (a, b) { return new Date(a.checkIn) - new Date(b.checkIn); });
    else if (state.sort === 'status') sorted.sort(function (a, b) { return a.status.localeCompare(b.status); });
    else if (state.sort === 'villa') sorted.sort(function (a, b) { return a.property.localeCompare(b.property); });
    else sorted.sort(function (a, b) { return new Date(b.checkIn) - new Date(a.checkIn); }); // newest first, proxy via check-in
    return sorted;
  }

  function bookingMeta(bookingId) {
    return MM.BOOK.getBookingById(bookingId) || {};
  }

  function copyText(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { MM.showToast(label + ' copied.'); });
    } else { MM.showToast(label + ': ' + text); }
  }

  function actionButtons(r) {
    if (r.status === 'link') {
      return '<a class="btn btn-ghost btn-sm" href="../book-091-view-linked-chat/index.html?id=' + encodeURIComponent(r.bookingId) + '" title="View linked chat"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></a>';
    }
    if (r.status === 'new' || r.status === 'to-open') {
      return '<a class="btn btn-ghost btn-sm" href="../book-089-p1-activate-edit-guest-chat/index.html?id=' + encodeURIComponent(r.bookingId) + '" title="Open chat"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>' +
        '<a class="btn btn-ghost btn-sm" href="../book-090-link-chat-to-another-booking/index.html?id=' + encodeURIComponent(r.bookingId) + '" title="Link to another booking"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>';
    }
    return '<a class="btn btn-ghost btn-sm" href="../book-089-p1-activate-edit-guest-chat/index.html?id=' + encodeURIComponent(r.bookingId) + '&mode=edit" title="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg></a>';
  }

  function warnIcon(title) {
    return '<span class="warn-flag" title="' + title + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>';
  }

  function rowHtml(r) {
    var b = bookingMeta(r.bookingId);
    var checkOutPlus1 = r.checkOut ? MM.BOOK.fmtDate(new Date(new Date(b.checkOut || r.checkOut).getTime() + 86400000).toISOString().slice(0, 10)) : '—';
    var block = MM.BOOK.getChatBlock(r.bookingId);
    var blocked = block.blockMobile || block.blockWhatsapp || block.dnd;
    var isExpanded = state.expandedId === r.bookingId;
    var canQuickActivate = r.status === 'new' || r.status === 'to-open';
    return '<tr class="chat-row' + (isExpanded ? ' expanded' : '') + '" data-id="' + r.bookingId + '">' +
      '<td>' + (canQuickActivate ? '<button class="row-twisty" data-toggle="' + r.bookingId + '" title="Quick activate"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></button>' : '') + '</td>' +
      '<td class="cell-num">' + MM.BOOK.fmtDate(b.bookingDate) + '</td>' +
      '<td class="cell-num">' + MM.BOOK.fmtDate(r.checkIn) + '</td>' +
      '<td class="cell-num">' + checkOutPlus1 + '</td>' +
      '<td class="cell-strong">' + r.property + '</td>' +
      '<td>' + r.guest + '</td>' +
      '<td>' + MM.BOOK.flag(r.country) + '</td>' +
      '<td>' + (r.referer || '—') + '</td>' +
      '<td><button class="btn btn-ghost btn-sm" data-copy="' + r.portalCode + '" data-copy-label="Portal access code" title="Copy portal access code"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> ' + r.portalCode + '</button></td>' +
      '<td><div class="tdac-cell"><button class="btn btn-ghost btn-sm" data-copy="' + r.tdacCode + '" data-copy-label="TDAC link" title="Copy TDAC link"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button><button class="btn btn-ghost btn-sm" data-send-tdac="' + r.bookingId + '" title="Send TDAC email"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg></button></div></td>' +
      '<td>' + (r.leader || '<span class="text-muted">—</span>') + '</td>' +
      '<td>' + MM.BOOK.chatStatusBadge(r.status) + (blocked ? warnIcon('Communication restricted for this guest') : '') + (r.warnFakePhone ? warnIcon('Phone number looks invalid') : '') + '</td>' +
      '<td><div class="row-actions">' + actionButtons(r) +
        '<button class="btn btn-ghost btn-sm" data-block="' + r.bookingId + '" title="Block communication"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg></button>' +
      '</div></td>' +
    '</tr>' +
    (isExpanded ? quickActivateRowHtml(r) : '');
  }

  function quickActivateRowHtml(r) {
    var concierges = (window.MM.MOCK_STAFF || []).filter(function (s) { return s.role === 'Concierge'; });
    return '<tr class="chat-quick-row" data-quick-for="' + r.bookingId + '"><td colspan="13">' +
      '<div class="quick-activate">' +
        '<div class="form-grid">' +
          '<div class="form-group"><label>Guest Language</label><select data-qa-language><option>' + r.language + '</option><option>English</option><option>French</option></select></div>' +
          '<div class="form-group"><label>Chat Leader</label><select data-qa-leader><option value="">Select leader</option><option value="' + r.guest + '" selected>' + r.guest + '</option></select></div>' +
          '<div class="form-group full"><label>Add Members</label><div class="member-chip-row">' +
            concierges.map(function (c) { return '<label class="member-chip"><input type="checkbox" value="' + c.name + '" ' + (c.name === r.concierge ? 'checked' : '') + '> ' + c.name + '</label>'; }).join('') +
          '</div></div>' +
          '<div class="form-group"><label>Send Welcome Message</label><select data-qa-welcome><option value="yes" selected>Yes</option><option value="no">No</option></select></div>' +
        '</div>' +
        '<div class="quick-activate__footer">' +
          '<button class="btn btn-ghost btn-sm" data-cancel-quick="' + r.bookingId + '" type="button">Cancel</button>' +
          '<button class="btn btn-primary btn-sm" data-confirm-quick="' + r.bookingId + '" type="button">Confirm &amp; Activate</button>' +
        '</div>' +
      '</div>' +
    '</td></tr>';
  }

  function render() {
    var all = getAll();
    var filtered = sortRows(applyFilters(all));
    var tbody = document.getElementById('chat-rows');
    if (!filtered.length) {
      tbody.innerHTML = '<tr><td colspan="13"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
        '<h3>No chats match these filters</h3><p>Try clearing the search or status filter.</p></div></td></tr>';
    } else {
      tbody.innerHTML = filtered.map(rowHtml).join('');
    }
    document.getElementById('result-count').textContent = filtered.length + ' chat' + (filtered.length === 1 ? '' : 's');
    document.getElementById('pager-label').textContent = 'Showing ' + filtered.length + ' of ' + all.length;
    wireRowEvents();
  }

  function wireRowEvents() {
    document.querySelectorAll('[data-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-toggle');
        state.expandedId = state.expandedId === id ? null : id;
        render();
      });
    });
    document.querySelectorAll('[data-cancel-quick]').forEach(function (btn) {
      btn.addEventListener('click', function () { state.expandedId = null; render(); });
    });
    document.querySelectorAll('[data-confirm-quick]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-confirm-quick');
        var row = document.querySelector('[data-quick-for="' + id + '"]');
        var leader = row.querySelector('[data-qa-leader]').value;
        var members = Array.from(row.querySelectorAll('.member-chip input:checked')).map(function (i) { return i.value; });
        var welcome = row.querySelector('[data-qa-welcome]').value;
        MM.BOOK.saveChatThreadEdit(id, { status: 'active', channel: 'Whatsapp AI', leader: leader || undefined, concierge: members[0] || undefined });
        if (welcome === 'yes') {
          MM.BOOK.appendChatMessage(id, { from: 'staff', text: 'Welcome to Azura Stays! Your chat is now active — let us know anything you need before arrival.', time: new Date().toISOString() });
        }
        state.expandedId = null;
        MM.showToast('Chat activated for booking ' + id + '.');
        render();
      });
    });
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () { copyText(btn.getAttribute('data-copy'), btn.getAttribute('data-copy-label')); });
    });
    document.querySelectorAll('[data-send-tdac]').forEach(function (btn) {
      btn.addEventListener('click', function () { MM.showToast('TDAC email sent for booking ' + btn.getAttribute('data-send-tdac') + '.'); });
    });
    document.querySelectorAll('[data-block]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        blockingBookingId = btn.getAttribute('data-block');
        var current = MM.BOOK.getChatBlock(blockingBookingId);
        document.getElementById('block-mobile').checked = !!current.blockMobile;
        document.getElementById('block-whatsapp').checked = !!current.blockWhatsapp;
        document.getElementById('block-dnd').checked = !!current.dnd;
        var t = MM.BOOK.getChatThread(blockingBookingId);
        document.getElementById('block-modal-sub').textContent = (t ? t.guest + ' · ' + t.property : blockingBookingId);
        MM.openModal('block-modal');
      });
    });
  }

  document.getElementById('block-save').addEventListener('click', function () {
    if (!blockingBookingId) return;
    MM.BOOK.saveChatBlock(blockingBookingId, {
      blockMobile: document.getElementById('block-mobile').checked,
      blockWhatsapp: document.getElementById('block-whatsapp').checked,
      dnd: document.getElementById('block-dnd').checked
    });
    MM.closeModal('block-modal');
    MM.showToast('Communication preferences updated.');
    render();
  });

  MM.BOOK.wireSearch(document.getElementById('search-input'), function (q) { state.q = q; render(); });
  document.getElementById('bu-filter').addEventListener('change', function (e) { state.bu = e.target.value; render(); });
  document.getElementById('sort-by').addEventListener('change', function (e) { state.sort = e.target.value; render(); });
  document.querySelectorAll('#status-chips [data-status]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('#status-chips .chip').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      state.status = chip.getAttribute('data-status');
      render();
    });
  });

  populateFilters(getAll());
  render();
});
