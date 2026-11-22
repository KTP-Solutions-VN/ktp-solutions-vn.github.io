document.addEventListener('DOMContentLoaded', function () {
  var buSel = document.getElementById('log-bu');
  var villaSel = document.getElementById('log-villa');

  var opt0 = document.createElement('option'); opt0.value = ''; opt0.textContent = 'Select business unit…'; buSel.appendChild(opt0);
  BOOK.BUSINESS_UNITS.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu.name; o.textContent = bu.name; buSel.appendChild(o);
  });

  function populateVillas(buName) {
    villaSel.innerHTML = '';
    var villas = BOOK.VILLAS.filter(function (v) { return v.bu === buName; });
    if (!villas.length) {
      var o = document.createElement('option'); o.value = ''; o.textContent = 'Select a business unit first…'; villaSel.appendChild(o);
      return;
    }
    var placeholder = document.createElement('option'); placeholder.value = ''; placeholder.textContent = 'Select a villa…'; villaSel.appendChild(placeholder);
    villas.forEach(function (v) {
      var o = document.createElement('option'); o.value = v.id; o.textContent = v.name; villaSel.appendChild(o);
    });
  }
  populateVillas('');

  buSel.addEventListener('change', function () { populateVillas(buSel.value); });

  var form = document.getElementById('log-form');
  MM.bindFormValidation && MM.bindFormValidation(form);

  document.getElementById('btn-reset').addEventListener('click', function () {
    form.reset();
    populateVillas('');
  });

  document.getElementById('btn-save').addEventListener('click', function () {
    if (MM.validateForm && !MM.validateForm(form)) return;
    var btn = this;
    var original = btn.textContent;
    btn.disabled = true; btn.textContent = 'Saving…';
    MM.simulateSave(function () {
      btn.disabled = false; btn.textContent = original;
      var all = BOOK.getRateChangeLog();
      all.unshift({
        id: 'RCL-' + MM.uid(), date: new Date().toISOString().slice(0, 10),
        entryLevel: 'Property', villaId: villaSel.value,
        action: document.getElementById('log-action').value, by: 'Daniel Tan'
      });
      BOOK.saveRateChangeLog(all);
      MM.showToast('Rate log saved.');
      setTimeout(function () { window.location.href = '../book-070-rate-change-log/index.html'; }, 600);
    });
  });
});
