(function () {
  'use strict';
  var editingId = null;
  function platformsData() {
    var base = [{ id: 'pl1', name: 'Booking.com', commission: 15 }, { id: 'pl2', name: 'Airbnb', commission: 14 }, { id: 'pl3', name: 'Agoda', commission: 16 }];
    var stored = JSON.parse(localStorage.getItem('mm_bu_platforms') || '[]');
    return base.concat(stored);
  }
  function renderPlatforms() {
    document.getElementById('platforms-tbody').innerHTML = platformsData().map(function (p) {
      return '<tr><td class="cell-strong">' + p.name + '</td><td class="cell-num">' + p.commission + '%</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit-platform="' + p.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button></td></tr>';
    }).join('');
  }
  renderPlatforms();

  document.getElementById('accounts-tbody').innerHTML = [
    { platform: 'Booking.com', account: 'reservations@azurastays.example', bu: 'Phuket Collection' },
    { platform: 'Airbnb', account: 'reservations@azurastays.example', bu: 'Bali Retreats' }
  ].map(function (a) { return '<tr><td class="cell-strong">' + a.platform + '</td><td>' + a.account + '</td><td class="cell-sub">' + a.bu + '</td></tr>'; }).join('');

  document.getElementById('content-tbody').innerHTML = [
    { name: 'Standard House Rules', applies: 'All channels' },
    { name: 'Cancellation Policy — Flexible', applies: 'Booking.com, Airbnb' }
  ].map(function (c) { return '<tr><td class="cell-strong">' + c.name + '</td><td class="cell-sub">' + c.applies + '</td></tr>'; }).join('');

  document.getElementById('add-platform-btn').addEventListener('click', function () {
    editingId = null;
    document.getElementById('platform-form').reset();
    MM.openModal('platform-modal');
  });
  document.getElementById('platforms-tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-edit-platform]');
    if (!btn) return;
    var p = platformsData().find(function (d) { return d.id === btn.dataset.editPlatform; });
    editingId = p.id;
    document.getElementById('f-name').value = p.name;
    document.getElementById('f-commission').value = p.commission;
    MM.openModal('platform-modal');
  });
  document.getElementById('save-platform-btn').addEventListener('click', function () {
    var form = document.getElementById('platform-form');
    if (!MM.validateForm(form)) return;
    MM.simulateSave(this, 'Saving...', function () {
      var stored = JSON.parse(localStorage.getItem('mm_bu_platforms') || '[]');
      stored.push({ id: editingId || MM.uid('pl'), name: document.getElementById('f-name').value.trim(), commission: parseFloat(document.getElementById('f-commission').value) || 0 });
      localStorage.setItem('mm_bu_platforms', JSON.stringify(stored));
      MM.closeModal('platform-modal');
      MM.showToast('Platform saved');
      renderPlatforms();
    });
  });
})();
