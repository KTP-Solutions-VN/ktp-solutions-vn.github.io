(function () {
  'use strict';
  var PHO = MM.PHO;
  var state = { search: '', qf: 'all' };

  function isOtaReady(r) { return !!(r.sets && r.sets.ota && r.sets.ota.count > 0); }

  function cardHtml(r) {
    var setKeys = Object.keys(r.sets || {});
    var pills = PHO.SET_TYPES.filter(function (t) { return r.sets[t.key]; }).map(function (t) {
      var s = r.sets[t.key];
      return '<span class="set-pill" data-open-set="' + r.id + '" data-set-type="' + t.key + '">' + t.label + ' &middot; ' + s.count + '</span>';
    }).join('');
    if (!pills) pills = '<span class="set-pill empty">No common area photos yet</span>';
    return '<div class="residence-card">' +
      '<div class="residence-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><path d="M9 22V12h6v10"/></svg></div>' +
      '<div class="residence-card__body">' +
        '<div class="residence-card__title" data-open-residence="' + r.id + '">' + r.name + '</div>' +
        '<div class="residence-card__meta">' + r.district + ' &middot; ' + r.bu + '</div>' +
        '<div class="photo-tile__sets" style="margin-top:8px;">' + pills + '</div>' +
      '</div>' +
      '<div class="row-actions">' +
        '<button class="btn btn-outline btn-sm" data-open-residence="' + r.id + '">Open</button>' +
        '<button class="btn btn-ghost btn-sm" data-upload="' + r.id + '">Upload</button>' +
      '</div>' +
    '</div>';
  }

  function render() {
    var all = PHO.RESIDENCES;
    var filtered = all.filter(function (r) {
      if (state.search) {
        var q = state.search.toLowerCase();
        if ((r.name + ' ' + r.district).toLowerCase().indexOf(q) === -1) return false;
      }
      if (state.qf === 'ota' && !isOtaReady(r)) return false;
      return true;
    });

    var list = document.getElementById('residence-list');
    var empty = document.getElementById('residence-empty');
    if (!filtered.length) { list.innerHTML = ''; empty.hidden = false; }
    else { empty.hidden = true; list.innerHTML = filtered.map(cardHtml).join(''); }

    document.getElementById('result-count').textContent = filtered.length + ' of ' + all.length + ' residences';
    document.getElementById('stat-total').textContent = all.length;
    document.getElementById('stat-ready').textContent = all.filter(isOtaReady).length;

    document.querySelectorAll('[data-open-residence]').forEach(function (el) {
      el.addEventListener('click', function () {
        window.location.href = '../pho-004-residence-common-area-photos/index.html?id=' + el.getAttribute('data-open-residence');
      });
    });
    document.querySelectorAll('[data-upload]').forEach(function (el) {
      el.addEventListener('click', function () {
        window.location.href = '../pho-004-residence-common-area-photos/index.html?id=' + el.getAttribute('data-upload') + '#upload';
      });
    });
    document.querySelectorAll('[data-open-set]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        window.location.href = '../pho-005-common-area-photo-set-detail/index.html?id=' + el.getAttribute('data-open-set') + '&set=' + el.getAttribute('data-set-type');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();
    document.getElementById('search-input').addEventListener('input', function (e) { state.search = e.target.value.trim(); render(); });
    ['all', 'ota'].forEach(function (qf) {
      document.getElementById('qf-' + qf).addEventListener('click', function () {
        state.qf = qf;
        document.querySelectorAll('[data-qf]').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-qf') === qf); });
        render();
      });
    });
  });
})();
