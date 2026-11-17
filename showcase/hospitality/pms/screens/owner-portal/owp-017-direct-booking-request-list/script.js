(function () {
  'use strict';
  var owner = MM.MOCK_OWNERS[0];
  var myProps = MM.MOCK_PROPERTIES.filter(function (p) { return owner.properties.indexOf(p.id) !== -1; });
  document.getElementById('f-property').innerHTML = myProps.map(function (p) { return '<option>' + p.name + '</option>'; }).join('');

  var BASE_DATA = [
    { id: 'db1', property: 'Villa Sapphire Cliff', checkIn: '2026-09-10', checkOut: '2026-09-14', status: 'approved' }
  ];
  var statusMap = { pending: 'badge-warning', approved: 'badge-success', rejected: 'badge-danger' };

  function render() {
    var stored = JSON.parse(localStorage.getItem('mm_owp_direct_requests') || '[]');
    var data = BASE_DATA.concat(stored);
    document.getElementById('list-tbody').innerHTML = data.map(function (r) {
      return '<tr><td class="cell-strong">' + r.property + '</td><td class="cell-sub">' + r.checkIn + ' &rarr; ' + r.checkOut + '</td><td><span class="badge ' + statusMap[r.status] + '">' + r.status + '</span></td><td class="row-actions"><span class="text-muted text-sm">' + (r.status === 'pending' ? 'Awaiting review' : '—') + '</span></td></tr>';
    }).join('');
  }
  render();

  document.getElementById('add-btn').addEventListener('click', function () { document.getElementById('request-form').reset(); MM.openModal('request-modal'); });

  document.getElementById('save-btn').addEventListener('click', function () {
    var form = document.getElementById('request-form');
    if (!MM.validateForm(form)) return;
    MM.simulateSave(this, 'Submitting...', function () {
      var stored = JSON.parse(localStorage.getItem('mm_owp_direct_requests') || '[]');
      stored.push({ id: MM.uid('db'), property: document.getElementById('f-property').value, checkIn: document.getElementById('f-checkin').value, checkOut: document.getElementById('f-checkout').value, status: 'pending' });
      localStorage.setItem('mm_owp_direct_requests', JSON.stringify(stored));
      MM.closeModal('request-modal');
      MM.showToast('Booking request submitted');
      render();
    });
  });
})();
