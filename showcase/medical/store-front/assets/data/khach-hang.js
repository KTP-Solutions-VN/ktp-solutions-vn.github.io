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
    name: "Grace Lim Wei Ting",
    email: "grace.lim@example.com",
    phone: "+65 9123 4567",
    oneMeridianPassId: "OTP-88291034",
    membershipType: "FBP",
    membershipStatus: "Active",
    memberSince: "2025-11-02",
    addresses: [
      { label: "Home", line1: "12 Jalan Anak Bukit, #08-14", city: "Singapore", postalCode: "588178" }
    ],
    loyaltyPointsBalance: 1840,
    marketingConsent: { email: true, sms: true, phone: false, push: true },
    segment: "Hospital Tour Visitor",
    deleteRequestStatus: "None",
    createdAt: "2025-10-20"
  },
  {
    id: "CUS-1002",
    name: "Nur Aisyah Rahman",
    email: "aisyah.rahman@example.com",
    phone: "+65 8234 1190",
    oneMeridianPassId: "OTP-77120456",
    membershipType: "NBP",
    membershipStatus: "Active",
    memberSince: "2024-05-14",
    addresses: [
      { label: "Home", line1: "88 Tampines Ave 5, #12-02", city: "Singapore", postalCode: "529765" }
    ],
    loyaltyPointsBalance: 3220,
    marketingConsent: { email: true, sms: false, phone: false, push: true },
    segment: "Online Shopper",
    deleteRequestStatus: "None",
    createdAt: "2023-08-03"
  },
  {
    id: "CUS-1003",
    name: "Michelle Tan Hui Xin",
    email: "michelle.tan@example.com",
    phone: "+65 9876 2201",
    oneMeridianPassId: "OTP-90233871",
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
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+65 8123 7742",
    oneMeridianPassId: "OTP-66910233",
    membershipType: "FBP",
    membershipStatus: "Pending",
    memberSince: null,
    addresses: [
      { label: "Home", line1: "5 Marine Parade Rd, #03-19", city: "Singapore", postalCode: "440005" }
    ],
    loyaltyPointsBalance: 90,
    marketingConsent: { email: true, sms: false, phone: false, push: false },
    segment: "Retail Shopper",
    deleteRequestStatus: "Pending",
    createdAt: "2026-01-29"
  }
];
