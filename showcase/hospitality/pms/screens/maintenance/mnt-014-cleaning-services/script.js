(function () {
  'use strict';
  var MNT = MM.MNT;
  var deletingId = null;
  var editingId = null;
  var standards = [];

  function render() {
    var q = document.getElementById('search-input').value.trim().toLowerCase();
    var all = MNT.getCleaningServices();
    var data = all.filter(function (s) {
      if (!q) return true;
      if (s.name.toLowerCase().indexOf(q) > -1) return true;
      return (s.standards || []).some(function (st) { return st.legend.toLowerCase().indexOf(q) > -1; });
    });

    document.getElementById('list-tbody').innerHTML = data.map(function (s) {
      var standardsHtml = (s.standards || []).length
        ? '<div class="standards-chip-list">' + s.standards.map(function (st) { return '<span class="standards-chip">' + st.legend + '</span>'; }).join('') + '</div>'
        : '<span class="text-xs text-muted">No standards yet</span>';
      return '<tr><td class="cell-strong">' + s.name + '</td>' +
        '<td class="cell-sub">' + (s.businessUnits || []).join(', ') + '</td>' +
        '<td>' + standardsHtml + '</td>' +
        '<td>' + MNT.statusBadge(s.status) + '</td>' +
        '<td class="cell-sub">' + (s.createdBy || '—') + '</td>' +
        '<td class="row-actions" style="text-align:right;">' +
        '<button class="btn btn-ghost btn-sm" data-edit="' + s.id + '" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + s.id + '" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('');
    document.getElementById('list-empty').hidden = !!data.length;
    document.getElementById('result-count').textContent = data.length + ' service' + (data.length === 1 ? '' : 's');

    // Stats computed from the full (unfiltered) dataset
    var totalStandards = all.reduce(function (sum, s) { return sum + (s.standards || []).length; }, 0);
    var coveredBu = new Set();
    all.forEach(function (s) { (s.businessUnits || []).forEach(function (bu) { coveredBu.add(bu); }); });
    var needsAttention = all.filter(function (s) { return !(s.standards || []).length; }).length;
    document.getElementById('stat-count').textContent = all.filter(function (s) { return s.status === 'Active'; }).length;
    document.getElementById('stat-standards').textContent = totalStandards;
    document.getElementById('stat-bu').textContent = coveredBu.size + ' / ' + MNT.BUSINESS_UNITS.length;
    document.getElementById('stat-attention').textContent = needsAttention;
  }

  function renderStandards() {
    var wrap = document.getElementById('standards-list');
    if (!standards.length) { wrap.innerHTML = '<p class="text-sm text-muted" style="margin:0;">No standards added yet.</p>'; return; }
    wrap.innerHTML = standards.map(function (st, i) {
      return '<div class="standard-row"><span class="standard-row__icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M20 6 9 17l-5-5"/></svg></span>' +
        '<input type="text" value="' + st.legend.replace(/"/g, '&quot;') + '" maxlength="60" placeholder="e.g. No dust on surfaces" data-standard-idx="' + i + '">' +
        '<button type="button" class="btn btn-ghost btn-sm" data-remove-standard="' + i + '" aria-label="Remove"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>';
    }).join('');
    wrap.querySelectorAll('[data-standard-idx]').forEach(function (inp) {
      inp.addEventListener('input', function () { standards[parseInt(inp.dataset.standardIdx, 10)].legend = inp.value; });
    });
    wrap.querySelectorAll('[data-remove-standard]').forEach(function (btn) {
      btn.addEventListener('click', function () { standards.splice(parseInt(btn.dataset.removeStandard, 10), 1); renderStandards(); });
    });
  }

  function openDrawer(service) {
    editingId = service ? service.id : null;
    standards = service ? (service.standards || []).map(function (st) { return { legend: st.legend }; }) : [];
    document.getElementById('service-drawer-title').textContent = service ? 'Edit Housekeeping Service' : 'Add Housekeeping Service';
    document.getElementById('save-btn').textContent = service ? 'Update Service' : 'Create Service';
    document.getElementById('svc-form').reset();
    document.getElementById('img-thumb').innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>';
    document.getElementById('bu-checks').innerHTML = MNT.buChecks(service ? (service.businessUnits || []) : [], 'svc');
    document.getElementById('bu-error').textContent = '';
    if (service) {
      document.getElementById('f-name').value = service.name;
      document.getElementById('f-status').value = service.status;
    }
    renderStandards();
    MM.openModal('service-drawer');
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();
    document.getElementById('search-input').addEventListener('input', render);

    document.getElementById('add-service-btn').addEventListener('click', function () { openDrawer(null); });

    document.getElementById('list-tbody').addEventListener('click', function (e) {
      var editBtn = e.target.closest('[data-edit]'), delBtn = e.target.closest('[data-delete]');
      if (editBtn) {
        var s = MNT.getCleaningServices().find(function (x) { return x.id === editBtn.dataset.edit; });
        if (s) openDrawer(s);
      }
      if (delBtn) {
        var target = MNT.getCleaningServices().find(function (x) { return x.id === delBtn.dataset.delete; });
        if (!target) return;
        deletingId = target.id;
        document.getElementById('del-name').textContent = target.name;
        MM.openModal('delete-modal');
      }
    });

    document.getElementById('f-image').addEventListener('change', function () {
      var file = this.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (e) { document.getElementById('img-thumb').innerHTML = '<img src="' + e.target.result + '" alt="">'; };
      reader.readAsDataURL(file);
    });

    document.getElementById('add-standard-btn').addEventListener('click', function () {
      standards.push({ legend: '' });
      renderStandards();
    });

    MM.bindFormValidation(document.getElementById('svc-form'));

    document.getElementById('svc-form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (!MM.validateForm(document.getElementById('svc-form'))) { MM.showToast('Please fill in all required fields.', { danger: true }); return; }
      var bus = Array.from(document.querySelectorAll('.svc-bu-check:checked')).map(function (c) { return c.value; });
      if (!bus.length) { document.getElementById('bu-error').textContent = 'Select at least 1 business unit.'; return; }
      document.getElementById('bu-error').textContent = '';
      MM.simulateSave(document.getElementById('save-btn'), editingId ? 'Saving...' : 'Creating...', function () {
        var name = document.getElementById('f-name').value.trim();
        var status = document.getElementById('f-status').value;
        var cleanStandards = standards.filter(function (st) { return st.legend.trim(); }).map(function (st) { return { legend: st.legend.trim(), icon: null }; });
        if (editingId) {
          var list = MNT.getCleaningServices();
          var item = list.find(function (x) { return x.id === editingId; });
          if (item) {
            item.name = name;
            item.status = status;
            item.businessUnits = bus;
            item.standards = cleanStandards;
            MNT.saveCleaningServices(list);
          }
          MM.showToast('Cleaning service updated');
        } else {
          MNT.addCleaningService({
            id: MM.uid('cs'),
            name: name,
            status: status,
            businessUnits: bus,
            createdBy: 'Daniel T.',
            createdAt: new Date().toISOString().slice(0, 10),
            standards: cleanStandards
          });
          MM.showToast('Cleaning service created');
        }
        MM.closeModal('service-drawer');
        render();
      });
    });

    document.getElementById('confirm-delete-btn').addEventListener('click', function () {
      var list = MNT.getCleaningServices().filter(function (x) { return x.id !== deletingId; });
      MNT.saveCleaningServices(list);
      MM.closeModal('delete-modal');
      MM.showToast('Cleaning service deleted', { danger: true });
      render();
    });
  });
})();
