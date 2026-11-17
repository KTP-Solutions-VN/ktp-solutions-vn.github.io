/* Chi tiết dự án — đọc slug từ query string, render từ DATA_DU_AN dùng chung */
(function () {
  'use strict';
  var root = document.getElementById('du-an-detail');
  if (!root || typeof DATA_DU_AN === 'undefined') return;

  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug');
  var da = DATA_DU_AN.find(function (d) { return d.slug === slug; }) || DATA_DU_AN[0];
  var ROOT = '../../../';
  var url = function (u) { return /^https?:/.test(u) ? u : ROOT + u; }; // ảnh / link trong data tính từ gốc website
  var playBtn = function (cls) { return da.playground ? '<a class="btn ' + cls + '" href="' + url(da.playground) + '" data-en="Try the sample playground">Bấm thử playground bản mẫu</a>' : ''; };

  if (!da) {
    root.innerHTML = '<div class="container"><div class="empty-state">' +
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
      '<p>Không tìm thấy dự án này.</p><a class="btn btn-outline" href="../index.html" style="margin-top:16px;">Quay lại danh sách dự án</a>' +
      '</div></div>';
    return;
  }

  document.getElementById('page-title').textContent = da.ten_du_an + ' — KTP Solutions';
  document.getElementById('page-desc').setAttribute('content', da.tom_tat);
  document.getElementById('og-title').setAttribute('content', da.ten_du_an);
  document.getElementById('og-image').setAttribute('content', url(da.anh));

  var related = DATA_DU_AN.filter(function (d) { return d.slug !== da.slug; }).slice(0, 2);

  root.innerHTML =
    '<section class="section" style="padding-top: calc(var(--header-h) + 40px); padding-bottom:0;">' +
      '<div class="container">' +
        '<div class="breadcrumb">' +
          '<a href="../../../index.html" data-en="Home">Trang chủ</a><span class="sep">/</span>' +
          '<a href="../index.html" data-en="Projects">Dự án</a><span class="sep">/</span>' +
          '<span' + KTP.en(da.ten_du_an_en) + '>' + da.ten_du_an + '</span>' +
        '</div>' +
        KTP.domainBadge(da, 'margin-bottom:16px;') +
        '<h1 style="font-size:32px; max-width:780px;"' + KTP.en(da.ten_du_an_en) + '>' + da.ten_du_an + '</h1>' +
        '<p class="body-lg" style="max-width:680px; margin:12px 0 20px;"><span data-en="Client:">Khách hàng:</span> <strong style="color:var(--text-strong);"' + KTP.en(da.khach_hang_en) + '>' + da.khach_hang + '</strong></p>' +
        '<p class="body-lg" style="max-width:780px; margin:0 0 24px;"' + KTP.en(da.tom_tat_en) + '>' + da.tom_tat + '</p>' +
        (da.playground ? '<div style="margin-bottom:32px;">' + playBtn('btn-primary btn-lg') + '</div>' : '<div style="margin-bottom:32px;"></div>') +
      '</div>' +
    '</section>' +
    '<section class="container" style="margin-bottom:48px;">' +
      '<div class="card" style="padding:0; overflow:hidden; border-radius:20px;">' +
        '<img src="' + url(da.anh) + '" alt="' + da.anh_alt + '" style="width:100%; max-height:420px; object-fit:cover; object-position:top left;">' +
      '</div>' +
    '</section>' +
    '<section class="container grid-2" style="margin-bottom:56px; gap:48px;">' +
      '<div>' +
        '<h2 class="h2" style="font-size:22px; margin-bottom:12px;" data-en="The challenge">Thách thức</h2>' +
        '<p class="body-lg"' + KTP.en(da.thach_thuc_en) + '>' + da.thach_thuc + '</p>' +
      '</div>' +
      '<div>' +
        '<h2 class="h2" style="font-size:22px; margin-bottom:12px;" data-en="KTP&#39;s solution">Giải pháp của KTP</h2>' +
        '<p class="body-lg"' + KTP.en(da.giai_phap_en) + '>' + da.giai_phap + '</p>' +
      '</div>' +
    '</section>' +
    '<section class="section section-bg-surface" style="padding-top:48px;">' +
      '<div class="container">' +
        '<h2 class="h2" style="font-size:22px; margin-bottom:24px; text-align:center;" data-en="Business value">Giá trị kinh doanh</h2>' +
        '<div class="grid-3">' +
          da.ket_qua.map(function (kq, i) {
            var variant = ['stat-card--accent', 'stat-card--success', 'stat-card--warning'][i % 3];
            return '<div class="stat-card ' + variant + '"><div class="stat-card__value" style="font-size:26px;"' + KTP.en(kq.chi_so_en) + '>' + kq.chi_so + '</div><div class="stat-card__label" style="font-size:14px;"' + KTP.en(kq.mo_ta_en) + '>' + kq.mo_ta + '</div></div>';
          }).join('') +
        '</div>' +
        (da.use_cases && da.use_cases.length ? (
          '<h2 class="h2" style="font-size:22px; margin:56px 0 24px; text-align:center;" data-en="Key use cases">Use case chính</h2>' +
          '<div class="grid-3">' +
            da.use_cases.map(function (uc, i) {
              return '<div class="card" style="padding:24px;">' +
                '<span class="badge badge-accent" style="margin-bottom:12px;">' + String(i + 1).padStart(2, '0') + '</span>' +
                '<h3 class="h3" style="font-size:17px; margin:0 0 8px;"' + KTP.en(uc.ten_en) + '>' + uc.ten + '</h3>' +
                '<p class="body-lg" style="font-size:14.5px; margin:0;"' + KTP.en(uc.mo_ta_en) + '>' + uc.mo_ta + '</p>' +
                '</div>';
            }).join('') +
          '</div>'
        ) : '') +
        (da.playground ? '<div style="text-align:center; margin-top:32px;">' + playBtn('btn-accent btn-lg') + '</div>' : '') +
      '</div>' +
    '</section>' +
    (related.length ? (
      '<section class="section">' +
        '<div class="container">' +
          '<h2 class="h2" style="font-size:22px; margin-bottom:24px;" data-en="Other projects">Dự án khác</h2>' +
          '<div class="grid-2">' +
            related.map(function (r) {
              return '<a class="card portfolio-card is-hoverable" href="index.html?slug=' + r.slug + '" style="display:block;">' +
                '<div class="portfolio-card__img"><img src="' + url(r.anh) + '" alt="' + r.anh_alt + '" loading="lazy" style="object-position:top left;"></div>' +
                '<div class="portfolio-card__body">' + KTP.domainBadge(r) + '<h3 class="h3" style="margin:12px 0 0; font-size:16px;"' + KTP.en(r.ten_du_an_en) + '>' + r.ten_du_an + '</h3></div>' +
                '</a>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</section>'
    ) : '');
})();
