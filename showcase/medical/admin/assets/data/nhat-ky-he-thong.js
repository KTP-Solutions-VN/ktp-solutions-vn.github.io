/* Entity: Activity Trail (Nhật ký hệ thống) — append-only
   Schema: id, at, user, action, objectType, objectId, before, after, severity (Info|Sensitive) */
const DATA_NHAT_KY_HE_THONG = [
  { id: 'LOG-8001', at: '2026-09-17 08:14', user: 'Lachlan Murphy (Super Admin)', action: 'Approved refund', objectType: 'Refund Request', objectId: 'RFD-3305', before: 'Pending Approval', after: 'Refund API Sent', severity: 'Sensitive' },
  { id: 'LOG-8002', at: '2026-09-16 17:45', user: 'Jessica Russo (Admin)', action: 'Published content page', objectType: 'Content Page', objectId: 'CMS-01', before: 'Draft', after: 'Published', severity: 'Info' },
  { id: 'LOG-8003', at: '2026-09-16 15:02', user: 'Lauren Mitchell (Finance)', action: 'Approved refund', objectType: 'Refund Request', objectId: 'RFD-3302', before: 'Pending Approval', after: 'Approved', severity: 'Sensitive' },
  { id: 'LOG-8004', at: '2026-09-15 11:30', user: 'Andrew Campbell (Admin)', action: 'Edited customer record', objectType: 'Customer', objectId: 'CUS-1004', before: 'phone: +61 491 234 599', after: 'phone: +61 491 234 504', severity: 'Sensitive' },
  { id: 'LOG-8005', at: '2026-09-14 09:10', user: 'Omar Nasser (Tech Support)', action: 'Adjusted loyalty points (manual)', objectType: 'Loyalty Point Ledger', objectId: 'LP-9005', before: 'balance: 726', after: 'balance: 660', severity: 'Sensitive' },
  { id: 'LOG-8006', at: '2026-09-12 14:20', user: 'Bianca Costa (Operations)', action: 'Marked attendance', objectType: 'Booking/Session', objectId: 'SES-3002', before: 'attended: null', after: 'attended: true/false (mixed)', severity: 'Info' },
  { id: 'LOG-8007', at: '2026-09-10 10:00', user: 'Lachlan Murphy (Super Admin)', action: 'Deleted customer data (Privacy Act request)', objectType: 'Customer', objectId: 'CUS-2099 (archived)', before: 'status: Active', after: 'status: Deleted', severity: 'Sensitive' },
  { id: 'LOG-8008', at: '2026-09-08 16:40', user: 'Jessica Russo (Admin)', action: 'Created discount code', objectType: 'Discount/Promotion', objectId: 'PROMO-06', before: '—', after: 'status: Draft', severity: 'Info' }
];
