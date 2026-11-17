(function () {
  'use strict';

  var VALID_ACCESS_CODE = 'AZURA-JW2026';

  // Already-logged-in guests reopening this URL are redirected straight to
  // "My Booking Details" (GST-003), per the legacy Guest::index() behavior.
  var existingSession = GST.getSession();
  if (existingSession) {
    window.location.href = '../gst-003-my-booking-details/index.html';
    return;
  }

  var form = document.getElementById('guest-login-form');
  var message = document.getElementById('login_message');
  var submitBtn = document.getElementById('guest-login-submit');
  var codeInput = document.getElementById('access_code');
  var fillDemoBtn = document.getElementById('fill-demo-code');

  MM.bindFormValidation(form);

  fillDemoBtn.addEventListener('click', function () {
    codeInput.value = VALID_ACCESS_CODE;
    codeInput.focus();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    message.hidden = true;
    if (!MM.validateForm(form)) return;

    var code = codeInput.value.trim().toUpperCase();

    MM.simulateSave(submitBtn, 'Checking access code...', function () {
      if (code !== VALID_ACCESS_CODE) {
        message.hidden = false;
        return;
      }
      GST.setSession({ guestId: GST.GUEST.id, accessCode: code, loginAt: new Date().toISOString() });
      window.location.href = '../gst-002-guest-booking-list/index.html';
    });
  });
})();
