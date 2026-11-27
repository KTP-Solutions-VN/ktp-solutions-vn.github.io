"""Sinh showcase/playground-data.js (dữ liệu cho trang playground screens/du-an/playground/), render sẵn chip lọc + khối
nội dung theo lĩnh vực vào screens/du-an/index.html và cập nhật URL lĩnh vực / playground trong sitemap.xml.

Chạy lại mỗi khi thêm / bớt màn hay thêm prototype:  python3 showcase/_tools/build_playground.py
- Prototype tĩnh: đọc trang mục lục (index.html) để lấy nhóm màn theo đúng thứ tự, rồi quét screens/ để không sót màn
  nào; tên màn lấy từ <title>.
- CRM (single-page app): danh sách màn lấy từ shots.json (các route đã chụp), nhóm theo module trong mock-api.
- shots.json: danh sách route CRM (kèm ảnh After đã chụp, chỉ dùng cho review ở local; playground không hiện ảnh).
"""
import html
import json
import pathlib
import re

SC = pathlib.Path(__file__).resolve().parent.parent
SHOTS = json.loads((SC / "_tools/shots.json").read_text())

SITE = "https://www.ktpsolutions.vn/screens/du-an/playground/"  # trang playground (thuộc mục Dự án)
ASSETS = "https://www.ktpsolutions.vn/showcase/"            # bản build prototype + ảnh bìa
PROJECTS = "https://www.ktpsolutions.vn/screens/du-an/"      # trang Dự án (lọc ?linh-vuc=<slug>)

