document.addEventListener('DOMContentLoaded', function () {
  var buSel = document.getElementById('bu-filter');
  Array.from(new Set(MM.BOOK.VILLA_CONTROL_POINTS.map(function (v) { return v.bu; }))).forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o);
  });

  function render() {
    var bu = buSel.value;
    var rows = MM.BOOK.VILLA_CONTROL_POINTS.filter(function (v) { return !bu || v.bu === bu; });
    document.getElementById('rows').innerHTML = rows.map(function (v) {
      return '<tr>' +
        '<td class="cell-strong">' + v.property + '</td>' +
        '<td>' + v.bu + '</td>' +
        '<td class="cell-num">' + v.controlPoints + '</td>' +
        '<td class="cell-num">' + v.reminders + '</td>' +
        '<td><a class="btn btn-ghost btn-sm" href="../../villa-common-settings/vcs-001-amenities-list/index.html">Configure</a></td>' +
      '</tr>';
    }).join('');
    document.getElementById('result-count').textContent = rows.length + ' villas';
  }
  buSel.addEventListener('change', render);
  render();
});
