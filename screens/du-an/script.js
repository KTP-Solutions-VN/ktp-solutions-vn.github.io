/* Dự án — Portfolio (CR-02) dựng từ DATA_DU_AN (= các prototype trong showcase/) / DATA_DICH_VU, hiệu ứng từ portfolio-motion.js.
 * Giữ phần của repo: chip lọc lĩnh vực ?linh-vuc=hospitality | industrial | healthcare (chip + khối nội dung SEO render sẵn
 * trong index.html bởi showcase/_tools/build_playground.py), nút Playground bản mẫu (KTPCase.demo).
 * Bấm chip (hoặc tiêu đề khối lĩnh vực) thì lọc tại chỗ và đổi URL bằng history.pushState, không tải lại trang;
 * chip vẫn là link thật cho máy tìm kiếm, mở tab mới và nút Back / Forward.
 * Song ngữ: VI trong nội dung, EN ở data-en (KTP.en) — render đồng bộ trước DOMContentLoaded để global.js áp ngôn ngữ đã chọn;
 * phần dựng lại sau khi đổi lĩnh vực tự áp ngôn ngữ đang xem (applyLang). */
(function () {
  'use strict';
  if (typeof DATA_DU_AN === 'undefined') return;
  var K = window.KTPCase, M = window.KTPMotion, en = KTP.en;
  var ROOT = '../../';
  var url = function (u) { return /^https?:/.test(u) ? u : ROOT + u; }; // ảnh / link trong data tính từ gốc website
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  var detail = function (d) { return 'chi-tiet/index.html?slug=' + d.slug; };
  var pad = function (n) { return n < 10 ? '0' + n : String(n); };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); };
  var isEn = function () { return document.documentElement.getAttribute('data-lang') === 'en'; };
  function chips(d) {
    return d.mang && d.mang.length
      ? '<div class="domain-chips">' + d.mang.map(function (x) { return '<span class="domain-chip">' + x + '</span>'; }).join('') + '</div>' : '';
  }
  // Nội dung dựng lại sau khi global.js đã áp ngôn ngữ (đổi lĩnh vực): đang xem EN thì đổi sang EN, giữ data-vi cho nút VI/EN
  function applyLang(root) {
    if (!isEn()) return;
    root.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.dataset.vi) el.dataset.vi = el.innerHTML;
      el.innerHTML = el.dataset.en;
    });
  }
  // Đổi chữ (HTML) của một phần tử song ngữ theo ngôn ngữ đang xem
  function setText(el, vi, enHtml) {
    if (!el) return;
    el.dataset.vi = vi;
    el.setAttribute('data-en', enHtml);
    el.innerHTML = isEn() ? enHtml : vi;
  }

  /* ---- Lọc theo lĩnh vực: ?linh-vuc= → trang lĩnh vực (H1, title, meta theo lĩnh vực; ẩn phần giới thiệu chung) ---- */
  var LV = { hospitality: ['Phần mềm quản lý khách sạn, resort, villa — dự án & demo', 'Hotel, resort & villa management software — projects & demos'],
             industrial: ['Phần mềm CRM doanh nghiệp B2B, công nghiệp — dự án & demo', 'B2B & industrial CRM software — projects & demos'],
             healthcare: ['Phần mềm y tế: bán hàng bệnh viện, phòng khám, POS nhà thuốc — dự án & demo', 'Healthcare software: hospital e-commerce, pharmacy POS — projects & demos'] };
  var readLv = function () { var v = new URLSearchParams(location.search).get('linh-vuc'); return LV[v] ? v : ''; };
  var h1 = document.getElementById('pf-h1');
  var meta = document.querySelector('meta[name="description"]');
  // title / description / H1 của trang tổng, để trả lại khi bấm "Tất cả"
  var BASE = { title: document.title, desc: meta ? meta.getAttribute('content') : '', h1: h1 ? h1.innerHTML : '', h1En: h1 ? h1.getAttribute('data-en') : '' };
  var lv = '', list = DATA_DU_AN;

  /* ① Hero — 3 khung trình duyệt: ảnh bìa dự án nổi bật ở giữa, 2 ảnh bên cạnh (theo lĩnh vực đang xem) */
  var stack = document.getElementById('pf-hero-stack');
  function renderHero() {
    if (!stack || !list.length) return;
    var pool = [];
    var feat = list.filter(function (d) { return d.noi_bat; }).concat(list.filter(function (d) { return !d.noi_bat; }));
    feat.forEach(function (d) { pool.push({ d: d, anh: d.anh }); });
    feat.forEach(function (d) { (d.anh_phu || []).forEach(function (a) { pool.push({ d: d, anh: a.anh }); }); });
    var trio = [pool[2] || pool[0], pool[0], pool[1] || pool[0]];
    var cls = ['pf-mock--l', 'pf-mock--c', 'pf-mock--r'];
    stack.innerHTML = trio.map(function (t, i) {
      return '<div class="pf-mock ' + cls[i] + '"><div class="pf-mock__bar"><i></i><i></i><i></i></div>' +
        '<img src="' + url(t.anh) + '" alt="" loading="eager">' +
        (i === 1 ? '<span class="pf-mock__tag">' + (t.d.mang ? t.d.mang.slice(0, 2).join(' · ') : t.d.nganh) + '</span>' : '') +
        '</div>';
    }).join('');
  }

  /* ② Marquee — ảnh bìa + ảnh chụp màn hình mọi dự án, chia 2 hàng, mỗi hàng nhân 3 (chỉ ở trang tổng; dựng lần đầu khi hiện) */
  var marquee = document.getElementById('pf-marquee'), marqueeBuilt = false;
  function buildMarquee() {
    var row1 = document.getElementById('pf-row-1'), row2 = document.getElementById('pf-row-2');
    if (marqueeBuilt || !row1 || !row2) return;
    marqueeBuilt = true;
    // xếp xen kẽ theo "lớp": ảnh bìa của mọi dự án → ảnh phụ 1 → ảnh phụ 2, để 2 ảnh cùng dự án không đứng cạnh nhau
    var tiles = [];
    [-1, 0, 1].forEach(function (layer) {
      DATA_DU_AN.forEach(function (d) {
        if (layer < 0) tiles.push({ d: d, anh: d.anh, alt: d.anh_alt, alt_en: d.anh_alt_en });
        else if (d.anh_phu && d.anh_phu[layer]) tiles.push({ d: d, anh: d.anh_phu[layer].anh, alt: d.anh_phu[layer].anh_alt, alt_en: d.anh_phu[layer].anh_alt_en });
      });
    });
    var half = Math.ceil(tiles.length / 2);
    var tileHtml = function (t, hidden) {
      return '<a class="pf-tile" href="' + detail(t.d) + '"' + (hidden ? ' tabindex="-1" aria-hidden="true"' : '') + '>' +
        '<img src="' + url(t.anh) + '" alt="' + (hidden ? '' : esc(t.alt)) + '" loading="lazy">' +
        '<span class="pf-tile__cap"' + en(t.d.ten_du_an_en) + '>' + t.d.ten_du_an + '</span></a>';
    };
    // bản giữa là bản "thật" cho bàn phím / screen reader; 2 bản nhân thêm ẩn khỏi accessibility tree
    var rowHtml = function (items) {
      return items.map(function (t) { return tileHtml(t, true); }).join('') +
        items.map(function (t) { return tileHtml(t, false); }).join('') +
        items.map(function (t) { return tileHtml(t, true); }).join('');
    };
    row1.innerHTML = rowHtml(tiles.slice(0, half));
    row2.innerHTML = rowHtml(tiles.slice(half));
    applyLang(marquee);
    M.scrollMarquee(marquee, [row1, row2]);
  }

  /* ③ Approach — chữ sáng dần theo ký tự; đổi VI/EN thì dựng lại theo ngôn ngữ mới (chỉ ở trang tổng; dựng lần đầu khi hiện) */
  var approach = document.getElementById('pf-approach');
  var apText = document.getElementById('pf-approach-text'), apBuilt = false;
  function buildApproach() {
    if (apBuilt || !apText) return;
    apBuilt = true;
    var VI = apText.textContent.trim(), EN = apText.getAttribute('data-text-en') || VI;
    var renderAp = function () { apText.textContent = isEn() ? EN : VI; M.charReveal(apText); };
    renderAp();
    new MutationObserver(renderAp).observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
  }

  /* ④ Services — số dự án liên quan lấy từ dich_vu_lien_quan (chỉ hiện ở trang tổng; dựng ngay lúc tải để global.js gắn .reveal) */
  var svcSec = document.getElementById('pf-services');
  var svcList = document.getElementById('pf-services-list');
  if (svcList && typeof DATA_DICH_VU !== 'undefined') {
    svcList.innerHTML = DATA_DICH_VU.map(function (s, i) {
      var n = DATA_DU_AN.filter(function (d) { return d.dich_vu_lien_quan === s.slug; }).length;
      return '<a class="pf-svc reveal" href="../dich-vu/' + s.slug + '/index.html" style="transition-delay:' + (i * 0.08) + 's">' +
        '<div class="pf-svc__num">' + pad(i + 1) + '</div>' +
        '<div><div class="pf-svc__name"' + en(s.ten_en) + '>' + s.ten + '</div><p class="pf-svc__desc"' + en(s.mo_ta_ngan_en) + '>' + s.mo_ta_ngan + '</p></div>' +
        '<div class="pf-svc__side">' + (n ? '<span class="pf-svc__count" data-en="' + n + (n > 1 ? ' projects' : ' project') + '">' + n + ' dự án</span>' : '') +
        '<span class="pf-svc__arrow">' + ARROW + '</span></div></a>';
    }).join('');
  }

  /* ⑤ Projects — card xếp chồng của lĩnh vực đang xem */
  var stackList = document.getElementById('pf-stack-list');
  var count = document.getElementById('pf-projects-count');
  function renderProjects() {
    if (!stackList) return;
    setText(count, list.length + ' dự án tiêu biểu', list.length + ' featured projects');
    stackList.innerHTML = list.map(function (d, i) {
      var sub = d.anh_phu || [];
      var m = d.ket_qua && d.ket_qua[0];
      return '<div class="pf-card-wrap">' +
        '<article class="pf-card" style="--offset:' + (i * 28) + 'px">' +
          '<div class="pf-card__top">' +
            '<div class="pf-card__num" aria-hidden="true">' + pad(i + 1) + '</div>' +
            '<div class="pf-card__meta">' +
              '<div class="case-card__badges">' + KTP.domainBadge(d) + K.badges(d) + '</div>' +
              '<h3 class="pf-card__title"><a href="' + detail(d) + '"' + en(d.ten_du_an_en) + '>' + d.ten_du_an + '</a></h3>' +
              chips(d) +
            '</div>' +
            '<div class="pf-card__actions">' +
              '<a class="pf-ghost" href="' + detail(d) + '" aria-label="' + esc(d.ten_du_an) + '"><span data-en="View project">Xem dự án</span> ' + ARROW + '</a>' +
              K.demo(d, ROOT, 'pf-pill') +
            '</div>' +
          '</div>' +
          '<div class="pf-card__media">' +
            '<div class="pf-card__col">' +
              (sub[0] ? '<figure><img src="' + url(sub[0].anh) + '" alt="' + esc(sub[0].anh_alt) + '" loading="lazy"></figure>' : '') +
              (sub[1] ? '<figure><img src="' + url(sub[1].anh) + '" alt="' + esc(sub[1].anh_alt) + '" loading="lazy"></figure>' : '') +
            '</div>' +
            '<figure><img src="' + url(d.anh) + '" alt="' + esc(d.anh_alt) + '" loading="lazy">' +
              (m ? '<figcaption class="pf-card__metric"><strong' + en(m.chi_so_en) + '>' + m.chi_so + '</strong><span' + en(m.mo_ta_en) + '>' + m.mo_ta + '</span></figcaption>' : '') +
            '</figure>' +
          '</div>' +
        '</article></div>';
    }).join('');
    applyLang(stackList);
    M.stickyStack(stackList);
  }

  /* Áp lĩnh vực: lần đầu lúc tải trang, sau đó mỗi lần bấm chip / Back / Forward */
  function setDomain(next, first) {
    lv = next;
    list = DATA_DU_AN.filter(function (d) { return !lv || d.linh_vuc === lv; });
    document.querySelectorAll('#du-an-chips [data-linh-vuc]').forEach(function (c) { c.classList.toggle('is-active', c.getAttribute('data-linh-vuc') === lv); });
    document.querySelectorAll('#du-an-domains [data-linh-vuc]').forEach(function (b) { b.hidden = !!lv && b.getAttribute('data-linh-vuc') !== lv; });
    document.documentElement.classList.toggle('is-domain-page', !!lv);
    // lúc tải trang global.js chưa áp ngôn ngữ → đọc lựa chọn đã lưu
    var enNow = first ? (function () { try { return localStorage.getItem('ktp_lang') === 'en'; } catch (e) { return false; } })() : isEn();
    document.title = lv ? LV[lv][enNow ? 1 : 0] + ' | KTP Solutions' : BASE.title;
    var desc = lv && document.querySelector('#du-an-domains [data-linh-vuc="' + lv + '"] .body-lg');
    if (meta) meta.setAttribute('content', desc ? desc.textContent : BASE.desc);
    if (h1) { if (lv) setText(h1, esc(LV[lv][0]), esc(LV[lv][1])); else setText(h1, BASE.h1, BASE.h1En); }
    if (marquee) { marquee.hidden = !!lv; if (!lv) buildMarquee(); }
    if (approach) { approach.hidden = !!lv; if (!lv) buildApproach(); }
    if (svcSec) svcSec.hidden = !!lv;
    renderHero();
    renderProjects();
    if (!first) window.dispatchEvent(new Event('scroll')); // tính lại hiệu ứng theo cuộn cho phần vừa ẩn / hiện
  }
  setDomain(readLv(), true);
  if (stack) M.magnet(stack, { padding: 150, strength: 3 });

  /* Đổi lĩnh vực không tải lại trang. keep: giữ hàng chip đứng yên trên màn hình (phần phía trên ẩn / hiện làm trang co giãn),
     không thì lên đầu trang lĩnh vực như khi mở link. Cuộn tức thì, bỏ qua scroll-behavior: smooth của trang
     (trình duyệt cũ không nhận 'instant' thì cuộn thường). */
  var nav = document.getElementById('du-an-chips');
  function switchTo(next, keep) {
    keep = keep && nav;
    var top = keep ? nav.getBoundingClientRect().top : 0;
    setDomain(next);
    var y = keep ? window.scrollY + nav.getBoundingClientRect().top - top : 0;
    try { window.scrollTo({ top: y, left: 0, behavior: 'instant' }); } catch (err) { window.scrollTo(0, y); }
  }
  // Bấm chip / tiêu đề khối lĩnh vực (cuối trang). Ctrl / Cmd / Shift / chuột giữa vẫn mở link như thường.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('#du-an-chips a[href], #du-an-domains h2 a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var to = new URL(a.href, location.href);
    var next = to.searchParams.get('linh-vuc') || '';
    if (to.origin !== location.origin || (next && !LV[next])) return;
    e.preventDefault();
    if (next === lv) return;
    history.pushState(null, '', to.pathname + to.search);
    switchTo(next, nav && nav.contains(a));
  });
  // Back / Forward giữa các lĩnh vực: giữ chip đứng yên (trình duyệt tự cuộn tiếp về vị trí đã lưu của mục đó nếu khác)
  window.addEventListener('popstate', function () {
    var next = readLv();
    if (next !== lv) switchTo(next, true);
  });
})();
