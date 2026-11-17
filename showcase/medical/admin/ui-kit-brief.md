# UI Kit Brief — CareJourney Admin Portal (Project Aurora)

> Values below are LOCKED from `../shared-brand-brief.md` (shared across all 4 prototypes). This file records how the Admin Portal specifically applies them. Do not re-derive color/product-name/mood/language.

## v2 Retheme (CSS-only, applied — read before §5)
Reason: user feedback said the v1 build looked too dark for a bright healthcare-service brand and asked to match the client brand-guideline colors (white background, blue/teal as accents only). `assets/css/global.css` was rethemed to the real brand tokens from `../shared-brand-brief.md` v2: `--primary:#4C5FFF`, `--primary-light:#9DA7FF`, `--primary-lightest:#EEF0FF`, `--primary-gradient-from:#6777FF`/`--primary-gradient-to:#3141C0`, `--secondary:#019770`, `--secondary-lightest:#EBF7F4`, `--tertiary:#3E413D` (now the heading/emphasized-text color, replacing v1's Primary-dark), `--tertiary-light:#696A74`, `--tertiary-lighter:#A2A3AC`, `--tertiary-lightest:#DCDCDC`, `--error:#B52836`. The v1 variable names (`--primary-dark`, `--primary-50`, `--primary-100`, `--accent`, `--accent-dark`, `--accent-bg`) were kept as aliases pointing at the new tokens so no HTML/JS had to change — only `global.css` values moved.

Biggest structural change: the sidebar background went from a solid dark Primary-gradient fill to **white** (`border-right: 1px solid var(--tertiary-lightest)`), including the collapsed icon-rail state. "Selected" now reads via `background: var(--primary-lightest)` + `box-shadow: inset 3px 0 0 var(--primary)` (left-border indicator) instead of dark-surface contrast — applied consistently to sidebar nav items, the settings side-nav, and filter chips. The brand-mark logo chip and the Dashboard's "1.2 forms/transaction, was 5.0" signature card keep a small Primary gradient (`--primary-gradient-from`→`--primary-gradient-to`) as the "compensate for feeling colorful" element per the brief. The Login split-panel changed from a full dark gradient fill to a `--primary-lightest` tint band with only small decorative gradient blobs + the brand-mark chip carrying real Primary color. All 42 screens' `screens/**/style.css` files were confirmed empty (styling is 100% centralized in `global.css`), so the retheme is complete across all 44 pages by construction — verified with a grep sweep for the old hex values (0 leftovers in CSS). Not touched: HTML structure, JS, or the 3 files with hardcoded old hex used for chart rendering (`screens/dashboard/script.js`, `screens/dashboard/index.html` SVG trendline, `screens/bao-cao/*/script.js`) — out of this task's explicit CSS-only scope, flagged as a follow-up if exact chart-color parity is wanted.

## 1. Loại dự án & Loại phần mềm
- Loại dự án: **Hệ thống quản lý** (standard build — login, dashboard, sidebar, no deviation).
- Loại phần mềm: **Nội bộ** (internal staff only — Super Admin, Admin/BU owners/Marketing, Tech Support, Finance, Operations, Vendor Partner).

## 2. Product name & logo
- Product name: **CareJourney** (never "Meridian Health" in the nav — full legal company name is not used inside this internal tool at all, unlike Storefront's footer).
- Logo/brand-mark: "CJ" wordmark, small rounded square, small Primary gradient background (`--primary-gradient-from`→`--primary-gradient-to`, v2), white text, stylised leaf/heartbeat glyph — top of the sidebar brand block, the ONLY logo placement (no second logo in the content header, per archetype rule).

## 3. Mood
**Modern** — 14-16px card radius, 9-10px input/button radius, pronounced shadows. v2: sidebar/login split-panel are white/light-tint (not a dark gradient); the small Primary gradient is reserved for the brand-mark chip and the Dashboard signature card only.

## 4. Interface language
**English**, for all display text (labels, buttons, placeholders, toasts, mock data, table headers). Screen folder/file slugs stay in the original Vietnamese from `screen-specifications.md`/`scope-and-sitemap.md` (internal slugs, not user-facing).

## 5. Color palette — v2 (locked — matches shared-brand-brief v2 exactly; supersedes the v1 values this table originally shipped with, see "v2 Retheme" note above)
| Token | Value | Usage |
|---|---|---|
| `--primary` | `#4C5FFF` | Links, primary actions (`btn-primary`), active sidebar/chip left-border indicator + text |
| `--primary-lightest` | `#EEF0FF` | Active/hover tint backgrounds, badge backgrounds, login split-panel band |
| `--primary-gradient-from` / `-to` | `#6777FF` / `#3141C0` | Small decorative gradient only — brand-mark chip, Dashboard signature card, `btn-primary:hover` |
| `--secondary` | `#019770` | Secondary accent, success semantics, "online" purchase-source badge |
| `--secondary-lightest` | `#EBF7F4` | Secondary badge/tint backgrounds |
| `--tertiary` | `#3E413D` | Headings, emphasized text, KPI numbers (replaces v1's Primary-dark in this role) |
| `--tertiary-light` / `-lighter` / `-lightest` | `#696A74` / `#A2A3AC` / `#DCDCDC` | Sidebar default nav text, secondary text, borders/dividers (incl. sidebar's white-background border) |
| `--error` | `#B52836` | Serious clinical/hard-failure situations only |
| Neutral gray | 9-step `--gray-50`…`--gray-900` | Text/border/background (unchanged from v1) |
| Success / Warning / Info | `--success` now = `--secondary` green; Warning/Info unchanged | Order/refund/approval status only |

**Healthcare anti-pattern (locked):** Error/red reserved for genuinely serious clinical situations, never for routine form validation (Warning/amber used instead) — matters here specifically on #20 Refund Approval and #53 Audit Log, where red must mean "rejected/failed", not "user typo".

## 6. Typography
- Heading: **Plus Jakarta Sans** (Google Fonts) — H1 30px/700, H2 22px/600, H3 18px/600.
- Body: **Inter** (Google Fonts) — Body 14px/400, Caption/label 12px/500, line-height 1.5, `tabular-nums` on all numeric table cells.

## 7. Icons
Outline style (Lucide/Feather), inline SVG, `stroke-width:1.75`, `currentColor`. Used on every nav item, primary action button, row action, KPI card, empty state, notification bell, avatar fallback.

## 8. Anti-patterns to avoid (industry-specific, locked)
1. No pastel "AI-gradient" purple-pink — gradients anchor strictly to Primary→Primary-dark.
2. Red reserved for genuinely serious/clinical or hard-failure situations (refund rejected, payment API failure) — not routine form validation.
3. No fake stock photography — flat icon/illustration placeholders only (login screen, empty states).

## 9. Product archetype & navigation
- Archetype: **Nội bộ/Vận hành** (internal operations, ERP-like, multi-module).
- Navigation: **Vertical sidebar, collapsible (icon-rail when collapsed)**, per `screen-generation-guide.md` — accordion groups per the 7 menu groups below, flyout-on-hover when collapsed, tooltips on every collapsed nav item, floating toggle button pinned outside `<aside>`, state persisted via `localStorage` key `sidebar_collapsed`.
- **Data-grid override test (per `ui-kit-qna.md`):** does NOT apply — Admin Portal has 7 distinct business-purpose modules (orders, marketing, product/service, CMS, customers, reporting, system admin), each needing its own landing/CRUD/settings screens, not one central mega-table. Condition 2 of the 2-condition test fails, so standard sidebar stays.
- Content area: white/gray-50 surface, high data density (row padding at `--sp-2`/`--sp-3`), sticky table headers.

## 10. Reference products (layout anchor, not brand-copy)
- **Airtable** — toolbar pattern (search/filter/sort/group chips), dense table rows, collapsible sidebar.
- **Stripe Dashboard** — KPI card system, drill-down from dashboard to filtered reports, refund/payment status pipeline.
- **Notion** — sidebar accordion groups, icon-rail collapse behavior, settings side-nav pattern (#52, #69).

## 11. Support level
Internal staff, trained before use, IT-savvy-to-office-worker mix → concise labels, business terminology, minimal hand-holding tooltips (only on non-obvious rules, e.g. stacking discount conflicts, multi-level refund approval).

## 12. Target platform
**Desktop/nội bộ** (internal, desktop-optimized only — no responsive/PWA work needed).

## 13. Entry flow
- **Đăng nhập (Login)** — `screens/auth/dang-nhap/` — split-panel: left panel is a `--primary-lightest` tint band (v2 — was a dark Primary gradient in v1) with logo, tagline "Empowering life journeys", 3 role-aware bullet highlights; white panel with email/password form, role shown as read-only context after typing a recognized email (demo only), `btn-primary` full-width "Log In". Submits straight to Dashboard.
- **Dashboard** = **#42 Real-time KPI Dashboard**, treated as BOTH the sitemap's dashboard screen and the skill's required post-login landing screen (not duplicated).

## 14. Menu structure — 7 groups (English labels, identical grouping logic to `scope-and-sitemap.md`'s "Thiết kế nhóm menu")
Dashboard sits outside all groups, first sidebar item, icon-only "Overview".

1. **Order Management** (`#17–22`) — Admin, Operations, Finance
2. **Marketing & Promotions** (`#23, #24, #39, #40, #41, #66`) — Admin (Marketing)
3. **Product & Service Data** (`#25–30, #64, #65`) — Admin (BU owners)
4. **Content (CMS)** (`#31–33`) — Admin (Marketing)
5. **Customers & Users** (`#34–38`) — Admin, Super Admin
6. **Reports & Analytics** (`#42–51, #67`) — Admin, Finance, Super Admin (Dashboard #42 lives here logically but is pinned outside the accordion per nav convention)
7. **System Administration** (`#52, #53, #69`) — Super Admin, Tech Support

Sidebar footer: Logout → back to `screens/auth/dang-nhap/`.

## 15. Confirmed main workflows (interactivity scope, per `scope-and-sitemap.md` Workflow 3 + task brief)
- **Order Management flow (full interactivity):** #17 Order List → #18 Order Detail → #20 Refund Approval, matching confirmed Workflow 3 (Refund Request lifecycle: Khởi tạo → Chờ duyệt → Đã duyệt/Từ chối → Đã gửi API → Hoàn tất).
- **Product/Service CRUD flow (full interactivity, representative of the standard CRUD pattern reused across the app):** #25 Product/Service List → #26 Create/Edit Product/Service.
- **Dashboard (#42, full interactivity):** working period filters + drill-down links into #43 Sales Report, #47 Refund Report, #49 Customer Journey & Conversion Report.

**Full interactivity:** #17, #18, #20, #25, #26, #42.
**Static UI + correct navigation only (still fully designed):** all remaining 36 screens (#19, #21–24, #27–41, #43–53, #64, #65, #67, #69) plus the Login screen (submit navigates, no real auth check).

## 16. Form container choices (per `form-containers.md`, locked per entity so the same entity always uses the same container)
- Manual order create/edit (#19): **Slide-over (Drawer)**.
- Discount/promotion create/edit (#24): **Slide-over (Drawer) with tabs** (General / Usage Rules / Target Segment) — upgraded from Pop-up Modal, see §16b.
- Product/service create/edit (#26): **Slide-over (Drawer, drawer-lg) with tabs** (Basic Info / Variants / Media / Pricing & Special Price / Service Rules) — needs to stay in context of the catalog list.
- Reschedule/cancel booking (#30): **Slide-over (Drawer)** — upgraded from Pop-up Modal, see §16b.
- Content page editor (#32): **Slide-over (Drawer, drawer-lg)** — corrected from Dedicated Page, see §16b.
- Combo/Bundle create/edit (#65): **Slide-over (Drawer) with tabs** (Components / Pricing / Media) — upgraded from Pop-up Modal, see §16b.
- Role & permission create/edit (#38): **Slide-over (Drawer, drawer-lg)** — corrected from Dedicated Page, see §16b. The permission matrix only ever renders one role's row of 7 module selects at a time in the built UI, so it fits comfortably; the matrix table scrolls horizontally inside the panel.

## 16b. Drawer conversion pass (v3 — user directive: ≤20 real controls → Slide-over/Drawer, for Create/Edit/View screens, not just forms)

**Rule applied:** for every Create/Edit/View(-Detail) screen in the Admin Portal (never List/Dashboard/Report screens), count real `<input>`/`<select>`/`<textarea>`/toggle/dropzone/rich-text-editor controls in the actual built HTML (current mock-data render state, excluding `<label>`s and Save/Cancel/Close buttons). ≤20 → convert to a Slide-over (Drawer): `.drawer-overlay` > `aside.drawer` (reusing the `.drawer`/`.drawer-lg`/`.drawer-overlay` classes already defined in `global.css` since the original build — no new CSS was needed), embedded in the screen's parent List screen, opened via the "+ Create" button and/or a row click. A shared `CJDrawer.open/close/bind` helper was added to `assets/js/global.js` (overlay-click-outside and `[data-drawer-close]` elements close the panel; Escape closes any open drawer).

| # | Screen | Type (before) | Real controls counted | Parent (drawer host) | Decision |
|---|---|---|---|---|---|
| #18 | Order Detail | Dedicated Page | 2 (status select, note input) | #17 Order List | **→ Drawer** |
| #19 | Create/Edit Manual Order | Dedicated Page (styled as tabs card) | 7 | #17 Order List | **→ Drawer** |
| #20 | Refund Approval | Màn hình quản lý (queue + inline detail split-panel) | n/a — this is a List/queue screen with its own master-detail layout, not a single-record Create/Edit/View | — | **Not a candidate** — left as-is |
| #22 | Email & Invoice Config | Màn hình quản lý (list; editor was an unbuilt stub `href="#"`) | ~8 (name, applies-to type + value, content, 3 include-toggles, active toggle) | Self (list + editor on one screen per its own spec) | **→ Drawer** (editor built out for the first time, embedded in the same screen) |
| #24 | Create/Edit Discount | Pop-up Modal w/ tabs | 13 | #23 Discount/Promotion List | **→ Drawer** (upgraded from Modal) |
| #26 | Create/Edit Product/Service | Dedicated Page (documented as Slide-over in §16 but never actually built as one) | 19 (6 basic + 4 variant row + 1 media dropzone + 4 pricing + 4 rules, at current 1-variant mock state) | #25 Product/Service List | **→ Drawer** (drawer-lg; corrects the doc/build mismatch) |
| #30 | Reschedule/Cancel Session | Pop-up Modal | 5 | #28 Schedule/Slot & Staffing | **→ Drawer** (upgraded from Modal) |
| #32 | Content Editor | Dedicated Page | 8 (title, slug, content, status, publish date, no-index toggle, meta title, meta description) | #31 Content Page List | **→ Drawer** (drawer-lg; corrects from Dedicated Page) |
| #35 | Customer Detail | Dedicated Page | 3 (phone, acquisition source, joined — the latter two read-only) | #34 Customer List | **→ Drawer** |
| #38 | Create/Edit Role & Permissions | Dedicated Page | 9 (role name + based-on-role select + 7 module access-level selects, at current 1-row-rendered mock state) | #37 Admin Users & Roles | **→ Drawer** (drawer-lg; corrects from Dedicated Page) |
| #65 | Create/Edit Combo | Pop-up Modal w/ tabs | 7 (name + variant qty inputs ×3 + sum-price + combo price + media dropzone) | #64 Combo/Bundle List | **→ Drawer** (upgraded from Modal) |

No screen exceeded 20 in its actually-built state, so none stayed as a Dedicated Page/Modal from this evaluation pass — but #26 (19/20) and #38 (9/20, matrix renders one role-row at a time) were genuinely close calls worth flagging for future maintainers: if more variant rows or a full multi-role matrix view are ever added to the live build, re-count before assuming the Drawer still fits.

**Standalone-screen handling (per task step 3):** for every converted screen, the original standalone folder/file (`screens/<module>/<name>/index.html`) was kept for sitemap completeness but turned into a **thin redirect wrapper** (the simpler, preferred option) — it reads any `?id=`/`?session=` query param and forwards (`location.replace`) to the parent list screen with an `?openId=`/`?openOrder=`/`?openReschedule=`/`?openRoles=` param that the parent's `script.js` reads on load to auto-open the drawer pre-populated with that record. This avoids maintaining the same form markup in two places. #22 has no separate standalone editor file (the spec always bundled list + editor into one screen), so its drawer lives directly in `cau-hinh-email-hoa-don/index.html` with no wrapper needed.

**New data file:** `assets/data/email-templates.js` (`DATA_EMAIL_TEMPLATES`) was added to back #22's template list/editor — the original build had this screen as fully static markup with no data layer.

## 17. Signature moment (mandatory, ONE only)
**"5 Forms → 1 Form" Conversion Card on the Dashboard (#42).** Grounded directly in the project's core documented pain point (`requirements-summary.md`): at events, customers previously filled up to **5 separate forms and paid 5 separate times** (Meridian Nutri, prenatal package, prenatal class, birthing suite booking, FBP/NBP membership) — the temporary legacy e-commerce platform fix only got this down to 4/4. Project Aurora's defined success metric #1 is collapsing this to 1 form / 1 payment.

The Dashboard's hero KPI card visualizes this as a **before/after mini funnel**: "Avg. forms per transaction" showing a large current-state number (e.g. **1.2**) next to a struck-through "was 5.0 (pre-launch baseline)" with a small horizontal bar comparing the two, plus a caption referencing the specific legacy pain point ("down from 5 separate forms & payments per event booth visit"). This is the one deliberately bold/narrative element on the Dashboard — every other KPI card uses the standard stat-card treatment. Not repeated elsewhere in the app (per signature-moment discipline — one spotlight, not scattered).

As an ordinary (non-signature) but genuinely project-specific business rule, **Order List (#17)** and **Order Detail (#18)** also visually distinguish **purchase source** (Event / Hospital Tour / Online / Retail) via a small colored source tag next to the order ID — this is real, unusual business logic from `scope-and-sitemap.md` ("giỏ hàng tách riêng theo purchase source"), not decoration, but is treated as standard badge UI, not the signature moment itself.

## 18. Role-based access note (per task brief — static demo assumption)
The prototype does **not** enforce per-role screen hiding or a real login-gated permission system across all 42 screens. #37 (Admin Users & Roles) and #38 (Role & Permission editor) show the **permission matrix concept** clearly (module × access-level grid: Full/High/Medium/Limited/None) as their own screen content. Every other screen in this prototype assumes **the viewer is a Super Admin seeing everything** — sidebar shows all 7 groups regardless of the role picked at login.

## 19. Data-grid override
Not applicable — see §9. Standard sidebar nav used throughout.
