(function () {
  'use strict';

  var REN = window.MM.REN;
  var tbody = document.getElementById('ren-tbody');
  var emptyEl = document.getElementById('ren-empty');
  var searchInput = document.getElementById('search-input');
  var buFilter = document.getElementById('bu-filter');
  var villaFilter = document.getElementById('villa-filter');
  var statusFilter = document.getElementById('status-filter');
  var resultCount = document.getElementById('result-count');

  var actionTargetId = null;

  /* Populate BU / Villa filter selects from the shared villa cast */
  REN.BUSINESS_UNITS.forEach(function (bu) {
    var opt = document.createElement('option'); opt.value = bu; opt.textContent = bu;
    buFilter.appendChild(opt);
  });
  function populateVillaFilter(bu) {
    villaFilter.innerHTML = '<option value="">All Villas</option>';
    REN.VILLAS.filter(function (v) { return !bu || v.bu === bu; }).forEach(function (v) {
      var opt = document.createElement('option'); opt.value = v.id; opt.textContent = v.name;
      villaFilter.appendChild(opt);
    });
  }
  populateVillaFilter('');
  buFilter.addEventListener('change', function () { populateVillaFilter(buFilter.value); render(); });

  function budgetCell(p) {
    var budget = REN.itemBudgetTotal(p), real = REN.itemRealTotal(p);
    var pct = budget > 0 ? Math.min(100, Math.round((real / budget) * 100)) : 0;
    var over = real > budget;
    return '<div>' +
      '<div class="ren-budget-bar"><div class="ren-budget-bar__fill' + (over ? ' over' : '') + '" style="width:' + pct + '%"></div></div>' +
      '<div class="ren-budget-meta cell-num">' + REN.money(real) + ' of ' + REN.money(budget) + (over ? ' <span style="color:var(--color-danger);font-weight:700;">over</span>' : '') + '</div>' +
      '</div>';
  }

  function startCell(p) {
    if (p.actualStartDate) return '<span class="cell-strong">Started</span><div class="cell-sub">' + REN.date(p.actualStartDate) + '</div>';
    return '<span>Will start on</span><div class="cell-sub">' + REN.date(p.startDate) + '</div>';
  }

  function render() {
    var all = REN.getProjects();
    var q = searchInput.value.trim().toLowerCase();
    var bu = buFilter.value, villaId = villaFilter.value, status = statusFilter.value;

    var filtered = all.filter(function (p) {
      if (bu && p.bu !== bu) return false;
      if (villaId && p.villaId !== villaId) return false;
      if (status && p.status !== status) return false;
      if (q) {
        var hay = (p.title + ' ' + p.villaName).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    tbody.innerHTML = filtered.map(function (p) {
      var actions = '<div class="row-actions">' +
        '<a class="row-icon-btn" href="../ren-003-renovation-project-follow-up/index.html?id=' + p.id + '" aria-label="Follow up project" title="Follow up project"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></a>' +
        '<a class="row-icon-btn" href="../ren-003-renovation-project-follow-up/index.html?id=' + p.id + '" aria-label="Edit" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></a>';
      if (p.status === 'Not Started') {
        actions += '<button class="row-icon-btn" data-mark-start="' + p.id + '" aria-label="Mark started" title="Mark started"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg></button>';
      } else if (p.status === 'Under Progress') {
        actions += '<button class="row-icon-btn" data-mark-complete="' + p.id + '" aria-label="Mark completed" title="Mark completed"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></button>';
      }
      actions += '<button class="row-icon-btn danger" data-delete="' + p.id + '" aria-label="Delete" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg></button></div>';

      return '<tr>' +
        '<td><div class="ren-project-cell"><span class="ren-project-cell__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></span>' +
          '<div><div class="ren-project-cell__title">' + p.title + '</div><div class="ren-project-cell__sub">' + p.villaName + '</div></div></div></td>' +
        '<td>' + p.bu + '</td>' +
        '<td>' + startCell(p) + '</td>' +
        '<td>' + budgetCell(p) + '</td>' +
        '<td>' + REN.statusBadge(p.status) + '</td>' +
        '<td>' + actions + '</td>' +
        '</tr>';
    }).join('');

    emptyEl.hidden = filtered.length !== 0;
    document.getElementById('pg-count').textContent = filtered.length;
    document.getElementById('pg-total').textContent = filtered.length;
    resultCount.textContent = filtered.length + ' of ' + all.length + ' projects';

    document.getElementById('stat-total').textContent = all.length;
    document.getElementById('stat-progress').textContent = all.filter(function (p) { return p.status === 'Under Progress'; }).length;
    document.getElementById('stat-completed').textContent = all.filter(function (p) { return p.status === 'Completed'; }).length;
    document.getElementById('stat-over-budget').textContent = all.filter(function (p) { return REN.itemRealTotal(p) > REN.itemBudgetTotal(p); }).length;
  }

  searchInput.addEventListener('input', render);
  villaFilter.addEventListener('change', render);
  statusFilter.addEventListener('change', render);
  document.getElementById('clear-filters-btn').addEventListener('click', function () {
    searchInput.value = ''; buFilter.value = ''; statusFilter.value = '';
    populateVillaFilter(''); render();
  });

  /* Row actions */
  document.addEventListener('click', function (e) {
    var startBtn = e.target.closest('[data-mark-start]');
    if (startBtn) {
      actionTargetId = startBtn.getAttribute('data-mark-start');
      var p1 = REN.getProject(actionTargetId);
      document.getElementById('start-date-project-name').textContent = p1 ? (p1.title + ' — ' + p1.villaName) : '';
      document.getElementById('actual-start-input').value = new Date().toISOString().slice(0, 10);
      MM.openModal('start-date-modal');
      return;
    }
    var completeBtn = e.target.closest('[data-mark-complete]');
    if (completeBtn) {
      actionTargetId = completeBtn.getAttribute('data-mark-complete');
      var p2 = REN.getProject(actionTargetId);
      document.getElementById('complete-date-project-name').textContent = p2 ? (p2.title + ' — ' + p2.villaName) : '';
      document.getElementById('actual-end-input').value = new Date().toISOString().slice(0, 10);
      MM.openModal('complete-date-modal');
      return;
    }
    var delBtn = e.target.closest('[data-delete]');
    if (delBtn) {
      actionTargetId = delBtn.getAttribute('data-delete');
      var p3 = REN.getProject(actionTargetId);
      document.getElementById('del-project-name').textContent = p3 ? (p3.title + ' — ' + p3.villaName) : 'this project';
      MM.openModal('delete-project-modal');
    }
  });

  document.getElementById('confirm-start-btn').addEventListener('click', function () {
    var input = document.getElementById('actual-start-input');
    if (!input.value) { MM.validateField(input); return; }
    REN.updateProject(actionTargetId, function (p) { p.status = 'Under Progress'; p.actualStartDate = input.value; });
    MM.closeModal('start-date-modal');
    MM.showToast('Project marked as started.');
    render();
  });

  document.getElementById('confirm-complete-btn').addEventListener('click', function () {
    var input = document.getElementById('actual-end-input');
    if (!input.value) { MM.validateField(input); return; }
    REN.updateProject(actionTargetId, function (p) { p.status = 'Completed'; p.actualEndDate = input.value; });
    MM.closeModal('complete-date-modal');
    MM.showToast('Project marked as completed.');
    render();
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    REN.deleteProject(actionTargetId);
    MM.closeModal('delete-project-modal');
    MM.showToast('Renovation project deleted.', { danger: true });
    render();
  });

  render();

  /* ---------------------------------------------------------------- */
  /* Create New Project drawer                                         */
  /* ---------------------------------------------------------------- */

  var itemCount = 0;

  document.getElementById('f-villa').innerHTML += REN.VILLAS.map(function (v) { return '<option value="' + v.id + '">' + v.name + ' (' + v.bu + ')</option>'; }).join('');
  document.getElementById('f-leader').innerHTML = MM.MOCK_STAFF.map(function (s) { return '<option value="' + s.id + '">' + s.name + '</option>'; }).join('');

  function addItemRow(name, budget) {
    itemCount++;
    var row = document.createElement('div');
    row.className = 'ren-item-row';
    row.innerHTML =
      '<div class="form-group"><label>Item Name</label><input type="text" class="item-name" value="' + (name || '') + '" placeholder="e.g. Pool pump upgrade"></div>' +
      '<div class="form-group"><label>Budget</label><input type="number" class="item-budget" value="' + (budget || '') + '" min="0" placeholder="0"></div>' +
      '<button type="button" class="row-icon-btn danger remove-item-btn" aria-label="Remove item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
    document.getElementById('items-rows').appendChild(row);
    row.querySelector('.remove-item-btn').addEventListener('click', function () { row.remove(); });
  }

  document.getElementById('add-item-btn').addEventListener('click', function () { addItemRow(); });

  document.getElementById('f-villa').addEventListener('change', function () {
    var open = REN.villaHasOpenProject(this.value);
    var warn = document.getElementById('villa-warning');
    if (open) {
      document.getElementById('warning-link').href = '../ren-003-renovation-project-follow-up/index.html?id=' + open.id;
      warn.hidden = false;
    } else {
      warn.hidden = true;
    }
  });

  document.getElementById('new-project-btn').addEventListener('click', function () {
    var form = document.getElementById('project-form');
    form.reset();
    document.getElementById('items-rows').innerHTML = '';
    itemCount = 0;
    addItemRow();
    document.getElementById('villa-warning').hidden = true;
    MM.openModal('new-project-drawer');
  });

  var projectForm = document.getElementById('project-form');
  MM.bindFormValidation(projectForm);
  projectForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(projectForm)) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Creating...', function () {
      var villaId = document.getElementById('f-villa').value;
      var villa = REN.VILLAS.find(function (v) { return v.id === villaId; });
      var leaderId = document.getElementById('f-leader').value;
      var leader = MM.MOCK_STAFF.find(function (s) { return s.id === leaderId; });
      var items = Array.from(document.querySelectorAll('.ren-item-row')).map(function (row, i) {
        return { id: 'ITM-' + (i + 1), name: row.querySelector('.item-name').value.trim() || 'Untitled item', budget: parseFloat(row.querySelector('.item-budget').value) || 0, realAmount: 0, hasDocument: false };
      });
      var newProject = {
        id: REN.uid('REN-P'), villaId: villaId, villaName: villa ? villa.name : villaId, bu: villa ? villa.bu : '',
        title: document.getElementById('f-title').value.trim(), status: 'Not Started',
        leaderId: leaderId, leaderName: leader ? leader.name : '',
        startDate: document.getElementById('f-start').value, endDate: document.getElementById('f-end').value,
        actualStartDate: null, actualEndDate: null, items: items, receipts: [], photos: [], payments: []
      };
      REN.addProject(newProject);
      MM.showToast('Renovation project created');
      /* Quick-create then jump straight to the new project's detail page,
         rather than closing the drawer and staying on the list. */
      setTimeout(function () { window.location.href = '../ren-003-renovation-project-follow-up/index.html?id=' + newProject.id; }, 600);
    });
  });
})();
