(function () {
  'use strict';

  var LS_KEY = 'mm_bu_currencies';

  var MOCK_CURRENCIES = [
    { id: 'cur1', name: 'Thai Baht', country: 'Thailand', code: 'THB', sign: '฿', created_at: '2020-11-01', is_reference: true },
    { id: 'cur2', name: 'US Dollar', country: 'United States', code: 'USD', sign: '$', created_at: '2020-11-01', is_reference: false },
    { id: 'cur3', name: 'Indonesian Rupiah', country: 'Indonesia', code: 'IDR', sign: 'Rp', created_at: '2021-06-01', is_reference: false },
    { id: 'cur4', name: 'Euro', country: 'Eurozone', code: 'EUR', sign: '€', created_at: '2022-01-15', is_reference: false }
  ];

  function load() {
    try { var raw = localStorage.getItem(LS_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
    return MOCK_CURRENCIES.slice();
  }
  function save(data) { localStorage.setItem(LS_KEY, JSON.stringify(data)); }

  var currencies = load();

  function fmtDate(s) {
    var d = new Date(s + 'T00:00:00');
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + String(d.getFullYear()).slice(2);
  }

  function render() {
    var q = (document.getElementById('cur-search').value || '').toLowerCase();
    var rows = currencies.filter(function (c) { return !q || c.name.toLowerCase().indexOf(q) > -1 || c.code.toLowerCase().indexOf(q) > -1; });
    document.getElementById('cur-tbody').innerHTML = rows.map(function (c, i) {
      return '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td class="cell-strong">' + c.name + (c.is_reference ? ' <span class="badge badge-info">Reference</span>' : '') + '</td>' +
        '<td>' + c.country + '</td>' +
        '<td>' + c.code + '</td>' +
        '<td class="currency-symbol">' + c.sign + '</td>' +
        '<td>' + fmtDate(c.created_at) + '</td>' +
        '<td><div class="row-actions">' +
          '<button class="btn btn-ghost btn-sm" data-edit-cur="' + c.id + '">Edit</button>' +
          '<button class="btn btn-ghost btn-sm" data-delete-cur="' + c.id + '"' + (c.is_reference ? ' disabled title="Reference currency cannot be deleted"' : '') + '>Delete</button>' +
        '</div></td>' +
      '</tr>';
    }).join('');
    document.getElementById('cur-empty').hidden = rows.length > 0;
    document.getElementById('cur-result-count').textContent = rows.length + ' of ' + currencies.length + ' currencies';
  }

  document.getElementById('cur-search').addEventListener('input', render);
  document.getElementById('cur-clear-btn').addEventListener('click', function () { document.getElementById('cur-search').value = ''; render(); });

  var editingId = null;
  function resetForm() {
    document.getElementById('f-name').value = '';
    document.getElementById('f-code').value = '';
    document.getElementById('f-country').value = '';
    document.getElementById('f-sign').value = '';
    document.querySelectorAll('#currency-modal .form-group').forEach(function (g) { g.classList.remove('has-error'); });
  }

  document.getElementById('add-currency-btn').addEventListener('click', function () {
    editingId = null;
    resetForm();
    document.getElementById('cur-modal-title').textContent = 'Add Currency';
    document.getElementById('cur-save-btn').textContent = 'Save Currency';
    MM.openModal('currency-modal');
  });

  document.addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit-cur]');
    if (editBtn) {
      var rec = currencies.filter(function (c) { return c.id === editBtn.getAttribute('data-edit-cur'); })[0];
      editingId = rec.id;
      resetForm();
      document.getElementById('f-name').value = rec.name;
      document.getElementById('f-code').value = rec.code;
      document.getElementById('f-country').value = rec.country;
      document.getElementById('f-sign').value = rec.sign;
      document.getElementById('cur-modal-title').textContent = 'Edit Currency';
      document.getElementById('cur-save-btn').textContent = 'Update Currency';
      MM.openModal('currency-modal');
    }
    var delBtn = e.target.closest('[data-delete-cur]');
    if (delBtn && !delBtn.disabled) {
      editingId = delBtn.getAttribute('data-delete-cur');
      var recD = currencies.filter(function (c) { return c.id === editingId; })[0];
      document.getElementById('del-cur-name').textContent = recD.name;
      MM.openModal('delete-currency-modal');
    }
  });

  var form = document.getElementById('cur-form');
  MM.bindFormValidation(form);

  document.getElementById('cur-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(form)) return;
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var data = {
        name: document.getElementById('f-name').value.trim(),
        code: document.getElementById('f-code').value.trim().toUpperCase(),
        country: document.getElementById('f-country').value,
        sign: document.getElementById('f-sign').value.trim()
      };
      if (editingId) {
        currencies = currencies.map(function (c) { return c.id === editingId ? Object.assign({}, c, data) : c; });
      } else {
        data.id = MM.uid('cur');
        data.created_at = new Date().toISOString().slice(0, 10);
        data.is_reference = false;
        currencies.push(data);
      }
      save(currencies);
      render();
      MM.closeModal('currency-modal');
      MM.showToast((editingId ? 'Updated' : 'Added') + ' currency successfully');
    });
  });

  document.getElementById('confirm-delete-cur-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Deleting...', function () {
      currencies = currencies.filter(function (c) { return c.id !== editingId; });
      save(currencies);
      render();
      MM.closeModal('delete-currency-modal');
      MM.showToast('Currency deleted', { danger: true });
    });
  });

  render();
})();
