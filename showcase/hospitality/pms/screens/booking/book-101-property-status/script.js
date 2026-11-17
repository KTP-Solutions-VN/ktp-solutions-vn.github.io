(function () {
  'use strict';

  var STATUS_SEED = {
    'PV-101': { guest: 'in-house', cleaning: 'clean', hasBooking: true, bookingId: 'BK-10231' },
    'PV-102': { guest: 'checked-out', cleaning: 'to-clean', hasBooking: true, bookingId: 'BK-10236' },
    'PV-103': { guest: 'checking-out', cleaning: 'to-clean', hasBooking: true, bookingId: 'BK-10237' },
    'PV-104': { guest: 'vacant', cleaning: 'clean', hasBooking: false, bookingId: null },
    'PV-105': { guest: 'checking-in', cleaning: 'clean', hasBooking: true, bookingId: 'BK-10238' },
    'PV-106': { guest: 'in-house', cleaning: 'to-clean', hasBooking: true, bookingId: 'BK-10239' },
    'PV-107': { guest: 'vacant', cleaning: 'clean', hasBooking: false, bookingId: null },
    'PV-108': { guest: 'in-house', cleaning: 'clean', hasBooking: true, bookingId: 'BK-10240' }
  };

  function getOverrides() { return JSON.parse(localStorage.getItem('mm_book_property_status') || '{}'); }
  function saveOverrides(o) { localStorage.setItem('mm_book_property_status', JSON.stringify(o)); }
  function statusFor(propId) {
    var overrides = getOverrides();
    return Object.assign({}, STATUS_SEED[propId], overrides[propId] || {});
  }

  function fillSelect(el, options) {
    el.innerHTML = options.map(function (o) { return '<option>' + o + '</option>'; }).join('');
  }
  var bus = MM.MOCK_PROPERTIES.map(function (p) { return p.bu; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
  fillSelect(document.getElementById('f-bu'), bus);

  function guestBadge(status) {
    var map = {
      'in-house': ['success', 'In House'], 'checked-out': ['neutral', 'Checked Out'],
      'checking-out': ['warning', 'Checking Out'], 'checking-in': ['info', 'Checking In'], 'vacant': ['neutral', 'Vacant']
    };
    var m = map[status] || ['neutral', status];
    return '<span class="badge badge-' + m[0] + '">' + m[1] + '</span>';
  }
  function cleaningBadge(status) {
    var map = { clean: ['success', 'Clean'], 'to-clean': ['warning', 'To Be Cleaned'] };
    var m = map[status] || ['neutral', status];
    return '<span class="badge badge-' + m[0] + '">' + m[1] + '</span>';
  }

  function render() {
    var bu = document.getElementById('f-bu').value;
    var villas = MM.MOCK_PROPERTIES.filter(function (p) { return !bu || p.bu === bu; });
    var tbody = document.getElementById('status-tbody');
    tbody.innerHTML = villas.map(function (p) {
      var s = statusFor(p.id);
      var canAdjust = s.guest !== 'checking-out';
      return '<tr>' +
        '<td>' + p.name + '</td>' +
        '<td>' + guestBadge(s.guest) + '</td>' +
        '<td>' + cleaningBadge(s.cleaning) + '</td>' +
        '<td style="text-align:right;">' +
          (s.hasBooking ? '<button class="btn btn-ghost btn-sm" data-staff="' + p.id + '">Staff</button> ' : '') +
          (canAdjust ? '<button class="btn btn-ghost btn-sm" data-adjust="' + p.id + '">Adjust</button>' : '') +
        '</td>' +
      '</tr>';
    }).join('');
  }

  document.getElementById('f-bu').addEventListener('change', render);
  document.querySelectorAll('input[name="scope"]').forEach(function (r) { r.addEventListener('change', render); });

  function openStaffModal(propId) {
    var p = MM.MOCK_PROPERTIES.filter(function (x) { return x.id === propId; })[0];
    var s = statusFor(propId);
    document.getElementById('staff-modal-title').textContent = p.name + ' — Staff Detail';
    document.getElementById('staff-coords').textContent = 'Lat 7.891, Lng 98.296 (approx.)';
    document.getElementById('staff-checkout').innerHTML =
      '<div class="staff-row"><div><strong>' + (p.concierge || 'Concierge') + '</strong><div class="staff-row__meta">Start 10:02 AM · Villa Gate · 0.0 km</div></div><div class="staff-row__meta">End 10:18 AM · Villa Gate · 0.0 km</div></div>';
    var cleaningBlock = document.getElementById('staff-cleaning-block');
    var makeupBlock = document.getElementById('staff-makeup-block');
    if (s.cleaning === 'clean') {
      cleaningBlock.style.display = '';
      document.getElementById('staff-cleaning').innerHTML = '<div class="staff-row"><div><strong>Nok Pattaya</strong><div class="staff-row__meta">Completed 2026-08-26</div></div><button class="btn btn-outline btn-sm" data-preview="cleaning">Clean</button></div>';
      makeupBlock.style.display = '';
      document.getElementById('staff-makeup').innerHTML = '<div class="staff-row"><div><strong>Wayan Kertha</strong><div class="staff-row__meta">Completed 2026-08-26</div></div><button class="btn btn-outline btn-sm" data-preview="makeup">Clean</button></div>';
    } else {
      cleaningBlock.style.display = 'none';
      makeupBlock.style.display = 'none';
    }
    MM.openModal('staff-modal');
  }

  function openAdjustModal(propId) {
    var s = statusFor(propId);
    var fields = '';
    if (s.guest === 'checking-in' || s.guest === 'in-house') {
      fields += '<div class="form-group"><label>Guest Status (Check-in)</label><div style="display:flex;gap:8px;"><select id="adj-checkin"><option value="">Select</option><option>Early check-in</option><option>Late check-in</option><option>No show</option></select><button class="btn btn-outline btn-sm" data-update="checkin" data-prop="' + propId + '">Update</button></div></div>';
    }
    fields += '<div class="form-group"><label>Cleaning Status</label><div style="display:flex;gap:8px;"><select id="adj-clean"><option value="clean"' + (s.cleaning === 'clean' ? ' selected' : '') + '>Clean</option><option value="to-clean"' + (s.cleaning === 'to-clean' ? ' selected' : '') + '>To be Cleaned</option></select><button class="btn btn-outline btn-sm" data-update="clean" data-prop="' + propId + '">Update</button></div></div>';
    fields += '<div class="form-group"><label>Makeup Status</label><div style="display:flex;gap:8px;"><select id="adj-makeup"><option value="clean">Clean</option><option value="to-clean">To be Cleaned</option></select><button class="btn btn-outline btn-sm" data-update="makeup" data-prop="' + propId + '">Update</button></div></div>';
    document.getElementById('adjust-fields').innerHTML = fields;
    MM.openModal('adjust-modal');
  }

  document.getElementById('status-tbody').addEventListener('click', function (e) {
    var staffBtn = e.target.closest('[data-staff]');
    if (staffBtn) { openStaffModal(staffBtn.getAttribute('data-staff')); return; }
    var adjustBtn = e.target.closest('[data-adjust]');
    if (adjustBtn) { openAdjustModal(adjustBtn.getAttribute('data-adjust')); }
  });

  document.getElementById('staff-modal').addEventListener('click', function (e) {
    var previewBtn = e.target.closest('[data-preview]');
    if (previewBtn) MM.showToast('Opening ' + previewBtn.getAttribute('data-preview') + ' team detail...');
  });

  document.getElementById('adjust-fields').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-update]');
    if (!btn) return;
    var propId = btn.getAttribute('data-prop');
    var kind = btn.getAttribute('data-update');
    var overrides = getOverrides();
    overrides[propId] = overrides[propId] || {};
    if (kind === 'clean') overrides[propId].cleaning = document.getElementById('adj-clean').value;
    if (kind === 'checkin') overrides[propId].guest = 'in-house';
    saveOverrides(overrides);
    MM.showToast('Status updated');
    MM.closeModal('adjust-modal');
    render();
  });

  render();
})();
