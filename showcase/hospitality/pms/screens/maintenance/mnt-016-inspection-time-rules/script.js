(function () {
  'use strict';
  var MNT = MM.MNT;
  var activeId = null;

  function villasForBu(bu) {
    return (MM.MOCK_PROPERTIES || []).filter(function (p) { return p.bu === bu; }).map(function (p) { return p.name; }).join(', ') || '—';
  }

  function render() {
    var q = document.getElementById('search-input').value.trim().toLowerCase();
    var data = MNT.getInspectionRules().filter(function (r) { return !q || r.businessUnit.toLowerCase().indexOf(q) > -1; });
    document.getElementById('list-tbody').innerHTML = data.map(function (r, i) {
      return '<tr><td>' + (i + 1) + '</td><td class="cell-strong">' + r.businessUnit + '</td>' +
        '<td class="cell-num">' + r.newDays + 'd</td><td class="cell-num">' + r.seenDays + 'd</td><td class="cell-num">' + r.okDays + 'd</td>' +
        '<td class="cell-sub">' + r.createdBy + '</td><td class="cell-sub">' + MNT.date(r.updatedAt) + '</td>' +
        '<td class="row-actions" style="text-align:right;">' +
        '<button class="btn btn-ghost btn-sm" data-view="' + r.id + '" title="View"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-edit="' + r.id + '" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + r.id + '" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('');
    document.getElementById('list-empty').hidden = !!data.length;
    document.getElementById('result-count').textContent = data.length + ' rule' + (data.length === 1 ? '' : 's');
  }

  function availableBUs() {
    var used = MNT.getInspectionRules().map(function (r) { return r.businessUnit; });
    return MNT.BUSINESS_UNITS.filter(function (bu) { return used.indexOf(bu) === -1; });
  }

  function renderAddChecks() {
    var wrap = document.getElementById('bu-checks');
    var avail = availableBUs();
    if (!avail.length) { wrap.innerHTML = '<p class="text-sm text-muted">Every business unit already has a rule set.</p>'; return; }
    wrap.innerHTML = avail.map(function (bu) {
      return '<label style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500;"><input type="checkbox" value="' + bu + '" class="add-bu-check"> ' + bu + '</label>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();
    document.getElementById('search-input').addEventListener('input', render);

    document.getElementById('add-btn').addEventListener('click', function () {
      renderAddChecks();
      document.getElementById('add-form').reset();
      document.getElementById('add-new').value = 0;
      document.getElementById('add-seen').value = 0;
      document.getElementById('add-ok').value = 0;
      document.getElementById('bu-error').textContent = '';
      MM.openModal('add-modal');
    });

    document.getElementById('add-save-btn').addEventListener('click', function () {
      var checked = Array.from(document.querySelectorAll('.add-bu-check:checked')).map(function (c) { return c.value; });
      if (!checked.length) { document.getElementById('bu-error').textContent = 'Select at least 1 business unit.'; return; }
      document.getElementById('bu-error').textContent = '';
      MM.simulateSave(document.getElementById('add-save-btn'), 'Saving...', function () {
        var list = MNT.getInspectionRules();
        var newDays = parseInt(document.getElementById('add-new').value, 10) || 0;
        var seenDays = parseInt(document.getElementById('add-seen').value, 10) || 0;
        var okDays = parseInt(document.getElementById('add-ok').value, 10) || 0;
        checked.forEach(function (bu) {
          list.push({ id: MM.uid('insr'), businessUnit: bu, properties: villasForBu(bu), newDays: newDays, seenDays: seenDays, okDays: okDays, createdBy: 'Daniel T.', updatedAt: new Date().toISOString().slice(0, 10) });
        });
        MNT.saveInspectionRules(list);
        MM.closeModal('add-modal');
        MM.showToast('Inspection rule' + (checked.length > 1 ? 's' : '') + ' added');
        render();
      });
    });

    document.getElementById('list-tbody').addEventListener('click', function (e) {
      var viewBtn = e.target.closest('[data-view]'), editBtn = e.target.closest('[data-edit]'), delBtn = e.target.closest('[data-delete]');
      var data = MNT.getInspectionRules();
      if (viewBtn) {
        var r = data.find(function (x) { return x.id === viewBtn.dataset.view; });
        if (!r) return;
        activeId = r.id;
        document.getElementById('view-bu').textContent = r.businessUnit;
        document.getElementById('view-properties').textContent = r.properties;
        document.getElementById('view-new').textContent = r.newDays + ' days';
        document.getElementById('view-seen').textContent = r.seenDays + ' days';
        document.getElementById('view-ok').textContent = r.okDays + ' days';
        MM.openModal('view-modal');
      }
      if (editBtn) openEdit(editBtn.dataset.edit);
      if (delBtn) {
        var target = data.find(function (x) { return x.id === delBtn.dataset.delete; });
        if (!target) return;
        activeId = target.id;
        document.getElementById('del-name').textContent = target.businessUnit;
        MM.openModal('delete-modal');
      }
    });

    function openEdit(id) {
      var r = MNT.getInspectionRules().find(function (x) { return x.id === id; });
      if (!r) return;
      activeId = r.id;
      document.getElementById('edit-bu').textContent = r.businessUnit;
      document.getElementById('edit-properties').textContent = r.properties;
      document.getElementById('edit-new').value = r.newDays;
      document.getElementById('edit-seen').value = r.seenDays;
      document.getElementById('edit-ok').value = r.okDays;
      MM.openModal('edit-modal');
    }

    document.getElementById('view-edit-btn').addEventListener('click', function () {
      MM.closeModal('view-modal');
      openEdit(activeId);
    });

    document.getElementById('edit-save-btn').addEventListener('click', function () {
      MM.simulateSave(document.getElementById('edit-save-btn'), 'Saving...', function () {
        var list = MNT.getInspectionRules();
        var r = list.find(function (x) { return x.id === activeId; });
        if (r) {
          r.newDays = parseInt(document.getElementById('edit-new').value, 10) || 0;
          r.seenDays = parseInt(document.getElementById('edit-seen').value, 10) || 0;
          r.okDays = parseInt(document.getElementById('edit-ok').value, 10) || 0;
          r.updatedAt = new Date().toISOString().slice(0, 10);
        }
        MNT.saveInspectionRules(list);
        MM.closeModal('edit-modal');
        MM.showToast('Inspection rule updated');
        render();
      });
    });

    document.getElementById('confirm-delete-btn').addEventListener('click', function () {
      var list = MNT.getInspectionRules().filter(function (x) { return x.id !== activeId; });
      MNT.saveInspectionRules(list);
      MM.closeModal('delete-modal');
      MM.showToast('Inspection rule deleted', { danger: true });
      render();
    });
  });
})();
