(function () {
  'use strict';
  var BOOK = MM.BOOK;

  document.getElementById('f-bu').innerHTML = '<option value="">All Business Units</option>' + (BOOK.BUSINESS_UNITS || []).map(function (bu) {
    var name = typeof bu === 'string' ? bu : bu.name;
    return '<option>' + name + '</option>';
  }).join('');

  function copyCode(code) {
    if (navigator.clipboard) navigator.clipboard.writeText(code).catch(function () {});
    MM.showToast('Access code copied');
  }

  function render() {
    var bu = document.getElementById('f-bu').value;
    var threads = BOOK.getAllChatThreads().filter(function (t) { return t.channel === 'Whatsapp AI'; });
    if (bu) {
      threads = threads.filter(function (t) {
        var v = BOOK.villaByName(t.property);
        return v && v.bu === bu;
      });
    }
    var tbody = document.getElementById('whatsapp-tbody');
    if (!threads.length) {
      tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state"><p>No active WhatsApp chats found.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = threads.map(function (t) {
      var booking = BOOK.getBookingById(t.bookingId);
      return '<tr>' +
        '<td class="cell-strong">' + t.bookingId + '</td>' +
        '<td>' + t.property + '</td>' +
        '<td>' + t.guest + (t.warnFakePhone ? ' <span class="warn-flag" title="Phone number looks invalid">⚠</span>' : '') + '</td>' +
        '<td>' + t.phone + '</td>' +
        '<td>' + (booking ? booking.referer : '—') + '</td>' +
        '<td><span class="access-code" data-copy="' + t.accessCode + '" title="Click to copy">' + t.accessCode + '</span></td>' +
        '<td>' + (t.leader || '—') + '</td>' +
        '<td>' + BOOK.chatStatusBadge(t.status) + '</td>' +
        '<td style="text-align:right;"><a class="btn btn-ghost btn-sm" href="../book-094-p1-whatsapp-chat/index.html?id=' + encodeURIComponent(t.bookingId) + '" target="_blank" title="Chat"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a> <button class="btn btn-ghost btn-sm" data-finish="' + t.bookingId + '">End Chat</button></td>' +
      '</tr>';
    }).join('');
  }

  document.getElementById('f-bu').addEventListener('change', render);

  document.getElementById('whatsapp-tbody').addEventListener('click', function (e) {
    var copyEl = e.target.closest('[data-copy]');
    if (copyEl) { copyCode(copyEl.getAttribute('data-copy')); return; }
    var finishBtn = e.target.closest('[data-finish]');
    if (finishBtn) { pendingFinishId = finishBtn.getAttribute('data-finish'); MM.openModal('finish-modal'); }
  });

  var pendingFinishId = null;
  document.getElementById('confirm-finish-btn').addEventListener('click', function () {
    if (!pendingFinishId) return;
    BOOK.saveChatThreadEdit(pendingFinishId, { status: 'archived' });
    pendingFinishId = null;
    MM.closeModal('finish-modal');
    MM.showToast('Chat ended');
    render();
  });

  render();
})();
