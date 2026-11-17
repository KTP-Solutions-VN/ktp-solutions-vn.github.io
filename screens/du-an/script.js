/* Dự án (danh sách) — render toàn bộ dự án từ data layer dùng chung (DATA_DU_AN = các prototype trong showcase/).
 * Chữ song ngữ: VI trong nội dung, EN ở data-en (KTP.en), badge lĩnh vực có icon (KTP.domainBadge) — helper ở assets/js/global.js */
(function () {
  'use strict';
  var grid = document.getElementById('du-an-grid');
  if (!grid || typeof DATA_DU_AN === 'undefined') return;
  var ROOT = '../../';
  var url = function (u) { return /^https?:/.test(u) ? u : ROOT + u; }; // ảnh / link trong data tính từ gốc website

  // Lọc theo lĩnh vực: ?linh-vuc=hospitality | industrial | healthcare (chip + khối nội dung render sẵn trong index.html)
  var lv = new URLSearchParams(location.search).get('linh-vuc');
  var LV = { hospitality: ['Phần mềm quản lý khách sạn, resort, villa — dự án & demo', 'Hotel, resort & villa management software — projects & demos'],
             industrial: ['Phần mềm CRM doanh nghiệp B2B, công nghiệp — dự án & demo', 'B2B & industrial CRM software — projects & demos'],
             healthcare: ['Phần mềm y tế: bán hàng bệnh viện, phòng khám, POS nhà thuốc — dự án & demo', 'Healthcare software: hospital e-commerce, pharmacy POS — projects & demos'] };
  if (!LV[lv]) lv = '';
  document.querySelectorAll('#du-an-chips [data-linh-vuc]').forEach(function (c) { c.classList.toggle('is-active', c.getAttribute('data-linh-vuc') === lv); });
  document.querySelectorAll('#du-an-domains [data-linh-vuc]').forEach(function (b) { b.hidden = !!lv && b.getAttribute('data-linh-vuc') !== lv; });
  if (lv) {
    var en = (function () { try { return localStorage.getItem('ktp_lang') === 'en'; } catch (e) { return false; } })();
    document.title = LV[lv][en ? 1 : 0] + ' | KTP Solutions';
    var d = document.querySelector('#du-an-domains [data-linh-vuc="' + lv + '"] .body-lg');
    var meta = document.querySelector('meta[name="description"]');
    if (d && meta) meta.setAttribute('content', d.textContent);
  }

  grid.innerHTML = DATA_DU_AN.filter(function (da) { return !lv || da.linh_vuc === lv; }).map(function (da) {
    var detail = 'chi-tiet/index.html?slug=' + da.slug, kq = da.ket_qua[0];
    return '<article class="card portfolio-card has-acts is-hoverable reveal">' +
      '<a class="portfolio-card__img" href="' + detail + '"><img src="' + url(da.anh) + '" alt="' + da.anh_alt + '" loading="lazy"></a>' +
      '<div class="portfolio-card__body">' +
        KTP.domainBadge(da, 'align-self:flex-start;') +
        '<h3 class="h3 portfolio-card__title" style="margin:12px 0 8px; font-size:17px;"><a href="' + detail + '"' + KTP.en(da.ten_du_an_en) + '>' + da.ten_du_an + '</a></h3>' +
        '<p class="body-lg" style="font-size:14px;"' + KTP.en(da.tom_tat_en) + '>' + da.tom_tat + '</p>' +
        '<div class="case-card__metric"><strong' + KTP.en(kq.chi_so_en) + '>' + kq.chi_so + '</strong><span' + KTP.en(kq.mo_ta_en) + '>' + kq.mo_ta + '</span></div>' +
        '<div class="case-card__acts">' +
          '<a class="btn btn-outline" href="' + detail + '" data-en="Details">Xem chi tiết</a>' +
          (da.playground ? '<a class="btn btn-primary" href="' + url(da.playground) + '" data-en="Try the playground">Playground bản mẫu</a>' : '') +
        '</div>' +
      '</div></article>';
  }).join('');
})();
