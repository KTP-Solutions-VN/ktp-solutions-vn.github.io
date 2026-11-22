(function () {
  var CART_URL = '../../../screens/gio-hang/gio-hang/index.html';
  var selectedSlotId = null;

  function qs(name) { return new URLSearchParams(window.location.search).get(name); }

  function getProduct() {
    var id = qs('productId');
    return DATA_SAN_PHAM_DICH_VU.find(function (p) { return p.id === id; }) || DATA_SAN_PHAM_DICH_VU.find(function (p) { return p.bookingRequired; });
  }

  function render() {
    var p = getProduct();
    var pending = CJ.storage.get('tj_pending_selection', null);
    document.getElementById('pdp-name').textContent = 'Select a Time Slot — ' + p.name;
    document.getElementById('pdp-sub').textContent = pending && pending.variant ? 'Option: ' + pending.variant + '. Select an available slot — capacity is checked in real time.' : 'Select an available slot — capacity is checked in real time to avoid overbooking.';

    var slots = DATA_LICH_DAT_DICH_VU.filter(function (s) { return s.productId === p.id; });
    var dates = [];
    slots.forEach(function (s) { if (dates.indexOf(s.date) === -1) dates.push(s.date); });
    dates.sort();
    var selectedDate = dates[0];

    function renderDates() {
      document.getElementById('date-pills').innerHTML = dates.map(function (d, i) {
        return '<button type="button" class="option-pill' + (d === selectedDate ? ' is-selected' : '') + '" data-date="' + d + '">' + CJ.formatDate(d) + '</button>';
      }).join('');
      document.querySelectorAll('#date-pills [data-date]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          selectedDate = btn.getAttribute('data-date');
          document.querySelectorAll('#date-pills [data-date]').forEach(function (b) { b.classList.remove('is-selected'); });
          btn.classList.add('is-selected');
          selectedSlotId = null;
          renderSlots();
        });
      });
    }

    function renderSlots() {
      var daySlots = slots.filter(function (s) { return s.date === selectedDate; });
      document.getElementById('slot-list').innerHTML = daySlots.map(function (s) {
        var full = s.status !== 'open';
        var remaining = s.capacityTotal - s.capacityBooked;
        return '<div class="slot-row' + (full ? ' is-disabled' : '') + (selectedSlotId === s.id ? ' is-selected' : '') + '" data-slot="' + s.id + '">' +
          '<div><strong>' + s.timeSlot + '</strong><div class="text-sm text-muted">' + s.location + ' · ' + s.facilitator + '</div></div>' +
          '<span class="badge ' + (full ? 'badge-neutral' : (remaining <= 3 ? 'badge-warning' : 'badge-success')) + '">' + (full ? (s.status === 'full' ? 'Fully Booked' : 'Closed') : remaining + ' spot(s) left') + '</span>' +
        '</div>';
      }).join('') || '<p class="text-muted">No slots available on this date.</p>';

      document.querySelectorAll('.slot-row:not(.is-disabled)').forEach(function (row) {
        row.addEventListener('click', function () {
          selectedSlotId = row.getAttribute('data-slot');
          document.querySelectorAll('.slot-row').forEach(function (r) { r.classList.remove('is-selected'); });
          row.classList.add('is-selected');
          var s = daySlots.find(function (x) { return x.id === selectedSlotId; });
          document.getElementById('selected-summary').textContent = CJ.formatDate(s.date) + ' · ' + s.timeSlot + ' · ' + s.location;
          document.getElementById('btn-confirm-slot').disabled = false;
        });
      });
    }

    renderDates();
    renderSlots();

    document.getElementById('btn-confirm-slot').addEventListener('click', function () {
      var s = slots.find(function (x) { return x.id === selectedSlotId; });
      if (!s) return;
      var btn = this;
      btn.disabled = true;
      var original = btn.innerHTML;
      btn.innerHTML = 'Confirming…';
      setTimeout(function () {
        var cart = CJ.getCart();
        var source = (pending && pending.source) || { key: 'online', fulfillment: 'booking-confirmation' };
        cart.push({
          lineId: 'CL-' + Date.now(),
          productId: p.id,
          name: p.name,
          variant: (pending && pending.variant) || '—',
          qty: 1,
          unitPrice: p.specialPrice || p.listPrice,
          purchaseSource: source.key,
          eventName: source.eventName || null,
          fulfillmentMethod: 'booking-confirmation',
          slot: { date: s.date, timeSlot: s.timeSlot, location: s.location }
        });
        CJ.setCart(cart);
        CJ.storage.remove('tj_pending_selection');
        CJ.toast('Slot confirmed and added to cart.', 'success');
        setTimeout(function () { window.location.href = CART_URL; }, 500);
      }, 500);
    });
  }

  document.addEventListener('DOMContentLoaded', render);
})();
