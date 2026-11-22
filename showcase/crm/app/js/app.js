/* Apex Industrial CRM prototype v0.3
 * Luồng: route → lấy dữ liệu qua API (js/api.js) → dựng view-model → render template HTML (templates/*.html, Handlebars).
 * Không viết cứng nội dung: chữ ở i18n/*.json, cấu trúc ở mock-api/meta, dữ liệu ở mock-api/data, bố cục ở templates/.
 */
const S = {lang: "en", tenant: "APE", team: "crm", user: null, annot: false, app: null, ent: {}, T: {}, shot: false};
const $ = s => document.querySelector(s);
const BASE = window.APP_BASE || ""; // tiền tố đường dẫn khi app nằm ở thư mục con (xem index.html)
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
const t = (k, v) => { let s = S.T[k] ?? k; if (v) for (const [a, b] of Object.entries(v)) s = s.replaceAll("{" + a + "}", b); return s; };
const L = o => o == null ? "" : typeof o === "string" ? o : (o[S.lang] ?? o.vi ?? o.en ?? "");
const nRec = n => t(n === 1 ? "list.count1" : "list.count", {n});
const VT = {"Đọc / sửa / xoá": "Read / edit / delete", "Đọc / sửa": "Read / edit", "Tất cả user": "All users"}; // giá trị lấy nguyên từ cấu hình hiện tại (đã ghi bằng tiếng Việt)
const vt = s => S.lang === "vi" ? s : VT[s] ?? s;
const ic = (n, c) => `<svg class="i${c ? " " + c : ""}"><use href="#i-${n}"/></svg>`;
const fa = id => {
  if (S.lang !== "vi" || !id || !S.app.features[id]) return "";
  const f = S.app.features[id];
  return ` data-f="${id}" data-p="${f.p}" title="${id} · ${esc(f.n)} (${f.p})"`;
};
const AVC = ["#4C5FFF", "#7B5EA7", "#2F8F83", "#C2662D", "#3F6E9E", "#9C4F7A"];
function av(name, big) {
  name = String(name || "?");
  const ini = name.split(/[\s.,]+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 997;
  return `<span class="av${big ? "" : " s"}" style="background:${AVC[h % AVC.length]}">${esc(ini)}</span>`;
}
function toast(m) { const e = $("#toast"); e.textContent = m; e.classList.add("show"); clearTimeout(e._h); e._h = setTimeout(() => e.classList.remove("show"), 2600); }
const CUR_SYM = {AUD: "A$", SGD: "S$"};
const curSym = tn => CUR_SYM[((S.app && S.app.tenants.find(x => x.code === (tn || S.tenant))) || {}).currency] || "A$"; // tiền tệ của pháp nhân (tenants.json); Group View → A$ (tiền tệ tập đoàn)
const money = (v, tn) => v == null || v === "" ? "" : curSym(tn) + " " + Number(v).toLocaleString("en-AU", Number(v) % 1 ? {minimumFractionDigits: 2, maximumFractionDigits: 2} : {}); // tn: pháp nhân của bản ghi (mặc định pháp nhân đang chọn); có số lẻ thì luôn 2 chữ số
const dmy = v => { if (!v) return ""; const [d, tm] = String(v).split("T"); const [y, m, dd] = d.split("-"); return `${dd}/${m}/${y}${tm ? " " + tm : ""}`; };
const tenantOf = code => S.app.tenants.find(x => x.code === code) || S.app.tenants[0];
const me = () => S.app.users.find(u => u.id === S.user);
/* khối thông tin chính ở đầu màn chi tiết: field quan trọng nhất của từng module (tách khỏi cột danh sách) */
const HIGHLIGHT = {"tasks": ["Due_Date", "Priority", "Status", "Owner"], "vehicles": ["Account_Name", "Equipment_Type", "Brand", "LM_Expiry_Date", "NEA_Expiry_Date", "Warr_Expiry_Date"], "contacts": ["Account_Name", "Title", "Mobile", "Email", "Owner"], "leads": ["Company", "Lead_Source", "Equipment_Type", "Lead_Status", "Owner"], "install": ["Account_Name", "Equipment_Type", "Status", "Delivery_Date", "Owner"], "invoices": ["Account_Name", "Invoice_Date", "Grand_Total", "Status"], "partsreq": ["Service_Repairs_Certs", "Date", "Owner"], "orders": ["Account_Name", "Division_Billing", "Grand_Total", "Status", "Delivery_Date"], "quotes": ["Account_Name", "Grand_Total", "Equipment_Type", "Date1", "Owner"], "products": ["Product_Code", "Product_Category", "Unit_Price", "Qty_in_Stock", "Location_Store_Rack_Shelf"], "vendors": ["Vendor_Code", "Category", "Credit_Terms", "Phone", "Email"], "jobs": ["Account", "Vehicle_Number", "Service_Type", "Priority", "Status", "Owner"], "accounts": ["Debtor_Code", "Credit_Term", "Region", "Phone", "Owner"], "nea": ["Account_Name", "Vehicle_License_Number", "Hooklift_Brand", "Owner"], "pr": ["Vendor", "Requestor_Name", "Date_of_Request", "Form_Status", "Owner"], "si": ["Requestor_Name", "Account_Name", "Request_Date", "Status"], "deals": ["Account_Name", "New_After_Sales", "Amount", "Stage", "Closing_Date", "Owner"], "tickets": ["Account_Name", "Case_Type", "Priority", "Status", "Owner"]};
/* cột hệ thống có trong list view (Created Time, Modified Time, Tag): thêm field ảo đọc từ _created / _modified / _tags */
const SYS_FIELDS = {Created_Time: {label: "Created Time", type: "datetime", src: "_created"}, Modified_Time: {label: "Modified Time", type: "datetime", src: "_modified"}, Tag: {label: "Tag", type: "text", src: "_tags"}};
const cellVal = (r, c) => { const sf = SYS_FIELDS[c]; if (!sf || r[c] != null) return r[c]; const v = r[sf.src] ?? (c === "Modified_Time" ? r._created : null); return Array.isArray(v) ? v.join(", ") : v; };
async function E(k) {
  if (!S.ent[k]) { S.ent[k] = await API.entity(k); for (const c of S.ent[k].list) if (SYS_FIELDS[c] && !S.ent[k].fields[c]) S.ent[k].fields[c] = {...SYS_FIELDS[c], sys: true}; }
  return S.ent[k];
}
const toneColor = tone => ({ok: "ok", bad: "bad", warn: "warn"})[tone] || "pri";

/* ---------------- template ---------------- */
const TPL = {};
function tpl(name) {
  if (!TPL[name]) TPL[name] = fetch(`${BASE}/templates/${name}.html`).then(r => r.text()).then(src => Handlebars.compile(src));
  return TPL[name];
}
async function render(name, data) { return (await tpl(name))(data).replace(/href="(\/[ep]\/[^"]*)"/g, (m, u) => `href="${toPublic(u.replace(/&amp;/g, "&"))}"`); } // link nội bộ → URL gọn
function helpers() {
  const H = Handlebars, safe = s => new H.SafeString(s);
  H.registerHelper("t", (k, o) => t(k, o && o.hash));
  H.registerHelper("ic", (n, c) => safe(ic(n, typeof c === "string" ? c : "")));
  H.registerHelper("fa", id => safe(typeof id === "string" ? fa(id) : ""));
  H.registerHelper("av", (n, big) => safe(av(n, big === true)));
  H.registerHelper("eq", (a, b) => a === b);
  H.registerHelper("inc", i => i + 1);
}

/* ---------------- định dạng giá trị field (HTML cho ô / giá trị) ---------------- */
function pill(state, m) {
  if (state == null || state === "") return `<span class="empty">—</span>`;
  return `<span class="pill p-${(m && m.tones && m.tones[state]) || "info"}">${esc(state)}</span>`;
}
function fmt(fd, v, m, api, tn) { // tn: pháp nhân của bản ghi (ký hiệu tiền)
  if (v == null || v === "" || (Array.isArray(v) && !v.length)) return `<span class="empty">—</span>`;
  if (m && api && api === m.status) return pill(v, m);
  switch (fd && fd.type) {
    case "lookup": {
      const k = Object.keys(S.app.entities).find(x => S.app.entities[x].api === fd.lookup);
      return k ? `<a href="/e/${k}/${v.id}">${esc(v.name)}</a>` : esc(v.name);
    }
    case "user": return `<span class="who">${av(v)}${esc(v)}</span>`;
    case "currency": return money(v, tn);
    case "date": case "datetime": return dmy(v);
    case "checkbox": return v ? t("yes") : t("no");
    case "multipicklist": return [].concat(v).map(x => `<span class="chip">${esc(x)}</span>`).join("");
    default: return esc(typeof v === "object" ? v.name ?? JSON.stringify(v) : v);
  }
}
const titleOf = (m, r) => r._title || m.title.map(f => r[f]).join(" ");
const subOf = (m, r) => { const v = r[m.subtitle]; return v && v.name ? v.name : (v ?? ""); };
const btnHtml = (label, icon, onclick, pri, feat) => `<button class="btn${pri ? " pri" : ""}"${fa(feat)} onclick="${onclick}">${icon ? ic(icon, "sm") : ""}${esc(label)}</button>`;
function barItems(pairs, asMoney, colorOf, hrefOf) {
  const max = Math.max(1, ...pairs.map(p => p[1]));
  return pairs.map(([label, v, count]) => ({label, width: Math.max(2, v / max * 70), value: asMoney ? money(Math.round(v)) : v, count, color: colorOf ? colorOf(label) : "", // thanh dài nhất = 70% nền, phần còn lại để ghi số
    href: hrefOf && label !== "—" ? hrefOf(label) : ""}));
}
/* link tới danh sách đã lọc theo 1 giá trị (bấm trên chart); _tenant → chuyển pháp nhân */
const drill = (k, f) => v => f === "_tenant" ? `/e/${k}?tenant=${encodeURIComponent(v)}` : `/e/${k}?f=${encodeURIComponent(f)}&v=${encodeURIComponent(v)}`;

/* ---------------- khung ứng dụng ---------------- */
/* Theme theo pháp nhân (M01.13): từ 1 màu gốc sinh cả bộ màu cho menu trái, thanh trên, nút, link, tiêu đề.
 * Màu chữ trắng trên --pri luôn đạt tương phản >= 4.5 (WCAG AA). */
const hex2rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const rgb2hex = c => "#" + c.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
const mix = (h, to, w) => rgb2hex(hex2rgb(h).map((v, i) => v + (hex2rgb(to)[i] - v) * w));
const lum = h => { const [r, g, b] = hex2rgb(h).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };
function themeOf(c) {
  const soft = c; // bảng màu mới đã đậm, trầm sẵn → dùng đúng màu gốc cho nút / link (không pha xám)
  let pri = soft;
  for (let w = .05; 1.05 / (lum(pri) + .05) < 4.5 && w < .8; w += .05) pri = mix(soft, "#000000", w); // tối dần tới khi chữ trắng đủ rõ
  return {"--acc": soft, "--acc-soft": mix(c, "#ffffff", .9), "--pri": pri, "--pri-h": mix(pri, "#000000", .12), "--pri-soft": mix(c, "#ffffff", .92),
    "--navy": mix(c, "#000000", .3), "--navy-2": mix(c, "#000000", .12), "--navy-ink": mix("#ffffff", c, .12), "--navy-mute": mix("#ffffff", c, .42), // menu trái theo màu pháp nhân (tối 30%), mục đang chọn sáng hơn // menu trái: nền tối trung tính, pha nhẹ màu pháp nhân
    "--head": mix("#1A2433", c, .25), "--top": mix(c, "#ffffff", .955), "--bg": mix(c, "#F4F6F9", .975)};
}
function applyTheme() {
  const st = document.documentElement.style;
  for (const [k, v] of Object.entries(themeOf(tenantOf(S.tenant).color))) st.setProperty(k, v);
}
/* Quyền: profile quyết định thao tác trên module (v/c/e/d/x), thành viên bộ phận quyết định thấy menu bộ phận nào */
const GROUP_LISTS = ["deals", "quotes", "orders"]; // Group View: danh sách gộp chỉ đọc hiện ở menu (doanh thu). Job, Xe không lên menu — vào từ số liệu trên trang chủ Group View
const isGroup = () => S.tenant === "ALL";
function can(k, op = "v", u = me()) {
  if (isGroup() && !["v", "x"].includes(op)) return false; // Group View chỉ đọc: không tạo / sửa / xoá
  const p = S.app.profile_perms[u.profile]; return p === "*" || ((p || {})[k] || "").includes(op);
}
function memberOf(tm, u = me()) {
  const m = tm.members || {};
  return (m.users || []).includes(u.id) || (m.roles || []).includes(u.role) || (m.profiles || []).includes(u.profile) || (m.groups || []).some(g => (u.groups || []).includes(g));
}
const isAdmin = (u = me()) => S.app.profile_perms[u.profile] === "*"; // chỉ profile Administrator vào được Cài đặt
const denied = (title, desc) => `<div class="card denied">${ic("alert")}<b>${title}</b><div class="muted">${desc}</div></div>`;
/* Phạm vi bản ghi (M02.03): module Private → chỉ thấy bản ghi của mình và của nhóm (group khác "All Users"); Admin thấy hết.
 * Public read-only → xem được nhưng không sửa. Bản ghi đã xoá (thùng rác) không hiện ở danh sách. */
const access = k => (S.app.default_access || {})[k] || "Public read/write";
function teamNames(u = me()) { const gs = (u.groups || []).filter(g => g !== "All Users"); return S.app.users.filter(x => x.id === u.id || (x.groups || []).some(g => gs.includes(g))).map(x => x.name); }
const visible = (k, r, u = me()) => !r._deleted && (isAdmin(u) || access(k) !== "Private" || teamNames(u).includes(r.Owner));
const canEdit = (k, u = me()) => can(k, "e", u) && (isAdmin(u) || access(k) !== "Public read-only");
async function rowsOf(k, opts) { return (await API.list(k, opts)).filter(r => visible(k, r)); }
const myTeams = () => S.app.teams.filter(tm => memberOf(tm));
function ensureTeam() { // bộ phận hiện tại không còn quyền → về bộ phận mặc định của user hoặc bộ phận đầu tiên
  const mine = myTeams();
  if (!mine.some(x => x.id === S.team)) S.team = (mine.find(x => x.id === me().team) || mine[0] || {}).id;
}
function teamEntities() {
  const tm = S.app.teams.find(x => x.id === S.team);
  return (!tm ? [] : tm.entities === "*" ? Object.keys(S.app.entities) : tm.entities).filter(k => can(k));
}
/* Menu riêng của bộ phận. Bộ phận "Toàn công ty" (tất cả module): chia nhóm theo menu.json (nhiều module).
 * Bộ phận khác: danh sách phẳng theo thứ tự trong teams.json, module đề xuất thêm có nhãn ĐX. */
function teamGroups(A, navItem) {
  const tm = A.teams.find(x => x.id === S.team);
  if (!tm) return [];
  if (tm.entities === "*")
    return A.menu.map(g => ({title: g.group ? t("grp." + g.group) : "", items: g.items.map(navItem).filter(Boolean)})).filter(g => g.items.length);
  const inCommon = A.common.map(it => it.entity).filter(Boolean);
  const pages = A.menu.flatMap(g => g.items).filter(it => it.page && it.teams && it.teams.includes(S.team));
  const items = [...tm.entities.filter(k => !inCommon.includes(k)).map(k => ({entity: k})), ...pages].map(it => {
    const v = navItem(it);
    if (v && it.entity && Array.isArray(tm.proposed) && tm.proposed.includes(it.entity)) v.prop = true; // bộ phận đề xuất cả bộ ("*") đã ghi ở tên
    return v;
  }).filter(Boolean);
  return [{title: "", items}];
}
async function shell(cur) {
  ensureTeam();
  const A = S.app, allowed = teamEntities(), u = me();
  /* mục menu: entity ngoài bộ phận hoặc mục có "teams" không gồm team hiện tại thì ẩn */
  const navItem = it => {
    if (it.entity ? !allowed.includes(it.entity) : it.teams && !it.teams.includes(S.team)) return null;
    return it.entity
      ? {href: `/e/${it.entity}`, icon: A.entities[it.entity].icon, label: L(A.entities[it.entity].label), feat: A.entities[it.entity].feat, on: cur === it.entity}
      : {href: `/p/${it.page}`, icon: it.icon, label: t("page." + it.page), feat: it.feat, badge: it.badge, on: cur === it.page};
  };
  if (isGroup()) { // Group View: bỏ chọn bộ phận và menu làm việc; giữ tổng quan, phê duyệt, bảng điều phối việc, phân tích + vài danh sách gộp chỉ đọc
    const gItem = it => it.entity
      ? {href: `/e/${it.entity}`, icon: A.entities[it.entity].icon, label: L(A.entities[it.entity].label), feat: A.entities[it.entity].feat, on: cur === it.entity}
      : {href: `/p/${it.page}`, icon: it.icon, label: t("page." + it.page), feat: it.feat, badge: it.badge, on: cur === it.page};
    var groupNav = {common: A.common.filter(it => ["home", "myjobs", "work", "reports"].includes(it.page)).map(gItem),
      groups: [{title: t("nav.groupLists"), items: GROUP_LISTS.filter(k => can(k)).map(k => gItem({entity: k}))}]};
  }
  $("#login").style.display = "none";
  $("#app").style.display = "grid";
  $("#side").innerHTML = await render("side", {
    appName: A.name, tenantName: L(tenantOf(S.tenant).name), inSettings: cur.startsWith("s-") && isAdmin(), admin: isAdmin(),
    settings: A.settings.map(s => ({...s, label: t("page." + s.page), on: s.page === cur})),
    common: isGroup() ? groupNav.common : A.common.map(navItem).filter(Boolean), group: isGroup(),
    teamName: L((myTeams().find(x => x.id === S.team) || {name: ""}).name),
    teams: myTeams().map(x => ({id: x.id, label: L(x.name), on: x.id === S.team, // n: số module xem được trong bộ phận
      n: (x.entities === "*" ? Object.keys(A.entities) : x.entities).filter(k => A.entities[k] && can(k)).length})),
    teamProp: (A.teams.find(x => x.id === S.team) || {}).proposed === "*", // cả bộ phận là đề xuất → nhãn ĐX cạnh ô chọn
    groups: isGroup() ? groupNav.groups : teamGroups(A, navItem),
  });
  $("#top").innerHTML = await render("top", {
    curTenant: (S.tenant === "ALL" ? "" : S.tenant + " · ") + L(tenantOf(S.tenant).name),
    tenants: [...u.tenants.filter(c => c === "ALL"), ...u.tenants.filter(c => c !== "ALL")] // Group View (tổng hợp) luôn ở đầu
      .map(c => ({code: c, name: L(tenantOf(c).name), color: tenantOf(c).color, all: c === "ALL", on: c === S.tenant})),
    user: u, isVi: S.lang === "vi", group: S.tenant === "ALL", annot: S.annot, viewingAs: u.id !== S.app.me,
    users: S.app.users.map(x => ({id: x.id, name: x.name, role: x.role, profile: x.profile, on: x.id === u.id, mine: x.id === S.app.me})), // đang "xem với vai trò" người khác → nút quay lại tài khoản của mình
  });
  myApprovals().then(list => { for (const id of ["badge-approvals", "badge-top"]) { const b = document.getElementById(id); if (b) b.textContent = list.length || ""; } });
}
/* "Xem với vai trò" (menu ở avatar trên thanh trên): đổi sang user khác để demo quyền; đang ở Cài đặt mà user mới không phải Admin → về trang chủ */
function viewAs(id) {
  S.user = id; S.team = null; S.tenant = me().tenants[0]; applyTheme();
  if (curPath().startsWith("/p/s-") && !isAdmin()) go("/p/home"); else route();
}
function viewAsMe() { viewAs(S.app.me); }
document.addEventListener("mouseover", e => { // tooltip .tip[data-tip]: vẽ ở lớp trên cùng, không bị khung cuộn của bảng cắt mất
  const el = e.target.closest && e.target.closest(".tip[data-tip]"), box = document.getElementById("tipbox") || document.body.appendChild(Object.assign(document.createElement("div"), {id: "tipbox"}));
  if (!el) return box.classList.remove("show");
  const r = el.getBoundingClientRect(); box.textContent = el.dataset.tip; box.classList.add("show");
  box.style.left = Math.max(8, Math.min(r.left, innerWidth - box.offsetWidth - 12)) + "px"; box.style.top = (r.bottom + box.offsetHeight + 8 > innerHeight ? r.top - box.offsetHeight - 6 : r.bottom + 6) + "px";
});
document.addEventListener("click", e => { for (const w of document.querySelectorAll(".me-wrap.open, .tsw.open, .ts.open")) if (!w.contains(e.target)) w.classList.remove("open"); });
function enter(code) { S.tenant = code; applyTheme(); go("/p/home"); }
function switchTenant(c) { // đổi pháp nhân: màn đang mở không có ở pháp nhân mới thì về trang chủ / danh sách module
  S.tenant = c; applyTheme(); toast(t("top.switched", {t: L(tenantOf(c).name)}));
  const [a, k, sub] = curPath().split("?")[0].split("/").filter(Boolean);
  if (a === "e") {
    if (isGroup() ? !GROUP_LISTS.includes(k) || sub === "new" : !can(k)) return go("/p/home"); // Group View chỉ có Deal / Báo giá / SO, không tạo mới
    if (sub && !["kanban", "list", "new"].includes(sub)) return go(`/e/${k}`); // đang xem 1 bản ghi của pháp nhân cũ → về danh sách module
  }
  if (a === "p" && isGroup() && !["home", "myjobs", "work", "reports"].includes(k)) return go("/p/home"); // Group View không có Cài đặt, tìm kiếm…
  route();
}
function switchTeam(id) {
  S.team = id;
  const m = curPath().match(/^\/e\/([^/?]+)/); // đang ở module không thuộc bộ phận mới → về trang tổng quan
  if (m && !teamEntities().includes(m[1])) go("/p/home"); else route();
}
function switchLang() { const u = new URL(location); u.searchParams.set("lang", S.lang === "vi" ? "en" : "vi"); location.href = u.toString(); }
function toggleAnnot() { S.annot = !S.annot; document.body.classList.toggle("annot", S.annot); route(); }
/* URL: trong code vẫn dùng đường dẫn nội bộ /e/<module>/… (màn của module) và /p/<trang> (trang chức năng);
 * trên thanh địa chỉ hiện dạng gọn: /jobs/jo3, /home, /approvals, /board, /reports/r10, /settings/tenant. Link cũ (#/…, /e/…, /p/…) tự chuyển. */
const PUB_PAGE = {home: "/home", myjobs: "/approvals", work: "/board", reports: "/reports"}, PAGE_OF = {home: "home", approvals: "myjobs", board: "work", reports: "reports"};
function toPublic(p) { // nội bộ → URL gọn (URL gọn đưa vào thì giữ nguyên)
  if (BASE && p.startsWith(BASE + "/")) p = p.slice(BASE.length); // đã có tiền tố (href đã render) → bỏ để không lặp
  const [path, qs = ""] = p.split("?"), q = new URLSearchParams(qs), seg = path.split("/").filter(Boolean);
  let out = path;
  if (seg[0] === "e") out = "/" + seg.slice(1).join("/");
  else if (seg[0] === "p") {
    const pg = seg[1] || "home";
    if (pg === "reports" && q.get("i")) { out = "/reports/" + q.get("i"); q.delete("i"); }
    else out = PUB_PAGE[pg] || (pg.startsWith("s-") ? "/settings/" + pg.slice(2) : "/" + pg);
  }
  return BASE + out + (q.toString() ? "?" + q : "");
}
function toInternal(path, qp) { // URL gọn → đường dẫn nội bộ để router xử lý (qp có thể bị thêm tham số, VD i của báo cáo)
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length) || "/";
  const seg = path.split("/").filter(Boolean), a = seg[0];
  if (!a || a === "index.html") return "/login";
  if (a === "e" || a === "p" || a === "login" || a === "pick") return path;
  if (a === "reports" && seg[1]) { qp.set("i", seg[1]); return "/p/reports"; }
  if (PAGE_OF[a]) return "/p/" + PAGE_OF[a];
  if (a === "settings") return "/p/s-" + (seg[1] || "tenant");
  if (S.app && S.app.entities[a]) return "/e/" + seg.join("/");
  return "/p/" + a; // search, workqueue…
}
const curPath = () => toInternal(location.pathname, new URLSearchParams(location.search));
function go(p) { const u = toPublic(p); if (u !== location.pathname + location.search) history.pushState(null, "", u); route(); }
const redirect = p => { history.replaceState(null, "", toPublic(p)); return route(); };

