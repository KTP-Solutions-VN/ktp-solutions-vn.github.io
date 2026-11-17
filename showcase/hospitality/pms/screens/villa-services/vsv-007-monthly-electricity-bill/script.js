(function () {
  'use strict';
  var VSV = MM.VSV;
  var STORAGE_KEY = 'mm_vsv_monthly_bills';

  /* Villas billed monthly by the grid provider (as opposed to per-stay
     collection) — a subset flagged with a contract start date. */
  var MONTHLY_VILLAS = {
    'PV-104': '2025-11-01',
    'PV-107': '2026-01-01',
    'PV-108': '2025-08-01'
  };

  var MONTHS = [];
  (function buildMonths() {
    for (var y = 2025; y <= 2026; y++) {
      for (var m = 1; m <= 12; m++) {
        if (y === 2026 && m > 9) break;
        MONTHS.push({ key: y + '-' + String(m).padStart(2, '0'), label: new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) });
      }
    }
  })();

  function loadBills() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; } }
  function saveBills(map) { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); }
  function billKey(villaId, monthKey) { return villaId + '::' + monthKey; }

  function seedIfEmpty() {
    if (localStorage.getItem(STORAGE_KEY)) return;
    var seed = {};
    seed[billKey('PV-104', '2026-06')] = { endDate: '2026-07-01', endMeter: 1240, amount: 3400 };
    seed[billKey('PV-104', '2026-07')] = { endDate: '2026-08-01', endMeter: 1600, amount: 3888 };
    seed[billKey('PV-107', '2026-06')] = { endDate: '2026-07-01', endMeter: 820, amount: 2960 };
    saveBills(seed);
  }
  seedIfEmpty();

  function populateFilters() {
    var villaSel = document.getElementById('f-villa');
    Object.keys(MONTHLY_VILLAS).forEach(function (id) {
      var p = VSV.propertyById(id);
      if (!p) return;
      var o = document.createElement('option'); o.value = id; o.textContent = p.name; villaSel.appendChild(o);
    });
    var monthSel = document.getElementById('f-month');
    MONTHS.slice().reverse().forEach(function (m) { var o = document.createElement('option'); o.value = m.key; o.textContent = m.label; monthSel.appendChild(o); });
    monthSel.value = '2026-09';
    var buSel = document.getElementById('f-bu');
    VSV.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o); });

    villaSel.addEventListener('change', function () {
      document.getElementById('f-month').disabled = !!villaSel.value;
      render();
    });
    monthSel.addEventListener('change', render);
    buSel.addEventListener('change', render);
  }

  function render() {
    var villaId = document.getElementById('f-villa').value;
    var bu = document.getElementById('f-bu').value;
    var bills = loadBills();
    var tbody = document.getElementById('bill-tbody');
    var banner = document.getElementById('setup-link-banner');
    banner.hidden = true;

    if (villaId) {
      var prop = VSV.propertyById(villaId);
      if (bu && prop.bu !== bu) { document.getElementById('f-bu').value = ''; }
      document.getElementById('mode-label').textContent = 'Viewing by month for ' + prop.name;
      document.getElementById('col1-head').textContent = 'Month';
      document.getElementById('table-title').textContent = prop.name + ' — Monthly History';
      document.getElementById('table-sub').textContent = 'Since contract start ' + VSV.fmtDate(MONTHLY_VILLAS[villaId]);
      var startKey = MONTHLY_VILLAS[villaId].slice(0, 7);
      var rows = MONTHS.filter(function (m) { return m.key >= startKey && m.key <= '2026-09'; });
      tbody.innerHTML = rows.map(function (m) { return rowHtml(villaId, m.key, m.label, bills[billKey(villaId, m.key)]); }).join('');
    } else {
      var monthKey = document.getElementById('f-month').value;
      var monthLabel = (MONTHS.find(function (m) { return m.key === monthKey; }) || {}).label || monthKey;
      document.getElementById('mode-label').textContent = 'Viewing all villas for ' + monthLabel;
      document.getElementById('col1-head').textContent = 'Property';
      document.getElementById('table-title').textContent = 'All Villas — ' + monthLabel;
      document.getElementById('table-sub').textContent = 'One row per villa for the selected month';
      var villaIds = Object.keys(MONTHLY_VILLAS).filter(function (id) {
        var p = VSV.propertyById(id);
        if (!p) return false;
        if (bu && p.bu !== bu) return false;
        return monthKey >= MONTHLY_VILLAS[id].slice(0, 7);
      });
      tbody.innerHTML = villaIds.map(function (id) { return rowHtml(id, monthKey, VSV.propertyById(id).name, bills[billKey(id, monthKey)]); }).join('');
      if (!villaIds.length) tbody.innerHTML = '<tr><td colspan="5" class="text-sm text-muted" style="padding:24px;text-align:center;">No monthly-billed villas match this filter.</td></tr>';
    }

    bindRowHandlers();
  }

  function rowHtml(villaId, monthKey, label, existing) {
    var locked = !!existing;
    return '<tr data-villa="' + villaId + '" data-month="' + monthKey + '">' +
      '<td class="cell-strong">' + label + '</td>' +
      '<td><input type="date" class="rf-end-date" value="' + (existing ? existing.endDate : '') + '" ' + (locked ? 'disabled' : '') + '></td>' +
      '<td><input type="number" class="rf-end-meter" min="0" value="' + (existing ? existing.endMeter : '') + '" ' + (locked ? 'disabled' : '') + '></td>' +
      '<td><input type="number" class="rf-amount" min="0" value="' + (existing ? existing.amount : '') + '" ' + (locked ? 'disabled' : '') + '></td>' +
      '<td style="text-align:right;">' + (locked ? '<button class="btn btn-outline btn-sm" data-reset="1">Reset</button>' : '<span class="text-xs text-muted">Not entered</span>') + '</td>' +
      '</tr>';
  }

  function bindRowHandlers() {
    document.querySelectorAll('#bill-tbody [data-reset]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tr = btn.closest('tr');
        tr.querySelectorAll('input').forEach(function (i) { i.disabled = false; });
        btn.replaceWith(Object.assign(document.createElement('span'), { className: 'text-xs text-muted', textContent: 'Unlocked — edit and click Update' }));
      });
    });
  }

  document.getElementById('update-btn').addEventListener('click', function () {
    var btn = this;
    var rows = document.querySelectorAll('#bill-tbody tr[data-villa]');
    var invalid = false;
    rows.forEach(function (tr) {
      tr.querySelectorAll('input:not([disabled])').forEach(function (input) {
        if (input.classList.contains('rf-end-date') && !input.value) return; // allow leaving unentered rows blank
      });
    });
    var toSave = [];
    rows.forEach(function (tr) {
      var endDate = tr.querySelector('.rf-end-date');
      var endMeter = tr.querySelector('.rf-end-meter');
      var amount = tr.querySelector('.rf-amount');
      if (endDate.disabled) return;
      var anyFilled = endDate.value || endMeter.value || amount.value;
      if (!anyFilled) return;
      if (!endDate.value || !endMeter.value || !amount.value) { invalid = true; [endDate, endMeter, amount].forEach(function (i) { i.style.borderColor = 'var(--color-danger, #d33)'; }); return; }
      toSave.push({ villaId: tr.getAttribute('data-villa'), monthKey: tr.getAttribute('data-month'), endDate: endDate.value, endMeter: Number(endMeter.value), amount: Number(amount.value) });
    });
    if (invalid) { MM.showToast('Fill in all three fields for any row you are updating.', { danger: true }); return; }
    if (!toSave.length) { MM.showToast('No changes to save.', { danger: true }); return; }
    MM.simulateSave(btn, 'Saving...', function () {
      var bills = loadBills();
      toSave.forEach(function (row) { bills[billKey(row.villaId, row.monthKey)] = { endDate: row.endDate, endMeter: row.endMeter, amount: row.amount }; });
      saveBills(bills);
      MM.showToast('Monthly bill data updated.');
      render();
    });
  });

  populateFilters();
  render();
})();
