(function () {
  'use strict';
  var KEY = 'mm_trn_settings';
  var DEFAULTS = { requireQuiz: false, publishDefault: true, minFreq: 30, maxFreq: 60, remindDue: true, escalateOverdue: false };

  function load() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { return Object.assign({}, DEFAULTS); }
  }

  function apply(s) {
    document.getElementById('s-require-quiz').checked = s.requireQuiz;
    document.getElementById('s-publish-default').checked = s.publishDefault;
    document.getElementById('s-min-freq').value = s.minFreq;
    document.getElementById('s-max-freq').value = s.maxFreq;
    document.getElementById('s-remind-due').checked = s.remindDue;
    document.getElementById('s-escalate-overdue').checked = s.escalateOverdue;
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(load());

    document.getElementById('save-btn').addEventListener('click', function () {
      MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
        var s = {
          requireQuiz: document.getElementById('s-require-quiz').checked,
          publishDefault: document.getElementById('s-publish-default').checked,
          minFreq: parseInt(document.getElementById('s-min-freq').value, 10) || 0,
          maxFreq: parseInt(document.getElementById('s-max-freq').value, 10) || 0,
          remindDue: document.getElementById('s-remind-due').checked,
          escalateOverdue: document.getElementById('s-escalate-overdue').checked
        };
        localStorage.setItem(KEY, JSON.stringify(s));
        MM.showToast('Training settings saved');
      });
    });

    document.getElementById('reset-btn').addEventListener('click', function () {
      localStorage.removeItem(KEY);
      apply(load());
      MM.showToast('Settings reset to defaults');
    });
  });
})();
