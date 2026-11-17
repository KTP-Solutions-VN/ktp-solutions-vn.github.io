document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var currentBu = params.get('bu') || MM.BOOK.BUSINESS_UNITS[0];

  var buSelect = document.getElementById('bu-select');
  MM.BOOK.BUSINESS_UNITS.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu;
    if (bu === currentBu) o.selected = true;
    buSelect.appendChild(o);
  });

  function loadCriteriaForm() {
    document.getElementById('bu-label').textContent = currentBu;
    var c = MM.BOOK.getVipCriteria(currentBu);
    document.getElementById('vip-price').value = c.vip.price;
    document.getElementById('vip-link').value = c.vip.link;
    document.getElementById('vip-duration').value = c.vip.duration;
    document.getElementById('vip5-price').value = c.vip5.price;
    document.getElementById('vip5-link').value = c.vip5.link;
    document.getElementById('vip5-duration').value = c.vip5.duration;
  }

  function readyIcon(booking) {
    if (booking.chat === 'red') {
      return '<button class="ready-icon red" data-warn-chat title="Chat group not opened yet"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></button>';
    }
    var cls = booking.chat === 'green' ? 'green' : 'blue';
    var title = booking.chat === 'green' ? 'Preparation recorded — view history' : 'Chat opened — log preparation work';
    return '<a class="ready-icon ' + cls + '" title="' + title + '" href="../book-079-guest-arrival-preparation-work/index.html?action=' + (booking.chat === 'green' ? 'green-icon' : 'new') + '&booking_id=' + encodeURIComponent(booking.id) + '&bu=' + encodeURIComponent(currentBu) + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg></a>';
  }

  function rowHtml(b) {
    return '<tr>' +
      '<td class="cell-num">' + MM.BOOK.fmtDate(b.checkIn) + '</td>' +
      '<td class="cell-num">' + MM.BOOK.fmtDate(b.checkOut) + '</td>' +
      '<td>' + b.property + '</td>' +
      '<td class="cell-strong">' + b.guest + '</td>' +
      '<td><span class="badge ' + (b.vipStatus === 'VIP 5*' ? 'badge-danger' : 'badge-info') + '">' + b.vipStatus + '</span></td>' +
      '<td class="text-xs text-muted">' + b.vipCriteria + '</td>' +
      '<td><div class="row-actions">' +
        readyIcon(b) +
        '<button class="btn btn-ghost btn-sm" data-ban="' + b.id + '" title="Remove from VIP tracking"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><line x1="4.9" y1="4.9" x2="19.1" y2="19.1"/></svg></button>' +
      '</div></td>' +
    '</tr>';
  }

  function renderList() {
    var rows = MM.BOOK.getVipBookings(currentBu);
    var tbody = document.getElementById('vip-rows');
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="7"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5-4.8-4.6 6.6-.9z"/></svg>' +
        '<h3>No VIP bookings for this business unit</h3><p>Adjust the criteria above, or check another business unit.</p></div></td></tr>';
    } else {
      tbody.innerHTML = rows.map(rowHtml).join('');
    }
    tbody.querySelectorAll('[data-ban]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-ban');
        MM.BOOK.confirmAction('Remove this booking from VIP tracking? It will no longer appear in the VIP guest list.', function () {
          MM.BOOK.banVipBooking(id);
          MM.showToast('Booking removed from VIP tracking.', { danger: true });
          renderList();
        }, { title: 'Remove from VIP tracking' });
      });
    });
    tbody.querySelectorAll('[data-warn-chat]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        MM.showToast('Please open the guest chat group first.', { danger: true });
      });
    });
  }

  buSelect.addEventListener('change', function () {
    currentBu = buSelect.value;
    var url = new URL(window.location.href);
    url.searchParams.set('bu', currentBu);
    window.history.replaceState({}, '', url);
    loadCriteriaForm();
    renderList();
  });

  document.getElementById('criteria-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(this)) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }
    var data = {
      vip: { price: Number(document.getElementById('vip-price').value), link: document.getElementById('vip-link').value, duration: Number(document.getElementById('vip-duration').value) },
      vip5: { price: Number(document.getElementById('vip5-price').value), link: document.getElementById('vip5-link').value, duration: Number(document.getElementById('vip5-duration').value) }
    };
    var btn = document.getElementById('update-criteria-btn');
    MM.simulateSave(btn, 'Updating…', function () {
      MM.BOOK.saveVipCriteria(currentBu, data);
      MM.showToast('VIP criteria updated for ' + currentBu + '.');
    });
  });

  loadCriteriaForm();
  renderList();
});
