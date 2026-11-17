(function () {
  'use strict';

  var URL_STORAGE_KEY = 'mm_set_owner_portal_urls';
  var BASE_URLS = [
    { id: 'opu1', title: 'Default Owner Portal', url: 'https://owners.azurastays.example', scope: 'All regions (default)', updatedAt: '2026-06-01', updatedBy: 'Somchai Anuwat', isDefault: true },
    { id: 'opu2', title: 'Bali Owner Portal', url: 'https://owners.azurastays.example/bali', scope: 'Indonesia — Bali', updatedAt: '2026-07-14', updatedBy: 'Somchai Anuwat', isDefault: false }
  ];
  var editingUrlId = null;

  MM.bindFormValidation(document.getElementById('general-form'));
  document.getElementById('general-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(this)) return;
    MM.simulateSave(document.getElementById('save-general-btn'), 'Saving...', function () {
      MM.showToast('General settings saved');
    });
  });

  document.getElementById('coeff-form').addEventListener('submit', function (e) {
    e.preventDefault();
    MM.simulateSave(document.getElementById('save-coeff-btn'), 'Saving...', function () {
      MM.showToast('Coefficient saved');
    });
  });
  document.getElementById('f-agency').addEventListener('change', function () {
    document.getElementById('f-coefficient').value = this.value ? '0.97' : '1.00';
  });

  function renderUrls() {
    var stored = JSON.parse(localStorage.getItem(URL_STORAGE_KEY) || '[]');
    var data = BASE_URLS.filter(function (u) {
      var hidden = JSON.parse(localStorage.getItem(URL_STORAGE_KEY + '_hidden') || '[]');
      return hidden.indexOf(u.id) === -1;
    }).concat(stored);
    document.getElementById('url-tbody').innerHTML = data.map(function (u) {
      return '<tr><td class="cell-strong">' + u.title + (u.isDefault ? ' <span class="badge badge-info">Default</span>' : '') + '</td>' +
        '<td class="cell-sub">' + u.url + '</td>' +
        '<td class="cell-sub">' + u.scope + '</td>' +
        '<td class="cell-sub">' + u.updatedAt + ' by ' + u.updatedBy + '</td>' +
        '<td class="row-actions">' +
          '<button class="btn btn-ghost btn-sm" data-edit-url="' + u.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
          (u.isDefault ? '' : '<button class="btn btn-ghost btn-sm" data-delete-url="' + u.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>') +
        '</td></tr>';
    }).join('');
  }
  renderUrls();

  document.getElementById('add-url-btn').addEventListener('click', function () {
    editingUrlId = null;
    document.getElementById('url-modal-title').textContent = 'Add Owner Portal URL';
    document.getElementById('url-form').reset();
    MM.openModal('url-modal');
  });

  document.getElementById('url-tbody').addEventListener('click', function (e) {
    var delBtn = e.target.closest('[data-delete-url]');
    var editBtn = e.target.closest('[data-edit-url]');
    if (editBtn) {
      editingUrlId = editBtn.dataset.editUrl;
      document.getElementById('url-modal-title').textContent = 'Edit Owner Portal URL';
      MM.openModal('url-modal');
    }
    if (delBtn) {
      editingUrlId = delBtn.dataset.deleteUrl;
      document.getElementById('del-url-title').textContent = 'Business units on this URL will fall back to the default.';
      MM.openModal('delete-url-modal');
    }
  });

  document.getElementById('save-url-btn').addEventListener('click', function () {
    var form = document.getElementById('url-form');
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-url-btn'), 'Saving...', function () {
      var stored = JSON.parse(localStorage.getItem(URL_STORAGE_KEY) || '[]');
      var checked = Array.from(document.querySelectorAll('#url-form input[type="checkbox"]:checked')).map(function (c) { return c.value; });
      stored.push({
        id: MM.uid('opu'),
        title: document.getElementById('f-url-title').value.trim(),
        url: document.getElementById('f-url-value').value.trim(),
        scope: checked.length ? checked.join(', ') : 'No regions selected',
        updatedAt: new Date().toISOString().slice(0, 10),
        updatedBy: 'Somchai Anuwat',
        isDefault: false
      });
      localStorage.setItem(URL_STORAGE_KEY, JSON.stringify(stored));
      MM.closeModal('url-modal');
      MM.showToast('Owner Portal URL saved');
      renderUrls();
    });
  });

  document.getElementById('confirm-delete-url-btn').addEventListener('click', function () {
    var stored = JSON.parse(localStorage.getItem(URL_STORAGE_KEY) || '[]').filter(function (u) { return u.id !== editingUrlId; });
    localStorage.setItem(URL_STORAGE_KEY, JSON.stringify(stored));
    var hidden = JSON.parse(localStorage.getItem(URL_STORAGE_KEY + '_hidden') || '[]');
    if (BASE_URLS.some(function (u) { return u.id === editingUrlId; })) { hidden.push(editingUrlId); localStorage.setItem(URL_STORAGE_KEY + '_hidden', JSON.stringify(hidden)); }
    MM.closeModal('delete-url-modal');
    MM.showToast('Owner Portal URL deleted', { danger: true });
    renderUrls();
  });
})();
