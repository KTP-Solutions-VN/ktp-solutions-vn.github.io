(function () {
  'use strict';
  var STORAGE_KEY = 'mm_usr_virtual_users';
  var BASE_DATA = [
    { id: 'vu1', name: 'Concierge Team', dept: 'Concierge' },
    { id: 'vu2', name: 'Housekeeping Team', dept: 'Housekeeping' },
    { id: 'vu3', name: 'Maintenance Crew', dept: 'Maintenance' },
    { id: 'vu4', name: 'Garden Crew', dept: 'Garden' },
    { id: 'vu5', name: 'Pool Team', dept: 'Pool' }
  ];

  function render() {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var data = BASE_DATA.concat(stored);
    var dept = document.getElementById('f-dept').value;
    var filtered = data.filter(function (v) { return dept === 'All Departments' || !dept || v.dept === dept; });
    document.getElementById('vu-grid').innerHTML = filtered.map(function (v) {
      return '<div class="card vu-card"><div class="vu-card__avatar">' + v.name.charAt(0) + '</div><div><div class="cell-strong">' + v.name + '</div><div class="cell-sub">' + v.dept + '</div></div></div>';
    }).join('');
  }
  render();

  document.getElementById('f-dept').addEventListener('change', render);
  document.getElementById('add-btn').addEventListener('click', function () { document.getElementById('vu-form').reset(); MM.openModal('vu-modal'); });

  document.getElementById('save-btn').addEventListener('click', function () {
    var form = document.getElementById('vu-form');
    if (!MM.validateForm(form)) return;
    MM.simulateSave(this, 'Saving...', function () {
      var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      stored.push({ id: MM.uid('vu'), name: document.getElementById('f-name').value.trim(), dept: document.getElementById('f-dept-select').value });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      MM.closeModal('vu-modal');
      MM.showToast('Virtual user added');
      render();
    });
  });
})();
