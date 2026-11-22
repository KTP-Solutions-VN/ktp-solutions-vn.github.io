(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../../home/index.html";

  var session = Kiosk.getSession();
  var parenting = session.parenting || {};
  if (session.flow !== "parenting" || !parenting.slotId) {
    // Opened directly (not by tapping through the flow): pre-fill the earlier steps
    parenting = Kiosk.sample("parenting", 3);
  }

  var course = DATA_PARENTING_COURSES.find(function (c) { return c.id === parenting.courseId; });
  var slot = DATA_PARENTING_SLOTS.find(function (s) { return s.id === parenting.slotId; });

  function weekdayDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });
  }

  var refCode = parenting.registrationId;
  if (!refCode) {
    refCode = Kiosk.refCode("CLS");
    Kiosk.parenting.add({
      id: refCode,
      courseId: parenting.courseId,
      guardianName: parenting.guardianName,
      contact: parenting.contact,
      childInfo: parenting.childInfo,
      childrenCount: parenting.childrenCount,
      attendedBefore: !!parenting.attendedBefore,
      slotId: parenting.slotId,
      status: "Registered",
      createdAt: new Date().toISOString()
    });
    Kiosk.setSession({ parenting: Object.assign({}, parenting, { registrationId: refCode }) });
  }

  var firstName = parenting.guardianName.split(" ")[0];

  document.getElementById("confirmationHost").innerHTML =
    '<div class="success-panel type-followup">' +
      '<div class="success-icon">' + icon("check-circle") + '</div>' +
      '<h1 style="font-size:24px;">Your seat request is in, ' + firstName + '!</h1>' +
      '<div class="success-code">' + refCode + '</div>' +
      '<p class="success-desc">Our team will confirm your seat at ' + parenting.contact + ' within <strong>2 business days</strong>.</p>' +
      '<div class="recap-list">' +
        '<div class="recap-row"><span class="recap-label">Class</span><span class="recap-value">' + course.name + '</span></div>' +
        '<div class="recap-row"><span class="recap-label">Date</span><span class="recap-value">' + weekdayDate(slot.date) + '</span></div>' +
        '<div class="recap-row"><span class="recap-label">Time</span><span class="recap-value">' + slot.time + '</span></div>' +
      '</div>' +
      '<div class="crosssell-card">' +
        '<div class="crosssell-icon">' + icon("heart-pulse") + '</div>' +
        '<div class="crosssell-body">' +
          '<div class="crosssell-title">Planning to deliver with us?</div>' +
          '<div class="crosssell-desc">Sign up for a maternity package while you\'re here.</div>' +
        '</div>' +
        '<a href="../../maternity-package/step-1-intro/index.html" class="btn btn-outline" style="width:auto;min-width:0;padding:0 var(--sp-4);min-height:48px;">Explore</a>' +
      '</div>' +
    '</div>';

  document.getElementById("homeCta").addEventListener("click", function () {
    Kiosk.clearSession();
    window.location.href = homeUrl;
  });

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: homeUrl, idleMs: 30000, graceMs: 10000 });
})();
