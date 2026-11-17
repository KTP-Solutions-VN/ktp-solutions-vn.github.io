(function () {
  'use strict';
  var LS_KEY = 'mm_acc_categories';
  var MOCK = [
    { id: 'c1', name: 'Booking Payout' },
    { id: 'c2', name: 'Pool/Garden Maintenance' },
    { id: 'c3', name: 'Staff Expenses' },
    { id: 'c4', name: 'Utilities' },
    { id: 'c5', name: 'Owner Payout' },
    { id: 'c6', name: 'Manual Adjustment' },
    { id: 'c7', name: 'Bank Fees' }
  ];
  function load() { try { var r = localStorage.getItem(LS_KEY); if (r) return JSON.parse(r); } catch (e) {} return MOCK.slice(); }
  function save(d) { localStorage.setItem(LS_KEY, JSON.stringify(d)); }
  var cats = load();

  function render() {
    var q = (document.getElementById('cat-search').value || '').toLowerCase();
    var rows = cats.filter(function (c) { return !q || c.name.toLowerCase().indexOf(q) > -1; })
      .sort(function (a, b) { return a.name.localeCompare(b.name); });
    document.getElementById('cat-tbody').innerHTML = rows.map(function (c) {
      return '<tr><td class="cell-strong">' + c.name + '</td><td><div class="row-actions">' +
        '<button class="btn btn-ghost btn-sm" data-edit-cat="' + c.id + '">Edit</button>' +
        '<button class="btn btn-ghost btn-sm" data-delete-cat="' + c.id + '">Delete</button>' +
        '</div></td></tr>';
    }).join('');
    document.getElementById('cat-empty').hidden = rows.length > 0;
    document.getElementById('cat-result-count').textContent = rows.length + ' of ' + cats.length + ' categories';
  }
  render();

  document.getElementById('cat-search').addEventListener('input', render);
  document.getElementById('cat-clear-btn').addEventListener('click', function () { document.getElementById('cat-search').value = ''; render(); });

  var editingId = null;
  document.getElementById('add-cat-btn').addEventListener('click', function () {
    editingId = null;
    document.getElementById('f-cat-name').value = '';
    document.getElementById('cat-modal-title').textContent = 'Add Category';
    document.getElementById('cat-save-btn').textContent = 'Save Category';
    MM.openModal('cat-modal');
  });

  document.addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit-cat]');
    if (editBtn) {
      var rec = cats.filter(function (c) { return c.id === editBtn.getAttribute('data-edit-cat'); })[0];
      editingId = rec.id;
      document.getElementById('f-cat-name').value = rec.name;
      document.getElementById('cat-modal-title').textContent = 'Edit Category';
      document.getElementById('cat-save-btn').textContent = 'Update Category';
      MM.openModal('cat-modal');
    }
    var delBtn = e.target.closest('[data-delete-cat]');
    if (delBtn) {
      editingId = delBtn.getAttribute('data-delete-cat');
      document.getElementById('del-cat-name').textContent = cats.filter(function (c) { return c.id === editingId; })[0].name;
      MM.openModal('delete-cat-modal');
    }
  });

  var form = document.getElementById('cat-form');
  MM.bindFormValidation(form);
  document.getElementById('cat-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(form)) return;
    var name = document.getElementById('f-cat-name').value.trim();
    var dup = cats.some(function (c) { return c.name.toLowerCase() === name.toLowerCase() && c.id !== editingId; });
    if (dup) {
      var group = document.getElementById('f-cat-name').closest('.form-group');
      group.classList.add('has-error');
      group.querySelector('.form-error').textContent = 'A category with this name already exists.';
      return;
    }
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      if (editingId) {
        cats = cats.map(function (c) { return c.id === editingId ? Object.assign({}, c, { name: name }) : c; });
      } else {
        cats.push({ id: MM.uid('c'), name: name });
      }
      save(cats);
      render();
      MM.closeModal('cat-modal');
      MM.showToast((editingId ? 'Updated' : 'Added') + ' category successfully');
    });
  });

  document.getElementById('confirm-delete-cat-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Deleting...', function () {
      cats = cats.filter(function (c) { return c.id !== editingId; });
      save(cats);
      render();
      MM.closeModal('delete-cat-modal');
      MM.showToast('Category deleted', { danger: true });
    });
  });
})();
