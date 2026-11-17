document.addEventListener('DOMContentLoaded', function () {
  var THRESHOLD_KEY = 'mm_missing_rate_threshold';
  var TODAY = '2026-09-02';
  var DEFAULT_THRESHOLD = '2026-10-02';

  function getThreshold() {
    try { return localStorage.getItem(THRESHOLD_KEY) || DEFAULT_THRESHOLD; } catch (e) { return DEFAULT_THRESHOLD; }
  }

  var state = { bu: '' };

  var buSel = document.getElementById('bu-filter');
  Array.from(new Set(MM.BOOK.VILLAS.map(function (v) { return v.bu; }))).forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o);
  });
  buSel.addEventListener('change', function () { state.bu = buSel.value; render(); });

  function missingRateVillas() {
    // A villa is "missing rate" if its base nightly rate has never been configured
    // (VILLA_META.rate === null) — the same seeded gap booking-data.js reserves for this screen.
    return MM.BOOK.VILLAS.filter(function (v) { return v.rate === null || v.rate === undefined; });
  }

  function rowHtml(v) {
    return '<tr data-villa="' + v.id + '">' +
      '<td class="cell-strong">' + v.name + '</td>' +
      '<td>' + v.bu + '</td>' +
      '<td style="text-align:right;"><a class="btn btn-outline btn-sm" href="../book-073-season-management/index.html">Add Rate</a></td>' +
    '</tr>';
  }

  function render() {
    document.getElementById('threshold-label').textContent = MM.BOOK.fmtDate(getThreshold());
    document.getElementById('threshold-date').value = getThreshold();

    var all = missingRateVillas();
    var filtered = state.bu ? all.filter(function (v) { return v.bu === state.bu; }) : all;
    document.getElementById('result-count').textContent = filtered.length + ' villa' + (filtered.length === 1 ? '' : 's');
    var tbody = document.getElementById('villa-rows');
    tbody.innerHTML = filtered.length ? filtered.map(rowHtml).join('') :
      '<tr><td colspan="3"><div class="empty-state"><h3>All villas have rates configured</h3><p>No villa is missing a daily rate through ' + MM.BOOK.fmtDate(getThreshold()) + '.</p></div></td></tr>';
  }

  /* BOOK-064 — Missing Rate Setting popup */
  document.getElementById('btn-configure').addEventListener('click', function () {
    document.getElementById('threshold-date').value = getThreshold();
    MM.openModal('modal-rate-setting');
  });

  document.getElementById('btn-save-threshold').addEventListener('click', function () {
    var input = document.getElementById('threshold-date');
    var group = input.closest('.form-group');
    if (!input.value) {
      group.classList.add('has-error');
      group.querySelector('.form-error').textContent = 'Select a threshold date.';
      return;
    }
    if (input.value < TODAY) {
      group.classList.add('has-error');
      group.querySelector('.form-error').textContent = 'Threshold date must be today or later.';
      return;
    }
    group.classList.remove('has-error');
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      localStorage.setItem(THRESHOLD_KEY, input.value);
      MM.closeModal('modal-rate-setting');
      MM.showToast('Missing-rate threshold updated to ' + MM.BOOK.fmtDate(input.value) + '.');
      render();
    });
  });

  render();
});
