(function () {
  'use strict';
  var BOOK = MM.BOOK;
  var form = document.getElementById('category-form');
  MM.bindFormValidation(form);
  var searchQuery = '';
  var deleteId = null;

  function fmtDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' +
      d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  function render() {
    var categories = BOOK.getFaqCategories().slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
    var questions = BOOK.getFaqQuestions();
    if (searchQuery) {
      categories = categories.filter(function (c) { return c.name.toLowerCase().indexOf(searchQuery) > -1; });
    }
    var tbody = document.getElementById('cat-tbody');
    document.getElementById('result-count').textContent = categories.length + (categories.length === 1 ? ' category' : ' categories');
    document.getElementById('cat-empty').hidden = categories.length !== 0;

    tbody.innerHTML = categories.map(function (c, i) {
      var count = questions.filter(function (q) { return q.categoryId === c.id; }).length;
      return '<tr class="clickable" data-open-cat="' + c.id + '">' +
        '<td class="cell-sub">' + (i + 1) + '</td>' +
        '<td class="cell-strong">' + c.name + '</td>' +
        '<td><span class="cat-count-pill">' + count + '</span></td>' +
        '<td class="cell-sub">' + fmtDate(c.createdAt) + '</td>' +
        '<td class="row-actions">' +
          '<button class="btn btn-ghost btn-sm" data-edit="' + c.id + '" title="Edit" aria-label="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
          '<button class="btn btn-ghost btn-sm" data-delete="' + c.id + '" title="Delete" aria-label="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>' +
        '</td></tr>';
    }).join('');
  }

  document.getElementById('search-input').addEventListener('input', function (e) {
    searchQuery = e.target.value.trim().toLowerCase();
    render();
  });
  document.getElementById('clear-search-btn').addEventListener('click', function () {
    document.getElementById('search-input').value = '';
    searchQuery = '';
    render();
  });

  document.getElementById('btn-add-category').addEventListener('click', function () {
    form.reset();
    form.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
    document.getElementById('cat-id').value = '';
    document.getElementById('category-form-title').textContent = 'Add Category';
    MM.openModal('modal-category-form');
  });

  document.getElementById('cat-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    var delBtn = e.target.closest('[data-delete]');
    var openRow = e.target.closest('[data-open-cat]');
    if (editBtn) {
      var cat = BOOK.getFaqCategories().filter(function (c) { return c.id === editBtn.dataset.edit; })[0];
      if (!cat) return;
      form.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
      document.getElementById('cat-id').value = cat.id;
      document.getElementById('cat-name').value = cat.name;
      document.getElementById('category-form-title').textContent = 'Edit Category';
      MM.openModal('modal-category-form');
      return;
    }
    if (delBtn) {
      var target = BOOK.getFaqCategories().filter(function (c) { return c.id === delBtn.dataset.delete; })[0];
      if (!target) return;
      deleteId = target.id;
      document.getElementById('del-cat-name').textContent = target.name;
      MM.openModal('modal-category-delete');
      return;
    }
    if (openRow) {
      window.location.href = '../book-098-faq-question-list/index.html?category=' + encodeURIComponent(openRow.dataset.openCat);
    }
  });

  document.getElementById('btn-save-category').addEventListener('click', function () {
    if (!MM.validateForm(form)) return;
    var id = document.getElementById('cat-id').value;
    var name = document.getElementById('cat-name').value.trim();
    var dup = BOOK.getFaqCategories().some(function (c) { return c.id !== id && c.name.toLowerCase() === name.toLowerCase(); });
    var nameGroup = document.getElementById('cat-name').closest('.form-group');
    if (dup) {
      nameGroup.classList.add('has-error');
      nameGroup.querySelector('.form-error').textContent = 'A category with this name already exists.';
      return;
    }
    var btn = document.getElementById('btn-save-category');
    MM.simulateSave(btn, 'Saving...', function () {
      var existing = id ? BOOK.getFaqCategories().filter(function (c) { return c.id === id; })[0] : null;
      var row = {
        id: id || MM.uid('FC'),
        name: name,
        createdAt: existing ? existing.createdAt : new Date().toISOString()
      };
      BOOK.saveFaqCategory(row);
      MM.closeModal('modal-category-form');
      MM.showToast(id ? 'Category updated' : 'Category added');
      render();
    });
  });

  document.getElementById('btn-confirm-delete-category').addEventListener('click', function () {
    if (!deleteId) return;
    BOOK.deleteFaqCategory(deleteId);
    MM.closeModal('modal-category-delete');
    MM.showToast('Category deleted', { danger: true });
    deleteId = null;
    render();
  });

  render();
})();
