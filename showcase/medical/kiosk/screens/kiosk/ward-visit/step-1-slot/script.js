(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../../home/index.html";

  var session = Kiosk.getSession();
  var tour = session.tour || {};

  var grid = document.getElementById("slotGrid");
  var continueBtn = document.getElementById("continueBtn");
  var selectedId = tour.slotId || null;

  function weekdayDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" });
  }

  function render() {
    grid.innerHTML = "";
    DATA_TOUR_SLOTS.forEach(function (slot) {
      var full = slot.capacityBooked >= slot.capacityTotal;
      var remaining = slot.capacityTotal - slot.capacityBooked;
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "slot-chip" + (full ? " is-full" : "") + (selectedId === slot.id ? " is-selected" : "");
      chip.disabled = full;
      chip.innerHTML =
        '<span class="slot-chip-date">' + weekdayDate(slot.date) + '</span>' +
        '<span class="slot-chip-time">' + slot.time + '</span>' +
        '<span class="slot-chip-cap">' + (full ? "Fully booked" : remaining + " spot" + (remaining === 1 ? "" : "s") + " left") + '</span>';
      chip.addEventListener("click", function () {
        selectedId = slot.id;
        render();
        continueBtn.disabled = false;
      });
      grid.appendChild(chip);
    });
  }

  render();
  continueBtn.disabled = !selectedId;

  continueBtn.addEventListener("click", function () {
    var slot = DATA_TOUR_SLOTS.find(function (s) { return s.id === selectedId; });
    Kiosk.setSession({ flow: "tour", tour: Object.assign({}, tour, { slotId: slot.id, slotDate: slot.date, slotTime: slot.time, facilitator: slot.facilitator }) });
    window.location.href = "../step-2-details/index.html";
  });

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));
  initHomeButton(document.getElementById("homeBtn"), deviceEl, homeUrl);
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: homeUrl, idleMs: 30000, graceMs: 10000 });
})();
