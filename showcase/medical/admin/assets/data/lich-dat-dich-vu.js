/* Entity: Booking/Session (Lịch đặt dịch vụ/khóa học/tour)
   Schema: id, productId, productName, date, time, location, capacity, booked, staffInCharge,
   status (Scheduled|Confirmed|Rescheduled|Cancelled|Completed|No-show), attendees[{customerId,name,attended}] */
const DATA_LICH_DAT_DICH_VU = [
  { id: 'SES-3001', productId: 'PRD-002', productName: 'Hospital Tour — Birthing Suite', date: '2026-08-25', time: '10:00', location: 'Meridian Medical Centre, Level 5', capacity: 20, booked: 14, staffInCharge: 'Facilitator: Bianca Costa', status: 'Confirmed',
    attendees: [ { customerId: 'CUS-1002', name: 'Anika Patel', attended: null }, { customerId: 'CUS-1006', name: 'Zara Khoury', attended: null } ] },
  { id: 'SES-3002', productId: 'PRD-004', productName: 'Prenatal Class — Birth & Beyond (4 sessions)', date: '2026-08-16', time: '14:00', location: 'Meridian Parenting Centre', capacity: 24, booked: 24, staffInCharge: 'Instructor: Tessa Morgan', status: 'Completed',
    attendees: [ { customerId: 'CUS-1005', name: 'Chloe Martin', attended: true }, { customerId: 'CUS-1001', name: 'Olivia Bennett', attended: false } ] },
  { id: 'SES-3003', productId: 'PRD-001', productName: 'Prenatal Wellness Package — Trimester 1', date: '2026-08-29', time: '09:30', location: 'Meridian Medical Centre, Level 3', capacity: 10, booked: 6, staffInCharge: 'Dr. Eleni Georgiou', status: 'Scheduled',
    attendees: [ { customerId: 'CUS-1001', name: 'Olivia Bennett', attended: null } ] },
  { id: 'SES-3004', productId: 'PRD-008', productName: 'TCM Postnatal Body Wellness (5 sessions)', date: '2026-08-12', time: '11:00', location: 'Meridian Chinese Medicine Clinic', capacity: 8, booked: 8, staffInCharge: 'Physician Helen Zhou', status: 'Rescheduled',
    attendees: [] },
  { id: 'SES-3005', productId: 'PRD-007', productName: 'Fertility Assessment — Initial Consult', date: '2026-08-19', time: '16:00', location: 'Meridian Fertility Centre', capacity: 12, booked: 5, staffInCharge: 'Dr. James Anderson', status: 'Confirmed',
    attendees: [ { customerId: 'CUS-1001', name: 'Olivia Bennett', attended: null } ] },
  { id: 'SES-3006', productId: 'PRD-002', productName: 'Hospital Tour — Birthing Suite', date: '2026-07-30', time: '10:00', location: 'Meridian Medical Centre, Level 5', capacity: 20, booked: 20, staffInCharge: 'Facilitator: Bianca Costa', status: 'Cancelled',
    attendees: [] }
];
