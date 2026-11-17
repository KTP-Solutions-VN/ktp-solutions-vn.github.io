(function () {
  'use strict';

  var STORAGE_KEY = 'mm_prop_onboarding';

  var MOCK_ONBOARDING = [
    { id: 'OB-1001', property: 'Villa Sapphire Cliff', bu: 'Phuket Collection', status: 'completed', createdAt: '2026-05-12', createdBy: 'Somchai Anuwat', updatedAt: '2026-05-20', updatedBy: 'Priya Nair' },
    { id: 'OB-1002', property: 'Villa Coral Horizon', bu: 'Phuket Collection', status: 'completed', createdAt: '2026-05-14', createdBy: 'Somchai Anuwat', updatedAt: '2026-05-22', updatedBy: 'Priya Nair' },
    { id: 'OB-1003', property: 'Villa Marble Cove', bu: 'Phuket Collection', status: 'in_progress', createdAt: '2026-07-02', createdBy: 'Kanya Srisawat', updatedAt: '2026-08-19', updatedBy: 'Kanya Srisawat' },
    { id: 'OB-1004', property: 'Villa Golden Palm', bu: 'Koh Samui Estates', status: 'pending', createdAt: '2026-08-10', createdBy: 'Nok Pattaya', updatedAt: '2026-08-10', updatedBy: 'Nok Pattaya' },
    { id: 'OB-1005', property: 'Villa Lotus Terrace', bu: 'Koh Samui Estates', status: 'completed', createdAt: '2026-04-01', createdBy: 'Nok Pattaya', updatedAt: '2026-04-09', updatedBy: 'Priya Nair' },
    { id: 'OB-1006', property: 'Villa Emerald Bay', bu: 'Bali Retreats', status: 'completed', createdAt: '2026-03-15', createdBy: 'Wayan Kertha', updatedAt: '2026-03-25', updatedBy: 'David Chen' },
    { id: 'OB-1007', property: 'Villa Azure Ridge', bu: 'Bali Retreats', status: 'completed', createdAt: '2026-02-11', createdBy: 'Wayan Kertha', updatedAt: '2026-02-19', updatedBy: 'David Chen' },
    { id: 'OB-1008', property: 'Villa Palm Residence — Unit 3', bu: 'Bali Retreats', status: 'aborted', createdAt: '2026-06-01', createdBy: 'Wayan Kertha', updatedAt: '2026-06-18', updatedBy: 'Wayan Kertha' },
    { id: 'OB-1009', property: 'Villa Silver Tide', bu: 'Bali Retreats', status: 'completed', createdAt: '2026-01-08', createdBy: 'Wayan Kertha', updatedAt: '2026-01-16', updatedBy: 'David Chen' },
    { id: 'OB-1010', property: 'Villa Turquoise Reef', bu: 'Phuket Collection', status: 'pending', createdAt: '2026-08-22', createdBy: 'Somchai Anuwat', updatedAt: '2026-08-22', updatedBy: 'Somchai Anuwat' }
  ];

  function loadAll() {
    var extra = [];
    try { extra = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { extra = []; }
    return extra.concat(MOCK_ONBOARDING);
  }

  var statusLabel = { pending: 'Pending', in_progress: 'In Progress', completed: 'Completed', aborted: 'Aborted' };
  var statusBadge = { pending: 'badge-warning', in_progress: 'badge-info', completed: 'badge-success', aborted: 'badge-danger' };

  var searchInput = document.getElementById('search-input');
  var buFilter = document.getElementById('bu-filter');
  var statusFilter = document.getElementById('status-filter');
  var tbody = document.getElementById('onboarding-tbody');
  var emptyState = document.getElementById('onboarding-empty');
  var resultCount = document.getElementById('result-count');

  function actionButtons(rec) {
    var btns = [];
    if (rec.status === 'pending' || rec.status === 'in_progress' || rec.status === 'completed') {
      btns.push('<a class="btn btn-ghost btn-sm" href="../prop-063-view-property-onboarding-details/index.html?id=' + rec.id + '" title="View">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>View</a>');
    }
    if (rec.status === 'pending' || rec.status === 'in_progress') {
      btns.push('<a class="btn btn-outline btn-sm" href="../prop-062-property-onboarding-revalidation-request/index.html?id=' + rec.id + '" title="Edit">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>Edit</a>');
    }
    if (rec.status === 'aborted') {
      btns.push('<a class="btn btn-accent btn-sm" href="../prop-062-property-onboarding-revalidation-request/index.html?id=' + rec.id + '" title="Review">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>Review</a>');
    }
    return '<div class="action-btns">' + btns.join('') + '</div>';
  }

  function render() {
    var all = loadAll();
    var q = searchInput.value.trim().toLowerCase();
    var bu = buFilter.value;
    var status = statusFilter.value;

    var filtered = all.filter(function (rec) {
      if (q && rec.property.toLowerCase().indexOf(q) === -1) return false;
      if (bu && rec.bu !== bu) return false;
      if (status && rec.status !== status) return false;
      return true;
    });

    document.getElementById('stat-total').textContent = all.length;
    document.getElementById('stat-pending').textContent = all.filter(function (r) { return r.status === 'pending'; }).length;
    document.getElementById('stat-progress').textContent = all.filter(function (r) { return r.status === 'in_progress'; }).length;
    document.getElementById('stat-completed').textContent = all.filter(function (r) { return r.status === 'completed'; }).length;

    if (!filtered.length) {
      tbody.innerHTML = '';
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
      tbody.innerHTML = filtered.map(function (rec) {
        return '<tr>' +
          '<td class="cell-strong">' + rec.property + '<div class="cell-sub">' + rec.bu + '</div></td>' +
          '<td><span class="badge ' + statusBadge[rec.status] + '">' + statusLabel[rec.status] + '</span></td>' +
          '<td class="cell-sub">' + rec.createdAt + '</td>' +
          '<td>' + rec.createdBy + '</td>' +
          '<td class="cell-sub">' + rec.updatedAt + '</td>' +
          '<td>' + rec.updatedBy + '</td>' +
          '<td>' + actionButtons(rec) + '</td>' +
          '</tr>';
      }).join('');
    }

    resultCount.textContent = filtered.length + ' of ' + all.length + ' records';
    document.getElementById('pg-count').textContent = filtered.length;
    document.getElementById('pg-total').textContent = filtered.length;
  }

  searchInput.addEventListener('input', render);
  buFilter.addEventListener('change', render);
  statusFilter.addEventListener('change', render);
  document.getElementById('clear-filters-btn').addEventListener('click', function () {
    searchInput.value = ''; buFilter.value = ''; statusFilter.value = ''; render();
  });

  render();

  document.querySelectorAll('input[name="project-type"]').forEach(function (r) {
    r.addEventListener('change', function () { document.getElementById('unit-count-group').style.display = this.value === 'residence' ? '' : 'none'; });
  });

  document.getElementById('add-onboarding-btn').addEventListener('click', function () {
    var onboardingForm = document.getElementById('onboarding-form');
    onboardingForm.reset();
    document.getElementById('unit-count-group').style.display = 'none';
    MM.openModal('onboarding-drawer');
  });

  var onboardingForm = document.getElementById('onboarding-form');
  MM.bindFormValidation(onboardingForm);
  onboardingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(onboardingForm)) return;
    MM.simulateSave(document.getElementById('onboarding-save-btn'), 'Submitting...', function () {
      var name = document.getElementById('f-name').value.trim();
      var isResidence = document.querySelector('input[name="project-type"]:checked').value === 'residence';
      var extra = [];
      try { extra = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (err) { extra = []; }
      var today = new Date().toISOString().slice(0, 10);
      extra.unshift({
        id: MM.uid('OB'), property: name + (isResidence ? ' (Residence)' : ''), bu: 'Phuket Collection',
        status: 'pending', createdAt: today, createdBy: 'Somchai Anuwat', updatedAt: today, updatedBy: 'Somchai Anuwat'
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(extra));
      MM.showToast('Onboarding request submitted for validation');
      MM.closeModal('onboarding-drawer');
      render();
    });
  });
})();
