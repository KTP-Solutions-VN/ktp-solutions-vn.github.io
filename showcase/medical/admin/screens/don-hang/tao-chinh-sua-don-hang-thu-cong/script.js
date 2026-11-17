
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelector('[data-panel="' + btn.getAttribute('data-tab') + '"]').classList.add('active');
    });
  });
  document.getElementById('sendBtn').addEventListener('click', function () {
    window.location.href = '../../../screens/don-hang/danh-sach-don-hang/index.html';
  });
  