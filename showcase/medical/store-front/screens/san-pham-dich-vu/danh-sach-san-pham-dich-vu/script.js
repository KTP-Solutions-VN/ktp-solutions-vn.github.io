(function () {
  var DETAIL = '../../../screens/san-pham-dich-vu/chi-tiet-san-pham-dich-vu/index.html';

  var state = { q: '', category: 'all', sort: 'recommended', bestsellerOnly: false, comboOnly: false, specialOnly: false };

  function qs(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function renderCategoryChips() {
    var cats = [];
    DATA_SAN_PHAM_DICH_VU.forEach(function (p) { if (cats.indexOf(p.category) === -1) cats.push(p.category); });
    var wrap = document.getElementById('category-chips');
    var html = '<button class="chip' + (state.category === 'all' ? ' is-active' : '') + '" data-cat="all">All Categories</button>';
    html += cats.map(function (c) {
      return '<button class="chip' + (state.category === c ? ' is-active' : '') + '" data-cat="' + c + '">' + c + '</button>';
    }).join('');
    wrap.innerHTML = html;
    wrap.querySelectorAll('[data-cat]').forEach(function (btn) {
      btn.addEventListener('click', function () { state.category = btn.getAttribute('data-cat'); render(); });
    });
  }

  function applyFilters() {
    var list = DATA_SAN_PHAM_DICH_VU.filter(function (p) { return p.status === 'published'; });
    if (state.category !== 'all') list = list.filter(function (p) { return p.category === state.category; });
    if (state.q) {
      var q = state.q.toLowerCase();
      list = list.filter(function (p) { return p.name.toLowerCase().indexOf(q) > -1 || p.category.toLowerCase().indexOf(q) > -1; });
    }
    if (state.bestsellerOnly) list = list.filter(function (p) { return p.tags.indexOf('Best Seller') > -1; });
    if (state.comboOnly) list = list.filter(function (p) { return p.isCombo; });
    if (state.specialOnly) list = list.filter(function (p) { return p.specialPrice !== null; });

    if (state.sort === 'price-asc') list = list.slice().sort(function (a, b) { return (a.specialPrice || a.listPrice) - (b.specialPrice || b.listPrice); });
    else if (state.sort === 'price-desc') list = list.slice().sort(function (a, b) { return (b.specialPrice || b.listPrice) - (a.specialPrice || a.listPrice); });
    else if (state.sort === 'rating') list = list.slice().sort(function (a, b) { return b.rating - a.rating; });
    return list;
  }

  function render() {
    renderCategoryChips();
    var list = applyFilters();
    document.getElementById('result-count').textContent = list.length + ' item(s) found' + (state.category !== 'all' ? ' in "' + state.category + '"' : '');
    var grid = document.getElementById('product-grid');
    var empty = document.getElementById('empty-state');
    if (!list.length) {
      grid.style.display = 'none';
      empty.style.display = 'block';
      empty.innerHTML = '<div class="empty-state"><svg class="icon-lg" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><h3>No matching products or services</h3><p>Try clearing filters or searching a different term.</p></div>';
      return;
    }
    grid.style.display = '';
    empty.style.display = 'none';
    grid.innerHTML = list.map(function (p) { return CJ.productCardHTML(p, DETAIL); }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var initialCat = qs('category');
    var initialQ = qs('q');
    if (initialCat) state.category = initialCat;
    if (initialQ) { state.q = initialQ; document.getElementById('filter-search').value = initialQ; }

    document.getElementById('filter-search').addEventListener('input', function (e) { state.q = e.target.value; render(); });
    document.getElementById('filter-sort').addEventListener('change', function (e) { state.sort = e.target.value; render(); });
    document.getElementById('chip-bestseller').addEventListener('click', function () {
      state.bestsellerOnly = !state.bestsellerOnly;
      document.getElementById('chip-bestseller').classList.toggle('is-active', state.bestsellerOnly);
      render();
    });
    document.getElementById('chip-combo').addEventListener('click', function () {
      state.comboOnly = !state.comboOnly;
      document.getElementById('chip-combo').classList.toggle('is-active', state.comboOnly);
      render();
    });
    document.getElementById('chip-special').addEventListener('click', function () {
      state.specialOnly = !state.specialOnly;
      document.getElementById('chip-special').classList.toggle('is-active', state.specialOnly);
      render();
    });
    render();
  });
})();
