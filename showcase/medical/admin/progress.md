# Progress — Admin Back Office Prototype (42 screens + sign-in)

## Foundation
- [x] ui-kit-brief.md
- [x] assets/css/global.css
- [x] assets/js/global.js
- [x] assets/data/don-hang.js (Order)
- [x] assets/data/san-pham-dich-vu.js (Catalog item — product/service)
- [x] assets/data/khach-hang.js (Customer)
- [x] assets/data/lich-dat-dich-vu.js (Booking/Session)
- [x] assets/data/ma-giam-gia.js (Voucher / discount code)
- [x] assets/data/qua-tang-kem.js (Free gift offer)
- [x] assets/data/yeu-cau-hoan-tien.js (Refund request)
- [x] assets/data/thong-tin-lien-he-su-kien.js (Event lead)
- [x] assets/data/combo-bundle.js (Bundled offer)
- [x] assets/data/so-giao-dich-diem.js (Points ledger)
- [x] assets/data/nguoi-dung-quan-tri.js (Staff accounts — backs Staff Accounts / Access Role Editor)
- [x] assets/data/nhom-khach-hang.js (Customer segments — backs Segmentation)
- [x] assets/data/trang-noi-dung.js (Web pages — backs Web Pages / Page Composer)
- [x] assets/data/banner.js (Promo banners)
- [x] assets/data/nhat-ky-he-thong.js (Activity trail)

## Sign-in & dashboard
- [x] screens/auth/dang-nhap (Sign In — split panel, role-recognition demo)
- [x] screens/dashboard (Dashboard — real-time KPIs, full interactivity, signature card, drill-down)

