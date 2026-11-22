/* Entity: Order (Đơn hàng)
   Schema: id, customerId, customerName, purchaseSource (Event|Hospital Tour|Online|Retail),
   fulfillmentMethod (Delivery|On-site|Booking-based|Self-collection), status (Cart|Ordered|Paid|Processing|Delivered|Ready for Collection|Completed|Cancelled|Refunded),
   items[{productId,name,variant,qty,price}], subtotal, discount, gst, total, currency,
   createdAt, updatedAt, notes[{author,text,at}], trackingNo, referredBy, formsFilled (for signature-moment aggregate) */
const DATA_DON_HANG = [
  {
    id: 'ORD-20261', customerId: 'CUS-1001', customerName: 'Olivia Bennett', purchaseSource: 'Event', fulfillmentMethod: 'Booking-based',
    status: 'Completed',
    items: [
      { productId: 'PRD-001', name: 'Prenatal Wellness Package — Trimester 1', variant: 'Premium (+ ultrasound 4D)', qty: 1, price: 1280 },
      { productId: 'PRD-003', name: 'Meridian Nutri — Confinement Meal Plan (28 Days)', variant: 'Classic', qty: 1, price: 2980 },
      { productId: 'PRD-006', name: 'FBP Membership — First Baby Programme', variant: 'Standard', qty: 1, price: 0 }
    ],
    subtotal: 4260, discount: 150, gst: 411.00, total: 4521.00, currency: 'AUD',
    createdAt: '2026-08-02 14:22', updatedAt: '2026-08-04 09:10', formsFilled: 1,
    notes: [ { author: 'System', text: 'Order synced to EDEN HMS.', at: '2026-08-02 14:25' } ],
    trackingNo: null, referredBy: 'Natalie Cooper (PSC)'
  },
  {
    id: 'ORD-20262', customerId: 'CUS-1002', customerName: 'Anika Patel', purchaseSource: 'Hospital Tour', fulfillmentMethod: 'On-site',
    status: 'Processing',
    items: [ { productId: 'PRD-002', name: 'Hospital Tour — Birthing Suite', variant: 'Group Tour (up to 6 pax)', qty: 1, price: 0 }, { productId: 'PRD-004', name: 'Prenatal Class — Birth & Beyond (4 sessions)', variant: 'Weekend Batch', qty: 1, price: 460 } ],
    subtotal: 460, discount: 0, gst: 46.00, total: 506.00, currency: 'AUD',
    createdAt: '2026-08-10 11:05', updatedAt: '2026-08-10 11:05', formsFilled: 1,
    notes: [], trackingNo: null, referredBy: null
  },
  {
    id: 'ORD-20263', customerId: 'CUS-1003', customerName: 'Layla Haddad', purchaseSource: 'Online', fulfillmentMethod: 'Delivery',
    status: 'Delivered',
    items: [ { productId: 'PRD-003', name: 'Meridian Nutri — Confinement Meal Plan (28 Days)', variant: 'Deluxe (with herbal tonics)', qty: 1, price: 3980 } ],
    subtotal: 3980, discount: 398, gst: 358.20, total: 3940.20, currency: 'AUD',
    createdAt: '2026-07-22 09:40', updatedAt: '2026-07-28 16:00', formsFilled: 1,
    notes: [ { author: 'Ops — Guest Services', text: 'Delivered via Australia Post, signed by recipient.', at: '2026-07-28 16:00' } ],
    trackingNo: 'AP-AU-88213410', referredBy: null
  },
  {
    id: 'ORD-20264', customerId: 'CUS-1004', customerName: 'Emily Harris', purchaseSource: 'Retail', fulfillmentMethod: 'Self-collection',
    status: 'Ready for Collection',
    items: [ { productId: 'PRD-005', name: 'Birthing Suite — Deluxe Room Booking', variant: 'Suite (VIP)', qty: 1, price: 1180 } ],
    subtotal: 1180, discount: 0, gst: 118.00, total: 1298.00, currency: 'AUD',
    createdAt: '2026-08-14 15:12', updatedAt: '2026-08-14 15:30', formsFilled: 1,
    notes: [], trackingNo: null, referredBy: 'Hayley Walker (Vendor Partner)'
  },
  {
    id: 'ORD-20265', customerId: 'CUS-1005', customerName: 'Chloe Martin', purchaseSource: 'Event', fulfillmentMethod: 'On-site',
    status: 'Paid',
    items: [ { productId: 'PRD-001', name: 'Prenatal Wellness Package — Trimester 1', variant: 'Standard', qty: 1, price: 780 }, { productId: 'PRD-004', name: 'Prenatal Class — Birth & Beyond (4 sessions)', variant: 'Weekday Batch', qty: 1, price: 420 }, { productId: 'PRD-006', name: 'FBP Membership — First Baby Programme', variant: 'Standard', qty: 1, price: 0 } ],
    subtotal: 1200, discount: 60, gst: 114.00, total: 1254.00, currency: 'AUD',
    createdAt: '2026-08-16 10:02', updatedAt: '2026-08-16 10:05', formsFilled: 1,
    notes: [], trackingNo: null, referredBy: null
  },
  {
    id: 'ORD-20266', customerId: 'CUS-1006', customerName: 'Zara Khoury', purchaseSource: 'Hospital Tour', fulfillmentMethod: 'Booking-based',
    status: 'Ordered',
    items: [ { productId: 'PRD-002', name: 'Hospital Tour — Birthing Suite', variant: 'Group Tour (up to 6 pax)', qty: 1, price: 0 } ],
    subtotal: 0, discount: 0, gst: 0, total: 0, currency: 'AUD',
    createdAt: '2026-08-17 13:44', updatedAt: '2026-08-17 13:44', formsFilled: 1,
    notes: [], trackingNo: null, referredBy: null
  },
  {
    id: 'ORD-20267', customerId: 'CUS-1007', customerName: 'Hayley Walker', purchaseSource: 'Retail', fulfillmentMethod: 'Delivery',
    status: 'Cancelled',
    items: [ { productId: 'PRD-008', name: 'TCM Postnatal Body Wellness (5 sessions)', variant: 'Standard', qty: 1, price: 599 } ],
    subtotal: 599, discount: 0, gst: 59.90, total: 658.90, currency: 'AUD',
    createdAt: '2026-06-30 08:55', updatedAt: '2026-07-02 10:20', formsFilled: 1,
    notes: [ { author: 'Finance', text: 'Cancelled at customer request before fulfillment — refund initiated.', at: '2026-07-02 10:20' } ],
    trackingNo: null, referredBy: null
  },
  {
    id: 'ORD-20268', customerId: 'CUS-1008', customerName: 'Natalie Cooper', purchaseSource: 'Online', fulfillmentMethod: 'Delivery',
    status: 'Refunded',
    items: [ { productId: 'PRD-010', name: "Women's Wellness Screening Package", variant: 'Comprehensive', qty: 1, price: 680 } ],
    subtotal: 680, discount: 0, gst: 68.00, total: 748.00, currency: 'AUD',
    createdAt: '2026-06-05 12:15', updatedAt: '2026-06-12 09:00', formsFilled: 1,
    notes: [ { author: 'Finance', text: 'Refund #RFD-3305 completed via payment gateway.', at: '2026-06-12 09:00' } ],
    trackingNo: null, referredBy: null
  },
  {
    id: 'ORD-20269', customerId: 'CUS-1001', customerName: 'Olivia Bennett', purchaseSource: 'Event', fulfillmentMethod: 'On-site',
    status: 'Paid',
    items: [ { productId: 'PRD-007', name: 'Fertility Assessment — Initial Consult', variant: 'Single Consult', qty: 1, price: 250 } ],
    subtotal: 250, discount: 0, gst: 25.00, total: 275.00, currency: 'AUD',
    createdAt: '2026-08-19 16:30', updatedAt: '2026-08-19 16:32', formsFilled: 1,
    notes: [], trackingNo: null, referredBy: null
  },
  {
    id: 'ORD-20270', customerId: 'CUS-1003', customerName: 'Layla Haddad', purchaseSource: 'Online', fulfillmentMethod: 'Delivery',
    status: 'Processing',
    items: [ { productId: 'PRD-003', name: 'Meridian Nutri — Confinement Meal Plan (28 Days)', variant: 'Classic', qty: 1, price: 2980 }, { productId: 'PRD-009', name: 'Paediatric Dental Check-up — First Visit', variant: 'Standard', qty: 1, price: 88 } ],
    subtotal: 3068, discount: 0, gst: 306.80, total: 3374.80, currency: 'AUD',
    createdAt: '2026-08-20 09:00', updatedAt: '2026-08-20 09:00', formsFilled: 1,
    notes: [], trackingNo: null, referredBy: null
  }
];
