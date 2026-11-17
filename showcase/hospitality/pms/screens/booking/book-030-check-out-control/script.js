document.addEventListener('DOMContentLoaded', function () {
  var DATA = MM.BOOK.CHECKOUT_CONTROLS;

  function stars(n) {
    if (n === null || n === undefined) return '<span class="text-muted">Pending</span>';
    return '<span class="stars">' + '\u2605'.repeat(n) + '\u2606'.repeat(5 - n) + '</span>';
  }

  document.getElementById('rows').innerHTML = DATA.map(function (r) {
    var started = r.start !== '—';
    return '<tr>' +
      '<td class="cell-strong">' + r.property + '</td>' +
      '<td>' + r.staff + '</td>' +
      '<td class="cell-num">' + r.start + '</td>' +
      '<td class="cell-num">' + r.end + '</td>' +
      '<td class="cell-num text-xs">' + r.gps + '</td>' +
      '<td>' + (r.damage === 'None' ? '<span class="badge badge-success">None</span>' : (r.damage === '—' ? '—' : '<span class="badge badge-warning">Reported</span>')) + '</td>' +
      '<td class="text-sm">' + (r.comments || '—') + '</td>' +
      '<td>' + stars(r.satisfaction) + '</td>' +
      '<td><button class="btn btn-ghost btn-sm" data-view="' + r.id + '"' + (started ? '' : ' disabled') + '>View Details</button></td>' +
    '</tr>';
  }).join('');

  document.querySelectorAll('[data-view]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var r = DATA.filter(function (x) { return x.id === btn.getAttribute('data-view'); })[0];
      document.getElementById('dm-title').textContent = r.property + ' — Check-out Control';
      function field(label, value) { return '<div><div class="detail-field__label">' + label + '</div><div class="detail-field__value">' + value + '</div></div>'; }
      document.getElementById('dm-grid').innerHTML = [
        field('Property', r.property),
        field('Satisfaction Score', stars(r.satisfaction)),
        field('Damage', r.damage),
        field('Comment', r.comments || '—'),
        field('Control Points', '12 of 12 passed'),
        field('Staff', r.staff)
      ].join('');
      MM.openModal('detail-modal');
    });
  });
});
