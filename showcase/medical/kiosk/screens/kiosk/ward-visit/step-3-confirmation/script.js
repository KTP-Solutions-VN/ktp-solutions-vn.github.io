(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../../home/index.html";

  var session = Kiosk.getSession();
  var tour = session.tour || {};
  if (session.flow !== "tour" || !tour.visitorName) {
    // Opened directly (not by tapping through the flow): pre-fill the earlier steps
    tour = Kiosk.sample("tour", 2);
  }

  function weekdayDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });
  }

  // Persist the booking once, keyed off a ref code stored back into the
  // session so re-rendering (e.g. idle-ring interval) never double-books.
  var refCode = tour.bookingId;
  if (!refCode) {
    refCode = Kiosk.refCode("VIS");
    Kiosk.tour.add({
      id: refCode,
      slotId: tour.slotId,
      visitorName: tour.visitorName,
      contact: tour.contact,
      guestCount: tour.guestCount,
      status: "Confirmed",
      createdAt: new Date().toISOString()
    });
    Kiosk.setSession({ tour: Object.assign({}, tour, { bookingId: refCode }) });
  }

  var firstName = tour.visitorName.split(" ")[0];

  document.getElementById("confirmationHost").innerHTML =
    '<div class="success-panel type-followup">' +
      '<div class="success-icon">' + icon("check-circle") + '</div>' +
      '<h1 style="font-size:24px;">You\'re booked in, ' + firstName + '!</h1>' +
      '<div class="success-code">' + refCode + '</div>' +
      '<p class="success-desc">Show this reference code at the guest services desk when you arrive. We\'ll also send a reminder to ' + tour.contact + '.</p>' +
      '<div class="recap-list">' +
        '<div class="recap-row"><span class="recap-label">Date</span><span class="recap-value">' + weekdayDate(tour.slotDate) + '</span></div>' +
        '<div class="recap-row"><span class="recap-label">Time</span><span class="recap-value">' + tour.slotTime + '</span></div>' +
        '<div class="recap-row"><span class="recap-label">Guests</span><span class="recap-value">' + tour.guestCount + '</span></div>' +
        '<div class="recap-row"><span class="recap-label">Led by</span><span class="recap-value">' + tour.facilitator + '</span></div>' +
      '</div>' +
      '<button type="button" class="btn btn-outline btn-huge" id="calendarBtn" style="max-width:320px;">' +
        icon("calendar") + ' Add to calendar' +
      '</button>' +
      '<div class="crosssell-card" style="margin-top:var(--sp-2);">' +
        '<div class="crosssell-icon">' + icon("heart-pulse") + '</div>' +
        '<div class="crosssell-body">' +
          '<div class="crosssell-title">Expecting already?</div>' +
          '<div class="crosssell-desc">Sign up for a maternity package now and save yourself a return trip.</div>' +
        '</div>' +
        '<a href="../../maternity-package/step-1-intro/index.html" class="btn btn-outline" style="width:auto;min-width:0;padding:0 var(--sp-4);min-height:48px;">Explore</a>' +
      '</div>' +
    '</div>';

  document.getElementById("calendarBtn").addEventListener("click", function (e) {
    var btn = e.currentTarget;
    var original = btn.innerHTML;
    btn.innerHTML = icon("check") + " Added to calendar";
    btn.disabled = true;
    setTimeout(function () { btn.innerHTML = original; btn.disabled = false; }, 2200);
  });

  document.getElementById("homeCta").addEventListener("click", function () {
    Kiosk.clearSession();
    window.location.href = homeUrl;
  });

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: homeUrl, idleMs: 30000, graceMs: 10000 });
})();
