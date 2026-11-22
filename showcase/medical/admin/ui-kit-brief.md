# UI Kit Brief — CareJourney Admin Back Office

> Values below follow the shared CareJourney brand brief used by the Admin, Storefront and POS prototypes. This file records how the back office specifically applies them. Do not re-derive color/product-name/mood/language.

## v2 Retheme (CSS-only, applied — read before §5)
Reason: user feedback said the v1 build looked too dark for a bright healthcare-service brand and asked for a white background with blue/teal as accents only. `assets/css/global.css` was rethemed to the v2 CareJourney palette: `--primary:#4C5FFF`, `--primary-light:#9DA7FF`, `--primary-lightest:#EEF0FF`, `--primary-gradient-from:#6777FF`/`--primary-gradient-to:#3141C0`, `--secondary:#019770`, `--secondary-lightest:#EBF7F4`, `--tertiary:#3E413D` (now the heading/emphasized-text color, replacing v1's Primary-dark), `--tertiary-light:#696A74`, `--tertiary-lighter:#A2A3AC`, `--tertiary-lightest:#DCDCDC`, `--error:#B52836`. The v1 variable names (`--primary-dark`, `--primary-50`, `--primary-100`, `--accent`, `--accent-dark`, `--accent-bg`) were kept as aliases pointing at the new tokens so no HTML/JS had to change — only `global.css` values moved.

Biggest structural change: the sidebar background went from a solid dark Primary-gradient fill to **white** (`border-right: 1px solid var(--tertiary-lightest)`), including the collapsed icon-rail state. "Selected" now reads via `background: var(--primary-lightest)` + `box-shadow: inset 3px 0 0 var(--primary)` (left-border indicator) instead of dark-surface contrast — applied consistently to sidebar nav items, the settings side-nav, and filter chips. The brand-mark logo chip and the Dashboard's signature card keep a small Primary gradient (`--primary-gradient-from`→`--primary-gradient-to`) as the "compensate for feeling colorful" element. The Sign In split-panel changed from a full dark gradient fill to a `--primary-lightest` tint band with only small decorative gradient blobs + the brand-mark chip carrying real Primary color. All 42 screens' `screens/**/style.css` files were confirmed empty (styling is 100% centralized in `global.css`), so the retheme is complete across all 44 pages by construction — verified with a grep sweep for the old hex values (0 leftovers in CSS). Not touched: HTML structure, JS, or the 3 files with hardcoded old hex used for chart rendering (`screens/dashboard/script.js`, `screens/dashboard/index.html` SVG trendline, `screens/bao-cao/*/script.js`) — out of this CSS-only scope, flagged as a follow-up if exact chart-color parity is wanted.

## 1. Loại dự án & Loại phần mềm
- Loại dự án: **Hệ thống quản lý** (standard build — sign-in, dashboard, sidebar, no deviation).
- Loại phần mềm: **Nội bộ** (internal staff only — Super Admin, Admin/BU owners/Marketing, Tech Support, Finance, Operations, Vendor Partner).

## 2. Product name & logo
- Product name: **CareJourney** (never "Meridian Health" in the nav — the full legal company name is not used inside this internal tool at all, unlike the Storefront footer).
- Logo/brand-mark: "CJ" wordmark, small rounded square, small Primary gradient background (`--primary-gradient-from`→`--primary-gradient-to`, v2), white text, stylised leaf/heartbeat glyph — top of the sidebar brand block, the ONLY logo placement (no second logo in the content header).

## 3. Mood
**Modern** — 14-16px card radius, 9-10px input/button radius, pronounced shadows. v2: sidebar and sign-in split-panel are white/light-tint (not a dark gradient); the small Primary gradient is reserved for the brand-mark chip and the Dashboard signature card only.

## 4. Interface language
**English**, for all display text (labels, buttons, placeholders, toasts, mock data, table headers). Screen folder/file slugs stay in Vietnamese (internal slugs, not user-facing).

## 5. Color palette — v2 (locked; supersedes the v1 values this table originally shipped with, see "v2 Retheme" above)
| Token | Value | Usage |
|---|---|---|
| `--primary` | `#4C5FFF` | Links, primary actions (`btn-primary`), active sidebar/chip left-border indicator + text |
| `--primary-lightest` | `#EEF0FF` | Active/hover tint backgrounds, badge backgrounds, sign-in split-panel band |
| `--primary-gradient-from` / `-to` | `#6777FF` / `#3141C0` | Small decorative gradient only — brand-mark chip, Dashboard signature card, `btn-primary:hover` |
| `--secondary` | `#019770` | Secondary accent, success semantics, "online" purchase-source badge |
| `--secondary-lightest` | `#EBF7F4` | Secondary badge/tint backgrounds |
| `--tertiary` | `#3E413D` | Headings, emphasized text, KPI numbers (replaces v1's Primary-dark in this role) |
| `--tertiary-light` / `-lighter` / `-lightest` | `#696A74` / `#A2A3AC` / `#DCDCDC` | Sidebar default nav text, secondary text, borders/dividers (incl. sidebar's white-background border) |
| `--error` | `#B52836` | Serious clinical/hard-failure situations only |
| Neutral gray | 9-step `--gray-50`…`--gray-900` | Text/border/background (unchanged from v1) |
| Success / Warning / Info | `--success` now = `--secondary` green; Warning/Info unchanged | Order/refund/approval status only |

**Healthcare anti-pattern (locked):** Error/red reserved for genuinely serious clinical situations, never for routine form validation (Warning/amber used instead) — matters here specifically on Refund Queue and Activity Trail, where red must mean "rejected/failed", not "user typo".

## 6. Typography
- Heading: **Plus Jakarta Sans** (Google Fonts) — H1 30px/700, H2 22px/600, H3 18px/600.
- Body: **Inter** (Google Fonts) — Body 14px/400, Caption/label 12px/500, line-height 1.5, `tabular-nums` on all numeric table cells.

## 7. Icons
Outline style (Lucide/Feather), inline SVG, `stroke-width:1.75`, `currentColor`. Used on every nav item, primary action button, row action, KPI card, empty state, notification bell, avatar fallback.

## 8. Anti-patterns to avoid (industry-specific, locked)
1. No pastel "AI-gradient" purple-pink — gradients anchor strictly to Primary→Primary-dark.
2. Red reserved for genuinely serious/clinical or hard-failure situations (refund rejected, payment API failure) — not routine form validation.
3. No fake stock photography — flat icon/illustration placeholders only (sign-in screen, empty states).

## 9. Product archetype & navigation
- Archetype: **Nội bộ/Vận hành** (internal operations, ERP-like, multi-module).
- Navigation: **Vertical sidebar, collapsible (icon-rail when collapsed)** — accordion groups per the 7 menu groups below, flyout-on-hover when collapsed, tooltips on every collapsed nav item, floating toggle button pinned outside `<aside>`, state persisted via `localStorage` key `sidebar_collapsed`.
- **Data-grid override test:** does NOT apply — the back office has 7 distinct business-purpose modules (orders & fulfillment, campaigns & offers, catalog & sessions, site content, people & access, business insights, platform settings), each needing its own landing/CRUD/settings screens, not one central mega-table. So the standard sidebar stays.
- Content area: white/gray-50 surface, high data density (row padding at `--sp-2`/`--sp-3`), sticky table headers.

## 10. Reference products (layout anchor, not brand-copy)
- **Airtable** — toolbar pattern (search/filter/sort/group chips), dense table rows, collapsible sidebar.
- **Stripe Dashboard** — KPI card system, drill-down from dashboard to filtered reports, refund/payment status pipeline.
- **Notion** — sidebar accordion groups, icon-rail collapse behavior, settings side-nav pattern (General Settings, Tax Settings).

## 11. Support level
Internal staff, trained before use, IT-savvy-to-office-worker mix → concise labels, business terminology, minimal hand-holding tooltips (only on non-obvious rules, e.g. stacking discount conflicts, multi-level refund approval).

## 12. Target platform
**Desktop/nội bộ** (internal, desktop-optimized only — no responsive/PWA work needed).

## 13. Sign-in & landing
- **Sign In** — `screens/auth/dang-nhap/` — split-panel: left panel is a `--primary-lightest` tint band (v2 — was a dark Primary gradient in v1) with logo, tagline "Care for every stage of family life", 3 role-aware bullet highlights; white panel with email/password form, role shown as read-only context after typing a recognized email (demo only), `btn-primary` full-width "Sign In". Submits straight to the Dashboard.
- **Dashboard** — the real-time KPI dashboard, which is also the post-sign-in landing screen (not duplicated).

## 14. Menu structure — 7 groups (English labels)
The Dashboard sits outside all groups as the first sidebar item.

1. **Orders & Fulfillment** — All Orders, Order Overview, Assisted Order Entry, Refund Queue, Dispatch & Delivery, Receipt & Email Templates — Admin, Operations, Finance
2. **Campaigns & Offers** — Vouchers & Codes, Voucher Editor, Experience Targeting, Free Gift Offers, Add-on Deals, Reward Points Setup — Admin (Marketing)
3. **Catalog & Sessions** — Catalog Items, Catalog Item Editor, Variant Stock Levels, Timeslots & Rostering, Participant Check-in, Session Changes, Bundled Offers, Bundle Builder — Admin (BU owners)
4. **Site Content** — Web Pages, Page Composer, Promo Banners — Admin (Marketing)
5. **People & Access** — Customer Directory, Customer Profile, Segmentation, Staff Accounts, Access Role Editor — Admin, Super Admin
6. **Business Insights** — Revenue Summary, Customer Analytics, Campaign Performance, Referral Tracking, Refund Analysis, Gift Fulfillment, Conversion Funnel, Session Utilization, Acquisition Sources, Points Ledger — Admin, Finance, Super Admin (the Dashboard belongs here logically but is pinned outside the accordion per nav convention)
7. **Platform Settings** — General Settings, Activity Trail, Tax Settings — Super Admin, Tech Support

Sidebar footer: Sign Out → back to `screens/auth/dang-nhap/`.

## 15. Main workflows (interactivity scope)
- **Order flow (full interactivity):** All Orders → Order Overview → Refund Queue, following the refund request lifecycle (Khởi tạo → Chờ duyệt → Đã duyệt/Từ chối → Đã gửi API → Hoàn tất).
- **Catalog CRUD flow (full interactivity, representative of the standard CRUD pattern reused across the app):** Catalog Items → Catalog Item Editor.
- **Dashboard (full interactivity):** working period filters + drill-down links into Revenue Summary, Refund Analysis and Conversion Funnel.

**Full interactivity:** All Orders, Order Overview, Refund Queue, Catalog Items, Catalog Item Editor, Dashboard.
**Static UI + correct navigation only (still fully designed):** all remaining 36 screens plus the Sign In screen (submit navigates, no real auth check).

## 16. Form container choices (locked per entity, so the same entity always uses the same container)
- Assisted Order Entry: **Slide-over (Drawer)**.
- Voucher create/edit (Voucher Editor): **Slide-over (Drawer) with tabs** (General / Usage Rules / Target Segment) — upgraded from Pop-up Modal, see §16b.
- Catalog item create/edit (Catalog Item Editor): **Slide-over (Drawer, drawer-lg) with tabs** (Basic Info / Variants / Media / Pricing & Special Price / Service Rules) — needs to stay in context of the catalog list.
- Session reschedule/cancel (Session Changes): **Slide-over (Drawer)** — upgraded from Pop-up Modal, see §16b.
- Page Composer: **Slide-over (Drawer, drawer-lg)** — corrected from Dedicated Page, see §16b.
- Bundle create/edit (Bundle Builder): **Slide-over (Drawer) with tabs** (Components / Pricing / Media) — upgraded from Pop-up Modal, see §16b.
- Access Role Editor: **Slide-over (Drawer, drawer-lg)** — corrected from Dedicated Page, see §16b. The permission matrix only ever renders one role's row of 7 module selects at a time in the built UI, so it fits comfortably; the matrix table scrolls horizontally inside the panel.

## 16b. Drawer conversion pass (v3 — user directive: ≤20 real controls → Slide-over/Drawer, for Create/Edit/View screens, not just forms)

**Rule applied:** for every Create/Edit/View(-Detail) screen in the back office (never List/Dashboard/Report screens), count real `<input>`/`<select>`/`<textarea>`/toggle/dropzone/rich-text-editor controls in the actual built HTML (current mock-data render state, excluding `<label>`s and Save/Cancel/Close buttons). ≤20 → convert to a Slide-over (Drawer): `.drawer-overlay` > `aside.drawer` (reusing the `.drawer`/`.drawer-lg`/`.drawer-overlay` classes already defined in `global.css` since the original build — no new CSS was needed), embedded in the screen's parent list screen, opened via the "+ New" button and/or a row click. A shared `CJDrawer.open/close/bind` helper was added to `assets/js/global.js` (overlay-click-outside and `[data-drawer-close]` elements close the panel; Escape closes any open drawer).

| Screen | Type (before) | Real controls counted | Parent (drawer host) | Decision |
|---|---|---|---|---|
| Order Overview | Dedicated Page | 2 (status select, note input) | All Orders | **→ Drawer** |
| Assisted Order Entry | Dedicated Page (styled as tabs card) | 7 | All Orders | **→ Drawer** |
| Refund Queue | Màn hình quản lý (queue + inline detail split-panel) | n/a — this is a list/queue screen with its own master-detail layout, not a single-record Create/Edit/View | — | **Not a candidate** — left as-is |
| Receipt & Email Templates | Màn hình quản lý (list; editor was an unbuilt stub `href="#"`) | ~8 (name, applies-to type + value, content, 3 include-toggles, active toggle) | Self (list + editor on one screen) | **→ Drawer** (editor built out for the first time, embedded in the same screen) |
| Voucher Editor | Pop-up Modal w/ tabs | 13 | Vouchers & Codes | **→ Drawer** (upgraded from Modal) |
| Catalog Item Editor | Dedicated Page (documented as Slide-over in §16 but never actually built as one) | 19 (6 basic + 4 variant row + 1 media dropzone + 4 pricing + 4 rules, at current 1-variant mock state) | Catalog Items | **→ Drawer** (drawer-lg; corrects the doc/build mismatch) |
| Session Changes | Pop-up Modal | 5 | Timeslots & Rostering | **→ Drawer** (upgraded from Modal) |
| Page Composer | Dedicated Page | 8 (title, slug, content, status, publish date, no-index toggle, meta title, meta description) | Web Pages | **→ Drawer** (drawer-lg; corrects from Dedicated Page) |
| Customer Profile | Dedicated Page | 3 (phone, acquisition source, joined — the latter two read-only) | Customer Directory | **→ Drawer** |
| Access Role Editor | Dedicated Page | 9 (role name + based-on-role select + 7 module access-level selects, at current 1-row-rendered mock state) | Staff Accounts | **→ Drawer** (drawer-lg; corrects from Dedicated Page) |
| Bundle Builder | Pop-up Modal w/ tabs | 7 (name + variant qty inputs ×3 + sum-price + combo price + media dropzone) | Bundled Offers | **→ Drawer** (upgraded from Modal) |

No screen exceeded 20 in its actually-built state, so none stayed as a Dedicated Page/Modal from this evaluation pass — but Catalog Item Editor (19/20) and Access Role Editor (9/20, matrix renders one role-row at a time) were genuinely close calls worth flagging for future maintainers: if more variant rows or a full multi-role matrix view are ever added to the live build, re-count before assuming the Drawer still fits.

**Standalone-screen handling:** for every converted screen, the original standalone folder/file (`screens/<module>/<name>/index.html`) was kept for index completeness but turned into a **thin redirect wrapper** (the simpler, preferred option) — it reads any `?id=`/`?session=` query param and forwards (`location.replace`) to the parent list screen with an `?openId=`/`?openOrder=`/`?openReschedule=`/`?openRoles=` param that the parent's `script.js` reads on load to auto-open the drawer pre-populated with that record. This avoids maintaining the same form markup in two places. Receipt & Email Templates has no separate standalone editor file (list + editor always lived on one screen), so its drawer lives directly in `cau-hinh-email-hoa-don/index.html` with no wrapper needed.

**New data file:** `assets/data/email-templates.js` (`DATA_EMAIL_TEMPLATES`) was added to back the Receipt & Email Templates list/editor — the original build had this screen as fully static markup with no data layer.

## 17. Signature moment (mandatory, ONE only)
**Checkout Performance card on the Dashboard.** The Dashboard's hero KPI card spotlights the share of orders paid in a single guided checkout across all purchase sources: a large current value (e.g. **94%**) with a short label, a horizontal progress bar and a one-line caption. This is the one deliberately bold element on the Dashboard (small Primary gradient) — every other KPI card uses the standard stat-card treatment. Not repeated elsewhere in the app (one spotlight, not scattered).

As an ordinary (non-signature) but genuinely project-specific business rule, **All Orders** and **Order Overview** also visually distinguish **purchase source** (Event / Hospital Tour / Online / Retail) via a small colored source tag next to the order ID — this is real business logic (the cart is split by purchase source), not decoration, but is treated as standard badge UI, not the signature moment itself.

## 18. Role-based access note (static demo assumption)
The prototype does **not** enforce per-role screen hiding or a real sign-in-gated permission system across all 42 screens. Staff Accounts and the Access Role Editor show the **permission matrix concept** clearly (module × access-level grid: Full/High/Medium/Limited/None) as their own screen content. Every other screen assumes **the viewer is a Super Admin seeing everything** — the sidebar shows all 7 groups regardless of the role picked at sign-in.

## 19. Data-grid override
Not applicable — see §9. Standard sidebar nav used throughout.
