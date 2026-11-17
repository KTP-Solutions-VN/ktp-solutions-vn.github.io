(function () {
  'use strict';
  var TRN = MM.TRN;
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var t = id ? TRN.getTutorial(id) : null;
  var slides = t ? (t.slides || []) : [];
  var idx = 0;
  var nextTimer = null;
  var readingComplete = false;

  function mediaIcon(type) {
    if (type === 'video') return '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="14" height="16" rx="2"/><path d="m22 8-6 4 6 4V8Z"/></svg>';
    return '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>';
  }

  function armNextButton() {
    var btn = document.getElementById('next-btn');
    var isLast = idx === slides.length - 1;
    if (isLast) { btn.disabled = false; btn.innerHTML = 'Finish'; return; }
    btn.disabled = true;
    var seconds = 3;
    function tick() {
      btn.innerHTML = 'Next <span class="next-wait">(' + seconds + 's)</span>';
      if (seconds <= 0) {
        btn.disabled = false;
        btn.innerHTML = 'Next <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>';
        return;
      }
      seconds--;
      nextTimer = setTimeout(tick, 1000);
    }
    tick();
  }

  function renderSlide() {
    clearTimeout(nextTimer);
    var s = slides[idx];
    document.getElementById('slide-counter').textContent = 'Slide ' + (idx + 1) + ' of ' + slides.length;
    document.getElementById('slide-title').textContent = s.title;
    document.getElementById('slide-media').innerHTML = mediaIcon(s.mediaType);
    document.getElementById('slide-text').textContent = s.text;
    document.getElementById('progress-bar').style.width = (((idx + 1) / slides.length) * 100) + '%';
    document.getElementById('prev-btn').disabled = idx === 0;
    document.getElementById('stop-btn').textContent = idx === slides.length - 1 ? 'End' : 'Stop';
    armNextButton();
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!t || !slides.length) {
      document.getElementById('reader-wrap').hidden = true;
      document.getElementById('not-found').hidden = false;
      return;
    }
    renderSlide();

    document.getElementById('prev-btn').addEventListener('click', function () {
      if (idx > 0) { idx--; renderSlide(); }
    });
    document.getElementById('next-btn').addEventListener('click', function () {
      if (this.disabled) return;
      if (idx < slides.length - 1) { idx++; renderSlide(); }
      else {
        readingComplete = true;
        TRN.recordReading(id, TRN.CURRENT_USER_ID, TRN.CURRENT_USER, true);
        MM.showToast('Tutorial complete');
        setTimeout(function () { window.location.href = '../trn-008-my-training-record/index.html'; }, 700);
      }
    });
    document.getElementById('stop-btn').addEventListener('click', function () {
      if (idx === slides.length - 1 && !readingComplete) {
        TRN.recordReading(id, TRN.CURRENT_USER_ID, TRN.CURRENT_USER, true);
        MM.showToast('Tutorial complete');
      } else {
        TRN.recordReading(id, TRN.CURRENT_USER_ID, TRN.CURRENT_USER, false);
      }
      window.location.href = '../trn-008-my-training-record/index.html';
    });
  });
})();
