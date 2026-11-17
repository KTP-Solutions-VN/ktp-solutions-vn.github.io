(function () {
  'use strict';
  var STORAGE_KEY = 'mm_book_translations';
  var LANG_NAMES = { fr: 'French', th: 'Thai', id: 'Indonesian', it: 'Italian' };

  var BASE_TEXTS = [
    { id: 't1', en: 'Booking Reference', fr: 'Référence de réservation' },
    { id: 't2', en: 'Check-in Date', fr: "Date d'arrivée" },
    { id: 't3', en: 'Check-out Date', fr: 'Date de départ' },
    { id: 't4', en: 'Total Amount', fr: 'Montant total' },
    { id: 't5', en: 'Thank you for booking with Azura Stays', fr: 'Merci d’avoir réservé avec Azura Stays' }
  ];

  function currentTexts() {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return BASE_TEXTS.concat(stored);
  }

  function currentLang() { return document.getElementById('lang-select').value || 'fr'; }

  function render() {
    var lang = currentLang();
    document.getElementById('table-title').textContent = (LANG_NAMES[lang] || lang) + ' Translations';
    document.getElementById('lang-col-head').textContent = 'Translated Text (' + (LANG_NAMES[lang] || lang) + ')';
    document.getElementById('translations-tbody').innerHTML = currentTexts().map(function (t) {
      return '<tr><td class="cell-strong">' + t.en + '</td>' +
        '<td><input type="text" class="translation-input" data-id="' + t.id + '" value="' + (t[lang] || '') + '" placeholder="Not translated yet"></td>' +
        '<td class="row-actions"><span class="text-muted text-sm">Auto-saves</span></td></tr>';
    }).join('');
  }
  render();

  document.getElementById('lang-select').addEventListener('change', render);

  document.getElementById('btn-add-row').addEventListener('click', function () {
    document.getElementById('add-text-form').reset();
    MM.openModal('modal-add-text');
  });

  document.getElementById('btn-confirm-add-text').addEventListener('click', function () {
    var en = document.getElementById('new-text-en').value.trim();
    if (!en) { MM.showToast('Original text is required', { danger: true }); return; }
    MM.simulateSave(this, 'Adding...', function () {
      var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      var record = { id: MM.uid('txt'), en: en };
      record[currentLang()] = document.getElementById('new-text-translated').value.trim();
      stored.push(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      MM.closeModal('modal-add-text');
      MM.showToast('Text row added');
      render();
    });
  });

  document.getElementById('btn-save-all').addEventListener('click', function () {
    var lang = currentLang();
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var overrides = {};
    document.querySelectorAll('.translation-input').forEach(function (input) { overrides[input.dataset.id] = input.value; });

    BASE_TEXTS.forEach(function (t) {
      if (overrides[t.id] !== undefined && overrides[t.id] !== (t[lang] || '')) {
        var existing = stored.find(function (s) { return s.id === t.id; });
        if (existing) existing[lang] = overrides[t.id];
        else { var rec = { id: t.id }; rec[lang] = overrides[t.id]; stored.push(rec); }
      }
    });
    stored.forEach(function (s) { if (overrides[s.id] !== undefined) s[lang] = overrides[s.id]; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    MM.simulateSave(this, 'Saving...', function () { MM.showToast('All translations saved'); render(); });
  });
})();
