(function () {
  "use strict";

  var deviceEl = document.getElementById("kioskDevice");
  var ringEl = document.getElementById("idleRing");
  var homeUrl = "../home/index.html";

  // No contact-info gate: browsing starts directly from Home; contact info is
  // only collected later, inline in the reservation step's "call me later"
  // branch, if that path is chosen.
  var session = Kiosk.getSession();
  if (session.flow !== "shop") {
    session = Kiosk.setSession({ flow: "shop", selectedItems: [] });
  }

  var selected = {};
  (session.selectedItems || []).forEach(function (id) { selected[id] = true; });

  var state = { category: "all", query: "" };

  /* ---- category chips ---- */
  var categoryScroller = document.getElementById("categoryScroller");
  function renderCategories() {
    var chips = [{ id: "all", label: "All", icon: "sparkle" }].concat(CATALOG_CATEGORIES);
    categoryScroller.innerHTML = "";
    chips.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "category-chip" + (state.category === cat.id ? " is-active" : "");
      btn.innerHTML = icon(cat.icon) + "<span>" + cat.label + "</span>";
      btn.addEventListener("click", function () {
        state.category = cat.id;
        renderCategories();
        renderCatalog();
      });
      categoryScroller.appendChild(btn);
    });
  }

  /* ---- catalog list ---- */
  var catalogList = document.getElementById("catalogList");
  var emptyState = document.getElementById("emptyState");

  function matchesQuery(item, q) {
    if (!q) return true;
    var hay = (item.name + " " + item.shortDescription).toLowerCase();
    return hay.indexOf(q.toLowerCase()) > -1;
  }

  function renderCatalog() {
    var items = DATA_CATALOG.filter(function (item) {
      var categoryOk = state.category === "all" || item.category === state.category;
      return categoryOk && matchesQuery(item, state.query);
    });

    catalogList.innerHTML = "";
    emptyState.style.display = items.length ? "none" : "flex";

    items.forEach(function (item) {
      var card = document.createElement("div");
      card.className = "catalog-card" + (selected[item.id] ? " is-selected" : "");

      var priceHtml = item.price === 0
        ? '<span class="catalog-price catalog-price-free">Free</span>'
        : (item.originalPrice
            ? '<span class="catalog-price-original">' + Kiosk.formatPrice(item.originalPrice) + '</span><span class="catalog-price">' + Kiosk.formatPrice(item.price) + '</span>'
            : '<span class="catalog-price">' + Kiosk.formatPrice(item.price) + '</span>');

      var bundleHtml = item.isBundle
        ? '<div class="catalog-bundle-includes"><span>Bundle includes:</span> ' + item.bundleIncludes.join(", ") + '</div>'
        : "";

      var tagHtml = item.tag
        ? '<span class="badge ' + (item.isBundle ? "badge-accent" : "badge-primary") + '">' + (item.isBundle ? icon("sparkle") : "") + item.tag + '</span>'
        : "";

      card.innerHTML =
        '<div class="catalog-icon">' + icon(item.icon) + '</div>' +
        '<div class="catalog-body">' +
          '<div class="catalog-top">' +
            '<div class="catalog-name">' + item.name + '</div>' +
            (item.isBundle ? '<span class="badge badge-accent" style="flex-shrink:0;">' + icon("sparkle") + 'Bundle</span>' : '') +
          '</div>' +
          '<div class="catalog-desc">' + item.shortDescription + '</div>' +
          bundleHtml +
          (tagHtml ? '<div>' + tagHtml + '</div>' : '') +
          '<div class="catalog-bottom">' +
            '<div>' + priceHtml + '</div>' +
            '<button type="button" class="select-btn' + (selected[item.id] ? " is-selected" : "") + '" data-id="' + item.id + '">' +
              (selected[item.id] ? icon("check") + 'Selected' : 'Select') +
            '</button>' +
          '</div>' +
        '</div>';

      catalogList.appendChild(card);
    });

    catalogList.querySelectorAll(".select-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        selected[id] = !selected[id];
        Kiosk.setSession({ selectedItems: Object.keys(selected).filter(function (k) { return selected[k]; }) });
        renderCatalog();
        updateFooter();
      });
    });
  }

  /* ---- footer / continue ---- */
  var continueBtn = document.getElementById("continueBtn");
  var selectedSummary = document.getElementById("selectedSummary");

  function updateFooter() {
    var count = Object.keys(selected).filter(function (k) { return selected[k]; }).length;
    continueBtn.disabled = count === 0;
    selectedSummary.textContent = count === 0
      ? "Select at least one item to continue"
      : count + (count === 1 ? " item selected" : " items selected");
  }

  document.getElementById("searchInput").addEventListener("input", function (e) {
    state.query = e.target.value;
    renderCatalog();
  });

  continueBtn.addEventListener("click", function () {
    window.location.href = "../reserve/index.html";
  });

  renderCategories();
  renderCatalog();
  updateFooter();

  initFaq(document.getElementById("faqOverlay"), document.getElementById("faqFab"));
  initHomeButton(document.getElementById("homeBtn"), deviceEl, homeUrl);
  initIdleReset({ ringEl: ringEl, deviceEl: deviceEl, homeUrl: homeUrl, idleMs: 30000, graceMs: 10000 });
})();
