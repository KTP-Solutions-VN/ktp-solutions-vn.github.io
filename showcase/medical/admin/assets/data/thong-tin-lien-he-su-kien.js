/* Entity: Event Lead (Thông tin khách để lại tại sự kiện)
   Schema: id, name, phone, email, source (Kiosk|QR Code), boothCampaign, status (Captured|Contacted|Converted|Expired),
   capturedAt, convertedOrderId, convertedCustomerId, interestedProducts[] */
const DATA_THONG_TIN_LIEN_HE_SU_KIEN = [
  { id: 'LEAD-501', name: 'Yasmin Saleh', phone: '+61 481 230 011', email: 'yasmin.saleh@gmail.com', source: 'Kiosk', boothCampaign: 'Preg Event Aug 2026 — Meridian Nutri Booth', status: 'Converted', capturedAt: '2026-08-16 11:00', convertedOrderId: 'ORD-20265', convertedCustomerId: 'CUS-1005', interestedProducts: ['PRD-003', 'PRD-001'] },
  { id: 'LEAD-502', name: 'Georgia Clarke', phone: '+61 481 230 012', email: 'georgia.clarke@gmail.com', source: 'QR Code', boothCampaign: 'Preg Event Aug 2026 — Maternity Package Booth', status: 'Contacted', capturedAt: '2026-08-16 11:20', convertedOrderId: null, convertedCustomerId: null, interestedProducts: ['PRD-001'] },
  { id: 'LEAD-503', name: 'Karim Hamdan', phone: '+61 481 230 013', email: null, source: 'Kiosk', boothCampaign: 'Preg Event Aug 2026 — Fertility Centre Booth', status: 'Captured', capturedAt: '2026-08-17 14:05', convertedOrderId: null, convertedCustomerId: null, interestedProducts: ['PRD-007'] },
  { id: 'LEAD-504', name: 'Linh Tran', phone: '+61 481 230 014', email: 'linh.tran@gmail.com', source: 'QR Code', boothCampaign: 'Preg Event Jul 2026 — TCM Wellness Booth', status: 'Expired', capturedAt: '2026-07-19 15:30', convertedOrderId: null, convertedCustomerId: null, interestedProducts: ['PRD-008'] },
  { id: 'LEAD-505', name: 'Madison Scott', phone: '+61 481 230 015', email: 'madison.scott@gmail.com', source: 'Kiosk', boothCampaign: 'Preg Event Aug 2026 — Birthing Suite Booth', status: 'Converted', capturedAt: '2026-08-14 10:40', convertedOrderId: 'ORD-20264', convertedCustomerId: 'CUS-1004', interestedProducts: ['PRD-005'] }
];
