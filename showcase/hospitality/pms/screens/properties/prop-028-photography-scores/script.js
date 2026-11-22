(function () {
  'use strict';

  var STORAGE_KEY = 'mm_prop_photo_scores';

  var MOCK_SCORES = [
    { id: 'PS-01', property: 'Villa Sapphire Cliff', bu: 'Sentosa Collection', photographer: 'Sentosa Frame Photography', angles: 3, colours: 3, composition: 2, assessedAt: '2026-06-02', assessedBy: 'Daniel Tan' },
    { id: 'PS-02', property: 'Villa Coral Horizon', bu: 'Sentosa Collection', photographer: 'Sentosa Frame Photography', angles: 2, colours: 2, composition: 2, assessedAt: '2026-06-04', assessedBy: 'Daniel Tan' },
    { id: 'PS-03', property: 'Villa Emerald Bay', bu: 'Byron Bay Retreats', photographer: 'Byron Bloom Gardens', angles: 1, colours: 2, composition: 1, assessedAt: '2026-05-20', assessedBy: 'David Chen' },
    { id: 'PS-04', property: 'Villa Lotus Terrace', bu: 'Noosa Estates', photographer: 'Coral Pool Services', angles: 2, colours: 1, composition: 2, assessedAt: '2026-05-18', assessedBy: 'Nicole Parker' },
    { id: 'PS-05', property: 'Villa Silver Tide', bu: 'Byron Bay Retreats', photographer: 'Byron Bloom Gardens', angles: 3, colours: 3, composition: 3, assessedAt: '2026-06-10', assessedBy: 'David Chen' },
    { id: 'PS-06', property: 'Villa Turquoise Reef', bu: 'Sentosa Collection', photographer: 'Sentosa Frame Photography', angles: 2, colours: 3, composition: 2, assessedAt: '2026-08-16', assessedBy: 'Daniel Tan' }
  ];

  function loadAll() {
    var overrides = {}; try { (JSON.parse(localStorage.getItem(STORAGE_KEY)) || []).forEach(function (o) { overrides[o.id] = o; }); } catch (e) {}
    return MOCK_SCORES.map(function (s) { return overrides[s.id] ? Object.assign({}, s, overrides[s.id]) : s; });
  }

  function saveScore(id, criterion, value) {
    var overrides = []; try { overrides = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) {}
    var existing = overrides.filter(function (o) { return o.id === id; })[0];
    if (!existing) { existing = { id: id }; overrides.push(existing); }
    existing[criterion] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  }

  function average(s) { return ((s.angles + s.colours + s.composition) / 3); }
  function avgClass(avg) { return avg < 2 ? 'low' : avg < 2.5 ? 'mid' : 'high'; }

  function starWidget(id, criterion, value) {
    var stars = '';
    for (var i = 1; i <= 3; i++) {
      stars += '<button type="button" class="' + (i <= value ? 'filled' : '') + '" data-set="' + id + '" data-criterion="' + criterion + '" data-value="' + i + '" aria-label="Set ' + criterion + ' to ' + i + '">' +
        '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9"/></svg></button>';
    }
    return '<span class="star-rating">' + stars + '</span>';
  }

  var searchInput = document.getElementById('search-input');
  var buFilter = document.getElementById('bu-filter');
  var sortSelect = document.getElementById('sort-select');
  var tbody = document.getElementById('scores-tbody');
  var resultCount = document.getElementById('result-count');

  function renderKpis(all) {
    var scored = all.length;
    var avgAll = scored ? all.reduce(function (sum, s) { return sum + average(s); }, 0) / scored : 0;
    document.getElementById('stat-average').textContent = avgAll.toFixed(1);
    document.getElementById('stat-scored').textContent = scored;
    document.getElementById('stat-attention').textContent = all.filter(function (s) { return average(s) < 2; }).length;
    document.getElementById('stat-strong').textContent = all.filter(function (s) { return average(s) >= 2.5; }).length;
  }

  function render() {
    var q = searchInput.value.trim().toLowerCase();
    var bu = buFilter.value;
    var sort = sortSelect.value;
    var all = loadAll();
    renderKpis(all.filter(function (s) { return !bu || s.bu === bu; }));

    var filtered = all.filter(function (s) {
      if (q && s.property.toLowerCase().indexOf(q) === -1) return false;
      if (bu && s.bu !== bu) return false;
      return true;
    });
    filtered.sort(function (a, b) { return sort === 'lowest' ? average(a) - average(b) : average(b) - average(a); });

    tbody.innerHTML = filtered.map(function (s) {
      var avg = average(s);
      return '<tr>' +
        '<td class="cell-strong">' + s.property + '<div class="cell-sub">' + s.bu + '</div></td>' +
        '<td><a href="../prop-025-photographer-evaluation/index.html?photographer=' + encodeURIComponent(s.photographer) + '">' + s.photographer + '</a></td>' +
        '<td>' + starWidget(s.id, 'angles', s.angles) + '</td>' +
        '<td>' + starWidget(s.id, 'colours', s.colours) + '</td>' +
        '<td>' + starWidget(s.id, 'composition', s.composition) + '</td>' +
        '<td><span class="avg-score ' + avgClass(avg) + '">' + avg.toFixed(1) + ' / 3</span></td>' +
        '<td class="cell-sub">' + s.assessedAt + '<br>' + s.assessedBy + '</td>' +
        '<td style="text-align:right;"><a class="btn btn-ghost btn-sm" href="../../photos/pho-002-photo-sets/index.html?set=' + s.id + '">View set</a></td>' +
        '</tr>';
    }).join('');

    resultCount.textContent = filtered.length + ' of ' + all.length + ' photo sets';
  }

  tbody.addEventListener('click', function (e) {
    var starBtn = e.target.closest('[data-set]');
    if (!starBtn) return;
    saveScore(starBtn.getAttribute('data-set'), starBtn.getAttribute('data-criterion'), parseInt(starBtn.getAttribute('data-value'), 10));
    MM.showToast('Score updated.');
    render();
  });

  searchInput.addEventListener('input', render);
  buFilter.addEventListener('change', render);
  sortSelect.addEventListener('change', render);
  render();
})();
