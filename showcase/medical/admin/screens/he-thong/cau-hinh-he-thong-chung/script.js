
  document.querySelectorAll('.settings-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.settings-tab').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.settings-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelector('.settings-panel[data-panel="' + btn.getAttribute('data-panel') + '"]').classList.add('active');
    });
  });
  document.getElementById('saveBtn').addEventListener('click', function () { CJToast('System configuration saved. This change has been recorded in the Audit Log.'); });
  