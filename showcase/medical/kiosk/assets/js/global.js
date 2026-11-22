/**
 * CareJourney — Self-Service Kiosk
 * Shared chrome behavior: icon set, localStorage data helpers, idle-reset
 * timer, and the reusable confirm/idle banner. Loaded on every screen
 * before that screen's own script.js.
 */

/* ---------------------------------------------------------------------- *
 * Icon set — outline style, inline SVG, currentColor (Feather-like)
 * ---------------------------------------------------------------------- */
const ICONS = {
  "home": '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h4v-5h2v5h4a1 1 0 0 0 1-1v-9"/>',
  "user": '<circle cx="12" cy="8" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>',
  "phone": '<path d="M6 3h3l1.5 4.5-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2L20 14v3a2 2 0 0 1-2 2C10.8 19 5 13.2 5 6a2 2 0 0 1 1-2Z"/>',
  "mail": '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4.5 6.5 7.5 6 7.5-6"/>',
  "search": '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-3.6-3.6"/>',
  "heart-pulse": '<path d="M12.5 20s-7-4.3-9-8.7C1.9 8 3.3 4.8 6.4 4.2c2-.4 3.7.5 4.7 1.9.9-1.4 2.6-2.3 4.6-1.9 3.1.6 4.5 3.8 2.9 7.1-2 4.4-6.1 8.7-6.1 8.7Z"/><path d="M4 11h2l1.2-2.4L9 12l1-2h2.2"/>',
  "book": '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5Z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5Z"/>',
  "bed": '<path d="M3 18v-8a2 2 0 0 1 2-2h5v5"/><path d="M3 13h18v5"/><path d="M3 21v-3"/><path d="M21 21v-3"/><circle cx="7" cy="9.5" r="1.4"/>',
  "id-card": '<rect x="3" y="5.5" width="18" height="13" rx="2"/><circle cx="8.3" cy="11" r="1.8"/><path d="M5.8 15.5a2.6 2.6 0 0 1 5 0"/><path d="M13.5 9.5h5"/><path d="M13.5 13h5"/>',
  "bowl": '<path d="M3.5 12h17a7.5 5.5 0 0 1-17 0Z"/><path d="M8 12V8a4 4 0 0 1 8 0v4"/>',
  "gift": '<rect x="4" y="10" width="16" height="9.5" rx="1.4"/><path d="M4 10h16v3.2H4Z" fill="currentColor" stroke="none" opacity=".14"/><path d="M12 10v9.5"/><path d="M12 10c-1.4 0-3-1-3-2.8A2.2 2.2 0 0 1 11.2 5C13 5 12 8 12 10Z"/><path d="M12 10c1.4 0 3-1 3-2.8A2.2 2.2 0 0 0 12.8 5C11 5 12 8 12 10Z"/>',
  "sparkle": '<path d="M12 3.5 13.6 9 19 10.6 13.6 12.2 12 17.7 10.4 12.2 5 10.6 10.4 9Z"/>',
  "check": '<path d="M5 12.5 9.5 17 19 7"/>',
  "check-circle": '<circle cx="12" cy="12" r="8.5"/><path d="m8.2 12.4 2.7 2.7 5-5.7"/>',
  "arrow-right": '<path d="M4.5 12h15"/><path d="m13.5 5.5 6.5 6.5-6.5 6.5"/>',
  "chevron-left": '<path d="m14.5 5.5-6.5 6.5 6.5 6.5"/>',
  "users": '<circle cx="9" cy="8.5" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M15.5 6a3 3 0 0 1 0 5.8"/><path d="M16.5 14.3A5.5 5.5 0 0 1 20.5 20"/>',
  "calendar": '<rect x="3.5" y="5.5" width="17" height="15" rx="2"/><path d="M3.5 10h17"/><path d="M8 3.5v4"/><path d="M16 3.5v4"/>',
  "headset": '<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="3" y="13" width="4" height="6" rx="1.4"/><rect x="17" y="13" width="4" height="6" rx="1.4"/><path d="M20 19v.5a3 3 0 0 1-3 3h-3.2"/>',
  "store": '<path d="M4 9.5 5 4h14l1 5.5"/><path d="M4 9.5a2.3 2.3 0 0 0 4.4 1.1A2.3 2.3 0 0 0 12.8 10a2.3 2.3 0 0 0 4.4.6A2.3 2.3 0 0 0 20 9.5"/><path d="M5.5 11v8.5h13V11"/><path d="M10 19.5v-5h4v5"/>',
  "clock": '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  "x": '<path d="m6 6 12 12"/><path d="m18 6-12 12"/>',
  "alert": '<path d="M12 4 2.5 20h19Z"/><path d="M12 10.5v4"/><circle cx="12" cy="17" r=".2" fill="currentColor"/>',
  "help": '<circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.3a2.6 2.6 0 0 1 5 .9c0 1.7-2.4 2-2.4 3.6"/><circle cx="12" cy="17" r=".2" fill="currentColor"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  "map-pin": '<path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.4"/>',
  "bag": '<path d="M6.5 8h11l1 12H5.5Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  "award": '<circle cx="12" cy="9" r="5"/><path d="m8.5 13.5-1.6 6.5L12 18l5.1 2-1.6-6.5"/>',
  "graduation": '<path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z"/><path d="M7 11.8v4.4c0 1.3 2.2 2.3 5 2.3s5-1 5-2.3v-4.4"/><path d="M20 9.5v6"/>',
  "baby": '<circle cx="12" cy="9" r="4.2"/><path d="M8.4 8c.3-1 1.7-1 2 0"/><path d="M13.6 8c.3-1 1.7-1 2 0"/><path d="M9.5 10.5c1 .8 3 .8 4 0"/><path d="M6 21c0-3.5 2.7-6 6-6s6 2.5 6 6"/>'
};

