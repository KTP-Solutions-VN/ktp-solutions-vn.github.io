/* Investment Fund + Inventory - shared mock data, reused across FUND and INV screens' script.js */
(function () {
  'use strict';
  window.MM = window.MM || {};
  var FUND = window.MM.FUND = window.MM.FUND || {};

  FUND.INVESTORS = [
    { id: 'iv1', name: 'Richard Halstead', email: 'r.halstead@example.com', totalInvested: 250000, balance: 268400, interestRate: 6.5, status: 'active' },
    { id: 'iv2', name: 'Isabelle Moreau', email: 'i.moreau@example.com', totalInvested: 120000, balance: 124800, interestRate: 5.8, status: 'active' },
    { id: 'iv3', name: 'David Chen', email: 'd.chen@example.com', totalInvested: 400000, balance: 431200, interestRate: 7.0, status: 'active' },
    { id: 'iv4', name: 'Priya Nair', email: 'p.nair@example.com', totalInvested: 80000, balance: 76500, interestRate: 5.0, status: 'suspended' }
  ];

  FUND.PROJECTS = [
    { id: 'fp1', name: 'Villa Sapphire Cliff — Renovation Fund', target: 300000, raised: 300000, status: 'fully-funded', investors: 3 },
    { id: 'fp2', name: 'Ocean Drive Beach Cluster — Expansion', target: 500000, raised: 340000, status: 'open', investors: 2 },
    { id: 'fp3', name: 'Noosa Estates — New Acquisition', target: 750000, raised: 120000, status: 'open', investors: 1 },
    { id: 'fp4', name: 'Villa Marble Cove — Pool Upgrade', target: 90000, raised: 90000, status: 'closed', investors: 2 }
  ];

  FUND.TRANSACTIONS = [
    { id: 'tx1', investor: 'iv1', type: 'invest', amount: 100000, date: '2026-01-12' },
    { id: 'tx2', investor: 'iv1', type: 'invest', amount: 150000, date: '2026-03-04' },
    { id: 'tx3', investor: 'iv1', type: 'payout', amount: -18400, date: '2026-06-30' },
    { id: 'tx4', investor: 'iv2', type: 'invest', amount: 120000, date: '2026-02-18' },
    { id: 'tx5', investor: 'iv2', type: 'capitalize', amount: 4800, date: '2026-06-30' }
  ];

  var INV = window.MM.INV = window.MM.INV || {};
  INV.ITEMS = [
    { id: 'it1', sku: 'LNN-001', name: 'Bath Towel Set (Queen)', category: 'Linen', qty: 240, unit: 'set', reorderLevel: 50, status: 'ok' },
    { id: 'it2', sku: 'LNN-002', name: 'Bed Sheet Set (King)', category: 'Linen', qty: 32, unit: 'set', reorderLevel: 40, status: 'low' },
    { id: 'it3', sku: 'AMN-001', name: 'Welcome Amenity Kit', category: 'Amenities', qty: 180, unit: 'kit', reorderLevel: 60, status: 'ok' },
    { id: 'it4', sku: 'CLN-004', name: 'Pool Chlorine Tablets (5kg)', category: 'Pool & Garden', qty: 6, unit: 'bag', reorderLevel: 10, status: 'low' },
    { id: 'it5', sku: 'MNT-010', name: 'Air-Con Filter (Universal)', category: 'Maintenance', qty: 0, unit: 'pc', reorderLevel: 15, status: 'out' }
  ];

  INV.REQUESTS_RECEIPT = [
    { id: 'rr1', item: 'Bed Sheet Set (King)', qty: 60, requestedBy: 'Karen Seah', property: 'Villa Sapphire Cliff', status: 'pending', date: '2026-08-24' },
    { id: 'rr2', item: 'Welcome Amenity Kit', qty: 40, requestedBy: 'Nicole Parker', property: 'Villa Lotus Terrace', status: 'approved', date: '2026-08-20' }
  ];

  INV.REQUESTS_DISCARD = [
    { id: 'rd1', item: 'Air-Con Filter (Universal)', qty: 12, reason: 'Damaged in storage', requestedBy: 'Ben Sullivan', status: 'pending', date: '2026-08-22' }
  ];

  INV.LOG = [
    { id: 'lg1', item: 'Bed Sheet Set (King)', action: 'Stock added', qty: '+60', by: 'Karen Seah', date: '2026-08-25 09:12' },
    { id: 'lg2', item: 'Pool Chlorine Tablets (5kg)', action: 'Stock deducted', qty: '-4', by: 'Ben Sullivan', date: '2026-08-24 14:03' },
    { id: 'lg3', item: 'Welcome Amenity Kit', action: 'Receipt approved', qty: '+40', by: 'Daniel Tan', date: '2026-08-20 11:40' }
  ];
})();
