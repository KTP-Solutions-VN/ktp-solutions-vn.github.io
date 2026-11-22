/* Vendors screen behaviour — renders the vendor table (shared mock data
   from layout.js) and drives the 4-step onboarding wizard. */

(function () {
  'use strict';

  var STATUS_BADGE = {
    active: '<span class="badge badge-success">Active</span>',
    onboarding: '<span class="badge badge-warning">Onboarding</span>',
    suspended: '<span class="badge badge-danger">Suspended</span>'
  };

  var PLAN_FEE = {
    'Subscription': '$1,200 / mo',
    'Per-Property': '$45 / property / mo',
    'Performance-based': '5% of booking revenue'
  };

  function renderVendors() {
    var tbody = document.getElementById('vendors-tbody');
    tbody.innerHTML = '';

    window.CM.MOCK_VENDORS.forEach(function (v) {
      var providerChips = v.provider.map(function (p) {
        return '<span class="vendor-provider-chip">' + p + '</span>';
      }).join('');

      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td class="cell-strong">' + v.name + '</td>' +
        '<td>' + v.plan + '</td>' +
        '<td>' + v.properties + '</td>' +
        '<td><div class="vendor-provider-chips">' + providerChips + '</div></td>' +
        '<td>' + STATUS_BADGE[v.status] + '</td>' +
        '<td>' + PLAN_FEE[v.plan] + '</td>' +
        '<td><button class="btn btn-sm btn-outline">Manage</button></td>';
      tbody.appendChild(tr);
    });
  }

  /* --- Onboarding wizard --- */

  var currentStep = 1;
  var TOTAL_STEPS = 4;

  function goToStep(step) {
    currentStep = step;

    document.querySelectorAll('.wizard-step').forEach(function (el) {
      var n = Number(el.getAttribute('data-step'));
      el.classList.toggle('active', n === step);
      el.classList.toggle('done', n < step);
    });

    document.querySelectorAll('.wizard-panel').forEach(function (el) {
      el.style.display = (Number(el.getAttribute('data-panel')) === step) ? '' : 'none';
    });

    document.getElementById('wiz-back-btn').style.visibility = (step === 1) ? 'hidden' : 'visible';
    document.getElementById('wiz-next-btn').textContent = (step === TOTAL_STEPS) ? 'Create Operator' : 'Next';

    if (step === TOTAL_STEPS) {
      document.getElementById('review-name').textContent = document.getElementById('wiz-name').value || '(unnamed operator)';
      var planLabel = document.querySelector('input[name="wiz-plan"]:checked').parentElement.querySelector('strong').textContent;
      document.getElementById('review-plan').textContent = planLabel;
    }
  }

  document.getElementById('btn-onboard-vendor').addEventListener('click', function () {
    goToStep(1);
    document.getElementById('wiz-name').value = '';
    window.CM.openModal('modal-onboard-wizard');
  });

  document.getElementById('wiz-next-btn').addEventListener('click', function () {
    if (currentStep === TOTAL_STEPS) {
      window.CM.closeModal('modal-onboard-wizard');
      window.CM.showToast('Operator created — invitation email sent.');
      return;
    }
    goToStep(currentStep + 1);
  });

  document.getElementById('wiz-back-btn').addEventListener('click', function () {
    if (currentStep > 1) goToStep(currentStep - 1);
  });

  renderVendors();
})();
