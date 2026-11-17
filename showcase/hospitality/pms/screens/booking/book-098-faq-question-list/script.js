(function () {
  'use strict';
  var BOOK = MM.BOOK;
  var params = new URLSearchParams(window.location.search);
  var searchQuery = '';
  var deleteId = null;

  function fmtDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function categoryName(id) {
    var cat = BOOK.getFaqCategories().filter(function (c) { return c.id === id; })[0];
    return cat ? cat.name : 'Unassigned';
  }

  /* Populate filter dropdowns */
  var catSelect = document.getElementById('f-category');
  BOOK.getFaqCategories().slice().sort(function (a, b) { return a.name.localeCompare(b.name); }).forEach(function (c) {
    var opt = document.createElement('option'); opt.value = c.id; opt.textContent = c.name; catSelect.appendChild(opt);
  });
  var langSelect = document.getElementById('f-language');
  (BOOK.FAQ_LANGUAGES || ['English']).forEach(function (l) {
    var opt = document.createElement('option'); opt.value = l; opt.textContent = l; langSelect.appendChild(opt);
  });
  var buSelect = document.getElementById('f-bu');
  (BOOK.BUSINESS_UNITS || []).forEach(function (bu) {
    var opt = document.createElement('option'); opt.value = bu; opt.textContent = bu; buSelect.appendChild(opt);
  });

  /* Pre-apply ?category= from BOOK-097 row click */
  var initialCategory = params.get('category');
  if (initialCategory) catSelect.value = initialCategory;

  function render() {
    var categoryFilter = catSelect.value;
    var languageFilter = langSelect.value;
    var buFilter = buSelect.value;

    var rows = BOOK.getFaqQuestions().filter(function (q) {
      if (categoryFilter && q.categoryId !== categoryFilter) return false;
      if (languageFilter && q.language !== languageFilter) return false;
      if (buFilter && (q.businessUnits || []).length && q.businessUnits.indexOf(buFilter) === -1) return false;
      if (searchQuery && q.question.toLowerCase().indexOf(searchQuery) === -1) return false;
      return true;
    }).sort(function (a, b) {
      var ca = categoryName(a.categoryId), cb = categoryName(b.categoryId);
      if (ca !== cb) return ca.localeCompare(cb);
      return a.question.localeCompare(b.question);
    });

    var tbody = document.getElementById('q-tbody');
    document.getElementById('result-count').textContent = rows.length + (rows.length === 1 ? ' question' : ' questions');
    document.getElementById('q-empty').hidden = rows.length !== 0;

    tbody.innerHTML = rows.map(function (q, i) {
      return '<tr>' +
        '<td class="cell-sub">' + (i + 1) + '</td>' +
        '<td><span class="badge badge-info">' + categoryName(q.categoryId) + '</span></td>' +
        '<td class="cell-sub">' + q.language + '</td>' +
        '<td class="q-cell-question"><div class="q-text cell-strong">' + q.question + '</div></td>' +
        '<td class="cell-sub">' + fmtDate(q.createdAt) + '</td>' +
        '<td class="row-actions">' +
          '<a class="btn btn-ghost btn-sm" href="../book-100-view-faq-question-details/index.html?id=' + encodeURIComponent(q.id) + '" title="View" aria-label="View"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg></a>' +
          '<a class="btn btn-ghost btn-sm" href="../book-099-add-edit-faq-question/index.html?id=' + encodeURIComponent(q.id) + '" title="Edit" aria-label="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></a>' +
          '<button class="btn btn-ghost btn-sm" data-delete="' + q.id + '" title="Delete" aria-label="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>' +
        '</td></tr>';
    }).join('');
  }

  document.getElementById('btn-search').addEventListener('click', render);
  document.getElementById('search-input').addEventListener('input', function (e) {
    searchQuery = e.target.value.trim().toLowerCase();
    render();
  });
  document.getElementById('clear-filters-btn').addEventListener('click', function () {
    catSelect.value = ''; langSelect.value = ''; buSelect.value = '';
    document.getElementById('search-input').value = ''; searchQuery = '';
    render();
  });
  document.getElementById('btn-add-question').addEventListener('click', function () {
    window.location.href = '../book-099-add-edit-faq-question/index.html' + (catSelect.value ? '?category=' + encodeURIComponent(catSelect.value) : '');
  });

  document.getElementById('q-tbody').addEventListener('click', function (e) {
    var delBtn = e.target.closest('[data-delete]');
    if (!delBtn) return;
    var q = BOOK.getFaqQuestions().filter(function (r) { return r.id === delBtn.dataset.delete; })[0];
    if (!q) return;
    deleteId = q.id;
    document.getElementById('del-q-name').textContent = q.question;
    MM.openModal('modal-question-delete');
  });

  document.getElementById('btn-confirm-delete-question').addEventListener('click', function () {
    if (!deleteId) return;
    BOOK.deleteFaqQuestion(deleteId);
    MM.closeModal('modal-question-delete');
    MM.showToast('Question deleted', { danger: true });
    deleteId = null;
    render();
  });

  render();
})();
