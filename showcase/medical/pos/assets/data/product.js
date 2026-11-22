/* DATA_PRODUCT — retail + pharmacy item master (mock, mirrors an ERP item-master integration)
Schema:
  id               string   unique id
  sku              string   internal SKU
  barcode          string   scannable barcode (EAN-13 style)
  name             string   product/medication name
  category         string   "Retail - Vitamins" | "Retail - Baby Care" | "Retail - Maternity" | "Retail - Devices" | "OTC" | "Prescription"
  price            number   unit retail price (AUD)
  unit             string   sale unit descriptor
  requiresPrescription  boolean  true = must go through the Rx popup flow before payment
  stockQty         number   on-hand stock at this outlet
  icon             string   icon key used by screen script.js to pick an inline SVG
*/
const DATA_PRODUCT = [
  { id: 'P001', sku: 'MH-VIT-001', barcode: '8991234560017', name: 'Elevit Prenatal Multivitamin', category: 'Retail - Vitamins', price: 42.90, unit: 'box of 30', requiresPrescription: false, stockQty: 86, icon: 'vitamin' },
  { id: 'P002', sku: 'MH-BAB-014', barcode: '8991234560024', name: 'Baby Gentle Wash 200ml', category: 'Retail - Baby Care', price: 18.50, unit: 'bottle', requiresPrescription: false, stockQty: 54, icon: 'bottle' },
  { id: 'P003', sku: 'MH-OTC-022', barcode: '8991234560031', name: 'Paracetamol 500mg Tablets', category: 'OTC', price: 6.90, unit: 'box of 20', requiresPrescription: false, stockQty: 210, icon: 'pill' },
  { id: 'P004', sku: 'MH-RX-101', barcode: '8991234560048', name: 'Amoxicillin 250mg Capsules', category: 'Prescription', price: 15.40, unit: 'box of 21', requiresPrescription: true, stockQty: 120, icon: 'pill' },
  { id: 'P005', sku: 'MH-RX-102', barcode: '8991234560055', name: 'Metformin 500mg Tablets', category: 'Prescription', price: 9.80, unit: 'box of 30', requiresPrescription: true, stockQty: 95, icon: 'pill' },
  { id: 'P006', sku: 'MH-RX-103', barcode: '8991234560062', name: 'Folic Acid 5mg Tablets', category: 'Prescription', price: 5.20, unit: 'box of 30', requiresPrescription: true, stockQty: 140, icon: 'pill' },
  { id: 'P007', sku: 'MH-RET-030', barcode: '8991234560079', name: 'Digital Thermometer', category: 'Retail - Devices', price: 24.90, unit: 'each', requiresPrescription: false, stockQty: 32, icon: 'thermometer' },
  { id: 'P008', sku: 'MH-RET-041', barcode: '8991234560086', name: 'Nursing Pads (60pcs)', category: 'Retail - Maternity', price: 14.20, unit: 'pack', requiresPrescription: false, stockQty: 68, icon: 'box' },
  { id: 'P009', sku: 'MH-RX-104', barcode: '8991234560093', name: 'Co-Amoxiclav 625mg Tablets', category: 'Prescription', price: 22.60, unit: 'box of 14', requiresPrescription: true, stockQty: 8, icon: 'pill' },
  { id: 'P010', sku: 'MH-RET-052', barcode: '8991234560109', name: 'Postnatal Recovery Belt', category: 'Retail - Maternity', price: 39.00, unit: 'each', requiresPrescription: false, stockQty: 21, icon: 'box' },
];
