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

  /* Điền sẵn ô Nội dung từ query string (theo ngôn ngữ đang chọn, ô đã có chữ thì giữ nguyên):
     - ?diem-bat-dau=        : kết quả công cụ "Tìm điểm bắt đầu" (trang Tư vấn ứng dụng công nghệ, đã đúng ngôn ngữ)
     - ?yeu-cau-demo=        : tên dự án khi bấm "Request for demo" (dự án không có playground / demo)
     - ?yeu-cau-demo-agent=  : tên AI Agent mẫu khi bấm "Request for demo" ở trang Tư vấn ứng dụng công nghệ */
  try {
    var params = new URLSearchParams(window.location.search);
    var en = (localStorage.getItem('ktp_lang') || 'vi') === 'en';
    var demoFor = params.get('yeu-cau-demo');
    var agentFor = params.get('yeu-cau-demo-agent');
    var prefill = params.get('diem-bat-dau');
    var text = '';
    if (agentFor) {
      text = en
        ? 'AI Agent demo request: "' + agentFor.slice(0, 120) + '".\nI would like to see how this agent works and how it could fit into my company\'s processes.\n\nProcess / task I want to apply it to: '
        : 'Yêu cầu demo AI Agent: "' + agentFor.slice(0, 120) + '".\nTôi muốn xem agent này hoạt động thế nào và có thể áp dụng vào quy trình của doanh nghiệp tôi ra sao.\n\nQuy trình / công việc tôi muốn áp dụng: ';
    } else if (demoFor) {
      text = en
        ? 'Project demo request: "' + demoFor.slice(0, 200) + '".\nI would like to see a demo of this project\'s product / system. Please contact me to schedule it.\n\nMore about my company\'s needs: '
        : 'Yêu cầu demo dự án: "' + demoFor.slice(0, 200) + '".\nTôi muốn được xem demo sản phẩm/hệ thống của dự án này. Vui lòng liên hệ để sắp xếp lịch demo.\n\nThông tin thêm về nhu cầu của doanh nghiệp tôi: ';
    } else if (prefill) {
      text = prefill.slice(0, 900) + '\n\n';
    }
    if (text && !fields.noidung.el.value.trim()) fields.noidung.el.value = text;
  } catch (e) { /* URLSearchParams / localStorage không khả dụng — form vẫn dùng bình thường */ }

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
