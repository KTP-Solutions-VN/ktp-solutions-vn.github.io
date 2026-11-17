(function () {
  'use strict';
  var TRN = MM.TRN;
  var params = new URLSearchParams(window.location.search);
  var existingId = params.get('id');
  var tutorialId = null;

  function populateStatic() {
    var buSel = document.getElementById('f-bu');
    TRN.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o); });
    document.getElementById('role-checks').innerHTML = TRN.ROLES.map(function (r) {
      return '<label style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500;"><input type="checkbox" value="' + r + '" class="role-check"> ' + r + '</label>';
    }).join('');
  }

  function toggleQuizFreq() {
    document.getElementById('quiz-freq-row').hidden = !document.getElementById('f-quiz-yes').checked;
  }

  function toggleSlideMedia() {
    document.getElementById('s-image-group').hidden = !document.getElementById('s-media-image').checked;
    document.getElementById('s-video-group').hidden = document.getElementById('s-media-image').checked;
  }

  function toggleSlideQuiz() {
    document.getElementById('s-quiz-fields').hidden = !document.getElementById('s-quiz-yes').checked;
  }

  function renderAddedSlides() {
    var t = TRN.getTutorial(tutorialId);
    var slides = (t && t.slides) || [];
    document.getElementById('no-slides-yet').hidden = !!slides.length;
    document.getElementById('added-slides').innerHTML = slides.map(function (s, i) {
      return '<div class="added-slide"><span class="added-slide__num">' + (i + 1) + '</span><span class="added-slide__title">' + s.title + '</span>' + (s.isQuizPage ? '<span class="badge badge-info">Quiz</span>' : '') + '</div>';
    }).join('');
  }

  function goToStep2(id, headingSuffix) {
    tutorialId = id;
    document.getElementById('step1').hidden = true;
    document.getElementById('step2').hidden = false;
    document.getElementById('step1-tab').classList.remove('active');
    document.getElementById('step2-tab').classList.add('active');
    document.getElementById('page-title').textContent = 'Add Slide' + (headingSuffix ? ' — ' + headingSuffix : '');
    document.getElementById('page-sub').textContent = 'Step 2 of 2 — add slides one at a time, then Finish.';
    renderAddedSlides();
  }

  function collectSlide() {
    var isQuiz = document.getElementById('s-quiz-yes').checked;
    var mediaType = document.getElementById('s-media-image').checked ? 'image' : 'video';
    var slide = {
      id: MM.uid('SLD'),
      title: document.getElementById('s-title').value.trim(),
      mediaType: mediaType,
      text: document.getElementById('s-text').value.trim(),
      isQuizPage: isQuiz
    };
    if (isQuiz) {
      slide.question = document.getElementById('s-question').value.trim();
      slide.option1 = document.getElementById('s-opt1').value.trim();
      slide.option2 = document.getElementById('s-opt2').value.trim();
      slide.option3 = document.getElementById('s-opt3').value.trim();
      slide.correctAnswer = document.getElementById('s-correct').value;
      slide.points = parseInt(document.getElementById('s-points').value, 10) || 10;
      slide.explanation = document.getElementById('s-explanation').value.trim();
    }
    return slide;
  }

  function resetSlideForm() {
    document.getElementById('slide-form').reset();
    document.getElementById('s-media-image').checked = true;
    document.getElementById('s-quiz-no').checked = true;
    toggleSlideMedia();
    toggleSlideQuiz();
  }

  document.addEventListener('DOMContentLoaded', function () {
    populateStatic();
    MM.bindFormValidation(document.getElementById('tutorial-form'));
    MM.bindFormValidation(document.getElementById('slide-form'));

    document.getElementById('f-quiz-yes').addEventListener('change', toggleQuizFreq);
    document.getElementById('f-quiz-no').addEventListener('change', toggleQuizFreq);
    document.getElementById('s-media-image').addEventListener('change', toggleSlideMedia);
    document.getElementById('s-media-video').addEventListener('change', toggleSlideMedia);
    document.getElementById('s-quiz-yes').addEventListener('change', toggleSlideQuiz);
    document.getElementById('s-quiz-no').addEventListener('change', toggleSlideQuiz);

    if (existingId) {
      var existing = TRN.getTutorial(existingId);
      if (existing) goToStep2(existingId, existing.title);
    }

    document.getElementById('step1-next-btn').addEventListener('click', function () {
      if (!MM.validateForm(document.getElementById('tutorial-form'))) { MM.showToast('Please fill in all required fields.', { danger: true }); return; }
      var roles = Array.from(document.querySelectorAll('.role-check:checked')).map(function (c) { return c.value; });
      if (!roles.length) { document.getElementById('role-error').textContent = 'Select at least 1 target audience.'; return; }
      document.getElementById('role-error').textContent = '';
      MM.simulateSave(document.getElementById('step1-next-btn'), 'Saving...', function () {
        var isQuiz = document.getElementById('f-quiz-yes').checked;
        var isReady = document.getElementById('f-release').checked;
        var tutorial = {
          id: MM.uid('TUT').toUpperCase(),
          title: document.getElementById('f-title').value.trim(),
          businessUnit: document.getElementById('f-bu').value,
          accessLevel: document.getElementById('f-level').value,
          roles: roles,
          image: null,
          isQuiz: isQuiz,
          maxQuizFrequency: isQuiz ? (parseInt(document.getElementById('f-max-freq').value, 10) || 0) : 0,
          minQuizFrequency: isQuiz ? (parseInt(document.getElementById('f-min-freq').value, 10) || 0) : 0,
          isReadyRelease: isReady,
          releaseDate: isReady ? new Date().toISOString().slice(0, 10) : null,
          status: isReady ? 'active' : 'inactive',
          createdBy: TRN.CURRENT_USER,
          createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
          slides: []
        };
        TRN.addTutorial(tutorial);
        MM.showToast('Tutorial created — now add slides');
        goToStep2(tutorial.id, tutorial.title);
      });
    });

    document.getElementById('save-add-another-btn').addEventListener('click', function () {
      if (!MM.validateForm(document.getElementById('slide-form'))) { MM.showToast('Please fill in all required fields.', { danger: true }); return; }
      TRN.addSlide(tutorialId, collectSlide());
      MM.showToast('Slide added');
      resetSlideForm();
      renderAddedSlides();
    });

    document.getElementById('finish-btn').addEventListener('click', function () {
      var hasContent = document.getElementById('s-title').value.trim() || document.getElementById('s-text').value.trim();
      if (hasContent) {
        if (!MM.validateForm(document.getElementById('slide-form'))) { MM.showToast('Please finish or clear the current slide first.', { danger: true }); return; }
        TRN.addSlide(tutorialId, collectSlide());
      }
      MM.showToast('Tutorial saved');
      setTimeout(function () { window.location.href = '../trn-002-tutorial-list-admin/index.html'; }, 700);
    });
  });
})();
