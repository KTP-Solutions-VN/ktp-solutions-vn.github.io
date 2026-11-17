(function () {
  'use strict';
  MM.VCS.renderSideNav('vcs-005-contract-service-types');
  var STORAGE_KEY = 'mm_vcs_contract_service_types';
  var editingId = null;

  function serviceName(id) {
    var s = MM.VCS.SERVICES.find(function (x) { return x.id === id; });
    return s ? s.name : id;
  }

  function rowHtml(item, idx) {
    return '<tr><td>' + (idx + 1) + '</td>' +
      '<td class="cell-strong">' + item.name + '</td>' +
      '<td class="cell-sub">' + (item.createdAt || '\u2014') + '</td>' +
      '<td class="row-actions">' +
      '<button class="btn btn-ghost btn-sm" data-edit="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
      '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
  }

  var state = MM.VCS.renderSimpleList({
    storageKey: STORAGE_KEY, baseData: MM.VCS.CONTRACT_SERVICE_TYPES, tbodyId: 'list-tbody', emptyId: 'list-empty',
    searchId: 'search-input', countId: 'result-count', entityLabel: 'contract service type', rowHtml: rowHtml
  });

  function renderCheckboxes(checkedIds) {
    checkedIds = checkedIds || [];
    var box = document.getElementById('service-checkboxes');
    box.innerHTML = MM.VCS.SERVICES.map(function (s) {
      var checked = checkedIds.indexOf(s.id) > -1 ? ' checked' : '';
      return '<label style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500;color:var(--color-gray-800);">' +
        '<input type="checkbox" value="' + s.id + '" class="svc-check"' + checked + '> ' + s.name + '</label>';
    }).join('');
    box.querySelectorAll('.svc-check').forEach(function (cb) { cb.addEventListener('change', updatePreview); });
    updatePreview();
  }

  function getChecked() {
    return Array.from(document.querySelectorAll('.svc-check:checked')).map(function (c) { return c.value; });
  }

  function updatePreview() {
    var ids = getChecked();
    document.getElementById('f-name-preview').value = ids.length ? ids.map(serviceName).join(' + ') : '';
    document.getElementById('service-error').textContent = '';
  }

  document.getElementById('clear-search-btn').addEventListener('click', function () {
    document.getElementById('search-input').value = '';
    document.getElementById('search-input').dispatchEvent(new Event('input'));
  });

  document.getElementById('add-btn').addEventListener('click', function () {
    editingId = null;
    document.getElementById('modal-title').textContent = 'Add Contract Service Type';
    renderCheckboxes([]);
    MM.openModal('item-modal');
  });

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]'), delBtn = e.target.closest('[data-delete]');
    if (editBtn) {
      var item = state.data.find(function (d) { return d.id === editBtn.dataset.edit; });
      if (!item) return;
      editingId = item.id;
      document.getElementById('modal-title').textContent = 'Edit Contract Service Type';
      renderCheckboxes(item.serviceIds || []);
      MM.openModal('item-modal');
    }
    if (delBtn) {
      var target = state.data.find(function (d) { return d.id === delBtn.dataset.delete; });
      if (!target) return;
      editingId = target.id;
      document.getElementById('del-name').textContent = target.name;
      MM.openModal('delete-modal');
    }
  });

  document.getElementById('save-btn').addEventListener('click', function () {
    var ids = getChecked();
    if (!ids.length) {
      document.getElementById('service-error').textContent = 'You must check at least 1 box.';
      return;
    }
    MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
      var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      var record = {
        id: editingId || MM.uid('cst'),
        serviceIds: ids,
        name: ids.map(serviceName).join(' + '),
        createdAt: new Date().toISOString().slice(0, 10) + ' ' + new Date().toTimeString().slice(0, 5)
      };
      if (editingId) {
        var idx = stored.findIndex(function (d) { return d.id === editingId; });
        if (idx > -1) stored[idx] = record; else stored.push(record);
      } else {
        stored.push(record);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      MM.closeModal('item-modal');
      MM.showToast(editingId ? 'Contract service type updated' : 'Contract service type added');
      setTimeout(function () { window.location.reload(); }, 500);
    });
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter(function (d) { return d.id !== editingId; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    if (MM.VCS.CONTRACT_SERVICE_TYPES.some(function (d) { return d.id === editingId; })) {
      hidden.push(editingId);
      localStorage.setItem(STORAGE_KEY + '_hidden', JSON.stringify(hidden));
    }
    MM.closeModal('delete-modal');
    MM.showToast('Contract service type deleted', { danger: true });
    setTimeout(function () { window.location.reload(); }, 500);
  });
})();