# Lĩnh vực: slug dùng trong URL (?domain=<slug>). name: nhãn ngắn (chip lọc, "Khách sạn · PMS"); h: tiêu đề trang lĩnh vực;
# title / desc: thẻ <title> và meta description; intro: đoạn mô tả hiển thị trên trang; keywords: cụm từ người dùng hay tìm.
DOMAINS = [
    {"slug": "hospitality", "name": {"vi": "Khách sạn & Resort", "en": "Hospitality"}, "short": {"vi": "Khách sạn", "en": "Hospitality"},
     "h": {"vi": "Phần mềm quản lý khách sạn, resort & villa", "en": "Hotel, resort & villa management software"},
     "title": {"vi": "Phần mềm quản lý khách sạn, resort, villa: PMS & Channel Manager", "en": "Hotel, resort & villa management software: PMS & Channel Manager"},
     "desc": {"vi": "Demo phần mềm quản lý khách sạn, resort, villa do KTP Solutions xây dựng: PMS quản lý đặt phòng, check-in/check-out, buồng phòng, bảo trì, chủ sở hữu và Channel Manager đồng bộ giá, phòng trống lên Booking.com, Agoda, Airbnb, Expedia.",
              "en": "Hotel, resort and villa management software demos by KTP Solutions: a PMS for reservations, check-in/out, housekeeping, maintenance and owners, plus a channel manager syncing rates and availability to Booking.com, Agoda, Airbnb and Expedia."},
     "intro": {"vi": "Hệ thống quản lý khách sạn (PMS) và Channel Manager cho chuỗi khách sạn, resort, villa: quản lý đặt phòng và lịch phòng, check-in/check-out, giá phòng và phòng trống, đồng bộ OTA (Booking.com, Agoda, Airbnb, Expedia), chủ sở hữu villa, dịch vụ khách, buồng phòng, bảo trì, kế toán và nhân sự.",
               "en": "Property management system (PMS) and channel manager for hotel, resort and villa groups: reservations and room calendar, check-in/out, rates and availability, OTA sync (Booking.com, Agoda, Airbnb, Expedia), villa owners, guest services, housekeeping, maintenance, accounting and HR."},
     "keywords": ["phần mềm quản lý khách sạn", "phần mềm quản lý resort", "phần mềm quản lý villa", "PMS khách sạn", "channel manager",
                  "phần mềm đặt phòng", "đồng bộ OTA", "hotel management software", "property management system", "hotel channel manager"]},
    {"slug": "industrial", "name": {"vi": "Công nghiệp / B2B", "en": "Industrial / B2B"}, "short": {"vi": "Công nghiệp", "en": "Industrial"},
     "h": {"vi": "Phần mềm CRM doanh nghiệp B2B & công nghiệp", "en": "B2B & industrial CRM software"},
     "title": {"vi": "Phần mềm CRM doanh nghiệp B2B, công nghiệp: bán hàng, báo giá, hậu mãi", "en": "B2B & industrial CRM software: sales, quotations, after-sales"},
     "desc": {"vi": "Demo phần mềm CRM doanh nghiệp B2B do KTP Solutions xây dựng cho tập đoàn thiết bị công nghiệp: quản lý khách hàng, cơ hội bán hàng, báo giá, đơn hàng, hoá đơn, dịch vụ hậu mãi, lắp đặt, mua hàng và phê duyệt theo hạn mức.",
              "en": "B2B CRM software demo by KTP Solutions for an industrial equipment group: customers, deals, quotations, sales orders, invoices, after-sales service, installation, purchasing and delegation-of-authority approvals."},
     "intro": {"vi": "CRM đa pháp nhân cho doanh nghiệp phân phối thiết bị công nghiệp: quản lý khách hàng và liên hệ, cơ hội bán hàng (pipeline), báo giá, đơn hàng, hoá đơn, lệnh dịch vụ và hậu mãi, dự án đóng mới, yêu cầu mua sắm, hạn mức phê duyệt (DoA), đồng bộ phần mềm kế toán.",
               "en": "Multi-entity CRM for industrial equipment distributors: customers and contacts, sales pipeline, quotations, sales orders, invoices, service orders and after-sales, fit-out projects, purchase requests, delegation-of-authority (DoA) approval limits and accounting sync."},
     "keywords": ["phần mềm CRM", "CRM doanh nghiệp", "CRM B2B", "phần mềm quản lý bán hàng", "phần mềm quản lý báo giá",
                  "quản lý dịch vụ hậu mãi", "CRM công nghiệp", "B2B CRM", "industrial CRM", "sales CRM software"]},
    {"slug": "healthcare", "name": {"vi": "Y tế", "en": "Healthcare"}, "short": {"vi": "Y tế", "en": "Healthcare"},
     "h": {"vi": "Phần mềm y tế: website bán hàng, quản trị, POS nhà thuốc & kiosk", "en": "Healthcare software: e-commerce, back-office, pharmacy POS & kiosk"},
     "title": {"vi": "Phần mềm y tế: website bán hàng bệnh viện, phòng khám, POS nhà thuốc", "en": "Healthcare software: hospital e-commerce, clinic booking, pharmacy POS"},
     "desc": {"vi": "Demo phần mềm y tế do KTP Solutions xây dựng cho bệnh viện, phòng khám, chuỗi nhà thuốc: website bán sản phẩm và dịch vụ y tế, đặt lịch, hội viên, trang quản trị đơn hàng, khuyến mãi, báo cáo, phần mềm POS nhà thuốc và kiosk tự phục vụ.",
              "en": "Healthcare software demos by KTP Solutions for hospitals, clinics and pharmacy chains: a medical e-commerce storefront with bookings and membership, an admin back-office for orders, promotions and reports, a pharmacy POS and a self-service kiosk."},
     "intro": {"vi": "Bộ giải pháp thương mại điện tử y tế cho bệnh viện, phòng khám, chuỗi nhà thuốc: website bán sản phẩm và gói dịch vụ y tế, đặt lịch khám, hội viên và điểm thưởng, trang quản trị đơn hàng, hoàn tiền, khuyến mãi, nội dung và báo cáo, phần mềm POS bán hàng tại quầy thuốc, kiosk tự phục vụ tại sự kiện và sảnh bệnh viện.",
               "en": "Healthcare e-commerce suite for hospitals, clinics and pharmacy chains: storefront for medical products and service packages, appointment booking, membership and loyalty points, back-office for orders, refunds, promotions, content and reports, a pharmacy counter POS and a self-service kiosk for events and hospital lobbies."},
     "keywords": ["phần mềm quản lý bệnh viện", "phần mềm quản lý phòng khám", "phần mềm quản lý nhà thuốc", "phần mềm POS nhà thuốc",
                  "website bán hàng y tế", "thương mại điện tử y tế", "healthcare e-commerce", "pharmacy POS software", "clinic booking system", "kiosk tự phục vụ bệnh viện", "hospital self-service kiosk"]},
    {"slug": "logistics", "name": {"vi": "Vận tải & Logistics", "en": "Transport & Logistics"}, "short": {"vi": "Vận tải", "en": "Logistics"},
     "h": {"vi": "Phần mềm quản lý đội xe & vận tải hàng hoá", "en": "Fleet & road freight management software"},
     "title": {"vi": "Phần mềm quản lý đội xe, vận tải: điều phối, GSHT, lãi/lỗ từng chuyến", "en": "Fleet & trucking management software: dispatch, GPS tracking, profit per trip"},
     "desc": {"vi": "Demo phần mềm quản lý đội xe do KTP Solutions xây dựng cho doanh nghiệp vận tải hàng hoá: đơn vận chuyển, điều phối xe và tài xế, bản đồ giám sát GSHT, giờ lái, giấy tờ và bảo dưỡng, tạm ứng, quyết toán, lãi/lỗ từng chuyến và app tài xế.",
              "en": "Fleet management software demo by KTP Solutions for road freight companies: shipping orders, vehicle and driver dispatch, GPS-tracker live map, driving hours, documents and maintenance, cash advances, trip settlement, profit per trip and a driver app."},
     "intro": {"vi": "Phần mềm quản lý đội xe cho doanh nghiệp vận tải hàng hoá 10–100 xe (xe tải, đầu kéo container): đơn vận chuyển thường và container, bảng điều phối và gán xe, tài xế, bản đồ giám sát từ thiết bị GSHT, giờ lái và nhật ký an toàn, giấy tờ và nhắc hạn, bảo dưỡng, tạm ứng và quyết toán chuyến, lương chuyến, hoá đơn, công nợ, bảng giá cước, báo cáo lãi/lỗ từng chuyến và app tài xế Android.",
               "en": "Fleet management software for road freight companies running 10–100 trucks (box trucks, container tractor units): general and container shipping orders, a dispatch board with vehicle and driver assignment, a live map from GPS trackers, driving hours and safety log, documents with expiry reminders, maintenance, cash advances and trip settlement, trip pay, invoices, receivables and payables, rate cards, profit and loss per trip and an Android driver app."},
     "keywords": ["phần mềm quản lý đội xe", "phần mềm quản lý vận tải", "phần mềm điều phối xe", "TMS vận tải", "quản lý xe container", "quản lý chi phí chuyến xe",
                  "app tài xế", "fleet management software", "transport management system", "trucking dispatch software"]},
]

