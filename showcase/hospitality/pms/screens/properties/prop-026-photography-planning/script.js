(function () {
  'use strict';

  var SHOOTS_KEY = 'mm_prop_photo_shoots';
  var FOLLOWUPS_KEY = 'mm_prop_photo_followups';
  var SHOOTS_DELETED_KEY = 'mm_prop_photo_shoots_deleted';
  var FOLLOWUPS_DELETED_KEY = 'mm_prop_photo_followups_deleted';

  var MOCK_SHOOTS = [
    { id: 'SH-01', property: 'Villa Marble Cove', bu: 'Sentosa Collection', scope: 'Property', objective: 'Initial listing', date: '2026-09-03', status: 'scheduled', notes: '' },
    { id: 'SH-02', property: 'Villa Golden Palm', bu: 'Noosa Estates', scope: 'Property', objective: 'Catch-up shoot', date: '2026-09-08', status: 'confirmed', notes: 'Photographer to bring drone for exterior shots.' },
    { id: 'SH-03', property: 'Villa Turquoise Reef', bu: 'Sentosa Collection', scope: 'Property', objective: 'Seasonal refresh', date: '2026-08-14', status: 'completed', notes: '' },
    { id: 'SH-04', property: 'Villa Sapphire Cliff', bu: 'Sentosa Collection', scope: 'Property', objective: 'Seasonal refresh', date: '2026-10-02', status: 'scheduled', notes: '' },
    { id: 'SH-05', property: 'Villa Palm Residence — Unit 3', bu: 'Byron Bay Retreats', scope: 'Unit', objective: 'Initial listing', date: '2026-09-19', status: 'confirmed', notes: '' },
    { id: 'SH-06', property: 'Villa Orchid Rise', bu: 'Byron Bay Retreats', scope: 'Property', objective: 'Renovation update', date: '2026-07-30', status: 'completed', notes: '' }
  ];

  var MOCK_FOLLOWUPS = [
    { id: 'FU-01', property: 'Villa Azure Ridge', bu: 'Byron Bay Retreats', note: 'Re-shoot the living room — natural light was too dim.', due: '2026-09-05', status: 'open' },
    { id: 'FU-02', property: 'Villa Amber Cove', bu: 'Noosa Estates', note: 'Add missing garden/exterior angle to the set.', due: '2026-09-10', status: 'open' },
    { id: 'FU-03', property: 'Villa Turquoise Reef', bu: 'Sentosa Collection', note: 'Confirm final edited set with owner before publishing.', due: '2026-08-28', status: 'open' }
  ];

  function loadList(mockList, storageKey, deletedKey) {
    var extra = []; try { extra = JSON.parse(localStorage.getItem(storageKey)) || []; } catch (e) {}
    var deleted = []; try { deleted = JSON.parse(localStorage.getItem(deletedKey)) || []; } catch (e) {}
    var overrides = {};
    extra.forEach(function (o) { if (o.__override) overrides[o.id] = o; });
    var merged = mockList.map(function (m) { return overrides[m.id] ? Object.assign({}, m, overrides[m.id]) : m; });
    var added = extra.filter(function (o) { return !o.__override; });
    return merged.concat(added).filter(function (r) { return deleted.indexOf(r.id) === -1; });
  }

  function saveOverride(storageKey, record) {
    var extra = []; try { extra = JSON.parse(localStorage.getItem(storageKey)) || []; } catch (e) {}
    extra = extra.filter(function (o) { return o.id !== record.id; });
    extra.push(Object.assign({ __override: true }, record));
    localStorage.setItem(storageKey, JSON.stringify(extra));
  }

  function saveNew(storageKey, record) {
    var extra = []; try { extra = JSON.parse(localStorage.getItem(storageKey)) || []; } catch (e) {}
    extra.push(record);
    localStorage.setItem(storageKey, JSON.stringify(extra));
  }

  function markDeleted(deletedKey, id) {
    var deleted = []; try { deleted = JSON.parse(localStorage.getItem(deletedKey)) || []; } catch (e) {}
    deleted.push(id);
    localStorage.setItem(deletedKey, JSON.stringify(deleted));
  }

  var buFilter = document.getElementById('bu-filter');
  var shootsBody = document.getElementById('shoots-tbody');
  var followupsBody = document.getElementById('followups-tbody');
  var statusBadge = { scheduled: 'badge-info', confirmed: 'badge-warning', completed: 'badge-success', open: 'badge-warning', done: 'badge-success' };

  function renderShoots() {
    var bu = buFilter.value;
    var all = loadList(MOCK_SHOOTS, SHOOTS_KEY, SHOOTS_DELETED_KEY).filter(function (s) { return !bu || s.bu === bu; });
    document.getElementById('stat-scheduled').textContent = all.filter(function (s) { return s.status === 'scheduled'; }).length;
    document.getElementById('stat-confirmed').textContent = all.filter(function (s) { return s.status === 'confirmed'; }).length;
    document.getElementById('stat-completed').textContent = all.filter(function (s) { return s.status === 'completed'; }).length;
    document.getElementById('shoot-result-count').textContent = all.length + ' shoots';

    shootsBody.innerHTML = all.length ? all.map(function (s) {
      var confirmBtn = s.status !== 'completed' ? '<button class="btn btn-ghost btn-sm" data-confirm-shoot="' + s.id + '">' + (s.status === 'scheduled' ? 'Confirm' : 'Mark Complete') + '</button>' : '';
      return '<tr>' +
        '<td class="cell-strong">' + s.property + '<div class="cell-sub">' + s.bu + '</div></td>' +
        '<td>' + s.scope + '</td>' +
        '<td>' + s.objective + '</td>' +
        '<td class="cell-sub">' + s.date + '</td>' +
        '<td><span class="badge ' + statusBadge[s.status] + '">' + s.status + '</span></td>' +
        '<td><div class="row-actions-inline">' + confirmBtn +
          '<button class="btn btn-outline btn-sm" data-edit-shoot="' + s.id + '">Edit</button>' +
          '<button class="btn btn-ghost btn-sm" data-delete="shoot:' + s.id + '" data-delete-label="' + s.property + '\'s shoot on ' + s.date + '">Delete</button>' +
        '</div></td></tr>';
    }).join('') : '<tr><td colspan="6"><div class="empty-state" style="padding:24px 0;"><h3>No shoots scheduled</h3><p>Add a new photo shoot to get started.</p></div></td></tr>';
  }

  function renderFollowups() {
    var bu = buFilter.value;
    var all = loadList(MOCK_FOLLOWUPS, FOLLOWUPS_KEY, FOLLOWUPS_DELETED_KEY).filter(function (f) { return !bu || f.bu === bu; });
    document.getElementById('stat-followups').textContent = all.filter(function (f) { return f.status === 'open'; }).length;

    followupsBody.innerHTML = all.length ? all.map(function (f) {
      var completeBtn = f.status === 'open' ? '<button class="btn btn-ghost btn-sm" data-complete-followup="' + f.id + '">Mark Complete</button>' : '';
      return '<tr>' +
        '<td class="cell-strong">' + f.property + '</td>' +
        '<td>' + f.note + '</td>' +
        '<td class="cell-sub">' + f.due + '</td>' +
        '<td><span class="badge ' + statusBadge[f.status === 'open' ? 'open' : 'done'] + '">' + (f.status === 'open' ? 'Open' : 'Done') + '</span></td>' +
        '<td><div class="row-actions-inline">' + completeBtn +
          '<button class="btn btn-ghost btn-sm" data-delete="followup:' + f.id + '" data-delete-label="the follow-up for ' + f.property + '">Delete</button>' +
        '</div></td></tr>';
    }).join('') : '<tr><td colspan="5"><div class="empty-state" style="padding:24px 0;"><h3>No open follow-ups</h3><p>Nice work — everything from recent shoots has been resolved.</p></div></td></tr>';
  }

  function renderAll() { renderShoots(); renderFollowups(); }
  buFilter.addEventListener('change', renderAll);

  /* Edit shoot modal */
  var shootForm = document.getElementById('shoot-form');
  MM.bindFormValidation(shootForm);
  var editingShootId = null;

  shootsBody.addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit-shoot]');
    if (editBtn) {
      var id = editBtn.getAttribute('data-edit-shoot');
      var rec = loadList(MOCK_SHOOTS, SHOOTS_KEY, SHOOTS_DELETED_KEY).filter(function (s) { return s.id === id; })[0];
      if (!rec) return;
      editingShootId = id;
      document.getElementById('shoot-modal-sub').textContent = rec.property;
      document.getElementById('shoot-scope').value = rec.scope;
      document.getElementById('shoot-objective').value = rec.objective;
      document.getElementById('shoot-date').value = rec.date;
      document.getElementById('shoot-status').value = rec.status;
      document.getElementById('shoot-notes').value = rec.notes || '';
      MM.openModal('shoot-modal');
      return;
    }
    var confirmBtn = e.target.closest('[data-confirm-shoot]');
    if (confirmBtn) {
      var cid = confirmBtn.getAttribute('data-confirm-shoot');
      var crec = loadList(MOCK_SHOOTS, SHOOTS_KEY, SHOOTS_DELETED_KEY).filter(function (s) { return s.id === cid; })[0];
      crec.status = crec.status === 'scheduled' ? 'confirmed' : 'completed';
      saveOverride(SHOOTS_KEY, crec);
      MM.showToast(crec.status === 'confirmed' ? 'Shoot confirmed.' : 'Photo set marked complete.');
      renderShoots();
    }
  });

  document.getElementById('shoot-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(shootForm)) return;
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var rec = loadList(MOCK_SHOOTS, SHOOTS_KEY, SHOOTS_DELETED_KEY).filter(function (s) { return s.id === editingShootId; })[0];
      rec.scope = document.getElementById('shoot-scope').value;
      rec.objective = document.getElementById('shoot-objective').value;
      rec.date = document.getElementById('shoot-date').value;
      rec.status = document.getElementById('shoot-status').value;
      rec.notes = document.getElementById('shoot-notes').value;
      saveOverride(SHOOTS_KEY, rec);
      MM.closeModal('shoot-modal');
      MM.showToast('Shoot schedule updated.');
      renderShoots();
    });
  });

  /* Follow-up modal */
  var followupForm = document.getElementById('followup-form');
  MM.bindFormValidation(followupForm);

  document.getElementById('add-followup-btn').addEventListener('click', function () {
    var select = document.getElementById('followup-property');
    var props = loadList(MOCK_SHOOTS, SHOOTS_KEY, SHOOTS_DELETED_KEY);
    select.innerHTML = props.map(function (s) { return '<option value="' + s.property + '|' + s.bu + '">' + s.property + '</option>'; }).join('');
    followupForm.reset();
    MM.openModal('followup-modal');
  });

  document.getElementById('followup-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(followupForm)) return;
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var propParts = document.getElementById('followup-property').value.split('|');
      saveNew(FOLLOWUPS_KEY, {
        id: MM.uid('FU'), property: propParts[0], bu: propParts[1],
        note: document.getElementById('followup-note').value.trim(),
        due: document.getElementById('followup-due').value, status: 'open'
      });
      MM.closeModal('followup-modal');
      MM.showToast('Follow-up recorded.');
      renderFollowups();
    });
  });

  followupsBody.addEventListener('click', function (e) {
    var completeBtn = e.target.closest('[data-complete-followup]');
    if (completeBtn) {
      var id = completeBtn.getAttribute('data-complete-followup');
      var rec = loadList(MOCK_FOLLOWUPS, FOLLOWUPS_KEY, FOLLOWUPS_DELETED_KEY).filter(function (f) { return f.id === id; })[0];
      rec.status = 'done';
      saveOverride(FOLLOWUPS_KEY, rec);
      MM.showToast('Follow-up marked complete.');
      renderFollowups();
    }
  });

  /* Shared delete confirmation */
  var pendingDelete = null;
  document.addEventListener('click', function (e) {
    var delBtn = e.target.closest('[data-delete]');
    if (!delBtn) return;
    pendingDelete = delBtn.getAttribute('data-delete');
    document.getElementById('delete-confirm-text').textContent = 'Delete ' + delBtn.getAttribute('data-delete-label') + '? This cannot be undone.';
    MM.openModal('delete-modal');
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    if (!pendingDelete) return;
    var parts = pendingDelete.split(':');
    if (parts[0] === 'shoot') { markDeleted(SHOOTS_DELETED_KEY, parts[1]); renderShoots(); }
    else { markDeleted(FOLLOWUPS_DELETED_KEY, parts[1]); renderFollowups(); }
    MM.closeModal('delete-modal');
    MM.showToast('Record deleted.', { danger: true });
    pendingDelete = null;
  });

  /* Guideline downloads (simulated) */
  document.querySelectorAll('[data-download-guideline]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      MM.simulateSave(btn, 'Preparing...', function () {
        MM.showToast('"' + btn.getAttribute('data-download-guideline') + '" downloaded.');
      });
    });
  });

  renderAll();
})();
