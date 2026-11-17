(function () {
  'use strict';
  var TRN = MM.TRN;
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var t = id ? TRN.getTutorial(id) : null;
  var deletingSlideId = null;

  function toggleQuizFreq() {
    document.getElementById('quiz-freq-row').hidden = !document.getElementById('f-quiz-yes').checked;
  }

  function renderSlides() {
    t = TRN.getTutorial(id);
    var tbody = document.getElementById('slides-tbody');
    var slides = t.slides || [];
    document.getElementById('no-slides').hidden = !!slides.length;
    tbody.innerHTML = slides.map(function (s) {
      var truncated = s.text.length > 100 ? s.text.slice(0, 100) + '…' : s.text;
      var readMore = s.text.length > 100 ? ' <a href="../trn-004-view-tutorial-details/index.html?id=' + id + '" target="_blank" class="text-sm">Read more</a>' : '';
      return '<tr><td class="cell-strong">' + s.title + '</td><td class="cell-sub">' + truncated + readMore + '</td>' +
        '<td class="row-actions" style="text-align:right;">' +
        '<a href="../trn-006-edit-tutorial-slide/index.html?tid=' + id + '&sid=' + s.id + '" class="btn btn-ghost btn-sm" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></a>' +
        '<button class="btn btn-ghost btn-sm" data-delete-slide="' + s.id + '" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!t) {
      document.getElementById('detail-wrap').hidden = true;
      document.getElementById('not-found').hidden = false;
      return;
    }
    var buSel = document.getElementById('f-bu');
    TRN.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o); });
    document.getElementById('role-checks').innerHTML = TRN.ROLES.map(function (r) {
      var checked = t.roles.indexOf(r) > -1 ? ' checked' : '';
      return '<label style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500;"><input type="checkbox" value="' + r + '" class="role-check"' + checked + '> ' + r + '</label>';
    }).join('');

    document.getElementById('f-bu').value = t.businessUnit;
    document.getElementById('f-title').value = t.title;
    document.getElementById('f-level').value = t.accessLevel;
    document.getElementById('f-release').checked = t.isReadyRelease;
    document.getElementById(t.isQuiz ? 'f-quiz-yes' : 'f-quiz-no').checked = true;
    document.getElementById('f-min-freq').value = t.minQuizFrequency || 0;
    document.getElementById('f-max-freq').value = t.maxQuizFrequency || 0;
    toggleQuizFreq();

    document.getElementById('f-quiz-yes').addEventListener('change', toggleQuizFreq);
    document.getElementById('f-quiz-no').addEventListener('change', toggleQuizFreq);
    document.getElementById('add-slide-link').href = '../trn-003-add-tutorial-and-slide/index.html?id=' + id;

    MM.bindFormValidation(document.getElementById('tutorial-form'));
    renderSlides();

    document.getElementById('update-btn').addEventListener('click', function () {
      if (!MM.validateForm(document.getElementById('tutorial-form'))) { MM.showToast('Please fill in all required fields.', { danger: true }); return; }
      var roles = Array.from(document.querySelectorAll('.role-check:checked')).map(function (c) { return c.value; });
      if (!roles.length) { document.getElementById('role-error').textContent = 'Select at least 1 target audience.'; return; }
      document.getElementById('role-error').textContent = '';
      MM.simulateSave(document.getElementById('update-btn'), 'Saving...', function () {
        var isQuiz = document.getElementById('f-quiz-yes').checked;
        var isReady = document.getElementById('f-release').checked;
        TRN.updateTutorial(id, function (tut) {
          tut.businessUnit = document.getElementById('f-bu').value;
          tut.title = document.getElementById('f-title').value.trim();
          tut.accessLevel = document.getElementById('f-level').value;
          tut.roles = roles;
          tut.isQuiz = isQuiz;
          tut.maxQuizFrequency = isQuiz ? (parseInt(document.getElementById('f-max-freq').value, 10) || 0) : 0;
          tut.minQuizFrequency = isQuiz ? (parseInt(document.getElementById('f-min-freq').value, 10) || 0) : 0;
          tut.isReadyRelease = isReady;
          tut.status = isReady ? 'active' : 'inactive';
          if (isReady && !tut.releaseDate) tut.releaseDate = new Date().toISOString().slice(0, 10);
        });
        MM.showToast('Tutorial updated');
        setTimeout(function () { window.location.href = '../trn-002-tutorial-list-admin/index.html'; }, 700);
      });
    });

    document.getElementById('slides-tbody').addEventListener('click', function (e) {
      var delBtn = e.target.closest('[data-delete-slide]');
      if (!delBtn) return;
      var slideId = delBtn.getAttribute('data-delete-slide');
      var s = (t.slides || []).find(function (x) { return x.id === slideId; });
      deletingSlideId = slideId;
      document.getElementById('del-slide-title').textContent = s ? s.title : '';
      MM.openModal('delete-slide-modal');
    });

    document.getElementById('confirm-delete-slide-btn').addEventListener('click', function () {
      TRN.deleteSlide(id, deletingSlideId);
      MM.closeModal('delete-slide-modal');
      MM.showToast('Slide deleted', { danger: true });
      renderSlides();
    });
  });
})();
