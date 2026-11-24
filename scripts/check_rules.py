#!/usr/bin/env python3
"""Kiểm tra các quy tắc của repo (xem mục "Quy tắc bắt buộc" trong CLAUDE.md). Không cần cài thêm gì (Python 3 + Node).

    python3 scripts/check_rules.py          # chạy tay, in lỗi, exit 1 nếu có lỗi
    python3 scripts/check_rules.py --hook   # dùng làm Stop hook của Claude Code (.claude/settings.json): lỗi → exit 2

Mỗi lỗi in kèm mã quy tắc (R1…R8) và file để sửa.
"""
import json
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SC = ROOT / "showcase"
errors = []


def err(rule, msg):
    errors.append(f"[{rule}] {msg}")


def rel(p):
    return p.relative_to(ROOT).as_posix()


def ignored(paths):
    """Tập file bị .gitignore bỏ qua (git check-ignore)."""
    if not paths:
        return set()
    r = subprocess.run(["git", "-C", str(ROOT), "check-ignore", "--stdin"], input="\n".join(paths), capture_output=True, text=True)
    return set(r.stdout.split())


def deployable():
    """File sẽ lên web: đã track hoặc chưa track nhưng không bị ignore."""
    r = subprocess.run(["git", "-C", str(ROOT), "ls-files", "--cached", "--others", "--exclude-standard"], capture_output=True, text=True)
    return [ROOT / p for p in r.stdout.split("\n") if p and (ROOT / p).is_file()]


SITE_PAGES = [p for p in [ROOT / "index.html", *sorted((ROOT / "screens").rglob("index.html"))] if p.is_file()]
PG = ROOT / "screens/du-an/playground/index.html"  # trang playground (thuộc mục Dự án)
VI = re.compile(r"[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵĐ]", re.I)

# R1 — Song ngữ: chữ tiếng Việt ở header / menu mobile / footer phải có data-en (nút VI/EN của header đổi được)
BLOCK = re.compile(r'<header class="site-header".*?</header>|<div class="mobile-nav">.*?\n</div>|<footer class="site-footer">.*?</footer>', re.S)
TAG = re.compile(r"<(a|h[1-6]|p|span|li|button|strong)(\s[^>]*)?>([^<]+)</\1>")
for page in SITE_PAGES:
    for blk in BLOCK.findall(page.read_text(encoding="utf-8")):
        for name, attrs, text in TAG.findall(blk):
            if VI.search(text) and "data-en=" not in (attrs or "") and "aria-label" not in (attrs or ""):
                err("R1", f"{rel(page)}: <{name}>{text.strip()[:50]}</{name}> thiếu data-en (bản tiếng Anh)")

# R1 — Song ngữ trong dữ liệu dự án + tên dịch vụ
node = subprocess.run(["node", "-e", """
const fs=require('fs');eval(fs.readFileSync(process.argv[1],'utf8')+';'+fs.readFileSync(process.argv[2],'utf8')+';globalThis.D=DATA_DU_AN;globalThis.S=DATA_DICH_VU');
console.log(JSON.stringify({du_an:D,dich_vu:S}))""", str(ROOT / "assets/data/du-an.js"), str(ROOT / "assets/data/dich-vu.js")], capture_output=True, text=True)
if node.returncode:
    err("R7", f"không đọc được assets/data/du-an.js / dich-vu.js: {node.stderr.strip()[:200]}")
    DATA = {"du_an": [], "dich_vu": []}
else:
    DATA = json.loads(node.stdout)
for dv in DATA["dich_vu"]:
    if not dv.get("ten_en"):
        err("R1", f"assets/data/dich-vu.js: dịch vụ '{dv.get('ten')}' thiếu ten_en")
    if not dv.get("mo_ta_ngan_en") or len(dv.get("loi_ich_en") or []) != len(dv.get("loi_ich") or []):
        err("R1", f"assets/data/dich-vu.js: dịch vụ '{dv.get('ten')}' thiếu mo_ta_ngan_en / loi_ich_en (tab Dịch vụ trang chủ, trang Dịch vụ)")
