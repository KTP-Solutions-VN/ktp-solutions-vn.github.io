(function () {
  'use strict';

  var bookingId = GST.getActiveBookingId();
  var booking = GST.getBooking(bookingId);
  if (!booking) { window.location.href = '../gst-002-guest-booking-list/index.html'; return; }
  var villa = GST.getVilla(booking.propertyId);

  var arrivalEditing = false;
  var departureEditing = false;

  var ARRIVAL_PLACE_LABEL = { at_the_airport: 'at the airport', at_the_property: 'at the property' };

  function timeToMinutes(t) { var p = t.split(':'); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); }

  function fillStaticFields() {
    document.getElementById('villa-heading').textContent = villa.name;
    document.getElementById('villa-name-text').textContent = villa.name;
    document.getElementById('villa-address-text').textContent = villa.address;
    document.getElementById('villa-map-link').href = villa.mapUrl;
    document.getElementById('checkin-date').textContent = GST.fmtDateLong(booking.checkIn);
    document.getElementById('checkout-date').textContent = GST.fmtDateLong(booking.checkOut);
    document.getElementById('std-checkin').textContent = villa.standardCheckIn;
    document.getElementById('std-checkout').textContent = villa.standardCheckOut;

    var guestCount = GST.upcomingBookings().length + GST.pastBookings().length;
    document.getElementById('booking-sub').textContent = guestCount > 1
      ? 'Booking ' + booking.id + ' — confirm your estimated arrival and departure time so we\'re ready for you.'
      : 'Confirm your estimated arrival and departure time so we\'re ready for you.';
  }

  function renderAccessPortalCard() {
    var ready = GST.isFullyConfirmed(bookingId);
    var iconWrap = document.getElementById('access-icon-wrap');
    var copy = document.getElementById('access-portal-copy');
    var btn = document.getElementById('access-portal-btn');
    if (ready) {
      iconWrap.style.background = 'var(--color-success-bg)';
      iconWrap.style.color = 'var(--color-success)';
      copy.innerHTML = '<span class="badge badge-success" style="margin-bottom:8px;">Ready</span><br>Your times are confirmed — the Amenities &amp; Access Portal is unlocked.';
      btn.disabled = false;
      btn.classList.add('access-portal-btn-ready');
    } else {
      iconWrap.style.background = 'var(--color-gray-100)';
      iconWrap.style.color = 'var(--color-gray-400)';
      copy.textContent = 'Confirm both your arrival and departure time to unlock amenities, restaurants and more.';
      btn.disabled = true;
      btn.classList.remove('access-portal-btn-ready');
    }
  }

  function statusIcon(status) {
    if (status === 'approved') return { cls: 'done', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>' };
    if (status === 'unapproved') return { cls: 'pending', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' };
    return { cls: '', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>' };
  }

  function renderArrival() {
    var pa = GST.getPreArrival(bookingId);
    var a = pa.arrival;
    var row = document.getElementById('arrival-row');
    var editing = arrivalEditing || a.status === 'no_action';
    var icon = statusIcon(a.status);

    var html = '<div class="confirm-row__icon ' + icon.cls + '">' + icon.svg + '</div><div class="confirm-row__body">';
    html += '<div class="confirm-row__title">Estimated arrival time' + (a.status === 'approved' ? ' <span class="badge badge-success">Confirmed</span>' : a.status === 'unapproved' ? ' <span class="badge badge-warning">Pending review</span>' : ' <span class="badge badge-neutral">Not set</span>') + '</div>';

    if (a.updatedAt) {
      html += '<div class="confirm-row__message">You told us you\'ll arrive around <strong>' + a.time + '</strong> (' + ARRIVAL_PLACE_LABEL[a.place] + ').' +
        (a.status === 'approved' ? ' Confirmed by our concierge team.' : ' Awaiting confirmation from our concierge team.') + '</div>';
      if (!editing) {
        html += '<div class="confirm-row__actions"><button class="btn btn-ghost btn-sm" id="arrival-change-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="14" height="14"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg> Change</button></div>';
      }
    } else {
      html += '<div class="confirm-row__message">Tell us roughly when you\'ll arrive so we can plan your welcome.</div>';
    }

    if (editing) {
      html += '<div class="confirm-edit"><div class="form-grid">' +
        '<div class="form-group"><label for="arrival-time">Estimated arrival time<span class="req">*</span></label>' +
        '<input type="time" id="arrival-time" value="' + (a.time || '') + '" required>' +
        '<span class="form-error"></span><span class="form-hint">Villa check-in from ' + villa.standardCheckIn + ' — earlier arrivals can\'t be guaranteed.</span></div>' +
        '<div class="form-group"><label>Arrival place<span class="req">*</span></label>' +
        '<div class="radio-row">' +
          '<label class="radio-option"><input type="radio" name="arrival-place" value="at_the_property"' + (a.place !== 'at_the_airport' ? ' checked' : '') + '> At the property</label>' +
          '<label class="radio-option"><input type="radio" name="arrival-place" value="at_the_airport"' + (a.place === 'at_the_airport' ? ' checked' : '') + '> At the airport</label>' +
        '</div></div></div>' +
        '<div class="confirm-row__actions"><button class="btn btn-primary btn-sm" id="arrival-confirm-btn">Confirm arrival time</button>' +
        (a.updatedAt ? '<button class="btn btn-ghost btn-sm" id="arrival-cancel-btn">Cancel</button>' : '') + '</div></div>';
    }
    html += '</div>';
    row.innerHTML = html;

    if (editing) {
      var timeInput = document.getElementById('arrival-time');
      timeInput.addEventListener('blur', function () { validateArrivalTime(); });
      document.getElementById('arrival-confirm-btn').addEventListener('click', function (e) {
        e.preventDefault();
        if (!validateArrivalTime()) return;
        var place = document.querySelector('input[name="arrival-place"]:checked').value;
        var btn = e.currentTarget;
        MM.simulateSave(btn, 'Saving...', function () {
          var pa2 = GST.getPreArrival(bookingId);
          pa2.arrival = { time: timeInput.value, place: place, status: 'unapproved', setBy: 'guest', updatedAt: new Date().toISOString() };
          GST.setPreArrival(bookingId, pa2);
          arrivalEditing = false;
          MM.showToast('Arrival time saved — awaiting concierge confirmation.');
          renderArrival();
          renderAccessPortalCard();
        });
      });
      var cancelBtn = document.getElementById('arrival-cancel-btn');
      if (cancelBtn) cancelBtn.addEventListener('click', function () { arrivalEditing = false; renderArrival(); });
    }
    var changeBtn = document.getElementById('arrival-change-btn');
    if (changeBtn) changeBtn.addEventListener('click', function () { arrivalEditing = true; renderArrival(); });
  }

  function validateArrivalTime() {
    var input = document.getElementById('arrival-time');
    var group = input.closest('.form-group');
    var err = group.querySelector('.form-error');
    if (!input.value) { group.classList.add('has-error'); err.textContent = 'This field is required.'; return false; }
    var min = timeToMinutes(villa.standardCheckIn);
    var val = timeToMinutes(input.value);
    if (val < min) {
      group.classList.add('has-error');
      err.textContent = 'Please choose a time between ' + villa.standardCheckIn + ' and 23:59 (villa check-in time).';
      return false;
    }
    group.classList.remove('has-error');
    err.textContent = '';
    return true;
  }

  function renderDeparture() {
    var pa = GST.getPreArrival(bookingId);
    var d = pa.departure;
    var row = document.getElementById('departure-row');
    var editing = departureEditing || d.status === 'no_action';
    var icon = statusIcon(d.status);

    var html = '<div class="confirm-row__icon ' + icon.cls + '">' + icon.svg + '</div><div class="confirm-row__body">';
    html += '<div class="confirm-row__title">Estimated departure time' + (d.status === 'approved' ? ' <span class="badge badge-success">Confirmed</span>' : d.status === 'unapproved' ? ' <span class="badge badge-warning">Pending review</span>' : ' <span class="badge badge-neutral">Not set</span>') + '</div>';

    if (d.updatedAt) {
      html += '<div class="confirm-row__message">You told us you\'ll depart around <strong>' + d.time + '</strong>.' +
        (d.status === 'approved' ? ' Confirmed by our concierge team.' : ' Awaiting confirmation from our concierge team.') + '</div>';
      if (!editing) {
        html += '<div class="confirm-row__actions"><button class="btn btn-ghost btn-sm" id="departure-change-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="14" height="14"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg> Change</button></div>';
      }
    } else {
      html += '<div class="confirm-row__message">Tell us roughly when you\'ll head off on your last day.</div>';
    }

    if (editing) {
      html += '<div class="confirm-edit"><div class="form-grid single">' +
        '<div class="form-group"><label for="departure-time">Estimated departure time<span class="req">*</span></label>' +
        '<input type="time" id="departure-time" value="' + (d.time || '') + '" required>' +
        '<span class="form-error"></span><span class="form-hint">Villa check-out by ' + villa.standardCheckOut + ' — later departures can\'t be guaranteed.</span></div></div>' +
        '<div class="confirm-row__actions"><button class="btn btn-primary btn-sm" id="departure-confirm-btn">Confirm departure time</button>' +
        (d.updatedAt ? '<button class="btn btn-ghost btn-sm" id="departure-cancel-btn">Cancel</button>' : '') + '</div></div>';
    }
    html += '</div>';
    row.innerHTML = html;

    if (editing) {
      var timeInput = document.getElementById('departure-time');
      timeInput.addEventListener('blur', function () { validateDepartureTime(); });
      document.getElementById('departure-confirm-btn').addEventListener('click', function (e) {
        e.preventDefault();
        if (!validateDepartureTime()) return;
        var btn = e.currentTarget;
        MM.simulateSave(btn, 'Saving...', function () {
          var pa2 = GST.getPreArrival(bookingId);
          pa2.departure = { time: timeInput.value, status: 'unapproved', setBy: 'guest', updatedAt: new Date().toISOString() };
          GST.setPreArrival(bookingId, pa2);
          departureEditing = false;
          MM.showToast('Departure time saved — awaiting concierge confirmation.');
          renderDeparture();
          renderAccessPortalCard();
        });
      });
      var cancelBtn = document.getElementById('departure-cancel-btn');
      if (cancelBtn) cancelBtn.addEventListener('click', function () { departureEditing = false; renderDeparture(); });
    }
    var changeBtn = document.getElementById('departure-change-btn');
    if (changeBtn) changeBtn.addEventListener('click', function () { departureEditing = true; renderDeparture(); });
  }

  function validateDepartureTime() {
    var input = document.getElementById('departure-time');
    var group = input.closest('.form-group');
    var err = group.querySelector('.form-error');
    if (!input.value) { group.classList.add('has-error'); err.textContent = 'This field is required.'; return false; }
    var max = timeToMinutes(villa.standardCheckOut);
    var val = timeToMinutes(input.value);
    if (val > max) {
      group.classList.add('has-error');
      err.textContent = 'Please choose a time between 00:00 and ' + villa.standardCheckOut + ' (villa check-out time).';
      return false;
    }
    group.classList.remove('has-error');
    err.textContent = '';
    return true;
  }

  document.getElementById('access-portal-btn').addEventListener('click', function () {
    if (this.disabled) return;
    window.location.href = '../gst-004-amenities-access-portal/index.html';
  });
  // Guard against clicking a disabled-looking button that's still technically enabled
  // during a race with the toast (defensive; disabled attribute already blocks this normally).
  document.getElementById('access-portal-btn').addEventListener('mouseenter', function () {
    if (this.disabled) this.title = 'Please confirm your arrival and departure time before accessing the portal.';
  });

  fillStaticFields();
  renderArrival();
  renderDeparture();
  renderAccessPortalCard();
})();
