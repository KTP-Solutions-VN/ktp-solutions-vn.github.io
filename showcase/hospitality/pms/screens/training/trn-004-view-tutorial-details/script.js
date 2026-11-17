(function () {
  'use strict';
  var TRN = MM.TRN;
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var t = id ? TRN.getTutorial(id) : null;

  document.addEventListener('DOMContentLoaded', function () {
    if (!t) {
      document.getElementById('detail-wrap').hidden = true;
      document.getElementById('not-found').hidden = false;
      return;
    }
    document.getElementById('page-title').textContent = t.title;
    document.getElementById('page-sub').textContent = t.businessUnit + ' — created by ' + t.createdBy;
    document.getElementById('d-level').innerHTML = TRN.levelBadge(t.accessLevel);
    document.getElementById('d-roles').textContent = TRN.rolesText(t.roles);
    document.getElementById('d-hasquiz').textContent = t.isQuiz ? 'Yes' : 'No';
    document.getElementById('d-freq').textContent = t.isQuiz ? (t.minQuizFrequency + '–' + t.maxQuizFrequency + ' days') : '—';

    document.getElementById('slides-list').innerHTML = (t.slides || []).map(function (s, i) {
      var quizHtml = '';
      if (s.isQuizPage) {
        quizHtml = '<div class="slide-quiz"><p class="slide-quiz__q">Quiz: ' + s.question + '</p><ul>' +
          '<li>' + s.option1 + (s.correctAnswer === '1' ? ' <strong>(correct)</strong>' : '') + '</li>' +
          '<li>' + s.option2 + (s.correctAnswer === '2' ? ' <strong>(correct)</strong>' : '') + '</li>' +
          '<li>' + s.option3 + (s.correctAnswer === '3' ? ' <strong>(correct)</strong>' : '') + '</li>' +
          '</ul><p class="text-xs text-muted" style="margin:8px 0 0;">' + s.points + ' points — ' + s.explanation + '</p></div>';
      }
      return '<div class="slide-detail"><p class="slide-detail__title">' + (i + 1) + '. ' + s.title + ' <span class="badge badge-neutral">' + s.mediaType + '</span></p>' +
        '<p class="slide-detail__text">' + s.text + '</p>' + quizHtml + '</div>';
    }).join('') || '<p class="text-sm text-muted">No slides in this tutorial yet.</p>';
  });
})();
