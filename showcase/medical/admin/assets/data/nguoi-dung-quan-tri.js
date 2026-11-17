/* Entity: Admin User (Người dùng quản trị) — internal staff accounts
   Schema: id, name, email, role (Super Admin|Admin|Tech Support|Finance|Operations|Vendor Partner), department, status (Active|Inactive), lastLogin */
const DATA_NGUOI_DUNG_QUAN_TRI = [
  { id: 'USR-01', name: 'Ryan Tay', email: 'ryan.tay@meridian-health.example', role: 'Super Admin', department: 'IT / System Owner', status: 'Active', lastLogin: '2026-09-17 08:12' },
  { id: 'USR-02', name: 'Vivian Ho', email: 'vivian.ho@meridian-health.example', role: 'Admin', department: 'Marketing', status: 'Active', lastLogin: '2026-09-16 17:40' },
  { id: 'USR-03', name: 'Leon Goh', email: 'leon.goh@meridian-health.example', role: 'Admin', department: 'BU Owner — Meridian Specialists', status: 'Active', lastLogin: '2026-09-17 07:55' },
  { id: 'USR-04', name: 'Imran Hakim', email: 'imran.hakim@meridian-health.example', role: 'Tech Support', department: 'IT', status: 'Active', lastLogin: '2026-09-16 09:20' },
  { id: 'USR-05', name: 'Celine Toh', email: 'celine.toh@meridian-health.example', role: 'Finance', department: 'Finance', status: 'Active', lastLogin: '2026-09-17 08:02' },
  { id: 'USR-06', name: 'Sara Aziz', email: 'sara.aziz@meridian-health.example', role: 'Operations', department: 'Guest Services / PSC', status: 'Active', lastLogin: '2026-09-15 13:15' },
  { id: 'USR-07', name: 'Wendy Goh (Doona SG)', email: 'wendy.goh@vendor-partner.example', role: 'Vendor Partner', department: 'External — Fulfillment Partner', status: 'Active', lastLogin: '2026-09-12 10:30' },
  { id: 'USR-08', name: 'Adrian Neo', email: 'adrian.neo@meridian-health.example', role: 'Operations', department: 'Guest Services / PSC', status: 'Inactive', lastLogin: '2026-05-02 11:00' }
];
