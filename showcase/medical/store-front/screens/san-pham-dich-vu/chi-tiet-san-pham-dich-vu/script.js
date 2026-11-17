(function () {
  var SLOT_URL = '../../../screens/san-pham-dich-vu/chon-lich-slot-dich-vu/index.html';
  var CART_URL = '../../../screens/gio-hang/gio-hang/index.html';
  var LISTING = '../../../screens/san-pham-dich-vu/danh-sach-san-pham-dich-vu/index.html';
  var DETAIL = '../../../screens/san-pham-dich-vu/chi-tiet-san-pham-dich-vu/index.html';

  var SOURCE_OPTIONS = [
    { key: 'online', label: 'Online (at home)', fulfillment: 'delivery' },
    { key: 'hospital-tour', label: 'During Hospital Tour', fulfillment: 'self-collection' },
    { key: 'event', label: 'At Event: Baby Expo 2026', fulfillment: 'self-collection', eventName: 'Baby Expo 2026' }
  ];

  function qs(name) { return new URLSearchParams(window.location.search).get(name); }
  function getProduct() {
    var id = qs('id') || DATA_SAN_PHAM_DICH_VU[0].id;
    return DATA_SAN_PHAM_DICH_VU.find(function (p) { return p.id === id; }) || DATA_SAN_PHAM_DICH_VU[0];
  }

  var selectedVariant = null;
  var selectedSource = SOURCE_OPTIONS[0];

  function priceBlockHTML(p) {
    return p.specialPrice
      ? '<span class="price-now" style="font-size:1.6rem;">' + CJ.formatSGD(p.specialPrice) + '</span><span class="price-was" style="font-size:1rem;">' + CJ.formatSGD(p.listPrice) + '</span><span class="badge badge-sale">Special Price</span>'
      : (p.listPrice > 0 ? '<span class="price-now" style="font-size:1.6rem;">' + CJ.formatSGD(p.listPrice) + '</span>' : '<span class="price-now" style="font-size:1.6rem;">Free</span>');
  }

  function render() {
    var p = getProduct();
    document.title = p.name + ' — CareJourney';
    document.getElementById('breadcrumb-name').textContent = p.name;
    selectedVariant = p.hasVariants ? (p.variants.find(function (v) { return v.stock > 0; }) || p.variants[0]) : null;

    var tagsHTML = p.tags.map(function (t) { return '<span class="badge badge-sale">' + t + '</span>'; }).join(' ');
    if (p.isCombo) tagsHTML += ' <span class="badge badge-info">Fixed-SKU Bundle</span>';

    var variantHTML = '';
    if (p.hasVariants) {
      variantHTML = '<div class="form-group"><label>' + (p.bookingRequired ? 'Select option' : 'Select variant') + '</label><div class="source-pill-row" id="variant-pills">' +
        p.variants.map(function (v) {
          var disabled = v.stock === 0;
          return '<button type="button" class="option-pill' + (disabled ? ' is-disabled' : '') + '" data-variant="' + v.id + '" ' + (disabled ? 'disabled' : '') + '>' + v.label + (disabled ? ' (Out of stock)' : '') + '</button>';
        }).join('') + '</div></div>';
    }

    var comboHTML = '';
    if (p.isCombo) {
      comboHTML = '<div class="card card-flat" style="background:var(--primary-50);border:1px solid var(--primary-100);"><h3 style="margin-top:0;font-size:1rem;">What\'s included in this bundle</h3>' +
        p.comboItems.map(function (c) { return '<div class="combo-item"><svg class="icon icon-sm" viewBox="0 0 24 24" style="color:var(--accent);"><path d="M20 6L9 17l-5-5"/></svg><div><strong style="font-size:.875rem;">' + c.name + '</strong><div class="text-sm text-muted">' + c.note + '</div></div></div>'; }).join('') +
        '</div>';
    }

    var sourceHTML = '<div class="form-group"><label>Purchase context <span class="text-muted" style="font-weight:400;">(demo: simulates where this purchase happens — drives cart channel grouping)</span></label><div class="source-pill-row" id="source-pills">' +
      SOURCE_OPTIONS.map(function (s, i) {
        return '<button type="button" class="option-pill' + (i === 0 ? ' is-selected' : '') + '" data-source="' + s.key + '">' + s.label + '</button>';
      }).join('') + '</div></div>';

    var ctaHTML = p.bookingRequired
      ? '<button class="btn btn-primary btn-lg btn-block" id="btn-choose-slot"><svg class="icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Choose a Date & Time</button>'
      : '<button class="btn btn-primary btn-lg btn-block" id="btn-add-cart"><svg class="icon icon-sm" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Add to Cart</button>';

    document.getElementById('pdp-root').innerHTML =
      '<div class="pdp-media"><svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1"><path d="M12 21s-8-4.6-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.4-8 11-8 11z"/></svg></div>' +
      '<div>' +
        '<span class="product-card__cat">' + p.category + ' · ' + p.businessUnit + '</span>' +
        '<h1 style="margin-top:4px;">' + p.name + '</h1>' +
        '<div class="flex-gap-2 mb-3">' + tagsHTML + '<span class="rating"><svg class="icon icon-sm" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' + p.rating + ' (' + p.reviewCount + ' reviews)</span></div>' +
        '<div class="flex-gap-2 mb-4">' + priceBlockHTML(p) + '</div>' +
        '<p>' + p.description + '</p>' +
        comboHTML +
        '<div class="mt-4">' + variantHTML + sourceHTML + '</div>' +
        '<div id="stock-warning" class="field-error" style="margin-bottom:var(--sp-3);"><svg class="icon icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>This option is currently out of stock — choose another variant.</div>' +
        ctaHTML +
      '</div>';

    wireInteractions(p);
    renderRelated(p);
  }

  function wireInteractions(p) {
    document.querySelectorAll('#variant-pills [data-variant]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.disabled) return;
        document.querySelectorAll('#variant-pills [data-variant]').forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected');
        selectedVariant = p.variants.find(function (v) { return v.id === btn.getAttribute('data-variant'); });
        document.getElementById('stock-warning').classList.remove('is-visible');
      });
    });
    document.querySelectorAll('#source-pills [data-source]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('#source-pills [data-source]').forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected');
        selectedSource = SOURCE_OPTIONS.find(function (s) { return s.key === btn.getAttribute('data-source'); });
      });
    });

    var slotBtn = document.getElementById('btn-choose-slot');
    if (slotBtn) slotBtn.addEventListener('click', function () {
      if (p.hasVariants && selectedVariant && selectedVariant.stock === 0) { document.getElementById('stock-warning').classList.add('is-visible'); return; }
      CJ.storage.set('tj_pending_selection', { productId: p.id, variant: selectedVariant ? selectedVariant.label : null, source: selectedSource });
      window.location.href = SLOT_URL + '?productId=' + p.id;
    });

    var cartBtn = document.getElementById('btn-add-cart');
    if (cartBtn) cartBtn.addEventListener('click', function () {
      if (p.hasVariants && selectedVariant && selectedVariant.stock === 0) { document.getElementById('stock-warning').classList.add('is-visible'); return; }
      var originalLabel = cartBtn.innerHTML;
      cartBtn.disabled = true;
      cartBtn.innerHTML = 'Adding…';
      setTimeout(function () {
        var cart = CJ.getCart();
        cart.push({
          lineId: 'CL-' + Date.now(),
          productId: p.id,
          name: p.name,
          variant: selectedVariant ? selectedVariant.label : '—',
          qty: 1,
          unitPrice: p.specialPrice || p.listPrice,
          purchaseSource: selectedSource.key,
          eventName: selectedSource.eventName || null,
          fulfillmentMethod: selectedSource.fulfillment
        });
        CJ.setCart(cart);
        cartBtn.disabled = false;
        cartBtn.innerHTML = originalLabel;
        CJ.toast('Added to cart — ' + p.name, 'success');
      }, 500);
    });
  }

  function renderRelated(p) {
    var related = DATA_SAN_PHAM_DICH_VU.filter(function (x) { return x.id !== p.id && x.status === 'published' && x.category === p.category; });
    if (related.length < 3) {
      DATA_SAN_PHAM_DICH_VU.forEach(function (x) { if (related.length < 3 && x.id !== p.id && x.status === 'published' && related.indexOf(x) === -1) related.push(x); });
    }
    document.getElementById('related-grid').innerHTML = related.slice(0, 3).map(function (x) { return CJ.productCardHTML(x, DETAIL); }).join('');
  }

  document.addEventListener('DOMContentLoaded', render);
})();