# Thứ tự hiển thị trong playground. dom: slug lĩnh vực; short: tên ngắn ("Khách sạn · PMS"); seo: tiêu đề / mô tả trang ?app=<id>.
# dir: thư mục prototype (tương đối với showcase/), hub: trang mục lục, heading: thẻ tiêu đề dùng làm nhóm trong trang mục lục.
# hub_js: trang mục lục liệt kê màn bằng mảng JS G = [[icon, nhóm, [[mã, tên màn, file], …]], …] (Fleet).
# en: thư mục bản tiếng Anh trong prototype (sinh bởi _tools/i18n_prototype.py); playground mở bản này khi website đang ở EN.
# mobile: True nếu prototype có layout responsive dùng được ở bề ngang điện thoại (~390px): playground trên điện thoại mở ở bề ngang đó,
#         tỉ lệ 1. Không có cờ = chỉ có bản desktop: trên điện thoại hiện lời khuyên xem trên máy tính (vẫn xem được bản thu nhỏ).
PRODUCTS = [
    {"id": "pms", "dom": "hospitality", "short": "PMS", "name": "Azura Manager PMS",
     "seo": {"vi": "Phần mềm quản lý khách sạn, resort, villa (PMS)", "en": "Hotel & resort property management system (PMS)"},
     "desc": {"vi": "Phần mềm quản lý khách sạn, resort, villa (PMS): đặt phòng, lịch check-in/check-out, chủ sở hữu villa, dịch vụ khách, buồng phòng, bảo trì, nội dung website, kế toán & nhân sự.",
              "en": "Hotel, resort & villa property management system (PMS): reservations, check-in/out calendar, villa owners, guest services, housekeeping, maintenance, website content, accounting & HR."},
     "dir": "hospitality/pms", "hub": "index.html", "heading": r'<h2 class="idx-section__title">', "zip": "hospitality/pms.zip", "accent": "#4C5FFF"},
    {"id": "cms", "dom": "hospitality", "short": "Channel Manager", "name": "Azura Stays Channel Manager",
     "seo": {"vi": "Channel Manager khách sạn: đồng bộ OTA Booking.com, Agoda, Airbnb", "en": "Hotel channel manager: OTA sync for Booking.com, Agoda, Airbnb"},
     "desc": {"vi": "Channel Manager cho khách sạn, villa: đồng bộ giá phòng, phòng trống và đặt phòng lên Booking.com, Agoda, Airbnb, Expedia (qua Channex / Beds24), tin nhắn khách gom về một nơi, báo cáo doanh thu.",
              "en": "Channel manager for hotels and villas: rates, availability and reservations synced to Booking.com, Agoda, Airbnb, Expedia (via Channex / Beds24), guest messages in one place and revenue reports."},
     "dir": "hospitality/cms", "zip": "hospitality/cms.zip", "accent": "#019770"},
    {"id": "crm", "dom": "industrial", "short": "CRM", "name": "Apex Industrial CRM",
     "seo": {"vi": "Phần mềm CRM doanh nghiệp B2B, công nghiệp", "en": "B2B industrial CRM software"},
     "desc": {"vi": "Phần mềm CRM đa pháp nhân cho doanh nghiệp thiết bị công nghiệp: khách hàng, cơ hội bán hàng, báo giá, đơn hàng, hoá đơn, dịch vụ hậu mãi, lắp đặt, mua hàng, phê duyệt theo hạn mức (DoA).",
              "en": "Multi-entity CRM for an industrial equipment group: customers, deals, quotations, orders, invoices, after-sales service, installation, purchasing, DoA approvals."},
     "dir": "crm/app", "zip": "crm/app.zip", "accent": "#F5A524"},
    {"id": "admin", "dom": "healthcare", "short": "Admin", "name": "CareJourney Admin",
     "seo": {"vi": "Phần mềm quản trị bán hàng y tế cho bệnh viện, phòng khám", "en": "Healthcare e-commerce admin for hospitals & clinics"},
     "desc": {"vi": "Trang quản trị bán hàng y tế cho bệnh viện, phòng khám: đơn hàng, hoàn tiền, danh mục sản phẩm & dịch vụ y tế, lịch dịch vụ, khuyến mãi, nội dung, khách hàng, báo cáo.",
              "en": "Healthcare e-commerce back-office for hospitals and clinics: orders, refunds, medical product & service catalogue, service schedules, promotions, content, customers, reports."},
     "dir": "medical/admin", "hub": "index.html", "heading": r"<h3[^>]*>", "zip": "medical/admin.zip", "accent": "#4C5FFF"},
    {"id": "store-front", "dom": "healthcare", "short": "Storefront", "name": "CareJourney Storefront",
     "seo": {"vi": "Website bán hàng y tế, đặt lịch dịch vụ bệnh viện", "en": "Healthcare e-commerce website & hospital service booking"},
     "desc": {"vi": "Website bán hàng y tế cho bệnh viện, phòng khám: sản phẩm và gói dịch vụ, đặt lịch, giỏ hàng theo kênh (online / tham quan bệnh viện / sự kiện), hội viên, điểm thưởng.",
              "en": "Healthcare e-commerce website for hospitals and clinics: products and service packages, booking, channel-aware cart (online / hospital tour / event), membership, loyalty points."},
     "dir": "medical/store-front", "hub": "index.html", "heading": r'<h2[^>]*>(?:<svg.*?</svg>)?', "zip": "medical/store-front.zip", "accent": "#019770", "mobile": True},
    {"id": "pos", "dom": "healthcare", "short": "POS", "name": "CareJourney POS",
     "seo": {"vi": "Phần mềm POS nhà thuốc, quầy thuốc bệnh viện", "en": "Pharmacy POS software for hospital pharmacies"},
     "desc": {"vi": "Phần mềm POS bán hàng tại quầy thuốc, nhà thuốc bệnh viện: bán hàng, ghi nhận đơn thuốc, tư vấn, can thiệp dược, chốt ca.",
              "en": "Pharmacy point-of-sale software for hospital pharmacies: sales, prescription recording, counselling, interventions, shift close."},
     "dir": "medical/pos", "hub": "index.html", "zip": "medical/pos.zip", "accent": "#F04438"},
    {"id": "kiosk", "dom": "healthcare", "short": "Kiosk", "name": "CareJourney Kiosk",
     "seo": {"vi": "Kiosk tự phục vụ bệnh viện, phòng khám: đặt lịch, đăng ký tại chỗ", "en": "Hospital & clinic self-service kiosk: on-site booking & sign-up"},
     "desc": {"vi": "Kiosk cảm ứng tự phục vụ cho bệnh viện, phòng khám tại sự kiện và sảnh tiếp đón: xem và đặt trước sản phẩm, combo, đặt lịch tham quan khoa sản, đăng ký gói thai sản, lớp học tiền sản – chăm sóc bé và hội viên, không cần tài khoản.",
              "en": "Touch-screen self-service kiosk for hospitals and clinics at events and in visitor areas: browse and reserve products and bundles, book maternity ward tours, sign up for maternity packages, birth & parenting classes and membership, no account needed."},
     "dir": "medical/kiosk", "hub": "index.html", "heading": r'<h2[^>]*>(?:<svg.*?</svg>)?', "zip": "medical/kiosk.zip", "accent": "#0E7490", "mobile": True},
    {"id": "fleet", "dom": "logistics", "short": "Fleet", "name": "Đội Xe Fleet Management",
     "seo": {"vi": "Phần mềm quản lý đội xe, điều phối vận tải và lãi/lỗ từng chuyến", "en": "Fleet management, trucking dispatch & profit-per-trip software"},
     "desc": {"vi": "Phần mềm quản lý đội xe cho doanh nghiệp vận tải hàng hoá: đơn vận chuyển, điều phối xe và tài xế, bản đồ giám sát, giờ lái, giấy tờ, bảo dưỡng, tạm ứng, quyết toán, lương chuyến, hoá đơn, công nợ, bảng giá cước, báo cáo lãi/lỗ và app tài xế.",
              "en": "Fleet management software for road freight companies: shipping orders, vehicle and driver dispatch, live map, driving hours, documents, maintenance, cash advances, settlement, trip pay, invoices, receivables, rate cards, P&L reports and a driver app."},
     "dir": "logistics/fleet", "hub": "index.html", "hub_js": True, "en": "en/", "zip": "logistics/fleet.zip", "accent": "#4F46E5"},
]
DOM = {d["slug"]: d for d in DOMAINS}

