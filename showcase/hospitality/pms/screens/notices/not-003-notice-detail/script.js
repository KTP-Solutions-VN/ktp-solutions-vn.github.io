(function () {
  'use strict';

  var SEED = [
    { id: 'NOT-1001', subject: 'Villa Sapphire Cliff — pool maintenance overdue', from: 'Somchai A.', property: 'Villa Sapphire Cliff', category: 'Maintenance', status: 'in-progress', sent: '2026-08-20 09:14', message: 'The pool filtration system at Villa Sapphire Cliff has been flagged as overdue for service. Please schedule a technician visit before the next guest check-in.' },
    { id: 'NOT-1002', subject: 'Owner requested payout statement', from: 'Aroon P.', property: 'Villa Lotus Bay', category: 'Accounting', status: 'pending-confirmation', sent: '2026-08-21 11:02', message: 'Owner has requested a copy of the July payout statement. Please confirm once sent.' },
    { id: 'NOT-1003', subject: 'Guest complaint — AC not working', from: 'Nalin S.', property: 'Villa Amber Ridge', category: 'Guest Service', status: 'in-progress', sent: '2026-08-22 14:40', message: 'Guest in Villa Amber Ridge reported the master bedroom AC unit is not cooling. Please dispatch maintenance today.' },
    { id: 'NOT-1004', subject: 'Monthly cleaning checklist confirmed', from: 'Somchai A.', property: 'Villa Coral Breeze', category: 'Housekeeping', status: 'completed', sent: '2026-08-18 08:05', message: 'Monthly deep-cleaning checklist for Villa Coral Breeze has been completed and signed off.' },
    { id: 'NOT-1005', subject: 'Renovation contractor site visit', from: 'Piti K.', property: 'Villa Jade Horizon', category: 'Renovation', status: 'pending-confirmation', sent: '2026-08-23 16:30', message: 'Contractor requests a site visit next Tuesday to assess the terrace renovation scope.' }
  ];

  function getExtra() { return JSON.parse(localStorage.getItem('mm_not_notices') || '[]'); }

  function getById(id) {
    return SEED.concat(getExtra()).filter(function (n) { return n.id === id; })[0];
  }

  var params = new URLSearchParams(window.location.search);
  var id = params.get('id') || 'NOT-1001';
  var notice = getById(id) || SEED[0];

  document.getElementById('notice-subject').textContent = notice.subject;
  document.getElementById('d-from').textContent = notice.from;
  document.getElementById('d-property').textContent = notice.property;
  document.getElementById('d-category').textContent = notice.category || '—';
  document.getElementById('d-status').textContent = notice.status.replace(/-/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  document.getElementById('d-sent').textContent = notice.sent || '—';
  document.getElementById('d-message').textContent = notice.message || '';
  document.getElementById('f-status').value = notice.status;

  document.getElementById('help-other-btn').addEventListener('click', function () {
    window.location.href = '../not-004-help-other-user/index.html?id=' + notice.id;
  });

  var form = document.getElementById('status-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
      MM.showToast('Status updated');
    });
  });
})();
