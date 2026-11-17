/* Entity: Loyalty Point Ledger (Sổ giao dịch điểm thưởng)
   Schema: id, customerId, customerName, type (Earned|Redeemed|Expired|Manual Adjustment), points, orderId, balance, at, adjustedBy */
const DATA_SO_GIAO_DICH_DIEM = [
  { id: 'LP-9001', customerId: 'CUS-1001', customerName: 'Clara Yeo', type: 'Earned', points: 428, orderId: 'ORD-20261', balance: 1280, at: '2026-08-02 14:25', adjustedBy: null },
  { id: 'LP-9002', customerId: 'CUS-1004', customerName: 'Jasmine Lee', type: 'Earned', points: 129, orderId: 'ORD-20264', balance: 4820, at: '2026-08-14 15:30', adjustedBy: null },
  { id: 'LP-9003', customerId: 'CUS-1003', customerName: 'Siti Nurhaliza', type: 'Redeemed', points: -500, orderId: 'ORD-20270', balance: 2150, at: '2026-08-20 09:05', adjustedBy: null },
  { id: 'LP-9004', customerId: 'CUS-1008', customerName: 'Grace Lim', type: 'Expired', points: -120, orderId: null, balance: 3390, at: '2026-07-31 00:00', adjustedBy: null },
  { id: 'LP-9005', customerId: 'CUS-1007', customerName: 'Wendy Goh', type: 'Manual Adjustment', points: -66, orderId: 'ORD-20267', balance: 660, at: '2026-07-02 10:25', adjustedBy: 'Finance — Celine Toh (refund reversal)' },
  { id: 'LP-9006', customerId: 'CUS-1005', customerName: 'Michelle Tan', type: 'Earned', points: 90, orderId: 'ORD-20265', balance: 90, at: '2026-08-16 10:05', adjustedBy: null }
];