OTHER = {"vi": "Màn khác", "en": "Other screens"}
START = {"vi": "Bắt đầu", "en": "Start"}
SCREENS = {"vi": "Màn hình", "en": "Screens"}


def grouped():
    """Nhóm màn theo tên nhóm, giữ thứ tự xuất hiện đầu tiên (nhóm lặp lại thì gộp)."""
    groups = {}

    def put(name, screen):
        groups.setdefault(name["en"], {"name": name, "screens": []})["screens"].append(screen)
    return groups, put


def title_of(path: pathlib.Path) -> str:
    m = re.search(r"<title>(.*?)</title>", path.read_text(encoding="utf-8"), re.S)
    t = html.unescape(m.group(1)).strip() if m else path.parent.name
    return re.split(r"\s+[—–|·]\s+", t)[0].strip()


# Tên màn trùng nhau / không rõ nghĩa (lấy từ <title>) → đặt lại
TITLE_FIX = {("store-front", "screens/frontend/trang-chu/index.html"): {"vi": "Trang chủ", "en": "Home"}}


def static_screens(p):
    root = SC / p["dir"]
    seen = set()
    groups, put = grouped()

    def add(group, rel):
        rel = rel.split("#")[0].split("?")[0]
        f = root / rel
        if rel in seen or not f.is_file():
            return
        seen.add(rel)
        put(group, {"t": TITLE_FIX.get((p["id"], rel), title_of(f)), "u": rel})

    # Trang mục lục index.html (danh sách link vào mọi màn) KHÔNG đưa vào playground: màn đầu tiên phải là màn thật
    # của sản phẩm (dashboard, trang chủ, màn bán hàng…). Đánh dấu "đã thấy" để bước quét screens/ không thêm lại.
    seen.add("index.html")
    if p.get("hub"):
        src = (root / p["hub"]).read_text(encoding="utf-8")
        head_re = p.get("heading")
        group = START if head_re else SCREENS
        token = re.compile((rf"(?P<h>{head_re})(?P<ht>[^<]+)|" if head_re else "") + r'href="(?P<u>screens/[^"]+)"', re.S)
        for m in token.finditer(src):
            if m.groupdict().get("h"):
                name = html.unescape(m.group("ht")).strip()
                group = {"vi": name, "en": name}
            else:
                add(group, m.group("u"))
        for f in sorted((root / "screens").rglob("index.html")):  # màn không có trong mục lục
            add(OTHER, f.relative_to(root).as_posix())
    else:  # Channel Manager: mỗi màn là <màn>/<màn>.html
        for f in sorted(root.glob("*/*.html"), key=lambda f: (f.parent.name != "dashboard", f.parent.name)):  # dashboard lên đầu
            if f.parent.name != "assets":
                add(SCREENS, f.relative_to(root).as_posix())
    return list(groups.values())


