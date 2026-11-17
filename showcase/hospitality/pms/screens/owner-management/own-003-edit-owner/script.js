(function () {
  'use strict';
  var owner = MM.MOCK_OWNERS[0];
  document.getElementById('owner-name').textContent = owner.name;
  document.getElementById('bc-name').textContent = owner.name;
  var parts = owner.name.split(' ');
  document.getElementById('f-first').value = parts[0];
  document.getElementById('f-last').value = parts.slice(1).join(' ');
  document.getElementById('f-email').value = owner.email;

  document.getElementById('villas-tbody').innerHTML = MM.MOCK_PROPERTIES.filter(function (p) { return owner.properties.indexOf(p.id) !== -1; }).map(function (p) {
    return '<tr><td class="cell-strong">' + p.name + '</td><td>' + p.bedrooms + '</td><td class="cell-sub">' + p.bu + '</td></tr>';
  }).join('');

  var form = document.getElementById('owner-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-details-btn'), 'Saving...', function () { MM.showToast('Owner details saved'); });
  });
})();
