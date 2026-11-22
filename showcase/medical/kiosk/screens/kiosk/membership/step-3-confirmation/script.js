(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../../home/index.html";

  var session = Kiosk.getSession();
  var membership = session.membership || {};
  if (session.flow !== "membership" || !membership.applicantName) {
    // Opened directly (not by tapping through the flow): pre-fill the earlier steps
    membership = Kiosk.sample("membership", 2);
  }

  var membershipNumber = membership.membershipNumber;
  if (!membershipNumber) {
    membershipNumber = Kiosk.refCode("MEM");
    Kiosk.membership.add({
      id: membershipNumber,
      programType: membership.programType,
      applicantName: membership.applicantName,
      contact: membership.contact,
      childBirthDetails: membership.childBirthDetails,
      status: "Active",
      createdAt: new Date().toISOString()
    });
    Kiosk.setSession({ membership: Object.assign({}, membership, { membershipNumber: membershipNumber }) });
  }

  var firstName = membership.applicantName.split(" ")[0];
  var programLabel = membership.programType === "FBP" ? "First Baby Programme (FBP)" : "Next Baby Programme (NBP)";

  document.getElementById("confirmationHost").innerHTML =
    '<div class="success-panel type-counter">' +
      '<div class="success-icon">' + icon("award") + '</div>' +
      '<h1 style="font-size:24px;">Welcome to the family, ' + firstName + '!</h1>' +
      '<p class="success-desc">Your ' + programLabel + ' membership is now active. Show this member number at any Meridian Health counter to get member pricing.</p>' +
      '<div class="success-code">' + membershipNumber + '</div>' +
      '<div class="stat-pill" style="text-align:left;">' +
        '<div class="stat-pill-icon">' + icon("clock") + '</div>' +
        '<div class="stat-pill-text">Confirmed on the spot — <strong>no queue at the member services counter today.</strong></div>' +
      '</div>' +
    '</div>';

  document.getElementById("homeCta").addEventListener("click", function () {
    Kiosk.clearSession();
    window.location.href = homeUrl;
  });

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: homeUrl, idleMs: 30000, graceMs: 10000 });
})();
