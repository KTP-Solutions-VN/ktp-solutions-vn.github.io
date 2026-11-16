/* Dự án (danh sách) — render toàn bộ case study từ data layer dùng chung */
(function () {
  'use strict';
  var grid = document.getElementById('du-an-grid');
  if (!grid || typeof DATA_DU_AN === 'undefined') return;

  grid.innerHTML = DATA_DU_AN.map(function (da) {
    return '<a class="card portfolio-card is-hoverable reveal" href="chi-tiet/index.html?slug=' + da.slug + '" style="display:block;">' +
      '<div class="portfolio-card__img"><img src="' + da.anh + '" alt="' + da.anh_alt + '" loading="lazy"></div>' +
      '<div class="portfolio-card__body">' +
        '<span class="badge badge-accent">' + da.nganh + '</span>' +
        '<h3 class="h3" style="margin:12px 0 8px; font-size:17px;">' + da.ten_du_an + '</h3>' +
        '<p class="body-lg" style="font-size:14px;">' + da.tom_tat + '</p>' +
        '<div class="case-card__metric"><strong>' + da.ket_qua[0].chi_so + '</strong><span>' + da.ket_qua[0].mo_ta + '</span></div>' +
      '</div></a>';
  }).join('');
})();