function icon(name, extraClass) {
  const path = ICONS[name] || "";
  return `<svg class="icon${extraClass ? " " + extraClass : ""}" viewBox="0 0 24 24">${path}</svg>`;
}

/* ---------------------------------------------------------------------- *
 * Kiosk data/session helpers
 * ---------------------------------------------------------------------- */
const Kiosk = (function () {
  const LEADS_KEY = "kiosk_new_leads";
  const SESSION_KEY = "kiosk_session";

  function safeParse(raw, fallback) {
    try { const v = JSON.parse(raw); return v == null ? fallback : v; } catch (e) { return fallback; }
  }

  /* Generic localStorage-backed list factory — every new flow's mock
     "submissions" (tour bookings, maternity inquiries, parenting
     registrations, membership applications) share this same shape:
     get all / save all / append one / patch one by id. Keeps each flow's
     script.js from re-implementing the same 15 lines. */
  function makeStore(key) {
    function getAll() { return safeParse(localStorage.getItem(key), []); }
    function saveAll(arr) { localStorage.setItem(key, JSON.stringify(arr)); }
    function add(record) { const all = getAll(); all.push(record); saveAll(all); return record; }
    function updateById(id, patch) {
      const all = getAll();
      const idx = all.findIndex((r) => r.id === id);
      if (idx > -1) { all[idx] = Object.assign({}, all[idx], patch); saveAll(all); return all[idx]; }
      return null;
    }
    return { getAll, saveAll, add, updateById };
  }

  const leadStore = makeStore(LEADS_KEY);
  function getNewLeads() { return leadStore.getAll(); }
  function saveNewLeads(arr) { return leadStore.saveAll(arr); }
  function addLead(lead) { return leadStore.add(lead); }
  function updateLeadById(id, patch) { return leadStore.updateById(id, patch); }

  const tourStore = makeStore("kiosk_tour_bookings");
  const maternityStore = makeStore("kiosk_maternity_inquiries");
  const parentingStore = makeStore("kiosk_parenting_registrations");
  const membershipStore = makeStore("kiosk_membership_applications");

  function getSession() {
    return safeParse(localStorage.getItem(SESSION_KEY), {});
  }
  function setSession(patch) {
    const s = Object.assign({}, getSession(), patch);
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    return s;
  }
  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function skippedCount() {
    const base = (typeof DATA_EVENT_LEADS !== "undefined") ? DATA_EVENT_LEADS.length : 26;
    return base + getNewLeads().length;
  }

  /* Signature moment: counts visitors served across ALL 5 flows today
     without queueing at a staffed counter, not just the Products & Bundles
     lead count — each mock data file's historical array is today's baseline,
     live submissions during this demo session add to it in real time. */
  function totalGuestsServedToday() {
    const baselines = [
      (typeof DATA_EVENT_LEADS !== "undefined") ? DATA_EVENT_LEADS.length : 26,
      (typeof DATA_TOUR_BOOKINGS !== "undefined") ? DATA_TOUR_BOOKINGS.length : 14,
      (typeof DATA_MATERNITY_INQUIRIES !== "undefined") ? DATA_MATERNITY_INQUIRIES.length : 19,
      (typeof DATA_PARENTING_REGISTRATIONS !== "undefined") ? DATA_PARENTING_REGISTRATIONS.length : 11,
      (typeof DATA_MEMBERSHIP_APPLICATIONS !== "undefined") ? DATA_MEMBERSHIP_APPLICATIONS.length : 9
    ];
    const baseTotal = baselines.reduce((a, b) => a + b, 0);
    const liveTotal = getNewLeads().length + tourStore.getAll().length + maternityStore.getAll().length +
      parentingStore.getAll().length + membershipStore.getAll().length;
    return baseTotal + liveTotal;
  }

  /* Sample answers for a step opened directly (e.g. from the showcase
     playground or a bookmark) instead of being reached by tapping through
     its flow: the earlier steps are pre-filled so every screen renders on
     its own. A visitor who taps through the flow never hits this. */
  const SAMPLE_CART = ["prod-prenatal-bundle", "prod-nutri-welcome-bundle"];
  const SAMPLE_STEPS = {
    tour: [
      { slotId: "VSL-04", slotDate: "2026-09-18", slotTime: "10:00 AM", facilitator: "Nurse Clinician Fiona McKenzie" },
      { visitorName: "Erin Mahoney", contact: "+61 496 124 480", guestCount: 2 }
    ],
    maternity: [
      { serviceType: "Birthing Suite Reservation" },
      { motherName: "Lily Zhao", contact: "lily.zhao@example.com", dueDateText: "12 Mar 2027" },
      { trimester: "2nd", pregnancyType: "Subsequent pregnancy", hasComplications: false, complicationsNote: null,
        roomType: "Deluxe", preferredDoctor: "Dr. Catherine Wu — Obstetrics & Gynaecology" }
    ],
    parenting: [
      { courseId: "birth-preparation" },
      { guardianName: "Adam Sinclair", contact: "+61 488 452 210" },
      { childInfo: "Due 15 Dec 2026", childrenCount: 1, attendedBefore: false, slotId: "CSL-03" }
    ],
    membership: [
      { programType: "FBP" },
      { applicantName: "Kristy Nolan", contact: "+61 493 715 526", childBirthDetails: "First child due 9 Jan 2027 at Meridian Medical Centre" }
    ]
  };
  function sample(flow, steps) {
    if (flow === "shop") return setSession({ flow: "shop", selectedItems: SAMPLE_CART.slice() });
    const data = Object.assign.apply(null, [{}].concat(SAMPLE_STEPS[flow].slice(0, steps)));
    const patch = { flow: flow };
    patch[flow] = data;
    return setSession(patch)[flow];
  }

  function formatPrice(n) {
    if (n === 0) return "Free";
    return "A$" + Number(n).toLocaleString("en-AU");
  }

  function formatDate(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" });
  }

  function refCode(prefix) {
    return prefix + "-" + Math.floor(2000 + Math.random() * 7999);
  }
  function newLeadId() { return refCode("EVT"); }

  return {
    LEADS_KEY, SESSION_KEY,
    getNewLeads, saveNewLeads, addLead, updateLeadById,
    tour: tourStore, maternity: maternityStore, parenting: parentingStore, membership: membershipStore,
    getSession, setSession, clearSession,
    skippedCount, totalGuestsServedToday, sample, formatPrice, formatDate, refCode, newLeadId
  };
})();

