(function () {
  'use strict';
  var REN = window.MM.REN;
  var params = new URLSearchParams(window.location.search);
  var projectId = params.get('id') || REN.getProjects()[0].id;
  var project = REN.getProject(projectId);

  document.getElementById('proj-sub').textContent = project.title + ' — ' + project.villaName;
  document.getElementById('bc-project-link').href = '../ren-003-renovation-project-follow-up/index.html?id=' + projectId;

  function render() {
    project = REN.getProject(projectId);
    document.getElementById('ledger-tbody').innerHTML = project.payments.map(function (p) {
      return '<tr><td class="cell-sub">' + REN.date(p.date) + '</td><td class="cell-strong">' + p.post + '</td><td>' + p.paidBy + '</td><td>' + p.paidTo + '</td><td class="cell-sub">' + (p.paymentMethod || '—') + '</td><td class="cell-num">' + REN.money(p.debit) + '</td></tr>';
    }).join('') || '<tr><td colspan="6" class="text-muted text-sm">No payments recorded yet.</td></tr>';

    var total = project.payments.reduce(function (s, p) { return s + (p.debit || 0); }, 0);
    document.getElementById('ledger-total').textContent = REN.money(total);
  }
  render();

  document.getElementById('add-payment-btn').addEventListener('click', function () {
    document.getElementById('payment-form').reset();
    MM.openModal('payment-drawer');
  });

  var form = document.getElementById('payment-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) return;
    MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
      REN.updateProject(projectId, function (p) {
        p.payments.push({
          id: REN.uid('PAY'), date: document.getElementById('f-date').value,
          post: 'Manual entry — ' + document.getElementById('f-paidto').value.trim(),
          paidBy: document.getElementById('f-paidby').value.trim(), paidTo: document.getElementById('f-paidto').value.trim(),
          paymentMethod: document.getElementById('f-method').value, credit: 0, debit: parseFloat(document.getElementById('f-amount').value) || 0
        });
      });
      MM.showToast('Payment added');
      MM.closeModal('payment-drawer');
      render();
    });
  });
})();
