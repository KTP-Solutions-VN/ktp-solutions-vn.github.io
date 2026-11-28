/* Chi tiết dự án — case study portfolio (CR-02). Đọc ?slug=, render từ DATA_DU_AN (= prototype trong showcase/).
   Section: ① Hero (tiêu đề gradient, badge, chip phân hệ, meta, nút Playground, ảnh bìa parallax) ② Bối cảnh 01/02
   ③ Gallery bento (ảnh chụp màn hình + giá trị nổi bật) ④ Phạm vi theo giai đoạn (dự án có pham_vi) ⑤ Use case chính
   ⑥ Giá trị kinh doanh (nền sáng) ⑦ Dự án tiếp theo. Song ngữ qua data-en (KTP.en); trường tuỳ chọn đều có fallback. */
(function () {
  'use strict';
  var root = document.getElementById('du-an-detail');
  if (!root || typeof DATA_DU_AN === 'undefined' || !DATA_DU_AN.length) return;

  var K = window.KTPCase, M = window.KTPMotion, en = KTP.en;
  var ROOT = '../../../';
  var url = function (u) { return /^https?:/.test(u) ? u : ROOT + u; }; // ảnh / link trong data tính từ gốc website
  var params = new URLSearchParams(window.location.search);
  var idx = DATA_DU_AN.findIndex(function (d) { return d.slug === params.get('slug'); });
  if (idx < 0) idx = 0;
  var da = DATA_DU_AN[idx];
  var isOngoing = da.trang_thai === 'dang-dong-hanh';
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); };
  var pad = function (n) { return n < 10 ? '0' + n : String(n); };

  // Meta
  document.getElementById('page-title').textContent = da.ten_du_an + ' — KTP Solutions';
  document.getElementById('page-desc').setAttribute('content', K.plain(da.tom_tat));
  document.getElementById('og-title').setAttribute('content', da.ten_du_an);
  document.getElementById('og-image').setAttribute('content', url(da.anh));

  var svc = typeof DATA_DICH_VU !== 'undefined' ? DATA_DICH_VU.find(function (s) { return s.slug === da.dich_vu_lien_quan; }) : null;
  var sub = da.anh_phu || [];
  var m0 = da.ket_qua && da.ket_qua[0];

  /* ① Hero */
  var meta = [
    ['Khách hàng', 'Client', '<span' + en(da.khach_hang_en) + '>' + da.khach_hang + '</span>'],
    ['Ngành', 'Industry', '<span' + en(da.nganh_en) + '>' + da.nganh + '</span>']
  ];
  if (da.thi_truong) meta.push(['Thị trường', 'Market', '<span' + en(da.thi_truong_en) + '>' + da.thi_truong + '</span>']);
  meta.push(['Dịch vụ KTP', 'KTP service', svc ? '<a href="../../dich-vu/' + svc.slug + '/index.html"' + en(svc.ten_en) + '>' + svc.ten + '</a>' : '—']);
  var hero =
    '<section class="pd-hero"><div class="container">' +
      '<div class="breadcrumb">' +
        '<a href="../../../index.html" data-en="Home">Trang chủ</a><span class="sep">/</span>' +
        '<a href="../index.html" data-en="Projects">Dự án</a><span class="sep">/</span><span' + en(da.ten_du_an_en) + '>' + da.ten_du_an + '</span>' +
      '</div>' +
      '<div class="case-card__badges pd-hero__badges pf-fade" style="--d:0s">' + KTP.domainBadge(da) + K.badges(da) + '</div>' +
      '<h1 class="pd-title pf-fade" style="--d:.1s; --y:30px"' + en(da.ten_du_an_en) + '>' + da.ten_du_an + '</h1>' +
      '<p class="pd-lead pf-fade" style="--d:.15s; --y:20px"' + en(da.tom_tat_en) + '>' + K.tbc(da.tom_tat) + '</p>' +
      (da.mang && da.mang.length ? '<div class="domain-chips pf-fade" style="--d:.2s; --y:16px">' + da.mang.map(function (x) { return '<span class="domain-chip">' + x + '</span>'; }).join('') + '</div>' : '') +
      '<dl class="pd-meta pf-fade" style="--d:.3s; --y:16px; --cols:' + meta.length + '">' +
        meta.map(function (r) { return '<div><dt data-en="' + r[1] + '">' + r[0] + '</dt><dd>' + r[2] + '</dd></div>'; }).join('') +
      '</dl>' +
      '<div class="pd-hero__actions pf-fade" style="--d:.4s; --y:16px">' +
        K.demo(da, ROOT, 'btn-lg pf-pill') +
        '<a class="btn btn-ghost btn-lg pf-pill" href="../../lien-he/index.html" data-en="Book a consultation">Đặt lịch tư vấn</a>' +
        (da.an_ten_khach_hang ? '<p class="case-confidential" data-en="Client name withheld under a confidentiality agreement.">Tên khách hàng được ẩn theo thỏa thuận bảo mật.</p>' : '') +
      '</div>' +
      '<div class="pd-cover pf-fade" style="--d:.5s; --y:30px"><img id="pd-cover-img" src="' + url(da.anh) + '"' + KTP.srcset(url(da.anh)) + ' alt="' + esc(da.anh_alt) + '"></div>' +
    '</div></section>';

  /* ② Bối cảnh */
  var story =
    '<section class="section" style="padding-top:var(--sp-12);"><div class="container pd-story">' +
      '<div class="reveal"><span class="pd-story__num" aria-hidden="true">01</span><h2 data-en="The challenge">Thách thức</h2><p' + en(da.thach_thuc_en) + '>' + K.tbc(da.thach_thuc) + '</p></div>' +
      '<div class="reveal"><span class="pd-story__num" aria-hidden="true">02</span>' +
        (isOngoing ? '<h2 data-en="How KTP partners with the client">Cách KTP đồng hành</h2>' : '<h2 data-en="KTP&#39;s solution">Giải pháp của KTP</h2>') +
        '<p' + en(da.giai_phap_en) + '>' + K.tbc(da.giai_phap) + '</p></div>' +
    '</div></section>';

  /* ③ Gallery bento — 2 ảnh chụp màn hình + ô giá trị nổi bật */
  var bento = sub.length ? (
    '<section class="section" style="padding-top:0;"><div class="container"><div class="pd-bento reveal">' +
      '<figure><img src="' + url(sub[0].anh) + '"' + KTP.srcset(url(sub[0].anh)) + ' alt="' + esc(sub[0].anh_alt) + '" loading="lazy"></figure>' +
      (sub[1] ? '<figure><img src="' + url(sub[1].anh) + '"' + KTP.srcset(url(sub[1].anh)) + ' alt="' + esc(sub[1].anh_alt) + '" loading="lazy"></figure>' : '') +
      (m0 ? '<div class="pd-bento__stat"><strong' + en(m0.chi_so_en) + '>' + m0.chi_so + '</strong><span' + en(m0.mo_ta_en) + '>' + m0.mo_ta + '</span></div>' : '') +
    '</div></div></section>'
  ) : '';

  /* ④ Phạm vi đồng hành theo giai đoạn (dự án có pham_vi) */
  var journey = '';
  if (da.pham_vi && da.pham_vi.length) {
    var stages = [];
    da.pham_vi.forEach(function (it) {
      var st = stages.find(function (s) { return s.name === it.giai_doan; });
      if (!st) { st = { name: it.giai_doan, name_en: it.giai_doan_en, items: [] }; stages.push(st); }
      st.items.push(it);
    });
    journey =
      '<section class="section section-bg-surface"><div class="container">' +
        '<div class="reveal" style="margin-bottom:var(--sp-12);"><span class="pf-eyebrow" data-en="Partnership scope · phase by phase">Phạm vi đồng hành · theo từng giai đoạn triển khai</span><h2 class="pf-giant pf-giant--section">Scope</h2></div>' +
        '<ol class="scope-journey reveal" style="--stages:' + stages.length + ';">' +
          stages.map(function (st, i) {
            // tô màu chặng theo trạng thái nếu giai_doan là trạng thái (Đang… / Chuẩn bị… / Sắp…)
            var mod = /^Đang/i.test(st.name) ? ' is-active' : (/^(Chuẩn bị|Sắp)/i.test(st.name) ? ' is-upcoming' : '');
            return '<li class="scope-stage' + mod + '"><div class="scope-stage__head"><span class="scope-stage__num">0' + (i + 1) + '</span><span' + en(st.name_en) + '>' + st.name + '</span></div>' +
              st.items.map(function (it) { return '<div class="scope-item"><strong' + en(it.hang_muc_en) + '>' + it.hang_muc + '</strong><p' + en(it.mo_ta_en) + '>' + K.tbc(it.mo_ta) + '</p></div>'; }).join('') +
            '</li>';
          }).join('') +
        '</ol>' +
      '</div></section>';
  }

  /* ⑤ Use case chính (chỉ những gì prototype có thật) + nút bấm thử playground */
  var cases = da.use_cases && da.use_cases.length ? (
    '<section class="section"><div class="container">' +
      '<div class="reveal" style="margin-bottom:var(--sp-12);"><span class="pf-eyebrow" data-en="Key use cases · try them in the sample playground">Use case chính · bấm thử trong playground bản mẫu</span><h2 class="pf-giant pf-giant--section">Use cases</h2></div>' +
      '<div class="pd-cases">' +
        da.use_cases.map(function (uc, i) {
          return '<div class="pd-case reveal" style="transition-delay:' + (i % 3 * 0.08) + 's"><span class="pd-case__num">' + pad(i + 1) + '</span>' +
            '<h3' + en(uc.ten_en) + '>' + uc.ten + '</h3><p' + en(uc.mo_ta_en) + '>' + uc.mo_ta + '</p></div>';
        }).join('') +
      '</div>' +
      (da.playground ? '<div class="pd-cases__cta reveal">' + K.demo(da, ROOT, 'btn-lg pf-pill') + '</div>' : '') +
    '</div></section>'
  ) : '';

  /* ⑥ Giá trị kinh doanh (ket_qua: 3 giá trị — không phải số liệu đo lường) */
  var results =
    '<section class="pd-results"><div class="pd-results__inner">' +
      '<div class="reveal" style="text-align:center;">' +
        '<span class="pf-eyebrow pf-eyebrow--dark" data-en="Business value">Giá trị kinh doanh</span>' +
        '<h2 class="pf-giant pf-giant--section pf-giant--dark">Value</h2>' +
        (isOngoing ? '<p class="pd-results__note" data-en="This partnership is ongoing: these are the goals the system is built for, and measured results will be added once there is enough data.">Dự án đang trong quá trình đồng hành — đây là giá trị hệ thống hướng tới, số liệu đo lường sẽ cập nhật khi đủ cơ sở.</p>' : '') +
      '</div>' +
      '<div class="pd-results__list">' +
        da.ket_qua.map(function (k, i) {
          return '<div class="pd-result reveal" style="transition-delay:' + (i * 0.1) + 's"><strong' + en(k.chi_so_en) + '>' + k.chi_so + '</strong><span' + en(k.mo_ta_en) + '>' + k.mo_ta + '</span></div>';
        }).join('') +
      '</div>' +
    '</div></section>';

  /* ⑦ Dự án tiếp theo */
  var nxt = DATA_DU_AN[(idx + 1) % DATA_DU_AN.length];
  var prv = DATA_DU_AN[(idx - 1 + DATA_DU_AN.length) % DATA_DU_AN.length];
  var next = DATA_DU_AN.length > 1 ? (
    '<section class="pd-next"><div class="container">' +
      '<span class="pf-eyebrow" style="text-align:left;" data-en="Next project">Dự án tiếp theo</span>' +
      '<a class="pd-next__link" href="index.html?slug=' + nxt.slug + '">' +
        '<span class="pd-next__title"' + en(nxt.ten_du_an_en) + '>' + nxt.ten_du_an + '</span>' +
        '<span class="pd-next__thumb" aria-hidden="true"><img src="' + url(nxt.anh) + '"' + KTP.srcset(url(nxt.anh)) + ' alt="" loading="lazy"></span>' +
        '<span class="pd-next__arrow" aria-hidden="true">' + ARROW + '</span>' +
      '</a>' +
      '<div class="pd-next__foot">' +
        '<a href="index.html?slug=' + prv.slug + '">← <span' + en(prv.ten_du_an_en) + '>' + prv.ten_du_an + '</span></a>' +
        '<a href="../index.html" data-en="View all projects">Xem tất cả dự án</a>' +
      '</div>' +
    '</div></section>'
  ) : '';

  root.innerHTML = hero + story + bento + journey + cases + results + next;
  M.parallax(document.getElementById('pd-cover-img'), 0.08);
})();
