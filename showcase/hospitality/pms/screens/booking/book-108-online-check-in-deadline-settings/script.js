(function () {
  'use strict';
  var BOOK = MM.BOOK;

  var draft = BOOK.getDeadlineGroups().map(function (g) { return Object.assign({}, g, { businessUnits: g.businessUnits.slice() }); });
  var dirty = false;

  function buNames() {
    return (BOOK.BUSINESS_UNITS || []).map(function (bu) { return typeof bu === 'string' ? bu : bu.name; });
  }

  function assignedBUs() {
    var out = [];
    draft.forEach(function (g) { out = out.concat(g.businessUnits); });
    return out;
  }

  function markDirty() {
    dirty = true;
    document.getElementById('unsaved-indicator').style.display = '';
  }

  function render() {
    document.getElementById('deadline-grid').innerHTML = draft.map(function (g) {
      return '<div class="deadline-card" data-group="' + g.id + '">' +
        '<div class="deadline-card__header"><input type="number" class="deadline-card__days-input" min="0" max="60" value="' + g.days + '" data-days="' + g.id + '"> <span class="text-sm text-muted">days before check-in</span></div>' +
        '<div class="deadline-card__chips">' + (g.businessUnits.length ? g.businessUnits.map(function (bu) { return '<span class="chip">' + bu + '</span>'; }).join('') : '<span class="text-sm text-muted">No business units assigned</span>') + '</div>' +
        '<div class="deadline-card__footer">' +
          '<button class="btn btn-outline btn-sm" data-assign="' + g.id + '">Assign Business Units</button>' +
          '<button class="btn btn-ghost btn-sm" data-delete-group="' + g.id + '">Delete</button>' +
        '</div>' +
        '<div class="deadline-card__meta">Updated by ' + g.updatedBy + ' on ' + (g.updatedAt || '').slice(0, 10) + '</div>' +
      '</div>';
    }).join('');

    var assigned = assignedBUs();
    var unassigned = buNames().filter(function (n) { return assigned.indexOf(n) === -1; });
    document.getElementById('unassigned-warning').style.display = unassigned.length ? '' : 'none';
    document.getElementById('unassigned-list').textContent = unassigned.join(', ');

    var sampleGroup = draft[0];
    var sampleDate = new Date(Date.now() + 10 * 86400000);
    if (sampleGroup) {
      var deadlineDate = new Date(sampleDate.getTime() - sampleGroup.days * 86400000);
      document.getElementById('preview-text').textContent = 'For a check-in on ' + sampleDate.toISOString().slice(0, 10) + ', business units in the "' + sampleGroup.days + '-day" group will show a warning if online check-in is incomplete by ' + deadlineDate.toISOString().slice(0, 10) + '.';
    } else {
      document.getElementById('preview-text').textContent = 'Add a deadline group to see a preview.';
    }
  }

  document.getElementById('add-group-btn').addEventListener('click', function () {
    draft.push({ id: MM.uid('DG'), days: 5, businessUnits: [], updatedBy: 'You', updatedAt: new Date().toISOString() });
    markDirty();
    render();
  });

  document.getElementById('deadline-grid').addEventListener('input', function (e) {
    var daysInput = e.target.closest('[data-days]');
    if (!daysInput) return;
    var id = daysInput.getAttribute('data-days');
    var g = draft.filter(function (x) { return x.id === id; })[0];
    if (g) { g.days = Math.max(0, Math.min(60, parseInt(daysInput.value, 10) || 0)); markDirty(); }
  });

  var pendingDeleteGroupId = null;
  document.getElementById('deadline-grid').addEventListener('click', function (e) {
    var assignBtn = e.target.closest('[data-assign]');
    if (assignBtn) { openAssignModal(assignBtn.getAttribute('data-assign')); return; }
    var delBtn = e.target.closest('[data-delete-group]');
    if (delBtn) {
      var id = delBtn.getAttribute('data-delete-group');
      var g = draft.filter(function (x) { return x.id === id; })[0];
      pendingDeleteGroupId = id;
      document.getElementById('delete-group-text').textContent = g && g.businessUnits.length
        ? 'This group has ' + g.businessUnits.length + ' business unit(s) assigned. Reassign them before deleting, or continue to unassign automatically.'
        : 'Delete this deadline group?';
      MM.openModal('delete-group-modal');
    }
  });

  document.getElementById('confirm-delete-group-btn').addEventListener('click', function () {
    if (!pendingDeleteGroupId) return;
    draft = draft.filter(function (g) { return g.id !== pendingDeleteGroupId; });
    pendingDeleteGroupId = null;
    markDirty();
    MM.closeModal('delete-group-modal');
    MM.showToast('Deadline group deleted');
    render();
  });

  var assigningGroupId = null;
  function openAssignModal(groupId) {
    assigningGroupId = groupId;
    var g = draft.filter(function (x) { return x.id === groupId; })[0];
    document.getElementById('assign-checklist').innerHTML = buNames().map(function (bu) {
      var checked = g.businessUnits.indexOf(bu) !== -1;
      return '<div class="select-checklist__item"><input type="checkbox" id="chk-' + bu.replace(/\s/g, '') + '" value="' + bu + '"' + (checked ? ' checked' : '') + '><label for="chk-' + bu.replace(/\s/g, '') + '">' + bu + '</label></div>';
    }).join('');
    MM.openModal('assign-modal');
  }

  document.getElementById('assign-save-btn').addEventListener('click', function () {
    var selected = Array.prototype.filter.call(document.querySelectorAll('#assign-checklist input:checked'), function () { return true; }).map(function (c) { return c.value; });
    draft.forEach(function (g) { g.businessUnits = g.businessUnits.filter(function (bu) { return selected.indexOf(bu) === -1; }); });
    var g = draft.filter(function (x) { return x.id === assigningGroupId; })[0];
    if (g) g.businessUnits = selected;
    markDirty();
    MM.closeModal('assign-modal');
    MM.showToast('Assignments updated');
    render();
  });

  document.getElementById('f-country').addEventListener('change', render);

  document.getElementById('save-changes-btn').addEventListener('click', function () {
    var days = draft.map(function (g) { return g.days; });
    var hasDup = days.some(function (d, i) { return days.indexOf(d) !== i; });
    if (hasDup) { MM.showToast('Each group must have a unique number of days', { danger: true }); return; }
    var hasEmpty = draft.some(function (g) { return g.businessUnits.length === 0; });
    if (hasEmpty) { MM.showToast('Every deadline group must have at least one business unit', { danger: true }); return; }
    var assigned = assignedBUs();
    var unassigned = buNames().filter(function (n) { return assigned.indexOf(n) === -1; });
    if (unassigned.length) { MM.showToast('All business units must be assigned to a deadline group', { danger: true }); return; }

    MM.simulateSave(document.getElementById('save-changes-btn'), 'Saving...', function () {
      draft.forEach(function (g) { g.updatedBy = 'You'; g.updatedAt = new Date().toISOString(); });
      BOOK.saveDeadlineGroups(draft);
      dirty = false;
      document.getElementById('unsaved-indicator').style.display = 'none';
      MM.showToast('Deadline settings saved');
      render();
    });
  });

  render();
})();