def hub_array(path):
    """[(tên nhóm, [(mã, tên màn, file#hash), …]), …] từ mảng G trong trang mục lục (chuỗi JS nháy đơn)."""
    body = re.search(r"const G = \[(.*?)\n\];", path.read_text(encoding="utf-8"), re.S).group(1)
    s = r"'((?:[^'\\]|\\.)*)'"
    un = lambda x: re.sub(r"\\(.)", r"\1", x)
    return [(un(m.group(1)), [(c, un(t), f) for c, t, f in re.findall(rf"\['([A-Z]+_\d+)', {s}, '([^']+)'", m.group(2))])
            for m in re.finditer(rf"\['[\w-]+', {s}, \[(.*?)\]\]", body, re.S)]


def hub_js_screens(p):
    """Fleet: nhóm + màn theo đúng thứ tự mục lục; tên tiếng Anh lấy từ mục lục bản en/ (cùng cấu trúc)."""
    root = SC / p["dir"]
    vi, en = hub_array(root / p["hub"]), hub_array(root / p["en"] / p["hub"])
    groups, put = grouped()
    for (g_vi, items), (g_en, items_en) in zip(vi, en):
        for (_, t_vi, f), (_, t_en, _) in zip(items, items_en):
            put({"vi": g_vi, "en": g_en}, {"t": {"vi": t_vi, "en": t_en}, "u": "screens/" + f})
    return list(groups.values())


