(function () {
  'use strict';

  var LS_KEY = 'mm_bu_business_units';

  var MOCK_BUSINESS_UNITS = [
    { id: 'bu1', country: 'Singapore', region: 'Sentosa', name: 'Sentosa Collection', short_name: 'SEN', legal_entity: 'Azura Stays Pte. Ltd.', branch: 'Sentosa Branch', phone: '+65 6612 3456', email: 'ops.sentosa@azurastays.example', address: '88 Ocean Drive', city: 'Singapore', postal_code: '098374', currency: 'SGD', ownership: 'Azura Stays', beds24: 'BD24-SEN-991', airbnb: 'Airbnb - Azura Stays Official', created_at: '2021-03-20', status: 'active' },
    { id: 'bu2', country: 'Australia', region: 'Queensland (Noosa)', name: 'Noosa Estates', short_name: 'NSE', legal_entity: 'Azura Stays Pte. Ltd.', branch: 'Noosa Branch', phone: '+61 7 5447 7654', email: 'ops.noosa@azurastays.example', address: '12 Hastings Street', city: 'Noosa Heads', postal_code: '4567', currency: 'AUD', ownership: 'Azura Stays', beds24: '', airbnb: 'Airbnb - Azura Stays Official', created_at: '2021-10-02', status: 'active' },
    { id: 'bu3', country: 'Australia', region: 'Byron Bay', name: 'Byron Bay Retreats', short_name: 'BYR', legal_entity: 'Azura Stays Byron Bay Pty Ltd', branch: 'Byron Bay Branch', phone: '+61 2 6685 5010', email: 'ops.byronbay@azurastays.example', address: '21 Lawson Street', city: 'Byron Bay', postal_code: '2481', currency: 'AUD', ownership: 'Azura Stays', beds24: 'BD24-BYR-114', airbnb: 'Airbnb - Sentosa Partner', created_at: '2022-06-10', status: 'active' },
    { id: 'bu4', country: 'Australia', region: 'Queensland (Gold Coast)', name: 'Gold Coast Escapes', short_name: 'GCE', legal_entity: 'Azura Stays Byron Bay Pty Ltd', branch: 'Byron Bay Branch', phone: '+61 7 5535 4220', email: 'ops.goldcoast@azurastays.example', address: 'Goodwin Terrace', city: 'Burleigh Heads', postal_code: '4220', currency: 'USD', ownership: 'Partner', beds24: '', airbnb: 'Airbnb - Sentosa Partner', created_at: '2023-02-14', status: 'paused' }
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
