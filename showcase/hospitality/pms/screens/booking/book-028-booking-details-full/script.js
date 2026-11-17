document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id') || 'BK-10231';
  var b = MM.BOOK.getBookingById(id);

  if (!b) {
    document.getElementById('bk-content').hidden = true;
    document.getElementById('bk-not-found').hidden = false;
    return;
  }

  document.getElementById('bk-title').textContent = 'Booking ' + b.id + ' — ' + b.property;
  document.getElementById('bk-subtitle').textContent = b.guest + ' · ' + MM.BOOK.fmtDate(b.checkIn) + ' – ' + MM.BOOK.fmtDate(b.checkOut);
  document.getElementById('bk-status-badge').innerHTML = MM.BOOK.statusBadge(b.status);
  document.getElementById('edit-link').href = '../book-037-edit-booking/index.html?id=' + encodeURIComponent(b.id);

  function field(label, value, cls) {
    return '<div><div class="detail-field__label">' + label + '</div><div class="detail-field__value' + (cls ? ' ' + cls : '') + '">' + (value === undefined || value === null || value === '' ? '—' : value) + '</div></div>';
  }

  var commission = b.commission || 0;
  document.getElementById('grid-booking').innerHTML = [
    field('Booking Code', b.id),
    field('Channel', b.referer),
    field('Booking Date', MM.BOOK.fmtDateTime(b.bookingDate)),
    field('Check-in', MM.BOOK.fmtDate(b.checkIn)),
    field('Check-out', MM.BOOK.fmtDate(b.checkOut)),
    field('Amount', MM.BOOK.fmtMoney(b.amount || b.total), 'money'),
    field('Commission', MM.BOOK.fmtMoney(commission), 'money'),
    field('Tax', MM.BOOK.fmtMoney(b.tax || 0), 'money'),
    field('Payment Status', b.paymentStatus),
    field('Villa', b.property),
    field('Owner', (MM.MOCK_PROPERTIES.filter(function(p){return p.name===b.property;})[0] || {}).concierge ? MM.MOCK_OWNERS.filter(function(o){return (o.properties||[]).indexOf((MM.MOCK_PROPERTIES.filter(function(p){return p.name===b.property;})[0]||{}).id) !== -1;})[0] : null),
    field('Notes', b.notes)
  ].join('').replace('[object Object]', '—');

  // Resolve owner name safely (avoid [object Object] if lookup found a record).
  var villaMeta = MM.MOCK_PROPERTIES.filter(function (p) { return p.name === b.property; })[0];
  var ownerMeta = villaMeta ? MM.MOCK_OWNERS.filter(function (o) { return (o.properties || []).indexOf(villaMeta.id) !== -1; })[0] : null;
  var ownerCell = document.querySelectorAll('#grid-booking .detail-field__value')[10];
  if (ownerCell) ownerCell.textContent = ownerMeta ? ownerMeta.name : '—';

  document.getElementById('grid-guest').innerHTML = [
    field('Guest Name', b.guest),
    field('Country', b.country),
    field('Total Guests', (b.adults || 0) + (b.children || 0)),
    field('Adults', b.adults),
    field('Children', b.children),
    field('Mobile', b.mobile)
  ].join('');

  document.getElementById('grid-prearrival').innerHTML = [
    field('Leader', b.adults > 3 ? b.guest : 'Not assigned'),
    field('Estimated Arrival', b.checkIn ? MM.BOOK.fmtDate(b.checkIn) + ', afternoon' : '—'),
    field('Transfer Required', b.adults > 2 ? 'Yes — airport pickup' : 'No'),
    field('Extra Requirements', b.notes || 'None'),
    field('Guest Chat Status', ['confirmed', 'checked-in'].indexOf((b.status||'').toLowerCase()) !== -1 ? 'Active' : 'Not started')
  ].join('');

  var isPast = ['checked-out', 'cancelled'].indexOf((b.status || '').toLowerCase()) !== -1 || (b.status||'').toLowerCase() === 'checked-in';
  document.getElementById('grid-arrival').innerHTML = [
    field('Check-in Time', isPast || (b.status||'').toLowerCase()==='checked-in' ? '14:20' : '—'),
    field('Check-out Time', (b.status||'').toLowerCase()==='checked-out' ? '11:05' : '—'),
    field('Check-in Staff', b.concierge || '—'),
    field('Check-out Staff', (b.status||'').toLowerCase()==='checked-out' ? (b.concierge || '—') : '—')
  ].join('');

  if (b.id === 'BK-10231' || b.id === 'BK-10234') {
    document.getElementById('images-block').hidden = false;
    document.getElementById('image-grid').innerHTML = [1,2,3,4].map(function (n) {
      return '<div class="image-grid__item"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>';
    }).join('');
  }
});
