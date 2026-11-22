(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../../home/index.html";

  var session = Kiosk.getSession();
  var maternity = session.maternity || {};
  if (session.flow !== "maternity" || !maternity.motherName) {
    // Opened directly (not by tapping through the flow): pre-fill the earlier steps
    maternity = Kiosk.sample("maternity", 2);
  }

  var state = {
    trimester: maternity.trimester || null,
    pregnancyType: maternity.pregnancyType || null,
    hasComplications: typeof maternity.hasComplications === "boolean" ? maternity.hasComplications : null,
    roomType: maternity.roomType || null
  };

  function renderChips(containerId, options, stateKey, onAfter) {
    var container = document.getElementById(containerId);
    container.innerHTML = "";
    options.forEach(function (opt) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip" + (state[stateKey] === opt ? " is-selected" : "");
      chip.innerHTML = "<span>" + opt + "</span>";
      chip.addEventListener("click", function () {
        state[stateKey] = opt;
        renderChips(containerId, options, stateKey, onAfter);
        updateContinue();
        if (onAfter) onAfter();
      });
      container.appendChild(chip);
    });
  }

  var TRIMESTERS = ["1st", "2nd", "3rd", "Not yet confirmed"];
  var PREGNANCY_TYPES = ["First pregnancy", "Subsequent pregnancy"];
  var ROOM_TYPES = ["Standard", "Deluxe", "Suite"];

  function refreshNbpNote() {
    document.getElementById("nbpNote").style.display = state.pregnancyType === "Subsequent pregnancy" ? "flex" : "none";
  }

  renderChips("trimesterGroup", TRIMESTERS, "trimester");
  renderChips("pregnancyTypeGroup", PREGNANCY_TYPES, "pregnancyType", refreshNbpNote);
  refreshNbpNote();

  // Step 1's chosen package subtly changes step 3: a Birthing Suite
  // Reservation adds a "preferred room type" question that an Antenatal
  // Care Plan request doesn't need.
  if (maternity.serviceType === "Birthing Suite Reservation") {
    document.getElementById("roomTypeField").style.display = "flex";
    renderChips("roomTypeGroup", ROOM_TYPES, "roomType");
  }

  var complicationsNote = document.getElementById("complicationsNote");
  var complicationsBtns = Array.prototype.slice.call(document.querySelectorAll("#complicationsGroup .yesno-btn"));
  if (state.hasComplications !== null) {
    complicationsBtns.forEach(function (b) {
      var val = b.getAttribute("data-value") === "yes";
      b.classList.toggle("is-selected", val === state.hasComplications);
    });
    complicationsNote.style.display = state.hasComplications ? "block" : "none";
  }
  if (maternity.complicationsNote) complicationsNote.value = maternity.complicationsNote;

  complicationsBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.hasComplications = btn.getAttribute("data-value") === "yes";
      complicationsBtns.forEach(function (b) { b.classList.remove("is-selected"); });
      btn.classList.add("is-selected");
      complicationsNote.style.display = state.hasComplications ? "block" : "none";
      updateContinue();
    });
  });

  var doctorInput = document.getElementById("doctorInput");
  var doctorList = document.getElementById("doctorList");
  DATA_MATERNITY_DOCTORS.forEach(function (name) {
    var opt = document.createElement("option");
    opt.value = name;
    doctorList.appendChild(opt);
  });
  if (maternity.preferredDoctor) doctorInput.value = maternity.preferredDoctor;

  var continueBtn = document.getElementById("continueBtn");
  function updateContinue() {
    continueBtn.disabled = !(state.trimester && state.pregnancyType);
  }
  updateContinue();

  continueBtn.addEventListener("click", function () {
    Kiosk.setSession({
      flow: "maternity",
      maternity: Object.assign({}, maternity, {
        trimester: state.trimester,
        pregnancyType: state.pregnancyType,
        hasComplications: !!state.hasComplications,
        complicationsNote: state.hasComplications ? (complicationsNote.value.trim() || null) : null,
        roomType: state.roomType,
        preferredDoctor: doctorInput.value.trim() || null
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
