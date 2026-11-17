document.addEventListener('DOMContentLoaded', function () {
  var rows = MM.BOOK.loadMerged('mm_partner_payments', MM.BOOK.PARTNER_PAYMENTS);
  var due = rows.filter(function (r) { return r.stage === 'due'; }).length;
  var later = rows.filter(function (r) { return r.stage === 'later'; }).length;
  var paid = rows.filter(function (r) { return r.stage === 'paid'; }).length;
  document.getElementById('count-due').textContent = due;
  document.getElementById('count-later').textContent = later;
  document.getElementById('count-paid').textContent = paid;
});