CRM_I18N = {lg: json.loads((SC / f"crm/app/i18n/{lg}.json").read_text()) for lg in ("vi", "en")}
CRM_KIND = {"list": ("Danh sách", "List"), "new": ("Tạo mới", "New"), "kanban": ("Kanban", "Kanban")}
CRM_FIXED = {"login": ("Đăng nhập", "Login"), "pick": ("Chọn pháp nhân", "Pick entity"), "approvals": "page.myjobs", "board": "page.work",
             "home": "page.home", "reports": "page.reports"}


def crm_title(url, ents):
    """Tên màn CRM (vi/en) từ route: module + kiểu màn, trang chức năng / cài đặt lấy tên trong i18n của app."""
    seg = url.strip("/").split("/")
    tr = lambda k: {lg: CRM_I18N[lg].get(k, k) for lg in ("vi", "en")}
    if seg[0] in ents:
        lab = ents[seg[0]]["label"]
        kind = CRM_KIND.get(seg[1], ("Chi tiết", "Detail")) if len(seg) > 1 else ("Danh sách", "List")
        return {"vi": f"{lab['vi']} · {kind[0]}", "en": f"{lab['en']} · {kind[1]}"}
    if seg[0] == "settings":
        return tr("page.s-" + seg[1])
    if seg[0] == "reports" and len(seg) > 1:
        r = tr("page.reports")
        return {"vi": r["vi"] + " · Dự báo doanh thu", "en": r["en"] + " · Revenue forecast"}
    f = CRM_FIXED[seg[0]]
    return tr(f) if isinstance(f, str) else {"vi": f[0], "en": f[1]}


