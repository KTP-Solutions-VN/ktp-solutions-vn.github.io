(function () {
  'use strict';
  var STORAGE_KEY = 'mm_bu_zones';
  var EDITS_KEY = 'mm_bu_zones_edits';
  var editingId = null;

  function currentData() {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
    return MM.BU.ZONES.filter(function (z) { return hidden.indexOf(z.id) === -1; }).concat(stored)
      .map(function (z) { return edits[z.id] ? Object.assign({}, z, edits[z.id]) : z; });
  }

  function render() {
    var data = currentData();
    document.getElementById('zone-tbody').innerHTML = data.map(function (z) {
      return '<tr><td class="cell-strong">' + z.name + '</td><td>' + z.region + '</td><td class="cell-num">' + (z.businessUnits || 0) + '</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="' + z.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + z.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('');
  }
  render();

  function openDrawer(zone) {
    editingId = zone ? zone.id : null;
    document.getElementById('zone-drawer-title').textContent = zone ? 'Edit Reporting Zone' : 'Add Reporting Zone';
    document.getElementById('zone-save-btn').textContent = zone ? 'Save Changes' : 'Create Zone';
    document.getElementById('zone-form').reset();
    if (zone) {
      document.getElementById('f-name').value = zone.name;
      document.getElementById('f-region').value = zone.region;
    }
    MM.openModal('zone-drawer');
  }

  document.getElementById('add-zone-btn').addEventListener('click', function () { openDrawer(null); });

  document.getElementById('zone-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      var z = currentData().find(function (d) { return d.id === editBtn.dataset.edit; });
      openDrawer(z);
      return;
    }
    var delBtn = e.target.closest('[data-delete]');
    if (!delBtn) return;
    editingId = delBtn.dataset.delete;
    var z2 = currentData().find(function (d) { return d.id === editingId; });
    document.getElementById('del-zone-name').textContent = z2.name;
    MM.openModal('delete-zone-modal');
  });

  var form = document.getElementById('zone-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('zone-save-btn'), editingId ? 'Saving...' : 'Creating...', function () {
      var name = document.getElementById('f-name').value.trim();
      var region = document.getElementById('f-region').value;
      if (editingId) {
        var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
        edits[editingId] = { name: name, region: region };
        localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
        MM.showToast('Business zone updated');
      } else {
        var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        stored.push({ id: MM.uid('zone'), name: name, region: region, businessUnits: 0 });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        MM.showToast('Business zone created');
      }
      MM.closeModal('zone-drawer');
      render();
    });
  });

  document.getElementById('confirm-delete-zone-btn').addEventListener('click', function () {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter(function (d) { return d.id !== editingId; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    if (MM.BU.ZONES.some(function (d) { return d.id === editingId; })) { hidden.push(editingId); localStorage.setItem(STORAGE_KEY + '_hidden', JSON.stringify(hidden)); }
    MM.closeModal('delete-zone-modal');
    MM.showToast('Business zone deleted', { danger: true });
    render();
  });
})();
