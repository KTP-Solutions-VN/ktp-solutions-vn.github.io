(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../../home/index.html";

  var session = Kiosk.getSession();
  var maternity = session.maternity || {};
  if (session.flow !== "maternity" || !maternity.trimester) {
    // Opened directly (not by tapping through the flow): pre-fill the earlier steps
    maternity = Kiosk.sample("maternity", 3);
  }

  var refCode = maternity.inquiryId;
  if (!refCode) {
    refCode = Kiosk.refCode("MAT");
    Kiosk.maternity.add({
      id: refCode,
      serviceType: maternity.serviceType,
      motherName: maternity.motherName,
      contact: maternity.contact,
      dueDate: maternity.dueDateText || null,
      trimester: maternity.trimester,
      pregnancyType: maternity.pregnancyType,
      hasComplications: !!maternity.hasComplications,
      complicationsNote: maternity.complicationsNote || null,
      preferredDoctor: maternity.preferredDoctor || null,
      roomType: maternity.roomType || null,
      status: "Submitted",
      createdAt: new Date().toISOString()
    });
    Kiosk.setSession({ maternity: Object.assign({}, maternity, { inquiryId: refCode }) });
  }

  var firstName = maternity.motherName.split(" ")[0];
  var isSubsequent = maternity.pregnancyType === "Subsequent pregnancy";

  document.getElementById("confirmationHost").innerHTML =
    '<div class="success-panel type-followup">' +
      '<div class="success-icon">' + icon("check-circle") + '</div>' +
      '<h1 style="font-size:24px;">We\'ve got your request, ' + firstName + '!</h1>' +
      '<div class="success-code">' + refCode + '</div>' +
      '<p class="success-desc">Your ' + maternity.serviceType.toLowerCase() + ' request is in. Our team will contact you at ' + maternity.contact + ' within <strong>2 business days</strong> to confirm the details and pricing.</p>' +
      (isSubsequent
        ? '<div class="info-note"><svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="9" r="5"/><path d="m8.5 13.5-1.6 6.5L12 18l5.1 2-1.6-6.5"/></svg><p>We\'ve flagged your subsequent pregnancy for <strong>NBP eligibility review</strong> — our team will confirm your discount when they reach out.</p></div>'
        : '') +
      '<div class="crosssell-card">' +
        '<div class="crosssell-icon">' + icon("award") + '</div>' +
        '<div class="crosssell-body">' +
          '<div class="crosssell-title">Want family savings from day one?</div>' +
          '<div class="crosssell-desc">Enroll in the FBP/NBP programme while you\'re here — it takes about 2 minutes.</div>' +
        '</div>' +
        '<a href="../../membership/step-1-intro/index.html" class="btn btn-primary" style="width:auto;min-width:0;padding:0 var(--sp-4);min-height:48px;">Enroll</a>' +
      '</div>' +
    '</div>';

  document.getElementById("homeCta").addEventListener("click", function () {
    Kiosk.clearSession();
    window.location.href = homeUrl;
  });

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: homeUrl, idleMs: 30000, graceMs: 10000 });
})();