def crm_screens(p):
    app = json.loads((SC / p["dir"] / "mock-api/meta/app.json").read_text())
    ents = app["entities"]
    fixed = {"login": "Access", "pick": "Access", "home": "Workspace", "approvals": "Workspace", "board": "Workspace",
             "reports": "Workspace", "settings": "Settings"}
    groups, put = grouped()
    for s in (x for x in SHOTS if x["product"] == "crm"):
        seg = s["url"].strip("/").split("/")[0]
        if seg in ents:
            lab = ents[seg]["label"]
            name = {"vi": lab.get("vi", seg), "en": lab.get("en", seg)}
        else:
            n = fixed.get(seg, "Other")
            name = {"vi": {"Access": "Đăng nhập", "Workspace": "Không gian làm việc", "Settings": "Cài đặt"}.get(n, n), "en": n}
        put(name, {"t": crm_title(s["url"], ents), "u": "?__p=" + s["url"]})
    return list(groups.values())


# Quy tắc: playground không có nhóm "luồng vào" (Entry Flow / Access / Start của trang mục lục) và không có màn đăng nhập
# ở BẤT KỲ nhóm nào (Login, Sign In, Owner / Guest Portal Login, Log In or Register…); màn có nội dung thật trong nhóm
# luồng vào (dashboard, trang chủ, giỏ hàng…) dời lên nhóm Tổng quan. Báo cáo kiểu "Owner Login Log" vẫn giữ.
ENTRY_GROUPS = {"Entry Flow", "Access", "Start"}
LOGIN = re.compile(r"\b(log ?in|sign ?in|login|đăng nhập)\b(?!\s*log\b)|^(pick entity|chọn pháp nhân)$", re.I)


def drop_entry(groups):
    title = lambda s: s["t"] if isinstance(s["t"], str) else s["t"]["en"]
    keep = [s for g in groups if g["name"]["en"] in ENTRY_GROUPS for s in g["screens"] if not LOGIN.search(title(s).strip())]
    out = [dict(g, screens=[s for s in g["screens"] if not LOGIN.search(title(s).strip())]) for g in groups if g["name"]["en"] not in ENTRY_GROUPS]
    if keep:
        if out and out[0]["name"]["en"] == "Overview":
            out[0]["screens"] += keep
        else:
            out.insert(0, {"name": {"vi": "Tổng quan", "en": "Overview"}, "screens": keep})
    return [g for g in out if g["screens"]]


data = []
for p in PRODUCTS:
    groups = drop_entry(crm_screens(p) if p["id"] == "crm" else hub_js_screens(p) if p.get("hub_js") else static_screens(p))
    item = {k: p[k] for k in ("id", "dom", "short", "name", "seo", "desc", "dir", "accent", "en", "mobile") if k in p}
    item["cover"] = f"assets/covers/{p['id']}.jpg"
    item["groups"] = groups
    data.append(item)
    print(f"{p['id']}: {sum(len(g['screens']) for g in groups)} màn, {len(groups)} nhóm")

