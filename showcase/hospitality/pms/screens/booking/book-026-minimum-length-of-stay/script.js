document.addEventListener('DOMContentLoaded', function () {
  var OVERRIDES_KEY = 'mm_min_stay_overrides';

  function safeParse(key, fallback) {
    try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
  }

  function getVillas() {
    var overrides = safeParse(OVERRIDES_KEY, {});
    return MM.BOOK.VILLAS.map(function (v) {
      var minStay = overrides.hasOwnProperty(v.id) ? overrides[v.id] : v.minStay;
      return { id: v.id, name: v.name, bu: v.bu, minStay: minStay };
    });
  }

  var state = { bu: '' };

  var buSel = document.getElementById('bu-filter');
  Array.from(new Set(MM.BOOK.VILLAS.map(function (v) { return v.bu; }))).forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o);
  });
  buSel.addEventListener('change', function () { state.bu = buSel.value; render(); });

  function rowHtml(v) {
    var toFill = v.minStay === null || v.minStay === undefined;
    return '<tr class="' + (toFill ? 'needs-fill' : '') + '" data-villa="' + v.id + '">' +
      '<td class="cell-strong">' + v.name + '</td>' +
      '<td>' + v.bu + '</td>' +
      '<td><input type="number" min="1" max="30" class="min-stay-input' + (toFill ? ' to-fill' : '') + '" data-input="' + v.id + '" value="' + (toFill ? '' : v.minStay) + '" placeholder="' + (toFill ? 'To Fill' : '') + '">' +
        (toFill ? '<span class="to-fill-tag">To Fill</span>' : '') + '</td>' +
    '</tr>';
  }

  function render() {
    var all = getVillas();
    var filtered = state.bu ? all.filter(function (v) { return v.bu === state.bu; }) : all;
    document.getElementById('result-count').textContent = filtered.length + ' villa' + (filtered.length === 1 ? '' : 's');
    var tbody = document.getElementById('villa-rows');
    tbody.innerHTML = filtered.length ? filtered.map(rowHtml).join('') :
      '<tr><td colspan="3"><div class="empty-state"><h3>No villas</h3><p>No villas found for this business unit.</p></div></td></tr>';

    tbody.querySelectorAll('.min-stay-input').forEach(function (input) {
      input.addEventListener('blur', function () {
        var villaId = input.getAttribute('data-input');
        var num = parseInt(input.value, 10);
        if (input.value.trim() === '') return;
        if (isNaN(num) || num < 1) {
          input.value = '';
          MM.showToast('Minimum stay must be a positive number of nights.', { danger: true });
          return;
        }
        input.classList.remove('to-fill');
        var row = input.closest('tr');
        row.classList.remove('needs-fill');
        var tag = row.querySelector('.to-fill-tag');
        if (tag) tag.remove();
      });
    });
  }

  document.getElementById('btn-update-all').addEventListener('click', function () {
    var btn = this;
    var overrides = safeParse(OVERRIDES_KEY, {});
    var changedCount = 0;
    var hasInvalid = false;
    document.querySelectorAll('.min-stay-input').forEach(function (input) {
      var villaId = input.getAttribute('data-input');
      if (input.value.trim() === '') { hasInvalid = true; return; }
      var num = parseInt(input.value, 10);
      overrides[villaId] = num;
      changedCount++;
    });
    if (hasInvalid) {
      MM.showToast('Some villas still need a minimum stay value before saving.', { danger: true });
    }
    MM.simulateSave(btn, 'Saving...', function () {
      localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
      MM.showToast('Minimum stay updated for ' + changedCount + ' villa' + (changedCount === 1 ? '' : 's') + '.');
      render();
    });
  });

  render();
});
