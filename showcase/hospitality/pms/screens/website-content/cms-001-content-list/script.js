(function () {
  'use strict';

  // Villa type / area lookups — not present on MM.MOCK_PROPERTIES, so this
  // screen's own script.js supplies them (per the module's shared data
  // conventions in AGENT_BRIEF.md). Area names line up with MM.CMS.DESTINATIONS
  // district names so the two stay consistent across the module.
  var VILLA_TYPE = {
    'PV-101': 'Cliffside Villa', 'PV-102': 'Beachfront Villa', 'PV-103': 'Pool Villa',
    'PV-104': 'Ridge Villa', 'PV-106': 'Garden Villa', 'PV-108': 'Grand Villa'
  };
  var VILLA_AREA = {
    'PV-101': 'Bang Tao', 'PV-102': 'Kata', 'PV-103': 'Ubud',
    'PV-104': 'Seminyak', 'PV-106': 'Bophut', 'PV-108': 'Seminyak'
  };

  var BU_KEY = 'mm_cms_bu_filter';

  function ownerName(villaId) {
    var owner = (MM.MOCK_OWNERS || []).filter(function (o) { return (o.properties || []).indexOf(villaId) !== -1; })[0];
    return owner ? owner.name : '—';
  }

  function contentFor(villaId) {
    return (MM.CMS && MM.CMS.VILLA_CONTENT && MM.CMS.VILLA_CONTENT[villaId]) || { status: 'draft', lang: [] };
  }

  function getVillas() {
    // "Open" villas only, per CMS-001's hard-coded status filter.
    return (MM.MOCK_PROPERTIES || []).filter(function (p) { return p.status === 'active'; });
  }

  var sortDir = 'asc';

  function render() {
    var search = document.getElementById('search-input').value.trim().toLowerCase();
    var bu = document.getElementById('bu-filter').value;
    var tbody = document.getElementById('villa-table-body');
    var emptyState = document.getElementById('empty-state');

    var rows = getVillas().filter(function (v) {
      if (bu && v.bu !== bu) return false;
      if (search && v.name.toLowerCase().indexOf(search) === -1) return false;
      return true;
    });

    // Default sort: Villa Type -> Area -> Villa Name (matches legacy order),
    // reversible via the Sort chip.
    rows.sort(function (a, b) {
      var ta = VILLA_TYPE[a.id] || '', tb = VILLA_TYPE[b.id] || '';
      var aa = VILLA_AREA[a.id] || '', ab = VILLA_AREA[b.id] || '';
      var key = (ta + aa + a.name).localeCompare(tb + ab + b.name);
      return sortDir === 'asc' ? key : -key;
    });

    tbody.innerHTML = '';
    rows.forEach(function (v) {
      var content = contentFor(v.id);
      var pct = content.status === 'published' ? 100 : (content.status === 'needs-review' ? 60 : (content.lang && content.lang.length ? 35 : 10));
      var fillClass = pct >= 80 ? '' : (pct >= 40 ? 'warn' : 'low');
      var tr = document.createElement('tr');
      tr.className = 'clickable';
      tr.innerHTML =
        '<td><div class="villa-name-cell"><span class="villa-thumb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg></span>' +
          '<div><div class="cell-strong">' + v.name + '</div><div class="cell-sub">' + v.id + ' &middot; ' + v.bedrooms + ' bed</div></div></div></td>' +
        '<td><span class="badge badge-success">Open</span></td>' +
        '<td>' + (VILLA_TYPE[v.id] || '—') + '</td>' +
        '<td>' + ownerName(v.id) + '</td>' +
        '<td>' + (VILLA_AREA[v.id] || '—') + '</td>' +
        '<td><div class="content-meter"><div class="content-meter__bar"><div class="content-meter__fill ' + fillClass + '" style="width:' + pct + '%"></div></div><span class="badge ' + (MM.CMS.STATUS_BADGE[content.status] || 'badge-neutral') + '">' + (MM.CMS.STATUS_LABEL[content.status] || content.status) + '</span></div></td>' +
        '<td class="row-actions"><a class="btn btn-outline btn-sm" href="../cms-002-villa-website-content/index.html?villa=' + v.id + '">Manage Content</a></td>';
      tr.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        window.location.href = '../cms-002-villa-website-content/index.html?villa=' + v.id;
      });
      tbody.appendChild(tr);
    });

    emptyState.style.display = rows.length ? 'none' : 'block';
    document.getElementById('pagination-count').textContent = 'Showing ' + rows.length + ' of ' + getVillas().length + ' villas';

    var all = getVillas();
    document.getElementById('stat-total').textContent = all.length;
    document.getElementById('stat-published').textContent = all.filter(function (v) { return contentFor(v.id).status === 'published'; }).length;
    document.getElementById('stat-review').textContent = all.filter(function (v) { return contentFor(v.id).status === 'needs-review'; }).length;
    document.getElementById('stat-draft').textContent = all.filter(function (v) { return contentFor(v.id).status === 'draft'; }).length;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var buFilter = document.getElementById('bu-filter');
    var savedBu = localStorage.getItem(BU_KEY);
    if (savedBu) buFilter.value = savedBu;

    document.getElementById('search-input').addEventListener('input', render);
    buFilter.addEventListener('change', function () {
      localStorage.setItem(BU_KEY, buFilter.value);
      render();
    });
    document.getElementById('sort-chip').addEventListener('click', function () {
      sortDir = sortDir === 'asc' ? 'desc' : 'asc';
      this.classList.toggle('active', sortDir === 'desc');
      render();
    });

    render();
  });
})();
