(function () {
  'use strict';
  var BOOK = MM.BOOK;
  var params = new URLSearchParams(window.location.search);
  var editId = params.get('id');
  var form = document.getElementById('faq-form');
  MM.bindFormValidation(form);

  var catSelect = document.getElementById('f-category');
  BOOK.getFaqCategories().slice().sort(function (a, b) { return a.name.localeCompare(b.name); }).forEach(function (c) {
    var opt = document.createElement('option'); opt.value = c.id; opt.textContent = c.name; catSelect.appendChild(opt);
  });
  var langSelect = document.getElementById('f-language');
  (BOOK.FAQ_LANGUAGES || ['English']).forEach(function (l) {
    var opt = document.createElement('option'); opt.value = l; opt.textContent = l; langSelect.appendChild(opt);
  });
  var buList = document.getElementById('f-bu-list');
  (BOOK.BUSINESS_UNITS || []).forEach(function (bu) {
    var label = document.createElement('label');
    label.innerHTML = '<input type="checkbox" class="f-bu" value="' + bu + '"> ' + bu;
    buList.appendChild(label);
  });

  var existing = editId ? BOOK.getFaqQuestionById(editId) : null;

  if (existing) {
    document.getElementById('page-title').textContent = 'Edit FAQ Question';
    document.getElementById('crumb-current').textContent = 'Edit FAQ Question';
    document.getElementById('page-subtitle').textContent = 'Update the question, its answer, and applicable business units.';
    document.title = 'Edit FAQ Question — Azura Manager';
    document.getElementById('f-id').value = existing.id;
    catSelect.value = existing.categoryId || '';
    langSelect.value = existing.language || '';
    document.getElementById('f-question').value = existing.question || '';
    document.getElementById('f-answer').value = existing.answer || '';
    (existing.businessUnits || []).forEach(function (bu) {
      var cb = buList.querySelector('input[value="' + CSS.escape(bu) + '"]');
      if (cb) cb.checked = true;
    });
  } else {
    var preselectCategory = params.get('category');
    if (preselectCategory) catSelect.value = preselectCategory;
  }

  document.getElementById('btn-save').addEventListener('click', function () {
    if (!MM.validateForm(form)) return;

    var categoryId = catSelect.value;
    var language = langSelect.value;
    var question = document.getElementById('f-question').value.trim();

    var existingId = existing ? existing.id : null;
    var dup = BOOK.getFaqQuestions().some(function (q) {
      return q.id !== existingId && q.categoryId === categoryId && q.language === language &&
        q.question.trim().toLowerCase() === question.toLowerCase();
    });
    if (dup) {
      var qGroup = document.getElementById('f-question').closest('.form-group');
      qGroup.classList.add('has-error');
      qGroup.querySelector('.form-error').textContent = 'A question with this exact text already exists in this category/language.';
      return;
    }

    var businessUnits = Array.prototype.slice.call(buList.querySelectorAll('.f-bu:checked')).map(function (cb) { return cb.value; });

    var btn = document.getElementById('btn-save');
    MM.simulateSave(btn, 'Saving...', function () {
      var row = {
        id: existing ? existing.id : MM.uid('FQ'),
        categoryId: categoryId,
        language: language,
        question: question,
        answer: document.getElementById('f-answer').value.trim(),
        businessUnits: businessUnits,
        createdAt: existing ? existing.createdAt : new Date().toISOString()
      };
      BOOK.saveFaqQuestion(row);
      if (existing) {
        MM.showToast('Question updated');
      } else {
        MM.showToast('Question added');
        setTimeout(function () { window.location.href = '../book-098-faq-question-list/index.html'; }, 500);
      }
    });
  });
})();