/* ---------------- đăng nhập ---------------- */
async function viewLogin(step) {
  $("#app").style.display = "none";
  $("#login").style.display = "grid";
  const u = me();
  $("#login").innerHTML = await render("login", {
    appName: S.app.name, pick: step === "pick", email: "minh.n@company.example",
    tenants: u.tenants.map((c, i) => { const x = tenantOf(c); return {code: c, color: x.color, badge: c === "ALL" ? "∑" : c, name: L(x.name), role: (i ? "" : t("login.default") + " · ") + u.role}; }),
  });
}

/* ---------------- danh sách / kanban ---------------- */
async function viewList(k, mode, q, pre) {
  if (mode === "auto") { const m0 = await E(k); mode = m0.status && m0.states.length && !q && !pre && !LIST_FIRST.includes(k) ? "kanban" : "list"; } // tìm kiếm / lọc từ biểu đồ → vẫn là danh sách
  const m = await E(k), all = await rowsOf(k, {tenant: S.tenant, q}), st = lvState(k, m);
  if (pre) { st.filters = pre.filters; st.view = pre.view; st.sel = []; st.open = !!pre.filters.length; } // mở từ chart: áp bộ lọc theo giá trị được bấm
  if (st.open && mode !== "kanban") setTimeout(() => $("#lf-field") && lvFieldChange(k), 0); // điền giá trị cho ô chọn của thanh bộ lọc
  let actions = "";
  if (m.states.length && m.status) actions += `<div class="seg2"${fa(m.feat.kanban || m.feat.status)}><button class="${mode === "kanban" ? "" : "on"}" title="${t("list.list")}" onclick="go('/e/${k}/list')">${ic("list")}</button><button class="${mode === "kanban" ? "on" : ""}" title="${t("list.kanban")}" onclick="go('/e/${k}/kanban')">${ic("cols")}</button></div>`;
  if (m.feat.import) actions += btnHtml(t("list.import"), "upload", "go('/p/s-import')", false, m.feat.import);
  if (m.feat.create && can(k, "c")) actions += btnHtml(t("list.new"), "plus", `go('/e/${k}/new')`, true, m.feat.create);
  const scoped = !isAdmin() && access(k) === "Private";
  const head = {icon: m.icon, title: L(m.label), feat: m.feat.list, subFeat: "M01.04", actions,
    sub: `${S.tenant} · ${nRec(all.length)}${S.lang === "vi" ? ` · ${m.module} ${m.module_name}` : ""}${m.source === "new" ? " · " + t("list.newModule") : ""}`}; // mã + tên feature (tiếng Việt) chỉ hiện ở bản VI
  if (mode === "kanban") return viewKanban(k, m, all, head);
  const views = [...(OPEN_DEFAULT.includes(k) && m.status ? [{id: "open", label: t("lv.v.open"), f: [{fn: r => !isDone(r[m.status])}]}] : []), ...(NO_MINE.includes(k) ? [] : [{id: "mine", label: t("list.mine"), f: [{f: "Owner", v: me().name}]}]), ...(PRESET_VIEWS[k] || []).map(v => ({...v, label: t(v.label), tip: v.tip ? t(v.tip) : ""})), ...st.views,
    ...(LEGACY_VIEWS[k] || []).map(v => ({...v, label: t(v.label), f: [{fn: v.fn}], legacy: true})),
    {id: "all", label: t("list.all"), f: []}]; // "Tất cả" để cuối khi module có view ưu tiên: chỉ là lựa chọn xem cả bản ghi đã đóng
  if (!DEFAULT_VIEW[k] && !OPEN_DEFAULT.includes(k)) views.unshift(views.pop()); // module không có view ưu tiên: "Tất cả" đứng đầu như cũ
  const di = views.findIndex(v => v.id === DEFAULT_VIEW[k]); if (di > 0) views.unshift(...views.splice(di, 1)); // view mặc định đứng đầu
  const cur = views.find(v => v.id === st.view) || views[0];
  const cols = (cur.cols || m.list).filter(c => m.fields[c]), so = st.sort || {c: "_created", dir: "desc"}; // view chuyển từ hệ thống cũ có bộ cột riêng; mặc định bản ghi mới tạo lên đầu
  const rows = sortRows(applyFilters(all, [...cur.f, ...st.filters]), so, m);
  S._lvRows = rows; S._lvCols = cols;
  return render("list", {key: k, head, q: q || "", nAll: all.length,
    scope: scoped ? t("lv.scope", {a: access(k), t: teamNames().join(", ")}) : "",
    views: views.map(v => ({id: v.id, label: v.label, tip: v.tip, count: applyFilters(all, v.f).length, on: v === cur, legacy: !!v.legacy})), // view chuyển từ hệ thống cũ hiện thành tab như các view khác
    filters: st.filters.map((x, i) => ({i, label: `${fieldLabel(m, x.f)} = ${x.f === "_tone" ? t("tone." + x.v) : x.v}`})), filterFields: filterFields(m), showFilter: st.open,
    nSel: st.sel.length, canEdit: canEdit(k), canDel: can(k, "d"),
    titleLabel: m.title.map(f => m.fields[f] ? m.fields[f].label : f).join(" "), tSort: so.c === "_title" ? so.dir : "",
    cols: [...(isGroup() ? [{l: t("gh.c.entity"), c: "_tenant", dir: so.c === "_tenant" ? so.dir : ""}] : []), ...cols.map(c => ({l: m.fields[c].label, c, dir: so.c === c ? so.dir : ""}))], group: isGroup(),
    rows: rows.map(r => ({id: r.id, title: titleOf(m, r), sel: st.sel.includes(r.id), optOut: PDPA_MODS.includes(k) && optOut(r),
      cells: [...(isGroup() ? [`<span class="tbadge" style="background:${tenantOf(r._tenant).color}">${esc(r._tenant)}</span>`] : []), ...cols.map(c => fmt(m.fields[c], cellVal(r, c), m, c, r._tenant))]}))});
}
/* trạng thái list theo module, giữ trong phiên: view đang chọn, view đã lưu, bộ lọc, bản ghi đã chọn */
/* "Của tôi" chỉ có nghĩa khi Owner là người phụ trách; xe của khách, sản phẩm, nhà cung cấp dùng chung (quyền Public) → không có view này */
const NO_MINE = ["vehicles", "products", "vendors"];
/* view mặc định khi mở danh sách: bản ghi còn cần xử lý, không lẫn bản ghi đã đóng / đã giao */
const OPEN_DEFAULT = ["deals", "quotes", "install", "si", "tickets"]; // thêm tab "Đang mở" (trạng thái chưa đóng) làm mặc định
const DEFAULT_VIEW = {jobs: "z-open", orders: "open", leads: "nc"}; // Job: view All Open Cases của khách; SO: Chưa giao; Lead: Chưa liên hệ
const LIST_FIRST = ["leads"]; // có Kanban nhưng mở List: sales làm khách tiềm năng theo danh sách gọi điện (quy trình này ở hệ thống cũ đang tắt)
const daysTo = d => d ? -ageOf(d) : null, soon = d => { const n = daysTo(d); return n != null && n >= 0 && n <= 30; };
const optOut = r => r.Email_Opt_Out === true; // Privacy Act 1988 của Úc (M06.02): người đã từ chối nhận tin
const PDPA_MODS = ["contacts", "leads"]; // quy định dữ liệu cá nhân (Privacy Act) áp dụng cho cá nhân → chỉ người liên hệ, lead (nhà cung cấp là công ty, không gắn nhãn)
const PRESET_VIEWS = {contacts: [{id: "optout", label: "lv.v.optOut", tip: "pdpa.tip", f: [{fn: optOut}]}],
  orders: [{id: "open", label: "lv.v.notDelivered", f: [{fn: r => r.Status !== "Delivered"}]}], // đơn đang chạy
  deals: [{id: "overdue", label: "lv.v.dealOverdue", f: [{fn: r => !/closed/i.test(r.Stage || "") && r.Closing_Date && ageOf(r.Closing_Date) > 0}]}], // deal chưa đóng đã qua ngày dự kiến chốt
  leads: [{id: "nc", label: "lv.v.notContacted", f: [{f: "Lead_Status", v: "Not Contacted"}]}], // lead mới cần gọi trước tiên
  vehicles: [
  {id: "exp30", label: "lv.v.exp30", f: [{fn: r => [r.LM_Expiry_Date, r.LG_Expiry_Date, r.NEA_Expiry_Date].some(soon)}]},
  {id: "warr", label: "lv.v.warr", f: [{fn: r => (daysTo(r.Warr_Expiry_Date) ?? -1) >= 0}]}]};
/* view khách đang dùng ở hệ thống cũ (source/legacy_listviews_ape.txt): tên đặt lại theo CRM mới (i18n lv.z.*), giữ điều kiện lọc và cột riêng của view.
 * Bỏ 2 view cá nhân lọc theo tên 1 sales (không đưa tên người thật vào prototype). Lệnh dịch vụ chỉ giữ 4 view hay dùng (đủ 10 view ở source/legacy_listviews_ape.txt) */
const isIn = (f, list) => r => list.includes(valOf(r, f)), notIn = (f, list) => r => !list.includes(valOf(r, f));
const LEGACY_VIEWS = {
  jobs: [
    {id: "z-open", label: "lv.z.open", fn: notIn("Status", ["CANCELLED", "CLOSED", "Completed"]), cols: ["Name", "Account", "Date_Time_1", "Vehicle_Number", "Date_Time_of_Completion", "Status"]},
    {id: "z-pq", label: "lv.z.pq", fn: isIn("Status", ["Pending Quotation Approval"]), cols: ["Name", "Account", "Date_Time_1", "Vehicle_Number", "Customer_Remark_s"]},
    {id: "z-wip", label: "lv.z.wip", fn: isIn("Status", ["On Hold", "Pending Spare Part(s)", "QA/QC", "Troubleshooting", "Work In Progress 1", "Work In Progress 2"]), cols: ["Name", "Account", "Work_Done", "Problem_Identified", "Status", "Service_Type", "Days_from_Start"]},
    {id: "z-cert", label: "lv.z.cert", fn: isIn("Service_Type", ["Lifting Gear Inspection Renewal", "Lifting Gear Inspection & Load Test", "Plant Rego & Lifting Gear + Load Test", "Plant Rego & Lifting Gear Renewal", "Plant Registration & Load Test", "Plant Registration Renewal", "EPA Licence Renewal"]),
      cols: ["Name", "Account", "Date_Time_1", "Service_Type", "Vehicle_Numbers", "Estimated_Days_Required", "Man_Hours", "Technicians_Involved", "Warranty", "Equipment_Type"]}],
  quotes: [
    {id: "z-as", label: "lv.z.as", fn: r => /after/i.test(valOf(r, "New_After_Sales")), cols: ["Subject", "Account_Name", "Date1", "Warranty", "Vehicle_Number", "Sub_Total", "New_After_Sales"]},
    {id: "z-mil", label: "lv.z.mil", fn: r => valOf(r, "Vehicle_Number").includes("MID"), cols: ["Account_Name", "Subject", "Vehicle_Number", "Date1", "Equipment_Type", "Serial_Number", "Sub_Total", "Quote_Stage"]},
    {id: "z-hold", label: "lv.z.hold", fn: r => r.Quote_Stage === "On Hold" && r.Owner === me().name, cols: ["Date1", "Subject", "Account_Name", "Service_Report_Reference"]},
    {id: "z-pav", label: "lv.z.pav", fn: r => r.Quote_Stage === "Waiting For Approval" && r.Owner === me().name, cols: ["Date1", "Subject", "Account_Name", "Service_Report_Reference"]}],
  products: [{id: "z-ferrocrane", label: "lv.z.ferro", fn: r => valOf(r, "Manufacturer") === "Ferrocrane S.p.A", cols: ["Description", "Product_Category", "Product_Code", "Vendor_Name", "Usage_Unit"]}],
};
function lvState(k, m) {
  S.lv = S.lv || {};
  if (!S.lv[k]) {
    const views = []; // không còn view mẫu tự sinh theo trạng thái (dễ gây khó hiểu); view có nghĩa khai báo ở PRESET_VIEWS / LEGACY_VIEWS
    S.lv[k] = {view: DEFAULT_VIEW[k] || (OPEN_DEFAULT.includes(k) ? "open" : "all"), views, filters: [], sel: [], open: false}; // mở danh sách ở view ưu tiên, không phải "Tất cả"
  }
  return S.lv[k];
}
const valOf = (r, f) => { if (f === "_tone") { const m = S.ent.jobs; return m ? m.tones[r[m.status]] || "info" : ""; } const v = cellVal(r, f); return v && v.name ? v.name : Array.isArray(v) ? v.join(", ") : v == null ? "" : String(v); };
const applyFilters = (rows, fs) => rows.filter(r => fs.every(x => x.fn ? x.fn(r) : valOf(r, x.f) === x.v)); // x.fn: điều kiện của view dựng sẵn (VD xe sắp hết hạn)
const fieldLabel = (m, f) => f === "Owner" ? t("lv.owner") : f === "_tenant" ? t("gh.c.entity") : f === "_tone" ? t("chart.group") : (m.fields[f] || {}).label || f;
function filterFields(m) {
  const fs = [...new Set([m.status, ...m.list, "Owner", "_tenant"])].filter(f => f && (f === "Owner" || f === "_tenant" || (m.fields[f] && ["picklist", "lookup", "text", "date"].includes(m.fields[f].type))));
  return fs.map(api => ({api, label: fieldLabel(m, api)}));
}
async function lvFieldChange(k) {
  const f = $("#lf-field").value, vals = [...new Set((await rowsOf(k, {tenant: S.tenant})).map(r => valOf(r, f)).filter(Boolean))].sort();
  $("#lf-val").innerHTML = vals.map(v => `<option>${esc(v)}</option>`).join("");
}
function lvToggleFilter(k) { const st = lvState(k); st.open = !st.open; rerender().then(() => st.open && lvFieldChange(k)); }
function lvAddFilter(k) { const st = lvState(k); st.filters.push({f: $("#lf-field").value, v: $("#lf-val").value}); rerender().then(() => lvFieldChange(k)); }
function lvDelFilter(k, i) { lvState(k).filters.splice(i, 1); rerender().then(() => lvState(k).open && lvFieldChange(k)); }
/* sắp xếp danh sách: mặc định mới tạo lên đầu (_created giảm dần); bấm tiêu đề cột để sắp theo cột */
function sortRows(rows, so, m) {
  const key = r => so.c === "_title" ? titleOf(m, r) : so.c === "_created" ? r._created || "" : valOf(r, so.c);
  const cmp = (a, b) => { const x = key(a), y = key(b), nx = Number(x), ny = Number(y);
    return x === "" ? 1 : y === "" ? -1 : !isNaN(nx) && !isNaN(ny) && x !== "" && y !== "" ? nx - ny : String(x).localeCompare(String(y)); };
  return [...rows].sort((a, b) => { const v = cmp(a, b); return a === b ? 0 : (so.dir === "asc" ? v : -v) || (b._created || "").localeCompare(a._created || ""); });
}
function lvSort(k, c) { // bấm cùng cột: tăng → giảm → về mặc định (mới tạo lên đầu)
  const st = lvState(k), cur = st.sort;
  st.sort = !cur || cur.c !== c ? {c, dir: "asc"} : cur.dir === "asc" ? {c, dir: "desc"} : null; rerender();
}
function lvView(k, id) { const st = lvState(k); st.view = id; st.sel = []; rerender(); }
function lvSel(k, id, on) { const st = lvState(k); st.sel = on ? [...new Set([...st.sel, id])] : st.sel.filter(x => x !== id); rerender(); }
function lvSelAll(k, on) { lvState(k).sel = on ? (S._lvRows || []).map(r => r.id) : []; rerender(); }
function lvClearSel(k) { lvState(k).sel = []; rerender(); }
async function lvExport(k, onlySel) {
  const m = await E(k), st = lvState(k), rows = (S._lvRows || []).filter(r => !onlySel || st.sel.includes(r.id));
  const cols = [...m.title.slice(0, 1), ...(S._lvCols || m.list)], q = v => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [cols.map(c => q(fieldLabel(m, c))).join(","), ...rows.map(r => cols.map(c => q(valOf(r, c))).join(","))].join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["\ufeff" + csv], {type: "text/csv"})); a.download = `${k}_${S.tenant}.csv`; a.click();
  toast(t("lv.exported", {n: rows.length}));
}
async function massUpdate(k) {
  const m = await E(k), st = lvState(k), fs = Object.entries(m.fields).filter(([, fd]) => fd.type === "picklist" && fd.options.length);
  await dialog({title: t("lv.massUpdate"), feat: "M31.05", intro: t("lv.selected", {n: st.sel.length}),
    fields: [{id: "f", label: t("lv.field"), kind: "select", options: fs.map(([api, fd]) => ({value: api, label: fd.label}))}, {id: "v", label: t("lv.value"), kind: "select", options: []}],
    ok: t("act.save")}, async () => {
    const f = $("#dlg-f").value, v = $("#dlg-v").value;
    for (const id of st.sel) await API.update(k, id, {[f]: v});
    toast(t("lv.updated", {n: st.sel.length})); st.sel = []; closeModal(); rerender();
  });
  const fill = () => { const fd = m.fields[$("#dlg-f").value]; $("#dlg-v").innerHTML = fd.options.map(o => `<option>${esc(o)}</option>`).join(""); };
  $("#dlg-f").onchange = fill; fill();
}
function massOwner(k) {
  const st = lvState(k);
  dialog({title: t("lv.massOwner"), feat: "M31.05", intro: t("lv.selected", {n: st.sel.length}),
    fields: [{id: "u", label: t("lv.owner"), kind: "select", options: S.app.users.map(u => ({value: u.name, label: `${u.name} — ${u.role}`}))}], ok: t("act.save")}, async () => {
    for (const id of st.sel) await API.update(k, id, {Owner: $("#dlg-u").value});
    toast(t("lv.updated", {n: st.sel.length})); st.sel = []; closeModal(); rerender();
  });
}
async function massEmail(k) {
  const st = lvState(k), recs = (await Promise.all(st.sel.map(id => API.get(k, id)))).filter(Boolean), skip = recs.filter(optOut).length; // Privacy Act: bỏ người đã từ chối nhận tin
  dialog({title: t("lv.massEmail"), feat: "M25.03", intro: t("lv.selected", {n: st.sel.length}) + (skip ? " · " + t("pdpa.skip", {n: skip}) : ""),
    fields: [{id: "tpl", label: t("em.template"), kind: "select", options: EMAIL_TPL.map(x => ({value: x, label: x}))}, {id: "from", label: t("em.from"), kind: "select", options: ORG_EMAILS.map(x => ({value: x[0], label: x[0]}))}],
    ok: t("em.send")}, () => { toast(t("em.sentN", {n: st.sel.length - skip})); st.sel = []; closeModal(); rerender(); });
}
function massDelete(k) {
  const st = lvState(k);
  dialog({title: t("lv.delete"), feat: "M04.04", intro: t("lv.deleteNote", {n: st.sel.length}), fields: [], ok: t("lv.delete")}, async () => {
    for (const id of st.sel) await API.update(k, id, {_deleted: {by: me().name, at: new Date().toISOString().slice(0, 16)}});
    toast(t("lv.deleted", {n: st.sel.length})); st.sel = []; closeModal(); rerender();
  });
}

