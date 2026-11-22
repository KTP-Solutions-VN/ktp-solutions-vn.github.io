/* ==========================================================================
   Entity: Order (Đơn hàng)
   Module: Orders Management / Cart Management
   Schema:
     orderId           string
     customerId        string   references DATA_KHACH_HANG[].id
     customerName      string
     createdAt         string   ISO date
     status             string  "Placed" | "Paid" | "Processing" | "Ready" | "Completed" | "Cancelled" | "RefundRequested"
     purchaseSource     string  "online" | "event" | "hospital-tour"  — signature moment: drives cart/channel grouping
     eventName          string|null   e.g. "Baby Expo 2026" — only when purchaseSource = "event"
     fulfillmentMethod  string  "delivery" | "self-collection" | "booking-confirmation"
     items               array  [{ productId, name, variant, qty, unitPrice, lineTotal }]
     subtotal            number
     discountCode        string|null
     discountAmount      number
     gstRate             number  (e.g. 0.10)
     gstAmount           number
     loyaltyPointsUsed    number
     loyaltyPointsEarned  number
     referredBy           string|null   staff name entered at checkout
     guestCheckout         bool
     paymentMethod         string  "Credit Card" | "PayID" | "Afterpay"
     total                  number
     currency                string  "AUD"
     deliveryAddress         string|null
     selfCollectionLocation  string|null
     trackingTimeline        array  [{ status, timestamp, note }]
   ========================================================================== */

