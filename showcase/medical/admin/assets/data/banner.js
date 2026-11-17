/* Entity: Banner (Banner hiển thị storefront)
   Schema: id, name, placement (Home|Catalog|Promotion), linkTo, startDate, endDate, status (Active|Scheduled|Expired), personalizationRule */
const DATA_BANNER = [
  { id: 'BNR-01', name: 'Preg Event Aug 2026 Hero Banner', placement: 'Home', linkTo: '/events/preg-event-aug-2026', startDate: '2026-08-01', endDate: '2026-08-31', status: 'Active', personalizationRule: 'Event attendee (QR referral)' },
  { id: 'BNR-02', name: 'Early Bird Maternity Package 10% Off', placement: 'Catalog', linkTo: '/promo/EARLYBIRD10', startDate: '2026-08-01', endDate: '2026-09-30', status: 'Active', personalizationRule: 'None (all visitors)' },
  { id: 'BNR-03', name: 'FBP Membership Welcome Banner', placement: 'Promotion', linkTo: '/membership/fbp', startDate: '2026-07-01', endDate: '2026-12-31', status: 'Active', personalizationRule: 'Walk-in, not yet a member' },
  { id: 'BNR-04', name: 'Year-end Wellness Screening Teaser', placement: 'Home', linkTo: '/promo/WELLNESS2026', startDate: '2026-11-01', endDate: '2026-12-31', status: 'Scheduled', personalizationRule: 'None (all visitors)' },
  { id: 'BNR-05', name: 'July Prenatal Class Special', placement: 'Catalog', linkTo: '/promo/AUGCLASS', startDate: '2026-07-01', endDate: '2026-08-15', status: 'Expired', personalizationRule: 'Campaign link visitor' }
];
