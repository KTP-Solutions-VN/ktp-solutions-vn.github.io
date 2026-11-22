(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../../home/index.html";

  var session = Kiosk.getSession();
  var maternity = session.maternity || {};

  var cards = Array.prototype.slice.call(document.querySelectorAll("#optionGroup .option-card"));
  var continueBtn = document.getElementById("continueBtn");

  function selectedValue() {
    var checked = document.querySelector('input[name="serviceType"]:checked');
    return checked ? checked.value : null;
  }

  cards.forEach(function (card) {
    var input = card.querySelector("input");
    if (maternity.serviceType === card.getAttribute("data-value")) {
      input.checked = true;
      card.classList.add("is-selected");
    }
    input.addEventListener("change", function () {
      cards.forEach(function (c) { c.classList.remove("is-selected"); });
      card.classList.add("is-selected");
      continueBtn.disabled = false;
    });
  });

  continueBtn.disabled = !selectedValue();

  continueBtn.addEventListener("click", function () {
    Kiosk.setSession({ flow: "maternity", maternity: Object.assign({}, maternity, { serviceType: selectedValue() }) });
    window.location.href = "../step-2-details/index.html";
  });

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));
  initHomeButton(document.getElementById("homeBtn"), deviceEl, homeUrl);
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: homeUrl, idleMs: 30000, graceMs: 10000 });
})();
