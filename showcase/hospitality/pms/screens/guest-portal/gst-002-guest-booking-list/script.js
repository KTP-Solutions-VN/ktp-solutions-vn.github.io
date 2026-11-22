(function () {
  'use strict';

  var STATUS_BADGE = {
    confirmed: '<span class="badge badge-info">Confirmed</span>',
    completed: '<span class="badge badge-success">Completed</span>',
    cancelled: '<span class="badge badge-danger">Cancelled</span>'
  };
  var TILE_CLASS = { 'PV-101': 'photo-tile--a', 'PV-105': 'photo-tile--b' };

  function villaIcon() {
    return '<svg class="photo-tile__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/></svg>';
  }

  function upcomingCardHtml(b) {
    var villa = GST.getVilla(b.propertyId);
    var nights = GST.nightsBetween(b.checkIn, b.checkOut);
    return (
      '<div class="card stay-card hoverable clickable" data-open-booking="' + b.id + '" tabindex="0" role="button">' +
        '<div class="stay-card__photo"><div class="photo-tile ' + (TILE_CLASS[b.propertyId] || 'photo-tile--a') + '">' + villaIcon() + '<div><div class="photo-tile__label">' + villa.name + '</div><div class="photo-tile__sub">' + villa.district + ', Sentosa</div></div></div></div>' +
        '<div class="stay-card__body">' +
          '<div class="stay-card__top"><div><div class="cell-strong" style="font-size:16px;">' + villa.name + '</div><div class="cell-sub">Booking ' + b.id + '</div></div>' + STATUS_BADGE[b.status] + '</div>' +
          '<div class="stay-card__dates"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' +
            GST.fmtDate(b.checkIn) + ' &rarr; ' + GST.fmtDate(b.checkOut) + ' &middot; ' + nights + ' nights</div>' +
          '<div class="stay-card__footer">' +
            '<span class="text-sm text-muted">Total ' + '$' + b.total.toLocaleString() + '</span>' +
            '<button class="btn btn-primary btn-sm" data-open-booking-btn="' + b.id + '">View Trip Details' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function pastCardHtml(b) {
    var villa = GST.getVilla(b.propertyId);
    var nights = GST.nightsBetween(b.checkIn, b.checkOut);
    var cancelled = b.status === 'cancelled';
    return (
      '<div class="card stay-card' + (cancelled ? '' : ' hoverable clickable') + '"' + (cancelled ? '' : ' data-open-amenities="' + b.id + '" tabindex="0" role="button"') + ' style="' + (cancelled ? 'opacity:.65;' : '') + '">' +
        '<div class="stay-card__photo"><div class="photo-tile photo-tile--d">' + villaIcon() + '<div><div class="photo-tile__label">' + villa.name + '</div><div class="photo-tile__sub">' + villa.district + ', Sentosa</div></div></div></div>' +
        '<div class="stay-card__body">' +
          '<div class="stay-card__top"><div><div class="cell-strong" style="font-size:16px;">' + villa.name + '</div><div class="cell-sub">Booking ' + b.id + '</div></div>' + STATUS_BADGE[b.status] + '</div>' +
          '<div class="stay-card__dates"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' +
            GST.fmtDate(b.checkIn) + ' &rarr; ' + GST.fmtDate(b.checkOut) + ' &middot; ' + nights + ' nights</div>' +
          '<div class="stay-card__footer">' +
            (cancelled
              ? '<span class="text-sm text-muted">This booking was cancelled — no amenities access is available for it.</span>'
              : ('<span class="text-sm text-muted">Total ' + '$' + b.total.toLocaleString() + '</span>' +
                 '<button class="btn btn-outline btn-sm" data-open-amenities-btn="' + b.id + '">Quick Links' +
                 '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>')) +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function render() {
    var upcoming = GST.upcomingBookings();
    var past = GST.pastBookings();

    var heading = document.getElementById('welcome-heading');
    var sub = document.getElementById('welcome-sub');
    var firstName = GST.GUEST.name.split(' ')[0];
    var total = upcoming.length + past.length;

    if (total === 0) {
      heading.textContent = 'Welcome, ' + firstName;
      sub.textContent = "We couldn't find any bookings for this access code yet.";
    } else if (upcoming.length + past.length === 1) {
      heading.textContent = 'Welcome, ' + firstName;
      sub.textContent = "Here's your booking with Azura Stays.";
    } else {
      heading.textContent = 'Welcome back, ' + firstName;
      sub.textContent = 'You have ' + total + ' bookings with us — here\'s everything at a glance.';
    }

    var upcomingList = document.getElementById('upcoming-list');
    var pastList = document.getElementById('past-list');
    var emptyState = document.getElementById('empty-bookings');

    upcomingList.innerHTML = upcoming.length
      ? upcoming.map(upcomingCardHtml).join('')
      : '<div class="empty-state"><svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg><h3>No upcoming stays</h3><p>When your next stay is booked, it will show up here.</p></div>';

    pastList.innerHTML = past.length
      ? past.map(pastCardHtml).join('')
      : '<div class="empty-state"><p>No past bookings yet.</p></div>';

    document.querySelector('.page-header:nth-of-type(1)');
    // Hide the "Past Bookings" heading entirely when there are none (per GST-002 spec: only shown when both exist)
    var pastHeader = pastList.previousElementSibling;
    if (!past.length && pastHeader) pastHeader.style.display = 'none';

    document.getElementById('checkin-prompt').hidden = upcoming.length === 0;

    document.querySelectorAll('[data-open-booking], [data-open-booking-btn]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var id = el.getAttribute('data-open-booking') || el.getAttribute('data-open-booking-btn');
        GST.setActiveBookingId(id);
        window.location.href = '../gst-003-my-booking-details/index.html';
      });
    });
    document.querySelectorAll('[data-open-amenities], [data-open-amenities-btn]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var id = el.getAttribute('data-open-amenities') || el.getAttribute('data-open-amenities-btn');
        GST.setActiveBookingId(id);
        window.location.href = '../gst-004-amenities-access-portal/index.html';
      });
    });

    var checkinLink = document.getElementById('checkin-prompt-link');
    if (upcoming.length) {
      checkinLink.addEventListener('click', function () { GST.setActiveBookingId(upcoming[0].id); });
    }
  }

  render();
})();
