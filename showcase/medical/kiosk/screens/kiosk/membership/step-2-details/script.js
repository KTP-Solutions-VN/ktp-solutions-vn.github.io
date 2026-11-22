(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../../home/index.html";

  var session = Kiosk.getSession();
  var membership = session.membership || {};
  if (session.flow !== "membership" || !membership.programType) {
    // Opened directly (not by tapping through the flow): pre-fill the earlier steps
    membership = Kiosk.sample("membership", 1);
  }

  var isFbp = membership.programType === "FBP";
  document.getElementById("programLine").textContent = "Programme: " + (isFbp ? "First Baby Programme (FBP)" : "Next Baby Programme (NBP)");
  document.getElementById("birthLabel").textContent = isFbp ? "Child's birth details" : "This and prior children's birth details";
  document.getElementById("inputBirth").placeholder = isFbp
    ? "e.g. Born 3 Aug 2026 at Meridian Medical Centre"
    : "e.g. 2nd child expected 14 Oct 2026, 1st child born 2023 at Meridian Medical Centre";

  var form = document.getElementById("detailsForm");
  var nameField = document.getElementById("fieldName");
  var contactField = document.getElementById("fieldContact");
  var birthField = document.getElementById("fieldBirth");
  var nameInput = document.getElementById("inputName");
  var contactInput = document.getElementById("inputContact");
  var birthInput = document.getElementById("inputBirth");

  if (membership.applicantName) nameInput.value = membership.applicantName;
  if (membership.contact) contactInput.value = membership.contact;
  if (membership.childBirthDetails) birthInput.value = membership.childBirthDetails;

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
  function validateBirth(showError) {
    var ok = birthInput.value.trim().length >= 3;
    if (showError) birthField.classList.toggle("has-error", !ok);
    return ok;
  }

  [[nameInput, nameField, validateName], [contactInput, contactField, validateContact], [birthInput, birthField, validateBirth]]
    .forEach(function (t) {
      t[0].addEventListener("blur", function () { t[2](true); });
      t[0].addEventListener("input", function () { if (t[1].classList.contains("has-error")) t[2](true); });
    });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok1 = validateName(true), ok2 = validateContact(true), ok3 = validateBirth(true);
    if (!ok1) { nameInput.focus(); return; }
    if (!ok2) { contactInput.focus(); return; }
    if (!ok3) { birthInput.focus(); return; }

    Kiosk.setSession({
      flow: "membership",
      membership: Object.assign({}, membership, {
        applicantName: nameInput.value.trim(),
        contact: contactInput.value.trim(),
        childBirthDetails: birthInput.value.trim()
      })
    });
    window.location.href = "../step-3-confirmation/index.html";
  });

  document.getElementById("backBtn").addEventListener("click", function () {
    window.location.href = "../step-1-intro/index.html";
  });

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));
  initHomeButton(document.getElementById("homeBtn"), deviceEl, homeUrl);
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: homeUrl, idleMs: 30000, graceMs: 10000 });
})();
