(function () {
  'use strict';
  document.getElementById('f-property').innerHTML = MM.MOCK_PROPERTIES.map(function (p) { return '<option>' + p.name + '</option>'; }).join('');
  document.getElementById('list-tbody').innerHTML = MM.MOCK_PROPERTIES.slice(0, 2).map(function (p) {
    return '<tr><td class="cell-strong">' + p.name + '</td><td class="cell-sub">July 2026</td><td class="row-actions"><button class="btn btn-outline btn-sm">Email to Owner</button></td></tr>';
  }).join('');
  var form = document.getElementById('upload-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Uploading...', function () { MM.showToast('Report uploaded'); form.reset(); });
  });
})();
