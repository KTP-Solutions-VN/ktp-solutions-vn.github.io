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

## Screens (entry screens first)
- [x] frontend/trang-chu (Home — public entry point)
- [x] khach-hang/tai-khoan-cua-toi (Account Overview — dashboard analog) — QA Track 1 pass ok
- [x] san-pham-dich-vu/danh-sach-san-pham-dich-vu (Browse the Catalog)
- [x] san-pham-dich-vu/chi-tiet-san-pham-dich-vu (Item Details)
- [x] san-pham-dich-vu/chon-lich-slot-dich-vu (Select a Time Slot)
- [x] gio-hang/gio-hang (Shopping Cart — signature moment: cart grouped by channel)
- [x] gio-hang/thanh-toan (Details & Payment — guided checkout)
- [x] don-hang/xac-nhan-don-hang (Purchase Complete)
- [x] khach-hang/dang-nhap-dang-ky (Sign In or Create Account)
- [x] noi-dung/trang-noi-dung (Info Article)
- [x] khach-hang/dang-ky-thanh-vien-fbp-nbp (FBP/NBP Enrollment)
- [x] don-hang/lich-su-don-hang (My Orders)
- [x] don-hang/theo-doi-trang-thai-don-hang (Order Status)
- [x] khach-hang/chinh-sua-thong-tin-ca-nhan (Update Profile — popup modal)
- [x] khach-hang/quan-ly-tuy-chon-lien-lac (Communication Settings — popup modal)
- [x] khach-hang/yeu-cau-xoa-tai-khoan-du-lieu (Account Closure Request — popup modal)
- [x] diem-thuong/so-du-lich-su-diem (Rewards Wallet — points balance & history)

## Root
- [x] index.html (screen index linking all 17 screens, grouped by user-facing section)

## QA (done)
- Track 1 (aesthetic): passed on the entry screens (Home, Account Overview) and spot-checked on Shopping Cart / Details & Payment (signature moment).
- Track 2 (countable): verified — button variety per screen, stat-card accent colors, no hover-only critical actions, no banned "AI-slop" patterns, browser-chrome theming in global.css, no broken internal links (scripted check passed), all data reads go through assets/data/*.js.

## STATUS: COMPLETE — all 17 screens + data layer + root index.html done.

## Notes
- Full interactivity screens: Browse the Catalog, Item Details, Select a Time Slot, Shopping Cart, Details & Payment, Purchase Complete, Account Overview, My Orders, Order Status
- Static UI + nav only: Sign In or Create Account, Info Article, FBP/NBP Enrollment, Update Profile, Communication Settings, Account Closure Request, Rewards Wallet (still read from the data layer, no localStorage writes)
- Signature moment: cart grouped by channel — primarily on Shopping Cart, referenced via a small channel badge on Details & Payment / Purchase Complete / My Orders / Order Status

## 2026-09-17 — Home enrichment: rich landing page + category carousels
Rebuilt Home from a bare entry screen into a full marketing/shop landing page, modeled on a typical hospital-group website structure (hero, life-stage journey band, stat band, pill gallery, closing CTA), while keeping the locked v2 white-bg palette (tint bands instead of solid Primary blocks).
- New sections (top to bottom): Hero (stock photo) → Shop-by-category tiles → Carousel: Maternity Packages & Room Booking → Promo banner (FBP/NBP membership) → Carousel: Hospital Tours & Courses → Journey band (Event/Hospital Tour/Online/Retail entry-point tabs) → Carousel: Meridian Nutri Confinement Food → Stats band (30+ years / 33 catalog items / 4 ways to shop) → Carousel: Wellness & Retail → Promo banner (CareJourney Points) → Pill gallery "Explore our specialties" (maternity/fertility/MRI/ortho stock imagery) → Closing CTA band → Footer.
- New e-commerce pattern: category best-seller carousels (`overflow-x:auto` + `scroll-snap-type:x mandatory` + JS `scrollBy()` arrows, left arrow fades in once scrolled, right arrow hides at end) — ~4.8 cards visible in a 1200px container with a peeking partial card, touch-swipe works on mobile. Each card has a quick "Add to Cart" button (Home-only `carouselCardHTML()` in `trang-chu/script.js`, does not touch the shared `CJ.productCardHTML` used by Browse the Catalog / Item Details) that mirrors Item Details' add-to-cart field shape (`purchaseSource:'online'`) so items land correctly in the channel-grouped cart.
- Data layer: `assets/data/san-pham-dich-vu.js` expanded from 9 to 33 products — added `image`/`imageAlt` fields (schema doc updated) and 24 new products (6 each) across Maternity Packages, Hospital Tours, Confinement Nutrition and Pharmacy & Wellness, reaching 7 published items per category; also added `image`/`imageAlt` to the 4 pre-existing items in those categories. All 28 product images + 5 hero/gallery images (stock-photo CDN) HTTP-200-checked at build time.
- Browse the Catalog already read `?category=` on load and pre-applied the filter — no changes needed there; verified the Home carousels' "View All →" links and category-tile hrefs decode to exact matches via `URLSearchParams` (incl. `Pharmacy & Wellness`'s `&`).
- Home moves from "static UI + nav only" to genuinely interactive: carousel arrows/scroll, quick add-to-cart, journey tabs, reveal-on-scroll (`IntersectionObserver`, `prefers-reduced-motion`-guarded), and a one-time stat count-up — still no conversion-form workflow, so it stays outside the "full interactivity" list in `ui-kit-brief.md` §15, but is no longer purely static.
- Kept the existing "CJ" CareJourney brand-mark per `ui-kit-brief.md` §2 (no parent-company logo is used).

## 2026-11-22 — Regional data: Australia (Sydney)
- A$ amounts (`en-AU`), Sydney delivery addresses (Randwick NSW 2031, Westmead NSW 2145, Bondi Junction NSW 2022), +61 mobile numbers, Australian sample names (demo customer: Charlotte Nguyen), "Meridian Health Pty Ltd" / "Meridian Health Australia" in footers, order timestamps with Australia/Sydney offsets.
- GST 10% in the cart and at checkout; `gstRate`/`gstAmount`/`total` of every DATA_DON_HANG order follow that rate.
- Payment methods: Credit / Debit Card, PayID (Osko), Afterpay. FBP/NBP enrollment asks for the last 4 digits of the Medicare card number; account closure cites the Privacy Act 1988 (Australian Privacy Principles).
