document.addEventListener('DOMContentLoaded', function () {
  var state = { villaId: null, seasonId: null };

  function populateFilters() {
    var buSel = document.getElementById('filter-bu');
    BOOK.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu.name; o.textContent = bu.name; buSel.appendChild(o); });
    buSel.value = BOOK.VILLAS[0].bu;
    populateVillas(buSel.value);
    buSel.addEventListener('change', function () { populateVillas(buSel.value); setVilla(document.getElementById('filter-villa').value); });
    document.getElementById('filter-villa').addEventListener('change', function (e) { setVilla(e.target.value); });
  }
  function populateVillas(buName) {
    var sel = document.getElementById('filter-villa');
    sel.innerHTML = '';
    BOOK.VILLAS.filter(function (v) { return v.bu === buName; }).forEach(function (v) {
      var o = document.createElement('option'); o.value = v.id; o.textContent = v.name; sel.appendChild(o);
    });
    if (sel.options.length) setVilla(sel.value);
  }
  function setVilla(villaId) {
    state.villaId = villaId;
    state.seasonId = null;
    document.getElementById('mode-revenue').hidden = true;
    document.getElementById('mode-reconcile').hidden = false;
    renderReconcile();
  }

  function commentLogKey() { return 'mm_rate_comments_' + state.villaId; }
  function getComments() {
    try { return JSON.parse(localStorage.getItem(commentLogKey()) || '[]'); } catch (e) { return []; }
  }
  function addComment(text) {
    var list = getComments();
    list.unshift({ date: new Date().toISOString().slice(0, 10), text: text, by: 'Somchai Anuwat' });
    localStorage.setItem(commentLogKey(), JSON.stringify(list));
  }

  function renderReconcile() {
    var seasons = BOOK.ratedSeasonsForVilla(state.villaId);
    var data = BOOK.SEASON_PRICE_DATA[state.villaId] || { discrepancy: false };
    document.getElementById('mode1a-card').hidden = !!data.discrepancy;
    document.getElementById('mode1b-card').hidden = !data.discrepancy;

    if (!data.discrepancy) {
      var head = document.getElementById('price-log-head');
      head.innerHTML = '<th>Date</th>' + seasons.map(function (s) {
        return '<th><span class="season-name-chip"><span class="season-name-chip__dot" style="background:' + BOOK.seasonColor(s.name) + '"></span>' + s.name + '</span></th>';
      }).join('') + '<th></th>';

      var rows = BOOK.getDailyPriceLog(state.villaId);
      var tbody = document.getElementById('price-log-rows');
      tbody.innerHTML = rows.map(function (row, i) {
        var cells = seasons.map(function (s) {
          var change = row.change[s.id];
          var marker = change === 'up' ? '<span class="trend-up">&#9650;</span>' : change === 'down' ? '<span class="trend-down">&#9660;</span>' : change === 'flat' ? '<span class="trend-flat">=</span>' : '';
          return '<td class="rate-value-cell">' + BOOK.fmtMoney(row.prices[s.id]) + ' ' + marker + '</td>';
        }).join('');
        var actionCell = i === 0
          ? '<td><div class="price-cell-actions">' +
              '<button data-view-season title="Season Revenue"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>' +
              '<button data-validate title="Validate"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="20 6 9 17 4 12"/></svg></button>' +
              '<button data-comment title="Comment"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button>' +
            '</div></td>'
          : '<td></td>';
        return '<tr data-row-idx="' + i + '"><td class="cell-strong">' + BOOK.fmtDate(row.date) + (i === 0 ? ' <span class="badge badge-neutral">Today</span>' : '') + '</td>' + cells + actionCell + '</tr>';
      }).join('');

      var firstRowSeason = seasons[0];
      tbody.querySelectorAll('[data-view-season]').forEach(function (btn) {
        btn.addEventListener('click', function () { if (firstRowSeason) openRevenue(firstRowSeason.id); });
      });
      tbody.querySelectorAll('[data-validate]').forEach(function (btn) {
        btn.addEventListener('click', function () { MM.showToast('Today’s price validated.'); });
      });
      tbody.querySelectorAll('[data-comment]').forEach(function (btn) {
        btn.addEventListener('click', function () { window.MM.openModal('modal-comment'); });
      });

      renderComments();
    } else {
      var rhead = document.getElementById('recon-head');
      rhead.innerHTML = '<th>Source</th>' + seasons.map(function (s) {
        return '<th class="season-col"><span class="season-name-chip"><span class="season-name-chip__dot" style="background:' + BOOK.seasonColor(s.name) + '"></span>' + s.name + '</span></th>';
      }).join('');
      var comparison = data.comparison || {};
      var rrows = document.getElementById('recon-rows');
      ['VM', 'Beds24'].forEach(function () {});
      function cellFor(source, s) {
        var pair = comparison[s.id];
        if (!pair) return '<td class="season-col">—</td>';
        var val = source === 'VM' ? pair.vm : pair.beds24;
        var mismatch = typeof val === 'string';
        return '<td class="season-col ' + (mismatch ? 'mismatch' : 'ok') + '">' + (typeof val === 'number' ? BOOK.fmtMoney(val) : val) + '</td>';
      }
      rrows.innerHTML =
        '<tr><td class="recon-source-badge">VM</td>' + seasons.map(function (s) { return cellFor('VM', s); }).join('') + '</tr>' +
        '<tr><td class="recon-source-badge">Beds24</td>' + seasons.map(function (s) { return cellFor('Beds24', s); }).join('') + '</tr>';
    }
  }

  function renderComments() {
    var wrap = document.getElementById('comment-log-wrap');
    var tbody = document.getElementById('comment-log-rows');
    var list = getComments();
    tbody.innerHTML = list.length ? list.map(function (c) {
      return '<tr><td>' + BOOK.fmtDate(c.date) + '</td><td>' + c.text + '</td><td>' + c.by + '</td></tr>';
    }).join('') : '<tr><td colspan="3" class="text-sm text-muted">No comments logged yet.</td></tr>';
  }

  document.getElementById('btn-show-logs').addEventListener('click', function () {
    var wrap = document.getElementById('comment-log-wrap');
    wrap.hidden = !wrap.hidden;
    this.textContent = wrap.hidden ? 'Show Logs' : 'Hide Logs';
  });

  document.getElementById('btn-save-comment').addEventListener('click', function () {
    var text = document.getElementById('comment-text').value.trim();
    if (!text) { MM.showToast('Enter a comment first.', { danger: true }); return; }
    addComment(text);
    document.getElementById('comment-text').value = '';
    window.MM.closeModal('modal-comment');
    MM.showToast('Comment saved.');
    renderComments();
  });

  /* Mode 2 — Season Revenue */
  function openRevenue(seasonId) {
    state.seasonId = seasonId;
    document.getElementById('mode-reconcile').hidden = true;
    document.getElementById('mode-revenue').hidden = false;
    renderRevenue();
  }
  function seasonIndex() {
    var seasons = BOOK.ratedSeasonsForVilla(state.villaId);
    var idx = -1;
    seasons.forEach(function (s, i) { if (s.id === state.seasonId) idx = i; });
    return { seasons: seasons, idx: idx };
  }
  function sparkline(svgId, values) {
    var svg = document.getElementById(svgId);
    var w = 300, h = 90, pad = 6;
    var min = Math.min.apply(null, values), max = Math.max.apply(null, values);
    var range = (max - min) || 1;
    var step = (w - pad * 2) / (values.length - 1 || 1);
    var pts = values.map(function (v, i) {
      var x = pad + i * step;
      var y = h - pad - ((v - min) / range) * (h - pad * 2);
      return x + ',' + y;
    }).join(' ');
    svg.innerHTML = '<polyline points="' + pts + '" fill="none" stroke="var(--color-primary-dark, #00084A)" stroke-width="2"/>' +
      values.map(function (v, i) {
        var x = pad + i * step;
        var y = h - pad - ((v - min) / range) * (h - pad * 2);
        return '<circle cx="' + x + '" cy="' + y + '" r="2.5" fill="#4C5FFF"/>';
      }).join('');
  }

  function renderRevenue() {
    var info = seasonIndex();
    var season = info.seasons[info.idx];
    if (!season) return;
    document.getElementById('revenue-season-title').textContent = season.name + ' — ' + BOOK.fmtDate(season.start) + ' to ' + BOOK.fmtDate(season.end);
    document.getElementById('btn-prev-season').disabled = info.idx <= 0;
    document.getElementById('btn-next-season').disabled = info.idx >= info.seasons.length - 1;

    var kpi = BOOK.getSeasonRevenueKpi(state.villaId, season.id);
    function trio(containerId, group, suffix, isMoney) {
      var el = document.getElementById(containerId);
      var labels = [['Last Year', group.last], ['Current', group.current], ['Future', group.future]];
      el.innerHTML = labels.map(function (pair) {
        var val = isMoney ? BOOK.fmtMoney(pair[1]) : (pair[1] + suffix);
        return '<div class="kpi-trio-card"><div class="kpi-trio-card__label">' + pair[0] + '</div><div class="kpi-trio-card__value">' + val + '</div></div>';
      }).join('');
    }
    trio('kpi-occupancy', kpi.occupancy, '%', false);
    trio('kpi-price', kpi.price, '', true);
    trio('kpi-revenue', kpi.revenue, '%', false);
    trio('kpi-advance', kpi.advance, ' days', false);

    var charts = BOOK.getSeasonCharts(state.villaId, season.id);
    sparkline('chart-occupancy', charts.occupancy);
    sparkline('chart-price', charts.priceHistory);
    sparkline('chart-avg-year', charts.avgPriceByYear.values);
  }

  document.getElementById('btn-prev-season').addEventListener('click', function () {
    var info = seasonIndex();
    if (info.idx > 0) { state.seasonId = info.seasons[info.idx - 1].id; renderRevenue(); }
  });
  document.getElementById('btn-next-season').addEventListener('click', function () {
    var info = seasonIndex();
    if (info.idx < info.seasons.length - 1) { state.seasonId = info.seasons[info.idx + 1].id; renderRevenue(); }
  });
  document.getElementById('btn-back-reconcile').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('mode-revenue').hidden = true;
    document.getElementById('mode-reconcile').hidden = false;
  });

  populateFilters();
});
