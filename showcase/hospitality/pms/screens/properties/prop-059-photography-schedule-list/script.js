(function () {
  'use strict';
  var editingId = null;
  var STORAGE_KEY = 'mm_prop_shootings';
  var HIDDEN_KEY = 'mm_prop_shootings_hidden';
  var EDITS_KEY = 'mm_prop_shootings_edits';
  var BASE_DATA = [
    { id: 's1', property: 'Villa Marble Cove', photographer: 'Sentosa Frame Photography', date: '2026-09-05' },
    { id: 's2', property: 'Villa Golden Palm', photographer: 'Byron Bloom Studio', date: '2026-09-12' }
  ];
  function currentData() {
    var hidden = JSON.parse(localStorage.getItem(HIDDEN_KEY) || '[]');
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
    return BASE_DATA.filter(function (d) { return hidden.indexOf(d.id) === -1; }).concat(stored)
      .map(function (d) { return edits[d.id] ? Object.assign({}, d, edits[d.id]) : d; });
  }
  function render() {
    var data = currentData();
    document.getElementById('list-tbody').innerHTML = data.map(function (s) {
      return '<tr><td class="cell-strong">' + s.property + '</td><td>' + s.photographer + '</td><td class="cell-sub">' + s.date + '</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="' + s.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + s.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('') || '<tr><td colspan="4" class="text-muted text-sm">No pending shoots.</td></tr>';
  }
  render();

  document.getElementById('f-property').innerHTML = MM.MOCK_PROPERTIES.map(function (p) { return '<option>' + p.name + '</option>'; }).join('');

  function openDrawer(shoot) {
    editingId = shoot ? shoot.id : null;
    document.getElementById('shoot-drawer-title').textContent = shoot ? 'Edit Shoot Schedule' : 'Add New Photo Shoot Schedule';
    document.getElementById('shoot-save-btn').textContent = shoot ? 'Save Changes' : 'Schedule Shoot';
    document.getElementById('shoot-form').reset();
    if (shoot) {
      if (shoot.bu) document.getElementById('f-bu').value = shoot.bu;
      document.getElementById('f-property').value = shoot.property;
      document.getElementById('f-photographer').value = shoot.photographer;
      document.getElementById('f-date').value = shoot.date;
      document.getElementById('f-notes').value = shoot.notes || '';
    }
    MM.openModal('shoot-drawer');
  }

  document.getElementById('add-shoot-btn').addEventListener('click', function () { openDrawer(null); });

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      var s = currentData().find(function (d) { return d.id === editBtn.dataset.edit; });
      openDrawer(s);
      return;
    }
    var delBtn = e.target.closest('[data-delete]');
    if (!delBtn) return;
    editingId = delBtn.dataset.delete;
    MM.openModal('delete-shoot-modal');
  });

  document.getElementById('confirm-delete-shoot-btn').addEventListener('click', function () {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter(function (d) { return d.id !== editingId; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    if (BASE_DATA.some(function (d) { return d.id === editingId; })) {
      var hidden = JSON.parse(localStorage.getItem(HIDDEN_KEY) || '[]');
      hidden.push(editingId);
      localStorage.setItem(HIDDEN_KEY, JSON.stringify(hidden));
    }
    MM.closeModal('delete-shoot-modal');
    MM.showToast('Shoot deleted', { danger: true });
    render();
  });

  var form = document.getElementById('shoot-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('shoot-save-btn'), editingId ? 'Saving...' : 'Scheduling...', function () {
      var rec = {
        bu: document.getElementById('f-bu').value,
        property: document.getElementById('f-property').value,
        photographer: document.getElementById('f-photographer').value,
        date: document.getElementById('f-date').value,
        notes: document.getElementById('f-notes').value.trim()
      };
      if (editingId) {
        var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
        edits[editingId] = rec;
        localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
        MM.showToast('Schedule updated');
      } else {
        var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        rec.id = MM.uid('shoot');
        stored.push(rec);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        MM.showToast('Photo shoot scheduled');
      }
      MM.closeModal('shoot-drawer');
      render();
    });
  });
})();
