(function () {
  'use strict';
  var STORAGE_KEY = 'mm_usr_payroll_rules';

  var RULES_BASE = [
    { id: 'rule1', legalEntity: 'Azura Stays Singapore Pte. Ltd.', nationality: 'Singaporean', minSeniority: 0, dailyWage: 18 },
    { id: 'rule2', legalEntity: 'Azura Stays Singapore Pte. Ltd.', nationality: 'Singaporean', minSeniority: 12, dailyWage: 22 },
    { id: 'rule3', legalEntity: 'Azura Stays Australia Pty Ltd', nationality: 'Australian', minSeniority: 0, dailyWage: 15 }
  ];

  function loadRules() {
    var added = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return RULES_BASE.concat(added);
  }

  function render() {
    var entity = document.getElementById('f-entity').value;
    var all = loadRules().filter(function (r) { return !entity || r.legalEntity === entity; });
    document.getElementById('rules-tbody').innerHTML = all.map(function (r) {
      return '<tr><td>' + r.legalEntity + '</td><td>' + r.nationality + '</td><td class="cell-num">' + r.minSeniority + '</td><td class="cell-num">$' + r.dailyWage + '</td></tr>';
    }).join('') || '<tr><td colspan="4" class="text-muted text-sm">No payroll rules match this filter.</td></tr>';
  }
  render();

  document.getElementById('f-entity').addEventListener('change', render);

  document.getElementById('f-nat-type').addEventListener('change', function () {
    document.getElementById('nationality-group').style.display = this.value === 'all' ? 'none' : '';
  });

  document.getElementById('add-rule-btn').addEventListener('click', function () {
    document.getElementById('rule-form').reset();
    document.getElementById('nationality-group').style.display = 'none';
    MM.openModal('rule-drawer');
  });

  var form = document.getElementById('rule-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('rule-save-btn'), 'Creating...', function () {
      var natType = document.getElementById('f-nat-type').value;
      var selected = Array.from(document.getElementById('f-nationality').selectedOptions).map(function (o) { return o.value; });
      var nationality = 'All';
      if (natType === 'equal') nationality = selected.join(', ') || 'All';
      else if (natType === 'different') nationality = selected.length ? ('Not ' + selected.join(', ')) : 'All';
      var added = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      added.push({
        id: MM.uid('rule'), legalEntity: document.getElementById('f-rule-entity').value, nationality: nationality,
        minSeniority: parseInt(document.getElementById('f-seniority').value, 10) || 0,
        dailyWage: parseFloat(document.getElementById('f-wage').value) || 0
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(added));
      MM.showToast('Payroll rule created');
      MM.closeModal('rule-drawer');
      render();
    });
  });
})();
