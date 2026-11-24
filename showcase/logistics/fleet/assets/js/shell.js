/* Shared shell: icons, sidebar, topbar, formatters, toast, state switcher.
   Each screen: <body data-screen="FM_08"> ... <div id="app-content"> ... ; call Shell.mount({ active, title }) */
(function () {
  const P = {
    truck: '<path d="M3 6h11v9H3z"/><path d="M14 9h4l3 3v3h-7"/><circle cx="7" cy="17" r="1.8"/><circle cx="17" cy="17" r="1.8"/>',
    box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    container: '<rect x="2.5" y="6" width="19" height="12" rx="1"/><path d="M7 6v12M11.5 6v12M16 6v12"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5"/>',
    users: '<circle cx="9" cy="8" r="3"/><path d="M3 19c.8-3 3.2-4.5 6-4.5s5.2 1.5 6 4.5"/><path d="M16 5.5a3 3 0 010 5.5M18 14.5c1.5.6 2.6 2 3 4.5"/>',
    home: '<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>',
    dispatch: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9h18M8 4v16"/>',
    order: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 12h7M9 16h5"/>',
    map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M13 3v5h5"/>',
    wrench: '<path d="M14.5 6.5a4 4 0 00-5.2 5.2L4 17l3 3 5.3-5.3a4 4 0 005.2-5.2l-2.6 2.6-2.4-.6-.6-2.4z"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="1.5"/><path d="M3 10h18M16 14.5h2"/>',
    receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
    import: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5"/><path d="M4 16v4h16v-4"/>',
    invoice: '<path d="M6 3h12v18H6z"/><path d="M9 7h6M9 11h6M9 15h3"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8" r="1.3"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1"/>',
    bell: '<path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 004 0"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    chevron: '<path d="M7 10l5 5 5-5"/>',
    'chevron-right': '<path d="M10 7l5 5-5 5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    warn: '<path d="M12 4l9.5 16h-19z"/><path d="M12 10v4.5M12 17.5v.01"/>',
    block: '<circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="1.5"/><path d="M8 10.5V8a4 4 0 018 0v2.5"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.01"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>',
    tray: '<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1.5 2.5h5L16 13h5"/>',
    formula: '<path d="M4 6h7M7.5 6v12M14 9l6 6M20 9l-6 6"/>',
    pen: '<path d="M4 20l1-4 11-11 3 3-11 11z"/>',
    camera: '<path d="M4 8h3.5l1.5-2.5h6L16.5 8H20v11H4z"/><circle cx="12" cy="13.5" r="3.5"/>',
    fuel: '<path d="M5 20V5h9v15M3.5 20h12M5 10h9"/><path d="M14 8l3 2v7a1.5 1.5 0 003 0V9l-3-3"/>',
    toll: '<path d="M4 20V9M4 9h16v3H4"/><path d="M8 12l3 8M14 12l3 8"/>',
    route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7a3 3 0 000-6H9a3 3 0 010-6h7"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    drag: '<path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="1.5"/><path d="M16 8V4H4v12h4"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
    undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 010 12h-3"/>',
    download: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M4 20h16"/>',
    filter: '<path d="M4 5h16l-6 7.5V19l-4-2v-4.5z"/>',
    refresh: '<path d="M20 11a8 8 0 10-2.3 5.7M20 5v6h-6"/>',
    branch: '<path d="M4 20V8l8-4 8 4v12"/><path d="M9 20v-6h6v6"/>',
    sparkle: '<path d="M12 4v4M12 16v4M4 12h4M16 12h4"/>',
    shield: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z"/><path d="M8.8 12l2.2 2.2 4.2-4.4"/>',
    book: '<path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z"/><path d="M5 17a3 3 0 013-3h11"/>',
    pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    qr: '<rect x="4" y="4" width="6" height="6" rx=".5"/><rect x="14" y="4" width="6" height="6" rx=".5"/><rect x="4" y="14" width="6" height="6" rx=".5"/><path d="M14 14h2.5v2.5H14zM17.5 17.5H20V20h-2.5zM14 20h1M20 14v1"/>',
    coins: '<ellipse cx="9" cy="7" rx="5.5" ry="2.5"/><path d="M3.5 7v4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V7"/><path d="M9.5 16.4c.9 1.2 3 2.1 5.5 2.1 3 0 5.5-1.1 5.5-2.5v-4c0-1.2-1.8-2.2-4.3-2.4"/>',
    gauge: '<path d="M4 17a8 8 0 1116 0"/><path d="M12 17l4-5"/><path d="M4 17h16"/>',
    link: '<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
    upload: '<path d="M12 16V5M7.5 9.5L12 5l4.5 4.5M4 20h16"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',
    more: '<path d="M6 12h.01M12 12h.01M18 12h.01"/>',
    dot: '<circle cx="12" cy="12" r="3"/>'
  };
  function icon(name, cls) { return `<svg class="icon ${cls || ''}" viewBox="0 0 24 24" aria-hidden="true">${P[name] || P.dot}</svg>`; }

  const fmt = {
    vnd(n, opts) { if (n == null || isNaN(n)) return '—'; const neg = n < 0; const s = Math.abs(Math.round(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return (neg ? '−' : '') + s + (opts && opts.bare ? '' : ' đ'); },
    short(n) { const a = Math.abs(n), neg = n < 0 ? '−' : ''; if (a >= 1e9) return neg + (a / 1e9).toFixed(2).replace('.', ',') + ' tỷ'; if (a >= 1e6) return neg + (a / 1e6).toFixed(1).replace('.', ',') + ' tr'; return fmt.vnd(n); },
    dec(n, d) { return (n == null ? '—' : n.toFixed(d == null ? 1 : d).replace('.', ',')); },
    pct(n) { return (n < 0 ? '−' : '') + Math.abs(n).toFixed(1).replace('.', ',') + '%'; }
  };

  const NAV = [
    ['Tổng quan', [['home', 'Tổng quan', 'fm-04-tong-quan.html', 'FM_04'], ['bell', 'Cảnh báo', 'fm-05-canh-bao.html', 'FM_05', 12]]],
    ['Vận hành', [['order', 'Đơn vận chuyển', 'fm-06-don-van-chuyen.html', 'FM_06'], ['dispatch', 'Điều phối', 'fm-08-dieu-phoi.html', 'FM_08'], ['qr', 'Giấy vận tải', 'fm-11-giay-van-tai.html', 'FM_11'], ['map', 'Bản đồ giám sát', 'fm-12-ban-do.html', 'FM_12'], ['clock', 'Giờ lái & an toàn', 'fm-13-gio-lai.html', 'FM_13']]],
    ['Đội xe', [['truck', 'Xe & rơ-moóc', 'fm-14-xe.html', 'FM_14'], ['users', 'Tài xế', 'fm-16-tai-xe.html', 'FM_16'], ['doc', 'Giấy tờ & hạn', 'fm-18-giay-to.html', 'FM_18', 10], ['wrench', 'Bảo dưỡng', 'fm-19-bao-duong.html', 'FM_19']]],
    ['Tài chính', [['wallet', 'Tạm ứng', 'fm-21-tam-ung.html', 'FM_21'], ['receipt', 'Quyết toán', 'fm-22-quyet-toan.html', 'FM_22', 38], ['import', 'Import chi phí', 'fm-23-import-chi-phi.html', 'FM_23'], ['coins', 'Lương chuyến', 'fm-25-luong-chuyen.html', 'FM_25'], ['invoice', 'Hoá đơn', 'fm-26-hoa-don.html', 'FM_26'], ['book', 'Công nợ', 'fm-27-cong-no.html', 'FM_27']]],
    ['Giá cước', [['tag', 'Bảng giá cước', 'fm-29-bang-gia.html', 'FM_29'], ['formula', 'Dự toán giá thành', 'fm-31-du-toan.html', 'FM_31'], ['route', 'Tuyến đường', 'fm-28-tuyen-duong.html', 'FM_28'], ['fuel', 'Tham số & giá dầu', 'fm-30-tham-so.html', 'FM_30']]],
    ['Báo cáo', [['chart', 'Lãi/lỗ (P&L)', 'fm-35-bao-cao-pl.html', 'FM_35'], ['gauge', 'Vận hành', 'fm-36-bao-cao-van-hanh.html', 'FM_36'], ['shield', 'Tuân thủ', 'fm-37-bao-cao-tuan-thu.html', 'FM_37']]],
    ['Hệ thống', [['pin', 'Danh mục', 'fm-32-danh-muc.html', 'FM_32'], ['gear', 'Cài đặt', 'fm-38-thanh-vien.html', 'FM_38'], ['phone', 'App tài xế (demo)', 'driver-app.html', 'DR']]]
  ];
  const ROLES = ['Chủ DN / Admin', 'Điều độ', 'Kế toán', 'QL đội xe'];

  function role() { try { return localStorage.getItem('fm.role') || 'Điều độ'; } catch (e) { return 'Điều độ'; } }

  function mount(opts) {
    const body = document.body;
    const content = document.getElementById('app-content');
    const nav = NAV.map(([g, items]) => `<div class="nav-group">${g}</div>` + items.map(([ic, label, href, id, count]) => {
      const cls = (id === opts.active ? 'active' : '') + (href ? '' : ' disabled');
      const h = href ? href : 'javascript:void(0)';
      const title = href ? label : label + ' — chưa có trong prototype';
      return `<a class="${cls}" href="${h}" title="${title}" ${id === opts.active ? 'aria-current="page"' : ''}>${icon(ic, 'lg')}<span>${label}</span>${count ? `<span class="count">${count}</span>` : ''}</a>`;
    }).join('')).join('');
    const r = role();
    const shell = document.createElement('div');
    shell.className = 'app';
    shell.innerHTML = `
      <aside class="sidebar" aria-label="Menu chính">
        <a class="brand" href="../index.html" style="text-decoration:none"><span class="brand-mark">${icon('truck')}</span><span>Đội Xe<small>Fleet Management</small></span></a>
        <nav class="nav">${nav}</nav>
      </aside>
      <div class="main">
        <header class="topbar">
          <button class="branch-select" id="branchSel" aria-label="Chọn chi nhánh">${icon('branch')} Chi nhánh: TP.HCM ${icon('chevron')}</button>
          <label class="search-global">${icon('search')}<input id="gsearch" type="search" placeholder="Tìm mã chuyến, số container, biển số…" aria-label="Tìm kiếm toàn cục"></label>
          <span class="spacer"></span>
          <button class="icon-btn" aria-label="Cảnh báo, 12 chưa xử lý" title="Cảnh báo">${icon('bell', 'lg')}<span class="dot">12</span></button>
          <label class="sr-only" for="roleSel">Xem với vai trò</label>
          <span class="select-wrap"><select class="role-select" id="roleSel" title="Xem với vai trò (chỉ có trong prototype)">${ROLES.map(x => `<option ${x === r ? 'selected' : ''}>${x}</option>`).join('')}</select>${icon('chevron')}</span>
          <span class="user-chip"><span class="avatar">${r === 'Kế toán' ? 'MH' : r === 'Chủ DN / Admin' ? 'HV' : r === 'QL đội xe' ? 'PT' : 'LN'}</span></span>
        </header>
        <main class="content" id="main"></main>
      </div>`;
    body.insertBefore(shell, body.firstChild);
    document.getElementById('main').appendChild(content);
    content.style.display = 'contents';
    document.getElementById('roleSel').addEventListener('change', e => { try { localStorage.setItem('fm.role', e.target.value); } catch (x) {} location.reload(); });
    if (!document.getElementById('toastHost')) { const t = document.createElement('div'); t.className = 'toast-host'; t.id = 'toastHost'; t.setAttribute('aria-live', 'polite'); body.appendChild(t); }
    document.title = (opts.title || 'Đội Xe') + ' · Đội Xe';
    const tb = document.querySelector('.topbar'); const onScroll = () => tb && tb.classList.toggle('scrolled', scrollY > 4); addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const mainEl = document.getElementById('main'); if (mainEl && !reduced()) { mainEl.classList.add('enter'); setTimeout(() => mainEl.classList.remove('enter'), 700); }
  }

  function toast(msg, opts) {
    opts = opts || {};
    let host = document.getElementById('toastHost');
    if (!host) { host = document.createElement('div'); host.className = 'toast-host'; host.id = 'toastHost'; host.setAttribute('aria-live', 'polite'); document.body.appendChild(host); }
    const el = document.createElement('div');
    el.className = 'toast';
    let left = opts.undo ? 10 : 0;
    el.innerHTML = `<span>${msg}</span>` + (opts.undo ? `<button type="button">Hoàn tác (<span class="cd">${left}</span>)</button>` : '');
    host.appendChild(el);
    let timer;
    const close = () => { clearInterval(timer); dismiss(el); };
    if (opts.undo) {
      el.querySelector('button').addEventListener('click', () => { close(); opts.undo(); toast('Đã hoàn tác'); });
      timer = setInterval(() => { left--; const c = el.querySelector('.cd'); if (c) c.textContent = left; if (left <= 0) close(); }, 1000);
    } else { setTimeout(close, 3200); }
  }

  /* Prototype-only state switcher: states = [['default','Mặc định'], ...], onChange(state) */
  function states(list, onChange, initial) {
    const bar = document.createElement('div');
    bar.className = 'proto-bar';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Xem trạng thái màn hình (prototype)');
    let cur = initial || (location.hash.slice(1) || list[0][0]);
    if (!list.some(s => s[0] === cur)) cur = list[0][0];
    bar.innerHTML = '<b>State</b>' + list.map(([k, l]) => `<button type="button" data-k="${k}" aria-pressed="${k === cur}">${l}</button>`).join('');
    document.body.appendChild(bar);
    bar.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      cur = b.dataset.k; bar.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x.dataset.k === cur));
      history.replaceState(null, '', '#' + cur); onChange(cur); flash(document.getElementById('main'), 'swap');
    });
    onChange(cur);
    return { set(k) { const b = bar.querySelector(`[data-k="${k}"]`); if (b) b.click(); } };
  }


  /* ---------- Motion helpers (DESIGN.md §9 v1.2) ---------- */
  const reduced = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };
  // Animate an overlay out, then remove it. Works for .drawer, .modal, .scrim, .toast
  function dismiss(el) {
    if (!el || !el.isConnected) return;
    if (reduced()) { el.remove(); return; }
    el.classList.add('leaving');
    let done = false; const fin = () => { if (!done) { done = true; el.remove(); } };
    el.addEventListener('animationend', fin, { once: true }); setTimeout(fin, 320);
  }
  // Sliding thumb for every .seg (also ones rendered later)
  function placeThumb(seg) {
    const on = seg.querySelector('button[aria-pressed="true"]'); const th = seg.querySelector(':scope > .seg-thumb');
    if (!th) return; if (!on) { th.style.opacity = '0'; return; }
    th.style.opacity = '1'; th.style.width = on.offsetWidth + 'px'; th.style.transform = `translateX(${on.offsetLeft}px)`;
  }
  function setupSeg(seg) {
    if (seg.classList.contains('has-thumb')) { placeThumb(seg); return; }
    const th = document.createElement('span'); th.className = 'seg-thumb'; th.setAttribute('aria-hidden', 'true');
    seg.prepend(th); seg.classList.add('has-thumb');
    th.style.transition = 'none'; placeThumb(seg); th.offsetWidth; th.style.transition = '';
  }
  function scanSegs(root) { (root.querySelectorAll ? root : document).querySelectorAll('.seg').forEach(setupSeg); }
  const mo = new MutationObserver(muts => {
    for (const m of muts) {
      if (m.type === 'attributes' && m.target.matches && m.target.matches('.seg > button')) placeThumb(m.target.parentElement);
      if (m.type === 'childList') m.addedNodes.forEach(n => { if (n.nodeType === 1) { if (n.matches('.seg')) setupSeg(n); scanSegs(n); } });
    }
  });
  function startMotion() {
    scanSegs(document);
    mo.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['aria-pressed'] });
    addEventListener('resize', () => document.querySelectorAll('.seg.has-thumb').forEach(placeThumb));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => document.querySelectorAll('.seg.has-thumb').forEach(placeThumb));
  }
  // Count numbers up from 0 (first number in each element). Vietnamese decimal comma kept.
  function countUp(els, ms) {
    if (reduced()) return; ms = ms || 600;
    els.forEach(el => {
      const node = [...el.childNodes].find(n => n.nodeType === 3 && /\d/.test(n.nodeValue)); if (!node) return;
      const raw = node.nodeValue; const m = raw.match(/(\d+(?:[.,]\d+)?)/); if (!m) return;
      const dec = m[1].includes(',') ? m[1].split(',')[1].length : 0; const target = parseFloat(m[1].replace('.', '').replace(',', '.'));
      if (!(target > 0)) return; const t0 = performance.now();
      const step = now => { const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3);
        node.nodeValue = raw.replace(m[1], (target * e).toFixed(dec).replace('.', ',')); if (k < 1) requestAnimationFrame(step); else node.nodeValue = raw; };
      requestAnimationFrame(step);
    });
  }
  function flash(el, cls) { if (!el || reduced()) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), 400); }
  window.Shell = { icon, fmt, mount, toast, states, role, dismiss, countUp, flash };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startMotion); else startMotion();
})();
