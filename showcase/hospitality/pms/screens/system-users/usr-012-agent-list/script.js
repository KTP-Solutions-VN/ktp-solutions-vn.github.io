(function () {
  'use strict';

  window.MM_USR_AGENTS_BASE = [
    { id: 'AGT-01', firstName: 'Laura', familyName: 'Bennett', usageName: 'Laura B.', companyName: 'Sunset Travel Co.', language: 'English', email: 'laura.bennett@sunsettravel.example', username: 'laura.bennett', phone: '+44 7700 900123', geo: 'Singapore', contactDate: '2026-08-10', status: 'Top Performer', note: 'Handles the UK luxury villa segment.' },
    { id: 'AGT-02', firstName: 'Marco', familyName: 'Rinaldi', usageName: 'Marco R.', companyName: 'Blue Horizon Tours', language: 'English', email: 'marco.rinaldi@bluehorizon.example', username: 'marco.rinaldi', phone: '+39 345 678 9012', geo: 'Sentosa', contactDate: '2026-08-22', status: 'Active', note: 'Frequent Sentosa group bookings.' },
    { id: 'AGT-03', firstName: 'Chloe', familyName: 'Tremblay', usageName: 'Chloe T.', companyName: 'Golden Gate Villas Marketing', language: 'French', email: 'chloe.tremblay@ggvm.example', username: 'chloe.tremblay', phone: '+1 415 555 0182', geo: 'China', contactDate: '2026-07-30', status: 'Active', note: '' },
    { id: 'AGT-04', firstName: 'Henry', familyName: 'Ward', usageName: 'Henry W.', companyName: 'Coral Coast Escapes', language: 'English', email: 'henry.ward@coralcoast.example', username: 'henry.ward', phone: '+61 411 234 567', geo: 'Other', contactDate: '2026-06-15', status: 'Occasional', note: '' },
    { id: 'AGT-05', firstName: 'Phoebe', familyName: 'Lawson', usageName: 'Phoebe L.', companyName: 'Southern Cross Holidays', language: 'English', email: 'phoebe.lawson@southerncross.example', username: 'phoebe.lawson', phone: '+61 434 567 890', geo: 'Singapore', contactDate: '2026-08-25', status: 'New', note: 'Onboarded this quarter.' },
    { id: 'AGT-06', firstName: 'Fiona', familyName: 'Clarke', usageName: 'Fiona C.', companyName: 'Emerald Coast Bookings', language: 'English', email: 'fiona.clarke@emeraldcoast.example', username: 'fiona.clarke', phone: '+44 7700 900456', geo: 'Other', contactDate: '2026-05-02', status: 'Dormant', note: 'No response since May.' },
    { id: 'AGT-07', firstName: 'Terence', familyName: 'Seow', usageName: 'Terence S.', companyName: 'Lion City Getaway Agency', language: 'English', email: 'terence.seow@lioncitygetaway.example', username: 'terence.seow', phone: '+65 9222 3344', geo: 'Singapore', contactDate: '2026-08-18', status: 'Top Performer', note: '' },
    { id: 'AGT-08', firstName: 'Isabelle', familyName: 'Laurent', usageName: 'Isabelle L.', companyName: 'Coral Bay Travel Partners', language: 'French', email: 'isabelle.laurent@coralbay.example', username: 'isabelle.laurent', phone: '+33 6 12 34 56 78', geo: 'China', contactDate: '2026-07-05', status: 'Active', note: '' }
  ];

  function loadAgents() {
    var deleted = JSON.parse(localStorage.getItem('mm_usr_agents_deleted') || '[]');
    var added = JSON.parse(localStorage.getItem('mm_usr_agents') || '[]');
    var edits = JSON.parse(localStorage.getItem('mm_usr_agents_edits') || '{}');
    var base = window.MM_USR_AGENTS_BASE.filter(function (a) { return deleted.indexOf(a.id) === -1; })
      .map(function (a) { return edits[a.id] ? Object.assign({}, a, edits[a.id]) : a; });
    var addedFiltered = added.filter(function (a) { return deleted.indexOf(a.id) === -1; })
      .map(function (a) { return edits[a.id] ? Object.assign({}, a, edits[a.id]) : a; });
    return base.concat(addedFiltered).sort(function (x, y) { return x.firstName.localeCompare(y.firstName); });
  }

  var tbody = document.getElementById('agents-tbody');
  var emptyEl = document.getElementById('agents-empty');
  var searchInput = document.getElementById('search-input');
  var statusFilter = document.getElementById('status-filter');
  var resultCount = document.getElementById('result-count');
  var deleteTargetId = null;

  var statusBadge = { 'Top Performer': 'badge-success', 'Active': 'badge-info', 'New': 'badge-warning', 'Occasional': 'badge-neutral', 'Dormant': 'badge-danger' };

  function formatDate(d) { return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); }

  function render() {
    var all = loadAgents();
    var q = searchInput.value.trim().toLowerCase();
    var status = statusFilter.value;

    var filtered = all.filter(function (a) {
      if (status && a.status !== status) return false;
      if (q) {
        var hay = (a.firstName + ' ' + a.familyName + ' ' + a.companyName).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    tbody.innerHTML = filtered.map(function (a) {
      return '<tr>' +
        '<td><div class="staff-cell"><div class="cell-strong">' + a.firstName + ' ' + a.familyName + '</div><div class="cell-sub">' + a.usageName + '</div></div></td>' +
        '<td>' + a.companyName + '</td>' +
        '<td><span class="badge ' + (statusBadge[a.status] || 'badge-neutral') + '">' + a.status + '</span></td>' +
        '<td class="cell-sub">' + formatDate(a.contactDate) + '</td>' +
        '<td><div class="row-actions">' +
          '<button class="row-icon-btn" data-edit="' + a.id + '" aria-label="Edit" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
          '<button class="row-icon-btn danger" data-delete="' + a.id + '" aria-label="Delete" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>' +
        '</div></td>' +
        '</tr>';
    }).join('');

    emptyEl.hidden = filtered.length !== 0;
    document.getElementById('pg-count').textContent = filtered.length;
    document.getElementById('pg-total').textContent = filtered.length;
    resultCount.textContent = filtered.length + ' of ' + all.length + ' agents';

    document.getElementById('stat-total').textContent = all.length;
    document.getElementById('stat-top').textContent = all.filter(function (a) { return a.status === 'Top Performer'; }).length;
    document.getElementById('stat-new').textContent = all.filter(function (a) { return a.status === 'New'; }).length;
    document.getElementById('stat-dormant').textContent = all.filter(function (a) { return a.status === 'Dormant'; }).length;
  }

  searchInput.addEventListener('input', render);
  statusFilter.addEventListener('change', render);
  document.getElementById('clear-filters-btn').addEventListener('click', function () {
    searchInput.value = ''; statusFilter.value = ''; render();
  });

  document.addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      var editAgent = loadAgents().find(function (x) { return x.id === editBtn.getAttribute('data-edit'); });
      openDrawer(editAgent);
      return;
    }
    var delBtn = e.target.closest('[data-delete]');
    if (delBtn) {
      deleteTargetId = delBtn.getAttribute('data-delete');
      var a = loadAgents().find(function (x) { return x.id === deleteTargetId; });
      document.getElementById('del-agent-name').textContent = a ? (a.firstName + ' ' + a.familyName) : 'this agent';
      MM.openModal('delete-agent-modal');
    }
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    if (!deleteTargetId) return;
    var deleted = JSON.parse(localStorage.getItem('mm_usr_agents_deleted') || '[]');
    deleted.push(deleteTargetId);
    localStorage.setItem('mm_usr_agents_deleted', JSON.stringify(deleted));
    MM.closeModal('delete-agent-modal');
    MM.showToast('Agent deleted.', { danger: true });
    deleteTargetId = null;
    render();
  });

  /* ---------------------------------------------------------------- */
  /* Add / Edit Agent drawer                                           */
  /* ---------------------------------------------------------------- */

  var editingId = null;

  function openDrawer(agent) {
    editingId = agent ? agent.id : null;
    document.getElementById('agent-drawer-title').textContent = agent ? 'Edit Agent' : 'Add Agent';
    document.getElementById('agent-save-btn').textContent = agent ? 'Save Changes' : 'Create Agent';
    document.getElementById('agent-form').reset();
    if (agent) {
      document.getElementById('f-first').value = agent.firstName;
      document.getElementById('f-last').value = agent.familyName;
      document.getElementById('f-usage').value = agent.usageName;
      document.getElementById('f-email').value = agent.email;
      if (agent.geo) document.getElementById('f-area').value = agent.geo;
      document.getElementById('f-status').value = agent.status === 'Inactive' ? 'Inactive' : 'Active';
    }
    MM.openModal('agent-drawer');
  }

  document.getElementById('add-agent-btn').addEventListener('click', function () { openDrawer(null); });

  var agentForm = document.getElementById('agent-form');
  MM.bindFormValidation(agentForm);
  agentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(agentForm)) return;
    MM.simulateSave(document.getElementById('agent-save-btn'), editingId ? 'Saving...' : 'Creating...', function () {
      var first = document.getElementById('f-first').value.trim();
      var last = document.getElementById('f-last').value.trim();
      var usage = document.getElementById('f-usage').value.trim();
      var email = document.getElementById('f-email').value.trim();
      var area = document.getElementById('f-area').value;
      var status = document.getElementById('f-status').value;
      if (editingId) {
        var edits = JSON.parse(localStorage.getItem('mm_usr_agents_edits') || '{}');
        edits[editingId] = { firstName: first, familyName: last, usageName: usage, email: email, geo: area, status: status };
        localStorage.setItem('mm_usr_agents_edits', JSON.stringify(edits));
        MM.showToast('Agent updated');
      } else {
        var added = JSON.parse(localStorage.getItem('mm_usr_agents') || '[]');
        added.push({
          id: MM.uid('AGT'), firstName: first, familyName: last, usageName: usage, companyName: '', language: 'English',
          email: email, username: (first + '.' + last).toLowerCase(), phone: '', geo: area,
          contactDate: new Date().toISOString().slice(0, 10), status: status, note: ''
        });
        localStorage.setItem('mm_usr_agents', JSON.stringify(added));
        MM.showToast('Agent created');
      }
      MM.closeModal('agent-drawer');
      render();
    });
  });

  render();
})();
