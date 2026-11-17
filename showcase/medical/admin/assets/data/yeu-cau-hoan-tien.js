/* Entity: Refund Request (Yêu cầu hoàn tiền)
   Schema: id, orderId, customerName, amount, currency, reason, initiatedBy, status (Initiated|Pending Approval|Approved|Rejected|Refund API Sent|Completed),
   approvalChain[{level,approver,decision,at,comment}], createdAt */
const DATA_YEU_CAU_HOAN_TIEN = [
  {
    id: 'RFD-3301', orderId: 'ORD-20267', customerName: 'Wendy Goh', amount: 652.91, currency: 'SGD',
    reason: 'Customer cancelled TCM package before first session — goodwill full refund.', initiatedBy: 'Admin — BU Owner (TCM)',
    status: 'Pending Approval', createdAt: '2026-07-02 09:50',
    approvalChain: [
      { level: 1, approver: 'Finance Lead — Celine Toh', decision: 'Approved', at: '2026-07-02 11:20', comment: 'Within policy, cancelled pre-fulfillment.' },
      { level: 2, approver: 'Super Admin — Ryan Tay', decision: 'Pending', at: null, comment: null }
    ]
  },
  {
    id: 'RFD-3302', orderId: 'ORD-20268', customerName: 'Grace Lim', amount: 741.20, currency: 'SGD',
    reason: 'Duplicate charge — customer paid twice via legacy e-commerce platform migration overlap.', initiatedBy: 'Admin — Finance',
    status: 'Completed', createdAt: '2026-06-10 10:00',
    approvalChain: [
      { level: 1, approver: 'Finance Lead — Celine Toh', decision: 'Approved', at: '2026-06-10 14:00', comment: 'Confirmed duplicate in Adyen log.' },
      { level: 2, approver: 'Super Admin — Ryan Tay', decision: 'Approved', at: '2026-06-11 09:15', comment: 'Approved for immediate refund.' }
    ]
  },
  {
    id: 'RFD-3303', orderId: 'ORD-20264', customerName: 'Jasmine Lee', amount: 300.00, currency: 'SGD',
    reason: 'Partial refund — room downgrade from Suite to Deluxe Single requested after booking.', initiatedBy: 'Operations — Guest Services',
    status: 'Rejected', createdAt: '2026-08-15 10:30',
    approvalChain: [
      { level: 1, approver: 'Finance Lead — Celine Toh', decision: 'Rejected', at: '2026-08-15 15:00', comment: 'Room downgrade window closed — past the 48h change policy.' }
    ]
  },
  {
    id: 'RFD-3304', orderId: 'ORD-20263', customerName: 'Siti Nurhaliza', amount: 200.00, currency: 'SGD',
    reason: 'Partial refund — 2 confinement meal days skipped due to hospital admission.', initiatedBy: 'Admin — BU Owner (Nutri)',
    status: 'Initiated', createdAt: '2026-08-18 08:15',
    approvalChain: [ { level: 1, approver: 'Finance Lead — Celine Toh', decision: 'Pending', at: null, comment: null } ]
  },
  {
    id: 'RFD-3305', orderId: 'ORD-20261', customerName: 'Clara Yeo', amount: 150.00, currency: 'SGD',
    reason: 'Discount applied twice in error during manual order correction.', initiatedBy: 'Admin — Marketing',
    status: 'Refund API Sent', createdAt: '2026-08-05 09:00',
    approvalChain: [
      { level: 1, approver: 'Finance Lead — Celine Toh', decision: 'Approved', at: '2026-08-05 11:00', comment: 'Confirmed duplicate discount stack.' },
      { level: 2, approver: 'Super Admin — Ryan Tay', decision: 'Approved', at: '2026-08-05 13:30', comment: 'Approved — sending to Adyen.' }
    ]
  }
];
