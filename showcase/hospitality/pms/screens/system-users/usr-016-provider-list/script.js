(function () {
  'use strict';
  var STORAGE_KEY = 'mm_usr_providers';
  var EDITS_KEY = 'mm_usr_providers_edits';

  var PROVIDERS_BASE = [
    { id: 'p1', name: 'Ben Sullivan', company: 'Coral Pool Services', bu: 'Byron Bay Retreats', status: 'active' },
    { id: 'p2', name: 'Winston Sng', company: 'Byron Bloom Gardens', bu: 'Sentosa Collection', status: 'active' },
    { id: 'p3', name: 'Nathan Cooper', company: 'Straits Linen Supply', bu: 'Noosa Estates', status: 'inactive' }
  ];

  var editingId = null;

  function loadProviders() {
    var added = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
    return PROVIDERS_BASE.concat(added).map(function (p) { return edits[p.id] ? Object.assign({}, p, edits[p.id]) : p; });
  }

  function rows(data) {
    document.getElementById('list-tbody').innerHTML = data.map(function (p) {
      return '<tr><td class="cell-strong">' + p.name + '</td><td class="cell-sub">' + p.company + '</td><td>' + p.bu + '</td>' +
        '<td><span class="badge ' + (p.status === 'active' ? 'badge-success' : 'badge-neutral') + '">' + p.status + '</span></td>' +
        '<td class="row-actions"><a class="btn btn-ghost btn-sm" href="../usr-019-view-provider-details/index.html"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></a>' +
        '<button class="btn btn-ghost btn-sm" data-edit="' + p.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button></td></tr>';
    }).join('');
    document.getElementById('result-count').textContent = data.length + ' providers';
  }

  function render() {
    var bu = document.getElementById('bu-filter').value;
    var all = loadProviders();
    rows(all.filter(function (p) { return !bu || p.bu === bu; }));
  }
  render();

  document.getElementById('bu-filter').addEventListener('change', render);

  function openDrawer(provider) {
    editingId = provider ? provider.id : null;
    document.getElementById('provider-drawer-title').textContent = provider ? 'Edit Contractor' : 'Add Contractor';
    document.getElementById('provider-save-btn').textContent = provider ? 'Save Changes' : 'Create Contractor';
    document.getElementById('provider-form').reset();
    if (provider) {
      var parts = provider.name.split(' ');
      document.getElementById('f-first').value = parts[0] || '';
      document.getElementById('f-last').value = parts.slice(1).join(' ');
      document.getElementById('f-provider').value = provider.examplepany;
      document.getElementById('f-bu').value = provider.bu;
    }
    MM.openModal('provider-drawer');
  }

  document.getElementById('add-provider-btn').addEventListener('click', function () { openDrawer(null); });

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    if (!editBtn) return;
    var p = loadProviders().find(function (x) { return x.id === editBtn.dataset.edit; });
    openDrawer(p);
  });

  var form = document.getElementById('provider-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('provider-save-btn'), editingId ? 'Saving...' : 'Creating...', function () {
      var first = document.getElementById('f-first').value.trim();
      var last = document.getElementById('f-last').value.trim();
      var company = document.getElementById('f-provider').value;
      var bu = document.getElementById('f-bu').value;
      if (editingId) {
        var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
        edits[editingId] = { name: (first + ' ' + last).trim(), company: company, bu: bu };
        localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
        MM.showToast('Contractor updated');
      } else {
        var added = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        added.push({ id: MM.uid('prov'), name: (first + ' ' + last).trim(), company: company, bu: bu, status: 'active' });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(added));
        MM.showToast('Contractor created');
      }
      MM.closeModal('provider-drawer');
      render();
    });
  });
})();
