/* ==========================================================================
   KTP Solutions — shared chrome behavior (header scroll, reveal, i18n, etc.)
   Loaded on every page BEFORE each screen's own script.js
   ========================================================================== */

/* ---- Helper dùng chung cho script của từng trang (khai báo ngoài IIFE để gọi được ngay khi nạp) ----
   KTP.en(text)        → thuộc tính data-en="…" (chữ tiếng Anh cho nút VI/EN), rỗng nếu không có bản dịch
   KTP.domainIcon(slug) → icon SVG theo lĩnh vực dự án (hospitality / industrial / healthcare)
   KTP.domainBadge(da)  → badge lĩnh vực có icon, chữ song ngữ (da: 1 phần tử DATA_DU_AN) */
var KTP = (function () {
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); };
  var ICONS = {
    hospitality: '<path d="M2 20V6"/><path d="M2 13h20v7"/><path d="M22 13v-1a3 3 0 0 0-3-3h-8v4"/><circle cx="6.5" cy="10" r="2"/>',
    industrial: '<path d="M2 20h20"/><path d="M4 20V10l5 3v-3l5 3V5h4v15"/><path d="M8 17h1M12 17h1"/>',
    healthcare: '<path d="M20.4 4.6a5.4 5.4 0 0 0-7.6 0L12 5.4l-.8-.8a5.4 5.4 0 0 0-7.6 7.6L12 20.6l8.4-8.4a5.4 5.4 0 0 0 0-7.6z"/><path d="M3.5 12h4l1.5-2.5 3 5 1.5-2.5h7"/>'
  };
  function en(text) { return text ? ' data-en="' + esc(text) + '"' : ''; }
  function domainIcon(slug) {
    return ICONS[slug] ? '<svg class="domain-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[slug] + '</svg>' : '';
  }
  function domainBadge(da, extraStyle) {
    return '<span class="badge badge-accent badge-domain"' + (extraStyle ? ' style="' + extraStyle + '"' : '') + '>' + domainIcon(da.linh_vuc) + '<span' + en(da.nganh_en) + '>' + da.nganh + '</span></span>';
  }
  return { en: en, domainIcon: domainIcon, domainBadge: domainBadge };
})();

(function () {
  'use strict';

  /* ---- Sticky header: transparent -> solid on scroll ---- */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var solidFromStart = header.dataset.solid === 'true';
    function update() {
      if (solidFromStart || window.scrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ---- Mobile nav drawer ---- */
  function initMobileNav() {
    var burger = document.querySelector('.site-header__burger');
    var drawer = document.querySelector('.mobile-nav');
    var closeBtn = document.querySelector('.mobile-nav__close');
    if (!burger || !drawer) return;
    burger.addEventListener('click', function () { drawer.classList.add('is-open'); });
    if (closeBtn) closeBtn.addEventListener('click', function () { drawer.classList.remove('is-open'); });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { drawer.classList.remove('is-open'); });
    });
  }

  /* ---- Scroll-reveal via IntersectionObserver (motivated: guides reading order) ---- */
  function initScrollReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Count-up for stat numbers (runs once when entering viewport) ---- */
  function initCountUp() {
    var els = document.querySelectorAll('[data-countup]');
    if (!els.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.dataset.countup, 10) || 0;
        var suffix = el.dataset.suffix || '';
        var duration = 1400;
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          el.textContent = target + suffix;
        } else {
          requestAnimationFrame(step);
        }
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Accordion (FAQ) ---- */
  function initAccordion() {
    document.querySelectorAll('.accordion-trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.accordion-item');
        item.classList.toggle('is-open');
      });
    });
  }

  /* ---- Tabs (service detail pages) ---- */
  function initTabs() {
    document.querySelectorAll('.tabs').forEach(function (tabGroup) {
      var tabs = tabGroup.querySelectorAll('.tab');
      var panels = document.querySelectorAll('[data-tab-panel][data-tab-group="' + tabGroup.dataset.tabGroup + '"]');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t) { t.classList.remove('is-active'); });
          tab.classList.add('is-active');
          panels.forEach(function (p) { p.hidden = p.dataset.tabPanel !== tab.dataset.tab; });
        });
      });
    });
  }

  /* ---- Simple VI/EN toggle for elements carrying data-en ---- */
  function initLangToggle() {
    var toggle = document.querySelector('.lang-toggle');
    if (!toggle) return;
    var buttons = toggle.querySelectorAll('button');
    var stored = 'vi';
    try { stored = localStorage.getItem('ktp_lang') || 'vi'; } catch (e) {}

    function apply(lang) {
      document.documentElement.setAttribute('data-lang', lang);
      document.querySelectorAll('[data-en]').forEach(function (el) {
        if (!el.dataset.vi) el.dataset.vi = el.innerHTML;
        el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.vi;
      });
      buttons.forEach(function (b) { b.classList.toggle('is-active', b.dataset.lang === lang); });
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var lang = b.dataset.lang;
        try { localStorage.setItem('ktp_lang', lang); } catch (e) {}
        apply(lang);
      });
    });

    apply(stored);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeaderScroll();
    initMobileNav();
    initScrollReveal();
    initCountUp();
    initAccordion();
    initTabs();
    initLangToggle();
  });
})();
