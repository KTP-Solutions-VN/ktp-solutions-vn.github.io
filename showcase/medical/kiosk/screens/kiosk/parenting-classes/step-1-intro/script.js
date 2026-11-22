(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../../home/index.html";

  var session = Kiosk.getSession();
  var parenting = session.parenting || {};

  var group = document.getElementById("optionGroup");
  var continueBtn = document.getElementById("continueBtn");
  var selected = parenting.courseId || null;

  function render() {
    group.innerHTML = "";
    DATA_PARENTING_COURSES.forEach(function (course) {
      var label = document.createElement("label");
      label.className = "option-card" + (selected === course.id ? " is-selected" : "");
      label.innerHTML =
        '<input type="radio" name="courseType" value="' + course.id + '">' +
        '<div class="option-card-icon">' + icon(course.icon) + '</div>' +
        '<div class="option-card-body">' +
          '<div class="option-card-title">' + course.name + '</div>' +
          '<div class="option-card-desc">' + course.description + '</div>' +
        '</div>' +
        '<div class="option-card-check">' + icon("check") + '</div>';
      label.querySelector("input").checked = selected === course.id;
      label.querySelector("input").addEventListener("change", function () {
        selected = course.id;
        render();
        continueBtn.disabled = false;
      });
      group.appendChild(label);
    });
  }

  render();
  continueBtn.disabled = !selected;

  continueBtn.addEventListener("click", function () {
    Kiosk.setSession({ flow: "parenting", parenting: Object.assign({}, parenting, { courseId: selected }) });
    window.location.href = "../step-2-details/index.html";
  });

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));
  initHomeButton(document.getElementById("homeBtn"), deviceEl, homeUrl);
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: homeUrl, idleMs: 30000, graceMs: 10000 });
})();
