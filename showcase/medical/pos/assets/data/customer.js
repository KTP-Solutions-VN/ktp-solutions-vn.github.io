/* DATA_CUSTOMER — customers eligible for POS lookup + reward-points redemption.
Module: Reward points (shared with Storefront — unified commerce: balances shown here
must read as the SAME ledger a customer sees online, so IDs/balances mirror the Storefront
prototype's DATA_KHACH_HANG for CUS-1001..1003, demonstrating real-time cross-channel sync of the points ledger with Storefront
(prevents a double-spend if the customer has just redeemed points online).
Schema:
  id                     string
  name                   string
  phone                  string   lookup key (also matched with spaces/dashes stripped)
  membershipId            string  lookup key, e.g. One Meridian Pass ID
  membershipType          string  "FBP" | "NBP" | "None"
  loyaltyPointsBalance    number  current redeemable balance (points)
*/
const DATA_CUSTOMER = [
  { id: 'CUS-1001', name: 'Charlotte Nguyen', phone: '+61 491 234 567', membershipId: 'CJP-88291034', membershipType: 'FBP', loyaltyPointsBalance: 1840 },
  { id: 'CUS-1002', name: 'Sienna Brooks', phone: '+61 482 341 190', membershipId: 'CJP-77120456', membershipType: 'NBP', loyaltyPointsBalance: 3220 },
  { id: 'CUS-1003', name: 'Ella Wright', phone: '+61 498 762 201', membershipId: 'CJP-90233871', membershipType: 'None', loyaltyPointsBalance: 260 },
  { id: 'CUS-1006', name: 'Tahlia Morris', phone: '+61 488 904 471', membershipId: 'CJP-51204477', membershipType: 'FBP', loyaltyPointsBalance: 0 },
];
