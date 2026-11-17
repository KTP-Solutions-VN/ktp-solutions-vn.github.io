/* ==========================================================================
   Entity: Loyalty Point Ledger (Sổ giao dịch điểm thưởng)
   Module: Loyalty Points Module
   Schema:
     id           string
     customerId   string   references DATA_KHACH_HANG[].id
     date         string   ISO date
     type         string   "Earned" | "Redeemed" | "Expired" | "Adjusted"
     points       number   positive for Earned, negative for Redeemed/Expired
     orderId      string|null
     balanceAfter number
     description  string
     expiresOn    string|null  ISO date, only relevant to "Earned" entries
   ========================================================================== */

const DATA_SO_GIAO_DICH_DIEM = [
  { id: "PT-9001", customerId: "CUS-1001", date: "2026-09-14", type: "Earned", points: 320, orderId: "ORD-58291", balanceAfter: 1840, description: "Earned from Order #ORD-58291 (Prenatal Wellness Package)", expiresOn: "2027-09-14" },
  { id: "PT-9002", customerId: "CUS-1001", date: "2026-08-02", type: "Redeemed", points: -150, orderId: "ORD-57110", balanceAfter: 1520, description: "Redeemed at checkout — Order #ORD-57110", expiresOn: null },
  { id: "PT-9003", customerId: "CUS-1001", date: "2026-06-18", type: "Earned", points: 210, orderId: "ORD-55004", balanceAfter: 1670, description: "Earned from Order #ORD-55004 (Nutri Meal Plan)", expiresOn: "2027-06-18" },
  { id: "PT-9004", customerId: "CUS-1001", date: "2026-03-01", type: "Expired", points: -40, orderId: null, balanceAfter: 1460, description: "Points expired (12-month validity)", expiresOn: null },
  { id: "PT-9005", customerId: "CUS-1002", date: "2026-09-01", type: "Earned", points: 480, orderId: "ORD-58004", balanceAfter: 3220, description: "Earned from Order #ORD-58004 (Newborn Welcome Bundle)", expiresOn: "2027-09-01" },
  { id: "PT-9006", customerId: "CUS-1002", date: "2026-07-22", type: "Redeemed", points: -300, orderId: "ORD-56612", balanceAfter: 2740, description: "Redeemed at checkout — Order #ORD-56612", expiresOn: null },
  { id: "PT-9007", customerId: "CUS-1003", date: "2026-09-15", type: "Earned", points: 60, orderId: "ORD-58317", balanceAfter: 260, description: "Earned from Order #ORD-58317 (Postnatal Spa Voucher)", expiresOn: "2027-09-15" },
  { id: "PT-9008", customerId: "CUS-1003", date: "2026-06-12", type: "Earned", points: 200, orderId: "ORD-55201", balanceAfter: 200, description: "Welcome bonus — first CareJourney order", expiresOn: "2027-06-12" }
];
