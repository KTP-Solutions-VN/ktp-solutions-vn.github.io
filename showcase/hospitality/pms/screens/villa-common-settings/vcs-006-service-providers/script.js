(function () {
  'use strict';
  MM.VCS.renderSideNav('vcs-006-service-providers');
  var PROV_KEY = 'mm_vcs_service_providers';
  var SVC_KEY = 'mm_vcs_provider_services';
  var editingId = null, editingSvcId = null;

  function svcName(id) { var s = MM.VCS.PROVIDER_SERVICES.concat(loadServices()).find(function (x) { return x.id === id; }); return s ? s.name : id; }
  function loadServices() { return JSON.parse(localStorage.getItem(SVC_KEY) || '[]'); }
  function allServices() { return MM.VCS.PROVIDER_SERVICES.concat(loadServices()); }

  function providerRow(item, idx) {
    var badgeClass = item.status === 'Active' ? 'badge-success' : 'badge-neutral';
    return '<tr><td>' + (idx + 1) + '</td>' +
      '<td class="cell-sub">' + (item.serviceIds || []).map(svcName).join(', ') + '</td>' +
      '<td class="cell-strong">' + item.name + '</td>' +
      '<td class="cell-sub">' + (item.businessUnits || []).join(', ') + '</td>' +
      '<td><span class="badge ' + badgeClass + '">' + item.status + '</span></td>' +
      '<td class="cell-sub">' + (item.createdAt || '\u2014') + '</td>' +
      '<td class="row-actions">' +
      '<button class="btn btn-ghost btn-sm" data-edit="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
      '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
  }

  var state = MM.VCS.renderSimpleList({
    storageKey: PROV_KEY, baseData: MM.VCS.SERVICE_PROVIDERS, tbodyId: 'list-tbody', emptyId: 'list-empty',
    searchId: 'search-input', countId: 'result-count', entityLabel: 'provider', rowHtml: providerRow
  });

  document.getElementById('bu-filter').addEventListener('change', function () {
    var bu = this.value;
    var filtered = bu ? state.data.filter(function (d) { return (d.businessUnits || []).indexOf(bu) > -1; }) : state.data;
    state.refresh(filtered);
    document.getElementById('result-count').textContent = filtered.length + ' provider' + (filtered.length === 1 ? '' : 's');
  });

  document.getElementById('clear-search-btn').addEventListener('click', function () {
    document.getElementById('search-input').value = '';
    document.getElementById('bu-filter').value = '';
    document.getElementById('search-input').dispatchEvent(new Event('input'));
  });

  function renderServiceTypeChecks(checkedIds) {
    checkedIds = checkedIds || [];
    var box = document.getElementById('service-type-checkboxes');
    box.innerHTML = allServices().map(function (s) {
      var checked = checkedIds.indexOf(s.id) > -1 ? ' checked' : '';
      return '<label style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500;"><input type="checkbox" value="' + s.id + '" class="svct-check"' + checked + '> ' + s.name + '</label>';
    }).join('');
  }

  function renderBuChecks(checkedList) {
    checkedList = checkedList || [];
    document.querySelectorAll('.bu-check').forEach(function (cb) { cb.checked = checkedList.indexOf(cb.value) > -1; });
  }

  document.getElementById('add-provider-btn').addEventListener('click', function () {
    editingId = null;
    document.getElementById('provider-modal-title').textContent = 'Add Service Provider';
    document.getElementById('provider-form').reset();
    renderServiceTypeChecks([]);
    renderBuChecks([]);
    MM.openModal('provider-modal');
  });

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]'), delBtn = e.target.closest('[data-delete]');
    if (editBtn) {
      var item = state.data.find(function (d) { return d.id === editBtn.dataset.edit; });
      if (!item) return;
      editingId = item.id;
      document.getElementById('provider-modal-title').textContent = 'Edit Service Provider';
      document.getElementById('f-name').value = item.name;
      document.getElementById('f-contact').value = item.contactPerson || '';
      document.getElementById('f-country').value = item.country || '';
      document.getElementById('f-address').value = item.address || '';
      document.getElementById('f-phone').value = item.phone || '';
      document.getElementById('f-email').value = item.email || '';
      document.getElementById('f-status').value = item.status || 'Active';
      renderServiceTypeChecks(item.serviceIds || []);
      renderBuChecks(item.businessUnits || []);
      MM.openModal('provider-modal');
    }
    if (delBtn) {
      var target = state.data.find(function (d) { return d.id === delBtn.dataset.delete; });
      if (!target) return;
      editingId = target.id;
      document.getElementById('del-provider-name').textContent = target.name;
      MM.openModal('delete-provider-modal');
    }
  });

  document.getElementById('save-provider-btn').addEventListener('click', function () {
    var form = document.getElementById('provider-form');
    if (!MM.validateForm(form)) return;
    var svcIds = Array.from(document.querySelectorAll('.svct-check:checked')).map(function (c) { return c.value; });
    var bus = Array.from(document.querySelectorAll('.bu-check:checked')).map(function (c) { return c.value; });
    var ok = true;
    document.getElementById('service-type-error').textContent = svcIds.length ? '' : (ok = false, 'Select at least 1 service type.');
    document.getElementById('bu-error').textContent = bus.length ? '' : (ok = false, 'Select at least 1 business unit.');
    if (!ok) return;
    MM.simulateSave(document.getElementById('save-provider-btn'), 'Saving...', function () {
      var stored = JSON.parse(localStorage.getItem(PROV_KEY) || '[]');
      var record = {
        id: editingId || MM.uid('sp'),
        name: document.getElementById('f-name').value.trim(),
        contactPerson: document.getElementById('f-contact').value.trim(),
        country: document.getElementById('f-country').value.trim(),
        address: document.getElementById('f-address').value.trim(),
        phone: document.getElementById('f-phone').value.trim(),
        email: document.getElementById('f-email').value.trim(),
        status: document.getElementById('f-status').value,
        serviceIds: svcIds,
        businessUnits: bus,
        createdAt: new Date().toISOString().slice(0, 10)
      };
      if (editingId) {
        var idx = stored.findIndex(function (d) { return d.id === editingId; });
        if (idx > -1) stored[idx] = record; else stored.push(record);
      } else { stored.push(record); }
      localStorage.setItem(PROV_KEY, JSON.stringify(stored));
      MM.closeModal('provider-modal');
      MM.showToast(editingId ? 'Provider updated' : 'Provider added');
      setTimeout(function () { window.location.reload(); }, 500);
    });
  });

  document.getElementById('confirm-delete-provider-btn').addEventListener('click', function () {
    var stored = JSON.parse(localStorage.getItem(PROV_KEY) || '[]').filter(function (d) { return d.id !== editingId; });
    localStorage.setItem(PROV_KEY, JSON.stringify(stored));
    var hidden = JSON.parse(localStorage.getItem(PROV_KEY + '_hidden') || '[]');
    if (MM.VCS.SERVICE_PROVIDERS.some(function (d) { return d.id === editingId; })) { hidden.push(editingId); localStorage.setItem(PROV_KEY + '_hidden', JSON.stringify(hidden)); }
    MM.closeModal('delete-provider-modal');
    MM.showToast('Provider deleted', { danger: true });
    setTimeout(function () { window.location.reload(); }, 500);
  });

  /* Services tab */
  function renderServiceTable() {
    var tbody = document.getElementById('service-tbody');
    var data = allServices();
    tbody.innerHTML = data.map(function (s, idx) {
      return '<tr><td>' + (idx + 1) + '</td><td class="cell-strong">' + s.name + '</td><td class="cell-sub">' + (s.createdAt || '\u2014') + '</td></tr>';
    }).join('');
  }
  renderServiceTable();

  document.getElementById('add-service-btn').addEventListener('click', function () {
    document.getElementById('service-form').reset();
    MM.openModal('service-modal');
  });

  document.getElementById('save-service-btn').addEventListener('click', function () {
    var form = document.getElementById('service-form');
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-service-btn'), 'Saving...', function () {
      var stored = loadServices();
      stored.push({ id: MM.uid('ps'), name: document.getElementById('f-service-name').value.trim(), createdAt: new Date().toISOString().slice(0, 10) + ' ' + new Date().toTimeString().slice(0, 5) });
      localStorage.setItem(SVC_KEY, JSON.stringify(stored));
      MM.closeModal('service-modal');
      MM.showToast('Service type added');
      renderServiceTable();
    });
  });
})();
