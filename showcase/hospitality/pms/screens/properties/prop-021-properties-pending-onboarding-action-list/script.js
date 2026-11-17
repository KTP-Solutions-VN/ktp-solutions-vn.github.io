(function () {
  'use strict';

  var STORAGE_KEY = 'mm_prop_onboarding_actions';
  var DELETED_KEY = 'mm_prop_onboarding_actions_deleted';

  var MOCK_OPEN_PROPERTIES = [
    { id: 'PV-105', name: 'Villa Marble Cove', type: 'Hillside Pool Villa', area: 'Kata', bu: 'Phuket Collection', owner: 'Richard Halstead' },
    { id: 'PV-107', name: 'Villa Golden Palm', type: 'Beachfront Villa', area: 'Chaweng', bu: 'Koh Samui Estates', owner: 'Priya Nair' },
    { id: 'PV-103', name: 'Villa Emerald Bay', type: 'Garden Pool Villa', area: 'Seminyak', bu: 'Bali Retreats', owner: 'Isabelle Moreau' },
    { id: 'PV-201', name: 'Villa Turquoise Reef', type: 'Beachfront Villa', area: 'Kamala', bu: 'Phuket Collection', owner: 'Richard Halstead' },
    { id: 'PV-202', name: 'Villa Palm Residence — Unit 3', type: 'Residence Unit', area: 'Canggu', bu: 'Bali Retreats', owner: 'David Chen' },
    { id: 'PV-203', name: 'Villa Orchid Rise', type: 'Hillside Pool Villa', area: 'Nusa Dua', bu: 'Bali Retreats', owner: 'David Chen' },
    { id: 'PV-204', name: 'Villa Amber Cove', type: 'Garden Pool Villa', area: 'Lamai', bu: 'Koh Samui Estates', owner: 'Priya Nair' }
  ];

  function loadDeleted() {
    try { return JSON.parse(localStorage.getItem(DELETED_KEY)) || []; } catch (e) { return []; }
  }
  function loadExtra() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { return []; }
  }
  function saveExtra(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
  function saveDeleted(list) { localStorage.setItem(DELETED_KEY, JSON.stringify(list)); }

  function loadAll() {
    var deleted = loadDeleted();
    return loadExtra().concat(MOCK_OPEN_PROPERTIES).filter(function (p) { return deleted.indexOf(p.id) === -1; });
  }

  var buFilter = document.getElementById('bu-filter');
  var tbody = document.getElementById('pending-tbody');
  var emptyState = document.getElementById('pending-empty');
  var resultCount = document.getElementById('result-count');

  function render() {
    var bu = buFilter.value;
    var all = loadAll().filter(function (p) { return !bu || p.bu === bu; });

    if (!all.length) {
      tbody.innerHTML = '';
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
      tbody.innerHTML = all.map(function (p) {
        return '<tr>' +
          '<td>' + p.type + '</td>' +
          '<td>' + p.area + '</td>' +
          '<td class="cell-strong">' + p.name + '</td>' +
          '<td>' + p.owner + '</td>' +
          '<td><span class="badge badge-info">Open</span></td>' +
          '<td>' +
            '<div class="action-icons">' +
              '<a class="icon-action" href="../prop-036-property-confirmation-information/index.html?villa=' + encodeURIComponent(p.id) + '" title="Villa Confirmation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M20 6L9 17l-5-5"/></svg></a>' +
              '<a class="icon-action" href="../prop-037-property-communication-information/index.html?villa=' + encodeURIComponent(p.id) + '" title="Villa Communication"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></a>' +
              '<button class="icon-action" data-rules="' + p.id + '" data-name="' + p.name + '" title="Villa Rules"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></button>' +
              '<a class="icon-action" href="../prop-039-property-additional-guest-services/index.html?villa=' + encodeURIComponent(p.id) + '" title="Villa Extra"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></a>' +
              '<button class="icon-action danger" data-delete="' + p.id + '" data-name="' + p.name + '" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg></button>' +
            '</div>' +
          '</td>' +
          '</tr>';
      }).join('');
    }
    resultCount.textContent = all.length + ' properties open for onboarding action';
  }

  buFilter.addEventListener('change', render);

  /* Villa Rules modal (PROP-038) */
  var rulesForm = document.getElementById('rules-form');
  MM.bindFormValidation(rulesForm);
  tbody.addEventListener('click', function (e) {
    var rulesBtn = e.target.closest('[data-rules]');
    if (rulesBtn) {
      document.getElementById('rules-villa-name').textContent = rulesBtn.getAttribute('data-name');
      rulesForm.reset();
      MM.openModal('villa-rules-modal');
      return;
    }
    var delBtn = e.target.closest('[data-delete]');
    if (delBtn) {
      document.getElementById('delete-property-name').textContent = delBtn.getAttribute('data-name');
      document.getElementById('confirm-delete-btn').dataset.id = delBtn.getAttribute('data-delete');
      MM.openModal('delete-modal');
    }
  });

  document.getElementById('rules-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(rulesForm)) return;
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      MM.closeModal('villa-rules-modal');
      MM.showToast('Villa rules saved.');
    });
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    var id = this.dataset.id;
    var deleted = loadDeleted();
    deleted.push(id);
    saveDeleted(deleted);
    MM.closeModal('delete-modal');
    MM.showToast('Property removed from the onboarding action list.', { danger: true });
    render();
  });

  /* Duplicate Property modal */
  var duplicateSelect = document.getElementById('duplicate-source');
  var duplicateForm = document.getElementById('duplicate-form');
  MM.bindFormValidation(duplicateForm);

  function populateDuplicateSource() {
    duplicateSelect.innerHTML = loadAll().map(function (p) {
      return '<option value="' + p.id + '">' + p.name + '</option>';
    }).join('');
  }

  document.getElementById('open-duplicate-btn').addEventListener('click', function () {
    populateDuplicateSource();
    document.getElementById('duplicate-name').value = '';
    MM.openModal('duplicate-modal');
  });

  document.getElementById('duplicate-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(duplicateForm)) return;
    var nameInput = document.getElementById('duplicate-name');
    var existingNames = loadAll().map(function (p) { return p.name.toLowerCase(); });
    if (existingNames.indexOf(nameInput.value.trim().toLowerCase()) !== -1) {
      var group = nameInput.closest('.form-group');
      group.classList.add('has-error');
      group.querySelector('.form-error').textContent = 'A property with this name already exists.';
      return;
    }
    var source = loadAll().filter(function (p) { return p.id === duplicateSelect.value; })[0];
    var btn = this;
    MM.simulateSave(btn, 'Creating...', function () {
      var extra = loadExtra();
      extra.push({
        id: 'PV-' + MM.uid(''), name: nameInput.value.trim(), type: source.type, area: source.area,
        bu: source.bu, owner: source.owner
      });
      saveExtra(extra);
      MM.closeModal('duplicate-modal');
      MM.showToast('Duplicated "' + source.name + '" as "' + nameInput.value.trim() + '".');
      render();
    });
  });

  render();
})();
