/* Entity: Product/Service (Sản phẩm/Dịch vụ)
   Schema: id, name, type (Physical Product|Service|Booking Service), category, bu (business unit/brand),
   status (Draft|Published|Scheduled Unpublish|Unpublished), variants[{id,name,sku,stock,price}],
   listPrice, salePrice (Special Price — may be null if no discount), currency, location, doctor,
   leadTimeDays, bookingWindowDays, blackoutDates[], publishedAt, thumbnail(emoji placeholder) */
const DATA_SAN_PHAM_DICH_VU = [
  {
    id: 'PRD-001', name: 'Prenatal Wellness Package — Trimester 1', type: 'Service', category: 'Maternity Package',
    bu: 'Meridian Specialists', status: 'Published',
    variants: [
      { id: 'V1', name: 'Standard', sku: 'PRD-001-STD', stock: 42, price: 880 },
      { id: 'V2', name: 'Premium (+ ultrasound 4D)', sku: 'PRD-001-PRM', stock: 18, price: 1280 }
    ],
    listPrice: 880, salePrice: 780, currency: 'AUD', location: 'Meridian Medical Centre, Level 3',
    doctor: 'Dr. Eleni Georgiou', leadTimeDays: 2, bookingWindowDays: 60, blackoutDates: ['2026-12-25'],
    publishedAt: '2026-06-01', thumbnail: '🤰'
  },
  {
    id: 'PRD-002', name: 'Hospital Tour — Birthing Suite', type: 'Booking Service', category: 'Facility Tour',
    bu: 'Meridian Specialists', status: 'Published',
    variants: [ { id: 'V1', name: 'Group Tour (up to 6 pax)', sku: 'PRD-002-GRP', stock: 120, price: 0 } ],
    listPrice: 0, salePrice: null, currency: 'AUD', location: 'Meridian Medical Centre, Level 5',
    doctor: null, leadTimeDays: 1, bookingWindowDays: 30, blackoutDates: [],
    publishedAt: '2026-05-15', thumbnail: '🏥'
  },
  {
    id: 'PRD-003', name: 'Meridian Nutri — Confinement Meal Plan (28 Days)', type: 'Physical Product', category: 'Confinement Meals',
    bu: 'Meridian Nutri', status: 'Published',
    variants: [
      { id: 'V1', name: 'Classic', sku: 'PRD-003-CLS', stock: 65, price: 3280 },
      { id: 'V2', name: 'Deluxe (with herbal tonics)', sku: 'PRD-003-DLX', stock: 30, price: 3980 }
    ],
    listPrice: 3280, salePrice: 2980, currency: 'AUD', location: 'Delivery — Sydney Metro',
    doctor: null, leadTimeDays: 5, bookingWindowDays: 0, blackoutDates: [],
    publishedAt: '2026-04-20', thumbnail: '🍲'
  },
  {
    id: 'PRD-004', name: 'Prenatal Class — Birth & Beyond (4 sessions)', type: 'Booking Service', category: 'Parenting Class',
    bu: 'Meridian Parenting Centre', status: 'Published',
    variants: [ { id: 'V1', name: 'Weekday Batch', sku: 'PRD-004-WD', stock: 24, price: 420 }, { id: 'V2', name: 'Weekend Batch', sku: 'PRD-004-WE', stock: 16, price: 460 } ],
    listPrice: 460, salePrice: 420, currency: 'AUD', location: 'Meridian Parenting Centre',
    doctor: null, leadTimeDays: 3, bookingWindowDays: 45, blackoutDates: ['2026-12-24','2026-12-25'],
    publishedAt: '2026-06-10', thumbnail: '🎓'
  },
  {
    id: 'PRD-005', name: 'Birthing Suite — Deluxe Room Booking', type: 'Booking Service', category: 'Room Booking',
    bu: 'Meridian Specialists', status: 'Published',
    variants: [ { id: 'V1', name: 'Deluxe Single', sku: 'PRD-005-DLX', stock: 8, price: 620 }, { id: 'V2', name: 'Suite (VIP)', sku: 'PRD-005-VIP', stock: 3, price: 1180 } ],
    listPrice: 1180, salePrice: null, currency: 'AUD', location: 'Meridian Medical Centre, Level 6',
    doctor: null, leadTimeDays: 1, bookingWindowDays: 270, blackoutDates: [],
    publishedAt: '2026-03-01', thumbnail: '🛏️'
  },
  {
    id: 'PRD-006', name: 'FBP Membership — First Baby Programme', type: 'Service', category: 'Membership',
    bu: 'Meridian Specialists', status: 'Published',
    variants: [ { id: 'V1', name: 'Standard', sku: 'PRD-006-STD', stock: 999, price: 0 } ],
    listPrice: 0, salePrice: null, currency: 'AUD', location: 'Online / Onsite registration',
    doctor: null, leadTimeDays: 0, bookingWindowDays: 0, blackoutDates: [],
    publishedAt: '2026-01-10', thumbnail: '💳'
  },
  {
    id: 'PRD-007', name: 'Fertility Assessment — Initial Consult', type: 'Booking Service', category: 'Fertility Consult',
    bu: 'Meridian Fertility Centre', status: 'Published',
    variants: [ { id: 'V1', name: 'Single Consult', sku: 'PRD-007-STD', stock: 55, price: 250 } ],
    listPrice: 250, salePrice: null, currency: 'AUD', location: 'Meridian Fertility Centre',
    doctor: 'Dr. James Anderson', leadTimeDays: 2, bookingWindowDays: 30, blackoutDates: [],
    publishedAt: '2026-02-18', thumbnail: '🧬'
  },
  {
    id: 'PRD-008', name: 'TCM Postnatal Body Wellness (5 sessions)', type: 'Booking Service', category: 'TCM Wellness',
    bu: 'Meridian Chinese Medicine', status: 'Scheduled Unpublish',
    variants: [ { id: 'V1', name: 'Standard', sku: 'PRD-008-STD', stock: 12, price: 680 } ],
    listPrice: 680, salePrice: 599, currency: 'AUD', location: 'Meridian Chinese Medicine Clinic',
    doctor: 'Physician Helen Zhou', leadTimeDays: 3, bookingWindowDays: 60, blackoutDates: [],
    publishedAt: '2026-05-05', thumbnail: '🌿'
  },
  {
    id: 'PRD-009', name: 'Paediatric Dental Check-up — First Visit', type: 'Booking Service', category: 'Dental',
    bu: 'Meridian Dental Centre', status: 'Draft',
    variants: [ { id: 'V1', name: 'Standard', sku: 'PRD-009-STD', stock: 40, price: 88 } ],
    listPrice: 88, salePrice: null, currency: 'AUD', location: 'Meridian Dental Centre',
    doctor: 'Dr. Meera Iyer', leadTimeDays: 1, bookingWindowDays: 30, blackoutDates: [],
    publishedAt: null, thumbnail: '🦷'
  },
  {
    id: 'PRD-010', name: "Women's Wellness Screening Package", type: 'Service', category: 'Health Screening',
    bu: "Meridian Women's Clinic", status: 'Unpublished',
    variants: [ { id: 'V1', name: 'Basic', sku: 'PRD-010-BSC', stock: 0, price: 450 }, { id: 'V2', name: 'Comprehensive', sku: 'PRD-010-CMP', stock: 0, price: 780 } ],
    listPrice: 780, salePrice: 680, currency: 'AUD', location: "Meridian Women's Clinic",
    doctor: 'Dr. Kate Sullivan', leadTimeDays: 2, bookingWindowDays: 45, blackoutDates: [],
    publishedAt: '2025-11-01', thumbnail: '🩺'
  }
];