/* hộp thoại dùng chung: templates/dialog.html */
async function dialog(data, onOk) {
  $("#modal").innerHTML = await render("dialog", data);
  $("#modal").classList.add("show");
  $("#mok").onclick = onOk;
}

/* ---------------- chi tiết ---------------- */
const layoutOf = (m, r) => m.layouts.find(l => l.name === r._layout) || m.layouts[0] || {sections: []};
function transitionsFor(m, r) {
  if (!m.status) return [];
  const cur = r[m.status] || "-None-", bp = m.bp_by_layout[r._layout] || m.bp_by_layout["*"];
  if (m.transitions.length) return m.transitions.filter(x => (!bp || x.bp === bp) && x.from.includes(cur));
  const i = m.states.indexOf(cur);
  return i >= 0 && i < m.states.length - 1 ? [{action: t("act.next"), to: m.states[i + 1], req: ""}] : [];
}
async function viewDetail(k, id) {
  const m = await E(k), r = await API.get(k, id);
  if (!r || r._deleted) return `<p class="muted">${t("list.empty")}</p>`;
  if (!visible(k, r)) return denied(t("perm.record"), t("perm.recordD", {a: access(k)}));
  const tr = canEdit(k) ? transitionsFor(m, r) : []; // không có quyền sửa (profile / Public read-only) → không chuyển trạng thái
  const click = x => `doTransition('${k}','${r.id}',${m.transitions.indexOf(x)},'${esc(x.to).replace(/'/g, "\\'")}')`;
  const sections = layoutOf(m, r).sections.map(s => ({
    name: s.name,
    feat: s.fields.some(f => m.fields[f] && m.fields[f].type === "subform") ? m.feat.lines : "",
    fields: s.fields.filter(f => m.fields[f] && m.fields[f].type !== "subform").map(f => ({label: m.fields[f].label, required: m.fields[f].required, value: fmt(m.fields[f], r[f], m, f, r._tenant), feat: m.fields[f].feat})),
    subs: s.fields.filter(f => m.fields[f] && m.fields[f].type === "subform").map(f => {
      const fd = m.fields[f], data = r[f] || [], cols = (fd.columns || []).filter(c => data.some(row => row[c.api] != null));
      return {label: fd.label, feat: fd.feat, cols: cols.map(c => c.label), rows: data.map(row => cols.map(c => fmt(c, row[c.api], null, null, r._tenant)))};
    }),
  }));
  S._body = await render("detail-sections", {sections});
  const cur = m.status ? m.states.indexOf(r[m.status]) : -1;
  /* hồ sơ duyệt DoA: chuỗi bậc, ai đã duyệt / đang giữ; đang chờ duyệt thì không dùng nút chuyển trạng thái Approve / Reject của quy trình */
  let approval = null, apprBtns = [], pendingMine = false;
  if (APPR_SRC[k]) {
    const pending = r[m.status] === APPR_SRC[k], a = pending || r._approval ? apprOf(k, r) : null;
    if (a) {
      approval = {cond: (S.app.approval_rules.find(x => x.doc === k && x.levels.join() === a.levels.join()) || {cond: money(a.amount, r._tenant)}).cond, levels: a.levels.map((lv, i) => { const h = decided(a)[i];
        return {name: `${lv} · ${h ? h.by : i === a.step ? turnHolder(a) : holderOf(lv)}`, cls: h ? (h.act === "approved" ? "ok" : "wait") : i === a.step && pending ? "wait" : "next", mark: h ? (h.act === "approved" ? "✓" : "✕") : i + 1,
          status: h ? `${t(h.act === "approved" ? "ap.approved" : "ap.rejectedP")} · ${dmy(h.at)}${h.note ? ` — “${h.note}”` : ""}` : t(i === a.step && pending ? "det.waiting" : "det.notYet")}; })};
      if (pending) {
        pendingMine = myTurn(a);
        tr.length = 0; // đang chờ duyệt DoA: chỉ đổi trạng thái qua Duyệt / Từ chối, không chuyển tay (kể cả "Bước tiếp")
        if (myTurn(a) && !isGroup()) apprBtns = [{label: t("mj.approve"), primary: true, feat: "M22.01", onclick: `apprDo('${k}','${r.id}',true)`}, {label: t("ap.rejectBtn"), feat: "M22.01", onclick: `apprDo('${k}','${r.id}',false)`},
          {label: t("ap.delegBtn"), feat: "M22.02", onclick: `apprDeleg('${k}','${r.id}')`}];
      }
    }
  }
  /* chào giá: nút chính theo việc sales thật sự làm (quy trình stage ở hệ thống cũ đang tắt) — chuyển stage thủ công nằm trong "Thêm" */
  const qs = r.Quote_Stage, qBtns = k === "quotes" && !isGroup() && !apprBtns.length && canEdit(k) ? [
    ...(["Draft", "Negotiation", "Quotation"].includes(qs) ? [{label: t("q.submit"), primary: true, feat: "M10.06", onclick: `apprSubmit('${r.id}')`}] : []),
    ...(qs === "Confirmed" && !r.Quote_for_SO ? [{label: t("q.toSO"), primary: true, feat: "M10.08", onclick: `quoteToSO('${r.id}')`}] : []),
    {label: t("q.pdf"), feat: "M10.07", onclick: `toast(t('q.pdfT'))`},
    {label: t("q.email"), feat: "M10.09", onclick: `sendEmail('quotes','${r.id}','Proposal – cover letter')`}]
    /* Sales Order: việc chính là đẩy sang kế toán (Accounting System) để xuất hoá đơn; Status đổi tay nằm trong "Thêm" */
    : k === "orders" && !isGroup() && canEdit(k) ? [...(r._synced ? [] : [{label: t("so.sync"), primary: true, feat: "M28.02", onclick: `soSync('${r.id}')`}]),
      {label: t("so.pdf"), feat: "M11.04", onclick: `toast(t('so.pdfT'))`}] : null;
  return render("detail", {
    key: k, id: r.id, icon: m.icon, crumb: L(m.label), title: titleOf(m, r), statusPill: (m.status ? pill(r[m.status], m) : "") + (r._synced ? `<span class="pill p-ok"${fa("M28.02")}>${t("so.synced", {d: dmy(r._synced)})}</span>` : "") + (PDPA_MODS.includes(k) && optOut(r) ? `<span class="pill p-bad tip"${fa("M06.02")} data-tip="${esc(t("pdpa.tip"))}">${t("pdpa.tag")} ⓘ</span>` : ""),
    sub: subOf(m, r), layout: m.layouts.length > 1 ? r._layout : "", tenant: r._tenant, feat: m.feat,
    buttons: isGroup() ? [{label: t(pendingMine ? "ap.approveIn" : "gh.openIn", {t: r._tenant}), primary: true, onclick: `go('/e/${k}/${r.id}?tenant=${r._tenant}')`}] : apprBtns.length ? [...apprBtns].reverse()
      : qBtns ? qBtns.reverse() : tr.slice(0, 2).map((x, i) => ({label: x.action, primary: i === 0, feat: m.feat.status, onclick: click(x)})).reverse(),
    more: isGroup() ? [] : [...(qBtns ? tr : tr.slice(2)).map(x => ({label: `${x.action} → ${x.to}`, feat: m.feat.status, onclick: click(x)})),
      ...m.actions.filter(a => !(qBtns && ["pdf", "convert", "sync"].includes(a.id))).map(a => ({label: L(a.label), feat: a.feat, onclick: `toast('${esc(L(a.label)).replace(/'/g, "\\'")} (prototype)')`})),
      ...(qBtns && k === "quotes" ? [] : [{label: t("det.email"), feat: k === "quotes" ? "M10.09" : "M25.01", onclick: `sendEmail('${k}','${r.id}')`}]),
      ...(can(k, "c") ? [{label: t("det.clone"), feat: "M31.08", onclick: `cloneRec('${k}','${r.id}')`}] : []),
      {label: t("det.share"), feat: "M31.08", onclick: `shareRec('${k}','${r.id}')`},
      ...(can(k, "d") ? [{label: t("lv.delete"), feat: "M04.04", onclick: `delRec('${k}','${r.id}')`}] : [])],
    highlights: (HIGHLIGHT[k] || m.list).filter(f => f !== m.status && m.fields[f] && !SYS_FIELDS[f]).slice(0, 5).map(f => ({label: m.fields[f].label, value: fmt(m.fields[f], r[f], m, f, r._tenant)})),
    path: m.status ? m.states.map((s, j) => ({state: s, cls: cur >= 0 && j < cur ? "done" : j === cur ? "cur" : "", done: cur >= 0 && j < cur})) : [],
    offPath: cur < 0 && m.status ? r[m.status] : "",
    tabs: m.related.map(x => ({label: L(S.app.entities[x.entity].label), spec: `${x.entity}|${x.field}`})),
    body: S._body, approval, log: r._log || [], owner: r.Owner || "System", created: dmy(r._created),
    tags: r._tags || [], sharedWith: (r._shared || []).map(x => x.name), group: isGroup(),
  });
}
async function tab(b, k, id, spec) {
  b.parentNode.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
  if (!spec) { $("#tabBody").innerHTML = S._body; return; }
  const [ek, field] = spec.split("|"), m2 = await E(ek);
  const rows = (await API.list(ek, {where: r => r[field] && r[field].id === id})).sort((a, b) => (b._created || "").localeCompare(a._created || "")); // mới tạo lên đầu
  const cols = m2.list.slice(0, 4);
  $("#tabBody").innerHTML = await render("related", {key: ek, cols: cols.map(c => m2.fields[c].label),
    rows: rows.map(r => ({id: r.id, title: titleOf(m2, r), cells: cols.map(c => fmt(m2.fields[c], cellVal(r, c), m2, c, r._tenant))}))});
}
async function doTransition(k, id, ti, to) {
  const m = await E(k);
  const x = m.transitions[ti] || {req: "", action: t("act.next"), to};
  const needNote = /add_note/.test(x.req);
  const fields = [...String(x.req).matchAll(/request_field_data:(\w+)/g)].map(a => a[1]);
  const apply = async () => {
    const patch = {[m.status]: to};
    for (const f of fields) patch[f] = ($("#mf-" + f) || {}).value;
    const r = await API.get(k, id);
    r._log = [{by: me().name, text: t("det.moved", {a: x.action, s: to}) + (needNote ? ` — “${$("#mnote").value || "…"}”` : ""), at: t("det.now")}, ...(r._log || [])];
    await API.update(k, id, patch);
    closeModal(); toast(t("det.movedToast", {s: to})); route();
  };
  if (!needNote && !fields.length) return apply();
  $("#modal").innerHTML = await render("transition", {action: x.action, to, needNote, bp: x.bp || "", fields: fields.map(f => ({api: f, label: (m.fields[f] || {}).label || f}))});
  $("#modal").classList.add("show");
  $("#mok").onclick = apply;
}
/* Kanban (Job, Deal, Báo giá…): bộ lọc nhanh giống Bảng công việc — phạm vi Của tôi / team / tất cả, 1 ô chọn theo module.
 * Bộ lọc nhiều điều kiện, view đã lưu, thao tác hàng loạt ở dạng List. Cột đã đóng chỉ hiện 30 ngày gần nhất để bảng không dồn thẻ cũ. */