out = SC / "playground-data.js"
out.write_text("/* Sinh bởi _tools/build_playground.py — không sửa tay. */\nconst SHOWCASE = "
               + json.dumps({"site": SITE, "assets": ASSETS, "projects": PROJECTS, "domains": DOMAINS, "products": data}, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
print("→", out.relative_to(SC.parent), f"{out.stat().st_size // 1024} KB")


# ---------------- trang Dự án: chip lọc lĩnh vực + khối nội dung SEO theo lĩnh vực (song ngữ, render sẵn) ----------------
# Dán vào screens/du-an/index.html giữa <!--pre:domains--> … <!--/pre:domains-->; screens/du-an/script.js lọc theo ?linh-vuc=.
e = lambda x: html.escape(str(x), quote=True)
en = lambda x: f' data-en="{e(x)}"'
# icon lĩnh vực: lấy đúng SVG trong assets/js/global.js (KTP.domainIcon) để bản render sẵn khớp bản JS
_ICONS = dict(re.findall(r"(\w+): '(<path[^']*)'", (SC.parent / "assets/js/global.js").read_text(encoding="utf-8")))
icon = lambda slug: ('<svg class="domain-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" '
                     f'stroke-linejoin="round" aria-hidden="true">{_ICONS[slug]}</svg>') if slug in _ICONS else ""
SKIP = {"Overview", "Tổng quan", "Start", "Bắt đầu", "Screens", "Màn hình", "Other screens", "Màn khác", "Entry Flow",
        "Access", "Đăng nhập", "Workspace", "Không gian làm việc", "Settings", "Cài đặt"}  # nhóm không phải phân hệ nghiệp vụ
mods = lambda p, lg: ", ".join(g["name"][lg] for g in p["groups"] if g["name"]["vi"] not in SKIP and g["name"]["en"] not in SKIP) or p["short"]


def domain_block(d):
    apps = [p for p in data if p["dom"] == d["slug"]]
    lis = "".join(
        f'<li><a href="playground/?app={p["id"]}"><b{en(p["seo"]["en"])}>{e(p["seo"]["vi"])}</b></a>'
        f'<span><span data-en="Modules:">Phân hệ:</span> <span{en(mods(p, "en"))}>{e(mods(p, "vi"))}</span></span></li>' for p in apps)
    kws = " ".join(f"<em>{e(k)}</em>" for k in d["keywords"])
    return (f'<section class="du-an-domain card" id="{d["slug"]}" data-linh-vuc="{d["slug"]}">'
            f'<h2><a href="?linh-vuc={d["slug"]}">{icon(d["slug"])}<span{en(d["h"]["en"])}>{e(d["h"]["vi"])}</span></a></h2>'
            f'<p class="body-lg"{en(d["intro"]["en"])}>{e(d["intro"]["vi"])}</p>'
            # phân hệ + từ khoá: vẫn nằm trong HTML (SEO) nhưng gói trong <details> — mobile đóng sẵn, desktop script.js mở sẵn
            f'<details class="du-an-domain__more"><summary><span data-en="Modules &amp; related solutions">Phân hệ &amp; giải pháp liên quan</span></summary>'
            f'<ul class="du-an-domain__apps">{lis}</ul>'
            f'<p class="du-an-domain__kw"><span data-en="Related solutions:">Giải pháp liên quan:</span> {kws}</p></details></section>')


chips = ('<a class="du-an-chip is-active" href="./" data-linh-vuc=""><span data-en="All">Tất cả</span></a>' + "".join(
    f'<a class="du-an-chip" href="?linh-vuc={d["slug"]}" data-linh-vuc="{d["slug"]}">{icon(d["slug"])}<span{en(d["name"]["en"])}>{e(d["name"]["vi"])}</span></a>'
    for d in DOMAINS))


def fill(text, name, content):
    a, b = f"<!--pre:{name}-->", f"<!--/pre:{name}-->"
    i, j = text.index(a) + len(a), text.index(b)
    return text[:i] + content + text[j:]


du_an = SC.parent / "screens/du-an/index.html"
t = du_an.read_text(encoding="utf-8")
t = fill(fill(t, "chips", chips), "domains", "".join(domain_block(d) for d in DOMAINS))
du_an.write_text(t, encoding="utf-8")
print("→ screens/du-an/index.html: chip lọc + khối lĩnh vực")

# ---------------- sitemap.xml: trang Dự án theo lĩnh vực + playground từng prototype ----------------
sm = SC.parent / "sitemap.xml"
lines = [l for l in sm.read_text(encoding="utf-8").splitlines() if "/showcase/" not in l and "/screens/du-an/?" not in l and "/playground/" not in l]
urls = [f"{PROJECTS}?linh-vuc={d['slug']}" for d in DOMAINS] + [f"{SITE}?app={p['id']}" for p in data]
end = lines.index("</urlset>")
lines[end:end] = [f"  <url><loc>{u}</loc></url>" for u in urls]
sm.write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"→ sitemap.xml: {len(urls)} URL lĩnh vực / playground")
