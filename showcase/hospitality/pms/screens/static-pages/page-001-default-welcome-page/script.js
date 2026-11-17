(function () {
  'use strict';

  var CARDS = [
    { label: 'PHP Runtime', value: '8.2.18', ok: true },
    { label: 'Database Connection', value: 'Connected', ok: true },
    { label: 'Cache Layer', value: 'Active', ok: true },
    { label: 'Debug Mode', value: 'Disabled', ok: true },
    { label: 'Disk Write Permissions', value: 'Writable', ok: true },
    { label: 'Scheduled Jobs', value: '1 delayed', ok: false }
  ];

  var ENV_ROWS = [
    ['Application Environment', 'Production', 'ok'],
    ['PHP Version', '8.2.18', 'ok'],
    ['Database Driver', 'MySQL 8.0', 'ok'],
    ['Cache Engine', 'Redis 7.2', 'ok'],
    ['tmp/ directory writable', 'Yes', 'ok'],
    ['logs/ directory writable', 'Yes', 'ok'],
    ['DebugKit Plugin', 'Not loaded (disabled in production)', 'ok'],
    ['Queue Worker', 'Last run 2026-08-27 09:14 — 1 job delayed', 'warning']
  ];

  function renderCards() {
    document.getElementById('diag-grid').innerHTML = CARDS.map(function (c) {
      return '<div class="diag-card' + (c.ok ? '' : ' diag-card--warning') + '"><div class="diag-card__label">' + c.label + '</div><div class="diag-card__value">' + c.value + '</div></div>';
    }).join('');
  }

  function renderEnv() {
    document.querySelector('#env-table tbody').innerHTML = ENV_ROWS.map(function (r) {
      var badgeClass = r[2] === 'ok' ? 'success' : 'warning';
      var badgeText = r[2] === 'ok' ? 'OK' : 'Attention';
      return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td><span class="badge badge-' + badgeClass + '">' + badgeText + '</span></td></tr>';
    }).join('');
  }

  document.getElementById('recheck-btn').addEventListener('click', function () {
    MM.simulateSave(document.getElementById('recheck-btn'), 'Checking...', function () {
      MM.showToast('All systems re-checked');
      renderCards();
      renderEnv();
    });
  });

  renderCards();
  renderEnv();
})();
