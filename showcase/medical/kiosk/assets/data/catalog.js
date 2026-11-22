/**
 * DATA_CATALOG — lightweight Product/Service catalog subset for the
 * Event Mini-Site/Kiosk browse screen (#62). This is a self-contained,
 * kiosk-only copy of the catalog concept used by the Storefront app —
 * it does NOT reference the Storefront app's data files.
 *
 * Schema:
 * - id: string             unique item id
 * - category: string       one of the interest-chip ids below
 * - name: string
 * - shortDescription: string
 * - price: number           AUD, 0 = free/registration
 * - originalPrice: number|null   only set for bundles, to show savings
 * - isBundle: boolean       true = bundle product (visual "Bundle" badge)
 * - bundleIncludes: string[]|null  component names shown under a bundle
 * - tag: string|null        short merchandising tag shown on the card
 * - icon: string            key into the ICONS map in global.js
 */
const CATALOG_CATEGORIES = [
  { id: "confinement-nutri", label: "Meridian Nutri", icon: "bowl" },
  { id: "prenatal-care", label: "Prenatal Care", icon: "heart-pulse" },
  { id: "prenatal-classes", label: "Prenatal Classes", icon: "book" },
  { id: "delivery-suite", label: "Birthing Suites", icon: "bed" },
  { id: "membership", label: "Member Benefits", icon: "id-card" }
];

const DATA_CATALOG = [
  {
    id: "prod-nutri-trial",
    category: "confinement-nutri",
    name: "Confinement Meal — Trial Set",
    shortDescription: "A single-day tasting set of our confinement meal program, delivered fresh.",
    price: 38,
    originalPrice: null,
    isBundle: false,
    bundleIncludes: null,
    tag: "Popular",
    icon: "bowl"
  },
  {
    id: "prod-nutri-28day",
    category: "confinement-nutri",
    name: "Meridian Nutri 28-Day Confinement Package",
    shortDescription: "28 days of confinement meals plus a 1-on-1 lactation consult.",
    price: 1680,
    originalPrice: 1920,
    isBundle: true,
    bundleIncludes: ["28-day meal plan", "1x lactation consultation", "Postnatal herbal tonic set"],
    tag: "Event Bundle",
    icon: "bowl"
  },
  {
    id: "prod-nutri-welcome-bundle",
    category: "confinement-nutri",
    name: "New Baby Welcome Bundle",
    shortDescription: "Trial meal set, muslin swaddle and a starter pack of baby essentials.",
    price: 168,
    originalPrice: 225,
    isBundle: true,
    bundleIncludes: ["Trial meal set", "Muslin swaddle wrap", "Baby essentials starter pack"],
    tag: "Event Exclusive",
    icon: "gift"
  },
  {
    id: "prod-prenatal-essential",
    category: "prenatal-care",
    name: "Prenatal Check-up Package — Essential",
    shortDescription: "One full prenatal check-up with a Meridian Specialists obstetrician.",
    price: 220,
    originalPrice: null,
    isBundle: false,
    bundleIncludes: null,
    tag: null,
    icon: "heart-pulse"
  },
  {
    id: "prod-prenatal-bundle",
    category: "prenatal-care",
    name: "Prenatal Check-up + Ultrasound Bundle",
    shortDescription: "Check-up, detailed ultrasound scan and a nutrition consult in one visit.",
    price: 480,
    originalPrice: 560,
    isBundle: true,
    bundleIncludes: ["Prenatal check-up", "Detailed ultrasound scan", "Nutrition consultation"],
    tag: "Save $80",
    icon: "heart-pulse"
  },
  {
    id: "prod-parenting-weekend",
    category: "prenatal-classes",
    name: "Parenting Class — Weekend Series",
    shortDescription: "3 weekend sessions covering labour, newborn care and breastfeeding.",
    price: 150,
    originalPrice: null,
    isBundle: false,
    bundleIncludes: null,
    tag: "Small groups",
    icon: "book"
  },
  {
    id: "prod-delivery-deluxe",
    category: "delivery-suite",
    name: "Birthing Suite — Deluxe Room",
    shortDescription: "Reserve a deluxe birthing suite for your estimated due date.",
    price: 3200,
    originalPrice: null,
    isBundle: false,
    bundleIncludes: null,
    tag: "Limited rooms",
    icon: "bed"
  },
  {
    id: "prod-delivery-standard",
    category: "delivery-suite",
    name: "Birthing Suite — Standard Room",
    shortDescription: "Reserve a standard birthing suite — comfortable and affordable.",
    price: 2100,
    originalPrice: null,
    isBundle: false,
    bundleIncludes: null,
    tag: null,
    icon: "bed"
  },
  {
    id: "prod-nutri-lactation",
    category: "confinement-nutri",
    name: "1-on-1 Lactation Consultation",
    shortDescription: "A single private session with a certified lactation consultant.",
    price: 120,
    originalPrice: null,
    isBundle: false,
    bundleIncludes: null,
    tag: null,
    icon: "heart-pulse"
  },
  {
    id: "prod-womens-screening",
    category: "prenatal-care",
    name: "Meridian Women's Clinic — Well-Woman Screening",
    shortDescription: "A general wellness screening package for women, ahead of or between pregnancies.",
    price: 268,
    originalPrice: 320,
    isBundle: true,
    bundleIncludes: ["Consultation", "Pap smear screening", "Basic blood panel"],
    tag: "Save $52",
    icon: "heart-pulse"
  },
  {
    id: "prod-membership-fbp",
    category: "membership",
    name: "FBP / NBP Member Enrollment",
    shortDescription: "Join the Meridian member programme for family savings on every visit.",
    price: 0,
    originalPrice: null,
    isBundle: false,
    bundleIncludes: null,
    tag: "Free to join",
    icon: "id-card"
  }
];