for da in DATA["du_an"]:
    who = f"assets/data/du-an.js [{da.get('id')}]"
    for k in ("ten_du_an", "khach_hang", "nganh", "anh_alt", "tom_tat", "thach_thuc", "giai_phap"):
        if not da.get(k + "_en"):
            err("R1", f"{who}: thiếu {k}_en")
    for i, kq in enumerate(da.get("ket_qua", [])):
        if not kq.get("chi_so_en") or not kq.get("mo_ta_en"):
            err("R1", f"{who}: ket_qua[{i}] thiếu chi_so_en / mo_ta_en")
    for i, uc in enumerate(da.get("use_cases", [])):
        if not uc.get("ten_en") or not uc.get("mo_ta_en"):
            err("R1", f"{who}: use_cases[{i}] thiếu ten_en / mo_ta_en")
    for i, pv in enumerate(da.get("pham_vi", [])):
        if not all(pv.get(k + "_en") for k in ("giai_doan", "hang_muc", "mo_ta")):
            err("R1", f"{who}: pham_vi[{i}] thiếu giai_doan_en / hang_muc_en / mo_ta_en")
    if da.get("thi_truong") and not da.get("thi_truong_en"):
        err("R1", f"{who}: thiếu thi_truong_en")
    for i, ap in enumerate(da.get("anh_phu", [])):
        if not ap.get("anh_alt_en"):
            err("R1", f"{who}: anh_phu[{i}] thiếu anh_alt_en")

# R2 — Dự án = prototype showcase: có playground, use case theo lợi ích kinh doanh, giá trị không phải số màn hình / số liệu bịa
for da in DATA["du_an"]:
    who = f"assets/data/du-an.js [{da.get('id')}]"
    if not da.get("playground", "").startswith("screens/du-an/playground/?app="):
        err("R2", f"{who}: thiếu playground (screens/du-an/playground/?app=<id>)")
    if len(da.get("use_cases", [])) < 4:
        err("R2", f"{who}: cần ít nhất 4 use_cases (lợi ích kinh doanh)")
    if len(da.get("ket_qua", [])) != 3:
        err("R2", f"{who}: ket_qua phải có đúng 3 giá trị kinh doanh")
    for kq in da.get("ket_qua", []):
        txt = f"{kq.get('chi_so', '')} {kq.get('mo_ta', '')}"
        if re.search(r"màn hình|prototype|\bcổng\b|\d+\s*%", txt, re.I):
            err("R2", f"{who}: ket_qua '{txt[:60]}' không phải giá trị kinh doanh (bỏ số màn hình / số cổng / % tự đặt)")
    if not da.get("linh_vuc") in ("hospitality", "industrial", "healthcare", "logistics"):
        err("R2", f"{who}: thiếu linh_vuc (icon badge lĩnh vực)")
    anh = ROOT / da.get("anh", "")
    if anh.is_file() and anh.suffix == ".jpg":
        b = anh.read_bytes()
        m = re.search(rb"\xff[\xc0\xc2].{3}(..)(..)", b, re.S)
        if m and int.from_bytes(m.group(2), "big") < 2000:
            err("R2", f"{rel(anh)}: ảnh bìa rộng {int.from_bytes(m.group(2), 'big')}px, cần ≥ 2000px (chụp 2x cho nét)")
    elif not anh.is_file():
        err("R2", f"{who}: ảnh {da.get('anh')} không tồn tại")
    for ap in da.get("anh_phu", []):
        if not (ROOT / ap.get("anh", "")).is_file():
            err("R2", f"{who}: ảnh phụ {ap.get('anh')} không tồn tại (chụp lại màn prototype)")

# R3 — Không cho tải mã nguồn
gi = (ROOT / ".gitignore").read_text()
for line in ("showcase/**/*.zip", "showcase/shots/", "showcase/crm/_src/source/", "showcase/comparison.html", "showcase/REVIEW.md", "showcase/_review/"):
    if line not in gi.splitlines():
        err("R3/R4", f".gitignore thiếu dòng '{line}'")
DEPLOY = deployable()
for f in DEPLOY:
    if f.suffix == ".zip":
        err("R3", f"{rel(f)}: file zip sẽ bị deploy (phải nằm trong .gitignore)")
    # giao diện bên trong prototype (nút "tải hoá đơn"…, chữ "download" trong bản EN) không phải link tải mã nguồn
    if f.suffix in (".html", ".js") and not any(f"/showcase/{d}/" in str(f) for d in ("hospitality", "medical", "crm", "logistics")):
        t = f.read_text(encoding="utf-8", errors="ignore")
        if re.search(r"""href=["'][^"']*\.zip["']|\sdownload[\s>=]""", t):
            err("R3", f"{rel(f)}: có link tải / thuộc tính download")

