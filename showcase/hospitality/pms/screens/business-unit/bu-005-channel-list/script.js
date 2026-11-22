(function () {
  'use strict';

  var LS_KEY = 'mm_bu_channels';

  var MOCK_CHANNELS = [
    { id: 'ch1', name: 'Airbnb Direct', ownership: 'Azura Stays', manager: 'Daniel Tan', business_units: ['Sentosa Collection', 'Noosa Estates'], paid_to: 'Azura Stays Operating Account', paid_out_type: 'Check In', paid_out: 1, received: 0, created_at: '2021-04-01' },
    { id: 'ch2', name: 'Booking.com Partner', ownership: 'Partner', manager: '', business_units: ['Sentosa Collection', 'Byron Bay Retreats'], paid_to: 'USD Collections', paid_out_type: 'Check Out', paid_out: 3, received: 0, created_at: '2021-05-15' },
    { id: 'ch3', name: 'Azura Stays Website', ownership: 'Azura Stays', manager: 'Warren Kelly', business_units: ['Sentosa Collection', 'Noosa Estates', 'Byron Bay Retreats', 'Gold Coast Escapes'], paid_to: 'Azura Stays Operating Account', paid_out_type: 'Check In', paid_out: 0, received: 0, created_at: '2021-09-08' },
    { id: 'ch4', name: 'Agoda Singapore', ownership: 'Partner', manager: '', business_units: ['Sentosa Collection'], paid_to: '', paid_out_type: '', paid_out: null, received: null, created_at: '2022-02-11' },
    { id: 'ch5', name: 'Expedia Australia', ownership: 'Partner', manager: 'Warren Kelly', business_units: ['Byron Bay Retreats', 'Gold Coast Escapes'], paid_to: 'Byron Bay Retreats Main Account', paid_out_type: 'Check Out', paid_out: 5, received: 0, created_at: '2022-11-30' }
  ];

  function load() {
    try { var raw = localStorage.getItem(LS_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
    return MOCK_CHANNELS.slice();
  }
  function save(data) { localStorage.setItem(LS_KEY, JSON.stringify(data)); }

  var channels = load();

  function fmtDate(s) {
    var d = new Date(s + 'T00:00:00');
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + String(d.getFullYear()).slice(2);
  }

  function render() {
    var q = (document.getElementById('ch-search').value || '').toLowerCase();
    var rows = channels.filter(function (c) { return !q || c.name.toLowerCase().indexOf(q) > -1; });
    document.getElementById('ch-tbody').innerHTML = rows.map(function (c, i) {
      return '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td class="cell-strong">' + c.name + '</td>' +
        '<td><span class="badge ' + (c.ownership === 'Azura Stays' ? 'badge-info' : 'badge-neutral') + '">' + c.ownership + '</span></td>' +
        '<td>' + fmtDate(c.created_at) + '</td>' +
        '<td><div class="row-actions">' +
          '<button class="btn btn-ghost btn-sm" data-edit-ch="' + c.id + '">Edit</button>' +
          '<button class="btn btn-ghost btn-sm" data-delete-ch="' + c.id + '">Delete</button>' +
        '</div></td>' +
      '</tr>';
    }).join('');
    document.getElementById('ch-empty').hidden = rows.length > 0;
    document.getElementById('ch-result-count').textContent = rows.length + ' of ' + channels.length + ' channels';
  }

  document.getElementById('ch-search').addEventListener('input', render);
  document.getElementById('ch-clear-btn').addEventListener('click', function () { document.getElementById('ch-search').value = ''; render(); });

  var editingId = null;
  function resetForm() {
    document.getElementById('f-name').value = '';
    document.getElementById('f-ownership').value = '';
    document.getElementById('f-manager').value = '';
    Array.from(document.getElementById('f-bus').options).forEach(function (o) { o.selected = false; });
    document.getElementById('f-paid-to').value = '';
    document.getElementById('f-paid-out-type').value = '';
    document.getElementById('f-paid-out').value = '';
    document.getElementById('f-received').value = '';
    document.querySelectorAll('#channel-modal .form-group').forEach(function (g) { g.classList.remove('has-error'); });
  }

  document.getElementById('add-channel-btn').addEventListener('click', function () {
    editingId = null;
    resetForm();
    document.getElementById('ch-modal-title').textContent = 'Add Channel';
    document.getElementById('ch-save-btn').textContent = 'Save Channel';
    MM.openModal('channel-modal');
  });

  document.addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit-ch]');
    if (editBtn) {
      var rec = channels.filter(function (c) { return c.id === editBtn.getAttribute('data-edit-ch'); })[0];
      editingId = rec.id;
      resetForm();
      document.getElementById('f-name').value = rec.name;
      document.getElementById('f-ownership').value = rec.ownership;
      document.getElementById('f-manager').value = rec.manager || '';
      Array.from(document.getElementById('f-bus').options).forEach(function (o) { o.selected = rec.business_units.indexOf(o.value) > -1; });
      document.getElementById('f-paid-to').value = rec.paid_to || '';
      document.getElementById('f-paid-out-type').value = rec.paid_out_type || '';
      document.getElementById('f-paid-out').value = rec.paid_out != null ? rec.paid_out : '';
      document.getElementById('f-received').value = rec.received != null ? rec.received : '';
      document.getElementById('ch-modal-title').textContent = 'Edit Channel';
      document.getElementById('ch-save-btn').textContent = 'Update Channel';
      MM.openModal('channel-modal');
    }
    var delBtn = e.target.closest('[data-delete-ch]');
    if (delBtn) {
      editingId = delBtn.getAttribute('data-delete-ch');
      var recD = channels.filter(function (c) { return c.id === editingId; })[0];
      document.getElementById('del-ch-name').textContent = recD.name;
      MM.openModal('delete-channel-modal');
    }
  });

  var form = document.getElementById('ch-form');
  MM.bindFormValidation(form);

  document.getElementById('ch-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(form)) return;
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var selectedBus = Array.from(document.getElementById('f-bus').selectedOptions).map(function (o) { return o.value; });
      var data = {
        name: document.getElementById('f-name').value.trim(),
        ownership: document.getElementById('f-ownership').value,
        manager: document.getElementById('f-manager').value.trim(),
        business_units: selectedBus,
        paid_to: document.getElementById('f-paid-to').value,
        paid_out_type: document.getElementById('f-paid-out-type').value,
        paid_out: document.getElementById('f-paid-out').value ? Number(document.getElementById('f-paid-out').value) : null,
        received: document.getElementById('f-received').value ? Number(document.getElementById('f-received').value) : null
      };
      if (editingId) {
        channels = channels.map(function (c) { return c.id === editingId ? Object.assign({}, c, data) : c; });
      } else {
        data.id = MM.uid('ch');
        data.created_at = new Date().toISOString().slice(0, 10);
        channels.push(data);
      }
      save(channels);
      render();
      MM.closeModal('channel-modal');
      MM.showToast((editingId ? 'Updated' : 'Added') + ' channel successfully');
    });
  });

  document.getElementById('confirm-delete-ch-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Deleting...', function () {
      channels = channels.filter(function (c) { return c.id !== editingId; });
      save(channels);
      render();
      MM.closeModal('delete-channel-modal');
      MM.showToast('Channel deleted', { danger: true });
    });
  });

  render();
})();