/* ---------------------------------------------------------------------- *
 * FAQ modal — persistent "Need Help?" corner button + accordion, shared
 * across every screen (Home and inside each flow). Real DOM toggle, no
 * fake modal library.
 * ---------------------------------------------------------------------- */
const FAQ_ITEMS = [
  {
    q: "What does a maternity package include?",
    a: "The Antenatal Care Plan covers doctor consultations, scans and routine tests throughout your pregnancy; a Birthing Suite Reservation secures your preferred room type and admission date at Meridian Medical Centre. Inclusions vary by tier — our team will confirm the full list and pricing once you register."
  },
  {
    q: "What should I bring on a ward tour?",
    a: "Just bring your Medicare card or driver licence to register at the counter, plus comfortable shoes — the tour covers the maternity ward, birthing suites and nursery. If you're already a patient, your appointment card helps the facilitator tailor the visit to your care team."
  },
  {
    q: "What do FBP/NBP members get?",
    a: "Members of the First Baby Programme (FBP) and the Next Baby Programme (NBP) get member pricing across Meridian Specialists, Meridian Nutri, parenting classes and maternity packages. NBP is designed for growing families — the more of your family's milestones you share with us, the more you save on the next one."
  },
  {
    q: "How do the parenting classes work?",
    a: "The Meridian Parenting Centre runs small-group sessions on labour preparation, newborn care and hands-on skills (bathing, swaddling, feeding). Pick a class and a session here at the kiosk, and our team will confirm your seat by phone or email within 2 business days."
  },
  {
    q: "Do I need to create an account to use this kiosk?",
    a: "No — every service here works as a guest. Leave your contact details when asked, and a Meridian Health team member will follow up to complete registration, booking or payment. No sign-in or app download needed."
  }
];

