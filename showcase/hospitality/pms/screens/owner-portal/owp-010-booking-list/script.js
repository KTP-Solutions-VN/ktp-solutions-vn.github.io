(function () {
  'use strict';
  var statusMap = { confirmed: 'badge-info', 'checked-in': 'badge-success', pending: 'badge-warning', cancelled: 'badge-danger' };
  var owner = MM.MOCK_OWNERS[0];
  var myProps = MM.MOCK_PROPERTIES.filter(function (p) { return owner.properties.indexOf(p.id) !== -1; }).map(function (p) { return p.name; });
  var data = MM.MOCK_BOOKINGS.filter(function (b) { return myProps.indexOf(b.property) !== -1; });

  function rows(list) {
    document.getElementById('list-tbody').innerHTML = list.map(function (b) {
      return '<tr class="clickable" data-id="' + b.id + '"><td class="cell-strong">' + b.id + '</td><td>' + b.property + '</td><td>' + b.guest + '</td>' +
        '<td class="cell-sub">' + b.checkIn + ' &rarr; ' + b.checkOut + '</td><td><span class="badge ' + (statusMap[b.status] || 'badge-neutral') + '">' + b.status + '</span></td><td class="cell-num">$' + b.total.toLocaleString() + '</td></tr>';
    }).join('') || '<tr><td colspan="6" class="text-muted text-sm">No bookings yet.</td></tr>';
    document.getElementById('result-count').textContent = list.length + ' bookings';
  }
  rows(data);

  document.getElementById('search-input').addEventListener('input', function () {
    var q = this.value.trim().toLowerCase();
    rows(data.filter(function (b) { return (b.id + ' ' + b.guest + ' ' + b.property).toLowerCase().indexOf(q) !== -1; }));
  });

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var row = e.target.closest('[data-id]');
    if (!row) return;
    var b = data.find(function (d) { return d.id === row.dataset.id; });
    document.getElementById('detail-id').textContent = b.id;
    document.getElementById('detail-property').textContent = b.property;
    document.getElementById('detail-guest').textContent = b.guest;
    document.getElementById('detail-dates').textContent = b.checkIn + ' → ' + b.checkOut;
    document.getElementById('detail-total').textContent = '$' + b.total.toLocaleString();
    MM.openModal('detail-modal');
  });
})();
