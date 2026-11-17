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
     gstRate             number  (e.g. 0.09)
     gstAmount           number
     loyaltyPointsUsed    number
     loyaltyPointsEarned  number
     referredBy           string|null   staff name entered at Guided Checkout
     guestCheckout         bool
     paymentMethod         string  "Adyen — Credit Card" | "Adyen — PayNow" | "Adyen — GrabPay"
     total                  number
     currency                string  "SGD"
     deliveryAddress         string|null
     selfCollectionLocation  string|null
     trackingTimeline        array  [{ status, timestamp, note }]
   ========================================================================== */

const DATA_DON_HANG = [
  {
    orderId: "ORD-58291",
    customerId: "CUS-1001",
    customerName: "Grace Lim Wei Ting",
    createdAt: "2026-09-14T09:22:00+08:00",
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
    gstRate: 0.09,
    gstAmount: 62.82,
    loyaltyPointsUsed: 0,
    loyaltyPointsEarned: 320,
    referredBy: "Nurse Aileen Koh",
    guestCheckout: false,
    paymentMethod: "Adyen — Credit Card",
    total: 760.82,
    currency: "SGD",
    deliveryAddress: null,
    selfCollectionLocation: null,
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-09-14T09:22:00+08:00", note: "Order placed via hospital tour guided checkout" },
      { status: "Payment Confirmed", timestamp: "2026-09-14T09:23:10+08:00", note: "Paid via Adyen — Credit Card" },
      { status: "Processing", timestamp: "2026-09-14T09:25:00+08:00", note: "Care team preparing your first appointment slot" }
    ]
  },
  {
    orderId: "ORD-58317",
    customerId: "CUS-1003",
    customerName: "Michelle Tan Hui Xin",
    createdAt: "2026-09-15T14:05:00+08:00",
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
    gstRate: 0.09,
    gstAmount: 18.63,
    loyaltyPointsUsed: 0,
    loyaltyPointsEarned: 60,
    referredBy: "Vendor Booth — Sarah Neo",
    guestCheckout: false,
    paymentMethod: "Adyen — PayNow",
    total: 225.63,
    currency: "SGD",
    deliveryAddress: null,
    selfCollectionLocation: "Baby Expo 2026 — Booth 14 Collection Point",
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-09-15T14:05:00+08:00", note: "Order placed at Baby Expo 2026 booth via guided checkout" },
      { status: "Payment Confirmed", timestamp: "2026-09-15T14:06:20+08:00", note: "Paid via Adyen — PayNow" }
    ]
  },
  {
    orderId: "ORD-55004",
    customerId: "CUS-1001",
    customerName: "Grace Lim Wei Ting",
    createdAt: "2026-06-18T11:40:00+08:00",
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
    gstRate: 0.09,
    gstAmount: 182.07,
    loyaltyPointsUsed: 200,
    loyaltyPointsEarned: 210,
    referredBy: null,
    guestCheckout: false,
    paymentMethod: "Adyen — Credit Card",
    total: 2205.07,
    currency: "SGD",
    deliveryAddress: "12 Jalan Anak Bukit, #08-14, Singapore 588178",
    selfCollectionLocation: null,
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-06-18T11:40:00+08:00", note: "Order placed online" },
      { status: "Payment Confirmed", timestamp: "2026-06-18T11:41:00+08:00", note: "Paid via Adyen — Credit Card" },
      { status: "Processing", timestamp: "2026-06-19T08:00:00+08:00", note: "Meal plan preparation started" },
      { status: "Delivered", timestamp: "2026-06-20T10:15:00+08:00", note: "First delivery completed" },
      { status: "Completed", timestamp: "2026-07-18T00:00:00+08:00", note: "28-day plan completed" }
    ]
  },
  {
    orderId: "ORD-57110",
    customerId: "CUS-1001",
    customerName: "Grace Lim Wei Ting",
    createdAt: "2026-08-02T16:12:00+08:00",
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
    gstRate: 0.09,
    gstAmount: 29.52,
    loyaltyPointsUsed: 150,
    loyaltyPointsEarned: 0,
    referredBy: null,
    guestCheckout: false,
    paymentMethod: "Adyen — GrabPay",
    total: 207.52,
    currency: "SGD",
    deliveryAddress: null,
    selfCollectionLocation: "Meridian Baby, Level 1 Concierge",
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-08-02T16:12:00+08:00", note: "Order placed online" },
      { status: "Payment Confirmed", timestamp: "2026-08-02T16:13:30+08:00", note: "Paid via Adyen — GrabPay, 150 points redeemed" },
      { status: "Processing", timestamp: "2026-08-03T09:00:00+08:00", note: "Vendor fulfilling Doona hamper component" },
      { status: "Ready for Collection", timestamp: "2026-08-05T13:00:00+08:00", note: "Ready at Meridian Baby, Level 1 Concierge" }
    ]
  },
  {
    orderId: "ORD-58004",
    customerId: "CUS-1002",
    customerName: "Nur Aisyah Rahman",
    createdAt: "2026-09-01T10:00:00+08:00",
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
    gstRate: 0.09,
    gstAmount: 39.37,
    loyaltyPointsUsed: 0,
    loyaltyPointsEarned: 480,
    referredBy: null,
    guestCheckout: false,
    paymentMethod: "Adyen — Credit Card",
    total: 476.77,
    currency: "SGD",
    deliveryAddress: "88 Tampines Ave 5, #12-02, Singapore 529765",
    selfCollectionLocation: null,
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-09-01T10:00:00+08:00", note: "Order placed online" },
      { status: "Payment Confirmed", timestamp: "2026-09-01T10:01:00+08:00", note: "Paid via Adyen — Credit Card" },
      { status: "Delivered", timestamp: "2026-09-03T15:40:00+08:00", note: "Delivered to home address" },
      { status: "Completed", timestamp: "2026-09-03T15:40:00+08:00", note: "Order completed" }
    ]
  },
  {
    orderId: "ORD-56612",
    customerId: "CUS-1002",
    customerName: "Nur Aisyah Rahman",
    createdAt: "2026-07-22T13:30:00+08:00",
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
    gstRate: 0.09,
    gstAmount: 30.24,
    loyaltyPointsUsed: 300,
    loyaltyPointsEarned: 0,
    referredBy: "Vendor Booth — Farah Iskandar",
    guestCheckout: false,
    paymentMethod: "Adyen — Credit Card",
    total: 366.24,
    currency: "SGD",
    deliveryAddress: null,
    selfCollectionLocation: "Meridian Parenting Centre Front Desk",
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-07-22T13:30:00+08:00", note: "Order placed at Meridian Baby Fair booth" },
      { status: "Payment Confirmed", timestamp: "2026-07-22T13:31:00+08:00", note: "Paid via Adyen — Credit Card" },
      { status: "Refund Requested", timestamp: "2026-09-10T09:15:00+08:00", note: "Customer requested refund — class schedule conflict" }
    ]
  },
  {
    orderId: "ORD-58402",
    customerId: "CUS-1004",
    customerName: "Priya Sharma",
    createdAt: "2026-09-16T18:47:00+08:00",
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
    gstRate: 0.09,
    gstAmount: 7.11,
    loyaltyPointsUsed: 0,
    loyaltyPointsEarned: 0,
    referredBy: null,
    guestCheckout: true,
    paymentMethod: "Adyen — Credit Card",
    total: 86.11,
    currency: "SGD",
    deliveryAddress: "5 Marine Parade Rd, #03-19, Singapore 440005",
    selfCollectionLocation: null,
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-09-16T18:47:00+08:00", note: "Guest checkout order placed online" }
    ]
  },
  {
    orderId: "ORD-58455",
    customerId: "CUS-1001",
    customerName: "Grace Lim Wei Ting",
    createdAt: "2026-09-17T08:10:00+08:00",
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
    gstRate: 0.09,
    gstAmount: 28.80,
    loyaltyPointsUsed: 0,
    loyaltyPointsEarned: 0,
    referredBy: null,
    guestCheckout: false,
    paymentMethod: "Adyen — Credit Card",
    total: 348.80,
    currency: "SGD",
    deliveryAddress: null,
    selfCollectionLocation: null,
    trackingTimeline: [
      { status: "Order Placed", timestamp: "2026-09-17T08:10:00+08:00", note: "Order placed online" },
      { status: "Cancelled", timestamp: "2026-09-17T08:30:00+08:00", note: "Cancelled by customer — slot no longer needed" }
    ]
  }
];
