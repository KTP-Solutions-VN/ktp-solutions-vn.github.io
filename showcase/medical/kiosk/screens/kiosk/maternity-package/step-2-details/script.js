(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../../home/index.html";

  var session = Kiosk.getSession();
  var maternity = session.maternity || {};
  if (session.flow !== "maternity" || !maternity.serviceType) {
    // Opened directly (not by tapping through the flow): pre-fill the earlier steps
    maternity = Kiosk.sample("maternity", 1);
  }

  document.getElementById("serviceLine").textContent = "Selected package: " + maternity.serviceType;

  var form = document.getElementById("detailsForm");
  var nameField = document.getElementById("fieldName");
  var contactField = document.getElementById("fieldContact");
  var nameInput = document.getElementById("inputName");
  var contactInput = document.getElementById("inputContact");
  var dueInput = document.getElementById("inputDue");

  if (maternity.motherName) nameInput.value = maternity.motherName;
  if (maternity.contact) contactInput.value = maternity.contact;
  if (maternity.dueDateText) dueInput.value = maternity.dueDateText;

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

    Kiosk.setSession({
      flow: "maternity",
      maternity: Object.assign({}, maternity, {
        motherName: nameInput.value.trim(),
        contact: contactInput.value.trim(),
        dueDateText: dueInput.value.trim() || null
      })
    });
    window.location.href = "../step-3-questions/index.html";
  });

  document.getElementById("backBtn").addEventListener("click", function () {
    window.location.href = "../step-1-intro/index.html";
  });

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));
  initHomeButton(document.getElementById("homeBtn"), deviceEl, homeUrl);
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: homeUrl, idleMs: 30000, graceMs: 10000 });
})();
