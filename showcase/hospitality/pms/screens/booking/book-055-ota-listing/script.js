document.addEventListener('DOMContentLoaded', function () {
  var buSelect = document.getElementById('bu-select');
  var otaSelect = document.getElementById('ota-select');
  var businessUnits = Array.from(new Set(MM.BOOK.VILLAS.map(function (v) { return v.bu; })));
  businessUnits.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSelect.appendChild(o);
  });
  MM.BOOK.OTA_CHANNELS.forEach(function (ch) {
    var o = document.createElement('option'); o.value = ch; o.textContent = ch; otaSelect.appendChild(o);
  });

  var form = document.getElementById('check-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) { MM.showToast('Please select an OTA channel.', { danger: true }); return; }
    var ota = otaSelect.value;
    var bu = buSelect.value;
    var btn = document.getElementById('check-btn');
    MM.simulateSave(btn, 'Checking…', function () {
      var unlinkedNames = MM.BOOK.OTA_UNLINKED[ota] || [];
      var unlinked = unlinkedNames.map(function (name) { return MM.BOOK.villaByName(name); }).filter(Boolean).filter(function (v) {
        return !bu || v.bu === bu;
      });
      document.getElementById('prompt-card').hidden = true;
      document.getElementById('results-card').hidden = false;
      document.getElementById('results-title').textContent = 'Villas not linked to ' + ota;
      document.getElementById('results-sub').textContent = bu ? ('Filtered to ' + bu) : 'All business units';
      var tbody = document.getElementById('results-rows');
      if (!unlinked.length) {
        tbody.innerHTML = '<tr><td><div class="empty-state">' +
          '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6 9 17l-5-5"/></svg>' +
          '<h3>All villas are linked</h3><p>Every villa in scope is already synced with ' + ota + '.</p></div></td></tr>';
      } else {
        tbody.innerHTML = unlinked.map(function (v) {
          return '<tr><td class="cell-strong">' + v.name + ' <span class="text-xs text-muted">(' + v.bu + ')</span></td></tr>';
        }).join('');
      }
    });
  });
});
