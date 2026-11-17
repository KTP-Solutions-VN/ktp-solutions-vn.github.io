(function () {
  'use strict';
  var STORAGE_KEY = 'mm_bu_offices';
  var EDITS_KEY = 'mm_bu_offices_edits';
  var editingId = null;

  function currentData() {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
    return MM.BU.OFFICES.filter(function (o) { return hidden.indexOf(o.id) === -1; }).concat(stored)
      .map(function (o) { return edits[o.id] ? Object.assign({}, o, edits[o.id]) : o; });
  }

  function render() {
    var data = currentData();
    document.getElementById('office-tbody').innerHTML = data.map(function (o) {
      return '<tr><td class="cell-strong">' + o.name + '</td><td class="cell-sub">' + (o.bu || '') + '</td><td>' + (o.phone || '—') + '</td>' +
        '<td class="row-actions"><a class="btn btn-ghost btn-sm" href="../bu-018-view-office-details/index.html?id=' + o.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></a>' +
        '<button class="btn btn-ghost btn-sm" data-edit="' + o.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + o.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('');
  }
  render();

  function openDrawer(office) {
    editingId = office ? office.id : null;
    document.getElementById('office-drawer-title').textContent = office ? 'Edit Office' : 'Add Office';
    document.getElementById('save-office-btn').textContent = office ? 'Save Changes' : 'Create Office';
    document.getElementById('office-form').reset();
    if (office) {
      document.getElementById('f-name').value = office.name;
      document.getElementById('f-bu').value = office.bu || '';
      document.getElementById('f-phone').value = office.phone || '';
      document.getElementById('f-address').value = office.address || '';
    }
    MM.openModal('office-drawer');
  }

  document.getElementById('add-office-btn').addEventListener('click', function () { openDrawer(null); });

  document.getElementById('office-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      var o = currentData().find(function (d) { return d.id === editBtn.dataset.edit; });
      openDrawer(o);
      return;
    }
    var delBtn = e.target.closest('[data-delete]');
    if (!delBtn) return;
    editingId = delBtn.dataset.delete;
    var o2 = currentData().find(function (d) { return d.id === editingId; });
    document.getElementById('del-office-name').textContent = o2.name;
    MM.openModal('delete-office-modal');
  });

  var form = document.getElementById('office-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-office-btn'), editingId ? 'Saving...' : 'Creating...', function () {
      var name = document.getElementById('f-name').value.trim();
      var bu = document.getElementById('f-bu').value;
      var phone = document.getElementById('f-phone').value.trim();
      var address = document.getElementById('f-address').value.trim();
      if (editingId) {
        var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
        edits[editingId] = { name: name, bu: bu, phone: phone, address: address };
        localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
        MM.showToast('Office updated');
      } else {
        var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        stored.push({ id: MM.uid('office'), name: name, bu: bu, phone: phone, address: address });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        MM.showToast('Office created');
      }
      MM.closeModal('office-drawer');
      render();
    });
  });

  document.getElementById('confirm-delete-office-btn').addEventListener('click', function () {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter(function (d) { return d.id !== editingId; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    if (MM.BU.OFFICES.some(function (d) { return d.id === editingId; })) { hidden.push(editingId); localStorage.setItem(STORAGE_KEY + '_hidden', JSON.stringify(hidden)); }
    MM.closeModal('delete-office-modal');
    MM.showToast('Office deleted', { danger: true });
    render();
  });

  // Deep-link support: ?edit=<id> opens straight into the edit drawer (e.g. from the office details page).
  var deepLinkParams = new URLSearchParams(window.location.search);
  var editParam = deepLinkParams.get('edit');
  if (editParam) {
    var target = currentData().find(function (d) { return d.id === editParam; });
    if (target) openDrawer(target);
  }
})();
