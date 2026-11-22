/* Dịch vụ (tổng quan) — render đầy đủ 5 dịch vụ từ data layer dùng chung */
(function () {
  'use strict';
  var ICONS = {
    compass: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    code: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    layout: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="21"/></svg>',
    megaphone: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    palette: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".6"/><circle cx="17.5" cy="10.5" r=".6"/><circle cx="8.5" cy="7.5" r=".6"/><circle cx="6.5" cy="12.5" r=".6"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.2-.3-.4-.6-.4-1 0-.8.7-1.4 1.5-1.4H16c3.3 0 6-2.7 6-6 0-4.4-4-8-10-8z"/></svg>'
  };
  var ICON_BG = { compass: 'rgba(1,151,112,0.16)', code: 'rgba(76,95,255,0.16)', layout: 'rgba(124,136,255,0.16)', megaphone: 'rgba(245,165,36,0.16)', palette: 'rgba(170,1,36,0.16)' };
  var ICON_COLOR = { compass: 'var(--accent)', code: 'var(--primary)', layout: 'var(--text-strong)', megaphone: 'var(--warning)', palette: '#E0335A' };
  var CHECK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  var list = document.getElementById('dich-vu-full-list');
  if (!list || typeof DATA_DICH_VU === 'undefined') return;

  list.innerHTML = DATA_DICH_VU.map(function (dv) {
    return '<div class="dv-row reveal">' +
      '<div class="dv-row__icon" style="background:' + ICON_BG[dv.icon] + '; color:' + ICON_COLOR[dv.icon] + ';">' + ICONS[dv.icon] + '</div>' +
      '<div>' +
        '<h2 class="h2" style="font-size:24px; margin-bottom:8px;"' + KTP.en(dv.ten_en) + '>' + dv.ten + '</h2>' +
        '<p class="body-lg"' + KTP.en(dv.mo_ta_ngan_en) + '>' + dv.mo_ta_ngan + '</p>' +
        '<div class="dv-row__benefits">' +
          dv.loi_ich.slice(0, 4).map(function (li, i) {
            return '<div class="dv-row__benefit">' + CHECK + '<span' + KTP.en((dv.loi_ich_en || [])[i]) + '>' + li + '</span></div>';
          }).join('') +
        '</div>' +
        '<a class="btn btn-outline" href="' + dv.slug + '/index.html" data-en="View service details">Xem chi tiết dịch vụ</a>' +
      '</div>' +
    '</div>';
  }).join('');
})();
