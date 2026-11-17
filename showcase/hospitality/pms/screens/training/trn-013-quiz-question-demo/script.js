(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('validate-btn').addEventListener('click', function () {
      var checked = document.querySelector('input[name="answer"]:checked');
      var errorEl = document.getElementById('quiz-error');
      var feedback = document.getElementById('quiz-feedback');
      if (!checked) { errorEl.textContent = 'Select an answer before validating.'; feedback.hidden = true; return; }
      errorEl.textContent = '';
      feedback.hidden = false;
      if (checked.value === 'b') {
        feedback.className = 'correct';
        feedback.textContent = 'Correct — VIP bookings of $10,000 or more are flagged for concierge review.';
      } else {
        feedback.className = 'incorrect';
        feedback.textContent = 'Not quite — the correct threshold is $10,000.';
      }
    });
  });
})();
