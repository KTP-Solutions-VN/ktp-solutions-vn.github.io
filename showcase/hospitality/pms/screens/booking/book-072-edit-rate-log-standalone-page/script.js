document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var row = id ? BOOK.rateChangeLogById(id) : null;

  if (!row) {
    document.getElementById('form-card').hidden = true;
    document.getElementById('empty-card').hidden = false;
    return;
  }

  var buSel = document.getElementById('log-bu');
  var villaSel = document.getElementById('log-villa');
  BOOK.BUSINESS_UNITS.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu.name; o.textContent = bu.name; buSel.appendChild(o);
  });

  function populateVillas(buName) {
    villaSel.innerHTML = '';
    BOOK.VILLAS.filter(function (v) { return v.bu === buName; }).forEach(function (v) {
      var o = document.createElement('option'); o.value = v.id; o.textContent = v.name; villaSel.appendChild(o);
    });
  }

  var villa = BOOK.villaById(row.villaId);
  var originalValues = { bu: villa ? villa.bu : '', villaId: row.villaId, action: row.action || BOOK.rateChangeAction(row) };

  function fill() {
    buSel.value = originalValues.bu;
    populateVillas(originalValues.bu);
    villaSel.value = originalValues.villaId;
    document.getElementById('log-action').value = originalValues.action;
  }
  fill();

  buSel.addEventListener('change', function () { populateVillas(buSel.value); });

  var form = document.getElementById('log-form');
  MM.bindFormValidation && MM.bindFormValidation(form);

  document.getElementById('btn-reset').addEventListener('click', fill);

  document.getElementById('btn-save').addEventListener('click', function () {
    if (MM.validateForm && !MM.validateForm(form)) return;
    var btn = this;
    var original = btn.textContent;
    btn.disabled = true; btn.textContent = 'Saving…';
    MM.simulateSave(function () {
      btn.disabled = false; btn.textContent = original;
      var all = BOOK.getRateChangeLog().map(function (r) {
        if (r.id !== id) return r;
        return Object.assign({}, r, { villaId: villaSel.value, action: document.getElementById('log-action').value });
      });
      BOOK.saveRateChangeLog(all);
      MM.showToast('Rate log updated.');
      setTimeout(function () { window.location.href = '../book-070-rate-change-log/index.html'; }, 600);
    });
  });
});
