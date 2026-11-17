/* Bookings screen behaviour — mock table data, tab filter, bulk select, detail modal. */

(function () {
  'use strict';

  var BOOKINGS = [
    { id: 'RSV-1000', guest: 'Sophie Martin', property: 'Villa Andaman Breeze — Room 2', checkin: '2026-07-20', checkout: '2026-07-23', channel: 'Booking.com', status: 'confirmed', total: 960, lifecycle: 'in-stay' },
    { id: 'RSV-1001', guest: 'Diego Fernandez', property: 'Palm Grove Residence', checkin: '2026-07-22', checkout: '2026-07-26', channel: 'Airbnb', status: 'new', total: 1340, lifecycle: 'new' },
    { id: 'RSV-1002', guest: 'Emma Wilson', property: 'Sunset Cove Bungalow — Room 1', checkin: '2026-07-22', checkout: '2026-07-24', channel: 'Direct Booking', status: 'confirmed', total: 700, lifecycle: 'in-stay' },
    { id: 'RSV-1003', guest: 'Lucas Meyer', property: 'Aegean Sunset Villa', checkin: '2026-07-23', checkout: '2026-07-27', channel: 'Agoda', status: 'pending-payment', total: 1120, lifecycle: 'pending-payment' },
    { id: 'RSV-1004', guest: 'Anna Kowalski', property: 'Caribbean Blue Villa', checkin: '2026-07-15', checkout: '2026-07-19', channel: 'Booking.com', status: 'completed', total: 1580, lifecycle: 'completed' },
    { id: 'RSV-1005', guest: 'James Carter', property: 'Villa Andaman Breeze — Room 4', checkin: '2026-07-10', checkout: '2026-07-14', channel: 'Airbnb', status: 'completed', total: 890, lifecycle: 'completed' },
    { id: 'RSV-1006', guest: 'Priya Sharma', property: 'Sunshine Coast Bungalow', checkin: '2026-07-24', checkout: '2026-07-26', channel: 'Expedia', status: 'cancelled', total: 540, lifecycle: 'cancelled' },
    { id: 'RSV-1007', guest: 'Noah Andersen', property: 'Villa Andaman Breeze — Room 1', checkin: '2026-07-25', checkout: '2026-07-29', channel: 'Direct Booking', status: 'new', total: 1460, lifecycle: 'new' },
    { id: 'RSV-1008', guest: 'Mia Papadopoulos', property: 'Aegean Sunset Villa', checkin: '2026-07-18', checkout: '2026-07-21', channel: 'Booking.com', status: 'completed', total: 1010, lifecycle: 'completed' },
    { id: 'RSV-1009', guest: 'Isabella Novak', property: 'Palm Grove Residence', checkin: '2026-07-26', checkout: '2026-07-30', channel: 'Agoda', status: 'pending-payment', total: 1670, lifecycle: 'pending-payment' },
    { id: 'RSV-1010', guest: 'Ethan Walsh', property: 'Sunset Cove Bungalow — Room 1', checkin: '2026-07-21', checkout: '2026-07-24', channel: 'Airbnb', status: 'confirmed', total: 780, lifecycle: 'in-stay' },
    { id: 'RSV-1011', guest: 'Tom Becker', property: 'Caribbean Blue Villa', checkin: '2026-07-22', checkout: '2026-07-23', channel: 'Direct Booking', status: 'confirmed', total: 430, lifecycle: 'in-stay' }
  ];

  var STATUS_BADGE = {
    confirmed: 'badge-success',
    new: 'badge-info',
    'pending-payment': 'badge-warning',
    completed: 'badge-neutral',
    cancelled: 'badge-danger'
  };

  var STATUS_LABEL = {
    confirmed: 'Confirmed',
    new: 'New',
    'pending-payment': 'Pending Payment',
    completed: 'Completed',
    cancelled: 'Cancelled'
  };

  var tbody = document.getElementById('bookings-tbody');
  var currentFilter = 'all';

  function formatDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function renderRows() {
    var rows = BOOKINGS.filter(function (b) {
      return currentFilter === 'all' || b.lifecycle === currentFilter;
    });

    tbody.innerHTML = '';

    if (rows.length === 0) {
      tbody.innerHTML = '<tr><td colspan="10"><div class="empty-state"><div class="empty-icon">🗂️</div>No bookings match this filter.</div></td></tr>';
      return;
    }

    rows.forEach(function (b) {
      var tr = document.createElement('tr');
      tr.className = 'clickable';
      tr.innerHTML =
        '<td><input type="checkbox" class="row-check" data-id="' + b.id + '"></td>' +
        '<td class="cell-strong">' + b.id + '</td>' +
        '<td>' + b.guest + '</td>' +
        '<td>' + b.property + '</td>' +
        '<td>' + formatDate(b.checkin) + '</td>' +
        '<td>' + formatDate(b.checkout) + '</td>' +
        '<td>' + b.channel + '</td>' +
        '<td><span class="badge ' + STATUS_BADGE[b.status] + '">' + STATUS_LABEL[b.status] + '</span></td>' +
        '<td class="cell-strong">$' + b.total.toLocaleString() + '</td>' +
        '<td><button class="btn btn-sm btn-outline" data-view="' + b.id + '">View</button></td>';

      tr.addEventListener('click', function (e) {
        if (e.target.closest('input, button')) return;
        openDetail(b);
      });

      tr.querySelector('[data-view]').addEventListener('click', function (e) {
        e.stopPropagation();
        openDetail(b);
      });

      tr.querySelector('.row-check').addEventListener('click', function (e) {
        e.stopPropagation();
        updateBulkBar();
      });

      tbody.appendChild(tr);
    });
  }

  function updateBulkBar() {
    var checked = document.querySelectorAll('.row-check:checked');
    var bar = document.getElementById('bulk-bar');
    var count = document.getElementById('bulk-count');
    if (checked.length > 0) {
      bar.hidden = false;
      count.textContent = checked.length + ' selected';
    } else {
      bar.hidden = true;
    }
  }

  document.getElementById('select-all').addEventListener('change', function (e) {
    document.querySelectorAll('.row-check').forEach(function (cb) { cb.checked = e.target.checked; });
    updateBulkBar();
  });

  document.querySelector('[data-tabs="booking-tabs"]').addEventListener('click', function (e) {
    var tab = e.target.closest('.tab-item');
    if (!tab) return;
    currentFilter = tab.getAttribute('data-tab');
    renderRows();
  });

  /* --- Detail modal --- */

  function openDetail(b) {
    document.getElementById('detail-property').textContent = b.property;
    document.getElementById('detail-guest').textContent = 'Guest: ' + b.guest;
    document.getElementById('detail-id').textContent = b.id;
    document.getElementById('detail-channel').textContent = b.channel;
    document.getElementById('detail-status').innerHTML = '<span class="badge ' + STATUS_BADGE[b.status] + '">' + STATUS_LABEL[b.status] + '</span>';
    document.getElementById('detail-checkin').textContent = formatDate(b.checkin);
    document.getElementById('detail-checkout').textContent = formatDate(b.checkout);
    document.getElementById('detail-total').textContent = '$' + b.total.toLocaleString();
    window.CM.openModal('modal-booking-detail');
  }

  renderRows();
})();
