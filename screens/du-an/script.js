/* Dự án — Portfolio (CR-02) dựng từ DATA_DU_AN (= các prototype trong showcase/) / DATA_DICH_VU, hiệu ứng từ portfolio-motion.js.
 * Giữ phần của repo: chip lọc lĩnh vực ?linh-vuc=hospitality | industrial | healthcare (chip + khối nội dung SEO render sẵn
 * trong index.html bởi showcase/_tools/build_playground.py), nút Playground bản mẫu (KTPCase.demo).
 * Song ngữ: VI trong nội dung, EN ở data-en (KTP.en) — render đồng bộ trước DOMContentLoaded để global.js áp ngôn ngữ đã chọn. */
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

  /* ---- Lọc theo lĩnh vực: ?linh-vuc= → trang lĩnh vực (H1, title, meta theo lĩnh vực; ẩn phần giới thiệu chung) ---- */
  var lv = new URLSearchParams(location.search).get('linh-vuc');
  var LV = { hospitality: ['Phần mềm quản lý khách sạn, resort, villa — dự án & demo', 'Hotel, resort & villa management software — projects & demos'],
             industrial: ['Phần mềm CRM doanh nghiệp B2B, công nghiệp — dự án & demo', 'B2B & industrial CRM software — projects & demos'],
             healthcare: ['Phần mềm y tế: bán hàng bệnh viện, phòng khám, POS nhà thuốc — dự án & demo', 'Healthcare software: hospital e-commerce, pharmacy POS — projects & demos'] };
  if (!LV[lv]) lv = '';
  var list = DATA_DU_AN.filter(function (d) { return !lv || d.linh_vuc === lv; });
  document.querySelectorAll('#du-an-chips [data-linh-vuc]').forEach(function (c) { c.classList.toggle('is-active', c.getAttribute('data-linh-vuc') === lv); });
  document.querySelectorAll('#du-an-domains [data-linh-vuc]').forEach(function (b) { b.hidden = !!lv && b.getAttribute('data-linh-vuc') !== lv; });
  if (lv) {
    var stored = (function () { try { return localStorage.getItem('ktp_lang') === 'en'; } catch (e) { return false; } })();
    document.title = LV[lv][stored ? 1 : 0] + ' | KTP Solutions';
    var desc = document.querySelector('#du-an-domains [data-linh-vuc="' + lv + '"] .body-lg');
    var meta = document.querySelector('meta[name="description"]');
    if (desc && meta) meta.setAttribute('content', desc.textContent);
    var h1 = document.getElementById('pf-h1');
    if (h1) { h1.textContent = LV[lv][0]; h1.setAttribute('data-en', LV[lv][1]); }
    document.documentElement.classList.add('is-domain-page');
  }

  /* ① Hero — 3 khung trình duyệt: ảnh bìa dự án nổi bật ở giữa, 2 ảnh bên cạnh */
  var stack = document.getElementById('pf-hero-stack');
  if (stack && list.length) {
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
    M.magnet(stack, { padding: 150, strength: 3 });
  }

  /* ② Marquee — ảnh bìa + ảnh chụp màn hình mọi dự án, chia 2 hàng, mỗi hàng nhân 3 (chỉ ở trang tổng) */
  var marquee = document.getElementById('pf-marquee');
  if (marquee && lv) marquee.hidden = true;
  else if (marquee) {
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
    var row1 = document.getElementById('pf-row-1'), row2 = document.getElementById('pf-row-2');
    if (row1 && row2) {
      row1.innerHTML = rowHtml(tiles.slice(0, half));
      row2.innerHTML = rowHtml(tiles.slice(half));
      M.scrollMarquee(marquee, [row1, row2]);
    }
  }

  /* ③ Approach — chữ sáng dần theo ký tự; đổi VI/EN thì dựng lại theo ngôn ngữ mới */
  var approach = document.getElementById('pf-approach');
  var apText = document.getElementById('pf-approach-text');
  if (lv && approach) approach.hidden = true;
  else if (apText) {
    var VI = apText.textContent.trim(), EN = apText.getAttribute('data-text-en') || VI;
    var renderAp = function () { apText.textContent = isEn() ? EN : VI; M.charReveal(apText); };
    renderAp();
    new MutationObserver(renderAp).observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
  }

  /* ④ Services — số dự án liên quan lấy từ dich_vu_lien_quan (chỉ ở trang tổng) */
  var svcSec = document.getElementById('pf-services');
  var svcList = document.getElementById('pf-services-list');
  if (lv && svcSec) svcSec.hidden = true;
  else if (svcList && typeof DATA_DICH_VU !== 'undefined') {
    svcList.innerHTML = DATA_DICH_VU.map(function (s, i) {
      var n = DATA_DU_AN.filter(function (d) { return d.dich_vu_lien_quan === s.slug; }).length;
      return '<a class="pf-svc reveal" href="../dich-vu/' + s.slug + '/index.html" style="transition-delay:' + (i * 0.08) + 's">' +
        '<div class="pf-svc__num">' + pad(i + 1) + '</div>' +
        '<div><div class="pf-svc__name"' + en(s.ten_en) + '>' + s.ten + '</div><p class="pf-svc__desc"' + en(s.mo_ta_ngan_en) + '>' + s.mo_ta_ngan + '</p></div>' +
        '<div class="pf-svc__side">' + (n ? '<span class="pf-svc__count" data-en="' + n + (n > 1 ? ' projects' : ' project') + '">' + n + ' dự án</span>' : '') +
        '<span class="pf-svc__arrow">' + ARROW + '</span></div></a>';
    }).join('');
  }

  /* ⑤ Projects — card xếp chồng */
  var stackList = document.getElementById('pf-stack-list');
  if (stackList) {
    var count = document.getElementById('pf-projects-count');
    if (count) { count.textContent = list.length + ' dự án tiêu biểu'; count.setAttribute('data-en', list.length + ' featured projects'); }
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
    M.stickyStack(stackList);
  }
})();
