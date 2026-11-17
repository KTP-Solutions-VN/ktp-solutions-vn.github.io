(function () {
  'use strict';
  var PHO = MM.PHO;
  var STORAGE_LINKS = 'mm_pho_agent_links';

  function readJSON(key, fallback) { try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; } }

  function agentLinkFor(id) {
    var overrides = readJSON(STORAGE_LINKS, {});
    if (overrides[id]) return overrides[id];
    var p = PHO.PROPERTY_PHOTOS[id];
    return p ? p.agentLink : null;
  }

  function setsFor(id) {
    var p = PHO.PROPERTY_PHOTOS[id];
    return p ? p.sets : {};
  }

  function scoreFor(id) {
    var sets = setsFor(id);
    var ota = sets.ota;
    return ota ? ota.score : null;
  }

  function otaReady(id) {
    var sets = setsFor(id);
    return !!(sets.ota && sets.ota.count >= sets.ota.required && sets.ota.required > 0);
  }

  var state = { search: '', bu: '', qf: 'all' };

  function applyFilters(list) {
    return list.filter(function (p) {
      if (state.search) {
        var q = state.search.toLowerCase();
        if (p.name.toLowerCase().indexOf(q) === -1) return false;
      }
      if (state.bu && p.bu !== state.bu) return false;
      if (state.qf === 'ota' && !otaReady(p.id)) return false;
      if (state.qf === 'noagent' && agentLinkFor(p.id)) return false;
      return true;
    });
  }

  function tileHtml(p) {
    var sets = setsFor(p.id);
    var score = scoreFor(p.id);
    var scoreClass = PHO.scoreClass(score);
    var link = agentLinkFor(p.id);
    var setKeys = Object.keys(sets);
    var setPills = PHO.SET_TYPES.filter(function (t) { return sets[t.key]; }).map(function (t) {
      var s = sets[t.key];
      return '<span class="set-pill" data-open-set="' + p.id + '" data-set-type="' + t.key + '">' + t.label + ' &middot; ' + s.count + '</span>';
    }).join('');
    if (!setPills) setPills = '<span class="set-pill empty">No photo sets yet</span>';

    return '<div class="photo-tile" data-tile="' + p.id + '">' +
      '<div class="photo-tile__thumb" data-open-property="' + p.id + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' +
        (score !== null ? '<span class="photo-tile__score ' + scoreClass + '">' + score.toFixed(1) + '</span>' : '') +
      '</div>' +
      '<div class="photo-tile__body">' +
        '<div class="photo-tile__title" data-open-property="' + p.id + '">' + p.name + '</div>' +
        '<div class="photo-tile__meta">' + p.bu + ' &middot; ' + p.bedrooms + ' bed &middot; ' + p.id + '</div>' +
        '<div class="photo-tile__sets">' + setPills + '</div>' +
        '<div class="agent-link-row">' +
          (link
            ? '<span class="link-text">' + link + '</span><button class="btn btn-ghost btn-sm" data-copy-link="' + p.id + '">Copy</button>'
            : '<span class="text-muted">No agent link yet</span><button class="btn btn-outline btn-sm" data-create-link="' + p.id + '">Create</button>') +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function render() {
    var all = MM.MOCK_PROPERTIES.slice();
    var filtered = applyFilters(all);
    var grid = document.getElementById('photo-grid');
    var empty = document.getElementById('photo-empty');

    if (!filtered.length) {
      grid.innerHTML = '';
      empty.hidden = false;
    } else {
      empty.hidden = true;
      grid.innerHTML = filtered.map(tileHtml).join('');
    }

    document.getElementById('result-count').textContent = filtered.length + ' of ' + all.length + ' properties';
    document.getElementById('pagination-label').textContent = 'Showing 1–' + filtered.length + ' of ' + filtered.length + ' properties';

    document.getElementById('stat-total').textContent = all.length;
    document.getElementById('stat-ota-ready').textContent = all.filter(function (p) { return otaReady(p.id); }).length;
    document.getElementById('stat-no-agent').textContent = all.filter(function (p) { return !agentLinkFor(p.id); }).length;
    var scores = all.map(function (p) { return scoreFor(p.id); }).filter(function (s) { return s !== null; });
    var avg = scores.length ? (scores.reduce(function (a, b) { return a + b; }, 0) / scores.length) : 0;
    document.getElementById('stat-avg-score').textContent = avg ? avg.toFixed(1) : '–';

    wireTileActions();
  }

  function wireTileActions() {
    document.querySelectorAll('[data-open-property]').forEach(function (el) {
      el.addEventListener('click', function () {
        window.location.href = '../pho-006-property-photo-page/index.html?id=' + el.getAttribute('data-open-property');
      });
    });
    document.querySelectorAll('[data-open-set]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        window.location.href = '../pho-007-property-photo-set-detail/index.html?id=' + el.getAttribute('data-open-set') + '&set=' + el.getAttribute('data-set-type');
      });
    });
    document.querySelectorAll('[data-copy-link]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        var link = agentLinkFor(el.getAttribute('data-copy-link'));
        if (navigator.clipboard) { navigator.clipboard.writeText(link).catch(function () {}); }
        MM.showToast('Agent link copied to clipboard.');
      });
    });
    document.querySelectorAll('[data-create-link]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = el.getAttribute('data-create-link');
        var overrides = readJSON(STORAGE_LINKS, {});
        overrides[id] = 'https://share.azurastays.example/' + id.toLowerCase() + '/agent';
        localStorage.setItem(STORAGE_LINKS, JSON.stringify(overrides));
        MM.showToast('Agent sharing link created.');
        render();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();

    document.getElementById('search-input').addEventListener('input', function (e) {
      state.search = e.target.value.trim();
      render();
    });

    document.querySelectorAll('#bu-options input').forEach(function (radio) {
      radio.addEventListener('change', function () {
        state.bu = radio.value;
        document.getElementById('bu-chip-label').textContent = radio.value || 'All Business Units';
        render();
      });
    });

    ['all', 'ota', 'noagent'].forEach(function (qf) {
      document.getElementById('qf-' + qf).addEventListener('click', function () {
        state.qf = qf;
        document.querySelectorAll('[data-qf]').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-qf') === qf); });
        render();
      });
    });
    document.getElementById('qf-all').classList.add('active');

    document.getElementById('clear-filters-btn').addEventListener('click', function () {
      state = { search: '', bu: '', qf: 'all' };
      document.getElementById('search-input').value = '';
      document.querySelectorAll('#bu-options input')[0].checked = true;
      document.getElementById('bu-chip-label').textContent = 'All Business Units';
      document.querySelectorAll('[data-qf]').forEach(function (b) { b.classList.toggle('active', b.id === 'qf-all'); });
      render();
    });
  });
})();
