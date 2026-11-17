/* Entity: Customer Segment (Nhóm/Phân khúc khách hàng)
   Schema: id, name, ruleType (Automatic|Manual), condition, memberCount, usedInPromotions[] */
const DATA_NHOM_KHACH_HANG = [
  { id: 'SEG-01', name: 'VIP', ruleType: 'Manual', condition: 'Manually tagged by Admin', memberCount: 3, usedInPromotions: ['PROMO-02'] },
  { id: 'SEG-02', name: 'FBP Member', ruleType: 'Automatic', condition: 'membership = FBP', memberCount: 3, usedInPromotions: ['PROMO-02'] },
  { id: 'SEG-03', name: 'NBP Member', ruleType: 'Automatic', condition: 'membership = NBP', memberCount: 2, usedInPromotions: [] },
  { id: 'SEG-04', name: 'Hospital Tour Visitor', ruleType: 'Automatic', condition: 'acquisitionSource = Hospital Tour', memberCount: 2, usedInPromotions: [] },
  { id: 'SEG-05', name: 'Eligible for Free Item', ruleType: 'Automatic', condition: 'lifetime spend ≥ SGD 2,500', memberCount: 1, usedInPromotions: ['PROMO-05'] }
];
