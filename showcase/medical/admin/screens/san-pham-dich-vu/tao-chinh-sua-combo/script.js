
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelector('[data-panel="' + btn.getAttribute('data-tab') + '"]').classList.add('active');
    });
  });
  document.getElementById('saveBtn').addEventListener('click', function () { window.location.href = '../../../screens/san-pham-dich-vu/quan-ly-combo-bundle/index.html'; });
  