/* DATA_TRANSACTION — completed POS sales (feeds Shift Close-Out and Pharmacy Reports)
Schema:
  id                     string
  transactionNo          string   display reference
  cashierName            string
  timestamp              string   ISO datetime
  items                  array of {
                             sku, name, qty, unitPrice, lineTotal,
                             override: null | { originalPrice, newPrice, reason, authorizedBy, authorizedAt }
                           }
  subtotal               number
  discount               number   combined promo + loyalty discount applied
  tax                    number
  total                  number
  promoCode              string|null   FK -> DATA_PROMOTION.code, applied via Customer & Rewards panel (Sales Terminal)
  promoDiscountAmount    number
  customerId             string|null   FK -> DATA_CUSTOMER.id, looked up via Customer & Rewards panel (Sales Terminal)
  customerName           string|null
  loyaltyPointsRedeemed  number   points redeemed at checkout (0 if no customer attached / no redemption)
  loyaltyDiscountAmount  number
  paymentMethod          string   "Cash" | "Card" | "EFTPOS"
  cashTendered           number|null
  changeGiven             number|null
  status                  string   "Completed" | "Voided"
  linkedPrescriptionId    string|null  FK -> DATA_PRESCRIPTION.id
  supervisorOverrideUsed  boolean
*/
const DATA_TRANSACTION = [
  {
    id: 'TXN-5470',
    transactionNo: 'TXN-2026-5470',
    cashierName: 'Ben Kowalski',
    timestamp: '2026-09-15T14:12:00+10:00',
    items: [
      { sku: 'MH-RX-104', name: 'Co-Amoxiclav 625mg Tablets', qty: 1, unitPrice: 22.60, lineTotal: 22.60, override: null },
    ],
    subtotal: 22.60, discount: 0, tax: 2.26, total: 24.86,
    paymentMethod: 'EFTPOS', cashTendered: null, changeGiven: null,
    status: 'Completed', linkedPrescriptionId: 'RX-1007', supervisorOverrideUsed: false,
  },
  {
    id: 'TXN-5490',
    transactionNo: 'TXN-2026-5490',
    cashierName: 'Ben Kowalski',
    timestamp: '2026-09-16T15:00:00+10:00',
    items: [
      { sku: 'MH-RX-104', name: 'Co-Amoxiclav 625mg Tablets', qty: 1, unitPrice: 22.60, lineTotal: 22.60, override: null },
      { sku: 'MH-OTC-022', name: 'Paracetamol 500mg Tablets', qty: 1, unitPrice: 6.90, lineTotal: 6.90, override: null },
    ],
    subtotal: 29.50, discount: 2.95, tax: 2.66, total: 29.21,
    promoCode: 'INSTORE10', promoDiscountAmount: 2.95,
    customerId: null, customerName: null, loyaltyPointsRedeemed: 0, loyaltyDiscountAmount: 0,
    paymentMethod: 'Card', cashTendered: null, changeGiven: null,
    status: 'Completed', linkedPrescriptionId: 'RX-1004', supervisorOverrideUsed: false,
  },
  {
    id: 'TXN-5501',
    transactionNo: 'TXN-2026-5501',
    cashierName: 'Lucy Edwards',
    timestamp: '2026-09-17T08:30:00+10:00',
    items: [
      { sku: 'MH-RX-102', name: 'Metformin 500mg Tablets', qty: 2, unitPrice: 9.80, lineTotal: 19.60, override: null },
    ],
    subtotal: 19.60, discount: 0, tax: 1.96, total: 21.56,
    paymentMethod: 'Cash', cashTendered: 25.00, changeGiven: 3.44,
    status: 'Completed', linkedPrescriptionId: 'RX-1006', supervisorOverrideUsed: false,
  },
  {
    id: 'TXN-5505',
    transactionNo: 'TXN-2026-5505',
    cashierName: 'Lucy Edwards',
    timestamp: '2026-09-17T09:05:00+10:00',
    items: [
      { sku: 'MH-VIT-001', name: 'Elevit Prenatal Multivitamin', qty: 1, unitPrice: 42.90, lineTotal: 32.90, override: { originalPrice: 42.90, newPrice: 32.90, reason: 'Price-matched to competitor promotion shown by customer', authorizedBy: 'Supervisor — Natalie Cooper', authorizedAt: '2026-09-17T09:06:00+10:00' } },
      { sku: 'MH-RET-041', name: 'Nursing Pads (60pcs)', qty: 1, unitPrice: 14.20, lineTotal: 14.20, override: null },
    ],
    subtotal: 47.10, discount: 0, tax: 4.71, total: 51.81,
    paymentMethod: 'Card', cashTendered: null, changeGiven: null,
    status: 'Completed', linkedPrescriptionId: null, supervisorOverrideUsed: true,
  },
  {
    id: 'TXN-5510',
    transactionNo: 'TXN-2026-5510',
    cashierName: 'Lucy Edwards',
    timestamp: '2026-09-17T09:22:00+10:00',
    items: [
      { sku: 'MH-RET-030', name: 'Digital Thermometer', qty: 1, unitPrice: 24.90, lineTotal: 24.90, override: null },
    ],
    subtotal: 24.90, discount: 0, tax: 2.49, total: 27.39,
    paymentMethod: 'Cash', cashTendered: 30.00, changeGiven: 2.61,
    status: 'Voided', linkedPrescriptionId: null, supervisorOverrideUsed: false,
  },
  {
    id: 'TXN-5512',
    transactionNo: 'TXN-2026-5512',
    cashierName: 'Lucy Edwards',
    timestamp: '2026-09-17T09:40:00+10:00',
    items: [
      { sku: 'MH-RX-102', name: 'Metformin 500mg Tablets', qty: 3, unitPrice: 9.80, lineTotal: 29.40, override: null },
    ],
    subtotal: 29.40, discount: 1.50, tax: 2.79, total: 30.69,
    promoCode: null, promoDiscountAmount: 0,
    customerId: 'CUS-1003', customerName: 'Ella Wright', loyaltyPointsRedeemed: 150, loyaltyDiscountAmount: 1.50,
    paymentMethod: 'EFTPOS', cashTendered: null, changeGiven: null,
    status: 'Completed', linkedPrescriptionId: 'RX-1002', supervisorOverrideUsed: false,
  },
  {
    id: 'TXN-5518',
    transactionNo: 'TXN-2026-5518',
    cashierName: 'Lucy Edwards',
    timestamp: '2026-09-17T09:55:00+10:00',
    items: [
      { sku: 'MH-RX-103', name: 'Folic Acid 5mg Tablets', qty: 1, unitPrice: 5.20, lineTotal: 0.00, override: { originalPrice: 5.20, newPrice: 0.00, reason: 'Complimentary — antenatal welcome pack goodwill waiver', authorizedBy: 'Supervisor — Natalie Cooper', authorizedAt: '2026-09-17T09:56:00+10:00' } },
      { sku: 'MH-BAB-014', name: 'Baby Gentle Wash 200ml', qty: 2, unitPrice: 18.50, lineTotal: 37.00, override: null },
    ],
    subtotal: 37.00, discount: 0, tax: 3.70, total: 40.70,
    paymentMethod: 'Card', cashTendered: null, changeGiven: null,
    status: 'Completed', linkedPrescriptionId: 'RX-1003', supervisorOverrideUsed: true,
  },
];
