/* Blog (danh sách) — render toàn bộ bài viết từ data layer dùng chung */
(function () {
  'use strict';
  var grid = document.getElementById('blog-full-grid');
  if (!grid || typeof DATA_BAI_VIET === 'undefined') return;

  function formatDate(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  grid.innerHTML = DATA_BAI_VIET.map(function (bv) {
    return '<a class="card blog-card is-hoverable reveal" href="chi-tiet/index.html?slug=' + bv.slug + '" style="display:block;">' +
      '<div class="blog-card__img"><img src="' + bv.anh + '" alt="' + bv.anh_alt + '" loading="lazy"></div>' +
      '<div class="blog-card__body">' +
        '<span class="badge badge-info">' + bv.chu_de + '</span>' +
        '<h3 class="h3" style="margin:12px 0 8px; font-size:17px;">' + bv.tieu_de + '</h3>' +
        '<p class="body-lg" style="font-size:14px;">' + bv.tom_tat + '</p>' +
        '<div class="blog-card__meta"><span>' + formatDate(bv.ngay_dang) + '</span><span class="dot"></span><span>' + bv.thoi_gian_doc + ' phút đọc</span></div>' +
      '</div></a>';
  }).join('');
})();
