(function () {
  'use strict';

  var ICONS = {
    'fitness-wellness': '<path d="M6.5 6.5 17.5 17.5"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/>',
    'shopping-entertainment': '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
    'indoor-outdoor-activities': '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'
  };

  document.getElementById('activity-categories').innerHTML = GST.ACTIVITY_LINKS.map(function (c) {
    return (
      '<a class="card activity-cat-card hoverable" href="' + c.url + '" target="_blank" rel="noopener">' +
        '<div class="activity-cat-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">' + (ICONS[c.id] || '') + '</svg></div>' +
        '<h3>' + c.label + ' <svg class="ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></h3>' +
        '<p class="text-sm text-muted" style="margin:0;">' + c.blurb + '</p>' +
      '</a>'
    );
  }).join('');

  var CAT_BADGE = { Outdoor: 'badge-success', Indoor: 'badge-info', Fitness: 'badge-warning' };

  document.getElementById('activity-suggestions').innerHTML = GST.ACTIVITY_SUGGESTIONS.map(function (a, i) {
    var tile = ['photo-tile--a', 'photo-tile--b', 'photo-tile--c', 'photo-tile--d'][i % 4];
    return (
      '<div class="card">' +
        '<div class="photo-tile ' + tile + '" style="min-height:110px;"><div class="photo-tile__label">' + a.name + '</div></div>' +
        '<div style="padding: var(--sp-4);">' +
          '<span class="badge ' + (CAT_BADGE[a.category] || 'badge-neutral') + '">' + a.category + '</span>' +
          '<p class="text-sm text-muted" style="margin:8px 0 0;">' + a.note + '</p>' +
        '</div>' +
      '</div>'
    );
  }).join('');
})();