# R4 — Không lộ dữ liệu thật của khách: quét tên gốc (TERMS trong comparison.html, chỉ có ở local)
cmp_html = SC / "comparison.html"
if cmp_html.is_file():
    m = re.search(r"const TERMS = (\[\[.*?\]\]);", cmp_html.read_text(encoding="utf-8"))
    terms = {t[1] for t in json.loads(m.group(1))} if m else set()
    terms = {t for t in terms if len(t) > 4 and not t.startswith(("\"", "data-count", "#")) and t.lower() not in {"military", "suntec", "novena", "marvel", "plum"}}
    # tên người còn có thể lọt dưới dạng email chữ thường (first.last@…) → thêm biến thể first.last; so khớp không phân biệt hoa thường
    terms |= {t.lower().replace(" ", ".") for t in terms if re.fullmatch(r"[A-Z][a-z]+ [A-Z][a-z]+", t)}
    if terms:
        rx = re.compile("|".join(sorted(map(re.escape, terms), key=len, reverse=True)), re.I)
        for f in DEPLOY:
            if f.suffix.lower() in (".html", ".js", ".json", ".md", ".css", ".txt", ".xml", ".py"):
                hit = rx.search(f.read_text(encoding="utf-8", errors="ignore"))
                if hit:
                    err("R4", f"{rel(f)}: còn tên gốc của khách '{hit.group(0)}' (file này sẽ lên web)")
else:
    print("(bỏ qua R4: không có showcase/comparison.html ở máy này)", file=sys.stderr)

# R5 — Playground: layout KTP, vừa khung nhìn, không chế độ ảnh, không đổi prototype bên trong, nút toàn màn hình, chuyển màn góc dưới
pg = PG.read_text(encoding="utf-8") if PG.is_file() else ""
if not pg:
    err("R5", "thiếu trang playground screens/du-an/playground/index.html")
for need, why in [('class="site-header"', "header chuẩn KTP"), ('class="mobile-nav"', "menu mobile KTP"),
                  ("assets/css/global.css", "global.css của website"), ("assets/js/global.js", "global.js của website"),
                  ('class="pg-pager"', "cụm chuyển màn ở góc dưới khung xem"), ('id="sideToggle"', "nút thu gọn sidebar"),
                  ('M4 9V4h5', "icon toàn màn hình cho nút mở prototype"), ("window.PG_BASE", "đường dẫn tới bản build prototype")]:
    if need not in pg:
        err("R5", f"{rel(PG)}: thiếu {why} ({need})")
du = (ROOT / "screens/du-an/index.html").read_text(encoding="utf-8")
for m in ("<!--pre:chips-->", "<!--pre:domains-->"):
    if m not in du:
        err("R6", f"screens/du-an/index.html: thiếu marker {m} (chip lọc / khối lĩnh vực render sẵn)")
if 'class="du-an-domain' not in du:
    err("R6", "screens/du-an/index.html: chưa render khối nội dung theo lĩnh vực (chạy build_playground.py)")
stub = (SC / "index.html").read_text(encoding="utf-8")
if "noindex" not in stub or "screens/du-an/" not in stub:
    err("R5", "showcase/index.html: phải là trang chuyển hướng (noindex) sang screens/du-an/")
for bad, why in [('id="modes"', "chế độ Live/Ảnh đã bỏ"), ("productSel", "ô đổi prototype trong playground đã bỏ"), ('id="zip"', "nút tải zip")]:
    if bad in pg:
        err("R5", f"{rel(PG)}: còn {why}")
for hub in [SC / "hospitality/pms/index.html", *sorted((SC / "medical").glob("*/index.html"))]:
    h = hub.read_text(encoding="utf-8")
    if re.search(r">\s*Entry Flow\s*<", h):
        err("R5", f"{rel(hub)}: trang mục lục còn khu 'Entry Flow'")
    for t in re.findall(r"<a [^>]*>(?:(?!</a>).)*?<(?:strong|span class=\"idx-card__title\")>([^<]+)<", h, re.S):
        if re.search(r"(?i)\b(log ?in|sign ?in|login)\b(?!\s*log\b)", t):
            err("R5", f"{rel(hub)}: trang mục lục còn thẻ dẫn tới màn đăng nhập '{t.strip()}'")
# mục lục dạng mảng JS G = [[icon, nhóm, [[mã, tên màn, file], …]], …] (Fleet): không còn màn đăng nhập
for hub in sorted(SC.glob("*/*/index.html")):
    h = hub.read_text(encoding="utf-8")
    g = re.search(r"const G = \[(.*?)\n\];", h, re.S)
    for name, f in re.findall(r"\['[A-Z]+_\d+', '((?:[^'\\]|\\.)*)', '([^']+)'\]", g.group(1) if g else ""):
        if re.search(r"(?i)\b(log ?in|sign ?in|login|đăng nhập)\b|dang-nhap", name + " " + f):
            err("R5", f"{rel(hub)}: trang mục lục còn mục dẫn tới màn đăng nhập '{name}'")
