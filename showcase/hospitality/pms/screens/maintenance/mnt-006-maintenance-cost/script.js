(function () {
  'use strict';
  var MNT = MM.MNT;
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var log = id ? MNT.getLog(id) : null;
  var rows = [];
  var rowSeq = 0;

  var TYPE_LABELS = { reimbursement_material: 'Reimbursable Material', labour: 'Labor', available_material: 'Available Material' };

  function renderRows() {
    var tbody = document.getElementById('cost-tbody');
    tbody.innerHTML = rows.map(function (r) {
      var costField = r.type === 'available_material'
        ? '<input type="number" value="0" readonly data-row="' + r.rowId + '" data-field="cost">'
        : '<input type="number" min="0" value="' + r.cost + '" data-row="' + r.rowId + '" data-field="cost">';
      return '<tr>' +
        '<td><select data-row="' + r.rowId + '" data-field="type">' +
          Object.keys(TYPE_LABELS).map(function (k) { return '<option value="' + k + '"' + (k === r.type ? ' selected' : '') + '>' + TYPE_LABELS[k] + '</option>'; }).join('') +
        '</select></td>' +
        '<td><input type="text" value="' + r.material.replace(/"/g, '&quot;') + '" data-row="' + r.rowId + '" data-field="material" placeholder="e.g. Replacement part"></td>' +
        '<td>' + costField + '</td>' +
        '<td><input type="file" data-row="' + r.rowId + '" data-field="file"></td>' +
        '<td><button type="button" class="btn btn-ghost btn-sm remove-row-btn" data-row="' + r.rowId + '" aria-label="Remove"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td>' +
        '</tr>';
    }).join('');

    document.getElementById('cost-empty').hidden = !!rows.length;
    document.querySelector('.table-wrap').hidden = !rows.length;

    tbody.querySelectorAll('select[data-field="type"]').forEach(function (sel) {
      sel.addEventListener('change', function () {
        var r = rows.find(function (x) { return x.rowId == sel.dataset.row; });
        r.type = sel.value;
        if (r.type === 'available_material') r.cost = 0;
        renderRows();
        updateTotal();
      });
    });
    tbody.querySelectorAll('input[data-field="material"]').forEach(function (inp) {
      inp.addEventListener('input', function () {
        var r = rows.find(function (x) { return x.rowId == inp.dataset.row; });
        r.material = inp.value;
      });
    });
    tbody.querySelectorAll('input[data-field="cost"]').forEach(function (inp) {
      inp.addEventListener('input', function () {
        var r = rows.find(function (x) { return x.rowId == inp.dataset.row; });
        r.cost = parseFloat(inp.value) || 0;
        updateTotal();
      });
    });
    tbody.querySelectorAll('.remove-row-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        rows = rows.filter(function (x) { return x.rowId != btn.dataset.row; });
        renderRows();
        updateTotal();
      });
    });
  }

  function updateTotal() {
    var total = rows.reduce(function (s, r) { return s + (r.cost || 0); }, 0);
    document.getElementById('total-cost').textContent = MNT.money(total);
  }

  function addRow(seed) {
    rowSeq++;
    rows.push({ rowId: rowSeq, type: (seed && seed.type) || 'reimbursement_material', material: (seed && seed.material) || '', cost: (seed && seed.cost) || 0 });
    renderRows();
    updateTotal();
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!log) {
      document.getElementById('detail-wrap').hidden = true;
      document.getElementById('not-found').hidden = false;
      return;
    }
    document.getElementById('page-title').textContent = 'Repair Expenses — ' + log.id;
    document.getElementById('page-sub').textContent = log.property + ' — ' + MNT.categoryName(log.category);
    document.getElementById('log-heading').textContent = 'Cost Items for ' + log.property;
    var backHref = '../mnt-005-view-maintenance-log-details/index.html?id=' + id;
    document.getElementById('back-link').href = backHref;
    document.getElementById('cancel-link').href = backHref;

    var existing = MNT.getCosts(id);
    if (existing.length) existing.forEach(function (c) { addRow({ type: c.type, material: c.material, cost: c.cost }); });
    else renderRows();

    document.getElementById('add-row-btn').addEventListener('click', function () { addRow(); });

    document.getElementById('save-btn').addEventListener('click', function () {
      var invalid = rows.some(function (r) { return !r.material.trim(); });
      if (invalid) { MM.showToast('Enter a material/labor name for every row.', { danger: true }); return; }
      MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
        MNT.saveCosts(id, rows.map(function (r) { return { type: r.type, material: r.material, cost: r.cost }; }));
        MM.showToast('Maintenance costs saved');
        setTimeout(function () { window.location.href = backHref; }, 700);
      });
    });
  });
})();
