# Progress — Storefront Prototype (17 screens)

## Foundation
- [x] ui-kit-brief.md
- [x] assets/css/global.css
- [x] assets/js/global.js
- [x] assets/data/san-pham-dich-vu.js
- [x] assets/data/don-hang.js
- [x] assets/data/khach-hang.js
- [x] assets/data/ma-giam-gia.js
- [x] assets/data/lich-dat-dich-vu.js
- [x] assets/data/so-giao-dich-diem.js

## Screens (entry-flow first, per SKILL.md step 8)
- [x] frontend/trang-chu (#1 Home — entry point)
- [x] khach-hang/tai-khoan-cua-toi (#11 My Account — dashboard analog) — QA Track 1 pass ok
- [x] san-pham-dich-vu/danh-sach-san-pham-dich-vu (#3 Product Listing)
- [x] san-pham-dich-vu/chi-tiet-san-pham-dich-vu (#4 Product Detail)
- [x] san-pham-dich-vu/chon-lich-slot-dich-vu (#5 Choose Slot/Booking)
- [x] gio-hang/gio-hang (#6 Cart — signature moment "Channel-Aware Cart")
- [x] gio-hang/thanh-toan (#7 Guided Checkout)
- [x] don-hang/xac-nhan-don-hang (#8 Order Confirmation)
- [x] khach-hang/dang-nhap-dang-ky (#2 Login/Register)
- [x] noi-dung/trang-noi-dung (#9 Content Page)
- [x] khach-hang/dang-ky-thanh-vien-fbp-nbp (#10 FBP/NBP Membership Signup)
- [x] don-hang/lich-su-don-hang (#12 Order History)
- [x] don-hang/theo-doi-trang-thai-don-hang (#13 Order Tracking)
- [x] khach-hang/chinh-sua-thong-tin-ca-nhan (#14 Edit Personal Info — popup modal)
- [x] khach-hang/quan-ly-tuy-chon-lien-lac (#15 Contact Preferences — popup modal)
- [x] khach-hang/yeu-cau-xoa-tai-khoan-du-lieu (#16 Delete Account Request — popup modal)
- [x] diem-thuong/so-du-lich-su-diem (#68 Loyalty Points Balance & History)

## Root
- [x] index.html (entry point linking all 17 screens, grouped by user-facing section)

## QA (done)
- Track 1 (aesthetic): passed on entry-flow screens (#1 Home, #11 My Account) and spot-checked on #6/#7 (signature moment).
- Track 2 (countable): verified — button variety per screen, stat-card accent colors, no hover-only critical actions, no banned "AI-slop" patterns, browser-chrome theming in global.css, no broken internal links (scripted check passed), all data reads go through assets/data/*.js.

## STATUS: COMPLETE — all 17 screens + data layer + root index.html done.

## Notes
- Full interactivity screens (confirmed workflows): #3,#4,#5,#6,#7,#8,#11,#12,#13
- Static UI + nav only: #2,#9,#10,#14,#15,#16,#68 (still read from data layer, no localStorage writes)
- Signature moment: "Channel-Aware Cart" — primarily on #6, referenced via small channel badge on #7/#8/#12/#13

## 2026-09-17 — Home (#1) enrichment: rich landing page + category carousels
Rebuilt Home from a bare entry-flow screen into a full marketing/shop landing page, modeled on meridian-health.example's real layout structure (hero, life-stage journey band, stat band, pill gallery, closing CTA), while keeping the locked v2 white-bg palette (tint bands instead of solid Primary blocks).
- New sections (top to bottom): Hero (real Meridian Medical Centre photo) → Shop-by-category tiles → Carousel: Maternity Packages & Room Booking → Promo banner (FBP/NBP Membership) → Carousel: Hospital Tours & Courses → Journey band (Event/Hospital Tour/Online/Retail entry-point tabs) → Carousel: Meridian Nutri Confinement Food → Stats band (30+ years / 33 catalog items / 4 entry points-1 cart) → Carousel: Wellness & Retail → Promo banner (Loyalty Points) → Pill gallery "Explore our specialties" (real Meridian Maternity/Fertility/MRI/Ortho imagery) → Closing CTA band → Footer.
- New e-commerce pattern: category best-seller carousels (`overflow-x:auto` + `scroll-snap-type:x mandatory` + JS `scrollBy()` arrows, left arrow fades in once scrolled, right arrow hides at end) — ~4.8 cards visible in a 1200px container with a peeking partial card, touch-swipe works on mobile. Each card has a quick "Add to Cart" button (Home-only `carouselCardHTML()` in `trang-chu/script.js`, does not touch the shared `CJ.productCardHTML` used by #3/#4) that mirrors Product Detail's add-to-cart field shape (`purchaseSource:'online'`) so items land correctly in the Channel-Aware Cart.
- Data layer: `assets/data/san-pham-dich-vu.js` expanded from 9 to 33 products — added `image`/`imageAlt` fields (schema doc updated) and 24 new products (6 each) across Maternity Packages, Hospital Tours, Confinement Nutrition and Pharmacy & Wellness, reaching 7 published items per category; also added `image`/`imageAlt` to the 4 pre-existing items in those categories. All 28 product images + 5 real Meridian Health corporate images (hero + 4 pill-gallery photos, verified live on the stock-photo CDN) HTTP-200-checked at build time.
- Product Listing (#3) already read `?category=` on load and pre-applied the filter — no changes needed there; verified the Home carousels' "View All →" links and category-tile hrefs decode to exact matches via `URLSearchParams` (incl. `Pharmacy & Wellness`'s `&`).
- Home moves from "static UI + nav only" to genuinely interactive: carousel arrows/scroll, quick add-to-cart, journey tabs, reveal-on-scroll (`IntersectionObserver`, `prefers-reduced-motion`-guarded), and a one-time stat count-up — still no confirmed conversion-form workflow, so it stays outside the "full interactivity" workflow list in `ui-kit-brief.md` §15, but is no longer purely static.
- Real Meridian Health parent-company logo SVG was intentionally NOT used — kept the existing "CJ" CareJourney brand-mark per `ui-kit-brief.md` §2 instead, per the task's own "your call" guidance.
