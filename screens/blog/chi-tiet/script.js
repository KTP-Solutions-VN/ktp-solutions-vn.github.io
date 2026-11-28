/* Chi tiết bài viết — đọc slug từ query string, render từ DATA_BAI_VIET dùng chung */
(function () {
  'use strict';
  var root = document.getElementById('bai-viet-detail');
  if (!root || typeof DATA_BAI_VIET === 'undefined') return;

  var en = KTP.en;

  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug');
  var bv = DATA_BAI_VIET.find(function (b) { return b.slug === slug; }) || DATA_BAI_VIET[0];

  if (!bv) {
    root.innerHTML = '<div class="container"><div class="empty-state">' +
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
      '<p data-en="Article not found.">Không tìm thấy bài viết này.</p><a class="btn btn-outline" href="../index.html" style="margin-top:16px;" data-en="Back to Blog">Quay lại Blog</a>' +
      '</div></div>';
    return;
  }

  function formatDate(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  document.getElementById('page-title').textContent = bv.tieu_de + ' — KTP Solutions';
  document.getElementById('page-desc').setAttribute('content', bv.tom_tat);
  document.getElementById('og-title').setAttribute('content', bv.tieu_de);
  document.getElementById('og-image').setAttribute('content', bv.anh);
  document.getElementById('article-jsonld').textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: bv.tieu_de,
    datePublished: bv.ngay_dang,
    author: { '@type': 'Organization', name: bv.tac_gia },
    image: bv.anh
  });

  var bodyHtml = bv.noi_dung.map(function (block) {
    var tag = block.loai === 'h2' || block.loai === 'blockquote' ? block.loai : 'p';
    return '<' + tag + en(block.text_en) + '>' + block.text + '</' + tag + '>';
  }).join('');

  var related = DATA_BAI_VIET.filter(function (b) { return b.slug !== bv.slug; }).slice(0, 3);

  root.innerHTML =
    '<article class="section" style="padding-top: calc(var(--header-h) + 40px); padding-bottom: var(--sp-16);">' +
      '<div class="container" style="max-width:760px;">' +
        '<div class="breadcrumb">' +
          '<a href="../../../index.html" data-en="Home">Trang chủ</a><span class="sep">/</span>' +
          '<a href="../index.html" data-en="Blog">Blog</a><span class="sep">/</span>' +
          '<span' + en(bv.tieu_de_en) + '>' + bv.tieu_de + '</span>' +
        '</div>' +
        '<span class="badge badge-info" style="margin-bottom:16px;"' + en(bv.chu_de_en) + '>' + bv.chu_de + '</span>' +
        '<h1 style="font-size:32px; margin-bottom:16px;"' + en(bv.tieu_de_en) + '>' + bv.tieu_de + '</h1>' +
        '<div class="blog-card__meta" style="margin-bottom:32px;"><span' + en(bv.tac_gia_en) + '>' + bv.tac_gia + '</span><span class="dot"></span><span>' + formatDate(bv.ngay_dang) + '</span><span class="dot"></span><span data-en="' + bv.thoi_gian_doc + ' min read">' + bv.thoi_gian_doc + ' phút đọc</span></div>' +
        '<div class="card" style="padding:0; overflow:hidden; margin-bottom:32px;"><img src="' + bv.anh + '" alt="' + bv.anh_alt + '" style="width:100%; max-height:400px; object-fit:cover;"></div>' +
        '<div class="article-body">' + bodyHtml + '</div>' +
        '<div style="margin-top:32px;"><a href="../index.html" class="btn btn-outline" data-en="Back to Blog">Quay lại Blog</a> <a href="../../lien-he/index.html" class="btn btn-primary" data-en="Book a free consultation">Đặt lịch tư vấn miễn phí</a></div>' +
      '</div>' +
    '</article>' +
    (related.length ? (
      '<section class="section section-bg-surface">' +
        '<div class="container">' +
          '<h2 class="h2" style="font-size:22px; margin-bottom:24px;" data-en="Related articles">Bài viết liên quan</h2>' +
          '<div class="grid-3">' +
            related.map(function (r) {
              return '<a class="card blog-card is-hoverable" href="index.html?slug=' + r.slug + '" style="display:block;">' +
                '<div class="blog-card__img"><img src="' + r.anh + '" alt="' + r.anh_alt + '" loading="lazy"></div>' +
                '<div class="blog-card__body"><span class="badge badge-info"' + en(r.chu_de_en) + '>' + r.chu_de + '</span><h3 class="h3" style="margin:12px 0 0; font-size:16px;"' + en(r.tieu_de_en) + '>' + r.tieu_de + '</h3></div>' +
                '</a>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</section>'
    ) : '');
})();
