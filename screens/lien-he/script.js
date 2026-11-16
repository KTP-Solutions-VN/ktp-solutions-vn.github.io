/* Liên hệ & Đặt lịch tư vấn — conversion form chính, validate + loading state thật */
(function () {
  'use strict';
  var form = document.getElementById('contact-form');
  if (!form) return;

  var fields = {
    hoten: { el: document.getElementById('hoten'), validate: function (v) { return v.trim().length > 0; } },
    email: { el: document.getElementById('email'), validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
    dienthoai: { el: document.getElementById('dienthoai'), validate: function (v) { return /^[0-9\s]{9,11}$/.test(v.trim()); } },
    noidung: { el: document.getElementById('noidung'), validate: function (v) { return v.trim().length > 0; } }
  };

  function setError(name, hasError) {
    var wrapper = document.getElementById('field-' + name);
    wrapper.classList.toggle('has-error', hasError);
  }

  function validateField(name) {
    var f = fields[name];
    var ok = f.validate(f.el.value);
    setError(name, !ok);
    return ok;
  }

  Object.keys(fields).forEach(function (name) {
    fields[name].el.addEventListener('blur', function () { validateField(name); });
    fields[name].el.addEventListener('input', function () {
      if (document.getElementById('field-' + name).classList.contains('has-error')) validateField(name);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var allValid = Object.keys(fields).map(validateField).every(Boolean);
    if (!allValid) {
      var firstError = form.querySelector('.field.has-error .input, .field.has-error .textarea');
      if (firstError) firstError.focus();
      return;
    }

    var btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.textContent = 'Đang gửi...';

    setTimeout(function () {
      window.location.href = 'cam-on/index.html';
    }, 700);
  });
})();
