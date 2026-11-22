/* ==========================================================================
   Garden/Pool Operations — shared mock data & helpers, reused by every
   screens/garden-pool-operations/opr-0XX.../script.js. Loaded after
   assets/js/global.js. Reuses MM.MOCK_PROPERTIES / MM.MOCK_STAFF for
   consistent property & staff names across the module.
   ========================================================================== */

(function () {
  'use strict';

  window.MM = window.MM || {};
  var OPR = window.MM.OPR = window.MM.OPR || {};

  var GARDEN_STAFF = ['Daniel Tan', 'Warren Kelly', 'Nicole Parker', 'Ben Sullivan'];
  var POOL_STAFF = ['Daniel Tan', 'Warren Kelly', 'Ben Sullivan'];

  /* Unified Garden + Pool task list — the OPR-001 sidebar landing screen
     merges former OPR-002 (Garden Job List) + OPR-003 (Pool Job List). */
  OPR.TASKS = [
    { id: 'GJ-3001', type: 'Garden', property: 'Villa Sapphire Cliff', service: 'Weekly Garden Maintenance', operator: 'Daniel Tan', date: '2026-08-27', start: '08:00', end: '09:15', status: 'Cleaned', gps: 'OK', planned: true },
    { id: 'PJ-2101', type: 'Pool', property: 'Villa Coral Horizon', service: 'Pool Chemical Balance', operator: 'Warren Kelly', date: '2026-08-27', start: '09:00', end: '09:40', status: 'Cleaned', gps: 'OK', planned: true },
    { id: 'GJ-3002', type: 'Garden', property: 'Villa Emerald Bay', service: 'Hedge Trimming', operator: 'Nicole Parker', date: '2026-08-27', start: '10:00', end: null, status: 'In Progress', gps: '—', planned: true },
    { id: 'PJ-2102', type: 'Pool', property: 'Villa Azure Ridge', service: 'Pool Filter Cleaning', operator: 'Ben Sullivan', date: '2026-08-27', start: '11:00', end: '11:35', status: 'Problem', gps: 'OK', planned: false },
    { id: 'GJ-3003', type: 'Garden', property: 'Villa Marble Cove', service: 'Lawn Mowing', operator: 'Daniel Tan', date: '2026-08-26', start: '08:30', end: '09:10', status: 'Stopped', gps: 'NOK', planned: true },
    { id: 'PJ-2103', type: 'Pool', property: 'Villa Lotus Terrace', service: 'Pool Chemical Balance', operator: 'Warren Kelly', date: '2026-08-26', start: '13:00', end: '13:30', status: 'Cleaned', gps: 'OK', planned: true },
    { id: 'GJ-3004', type: 'Garden', property: 'Villa Golden Palm', service: 'Pest Control Spray', operator: null, date: '2026-08-28', start: '08:00', end: null, status: 'Not Started', gps: '—', planned: true },
    { id: 'PJ-2104', type: 'Pool', property: 'Villa Silver Tide', service: 'Pool Deep Clean', operator: 'Ben Sullivan', date: '2026-08-28', start: '09:00', end: null, status: 'Not Started', gps: '—', planned: true }
  ];

  OPR.POOL_JOB_PHOTOS = [
    { no: 1, photo: 'Skimmer basket', description: 'Cleared of leaves' },
    { no: 2, photo: 'Pool deck', description: 'Chairs realigned' }
  ];

  OPR.GARDEN_JOB_PHOTOS = [
    { no: 1, photo: 'Front lawn', description: 'Mowed and edged' },
    { no: 2, photo: 'Hedge line', description: 'Trimmed to spec' }
  ];

  /* Cleaning rounds (housekeeping) — OPR-007/008/009 */
  OPR.CLEANING_ROUNDS = [
    { id: 'CL-5001', property: 'Villa Sapphire Cliff', date: '2026-08-27', status: 'Completed', rating: 4.5 },
    { id: 'CL-5002', property: 'Villa Coral Horizon', date: '2026-08-27', status: 'In Progress', rating: null },
    { id: 'CL-5003', property: 'Villa Emerald Bay', date: '2026-08-26', status: 'Completed', rating: 5.0 },
    { id: 'CL-5004', property: 'Villa Azure Ridge', date: '2026-08-26', status: 'Completed', rating: 3.5 }
  ];

  OPR.CLEANING_POINTS = ['Living Room', 'Master Bedroom', 'Kitchen', 'Bathroom 1', 'Pool Deck', 'Entrance'];

  /* Villa inspections — OPR-010/011/012/013 */
  OPR.INSPECTIONS = [
    { id: 'IN-7001', property: 'Villa Marble Cove', date: '2026-08-25', status: 'Completed' },
    { id: 'IN-7002', property: 'Villa Lotus Terrace', date: '2026-08-26', status: 'Draft' },
    { id: 'IN-7003', property: 'Villa Golden Palm', date: '2026-08-27', status: 'In Progress' }
  ];

  OPR.INSPECTION_ITEMS = ['AC Unit', 'Plumbing', 'Electrical Outlet', 'Furniture Condition', 'Pool Equipment'];
  OPR.INSPECTION_AREAS = ['Living Room', 'Master Bedroom', 'Guest Bedroom', 'Kitchen', 'Pool Area'];

  /* Make-up rounds — OPR-014/015 */
  OPR.MAKEUP_ROUNDS = [
    { id: 'MU-6001', property: 'Villa Silver Tide', date: '2026-08-27', status: 'Completed' },
    { id: 'MU-6002', property: 'Villa Sapphire Cliff', date: '2026-08-26', status: 'Completed' }
  ];
  OPR.MAKEUP_POINTS = ['Fresh Linen', 'Towel Art', 'Welcome Amenities', 'Minibar Restock', 'Final Walkthrough'];

  /* Garden teams — OPR-018, feeds OPR-017 planning board */
  OPR.GARDEN_TEAMS = [
    { id: 'team-1', name: 'Team 1', start: '07:00', end: '15:00', members: ['Daniel Tan', 'Karen Seah'] },
    { id: 'team-2', name: 'Team 2', start: '08:00', end: '16:00', members: ['Warren Kelly'] }
  ];

  OPR.PLANNING_QUEUE = [
    { property: 'Villa Emerald Bay', dueDate: '2026-08-29', available: '08:00 - 17:00', hours: 2 },
    { property: 'Villa Golden Palm', dueDate: '2026-08-30', available: '09:00 - 16:00', hours: 1.5 }
  ];

  /* OPR-020/021/022 Maintenance Ticket List (field-reported, separate from
     the back-office MNT module's Maintenance Log). */
  OPR.MAINTENANCE_TICKETS = [
    { id: 'M000101', bu: 'Sentosa Collection', property: 'Villa Sapphire Cliff', issue: 'AC not cooling — Master Bedroom', priority: 'High', status: 'Open', updated: '2026-08-27' },
    { id: 'M000102', bu: 'Byron Bay Retreats', property: 'Villa Emerald Bay', issue: 'Leaking tap — Guest Bathroom', priority: 'Medium', status: 'In Progress', updated: '2026-08-26' },
    { id: 'M000103', bu: 'Noosa Estates', property: 'Villa Lotus Terrace', issue: 'Pool pump making noise', priority: 'Urgent', status: 'Open', updated: '2026-08-27' },
    { id: 'M000104', bu: 'Sentosa Collection', property: 'Villa Marble Cove', issue: 'WiFi router offline', priority: 'Low', status: 'Resolved', updated: '2026-08-24' },
    { id: 'M000105', bu: 'Byron Bay Retreats', property: 'Villa Azure Ridge', issue: 'Broken sun lounger', priority: 'Low', status: 'Open', updated: '2026-08-25' }
  ];

  /* Category > Subcategory > Problem tree for the Maintenance Ticket form
     (OPR-021/022), each problem carrying a base priority. */
  OPR.MAINT_CATEGORIES = [
    {
      id: 'cat-elec', name: 'Electrical', subcategories: [
        { id: 'sub-ac', name: 'Air Conditioning', problems: [
          { id: 'p1', name: 'Not cooling', priority: 'High' },
          { id: 'p2', name: 'Leaking water', priority: 'Medium' },
          { id: 'p3', name: 'Making noise', priority: 'Low' }
        ] },
        { id: 'sub-light', name: 'Lighting', problems: [
          { id: 'p4', name: 'Bulb not working', priority: 'Low' },
          { id: 'p5', name: 'Flickering', priority: 'Medium' }
        ] }
      ]
    },
    {
      id: 'cat-plumb', name: 'Plumbing', subcategories: [
        { id: 'sub-tap', name: 'Taps & Faucets', problems: [
          { id: 'p6', name: 'Leaking tap', priority: 'Medium' },
          { id: 'p7', name: 'No hot water', priority: 'High' }
        ] },
        { id: 'sub-toilet', name: 'Toilet', problems: [
          { id: 'p8', name: 'Not flushing', priority: 'High' },
          { id: 'p9', name: 'Running continuously', priority: 'Medium' }
        ] }
      ]
    },
    {
      id: 'cat-pool', name: 'Pool Equipment', subcategories: [
        { id: 'sub-pump', name: 'Pump & Filter', problems: [
          { id: 'p10', name: 'Pump not running', priority: 'Urgent' },
          { id: 'p11', name: 'Unusual noise', priority: 'Medium' }
        ] }
      ]
    },
    {
      id: 'cat-it', name: 'IT & Connectivity', subcategories: [
        { id: 'sub-wifi', name: 'WiFi / Network', problems: [
          { id: 'p12', name: 'Router offline', priority: 'Medium' },
          { id: 'p13', name: 'Weak signal', priority: 'Low' }
        ] }
      ]
    }
  ];

  OPR.PRIORITY_BADGE = { Urgent: 'badge-danger', High: 'badge-warning', Medium: 'badge-info', Low: 'badge-neutral' };
  OPR.STATUS_BADGE = {
    'Cleaned': 'badge-success', 'Completed': 'badge-success', 'Resolved': 'badge-success',
    'In Progress': 'badge-info', 'Not Started': 'badge-neutral', 'Draft': 'badge-neutral',
    'Problem': 'badge-danger', 'Stopped': 'badge-danger', 'Open': 'badge-warning'
  };

  OPR.badge = function (status) {
    var cls = OPR.STATUS_BADGE[status] || 'badge-neutral';
    return '<span class="badge ' + cls + '">' + status + '</span>';
  };

  OPR.gpsBadge = function (gps) {
    if (gps === 'OK') return '<span class="badge badge-success">GPS OK</span>';
    if (gps === 'NOK') return '<span class="badge badge-danger">GPS NOK</span>';
    return '<span class="text-muted text-xs">—</span>';
  };

  OPR.staffOptions = function (selected) {
    return MM.MOCK_STAFF.map(function (s) {
      return '<option value="' + s.name + '"' + (s.name === selected ? ' selected' : '') + '>' + s.name + '</option>';
    }).join('');
  };

  OPR.propertyOptions = function (selected) {
    return MM.MOCK_PROPERTIES.map(function (p) {
      return '<option value="' + p.name + '"' + (p.name === selected ? ' selected' : '') + '>' + p.name + '</option>';
    }).join('');
  };
})();
