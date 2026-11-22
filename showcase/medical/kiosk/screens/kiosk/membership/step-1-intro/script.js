(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../../home/index.html";

  var session = Kiosk.getSession();
  var membership = session.membership || {};

  var cards = Array.prototype.slice.call(document.querySelectorAll("#optionGroup .option-card"));
  var continueBtn = document.getElementById("continueBtn");

  cards.forEach(function (card) {
    var input = card.querySelector("input");
    if (membership.programType === card.getAttribute("data-value")) {
      input.checked = true;
      card.classList.add("is-selected");
    }
    input.addEventListener("change", function () {
      cards.forEach(function (c) { c.classList.remove("is-selected"); });
      card.classList.add("is-selected");
      continueBtn.disabled = false;
    });
  });

  continueBtn.disabled = !membership.programType;

  continueBtn.addEventListener("click", function () {
    var checked = document.querySelector('input[name="programType"]:checked');
    Kiosk.setSession({ flow: "membership", membership: Object.assign({}, membership, { programType: checked.value }) });
    window.location.href = "../step-2-details/index.html";
  });

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));
  initHomeButton(document.getElementById("homeBtn"), deviceEl, homeUrl);
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: homeUrl, idleMs: 30000, graceMs: 10000 });
})();