const KB_QUICK = {jobs: "Service_Type", deals: "New_After_Sales"}, KB_DAYS = 30;
async function viewKanban(k, m, all, head) {
  const g = isGroup(), u = me(), kb = (S.kb = S.kb || {})[k] = S.kb[k] || {scope: g ? "all" : homeRole(u) === "mgr" ? "team" : "mine", quick: "", tenant: ""};
  const team = teamNames(u), owners = r => [r.Owner, r.Handled_By].filter(Boolean);
  const qf = KB_QUICK[k];
  const rows = all.filter(r => (kb.scope === "all" || owners(r).some(n => kb.scope === "mine" ? n === u.name : team.includes(n)))
    && (!qf || !kb.quick || r[qf] === kb.quick) && (!g || !kb.tenant || r._tenant === kb.tenant));
  const states = [...m.states, ...[...new Set(rows.map(r => r[m.status]))].filter(s => s && !m.states.includes(s))];
  /* kéo thả đổi trạng thái: chỉ thả được vào cột mà quy trình cho phép từ trạng thái hiện tại; bước cần ghi chú / nhập field thì mở hộp thoại như ở màn chi tiết.
     Group View hoặc không có quyền sửa → chỉ xem */
  const drag = canEdit(k) && !g;
  S._kb = {k, tr: {}};
  if (drag) for (const r of rows) S._kb.tr[r.id] = APPR_SRC[k] && r[m.status] === APPR_SRC[k] ? [] : transitionsFor(m, r).map(x => ({to: x.to, ti: m.transitions.indexOf(x), action: x.action}));
  const recent = r => ageOf(r.Date_Time_of_Completion || r.Closing_Date || r._created) <= KB_DAYS; // ngày hoàn thành (job) / ngày chốt (deal)
  return render("kanban", {key: k, head, feat: m.feat.kanban, drag, group: g, scope: kb.scope,
    quick: qf ? {label: (m.fields[qf] || {}).label || qf, cur: kb.quick, opts: ((m.fields[qf] || {}).options || []).length ? m.fields[qf].options : [...new Set(all.map(r => r[qf]).filter(Boolean))].sort()} : null, // picklist: lấy đúng danh sách giá trị của field
    tenants: g ? u.tenants.filter(c => c !== "ALL").map(c => ({c, on: c === kb.tenant})) : [],
    columns: states.map(st => { const list = rows.filter(r => r[m.status] === st).sort((a, b) => (b._created || "").localeCompare(a._created || "")), done = isDone(st), shown = done ? list.filter(recent) : list;
      return {state: st, tone: toneColor(m.tones[st]), n: list.length, more: done && shown.length < list.length ? {n: list.length - shown.length, href: drill(k, m.status)(st)} : null,
        cards: shown.map(r => kbCard(k, m, r, g))}; })});
}
/* thẻ Kanban cùng kiểu thẻ Bảng công việc: tiêu đề + mô tả, "Liên quan", ngày (quá hạn tô đỏ), độ ưu tiên, số tiền, người phụ trách */
const KB_CARD = {
  jobs: {rel: "Account", tag: "Vehicle_Number", date: "Date_Time_1", age: true, prio: "Priority"}, // job: ngày nhận xe + số ngày đã nằm xưởng
  deals: {rel: "Account_Name", date: "Closing_Date", due: true, money: "Amount"},
  quotes: {rel: "Account_Name", tag: "Vehicle_Number", date: "Date1", money: "Grand_Total"},
  orders: {rel: "Account_Name", date: "Delivery_Date", due: true, money: "Grand_Total"},
  invoices: {rel: "Account_Name", date: "Due_Date", due: true, money: "Grand_Total"},
  install: {rel: "Account_Name", tag: "Vehicle_Registration_No", date: "Delivery_Date", due: true},
  si: {rel: "Account_Name", date: "Request_Date"}, tickets: {rel: "Account_Name", prio: "Priority"},
  pr: {rel: "Vendor", date: "Date_of_Request"}, leads: {rel: "Company"},
};
const JOB_LONG = 14; // job nằm xưởng quá 14 ngày (chưa xong) → tô đỏ
function kbCard(k, m, r, g) {
  const c = KB_CARD[k] || {}, done = isDone(r[m.status]), dv = c.date && r[c.date] ? String(r[c.date]).slice(0, 10) : "", n = dv ? ageOf(dv) : null;
  const rel = c.rel && r[c.rel], p = c.prio ? String(r[c.prio] || "") : "", pn = parseInt(p), lk = rel && rel.id ? ((m.fields[c.rel] || {}).lookup === "Vendors" ? "vendors" : "accounts") : "";
  return {id: r.id, title: titleOf(m, r), sub: subOf(m, r), icon: m.icon, owner: r.Owner,
    rel: rel ? {label: rel.name || rel, href: lk ? `/e/${lk}/${rel.id}` : ""} : null,
    tag: c.tag ? valOf(r, c.tag) : "", value: c.money && r[c.money] != null ? money(Math.round(r[c.money]), r._tenant) : "",
    date: dv ? dmy(dv) + (c.age && !done && n >= 0 ? " · " + t("kb.days", {n}) : "") : "",
    over: !done && n != null && (c.due ? n > 0 : !!c.age && n > JOB_LONG), overTxt: c.due && !done && n > 0 ? t("home.overdue", {n}) : "",
    prio: /high/i.test(p) || (pn && pn <= 2) ? (pn ? t("kb.prio", {n: pn}) : p) : "",
    tenant: g ? r._tenant : "", tcolor: g ? tenantOf(r._tenant).color : ""};
}
function kbSet(k, f, v) { S.kb[k][f] = v; route(); }
function kbDrag(e, id) { // tô cột được phép thả, làm mờ cột không được phép
  e.dataTransfer.setData("text/plain", id); e.currentTarget.classList.add("drag");
  const ok = (S._kb.tr[id] || []).map(x => x.to);
  document.querySelectorAll(".kanban .kcol").forEach(c => c.classList.add(ok.includes(c.dataset.st) ? "can" : c.contains(e.currentTarget) ? "self" : "no"));
}
function kbEnd(e) { e.currentTarget.classList.remove("drag"); document.querySelectorAll(".kanban .kcol").forEach(c => c.classList.remove("can", "no", "self", "over")); }
async function kbDrop(e, st) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain"), m = await E(S._kb.k), r = await API.get(S._kb.k, id), opts = S._kb.tr[id] || [];
  if (!r || r[m.status] === st) return;
  const x = opts.find(o => o.to === st);
  if (!x && APPR_SRC[S._kb.k] === r[m.status]) return toast(t("kb.pending"));
  if (!x) return toast(opts.length ? t("kb.notAllowed", {a: r[m.status], b: st, n: opts.map(o => o.to).join(", ")}) : t("kb.noNext", {a: r[m.status]}));
  doTransition(S._kb.k, id, x.ti, st);
}
function closeModal() { $("#modal").classList.remove("show"); }
const logTo = (r, text) => { r._log = [{by: me().name, text, at: t("det.now")}, ...(r._log || [])]; };
async function addTag(k, id) {
  dialog({title: "Tag", feat: "M31.06", fields: [{id: "tag", label: t("det.tagName"), value: ""}], ok: t("act.save")}, async () => {
    const r = await API.get(k, id), v = $("#dlg-tag").value.trim(); if (v) r._tags = [...new Set([...(r._tags || []), v])];
    closeModal(); rerender();
  });
}
function shareRec(k, id) {
  dialog({title: t("det.share"), feat: "M31.08", intro: t("det.shareNote"),
    fields: [{id: "u", label: t("det.shareTo"), kind: "select", options: S.app.users.filter(u => u.id !== S.user).map(u => ({value: u.name, label: `${u.name} — ${u.role}`}))},
      {id: "lv", label: t("det.shareLevel"), kind: "select", options: [{value: "read", label: t("det.read")}, {value: "rw", label: t("det.rw")}]}], ok: t("det.share")}, async () => {
    const r = await API.get(k, id), name = $("#dlg-u").value;
    r._shared = [...(r._shared || []).filter(x => x.name !== name), {name, level: $("#dlg-lv").value}]; logTo(r, t("det.sharedLog", {n: name}));
    toast(t("det.sharedLog", {n: name})); closeModal(); rerender();
  });
}
async function soSync(id) { // M28.02: đẩy SO sang kế toán (prototype: ghi nhận thời điểm; số Tax Invoice do kế toán trả về sau)
  const r = await API.get("orders", id), at = TODAY + "T" + new Date().toTimeString().slice(0, 5);
  logTo(r, t("so.syncLog")); await API.update("orders", id, {_synced: at}); toast(t("so.syncDone")); route();
}
async function apprSubmit(id) { // gửi duyệt báo giá theo DoA: bậc duyệt dựng theo giá trị (approval_rules), người gửi ghi lý do
  const r = await API.get("quotes", id);
  await dialog({title: t("q.submit"), feat: "M10.06", intro: `${r._title || id} · ${money(r.Grand_Total, r._tenant)}`, fields: [{id: "why", label: t("q.submitWhy"), kind: "textarea"}], ok: t("q.submit")}, async () => {
    r._approval = null; const a = apprOf("quotes", r); a.reason = $("#dlg-why").value.trim(); a.since = TODAY;
    logTo(r, t("q.submitted", {lv: a.levels[0]})); await API.update("quotes", id, {Quote_Stage: "Waiting For Approval"});
    closeModal(); toast(t("q.submitted", {lv: holderOf(a.levels[0])})); route();
  });
}
async function quoteToSO(id) { // M10.08: tạo Sales Order từ báo giá đã duyệt — chép khách, tiêu đề, dòng hàng, tổng tiền; gắn 2 chiều (Quote for SO)
  const q = await API.get("quotes", id), n = (await API.list("orders", {})).length + 42;
  const so = await API.create("orders", {_tenant: q._tenant, _layout: "Standard", Owner: q.Owner, Account_Name: q.Account_Name, Contact_Name: q.Contact_Name, Subject: q.Subject, Status: "New",
    New_After_Sales: q.New_After_Sales, Debtor_Code: q.Debtor_Code, Quotation_No: q._title, Ordered_Items: q.Quoted_Items, Sub_Total: q.Sub_Total, Total_Tax: q.Total_Tax, Grand_Total: q.Grand_Total,
    Sales_Order_Number: `${q._tenant}-SO-26-${String(n).padStart(4, "0")}`, _title: `${q._tenant}-SO-26-${String(n).padStart(4, "0")}`, _quote: {id, name: q._title}, _created: TODAY + "T" + new Date().toTimeString().slice(0, 5)});
  await API.update("quotes", id, {Quote_for_SO: {id: so.id, name: so._title}}); logTo(q, t("q.converted", {n: so._title}));
  toast(t("q.converted", {n: so._title})); go(`/e/orders/${so.id}`);
}
async function cloneRec(k, id) {
  const m = await E(k), r = await API.get(k, id), copy = JSON.parse(JSON.stringify(r));
  for (const f of ["id", "_log", "_tags", "_shared", "_deleted"]) delete copy[f];
  Object.assign(copy, {Owner: me().name, _created: new Date().toISOString().slice(0, 16), _title: (r._title || titleOf(m, r)) + " (copy)"});
  if (m.status) copy[m.status] = m.states[0];
  const c = await API.create(k, copy); toast(t("det.cloned")); go(`/e/${k}/${c.id}`);
}
function delRec(k, id) {
  dialog({title: t("lv.delete"), feat: "M04.04", intro: t("lv.deleteNote", {n: 1}), fields: [], ok: t("lv.delete")}, async () => {
    await API.update(k, id, {_deleted: {by: me().name, at: new Date().toISOString().slice(0, 16)}}); closeModal(); toast(t("lv.deleted", {n: 1})); go(`/e/${k}`);
  });
}
const EMAIL_TPL = ["Proposal – cover letter", "Sales contract for signature", "Service completion notice", "Plant registration expiry reminder", "Payment reminder"];
const ORG_EMAILS = [["sales@apexindustrial.example", "Commercial"], ["service@apexindustrial.example", "Service"], ["accounts@apexindustrial.example", "Finance"], ["purchasing@apexindustrial.example", "Procurement"]];
async function sendEmail(k, id, tpl) {
  const m = await E(k), r = await API.get(k, id);
  dialog({title: t("det.email"), feat: k === "quotes" ? "M10.09" : "M25.01", intro: titleOf(m, r),
    fields: [{id: "from", label: t("em.from"), kind: "select", options: ORG_EMAILS.map(x => ({value: x[0], label: `${x[0]} (${x[1]})`}))},
      {id: "to", label: t("em.to"), value: "customer@example.com"},
      {id: "tpl", label: t("em.template"), kind: "select", options: EMAIL_TPL.map(x => ({value: x, label: x, on: x === tpl}))},
      ...(["quotes", "orders", "invoices"].includes(k) ? [{id: "att", label: t("em.attach"), kind: "info", value: `${titleOf(m, r)}.pdf`}] : [])], ok: t("em.send")}, async () => {
    logTo(r, t("em.sentLog", {to: $("#dlg-to").value, tpl: $("#dlg-tpl").value})); toast(t("em.sent")); closeModal(); rerender();
  });
}
async function quickCreate() {
  const ks = Object.keys(S.app.entities).filter(k => can(k, "c") && teamEntities().includes(k));
  dialog({title: t("top.quick"), feat: "M31.07", fields: [{id: "k", label: "Module", kind: "select", options: ks.map(k => ({value: k, label: L(S.app.entities[k].label)}))}], ok: t("act.next2")},
    () => { closeModal(); go(`/e/${$("#dlg-k").value}/new`); });
}

/* ---------------- tạo mới ---------------- */
async function viewForm(k, layoutName) {
  const m = await E(k), lay = m.layouts.find(l => l.name === layoutName) || m.layouts[0];
  const kindOf = fd => fd.type === "subform" ? "lines" : fd.type === "picklist" && fd.options.length ? "select" : fd.type === "textarea" ? "textarea" : fd.type === "checkbox" ? "checkbox"
    : ({date: "date", datetime: "datetime-local", currency: "number", int: "number", decimal: "number", email: "email"}[fd.type] || "text");
  return render("form", {
    key: k, label: L(m.label), icon: m.icon, layout: lay.name, feat: m.feat.create,
    layouts: m.layouts.length > 1 ? m.layouts.map(l => ({name: l.name, on: l.name === lay.name, href: `/e/${k}/new?layout=${encodeURIComponent(l.name)}`})) : [],
    sections: lay.sections.map(s => ({name: s.name, inputs: s.fields.filter(f => m.fields[f] && !["formula", "autonumber"].includes(m.fields[f].type)).map(f => {
      const fd = m.fields[f]; return {api: f, label: fd.label, required: fd.required, kind: kindOf(fd), options: fd.options, wide: fd.type === "subform"};
    })})).filter(s => s.inputs.length),
  });
}
async function saveForm(k, layoutName) {
  const m = await E(k);
  const rec = {_tenant: S.tenant === "ALL" ? "APE" : S.tenant, _layout: layoutName, Owner: me().name, _created: new Date().toISOString().slice(0, 16)};
  document.querySelectorAll("[data-f2]").forEach(e => { const v = e.type === "checkbox" ? e.checked : e.value; if (v !== "" && v !== false) rec[e.dataset.f2] = v; });
  if (m.status && !rec[m.status]) rec[m.status] = m.states[0];
  rec._title = m.title.map(f => rec[f]).filter(Boolean).join(" ") || t("form.untitled");
  const r = await API.create(k, rec);
  toast(t("form.saved")); go(`/e/${k}/${r.id}`);
}

/* ---------------- trang chủ & phân tích ---------------- */
/* ---------------- duyệt theo DoA (M22.01 / M22.02) ----------------
 * Mỗi yêu cầu có r._approval: levels (chuỗi bậc duyệt theo approval_rules), step (số bậc đã duyệt), history, lý do, ngày gửi.
 * Chỉ người giữ bậc hiện tại (theo role, hoặc được uỷ quyền) mới thấy ở "Chờ tôi duyệt". Lệnh dịch vụ "Pending Quotation Approval" là chờ khách → Bảng điều phối việc. */
const APPR_SRC = {quotes: "Waiting For Approval", pr: "Pending Approval"}, WAIT_HI = 2, PR_LIMIT = 5000; // WAIT_HI: chờ quá n ngày thì tô màu (không phải SLA)
const turnOf = a => a.levels[a.step];
const holderOf = lv => (S.app.users.find(u => u.role === lv) || {}).name || lv;
const requesterOf = (k, r) => k === "pr" ? r.Requestor_Name || r.Owner : r.Owner;
/* Chuyển người duyệt (delegate): người đang giữ bậc chuyển riêng yêu cầu này cho người khác duyệt (a.dto = user id); bậc duyệt không đổi */
function myTurn(a, u = me()) { return a.dto ? a.dto === u.id : turnOf(a) === u.role; }
const nameOfUser = id => (S.app.users.find(u => u.id === id) || {}).name || id;
const turnHolder = a => a.dto ? nameOfUser(a.dto) : holderOf(turnOf(a));
const decided = a => a.history.filter(h => h.act !== "delegated"); // lịch sử duyệt / từ chối theo từng bậc (bỏ các lần chuyển người duyệt)
function apprOf(k, r) { // bản ghi chưa có hồ sơ duyệt (tạo trong phiên) → dựng theo bảng DoA
  if (!r._approval) {
    const amt = Number(r.Grand_Total || 0), rule = S.app.approval_rules.find(x => x.doc === k && x.cond.startsWith("≥") === amt >= (k === "pr" ? PR_LIMIT : 50000));
    r._approval = {levels: rule ? rule.levels : ["General Manager"], amount: amt, disc: null, margin: null, reason: "", since: TODAY, step: 0, history: []};
  }
  return r._approval;
}
async function approvals(tenant = S.tenant) { // tất cả yêu cầu đang chờ duyệt nội bộ
  const out = [];
  for (const [k, st] of Object.entries(APPR_SRC)) {
    const m = await E(k);
    for (const r of await API.list(k, {tenant})) if (!r._deleted && r[m.status] === st) out.push({k, r, m, a: apprOf(k, r)});
  }
  return out.sort((x, y) => x.a.since.localeCompare(y.a.since));
}
const myApprovals = async () => (await approvals()).filter(x => myTurn(x.a));
const DISC_MAX = 10; // ngưỡng chiết khấu theo DoA (giả định, chờ KH xác nhận)
let OVERDUE = {}; // công nợ quá hạn theo khách (từ trạng thái hoá đơn đồng bộ kế toán, M28.03)
async function loadOverdue() {
  OVERDUE = {};
  for (const r of await API.list("invoices", {})) if (r.Payment_Status === "Overdue" && r.Account_Name) OVERDUE[r.Account_Name.id] = (OVERDUE[r.Account_Name.id] || 0) + Number(r.Grand_Total || 0);
}
const ruleFor = (doc, amt) => S.app.approval_rules.find(x => x.doc === doc && x.cond.startsWith("≥") === amt >= Number(x.cond.replace(/[^\d.]/g, "")));
/* thẻ duyệt: trả lời 4 câu — bán / mua cái gì, vì sao đến tay tôi, rủi ro thu tiền, có gấp không */
function apprCard({k, r, m, a}) {
  const wait = Math.max(0, ageOf(a.since)), mine = myTurn(a);
  const lines = (k === "quotes" ? r.Quoted_Items : r.Subform_4) || [], rule = ruleFor(k, a.amount);
  const why = [rule ? rule.cond : "", a.disc > DISC_MAX ? t("ap.whyDisc", {p: a.disc, m: DISC_MAX}) : ""].filter(Boolean).join(" · ");
  const vDays = parseInt(r.Validity), vLeft = vDays ? vDays - wait : null;
  const projects = k === "pr" ? [...new Set(lines.map(x => x.Project_Number).filter(Boolean))] : [];
  const what = [k === "quotes" ? r.Subject : "", projects.length ? t("ap.projects", {p: projects.join(", ")}) : "",
    k === "quotes" && (r.Payment_Terms || r.Payment_Term) ? t("ap.pay", {p: r.Payment_Terms || r.Payment_Term}) : ""].filter(Boolean).join(" · ");
  const debt = k === "quotes" && r.Account_Name ? OVERDUE[r.Account_Name.id] || 0 : 0;
  return {key: k, id: r.id, title: titleOf(m, r), type: L(m.label), party: ((r.Account_Name || r.Vendor || {}).name) || subOf(m, r), subject: k === "quotes" ? r.Subject : "",
    value: money(a.amount, r._tenant), gst: k === "quotes", disc: a.disc != null ? a.disc + "%" : "", discHi: a.disc > DISC_MAX,
    discMax: DISC_MAX, why, what, debt: debt ? money(Math.round(debt), r._tenant) : "",
    validity: vLeft == null ? "" : t(vLeft >= 0 ? "ap.validLeft" : "ap.validGone", {d: dmy(new Date(new Date(a.since).getTime() + vDays * 864e5).toISOString().slice(0, 10)), n: Math.abs(vLeft)}), validHi: vLeft != null && vLeft <= 3, validNear: vLeft != null && vLeft <= 7, // card chỉ hiện hiệu lực khi còn ≤ 7 ngày
    next: a.step + 1 < a.levels.length ? holderOf(a.levels[a.step + 1]) : "",
    step: a.step + 1, nStep: a.levels.length,
    by: requesterOf(k, r), wait, late: wait > WAIT_HI, reason: a.reason, rule: `${L(m.label)} ${(S.app.approval_rules.find(x => x.doc === k && x.levels.join() === a.levels.slice(0, x.levels.length).join()) || {}).cond || ""}`,
    chain: a.levels.map((lv, i) => ({lv, cls: i < a.step ? "ok" : i === a.step ? "cur" : "next", who: i < a.step ? (decided(a)[i] || {}).by : i === a.step ? turnHolder(a) : holderOf(lv),
      me: i === a.step && mine})),
    holder: turnHolder(a), dto: !!a.dto, mine, tenant: r._tenant, tcolor: tenantOf(r._tenant).color};
}
async function apprDo(k, id, ok) {
  if (isGroup()) return; // Group View chỉ xem: duyệt phải mở trong pháp nhân
  const m = await E(k), r = await API.get(k, id), a = apprOf(k, r);
  await dialog({title: t(ok ? "ap.approveT" : "ap.rejectT"), feat: "M22.01", intro: `${isGroup() ? r._tenant + " · " : ""}${titleOf(m, r)} · ${money(a.amount, r._tenant)} · ${t("ap.step", {i: a.step + 1, n: a.levels.length, lv: turnOf(a)})}`,
    fields: [{id: "note", label: t(ok ? "ap.noteOpt" : "ap.reasonReq"), kind: "textarea"}], ok: t(ok ? "mj.approve" : "mj.reject")}, async () => {
    const note = $("#dlg-note").value.trim();
    if (!ok && !note) { $("#dlg-note").classList.add("err"); $("#dlg-note").focus(); return toast(t("ap.needReason")); }
    const done = await apprApply(k, r, m, ok, note);
    closeModal(); toast(ok ? (done ? t("ap.doneAll") : t("ap.toNext", {n: turnHolder(a)})) : t("ap.rejected")); route();
  });
}
async function apprApply(k, r, m, ok, note) { // ghi lịch sử + timeline; duyệt bậc cuối → trạng thái đã duyệt; từ chối → trả về người gửi
  const a = apprOf(k, r), lv = turnOf(a), u = me();
  a.history.push({level: lv, by: u.name, act: ok ? "approved" : "rejected", note, at: TODAY + "T" + new Date().toTimeString().slice(0, 5)});
  a.dto = null; // người được chuyển đã xử lý xong bậc này
  logTo(r, t(ok ? "ap.logOk" : "ap.logNo", {lv}) + (note ? ` — “${note}”` : ""));
  if (!ok) { await API.update(k, r.id, {[m.status]: k === "quotes" ? "Negotiation" : "Rejected"}); return true; }
  a.step++;
  if (a.step >= a.levels.length) { await API.update(k, r.id, {[m.status]: k === "quotes" ? "Confirmed" : "Approved"}); return true; }
  return false;
}
async function apprDeleg(k, id) { // chuyển yêu cầu này cho người khác duyệt, ghi vào lịch sử duyệt
  if (isGroup()) return;
  const m = await E(k), r = await API.get(k, id), a = apprOf(k, r), u = me(), lv = turnOf(a);
  await dialog({title: t("ap.delegT"), feat: "M22.02", intro: `${titleOf(m, r)} · ${money(a.amount, r._tenant)} · ${t("ap.step", {i: a.step + 1, n: a.levels.length, lv})}`,
    fields: [{id: "to", label: t("ap.delegTo"), kind: "select", options: S.app.users.filter(x => x.id !== u.id && x.name !== requesterOf(k, r)).map(x => ({value: x.id, label: `${x.name} · ${x.role}`}))},
      {id: "note", label: t("ap.noteOpt"), kind: "textarea"}], ok: t("ap.delegOk")}, async () => {
    const to = $("#dlg-to").value, note = $("#dlg-note").value.trim(), n = nameOfUser(to);
    a.history.push({level: lv, by: u.name, act: "delegated", to: n, note, at: TODAY + "T" + new Date().toTimeString().slice(0, 5)});
    a.dto = to; logTo(r, t("ap.delegLog", {lv, n}) + (note ? ` — “${note}”` : ""));
    closeModal(); toast(t("ap.delegDone", {n})); route();
  });
}
async function apprPeek(k, id) { // xem nhanh: dòng hàng, lý do, lịch sử duyệt — không rời trang
  await loadOverdue();
  const m = await E(k), r = await API.get(k, id), a = apprOf(k, r), c = apprCard({k, r, m, a});
  const sub = k === "quotes" ? "Quoted_Items" : "Subform_4", fd = m.fields[sub] || {}, rows = r[sub] || [];
  const cols = (fd.columns || []).filter(x => rows.some(row => row[x.api] != null)).slice(0, 5);
  $("#modal").innerHTML = await render("appr-peek", {...c, cols: cols.map(x => x.label), lines: rows.map(row => cols.map(x => fmt(x, row[x.api], null, null, r._tenant))),
    history: a.history.map(h => ({...h, ok: h.act === "approved", deleg: h.act === "delegated", at: dmy(h.at)})), pdf: k === "quotes", group: isGroup()});
  $("#modal").classList.add("show");
}
/* Trang chủ theo role (M27.06): trả lời 3 câu hỏi — hôm nay tôi cần làm gì, có gì bất thường, tôi đang làm thế nào.
 * Bố cục mặc định theo profile / bộ phận của người đăng nhập; chọn tay thì nhớ theo từng user trong phiên. */
