(function () {
  'use strict';
  var BOOK = MM.BOOK;
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var q = id ? BOOK.getFaqQuestionById(id) : null;

  function fmtDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' +
      d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  if (!q) {
    document.getElementById('not-found').hidden = false;
    document.getElementById('detail-content').hidden = true;
    document.getElementById('btn-edit').style.display = 'none';
    return;
  }

  var cat = BOOK.getFaqCategories().filter(function (c) { return c.id === q.categoryId; })[0];
  document.getElementById('v-category').textContent = cat ? cat.name : 'Unassigned';
  document.getElementById('v-language').textContent = q.language || '—';
  document.getElementById('v-created').textContent = fmtDate(q.createdAt);
  var bu = q.businessUnits || [];
  document.getElementById('v-bu').innerHTML = bu.length
    ? bu.map(function (b) { return '<span class="tag-chip">' + b + '</span>'; }).join('')
    : '<span class="text-muted">All Business Units</span>';
  document.getElementById('v-question').value = q.question;
  document.getElementById('v-answer').value = q.answer;
  document.getElementById('btn-edit').href = '../book-099-add-edit-faq-question/index.html?id=' + encodeURIComponent(q.id);
})();
