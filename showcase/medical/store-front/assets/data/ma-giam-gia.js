/* ==========================================================================
   Entity: Discount/Promotion (Mã giảm giá/Khuyến mãi)
   Module: Marketing & Discounts Module
   Schema:
     code         string
     description  string
     type         string   "percentage" | "fixed"
     value        number   percentage (0-100) or fixed SGD amount
     minSpend     number
     appliesTo    string   category/segment scope description
     startDate    string   ISO date
     endDate      string   ISO date
     status       string   "active" | "scheduled" | "expired"
     stackable    bool
     usageLimit   number
     usedCount    number
   ========================================================================== */

const DATA_MA_GIAM_GIA = [
  {
    code: "WELCOME10",
    description: "10% off first order for new One Meridian Pass accounts",
    type: "percentage",
    value: 10,
    minSpend: 50,
    appliesTo: "Storefront-wide",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    status: "active",
    stackable: false,
    usageLimit: 2000,
    usedCount: 812
  },
  {
    code: "PREGFEST26",
    description: "S$50 off maternity packages — Baby Expo 2026 event exclusive",
    type: "fixed",
    value: 50,
    minSpend: 300,
    appliesTo: "Maternity Packages",
    startDate: "2026-09-10",
    endDate: "2026-09-20",
    status: "active",
    stackable: true,
    usageLimit: 500,
    usedCount: 231
  },
  {
    code: "NUTRI15",
    description: "15% off Meridian Nutri confinement meal plans",
    type: "percentage",
    value: 15,
    minSpend: 0,
    appliesTo: "Confinement Nutrition",
    startDate: "2026-08-01",
    endDate: "2026-10-31",
    status: "active",
    stackable: false,
    usageLimit: 1000,
    usedCount: 344
  },
  {
    code: "FESTIVE2026",
    description: "Year-end storewide promotion",
    type: "percentage",
    value: 12,
    minSpend: 100,
    appliesTo: "Storefront-wide",
    startDate: "2026-12-01",
    endDate: "2026-12-31",
    status: "scheduled",
    stackable: false,
    usageLimit: 3000,
    usedCount: 0
  },
  {
    code: "TOUR2025",
    description: "Hospital tour season promotion (ended)",
    type: "fixed",
    value: 20,
    minSpend: 0,
    appliesTo: "Hospital Tours",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    status: "expired",
    stackable: false,
    usageLimit: 800,
    usedCount: 795
  }
];
