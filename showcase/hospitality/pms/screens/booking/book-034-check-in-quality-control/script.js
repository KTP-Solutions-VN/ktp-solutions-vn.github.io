document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('checkin_detail_id');
  var control = BOOK.CHECKIN_CONTROLS.filter(function (c) { return c.id === id; })[0] || BOOK.CHECKIN_CONTROLS[0];

  document.getElementById('qc-villa').textContent = control.property;

  // Find a matching booking to source the "assigned concierge" for comparison.
  var booking = BOOK.getAllBookings().filter(function (b) { return b.property === control.property; })[0];
  var assigned = booking ? booking.concierge : 'Daniel Tan';
  var mismatch = assigned !== control.staff;

  var performedEl = document.getElementById('qc-performed-by');
  performedEl.textContent = control.staff || '—';
  performedEl.style.color = mismatch ? 'var(--color-danger)' : '';
  performedEl.style.fontWeight = mismatch ? '700' : '';

  var assignedWrap = document.getElementById('qc-assigned-wrap');
  if (mismatch) {
    document.getElementById('qc-assigned').textContent = assigned;
  } else {
    assignedWrap.hidden = true;
  }

  var villa = BOOK.villaByName(control.property);
  var sameLocation = control.gps !== '—';
  document.getElementById('qc-location').innerHTML = control.gps === '—'
    ? '<span class="badge badge-neutral">Not yet recorded</span>'
    : (sameLocation ? '<span class="badge badge-success">Matches villa location (within 200m)</span>' : '<span class="badge badge-danger">Differs from villa location</span>');

  var plannedTime = '14:00';
  document.getElementById('qc-planned-time').textContent = plannedTime;
  document.getElementById('qc-actual-time').textContent = control.start !== '—' ? control.start : 'Not started';

  var onTime = control.start !== '—' && control.start <= '14:30';
  var resultEl = document.getElementById('qc-result');
  if (control.start === '—') {
    resultEl.innerHTML = '<span class="badge badge-neutral">Pending</span>';
  } else if (!mismatch && sameLocation && onTime) {
    resultEl.innerHTML = '<span class="badge badge-success">Passed — no discrepancies</span>';
  } else {
    resultEl.innerHTML = '<span class="badge badge-warning">Review recommended</span>';
  }
});
