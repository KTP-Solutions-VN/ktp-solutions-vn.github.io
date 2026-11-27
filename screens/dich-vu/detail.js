/* Chi tiết dịch vụ — renderer dùng chung cho 4 trang dịch vụ triển khai, đọc dữ liệu từ DATA_DICH_VU
   Mỗi trang set biến CURRENT_SERVICE_SLUG trước khi include file này.
   (Trang "Tư vấn ứng dụng công nghệ" viết riêng, không dùng file này — icon compass giữ ở đây cho đồng bộ.) */
(function () {
  'use strict';
  var ICONS = {
    compass: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    code: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    layout: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="21"/></svg>',
    megaphone: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    palette: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".6"/><circle cx="17.5" cy="10.5" r=".6"/><circle cx="8.5" cy="7.5" r=".6"/><circle cx="6.5" cy="12.5" r=".6"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.2-.3-.4-.6-.4-1 0-.8.7-1.4 1.5-1.4H16c3.3 0 6-2.7 6-6 0-4.4-4-8-10-8z"/></svg>'
  };
  var ICON_BG = { compass: 'rgba(1,151,112,0.16)', code: 'rgba(76,95,255,0.16)', layout: 'rgba(124,136,255,0.16)', megaphone: 'rgba(245,165,36,0.16)', palette: 'rgba(170,1,36,0.16)' };
  var ICON_COLOR = { compass: 'var(--accent)', code: 'var(--primary)', layout: 'var(--text-strong)', megaphone: 'var(--warning)', palette: '#E0335A' };
  var CHECK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  // Điểm cuối của đường nối 4 bước (cột thứ 5 của .process-steps trên desktop)
  var PIPELINE_END = '<div class="process-pipeline-end" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none">' +
    '<circle cx="11" cy="13" r="8.5" fill="#e0393e"/><circle cx="11" cy="13" r="5.6" fill="#fbf1e2"/><circle cx="11" cy="13" r="2.4" fill="#e0393e"/>' +
    '<path d="M19 5L13.3 10.7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M11 13L14.86 12.26L11.74 9.14Z" fill="currentColor"/></svg></div>';

  var root = document.getElementById('service-detail');
  if (!root || typeof DATA_DICH_VU === 'undefined' || typeof CURRENT_SERVICE_SLUG === 'undefined') return;
  var dv = DATA_DICH_VU.find(function (d) { return d.slug === CURRENT_SERVICE_SLUG; });
  if (!dv) return;

  var en = KTP.en;
  root.innerHTML =
    '<section class="section" style="padding-top:24px;">' +
      '<div class="container grid-2" style="align-items:center; gap:48px;">' +
        '<div>' +
          '<div class="service-card__icon" style="width:64px; height:64px; background:' + ICON_BG[dv.icon] + '; color:' + ICON_COLOR[dv.icon] + '; margin-bottom:20px;">' + ICONS[dv.icon] + '</div>' +
          '<h1 style="font-size:36px; margin-bottom:16px;"' + en(dv.ten_en) + '>' + dv.ten + '</h1>' +
          '<p class="body-lg"' + en(dv.mo_ta_dai_en) + '>' + dv.mo_ta_dai + '</p>' +
        '</div>' +
        '<div class="card signature-glow-bg" style="padding:0; overflow:hidden;">' +
          '<div style="padding:32px;">' +
            '<span class="caption" data-en="Specific benefits">Lợi ích cụ thể</span>' +
            '<div style="margin-top:16px; display:flex; flex-direction:column; gap:14px;">' +
              dv.loi_ich.map(function (li, idx) {
                return '<div style="display:flex; gap:10px; align-items:flex-start;"><span style="color:var(--success); flex-shrink:0; margin-top:2px;">' + CHECK + '</span><span style="font-size:14.5px; color:var(--text-secondary);"' + en((dv.loi_ich_en || [])[idx]) + '>' + li + '</span></div>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +
    '<section class="section section-bg-surface reveal">' +
      '<div class="container">' +
        '<div class="section-header">' +
          '<span class="caption" data-en="Implementation process">Quy trình triển khai</span>' +
          '<h2 data-en="How KTP carries out this service step by step">Từng bước KTP thực hiện dịch vụ này</h2>' +
        '</div>' +
        // .reveal bắt buộc: trên desktop CSS ẩn nội dung từng bước tới khi .process-steps có is-visible (global.js gắn khi cuộn tới)
        '<div class="process-steps reveal">' +
          dv.quy_trinh.map(function (step, i) {
            return '<div class="process-step"><div class="process-step__num">0' + (i + 1) + '</div><p class="body-lg" style="font-size:14.5px;"' + en((dv.quy_trinh_en || [])[i]) + '>' + step + '</p></div>';
          }).join('') +
          PIPELINE_END +
        '</div>' +
      '</div>' +
    '</section>';
})();
