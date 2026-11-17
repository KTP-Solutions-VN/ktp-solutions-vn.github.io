(function () {
  'use strict';

  var MOCK_ISSUES = [
    { villaId: 'PV-105', property: 'Villa Marble Cove', bu: 'Phuket Collection', status: 'No photo set', statusKey: 'none', issues: ['No photos uploaded'], priority: 'high', nextAction: 'Schedule an initial shoot' },
    { villaId: 'PV-107', property: 'Villa Golden Palm', bu: 'Koh Samui Estates', status: 'Partial set', statusKey: 'partial', issues: ['Missing bedroom photos', 'Missing pool deck'], priority: 'high', nextAction: 'Book a follow-up shoot' },
    { villaId: 'PV-104', property: 'Villa Azure Ridge', bu: 'Bali Retreats', status: 'Partial set', statusKey: 'partial', issues: ['Missing living room'], priority: 'medium', nextAction: 'Request 3 additional shots' },
    { villaId: 'PV-201', property: 'Villa Turquoise Reef', bu: 'Phuket Collection', status: 'Outdated set', statusKey: 'outdated', issues: ['Shot over 18 months ago', 'Off-standard lighting'], priority: 'medium', nextAction: 'Plan a re-shoot' },
    { villaId: 'PV-202', property: 'Villa Palm Residence — Unit 3', bu: 'Bali Retreats', status: 'No photo set', statusKey: 'none', issues: ['No photos uploaded'], priority: 'high', nextAction: 'Schedule an initial shoot' },
    { villaId: 'PV-203', property: 'Villa Orchid Rise', bu: 'Bali Retreats', status: 'Outdated set', statusKey: 'outdated', issues: ['Shot over 2 years ago'], priority: 'low', nextAction: 'Add to next quarter\'s plan' },
    { villaId: 'PV-204', property: 'Villa Amber Cove', bu: 'Koh Samui Estates', status: 'Partial set', statusKey: 'partial', issues: ['Missing exterior/garden'], priority: 'low', nextAction: 'Add to next quarter\'s plan' }
  ];

  var priorityBadge = { high: 'badge-danger', medium: 'badge-warning', low: 'badge-neutral' };
  var statusIcon = {
    none: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="15" height="15"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="3" x2="21" y2="21"/></svg>',
    partial: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="15" height="15"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/></svg>',
    outdated: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="15" height="15"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
  };

  var searchInput = document.getElementById('search-input');
  var buFilter = document.getElementById('bu-filter');
  var priorityFilter = document.getElementById('priority-filter');
  var tbody = document.getElementById('missing-photos-tbody');
  var emptyState = document.getElementById('missing-photos-empty');
  var resultCount = document.getElementById('result-count');

  function render() {
    var q = searchInput.value.trim().toLowerCase();
    var bu = buFilter.value;
    var priority = priorityFilter.value;

    var filtered = MOCK_ISSUES.filter(function (r) {
      if (q && r.property.toLowerCase().indexOf(q) === -1) return false;
      if (bu && r.bu !== bu) return false;
      if (priority && r.priority !== priority) return false;
      return true;
    });

    document.getElementById('stat-issues').textContent = MOCK_ISSUES.length;
    document.getElementById('stat-high').textContent = MOCK_ISSUES.filter(function (r) { return r.priority === 'high'; }).length;
    document.getElementById('stat-partial').textContent = MOCK_ISSUES.filter(function (r) { return r.statusKey === 'partial'; }).length;
    document.getElementById('stat-outdated').textContent = MOCK_ISSUES.filter(function (r) { return r.statusKey === 'outdated'; }).length;

    if (!filtered.length) {
      tbody.innerHTML = '';
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
      tbody.innerHTML = filtered.map(function (r) {
        return '<tr>' +
          '<td class="cell-strong">' + r.property + '<div class="cell-sub">' + r.bu + '</div></td>' +
          '<td>' + statusIcon[r.statusKey] + ' ' + r.status + '</td>' +
          '<td><div class="issue-tags">' + r.issues.map(function (i) { return '<span class="issue-tag">' + i + '</span>'; }).join('') + '</div></td>' +
          '<td><span class="badge ' + priorityBadge[r.priority] + '">' + r.priority + '</span></td>' +
          '<td><span class="next-action' + (r.priority === 'high' ? ' urgent' : '') + '">' + r.nextAction + '</span></td>' +
          '<td><div class="row-actions-inline">' +
            '<a class="icon-action" href="../prop-026-photography-planning/index.html?villa=' + r.villaId + '" title="Plan shoot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></a>' +
            '<a class="icon-action" href="../../photos/pho-002-photo-sets/index.html?villa=' + r.villaId + '" title="Upload photos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></a>' +
            '<a class="icon-action" href="../../photos/pho-002-photo-sets/index.html?villa=' + r.villaId + '" title="View photo set"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></a>' +
          '</div></td>' +
          '</tr>';
      }).join('');
    }

    resultCount.textContent = filtered.length + ' of ' + MOCK_ISSUES.length + ' properties';
    document.getElementById('pg-count').textContent = filtered.length;
    document.getElementById('pg-total').textContent = filtered.length;
  }

  searchInput.addEventListener('input', render);
  buFilter.addEventListener('change', render);
  priorityFilter.addEventListener('change', render);
  render();
})();
