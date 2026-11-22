document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id') || 'BK-10231';
  var b = MM.BOOK.getBookingById(id);

  if (!b) {
    document.getElementById('bk-content').hidden = true;
    document.getElementById('bk-not-found').hidden = false;
    return;
  }

  document.getElementById('bk-title').textContent = 'Modify Reservation ' + b.id;
  document.getElementById('bk-subtitle').textContent = b.property + ' · ' + b.guest;
  document.getElementById('details-link').href = '../book-028-booking-details-full/index.html?id=' + encodeURIComponent(b.id);

  var f = document.getElementById('form-main');
  document.getElementById('guest').value = b.guest || '';
  document.getElementById('mobile').value = b.mobile || '';
  document.getElementById('checkIn').value = b.checkIn || '';
  document.getElementById('checkOut').value = b.checkOut || '';
  document.getElementById('adults').value = b.adults != null ? b.adults : 2;
  document.getElementById('children').value = b.children != null ? b.children : 0;
  document.getElementById('status').value = (b.status || 'confirmed').toLowerCase();
  document.getElementById('amount').value = b.amount || b.total || 0;
  document.getElementById('notes').value = b.notes || '';

  MM.bindFormValidation(f);
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(f)) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }
    MM.simulateSave(document.getElementById('save-main'), 'Saving…', function () {
      MM.BOOK.saveBookingEdit(b.id, {
        guest: document.getElementById('guest').value.trim(),
        mobile: document.getElementById('mobile').value.trim(),
        checkIn: document.getElementById('checkIn').value,
        checkOut: document.getElementById('checkOut').value,
        adults: Number(document.getElementById('adults').value) || 0,
        children: Number(document.getElementById('children').value) || 0,
        status: document.getElementById('status').value,
        amount: Number(document.getElementById('amount').value) || 0,
        total: Number(document.getElementById('amount').value) || 0,
        notes: document.getElementById('notes').value.trim()
      });
      MM.showToast('Booking & guest details saved.');
    });
  });

  var fs = document.getElementById('form-services');
  var svcKey = 'mm_booking_extra_services';
  var svc = {};
  try { svc = (JSON.parse(localStorage.getItem(svcKey) || '{}'))[b.id] || {}; } catch (e) {}
  ['extra_bed','food_delivery','baby_cot','high_chair','meal_chef','bbq','vehicle_rental','excursion','pick_up_point','pick_up_time','transport_company','phone_number','special_request'].forEach(function (k) {
    if (svc[k] !== undefined) document.getElementById(k).value = svc[k];
  });
  MM.bindFormValidation(fs);
  fs.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(fs)) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }
    MM.simulateSave(document.getElementById('save-services'), 'Saving…', function () {
      var all = {};
      try { all = JSON.parse(localStorage.getItem(svcKey) || '{}'); } catch (e) {}
      var rec = {};
      ['extra_bed','food_delivery','baby_cot','high_chair','meal_chef','bbq','vehicle_rental','excursion','pick_up_point','pick_up_time','transport_company','phone_number','special_request'].forEach(function (k) {
        rec[k] = document.getElementById(k).value.trim();
      });
      all[b.id] = rec;
      localStorage.setItem(svcKey, JSON.stringify(all));
      MM.showToast('Extra services saved.');
    });
  });

  var conciergeSelect = document.getElementById('concierge-select');
  MM.MOCK_STAFF.filter(function (s) { return s.role === 'Concierge'; }).forEach(function (s) {
    var o = document.createElement('option'); o.value = s.name; o.textContent = s.name + ' — ' + s.team;
    if (s.name === b.concierge) o.selected = true;
    conciergeSelect.appendChild(o);
  });
  document.getElementById('save-concierge').addEventListener('click', function () {
    MM.BOOK.saveBookingEdit(b.id, { concierge: conciergeSelect.value });
    MM.closeModal('concierge-modal');
    MM.showToast('Concierge assigned: ' + conciergeSelect.value);
  });
});
