/* Trang chủ — render các section động từ data layer dùng chung */
(function () {
  'use strict';

  var ICONS = {
    compass: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    code: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    layout: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="21"/></svg>',
    megaphone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    palette: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".6"/><circle cx="17.5" cy="10.5" r=".6"/><circle cx="8.5" cy="7.5" r=".6"/><circle cx="6.5" cy="12.5" r=".6"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.2-.3-.4-.6-.4-1 0-.8.7-1.4 1.5-1.4H16c3.3 0 6-2.7 6-6 0-4.4-4-8-10-8z"/></svg>'
  };
  // compass (Tư vấn) dùng teal nên Web đổi sang chàm; --text-strong để icon vẫn rõ ở light theme
  var ICON_BG = { compass: 'rgba(1,151,112,0.16)', code: 'rgba(76,95,255,0.16)', layout: 'rgba(124,136,255,0.16)', megaphone: 'rgba(245,165,36,0.16)', palette: 'rgba(170,1,36,0.16)' };
  var ICON_COLOR = { compass: 'var(--accent)', code: 'var(--primary)', layout: 'var(--text-strong)', megaphone: 'var(--warning)', palette: '#E0335A' };
  var ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  var CHECK_SM = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  function renderServiceTabPanel(dv) {
    var panel = document.getElementById('service-tabs-panel');
    if (!panel) return;
    panel.innerHTML =
      '<div class="service-tab-content">' +
      '<h3 class="h3" style="font-size:21px; margin-bottom:16px;"' + KTP.en(dv.ten_en) + '>' + dv.ten + '</h3>' +
      '<div class="service-tab-content__media">' +
      '<img src="' + dv.anh + '" alt="' + dv.anh_alt + '" loading="lazy">' +
      '<div class="service-tab-content__media-icon" style="--icon-bg:' + ICON_BG[dv.icon] + '; --icon-color:' + ICON_COLOR[dv.icon] + ';">' + ICONS[dv.icon] + '</div>' +
      '<span class="service-tab-content__media-hint" data-en="Hover the image to see the benefits">Di chuột vào ảnh để xem lợi ích</span>' +
      '<div class="service-tab-content__overlay">' +
      '<div class="service-tab-content__benefits">' +
      dv.loi_ich.slice(0, 4).map(function (li, i) {
        return '<div class="service-tab-content__benefit">' + CHECK_SM + '<span' + KTP.en((dv.loi_ich_en || [])[i]) + '>' + li + '</span></div>';
      }).join('') +
      '</div>' +
      '</div>' +
      '</div>' +
      '<a class="btn btn-outline" style="margin-top:20px;" href="screens/dich-vu/' + dv.slug + '/index.html"><span data-en="View service details">Xem chi tiết dịch vụ</span> ' + ARROW + '</a>' +
      '</div>';
    applyLang(panel);
    // re-trigger the fade-in animation on the freshly injected panel
    var content = panel.querySelector('.service-tab-content');
    void content.offsetWidth;
    content.classList.add('is-active');
  }

  /* Nội dung chèn sau khi trang đã áp ngôn ngữ (tab dịch vụ đổi theo autoplay): đổi sang EN nếu đang ở EN,
     giữ bản VI trong data-vi như global.js để nút VI/EN vẫn đổi qua lại được */
  function applyLang(root) {
    if (document.documentElement.getAttribute('data-lang') !== 'en') return;
    root.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.dataset.vi) el.dataset.vi = el.innerHTML;
      el.innerHTML = el.dataset.en;
    });
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

  // màn hẹp / cảm ứng: panel nằm dưới cả danh sách tab → không tự chuyển (nội dung đổi ngoài tầm nhìn, trang nhảy)
  var SERVICE_NARROW = window.matchMedia('(max-width: 860px), (hover: none)');

  function startServiceAutoplay(nav) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || SERVICE_NARROW.matches) return;
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
        '<span class="service-tab-btn__text"><strong' + KTP.en(dv.ten_en) + '>' + dv.ten + '</strong><span' + KTP.en(dv.mo_ta_ngan_en) + '>' + dv.mo_ta_ngan + '</span></span>' +
        '<span class="service-tab-btn__progress"></span>' +
        '</button>';
    }).join('');

    nav.querySelectorAll('.service-tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.dataset.index, 10);
        if (idx === serviceTabIndex && !SERVICE_NARROW.matches) return;
        activateServiceTab(idx, nav);
        if (SERVICE_NARROW.matches) {
          var panel = document.getElementById('service-tabs-panel');
          if (panel) panel.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        }
        startServiceAutoplay(nav); // manual pick keeps rotating, just restarts the countdown on the newly focused tab
      });
    });

    nav.addEventListener('mouseenter', stopServiceAutoplay);
    nav.addEventListener('mouseleave', function () { startServiceAutoplay(nav); });

    activateServiceTab(0, nav);
    startServiceAutoplay(nav);

    if (footerList) {
      footerList.innerHTML = DATA_DICH_VU.map(function (dv) {
        return '<li><a href="screens/dich-vu/' + dv.slug + '/index.html"' + (dv.ten_en ? ' data-en="' + dv.ten_en.replace(/&/g, '&amp;') + '"' : '') + '>' + dv.ten + '</a></li>';
      }).join('');
    }
  }

  function renderCaseStudies() {
    var grid = document.getElementById('case-study-grid');
    if (!grid || typeof DATA_DU_AN === 'undefined') return;
    var featured = DATA_DU_AN.filter(function (d) { return d.noi_bat; }).slice(0, 2);
    grid.innerHTML = featured.map(function (da) {
      var metric = da.ket_qua[0], detail = 'screens/du-an/chi-tiet/index.html?slug=' + da.slug;
      return '<article class="card portfolio-card has-acts is-hoverable">' +
        '<a class="portfolio-card__img" href="' + detail + '"><img src="' + da.anh + '" alt="' + da.anh_alt + '" loading="lazy"></a>' +
        '<div class="portfolio-card__body">' +
        '<div class="case-card__badges">' + KTP.domainBadge(da) + KTPCase.badges(da) + '</div>' +
        '<h3 class="h3 portfolio-card__title" style="margin-bottom:8px;"><a href="' + detail + '"' + KTP.en(da.ten_du_an_en) + '>' + da.ten_du_an + '</a></h3>' +
        '<p class="body-lg" style="font-size:14.5px;"' + KTP.en(da.tom_tat_en) + '>' + da.tom_tat + '</p>' +
        '<div class="case-card__metric"><strong' + KTP.en(metric.chi_so_en) + '>' + metric.chi_so + '</strong><span' + KTP.en(metric.mo_ta_en) + '>' + metric.mo_ta + '</span></div>' +
        '<div class="case-card__acts">' +
          '<a class="btn btn-outline" href="' + detail + '" data-en="Project details">Xem chi tiết dự án</a>' +
          (da.playground ? '<a class="btn btn-primary" href="' + da.playground + '" data-en="Try the playground">Playground bản mẫu</a>' : '') +
        '</div>' +
        '</div></article>';
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
    var role = t.chuc_danh + ', ' + t.cong_ty;
    return '<div class="marquee-card">' +
      '<p class="marquee-card__quote"' + KTP.en(t.noi_dung_en && '“' + t.noi_dung_en + '”') + '>“' + t.noi_dung + '”</p>' +
      '<div class="marquee-card__meta">' +
      '<div class="marquee-card__author">' +
      '<div class="avatar">' + t.avatar_chu_cai + '</div>' +
      '<div class="marquee-card__author-info"><strong>' + t.ten + '</strong><span' + KTP.en(t.chuc_danh_en && t.chuc_danh_en + ', ' + t.cong_ty) + '>' + role + '</span></div>' +
      '</div>' +
      '<div class="marquee-card__rating">' +
      '<div class="stars" aria-label="' + t.rating + ' trên 5 sao" data-en-aria-label="' + t.rating + ' out of 5 stars">' + renderStars(t.rating) + '</div>' +
      '<span' + KTP.en(t.hang_muc_en) + '>' + t.hang_muc + '</span>' +
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
    var latest = DATA_BAI_VIET.slice(0, 3), en = KTP.en;
    grid.innerHTML = latest.map(function (bv) {
      return '<a class="card blog-card is-hoverable" href="screens/blog/chi-tiet/index.html?slug=' + bv.slug + '" style="display:block;">' +
        '<div class="blog-card__img"><img src="' + bv.anh + '" alt="' + bv.anh_alt + '" loading="lazy"></div>' +
        '<div class="blog-card__body">' +
        '<span class="badge badge-info"' + en(bv.chu_de_en) + '>' + bv.chu_de + '</span>' +
        '<h3 class="h3" style="margin:12px 0 8px; font-size:17px;"' + en(bv.tieu_de_en) + '>' + bv.tieu_de + '</h3>' +
        '<p class="body-lg" style="font-size:14px;"' + en(bv.tom_tat_en) + '>' + bv.tom_tat + '</p>' +
        '<div class="blog-card__meta"><span' + en(bv.tac_gia_en) + '>' + bv.tac_gia + '</span><span class="dot"></span><span data-en="' + bv.thoi_gian_doc + ' min read">' + bv.thoi_gian_doc + ' phút đọc</span></div>' +
        '</div></a>';
    }).join('');
  }

  function initHeroTypewriter() {
    var el = document.getElementById('hero-typewriter');
    if (!el) return;
    var WORDS = {
      vi: ['tư vấn chuyển đổi số', 'ứng dụng AI', 'outsourcing phần mềm', 'thiết kế & phát triển web', 'truyền thông số & thương hiệu'],
      en: ['digital transformation consulting', 'AI adoption', 'software outsourcing', 'web design & development', 'digital marketing & branding']
    };
    var lang = function () { // lựa chọn đã lưu (nút VI/EN ghi vào ktp_lang); data-lang của <html> chỉ đúng sau DOMContentLoaded
      var v = null;
      try { v = localStorage.getItem('ktp_lang'); } catch (e) {}
      return (v || document.documentElement.getAttribute('data-lang')) === 'en' ? 'en' : 'vi';
    };
    var words = WORDS[lang()];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = words[0];
      new MutationObserver(function () { el.textContent = WORDS[lang()][0]; })
        .observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
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
          words = WORDS[lang()]; // đổi ngôn ngữ thì từ kế tiếp theo ngôn ngữ mới
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, 25);
      }
    }
    tick();
  }

  /* Hero — khung trình duyệt xoay các prototype thật trong DATA_DU_AN (ảnh bìa đã white-label, lĩnh vực,
     một giá trị kinh doanh bằng chữ, nút bấm thử playground). Không dùng số liệu tự đặt; nội dung theo ngôn ngữ đang chọn. */
  var heroSlideIndex = 0;
  var HERO_PROJECTS = typeof DATA_DU_AN === 'undefined' ? [] :
    DATA_DU_AN.filter(function (d) { return d.noi_bat; }).concat(DATA_DU_AN.filter(function (d) { return !d.noi_bat; }));
  var heroLang = function () { return document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'vi'; };
  var pick = function (vi, en) { return heroLang() === 'en' && en ? en : vi; };
  var PLAY_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>';

  function goToHeroSlide(index) {
    if (!HERO_PROJECTS.length) return;
    heroSlideIndex = (index + HERO_PROJECTS.length) % HERO_PROJECTS.length;
    var da = HERO_PROJECTS[heroSlideIndex];
    var kq = da.ket_qua && da.ket_qua[0];

    var img = document.getElementById('hero-showcase-img');
    img.src = da.anh;
    img.alt = pick(da.anh_alt, da.anh_alt_en);
    document.getElementById('hero-showcase-tag').innerHTML =
      '<span class="hero-case__dot"></span>' + KTP.domainIcon(da.linh_vuc) + pick(da.nganh, da.nganh_en);
    document.getElementById('hero-showcase-project').innerHTML =
      '<a href="screens/du-an/chi-tiet/index.html?slug=' + da.slug + '">' + pick(da.ten_du_an, da.ten_du_an_en) + '</a>';
    document.getElementById('hero-showcase-desc').textContent = (da.mang || []).slice(0, 4).join(' · ');
    document.getElementById('hero-showcase-value').textContent = kq ? pick(kq.chi_so, kq.chi_so_en) : '';
    document.getElementById('hero-showcase-label').textContent = kq ? pick(kq.mo_ta, kq.mo_ta_en) : '';
    var tryBtn = document.getElementById('hero-showcase-try');
    tryBtn.href = da.playground || ('screens/du-an/chi-tiet/index.html?slug=' + da.slug);
    tryBtn.innerHTML = PLAY_ICON + '<span>' + pick('Bấm thử playground', 'Try the playground') + '</span>';

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
    if (!root || !HERO_PROJECTS.length) return;

    dotsWrap.innerHTML = HERO_PROJECTS.map(function (da, i) {
      return '<button class="hero-showcase__dot' + (i === 0 ? ' is-active' : '') + '" data-index="' + i + '" aria-label="' + da.ten_du_an.replace(/"/g, '&quot;') + '"></button>';
    }).join('');
    dotsWrap.querySelectorAll('.hero-showcase__dot').forEach(function (dot) {
      dot.addEventListener('click', function () { goToHeroSlide(parseInt(dot.dataset.index, 10)); });
    });

    // auto-advance exactly when the progress bar finishes filling (no separate timer to drift out of sync)
    bar.addEventListener('animationend', function (e) {
      if (e.animationName === 'heroBarFill') goToHeroSlide(heroSlideIndex + 1);
    });
    root.addEventListener('mouseenter', function () { bar.style.animationPlayState = 'paused'; });
    root.addEventListener('mouseleave', function () { bar.style.animationPlayState = 'running'; });
    // đổi VI/EN: vẽ lại slide đang xem theo ngôn ngữ mới (giữ vị trí, chạy lại thanh tiến độ)
    new MutationObserver(function () { goToHeroSlide(heroSlideIndex); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });

    goToHeroSlide(0);
  }

  /* Hero — dòng tin cậy: số dự án có playground và các lĩnh vực, đếm thẳng từ DATA_DU_AN (không dùng điểm đánh giá không nguồn) */
  function renderHeroTrust() {
    var icons = document.getElementById('hero-trust-domains');
    var count = document.getElementById('hero-trust-count');
    var text = document.getElementById('hero-trust-domains-text');
    if (!icons || !count || typeof DATA_DU_AN === 'undefined') return;
    var n = DATA_DU_AN.filter(function (d) { return d.playground; }).length;
    var doms = [];
    DATA_DU_AN.forEach(function (d) { if (!doms.some(function (x) { return x.linh_vuc === d.linh_vuc; })) doms.push(d); });
    icons.innerHTML = doms.map(function (d) { return '<div class="avatar">' + KTP.domainIcon(d.linh_vuc) + '</div>'; }).join('');
    count.textContent = n + ' dự án bấm thử được';
    count.setAttribute('data-en', n + ' projects you can click through');
    text.textContent = doms.map(function (d) { return d.nganh; }).join(' · ') + ' · từ 2023';
    text.setAttribute('data-en', doms.map(function (d) { return d.nganh_en || d.nganh; }).join(' · ').replace(/&/g, '&amp;') + ' · since 2023');
  }

  /* CR-01 — Vòng "Đồng hành chuyển đổi số": sáng lần lượt bước 1→4 (nét progress vàng cam chạy vòng quanh viền card),
     bước 3 xong bật badge "Go-live", sau bước 4 chấm sáng chạy theo đường quay lại về bước 1 và tăng số vòng.
     Chỉ chạy khi section trong viewport; hover/focus vào section thì tạm dừng; tắt hẳn khi prefers-reduced-motion. */
  function initDxLoop() {
    var loop = document.querySelector('.dx-loop');
    if (!loop || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var steps = Array.prototype.slice.call(loop.querySelectorAll('.dx-step'));
    var ret = loop.querySelector('.dx-loop__return');
    var roundEl = loop.querySelector('.dx-loop__round b');
    if (steps.length !== 4 || !ret) return;

    // Progress chạy vòng quanh viền: chèn SVG rect bo góc khớp border-radius card (16px + 1px viền)
    var SVG_NS = 'http://www.w3.org/2000/svg';
    steps.forEach(function (s) {
      var svg = document.createElementNS(SVG_NS, 'svg');
      svg.setAttribute('class', 'dx-step__trace');
      svg.setAttribute('aria-hidden', 'true');
      var rect = document.createElementNS(SVG_NS, 'rect');
      rect.setAttribute('x', '0'); rect.setAttribute('y', '0');
      rect.setAttribute('width', '100%'); rect.setAttribute('height', '100%');
      rect.setAttribute('rx', '17'); rect.setAttribute('ry', '17');
      rect.setAttribute('pathLength', '100');
      svg.appendChild(rect);
      s.insertBefore(svg, s.firstChild);
    });

    var STEP_MS = 2200, RETURN_MS = 1900, GAP_MS = 350;
    loop.style.setProperty('--dx-step-ms', STEP_MS + 'ms');
    loop.style.setProperty('--dx-return-ms', RETURN_MS + 'ms');

    var idx = -1, round = 1, timer = null, inView = false, hovering = false, phase = 'idle';

    function restartClass(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function resetRound() {
      steps.forEach(function (s) { s.classList.remove('is-active', 'is-done', 'is-flow'); });
      loop.classList.remove('is-golive');
      ret.classList.remove('is-active');
    }

    function showStep(i) {
      phase = 'step';
      steps.forEach(function (s, k) {
        s.classList.toggle('is-done', k < i);
        if (k !== i) s.classList.remove('is-active');
      });
      restartClass(steps[i], 'is-active'); // chạy lại nét progress quanh viền từ đầu
      if (i > 0) restartClass(steps[i - 1], 'is-flow');
      if (i === 3) loop.classList.add('is-golive'); // thử nghiệm (bước 3) xong -> go-live
      timer = setTimeout(advance, STEP_MS);
    }

    function showReturn() {
      phase = 'return';
      steps[3].classList.remove('is-active');
      steps[3].classList.add('is-done');
      restartClass(ret, 'is-active');
      timer = setTimeout(function () {
        round++;
        if (roundEl) { roundEl.textContent = pad(round); restartClass(roundEl, 'is-bump'); }
        resetRound();
        idx = -1;
        timer = setTimeout(advance, GAP_MS);
      }, RETURN_MS);
    }

    function advance() {
      if (idx < 3) { idx++; showStep(idx); } else { showReturn(); }
    }

    function stop() { clearTimeout(timer); timer = null; }
    function start() {
      if (timer || !inView || hovering) return;
      loop.classList.remove('is-paused');
      if (phase === 'step' && idx >= 0) showStep(idx); // tiếp tục bước đang dở (chạy lại thanh tiến độ của bước đó)
      else if (phase === 'return') showReturn();
      else advance();
    }

    loop.classList.add('dx-loop--running');

    loop.addEventListener('mouseenter', function () { hovering = true; stop(); loop.classList.add('is-paused'); });
    loop.addEventListener('mouseleave', function () { hovering = false; start(); });
    loop.addEventListener('focusin', function () { hovering = true; stop(); loop.classList.add('is-paused'); });
    loop.addEventListener('focusout', function () { hovering = false; start(); });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) { setTimeout(start, 600); } // chờ reveal xong mới chạy
        else { stop(); }
      }, { threshold: 0.35 }).observe(loop);
    } else { inView = true; start(); }
  }

  renderServices();
  renderCaseStudies();
  var liveGrid = document.getElementById('live-projects'); // Dự án đã triển khai (website thật)
  if (liveGrid) liveGrid.innerHTML = KTP.liveProjects('');
  renderTestimonials();
  renderBlog();
  renderHeroShowcase();
  renderHeroTrust();
  initHeroTypewriter();
  initDxLoop();
})();
