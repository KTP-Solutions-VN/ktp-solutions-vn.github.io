(function () {
  'use strict';

  var STORAGE_KEY = 'mm_prop_territories';

  var AREA_MAP = {
    'PV-101': 'Sentosa Cove', 'PV-102': 'Ocean Drive', 'PV-103': 'Wategos', 'PV-104': 'Bangalow',
    'PV-105': 'Paradise Island', 'PV-106': 'Noosaville', 'PV-107': 'Sunshine Beach', 'PV-108': 'Belongil'
  };

  function readJSON(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; }
  }
  function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  function getConcierge(id) {
    var overrides = readJSON(STORAGE_KEY, {});
    if (Object.prototype.hasOwnProperty.call(overrides, id)) return overrides[id];
    var prop = MM.MOCK_PROPERTIES.filter(function (p) { return p.id === id; })[0];
    return prop ? prop.concierge : null;
  }

  var buFilter = document.getElementById('filter-bu');
  var conciergeFilter = document.getElementById('filter-concierge');
  var sortBy = document.getElementById('sort-by');
  var tbody = document.getElementById('territories-tbody');
  var emptyState = document.getElementById('territories-empty');
  var resultCount = document.getElementById('result-count');

  function populateConciergeFilter() {
    var names = MM.MOCK_STAFF.filter(function (s) { return s.role === 'Concierge'; }).map(function (s) { return s.name; });
    conciergeFilter.innerHTML = '<option value="">All Concierges</option><option value="unassigned">Unassigned</option>' +
      names.map(function (n) { return '<option value="' + n + '">' + n + '</option>'; }).join('');
  }

  function render() {
    var bu = buFilter.value;
    var conciergeF = conciergeFilter.value;
    var sort = sortBy.value;

    var props = MM.MOCK_PROPERTIES.filter(function (p) { return p.status !== 'closed'; })
      .map(function (p) { return Object.assign({}, p, { area: AREA_MAP[p.id] || 'Other', concierge: getConcierge(p.id) }); })
      .filter(function (p) { return !bu || p.bu === bu; })
      .filter(function (p) {
        if (!conciergeF) return true;
        if (conciergeF === 'unassigned') return !p.concierge;
        return p.concierge === conciergeF;
      });

    props.sort(function (a, b) {
      if (sort === 'property') return a.name.localeCompare(b.name);
      if (sort === 'concierge') return (a.concierge || '').localeCompare(b.concierge || '');
      return a.area.localeCompare(b.area) || a.name.localeCompare(b.name);
    });

    if (!props.length) {
      tbody.innerHTML = '';
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
      tbody.innerHTML = props.map(function (p) {
        return '<tr data-row="' + p.id + '">' +
          '<td>' + p.area + '</td>' +
          '<td class="cell-strong">' + p.name + '</td>' +
          '<td>' +
            '<div class="concierge-edit-wrap">' +
              '<span class="concierge-name' + (p.concierge ? '' : ' unassigned-text') + '">' + (p.concierge || 'Unassigned') + '</span>' +
              '<select class="concierge-select" data-concierge-select="' + p.id + '"></select>' +
              '<button class="icon-action concierge-edit-btn" data-edit-concierge="' + p.id + '" title="Reassign"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
            '</div>' +
          '</td>' +
          '<td style="text-align:right;"></td>' +
          '</tr>';
      }).join('');
    }
    resultCount.textContent = props.length + ' properties';
  }

  buFilter.addEventListener('change', render);
  conciergeFilter.addEventListener('change', render);
  sortBy.addEventListener('change', render);

  var conciergeOptions = MM.MOCK_STAFF.filter(function (s) { return s.role === 'Concierge'; });

  tbody.addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit-concierge]');
    if (editBtn) {
      var id = editBtn.getAttribute('data-edit-concierge');
      var row = editBtn.closest('tr');
      var select = row.querySelector('[data-concierge-select]');
      var current = getConcierge(id);
      select.innerHTML = conciergeOptions.map(function (s) {
        return '<option value="' + s.name + '"' + (s.name === current ? ' selected' : '') + '>' + s.name + '</option>';
      }).join('');
      row.classList.add('editing');
      select.focus();
    }
  });

  tbody.addEventListener('change', function (e) {
    var select = e.target.closest('[data-concierge-select]');
    if (!select) return;
    var id = select.getAttribute('data-concierge-select');
    var overrides = readJSON(STORAGE_KEY, {});
    overrides[id] = select.value;
    saveJSON(STORAGE_KEY, overrides);
    var prop = MM.MOCK_PROPERTIES.filter(function (p) { return p.id === id; })[0];
    MM.showToast((prop ? prop.name : id) + ' assigned to ' + select.value + '.');
    render();
  });

  document.getElementById('download-csv-btn').addEventListener('click', function () {
    var rows = [['Area', 'Property', 'Concierge']];
    MM.MOCK_PROPERTIES.filter(function (p) { return p.status !== 'closed'; }).forEach(function (p) {
      rows.push([AREA_MAP[p.id] || 'Other', p.name, getConcierge(p.id) || 'Unassigned']);
    });
    var csv = rows.map(function (r) { return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(','); }).join('\n');
    var blob = new Blob([csv], { type: 'text/csv' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'concierge-territories.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    MM.showToast('Concierge territories exported to CSV.');
  });

  populateConciergeFilter();
  render();
})();
