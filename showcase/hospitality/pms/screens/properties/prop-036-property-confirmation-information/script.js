(function () {
  'use strict';

  var STORAGE_KEY = 'mm_prop_confirmation';

  function readJSON(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; }
  }
  function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  /* Seed content so the demo shows something already saved for at least one property/language. */
  var SEED = {
    'PV-105': {
      welcome: { en: 'Welcome to Villa Marble Cove! Our concierge team is on hand throughout your stay — just reach out any time.' },
      pickUp: 'Airport transfers can be arranged with 24h notice; meet at the arrivals hall with an Azura Manager sign.',
      parking: 'Two covered parking spaces are available in the villa driveway; gate code is shared 24h before check-in.'
    }
  };

  var propertySelect = document.getElementById('property-select');
  var languageSelect = document.getElementById('language-select');
  var welcomeField = document.getElementById('welcome-message');
  var pickUpField = document.getElementById('pick-up');
  var parkingField = document.getElementById('parking');
  var villaTitle = document.getElementById('villa-title');
  var saveStatus = document.getElementById('save-status');

  function populateProperties() {
    var props = MM.MOCK_PROPERTIES;
    propertySelect.innerHTML = props.map(function (p) {
      return '<option value="' + p.id + '">' + p.name + ' — ' + p.id + '</option>';
    }).join('');
    var params = new URLSearchParams(window.location.search);
    var requested = params.get('villa');
    if (requested && props.some(function (p) { return p.id === requested; })) {
      propertySelect.value = requested;
    } else {
      propertySelect.value = 'PV-105';
    }
  }

  function getStore() { return readJSON(STORAGE_KEY, SEED); }

  function loadPropertyContent() {
    var store = getStore();
    var villaId = propertySelect.value;
    var prop = MM.MOCK_PROPERTIES.filter(function (p) { return p.id === villaId; })[0];
    villaTitle.textContent = prop ? prop.name : villaId;
    document.querySelector('.card__header-sub').textContent = 'Confirmation letter content — ' + villaId;

    var record = store[villaId] || { welcome: {}, pickUp: '', parking: '' };
    pickUpField.value = record.pickUp || '';
    parkingField.value = record.parking || '';
    loadWelcomeForLanguage();
    saveStatus.textContent = record.welcome && Object.keys(record.welcome).length
      ? 'Last saved for this property.' : 'No confirmation info saved yet for this property.';
  }

  function loadWelcomeForLanguage() {
    var store = getStore();
    var villaId = propertySelect.value;
    var lang = languageSelect.value;
    var record = store[villaId] || { welcome: {} };
    welcomeField.value = (lang && record.welcome && record.welcome[lang]) || '';
  }

  propertySelect.addEventListener('change', loadPropertyContent);
  languageSelect.addEventListener('change', function () {
    MM.validateField(languageSelect);
    loadWelcomeForLanguage();
  });

  var form = document.getElementById('confirmation-form');
  MM.bindFormValidation(form);

  document.getElementById('save-btn').addEventListener('click', function () {
    if (!MM.validateForm(form)) return;
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var store = getStore();
      var villaId = propertySelect.value;
      var lang = languageSelect.value;
      var record = store[villaId] || { welcome: {}, pickUp: '', parking: '' };
      record.welcome = record.welcome || {};
      record.welcome[lang] = welcomeField.value.trim();
      record.pickUp = pickUpField.value.trim();
      record.parking = parkingField.value.trim();
      store[villaId] = record;
      saveJSON(STORAGE_KEY, store);
      saveStatus.textContent = 'Saved just now.';
      MM.showToast('Confirmation info saved for ' + villaTitle.textContent + '.');
    });
  });

  populateProperties();
  loadPropertyContent();
})();
