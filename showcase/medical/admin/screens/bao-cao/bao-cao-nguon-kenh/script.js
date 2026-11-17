
  document.getElementById('exportBtn').addEventListener('click', function () { CJToast('Report exported (demo).'); });
  
    var counts = {}; DATA_KHACH_HANG.forEach(function (c) { counts[c.acquisitionSource] = (counts[c.acquisitionSource]||0)+1; });
    var colors = { Event: '#B9770E', 'Hospital Tour': '#2A5DA6', Online: '#019770', Retail: '#4C5FFF', Referral: '#B08D57' };
    var total = Object.values(counts).reduce(function(a,b){return a+b;},0) || 1;
    var acc = 0, stops = [];
    Object.keys(counts).forEach(function (k) { var pct = counts[k]/total*100; stops.push((colors[k]||'#999') + ' ' + acc + '% ' + (acc+pct) + '%'); acc += pct; });
    document.getElementById('donutChart').style.background = 'conic-gradient(' + stops.join(',') + ')';
    document.getElementById('donutLegend').innerHTML = Object.keys(counts).map(function (k) { return '<span><span class="legend-dot" style="background:' + (colors[k]||'#999') + ';"></span>' + k + ' — ' + counts[k] + '</span>'; }).join('');
    document.getElementById('listTbody').innerHTML = DATA_KHACH_HANG.map(function (c) {
      return '<tr><td class="cell-strong">' + c.name + '</td><td>' + c.acquisitionSource + '</td><td>' + c.joinedAt + '</td></tr>';
    }).join('');
    
  