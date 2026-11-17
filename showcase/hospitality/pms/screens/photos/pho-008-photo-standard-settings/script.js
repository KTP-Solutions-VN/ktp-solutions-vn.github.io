(function () {
  'use strict';
  var PHO = MM.PHO;
  var STORAGE_OVERRIDES = 'mm_pho_standards_overrides';
  var VILLA_TYPES = ['Pool Villa', 'Beachfront Villa', 'Hillside Villa', 'Garden Villa'];
  var BR_COUNT = 8;

  function readJSON(key, fallback) { try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; } }
  function writeJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  function clone(v) { return JSON.parse(JSON.stringify(v)); }

  var currentType = VILLA_TYPES[0];
  var workingAreas = [];   // in-memory areas for the currently selected type — never mutates MM.PHO.STANDARDS
  var pendingRemoveCode = null;

  function overridesFor(type) {
    var all = readJSON(STORAGE_OVERRIDES, {});
    return all[type];
  }

  function loadType(type) {
    currentType = type;
    var override = overridesFor(type);
    if (override && override.areas) {
      workingAreas = clone(override.areas);
    } else {
      var base = (PHO.STANDARDS[type] && PHO.STANDARDS[type].areas) || [];
      workingAreas = clone(base);
    }
    document.getElementById('table-title').textContent = type + ' — Required Photos by Bedroom Count';
    document.getElementById('save-status').textContent = override
      ? 'Custom standard saved for ' + type + '.'
      : 'Showing the default standard for ' + type + ' — not customized yet.';
    render();
  }

  /* Icon auto-detected from the area's code/name. Small curated set,
     falls back to a generic camera glyph for custom areas. */
  function iconFor(area) {
    var key = (area.code || area.name || '').toLowerCase();
    var icons = {
      drone: '<path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><rect x="7" y="7" width="10" height="10" rx="2"/>',
      exterior: '<path d="M3 11l9-7 9 7"/><path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"/>',
      pool: '<path d="M2 17c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0"/><path d="M2 12c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0"/><circle cx="7" cy="6" r="2"/>',
      living: '<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 18h18M5 12V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/>',
      dining: '<path d="M6 2v7a3 3 0 0 0 6 0V2M9 9v13M17 2c-1.6 0-3 2-3 5s1.4 5 3 5v9"/>',
      kitchen: '<path d="M4 3v18M4 3h4a4 4 0 0 1 4 4v3H4"/><path d="M15 3v18M20 3v18M15 3h5"/>',
      bedroom: '<path d="M2 20v-7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7"/><path d="M2 20h20M4 11V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/>',
      bathroom: '<path d="M2 20v-7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7"/><path d="M2 20h20M4 11V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/>'
    };
    var match = Object.keys(icons).filter(function (k) { return key.indexOf(k) !== -1; })[0];
    return icons[match] || '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>';
  }

  function renderRow(area, idx) {
    var locked = !!area.locked;
    var nameCell = locked
      ? '<div class="area-locked-name">' + area.name + '</div>' + (area.note ? '<div class="area-locked-note">' + area.note + '</div>' : '')
      : '<input type="text" class="area-name-input" data-name-idx="' + idx + '" value="' + (area.name || '').replace(/"/g, '&quot;') + '" placeholder="Area name">' +
        '<input type="text" class="area-note-input" data-note-idx="' + idx + '" value="' + (area.note || '').replace(/"/g, '&quot;') + '" placeholder="Note (optional)">';

    var reqCells = '';
    for (var i = 0; i < BR_COUNT; i++) {
      var val = (area.req && area.req[i] !== undefined) ? area.req[i] : 0;
      reqCells += '<td><input type="number" class="req-input" min="0" max="999" step="1" data-row="' + idx + '" data-col="' + i + '" value="' + val + '"></td>';
    }

    return '<tr' + (locked ? '' : ' class="custom-row"') + ' data-row-idx="' + idx + '">' +
      '<td><div class="area-row-main"><span class="area-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + iconFor(area) + '</svg></span><div style="flex:1;">' + nameCell + '</div></div></td>' +
      reqCells +
      '<td>' + (locked ? '' : '<button type="button" class="icon-action danger" title="Remove area" data-remove-row="' + idx + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>') + '</td>' +
    '</tr>';
  }

  function recomputeTotals() {
    for (var col = 0; col < BR_COUNT; col++) {
      var sum = workingAreas.reduce(function (acc, area) { return acc + (parseInt(area.req && area.req[col], 10) || 0); }, 0);
      document.getElementById('tot-' + col).textContent = sum;
    }
  }

  function render() {
    document.getElementById('standard-tbody').innerHTML = workingAreas.map(renderRow).join('');
    recomputeTotals();
  }

  function clampReq(v) {
    var n = parseInt(v, 10);
    if (isNaN(n) || n < 0) n = 0;
    if (n > 999) n = 999;
    return n;
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadType(currentType);

    document.getElementById('villa-type-select').addEventListener('change', function () {
      loadType(this.value);
    });

    document.getElementById('add-area-btn').addEventListener('click', function () {
      workingAreas.push({ code: MM.uid('area'), name: '', note: '', locked: false, req: [0, 0, 0, 0, 0, 0, 0, 0] });
      render();
      var lastInput = document.querySelector('.area-name-input[data-name-idx="' + (workingAreas.length - 1) + '"]');
      if (lastInput) lastInput.focus();
      MM.showToast('New area row added — set its name and required counts, then Save.');
    });

    var tbody = document.getElementById('standard-tbody');

    tbody.addEventListener('input', function (e) {
      var t = e.target;
      if (t.classList.contains('req-input')) {
        var row = parseInt(t.getAttribute('data-row'), 10);
        var col = parseInt(t.getAttribute('data-col'), 10);
        workingAreas[row].req[col] = clampReq(t.value);
        recomputeTotals();
      } else if (t.hasAttribute('data-name-idx')) {
        workingAreas[parseInt(t.getAttribute('data-name-idx'), 10)].name = t.value;
      } else if (t.hasAttribute('data-note-idx')) {
        workingAreas[parseInt(t.getAttribute('data-note-idx'), 10)].note = t.value;
      }
    });

    tbody.addEventListener('blur', function (e) {
      if (e.target && e.target.classList && e.target.classList.contains('req-input')) {
        e.target.value = clampReq(e.target.value);
      }
    }, true);

    tbody.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-remove-row]');
      if (!btn) return;
      var idx = parseInt(btn.getAttribute('data-remove-row'), 10);
      var area = workingAreas[idx];
      pendingRemoveCode = idx;
      document.getElementById('del-area-name').textContent = area.name || 'this area';
      MM.openModal('delete-area-modal');
    });

    document.getElementById('confirm-delete-area-btn').addEventListener('click', function () {
      if (pendingRemoveCode === null) return;
      workingAreas.splice(pendingRemoveCode, 1);
      pendingRemoveCode = null;
      MM.closeModal('delete-area-modal');
      MM.showToast('Area removed from the standard.', { danger: true });
      render();
    });

    document.getElementById('reset-btn').addEventListener('click', function () {
      window.location.reload();
    });

    document.getElementById('save-btn').addEventListener('click', function () {
      var invalid = workingAreas.some(function (a) { return !a.locked && !a.name.trim(); });
      if (invalid) { MM.showToast('Give every custom area a name before saving.', { danger: true }); return; }
      var btn = this;
      MM.simulateSave(btn, 'Saving...', function () {
        var all = readJSON(STORAGE_OVERRIDES, {});
        all[currentType] = { areas: clone(workingAreas) };
        writeJSON(STORAGE_OVERRIDES, all);
        document.getElementById('save-status').textContent = 'Custom standard saved for ' + currentType + '.';
        MM.showToast('Photo standard saved for ' + currentType + '.');
      });
    });
  });
})();
