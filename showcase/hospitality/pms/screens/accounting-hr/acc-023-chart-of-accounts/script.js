(function () {
  'use strict';
  var LS_KEY = 'mm_acc_chart_of_accounts';
  var NATURES = ['Asset', 'Liability', 'Equity', 'Income', 'Expense'];
  var CATEGORIES = ['Current', 'Non-Current', 'Operating', 'Non-Operating'];

  var MOCK = [
    {
      id: 'coa1', name: 'Standard Villa P&L', created_at: '2024-02-10', created_by: 'Daniel Tan',
      bu: ['Sentosa Collection', 'Byron Bay Retreats'],
      details: [
        { id: 'd1', rank: 1, nature: 'Income', category: 'Operating', sub_category: 'Room Revenue', details: 'Nightly rental income', allocation: 'Property' },
        { id: 'd2', rank: 2, nature: 'Expense', category: 'Operating', sub_category: 'Housekeeping', details: 'Cleaning & linen costs', allocation: 'Property' },
        { id: 'd3', rank: 3, nature: 'Expense', category: 'Operating', sub_category: 'Pool/Garden', details: 'Recurring maintenance contracts', allocation: 'Property' }
      ]
    },
    {
      id: 'coa2', name: 'Corporate Overhead', created_at: '2024-03-22', created_by: 'David Chen',
      bu: ['Sentosa Collection', 'Byron Bay Retreats', 'Noosa Estates'],
      details: [
        { id: 'd4', rank: 1, nature: 'Expense', category: 'Non-Operating', sub_category: 'Office Rent', details: 'Back-office lease', allocation: 'Business Unit' },
        { id: 'd5', rank: 2, nature: 'Expense', category: 'Non-Operating', sub_category: 'IT & Software', details: 'PMS, cloud storage subscriptions', allocation: 'Business Unit' }
      ]
    },
    {
      id: 'coa3', name: 'Owner Payout Ledger', created_at: '2025-01-05', created_by: 'Isabelle Moreau',
      bu: ['Noosa Estates'],
      details: []
    }
  ];

  function load() { try { var r = localStorage.getItem(LS_KEY); if (r) return JSON.parse(r); } catch (e) {} return MOCK.slice(); }
  function save(d) { localStorage.setItem(LS_KEY, JSON.stringify(d)); }
  var chart = load();

  function fmtDate(s) {
    var d = new Date(s + 'T00:00:00');
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + String(d.getFullYear()).slice(2);
  }

  function render() {
    var q = (document.getElementById('coa-search').value || '').toLowerCase();
    var rows = chart.filter(function (c) { return !q || c.name.toLowerCase().indexOf(q) > -1; });
    document.getElementById('coa-tbody').innerHTML = rows.map(function (c, i) {
      return '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td class="cell-strong">' + c.name + '</td>' +
        '<td>' + fmtDate(c.created_at) + '</td>' +
        '<td>' + c.created_by + '</td>' +
        '<td>' + c.bu.join(', ') + '</td>' +
        '<td><div class="row-actions">' +
          '<button class="btn btn-ghost btn-sm" data-view-coa="' + c.id + '">View</button>' +
          '<button class="btn btn-ghost btn-sm" data-edit-detail-coa="' + c.id + '">Edit Details</button>' +
          '<button class="btn btn-ghost btn-sm" data-edit-coa="' + c.id + '">Edit</button>' +
          '<button class="btn btn-ghost btn-sm" data-delete-coa="' + c.id + '">Delete</button>' +
        '</div></td>' +
      '</tr>';
    }).join('');
    document.getElementById('coa-empty').hidden = rows.length > 0;
    document.getElementById('coa-result-count').textContent = rows.length + ' of ' + chart.length + ' chart of accounts';
  }
  render();

  document.getElementById('coa-search').addEventListener('input', render);
  document.getElementById('coa-clear-btn').addEventListener('click', function () { document.getElementById('coa-search').value = ''; render(); });

  var editingId = null;

  document.getElementById('add-coa-btn').addEventListener('click', function () {
    editingId = null;
    document.getElementById('f-coa-name').value = '';
    document.querySelectorAll('#coa-bu-checks input').forEach(function (cb) { cb.checked = false; });
    document.getElementById('coa-modal-title').textContent = 'Add Account Structure';
    document.getElementById('coa-save-btn').textContent = 'Save Account Structure';
    MM.openModal('coa-modal');
  });

  document.addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit-coa]');
    if (editBtn) {
      var rec = chart.filter(function (c) { return c.id === editBtn.getAttribute('data-edit-coa'); })[0];
      editingId = rec.id;
      document.getElementById('f-coa-name').value = rec.name;
      document.querySelectorAll('#coa-bu-checks input').forEach(function (cb) { cb.checked = rec.bu.indexOf(cb.value) > -1; });
      document.getElementById('coa-modal-title').textContent = 'Edit Account Structure';
      document.getElementById('coa-save-btn').textContent = 'Update Account Structure';
      MM.openModal('coa-modal');
    }

    var viewBtn = e.target.closest('[data-view-coa]');
    if (viewBtn) {
      var v = chart.filter(function (c) { return c.id === viewBtn.getAttribute('data-view-coa'); })[0];
      document.getElementById('coa-view-title').textContent = v.name;
      document.getElementById('coa-view-sub').textContent = v.bu.join(', ');
      if (v.details.length) {
        document.getElementById('coa-view-tbody').innerHTML = v.details.map(function (d) {
          return '<tr><td>' + d.rank + '</td><td>' + d.nature + '</td><td>' + d.category + '</td><td>' + d.sub_category + '</td><td>' + (d.details || '') + '</td><td>' + (d.allocation || '') + '</td></tr>';
        }).join('');
        document.getElementById('coa-view-tbody').closest('table').hidden = false;
        document.getElementById('coa-view-empty').hidden = true;
      } else {
        document.getElementById('coa-view-tbody').innerHTML = '';
        document.getElementById('coa-view-tbody').closest('table').hidden = true;
        document.getElementById('coa-view-empty').hidden = false;
      }
      MM.openModal('coa-view-modal');
    }

    var editDetailBtn = e.target.closest('[data-edit-detail-coa]');
    if (editDetailBtn) {
      var rec2 = chart.filter(function (c) { return c.id === editDetailBtn.getAttribute('data-edit-detail-coa'); })[0];
      editingId = rec2.id;
      document.getElementById('coa-edit-title').textContent = rec2.name;
      document.getElementById('coa-edit-sub').textContent = rec2.bu.join(', ');
      renderEditRows(rec2.details);
      MM.openModal('coa-edit-modal');
    }

    var delBtn = e.target.closest('[data-delete-coa]');
    if (delBtn) {
      editingId = delBtn.getAttribute('data-delete-coa');
      document.getElementById('del-coa-name').textContent = chart.filter(function (c) { return c.id === editingId; })[0].name;
      MM.openModal('delete-coa-modal');
    }

    var rmRow = e.target.closest('[data-rm-detail-row]');
    if (rmRow) { rmRow.closest('tr').remove(); }
  });

  var form = document.getElementById('coa-form');
  MM.bindFormValidation(form);
  document.getElementById('coa-save-btn').addEventListener('click', function () {
    var valid = MM.validateForm(form);
    var checked = Array.prototype.filter.call(document.querySelectorAll('#coa-bu-checks input'), function (cb) { return cb.checked; }).map(function (cb) { return cb.value; });
    var buError = document.getElementById('coa-bu-error');
    if (!checked.length) { buError.textContent = 'Select at least one business unit.'; valid = false; } else { buError.textContent = ''; }
    if (!valid) return;
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var name = document.getElementById('f-coa-name').value.trim();
      if (editingId) {
        chart = chart.map(function (c) { return c.id === editingId ? Object.assign({}, c, { name: name, bu: checked }) : c; });
      } else {
        chart.push({ id: MM.uid('coa'), name: name, bu: checked, created_at: new Date().toISOString().slice(0, 10), created_by: 'Daniel Tan', details: [] });
      }
      save(chart);
      render();
      MM.closeModal('coa-modal');
      MM.showToast((editingId ? 'Updated' : 'Added') + ' chart of account successfully');
    });
  });

  document.getElementById('confirm-delete-coa-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Deleting...', function () {
      chart = chart.filter(function (c) { return c.id !== editingId; });
      save(chart);
      render();
      MM.closeModal('delete-coa-modal');
      MM.showToast('Chart of account deleted', { danger: true });
    });
  });

  // --- Edit detail rows (ACC-023-P2) ---
  var natureOpts = NATURES.map(function (n) { return '<option value="' + n + '">' + n + '</option>'; }).join('');
  var catOpts = CATEGORIES.map(function (c) { return '<option value="' + c + '">' + c + '</option>'; }).join('');

  function detailRowHtml(d) {
    d = d || {};
    return '<tr>' +
      '<td><input type="number" min="1" class="dr-rank" value="' + (d.rank || '') + '"></td>' +
      '<td><select class="dr-nature"><option value="">Select...</option>' + natureOpts + '</select></td>' +
      '<td><select class="dr-category"><option value="">Select...</option>' + catOpts + '</select></td>' +
      '<td><input type="text" class="dr-sub" value="' + (d.sub_category || '') + '"></td>' +
      '<td><textarea class="dr-details" rows="1">' + (d.details || '') + '</textarea></td>' +
      '<td><select class="dr-alloc"><option value="">----Select----</option><option value="Property">Property</option><option value="Business Unit">Business Unit</option></select></td>' +
      '<td><button type="button" class="btn btn-ghost btn-sm" data-rm-detail-row title="Remove row">&times;</button></td>' +
    '</tr>';
  }

  function renderEditRows(details) {
    var tbody = document.getElementById('coa-edit-tbody');
    tbody.innerHTML = details.map(detailRowHtml).join('');
    // set select values (can't inline-select in template above easily)
    Array.prototype.forEach.call(tbody.querySelectorAll('tr'), function (tr, i) {
      var d = details[i];
      tr.querySelector('.dr-nature').value = d.nature || '';
      tr.querySelector('.dr-category').value = d.category || '';
      tr.querySelector('.dr-alloc').value = d.allocation || '';
    });
  }

  document.getElementById('coa-edit-add-row').addEventListener('click', function () {
    document.getElementById('coa-edit-tbody').insertAdjacentHTML('beforeend', detailRowHtml({}));
  });

  document.getElementById('coa-edit-save-btn').addEventListener('click', function () {
    var btn = this;
    var rows = document.querySelectorAll('#coa-edit-tbody tr');
    var valid = true;
    var newDetails = [];
    rows.forEach(function (tr) {
      var rank = tr.querySelector('.dr-rank').value;
      var nature = tr.querySelector('.dr-nature').value;
      var category = tr.querySelector('.dr-category').value;
      var sub = tr.querySelector('.dr-sub').value.trim();
      if (!rank || !nature || !category || !sub) { valid = false; tr.style.outline = '1px solid var(--color-danger)'; }
      else { tr.style.outline = ''; }
      newDetails.push({
        id: MM.uid('d'), rank: parseInt(rank, 10) || 0, nature: nature, category: category,
        sub_category: sub, details: tr.querySelector('.dr-details').value.trim(),
        allocation: tr.querySelector('.dr-alloc').value
      });
    });
    if (!valid) { MM.showToast('Rank, Nature, Category and Sub Category are required on every row', { danger: true }); return; }
    MM.simulateSave(btn, 'Saving...', function () {
      chart = chart.map(function (c) { return c.id === editingId ? Object.assign({}, c, { details: newDetails }) : c; });
      save(chart);
      render();
      MM.closeModal('coa-edit-modal');
      MM.showToast('Account details saved successfully');
    });
  });
})();
