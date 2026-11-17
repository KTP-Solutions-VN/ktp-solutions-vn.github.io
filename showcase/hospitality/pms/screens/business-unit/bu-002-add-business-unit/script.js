(function () {
  'use strict';

  var LS_KEY = 'mm_bu_business_units';

  var MOCK_BUSINESS_UNITS = [
    { id: 'bu1', country: 'Thailand', region: 'Phuket', name: 'Phuket Collection', short_name: 'PHK', legal_entity: 'Azura Stays Co., Ltd.', branch: 'Phuket Branch', phone: '+66 76 123 456', email: 'ops.phuket@azurastays.example', address: '88 Bangtao Beach Road', city: 'Phuket', postal_code: '83110', currency: 'THB', ownership: 'Azura Stays', beds24: 'BD24-PHK-991', airbnb: 'Airbnb - Azura Stays Official', created_at: '2021-03-20', status: 'active' },
    { id: 'bu2', country: 'Thailand', region: 'Surat Thani (Koh Samui)', name: 'Koh Samui Estates', short_name: 'KSE', legal_entity: 'Azura Stays Co., Ltd.', branch: 'Koh Samui Branch', phone: '+66 77 987 654', email: 'ops.samui@azurastays.example', address: '12 Chaweng Beach Road', city: 'Koh Samui', postal_code: '84320', currency: 'THB', ownership: 'Azura Stays', beds24: '', airbnb: 'Airbnb - Azura Stays Official', created_at: '2021-10-02', status: 'active' },
    { id: 'bu3', country: 'Indonesia', region: 'Bali', name: 'Bali Retreats', short_name: 'BAL', legal_entity: 'Azura Stays Bali PT', branch: 'Bali Branch', phone: '+62 361 555 010', email: 'ops.bali@azurastays.example', address: 'Jl. Pantai Berawa No. 21', city: 'Canggu', postal_code: '80361', currency: 'IDR', ownership: 'Azura Stays', beds24: 'BD24-BAL-114', airbnb: 'Airbnb - Phuket Partner', created_at: '2022-06-10', status: 'active' },
    { id: 'bu4', country: 'Indonesia', region: 'West Nusa Tenggara (Lombok)', name: 'Lombok Escapes', short_name: 'LMB', legal_entity: 'Azura Stays Bali PT', branch: 'Bali Branch', phone: '+62 370 444 220', email: 'ops.lombok@azurastays.example', address: 'Jl. Pantai Selong Belanak', city: 'Lombok', postal_code: '83573', currency: 'USD', ownership: 'Partner', beds24: '', airbnb: 'Airbnb - Phuket Partner', created_at: '2023-02-14', status: 'paused' }
  ];

  var REGIONS = {
    Thailand: ['Phuket', 'Surat Thani (Koh Samui)', 'Bangkok'],
    Indonesia: ['Bali', 'West Nusa Tenggara (Lombok)']
  };
  var BRANCHES = {
    'Azura Stays Co., Ltd.': ['Phuket Branch', 'Koh Samui Branch'],
    'Azura Stays Bali PT': ['Bali Branch']
  };

  function load() {
    try { var raw = localStorage.getItem(LS_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
    return MOCK_BUSINESS_UNITS.slice();
  }
  function save(data) { localStorage.setItem(LS_KEY, JSON.stringify(data)); }

  var countrySel = document.getElementById('f-country');
  var regionSel = document.getElementById('f-region');
  var legalSel = document.getElementById('f-legal-entity');
  var branchSel = document.getElementById('f-branch');

  countrySel.addEventListener('change', function () {
    var list = REGIONS[countrySel.value] || [];
    regionSel.disabled = list.length === 0;
    regionSel.innerHTML = list.length
      ? '<option value="">Select region...</option>' + list.map(function (r) { return '<option value="' + r + '">' + r + '</option>'; }).join('')
      : '<option value="">Select country first...</option>';
  });

  legalSel.addEventListener('change', function () {
    var list = BRANCHES[legalSel.value] || [];
    branchSel.disabled = list.length === 0;
    branchSel.innerHTML = list.length
      ? '<option value="">Select branch...</option>' + list.map(function (b) { return '<option value="' + b + '">' + b + '</option>'; }).join('')
      : '<option value="">Select legal entity first...</option>';
  });

  var form = document.getElementById('bu-add-form');
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
      var units = load();
      units.push({
        id: MM.uid('bu'),
        country: countrySel.value,
        region: regionSel.value || '',
        name: document.getElementById('f-name').value.trim(),
        short_name: document.getElementById('f-short-name').value.trim(),
        legal_entity: legalSel.value || '—',
        branch: branchSel.value || '',
        phone: document.getElementById('f-phone').value.trim(),
        email: document.getElementById('f-email').value.trim(),
        address: document.getElementById('f-address').value.trim(),
        city: '',
        postal_code: '',
        currency: document.getElementById('f-currency').value,
        ownership: document.getElementById('f-ownership').value,
        beds24: document.getElementById('f-beds24').value.trim(),
        airbnb: document.getElementById('f-airbnb').value,
        created_at: new Date().toISOString().slice(0, 10),
        status: 'active'
      });
      save(units);
      try { sessionStorage.setItem('mm_bu_flash', 'Business unit "' + document.getElementById('f-name').value.trim() + '" created successfully.'); } catch (err) {}
      window.location.href = '../bu-001-business-unit-list/index.html';
    });
  });
})();
