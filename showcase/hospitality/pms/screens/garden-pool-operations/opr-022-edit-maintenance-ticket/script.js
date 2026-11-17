(function () {
  'use strict';
  var STORAGE_KEY = 'mm_opr_maintenance_tickets';
  var IS_EDIT = true;
  var params = new URLSearchParams(window.location.search);
  var editId = params.get('id');

  document.getElementById('f-property').innerHTML = '<option value="">Select</option>' + MM.OPR.propertyOptions();
  document.getElementById('f-category').innerHTML = '<option value="">Select</option>' + MM.OPR.MAINT_CATEGORIES.map(function (c) { return '<option value="' + c.id + '">' + c.name + '</option>'; }).join('');

  function subcatsFor(catId) { var c = MM.OPR.MAINT_CATEGORIES.find(function (x) { return x.id === catId; }); return c ? c.subcategories : []; }
  function problemsFor(catId, subId) { var subs = subcatsFor(catId); var s = subs.find(function (x) { return x.id === subId; }); return s ? s.problems : []; }

  function refreshSubcats() {
    var subs = subcatsFor(document.getElementById('f-category').value);
    document.getElementById('f-subcategory').innerHTML = '<option value="">Select</option>' + subs.map(function (s) { return '<option value="' + s.id + '">' + s.name + '</option>'; }).join('');
    refreshProblems();
  }
  function refreshProblems() {
    var problems = problemsFor(document.getElementById('f-category').value, document.getElementById('f-subcategory').value);
    document.getElementById('f-problem').innerHTML = '<option value="">Select</option>' + problems.map(function (p) { return '<option value="' + p.id + '" data-priority="' + p.priority + '">' + p.name + '</option>'; }).join('');
    updatePriority();
  }
  function updatePriority() {
    var sel = document.getElementById('f-problem');
    var opt = sel.options[sel.selectedIndex];
    var base = opt ? opt.dataset.priority : null;
    var factors = document.querySelectorAll('input[id^="f-factor-worse"]:checked').length;
    var reducers = document.querySelectorAll('input[id^="f-factor-less"]:checked').length;
    var order = ['Low', 'Medium', 'High', 'Urgent'];
    var idx = base ? order.indexOf(base) : -1;
    if (idx > -1) {
      idx = Math.min(order.length - 1, idx + factors);
      idx = Math.max(0, idx - reducers);
      document.getElementById('f-priority-display').value = order[idx];
    } else {
      document.getElementById('f-priority-display').value = '';
    }
  }
  document.getElementById('f-category').addEventListener('change', refreshSubcats);
  document.getElementById('f-subcategory').addEventListener('change', refreshProblems);
  document.getElementById('f-problem').addEventListener('change', updatePriority);
  document.querySelectorAll('input[id^="f-factor-"]').forEach(function (cb) { cb.addEventListener('change', updatePriority); });
  refreshSubcats();

  if (IS_EDIT && editId) {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var t = MM.OPR.MAINTENANCE_TICKETS.concat(stored).find(function (x) { return x.id === editId; });
    if (t) {
      document.getElementById('page-subtitle').textContent = 'Ticket ' + t.id + ' \u2014 ' + t.status;
      document.getElementById('f-bu').value = t.bu;
      document.getElementById('f-property').value = t.property;
      document.getElementById('f-description').value = t.issue;
    }
  }

  document.getElementById('start-over-btn').addEventListener('click', function () { MM.openModal('start-over-modal'); });
  document.getElementById('confirm-start-over-btn').addEventListener('click', function () {
    document.getElementById('ticket-form').reset();
    refreshSubcats();
    MM.closeModal('start-over-modal');
    MM.showToast('Form reset');
  });

  document.getElementById('submit-btn').addEventListener('click', function () {
    if (!MM.validateForm(document.getElementById('ticket-form'))) return;
    MM.simulateSave(document.getElementById('submit-btn'), IS_EDIT ? 'Updating...' : 'Creating...', function () {
      var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      var priority = document.getElementById('f-priority-display').value || 'Medium';
      if (IS_EDIT && editId) {
        var idx = stored.findIndex(function (d) { return d.id === editId; });
        var record = { id: editId, bu: document.getElementById('f-bu').value, property: document.getElementById('f-property').value, issue: document.getElementById('f-description').value.trim(), priority: priority, status: 'In Progress', updated: '2026-08-27' };
        if (idx > -1) stored[idx] = record; else stored.push(record);
      } else {
        stored.push({ id: 'M' + String(100000 + Math.floor(Math.random() * 899999)), bu: document.getElementById('f-bu').value, property: document.getElementById('f-property').value, issue: document.getElementById('f-description').value.trim(), priority: priority, status: 'Open', updated: '2026-08-27' });
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      MM.showToast(IS_EDIT ? 'Ticket updated' : 'Ticket created');
      setTimeout(function () { window.location.href = '../opr-020-maintenance-ticket-list/index.html'; }, 500);
    });
  });
})();
