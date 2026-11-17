/* ==========================================================================
   CareJourney — Storefront shared chrome behavior
   Loaded on every screen before the screen's own script.js
   ========================================================================== */

(function () {
  'use strict';

  window.CJ = window.CJ || {};

  /* ---- Currency / formatting helpers ---- */
  CJ.formatSGD = function (amount) {
    var n = Number(amount) || 0;
    return 'S$' + n.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  CJ.formatDate = function (isoStr) {
    var d = new Date(isoStr);
    if (isNaN(d)) return isoStr;
    return d.toLocaleDateString('en-SG', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  CJ.initials = function (name) {
    if (!name) return '?';
    var parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
  };

  /* ---- localStorage helpers (demo persistence) ---- */
  CJ.storage = {
    get: function (key, fallback) {
      try {
        var raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
    },
    remove: function (key) { try { localStorage.removeItem(key); } catch (e) {} }
  };

  var LS_CART = 'tj_cart_items';
  var LS_AUTH = 'tj_auth_customer';

  CJ.getCart = function () { return CJ.storage.get(LS_CART, []); };
  CJ.setCart = function (items) { CJ.storage.set(LS_CART, items); CJ.updateCartBadge(); };
  CJ.cartCount = function () {
    return CJ.getCart().reduce(function (sum, i) { return sum + (i.qty || 1); }, 0);
  };
  CJ.updateCartBadge = function () {
    var els = document.querySelectorAll('[data-cart-badge]');
    var count = CJ.cartCount();
    els.forEach(function (el) {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  };

  /* ---- Simulated auth (default: logged-in demo customer "Grace Lim") ---- */
  CJ.getAuth = function () {
    return CJ.storage.get(LS_AUTH, { loggedIn: true, customerId: 'CUS-1001', name: 'Grace Lim Wei Ting' });
  };
  CJ.setAuth = function (auth) { CJ.storage.set(LS_AUTH, auth); };
  CJ.logout = function () {
    CJ.setAuth({ loggedIn: false });
    window.location.href = CJ.rootPath() + 'screens/khach-hang/dang-nhap-dang-ky/index.html';
  };

  /* Resolve relative depth to project root based on <body data-root="../../..">, default 2 levels for screens */
  CJ.rootPath = function () {
    var body = document.body;
    return (body && body.getAttribute('data-root')) || '../../../';
  };

  /* ---- Shared product card renderer (Home, Product Listing) ---- */
  CJ.productCardHTML = function (p, listingHref) {
    var priceHTML = p.specialPrice
      ? '<span class="price-now">' + CJ.formatSGD(p.specialPrice) + '</span><span class="price-was">' + CJ.formatSGD(p.listPrice) + '</span>'
      : (p.listPrice > 0 ? '<span class="price-now">' + CJ.formatSGD(p.listPrice) + '</span>' : '<span class="price-now">Free</span>');
    var tagsHTML = (p.tags || []).map(function (t) {
      var cls = t === 'Best Seller' ? 'badge-sale' : (t === 'New' ? 'badge-info' : 'badge-success');
      return '<span class="badge ' + cls + '">' + t + '</span>';
    }).join('');
    if (p.isCombo) tagsHTML += '<span class="badge badge-neutral" style="background:rgba(255,255,255,.85)">Bundle</span>';
    var href = (listingHref || 'chi-tiet-san-pham-dich-vu') + '?id=' + p.id;
    return (
      '<a class="product-card" href="' + href + '">' +
        '<div class="product-card__media"><div class="product-card__tags">' + tagsHTML + '</div>' + CJ.iconGlyph(p.icon) + '</div>' +
        '<div class="product-card__body">' +
          '<span class="product-card__cat">' + p.category + '</span>' +
          '<span class="product-card__title">' + p.name + '</span>' +
          '<span class="rating"><svg class="icon icon-sm" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ' + p.rating + ' (' + p.reviewCount + ')</span>' +
          '<div class="price-row">' + priceHTML + '</div>' +
        '</div>' +
      '</a>'
    );
  };
  CJ.iconGlyph = function () {
    return '<svg class="icon icon-lg" viewBox="0 0 24 24"><path d="M12 21s-8-4.6-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.4-8 11-8 11z"/></svg>';
  };

  /* ---- Toast ---- */
  CJ.toast = function (message, type) {
    var region = document.getElementById('toast-region');
    if (!region) {
      region = document.createElement('div');
      region.id = 'toast-region';
      document.body.appendChild(region);
    }
    var el = document.createElement('div');
    el.className = 'toast' + (type ? ' toast-' + type : '');
    el.textContent = message;
    region.appendChild(el);
    setTimeout(function () {
      el.style.opacity = '0';
      el.style.transition = 'opacity 200ms ease';
      setTimeout(function () { el.remove(); }, 220);
    }, 2600);
  };

  /* ---- Header chrome: mobile drawer, account dropdown, cart badge, active link ---- */
  function initHeaderChrome() {
    var hamburger = document.querySelector('[data-hamburger]');
    var drawer = document.querySelector('[data-mobile-drawer]');
    var overlay = document.querySelector('[data-mobile-drawer-overlay]');
    var drawerClose = document.querySelector('[data-mobile-drawer-close]');

    function openDrawer() {
      if (drawer) drawer.classList.add('is-open');
      if (overlay) overlay.classList.add('is-open');
    }
    function closeDrawer() {
      if (drawer) drawer.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-open');
    }
    if (hamburger) hamburger.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    var accountTrigger = document.querySelector('[data-account-trigger]');
    var accountDropdown = document.querySelector('[data-account-dropdown]');
    if (accountTrigger && accountDropdown) {
      accountTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        accountDropdown.classList.toggle('is-open');
      });
      document.addEventListener('click', function (e) {
        if (!accountDropdown.contains(e.target) && !accountTrigger.contains(e.target)) {
          accountDropdown.classList.remove('is-open');
        }
      });
    }

    var logoutBtns = document.querySelectorAll('[data-logout]');
    logoutBtns.forEach(function (btn) { btn.addEventListener('click', function (e) { e.preventDefault(); CJ.logout(); }); });

    CJ.updateCartBadge();

    /* Populate account name/initials/avatar wherever present */
    var auth = CJ.getAuth();
    document.querySelectorAll('[data-account-name]').forEach(function (el) { el.textContent = auth.name || 'Guest'; });
    document.querySelectorAll('[data-account-initials]').forEach(function (el) { el.textContent = CJ.initials(auth.name); });

    var loggedOutEls = document.querySelectorAll('[data-when-logged-out]');
    var loggedInEls = document.querySelectorAll('[data-when-logged-in]');
    loggedOutEls.forEach(function (el) { el.style.display = auth.loggedIn ? 'none' : ''; });
    loggedInEls.forEach(function (el) { el.style.display = auth.loggedIn ? '' : 'none'; });
  }

  /* ---- Search redirect (Home + header search -> Product Listing with query) ---- */
  function initSearchRedirect() {
    document.querySelectorAll('[data-search-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input');
        var q = input ? input.value.trim() : '';
        var target = form.getAttribute('data-search-target') || '';
        window.location.href = target + (q ? ('?q=' + encodeURIComponent(q)) : '');
      });
    });
  }

  /* ---- Demo reset ---- */
  function initDemoReset() {
    document.querySelectorAll('[data-demo-reset]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        ['tj_cart_items', 'tj_orders_extra', 'tj_loyalty_extra', 'tj_contact_prefs', 'tj_profile_overrides'].forEach(CJ.storage.remove);
        CJ.toast('Demo data reset.', 'success');
        setTimeout(function () { window.location.reload(); }, 500);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeaderChrome();
    initSearchRedirect();
    initDemoReset();
  });
})();
