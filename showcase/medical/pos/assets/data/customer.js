/* DATA_CUSTOMER — customers eligible for POS lookup + Loyalty Points redemption.
Module: Loyalty Points Module (shared with Storefront — unified commerce: balances shown here
must read as the SAME ledger a customer sees online, so IDs/balances mirror the Storefront
prototype's DATA_KHACH_HANG for CUS-1001..1003, demonstrating real-time cross-channel sync per
screen-specifications.md #54's business rule: "đồng bộ số dư Loyalty Point Ledger real-time với
Storefront (tránh double-spend nếu khách vừa đổi điểm online)".
Schema:
  id                     string
  name                   string
  phone                  string   lookup key (also matched with spaces/dashes stripped)
  membershipId            string  lookup key, e.g. One Meridian Pass ID
  membershipType          string  "FBP" | "NBP" | "None"
  loyaltyPointsBalance    number  current redeemable balance (points)
*/
const DATA_CUSTOMER = [
  { id: 'CUS-1001', name: 'Grace Lim Wei Ting', phone: '+65 9123 4567', membershipId: 'OTP-88291034', membershipType: 'FBP', loyaltyPointsBalance: 1840 },
  { id: 'CUS-1002', name: 'Nur Aisyah Rahman', phone: '+65 8234 1190', membershipId: 'OTP-77120456', membershipType: 'NBP', loyaltyPointsBalance: 3220 },
  { id: 'CUS-1003', name: 'Michelle Tan Hui Xin', phone: '+65 9876 2201', membershipId: 'OTP-90233871', membershipType: 'None', loyaltyPointsBalance: 260 },
  { id: 'CUS-1006', name: 'Farah Iskandar Binte Rosli', phone: '+65 8890 4471', membershipId: 'OTP-51204477', membershipType: 'FBP', loyaltyPointsBalance: 0 },
];