const DATA_DON_HANG = [
  {
    orderId: "ORD-58291",
    customerId: "CUS-1001",
    customerName: "Charlotte Nguyen",
    createdAt: "2026-09-14T09:22:00+10:00",
    status: "Processing",
    purchaseSource: "hospital-tour",
    eventName: null,
    fulfillmentMethod: "booking-confirmation",
    items: [
      { productId: "PRD-1001", name: "Meridian Prenatal Wellness Package", variant: "2nd Trimester Bundle", qty: 1, unitPrice: 748.00, lineTotal: 748.00 }
    ],
    subtotal: 748.00,
    discountCode: "PREGFEST26",
    discountAmount: 50.00,
    gstRate: 0.10,
    gstAmount: 69.80,
    loyaltyPointsUsed: 0,
    loyaltyPointsEarned: 320,
    referredBy: "Nurse Kirra Johnson",
    guestCheckout: false,
    paymentMethod: "Credit Card",
    total: 767.80,
    currency: "AUD",
    deliveryAddress: null,
    selfCollectionLocation: null,
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-09-14T09:22:00+10:00", note: "Order placed via hospital tour guided checkout" },
      { status: "Payment Confirmed", timestamp: "2026-09-14T09:23:10+10:00", note: "Paid via payment gateway — Credit Card" },
      { status: "Processing", timestamp: "2026-09-14T09:25:00+10:00", note: "Care team preparing your first appointment slot" }
    ]
  },
  {
    orderId: "ORD-58317",
    customerId: "CUS-1003",
    customerName: "Ella Wright",
    createdAt: "2026-09-15T14:05:00+10:00",
    status: "Paid",
    purchaseSource: "event",
    eventName: "Baby Expo 2026",
    fulfillmentMethod: "self-collection",
    items: [
      { productId: "PRD-1008", name: "Postnatal Recovery Spa & Wellness Voucher", variant: "60-Minute Session", qty: 1, unitPrice: 128.00, lineTotal: 128.00 },
      { productId: "PRD-1006", name: "Prenatal Vitamins & Supplements Starter Pack", variant: "30-Day Supply", qty: 1, unitPrice: 79.00, lineTotal: 79.00 }
    ],
    subtotal: 207.00,
    discountCode: null,
    discountAmount: 0,
    gstRate: 0.10,
    gstAmount: 20.70,
    loyaltyPointsUsed: 0,
    loyaltyPointsEarned: 60,
    referredBy: "Vendor Booth — Jade Robinson",
    guestCheckout: false,
    paymentMethod: "PayID",
    total: 227.70,
    currency: "AUD",
    deliveryAddress: null,
    selfCollectionLocation: "Baby Expo 2026 — Booth 14 Collection Point",
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-09-15T14:05:00+10:00", note: "Order placed at Baby Expo 2026 booth via guided checkout" },
      { status: "Payment Confirmed", timestamp: "2026-09-15T14:06:20+10:00", note: "Paid via payment gateway — PayID" }
    ]
  },
  {
    orderId: "ORD-55004",
    customerId: "CUS-1001",
    customerName: "Charlotte Nguyen",
    createdAt: "2026-06-18T11:40:00+10:00",
    status: "Completed",
    purchaseSource: "online",
    eventName: null,
    fulfillmentMethod: "delivery",
    items: [
      { productId: "PRD-1003", name: "Meridian Nutri Confinement Meal Plan (28 Days)", variant: "Standard Plan", qty: 1, unitPrice: 2380.00, lineTotal: 2380.00 }
    ],
    subtotal: 2380.00,
    discountCode: "NUTRI15",
    discountAmount: 357.00,
    gstRate: 0.10,
    gstAmount: 202.30,
    loyaltyPointsUsed: 200,
    loyaltyPointsEarned: 210,
    referredBy: null,
    guestCheckout: false,
    paymentMethod: "Credit Card",
    total: 2225.30,
    currency: "AUD",
    deliveryAddress: "Unit 8, 12 Avoca Street, Randwick NSW 2031",
    selfCollectionLocation: null,
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-06-18T11:40:00+10:00", note: "Order placed online" },
      { status: "Payment Confirmed", timestamp: "2026-06-18T11:41:00+10:00", note: "Paid via payment gateway — Credit Card" },
      { status: "Processing", timestamp: "2026-06-19T08:00:00+10:00", note: "Meal plan preparation started" },
      { status: "Delivered", timestamp: "2026-06-20T10:15:00+10:00", note: "First delivery completed" },
      { status: "Completed", timestamp: "2026-07-18T00:00:00+10:00", note: "28-day plan completed" }
    ]
  },
  {
    orderId: "ORD-57110",
    customerId: "CUS-1001",
    customerName: "Charlotte Nguyen",
    createdAt: "2026-08-02T16:12:00+10:00",
    status: "Ready",
    purchaseSource: "online",
    eventName: null,
    fulfillmentMethod: "self-collection",
    items: [
      { productId: "PRD-1005", name: "Newborn Baby Welcome Bundle", variant: "—", qty: 1, unitPrice: 328.00, lineTotal: 328.00 }
    ],
    subtotal: 328.00,
    discountCode: null,
    discountAmount: 0,
    gstRate: 0.10,
    gstAmount: 32.80,
    loyaltyPointsUsed: 150,
    loyaltyPointsEarned: 0,
    referredBy: null,
    guestCheckout: false,
    paymentMethod: "Afterpay",
    total: 210.80,
    currency: "AUD",
    deliveryAddress: null,
    selfCollectionLocation: "Meridian Baby, Level 1 Concierge",
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-08-02T16:12:00+10:00", note: "Order placed online" },
      { status: "Payment Confirmed", timestamp: "2026-08-02T16:13:30+10:00", note: "Paid via payment gateway — Afterpay, 150 points redeemed" },
      { status: "Processing", timestamp: "2026-08-03T09:00:00+10:00", note: "Vendor fulfilling Doona hamper component" },
      { status: "Ready for Collection", timestamp: "2026-08-05T13:00:00+10:00", note: "Ready at Meridian Baby, Level 1 Concierge" }
    ]
  },
  {
    orderId: "ORD-58004",
    customerId: "CUS-1002",
    customerName: "Sienna Brooks",
    createdAt: "2026-09-01T10:00:00+10:00",
    status: "Completed",
    purchaseSource: "online",
    eventName: null,
    fulfillmentMethod: "delivery",
    items: [
      { productId: "PRD-1005", name: "Newborn Baby Welcome Bundle", variant: "—", qty: 1, unitPrice: 328.00, lineTotal: 328.00 },
      { productId: "PRD-1006", name: "Prenatal Vitamins & Supplements Starter Pack", variant: "30-Day Supply", qty: 2, unitPrice: 79.00, lineTotal: 158.00 }
    ],
    subtotal: 486.00,
    discountCode: "WELCOME10",
    discountAmount: 48.60,
    gstRate: 0.10,
    gstAmount: 43.74,
    loyaltyPointsUsed: 0,
    loyaltyPointsEarned: 480,
    referredBy: null,
    guestCheckout: false,
    paymentMethod: "Credit Card",
    total: 481.14,
    currency: "AUD",
    deliveryAddress: "Unit 12, 88 Hawkesbury Road, Westmead NSW 2145",
    selfCollectionLocation: null,
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-09-01T10:00:00+10:00", note: "Order placed online" },
      { status: "Payment Confirmed", timestamp: "2026-09-01T10:01:00+10:00", note: "Paid via payment gateway — Credit Card" },
      { status: "Delivered", timestamp: "2026-09-03T15:40:00+10:00", note: "Delivered to home address" },
      { status: "Completed", timestamp: "2026-09-03T15:40:00+10:00", note: "Order completed" }
    ]
  },
  {
    orderId: "ORD-56612",
    customerId: "CUS-1002",
    customerName: "Sienna Brooks",
    createdAt: "2026-07-22T13:30:00+10:00",
    status: "RefundRequested",
    purchaseSource: "event",
    eventName: "Meridian Baby Fair 2026",
    fulfillmentMethod: "self-collection",
    items: [
      { productId: "PRD-1004", name: "Prenatal Parenting Class — Childbirth Essentials", variant: "Weekend Morning", qty: 2, unitPrice: 168.00, lineTotal: 336.00 }
    ],
    subtotal: 336.00,
    discountCode: null,
    discountAmount: 0,
    gstRate: 0.10,
    gstAmount: 33.60,
    loyaltyPointsUsed: 300,
    loyaltyPointsEarned: 0,
    referredBy: "Vendor Booth — Nina Petrovic",
    guestCheckout: false,
    paymentMethod: "Credit Card",
    total: 369.60,
    currency: "AUD",
    deliveryAddress: null,
    selfCollectionLocation: "Meridian Parenting Centre Front Desk",
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-07-22T13:30:00+10:00", note: "Order placed at Meridian Baby Fair booth" },
      { status: "Payment Confirmed", timestamp: "2026-07-22T13:31:00+10:00", note: "Paid via payment gateway — Credit Card" },
      { status: "Refund Requested", timestamp: "2026-09-10T09:15:00+10:00", note: "Customer requested refund — class schedule conflict" }
    ]
  },
  {
    orderId: "ORD-58402",
    customerId: "CUS-1004",
    customerName: "Maya Singh",
    createdAt: "2026-09-16T18:47:00+10:00",
    status: "Placed",
    purchaseSource: "online",
    eventName: null,
    fulfillmentMethod: "delivery",
    items: [
      { productId: "PRD-1006", name: "Prenatal Vitamins & Supplements Starter Pack", variant: "30-Day Supply", qty: 1, unitPrice: 79.00, lineTotal: 79.00 }
    ],
    subtotal: 79.00,
    discountCode: null,
    discountAmount: 0,
    gstRate: 0.10,
    gstAmount: 7.90,
    loyaltyPointsUsed: 0,
    loyaltyPointsEarned: 0,
    referredBy: null,
    guestCheckout: true,
    paymentMethod: "Credit Card",
    total: 86.90,
    currency: "AUD",
    deliveryAddress: "Unit 3, 5 Spring Street, Bondi Junction NSW 2022",
    selfCollectionLocation: null,
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-09-16T18:47:00+10:00", note: "Guest checkout order placed online" }
    ]
  },
  {
    orderId: "ORD-58455",
    customerId: "CUS-1001",
    customerName: "Charlotte Nguyen",
    createdAt: "2026-09-17T08:10:00+10:00",
    status: "Cancelled",
    purchaseSource: "online",
    eventName: null,
    fulfillmentMethod: "booking-confirmation",
    items: [
      { productId: "PRD-1007", name: "Meridian Fertility Centre Consultation Package", variant: "—", qty: 1, unitPrice: 320.00, lineTotal: 320.00 }
    ],
    subtotal: 320.00,
    discountCode: null,
    discountAmount: 0,
    gstRate: 0.10,
    gstAmount: 32.00,
    loyaltyPointsUsed: 0,
    loyaltyPointsEarned: 0,
    referredBy: null,
    guestCheckout: false,
    paymentMethod: "Credit Card",
    total: 352.00,
    currency: "AUD",
    deliveryAddress: null,
    selfCollectionLocation: null,
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-09-17T08:10:00+10:00", note: "Order placed online" },
      { status: "Cancelled", timestamp: "2026-09-17T08:30:00+10:00", note: "Cancelled by customer — slot no longer needed" }
    ]
  }
];
