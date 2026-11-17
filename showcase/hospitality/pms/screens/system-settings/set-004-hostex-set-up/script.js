(function () {
  'use strict';
  var STORAGE_KEY = 'mm_set_hostex_accounts';

  var CHANNELS = [
    { id: 'ch1', name: 'Booking.com', otaAccounts: ['BDC-Main', 'BDC-Bali'] },
    { id: 'ch2', name: 'Airbnb', otaAccounts: ['ABB-Main'] },
    { id: 'ch3', name: 'Agoda', otaAccounts: ['AGD-Main', 'AGD-Samui'] }
  ];

  var BASE_ACCOUNTS = [
    { id: 'hx1', channel: 'ch1', email: 'reservations@azurastays.example', otaAccount: 'BDC-Main', owner: 'azurastays', props: 5 },
    { id: 'hx2', channel: 'ch1', email: 'bali-ops@azurastays.example', otaAccount: 'BDC-Bali', owner: 'agency', agencyName: 'Aegean Retreats', props: 2 },
    { id: 'hx3', channel: 'ch2', email: 'reservations@azurastays.example', otaAccount: 'ABB-Main', owner: 'azurastays', props: 6 },
    { id: 'hx4', channel: 'ch3', email: 'reservations@azurastays.example', otaAccount: 'AGD-Main', owner: 'azurastays', props: 0 }
  ];

  var editingAccountId = null;
  var pendingDeleteId = null;

  function accountsFor(channelId) {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    return BASE_ACCOUNTS.filter(function (a) { return a.channel === channelId && hidden.indexOf(a.id) === -1; })
      .concat(stored.filter(function (a) { return a.channel === channelId; }));
  }

  function ownerBadge(acc) {
    return acc.owner === 'agency'
      ? '<span class="badge badge-neutral">Agency &middot; ' + (acc.agencyName || '') + '</span>'
      : '<span class="badge badge-info">Azura Stays</span>';
  }

  function render() {
    var container = document.getElementById('channels-container');
    container.innerHTML = CHANNELS.map(function (ch) {
      var accounts = accountsFor(ch.id);
      var rows = accounts.length ? accounts.map(function (a) {
        return '<tr><td class="cell-strong">' + a.email + '</td>' +
          '<td><select data-ota-select="' + a.id + '">' + ch.otaAccounts.map(function (o) { return '<option' + (o === a.otaAccount ? ' selected' : '') + '>' + o + '</option>'; }).join('') + '</select></td>' +
          '<td>' + ownerBadge(a) + '</td>' +
          '<td>' + (a.props > 0 ? '<span class="props-link" data-toggle-props="' + a.id + '">' + a.props + ' propert' + (a.props === 1 ? 'y' : 'ies') + '</span>' : '<span class="text-muted">None yet</span>') + '</td>' +
          '<td class="row-actions">' +
            '<button class="btn btn-ghost btn-sm" data-edit-account="' + a.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
            '<button class="btn btn-ghost btn-sm" data-delete-account="' + a.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>' +
          '</td></tr>' +
          '<tr class="props-expand" id="props-' + a.id + '"><td colspan="5">' + (MM.MOCK_PROPERTIES.slice(0, a.props).map(function (p) { return p.name; }).join(', ') || '') + '</td></tr>';
      }).join('') : '<tr><td colspan="5" class="text-muted text-sm">No account mapped — ' + ch.name + ' bookings arriving from Hostex cannot be matched to a property.</td></tr>';

      return '<div class="card channel-card">' +
        '<div class="card__header"><div><h3>' + ch.name + '</h3></div><button class="btn btn-outline btn-sm" data-add-account="' + ch.id + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Add account</button></div>' +
        '<div class="card__body">' +
          '<div class="table-wrap"><table class="data-table"><thead><tr><th>Account Email/Name</th><th>OTA Account</th><th>Owner</th><th>Properties Linked</th><th style="text-align:right;">Actions</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
          '<div class="channel-card__inline-form" id="inline-form-' + ch.id + '">' +
            '<div class="form-grid">' +
              '<div class="form-group"><label>Account Email or Name<span class="req">*</span></label><input type="text" id="inline-email-' + ch.id + '" placeholder="e.g. team@azurastays.example"></div>' +
              '<div class="form-group"><label>OTA Account</label><select id="inline-ota-' + ch.id + '">' + ch.otaAccounts.map(function (o) { return '<option>' + o + '</option>'; }).join('') + '</select></div>' +
              '<div class="form-group"><label>Owner</label><select id="inline-owner-' + ch.id + '"><option value="azurastays">Azura Stays</option><option value="agency">Agency</option></select></div>' +
              '<div class="form-group"><label>Agency</label><select id="inline-agency-' + ch.id + '" disabled><option>Andaman Villas Group</option><option>Aegean Retreats</option></select></div>' +
            '</div>' +
            '<div class="flex-gap-8" style="margin-top:12px;"><button class="btn btn-primary btn-sm" data-save-inline="' + ch.id + '">Save Account</button><button class="btn btn-ghost btn-sm" data-cancel-inline="' + ch.id + '">Cancel</button></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }
  render();

  document.getElementById('channels-container').addEventListener('change', function (e) {
    if (e.target.matches('[id^="inline-owner-"]')) {
      var chId = e.target.id.replace('inline-owner-', '');
      document.getElementById('inline-agency-' + chId).disabled = e.target.value !== 'agency';
    }
    if (e.target.matches('[data-ota-select]')) {
      MM.showToast('OTA account updated');
    }
  });

  document.getElementById('channels-container').addEventListener('click', function (e) {
    var addBtn = e.target.closest('[data-add-account]');
    var saveBtn = e.target.closest('[data-save-inline]');
    var cancelBtn = e.target.closest('[data-cancel-inline]');
    var toggleProps = e.target.closest('[data-toggle-props]');
    var editBtn = e.target.closest('[data-edit-account]');
    var delBtn = e.target.closest('[data-delete-account]');

    if (addBtn) {
      document.getElementById('inline-form-' + addBtn.dataset.addAccount).classList.toggle('open');
    }
    if (cancelBtn) {
      document.getElementById('inline-form-' + cancelBtn.dataset.cancelInline).classList.remove('open');
    }
    if (toggleProps) {
      document.getElementById('props-' + toggleProps.dataset.toggleProps).classList.toggle('open');
    }
    if (editBtn) {
      MM.showToast('Editing loads the account into the inline form above (demo simplified).');
    }
    if (saveBtn) {
      var chId = saveBtn.dataset.saveInline;
      var email = document.getElementById('inline-email-' + chId).value.trim();
      if (!email) { MM.showToast('Account email or name is required', { danger: true }); return; }
      MM.simulateSave(saveBtn, 'Saving...', function () {
        var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        var owner = document.getElementById('inline-owner-' + chId).value;
        stored.push({
          id: MM.uid('hx'), channel: chId, email: email,
          otaAccount: document.getElementById('inline-ota-' + chId).value,
          owner: owner, agencyName: owner === 'agency' ? document.getElementById('inline-agency-' + chId).value : null,
          props: 0
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        MM.showToast('Hostex account saved');
        render();
      });
    }
    if (delBtn) {
      var id = delBtn.dataset.deleteAccount;
      var all = BASE_ACCOUNTS.concat(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
      var acc = all.find(function (a) { return a.id === id; });
      if (!acc) return;
      if (acc.props > 0) {
        document.getElementById('warn-text').textContent = 'Cannot delete: ' + acc.props + ' propert' + (acc.props === 1 ? 'y' : 'ies') + ' still use this account.';
        MM.openModal('warn-modal');
        return;
      }
      pendingDeleteId = id;
      document.getElementById('del-account-email').textContent = acc.email;
      MM.openModal('delete-account-modal');
    }
  });

  document.getElementById('confirm-delete-account-btn').addEventListener('click', function () {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter(function (a) { return a.id !== pendingDeleteId; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    if (BASE_ACCOUNTS.some(function (a) { return a.id === pendingDeleteId; })) { hidden.push(pendingDeleteId); localStorage.setItem(STORAGE_KEY + '_hidden', JSON.stringify(hidden)); }
    MM.closeModal('delete-account-modal');
    MM.showToast('Hostex account deleted', { danger: true });
    render();
  });
})();