css = (SC / "assets/playground.css").read_text(encoding="utf-8")
if not re.search(r"\.pg-player\s*\{[^}]*position:\s*fixed", css):
    err("R5", "showcase/assets/playground.css: .pg-player phải ghim vào khung nhìn (position: fixed) để không cuộn trang")
pdata = (SC / "playground-data.js").read_text(encoding="utf-8")
if re.search(r'"u":"index\.html"', pdata):
    err("R5", "showcase/playground-data.js: còn trang mục lục index.html trong danh sách màn (màn đầu tiên phải là màn thật)")
for page in SITE_PAGES:
    for blk in BLOCK.findall(page.read_text(encoding="utf-8")):
        if re.search(r">\s*Demo\s*</a>", blk):
            err("R5", f"{rel(page)}: menu còn mục 'Demo' (showcase thuộc 'Dự án')")
for grp in re.findall(r'"name":\{"vi":"[^"]*","en":"(Entry Flow|Access|Start)"\}', pdata):
    err("R5", f"showcase/playground-data.js: còn nhóm '{grp}' (luồng vào) — bỏ theo quy tắc, chạy lại build_playground.py")
for t in re.findall(r'"t":(?:"([^"]*)"|\{"vi":"[^"]*","en":"([^"]*)"\})', pdata):
    name = (t[0] or t[1]).strip()
    if re.search(r"(?i)\b(log ?in|sign ?in|login|đăng nhập)\b(?!\s*log\b)|^pick entity$", name):
        err("R5", f"showcase/playground-data.js: còn màn đăng nhập '{name}' trong danh sách màn")
if '"s":"' in pdata or ".zip" in pdata:
    err("R5", "showcase/playground-data.js: còn ảnh chụp / zip; chạy lại python3 showcase/_tools/build_playground.py")

# R6 — SEO: sitemap có trang tổng, từng lĩnh vực, từng prototype
sm = (ROOT / "sitemap.xml").read_text()
pids = re.findall(r'\{"id":"([\w-]+)","dom"', pdata)
for u in ["screens/du-an/"] + [f"screens/du-an/?linh-vuc={d}" for d in ("hospitality", "industrial", "healthcare", "logistics")] + [f"screens/du-an/playground/?app={p}" for p in pids]:
    if f"https://www.ktpsolutions.vn/{u}</loc>" not in sm:
        err("R6", f"sitemap.xml thiếu {u} (chạy lại build_playground.py)")

# R7 — JS không lỗi cú pháp
js = [*(ROOT / "assets").rglob("*.js"), *(ROOT / "screens").rglob("*.js"), *(SC / "assets").glob("*.js"), SC / "playground-data.js", ROOT / "script.js"]
for f in js:
    r = subprocess.run(["node", "--check", str(f)], capture_output=True, text=True)
    if r.returncode:
        err("R7", f"{rel(f)}: lỗi cú pháp JS: {r.stderr.strip().splitlines()[-1] if r.stderr.strip() else ''}")

# R8 — Tương phản màu: token hospitality không được nhạt hơn mức đã chuẩn hoá (WCAG AA 4.5:1 trên nền trắng)
def lum(h):
    r, g, b = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    f = lambda x: x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


for tok in [SC / "hospitality/pms/assets/css/global.css", SC / "hospitality/cms/assets/css/variables.css"]:
    t = tok.read_text()
    for name in ("--color-gray-400", "--color-gray-500", "--color-gray-600", "--color-accent", "--color-success-text", "--color-warning-text", "--color-danger-text"):
        m = re.search(rf"{name}:\s*(#[0-9A-Fa-f]{{6}})", t)
        if not m:
            err("R8", f"{rel(tok)}: thiếu token {name}")
        elif (1.05) / (lum(m.group(1)) + 0.05) < 4.5:
            err("R8", f"{rel(tok)}: {name} {m.group(1)} tương phản < 4.5:1 trên nền trắng")

if errors:
    msg = "Vi phạm quy tắc repo (xem 'Quy tắc bắt buộc' trong CLAUDE.md):\n" + "\n".join(f"  - {e}" for e in errors[:60])
    if len(errors) > 60:
        msg += f"\n  … và {len(errors) - 60} lỗi khác"
    if "--hook" in sys.argv:
        try:
            active = json.load(sys.stdin).get("stop_hook_active")
        except Exception:
            active = False
        print(msg + ("\n(Đã nhắc 1 lần trong lượt này; báo lại cho người dùng các lỗi còn lại.)" if active else ""), file=sys.stderr)
        sys.exit(0 if active else 2)
    print(msg)
    sys.exit(1)
print(f"OK: {len(SITE_PAGES)} trang, {len(DATA['du_an'])} dự án, {len(js)} file JS đạt mọi quy tắc R1–R8.")
