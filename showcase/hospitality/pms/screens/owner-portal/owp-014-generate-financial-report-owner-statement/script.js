(function () {
  'use strict';
  var owner = MM.MOCK_OWNERS[0];
  var myProps = MM.MOCK_PROPERTIES.filter(function (p) { return owner.properties.indexOf(p.id) !== -1; });
  document.getElementById('f-property').innerHTML = myProps.map(function (p) { return '<option>' + p.name + '</option>'; }).join('');

  function render() {
    var myPropNames = myProps.map(function (p) { return p.name; });
    document.getElementById('stmt-tbody').innerHTML = MM.MOCK_BOOKINGS.filter(function (b) { return myPropNames.indexOf(b.property) !== -1; }).map(function (b) {
      var commission = Math.round(b.total * 0.15), net = b.total - commission;
      return '<tr><td class="cell-strong">' + b.id + '</td><td>' + b.guest + '</td><td class="cell-num">$' + b.total.toLocaleString() + '</td><td class="cell-num">$' + commission.toLocaleString() + '</td><td class="cell-num">$' + net.toLocaleString() + '</td></tr>';
    }).join('');
  }
  render();
  document.getElementById('generate-btn').addEventListener('click', function () { MM.simulateSave(this, 'Generating...', function () { render(); MM.showToast('Statement generated'); }); });
  document.getElementById('download-btn').addEventListener('click', function () { MM.showToast('Statement downloaded as PDF'); });
})();
