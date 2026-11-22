/* Channel Manager screen behaviour — renders channel connection rows with a
   per-row provider switch (Channex / Beds24), the core "provider routing"
   differentiator of the platform. */

(function () {
  'use strict';

  var PROPERTIES = [
    'Villa Ocean Breeze', 'Aegean Sunset Villa', 'Sunset Cove Bungalow',
    'Palm Grove Residence', 'Caribbean Blue Villa', 'Sunshine Coast Bungalow'
  ];

  var CONNECTIONS = [
    { channel: 'Booking.com', property: 'Villa Ocean Breeze', provider: 'beds24', status: 'connected', lastSync: '2 min ago' },
    { channel: 'Airbnb', property: 'Villa Ocean Breeze', provider: 'channex', status: 'connected', lastSync: '5 min ago' },
    { channel: 'Agoda', property: 'Aegean Sunset Villa', provider: 'channex', status: 'connected', lastSync: '11 min ago' },
    { channel: 'Booking.com', property: 'Aegean Sunset Villa', provider: 'beds24', status: 'connected', lastSync: '4 min ago' },
    { channel: 'Expedia', property: 'Palm Grove Residence', provider: 'beds24', status: 'connected', lastSync: '18 min ago' },
    { channel: 'Airbnb', property: 'Sunset Cove Bungalow', provider: 'channex', status: 'connected', lastSync: '7 min ago' },
    { channel: 'Booking.com', property: 'Caribbean Blue Villa', provider: 'beds24', status: 'warning', lastSync: '2 hrs ago' },
    { channel: 'Agoda', property: 'Sunshine Coast Bungalow', provider: 'channex', status: 'connected', lastSync: '9 min ago' }
  ];

  var STATUS_BADGE = {
    connected: '<span class="badge badge-success">Connected</span>',
    warning: '<span class="badge badge-warning">Sync Delayed</span>',
    disconnected: '<span class="badge badge-danger">Disconnected</span>'
  };

  var tbody = document.getElementById('channel-tbody');
  var ccProperty = document.getElementById('cc-property');

  PROPERTIES.forEach(function (p) {
    var opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    ccProperty.appendChild(opt);
  });

  function renderRows() {
    tbody.innerHTML = '';
    CONNECTIONS.forEach(function (row, idx) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td class="cell-strong">' + row.channel + '</td>' +
        '<td>' + row.property + '</td>' +
        '<td>' +
          '<select class="provider-select mini-select" data-idx="' + idx + '">' +
            '<option value="channex"' + (row.provider === 'channex' ? ' selected' : '') + '>Channex</option>' +
            '<option value="beds24"' + (row.provider === 'beds24' ? ' selected' : '') + '>Beds24</option>' +
          '</select>' +
        '</td>' +
        '<td>' + STATUS_BADGE[row.status] + '</td>' +
        '<td class="text-sm text-muted">' + row.lastSync + '</td>' +
        '<td><button class="btn btn-sm btn-outline" data-configure="' + idx + '">Configure</button></td>';
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.provider-select').forEach(function (sel) {
      sel.addEventListener('change', function () {
        var idx = Number(sel.getAttribute('data-idx'));
        CONNECTIONS[idx].provider = sel.value;
        window.CM.showToast('Routing updated — ' + CONNECTIONS[idx].channel + ' now uses ' + (sel.value === 'channex' ? 'Channex' : 'Beds24') + '.');
      });
    });

    tbody.querySelectorAll('[data-configure]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = Number(btn.getAttribute('data-configure'));
        openConfig(CONNECTIONS[idx]);
      });
    });
  }

  function openConfig(row) {
    document.getElementById('cc-title').textContent = 'Configure Channel';
    document.getElementById('cc-subtitle').textContent = row.channel + ' — ' + row.property;
    document.getElementById('cc-property').value = row.property;
    document.getElementById('cc-channel').value = row.channel;
    document.querySelector('input[name="cc-provider"][value="' + row.provider + '"]').checked = true;
    window.CM.openModal('modal-channel-config');
  }

  renderRows();
})();
