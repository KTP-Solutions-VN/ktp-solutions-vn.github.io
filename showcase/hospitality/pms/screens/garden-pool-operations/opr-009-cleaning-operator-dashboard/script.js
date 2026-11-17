(function () {
  'use strict';
  var STORAGE_KEY = 'mm_opr_cleaning_release';
  function releaseState(id) {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return stored[id] || 'Not reviewed';
  }
  function setRelease(id, val) {
    var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    stored[id] = val;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }
  function render() {
    var data = MM.OPR.CLEANING_ROUNDS;
    document.getElementById('stat-progress').textContent = data.filter(function (r) { return r.status === 'In Progress'; }).length;
    document.getElementById('stat-done').textContent = data.filter(function (r) { return r.status === 'Completed'; }).length;
    var rated = data.filter(function (r) { return r.rating; });
    document.getElementById('stat-rating').textContent = rated.length ? (rated.reduce(function (s, r) { return s + r.rating; }, 0) / rated.length).toFixed(1) : '\u2014';
    document.getElementById('list-tbody').innerHTML = data.map(function (r) {
      var rel = releaseState(r.id);
      var relBadge = rel === 'Released to owner' ? 'badge-success' : (rel === 'Internal only' ? 'badge-warning' : 'badge-neutral');
      return '<tr><td class="cell-strong">' + r.property + '</td><td class="cell-sub">' + r.date + '</td><td>' + MM.OPR.badge(r.status) + '</td>' +
        '<td>' + (r.rating ? r.rating.toFixed(1) + ' / 5' : '\u2014') + '</td>' +
        '<td><span class="badge ' + relBadge + '">' + rel + '</span></td>' +
        '<td class="row-actions">' + (r.status === 'Completed' ? '<button class="btn btn-outline btn-sm" data-release="' + r.id + '">Release to Owner</button>' : '') +
        '<button class="btn btn-ghost btn-sm" data-delete-point="' + r.id + '" title="Delete round"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('');
  }
  render();
  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var relBtn = e.target.closest('[data-release]');
    var delBtn = e.target.closest('[data-delete-point]');
    if (relBtn) { setRelease(relBtn.dataset.release, 'Released to owner'); MM.showToast('Released to owner'); render(); }
    if (delBtn) { delBtn.closest('tr').remove(); MM.showToast('Cleaning round deleted', { danger: true }); }
  });
})();
