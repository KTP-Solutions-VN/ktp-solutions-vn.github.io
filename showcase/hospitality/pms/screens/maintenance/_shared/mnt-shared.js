/* ==========================================================================
   Maintenance — shared mock data & helpers, reused by every
   screens/maintenance/mnt-0XX.../script.js. Loaded after assets/js/global.js.
   Reuses MM.MOCK_PROPERTIES / MM.MOCK_STAFF for consistent names.
   ========================================================================== */

(function () {
  'use strict';

  window.MM = window.MM || {};
  var MNT = window.MM.MNT = window.MM.MNT || {};

  MNT.PRIORITIES = [
    { id: 'pr1', name: 'Urgent', responseTime: 4, color: '#F04438', createdAt: '2024-01-02' },
    { id: 'pr2', name: 'High', responseTime: 24, color: '#F2A93C', createdAt: '2024-01-02' },
    { id: 'pr3', name: 'Medium', responseTime: 72, color: '#D4A85A', createdAt: '2024-01-02' },
    { id: 'pr4', name: 'Low', responseTime: 168, color: '#8A94A6', createdAt: '2024-01-02' }
  ];

  MNT.CATEGORIES = [
    { id: 'cat1', name: 'Electrical', priorityId: 'pr2', createdAt: '2024-01-03' },
    { id: 'cat2', name: 'Plumbing', priorityId: 'pr2', createdAt: '2024-01-03' },
    { id: 'cat3', name: 'Pool Equipment', priorityId: 'pr1', createdAt: '2024-01-03' },
    { id: 'cat4', name: 'Furniture & Fittings', priorityId: 'pr3', createdAt: '2024-01-03' },
    { id: 'cat5', name: 'IT & Connectivity', priorityId: 'pr4', createdAt: '2024-01-03' }
  ];

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  /* ---------------------------------------------------------------- */
  /* Whole-dataset localStorage persistence — mirrors the Renovation    */
  /* module's REN.getX()/updateX() pattern so edits made on one         */
  /* Maintenance screen (e.g. accepting a task on MNT-003) are visible  */
  /* immediately on every other screen in the same demo session.        */
  /* ---------------------------------------------------------------- */

  MNT.LOGS_KEY = 'mm_mnt_logs';
  MNT.resetLogs = function () { localStorage.setItem(MNT.LOGS_KEY, JSON.stringify(MNT.LOGS)); };
  MNT.getLogs = function () {
    var raw = localStorage.getItem(MNT.LOGS_KEY);
    if (!raw) { MNT.resetLogs(); raw = localStorage.getItem(MNT.LOGS_KEY); }
    try { return JSON.parse(raw); } catch (e) { MNT.resetLogs(); return clone(MNT.LOGS); }
  };
  MNT.saveLogs = function (list) { localStorage.setItem(MNT.LOGS_KEY, JSON.stringify(list)); };
  MNT.getLog = function (id) {
    var list = MNT.getLogs();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  };
  MNT.updateLog = function (id, mutateFn) {
    var list = MNT.getLogs();
    for (var i = 0; i < list.length; i++) { if (list[i].id === id) { mutateFn(list[i]); break; } }
    MNT.saveLogs(list);
    return MNT.getLog(id);
  };
  MNT.addLog = function (log) {
    var list = MNT.getLogs();
    list.unshift(log);
    MNT.saveLogs(list);
    return log;
  };

  MNT.HISTORY_KEY = 'mm_mnt_log_history';
  MNT.getHistoryMap = function () {
    var raw = localStorage.getItem(MNT.HISTORY_KEY);
    if (!raw) { localStorage.setItem(MNT.HISTORY_KEY, JSON.stringify(MNT.LOG_HISTORY)); raw = localStorage.getItem(MNT.HISTORY_KEY); }
    try { return JSON.parse(raw); } catch (e) { return clone(MNT.LOG_HISTORY); }
  };
  MNT.getHistory = function (id) { var map = MNT.getHistoryMap(); return map[id] || []; };
  MNT.addHistory = function (id, entry) {
    var map = MNT.getHistoryMap();
    map[id] = map[id] || [];
    map[id].push(entry);
    localStorage.setItem(MNT.HISTORY_KEY, JSON.stringify(map));
  };

  MNT.COSTS_KEY = 'mm_mnt_log_costs';
  MNT.getCostsMap = function () {
    var raw = localStorage.getItem(MNT.COSTS_KEY);
    if (!raw) { localStorage.setItem(MNT.COSTS_KEY, JSON.stringify(MNT.LOG_COSTS)); raw = localStorage.getItem(MNT.COSTS_KEY); }
    try { return JSON.parse(raw); } catch (e) { return clone(MNT.LOG_COSTS); }
  };
  MNT.getCosts = function (id) { var map = MNT.getCostsMap(); return map[id] || []; };
  MNT.saveCosts = function (id, list) {
    var map = MNT.getCostsMap();
    map[id] = list;
    localStorage.setItem(MNT.COSTS_KEY, JSON.stringify(map));
  };

  MNT.CAT_KEY = 'mm_mnt_categories';
  MNT.getCategories = function () {
    var raw = localStorage.getItem(MNT.CAT_KEY);
    if (!raw) { localStorage.setItem(MNT.CAT_KEY, JSON.stringify(MNT.CATEGORIES)); raw = localStorage.getItem(MNT.CAT_KEY); }
    try { return JSON.parse(raw); } catch (e) { return clone(MNT.CATEGORIES); }
  };
  MNT.saveCategories = function (list) { localStorage.setItem(MNT.CAT_KEY, JSON.stringify(list)); };

  MNT.PRI_KEY = 'mm_mnt_priorities';
  MNT.getPriorities = function () {
    var raw = localStorage.getItem(MNT.PRI_KEY);
    if (!raw) { localStorage.setItem(MNT.PRI_KEY, JSON.stringify(MNT.PRIORITIES)); raw = localStorage.getItem(MNT.PRI_KEY); }
    try { return JSON.parse(raw); } catch (e) { return clone(MNT.PRIORITIES); }
  };
  MNT.savePriorities = function (list) { localStorage.setItem(MNT.PRI_KEY, JSON.stringify(list)); };

  MNT.CLEAN_KEY = 'mm_mnt_cleaning_services';
  MNT.getCleaningServices = function () {
    var raw = localStorage.getItem(MNT.CLEAN_KEY);
    if (!raw) { localStorage.setItem(MNT.CLEAN_KEY, JSON.stringify(MNT.CLEANING_SERVICES)); raw = localStorage.getItem(MNT.CLEAN_KEY); }
    try { return JSON.parse(raw); } catch (e) { return clone(MNT.CLEANING_SERVICES); }
  };
  MNT.saveCleaningServices = function (list) { localStorage.setItem(MNT.CLEAN_KEY, JSON.stringify(list)); };
  MNT.addCleaningService = function (svc) {
    var list = MNT.getCleaningServices();
    list.unshift(svc);
    MNT.saveCleaningServices(list);
    return svc;
  };

  MNT.MATRIX_KEY = 'mm_mnt_matrix';
  MNT.getMatrix = function () {
    var raw = localStorage.getItem(MNT.MATRIX_KEY);
    if (!raw) { localStorage.setItem(MNT.MATRIX_KEY, JSON.stringify(MNT.MATRIX)); raw = localStorage.getItem(MNT.MATRIX_KEY); }
    try { return JSON.parse(raw); } catch (e) { return clone(MNT.MATRIX); }
  };
  MNT.saveMatrix = function (list) { localStorage.setItem(MNT.MATRIX_KEY, JSON.stringify(list)); };

  MNT.INSR_KEY = 'mm_mnt_inspection';
  MNT.getInspectionRules = function () {
    var raw = localStorage.getItem(MNT.INSR_KEY);
    if (!raw) { localStorage.setItem(MNT.INSR_KEY, JSON.stringify(MNT.INSPECTION_RULES)); raw = localStorage.getItem(MNT.INSR_KEY); }
    try { return JSON.parse(raw); } catch (e) { return clone(MNT.INSPECTION_RULES); }
  };
  MNT.saveInspectionRules = function (list) { localStorage.setItem(MNT.INSR_KEY, JSON.stringify(list)); };

  function prName(id) { var p = MNT.getPriorities().find(function (x) { return x.id === id; }); return p ? p.name : id; }
  MNT.priorityName = prName;

  /* Maintenance Log / Ticket list — the MNT-001 sidebar entry ("Maintenance
     Tickets"), reused by the processing lifecycle screens (002-006). */
  MNT.LOGS = [
    { id: 'MT-9001', property: 'Villa Sapphire Cliff', category: 'cat1', description: 'AC unit not cooling in master bedroom', priority: 'pr2', status: 'Pending', assignee: null, openBy: 'James Whitfield (Guest)', openDate: '2026-08-26', dueDate: '2026-08-27' },
    { id: 'MT-9002', property: 'Villa Coral Horizon', category: 'cat2', description: 'Leaking tap in guest bathroom', priority: 'pr2', status: 'Open', assignee: 'Ben Sullivan', openBy: 'Karen Seah (Housekeeping)', openDate: '2026-08-25', dueDate: '2026-08-26' },
    { id: 'MT-9003', property: 'Villa Emerald Bay', category: 'cat3', description: 'Pool pump making loud grinding noise', priority: 'pr1', status: 'Open', assignee: 'Ben Sullivan', openBy: 'Daniel Tan (Concierge)', openDate: '2026-08-27', dueDate: '2026-08-27' },
    { id: 'MT-9004', property: 'Villa Marble Cove', category: 'cat5', description: 'WiFi router offline in living area', priority: 'pr4', status: 'Closed', assignee: 'Warren Kelly', openBy: 'Nicole Parker (Concierge)', openDate: '2026-08-20', dueDate: '2026-08-27', closeBy: 'Warren Kelly', closeDate: '2026-08-21' },
    { id: 'MT-9005', property: 'Villa Golden Palm', category: 'cat4', description: 'Broken sun lounger on pool deck', priority: 'pr4', status: 'Rejected', assignee: null, openBy: 'Nicole Parker (Concierge)', openDate: '2026-08-18', dueDate: '2026-08-25' },
    { id: 'MT-9006', property: 'Villa Azure Ridge', category: 'cat1', description: 'Flickering lights in dining room', priority: 'pr3', status: 'Pending', assignee: null, openBy: 'Sophia Rossi (Guest)', openDate: '2026-08-27', dueDate: '2026-08-30' },
    { id: 'MT-9007', property: 'Villa Lotus Terrace', category: 'cat2', description: 'Toilet not flushing in master bath', priority: 'pr2', status: 'Open', assignee: 'Ben Sullivan', openBy: 'Priya Nair (Owner)', openDate: '2026-08-24', dueDate: '2026-08-25' }
  ];

  MNT.LOG_HISTORY = {
    'MT-9004': [
      { by: 'Warren Kelly', comment: 'Accepted task, checking router.', status: 'Open', date: '2026-08-20 10:15' },
      { by: 'Warren Kelly', comment: 'Router reset, WiFi restored and tested.', status: 'Closed', date: '2026-08-21 09:00' }
    ]
  };

  MNT.LOG_COSTS = {
    'MT-9004': [
      { type: 'reimbursement_material', material: 'Replacement router', cost: 1200 },
      { type: 'labour', material: 'Technician callout (1h)', cost: 500 }
    ]
  };

  /* GardenService-style catalogs — MNT-009/010/011/013/014/015, all share
     name + image + business units + status. */
  MNT.BUSINESS_UNITS = ['Sentosa Collection', 'Byron Bay Retreats', 'Noosa Estates'];

  MNT.GARDEN_SERVICES = [
    { id: 'gs1', name: 'Weekly Lawn Mowing', businessUnits: ['Sentosa Collection', 'Byron Bay Retreats'], status: 'Active', createdBy: 'Daniel T.', createdAt: '2024-01-05' },
    { id: 'gs2', name: 'Hedge Trimming', businessUnits: ['Sentosa Collection'], status: 'Active', createdBy: 'Daniel T.', createdAt: '2024-01-05' },
    { id: 'gs3', name: 'Pest Control Spray', businessUnits: ['Byron Bay Retreats', 'Noosa Estates'], status: 'Inactive', createdBy: 'Warren K.', createdAt: '2024-01-06' }
  ];

  MNT.POOL_SERVICES = [
    { id: 'pls1', name: 'Pool Chemical Balance', businessUnits: ['Sentosa Collection', 'Noosa Estates'], status: 'Active', createdBy: 'Daniel T.', createdAt: '2024-01-07' },
    { id: 'pls2', name: 'Pool Filter Cleaning', businessUnits: ['Byron Bay Retreats'], status: 'Active', createdBy: 'Warren K.', createdAt: '2024-01-07' }
  ];

  MNT.POOL_REPAIR = [
    { id: 'pr01', name: 'Pool Pump Repair', businessUnits: ['Sentosa Collection'], status: 'Active', createdBy: 'Daniel T.', createdAt: '2024-01-08' },
    { id: 'pr02', name: 'Tile Resealing', businessUnits: ['Byron Bay Retreats', 'Noosa Estates'], status: 'Active', createdBy: 'Nicole P.', createdAt: '2024-01-08' }
  ];

  MNT.RENOVATION_SERVICES = [
    { id: 'rv1', name: 'Full Bathroom Renovation', businessUnits: ['Sentosa Collection'], status: 'Active', createdBy: 'Daniel T.', createdAt: '2024-01-09' },
    { id: 'rv2', name: 'Exterior Repainting', businessUnits: ['Byron Bay Retreats'], status: 'Active', createdBy: 'Warren K.', createdAt: '2024-01-09' }
  ];

  MNT.BACK_OFFICE_SERVICES = [
    { id: 'bo1', name: 'Guest Welcome Pack Assembly', status: 'Active', createdBy: 'Daniel T.', createdAt: '2024-01-10', businessUnits: MNT.BUSINESS_UNITS.slice() },
    { id: 'bo2', name: 'Linen Inventory Count', status: 'Active', createdBy: 'Daniel T.', createdAt: '2024-01-10', businessUnits: MNT.BUSINESS_UNITS.slice() }
  ];

  MNT.CLEANING_SERVICES = [
    { id: 'cs1', name: 'Standard Turnover Clean', businessUnits: ['Sentosa Collection', 'Byron Bay Retreats'], status: 'Active', createdBy: 'Karen S.', createdAt: '2024-01-11',
      standards: [{ legend: 'No dust on surfaces', icon: null }, { legend: 'Fresh linen on all beds', icon: null }, { legend: 'Bathrooms sanitized', icon: null }] },
    { id: 'cs2', name: 'Deep Clean (Quarterly)', businessUnits: ['Noosa Estates'], status: 'Active', createdBy: 'Karen S.', createdAt: '2024-01-11',
      standards: [{ legend: 'Windows cleaned inside/outside', icon: null }] },
    { id: 'cs3', name: 'Post-Renovation Clean', businessUnits: ['Sentosa Collection'], status: 'Inactive', createdBy: 'Karen S.', createdAt: '2024-01-12', standards: [] }
  ];

  /* Maintenance Service Matrix — Category > Subcategory > Issue (MNT-012) */
  MNT.MATRIX = [
    { id: 'mcat1', name: 'Electrical', status: 'Active', subcategories: [
      { id: 'msub1', name: 'Air Conditioning', status: 'Active', issues: [
        { id: 'iss1', name: 'Not cooling', priorityId: 'pr2', status: 'Active' },
        { id: 'iss2', name: 'Leaking water', priorityId: 'pr3', status: 'Active' }
      ] },
      { id: 'msub2', name: 'Lighting', status: 'Active', issues: [
        { id: 'iss3', name: 'Bulb not working', priorityId: 'pr4', status: 'Active' }
      ] }
    ] },
    { id: 'mcat2', name: 'Plumbing', status: 'Active', subcategories: [
      { id: 'msub3', name: 'Taps & Faucets', status: 'Active', issues: [
        { id: 'iss4', name: 'Leaking tap', priorityId: 'pr3', status: 'Active' },
        { id: 'iss5', name: 'No hot water', priorityId: 'pr2', status: 'Active' }
      ] }
    ] },
    { id: 'mcat3', name: 'Pool Equipment', status: 'Active', subcategories: [
      { id: 'msub4', name: 'Pump & Filter', status: 'Active', issues: [
        { id: 'iss6', name: 'Pump not running', priorityId: 'pr1', status: 'Active' }
      ] }
    ] }
  ];

  /* Inspection Time Rules — per business unit maturity days (MNT-016) */
  MNT.INSPECTION_RULES = [
    { id: 'insr1', businessUnit: 'Sentosa Collection', properties: 'Villa Sapphire Cliff, Villa Coral Horizon, Villa Marble Cove', newDays: 2, seenDays: 5, okDays: 10, createdBy: 'Daniel T.', updatedAt: '2024-02-01' },
    { id: 'insr2', businessUnit: 'Byron Bay Retreats', properties: 'Villa Emerald Bay, Villa Azure Ridge, Villa Silver Tide', newDays: 3, seenDays: 7, okDays: 14, createdBy: 'Warren K.', updatedAt: '2024-02-02' }
  ];

  MNT.statusBadge = function (status) {
    var map = { Active: 'badge-success', Inactive: 'badge-neutral', Open: 'badge-warning', Pending: 'badge-info', Closed: 'badge-success', Rejected: 'badge-danger' };
    return '<span class="badge ' + (map[status] || 'badge-neutral') + '">' + status + '</span>';
  };

  MNT.priorityBadge = function (priorityId) {
    var p = MNT.getPriorities().find(function (x) { return x.id === priorityId; });
    if (!p) return '<span class="badge badge-neutral">—</span>';
    var map = { Urgent: 'badge-danger', High: 'badge-warning', Medium: 'badge-info', Low: 'badge-neutral' };
    return '<span class="badge ' + (map[p.name] || 'badge-neutral') + '">' + p.name + '</span>';
  };

  MNT.categoryName = function (id) {
    var c = MNT.getCategories().find(function (x) { return x.id === id; });
    return c ? c.name : id;
  };

  MNT.money = function (n) {
    if (n === null || n === undefined || isNaN(n)) return '$0';
    return '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  MNT.date = function (d) {
    if (!d) return '–';
    var dt = new Date(d + 'T00:00:00');
    if (isNaN(dt.getTime())) return d;
    return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  MNT.buChecks = function (checkedList, namePrefix) {
    checkedList = checkedList || [];
    return MNT.BUSINESS_UNITS.map(function (bu) {
      var checked = checkedList.indexOf(bu) > -1 ? ' checked' : '';
      return '<label style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500;"><input type="checkbox" value="' + bu + '" class="' + namePrefix + '-bu-check"' + checked + '> ' + bu + '</label>';
    }).join('');
  };

  /* Generic service-catalog CRUD: name + business units + status, with a
     single shared Add/Edit modal (covers the -P1/-P2 popup pairs). */
  MNT.wireServiceCatalog = function (cfg) {
    // cfg: { storageKey, baseData, entityLabel, entityTitle, tbodyId, allBu (bool, no BU picker) }
    var editingId = null;
    function loadAll() {
      var stored = JSON.parse(localStorage.getItem(cfg.storageKey) || '[]');
      var hidden = JSON.parse(localStorage.getItem(cfg.storageKey + '_hidden') || '[]');
      return cfg.baseData.filter(function (d) { return hidden.indexOf(d.id) === -1; }).concat(stored);
    }
    function render() {
      var data = loadAll();
      var searchInput = document.getElementById('search-input');
      var q = searchInput ? searchInput.value.trim().toLowerCase() : '';
      if (q) data = data.filter(function (d) { return d.name.toLowerCase().indexOf(q) > -1; });
      document.getElementById(cfg.tbodyId).innerHTML = data.map(function (item, idx) {
        return '<tr><td>' + (idx + 1) + '</td>' +
          '<td class="cell-sub">' + (item.businessUnits || []).join(', ') + '</td>' +
          '<td class="cell-strong">' + item.name + '</td>' +
          '<td>' + MNT.statusBadge(item.status) + '</td>' +
          '<td class="cell-sub">' + (item.createdBy || '—') + '<div class="text-xs text-muted">' + (item.createdAt || '') + '</div></td>' +
          '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
          '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
      }).join('');
      var empty = document.getElementById('list-empty');
      if (empty) empty.hidden = !!data.length;
      var countEl = document.getElementById('result-count');
      if (countEl) countEl.textContent = data.length + ' ' + cfg.entityLabel + (data.length === 1 ? '' : 's');
    }
    render();
    var searchInputEl = document.getElementById('search-input');
    if (searchInputEl) searchInputEl.addEventListener('input', render);

    document.getElementById('add-btn').addEventListener('click', function () {
      editingId = null;
      document.getElementById('modal-title').textContent = 'Add ' + cfg.entityTitle;
      document.getElementById('item-form').reset();
      if (!cfg.allBu) document.querySelectorAll('.svc-bu-check').forEach(function (c) { c.checked = false; });
      MM.openModal('item-modal');
    });

    document.getElementById(cfg.tbodyId).addEventListener('click', function (e) {
      var editBtn = e.target.closest('[data-edit]'), delBtn = e.target.closest('[data-delete]');
      var data = loadAll();
      if (editBtn) {
        var item = data.find(function (d) { return d.id === editBtn.dataset.edit; });
        if (!item) return;
        editingId = item.id;
        document.getElementById('modal-title').textContent = 'Edit ' + cfg.entityTitle;
        document.getElementById('f-name').value = item.name;
        document.getElementById('f-status').value = item.status;
        if (!cfg.allBu) document.querySelectorAll('.svc-bu-check').forEach(function (c) { c.checked = (item.businessUnits || []).indexOf(c.value) > -1; });
        MM.openModal('item-modal');
      }
      if (delBtn) {
        var target = data.find(function (d) { return d.id === delBtn.dataset.delete; });
        if (!target) return;
        editingId = target.id;
        document.getElementById('del-name').textContent = target.name;
        MM.openModal('delete-modal');
      }
    });

    document.getElementById('save-btn').addEventListener('click', function () {
      var form = document.getElementById('item-form');
      if (!MM.validateForm(form)) return;
      var bus = cfg.allBu ? MNT.BUSINESS_UNITS.slice() : Array.from(document.querySelectorAll('.svc-bu-check:checked')).map(function (c) { return c.value; });
      if (!cfg.allBu && !bus.length) { document.getElementById('bu-error').textContent = 'Select at least 1 business unit.'; return; }
      if (!cfg.allBu) document.getElementById('bu-error').textContent = '';
      MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
        var stored = JSON.parse(localStorage.getItem(cfg.storageKey) || '[]');
        var record = {
          id: editingId || MM.uid(cfg.storageKey),
          name: document.getElementById('f-name').value.trim(),
          status: document.getElementById('f-status').value,
          businessUnits: bus,
          createdBy: 'Daniel T.',
          createdAt: new Date().toISOString().slice(0, 10)
        };
        if (editingId) {
          var idx = stored.findIndex(function (d) { return d.id === editingId; });
          if (idx > -1) stored[idx] = Object.assign({}, stored[idx], record); else stored.push(record);
        } else { stored.push(record); }
        localStorage.setItem(cfg.storageKey, JSON.stringify(stored));
        MM.closeModal('item-modal');
        MM.showToast(editingId ? cfg.entityTitle + ' updated' : cfg.entityTitle + ' added');
        render();
      });
    });

    document.getElementById('confirm-delete-btn').addEventListener('click', function () {
      var stored = JSON.parse(localStorage.getItem(cfg.storageKey) || '[]').filter(function (d) { return d.id !== editingId; });
      localStorage.setItem(cfg.storageKey, JSON.stringify(stored));
      var hidden = JSON.parse(localStorage.getItem(cfg.storageKey + '_hidden') || '[]');
      if (cfg.baseData.some(function (d) { return d.id === editingId; })) { hidden.push(editingId); localStorage.setItem(cfg.storageKey + '_hidden', JSON.stringify(hidden)); }
      MM.closeModal('delete-modal');
      MM.showToast(cfg.entityTitle + ' deleted', { danger: true });
      render();
    });

    return { loadAll: loadAll, render: render };
  };
})();
