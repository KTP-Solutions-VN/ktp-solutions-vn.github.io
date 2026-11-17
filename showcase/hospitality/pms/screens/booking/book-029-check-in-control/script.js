document.addEventListener('DOMContentLoaded', function () {
  var DATA = MM.BOOK.CHECKIN_CONTROLS;

  document.getElementById('rows').innerHTML = DATA.map(function (r) {
    var started = r.start !== '—';
    return '<tr>' +
      '<td class="cell-strong">' + r.property + '</td>' +
      '<td>' + r.staff + '</td>' +
      '<td class="cell-num">' + r.start + '</td>' +
      '<td class="cell-num">' + r.end + '</td>' +
      '<td class="cell-num text-xs">' + r.gps + '</td>' +
      '<td class="text-sm">' + (r.comments || '<span class="text-muted">—</span>') + '</td>' +
      '<td><button class="btn btn-ghost btn-sm" data-view="' + r.id + '"' + (started ? '' : ' disabled') + '>View Details</button></td>' +
    '</tr>';
  }).join('');

  document.querySelectorAll('[data-view]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-view');
      var r = DATA.filter(function (x) { return x.id === id; })[0];
      document.getElementById('dm-title').textContent = r.property + ' — Check-in Control';
      document.getElementById('dm-sub').textContent = r.staff + ' · ' + r.start + '–' + r.end;
      document.getElementById('dm-location').innerHTML = [
        [r.start, r.property + ' main gate', '0 m'],
        [r.start.split(':')[0] + ':' + (parseInt(r.start.split(':')[1]||0,10)+4).toString().padStart(2,'0'), 'Pool deck', '18 m'],
        [r.end, r.property + ' main gate', '4 m']
      ].map(function (row) { return '<tr><td>' + row[0] + '</td><td>' + row[1] + '</td><td>' + row[2] + '</td></tr>'; }).join('');
      document.getElementById('dm-compare1').innerHTML = [
        ['Amenities set up', 'Completed'], ['Welcome drinks placed', 'Completed'], ['AC pre-cooled', 'Completed']
      ].map(function (row) { return '<tr><td>' + row[0] + '</td><td><span class="badge badge-success">' + row[1] + '</span></td></tr>'; }).join('');
      document.getElementById('dm-compare2').innerHTML = [
        ['Pool clean', 'Confirmed'], ['No maintenance issues', 'Confirmed'], ['Linen fresh', r.comments ? 'Noted — see comments' : 'Confirmed']
      ].map(function (row) { return '<tr><td>' + row[0] + '</td><td><span class="badge badge-info">' + row[1] + '</span></td></tr>'; }).join('');
      MM.openModal('detail-modal');
    });
  });
});