## Orders & Fulfillment
- [x] don-hang/danh-sach-don-hang — All Orders (full interactivity; also hosts the Order Overview and Assisted Order Entry drawers)
- [x] don-hang/chi-tiet-don-hang — Order Overview (v3: Slide-over on All Orders; the standalone file is now a thin redirect wrapper — see ui-kit-brief.md §16b)
- [x] don-hang/tao-chinh-sua-don-hang-thu-cong — Assisted Order Entry (v3: Slide-over on All Orders; thin redirect wrapper)
- [x] don-hang/duyet-yeu-cau-hoan-tien — Refund Queue (full interactivity, multi-level approval workflow — evaluated for the drawer pass, not a candidate: it's a list/queue screen with its own inline split-panel detail, left unchanged)
- [x] don-hang/quan-ly-van-don-logistics — Dispatch & Delivery (static)
- [x] don-hang/cau-hinh-email-hoa-don — Receipt & Email Templates (v3: editor built out for the first time as an embedded Slide-over on this same screen, backed by new assets/data/email-templates.js — see §16b)

## Campaigns & Offers
- [x] marketing-khuyen-mai/danh-sach-ma-giam-gia — Vouchers & Codes (also hosts the Voucher Editor drawer)
- [x] marketing-khuyen-mai/tao-chinh-sua-ma-giam-gia — Voucher Editor (v3: upgraded from Pop-up Modal to Slide-over on Vouchers & Codes; thin redirect wrapper)
- [x] marketing-khuyen-mai/quan-ly-quy-tac-ca-nhan-hoa — Experience Targeting (static)
- [x] marketing-khuyen-mai/cau-hinh-qua-tang-kem — Free Gift Offers (static)
- [x] marketing-khuyen-mai/cau-hinh-mua-kem-uu-dai — Add-on Deals (static)
- [x] marketing-khuyen-mai/cau-hinh-quy-tac-tich-doi-diem — Reward Points Setup (static)

## Catalog & Sessions
- [x] san-pham-dich-vu/danh-sach-san-pham-dich-vu — Catalog Items (full interactivity; also hosts the Catalog Item Editor drawer)
- [x] san-pham-dich-vu/tao-chinh-sua-san-pham-dich-vu — Catalog Item Editor (v3: Slide-over (drawer-lg) on Catalog Items — corrects a doc/build mismatch: documented as Slide-over but first built as a Dedicated Page; thin redirect wrapper — see §16b)
- [x] san-pham-dich-vu/quan-ly-ton-kho-theo-bien-the — Variant Stock Levels (static)
- [x] san-pham-dich-vu/cau-hinh-lich-slot-phan-cong-nhan-su — Timeslots & Rostering (static, calendar pattern; also hosts the Session Changes drawer)
- [x] san-pham-dich-vu/danh-sach-nguoi-tham-gia-diem-danh — Participant Check-in (static)
- [x] san-pham-dich-vu/doi-lich-huy-buoi — Session Changes (v3: upgraded from Pop-up Modal to Slide-over on Timeslots & Rostering; thin redirect wrapper)
- [x] san-pham-dich-vu/quan-ly-combo-bundle — Bundled Offers (also hosts the Bundle Builder drawer)
- [x] san-pham-dich-vu/tao-chinh-sua-combo — Bundle Builder (v3: upgraded from Pop-up Modal to Slide-over on Bundled Offers; thin redirect wrapper)

## Site Content
- [x] noi-dung/danh-sach-trang-noi-dung — Web Pages (also hosts the Page Composer drawer)
- [x] noi-dung/soan-thao-trang-noi-dung — Page Composer (v3: Slide-over (drawer-lg) on Web Pages — corrected from Dedicated Page; thin redirect wrapper — see §16b)
- [x] noi-dung/quan-ly-banner — Promo Banners (static)

## People & Access
- [x] khach-hang/danh-sach-khach-hang — Customer Directory (also hosts the Customer Profile drawer)
- [x] khach-hang/chi-tiet-khach-hang — Customer Profile (v3: Slide-over on Customer Directory; thin redirect wrapper)
- [x] khach-hang/quan-ly-nhom-phan-khuc-khach-hang — Segmentation (static)
- [x] khach-hang/quan-ly-nguoi-dung-quan-tri-vai-tro — Staff Accounts (static; also hosts the Access Role Editor drawer)
- [x] khach-hang/tao-chinh-sua-vai-tro-quyen-han — Access Role Editor (v3: Slide-over (drawer-lg) on Staff Accounts — corrected from Dedicated Page; the permission matrix only ever renders one role's row of 7 selects in the built UI; thin redirect wrapper — see §16b)

## Business Insights
- [x] bao-cao/bao-cao-doanh-so — Revenue Summary (static)
- [x] bao-cao/bao-cao-khach-hang — Customer Analytics (static)
- [x] bao-cao/bao-cao-marketing-khuyen-mai — Campaign Performance (static)
- [x] bao-cao/bao-cao-gioi-thieu — Referral Tracking (static)
- [x] bao-cao/bao-cao-hoan-tien — Refund Analysis (static)
- [x] bao-cao/bao-cao-qua-tang-doi-qua — Gift Fulfillment (static)
- [x] bao-cao/bao-cao-hanh-trinh-khach-hang-chuyen-doi — Conversion Funnel (static)
- [x] bao-cao/bao-cao-dat-lich-tham-du — Session Utilization (static)
- [x] bao-cao/bao-cao-nguon-kenh — Acquisition Sources (static)
- [x] bao-cao/lich-su-giao-dich-diem-admin — Points Ledger (static)

## Platform Settings
- [x] he-thong/cau-hinh-he-thong-chung — General Settings (static, settings side-nav)
- [x] he-thong/tra-cuu-nhat-ky-he-thong — Activity Trail (static)
- [x] he-thong/cau-hinh-thue-gst — Tax Settings (static)

## Output
- [x] index.html (screen index, grouped by the 7 menu groups)

## QA
- [x] Track 1 aesthetic pass on Sign In + Dashboard — signature card present, color depth confirmed
- [x] Automated link-integrity scan across all 44 HTML files — 0 broken hrefs/asset srcs
- [x] Automated data-layer wiring scan — every screen's DATA_<ENTITY> usage matches its included assets/data/*.js
- [x] node --check syntax validation on all script.js/global.js — 0 errors
- [x] Track 2 spot-check (All Orders, Page Composer, Revenue Summary — 3 different modules) — button variety, KPI accent stripes, browser-chrome theming all confirmed present
- [x] Scanned for banned patterns (Lorem ipsum, "Item 1/2", fake versions, emoji-as-interface-icon) — none found

All 42 screens generated. Prototype complete.

## v3 — Drawer (Slide-over) conversion pass
User raised the default Slide-over threshold from ≤15 fields (forms only) to **≤20 real
controls, extended to Create/Edit/View-Detail screens generally** (not just data-entry forms).
Evaluated every Create/Edit/View screen in the back office (11 candidates: Order Overview,
Assisted Order Entry, Refund Queue, Receipt & Email Templates, Voucher Editor, Catalog Item Editor,
Session Changes, Page Composer, Customer Profile, Access Role Editor, Bundle Builder) by counting
actual controls in the built HTML. Refund Queue was ruled out (it's a list/queue screen with its
own inline detail panel, not a single-record Create/Edit/View). The other 10 all qualified (≤20)
and were converted to Slide-over drawers embedded in their parent list screens — full breakdown
and control counts in `ui-kit-brief.md` §16b. Added a shared `CJDrawer` open/close/bind helper to
`assets/js/global.js` (reused the `.drawer`/`.drawer-lg`/`.drawer-overlay` CSS already present in
`global.css` from the original build — no new CSS needed). Every converted screen's original
standalone route was kept as a thin redirect wrapper into its parent + an auto-open query param,
so index links and any bookmarks keep working. All localStorage-backed create/edit flows
(CJStore.setOverride/addExtra) and existing interactivity (validation, toasts, activity-trail copy)
were preserved as a presentation-layer change only. Added `assets/data/email-templates.js` to back
the newly-built Receipt & Email Templates editor (previously a static stub). Verified: `node --check`
on all 10 modified `script.js` files + `global.js` (0 errors), every `getElementById`/
`querySelector('#...')` target cross-checked against its HTML (0 missing), `<div>`/`<aside>` tag
balance checked on modified files (all balanced). Storefront and POS folders were not touched.

## 2026-11-22 — Regional data: Australia (Sydney)
- Mock data is set in Sydney, Australia: AUD amounts, +61 mobile numbers, Australian sample names and emails (customers, staff accounts, clinicians, event leads), "Privacy Act request" in the activity trail, vendor partner Doona AU, deliveries via Australia Post.
- GST 10% (Tax Settings). Every order's `gst`/`total` in `assets/data/don-hang.js` follows 10% of (subtotal − discount); the two full refunds in `yeu-cau-hoan-tien.js` (RFD-3301, RFD-3302) equal their order totals. Prices, thresholds, points and the dashboard/report KPI figures are unchanged.
