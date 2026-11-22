/* ==========================================================================
   Villa Services (VSV) — shared mock data & helpers
   Loaded after assets/js/global.js on every Villa Services screen. Extends
   window.MM with a MM.VSV namespace so electricity/cleaning/garden/pool/
   inspection screens all reference the same villas, staff and rates.
   ========================================================================== */
(function () {
  'use strict';

  window.MM = window.MM || {};
  var VSV = window.MM.VSV = window.MM.VSV || {};

  VSV.BUSINESS_UNITS = ['Sentosa Collection', 'Byron Bay Retreats', 'Noosa Estates'];

  /* Electricity configuration per villa (keyed by MM.MOCK_PROPERTIES id).
     method matches the legacy payment_setting_type values. */
  VSV.ELECTRICITY = {
    'PV-101': { managed: true,  method: 'Collect-kWh',     costPerKwh: 0.34, currency: 'SGD', pricingSet: 'full' },
    'PV-102': { managed: true,  method: 'Collect-Fixed',   fixedAmount: 18,  currency: 'SGD', pricingSet: 'full' },
    'PV-103': { managed: true,  method: 'Collect-Quota',   freeQuota: 50, costAboveQuota: 0.4, currency: 'AUD', pricingSet: 'partial' },
    'PV-104': { managed: false, method: null, currency: 'AUD', pricingSet: 'no' },
    'PV-105': { managed: true,  method: 'Combined-Separate', includedQuotaKwh: 40, costPerKwh: 0.31, currency: 'SGD', pricingSet: 'full' },
    'PV-106': { managed: true,  method: 'Collect-kWh',     costPerKwh: 0.35, currency: 'AUD', pricingSet: 'full' },
    'PV-107': { managed: true,  method: 'Platform-Rental', amount: 26,  currency: 'AUD', pricingSet: 'partial' },
    'PV-108': { managed: true,  method: 'Collect-Fixed',   fixedAmount: 39,  currency: 'AUD', pricingSet: 'full' }
  };

  VSV.METHOD_LABELS = {
    'Collect-Fixed': 'Collect · Fixed daily',
    'Collect-Quota': 'Collect · Free quota',
    'Collect-kWh': 'Collect · Per kWh',
    'Platform-Separate': 'Platform · Separate',
    'Platform-Rental': 'Platform · Rental incl.',
    'Combined-Separate': 'Combined · Separate',
    'Combined-Rental': 'Combined · Rental incl.'
  };

  VSV.CLEANING_STAFF = [
    { id: 'CLN-01', name: 'Karen Seah', bu: 'Sentosa Collection' },
    { id: 'CLN-02', name: 'Michelle Beh', bu: 'Sentosa Collection' },
    { id: 'CLN-03', name: 'Sarah Reid', bu: 'Byron Bay Retreats' },
    { id: 'CLN-04', name: 'Megan Sutton', bu: 'Byron Bay Retreats' },
    { id: 'CLN-05', name: 'Rebecca Clarke', bu: 'Noosa Estates' },
    { id: 'CLN-06', name: 'Olivia Scott', bu: 'Noosa Estates' }
  ];

  VSV.GARDEN_STAFF = [
    { id: 'GDN-01', name: 'Patrick Woo', bu: 'Sentosa Collection' },
    { id: 'GDN-02', name: 'Aaron Boey', bu: 'Sentosa Collection' },
    { id: 'GDN-03', name: 'Kyle Armstrong', bu: 'Byron Bay Retreats' },
    { id: 'GDN-04', name: 'Wade Simmons', bu: 'Byron Bay Retreats' },
    { id: 'GDN-05', name: 'Shane Porter', bu: 'Noosa Estates' }
  ];

  VSV.CONCIERGES = [
    { id: 'STF-01', name: 'Daniel Tan', bu: 'Sentosa Collection' },
    { id: 'STF-02', name: 'Warren Kelly', bu: 'Byron Bay Retreats' },
    { id: 'STF-03', name: 'Nicole Parker', bu: 'Noosa Estates' }
  ];

  VSV.BU_MANAGERS = ['Daniel Tan', 'Warren Kelly', 'Nicole Parker'];

  /* Computes the default electricity bill for a meter delta, per the villa's
     configured method — used by check-out / long-stay meter forms to compare
     against the amount the concierge actually enters. */
  VSV.computeDefaultBill = function (villaId, startMeter, endMeter) {
    var cfg = VSV.ELECTRICITY[villaId];
    if (!cfg || !cfg.managed) return 0;
    var delta = Math.max(0, (Number(endMeter) || 0) - (Number(startMeter) || 0));
    switch (cfg.method) {
      case 'Collect-kWh': return Math.round(delta * cfg.costPerKwh);
      case 'Collect-Fixed': return cfg.fixedAmount;
      case 'Collect-Quota': return Math.round(Math.max(0, delta - cfg.freeQuota) * cfg.costAboveQuota);
      case 'Combined-Separate':
      case 'Combined-Rental': return Math.round(Math.max(0, delta - cfg.includedQuotaKwh) * cfg.costPerKwh);
      case 'Platform-Separate':
      case 'Platform-Rental': return cfg.amount;
      default: return 0;
    }
  };

  VSV.VEHICLES = ['Truck 01 (Sentosa)', 'Truck 02 (Sentosa)', 'Van 01 (Byron Bay)', 'Van 02 (Byron Bay)', 'Scooter 01 (Noosa)'];

  VSV.PAID_BY = ['Cash', 'Credit Card', 'Bank Transfer', 'Online Payment', 'Platform Collected'];

  VSV.POOL_VENDORS = ['Coral Pool Services', 'Byron Blue Pools', 'Noosa Aqua Care'];

  /* -------------------------------------------------------------- */
  /* Helpers                                                          */
  /* -------------------------------------------------------------- */

  VSV.propertyById = function (id) {
    return (window.MM.MOCK_PROPERTIES || []).find(function (p) { return p.id === id; });
  };

  VSV.fmtMoney = function (amount, currency) {
    if (amount === null || amount === undefined || isNaN(amount)) return '—';
    var cur = currency || 'SGD';
    var symbol = cur === 'AUD' ? 'A$' : (cur === 'USD' ? '$' : cur + ' ');
    return symbol + Number(amount).toLocaleString('en-US', { minimumFractionDigits: cur === 'AUD' ? 0 : 0 });
  };

  VSV.fmtDate = function (isoStr) {
    if (!isoStr) return '—';
    var d = new Date(isoStr + 'T00:00:00');
    if (isNaN(d.getTime())) return isoStr;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  VSV.badgeClass = function (status) {
    var map = {
      pending: 'badge-warning', done: 'badge-success', 'done-late': 'badge-warning',
      'not-done': 'badge-danger', blocked: 'badge-danger', collected: 'badge-success',
      cleared: 'badge-success', outstanding: 'badge-warning', ok: 'badge-success',
      nok: 'badge-danger', problem: 'badge-danger', cleaned: 'badge-success',
      confirmed: 'badge-success', rejected: 'badge-danger', sent: 'badge-info',
      approved: 'badge-success', 'in-progress': 'badge-info', reported: 'badge-success',
      'not-started': 'badge-neutral', archived: 'badge-neutral'
    };
    return map[status] || 'badge-neutral';
  };

  VSV.uid = function (prefix) { return window.MM.uid ? window.MM.uid(prefix) : prefix + Math.random().toString(36).slice(2, 8); };

  /* -------------------------------------------------------------- */
  /* Garden — villas currently due for care, reused by VSV-017/018/  */
  /* 019/020 so the same due-list looks identical across screens.    */
  /* -------------------------------------------------------------- */
  VSV.GARDEN_VILLAS_DUE = [
    { id: 'GD-01', villaId: 'PV-101', dueDate: '2026-09-03', available: 'occupied', manHours: 2 },
    { id: 'GD-02', villaId: 'PV-102', dueDate: '2026-09-03', available: 'vacant', manHours: 1.5 },
    { id: 'GD-03', villaId: 'PV-105', dueDate: '2026-09-03', available: 'vacant', manHours: 2.5 },
    { id: 'GD-04', villaId: 'PV-103', dueDate: '2026-09-04', available: 'occupied', manHours: 2 },
    { id: 'GD-05', villaId: 'PV-104', dueDate: '2026-09-04', available: 'occupied', manHours: 1.5 },
    { id: 'GD-06', villaId: 'PV-108', dueDate: '2026-09-03', available: 'occupied', manHours: 3 },
    { id: 'GD-07', villaId: 'PV-106', dueDate: '2026-09-03', available: 'vacant', manHours: 1.5 },
    { id: 'GD-08', villaId: 'PV-107', dueDate: '2026-09-04', available: 'vacant', manHours: 2 }
  ];

  /* Garden visit report history — reused by VSV-017's Reports tab. */
  VSV.GARDEN_REPORTS = [
    { id: 'GJ-501', villaId: 'PV-101', service: 'Lawn mowing & hedge trim', operator: 'Patrick Woo', date: '2026-09-01', start: '08:00', end: '09:30', gps: 'ok', plan: 'Weekly', planned: true, ownerAccess: true },
    { id: 'GJ-502', villaId: 'PV-102', service: 'Pest control spray', operator: 'Aaron Boey', date: '2026-09-01', start: '09:00', end: '10:00', gps: 'ok', plan: 'Monthly', planned: true, ownerAccess: false },
    { id: 'GJ-503', villaId: 'PV-103', service: 'Tropical planting refresh', operator: 'Kyle Armstrong', date: '2026-08-30', start: '13:00', end: '15:00', gps: 'nok', plan: 'One-off', planned: false, ownerAccess: false },
    { id: 'GJ-504', villaId: 'PV-106', service: 'Lawn mowing & hedge trim', operator: 'Shane Porter', date: '2026-08-29', start: '07:30', end: '09:00', gps: 'ok', plan: 'Weekly', planned: true, ownerAccess: true },
    { id: 'GJ-505', villaId: 'PV-108', service: 'Irrigation check', operator: 'Wade Simmons', date: '2026-08-28', start: '10:00', end: '11:00', gps: 'ok', plan: 'Bi-weekly', planned: true, ownerAccess: false },
    { id: 'GJ-506', villaId: 'PV-104', service: 'Palm tree trimming', operator: 'Kyle Armstrong', date: '2026-08-27', start: '08:30', end: '10:30', gps: 'ok', plan: 'Quarterly', planned: false, ownerAccess: true }
  ];

  /* -------------------------------------------------------------- */
  /* Inspection — services checklist + mock report history, reused   */
  /* by VSV-021.                                                      */
  /* -------------------------------------------------------------- */
  VSV.INSPECTION_SERVICES = ['Housekeeping', 'Maintenance', 'Garden', 'Pool', 'Amenities'];

  /* -------------------------------------------------------------- */
  /* Pool — visit log staff pool, reused by VSV-023.                  */
  /* -------------------------------------------------------------- */
  VSV.POOL_STAFF = ['Coral Pool Services — Team 1', 'Coral Pool Services — Team 2', 'Byron Blue Pools — Team 1', 'Noosa Aqua Care — Team 1'];
})();
