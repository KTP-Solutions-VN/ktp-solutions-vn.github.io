(function () {
  'use strict';

  var STORAGE_KEY = 'mm_prop_booking_restriction';

  function readJSON(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; }
  }
  function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  var DEFAULT_TYPES = {
    'PV-101': 'instant', 'PV-102': 'instant', 'PV-103': 'non-instant', 'PV-104': 'instant',
    'PV-105': 'non-instant', 'PV-106': 'instant', 'PV-107': 'non-instant', 'PV-108': 'instant'
  };

  function getBookingType(id) {
    var overrides = readJSON(STORAGE_KEY, {});
    return overrides[id] || DEFAULT_TYPES[id] || 'non-instant';
  }

  var buFilter = document.getElementById('filter-bu');
  var typeFilter = document.getElementById('filter-type');
  var tbody = document.getElementById('restriction-tbody');
  var emptyState = document.getElementById('restriction-empty');
  var resultCount = document.getElementById('result-count');

  function render() {
    var bu = buFilter.value;
    var type = typeFilter.value;
    var props = MM.MOCK_PROPERTIES.filter(function (p) { return p.status !== 'closed'; })
      .filter(function (p) { return !bu || p.bu === bu; })
      .filter(function (p) { return !type || getBookingType(p.id) === type; });

    if (!props.length) {
      tbody.innerHTML = '';
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
      tbody.innerHTML = props.map(function (p) {
        var bt = getBookingType(p.id);
        var isInstant = bt === 'instant';
        return '<tr>' +
          '<td class="cell-strong">' + p.name + '<div class="cell-sub">' + p.id + ' &middot; ' + p.bu + '</div></td>' +
          '<td><span class="badge ' + (p.status === 'active' ? 'badge-success' : 'badge-info') + '">' + (p.status === 'active' ? 'Open' : 'Onboarding') + '</span></td>' +
          '<td><button class="toggle-btn ' + (isInstant ? 'on' : '') + '" data-toggle="' + p.id + '"><span class="toggle-track"></span>' + (isInstant ? 'Instant Booking' : 'Non-Instant Booking') + '</button></td>' +
          '<td style="text-align:right;"><a class="icon-action" title="Edit OTA settings" href="../prop-050-add-edit-property-details/index.html?id=' + p.id + '&tab=ota"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></a></td>' +
          '</tr>';
      }).join('');
    }
    resultCount.textContent = props.length + ' properties';
  }

  buFilter.addEventListener('change', render);
  typeFilter.addEventListener('change', render);

  tbody.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-toggle]');
    if (!btn) return;
    var id = btn.getAttribute('data-toggle');
    var current = getBookingType(id);
    var next = current === 'instant' ? 'non-instant' : 'instant';
    var overrides = readJSON(STORAGE_KEY, {});
    overrides[id] = next;
    saveJSON(STORAGE_KEY, overrides);
    var prop = MM.MOCK_PROPERTIES.filter(function (p) { return p.id === id; })[0];
    MM.showToast((prop ? prop.name : id) + ' switched to ' + (next === 'instant' ? 'Instant Booking' : 'Non-Instant Booking') + '.');
    render();
  });

  render();
})();
