/* ==========================================================================
   Renovation module — shared mock data & helpers, reused across every
   screens/renovation/<code>/script.js. Loaded after assets/js/global.js and
   before each screen's own script.js.
   Extends (never replaces) window.MM.MOCK_PROPERTIES / MOCK_STAFF from the
   shared global.js cast. Whole-dataset localStorage model: the full project
   list (including nested items/receipts/photos/payments) is hydrated once
   from REN.BASE_PROJECTS into localStorage, then every screen reads/writes
   through REN.getProjects()/REN.saveProjects() so edits made on one screen
   (e.g. adding a photo on REN-009) are visible everywhere else in the demo
   session.
   ========================================================================== */

(function () {
  'use strict';

  window.MM = window.MM || {};
  var REN = window.MM.REN = window.MM.REN || {};

  REN.STORAGE_KEY = 'mm_ren_projects';

  var villaById = {};
  (window.MM.MOCK_PROPERTIES || []).forEach(function (p) { villaById[p.id] = p; });

  function villa(id) { return villaById[id] || { id: id, name: id, bu: '' }; }

  /* ---------------------------------------------------------------- */
  /* Base seed data — 5 renovation projects across the status range     */
  /* (Not Started / Under Progress / Completed), so lists/badges/reports */
  /* have real variety instead of all-green rows.                       */
  /* ---------------------------------------------------------------- */

  REN.BASE_PROJECTS = [
    {
      id: 'REN-P-2101',
      villaId: 'PV-101',
      villaName: villa('PV-101').name,
      bu: villa('PV-101').bu,
      title: 'Pool Deck Resurfacing',
      status: 'Under Progress',
      leaderId: 'STF-01',
      leaderName: 'Daniel Tan',
      startDate: '2026-07-01',
      endDate: '2026-08-15',
      actualStartDate: '2026-07-03',
      actualEndDate: null,
      items: [
        { id: 'ITM-1', name: 'Pool deck non-slip tiling', budget: 8000, realAmount: 6200, hasDocument: true },
        { id: 'ITM-2', name: 'Pool pump upgrade', budget: 3500, realAmount: 3500, hasDocument: true },
        { id: 'ITM-3', name: 'Outdoor deck furniture', budget: 2000, realAmount: 0, hasDocument: false }
      ],
      receipts: [
        { id: 'RCT-1', receiptName: 'Villa-Sapphire-Cliff-Renovation-20260710-01.pdf', date: '2026-07-10', totalAmount: 6200, paidBy: 'Daniel Tan', paidType: 'company', paymentMethod: 'Bank Transfer', items: [{ name: 'Pool deck non-slip tiling', amount: 6200 }] },
        { id: 'RCT-2', receiptName: 'Villa-Sapphire-Cliff-Renovation-20260722-02.pdf', date: '2026-07-22', totalAmount: 3500, paidBy: 'Ben Sullivan', paidType: 'staff', paymentMethod: '', items: [{ name: 'Pool pump upgrade', amount: 3500 }] }
      ],
      photos: [
        { id: 'PHT-1', tone: 1, caption: 'Old deck tiles removed', createdBy: 'Ben Sullivan', createdAt: '2026-07-05' },
        { id: 'PHT-2', tone: 2, caption: 'New non-slip tiling, 60% laid', createdBy: 'Ben Sullivan', createdAt: '2026-07-28' }
      ],
      payments: [
        { id: 'PAY-1', date: '2026-07-10', post: 'Villa-Sapphire-Cliff-Renovation-20260710-01.pdf', paidBy: 'Company', paidTo: 'Coral Pool Services', paymentMethod: 'Bank Transfer', credit: 0, debit: 6200 },
        { id: 'PAY-2', date: '2026-07-22', post: 'Villa-Sapphire-Cliff-Renovation-20260722-02.pdf', paidBy: 'Ben Sullivan', paidTo: 'Coral Pool Services', paymentMethod: '', credit: 0, debit: 3500 }
      ]
    },
    {
      id: 'REN-P-2098',
      villaId: 'PV-102',
      villaName: villa('PV-102').name,
      bu: villa('PV-102').bu,
      title: 'Master Bathroom Renovation',
      status: 'Completed',
      leaderId: 'STF-01',
      leaderName: 'Daniel Tan',
      startDate: '2026-05-01',
      endDate: '2026-06-01',
      actualStartDate: '2026-05-01',
      actualEndDate: '2026-06-05',
      items: [
        { id: 'ITM-1', name: 'Marble vanity & countertop', budget: 4200, realAmount: 4350, hasDocument: true },
        { id: 'ITM-2', name: 'Rain shower fitting', budget: 1800, realAmount: 1750, hasDocument: true },
        { id: 'ITM-3', name: 'Waterproofing & retiling', budget: 3600, realAmount: 3600, hasDocument: true }
      ],
      receipts: [
        { id: 'RCT-1', receiptName: 'Villa-Coral-Horizon-Renovation-20260518-01.pdf', date: '2026-05-18', totalAmount: 6100, paidBy: 'Daniel Tan', paidType: 'company', paymentMethod: 'Bank Transfer', items: [{ name: 'Marble vanity & countertop', amount: 4350 }, { name: 'Rain shower fitting', amount: 1750 }] },
        { id: 'RCT-2', receiptName: 'Villa-Coral-Horizon-Renovation-20260602-02.pdf', date: '2026-06-02', totalAmount: 3600, paidBy: 'Daniel Tan', paidType: 'company', paymentMethod: 'Company Card', items: [{ name: 'Waterproofing & retiling', amount: 3600 }] }
      ],
      photos: [
        { id: 'PHT-1', tone: 3, caption: 'Demolition complete', createdBy: 'Daniel Tan', createdAt: '2026-05-04' },
        { id: 'PHT-2', tone: 4, caption: 'New marble vanity installed', createdBy: 'Daniel Tan', createdAt: '2026-05-25' },
        { id: 'PHT-3', tone: 1, caption: 'Finished bathroom, ready for guests', createdBy: 'Daniel Tan', createdAt: '2026-06-05' }
      ],
      payments: [
        { id: 'PAY-1', date: '2026-05-18', post: 'Villa-Coral-Horizon-Renovation-20260518-01.pdf', paidBy: 'Company', paidTo: 'Local Supplier', paymentMethod: 'Bank Transfer', credit: 0, debit: 6100 },
        { id: 'PAY-2', date: '2026-06-02', post: 'Villa-Coral-Horizon-Renovation-20260602-02.pdf', paidBy: 'Company', paidTo: 'Local Supplier', paymentMethod: 'Company Card', credit: 0, debit: 3600 }
      ]
    },
    {
      id: 'REN-P-2115',
      villaId: 'PV-103',
      villaName: villa('PV-103').name,
      bu: villa('PV-103').bu,
      title: 'Kitchen & Guest Wing Upgrade',
      status: 'Not Started',
      leaderId: 'STF-01',
      leaderName: 'Daniel Tan',
      startDate: '2026-09-15',
      endDate: '2026-11-01',
      actualStartDate: null,
      actualEndDate: null,
      items: [
        { id: 'ITM-1', name: 'Kitchen cabinetry replacement', budget: 9500, realAmount: 0, hasDocument: false },
        { id: 'ITM-2', name: 'Guest wing AC units (x3)', budget: 5400, realAmount: 0, hasDocument: false },
        { id: 'ITM-3', name: 'Guest wing flooring', budget: 6200, realAmount: 0, hasDocument: false }
      ],
      receipts: [],
      photos: [],
      payments: []
    },
    {
      id: 'REN-P-2108',
      villaId: 'PV-104',
      villaName: villa('PV-104').name,
      bu: villa('PV-104').bu,
      title: 'Exterior Repainting & Garden Wall',
      status: 'Under Progress',
      leaderId: 'STF-02',
      leaderName: 'Warren Kelly',
      startDate: '2026-08-01',
      endDate: '2026-08-30',
      actualStartDate: '2026-08-04',
      actualEndDate: null,
      items: [
        { id: 'ITM-1', name: 'Exterior repainting', budget: 3200, realAmount: 3900, hasDocument: true },
        { id: 'ITM-2', name: 'Garden boundary wall repair', budget: 2100, realAmount: 1400, hasDocument: true }
      ],
      receipts: [
        { id: 'RCT-1', receiptName: 'Villa-Azure-Ridge-Renovation-20260812-01.pdf', date: '2026-08-12', totalAmount: 3900, paidBy: 'Warren Kelly', paidType: 'staff', paymentMethod: '', items: [{ name: 'Exterior repainting', amount: 3900 }] },
        { id: 'RCT-2', receiptName: 'Villa-Azure-Ridge-Renovation-20260820-02.pdf', date: '2026-08-20', totalAmount: 1400, paidBy: 'Warren Kelly', paidType: 'company', paymentMethod: 'Cash', items: [{ name: 'Garden boundary wall repair', amount: 1400 }] }
      ],
      photos: [
        { id: 'PHT-1', tone: 2, caption: 'Scaffolding up, prep sanding done', createdBy: 'Warren Kelly', createdAt: '2026-08-06' }
      ],
      payments: [
        { id: 'PAY-1', date: '2026-08-12', post: 'Villa-Azure-Ridge-Renovation-20260812-01.pdf', paidBy: 'Warren Kelly', paidTo: 'Contractor', paymentMethod: '', credit: 0, debit: 3900 },
        { id: 'PAY-2', date: '2026-08-20', post: 'Villa-Azure-Ridge-Renovation-20260820-02.pdf', paidBy: 'Company', paidTo: 'Contractor', paymentMethod: 'Cash', credit: 0, debit: 1400 }
      ]
    },
    {
      id: 'REN-P-2050',
      villaId: 'PV-105',
      villaName: villa('PV-105').name,
      bu: villa('PV-105').bu,
      title: 'Roof Waterproofing',
      status: 'Completed',
      leaderId: 'STF-01',
      leaderName: 'Daniel Tan',
      startDate: '2026-04-01',
      endDate: '2026-04-20',
      actualStartDate: '2026-04-01',
      actualEndDate: '2026-04-16',
      items: [
        { id: 'ITM-1', name: 'Roof membrane replacement', budget: 5000, realAmount: 4650, hasDocument: true }
      ],
      receipts: [
        { id: 'RCT-1', receiptName: 'Villa-Marble-Cove-Renovation-20260416-01.pdf', date: '2026-04-16', totalAmount: 4650, paidBy: 'Daniel Tan', paidType: 'company', paymentMethod: 'Bank Transfer', items: [{ name: 'Roof membrane replacement', amount: 4650 }] }
      ],
      photos: [
        { id: 'PHT-1', tone: 4, caption: 'Waterproofing complete, no leaks after test', createdBy: 'Daniel Tan', createdAt: '2026-04-17' }
      ],
      payments: [
        { id: 'PAY-1', date: '2026-04-16', post: 'Villa-Marble-Cove-Renovation-20260416-01.pdf', paidBy: 'Company', paidTo: 'Roofing Contractor', paymentMethod: 'Bank Transfer', credit: 0, debit: 4650 }
      ]
    }
  ];

  /* ---------------------------------------------------------------- */
  /* Whole-dataset localStorage persistence                            */
  /* ---------------------------------------------------------------- */

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  REN.resetProjects = function () {
    localStorage.setItem(REN.STORAGE_KEY, JSON.stringify(REN.BASE_PROJECTS));
  };

  REN.getProjects = function () {
    var raw = localStorage.getItem(REN.STORAGE_KEY);
    if (!raw) { REN.resetProjects(); raw = localStorage.getItem(REN.STORAGE_KEY); }
    try { return JSON.parse(raw); } catch (e) { REN.resetProjects(); return clone(REN.BASE_PROJECTS); }
  };

  REN.saveProjects = function (list) {
    localStorage.setItem(REN.STORAGE_KEY, JSON.stringify(list));
  };

  REN.getProject = function (id) {
    var list = REN.getProjects();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  };

  REN.updateProject = function (id, mutateFn) {
    var list = REN.getProjects();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) { mutateFn(list[i]); break; }
    }
    REN.saveProjects(list);
    return REN.getProject(id);
  };

  REN.addProject = function (project) {
    var list = REN.getProjects();
    list.unshift(project);
    REN.saveProjects(list);
    return project;
  };

  REN.deleteProject = function (id) {
    var list = REN.getProjects().filter(function (p) { return p.id !== id; });
    REN.saveProjects(list);
  };

  /* Villas eligible for a *new* project — any villa in MM.MOCK_PROPERTIES;
     REN-001 warns (rather than blocks) if the chosen villa already has a
     non-Completed project, per the real spec. */
  REN.villaHasOpenProject = function (villaId) {
    var found = null;
    REN.getProjects().forEach(function (p) {
      if (p.villaId === villaId && p.status !== 'Completed') found = p;
    });
    return found;
  };

  /* ---------------------------------------------------------------- */
  /* Formatting helpers                                                */
  /* ---------------------------------------------------------------- */

  REN.money = function (n) {
    if (n === null || n === undefined || isNaN(n)) return '$0';
    return '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  REN.date = function (d) {
    if (!d) return '–';
    var dt = new Date(d + 'T00:00:00');
    return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  REN.itemBudgetTotal = function (project) {
    return project.items.reduce(function (s, it) { return s + (it.budget || 0); }, 0);
  };
  REN.itemRealTotal = function (project) {
    return project.items.reduce(function (s, it) { return s + (it.realAmount || 0); }, 0);
  };

  REN.statusBadge = function (status) {
    var cls = status === 'Completed' ? 'badge-success' : status === 'Under Progress' ? 'badge-warning' : 'badge-neutral';
    return '<span class="badge ' + cls + '">' + status + '</span>';
  };

  REN.uid = function (prefix) { return (prefix || 'REN') + '-' + Math.random().toString(36).slice(2, 8).toUpperCase(); };

  REN.VILLAS = (window.MM.MOCK_PROPERTIES || []).map(function (p) { return { id: p.id, name: p.name, bu: p.bu }; });
  REN.BUSINESS_UNITS = Array.from(new Set(REN.VILLAS.map(function (v) { return v.bu; })));
})();