const TODAY = "2026-10-27", MONTH = TODAY.slice(0, 7), PREV_MONTH = "2026-09";
const ageOf = d => Math.round((new Date(TODAY) - new Date(String(d).slice(0, 10))) / 864e5);
const isDone = s => /completed|closed|cancel|not returning|delivered/i.test(s || "");
function homeRole(u = me()) {
  if (S.homeBy && S.homeBy[u.id]) return S.homeBy[u.id];
  if (u.profile === "Sales Engineer" || u.team === "sales") return "sales";
  if (["After Sales Team", "Engineers"].includes(u.profile) || u.team === "aftersales") return "after";
  return "mgr";
}
function setHome(v) { S.homeBy = S.homeBy || {}; S.homeBy[me().id] = v; route(); }
const sumOf = (rows, f) => rows.reduce((s, r) => s + Number(r[f] || 0), 0);
function delta(cur, prev, bare) { // so với kỳ trước: ▲/▼ % (bare: bỏ chữ "so với tháng trước", dùng ở bảng báo cáo đã có cột kỳ trước)
  if (!prev) return cur ? {cls: "up", txt: t("home.new")} : null;
  const p = Math.round((cur - prev) / prev * 100);
  return {cls: p >= 0 ? "up" : "dn", txt: `${p >= 0 ? "▲" : "▼"} ${Math.abs(p)}%${bare ? "" : " " + t("home.vsPrev")}`};
}
async function viewHome() {
  if (S.tenant === "ALL") return viewGroupHome(); // Group View: bố cục riêng, chỉ đọc
  await syncAutoTasks(); // việc hệ thống nhắc → task, để "Việc cần làm" trên trang chủ lấy chung nguồn với Bảng công việc
  const keys = ["deals", "orders", "jobs", "vehicles", "tasks", "quotes"];
  const [deals, orders, jobs, vehicles, tasks, quotes] = await Promise.all(keys.map(k => rowsOf(k, {tenant: S.tenant})));
  const [md, mj, mq, mt] = await Promise.all(["deals", "jobs", "quotes", "tasks"].map(E));
  const u = me(), name = u.name, mine = r => r.Owner === name || r.Handled_By === name, role = homeRole(u);
  const base = {homes: ["sales", "after", "mgr"].map(id => ({id, label: t("home.l." + id), on: id === role})), role, [role]: true,
    tenantName: L(tenantOf(S.tenant).name), firstName: name.split(" ")[0], monthLbl: t("home.month", {m: "10/2026"})};
  if (![deals, orders, jobs, quotes].some(x => x.length)) // pháp nhân chưa có dữ liệu → hướng dẫn bắt đầu, không hiện toàn số 0
    return render("home", {...base, empty: true, canLead: can("leads", "c"), canJob: can("jobs", "c")});

  /* việc của tôi: chỉ task của người đăng nhập, chưa hoàn thành, quá hạn / hôm nay lên đầu */
  const myTasks = tasks.filter(r => r.Owner === name && !isDone(r.Status)).sort((a, b) => (a.Due_Date || "9").localeCompare(b.Due_Date || "9"));
  const taskItems = myTasks.slice(0, 5).map(r => { const d = r.Due_Date ? ageOf(r.Due_Date) : null;
    return {id: r.id, subject: r.Subject, due: dmy(r.Due_Date), priority: r.Priority || "", status: r.Status || "", auto: !!r._auto, src: r._src ? `/e/${r._src.k}/${r._src.id}` : "",
      over: d > 0 ? t("home.overdue", {n: d}) : ""}; });
  const nOver = myTasks.filter(r => r.Due_Date && ageOf(r.Due_Date) > 0).length;
  const taskHead = nOver ? t("home.taskOver", {o: nOver}) : "";
  /* hoạt động liên quan tới tôi: bản ghi tôi phụ trách / xử lý, mới nhất trước */
  const feed = [["jobs", jobs, mj], ["deals", deals, md], ["quotes", quotes, mq]].flatMap(([k, rows, m]) => rows.filter(mine).map(r => ({k, r, m})))
    .sort((a, b) => (b.r._created || "").localeCompare(a.r._created || "")).slice(0, 5)
    .map(({k, r, m}) => ({key: k, id: r.id, owner: r.Owner || "", title: titleOf(m, r), pill: pill(r[m.status], m), at: dmy(r._created), type: L(m.label)}));
  const out = {...base, tasks: taskItems, taskHead, feed};

  if (role === "sales") {
    const q = quotes.filter(mine), d = deals.filter(mine), o = orders.filter(mine);
    const won = q.filter(r => r.Quote_Stage === "Closed Won").length, closed = q.filter(r => /closed/i.test(r.Quote_Stage)).length;
    const revNow = sumOf(o.filter(r => (r._created || "").startsWith(MONTH)), "Grand_Total"), revPrev = sumOf(o.filter(r => (r._created || "").startsWith(PREV_MONTH)), "Grand_Total");
    const openQ = q.filter(r => !/closed|delivered/i.test(r.Quote_Stage));
    Object.assign(out, {
      nums: [{lbl: t("home.n.rev"), v: money(Math.round(revNow)), delta: delta(revNow, revPrev), href: "/e/orders?view=mine"},
        {lbl: t("home.n.quotes"), v: openQ.length, sub: t("home.n.winRate", {p: closed ? Math.round(won / closed * 100) : 0}), href: "/e/quotes?view=mine"},
        {lbl: t("home.n.pipe"), v: money(sumOf(d.filter(r => !/closed/i.test(r.Stage)), "Amount")), sub: t("home.k2s", {n: d.filter(r => !/closed/i.test(r.Stage)).length}), href: "/e/deals?view=mine"}],
      myQuotes: barItems(mq.states.map(s => { const l = openQ.filter(r => r.Quote_Stage === s); return [s, l.length, ""]; }).filter(x => x[1]), false,
        s => toneColor(mq.tones[s]) === "pri" ? "" : `var(--${toneColor(mq.tones[s])})`, v => `/e/quotes?f=Quote_Stage&v=${encodeURIComponent(v)}&view=mine`)});
  }
  if (role === "after") {
    const active = jobs.filter(r => !isDone(r.Status));
    const states = [...mj.states, ...new Set(active.map(r => r.Status))].filter((s, i, a) => s && a.indexOf(s) === i && !isDone(s));
    const warnStates = s => mj.tones[s] === "warn";
    Object.assign(out, {jobFeat: mj.feat.kanban,
      board: states.map(s => ({s, n: active.filter(r => r.Status === s).length, tone: toneColor(mj.tones[s]), href: drill("jobs", "Status")(s)})).filter(x => x.n),
      nActive: active.length,
      attention: active.filter(r => warnStates(r.Status) || ageOf(r._created) > 30).sort((a, b) => warnStates(b.Status) - warnStates(a.Status) || ageOf(b._created) - ageOf(a._created)).slice(0, 5)
        .map(r => ({id: r.id, doc: titleOf(mj, r), plate: (r.Vehicle_Number || {}).name || r.Vehicle_Numbers || "", acc: (r.Account || {}).name || "", pill: pill(r.Status, mj),
          why: warnStates(r.Status) ? t("home.att.wait") : t("home.att.long", {n: ageOf(r._created)})})),
      expiring: vehicles.flatMap(r => [["Plant rego", r.LM_Expiry_Date], ["EPA", r.NEA_Expiry_Date]].map(([kind, dt]) => ({r, kind, d: dt ? -ageOf(dt) : -1})))
        .filter(x => x.d >= 0 && x.d <= 30).sort((a, b) => a.d - b.d).slice(0, 5) // cùng ngưỡng 30 ngày với view "Sắp hết hạn" của Xe / thiết bị
        .map(x => ({id: x.r.id, plate: x.r.Name, account: (x.r.Account_Name || {}).name || "", kind: x.kind, days: x.d, tone: x.d < 20 ? "bad" : "warn"}))});
  }
  if (role === "mgr") {
    const open = deals.filter(r => !/closed/i.test(r.Stage || "")), active = jobs.filter(r => !isDone(r.Status));
    const revNow = sumOf(orders.filter(r => (r._created || "").startsWith(MONTH)), "Grand_Total"), revPrev = sumOf(orders.filter(r => (r._created || "").startsWith(PREV_MONTH)), "Grand_Total");
    await loadOverdue();
    const appr = (await myApprovals()).map(apprCard), stuck = active.filter(r => mj.tones[r.Status] === "warn");
    Object.assign(out, {approvals: appr.slice(0, 5), nAppr: appr.length,
      kpi: [{lbl: t("home.k1m"), icon: "dollar", v: money(Math.round(revNow)), delta: delta(revNow, revPrev), sub: t("home.k1s", {n: orders.filter(r => (r._created || "").startsWith(MONTH)).length}), href: "/e/orders"},
        {lbl: t("home.k2"), icon: "target", v: money(sumOf(open, "Amount")), sub: t("home.k2s", {n: open.length}), href: "/e/deals/kanban"},
        {lbl: t("home.k3"), icon: "wrench", o: true, v: active.length, sub: t("home.k3s", {n: jobs.length}), href: "/e/jobs/kanban"},
        {lbl: t("home.k5"), icon: "alert", o: true, v: stuck.length, sub: t("home.k5s"), href: "/e/jobs?f=_tone&v=warn"}],
      pipeline: barItems(md.states.map(s => { const l = open.filter(r => r.Stage === s); return [s, sumOf(l, "Amount"), l.length]; }).filter(x => x[2]), true,
        s => md.tones[s] === "ok" ? "var(--ok)" : "", drill("deals", "Stage")),
      jobStates: barItems(mj.states.map(s => [s, active.filter(r => r.Status === s).length, ""]).filter(x => x[1]), false,
        s => mj.tones[s] === "warn" ? "var(--warn)" : "", drill("jobs", "Status")), // trước ở trang Dashboard (đã gộp vào trang chủ)
      byTenant: null});
  }
  out.pins = await pinnedReports();
  return render("home", out);
}
/* Trang chủ Group View (tenant ALL, chỉ đọc): người xem là GM / Director / tài chính tập đoàn.
 * Không có thao tác tạo / duyệt; mục tiêu là so sánh các pháp nhân, thấy pháp nhân nào đang có vấn đề rồi bấm vào để chuyển sang pháp nhân đó. */
async function viewGroupHome() {
  const [deals, orders, jobs, vehicles, quotes] = await Promise.all(["deals", "orders", "jobs", "vehicles", "quotes"].map(k => rowsOf(k, {tenant: "ALL"})));
  const [md, mj, mq] = await Promise.all(["deals", "jobs", "quotes"].map(E));
  const appr = await approvals(), codes = me().tenants.filter(c => c !== "ALL");
  const inMonth = (r, m) => (r._created || "").startsWith(m), of = (rows, c) => rows.filter(r => r._tenant === c);
  const openDeal = r => !/closed/i.test(r.Stage || ""), expSoon = r => [r.LM_Expiry_Date, r.NEA_Expiry_Date].some(d => d && -ageOf(d) >= 0 && -ageOf(d) <= 30);
  const rows = codes.map(c => {
    const o = of(orders, c), q = of(quotes, c), j = of(jobs, c).filter(r => !isDone(r.Status)), a = appr.filter(x => x.r._tenant === c);
    const now = sumOf(o.filter(r => inMonth(r, MONTH)), "Grand_Total"), prev = sumOf(o.filter(r => inMonth(r, PREV_MONTH)), "Grand_Total");
    const won = q.filter(r => r.Quote_Stage === "Closed Won").length, closed = q.filter(r => /closed/i.test(r.Quote_Stage)).length;
    return {c, name: L(tenantOf(c).name), color: tenantOf(c).color, now, prev, delta: delta(now, prev),
      pipe: sumOf(of(deals, c).filter(openDeal), "Amount"), nQ: q.filter(r => !/closed|delivered/i.test(r.Quote_Stage)).length,
      win: closed ? Math.round(won / closed * 100) + "%" : "—", jobs: j.length, stuck: j.filter(r => mj.tones[r.Status] === "warn").length,
      appr: a.length, apprOld: a.filter(x => ageOf(x.a.since) > WAIT_HI).length, exp: of(vehicles, c).filter(expSoon).length,
      empty: ![o, q, of(deals, c), of(jobs, c)].some(x => x.length)};
  });
  const tot = k => rows.reduce((s, r) => s + r[k], 0);
  const maxNow = Math.max(1, ...rows.map(r => Math.max(r.now, r.prev)));
  /* điểm nóng toàn group: duyệt chờ lâu, job kẹt, deal lớn quá ngày chốt — chỉ xem, bấm để mở bản ghi */
  const hot = [
    ...appr.filter(x => ageOf(x.a.since) > WAIT_HI).map(x => ({c: x.r._tenant, key: x.k, id: x.r.id, title: titleOf(x.m, x.r), w: ageOf(x.a.since) + 30,
      txt: t("gh.h.appr", {n: ageOf(x.a.since), v: money(x.a.amount, x.r._tenant), lv: turnOf(x.a)})})),
    ...jobs.filter(r => !isDone(r.Status) && mj.tones[r.Status] === "warn").map(r => ({c: r._tenant, key: "jobs", id: r.id, title: titleOf(mj, r), w: ageOf(r._created),
      txt: t("gh.h.job", {s: r.Status, n: ageOf(r._created)})})),
    ...deals.filter(r => openDeal(r) && r.Closing_Date && ageOf(r.Closing_Date) > 30).map(r => ({c: r._tenant, key: "deals", id: r.id, title: titleOf(md, r), w: ageOf(r.Closing_Date),
      txt: t("gh.h.deal", {v: money(r.Amount, r._tenant), n: ageOf(r.Closing_Date)})})),
  ].sort((a, b) => b.w - a.w).slice(0, 8).map(x => ({...x, color: tenantOf(x.c).color}));
  const tones = ["info", "warn", "ok"];
  return render("home-group", {firstName: me().name.split(" ")[0], monthLbl: t("home.month", {m: "10/2026"}), pins: await pinnedReports(),
    kpi: [{lbl: t("home.k1m"), icon: "dollar", v: money(Math.round(tot("now"))), delta: delta(tot("now"), tot("prev")), sub: t("gh.k1s", {n: codes.length}), href: "/e/orders"},
      {lbl: t("home.k2"), icon: "target", v: money(tot("pipe")), sub: t("home.k2s", {n: deals.filter(openDeal).length}), href: "/e/deals/kanban"},
      {lbl: t("home.k3"), icon: "wrench", o: true, v: tot("jobs"), sub: t("gh.k3s", {n: tot("stuck")}), href: "/e/jobs/kanban"},
      {lbl: t("gh.k4"), icon: "check", o: true, v: tot("appr"), sub: t("gh.k4s", {n: tot("apprOld"), d: WAIT_HI}), href: "/e/quotes?f=Quote_Stage&v=Waiting%20For%20Approval"}],
    /* mỗi ô bấm được: ở lại Group View, mở danh sách gộp lọc theo pháp nhân (+ nhóm trạng thái); tên pháp nhân → chuyển sang pháp nhân đó */
    rows: rows.map(r => { const f = k => `/e/${k}?f=_tenant&v=${r.c}`;
      return {...r, nowM: money(Math.round(r.now), r.c), pipeM: money(r.pipe, r.c), go: `/home?tenant=${r.c}`,
        h: {rev: f("orders"), pipe: f("deals"), q: f("quotes"), jobs: f("jobs"), stuck: f("jobs") + "&f=_tone&v=warn", appr: f("quotes") + "&f=Quote_Stage&v=Waiting%20For%20Approval", exp: f("vehicles")},
        hiStuck: r.stuck > 0, hiAppr: r.apprOld > 0, hiExp: r.exp > 0}; }),
    rev: rows.map(r => ({c: r.c, color: r.color, now: money(Math.round(r.now), r.c), wNow: r.now / maxNow * 100, wPrev: r.prev / maxNow * 100, prev: money(Math.round(r.prev), r.c)})),
    jobMix: rows.filter(r => r.jobs).map(r => { const js = of(jobs, r.c).filter(x => !isDone(x.Status));
      return {c: r.c, n: js.length, parts: tones.map(g => { const n = js.filter(x => (mj.tones[x.Status] || "info") === g).length; return {n, w: n / js.length * 100, color: g === "info" ? "pri" : g}; }).filter(p => p.n)}; }),
    legend: tones.map(g => ({label: t("gh.t." + g), color: g === "info" ? "pri" : g})),
    hot});
}
async function doneTask(id) { await API.update("tasks", id, {Status: "Completed"}); toast(t("home.taskDone")); route(); }
function findPlate(q) { // tìm theo biển số: bỏ khoảng trắng (cả ở biển số lưu dạng "XA 34 XN"), đúng 1 xe → mở hồ sơ xe; nhiều → trang tìm kiếm
  const raw = (q || "").trim(); q = raw.replace(/\s+/g, "").toUpperCase(); if (!q) return;
  API.list("vehicles", {tenant: S.tenant}).then(rows => { const hit = rows.filter(r => (r.Name || "").replace(/\s+/g, "").toUpperCase().includes(q));
    go(hit.length === 1 ? `/e/vehicles/${hit[0].id}` : `/p/search?q=${encodeURIComponent(raw)}`); });
}
/* Chờ duyệt: ở pháp nhân 3 tab — chờ tôi duyệt (đúng bậc DoA của tôi), tôi đã gửi (đang ở bậc nào, ai giữ), đã xử lý gần đây.
 * Group View (chỉ xem): chờ tôi duyệt gộp mọi pháp nhân, nút "Duyệt trong APE" chuyển sang pháp nhân rồi mở bản ghi để duyệt. */
async function viewMyJobs(tn, tabQ) {
  const g = isGroup(), tabs = g ? ["mine"] : ["mine", "sent", "done"];
  await loadOverdue();
  if (tabQ) { S.apprTab = tabQ; history.replaceState(null, "", toPublic("/p/myjobs")); }
  const tab = tabs.includes(S.apprTab) ? S.apprTab : "mine", type = S.apprType || "", all = (await approvals()).filter(x => !tn || x.r._tenant === tn);
  const ofType = list => list.filter(x => !type || x.k === type), u = me();
  const mine = all.filter(x => myTurn(x.a)), sent = all.filter(x => requesterOf(x.k, x.r) === u.name);
  const done = [];
  for (const k of Object.keys(APPR_SRC)) { const m = await E(k);
    for (const r of await API.list(k, {tenant: S.tenant})) for (const h of (r._approval || {}).history || []) if (h.by === u.name && (!tn || r._tenant === tn)) done.push({k, r, m, h}); }
  done.sort((x, y) => y.h.at.localeCompare(x.h.at));
  const n = {mine: mine.length, sent: sent.length, done: done.length};
  const cards = (tab === "mine" ? ofType(mine) : ofType(sent)).map(apprCard);
  return render("myjobs", {head: {icon: "check", title: t(g ? "ap.titleG" : "page.myjobs") + (tn ? ` · ${tn}` : ""), sub: t(g ? "ap.subG" : "ap.sub"), feat: "M22.02"},
    tabs: tabs.map(id => ({id, n: n[id], label: t((g && id === "mine" ? "ap.tab.mineG" : "ap.tab." + id)), on: id === tab})),
    types: [["", t("ap.allTypes")], ...Object.keys(APPR_SRC).map(k => [k, L(S.app.entities[k].label)])].map(([v, l]) => ({v, l, on: v === type})),
    tab, isDone: tab === "done", isSent: tab === "sent", cards, group: g,
    done: done.filter(x => !type || x.k === type).slice(0, 20).map(({k, r, m, h}) => ({key: k, id: r.id, title: titleOf(m, r), type: L(m.label), lv: h.level, ok: h.act === "approved", deleg: h.act === "delegated", to: h.to,
      note: h.note, at: dmy(h.at), pill: pill(r[m.status], m), value: money((r._approval || {}).amount, r._tenant)}))});
}
function apprTab(id) { S.apprTab = id; route(); }
function apprType(v) { S.apprType = v; route(); }
async function quickMove(k, id, to) { const m = await E(k); await API.update(k, id, {[m.status]: to}); toast(t("det.movedToast", {s: to})); route(); }
/* ---------------- Báo cáo (M27.02, M27.04, M27.05, M27.07) ----------------
 * Mỗi báo cáo: nhóm bản ghi theo 1 field, đếm hoặc cộng 1 field tiền, lọc theo kỳ (theo field ngày của báo cáo) và so với kỳ trước.
 * Chỉ lấy dữ liệu pháp nhân đang chọn (M01.04); báo cáo so sánh giữa các pháp nhân chỉ có ở Group View. */
