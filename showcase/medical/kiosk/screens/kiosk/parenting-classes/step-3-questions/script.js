(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../../home/index.html";

  var session = Kiosk.getSession();
  var parenting = session.parenting || {};
  if (session.flow !== "parenting" || !parenting.guardianName) {
    // Opened directly (not by tapping through the flow): pre-fill the earlier steps
    parenting = Kiosk.sample("parenting", 2);
  }

  var childInfoField = document.getElementById("fieldChildInfo");
  var childInfoInput = document.getElementById("inputChildInfo");
  var childrenCountInput = document.getElementById("inputChildrenCount");
  if (parenting.childInfo) childInfoInput.value = parenting.childInfo;
  if (parenting.childrenCount) childrenCountInput.value = parenting.childrenCount;

  var attendedBefore = typeof parenting.attendedBefore === "boolean" ? parenting.attendedBefore : null;
  var attendedBtns = Array.prototype.slice.call(document.querySelectorAll("#attendedGroup .yesno-btn"));
  attendedBtns.forEach(function (b) {
    var val = b.getAttribute("data-value") === "yes";
    if (attendedBefore !== null) b.classList.toggle("is-selected", val === attendedBefore);
    b.addEventListener("click", function () {
      attendedBefore = val;
      attendedBtns.forEach(function (x) { x.classList.remove("is-selected"); });
      b.classList.add("is-selected");
    });
  });

  var slotGrid = document.getElementById("slotGrid");
  var continueBtn = document.getElementById("continueBtn");
  var selectedSlotId = parenting.slotId || null;

  function weekdayDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" });
  }

  function renderSlots() {
    slotGrid.innerHTML = "";
    DATA_PARENTING_SLOTS.forEach(function (slot) {
      var full = slot.seatsBooked >= slot.seatsTotal;
      var remaining = slot.seatsTotal - slot.seatsBooked;
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "slot-chip" + (full ? " is-full" : "") + (selectedSlotId === slot.id ? " is-selected" : "");
      chip.disabled = full;
      chip.innerHTML =
        '<span class="slot-chip-date">' + weekdayDate(slot.date) + '</span>' +
        '<span class="slot-chip-time">' + slot.time + '</span>' +
        '<span class="slot-chip-cap">' + (full ? "Fully booked" : remaining + " seat" + (remaining === 1 ? "" : "s") + " left") + '</span>';
      chip.addEventListener("click", function () {
        selectedSlotId = slot.id;
        renderSlots();
        updateContinue();
      });
      slotGrid.appendChild(chip);
    });
  }
  renderSlots();

  function updateContinue() {
    continueBtn.disabled = !(childInfoInput.value.trim() && selectedSlotId);
  }
  childInfoInput.addEventListener("input", function () {
    childInfoField.classList.remove("has-error");
    updateContinue();
  });
  updateContinue();

  continueBtn.addEventListener("click", function () {
    if (!childInfoInput.value.trim()) { childInfoField.classList.add("has-error"); childInfoInput.focus(); return; }
    if (!selectedSlotId) return;
    Kiosk.setSession({
      flow: "parenting",
      parenting: Object.assign({}, parenting, {
        childInfo: childInfoInput.value.trim(),
        childrenCount: Math.max(1, parseInt(childrenCountInput.value, 10) || 1),
        attendedBefore: !!attendedBefore,
        slotId: selectedSlotId
      })
    });
    window.location.href = "../step-4-confirmation/index.html";
  });

  document.getElementById("backBtn").addEventListener("click", function () {
    window.location.href = "../step-2-details/index.html";
  });

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));
  initHomeButton(document.getElementById("homeBtn"), deviceEl, homeUrl);
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: homeUrl, idleMs: 30000, graceMs: 10000 });
})();
