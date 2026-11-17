(function () {
  'use strict';
  var TRN = MM.TRN;
  var params = new URLSearchParams(window.location.search);
  var tid = params.get('tid');
  var sid = params.get('sid');
  var t = tid ? TRN.getTutorial(tid) : null;
  var slide = t ? (t.slides || []).find(function (s) { return s.id === sid; }) : null;

  function toggleMedia() {
    document.getElementById('s-image-group').hidden = !document.getElementById('s-media-image').checked;
    document.getElementById('s-video-group').hidden = document.getElementById('s-media-image').checked;
  }
  function toggleQuiz() {
    document.getElementById('s-quiz-fields').hidden = !document.getElementById('s-quiz-yes').checked;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var backHref = '../trn-005-edit-tutorial/index.html?id=' + tid;
    document.getElementById('cancel-link').href = backHref;
    document.getElementById('cancel-link-2').href = backHref;

    if (!slide) {
      document.getElementById('detail-wrap').hidden = true;
      document.getElementById('not-found').hidden = false;
      return;
    }

    document.getElementById('page-sub').textContent = 'Part of "' + t.title + '"';
    document.getElementById('s-title').value = slide.title;
    document.getElementById(slide.mediaType === 'video' ? 's-media-video' : 's-media-image').checked = true;
    document.getElementById('s-text').value = slide.text;
    document.getElementById(slide.isQuizPage ? 's-quiz-yes' : 's-quiz-no').checked = true;
    if (slide.isQuizPage) {
      document.getElementById('s-question').value = slide.question || '';
      document.getElementById('s-opt1').value = slide.option1 || '';
      document.getElementById('s-opt2').value = slide.option2 || '';
      document.getElementById('s-opt3').value = slide.option3 || '';
      document.getElementById('s-correct').value = slide.correctAnswer || '1';
      document.getElementById('s-points').value = slide.points || 10;
      document.getElementById('s-explanation').value = slide.explanation || '';
    }
    toggleMedia();
    toggleQuiz();

    document.getElementById('s-media-image').addEventListener('change', toggleMedia);
    document.getElementById('s-media-video').addEventListener('change', toggleMedia);
    document.getElementById('s-quiz-yes').addEventListener('change', toggleQuiz);
    document.getElementById('s-quiz-no').addEventListener('change', toggleQuiz);

    MM.bindFormValidation(document.getElementById('slide-form'));

    document.getElementById('update-btn').addEventListener('click', function () {
      if (!MM.validateForm(document.getElementById('slide-form'))) { MM.showToast('Please fill in all required fields.', { danger: true }); return; }
      MM.simulateSave(document.getElementById('update-btn'), 'Saving...', function () {
        var isQuiz = document.getElementById('s-quiz-yes').checked;
        TRN.updateSlide(tid, sid, function (s) {
          s.title = document.getElementById('s-title').value.trim();
          s.mediaType = document.getElementById('s-media-video').checked ? 'video' : 'image';
          s.text = document.getElementById('s-text').value.trim();
          s.isQuizPage = isQuiz;
          if (isQuiz) {
            s.question = document.getElementById('s-question').value.trim();
            s.option1 = document.getElementById('s-opt1').value.trim();
            s.option2 = document.getElementById('s-opt2').value.trim();
            s.option3 = document.getElementById('s-opt3').value.trim();
            s.correctAnswer = document.getElementById('s-correct').value;
            s.points = parseInt(document.getElementById('s-points').value, 10) || 10;
            s.explanation = document.getElementById('s-explanation').value.trim();
          }
        });
        MM.showToast('Slide updated');
        setTimeout(function () { window.location.href = backHref; }, 700);
      });
    });
  });
})();