const REPORTS = [ // id, tên, module, nhóm theo, giá trị (rỗng = đếm), thư mục, field ngày (rỗng = không lọc kỳ), kỳ mặc định, chỉ Group View
  {id: "r1", name: "rep.r1", k: "orders", f: "_tenant", mea: "Grand_Total", dir: "sales", date: "_created", group: true},
  {id: "r8", name: "rep.r8", k: "orders", f: "_month", mea: "Grand_Total", dir: "sales", date: "_created", defP: "year", dims: ["_month", "Equipment_Type", "Account_Name", "New_After_Sales"]},
  {id: "r7", name: "rep.r7", k: "orders", f: "Account_Name", mea: "Grand_Total", dir: "sales", date: "_created"},
  {id: "r2", name: "rep.r2", k: "deals", f: "Stage", mea: "Amount", dir: "sales", date: "Closing_Date"},
  {id: "r10", name: "rep.r10", k: "deals", kind: "forecast", f: "Closing_Date", dir: "sales", date: "Closing_Date", defP: "year"}, // M13.01 (trước là menu Dự báo doanh số)
  {id: "r4", name: "rep.r4", k: "quotes", kind: "list", f: "Owner", mea: "Grand_Total", dir: "sales", date: "_created", defP: "all", when: r => ["Negotiation", "Quotation"].includes(r.Quote_Stage)},
  {id: "r9", name: "rep.r9", k: "quotes", kind: "win", f: "Owner", dir: "sales", date: "_created", defP: "year"},
  {id: "r3", name: "rep.r3", k: "jobs", f: "Status", mea: "", dir: "after", date: "_created"},
  {id: "r6", name: "rep.r6", k: "vehicles", f: "Equipment_Type", mea: "", dir: "after", date: ""},
  {id: "r5", name: "rep.r5", k: "pr", f: "Vendor", mea: "", dir: "buy", date: "Date_of_Request"},
];
const REP_DIRS = ["sales", "after", "buy", "mine"], QUOTE_WON = /confirmed|delivered|closed won/i, QUOTE_OLD = 14;
const allReports = () => [...REPORTS, ...(S.myReports || [])].filter(r => can(r.k) && (!r.group || isGroup()) && (r.f !== "_tenant" || isGroup()));
const repName = r => r.mine ? r.name : t(r.name);
const repState = rep => (S.repP = S.repP || {})[rep.id] = S.repP[rep.id] || {p: rep.defP || "month", from: "", to: "", dim: rep.f};
/* kỳ báo cáo tính từ ngày hôm nay của prototype (TODAY); "custom" lấy từ/đến do người dùng nhập, kỳ trước = cùng độ dài ngay trước đó */
function repPeriod(p, from, to) {
  const y = +TODAY.slice(0, 4), mo = +TODAY.slice(5, 7), d = (yy, mm, dd) => new Date(Date.UTC(yy, mm - 1, dd)).toISOString().slice(0, 10);
  const M = m0 => ({from: d(y, m0, 1), to: d(y, m0 + 1, 0), pfrom: d(y, m0 - 1, 1), pto: d(y, m0, 0)}), q0 = Math.floor((mo - 1) / 3) * 3 + 1;
  const Q = s0 => ({from: d(y, s0, 1), to: d(y, s0 + 3, 0), pfrom: d(y, s0 - 3, 1), pto: d(y, s0, 0)}), Y = yy => ({from: d(yy, 1, 1), to: d(yy, 12, 31), pfrom: d(yy - 1, 1, 1), pto: d(yy - 1, 12, 31)});
  if (p === "month") return M(mo);
  if (p === "prevMonth") return M(mo - 1);
  if (p === "quarter") return Q(q0);
  if (p === "prevQuarter") return Q(q0 - 3);
  if (p === "year") return Y(y);
  if (p === "prevYear") return Y(y - 1);
  if (p === "custom" && from && to) { const n = (new Date(to) - new Date(from)) / 864e5 + 1, pt = new Date(new Date(from).getTime() - 864e5);
    return {from, to, pfrom: new Date(pt.getTime() - (n - 1) * 864e5).toISOString().slice(0, 10), pto: pt.toISOString().slice(0, 10)}; }
  return null; // tất cả thời gian: không lọc, không so sánh
}
/* dựng 1 báo cáo: biểu đồ (bars) + bảng dùng chung (cols, rows, foot; mỗi ô có x = giá trị thô cho CSV, h = html hiển thị)
 * kind: (mặc định) nhóm theo 1 field · list = danh sách bản ghi (báo giá đang đàm phán) · win = tỷ lệ chốt báo giá theo người phụ trách */
async function repBuild(rep, per, dim) {
  const m = await E(rep.k), all = await rowsOf(rep.k, {tenant: S.tenant}), f = dim || rep.f;
  const dv = r => String(r[rep.date] || "").slice(0, 10), inP = (r, a, b) => dv(r) && dv(r) >= a && dv(r) <= b;
  const cur = all.filter(r => (!rep.when || rep.when(r)) && (!per || !rep.date || inP(r, per.from, per.to)));
  const c = (x, h, num) => ({x, h: h == null ? esc(String(x)) : h, num}), mon = v => money(Math.round(v)), sum = rs => sumOf(rs, rep.mea);
  const nameOf = (r, ff) => ff === "_tenant" ? r._tenant : ff === "_month" ? dv(r).slice(0, 7) : (r[ff] && r[ff].name) || r[ff] || "—";
  if (rep.kind === "list") {
    const rows = cur.sort((a, b) => ageOf(b[rep.date]) - ageOf(a[rep.date])), by = {};
    for (const r of rows) by[r[f]] = (by[r[f]] || 0) + Number(r[rep.mea] || 0);
    return {bars: barItems(Object.entries(by).sort((a, b) => b[1] - a[1]), true, null, drill(rep.k, f)), cmp: false,
      cols: [{l: L(m.label)}, {l: fieldLabel(m, "Account_Name")}, {l: t("lv.owner")}, {l: "Stage"}, {l: fieldLabel(m, rep.mea), num: true}, {l: t("rep.sentOn")}, {l: t("rep.days"), num: true}],
      rows: rows.map(r => { const a = ageOf(r[rep.date]), tl = titleOf(m, r);
        return [c(tl, `<a href="/e/${rep.k}/${r.id}"><b>${esc(tl)}</b></a>`), c((r.Account_Name || {}).name || ""), c(r.Owner || ""), c(r.Quote_Stage, pill(r.Quote_Stage, m)),
          c(r[rep.mea], `<b>${mon(r[rep.mea])}</b>`, true), c(dmy(dv(r))), c(a, `<span class="${a > QUOTE_OLD ? "bad-t" : ""}">${a}</span>`, true)]; }),
      foot: [c(t("rep.nQuotes", {n: rows.length})), c(""), c(""), c(""), c(sum(rows), mon(sum(rows)), true), c(""), c("")]};
  }
  if (rep.kind === "forecast") { // deal chưa thua theo tháng chốt: pipeline và có trọng số (× Probability)
    const g = {};
    for (const r of cur) { if (/lost/i.test(r.Stage || "")) continue; const mth = dv(r).slice(0, 7) || "—", x = g[mth] = g[mth] || {n: 0, p: 0, w: 0};
      x.n++; x.p += Number(r.Amount || 0); x.w += Number(r.Amount || 0) * Number(r.Probability || 50) / 100; }
    const list = Object.entries(g).sort((a, b) => a[0].localeCompare(b[0])), lbl = k => k === "—" ? k : k.slice(5) + "/" + k.slice(0, 4), tot = list.reduce((s, [, x]) => ({n: s.n + x.n, p: s.p + x.p, w: s.w + x.w}), {n: 0, p: 0, w: 0});
    return {bars: barItems(list.map(([k, x]) => [lbl(k), Math.round(x.w)]), true), cmp: false,
      cols: [{l: t("rep.month")}, {l: t("fc.pipe"), num: true}, {l: t("fc.weighted"), num: true}, {l: t("rep.nDeals"), num: true}],
      rows: list.map(([k, x]) => [c(lbl(k)), c(x.p, mon(x.p), true), c(Math.round(x.w), `<b>${mon(x.w)}</b>`, true), c(x.n, null, true)]),
      foot: [c(t("rep.total")), c(tot.p, mon(tot.p), true), c(Math.round(tot.w), mon(tot.w), true), c(tot.n, null, true)]};
  }
  if (rep.kind === "win") {
    const g = {};
    for (const r of cur) { const o = r.Owner || "—", x = g[o] = g[o] || {sent: 0, won: 0, v: 0}; if (r.Quote_Stage === "Draft") continue; x.sent++; if (QUOTE_WON.test(r.Quote_Stage)) { x.won++; x.v += Number(r.Grand_Total || 0); } }
    const list = Object.entries(g).filter(([, x]) => x.sent).map(([o, x]) => ({o, ...x, rate: Math.round(x.won / x.sent * 100)})).sort((a, b) => b.rate - a.rate || b.v - a.v);
    const tot = list.reduce((s, x) => ({sent: s.sent + x.sent, won: s.won + x.won, v: s.v + x.v}), {sent: 0, won: 0, v: 0});
    const bars = barItems(list.map(x => [x.o, x.rate]), false, null, drill(rep.k, f)); bars.forEach(b => b.value += "%");
    return {bars, cmp: false,
      cols: [{l: t("lv.owner")}, {l: t("rep.sent"), num: true}, {l: t("rep.won"), num: true}, {l: t("rep.rate"), num: true}, {l: t("rep.wonV"), num: true}],
      rows: list.map(x => [c(x.o, `<a href="${drill(rep.k, f)(x.o)}">${esc(x.o)}</a>`), c(x.sent, null, true), c(x.won, null, true), c(x.rate + "%", `<b>${x.rate}%</b>`, true), c(x.v, mon(x.v), true)]),
      foot: [c(t("rep.total")), c(tot.sent, null, true), c(tot.won, null, true), c((tot.sent ? Math.round(tot.won / tot.sent * 100) : 0) + "%", null, true), c(tot.v, mon(tot.v), true)]};
  }
  /* nhóm theo 1 field; theo tháng thì không so kỳ trước (mỗi dòng đã là 1 tháng) */
  const cmp = !!(per && per.pfrom && rep.date) && f !== "_month", g = {}; // tắt "So với kỳ trước" → không có pfrom
  const add = (r, slot) => { const k = nameOf(r, f), x = g[k] = g[k] || {v: 0, n: 0, pv: 0}; const v = rep.mea ? Number(r[rep.mea] || 0) : 1; if (slot) x.pv += v; else { x.v += v; x.n++; } };
  for (const r of cur) add(r);
  let cmp2 = cmp;
  if (cmp) for (const r of all.filter(r => (!rep.when || rep.when(r)) && inP(r, per.pfrom, per.pto))) add(r, true);
  if (cmp && !Object.values(g).some(x => x.pv)) { cmp2 = false; for (const k of Object.keys(g)) if (!g[k].v) delete g[k]; } // kỳ trước không có dữ liệu → không so sánh
  const data = Object.entries(g).filter(([, x]) => x.v || x.pv).sort(f === "_month" ? (a, b) => a[0].localeCompare(b[0]) : (a, b) => b[1].v - a[1].v || b[1].pv - a[1].pv);
  const lbl = k => f === "_month" && k !== "—" ? k.slice(5) + "/" + k.slice(0, 4) : k, href = f === "_month" ? null : drill(rep.k, f);
  const fmt = v => rep.mea ? mon(v) : String(v), tot = data.reduce((s, [, x]) => s + x.v, 0), ptot = data.reduce((s, [, x]) => s + x.pv, 0);
  const dl = (d, h) => d ? c(d.txt, `<span class="delta ${d.cls}">${d.txt}</span>`, true) : c(h || "—", null, true);
  return {cmp: cmp2, bars: barItems(data.filter(([, x]) => x.v).map(([k, x]) => [lbl(k), x.v]), !!rep.mea, null, href && (v => href(data.find(([k]) => lbl(k) === v)[0]))),
    cols: [{l: f === "_tenant" ? t("gh.c.entity") : f === "_month" ? t("rep.month") : fieldLabel(m, f)}, {l: rep.mea ? t("rep.sum") + " " + fieldLabel(m, rep.mea) : t("rep.nRec"), num: true},
      ...(rep.mea ? [{l: t("rep.nRec"), num: true}] : []), {l: "%", num: true}, ...(cmp2 ? [{l: t("rep.prev"), num: true}, {l: t("rep.change"), num: true}] : [])],
    rows: data.map(([k, x]) => [c(lbl(k), href ? `<a href="${href(k)}">${esc(lbl(k))}</a>` : esc(lbl(k))), c(x.v, `<b>${fmt(x.v)}</b>`, true), ...(rep.mea ? [c(x.n, null, true)] : []),
      c(tot ? Math.round(x.v / tot * 100) + "%" : "—", null, true), ...(cmp2 ? [c(x.pv, `<span class="muted">${fmt(x.pv)}</span>`, true), dl(delta(x.v, x.pv, true))] : [])]),
    foot: data.length ? [c(t("rep.total")), c(tot, fmt(tot), true), ...(rep.mea ? [c(data.reduce((s, [, x]) => s + x.n, 0), null, true)] : []), c("100%", null, true),
      ...(cmp2 ? [c(ptot, fmt(ptot), true), dl(delta(tot, ptot, true), " ")] : [])] : null};
}
/* Ghim báo cáo lên trang chủ (thay trang Dashboard): mỗi người tự chọn báo cáo hay xem, lưu trong phiên. Trang chủ dùng kỳ mặc định của báo cáo */
const myPins = () => { S.pins = S.pins || {}; return S.pins[me().id] = S.pins[me().id] || []; };
function pinReport(id) { const ps = myPins(), j = ps.indexOf(id); j < 0 ? ps.push(id) : ps.splice(j, 1); toast(t(j < 0 ? "rep.pinned" : "rep.unpinned")); route(); }
async function pinnedReports() {
  const all = allReports(), out = [];
  for (const id of myPins()) { const r = all.find(x => x.id === id); if (!r) continue;
    const p = r.date ? r.defP || "month" : "all", b = await repBuild(r, repPeriod(p));
    out.push({id, name: repName(r) + (r.date ? " · " + t("rep.p." + p) : ""), bars: b.bars.slice(0, 8)}); }
  return out;
}
async function viewReports(sel) {
  const all = allReports(), rep = all.find(r => r.id === sel) || all[0];
  if (!rep) return render("reports", {head: {icon: "bar", title: t("page.reports")}, dirs: []});
  const st = repState(rep), per = rep.date ? repPeriod(st.p, st.from, st.to) : null, m = await E(rep.k);
  if (per && st.cmp === false) per.pfrom = per.pto = null;
  const b = await repBuild(rep, per, rep.dims ? st.dim : "");
  S._rep = {id: rep.id, label: repName(rep), b};
  const scheds = (S.repSched || []).filter(x => x.id === rep.id);
  return render("reports", {
    head: {icon: "bar", title: t("page.reports"), sub: t(isGroup() ? "rep.noteGroup" : "rep.note", {t: S.tenant}), actions: btnHtml(t("rep.new"), "plus", "newReport()", true, "M27.07")},
    dirs: REP_DIRS.map(d => ({label: t("rep.dir." + d), items: all.filter(r => (r.mine ? "mine" : r.dir) === d)
      .map(r => ({id: r.id, icon: S.app.entities[r.k].icon, name: repName(r), entity: L(S.app.entities[r.k].label), on: r === rep}))})).filter(d => d.items.length),
    cur: {id: rep.id, name: repName(rep), desc: rep.mine ? "" : t(rep.name + "d"), pinned: myPins().includes(rep.id), hasDate: !!rep.date,
      dateLbl: rep.date === "_created" ? t("rep.created") : fieldLabel(m, rep.date),
      dims: rep.dims ? rep.dims.map(d => ({d, label: d === "_month" ? t("rep.month") : fieldLabel(m, d), on: d === st.dim})) : null,
      periods: REP_PERIODS.map(p => ({p, label: t("rep.p." + p), on: p === st.p})), custom: st.p === "custom", from: dmy(st.from), to: dmy(st.to), cmpOn: st.cmp !== false, canCmp: !!per && !(rep.dims && st.dim === "_month") && !rep.kind,
      range: per ? `${dmy(per.from)} – ${dmy(per.to)}` : "", prange: per && b.cmp ? `${dmy(per.pfrom)} – ${dmy(per.pto)}` : "",
      dateTip: t("rep.by", {f: rep.date === "_created" ? t("rep.created") : fieldLabel(m, rep.date)}),
      bars: b.bars, cols: b.cols, rows: b.rows, foot: b.foot,
      scheds: scheds.map(x => ({i: (S.repSched || []).indexOf(x), freq: t("rep.f." + x.freq), to: x.to, on: x.on}))},
  });
}
const REP_PERIODS = ["month", "prevMonth", "quarter", "prevQuarter", "year", "prevYear", "all", "custom"];
function repSetP(p) { const st = S.repP[S._rep.id]; st.p = p; if (p === "custom" && !st.from) Object.assign(st, {from: TODAY.slice(0, 8) + "01", to: TODAY}); route(); }
function repCmp(on) { S.repP[S._rep.id].cmp = on; route(); }
/* chọn ngày: lịch tháng tự vẽ (nổi dưới ô), nhập tay vẫn theo dd/mm/yyyy */
function repPick(e, f) {
  e.stopPropagation();
  const inp = $(`#rp-${f}`), m = String(inp.value).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/), base = m ? new Date(+m[3], +m[2] - 1, 1) : new Date(TODAY);
  calOpen(inp, base.getFullYear(), base.getMonth());
}
function calOpen(inp, y, mo) {
  let box = $("#calpop"); if (!box) { box = document.createElement("div"); box.id = "calpop"; document.body.appendChild(box); box.onclick = e => e.stopPropagation(); }
  const first = new Date(y, mo, 1), start = (first.getDay() + 6) % 7, days = new Date(y, mo + 1, 0).getDate(), sel = inp.value, p2 = n => String(n).padStart(2, "0");
  const cells = [...Array(start).fill(""), ...Array.from({length: days}, (_, i) => i + 1)];
  box.innerHTML = `<div class="ch"><button onclick="calOpen($('#${inp.id}'),${mo ? y : y - 1},${mo ? mo - 1 : 11})">‹</button><b>${p2(mo + 1)}/${y}</b><button onclick="calOpen($('#${inp.id}'),${mo === 11 ? y + 1 : y},${(mo + 1) % 12})">›</button></div>
    <div class="cg">${t("cal.dows").split(",").map(d => `<i>${d}</i>`).join("")}${cells.map(d => d === "" ? "<span></span>" : (v => `<button class="${v === sel ? "on" : ""}${`${y}-${p2(mo + 1)}-${p2(d)}` === TODAY ? " td" : ""}" onclick="calSet('${inp.id}','${v}')">${d}</button>`)(`${p2(d)}/${p2(mo + 1)}/${y}`)).join("")}</div>`;
  const r = inp.getBoundingClientRect(); Object.assign(box.style, {left: r.left + "px", top: r.bottom + 4 + "px", display: "block"});
}
function calSet(id, v) { $("#" + id).value = v; $("#calpop").style.display = "none"; }
document.addEventListener("click", () => { const b = document.getElementById("calpop"); if (b) b.style.display = "none"; });
function repApplyRange() { // khoảng tuỳ chọn nhập dd/mm/yyyy (cùng định dạng ngày cả app)
  const iso = v => { const m = String(v).trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); return m ? `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}` : ""; };
  const f = iso($("#rp-from").value), to = iso($("#rp-to").value);
  if (!f || !to || f > to) return toast(t("rep.badRange"));
  Object.assign(S.repP[S._rep.id], {from: f, to}); route();
}
function repSetDim(d) { S.repP[S._rep.id].dim = d; route(); }
function repExport() { // M27.02: xuất bảng số liệu đang xem ra CSV (mở được bằng Excel)
  const {label, b} = S._rep, q = v => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [b.cols.map(x => q(x.l)).join(","), ...b.rows.map(r => r.map(x => q(x.x)).join(",")), ...(b.foot ? [b.foot.map(x => q(x.x)).join(",")] : [])].join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["﻿" + csv], {type: "text/csv"})); a.download = `${label.replace(/[^\wÀ-ỹ]+/g, "_")}_${S.tenant}.csv`; a.click();
  toast(t("lv.exported", {n: b.rows.length}));
}
/* M27.07: người dùng tự tạo báo cáo (nhóm theo một field, đếm hoặc cộng tiền) — lưu trong phiên, vào thư mục "Báo cáo của tôi" */
async function newReport() {
  const ks = Object.keys(S.app.entities).filter(k => can(k));
  await dialog({title: t("rep.new"), feat: "M27.07", fields: [{id: "name", label: t("rep.name"), value: ""},
    {id: "k", label: "Module", kind: "select", options: ks.map(k => ({value: k, label: L(S.app.entities[k].label)}))},
    {id: "f", label: t("rep.groupBy"), kind: "select", options: []}, {id: "mea", label: t("rep.measure"), kind: "select", options: []}], ok: t("act.save")}, () => {
    S.myReports = S.myReports || [];
    const k = $("#dlg-k").value, name = $("#dlg-name").value.trim() || `${L(S.app.entities[k].label)} · ${$("#dlg-f").selectedOptions[0].text}`, id = "u" + Date.now();
    S.myReports.push({id, name, mine: true, k, f: $("#dlg-f").value, mea: $("#dlg-mea").value, dir: "mine", date: "_created"});
    closeModal(); toast(t("rep.saved")); go(`/p/reports?i=${id}`);
  });
  const fill = async () => {
    const m = await E($("#dlg-k").value), fs = Object.entries(m.fields);
    $("#dlg-f").innerHTML = [...(isGroup() ? [["_tenant", t("gh.c.entity")]] : []), ["Owner", t("lv.owner")], ...fs.filter(([, d]) => d.type === "picklist" || d.type === "lookup").map(([a, d]) => [a, d.label])].map(([a, l]) => `<option value="${a}">${esc(l)}</option>`).join("");
    $("#dlg-mea").innerHTML = [["", t("rep.count")], ...fs.filter(([, d]) => d.type === "currency").map(([a, d]) => [a, t("rep.sum") + " " + d.label])].map(([a, l]) => `<option value="${a}">${esc(l)}</option>`).join("");
  };
  $("#dlg-k").onchange = fill; fill();
}
/* M27.05: lập lịch gửi báo cáo đang xem qua email — danh sách lịch hiện ngay dưới báo cáo, bật / tắt / xoá được */
function scheduleReport(id) {
  dialog({title: t("rep.schedule"), feat: "M27.05", fields: [{id: "fr", label: t("rep.freq"), kind: "select", options: ["daily", "weekly", "monthly"].map(x => ({value: x, label: t("rep.f." + x)}))},
    {id: "to", label: t("em.to"), value: "management@apexindustrial.example"}], ok: t("act.save")}, () => {
    S.repSched = S.repSched || [];
    S.repSched.push({id, freq: $("#dlg-fr").value, to: $("#dlg-to").value.trim() || "management@apexindustrial.example", on: true});
    closeModal(); toast(t("rep.scheduled")); route();
  });
}
function repSchedToggle(i) { S.repSched[i].on = !S.repSched[i].on; route(); }
function repSchedDel(i) { S.repSched.splice(i, 1); route(); }
/* ---------------- Bảng công việc (M24.02 + M27.08) ----------------
 * Gộp đầu việc và hàng đợi việc cần xử lý thành 1 bảng kanban kiểu Backlog. Mọi việc là Task (dùng chung trạng thái Not Started / In Progress /
 * Waiting for input / Completed nên kéo thả được); việc hệ thống phát hiện được automation tự sinh thành task gắn bản ghi gốc (M23.02).
 * Việc duyệt ở menu Chờ duyệt riêng (ra quyết định theo DoA, không phải task). */
