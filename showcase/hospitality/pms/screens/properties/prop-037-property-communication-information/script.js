(function () {
  'use strict';

  var STORAGE_KEY = 'mm_prop_communication';

  function readJSON(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; }
  }
  function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  var SEED = {
    'PV-105': {
      owner: [{ title: 'Owner', name: 'Richard Halstead', email: 'r.halstead@example.com', phone: '+44 7700 900123' }],
      concierge: [{ title: 'Lead Concierge', name: 'Somchai Anuwat', email: 'somchai.a@azurastays.example', phone: '+66 81 234 5678' }],
      requirement: 'Owner prefers WhatsApp for same-day requests; email for anything requiring a paper trail.',
      bankAccount: 'Bangkok Bank — Acct 123-4-56789-0 — Villa Marble Cove Co., Ltd.'
    }
  };

  var propertySelect = document.getElementById('property-select');
  var villaTitle = document.getElementById('villa-title');
  var ownerContacts = document.getElementById('owner-contacts');
  var conciergeContacts = document.getElementById('concierge-contacts');
  var requirementField = document.getElementById('requirement');
  var bankAccountField = document.getElementById('bank-account');
  var saveStatus = document.getElementById('save-status');

  function populateProperties() {
    var props = MM.MOCK_PROPERTIES;
    propertySelect.innerHTML = props.map(function (p) {
      return '<option value="' + p.id + '">' + p.name + ' — ' + p.id + '</option>';
    }).join('');
    var params = new URLSearchParams(window.location.search);
    var requested = params.get('villa');
    propertySelect.value = (requested && props.some(function (p) { return p.id === requested; })) ? requested : 'PV-105';
  }

  function contactRowHtml(kind, index, contact) {
    contact = contact || { title: '', name: '', email: '', phone: '' };
    return '<div class="contact-row" data-kind="' + kind + '" data-index="' + index + '">' +
      '<div class="form-group"><label>Title</label><input type="text" class="c-title" value="' + (contact.title || '') + '" placeholder="e.g. Owner"></div>' +
      '<div class="form-group"><label>Name</label><input type="text" class="c-name" value="' + (contact.name || '') + '" placeholder="Full name"></div>' +
      '<div class="form-group"><label>Email</label><input type="email" class="c-email" value="' + (contact.email || '') + '" placeholder="name@example.com"></div>' +
      '<div class="form-group"><label>Phone</label><input type="text" class="c-phone" value="' + (contact.phone || '') + '" placeholder="+xx ..."></div>' +
      '<button type="button" class="remove-contact" title="Remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
      '</div>';
  }

  var state = { owner: [], concierge: [] };

  function renderContacts() {
    ownerContacts.innerHTML = state.owner.length
      ? state.owner.map(function (c, i) { return contactRowHtml('owner', i, c); }).join('')
      : '<p class="text-sm text-muted">No Owner Chat contacts yet — click "Add Contact".</p>';
    conciergeContacts.innerHTML = state.concierge.length
      ? state.concierge.map(function (c, i) { return contactRowHtml('concierge', i, c); }).join('')
      : '<p class="text-sm text-muted">No Concierge Chat contacts yet — click "Add Contact".</p>';
  }

  function loadPropertyContent() {
    var store = readJSON(STORAGE_KEY, SEED);
    var villaId = propertySelect.value;
    var prop = MM.MOCK_PROPERTIES.filter(function (p) { return p.id === villaId; })[0];
    villaTitle.textContent = prop ? prop.name : villaId;
    document.querySelector('.card__header-sub').textContent = 'Communication contacts — ' + villaId;

    var record = store[villaId] || { owner: [], concierge: [], requirement: '', bankAccount: '' };
    state.owner = (record.owner || []).slice();
    state.concierge = (record.concierge || []).slice();
    requirementField.value = record.requirement || '';
    bankAccountField.value = record.bankAccount || '';
    renderContacts();
    saveStatus.textContent = (record.owner && record.owner.length) || (record.concierge && record.concierge.length)
      ? 'Last saved for this property.' : 'No communication info saved yet for this property.';
  }

  propertySelect.addEventListener('change', loadPropertyContent);

  document.getElementById('add-owner-contact').addEventListener('click', function () {
    state.owner.push({ title: '', name: '', email: '', phone: '' });
    renderContacts();
  });
  document.getElementById('add-concierge-contact').addEventListener('click', function () {
    state.concierge.push({ title: '', name: '', email: '', phone: '' });
    renderContacts();
  });

  document.getElementById('communication-form').addEventListener('click', function (e) {
    var removeBtn = e.target.closest('.remove-contact');
    if (!removeBtn) return;
    var row = removeBtn.closest('.contact-row');
    var kind = row.getAttribute('data-kind');
    var index = parseInt(row.getAttribute('data-index'), 10);
    state[kind].splice(index, 1);
    renderContacts();
  });

  function collectContacts(container, kind) {
    var rows = container.querySelectorAll('.contact-row');
    var list = [];
    rows.forEach(function (row) {
      list.push({
        title: row.querySelector('.c-title').value.trim(),
        name: row.querySelector('.c-name').value.trim(),
        email: row.querySelector('.c-email').value.trim(),
        phone: row.querySelector('.c-phone').value.trim()
      });
    });
    return list;
  }

  document.getElementById('save-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var store = readJSON(STORAGE_KEY, SEED);
      var villaId = propertySelect.value;
      store[villaId] = {
        owner: collectContacts(ownerContacts, 'owner'),
        concierge: collectContacts(conciergeContacts, 'concierge'),
        requirement: requirementField.value.trim(),
        bankAccount: bankAccountField.value.trim()
      };
      saveJSON(STORAGE_KEY, store);
      saveStatus.textContent = 'Saved just now.';
      MM.showToast('Communication info saved for ' + villaTitle.textContent + '.');
    });
  });

  populateProperties();
  loadPropertyContent();
})();
