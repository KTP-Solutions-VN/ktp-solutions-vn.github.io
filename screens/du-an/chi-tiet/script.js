/* Chi tiết dự án — đọc slug từ query string, render từ DATA_DU_AN dùng chung */
(function () {
  'use strict';
  var root = document.getElementById('du-an-detail');
  if (!root || typeof DATA_DU_AN === 'undefined') return;

  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug');
  var da = DATA_DU_AN.find(function (d) { return d.slug === slug; }) || DATA_DU_AN[0];

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
  document.getElementById('og-image').setAttribute('content', da.anh);

  var related = DATA_DU_AN.filter(function (d) { return d.slug !== da.slug; }).slice(0, 2);

  root.innerHTML =
    '<section class="section" style="padding-top: calc(var(--header-h) + 40px); padding-bottom:0;">' +
      '<div class="container">' +
        '<div class="breadcrumb">' +
          '<a href="../../../index.html">Trang chủ</a><span class="sep">/</span>' +
          '<a href="../index.html">Dự án</a><span class="sep">/</span>' +
          '<span>' + da.ten_du_an + '</span>' +
        '</div>' +
        '<span class="badge badge-accent" style="margin-bottom:16px;">' + da.nganh + '</span>' +
        '<h1 style="font-size:32px; max-width:780px;">' + da.ten_du_an + '</h1>' +
        '<p class="body-lg" style="max-width:680px; margin:12px 0 32px;">Khách hàng: <strong style="color:#fff;">' + da.khach_hang + '</strong></p>' +
      '</div>' +
    '</section>' +
    '<section class="container" style="margin-bottom:48px;">' +
      '<div class="card" style="padding:0; overflow:hidden; border-radius:20px;">' +
        '<img src="' + da.anh + '" alt="' + da.anh_alt + '" style="width:100%; max-height:420px; object-fit:cover;">' +
      '</div>' +
    '</section>' +
    '<section class="container grid-2" style="margin-bottom:56px; gap:48px;">' +
      '<div>' +
        '<h2 class="h2" style="font-size:22px; margin-bottom:12px;">Thách thức</h2>' +
        '<p class="body-lg">' + da.thach_thuc + '</p>' +
      '</div>' +
      '<div>' +
        '<h2 class="h2" style="font-size:22px; margin-bottom:12px;">Giải pháp của KTP</h2>' +
        '<p class="body-lg">' + da.giai_phap + '</p>' +
      '</div>' +
    '</section>' +
    '<section class="section section-bg-surface" style="padding-top:48px;">' +
      '<div class="container">' +
        '<h2 class="h2" style="font-size:22px; margin-bottom:24px; text-align:center;">Kết quả đạt được</h2>' +
        '<div class="grid-3">' +
          da.ket_qua.map(function (kq, i) {
            var variant = ['stat-card--accent', 'stat-card--success', 'stat-card--warning'][i % 3];
            return '<div class="stat-card ' + variant + '"><div class="stat-card__value">' + kq.chi_so + '</div><div class="stat-card__label">' + kq.mo_ta.toUpperCase() + '</div></div>';
          }).join('') +
        '</div>' +
      '</div>' +
    '</section>' +
    (related.length ? (
      '<section class="section">' +
        '<div class="container">' +
          '<h2 class="h2" style="font-size:22px; margin-bottom:24px;">Dự án khác</h2>' +
          '<div class="grid-2">' +
            related.map(function (r) {
              return '<a class="card portfolio-card is-hoverable" href="index.html?slug=' + r.slug + '" style="display:block;">' +
                '<div class="portfolio-card__img"><img src="' + r.anh + '" alt="' + r.anh_alt + '" loading="lazy"></div>' +
                '<div class="portfolio-card__body"><span class="badge badge-accent">' + r.nganh + '</span><h3 class="h3" style="margin:12px 0 0; font-size:16px;">' + r.ten_du_an + '</h3></div>' +
                '</a>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</section>'
    ) : '');
})();
