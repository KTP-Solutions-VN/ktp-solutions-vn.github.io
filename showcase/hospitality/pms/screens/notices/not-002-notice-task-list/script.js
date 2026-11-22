(function () {
  'use strict';

  var SEED = [
    { id: 'NOT-1001', subject: 'Villa Sapphire Cliff — pool maintenance overdue', from: 'Daniel T.', property: 'Villa Sapphire Cliff', status: 'in-progress' },
    { id: 'NOT-1002', subject: 'Owner requested payout statement', from: 'Adam P.', property: 'Villa Lotus Bay', status: 'pending-confirmation' },
    { id: 'NOT-1003', subject: 'Guest complaint — AC not working', from: 'Natalie S.', property: 'Villa Amber Ridge', status: 'in-progress' },
    { id: 'NOT-1004', subject: 'Monthly cleaning checklist confirmed', from: 'Daniel T.', property: 'Villa Coral Breeze', status: 'completed' },
    { id: 'NOT-1005', subject: 'Renovation contractor site visit', from: 'Peter K.', property: 'Villa Jade Horizon', status: 'pending-confirmation' }
  ];

  function getHidden() { return JSON.parse(localStorage.getItem('mm_not_notices_hidden') || '[]'); }
  function getExtra() { return JSON.parse(localStorage.getItem('mm_not_notices') || '[]'); }

  function getAll() {
    var hidden = getHidden();
    return SEED.filter(function (n) { return hidden.indexOf(n.id) === -1; }).concat(getExtra());
  }

  function statusBadge(status) {
    var map = { 'in-progress': ['warning', 'In Progress'], 'pending-confirmation': ['info', 'Pending Confirmation'], 'completed': ['success', 'Completed'] };
    var m = map[status] || ['neutral', status];
    return '<span class="badge badge-' + m[0] + '">' + m[1] + '</span>';
  }

  var pendingDeleteId = null;

  function render() {
    var tbody = document.getElementById('list-tbody');
    var rows = getAll();
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="5"><div class="empty-state"><p>No tasks yet.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(function (n) {
      return '<tr>' +
        '<td><a href="../not-003-notice-detail/index.html?id=' + n.id + '">' + n.subject + '</a></td>' +
        '<td>' + n.from + '</td>' +
        '<td>' + n.property + '</td>' +
        '<td>' + statusBadge(n.status) + '</td>' +
        '<td style="text-align:right;">' +
          '<button class="btn btn-ghost btn-sm" data-view="' + n.id + '">View</button> ' +
          '<button class="btn btn-ghost btn-sm" data-delete="' + n.id + '">Delete</button>' +
        '</td>' +
      '</tr>';
    }).join('');
  }

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var viewBtn = e.target.closest('[data-view]');
    if (viewBtn) { window.location.href = '../not-003-notice-detail/index.html?id=' + viewBtn.getAttribute('data-view'); return; }
    var delBtn = e.target.closest('[data-delete]');
    if (delBtn) { pendingDeleteId = delBtn.getAttribute('data-delete'); MM.openModal('delete-modal'); }
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    if (!pendingDeleteId) return;
    var isSeed = SEED.some(function (n) { return n.id === pendingDeleteId; });
    if (isSeed) {
      var hidden = getHidden();
      hidden.push(pendingDeleteId);
      localStorage.setItem('mm_not_notices_hidden', JSON.stringify(hidden));
    } else {
      var extra = getExtra().filter(function (n) { return n.id !== pendingDeleteId; });
      localStorage.setItem('mm_not_notices', JSON.stringify(extra));
    }
    pendingDeleteId = null;
    MM.closeModal('delete-modal');
    MM.showToast('Notice deleted');
    render();
  });

  render();
})();
