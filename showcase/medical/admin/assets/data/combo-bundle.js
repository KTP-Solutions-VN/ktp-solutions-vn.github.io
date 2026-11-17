/* Entity: Combo/Bundle Product (Sản phẩm combo)
   Schema: id, name, components[{productId,name,qty}], comboPrice, sumOfComponents, status (Draft|Published|Unpublished), thumbnail */
const DATA_COMBO_BUNDLE = [
  { id: 'CMB-01', name: 'Complete Maternity Journey Bundle', components: [ { productId: 'PRD-001', name: 'Prenatal Wellness Package — Trimester 1', qty: 1 }, { productId: 'PRD-004', name: 'Prenatal Class — Birth & Beyond', qty: 1 }, { productId: 'PRD-006', name: 'FBP Membership', qty: 1 } ], comboPrice: 1050, sumOfComponents: 1240, status: 'Published', thumbnail: '🎁' },
  { id: 'CMB-02', name: 'Nutri + Wellness Recovery Bundle', components: [ { productId: 'PRD-003', name: 'Meridian Nutri — Confinement Meal Plan', qty: 1 }, { productId: 'PRD-008', name: 'TCM Postnatal Body Wellness', qty: 1 } ], comboPrice: 3450, sumOfComponents: 3579, status: 'Published', thumbnail: '🎁' },
  { id: 'CMB-03', name: 'Hospital Tour + Birthing Suite Preview', components: [ { productId: 'PRD-002', name: 'Hospital Tour — Birthing Suite', qty: 1 }, { productId: 'PRD-005', name: 'Birthing Suite — Deluxe Room Booking', qty: 1 } ], comboPrice: 550, sumOfComponents: 620, status: 'Draft', thumbnail: '🎁' }
];
