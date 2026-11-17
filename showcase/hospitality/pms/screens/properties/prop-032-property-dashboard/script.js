(function () {
  'use strict';

  /* ---------------------------------------------------------------- */
  /* Staff-without-a-leader — local extension of MM.MOCK_STAFF          */
  /* (checkNoLeaderAssigned widget from PROP-032's legacy spec)         */
  /* ---------------------------------------------------------------- */

  var LEADER_MAP = {
    'STF-01': { hasLeader: true, leader: 'Priya Nair (BU Manager)' },
    'STF-02': { hasLeader: false, leader: null },
    'STF-03': { hasLeader: true, leader: 'Priya Nair (BU Manager)' },
    'STF-04': { hasLeader: true, leader: 'Somchai Anuwat (Concierge Lead)' },
    'STF-05': { hasLeader: false, leader: null }
  };

  function initials(name) {
    return name.split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase();
  }

  var buFilter = document.getElementById('bu-filter');

  function filteredProperties() {
    var bu = buFilter.value;
    return MM.MOCK_PROPERTIES.filter(function (p) { return !bu || p.bu === bu; });
  }

  function filteredStaff() {
    var bu = buFilter.value;
    return MM.MOCK_STAFF.filter(function (s) { return !bu || s.team === bu; });
  }

  /* ---------------------------------------------------------------- */
  /* Stat cards                                                         */
  /* ---------------------------------------------------------------- */

  function renderStats(props) {
    var active = props.filter(function (p) { return p.status === 'active'; }).length;
    var onboarding = props.filter(function (p) { return p.status === 'onboarding'; }).length;
    var ready = props.filter(function (p) { return p.concierge && p.photosComplete && p.onboarding === 'live'; }).length;
    var pct = props.length ? Math.round((ready / props.length) * 100) : 0;

    document.getElementById('stat-total').textContent = props.length;
    document.getElementById('stat-active').textContent = active;
    document.getElementById('stat-onboarding').textContent = onboarding;
    document.getElementById('stat-ready-pct').textContent = pct + '%';
  }

  /* ---------------------------------------------------------------- */
  /* Property Readiness — signature moment (matches dashboard/script.js)*/
  /* ---------------------------------------------------------------- */

  function renderReadiness(props) {
    var noConcierge = props.filter(function (p) { return !p.concierge; }).length;
    var missingPhotos = props.filter(function (p) { return !p.photosComplete; }).length;
    var stuckOnboarding = props.filter(function (p) { return p.onboarding === 'onboarding'; }).length;
    var ready = props.filter(function (p) { return p.concierge && p.photosComplete && p.onboarding === 'live'; }).length;
    var pct = props.length ? Math.round((ready / props.length) * 100) : 0;

    document.getElementById('readiness-concierge').textContent = noConcierge;
    document.getElementById('readiness-photos').textContent = missingPhotos;
    document.getElementById('readiness-onboarding').textContent = stuckOnboarding;
    document.getElementById('readiness-pct').textContent = pct + '%';

    var ring = document.getElementById('readiness-ring');
    var r = 50, circ = 2 * Math.PI * r;
    ring.setAttribute('stroke-dasharray', (circ * pct / 100).toFixed(1) + ' ' + circ.toFixed(1));
    ring.setAttribute('stroke', pct >= 75 ? 'var(--color-success)' : pct >= 50 ? 'var(--color-warning)' : 'var(--color-accent)');
  }

  /* ---------------------------------------------------------------- */
  /* Staff Without a Leader widget                                     */
  /* ---------------------------------------------------------------- */

  function renderLeaderWidget(staff) {
    var missing = staff.filter(function (s) { return LEADER_MAP[s.id] && !LEADER_MAP[s.id].hasLeader; });
    var alertEl = document.getElementById('leader-alert');
    var listEl = document.getElementById('leader-list');

    document.getElementById('leader-count').textContent = missing.length;
    alertEl.classList.toggle('is-clear', missing.length === 0);

    if (missing.length === 0) {
      document.getElementById('leader-headline').textContent = 'All staff have an assigned leader';
      document.getElementById('leader-sub').textContent = 'No follow-up needed for this business unit.';
      listEl.innerHTML = '<li class="leader-empty">Nothing to review right now.</li>';
      return;
    }

    document.getElementById('leader-headline').textContent = missing.length + ' staff have no leader assigned';
    document.getElementById('leader-sub').textContent = 'Assign a team leader so escalations and approvals don\'t stall.';
    listEl.innerHTML = missing.map(function (s) {
      return '<li><span class="leader-avatar">' + initials(s.name) + '</span>' +
        '<span class="leader-meta"><strong>' + s.name + '</strong><small>' + s.role + ' &middot; ' + s.team + '</small></span>' +
        '<span class="badge badge-warning">No leader</span></li>';
    }).join('');
  }

  /* ---------------------------------------------------------------- */
  /* Properties overview table                                         */
  /* ---------------------------------------------------------------- */

  var onboardingLabel = { live: 'Live', onboarding: 'Onboarding' };
  var statusBadge = { active: 'badge-success', onboarding: 'badge-warning', inactive: 'badge-neutral' };

  function renderTable(props) {
    var tbody = document.getElementById('properties-tbody');
    if (!props.length) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state" style="padding:28px 0;">' +
        '<h3>No properties in this business unit</h3><p>Try a different filter.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = props.map(function (p) {
      return '<tr>' +
        '<td class="cell-strong">' + p.name + '</td>' +
        '<td>' + p.bu + '</td>' +
        '<td>' + (p.concierge ? p.concierge : '<span class="badge badge-warning">Unassigned</span>') + '</td>' +
        '<td>' + (p.photosComplete ? '<span class="badge badge-success">Complete</span>' : '<span class="badge badge-danger">Missing</span>') + '</td>' +
        '<td><span class="badge ' + (p.onboarding === 'live' ? 'badge-success' : 'badge-info') + '">' + onboardingLabel[p.onboarding] + '</span></td>' +
        '<td><span class="badge ' + (statusBadge[p.status] || 'badge-neutral') + '">' + p.status + '</span></td>' +
        '</tr>';
    }).join('');
  }

  /* ---------------------------------------------------------------- */
  /* Render pipeline + filter wiring                                   */
  /* ---------------------------------------------------------------- */

  function renderAll() {
    var props = filteredProperties();
    var staff = filteredStaff();
    renderStats(props);
    renderReadiness(props);
    renderLeaderWidget(staff);
    renderTable(props);
    var note = document.getElementById('filter-note');
    note.textContent = buFilter.value ? 'Showing ' + buFilter.value : 'Showing all business units';
  }

  buFilter.addEventListener('change', renderAll);
  renderAll();

  /* ---------------------------------------------------------------- */
  /* Download leader report — simulated                                */
  /* ---------------------------------------------------------------- */

  document.getElementById('download-leader-report').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Preparing...', function () {
      MM.showToast('Leader coverage report ready — check your downloads.');
    });
  });
})();
