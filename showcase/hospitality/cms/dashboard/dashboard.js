/* Dashboard screen behaviour — renders the mock occupancy bar chart. */

document.addEventListener('DOMContentLoaded', function () {
  var chart = document.getElementById('occupancy-chart');
  if (!chart) return;

  var days = [
    { label: 'Wed', occ: 62, adr: 70 },
    { label: 'Thu', occ: 68, adr: 74 },
    { label: 'Fri', occ: 81, adr: 88 },
    { label: 'Sat', occ: 92, adr: 95 },
    { label: 'Sun', occ: 88, adr: 90 },
    { label: 'Mon', occ: 71, adr: 76 },
    { label: 'Tue', occ: 75, adr: 79 }
  ];

  days.forEach(function (day) {
    var col = document.createElement('div');
    col.className = 'bar-chart__col';

    var bars = document.createElement('div');
    bars.className = 'bar-chart__bars';

    var occBar = document.createElement('div');
    occBar.className = 'bar-chart__bar occ';
    occBar.style.height = day.occ + '%';
    occBar.title = 'Occupancy: ' + day.occ + '%';

    var adrBar = document.createElement('div');
    adrBar.className = 'bar-chart__bar adr';
    adrBar.style.height = day.adr + '%';
    adrBar.title = 'ADR (indexed): ' + day.adr;

    bars.appendChild(occBar);
    bars.appendChild(adrBar);

    var label = document.createElement('div');
    label.className = 'bar-chart__col-label';
    label.textContent = day.label;

    col.appendChild(bars);
    col.appendChild(label);
    chart.appendChild(col);
  });
});
