(function () {
  'use strict';
  var BASE_DATA = [
    { id: 'v1', name: 'Toyota Hilux (Ops)', plate: 'กข 1234', usedBy: 'Somchai Anuwat', status: 'Active' },
    { id: 'v2', name: 'Honda PCX (Concierge)', plate: 'B 5678 ABC', usedBy: 'Wayan Kertha', status: 'Active' }
  ];
  document.getElementById('f-user').innerHTML = MM.MOCK_STAFF.map(function (s) { return '<option>' + s.name + '</option>'; }).join('');

  function currentData() {
    var stored = JSON.parse(localStorage.getItem('mm_acc_vehicles') || '[]');
    return BASE_DATA.concat(stored);
  }
  function render() {
    document.getElementById('list-tbody').innerHTML = currentData().map(function (v) {
      return '<tr><td class="cell-strong">' + v.name + '</td><td class="cell-sub">' + v.plate + '</td><td>' + v.usedBy + '</td><td><span class="badge badge-success">' + v.status + '</span></td>' +
        '<td class="row-actions"><span class="text-muted text-sm">—</span></td></tr>';
    }).join('');
  }
  render();
  document.getElementById('add-btn').addEventListener('click', function () { document.getElementById('item-form').reset(); MM.openModal('item-modal'); });
  document.getElementById('save-btn').addEventListener('click', function () {
    var form = document.getElementById('item-form');
    if (!MM.validateForm(form)) return;
    MM.simulateSave(this, 'Saving...', function () {
      var stored = JSON.parse(localStorage.getItem('mm_acc_vehicles') || '[]');
      stored.push({ id: MM.uid('veh'), name: document.getElementById('f-name').value.trim(), plate: document.getElementById('f-plate').value.trim(), usedBy: document.getElementById('f-user').value, status: 'Active' });
      localStorage.setItem('mm_acc_vehicles', JSON.stringify(stored));
      MM.closeModal('item-modal');
      MM.showToast('Vehicle added');
      render();
    });
  });
})();
