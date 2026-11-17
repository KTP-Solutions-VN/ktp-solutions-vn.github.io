# Progress — Admin Portal Prototype (42 screens + entry flow)

## Foundation
- [x] ui-kit-brief.md
- [x] assets/css/global.css
- [x] assets/js/global.js
- [x] assets/data/don-hang.js (Order)
- [x] assets/data/san-pham-dich-vu.js (Product/Service)
- [x] assets/data/khach-hang.js (Customer)
- [x] assets/data/lich-dat-dich-vu.js (Booking/Session)
- [x] assets/data/ma-giam-gia.js (Discount/Promotion)
- [x] assets/data/qua-tang-kem.js (Gift with Purchase)
- [x] assets/data/yeu-cau-hoan-tien.js (Refund Request)
- [x] assets/data/thong-tin-lien-he-su-kien.js (Event Lead)
- [x] assets/data/combo-bundle.js (Combo/Bundle Product)
- [x] assets/data/so-giao-dich-diem.js (Loyalty Point Ledger)
- [x] assets/data/nguoi-dung-quan-tri.js (Admin Users, supporting #37/#38)
- [x] assets/data/nhom-khach-hang.js (Customer Segments, supporting #36)
- [x] assets/data/trang-noi-dung.js (Content Pages, supporting #31/#32)
- [x] assets/data/banner.js (Banners, supporting #33)
- [x] assets/data/nhat-ky-he-thong.js (Audit Log, supporting #53)

## Entry flow
- [x] screens/auth/dang-nhap (Login — split panel, role-recognition demo)
- [x] screens/dashboard (#42 Dashboard KPI — full interactivity, signature moment, drill-down)

## Nhóm 2.1 — Order Management
- [x] #17 danh-sach-don-hang (full interactivity; now also hosts #18 + #19 as embedded drawers)
- [x] #18 chi-tiet-don-hang (v3: converted to a Slide-over on #17, standalone file is now a thin redirect wrapper — see ui-kit-brief.md §16b)
- [x] #19 tao-chinh-sua-don-hang-thu-cong (v3: converted to a Slide-over on #17, standalone file is now a thin redirect wrapper)
- [x] #20 duyet-yeu-cau-hoan-tien (full interactivity, approval workflow pattern — evaluated for the drawer pass, not a candidate: it's a List/queue screen with its own inline split-panel detail, left unchanged)
- [x] #21 quan-ly-van-don-logistics (static)
- [x] #22 cau-hinh-email-hoa-don (v3: editor built out for the first time as an embedded Slide-over on this same screen, backed by new assets/data/email-templates.js — see ui-kit-brief.md §16b)

## Nhóm 2.2 — Marketing & Promotions
- [x] #23 danh-sach-ma-giam-gia (now also hosts #24 as an embedded drawer)
- [x] #24 tao-chinh-sua-ma-giam-gia (v3: upgraded from Pop-up Modal to Slide-over on #23, standalone file is now a thin redirect wrapper)
- [x] #39 quan-ly-quy-tac-ca-nhan-hoa (static)
- [x] #40 cau-hinh-qua-tang-kem (static)
- [x] #41 cau-hinh-mua-kem-uu-dai (static)
- [x] #66 cau-hinh-quy-tac-tich-doi-diem (static)

## Nhóm 2.3 — Product & Service Data
- [x] #25 danh-sach-san-pham-dich-vu (full interactivity; now also hosts #26 as an embedded drawer)
- [x] #26 tao-chinh-sua-san-pham-dich-vu (v3: converted to a Slide-over (drawer-lg) on #25 — corrects the doc/build mismatch, was documented as Slide-over but built as a Dedicated Page; standalone file is now a thin redirect wrapper — see ui-kit-brief.md §16b)
- [x] #27 quan-ly-ton-kho-theo-bien-the (static)
- [x] #28 cau-hinh-lich-slot-phan-cong-nhan-su (static, calendar pattern; now also hosts #30 as an embedded drawer)
- [x] #29 danh-sach-nguoi-tham-gia-diem-danh (static)
- [x] #30 doi-lich-huy-buoi (v3: upgraded from Pop-up Modal to Slide-over on #28, standalone file is now a thin redirect wrapper)
- [x] #64 quan-ly-combo-bundle (now also hosts #65 as an embedded drawer)
- [x] #65 tao-chinh-sua-combo (v3: upgraded from Pop-up Modal to Slide-over on #64, standalone file is now a thin redirect wrapper)

## Nhóm 2.4 — Content (CMS)
- [x] #31 danh-sach-trang-noi-dung (now also hosts #32 as an embedded drawer)
- [x] #32 soan-thao-trang-noi-dung (v3: converted to a Slide-over (drawer-lg) on #31 — corrects from Dedicated Page, standalone file is now a thin redirect wrapper — see ui-kit-brief.md §16b)
- [x] #33 quan-ly-banner (static)

## Nhóm 2.5 — Customers & Users
- [x] #34 danh-sach-khach-hang (now also hosts #35 as an embedded drawer)
- [x] #35 chi-tiet-khach-hang (v3: converted to a Slide-over on #34, standalone file is now a thin redirect wrapper)
- [x] #36 quan-ly-nhom-phan-khuc-khach-hang (static)
- [x] #37 quan-ly-nguoi-dung-quan-tri-vai-tro (static; now also hosts #38 as an embedded drawer)
- [x] #38 tao-chinh-sua-vai-tro-quyen-han (v3: converted to a Slide-over (drawer-lg) on #37 — corrects from Dedicated Page (the permission matrix only ever renders one role's row of 7 selects in the built UI); standalone file is now a thin redirect wrapper — see ui-kit-brief.md §16b)

## Nhóm 2.6 — Reports & Analytics
- [x] #43 bao-cao-doanh-so (static)
- [x] #44 bao-cao-khach-hang (static)
- [x] #45 bao-cao-marketing-khuyen-mai (static)
- [x] #46 bao-cao-gioi-thieu (static)
- [x] #47 bao-cao-hoan-tien (static)
- [x] #48 bao-cao-qua-tang-doi-qua (static)
- [x] #49 bao-cao-hanh-trinh-khach-hang-chuyen-doi (static)
- [x] #50 bao-cao-dat-lich-tham-du (static)
- [x] #51 bao-cao-nguon-kenh (static)
- [x] #67 lich-su-giao-dich-diem-admin (static)

## Nhóm 2.7 — System Administration
- [x] #52 cau-hinh-he-thong-chung (static, settings side-nav)
- [x] #53 tra-cuu-nhat-ky-he-thong (static)
- [x] #69 cau-hinh-thue-gst (static)

## Output
- [x] index.html (root, grouped by 7 menu groups)

## QA
- [x] Track 1 aesthetic pass on Login + Dashboard (entry flow) — signature moment present, color depth confirmed
- [x] Automated link-integrity scan across all 44 HTML files — 0 broken hrefs/asset srcs
- [x] Automated data-layer wiring scan — every screen's DATA_<ENTITY> usage matches its included assets/data/*.js
- [x] node --check syntax validation on all script.js/global.js — 0 errors
- [x] Track 2 spot-check (Order List, Content Editor, Sales Report — 3 different modules) — button variety, KPI accent stripes, browser-chrome theming all confirmed present
- [x] Scanned for banned patterns (Lorem ipsum, "Item 1/2", fake versions, emoji-as-interface-icon) — none found

All 42 assigned screens (#17–53, #64–67, #69) generated. Prototype complete.

## v3 — Drawer (Slide-over) conversion pass
User raised the skill's default Slide-over threshold from ≤15 fields (forms only) to **≤20 real
controls, extended to Create/Edit/View-Detail screens generally** (not just data-entry forms).
Evaluated every Create/Edit/View screen in the Admin Portal (11 candidates: #18, #19, #20, #22,
#24, #26, #30, #32, #35, #38, #65) by counting actual controls in the built HTML. #20 was ruled
out (it's a List/queue screen with its own inline detail panel, not a single-record
Create/Edit/View). The other 10 all qualified (≤20) and were converted to Slide-over drawers
embedded in their parent List screens — full breakdown and control counts in
`ui-kit-brief.md` §16b. Added a shared `CJDrawer` open/close/bind helper to
`assets/js/global.js` (reused the `.drawer`/`.drawer-lg`/`.drawer-overlay` CSS already present
in `global.css` from the original build — no new CSS needed). Every converted screen's original
standalone route was kept as a thin redirect wrapper into its parent + an auto-open query param,
per the task's "simpler, preferred" option, so sitemap links and any bookmarks keep working.
All localStorage-backed create/edit flows (CJStore.setOverride/addExtra) and existing
interactivity (validation, toasts, audit-log copy) were preserved as a presentation-layer change
only. Added `assets/data/email-templates.js` to back #22's newly-built editor (previously a
static stub). Verified: `node --check` on all 10 modified `script.js` files + `global.js` (0
errors), every `getElementById`/`querySelector('#...')` target cross-checked against its HTML
(0 missing), `<div>`/`<aside>` tag balance checked on modified files (all balanced). Storefront,
POS, and Kiosk folders were not touched.
