/* Trang chủ — render các section động từ data layer dùng chung */
(function () {
  'use strict';

  var ICONS = {
    code: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    layout: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="21"/></svg>',
    megaphone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    palette: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".6"/><circle cx="17.5" cy="10.5" r=".6"/><circle cx="8.5" cy="7.5" r=".6"/><circle cx="6.5" cy="12.5" r=".6"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.2-.3-.4-.6-.4-1 0-.8.7-1.4 1.5-1.4H16c3.3 0 6-2.7 6-6 0-4.4-4-8-10-8z"/></svg>'
  };
  var ICON_BG = { code: 'rgba(76,95,255,0.16)', layout: 'rgba(1,151,112,0.16)', megaphone: 'rgba(245,165,36,0.16)', palette: 'rgba(170,1,36,0.16)' };
  var ICON_COLOR = { code: 'var(--primary)', layout: 'var(--accent)', megaphone: 'var(--warning)', palette: '#E0335A' };
  var ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  var CHECK_SM = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  function renderServiceTabPanel(dv) {
    var panel = document.getElementById('service-tabs-panel');
    if (!panel) return;
    panel.innerHTML =
      '<div class="service-tab-content">' +
      '<h3 class="h3" style="font-size:21px; margin-bottom:16px;">' + dv.ten + '</h3>' +
      '<div class="service-tab-content__media">' +
      '<img src="' + dv.anh + '" alt="' + dv.anh_alt + '" loading="lazy">' +
      '<div class="service-tab-content__media-icon" style="--icon-bg:' + ICON_BG[dv.icon] + '; --icon-color:' + ICON_COLOR[dv.icon] + ';">' + ICONS[dv.icon] + '</div>' +
      '<span class="service-tab-content__media-hint">Di chuột vào ảnh để xem lợi ích</span>' +
      '<div class="service-tab-content__overlay">' +
      '<div class="service-tab-content__benefits">' +
      dv.loi_ich.slice(0, 4).map(function (li) {
        return '<div class="service-tab-content__benefit">' + CHECK_SM + '<span>' + li + '</span></div>';
      }).join('') +
      '</div>' +
      '</div>' +
      '</div>' +
      '<a class="btn btn-outline" style="margin-top:20px;" href="screens/dich-vu/' + dv.slug + '/index.html">Xem chi tiết dịch vụ ' + ARROW + '</a>' +
      '</div>';
    // re-trigger the fade-in animation on the freshly injected panel
    var content = panel.querySelector('.service-tab-content');
    void content.offsetWidth;
    content.classList.add('is-active');
  }

  var SERVICE_AUTOPLAY_MS = 5500;
  var serviceTabIndex = 0;
  var serviceTabTimer = null;

  function activateServiceTab(index, nav) {
    serviceTabIndex = index;
    var btns = nav.querySelectorAll('.service-tab-btn');
    btns.forEach(function (b) {
      var isTarget = parseInt(b.dataset.index, 10) === index;
      b.classList.toggle('is-active', isTarget);
      var bar = b.querySelector('.service-tab-btn__progress');
      bar.classList.remove('is-animating');
      if (isTarget) {
        void bar.offsetWidth; // restart the CSS progress animation from 0
        bar.classList.add('is-animating');
      }
    });
    renderServiceTabPanel(DATA_DICH_VU[index]);
  }

  function startServiceAutoplay(nav) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    stopServiceAutoplay();
    serviceTabTimer = setInterval(function () {
      activateServiceTab((serviceTabIndex + 1) % DATA_DICH_VU.length, nav);
    }, SERVICE_AUTOPLAY_MS);
  }
  function stopServiceAutoplay() { if (serviceTabTimer) clearInterval(serviceTabTimer); }

  function renderServices() {
    var nav = document.getElementById('service-tabs-nav');
    var footerList = document.getElementById('footer-dichvu-list');
    if (!nav || typeof DATA_DICH_VU === 'undefined') return;

    nav.innerHTML = DATA_DICH_VU.map(function (dv, idx) {
      return '<button class="service-tab-btn' + (idx === 0 ? ' is-active' : '') + '" data-index="' + idx + '">' +
        '<span class="service-tab-btn__icon" style="--icon-bg:' + ICON_BG[dv.icon] + '; --icon-color:' + ICON_COLOR[dv.icon] + ';">' + ICONS[dv.icon] + '</span>' +
        '<span class="service-tab-btn__text"><strong>' + dv.ten + '</strong><span>' + dv.mo_ta_ngan + '</span></span>' +
        '<span class="service-tab-btn__progress"></span>' +
        '</button>';
    }).join('');

    nav.querySelectorAll('.service-tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.dataset.index, 10);
        if (idx === serviceTabIndex) return;
        activateServiceTab(idx, nav);
        startServiceAutoplay(nav); // manual pick keeps rotating, just restarts the countdown on the newly focused tab
      });
    });

    nav.addEventListener('mouseenter', stopServiceAutoplay);
    nav.addEventListener('mouseleave', function () { startServiceAutoplay(nav); });

    activateServiceTab(0, nav);
    startServiceAutoplay(nav);

    if (footerList) {
      footerList.innerHTML = DATA_DICH_VU.map(function (dv) {
        return '<li><a href="screens/dich-vu/' + dv.slug + '/index.html">' + dv.ten + '</a></li>';
      }).join('');
    }
  }

  function renderCaseStudies() {
    var grid = document.getElementById('case-study-grid');
    if (!grid || typeof DATA_DU_AN === 'undefined') return;
    var featured = DATA_DU_AN.filter(function (d) { return d.noi_bat; }).slice(0, 2);
    grid.innerHTML = featured.map(function (da) {
      var metric = da.ket_qua[0];
      return '<a class="card portfolio-card is-hoverable" href="screens/du-an/chi-tiet/index.html?slug=' + da.slug + '" style="display:block;">' +
        '<div class="portfolio-card__img"><img src="' + da.anh + '" alt="' + da.anh_alt + '" loading="lazy"></div>' +
        '<div class="portfolio-card__body">' +
        '<span class="badge badge-accent case-card__tag">' + da.nganh + '</span>' +
        '<h3 class="h3" style="margin-bottom:8px;">' + da.ten_du_an + '</h3>' +
        '<p class="body-lg" style="font-size:14.5px;">' + da.tom_tat + '</p>' +
        '<div class="case-card__metric"><strong>' + metric.chi_so + '</strong><span>' + metric.mo_ta + '</span></div>' +
        '<span class="service-card__link" style="margin-top:16px;">Xem chi tiết dự án ' + ARROW + '</span>' +
        '</div></a>';
    }).join('');
  }

  var STAR_FILLED = '<svg class="is-filled" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round"><polygon points="12 2.5 15.16 8.91 22.25 9.95 17.12 14.94 18.33 22 12 18.66 5.67 22 6.88 14.94 1.75 9.95 8.84 8.91"/></svg>';
  var STAR_EMPTY = '<svg class="is-empty" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><polygon points="12 2.5 15.16 8.91 22.25 9.95 17.12 14.94 18.33 22 12 18.66 5.67 22 6.88 14.94 1.75 9.95 8.84 8.91"/></svg>';

  function renderStars(rating) {
    var out = '';
    for (var i = 1; i <= 5; i++) out += i <= rating ? STAR_FILLED : STAR_EMPTY;
    return out;
  }

  function renderTestimonialCard(t) {
    return '<div class="marquee-card">' +
      '<p class="marquee-card__quote">“' + t.noi_dung + '”</p>' +
      '<div class="marquee-card__meta">' +
      '<div class="marquee-card__author">' +
      '<div class="avatar">' + t.avatar_chu_cai + '</div>' +
      '<div class="marquee-card__author-info"><strong>' + t.ten + '</strong><span>' + t.chuc_danh + ', ' + t.cong_ty + '</span></div>' +
      '</div>' +
      '<div class="marquee-card__rating">' +
      '<div class="stars" aria-label="' + t.rating + ' trên 5 sao">' + renderStars(t.rating) + '</div>' +
      '<span>' + t.hang_muc + '</span>' +
      '</div></div></div>';
  }

  function renderTestimonials() {
    var track1 = document.getElementById('marquee-track-1');
    var track2 = document.getElementById('marquee-track-2');
    if (!track1 || !track2 || typeof DATA_TESTIMONIAL === 'undefined') return;

    var mid = Math.ceil(DATA_TESTIMONIAL.length / 2);
    var row1Items = DATA_TESTIMONIAL.slice(0, mid);
    var row2Items = DATA_TESTIMONIAL.slice(mid);

    // Each row's items are duplicated once so translateX(-50%) loops back seamlessly.
    var row1Html = row1Items.map(renderTestimonialCard).join('');
    var row2Html = row2Items.map(renderTestimonialCard).join('');
    track1.innerHTML = row1Html + row1Html;
    track2.innerHTML = row2Html + row2Html;
  }

  function renderBlog() {
    var grid = document.getElementById('blog-grid');
    if (!grid || typeof DATA_BAI_VIET === 'undefined') return;
    var latest = DATA_BAI_VIET.slice(0, 3);
    grid.innerHTML = latest.map(function (bv) {
      return '<a class="card blog-card is-hoverable" href="screens/blog/chi-tiet/index.html?slug=' + bv.slug + '" style="display:block;">' +
        '<div class="blog-card__img"><img src="' + bv.anh + '" alt="' + bv.anh_alt + '" loading="lazy"></div>' +
        '<div class="blog-card__body">' +
        '<span class="badge badge-info">' + bv.chu_de + '</span>' +
        '<h3 class="h3" style="margin:12px 0 8px; font-size:17px;">' + bv.tieu_de + '</h3>' +
        '<p class="body-lg" style="font-size:14px;">' + bv.tom_tat + '</p>' +
        '<div class="blog-card__meta"><span>' + bv.tac_gia + '</span><span class="dot"></span><span>' + bv.thoi_gian_doc + ' phút đọc</span></div>' +
        '</div></a>';
    }).join('');
  }

  function initHeroTypewriter() {
    var el = document.getElementById('hero-typewriter');
    if (!el) return;
    var words = ['tư vấn chuyển đổi số', 'outsourcing phần mềm', 'thiết kế & phát triển web', 'truyền thông số & thương hiệu'];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = words[0];
      return;
    }

    var wordIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function tick() {
      var current = words[wordIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) { deleting = true; setTimeout(tick, 1800); return; }
        setTimeout(tick, 45);
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, 25);
      }
    }
    tick();
  }

  var heroSlideIndex = 0;

  function goToHeroSlide(index) {
    if (typeof DATA_HERO_SHOWCASE === 'undefined' || !DATA_HERO_SHOWCASE.length) return;
    heroSlideIndex = (index + DATA_HERO_SHOWCASE.length) % DATA_HERO_SHOWCASE.length;
    var slide = DATA_HERO_SHOWCASE[heroSlideIndex];

    var img = document.getElementById('hero-showcase-img');
    img.src = slide.anh;
    img.alt = slide.anh_alt;
    document.getElementById('hero-showcase-tag').innerHTML =
      '<span class="hero-case__dot"></span>' + slide.domain.toUpperCase();
    document.getElementById('hero-showcase-project').textContent = slide.ten_du_an;
    document.getElementById('hero-showcase-desc').textContent = slide.mo_ta;
    document.getElementById('hero-showcase-value').textContent = slide.metric_value;
    document.getElementById('hero-showcase-label').textContent = slide.metric_label;

    var dots = document.querySelectorAll('.hero-showcase__dot');
    dots.forEach(function (d, i) { d.classList.toggle('is-active', i === heroSlideIndex); });

    // restart the CSS fill animation from 0 so it always runs the full duration for the new slide
    var bar = document.getElementById('hero-showcase-bar');
    bar.classList.remove('is-filling');
    void bar.offsetWidth;
    bar.classList.add('is-filling');
  }

  function renderHeroShowcase() {
    var root = document.getElementById('hero-showcase');
    var dotsWrap = document.getElementById('hero-showcase-dots');
    var bar = document.getElementById('hero-showcase-bar');
    if (!root || typeof DATA_HERO_SHOWCASE === 'undefined') return;

    dotsWrap.innerHTML = DATA_HERO_SHOWCASE.map(function (_, i) {
      return '<button class="hero-showcase__dot' + (i === 0 ? ' is-active' : '') + '" data-index="' + i + '" aria-label="Xem case study ' + (i + 1) + '"></button>';
    }).join('');
    dotsWrap.querySelectorAll('.hero-showcase__dot').forEach(function (dot) {
      dot.addEventListener('click', function () { goToHeroSlide(parseInt(dot.dataset.index, 10)); });
    });

    // auto-advance exactly when the progress bar finishes filling (no separate timer to drift out of sync)
    bar.addEventListener('animationend', function (e) {
      if (e.animationName === 'heroBarFill') goToHeroSlide(heroSlideIndex + 1);
    });
    root.addEventListener('mouseenter', function () {
      bar.style.animationPlayState = 'paused';
    });
    root.addEventListener('mouseleave', function () {
      bar.style.animationPlayState = 'running';
    });

    goToHeroSlide(0);
  }

  renderServices();
  renderCaseStudies();
  renderTestimonials();
  renderBlog();
  renderHeroShowcase();
  initHeroTypewriter();
})();
