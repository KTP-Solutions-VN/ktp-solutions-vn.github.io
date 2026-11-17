(function () {
  'use strict';
  var BOOK = MM.BOOK;
  var sortState = { key: null, dir: 'asc' };

  function fmtShort(iso) {
    if (!iso) return '—';
    var d = new Date(iso + (iso.length <= 10 ? 'T00:00:00' : ''));
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' });
  }

  function render() {
    var rows = BOOK.getActions().slice().sort(function (a, b) { return b.id.localeCompare(a.id); });
    if (sortState.key) rows = BOOK.sortRows(rows, sortState.key, sortState.dir, sortState.key === 'startDate' ? 'date' : 'text');

    document.getElementById('result-count').textContent = rows.length + (rows.length === 1 ? ' action' : ' actions');
    document.getElementById('action-empty').hidden = rows.length !== 0;

    document.getElementById('action-tbody').innerHTML = rows.map(function (a) {
      var b64 = window.btoa(a.id);
      return '<tr>' +
        '<td class="cell-strong">' + a.bu + '</td>' +
        '<td class="cell-sub">' + fmtShort(a.startDate) + '</td>' +
        '<td class="cell-sub">' + fmtShort(a.endDate) + '</td>' +
        '<td>' + a.createdBy + '</td>' +
        '<td class="cell-sub">' + fmtShort(a.createdAt) + '</td>' +
        '<td class="row-actions">' +
          '<a class="btn btn-outline btn-sm" href="../book-105-follow-up-action/index.html?id=' + encodeURIComponent(b64) + '" title="Follow up">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></svg> Follow up' +
          '</a>' +
        '</td></tr>';
    }).join('');
  }

  BOOK.wireSortChips(document.querySelector('.toolbar'), function (key, dir) {
    sortState = { key: key, dir: dir };
    render();
  });

  document.getElementById('btn-add-action').addEventListener('click', function () {
    window.location.href = '../book-104-add-occupancy-based-action/index.html';
  });

  render();
})();
