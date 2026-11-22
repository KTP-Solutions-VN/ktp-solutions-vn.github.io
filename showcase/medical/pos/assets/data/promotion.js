/* DATA_PROMOTION — Promotion/Discount codes applicable at POS.
Module: Campaigns & Offers — same Discount/Promotion entity used by Storefront
(configured centrally in the Admin back office under Vouchers & Codes), reused here for
in-store redemption (one promotion entity shared across channels). Shape mirrors the Storefront prototype's DATA_MA_GIAM_GIA.
Schema:
  code         string
  description  string
  type         string   "percentage" | "fixed"
  value        number   percentage (0-100) or fixed AUD amount
  minSpend     number
  appliesTo    string   category/segment scope description
  startDate    string   ISO date
  endDate      string   ISO date
  status       string   "active" | "scheduled" | "expired"
  stackable    bool
  usageLimit   number
  usedCount    number
*/
const DATA_PROMOTION = [
  {
    code: 'INSTORE10',
    description: '10% off in-store purchases',
    type: 'percentage',
    value: 10,
    minSpend: 20,
    appliesTo: 'POS-wide',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'active',
    stackable: true,
    usageLimit: 5000,
    usedCount: 1284,
  },
  {
    code: 'PHARMACY5',
    description: 'A$5 off pharmacy counter purchases',
    type: 'fixed',
    value: 5,
    minSpend: 30,
    appliesTo: 'Pharmacy Counter',
    startDate: '2026-08-01',
    endDate: '2026-10-31',
    status: 'active',
    stackable: false,
    usageLimit: 1000,
    usedCount: 96,
  },
  {
    code: 'BIGCART50',
    description: 'A$50 off orders of A$200 or more',
    type: 'fixed',
    value: 50,
    minSpend: 200,
    appliesTo: 'POS-wide',
    startDate: '2026-09-01',
    endDate: '2026-09-30',
    status: 'active',
    stackable: true,
    usageLimit: 300,
    usedCount: 41,
  },
  {
    code: 'TOURDAYS25',
    description: 'Hospital tour season in-store promotion (ended)',
    type: 'percentage',
    value: 15,
    minSpend: 0,
    appliesTo: 'POS-wide',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    status: 'expired',
    stackable: false,
    usageLimit: 800,
    usedCount: 731,
  },
];
