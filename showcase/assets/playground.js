/* Playground dự án — trang screens/du-an/playground/ (thuộc mục Dự án của website).
 * Dữ liệu: SHOWCASE trong showcase/playground-data.js (sinh bởi showcase/_tools/build_playground.py).
 * Trang HTML đặt window.PG_BASE (thư mục showcase/ chứa bản build prototype + ảnh bìa) và window.PG_PROJECTS (trang Dự án).
 * URL (query param để mỗi prototype là 1 trang riêng với title, description, canonical, JSON-LD riêng):
 *   ?app=<prototype>                     playground của 1 prototype (màn đầu: màn thật của sản phẩm)
 *   ?app=<prototype>&screen=<màn>        <màn> là đường dẫn trong thư mục prototype (CRM: route); canonical trỏ về ?app=<prototype>
 * Không có ?app → về trang Dự án (lọc lĩnh vực ở đó). Ngôn ngữ dùng chung key localStorage "ktp_lang" với website;
 * prototype có bản tiếng Anh riêng (p.en, VD Fleet) thì khung xem mở bản đó khi đang ở EN.
 */
(function () {
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
  const store = {
    get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* trình duyệt chặn lưu: bỏ qua */ } },
  };

  const T = {
    vi: {screensN: n => `${n} màn hình`, groupsN: n => `${n} phân hệ`, search: "Tìm màn hình…  ( / )",
      full: "Xem toàn màn hình (tab mới)", collapse: "Thu gọn danh sách màn", nextLabel: "Màn sau", screens: "Ẩn / hiện danh sách màn", collapseAll: "Thu gọn tất cả", expandAll: "Mở tất cả", back: "Tất cả dự án", prev: "Màn trước (←)", next: "Màn sau (→)", desktop: "Desktop 1440px", tablet: "Tablet 1024px",
      mobile: "Mobile 390px", reload: "Tải lại", copy: "Sao chép link màn này", copied: "Đã sao chép link",
      empty: "Không có màn nào khớp", projects: "Dự án",
      tryN: n => `Bấm thử ${n} màn hình ngay trên trình duyệt.`, demo: "Demo"},
    en: {screensN: n => `${n} screens`, groupsN: n => `${n} modules`, search: "Search screens…  ( / )",
      full: "Full screen (new tab)", collapse: "Collapse the screen list", nextLabel: "Next", screens: "Show / hide the screen list", collapseAll: "Collapse all", expandAll: "Expand all", back: "All projects", prev: "Previous screen (←)", next: "Next screen (→)", desktop: "Desktop 1440px", tablet: "Tablet 1024px",
      mobile: "Mobile 390px", reload: "Reload", copy: "Copy link to this screen", copied: "Link copied",
      empty: "No matching screens", projects: "Projects",
      tryN: n => `Try ${n} screens right in your browser.`, demo: "Demo"},
  };
  let lang = store.get("ktp_lang", "vi") === "en" ? "en" : "vi";
  const t = (k, ...a) => { const v = T[lang][k]; return typeof v === "function" ? v(...a) : v; };
  const L = o => (o && (o[lang] || o.vi || o.en)) || "";
  const st = s => typeof s.t === "string" ? s.t : L(s.t); // tên màn: chuỗi, hoặc {vi, en} (CRM)

  const {site: SITE, assets: ASSETS, projects: PROJECTS, domains: D, products: P} = SHOWCASE;
  const BASE = window.PG_BASE || "", PROJ = window.PG_PROJECTS || "../"; // đường dẫn tương đối từ trang playground
  const byId = Object.fromEntries(P.map(p => [p.id, p])), dom = Object.fromEntries(D.map(d => [d.slug, d]));
  const flat = p => p._flat || (p._flat = p.groups.flatMap(g => g.screens.map(s => ({...s, g}))));
  const pdir = p => p.dir + "/" + (lang === "en" && p.en ? p.en : ""); // prototype có bản tiếng Anh riêng (p.en, VD Fleet): mở bản đó khi đang xem EN
  const urlOf = (p, u) => BASE + pdir(p) + u;
  const key = s => s.u.replace(/^\?__p=/, ""); // giá trị ?screen=: đường dẫn màn (CRM: route, VD /jobs/kanban)
  const state = {p: null, i: 0, w: +store.get("pg.w", 1440), q: "", allOpen: null}; // allOpen: null = tự mở nhóm đang xem

  /* ---------------- URL ---------------- */
  function href(o) { // {app, screen} → URL tương đối của trang playground
    const q = new URLSearchParams();
    for (const k of ["app", "screen"]) if (o[k]) q.set(k, o[k]);
    const s = q.toString().replace(/%2F/g, "/");
    return s ? "?" + s : "./";
  }
  function parse() {
    const q = new URLSearchParams(location.search), p = byId[q.get("app")];
    if (p !== state.p) { state.q = ""; state.allOpen = null; }
    state.p = p || null;
    if (p) { const i = flat(p).findIndex(s => key(s) === q.get("screen")); state.i = i < 0 ? 0 : i; }
  }
  function nav(url, replace) { (replace ? history.replaceState : history.pushState).call(history, null, "", url); render(); scrollTo(0, 0); }
  function setScreenUrl(replace) {
    const u = href({app: state.p.id, screen: state.i ? key(flat(state.p)[state.i]) : ""});
    if (u !== location.search) (replace ? history.replaceState : history.pushState).call(history, null, "", u);
  }
  if (location.hash.startsWith("#/")) { // link cũ #/<prototype>/<màn>
    const h = decodeURIComponent(location.hash.slice(2)), k = h.indexOf("/");
    history.replaceState(null, "", href(byId[k < 0 ? h : h.slice(0, k)] ? {app: k < 0 ? h : h.slice(0, k), screen: k < 0 ? "" : h.slice(k + 1).replace(/^\?__p=/, "")} : {}));
  }
  document.addEventListener("click", e => { // link nội bộ có data-nav: đổi trang không tải lại
    const a = e.target.closest("a[data-nav]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault(); nav(a.getAttribute("href"));
  });
  addEventListener("popstate", render);

  /* ---------------- SEO: title, description, canonical, Open Graph, JSON-LD theo từng trang ---------------- */
  function setMeta(m) {
    document.title = m.title;
    const set = (sel, attr, val) => { let el = document.head.querySelector(sel); if (el) el.setAttribute(attr, val); };
    set('meta[name="description"]', "content", m.desc);
    set('link[rel="canonical"]', "href", m.url);
    set('meta[property="og:title"]', "content", m.title);
    set('meta[property="og:description"]', "content", m.desc);
    set('meta[property="og:url"]', "content", m.url);
    set('meta[property="og:image"]', "content", m.image);
    set('meta[name="keywords"]', "content", m.keywords.join(", "));
    $("#ld").textContent = JSON.stringify(m.ld);
  }
  const ORG = {"@type": "Organization", name: "KTP Solutions", url: "https://www.ktpsolutions.vn/"};
  const appLd = p => ({"@type": "SoftwareApplication", name: L(p.seo), alternateName: p.name, url: SITE + "?app=" + p.id,
    applicationCategory: "BusinessApplication", operatingSystem: "Web", description: L(p.desc), image: ASSETS + p.cover,
    keywords: dom[p.dom].keywords.join(", "), creator: ORG});
  const crumbs = items => ({"@type": "BreadcrumbList", itemListElement: items.map(([name, url], i) => ({"@type": "ListItem", position: i + 1, name, item: url}))});
  function meta() {
    const p = state.p, d = dom[p.dom], s = flat(p)[state.i], url = SITE + "?app=" + p.id;
    return {title: (state.i ? `${st(s)} · ` : "") + `${L(p.seo)} | ${t("demo")} · KTP Solutions`, desc: `${L(p.desc)} ${t("tryN", flat(p).length)}`,
      url, image: ASSETS + p.cover, keywords: d.keywords,
      ld: {"@context": "https://schema.org", "@graph": [appLd(p), crumbs([[t("projects"), PROJECTS], [L(d.name), PROJECTS + "?linh-vuc=" + d.slug], [L(p.seo), url]])]}};
  }

  /* ---------------- i18n ---------------- */
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-title]").forEach(el => { el.title = t(el.dataset.i18nTitle); el.setAttribute("aria-label", el.title); });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  }
  document.querySelector(".lang-toggle").addEventListener("click", e => { // nút VI/EN của header website (global.js lưu ktp_lang, đổi chữ data-en)
    const b = e.target.closest("button[data-lang]"); if (!b) return;
    lang = b.dataset.lang; applyLang(); render();
  });

  /* ---------------- playground ---------------- */
  function renderSide() {
    const p = state.p, q = state.q.trim().toLowerCase();
    $("#prod").innerHTML = `<i style="background:${p.accent}"></i><div><span>${KTP.domainIcon(p.dom)}<a href="${PROJ}?linh-vuc=${p.dom}">${esc(L(dom[p.dom].short))}</a> · ${esc(p.short)}</span><h1>${esc(L(p.seo))}</h1><small>${esc(p.name)}</small></div>`;
    $("#sideMeta").innerHTML = `<span>${t("screensN", flat(p).length)}</span><span><button type="button" data-all="0">${t("collapseAll")}</button> · <button type="button" data-all="1">${t("expandAll")}</button></span>`;
    let idx = 0, html = "";
    for (const g of p.groups) {
      const items = g.screens.map(s => ({s, i: idx++})).filter(({s}) => !q || st(s).toLowerCase().includes(q) || s.u.toLowerCase().includes(q));
      if (!items.length) continue;
      const open = q || (state.allOpen === null ? items.some(x => x.i === state.i) || p.groups.length <= 3 : state.allOpen);
      html += `<details class="pg-group"${open ? " open" : ""}><summary><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>${esc(L(g.name))}<span>${items.length}</span></summary>`
        + items.map(({s, i}) => `<a class="pg-item${i === state.i ? " is-active" : ""}" href="${href({app: p.id, screen: i ? key(s) : ""})}" data-i="${i}" title="${esc(st(s))}"><span>${esc(st(s))}</span></a>`).join("")
        + "</details>";
    }
    $("#list").innerHTML = html || `<p class="pg-empty">${t("empty")}</p>`;
    const act = $("#list .is-active"); if (act && !q) act.scrollIntoView({block: "nearest"});
  }

  function renderStage(reload) {
    const p = state.p, list = flat(p), s = list[state.i], url = urlOf(p, s.u);
    $("#crumbProduct").textContent = `${p.name} · ${L(s.g.name)}`;
    $("#crumbScreen").textContent = st(s);
    $("#pos").textContent = `${state.i + 1} / ${list.length}`;
    $("#prev").disabled = state.i === 0; $("#next").disabled = state.i === list.length - 1;
    $("#openNew").href = url;
    document.querySelectorAll("#devices button").forEach(b => b.classList.toggle("is-active", +b.dataset.w === state.w));
    const f = $("#frame");
    if (reload || f.dataset.src !== url) { f.dataset.src = url; $("#loading").classList.add("is-on"); f.src = url; }
    f.title = `${st(s)} · ${L(p.seo)}`;
    fit();
  }

  function fit() { // co khung thiết bị cho vừa vùng xem
    const vp = $("#viewport"), d = $("#device"), pad = 32, pager = 72; // pager: chừa chỗ cho cụm chuyển màn ở góc dưới
    const scale = Math.min(1, (vp.clientWidth - pad) / state.w);
    d.style.width = state.w + "px";
    d.style.height = (vp.clientHeight - pad / 2 - pager) / scale + "px";
    d.style.transform = `translateX(-50%) scale(${scale})`;
  }
  addEventListener("resize", () => { if (state.p) fit(); });
  if (window.ResizeObserver) new ResizeObserver(() => { if (state.p) fit(); }).observe($("#viewport")); // co giãn theo hiệu ứng thu gọn sidebar

  $("#frame").addEventListener("load", () => {
    $("#loading").classList.remove("is-on");
    try { // người xem bấm link trong prototype: đánh dấu màn tương ứng trong danh sách (cùng origin nên đọc được)
      const loc = $("#frame").contentWindow.location, base = new URL(BASE + pdir(state.p), location.href).pathname;
      if (!loc.pathname.startsWith(base)) return;
      let rel = loc.pathname.slice(base.length);
      if (state.p.id === "crm") rel = "?__p=/" + rel; // CRM: màn trong danh sách ghi dạng ?__p=/<route>
      const all = flat(state.p), withHash = all.findIndex(s => s.u === rel + loc.hash); // màn mở theo #hash (Fleet: driver-app.html#dr04)
      const i = withHash >= 0 ? withHash : all.findIndex(s => s.u === rel);
      if (i >= 0 && i !== state.i) { state.i = i; $("#frame").dataset.src = urlOf(state.p, flat(state.p)[i].u); setScreenUrl(true); renderSide(); renderStage(); setMeta(meta()); }
    } catch (e) { /* khác origin: bỏ qua */ }
  });

  /* ---------------- điều hướng ---------------- */
  function go(i) {
    const n = flat(state.p).length; if (i < 0 || i >= n) return;
    state.i = i; closeSide(); setScreenUrl(); renderSide(); renderStage(); setMeta(meta());
  }
  function render() {
    parse();
    if (!state.p) { location.replace(PROJ); return; } // không có ?app hợp lệ → trang Dự án
    $("#search").value = state.q; renderSide(); renderStage();
    setMeta(meta());
  }

  $("#list").addEventListener("click", e => { // chọn màn: không đi qua data-nav để giữ khung iframe
    const a = e.target.closest("[data-i]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault(); go(+a.dataset.i);
  });
  $("#search").addEventListener("input", e => { state.q = e.target.value; renderSide(); });
  $("#search").addEventListener("keydown", e => { // Enter: mở màn đầu tiên khớp
    if (e.key === "Enter") { const b = $("#list [data-i]"); if (b) go(+b.dataset.i); }
    if (e.key === "Escape") { e.target.value = state.q = ""; renderSide(); e.target.blur(); }
  });
  $("#prev").addEventListener("click", () => go(state.i - 1));
  $("#next").addEventListener("click", () => go(state.i + 1));
  $("#devices").addEventListener("click", e => { const b = e.target.closest("[data-w]"); if (b) { state.w = +b.dataset.w; store.set("pg.w", state.w); renderStage(); } });
  $("#reload").addEventListener("click", () => renderStage(true));
  $("#copy").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(location.href); toast(t("copied")); } catch (e) { prompt("", location.href); }
  });
  const openSide = () => $("#player").classList.add("side-open"), closeSide = () => $("#player").classList.remove("side-open");
  const narrow = () => matchMedia("(max-width: 960px)").matches;
  const setCollapsed = c => { $("#player").classList.toggle("side-collapsed", c); store.set("pg.side", c ? "0" : "1"); };
  document.body.classList.add("pg-noanim"); // trạng thái nhớ từ lần trước: áp ngay, không chạy hiệu ứng lúc tải trang
  setCollapsed(store.get("pg.side", "1") === "0");
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.remove("pg-noanim")));
  $("#sideToggle").addEventListener("click", () => narrow() ? openSide() : setCollapsed(!$("#player").classList.contains("side-collapsed")));
  $("#sideCollapse").addEventListener("click", () => narrow() ? closeSide() : setCollapsed(true));
  $("#sideMeta").addEventListener("click", e => { const b = e.target.closest("[data-all]"); if (b) { state.allOpen = b.dataset.all === "1"; renderSide(); } });
  $("#scrim").addEventListener("click", closeSide);
  addEventListener("keydown", e => {
    if (!state.p || e.metaKey || e.ctrlKey || e.altKey || /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (e.key === "ArrowLeft" || e.key === "[") { e.preventDefault(); go(state.i - 1); }
    else if (e.key === "ArrowRight" || e.key === "]") { e.preventDefault(); go(state.i + 1); }
    else if (e.key === "/") { e.preventDefault(); openSide(); $("#search").focus(); }
  });

  let toastT;
  function toast(msg) { const el = $("#toast"); el.textContent = msg; el.classList.add("is-on"); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("is-on"), 1800); }

  applyLang();
  render();
})();
