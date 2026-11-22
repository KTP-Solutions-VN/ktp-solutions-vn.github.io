(function () {
  'use strict';

  var LS_KEY = 'mm_bu_exchange_rates';
  var REFERENCE = 'SGD';
  var CURRENCIES = ['USD', 'AUD', 'EUR'];

  var MOCK_PERIODS = [
    { key: 'forecast', label: 'Forecast (Sep 2026)', rates: { USD: 0.7410, AUD: 1.1320, EUR: 0.6840 }, is_rate_set: true, is_forecast: true },
    { key: '2026-08', label: 'Aug 2026', rates: { USD: 0.7405, AUD: 1.1305, EUR: 0.6815 }, is_rate_set: true, is_forecast: false },
    { key: '2026-07', label: 'Jul 2026', rates: { USD: 0.7430, AUD: null, EUR: 0.6840 }, is_rate_set: false, is_forecast: false },
    { key: '2026-06', label: 'Jun 2026', rates: { USD: 0.7455, AUD: 1.1260, EUR: 0.6865 }, is_rate_set: true, is_forecast: false }
  ];

  function load() {
    try { var raw = localStorage.getItem(LS_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
    return JSON.parse(JSON.stringify(MOCK_PERIODS));
  }
  function save(data) { localStorage.setItem(LS_KEY, JSON.stringify(data)); }

  var periods = load();

  function renderHead() {
    var head = document.getElementById('rate-head');
    head.innerHTML = '<th>Period</th><th>' + REFERENCE + ' (reference)</th>' + CURRENCIES.map(function (c) { return '<th>' + c + '</th>'; }).join('');
  }

  function render() {
    renderHead();
    var anyIncomplete = periods.some(function (p) { return !p.is_rate_set; });
    document.getElementById('rate-warning').style.display = anyIncomplete ? '' : 'none';

    document.getElementById('rate-tbody').innerHTML = periods.map(function (p) {
      var cells = CURRENCIES.map(function (c) {
        var v = p.rates[c];
        if (v == null) return '<td class="rate-cell empty" data-cell data-period="' + p.key + '" data-currency="' + c + '">Not set</td>';
        return '<td class="rate-cell" data-cell data-period="' + p.key + '" data-currency="' + c + '">' + v + '</td>';
      }).join('');
      return '<tr' + (p.is_forecast ? ' class="forecast-row"' : '') + '>' +
        '<td class="cell-strong">' + p.label + (p.is_rate_set ? '' : ' <span class="badge badge-warning">Incomplete</span>') + '</td>' +
        '<td class="rate-cell locked">1.0000</td>' +
        cells +
      '</tr>';
    }).join('');
  }

  var editingPeriod = null;
  var editingCurrency = null;

  function openRateModal(periodKey, currency) {
    var p = periods.filter(function (x) { return x.key === periodKey; })[0];
    editingPeriod = periodKey;
    editingCurrency = currency || '';
    document.getElementById('f-type-period').checked = !p.is_forecast;
    document.getElementById('f-type-forecast').checked = p.is_forecast;
    document.getElementById('field-period').hidden = p.is_forecast;
    if (!p.is_forecast) document.getElementById('f-period').value = p.key;
    document.getElementById('f-currency').value = currency || '';
    document.getElementById('f-rate').value = (currency && p.rates[currency] != null) ? p.rates[currency] : '';
    document.querySelectorAll('#rate-modal .form-group').forEach(function (g) { g.classList.remove('has-error'); });
    MM.openModal('rate-modal');
  }

  document.getElementById('rate-tbody').addEventListener('click', function (e) {
    var cell = e.target.closest('[data-cell]');
    if (!cell) return;
    openRateModal(cell.getAttribute('data-period'), cell.getAttribute('data-currency'));
  });

  document.getElementById('add-rate-btn').addEventListener('click', function () {
    openRateModal(periods[1].key, '');
  });

  document.querySelectorAll('input[name="period-type"]').forEach(function (r) {
    r.addEventListener('change', function () {
      document.getElementById('field-period').hidden = document.getElementById('f-type-forecast').checked;
    });
  });

  var form = document.getElementById('rate-form');
  MM.bindFormValidation(form);

  document.getElementById('rate-save-btn').addEventListener('click', function () {
    var isForecast = document.getElementById('f-type-forecast').checked;
    var currency = document.getElementById('f-currency').value;
    var rate = document.getElementById('f-rate').value;
    if (!currency || !rate) { MM.validateForm(form); return; }

    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var targetKey = isForecast ? 'forecast' : (document.getElementById('f-period').value || editingPeriod);
      var target = periods.filter(function (p) { return p.key === targetKey; })[0];
      if (!target) {
        target = { key: targetKey, label: targetKey, rates: {}, is_rate_set: false, is_forecast: false };
        periods.splice(1, 0, target);
      }
      target.rates[currency] = Number(rate);
      target.is_rate_set = CURRENCIES.every(function (c) { return target.rates[c] != null; });
      save(periods);
      render();
      MM.closeModal('rate-modal');
      MM.showToast('Exchange rate saved');
    });
  });

  render();
})();
