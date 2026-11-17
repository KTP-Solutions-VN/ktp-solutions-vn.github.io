/* Entity: Gift with Purchase (Quà tặng kèm)
   Schema: id, name, conditionType (Min Spend|Product Bundle|Membership Status|Date Period), conditionValue,
   giftSku, giftName, status (Active|Inactive), fulfillmentPartner, ordersApplied, collectionStatus (Pending|Collected|Shipped) summary */
const DATA_QUA_TANG_KEM = [
  { id: 'GWP-01', name: 'Doona Car Seat Stroller — Premium Package Gift', conditionType: 'Min Spend', conditionValue: 'SGD 3,000+', giftSku: 'GIFT-DOONA', giftName: 'Doona Car Seat Stroller', status: 'Active', fulfillmentPartner: 'Doona SG (Vendor Partner)', ordersApplied: 22, collectionStatus: { pending: 6, collected: 14, shipped: 2 } },
  { id: 'GWP-02', name: 'Free Trial Meal — Meridian Nutri Bundle', conditionType: 'Product Bundle', conditionValue: 'Confinement Meal Plan + Prenatal Package', giftSku: 'GIFT-TRIALMEAL', giftName: 'Confinement Trial Meal Set', status: 'Active', fulfillmentPartner: 'Meridian Nutri Kitchen', ordersApplied: 54, collectionStatus: { pending: 10, collected: 40, shipped: 4 } },
  { id: 'GWP-03', name: 'FBP Member Welcome Kit', conditionType: 'Membership Status', conditionValue: 'FBP Member (new sign-up)', giftSku: 'GIFT-FBPKIT', giftName: 'FBP Welcome Gift Box', status: 'Active', fulfillmentPartner: 'Guest Services (on-site)', ordersApplied: 89, collectionStatus: { pending: 3, collected: 86, shipped: 0 } },
  { id: 'GWP-04', name: 'Preg Event August Goodie Bag', conditionType: 'Date Period', conditionValue: '2026-08-01 to 2026-08-31', giftSku: 'GIFT-AUGBAG', giftName: 'Preg Event Goodie Bag', status: 'Inactive', fulfillmentPartner: 'Guest Services (on-site)', ordersApplied: 210, collectionStatus: { pending: 0, collected: 210, shipped: 0 } }
];