const AUTO_RULES = [ // id, module nguồn, điều kiện, trạng thái task ban đầu, hạn (số ngày từ hôm nay), độ ưu tiên
  {id: "q7", k: "quotes", when: r => r.Quote_Stage === "Quotation" && ageOf(r._created) > 7, prio: "High", act: "email"},
  {id: "dealClose", k: "deals", when: r => !/closed/i.test(r.Stage || "") && r.Closing_Date && ageOf(r.Closing_Date) > 0, prio: "High"},
  {id: "lead", k: "leads", when: r => r.Lead_Status === "Not Contacted", prio: "Normal", due: 1},
  {id: "jobCust", k: "jobs", when: r => r.Status === "Pending Quotation Approval", prio: "High", act: "email"},
  {id: "jobParts", k: "jobs", when: r => r.Status === "Pending Spare Part(s)", status: "Waiting for input", prio: "Normal"},
  {id: "jobHand", k: "jobs", when: r => /^completed/i.test(r.Status || ""), prio: "Normal", due: 2},
  {id: "lm", k: "vehicles", when: r => r.LM_Expiry_Date && -ageOf(r.LM_Expiry_Date) >= 0 && -ageOf(r.LM_Expiry_Date) <= 30, prio: "High", act: "remind"},
  {id: "prOrder", k: "pr", when: r => r.Form_Status === "Approved", prio: "Normal", due: 1},
];
const WK_ICON = {quotes: "file", deals: "target", leads: "lead", jobs: "wrench", vehicles: "truck", pr: "board"};
async function syncAutoTasks() { // idempotent: mỗi (luật, bản ghi) chỉ sinh 1 task
  const tasks = await API.list("tasks", {}), have = new Set(tasks.filter(x => x._auto).map(x => x._auto));
  for (const rule of AUTO_RULES) {
    const m = await E(rule.k);
    for (const r of await API.list(rule.k, {})) {
      const key = `${rule.id}:${r.id}`;
      if (have.has(key) || r._deleted || !rule.when(r)) continue;
      const title = titleOf(m, r), n = rule.id === "lm" ? -ageOf(r.LM_Expiry_Date) : rule.id === "dealClose" ? ageOf(r.Closing_Date) : ageOf(r._created);
      const due = new Date(new Date(TODAY).getTime() + (rule.due || 0) * 864e5).toISOString().slice(0, 10);
      await API.create("tasks", {_tenant: r._tenant, _layout: "Standard", Owner: r.Owner || "Minh N.", Subject: t("wk.r." + rule.id, {t: title, n}),
        Due_Date: due, Priority: rule.prio, Status: rule.status || "Not Started", What_Id: {id: r.id, name: title}, _src: {k: rule.k, id: r.id}, _auto: key, _act: rule.act || "",
        Description: t("wk.autoDesc", {r: t("wk.rule." + rule.id)}), _title: t("wk.r." + rule.id, {t: title, n}), _created: TODAY + "T07:00"});
      have.add(key);
    }
  }
}
async function viewWork() {
  await syncAutoTasks();
  const scope = S.wkScope || "mine", kind = S.wkKind || "", u = me(), mt = await E("tasks");
  const who = scope === "team" ? teamNames() : [u.name];
  const g = isGroup(), tf = g ? S.wkTenant || "" : ""; // Group View: xem task mọi pháp nhân, chỉ đọc (không kéo thả, không đổi trạng thái)
  const all = (await rowsOf("tasks", {tenant: S.tenant})).filter(r => who.includes(r.Owner) && (!kind || (kind === "auto") === !!r._auto) && (!tf || r._tenant === tf));
  const card = r => { const d = r.Due_Date ? ageOf(r.Due_Date) : null, done = r.Status === "Completed";
    return {id: r.id, subject: r.Subject, icon: r._src ? WK_ICON[r._src.k] || "check" : "check", auto: !!r._auto, owner: scope === "team" ? r.Owner : "",
      src: r._src ? {href: `/e/${r._src.k}/${r._src.id}`, label: (r.What_Id || {}).name} : null, prio: /high|highest/i.test(r.Priority || "") ? r.Priority : "",
      due: dmy(r.Due_Date), over: !done && d > 0 ? t("home.overdue", {n: d}) : "", tenant: g ? r._tenant : "", tcolor: g ? tenantOf(r._tenant).color : ""}; }; // quá hạn: ngày bôi đỏ + chữ "Quá hạn n ngày"
  const cols = mt.states.map(st => { const list = all.filter(r => r.Status === st).sort((a, b) => (a.Due_Date || "9").localeCompare(b.Due_Date || "9"));
    return {st, label: t("wk.col." + mt.states.indexOf(st)), tone: toneColor(mt.tones[st]), n: list.length, cards: (st === "Completed" ? list.slice(-6) : list).map(card)}; });
  return render("work", {head: {icon: "check", title: t("page.work"), feat: "M27.08",
      actions: g ? "" : btnHtml(t("wk.newTask"), "plus", "go('/e/tasks/new')", true, "M24.02")},
    scope, kind, isTeam: scope === "team", cols, nOpen: all.filter(r => r.Status !== "Completed").length, group: g,
    tenants: g ? me().tenants.filter(c => c !== "ALL").map(c => ({c, on: c === tf})) : []});
}
function wkSet(k, v) { S[k] = v; route(); }
function wkDrag(e, id) { e.dataTransfer.setData("text/plain", id); e.currentTarget.classList.add("drag"); }
async function wkDrop(e, st) {
  e.preventDefault(); e.currentTarget.classList.remove("over");
  if (isGroup()) return;
  const id = e.dataTransfer.getData("text/plain"), r = await API.get("tasks", id);
  if (!r || r.Status === st) return rerender();
  logTo(r, t("wk.moved", {a: r.Status, b: st}));
  await API.update("tasks", id, {Status: st, ...(st === "Completed" ? {Closed_Time: TODAY + "T" + new Date().toTimeString().slice(0, 5)} : {})});
  toast(t("wk.movedToast", {s: t("wk.col." + (await E("tasks")).states.indexOf(st))})); rerender();
}
async function wkPeek(id) { // panel bên phải: thông tin task + bản ghi gốc + thao tác nhanh
  const r = await API.get("tasks", id), mt = await E("tasks"), src = r._src ? await API.get(r._src.k, r._src.id) : null, ms = src ? await E(r._src.k) : null;
  $("#modal").innerHTML = await render("work-peek", {id, group: isGroup(), tenant: r._tenant, subject: r.Subject, desc: r.Description || "", due: dmy(r.Due_Date), owner: r.Owner, prio: r.Priority, auto: !!r._auto,
    states: mt.states.map((st, i) => ({st, label: t("wk.col." + i), on: st === r.Status})),
    src: src ? {k: r._src.k, id: src.id, title: titleOf(ms, src), type: L(ms.label), sub: subOf(ms, src), pill: ms.status ? pill(src[ms.status], ms) : ""} : null,
    email: r._act === "email" || r._act === "remind", tpl: r._act === "remind" ? "Plant registration expiry reminder" : "", log: (r._log || []).slice(0, 4)});
  $("#modal").classList.add("show");
}
async function wkMove(id, st) { if (isGroup()) return; const r = await API.get("tasks", id); logTo(r, t("wk.moved", {a: r.Status, b: st})); await API.update("tasks", id, {Status: st}); closeModal(); rerender(); }
/* M04.04: thùng rác — bản ghi đã xoá trong phiên, khôi phục được */
async function viewRecycle() {
  const rows = [];
  for (const k of Object.keys(S.app.entities)) {
    if (!can(k)) continue;
    const m = await E(k);
    for (const r of await API.list(k, {})) if (r._deleted) rows.push([`<b>${esc(titleOf(m, r))}</b>`, esc(L(m.label)), esc(r._deleted.by), dmy(r._deleted.at),
      `<button class="btn xs" onclick="restoreRec('${k}','${r.id}')">${t("rb.restore")}</button>`]);
  }
  return render("settings", {head: {title: t("page.s-recycle")}, note: t("rb.note"), layout: "",
    blocks: [{type: "table", feat: "M04.04", cols: [t("det.record"), "Module", t("rb.by"), t("rb.at"), ""], rows}]});
}
async function restoreRec(k, id) { await API.update(k, id, {_deleted: null}); toast(t("rb.restored")); rerender(); }
async function viewSearch(q) {
  const res = (await API.search(Object.keys(S.app.entities).filter(k => can(k)), q || "", S.tenant)).filter(x => visible(x.key, x.rec));
  for (const x of res) await E(x.key);
  return render("table-page", {head: {icon: "search", title: t("srch.title", {q: q || ""}), sub: nRec(res.length), feat: "M27.03"}, cols: [],
    rows: res.map(({key, rec}) => ({href: `/e/${key}/${rec.id}`, cells: [`<b>${esc(titleOf(S.ent[key], rec))}</b><div class="faint sm">${esc(subOf(S.ent[key], rec))}</div>`,
      `<span class="pill p-info">${esc(L(S.app.entities[key].label))}</span>`]}))});
}

