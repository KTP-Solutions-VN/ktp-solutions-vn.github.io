/* ==========================================================================
   Entity: Customer (Khách hàng)
   Module: Customers/Users Management
   Schema:
     id                   string
     name                 string
     email                string
     phone                string
     oneMeridianPassId     string   external SSO id
     membershipType       string   "FBP" | "NBP" | "None"
     membershipStatus     string   "Active" | "Pending" | "None"
     memberSince          string   ISO date
     addresses            array    [{ label, line1, city, postalCode }]
     loyaltyPointsBalance number
     marketingConsent     object   { email, sms, phone, push } booleans
     segment              string   e.g. "Event Attendee", "Online Shopper"
     deleteRequestStatus  string   "None" | "Pending" | "Completed"
     createdAt            string   ISO date
   ========================================================================== */

const DATA_KHACH_HANG = [
  {
    id: "CUS-1001",
    name: "Charlotte Nguyen",
    email: "charlotte.nguyen@example.com",
    phone: "+61 491 234 567",
    oneMeridianPassId: "CJP-88291034",
    membershipType: "FBP",
    membershipStatus: "Active",
    memberSince: "2025-11-02",
    addresses: [
      { label: "Home", line1: "Unit 8, 12 Avoca Street, Randwick", city: "Sydney", postalCode: "2031" }
    ],
    loyaltyPointsBalance: 1840,
    marketingConsent: { email: true, sms: true, phone: false, push: true },
    segment: "Hospital Tour Visitor",
    deleteRequestStatus: "None",
    createdAt: "2025-10-20"
  },
  {
    id: "CUS-1002",
    name: "Sienna Brooks",
    email: "sienna.brooks@example.com",
    phone: "+61 482 341 190",
    oneMeridianPassId: "CJP-77120456",
    membershipType: "NBP",
    membershipStatus: "Active",
    memberSince: "2024-05-14",
    addresses: [
      { label: "Home", line1: "Unit 12, 88 Hawkesbury Road, Westmead", city: "Sydney", postalCode: "2145" }
    ],
    loyaltyPointsBalance: 3220,
    marketingConsent: { email: true, sms: false, phone: false, push: true },
    segment: "Online Shopper",
    deleteRequestStatus: "None",
    createdAt: "2023-08-03"
  },
  {
    id: "CUS-1003",
    name: "Ella Wright",
    email: "ella.wright@example.com",
    phone: "+61 498 762 201",
    oneMeridianPassId: "CJP-90233871",
    membershipType: "None",
    membershipStatus: "None",
    memberSince: null,
    addresses: [],
    loyaltyPointsBalance: 260,
    marketingConsent: { email: true, sms: true, phone: true, push: false },
    segment: "Event Attendee",
    deleteRequestStatus: "None",
    createdAt: "2026-06-11"
  },
  {
    id: "CUS-1004",
    name: "Maya Singh",
    email: "maya.singh@example.com",
    phone: "+61 481 237 742",
    oneMeridianPassId: "CJP-66910233",
    membershipType: "FBP",
    membershipStatus: "Pending",
    memberSince: null,
    addresses: [
      { label: "Home", line1: "Unit 3, 5 Spring Street, Bondi Junction", city: "Sydney", postalCode: "2022" }
    ],
    loyaltyPointsBalance: 90,
    marketingConsent: { email: true, sms: false, phone: false, push: false },
    segment: "Retail Shopper",
    deleteRequestStatus: "Pending",
    createdAt: "2026-01-29"
  }
];
