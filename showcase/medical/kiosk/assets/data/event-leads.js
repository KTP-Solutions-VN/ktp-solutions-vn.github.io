/**
 * DATA_EVENT_LEADS — Event Lead entity (Event Mini-Site/Kiosk)
 * Lifecycle: Captured -> Contacted -> Converted | Expired
 *
 * Schema:
 * - id: string               unique lead id, format "EVT-####"
 * - name: string              full name left at the booth
 * - phone: string             mobile number (AU format)
 * - email: string|null        optional email
 * - interests: string[]       catalog category ids the guest ticked
 * - boothLocation: string     which event/booth the lead was captured at
 * - capturedAt: string        ISO datetime of capture
 * - status: string            "Captured" | "Contacted" | "Converted" | "Expired"
 * - outcome: string|null      "counter" | "staff-follow-up" | null (not yet decided)
 * - selectedItems: string[]   catalog item ids reserved, if any
 * - notes: string|null        free-text note from Marketing follow-up, if any
 *
 * This file is the baseline ("today so far") for the visitors-served counter
 * signature moment on the Welcome Screen — new leads captured during the live demo
 * session are appended to localStorage['kiosk_new_leads'], never written here.
 */
const DATA_EVENT_LEADS = [
  {
    id: "EVT-1042",
    name: "Ruby Lawson",
    phone: "+61 494 162 208",
    email: "ruby.lawson@example.com",
    interests: ["prenatal-care", "membership"],
    boothLocation: "Baby Expo 2026 — City Convention Hall",
    capturedAt: "2026-09-17T09:14:00+10:00",
    status: "Converted",
    outcome: "counter",
    selectedItems: ["prod-prenatal-bundle", "prod-membership-fbp"],
    notes: "Completed guided checkout at counter within 8 minutes of leaving details."
  },
  {
    id: "EVT-1043",
    name: "Ahmed Siddiqui",
    phone: "+61 481 725 534",
    email: null,
    interests: ["confinement-nutri"],
    boothLocation: "Baby Expo 2026 — City Convention Hall",
    capturedAt: "2026-09-17T09:31:00+10:00",
    status: "Captured",
    outcome: null,
    selectedItems: ["prod-nutri-trial"],
    notes: null
  },
  {
    id: "EVT-1044",
    name: "Stella Kovac",
    phone: "+61 496 381 047",
    email: "stella.kovac@example.com",
    interests: ["prenatal-classes", "delivery-suite"],
    boothLocation: "Baby Expo 2026 — City Convention Hall",
    capturedAt: "2026-09-17T10:02:00+10:00",
    status: "Contacted",
    outcome: "staff-follow-up",
    selectedItems: ["prod-parenting-weekend", "prod-delivery-deluxe"],
    notes: "Marketing called 17 Sep, 3:40pm — guest wants to compare birthing suite rates first."
  },
  {
    id: "EVT-1045",
    name: "Nisha Krishnan",
    phone: "+61 485 493 376",
    email: "nisha.krishnan@example.com",
    interests: ["confinement-nutri", "prenatal-care"],
    boothLocation: "Baby Expo 2026 — City Convention Hall",
    capturedAt: "2026-09-17T10:20:00+10:00",
    status: "Converted",
    outcome: "counter",
    selectedItems: ["prod-nutri-28day", "prod-prenatal-essential"],
    notes: "Completed at counter, opted into FBP membership on the spot."
  },
  {
    id: "EVT-1046",
    name: "Tom Gallagher",
    phone: "+61 492 856 613",
    email: null,
    interests: ["membership"],
    boothLocation: "Baby Expo 2026 — City Convention Hall",
    capturedAt: "2026-09-17T10:47:00+10:00",
    status: "Captured",
    outcome: null,
    selectedItems: ["prod-membership-fbp"],
    notes: null
  },
  {
    id: "EVT-1047",
    name: "Brooke Henderson",
    phone: "+61 484 067 721",
    email: "brooke.henderson@example.com",
    interests: ["prenatal-care", "delivery-suite"],
    boothLocation: "Baby Expo 2026 — City Convention Hall",
    capturedAt: "2026-09-17T11:05:00+10:00",
    status: "Contacted",
    outcome: "staff-follow-up",
    selectedItems: ["prod-prenatal-bundle"],
    notes: "Waiting on partner's confirmation before booking a birthing suite."
  },
  {
    id: "EVT-1048",
    name: "Mariam Darwish",
    phone: "+61 491 574 498",
    email: null,
    interests: ["prenatal-classes"],
    boothLocation: "Baby Expo 2026 — City Convention Hall",
    capturedAt: "2026-09-16T14:12:00+10:00",
    status: "Expired",
    outcome: null,
    selectedItems: ["prod-parenting-weekend"],
    notes: "No response after 2 follow-up attempts — marked Expired per 14-day policy."
  },
  {
    id: "EVT-1049",
    name: "Josh Bailey",
    phone: "+61 487 630 285",
    email: "josh.bailey@example.com",
    interests: ["confinement-nutri", "membership"],
    boothLocation: "Baby Expo 2026 — City Convention Hall",
    capturedAt: "2026-09-17T11:22:00+10:00",
    status: "Captured",
    outcome: null,
    selectedItems: ["prod-nutri-welcome-bundle"],
    notes: null
  }
];
