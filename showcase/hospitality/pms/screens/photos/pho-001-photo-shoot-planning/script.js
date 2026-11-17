(function () {
  'use strict';

  var PHOTOGRAPHERS = ['Phuket Frame Photography', 'Andaman Pool Services', 'Bali Lens Studio', 'Samui Coastal Shots'];
  var OBJECTIVES = ['OTA refresh', 'Full new set', 'Pool + drone extras', 'Owner set', 'Seasonal update'];
  var FOLLOWUP_TYPES = ['Quality', 'Coverage', 'Resolution', 'Missing Area'];
  var UNITS = [
    { id: 'UNT-01', name: 'Villa Sapphire Cliff — Master Suite' },
    { id: 'UNT-02', name: 'Villa Lotus Bay — Garden Room' },
    { id: 'UNT-03', name: 'Villa Amber Ridge — Ocean View Room' }
  ];

  function fillSelect(el, options, placeholder) {
    el.innerHTML = (placeholder ? '<option value="">' + placeholder + '</option>' : '') + options.map(function (o) { return '<option>' + o + '</option>'; }).join('');
  }

  var bus = MM.MOCK_PROPERTIES.map(function (p) { return p.bu; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
  fillSelect(document.getElementById('bu-filter'), bus, 'All Business Units / Zones');
  document.getElementById('property-select').innerHTML = '<option value="">Select a property</option>' + MM.MOCK_PROPERTIES.map(function (p) { return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
  document.getElementById('residence-select').innerHTML = '<option value="">Select a residence</option>' + PHO.RESIDENCES.map(function (r) { return '<option value="' + r.id + '">' + r.name + '</option>'; }).join('');
  document.getElementById('unit-select').innerHTML = '<option value="">Select a unit</option>' + UNITS.map(function (u) { return '<option value="' + u.id + '">' + u.name + '</option>'; }).join('');
  fillSelect(document.getElementById('photographer-select'), PHOTOGRAPHERS, 'Select photographer');
  fillSelect(document.getElementById('objective-select'), OBJECTIVES, 'Select objective');
  fillSelect(document.getElementById('fu-type'), FOLLOWUP_TYPES, 'Select type');

  function nameForVilla(id) {
    var p = MM.MOCK_PROPERTIES.filter(function (x) { return x.id === id; })[0];
    return p ? p.name : id;
  }

  function getHidden() { return JSON.parse(localStorage.getItem('mm_pho_shoots_hidden') || '[]'); }
  function getExtra() { return JSON.parse(localStorage.getItem('mm_pho_shoots') || '[]'); }
  function saveExtra(list) { localStorage.setItem('mm_pho_shoots', JSON.stringify(list)); }
  function getAll() {
    var hidden = getHidden();
    return PHO.SHOOTS.filter(function (s) { return hidden.indexOf(s.id) === -1; }).concat(getExtra());
  }
  function findShoot(id) { return getAll().filter(function (s) { return s.id === id; })[0]; }

  function statusBadge(status) {
    var map = { scheduled: ['info', 'Scheduled'], delivered: ['success', 'Delivered'] };
    var m = map[status] || ['neutral', status];
    return '<span class="badge badge-' + m[0] + '">' + m[1] + '</span>';
  }

  function render() {
    var bu = document.getElementById('bu-filter').value;
    var all = getAll().filter(function (s) {
      if (!bu) return true;
      var p = MM.MOCK_PROPERTIES.filter(function (x) { return x.id === s.villaId; })[0];
      return p && p.bu === bu;
    });

    document.getElementById('shoot-count-sub').textContent = all.length + ' shoot plan' + (all.length === 1 ? '' : 's');
    document.getElementById('shoot-tbody').innerHTML = all.length ? all.map(function (s) {
      return '<tr><td class="cell-strong">' + nameForVilla(s.villaId) + '</td><td>' + s.photographer + '</td><td>' + s.date + '</td><td>' + s.objective + '</td><td>' + statusBadge(s.status) + '</td><td class="text-sm text-muted">' + (s.comment ? s.comment.slice(0, 40) + (s.comment.length > 40 ? '…' : '') : '—') + '</td>' +
        '<td style="text-align:right;"><button class="btn btn-ghost btn-sm" data-edit="' + s.id + '">Edit</button> <button class="btn btn-ghost btn-sm" data-followup="' + s.id + '">Follow-up</button> <button class="btn btn-ghost btn-sm" data-delete="' + s.id + '">Delete</button></td></tr>';
    }).join('') : '<tr><td colspan="7"><div class="empty-state"><p>No shoot plans yet.</p></div></td></tr>';

    var followups = PHO.FOLLOWUPS.filter(function (f) {
      if (!bu) return true;
      var p = MM.MOCK_PROPERTIES.filter(function (x) { return x.id === f.villaId; })[0];
      return p && p.bu === bu;
    });
    document.getElementById('followup-tbody').innerHTML = followups.length ? followups.map(function (f, i) {
      return '<tr><td>' + (i + 1) + '</td><td>' + nameForVilla(f.villaId) + '</td><td>' + f.required + '</td><td>' + f.date + '</td><td style="text-align:right;"><button class="btn btn-ghost btn-sm" data-followup-villa="' + f.villaId + '">Resolve</button></td></tr>';
    }).join('') : '<tr><td colspan="5"><div class="empty-state"><p>No follow-ups required.</p></div></td></tr>';

    var commented = all.filter(function (s) { return s.comment; });
    document.getElementById('comment-tbody').innerHTML = commented.length ? commented.map(function (s, i) {
      return '<tr><td>' + (i + 1) + '</td><td>' + nameForVilla(s.villaId) + '</td><td class="text-sm">' + s.comment + '</td><td>' + s.date + '</td><td style="text-align:right;"><button class="btn btn-ghost btn-sm" data-edit="' + s.id + '">View</button></td></tr>';
    }).join('') : '<tr><td colspan="5"><div class="empty-state"><p>No comments logged.</p></div></td></tr>';
  }

  document.getElementById('bu-filter').addEventListener('change', render);

  /* ---- Type switching ---- */
  function updateTypeGroups() {
    var type = document.getElementById('entry-level-select').value;
    document.getElementById('villa-group').style.display = type === 'villa' ? '' : 'none';
    document.getElementById('residence-group').style.display = type === 'residence' ? '' : 'none';
    document.getElementById('unit-group').style.display = type === 'unit' ? '' : 'none';
  }
  document.getElementById('entry-level-select').addEventListener('change', updateTypeGroups);
  updateTypeGroups();

  /* ---- Add/Edit shoot form ---- */
  var editingId = null;
  var shoutForm = document.getElementById('shoot-form');
  MM.bindFormValidation(shoutForm);

  function resetForm() {
    editingId = null;
    document.getElementById('form-title').textContent = 'New Shoot Plan';
    shoutForm.reset();
    updateTypeGroups();
    document.getElementById('shoot-delete-btn').hidden = true;
  }

  function openEdit(id) {
    var s = findShoot(id);
    if (!s) return;
    editingId = id;
    document.getElementById('form-title').textContent = 'Edit Shoot Plan';
    document.getElementById('entry-level-select').value = 'villa';
    updateTypeGroups();
    document.getElementById('property-select').value = s.villaId;
    document.getElementById('photographer-select').value = s.photographer;
    document.getElementById('planned-date').value = s.date;
    document.getElementById('objective-select').value = s.objective;
    document.getElementById('comment-input').value = s.comment || '';
    document.getElementById('shoot-delete-btn').hidden = false;
    document.getElementById('shoot-form-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.getElementById('new-shoot-btn').addEventListener('click', resetForm);
  document.getElementById('shoot-cancel-btn').addEventListener('click', resetForm);

  document.getElementById('shoot-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(shoutForm)) return;
    var type = document.getElementById('entry-level-select').value;
    var villaId = type === 'villa' ? document.getElementById('property-select').value : (type === 'residence' ? document.getElementById('residence-select').value : document.getElementById('unit-select').value);
    if (type === 'villa' && !villaId) { MM.showToast('Please select a property', { danger: true }); return; }
    MM.simulateSave(document.getElementById('shoot-save-btn'), 'Saving...', function () {
      var payload = {
        villaId: villaId || MM.MOCK_PROPERTIES[0].id,
        photographer: document.getElementById('photographer-select').value,
        date: document.getElementById('planned-date').value,
        objective: document.getElementById('objective-select').value,
        status: 'scheduled',
        comment: document.getElementById('comment-input').value.trim()
      };
      if (editingId) {
        var isSeed = PHO.SHOOTS.some(function (s) { return s.id === editingId; });
        if (isSeed) {
          var idx = PHO.SHOOTS.findIndex(function (s) { return s.id === editingId; });
          PHO.SHOOTS[idx] = Object.assign({}, PHO.SHOOTS[idx], payload);
        } else {
          var extra = getExtra();
          var ei = extra.findIndex(function (s) { return s.id === editingId; });
          if (ei !== -1) { extra[ei] = Object.assign({}, extra[ei], payload); saveExtra(extra); }
        }
        MM.showToast('Shoot plan updated');
      } else {
        payload.id = MM.uid('sht');
        var stored = getExtra();
        stored.push(payload);
        saveExtra(stored);
        MM.showToast('Shoot plan created');
      }
      resetForm();
      render();
    });
  });

  var pendingDeleteId = null;
  document.getElementById('shoot-delete-btn').addEventListener('click', function () {
    if (!editingId) return;
    pendingDeleteId = editingId;
    document.getElementById('del-shoot-name').textContent = nameForVilla(findShoot(editingId).villaId);
    MM.openModal('delete-shoot-modal');
  });

  document.addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    if (editBtn) { openEdit(editBtn.getAttribute('data-edit')); return; }
    var delBtn = e.target.closest('[data-delete]');
    if (delBtn) {
      pendingDeleteId = delBtn.getAttribute('data-delete');
      document.getElementById('del-shoot-name').textContent = nameForVilla(findShoot(pendingDeleteId).villaId);
      MM.openModal('delete-shoot-modal');
      return;
    }
    var fuBtn = e.target.closest('[data-followup]');
    if (fuBtn) { openFollowup(fuBtn.getAttribute('data-followup')); return; }
    var fuVillaBtn = e.target.closest('[data-followup-villa]');
    if (fuVillaBtn) {
      var villaId = fuVillaBtn.getAttribute('data-followup-villa');
      var shoot = getAll().filter(function (s) { return s.villaId === villaId; })[0];
      if (shoot) openFollowup(shoot.id);
    }
  });

  document.getElementById('confirm-delete-shoot-btn').addEventListener('click', function () {
    if (!pendingDeleteId) return;
    var isSeed = PHO.SHOOTS.some(function (s) { return s.id === pendingDeleteId; });
    if (isSeed) {
      var hidden = getHidden();
      hidden.push(pendingDeleteId);
      localStorage.setItem('mm_pho_shoots_hidden', JSON.stringify(hidden));
    } else {
      saveExtra(getExtra().filter(function (s) { return s.id !== pendingDeleteId; }));
    }
    pendingDeleteId = null;
    MM.closeModal('delete-shoot-modal');
    MM.showToast('Shoot plan deleted');
    resetForm();
    render();
  });

  /* ---- Follow-up modal ---- */
  var fuShootId = null, fuResult = null;
  var followupForm = document.getElementById('followup-form');
  MM.bindFormValidation(followupForm);

  function openFollowup(shootId) {
    fuShootId = shootId;
    fuResult = null;
    document.getElementById('fu-adequate-btn').classList.remove('active');
    document.getElementById('fu-followup-btn').classList.remove('active');
    document.getElementById('fu-result-error').textContent = '';
    followupForm.reset();
    var s = findShoot(shootId);
    document.getElementById('fu-property-label').textContent = s ? nameForVilla(s.villaId) : '';
    MM.openModal('followup-modal');
  }

  document.getElementById('fu-adequate-btn').addEventListener('click', function () {
    fuResult = 'adequate';
    this.classList.add('active');
    document.getElementById('fu-followup-btn').classList.remove('active');
  });
  document.getElementById('fu-followup-btn').addEventListener('click', function () {
    fuResult = 'followup';
    this.classList.add('active');
    document.getElementById('fu-adequate-btn').classList.remove('active');
  });

  document.getElementById('fu-save-btn').addEventListener('click', function () {
    if (!fuResult) { document.getElementById('fu-result-error').textContent = 'Please select a photo set result.'; return; }
    if (!MM.validateForm(followupForm)) return;
    MM.simulateSave(document.getElementById('fu-save-btn'), 'Saving...', function () {
      var note = document.getElementById('fu-short-note').value.trim();
      var status = fuResult === 'adequate' ? 'delivered' : 'scheduled';
      var comment = note || (fuResult === 'adequate' ? 'Delivery confirmed adequate.' : 'Follow-up logged.');
      var isSeed = PHO.SHOOTS.some(function (s) { return s.id === fuShootId; });
      if (isSeed) {
        var idx = PHO.SHOOTS.findIndex(function (s) { return s.id === fuShootId; });
        PHO.SHOOTS[idx].status = status;
        PHO.SHOOTS[idx].comment = comment;
      } else {
        var extra = getExtra();
        var ei = extra.findIndex(function (s) { return s.id === fuShootId; });
        if (ei !== -1) { extra[ei].status = status; extra[ei].comment = comment; saveExtra(extra); }
      }
      MM.closeModal('followup-modal');
      MM.showToast('Follow-up logged');
      render();
    });
  });

  render();
})();
