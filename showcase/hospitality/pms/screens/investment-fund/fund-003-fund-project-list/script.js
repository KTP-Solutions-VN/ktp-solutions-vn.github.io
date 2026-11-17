(function () {
  'use strict';
  var statusMap = { 'fully-funded': 'badge-success', open: 'badge-info', closed: 'badge-neutral' };

  function render() {
    var stored = JSON.parse(localStorage.getItem('mm_fund_projects') || '[]');
    var allProjects = MM.FUND.PROJECTS.concat(stored);
    document.getElementById('project-cards').innerHTML = allProjects.map(function (p) {
      var pct = Math.round((p.raised / p.target) * 100);
      return '<a class="card hoverable fp-card" href="../fund-006-fund-project-detail/index.html?id=' + p.id + '" style="text-decoration:none;">' +
        '<div class="flex-between"><h3>' + p.name + '</h3><span class="badge ' + statusMap[p.status] + '">' + p.status.replace('-', ' ') + '</span></div>' +
        '<div class="fp-progress"><div class="fp-progress__bar" style="width:' + Math.min(pct, 100) + '%"></div></div>' +
        '<div class="flex-between text-sm text-muted"><span>$' + p.raised.toLocaleString() + ' of $' + p.target.toLocaleString() + '</span><span>' + p.investors + ' investors</span></div>' +
        '</a>';
    }).join('');
  }
  render();

  // --- Add Fund Project drawer (merged in from FUND-004) ---
  var form = document.getElementById('project-form');
  MM.bindFormValidation(form);

  document.getElementById('add-project-btn').addEventListener('click', function () {
    form.reset();
    form.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
    MM.openModal('project-drawer');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-project-btn'), 'Creating...', function () {
      var stored = JSON.parse(localStorage.getItem('mm_fund_projects') || '[]');
      stored.push({
        id: MM.uid('fp'), name: document.getElementById('f-name').value.trim(),
        target: parseFloat(document.getElementById('f-target').value), raised: 0, status: 'open', investors: 0
      });
      localStorage.setItem('mm_fund_projects', JSON.stringify(stored));
      MM.closeModal('project-drawer');
      MM.showToast('Fund project created');
      render();
    });
  });
})();
