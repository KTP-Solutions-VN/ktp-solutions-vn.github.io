(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../home/index.html";

  var session = Kiosk.getSession();
  if (session.flow !== "shop" || !(session.selectedItems || []).length) {
    // Opened directly (not from the catalog): show this step with sample items
    session = Kiosk.sample("shop");
  }

  var items = (session.selectedItems || [])
    .map(function (id) { return DATA_CATALOG.find(function (p) { return p.id === id; }); })
    .filter(Boolean);

  /* ---- render order lines ---- */
  var orderLines = document.getElementById("orderLines");
  var total = 0;
  items.forEach(function (item) {
    total += item.price;
    var line = document.createElement("div");
    line.className = "order-line";
    line.innerHTML =
      '<div class="order-line-icon">' + icon(item.icon) + '</div>' +
      '<div class="order-line-body">' +
        '<div class="order-line-name">' + item.name + '</div>' +
        '<div class="order-line-sub">' + (item.isBundle ? "Bundle · " + item.bundleIncludes.length + " items included" : "Single item") + '</div>' +
      '</div>' +
      '<div class="order-line-price">' + Kiosk.formatPrice(item.price) + '</div>';
    orderLines.appendChild(line);
  });
  document.getElementById("orderTotal").textContent = Kiosk.formatPrice(total);

  /* ---- outcome selection -> success states ---- */
  var reviewView = document.getElementById("reviewView");
  var successView = document.getElementById("successView");
  var mainFooter = document.getElementById("mainFooter");
  var outcomeGrid = document.getElementById("outcomeGrid");
  var followupForm = document.getElementById("followupForm");

  function itemNamesList() {
    return items.map(function (i) { return i.name; }).join(", ");
  }

  function showLoading(outcome) {
    reviewView.innerHTML =
      '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--sp-3);padding:var(--sp-12) 0;">' +
      '<span class="spinner" style="width:28px;height:28px;border-color:rgba(var(--primary-dark-rgb),0.2);border-top-color:var(--primary-dark);"></span>' +
      '<p style="color:var(--gray-500);font-size:14px;">' + (outcome === "counter" ? "Sending your reservation to the counter..." : "Saving your request for our team...") + '</p>' +
      '</div>';
  }

  function renderSuccess(outcome, guestName) {
    reviewView.style.display = "none";
    mainFooter.style.display = "none";
    successView.style.display = "block";

    if (outcome === "counter") {
      successView.innerHTML =
        '<div class="success-panel type-counter">' +
          '<div class="success-icon">' + icon("check-circle") + '</div>' +
          '<h1 style="font-size:22px;">You’re all set!</h1>' +
          '<div class="success-code">' + Kiosk.refCode("EVT") + '</div>' +
          '<p class="success-desc">Head to the counter with this code — a team member is ready to take payment, no need to repeat your details.</p>' +
          '<div class="stat-pill" style="text-align:left;">' +
            '<div class="stat-pill-icon">' + icon("clock") + '</div>' +
            '<div class="stat-pill-text">You just skipped the booth queue — <strong>thank you for visiting CareJourney!</strong></div>' +
          '</div>' +
          '<button type="button" class="btn btn-accent btn-huge" id="startOverBtn" style="margin-top:var(--sp-3);">' +
            icon("home") + ' Return to Home' +
          '</button>' +
        '</div>';
    } else {
      var firstName = guestName ? guestName.split(" ")[0] : "there";
      successView.innerHTML =
        '<div class="success-panel type-followup">' +
          '<div class="success-icon">' + icon("headset") + '</div>' +
          '<h1 style="font-size:22px;">Thanks' + (guestName ? ", " + firstName : "") + ' — we’ll be in touch!</h1>' +
          '<p class="success-desc">Our team will follow up within <strong>2 business days</strong> about: ' + itemNamesList() + '.</p>' +
          '<div class="badge badge-primary" style="font-size:13px;padding:8px 14px;">' + icon("calendar") + ' We’ll reach you by phone or email</div>' +
          '<button type="button" class="btn btn-primary btn-huge" id="startOverBtn" style="margin-top:var(--sp-3);">' +
            icon("home") + ' Return to Home' +
          '</button>' +
        '</div>';
    }

    document.getElementById("startOverBtn").addEventListener("click", function () {
      Kiosk.clearSession();
      window.location.href = homeUrl;
    });
  }

  function completeCounter() {
    showLoading("counter");
    setTimeout(function () {
      Kiosk.addLead({
        id: Kiosk.newLeadId(),
        name: "Walk-in guest",
        phone: null,
        email: null,
        interests: [],
        boothLocation: "Baby Expo 2026 — City Convention Hall",
        capturedAt: new Date().toISOString(),
        status: "Converted",
        outcome: "counter",
        selectedItems: session.selectedItems,
        notes: "Completed at counter via the kiosk Products & Bundles flow, no prior contact info collected."
      });
      renderSuccess("counter", null);
    }, 700);
  }

  function completeFollowup(name, contact) {
    showLoading("staff-follow-up");
    setTimeout(function () {
      Kiosk.addLead({
        id: Kiosk.newLeadId(),
        name: name,
        phone: contact,
        email: null,
        interests: [],
        boothLocation: "Baby Expo 2026 — City Convention Hall",
        capturedAt: new Date().toISOString(),
        status: "Captured",
        outcome: "staff-follow-up",
        selectedItems: session.selectedItems,
        notes: null
      });
      renderSuccess("staff-follow-up", name);
    }, 700);
  }

  document.getElementById("outcomeCounter").addEventListener("click", completeCounter);
  document.getElementById("outcomeCounter").addEventListener("keydown", function (e) { if (e.key === "Enter") completeCounter(); });

  document.getElementById("outcomeFollowup").addEventListener("click", function () {
    outcomeGrid.style.display = "none";
    followupForm.style.display = "block";
    document.getElementById("inputName").focus();
  });
  document.getElementById("outcomeFollowup").addEventListener("keydown", function (e) {
    if (e.key === "Enter") document.getElementById("outcomeFollowup").click();
  });

  document.getElementById("followupCancelBtn").addEventListener("click", function () {
    followupForm.style.display = "none";
    outcomeGrid.style.display = "grid";
  });

  var nameField = document.getElementById("fieldName");
  var contactField = document.getElementById("fieldContact");
  var nameInput = document.getElementById("inputName");
  var contactInput = document.getElementById("inputContact");

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

  document.getElementById("followupSubmitBtn").addEventListener("click", function () {
    var nameOk = validateName(true);
    var contactOk = validateContact(true);
    if (!nameOk) { nameInput.focus(); return; }
    if (!contactOk) { contactInput.focus(); return; }
    completeFollowup(nameInput.value.trim(), contactInput.value.trim());
  });

  document.getElementById("reviewBackBtn").addEventListener("click", function () {
    window.location.href = "../catalog/index.html";
  });

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));
  initHomeButton(document.getElementById("homeBtn"), deviceEl, homeUrl);
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: homeUrl, idleMs: 30000, graceMs: 10000 });
})();
