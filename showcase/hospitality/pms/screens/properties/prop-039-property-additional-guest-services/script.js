(function () {
  'use strict';

  var STORAGE_KEY = 'mm_prop_extras';
  var FIELDS = ['kids', 'vehicle', 'chef', 'breakfast', 'deliveries', 'excursions', 'other'];

  function readJSON(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; }
  }
  function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  var SEED = {
    'PV-105': {
      en: {
        kids: 'Cots and high chairs on request; shallow end of the pool is 0.9m deep.',
        vehicle: 'Scooter and car rental arranged with 24h notice through the concierge.',
        chef: 'Private chef available for breakfast, lunch and dinner — advance booking required.',
        breakfast: 'Daily breakfast included, served on the terrace from 7:30am.',
        deliveries: 'Grocery and pharmacy delivery coordinated by the concierge team.',
        excursions: 'Island hopping, diving and sunset cruise bookings available on request.',
        other: 'In-villa spa treatments can be arranged with 48h notice.'
      }
    }
  };

  var propertySelect = document.getElementById('property-select');
  var languageSelect = document.getElementById('language-select');
  var villaTitle = document.getElementById('villa-title');
  var saveStatus = document.getElementById('save-status');

  function fieldEl(name) { return document.getElementById('extra-' + name); }

  function populateProperties() {
    var props = MM.MOCK_PROPERTIES;
    propertySelect.innerHTML = props.map(function (p) {
      return '<option value="' + p.id + '">' + p.name + ' — ' + p.id + '</option>';
    }).join('');
    var params = new URLSearchParams(window.location.search);
    var requested = params.get('villa');
    propertySelect.value = (requested && props.some(function (p) { return p.id === requested; })) ? requested : 'PV-105';
  }

  function currentVillaRecord() {
    var store = readJSON(STORAGE_KEY, SEED);
    return store[propertySelect.value] || {};
  }

  function loadLanguageContent() {
    var record = currentVillaRecord();
    var lang = languageSelect.value;
    var content = (lang && record[lang]) || {};
    FIELDS.forEach(function (f) { fieldEl(f).value = content[f] || ''; });
  }

  function loadPropertyContent() {
    var prop = MM.MOCK_PROPERTIES.filter(function (p) { return p.id === propertySelect.value; })[0];
    villaTitle.textContent = prop ? prop.name : propertySelect.value;
    document.querySelector('.card__header-sub').textContent = 'Additional guest services — ' + propertySelect.value;
    var record = currentVillaRecord();
    loadLanguageContent();
    saveStatus.textContent = Object.keys(record).length ? 'Last saved for this property.' : 'No guest services saved yet for this property.';
  }

  propertySelect.addEventListener('change', loadPropertyContent);
  languageSelect.addEventListener('change', function () {
    MM.validateField(languageSelect);
    loadLanguageContent();
  });

  var form = document.getElementById('extras-form');
  MM.bindFormValidation(form);

  document.getElementById('save-btn').addEventListener('click', function () {
    if (!MM.validateField(languageSelect)) return;
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var store = readJSON(STORAGE_KEY, SEED);
      var villaId = propertySelect.value;
      var lang = languageSelect.value;
      store[villaId] = store[villaId] || {};
      var content = {};
      FIELDS.forEach(function (f) { content[f] = fieldEl(f).value.trim(); });
      store[villaId][lang] = content;
      saveJSON(STORAGE_KEY, store);
      saveStatus.textContent = 'Saved just now.';
      MM.showToast('Guest services saved for ' + villaTitle.textContent + ' (' + languageSelect.options[languageSelect.selectedIndex].text + ').');
    });
  });

  populateProperties();
  loadPropertyContent();
})();