/* ---------------- cài đặt: dữ liệu từ meta, bố cục ở templates/settings.html ---------------- */
async function viewSetting(p) {
  const A = S.app, O = A.org;
  const lab = k => A.entities[k] ? L(A.entities[k].label) : k; // tên module theo ngôn ngữ đang chọn (bảng cài đặt dùng key module, không viết cứng tên)
  const TNS = A.tenants.filter(x => x.country), uniq = f => [...new Set(TNS.map(x => x[f]))], codesBy = (f, v) => TNS.filter(x => x[f] === v).map(x => x.code).join(", "); // nước / tiền tệ / GST theo tenants.json
  const page = (layout, blocks, actions, note) => render("settings", {head: {title: t("page." + p), actions: actions || ""}, layout, blocks, note});
  const tbl = (feat, cols, rows, title) => ({type: "table", feat, cols, rows, title});
  if (p === "s-tenant") return page("", [
    tbl("M01.03", [t("st.code"), t("st.entity"), t("st.color"), t("st.prefix")], A.tenants.filter(x => x.code !== "ALL").map(x =>
      [`<b>${x.code}</b>`, esc(L(x.name)), `<span class="chip" style="background:${x.color};color:#fff;border-color:${x.color}"${fa("M01.13")}>${x.color}</span>`, x.code + "26-"])),
    tbl("M01.11", [t("st.code"), t("st.prefix"), t("st.currency"), "GST", t("st.fy"), t("st.tpl")], A.tenants.filter(x => x.code !== "ALL").map(x =>
      [`<b>${x.code}</b>`, `${x.code}26- · ${x.code}-SO-26-`, x.currency, `GST ${x.gst}%`, x.fy, `<span class="chip">${x.code} Proposal</span><span class="chip">${x.code} Tax Invoice</span>`]), t("st.perTenant")),
    {type: "text", feat: "M01.14", title: t("st.units"), text: t("st.unitsD")},
    ...["sso", "jit", "session", "group", "shared", "ip", "sso2"].map((c, i) => ({type: "text", feat: ["M01.01", "M01.10", "M01.06", "M01.08", "M01.09", "M01.15", "M01.12"][i], title: t("st." + c), text: t("st." + c + "D")})),
    tbl("M01.07", [t("sy.time"), "User", "Tenant", "IP", t("st.device"), t("st.method"), t("sy.result")], A.users.slice(0, 7).map((u, i) =>
      [`27/10/2026 ${String(8 + i).padStart(2, "0")}:${String(5 + i * 7).padStart(2, "0")}`, esc(u.name), u.tenants[0], `203.0.113.${20 + i}`, i % 3 ? "Chrome · Windows" : "Safari · iOS",
        i === 5 ? t("st.local") : "SSO (Entra ID)", `<span class="pill p-${i === 3 ? "bad" : "ok"}">${i === 3 ? t("st.failMfa") : t("sy.ok")}</span>`]), t("st.loginLog")),
  ], btnHtml(t("st.newTenant"), "plus", "", true, "M01.03"));
  if (p === "s-org") {
    const nodes = [];
    const walk = (n, d) => O.roles.filter(r => r.parent === n).forEach(r => { nodes.push({name: r.name, depth: d, indent: d * 18, peer: r.peer}); walk(r.name, d + 1); });
    walk("", 0);
    return page("grid", [
      {type: "tree", feat: "M02.04", title: t("so.tree"), nodes},
      {type: "people", feat: "M02.01", title: t("so.users"), items: A.users.map(u => ({name: u.name, role: u.role, tenants: `${u.profile} · ${u.tenants.join(", ")}`}))},
      {type: "chips", feat: "M02.02", title: t("so.profiles"), groups: [{label: "", items: O.profiles}, {label: t("so.groups"), items: O.groups}]},
    ], "", t("so.note", {h: O.hierarchy}));
  }
  if (p === "s-team") return viewTeamspaces();
  if (p === "s-recycle") return viewRecycle();
  if (p === "s-perm") return page("", [
    permMatrix(),
    tbl("M02.09", [t("fp.field"), "Module", ...["Administrator", "Sales Engineer", "After Sales Team", "Finance"]], [
      ["Cost Price", "products", "edit", "hide", "hide", "read"], ["Discount", "quotes", "edit", "edit", "read", "read"], ["Grand Total", "orders", "edit", "read", "read", "edit"],
      ["Debtor Code / Credit Term", "accounts", "edit", "read", "read", "edit"], ["Man Hours", "jobs", "edit", "hide", "edit", "read"]].map(([f, mo, ...lv]) =>
      [`<b>${f}</b>`, esc(lab(mo)), ...lv.map(x => `<span class="pill p-${{edit: "ok", read: "info", hide: "warn"}[x]}">${t("fp." + x)}</span>`)]), t("fp.title")),
    tbl("M02.03", ["Module", t("sp.level"), t("ra.rule")], Object.entries(A.default_access || {}).filter(([k]) => A.entities[k]).map(([k, lv]) =>
      [esc(L(A.entities[k].label)), `<span class="pill p-${lv === "Private" ? "warn" : "ok"}">${lv}</span>`, t(lv === "Private" ? "ra.private" : lv === "Public read-only" ? "ra.ro" : "ra.rw")]), t("ra.title")),
    tbl("M02.06", [t("sp.entity"), "Module", t("sp.level")], O.default_perm.map(x => [esc(x.key ? lab(x.key) : x.entity), esc(x.module), `<span class="pill p-${/Private/.test(x.level) ? "warn" : "ok"}">${esc(x.level)}</span>`])),
    tbl("M02.07", [t("sp.entity"), t("sp.from"), t("sp.to"), t("sp.perm")], O.sharing.map(x => [esc(x.key ? lab(x.key) : x.entity), esc(x.from), esc(vt(x.to)), esc(vt(x.perm))])),
  ], "", t("sp.note"));
  if (p === "s-config") {
    const groups = [];
    for (const k of ["quotes", "jobs", "vehicles", "orders"]) {
      const m = await E(k);
      for (const f of ["Equipment_Type", "Service_Type", "Payment_Terms", "Division_Billing"]) if (m.fields[f] && m.fields[f].options.length && !groups.find(g => g.f === f)) groups.push({f, label: m.fields[f].label, items: m.fields[f].options.slice(0, 14)});
    }
    return page("grid", [...groups.map(g => ({type: "chips", feat: "M03.01", title: g.label, groups: [{label: "", items: g.items}]})),
      {type: "chips", feat: "M03.02", title: "GST", groups: uniq("country").map(c => ({label: `${c} · ${codesBy("country", c)}`, items: [`GST ${TNS.find(x => x.country === c).gst}%`, {AU: "GST-free 0%", SG: "ZR 0%"}[c] || "0%"]}))},
      {type: "text", feat: "M03.03", title: t("sc.numbering"), text: "{tenant}26-{0000} · {tenant}-SO-26-{0000} · AS-26-{0000}"},
      {type: "chips", feat: "M03.04", title: t("sc.currency"), groups: [{label: t("sc.home"), items: uniq("currency").map(c => `${c} · ${codesBy("currency", c)}`)}, {label: t("sc.other"), items: ["USD 1.35", "EUR 1.47", "SGD 1.15", "HKD 0.17", "SEK 0.13", "CAD 0.98"]}, {label: t("st.fy"), items: [t("sc.fyD")]}]},
      {type: "chips", feat: "M03.07", title: t("sc.hours"), groups: [{label: "", items: [t("sc.hoursD1"), t("sc.hoursD2")]}, {label: t("sc.holidays"), items: ["01/01", "26/01", "03–06/04", "25/04", "08/06", "05/10", "25/12", "26/12"]}]},
      tbl("M03.05", [t("sc.rule"), "Module", t("sc.cond")], [["Loss reason", "deals", t("sc.r1")], ["Warranty date", "jobs", t("sc.r2")], ["Equipment terms", "quotes", t("sc.r3")],
        ["Man-hours check", "jobs", t("sc.r4")], ["Equipment cascade", "quotes", t("sc.r5")]].map(([a, b, c]) => [`<b>${a}</b>`, esc(lab(b)), esc(c)]), t("sc.rules")),
      tbl("M03.06", [t("fp.field"), "Module", t("sc.type"), t("sc.by")], [["Chassis Number", lab("vehicles"), "Text", "Admin · 20/10/2026"], ["Site Contact", lab("install"), "Lookup → " + lab("contacts"), "Admin · 22/10/2026"]].map(r => r.map(esc)), t("sc.custom"))],
      btnHtml(t("sc.addField"), "plus", "toast(t('act.done'))", false, "M03.06"));
  }
  if (p === "s-approval") return page("", [tbl("M22.01", [t("sa.doc"), t("sa.cond"), t("sa.levels")], A.approval_rules.map(x =>
    [esc(A.entities[x.doc] ? L(A.entities[x.doc].label) : t("sa." + x.doc)), esc(x.cond), x.levels.map((l, i) => `<span class="chip">${i + 1}. ${esc(l)}</span>`).join("")]))],
    btnHtml(t("sa.add"), "plus", "", true, "M22.01"));
  if (p === "s-auto") return page("", [tbl("M14.06", [t("su.name"), t("sp.entity"), t("su.form"), t("su.field"), t("su.legacy"), t("su.crm")], A.blueprints.map(b =>
    [`<b>${esc(b.name)}</b>`, esc(b.key ? lab(b.key) : b.entity), esc(b.layout), esc(b.field), `<span class="pill p-${b.status === "Đang bật" ? "ok" : "warn"}">${b.status === "Đang bật" ? t("su.on") : t("su.off")}</span>`,
      `<span class="pill p-${{std: "ok", merged: "info", off: "warn"}[b.crm]}">${t("su.crm." + b.crm)}</span>`]), t("su.flows")),
    tbl("M23.05", [t("sc.rule"), "Module", t("sc.cond"), t("su.assign")], [["Web enquiry routing", lab("leads"), "Lead Source = Web form", "Round robin · Sales Team"], ["Breakdown intake", lab("jobs"), "Service Type = Breakdown", "AS Service Manager"]].map(r => r.map(esc)), t("su.assignT")),
    tbl("M23.02", [t("sc.rule"), "Module", t("su.when"), t("su.action")], [["Plant registration expiry reminder", lab("vehicles"), t("su.w1"), "SMS + email"], ["Service order on hold > 2 days", lab("jobs"), t("su.w4"), "Email + in-app"], ["Warranty expiry", lab("vehicles"), t("su.w2"), "Email"], ["Overdue to-dos digest", lab("tasks"), t("su.w3"), "Email"]].map(r => r.map(esc)), t("su.sched")),
    tbl("M23.04", [t("su.fn"), "Module", t("su.kind"), t("su.status"), t("su.plan")], [["Service order numbering", "jobs", "Workflow", "on", "rebuild"], ["Autofill from equipment record", "jobs", "Workflow", "on", "rebuild"],
      ["Proposal field mapping", "quotes", "Workflow", "on", "rebuild"], ["Goods issue mapping", "si", "Workflow", "on", "rebuild"], ["Service reminder SMS", "vehicles", "Workflow", "on", "replace"],
      ["Create invoice in accounting", "invoices", "Button", "on", "replace"], ["Send PO to accounting", "Purchase orders", "Button", "on", "confirm"], ["Large opportunity alert", "deals", "Workflow", "off", "drop"]].map(([a, b, c, d, e]) =>
      [`<b>${a}</b>`, esc(lab(b)), c, `<span class="pill p-${d === "on" ? "ok" : "warn"}">${t(d === "on" ? "su.on" : "su.off")}</span>`, t("su.p." + e)]), t("su.inv")),
  ], "", t("su.note"));
  if (p === "s-msg") return page("grid", [...["t1", "t2", "t3", "t4"].map((c, i) => ({type: "text", feat: ["M26.01", "M26.03", "M26.02", "M25.02"][i], title: t("sm." + c), text: t("sm." + c + "D")})),
    {type: "chips", feat: "M25.04", title: t("sm.org"), groups: ORG_EMAILS.map(([e, d]) => ({label: d, items: [e]}))},
    {type: "chips", feat: "M25.01", title: t("sm.emailTpl"), groups: [{label: "", items: EMAIL_TPL}]}],
    btnHtml(t("sm.new"), "plus", "", true, "M26.01"));
  if (p === "s-sync") {
    const os = await API.list("orders", {});
    return page("", [tbl("M28.02", [t("sy.time"), t("sy.dir"), t("det.record"), t("sy.result")], os.slice(0, 8).map((r, i) =>
      [dmy(r._created), "CRM → " + t("sy.acc"), esc(r.Sales_Order_Number), `<span class="pill p-${i === 2 ? "bad" : "ok"}">${i === 2 ? t("sy.fail") : t("sy.ok")}</span>`])),
      tbl("M28.03", [t("sy.time"), t("sy.dir"), t("det.record"), t("sy.payStatus")], (await API.list("invoices", {})).slice(0, 6).map(r =>
        [dmy(r.Last_Synced), t("sy.acc") + " → CRM", esc(r.Invoice_Number), `<span class="pill p-${{Paid: "ok", "Partially Paid": "info", Unpaid: "warn", Overdue: "bad"}[r.Payment_Status] || "info"}">${esc(r.Payment_Status)}</span>`]), t("sy.back"))],
      btnHtml(t("sy.sync"), "", "toast(t('act.done'))", true, "M28.01"));
  }
  if (p === "s-import") {
    const m = await E("accounts"), opts = sel => `<select class="inp sm">${[t("si.skip"), ...Object.values(m.fields).filter(f => f.type !== "subform").slice(0, 30).map(f => f.label)].map(o => `<option${o === sel ? " selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
    return page("", [
      {type: "chips", feat: "M29.02", title: t("si.wizard"), groups: [{label: "", items: [t("si.s1"), t("si.s2"), t("si.s3"), t("si.s4")]}]},
      tbl("M29.02", [t("si.col"), t("si.sample"), t("si.mapTo")], [["Company", "Alpha Construction Pty Ltd", "Account Name"], ["Debtor", "D3001", "Debtor Code"], ["Terms", "30 days", "Credit Term"],
        ["Tel", "+61 2 5550 4567", "Phone"], ["Remark", "VIP", t("si.skip")]].map(([c, v, to]) => [`<b>${c}</b>`, esc(v), opts(to)]), t("si.mapping")),
      tbl("M29.01", [t("sp.entity"), t("si.count")], Object.entries(A.counts_legacy).map(([k, v]) => [esc(lab(k)), `<b>${esc(v)}</b>`]), t("si.legacy")),
      tbl("M29.03", [t("sy.time"), t("si.bkType"), t("si.size"), t("sy.result")], [["27/10/2026 02:00", t("si.daily"), "1.8 GB", "ok"], ["26/10/2026 02:00", t("si.daily"), "1.8 GB", "ok"], ["20/10/2026 03:00", t("si.weekly"), "1.7 GB", "ok"]].map(([a, b, c, d]) =>
        [a, b, c, `<span class="pill p-ok">${t("sy.ok")}</span>`]), t("si.backup")),
    ], btnHtml(t("si.upload"), "upload", "toast(t('si.dryDone'))", false, "M29.02") + btnHtml(t("si.dry"), "", "toast(t('si.dryDone'))", true, "M29.01"), t("si.note"));
  }
  if (p === "s-api") return page("", [
    tbl("M30.01", [t("api.key"), t("api.scope"), t("api.created"), t("su.status")], [["accounting-sync", "orders:read, invoices:write", "15/10/2026", "on"], ["bi-export", "reports:read", "20/10/2026", "on"], ["migration-bridge", "*:read", "01/09/2026", "off"]].map(([a, b, c, d]) =>
      [`<b>${a}</b>`, `<code>${b}</code>`, c, `<span class="pill p-${d === "on" ? "ok" : "warn"}">${t(d === "on" ? "su.on" : "su.off")}</span>`]), t("api.keys")),
    {type: "text", feat: "M30.01", title: t("api.docs"), text: t("api.docsD")},
    tbl("M30.02", [t("api.event"), "URL", t("su.status")], [["quote.approved", "https://erp.example/hooks/quote", "on"], ["job.completed", "https://sms.example/notify", "on"], ["invoice.paid", "https://bi.example/ingest", "off"]].map(([a, b, d]) =>
      [`<code>${a}</code>`, esc(b), `<span class="pill p-${d === "on" ? "ok" : "warn"}">${t(d === "on" ? "su.on" : "su.off")}</span>`]), "Webhooks"),
  ], btnHtml(t("api.newKey"), "plus", "toast(t('act.done'))", true, "M30.01"));
  if (p === "s-audit") {
    const rows = [];
    for (const k of ["quotes", "jobs", "deals"]) {
      const m = await E(k);
      for (const r of (await API.list(k, {})).slice(0, 3)) rows.push([dmy(r._created), esc(r.Owner || ""), r._tenant, esc(L(m.label)), esc(titleOf(m, r)), m.status ? pill(r[m.status], m) : ""]);
    }
    return page("", [tbl("M04.01", [t("sy.time"), "User", "Tenant", "Module", t("det.record"), t("mj.status")], rows)], btnHtml("Export", "download", "", false, "M04.02"));
  }
  return `<p class="muted">${esc(p)}</p>`;
}

/* ---------------- cài đặt bộ phận & profile (sửa trong phiên demo, tải lại trang thì về như config) ---------------- */
const MEMBER_TYPES = ["users", "roles", "profiles", "groups"];
function memberOptions() {
  const A = S.app, O = A.org, uniq = a => [...new Set(a)];
  return {
    users: A.users.map(u => ({value: u.id, label: `${u.name} — ${u.role}`})),
    roles: uniq([...O.roles.map(r => r.name), ...A.users.map(u => u.role)]).map(v => ({value: v, label: v})),
    profiles: Object.keys(A.profile_perms).map(v => ({value: v, label: v})),
    groups: uniq([...O.groups, ...A.users.flatMap(u => u.groups || [])]).map(v => ({value: v, label: v})),
  };
}
async function viewTeamspaces() {
  const A = S.app, opts = memberOptions();
  const nameOf = (type, v) => type === "users" ? (A.users.find(u => u.id === v) || {name: v}).name : v;
  const teams = A.teams.map(tm => {
    const all = tm.entities === "*", list = all ? [] : tm.entities, mem = tm.members || {};
    return {
      id: tm.id, name: L(tm.name), all, prop: tm.proposed === "*",
      users: A.users.filter(u => memberOf(tm, u)).map(u => u.name),
      modules: list.map((k, i) => ({key: k, label: L(A.entities[k].label), icon: A.entities[k].icon, first: i === 0, last: i === list.length - 1,
        prop: Array.isArray(tm.proposed) && tm.proposed.includes(k)})),
      addModules: all ? [] : Object.keys(A.entities).filter(k => !list.includes(k)).map(k => ({key: k, label: L(A.entities[k].label)})),
      members: MEMBER_TYPES.flatMap(type => (mem[type] || []).map(v => ({type, typeLabel: t("tsp.t." + type), value: v, label: nameOf(type, v)}))),
      addMembers: MEMBER_TYPES.map(type => ({label: t("tsp.t." + type), items: opts[type].filter(o => !(mem[type] || []).includes(o.value)).map(o => ({...o, type}))})),
    };
  });
  return render("s-team", {head: {title: t("page.s-team"), sub: t("tsp.sub"), feat: "M02.05"}, note: t("tsp.note"), teams, me: me().name});
}
const teamOf = id => S.app.teams.find(x => x.id === id);
function rerender() { const y = scrollY; return route().then(() => scrollTo(0, y)); } // sửa cấu hình: vẽ lại, giữ vị trí cuộn
function teamModule(id, k, op) {
  const tm = teamOf(id), a = tm.entities, i = a.indexOf(k);
  if (op === "add" && k) a.push(k);
  else if (op === "del") a.splice(i, 1);
  else if (op === "up" && i > 0) [a[i - 1], a[i]] = [a[i], a[i - 1]];
  else if (op === "down" && i < a.length - 1) [a[i + 1], a[i]] = [a[i], a[i + 1]];
  rerender();
}
function teamMember(id, type, v, del) {
  if (!type) return;
  const m = teamOf(id).members = teamOf(id).members || {}, a = m[type] = m[type] || [];
  if (del) a.splice(a.indexOf(v), 1); else if (!a.includes(v)) a.push(v);
  rerender();
}
const PERM_OPS = ["v", "c", "e", "d", "x"];
function permMatrix() {
  const A = S.app, names = Object.keys(A.profile_perms);
  if (!names.includes(S.permProfile)) S.permProfile = me().profile;
  const pr = S.permProfile, full = A.profile_perms[pr] === "*", fake = {profile: pr};
  return {type: "matrix", feat: "M02.02", title: t("pm.title"), note: full ? t("pm.full") : t("pm.note"),
    tabs: names.map(n => ({label: n, on: n === pr, onclick: `S.permProfile='${n.replace(/'/g, "\\'")}';rerender()`, users: A.users.filter(u => u.profile === n).length})),
    cols: PERM_OPS.map(o => t("pm." + o)),
    rows: Object.keys(A.entities).map(k => ({label: L(A.entities[k].label), icon: A.entities[k].icon,
      cells: PERM_OPS.map(o => ({checked: can(k, o, fake), disabled: full || (o !== "v" && !can(k, "v", fake)), onclick: `permToggle('${k}','${o}')`}))}))};
}
function permToggle(k, op) {
  const P = S.app.profile_perms, pr = S.permProfile;
  let cur = P[pr][k] || "";
  cur = cur.includes(op) ? (op === "v" ? "" : cur.replace(op, "")) : cur + op; // bỏ quyền xem → bỏ hết quyền khác trên module
  P[pr][k] = PERM_OPS.filter(o => cur.includes(o)).join("");
  rerender();
}

/* ---------------- router ---------------- */
function takeFilter(path, qp) { // bộ lọc từ link chart: áp 1 lần rồi bỏ khỏi URL, để bỏ chip lọc / đổi pháp nhân không bị áp lại
  if (!qp.get("f") && !qp.get("view")) return null;
  const vs = qp.getAll("v"), pre = {filters: qp.getAll("f").map((f, i) => ({f, v: vs[i]})), view: qp.get("view") || "all"}; // view=mine: link "của tôi" từ trang chủ
  qp.delete("f"); qp.delete("v"); qp.delete("view");
  history.replaceState(null, "", toPublic(path + (qp.toString() ? "?" + qp : "")));
  return pre;
}
async function route() {
  const qp = new URLSearchParams(location.search), path = toInternal(location.pathname, qp), parts = path.split("/").filter(Boolean);
  { const pub = toPublic(path + (qp.toString() ? "?" + qp : "")); if (path !== "/login" && pub !== location.pathname + location.search) history.replaceState(null, "", pub); } // link cũ /e/…, /p/… → URL gọn
  qp.delete("lang"); qp.delete("shot"); qp.delete("annot"); // tham số hiển thị, không phải của màn
  if (qp.has("tenant")) { // link từ chart: chuyển pháp nhân 1 lần rồi bỏ tham số khỏi URL, để đổi pháp nhân sau đó không bị ép lại
    const tn = qp.get("tenant");
    if (S.app.tenants.some(x => x.code === tn) && me().tenants.includes(tn)) { S.tenant = tn; applyTheme(); }
    qp.delete("tenant");
    history.replaceState(null, "", toPublic(path + (qp.toString() ? "?" + qp : "")));
  }
  if (parts[0] === "login" || parts[0] === "pick") return viewLogin(parts[0]);
  if (parts[0] === "p" && ["calendar", "dash"].includes(parts[1])) return redirect("/home"); // trang Lịch, Dashboard đã bỏ: link cũ chuyển về trang chủ
  if (parts[0] === "p" && parts[1] === "forecast") return redirect("/p/reports?i=r10"); // Dự báo doanh số → báo cáo trong trang Báo cáo
  let cur = "home", h = "";
  try {
    if (parts[0] === "e") {
      const k = parts[1]; cur = k;
      h = !S.app.entities[k] ? `<p class="muted">404</p>` : !can(k) || (parts[2] === "new" && !can(k, "c")) ? denied(t("perm.denied"), t("perm.deniedD", {p: me().profile})) : parts[2] === "new" ? await viewForm(k, qp.get("layout")) : parts[2] === "kanban" ? await viewList(k, "kanban") : parts[2] === "list" ? await viewList(k, "list", qp.get("q"), takeFilter(path, qp))
        : parts[2] ? await viewDetail(k, parts[2]) : await viewList(k, "auto", qp.get("q"), takeFilter(path, qp)); // mở từ menu: module có Kanban thì vào Kanban
    } else {
      const p = parts[1] || "home"; cur = p;
      h = p === "home" ? await viewHome() : p === "myjobs" ? await viewMyJobs(qp.get("t"), qp.get("tab")) : p === "reports" ? await viewReports(qp.get("i"))
        : p === "search" ? await viewSearch(qp.get("q"))
        : p === "work" || p === "workqueue" ? await viewWork() : !isAdmin() ? denied(t("perm.setup"), t("perm.setupD", {p: me().profile})) : await viewSetting(p);
    }
  } catch (e) { h = `<div class="card"><b>Error</b><pre>${esc(e.message)}</pre></div>`; console.error(e); }
  await shell(cur);
  $("#view").innerHTML = h;
  window.scrollTo(0, 0);
}

/* ---------------- kịch bản demo ---------------- */
let tourAt = null;
function toggleTour() { $("#tour").classList.toggle("open"); renderTour(); }
async function renderTour() {
  $("#tour").innerHTML = await render("tour", {scenarios: S.app.tour.map((sc, a) => ({n: a + 1, title: L(sc.title),
    steps: sc.steps.map((st, b) => ({a, b, text: L(st.text), on: !!tourAt && tourAt[0] === a && tourAt[1] === b}))}))});
}
function tourGo(a, b) {
  tourAt = [a, b]; const st = S.app.tour[a].steps[b];
  go(st.route);
  $("#tourText").textContent = `${a + 1}.${b + 1} ${L(st.text)}`; $("#tourNote").classList.add("show");
  $("#tour").classList.remove("open"); renderTour();
}
function tourStep(d) {
  if (!tourAt) return;
  let [a, b] = tourAt; b += d;
  if (b >= S.app.tour[a].steps.length) { if (a + 1 < S.app.tour.length) { a++; b = 0; } else b--; }
  if (b < 0) { if (a > 0) { a--; b = S.app.tour[a].steps.length - 1; } else b = 0; }
  tourGo(a, b);
}
function tourEnd() { tourAt = null; $("#tourNote").classList.remove("show"); }

/* ---------------- khởi động ---------------- */
(async function boot() {
  const cfg = await fetch(BASE + "/config.json").then(r => r.json()).catch(() => ({}));
  API.init({...cfg, apiBase: (cfg.apiBase || "").startsWith("/") ? BASE + cfg.apiBase : cfg.apiBase});
  helpers();
  for (const p of ["page-head", "bars", "homeTasks", "homeFeed", "homePins"]) Handlebars.registerPartial(p, await fetch(`${BASE}/templates/${p}.html`).then(r => r.text()));
  if (location.hash.startsWith("#/")) history.replaceState(null, "", BASE + location.hash.slice(1)); // link cũ /#/p/home → /p/home
  { const p = new URLSearchParams(location.search).get("__p"); if (p) history.replaceState(null, "", BASE + p); } // GitHub Pages: 404.html chuyển link sâu về ?__p=<đường dẫn>
  const qp = new URLSearchParams(location.search);
  // chỉ nhớ ngôn ngữ khi người dùng chọn (?lang=…); key mới để bỏ giá trị "vi" đã tự lưu trước đây
  S.lang = qp.get("lang") || (() => { try { return localStorage.getItem("crm.uiLang"); } catch (e) { return null; } })() || cfg.defaultLang || "en";
  if (qp.get("lang")) try { localStorage.setItem("crm.uiLang", S.lang); } catch (e) { /* trình duyệt chặn lưu: dùng mặc định */ }
  document.documentElement.lang = S.lang;
  S.T = await fetch(`${BASE}/i18n/${S.lang}.json`).then(r => r.json());
  S.app = await API.app();
  S.user = S.app.me;
  document.title = S.app.name + " · Prototype";
  $("#tourNote").innerHTML = `<button class="btn" onclick="tourStep(-1)">‹</button><span id="tourText"></span><button class="btn pri" onclick="tourStep(1)">›</button><button class="btn" onclick="tourEnd()">✕</button>`;
  if (qp.get("shot")) { S.shot = true; document.body.classList.add("shot"); }
  if (qp.get("annot") === "1") { S.annot = true; document.body.classList.add("annot"); }
  applyTheme();
  document.addEventListener("click", e => { if (!e.target.closest(".dd")) document.querySelectorAll(".dd.open").forEach(d => d.classList.remove("open")); });
  window.addEventListener("popstate", route); // nút Back / Forward
  document.addEventListener("click", e => { // link nội bộ (/e/…, /p/…): đổi màn không tải lại trang
    const a = e.target.closest && e.target.closest("a[href^='/']");
    if (!a || a.target || e.ctrlKey || e.metaKey || e.shiftKey || e.button) return;
    e.preventDefault(); go(a.getAttribute("href"));
  }, true); // capture: chạy trước onclick="event.stopPropagation()" của link nằm trong thẻ bấm được
  await route();
  document.body.dataset.ready = "1";
})();
