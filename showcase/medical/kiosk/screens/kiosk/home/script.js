(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");

  // Signature moment (generalized across all 5 flows)
  document.getElementById("skipCount").textContent = Kiosk.totalGuestsServedToday();

  // Starting a new flow from Home always clears any stale in-progress session
  Kiosk.clearSession();

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));

  // Home has no "start over" button (this IS the reset destination); the
  // idle-reset ring still runs so a long-idle Home screen quietly resets
  // scroll position/animations for the next guest, but never redirects.
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: "index.html", idleMs: 45000, graceMs: 1, skipReset: true });
})();
