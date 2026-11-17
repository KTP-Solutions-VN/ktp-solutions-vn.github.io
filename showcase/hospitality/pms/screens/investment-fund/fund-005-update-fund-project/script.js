(function () {
  'use strict';
  var params = new URLSearchParams(window.location.search);
  var project = MM.FUND.PROJECTS.find(function (p) { return p.id === params.get('id'); }) || MM.FUND.PROJECTS[0];
  document.getElementById('project-name-sub').textContent = 'Editing ' + project.name;
  document.getElementById('f-name').value = project.name;
  document.getElementById('f-target').value = project.target;

  var form = document.getElementById('project-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
      MM.showToast('Fund project updated');
      setTimeout(function () { window.location.href = '../fund-006-fund-project-detail/index.html?id=' + project.id; }, 600);
    });
  });
})();
