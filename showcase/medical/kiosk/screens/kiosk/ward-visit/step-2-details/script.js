(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../../home/index.html";

  var session = Kiosk.getSession();
  var tour = session.tour || {};
  if (session.flow !== "tour" || !tour.slotId) {
    // Opened directly (not by tapping through the flow): pre-fill the earlier steps
    tour = Kiosk.sample("tour", 1);
  }

  function weekdayDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });
  }

  document.getElementById("slotRecap").innerHTML =
    '<div class="recap-row"><span class="recap-label">Date</span><span class="recap-value">' + weekdayDate(tour.slotDate) + '</span></div>' +
    '<div class="recap-row"><span class="recap-label">Time</span><span class="recap-value">' + tour.slotTime + '</span></div>' +
    '<div class="recap-row"><span class="recap-label">Led by</span><span class="recap-value">' + tour.facilitator + '</span></div>';

  var form = document.getElementById("detailsForm");
  var nameField = document.getElementById("fieldName");
  var contactField = document.getElementById("fieldContact");
  var nameInput = document.getElementById("inputName");
  var contactInput = document.getElementById("inputContact");
  var guestsInput = document.getElementById("inputGuests");

  if (tour.visitorName) nameInput.value = tour.visitorName;
  if (tour.contact) contactInput.value = tour.contact;
  if (tour.guestCount) guestsInput.value = tour.guestCount;

  function validateName(showError) {
    var ok = nameInput.value.trim().length >= 2;
    if (showError) nameField.classList.toggle("has-error", !ok);
    return ok;
  }
  function validateContact(showError) {
    var v = contactInput.value.trim();
    var ok = v.replace(/[^0-9]/g, "").length >= 8 || /\S+@\S+\.\S+/.test(v);
    if (showError) contactField.classList.toggle("has-error", !ok);
    return ok;
  }

  nameInput.addEventListener("blur", function () { validateName(true); });
  contactInput.addEventListener("blur", function () { validateContact(true); });
  nameInput.addEventListener("input", function () { if (nameField.classList.contains("has-error")) validateName(true); });
  contactInput.addEventListener("input", function () { if (contactField.classList.contains("has-error")) validateContact(true); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nameOk = validateName(true);
    var contactOk = validateContact(true);
    if (!nameOk) { nameInput.focus(); return; }
    if (!contactOk) { contactInput.focus(); return; }

    var guests = Math.max(1, parseInt(guestsInput.value, 10) || 1);

    Kiosk.setSession({
      flow: "tour",
      tour: Object.assign({}, tour, {
        visitorName: nameInput.value.trim(),
        contact: contactInput.value.trim(),
        guestCount: guests
      })
    });
    window.location.href = "../step-3-confirmation/index.html";
  });

  document.getElementById("backBtn").addEventListener("click", function () {
    window.location.href = "../step-1-slot/index.html";
  });

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));
  initHomeButton(document.getElementById("homeBtn"), deviceEl, homeUrl);
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: homeUrl, idleMs: 30000, graceMs: 10000 });
})();
