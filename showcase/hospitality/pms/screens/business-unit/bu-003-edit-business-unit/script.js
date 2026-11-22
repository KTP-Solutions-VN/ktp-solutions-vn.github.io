(function () {
  'use strict';

  var LS_KEY = 'mm_bu_business_units';

  var MOCK_BUSINESS_UNITS = [
    { id: 'bu1', country: 'Singapore', region: 'Sentosa', name: 'Sentosa Collection', short_name: 'SEN', legal_entity: 'Azura Stays Pte. Ltd.', branch: 'Sentosa Branch', phone: '+65 6612 3456', email: 'ops.sentosa@azurastays.example', address: '88 Ocean Drive', city: 'Singapore', postal_code: '098374', currency: 'SGD', ownership: 'Azura Stays', beds24: 'BD24-SEN-991', airbnb: 'Airbnb - Azura Stays Official', created_at: '2021-03-20', status: 'active' },
    { id: 'bu2', country: 'Australia', region: 'Queensland (Noosa)', name: 'Noosa Estates', short_name: 'NSE', legal_entity: 'Azura Stays Pte. Ltd.', branch: 'Noosa Branch', phone: '+61 7 5447 7654', email: 'ops.noosa@azurastays.example', address: '12 Hastings Street', city: 'Noosa Heads', postal_code: '4567', currency: 'AUD', ownership: 'Azura Stays', beds24: '', airbnb: 'Airbnb - Azura Stays Official', created_at: '2021-10-02', status: 'active' },
    { id: 'bu3', country: 'Australia', region: 'Byron Bay', name: 'Byron Bay Retreats', short_name: 'BYR', legal_entity: 'Azura Stays Byron Bay Pty Ltd', branch: 'Byron Bay Branch', phone: '+61 2 6685 5010', email: 'ops.byronbay@azurastays.example', address: '21 Lawson Street', city: 'Byron Bay', postal_code: '2481', currency: 'AUD', ownership: 'Azura Stays', beds24: 'BD24-BYR-114', airbnb: 'Airbnb - Sentosa Partner', created_at: '2022-06-10', status: 'active' },
    { id: 'bu4', country: 'Australia', region: 'Queensland (Gold Coast)', name: 'Gold Coast Escapes', short_name: 'GCE', legal_entity: 'Azura Stays Byron Bay Pty Ltd', branch: 'Byron Bay Branch', phone: '+61 7 5535 4220', email: 'ops.goldcoast@azurastays.example', address: 'Goodwin Terrace', city: 'Burleigh Heads', postal_code: '4220', currency: 'USD', ownership: 'Partner', beds24: '', airbnb: 'Airbnb - Sentosa Partner', created_at: '2023-02-14', status: 'paused' }
  ];

  var REGIONS = {
    Singapore: ['Sentosa', 'Central Region'],
    Australia: ['Byron Bay', 'Queensland (Gold Coast)', 'Queensland (Noosa)']
  };
  var BRANCHES = {
    'Azura Stays Pte. Ltd.': ['Sentosa Branch', 'Noosa Branch'],
    'Azura Stays Byron Bay Pty Ltd': ['Byron Bay Branch']
  };

  function load() {
    try { var raw = localStorage.getItem(LS_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
    return MOCK_BUSINESS_UNITS.slice();
  }
  function save(data) { localStorage.setItem(LS_KEY, JSON.stringify(data)); }

  var units = load();
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var record = units.filter(function (u) { return u.id === id; })[0] || units[0];

  var countrySel = document.getElementById('f-country');
  var regionSel = document.getElementById('f-region');
  var legalSel = document.getElementById('f-legal-entity');
  var branchSel = document.getElementById('f-branch');

  function populateRegions(country, selected) {
    var list = REGIONS[country] || [];
    regionSel.innerHTML = '<option value="">Select region...</option>' + list.map(function (r) {
      return '<option value="' + r + '"' + (r === selected ? ' selected' : '') + '>' + r + '</option>';
    }).join('');
  }
  function populateBranches(legal, selected) {
    var list = BRANCHES[legal] || [];
    branchSel.innerHTML = (list.length ? '<option value="">Select branch...</option>' : '<option value="">None</option>') + list.map(function (b) {
      return '<option value="' + b + '"' + (b === selected ? ' selected' : '') + '>' + b + '</option>';
    }).join('');
  }

  countrySel.addEventListener('change', function () { populateRegions(countrySel.value, ''); });
  legalSel.addEventListener('change', function () { populateBranches(legalSel.value, ''); });

  function fillForm(rec) {
    document.getElementById('page-title').textContent = 'Edit Operating Unit — ' + rec.name;
    document.getElementById('f-name').value = rec.name;
    document.getElementById('f-short-name').value = rec.short_name;
    document.getElementById('f-ownership').value = rec.ownership || '';
    document.getElementById('f-currency').value = rec.currency || '';
    document.getElementById('f-phone').value = rec.phone || '';
    document.getElementById('f-email').value = rec.email || '';
    document.getElementById('f-address').value = rec.address || '';
    countrySel.value = rec.country || '';
    populateRegions(rec.country, rec.region);
    document.getElementById('f-beds24').value = rec.beds24 || '';
    document.getElementById('f-airbnb').value = rec.airbnb || '';
    legalSel.value = rec.legal_entity || '';
    populateBranches(rec.legal_entity, rec.branch);
  }

  fillForm(record);

  var form = document.getElementById('bu-edit-form');
  MM.bindFormValidation(form);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) {
      var firstError = form.querySelector('.has-error input, .has-error select');
      if (firstError) firstError.focus();
      return;
    }
    var btn = document.getElementById('bu-save-btn');
    MM.simulateSave(btn, 'Saving...', function () {
      units = units.map(function (u) {
        if (u.id !== record.id) return u;
        return Object.assign({}, u, {
          name: document.getElementById('f-name').value.trim(),
          short_name: document.getElementById('f-short-name').value.trim(),
          ownership: document.getElementById('f-ownership').value,
          currency: document.getElementById('f-currency').value,
          phone: document.getElementById('f-phone').value.trim(),
          email: document.getElementById('f-email').value.trim(),
          address: document.getElementById('f-address').value.trim(),
          country: countrySel.value,
          region: regionSel.value,
          beds24: document.getElementById('f-beds24').value.trim(),
          airbnb: document.getElementById('f-airbnb').value,
          legal_entity: legalSel.value,
          branch: branchSel.value
        });
      });
      save(units);
      try { sessionStorage.setItem('mm_bu_flash', 'Business unit "' + document.getElementById('f-name').value.trim() + '" updated successfully.'); } catch (err) {}
      window.location.href = '../bu-001-business-unit-list/index.html';
    });
  });
})();
