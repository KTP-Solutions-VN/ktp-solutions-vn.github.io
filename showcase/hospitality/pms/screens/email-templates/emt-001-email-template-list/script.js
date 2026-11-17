(function () {
  'use strict';
  var STORAGE_KEY = 'mm_emt_templates';
  var EDITS_KEY = 'mm_emt_templates_edits';
  var BASE_DATA = [
    { id: 'et1', name: 'Monthly Owner Newsletter', usedFor: 'Owner Newsletter', lang: 'English', content: 'Dear ##OWNER_NAME##,\n\nHere is your monthly update for ##VILLA_NAME##...' },
    { id: 'et2', name: 'Booking Confirmation', usedFor: 'Booking Confirmation', lang: 'English', content: '' },
    { id: 'et3', name: 'Confirmation de réservation', usedFor: 'Booking Confirmation', lang: 'French', content: '' }
  ];
  var editingId = null;

  function currentData() {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
    return BASE_DATA.filter(function (d) { return hidden.indexOf(d.id) === -1; }).concat(stored)
      .map(function (d) { return edits[d.id] ? Object.assign({}, d, edits[d.id]) : d; });
  }

  function render() {
    var data = currentData();
    document.getElementById('list-tbody').innerHTML = data.map(function (t) {
      return '<tr><td class="cell-strong">' + t.name + '</td><td class="cell-sub">' + t.usedFor + '</td><td>' + t.lang + '</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="' + t.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + t.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('');
  }
  render();

  function openDrawer(tpl) {
    editingId = tpl ? tpl.id : null;
    document.getElementById('tpl-drawer-title').textContent = tpl ? 'Edit Email Template' : 'Add Email Template';
    document.getElementById('save-tpl-btn').textContent = tpl ? 'Save Changes' : 'Create Template';
    document.getElementById('tpl-form').reset();
    if (tpl) {
      document.getElementById('f-for').value = tpl.usedFor || '';
      document.getElementById('f-lang').value = tpl.lang || '';
      document.getElementById('f-title').value = tpl.name || '';
      document.getElementById('f-content').value = tpl.content || '';
    }
    MM.openModal('tpl-drawer');
  }

  document.getElementById('add-template-btn').addEventListener('click', function () { openDrawer(null); });

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      var t = currentData().find(function (d) { return d.id === editBtn.dataset.edit; });
      openDrawer(t);
      return;
    }
    var delBtn = e.target.closest('[data-delete]');
    if (!delBtn) return;
    editingId = delBtn.dataset.delete;
    var t2 = currentData().find(function (d) { return d.id === editingId; });
    document.getElementById('del-name').textContent = t2.name;
    MM.openModal('delete-modal');
  });

  var form = document.getElementById('tpl-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-tpl-btn'), editingId ? 'Saving...' : 'Creating...', function () {
      var usedFor = document.getElementById('f-for').value;
      var lang = document.getElementById('f-lang').value;
      var title = document.getElementById('f-title').value.trim();
      var content = document.getElementById('f-content').value;
      if (editingId) {
        var edits = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
        edits[editingId] = { name: title, usedFor: usedFor, lang: lang, content: content };
        localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
        MM.showToast('Template updated');
      } else {
        var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        stored.push({ id: MM.uid('et'), name: title, usedFor: usedFor, lang: lang, content: content });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        MM.showToast('Template created');
      }
      MM.closeModal('tpl-drawer');
      render();
    });
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter(function (d) { return d.id !== editingId; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    var hidden = JSON.parse(localStorage.getItem(STORAGE_KEY + '_hidden') || '[]');
    if (BASE_DATA.some(function (d) { return d.id === editingId; })) { hidden.push(editingId); localStorage.setItem(STORAGE_KEY + '_hidden', JSON.stringify(hidden)); }
    MM.closeModal('delete-modal');
    MM.showToast('Template deleted', { danger: true });
    render();
  });
})();
