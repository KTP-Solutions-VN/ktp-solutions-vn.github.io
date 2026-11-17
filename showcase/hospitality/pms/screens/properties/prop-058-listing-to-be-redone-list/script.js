(function () {
  'use strict';

  var STORAGE_KEY = 'mm_prop_redo_requests_list';

  function readJSON(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; }
  }
  function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  var MOCK_REQUESTS = [
    { id: 'RD-01', villaId: 'PV-105', property: 'Villa Marble Cove', bu: 'Phuket Collection', channel: 'Booking.com', requestedBy: 'Kanya Srisawat', requestedDate: '2026-08-20', doneBy: null, doneDate: null, status: 'pending' },
    { id: 'RD-02', villaId: 'PV-107', property: 'Villa Golden Palm', bu: 'Koh Samui Estates', channel: 'Airbnb', requestedBy: 'Nok Pattaya', requestedDate: '2026-08-15', doneBy: null, doneDate: null, status: 'pending' },
    { id: 'RD-03', villaId: 'PV-104', property: 'Villa Azure Ridge', bu: 'Bali Retreats', channel: 'Agoda', requestedBy: 'Wayan Kertha', requestedDate: '2026-07-28', doneBy: null, doneDate: null, status: 'pending' },
    { id: 'RD-04', villaId: 'PV-105', property: 'Villa Marble Cove', bu: 'Phuket Collection', channel: 'Airbnb', requestedBy: 'Somchai Anuwat', requestedDate: '2026-06-20', doneBy: 'Phuket Frame Photography', doneDate: '2026-06-28', status: 'done' },
    { id: 'RD-05', villaId: 'PV-101', property: 'Villa Sapphire Cliff', bu: 'Phuket Collection', channel: 'Expedia', requestedBy: 'Somchai Anuwat', requestedDate: '2026-05-02', doneBy: 'Phuket Frame Photography', doneDate: '2026-05-10', status: 'done' }
  ];

  function getAll() {
    var overrides = readJSON(STORAGE_KEY, {});
    return MOCK_REQUESTS.map(function (r) { return overrides[r.id] ? Object.assign({}, r, overrides[r.id]) : r; })
      .filter(function (r) { return r.status !== 'cancelled'; });
  }

  var buFilter = document.getElementById('filter-bu');

  function render() {
    var bu = buFilter.value;
    var all = getAll().filter(function (r) { return !bu || r.bu === bu; });
    var pending = all.filter(function (r) { return r.status === 'pending'; }).sort(function (a, b) { return a.requestedDate.localeCompare(b.requestedDate); });
    var done = all.filter(function (r) { return r.status === 'done'; }).sort(function (a, b) { return b.doneDate.localeCompare(a.doneDate); });

    document.getElementById('result-count').textContent = all.length + ' redo requests';

    var pendingBody = document.getElementById('pending-tbody');
    var pendingEmpty = document.getElementById('pending-empty');
    if (!pending.length) { pendingBody.innerHTML = ''; pendingEmpty.hidden = false; }
    else {
      pendingEmpty.hidden = true;
      pendingBody.innerHTML = pending.map(function (r) {
        return '<tr><td class="cell-strong">' + r.property + '<div class="cell-sub">' + r.bu + '</div></td><td>' + r.channel + '</td><td>' + r.requestedBy + '</td><td class="cell-sub">' + r.requestedDate + '</td>' +
          '<td><div class="row-actions">' +
          '<button class="btn btn-primary btn-sm" data-done="' + r.id + '">Done</button>' +
          '<button class="btn btn-ghost btn-sm" data-cancel="' + r.id + '">Cancel</button>' +
          '<button class="btn btn-outline btn-sm" data-log="' + r.villaId + '|' + r.channel + '">Log</button>' +
          '</div></td></tr>';
      }).join('');
    }

    var doneBody = document.getElementById('done-tbody');
    var doneEmpty = document.getElementById('done-empty');
    if (!done.length) { doneBody.innerHTML = ''; doneEmpty.hidden = false; }
    else {
      doneEmpty.hidden = true;
      doneBody.innerHTML = done.map(function (r) {
        return '<tr><td class="cell-strong">' + r.property + '<div class="cell-sub">' + r.bu + '</div></td><td>' + r.channel + '</td><td>' + r.requestedBy + '</td><td class="cell-sub">' + r.requestedDate + '</td><td>' + r.doneBy + '</td><td class="cell-sub">' + r.doneDate + '</td>' +
          '<td><div class="row-actions"><button class="btn btn-outline btn-sm" data-log="' + r.villaId + '|' + r.channel + '">Log</button></div></td></tr>';
      }).join('');
    }
  }

  buFilter.addEventListener('change', render);

  function setOverride(id, patch) {
    var overrides = readJSON(STORAGE_KEY, {});
    overrides[id] = Object.assign({}, overrides[id], patch);
    saveJSON(STORAGE_KEY, overrides);
  }

  document.addEventListener('click', function (e) {
    var doneBtn = e.target.closest('[data-done]');
    if (doneBtn) {
      var id = doneBtn.getAttribute('data-done');
      var rec = getAll().filter(function (r) { return r.id === id; })[0];
      setOverride(id, { status: 'done', doneBy: 'Phuket Frame Photography', doneDate: new Date().toISOString().slice(0, 10) });
      MM.showToast('Marked "' + rec.property + '" (' + rec.channel + ') as redone.');
      render();
      return;
    }
    var cancelBtn = e.target.closest('[data-cancel]');
    if (cancelBtn) {
      var cid = cancelBtn.getAttribute('data-cancel');
      setOverride(cid, { status: 'cancelled' });
      MM.showToast('Redo request cancelled.', { danger: true });
      render();
      return;
    }
    var logBtn = e.target.closest('[data-log]');
    if (logBtn) {
      var parts = logBtn.getAttribute('data-log').split('|');
      openLog(parts[0], parts[1]);
    }
  });

  var MOCK_LOG = {
    'PV-105|Airbnb': [{ doneDate: '2026-06-28', doneBy: 'Phuket Frame Photography', requestedBy: 'Somchai Anuwat' }],
    'PV-101|Expedia': [{ doneDate: '2026-05-10', doneBy: 'Phuket Frame Photography', requestedBy: 'Somchai Anuwat' }]
  };

  function openLog(villaId, channel) {
    var key = villaId + '|' + channel;
    var log = MOCK_LOG[key] || [];
    var prop = MM.MOCK_PROPERTIES.filter(function (p) { return p.id === villaId; })[0];
    document.getElementById('redo-log-sub').textContent = (prop ? prop.name : villaId) + ' — ' + channel;
    var tbody = document.getElementById('redo-log-tbody');
    var empty = document.getElementById('redo-log-empty');
    if (!log.length) { tbody.innerHTML = ''; empty.hidden = false; }
    else {
      empty.hidden = true;
      tbody.innerHTML = log.map(function (l) { return '<tr><td class="cell-sub">' + l.doneDate + '</td><td>' + l.doneBy + '</td><td>' + l.requestedBy + '</td></tr>'; }).join('');
    }
    MM.openModal('redo-log-modal');
  }

  render();
})();
