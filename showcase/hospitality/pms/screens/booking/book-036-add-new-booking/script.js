document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('booking-form');
  var villaSel = document.getElementById('villa_id');
  var STORE_KEY = 'mm_bookings_extra';

  MM.BOOK.VILLAS.forEach(function (v) {
    if (v.openStatus !== 'Open') return;
    var o = document.createElement('option');
    o.value = v.id; o.textContent = v.name + (v.rate ? ' — $' + v.rate + '/night' : ' — rate not set');
    o.dataset.rate = v.rate || '';
    villaSel.appendChild(o);
  });

  function recompute() {
    var opt = villaSel.options[villaSel.selectedIndex];
    var rate = opt && opt.dataset.rate ? Number(opt.dataset.rate) : 0;
    var ci = document.getElementById('check_in_date').value;
    var co = document.getElementById('check_out_date').value;
    var nights = (ci && co) ? MM.BOOK.nights(ci, co) : 0;
    var subtotal = rate * nights;
    var serviceFee = Math.round(subtotal * 0.08 * 100) / 100;
    var cleaningFee = nights > 0 ? 80 : 0;
    var total = subtotal + serviceFee + cleaningFee;

    document.getElementById('sum-rate').textContent = MM.BOOK.fmtMoney(rate);
    document.getElementById('sum-nights').textContent = nights;
    document.getElementById('sum-subtotal').textContent = MM.BOOK.fmtMoney(subtotal);
    document.getElementById('sum-service-fee').textContent = MM.BOOK.fmtMoney(serviceFee);
    document.getElementById('sum-cleaning-fee').textContent = MM.BOOK.fmtMoney(cleaningFee);
    document.getElementById('sum-total').textContent = MM.BOOK.fmtMoney(total);

    var hint = document.getElementById('villa-rate-hint');
    hint.textContent = (rate === 0 && opt && opt.value) ? 'This villa has no nightly rate configured — see Villas Missing Rates.' : '';

    var amountInput = document.getElementById('amount');
    if (!amountInput.dataset.manualEdit) amountInput.value = total ? total.toFixed(2) : '';
  }

  villaSel.addEventListener('change', recompute);
  document.getElementById('check_in_date').addEventListener('change', recompute);
  document.getElementById('check_out_date').addEventListener('change', recompute);
  document.getElementById('amount').addEventListener('input', function () { this.dataset.manualEdit = '1'; });

  MM.bindFormValidation(form);

  document.getElementById('btn-cancel').addEventListener('click', function () {
    window.location.href = '../book-002-booking-list/index.html';
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }
    var ci = document.getElementById('check_in_date').value;
    var co = document.getElementById('check_out_date').value;
    if (co <= ci) {
      document.getElementById('check_out_date').closest('.form-group').classList.add('has-error');
      document.getElementById('check_out_date').closest('.form-group').querySelector('.form-error').textContent = 'Check-out must be after check-in.';
      MM.showToast('Check-out date must be after check-in.', { danger: true });
      return;
    }
    var opt = villaSel.options[villaSel.selectedIndex];
    var saveBtn = document.getElementById('btn-save');
    MM.simulateSave(saveBtn, 'Saving…', function () {
      var newBooking = {
        id: 'BK-' + Math.floor(10300 + Math.random() * 800),
        property: opt.textContent.split(' — ')[0],
        guest: document.getElementById('first_name').value.trim() + ' ' + document.getElementById('last_name').value.trim(),
        checkIn: ci, checkOut: co,
        status: document.getElementById('status').value,
        total: Number(document.getElementById('amount').value) || 0,
        amount: Number(document.getElementById('amount').value) || 0,
        referer: document.getElementById('referer').value,
        bookingDate: new Date().toISOString(),
        commission: 0, tax: 0,
        paymentStatus: document.getElementById('payment').value,
        country: '—', adults: 2, children: 0,
        mobile: document.getElementById('contact').value.trim(),
        concierge: '', notes: ''
      };
      var extra = [];
      try { extra = JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); } catch (e) {}
      extra.push(newBooking);
      localStorage.setItem(STORE_KEY, JSON.stringify(extra));
      MM.showToast('Booking ' + newBooking.id + ' created.');
      setTimeout(function () { window.location.href = '../book-036-p1-manual-booking-list/index.html'; }, 700);
    });
  });

  recompute();
});
