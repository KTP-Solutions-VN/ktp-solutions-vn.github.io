(function () {
  var LISTING = '../../../screens/san-pham-dich-vu/danh-sach-san-pham-dich-vu/index.html';
  var DETAIL = '../../../screens/san-pham-dich-vu/chi-tiet-san-pham-dich-vu/index.html';

  var CATEGORY_ICONS = {
    'Maternity Packages': '<path d="M12 21s-8-4.6-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.4-8 11-8 11z"/>',
    'Hospital Tours': '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h6M9 11h6M9 15h2"/>',
    'Confinement Nutrition': '<path d="M6 2v6a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V2M10 12v10M18 2v20M18 2c-2 0-3 1.5-3 3.5S16 9 18 9"/>',
    'Classes & Workshops': '<path d="M22 10L12 4 2 10l10 6 10-6z"/><path d="M6 12v5c0 1.6 2.7 3 6 3s6-1.4 6-3v-5"/>',
    'Bundles': '<path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5A2.5 2.5 0 1 1 10 4.5M12 7h4.5A2.5 2.5 0 1 0 14 4.5"/>',
    'Pharmacy & Wellness': '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    'Specialist Consultations': '<path d="M4.8 2.3A.3.3 0 1 0 5 2.3M18 15v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3M4 9V6a2 2 0 0 1 2-2h1M4 9h16M4 9v6a3 3 0 0 0 3 3M20 9V6a2 2 0 0 0-2-2h-1"/>',
    'Postnatal Wellness': '<path d="M12 3c-1.5 2-3 4-3 6a3 3 0 0 0 6 0c0-2-1.5-4-3-6z"/>',
    'Dental Care': '<path d="M12 5.5c-1.5-2-6-2.5-6 2 0 4 2 12 4.5 12 1.5 0 1.5-4 1.5-6 0 2 0 6 1.5 6C16 19.5 18 11.5 18 7.5c0-4.5-4.5-4-6-2z"/>'
  };

  function renderCategories() {
    var cats = [];
    DATA_SAN_PHAM_DICH_VU.forEach(function (p) { if (cats.indexOf(p.category) === -1) cats.push(p.category); });
    var grid = document.getElementById('category-grid');
    grid.innerHTML = cats.slice(0, 8).map(function (c) {
      var glyph = CATEGORY_ICONS[c] || CATEGORY_ICONS['Maternity Packages'];
      return '<a class="category-tile category-tile-link" href="' + LISTING + '?category=' + encodeURIComponent(c) + '">' +
        '<svg class="icon-lg" viewBox="0 0 24 24">' + glyph + '</svg>' +
        '<div style="font-weight:700;font-size:.85rem;margin-top:8px;color:var(--gray-800)">' + c + '</div>' +
        '</a>';
    }).join('');
  }

  /* ---- Carousel card renderer (Home-only — quick "Add to Cart" affordance,
     falls back to icon glyph when a product has no sourced photo) ---- */
  function carouselCardHTML(p) {
    var priceHTML = p.specialPrice
      ? '<span class="price-now">' + CJ.formatSGD(p.specialPrice) + '</span><span class="price-was">' + CJ.formatSGD(p.listPrice) + '</span>'
      : (p.listPrice > 0 ? '<span class="price-now">' + CJ.formatSGD(p.listPrice) + '</span>' : '<span class="price-now">Free</span>');
    var tagsHTML = (p.tags || []).map(function (t) {
      var cls = t === 'Best Seller' ? 'badge-sale' : (t === 'New' ? 'badge-info' : 'badge-success');
      return '<span class="badge ' + cls + '">' + t + '</span>';
    }).join('');
    if (p.isCombo) tagsHTML += '<span class="badge badge-neutral" style="background:rgba(255,255,255,.85)">Bundle</span>';
    var media = p.image
      ? '<img src="' + p.image + '" alt="' + (p.imageAlt || p.name) + '" loading="lazy">'
      : CJ.iconGlyph(p.icon);
    return (
      '<div class="carousel__card">' +
        '<a class="product-card" href="' + DETAIL + '?id=' + p.id + '">' +
          '<div class="product-card__media"><div class="product-card__tags">' + tagsHTML + '</div>' + media + '</div>' +
          '<div class="product-card__body">' +
            '<span class="product-card__cat">' + p.category + '</span>' +
            '<span class="product-card__title">' + p.name + '</span>' +
            '<span class="rating"><svg class="icon icon-sm" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ' + p.rating + ' (' + p.reviewCount + ')</span>' +
            '<div class="price-row">' + priceHTML + '</div>' +
          '</div>' +
        '</a>' +
        '<button class="carousel-add-btn" data-add-id="' + p.id + '" type="button"><svg class="icon icon-sm" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Add to Cart</button>' +
      '</div>'
    );
  }

  function renderCarousels() {
    document.querySelectorAll('[data-carousel-track][data-category]').forEach(function (track) {
      var cat = track.getAttribute('data-category');
      var items = DATA_SAN_PHAM_DICH_VU.filter(function (p) { return p.status === 'published' && p.category === cat; });
      // Best sellers first, then by rating, capped at 8 cards per row.
      items = items.slice().sort(function (a, b) {
        var aBest = a.tags.indexOf('Best Seller') > -1 ? 1 : 0;
        var bBest = b.tags.indexOf('Best Seller') > -1 ? 1 : 0;
        if (aBest !== bBest) return bBest - aBest;
        return b.rating - a.rating;
      }).slice(0, 8);
      track.innerHTML = items.map(carouselCardHTML).join('');
    });
  }

  /* ---- Carousel arrow scroll + fade-in prev arrow once scrolled ---- */
  function initCarouselArrows() {
    document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
      var track = carousel.querySelector('[data-carousel-track]');
      var prev = carousel.querySelector('[data-carousel-prev]');
      var next = carousel.querySelector('[data-carousel-next]');
      if (!track || !prev || !next) return;

      function update() {
        prev.classList.toggle('is-visible', track.scrollLeft > 8);
        var maxScroll = track.scrollWidth - track.clientWidth;
        next.classList.toggle('is-hidden', maxScroll <= 8 || track.scrollLeft >= maxScroll - 8);
      }
      function step(dir) {
        var card = track.querySelector('.carousel__card');
        var cardWidth = card ? card.getBoundingClientRect().width + 16 : 256;
        track.scrollBy({ left: dir * cardWidth * 2, behavior: 'smooth' });
      }
      prev.addEventListener('click', function () { step(-1); });
      next.addEventListener('click', function () { step(1); });
      track.addEventListener('scroll', update);
      window.addEventListener('resize', update);
      // Wait a tick for cards to render before computing initial arrow state.
      setTimeout(update, 50);
    });
  }

  /* ---- Quick "Add to Cart" from carousel cards (mirrors Item Details' add-to-cart field shape so the channel-grouped Shopping Cart groups it correctly) ---- */
  function initQuickAddToCart() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('[data-add-id]');
      if (!btn) return;
      e.preventDefault();
      var id = btn.getAttribute('data-add-id');
      var p = DATA_SAN_PHAM_DICH_VU.find(function (item) { return item.id === id; });
      if (!p) return;
      var cart = CJ.getCart();
      cart.push({
        lineId: 'CL-' + Date.now(),
        productId: p.id,
        name: p.name,
        variant: p.hasVariants && p.variants.length ? p.variants[0].label : '—',
        qty: 1,
        unitPrice: p.specialPrice || p.listPrice,
        purchaseSource: 'online',
        eventName: null,
        fulfillmentMethod: p.bookingRequired ? 'booking-confirmation' : 'delivery'
      });
      CJ.setCart(cart);
      btn.classList.add('is-added');
      var original = btn.innerHTML;
      btn.innerHTML = '<svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Added';
      CJ.toast('Added to cart — ' + p.name, 'success');
      setTimeout(function () { btn.classList.remove('is-added'); btn.innerHTML = original; }, 1600);
    });
  }

  /* ---- Journey band tabs (Event / Hospital Tour / Online / Retail) ---- */
  function initJourneyTabs() {
    var group = document.querySelector('[data-tab-group]');
    if (!group) return;
    var section = group.closest('section');
    group.querySelectorAll('.tab-item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        group.querySelectorAll('.tab-item').forEach(function (b) { b.classList.remove('is-active'); });
        section.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var panel = section.querySelector('[data-tab-panel="' + btn.getAttribute('data-tab') + '"]');
        if (panel) panel.classList.add('is-active');
      });
    });
  }

  /* ---- Reveal-on-scroll for every section except the hero ---- */
  function initRevealOnScroll() {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var items = document.querySelectorAll('[data-reveal]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- Stat band count-up (runs once, respects reduced motion) ---- */
  function initStatCountUp() {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var nodes = document.querySelectorAll('[data-count-to]');
    if (!nodes.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach(function (el) { el.textContent = el.getAttribute('data-count-to'); });
      return;
    }
    function animate(el) {
      var target = parseInt(el.getAttribute('data-count-to'), 10) || 0;
      var start = null;
      var duration = 900;
      function frame(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(frame);
        else el.textContent = target;
      }
      requestAnimationFrame(frame);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    nodes.forEach(function (el) { io.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderCategories();
    renderCarousels();
    initCarouselArrows();
    initQuickAddToCart();
    initJourneyTabs();
    initRevealOnScroll();
    initStatCountUp();
  });
})();
