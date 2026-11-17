(function () {
  'use strict';

  var LS_KEY = 'mm_bu_business_units';

  var MOCK_BUSINESS_UNITS = [
    { id: 'bu1', country: 'Thailand', region: 'Phuket', name: 'Phuket Collection', short_name: 'PHK', legal_entity: 'Azura Stays Co., Ltd.', branch: 'Phuket Branch', phone: '+66 76 123 456', email: 'ops.phuket@azurastays.example', address: '88 Bangtao Beach Road', city: 'Phuket', postal_code: '83110', currency: 'THB', ownership: 'Azura Stays', beds24: 'BD24-PHK-991', airbnb: 'Airbnb - Azura Stays Official', created_at: '2021-03-20', status: 'active' },
    { id: 'bu2', country: 'Thailand', region: 'Surat Thani (Koh Samui)', name: 'Koh Samui Estates', short_name: 'KSE', legal_entity: 'Azura Stays Co., Ltd.', branch: 'Koh Samui Branch', phone: '+66 77 987 654', email: 'ops.samui@azurastays.example', address: '12 Chaweng Beach Road', city: 'Koh Samui', postal_code: '84320', currency: 'THB', ownership: 'Azura Stays', beds24: '', airbnb: 'Airbnb - Azura Stays Official', created_at: '2021-10-02', status: 'active' },
    { id: 'bu3', country: 'Indonesia', region: 'Bali', name: 'Bali Retreats', short_name: 'BAL', legal_entity: 'Azura Stays Bali PT', branch: 'Bali Branch', phone: '+62 361 555 010', email: 'ops.bali@azurastays.example', address: 'Jl. Pantai Berawa No. 21', city: 'Canggu', postal_code: '80361', currency: 'IDR', ownership: 'Azura Stays', beds24: 'BD24-BAL-114', airbnb: 'Airbnb - Phuket Partner', created_at: '2022-06-10', status: 'active' },
    { id: 'bu4', country: 'Indonesia', region: 'West Nusa Tenggara (Lombok)', name: 'Lombok Escapes', short_name: 'LMB', legal_entity: 'Azura Stays Bali PT', branch: 'Bali Branch', phone: '+62 370 444 220', email: 'ops.lombok@azurastays.example', address: 'Jl. Pantai Selong Belanak', city: 'Lombok', postal_code: '83573', currency: 'USD', ownership: 'Partner', beds24: '', airbnb: 'Airbnb - Phuket Partner', created_at: '2023-02-14', status: 'paused' }
  ];

  function load() {
    try { var raw = localStorage.getItem(LS_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
    return MOCK_BUSINESS_UNITS.slice();
  }

  var units = load();
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var rec = units.filter(function (u) { return u.id === id; })[0] || units[0];

  function val(v) { return v && String(v).trim() ? v : '—'; }

  document.getElementById('page-title').textContent = rec.name;
  document.getElementById('bu-name').textContent = rec.name;
  var statusBadge = document.getElementById('bu-status-badge');
  statusBadge.textContent = rec.status === 'active' ? 'Active' : 'Paused';
  statusBadge.className = 'badge ' + (rec.status === 'active' ? 'badge-success' : 'badge-neutral');
  document.getElementById('edit-link').setAttribute('href', '../bu-003-edit-business-unit/index.html?id=' + rec.id);

  document.getElementById('v-name').textContent = val(rec.name);
  document.getElementById('v-phone').textContent = val(rec.phone);
  document.getElementById('v-email').textContent = val(rec.email);
  document.getElementById('v-address').textContent = val(rec.address);
  document.getElementById('v-city').textContent = val(rec.city);
  document.getElementById('v-country').textContent = val(rec.country);
  document.getElementById('v-region').textContent = val(rec.region);
  document.getElementById('v-legal').textContent = val(rec.legal_entity);
  document.getElementById('v-postal').textContent = val(rec.postal_code);
})();