function initFaq(overlayEl, fabEl) {
  if (!overlayEl) return;
  const panelBody = overlayEl.querySelector(".faq-panel-body");
  if (panelBody && !panelBody.dataset.rendered) {
    panelBody.dataset.rendered = "1";
    FAQ_ITEMS.forEach(function (item, i) {
      const el = document.createElement("div");
      el.className = "faq-item" + (i === 0 ? " is-open" : "");
      el.innerHTML =
        '<button type="button" class="faq-question"><span>' + item.q + "</span>" + icon("chevron-down") + "</button>" +
        '<div class="faq-answer"><div class="faq-answer-inner"><p>' + item.a + "</p></div></div>";
      el.querySelector(".faq-question").addEventListener("click", function () {
        el.classList.toggle("is-open");
      });
      panelBody.appendChild(el);
    });
    const staffNote = document.createElement("div");
    staffNote.className = "faq-staff-note";
    staffNote.innerHTML = icon("headset") +
      "<p><strong>Still have a question?</strong> Ask any Meridian Health team member at the booth — they're happy to help in person.</p>";
    panelBody.appendChild(staffNote);
  }

  function open() { overlayEl.classList.add("is-open"); }
  function close() { overlayEl.classList.remove("is-open"); }

  if (fabEl) fabEl.addEventListener("click", open);
  overlayEl.addEventListener("click", function (e) { if (e.target === overlayEl) close(); });
  const closeBtn = overlayEl.querySelector(".faq-close-btn");
  if (closeBtn) closeBtn.addEventListener("click", close);

  return { open: open, close: close };
}

/* ---------------------------------------------------------------------- *
 * Idle-reset: a ring around the brand-mark drains over `idleMs`; on full
 * drain a "Still there?" banner shows for `graceMs` before the session
 * clears and the app returns to the Welcome Screen. Real, cheap JS — no fake
 * countdown text, matches genuine kiosk auto-reset behavior.
 * ---------------------------------------------------------------------- */
function initIdleReset(opts) {
  const idleMs = opts.idleMs || 25000;
  const graceMs = opts.graceMs || 10000;
  const ringEl = opts.ringEl;
  const deviceEl = opts.deviceEl;
  const homeUrl = opts.homeUrl;
  const skipReset = !!opts.skipReset;

  let lastActivity = Date.now();
  let warned = false;
  let banner = null;

  function ensureBanner() {
    if (banner) return banner;
    banner = document.createElement("div");
    banner.className = "idle-banner";
    banner.innerHTML =
      '<span style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.12);flex-shrink:0;">' +
      icon("clock") +
      '</span><p>Still there? This session will restart soon to be ready for the next guest.</p>' +
      '<button type="button">I’m here</button>';
    deviceEl.appendChild(banner);
    banner.querySelector("button").addEventListener("click", function (e) {
      e.stopPropagation();
      resetTimer();
    });
    return banner;
  }

  function resetTimer() {
    lastActivity = Date.now();
    warned = false;
    if (banner) banner.classList.remove("is-visible");
  }

  if (!skipReset) {
    // pointermove/wheel also count, so reviewing the screens with a mouse keeps the session alive
    ["pointerdown", "pointermove", "wheel", "keydown", "touchstart"].forEach(function (evt) {
      document.addEventListener(evt, resetTimer, { passive: true });
    });
  }

  setInterval(function () {
    const elapsed = Date.now() - lastActivity;
    if (ringEl) {
      const pct = Math.max(0, 100 - (elapsed / idleMs) * 100);
      ringEl.style.setProperty("--idle-pct", pct + "%");
    }
    if (!skipReset && elapsed >= idleMs && !warned) {
      warned = true;
      ensureBanner().classList.add("is-visible");
    }
    if (!skipReset && elapsed >= idleMs + graceMs) {
      Kiosk.clearSession();
      window.location.href = homeUrl;
    }
  }, 250);
}

/* ---------------------------------------------------------------------- *
 * Home / "start over" control — shared confirm banner
 * ---------------------------------------------------------------------- */
function initHomeButton(btnEl, deviceEl, homeUrl) {
  if (!btnEl) return;
  let confirmEl = null;
  btnEl.addEventListener("click", function () {
    if (!confirmEl) {
      confirmEl = document.createElement("div");
      confirmEl.className = "idle-banner";
      confirmEl.innerHTML =
        '<span style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.12);flex-shrink:0;">' +
        icon("home") +
        '</span><p>Start over? Your selections will be cleared for the next guest.</p>' +
        '<button type="button" data-act="cancel" style="background:transparent;color:#fff;box-shadow:none;">Cancel</button>' +
        '<button type="button" data-act="confirm">Start over</button>';
      deviceEl.appendChild(confirmEl);
      confirmEl.querySelector('[data-act="cancel"]').addEventListener("click", function () {
        confirmEl.classList.remove("is-visible");
      });
      confirmEl.querySelector('[data-act="confirm"]').addEventListener("click", function () {
        Kiosk.clearSession();
        window.location.href = homeUrl;
      });
    }
    confirmEl.classList.add("is-visible");
  });
}
