# UI Kit Brief — Azura Manager PMS (Azura Stays)

Status: locked. This file is the single source of truth for every screen generated in this prototype. Deviating from it screen-by-screen is the #1 way a 579-screen build ends up looking inconsistent — read it before generating any screen, don't rely on memory of it from an earlier screen.

## 0. Source material & deviations from the standard skill flow

- Source material: the screen sitemap `_spec/en-pms-sitemap.md` (579 screens across 27 sub-modules / 12 business groups, each with route + navigation data) and `_spec/en-screens/<CODE>-*.md` (one field-level spec per screen). Treat `en-pms-sitemap.md` as `scope-and-sitemap.md` and the `en-screens/` folder as the per-screen detail normally implied by it.
- The "Opened From" / "Navigates To" columns in `en-pms-sitemap.md` are **authoritative real navigation** — reuse them directly when wiring links/breadcrumbs instead of inventing new cross-links. Popups (`-P1`, `-P2`, ...) are never sidebar destinations; they only open from their documented parent screen.
- Reference UI kit: the sister prototype `../cms/` ("Azura Stays Channel Manager"). The PMS keeps its token *names*, spacing, typography and components, but ships its own **dark matte theme with a champagne-gold accent** (see §2).
- Explicit user instruction: **build all 579 screens with full behavior** (not a static subset) — every screen therefore follows the "main workflow" interactivity rules in `reference/interactivity-guide.md` (form validation, localStorage persistence, working filter/sort, delete confirmation) — not just the 4 confirmed workflows below. The 4 confirmed workflows get **extra** attention (richer mock data, more edge cases, first ones built/QA'd) but no screen is left as click-only static UI.
- Folder naming deviation: because this sitemap is organized by 3-letter prefix (`PROP`, `BOOK`, `ACC`, ...) rather than free-form Vietnamese screen names, `screens/<module>/` uses the kebab-case slug of the prefix's English module name (see §5 table), and each screen folder is `screens/<module>/<code-lowercase>-<slug>/` (e.g. `screens/booking/book-001-search-availability/`) — the code prefix is kept in the folder name for traceability back to `en-screens/<CODE>-*.md`, unlike the plain-Vietnamese-slug convention in the base skill.

## 1. Product identity

- **Client (company):** Azura Stays — luxury villa rental & management (azurastays.example). Same client as the CMS reference.
- **Product name (used in UI, not the company name):** **Azura Manager** — matches the name already used in the source sitemap title ("Azura Manager PMS") and parallels the CMS product's own naming pattern (CMS shows "Channel Manager" next to the Azura Stays logo; PMS shows "Azura Manager").
- **Logo:** reuse the exact Azura Stays logo file from the CMS prototype (`assets/img/azura-logo.svg`, copied verbatim from `channel-manager/azura-logo.svg`) — same company, same mark. Brand-mark fallback (if a screen needs a tiny square glyph instead of the full logo) = "M" on a Primary-dark tile.
- **Sidebar brand block:** logo image + text "Azura Manager" (mirrors CMS's `.sidebar__brand` markup exactly).
- **Page `<title>` pattern:** `<Screen Name> — Azura Manager`.
- **Sidebar footer disclaimer (below the Logout item):** `Azura Stays PMS · Prototype v0.1` (mirrors CMS's `Azura Stays CMS · Prototype v0.1`).

## 2. Color palette — dark matte theme, champagne-gold accent

Token names are shared with the CMS so components stay identical; the values are re-pointed for a dark UI (source of truth: `assets/css/global.css`).

```css
color-scheme: dark;
--color-primary: #D4A85A;        /* gold accent: buttons, active nav, charts, focus */
--color-primary-dark: #F2F2F3;   /* strong text: headings, KPI numbers */
--color-white: #1C1C1F;          /* card / surface */
--color-ink: #0E0E10;            /* sidebar, hero backgrounds */
--color-on-primary: #17130B;     /* text on gold */
--color-text-inverse: #FFFFFF;   /* text on dark heroes / photos */
--color-logo-bg: #FFFFFF;        /* logo tile */
--color-accent: #F2736A;         /* red, readable as text on dark */
--color-accent-600: #B3352B;     /* red button background (white text) */

--color-primary-50: #2A2419;  --color-primary-100: #3D3322;  --color-primary-600: #B88A3E;

--color-gray-50: #121214;  /* page background */
--color-gray-100: #202024; --color-gray-200: #2B2B30; --color-gray-300: #3C3C43;
--color-gray-400: #9C9CA6; --color-gray-500: #A6A6AF; --color-gray-600: #B6B6BE;
--color-gray-700: #C6C6CD; --color-gray-800: #DCDCE0; --color-gray-900: #ECECEF;

--color-success: #34C27F;  --color-success-bg: #13291E;  --color-success-text: #5CD49A;
--color-warning: #F2A93C;  --color-warning-bg: #2D2414;  --color-warning-text: #F2B85C;
--color-danger:  var(--color-accent);  --color-danger-bg: #33191A;  --color-danger-text: #FF8F85;
--color-info:    var(--color-primary); --color-info-bg: var(--color-primary-50);
```

Usage rules:
- Sidebar background = solid Ink with a 1px Gray-200 right border.
- H1/H2/H3, KPI numbers, `cell-strong` table cells = Primary-dark (light text).
- 4 button kinds, used by role: `btn-primary` (solid gold, dark `on-primary` text — white on gold fails WCAG AA), `btn-accent` (solid Accent-600 with white text — max 1 per screen), `btn-outline`, `btn-ghost`.
- Every badge/status pill has a tinted dark `-bg` background + matching light status text — never gray for a real status.
- Every stat/KPI card has a 3px top color strip (primary/accent/success/warning) matching its metric kind.
- All text tokens reach ≥ 4.5:1 on the surface (`--color-white`).

## 3. Typography, spacing, radius, shadow, icons — reused verbatim from CMS

- Font stack: `'Segoe UI', system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif` (no Google Fonts import — client already approved this system-font stack in CMS; changing it now would break visual parity).
- Scale: `--font-size-xs:12px / --font-size-sm:13px / --font-size-md:14px (body) / --font-size-lg:16px / --font-size-xl:20px (H3) / --font-size-2xl:26px (H1/page title)`. Add `--font-size-h2: 22px` (600 weight) for section headings between H1 and H3 — CMS didn't need it but a 579-screen build with nested settings pages does.
- Spacing: formalize CMS's existing paddings into an explicit 4px-grid scale for new components: `--sp-1:4px --sp-2:8px --sp-3:12px --sp-4:16px --sp-6:24px --sp-8:32px --sp-12:48px`.
- Radius: `--radius-sm:6px --radius-md:10px --radius-lg:16px --radius-pill:999px` (unchanged).
- Shadow/elevation, 4 explicit levels (extends CMS's 3 into the skill's required 4): level 0 = none (inputs, table rows), level 1 = `--shadow-sm` (default card), level 2 = `--shadow-md` (dropdown/hover/popover), level 3 = `--shadow-lg` + dark overlay (modal). Pure black shadows (dark theme).
- Icons: Lucide-style outline SVG, stroke ~1.75px, `currentColor`, inlined directly in HTML — same as CMS. No emoji icons anywhere.

## 4. New components required by this skill version (not present in the CMS reference — build fresh, same token language)

The CMS prototype predates sidebar collapse/tooltips/flyouts in this skill version. PMS must have them (per `screen-generation-guide.md` §"Khung layout chuẩn") since it has far more modules than CMS:

- **Sidebar collapse/expand:** expanded 264px ↔ collapsed 76px (CMS already reserved `--sidebar-width-collapsed: 76px` as a token but never wired it up — PMS wires it for real). State persisted in `localStorage` key `sidebar_collapsed`, toggled by a floating round button (28-32px, `position: fixed`, straddling the sidebar/content edge, arrow icon rotates 180°, own styled tooltip) — implemented once in `assets/js/global.js`, shared by every screen.
- **Collapsed-state tooltips** on every nav icon (including Logout and the toggle button itself) — custom-styled, not the browser default.
- **Flyout panels** on hover-over-icon when collapsed, for every one of the 12 menu groups (even ones without a nested sub-menu) — surface-colored panel, modal-level shadow, appears beside the icon.
- **Accordion menu groups:** 12 groups (see §5); only the group containing the active screen starts expanded, others collapsed to name+icon; clicking a group header expands it without forcing others shut.
- **Nested module sub-menus:** any sub-module with ≥2 list-level screens (see §5, "Sidebar entries" column) becomes a 3rd-level expandable item inside its group, not a flat list.
- **Sidebar-footer Logout item:** real nav-style row (icon + "Logout" label, tooltip when collapsed) above the `Azura Stays PMS · Prototype v0.1` disclaimer line, separated by a top border — links to `screens/auth/log-001-login/`.
- **Toggle switch component** (`.switch`) — for Settings screens' on/off options; CMS had none.
- **Vertical tabs** for Settings side-nav (reuse `.tabs` visual language, rotated to a left-hand vertical list — see `reference/screen-generation-guide.md` "Màn hình Cấu hình/Cài đặt").
- **Browser-chrome theming** — add (CMS is missing these): `::selection` tinted Primary-100/Primary-dark, `:focus-visible` 2px Primary outline+offset (CMS currently relies on default browser focus — fix in PMS's own `global.css`, no need to touch the CMS repo).
- **Motion tokens:** hover elevation on cards (`translateY(-2px)` + shadow step-up, 150ms ease-out), accordion expand via `grid-template-rows` 220ms ease-out/ease-in, toast slide-in 250ms, modal-in reuse CMS's existing 160ms `modal-in` keyframe. Everything non-trivial wrapped in `@media (prefers-reduced-motion: no-preference)`.

All of the above lives in `assets/css/global.css` + `assets/js/global.js` for this prototype (not retrofitted into the CMS repo, which stays as the client already approved it).

## 5. Information architecture — 12 sidebar groups derived from the sitemap's own module table

`en-pms-sitemap.md` has no dedicated "Thiết kế nhóm menu" table (predates that convention), so this grouping is **inferred** directly from the doc's own "Screen Count Overview by Module" section — it already organizes the 27 sub-modules into exactly these 12 business groups, so no re-invention was needed. Flagging per skill instructions: **this menu grouping was inferred by Claude, not confirmed by the client — adjust if the client's actual mental model differs.**

Overview (`USR-001`) sits outside every group as the first, ungrouped sidebar item. Auth screens (`LOG-*`) are never in the sidebar (pre-login only) and live at `screens/auth/`.

| Sidebar group | Sub-modules (prefix — folder slug) | Sidebar entries (list/landing screens only — everything else reached by click-through per the sitemap's own "Opened From"/"Navigates To" columns) |
|---|---|---|
| Workforce | USR — `system-users` | Team Directory, Sales Agents, Contractors, Wage Rules, Weekly Rest Days, Leave History, Department Avatars, Reservation Analytics |
| Portfolio Setup | PROP — `properties`, COMP — `company`, BU — `business-unit`, VCS — `villa-common-settings` | Property Register, Portfolio Health, Property Intake, Shoot Scheduler, Company Structure, Operating Units, Sales Channels, Currency Setup, Property Attributes (Amenity Catalog/Rate Tiers/Accommodation Types/Service Catalog/... as one settings-style sub-nav) |
| Configuration | CS — `common-lookup-settings`, SET — `system-settings` | Reference Data, Platform Settings |
| Reservations | BOOK — `booking` | All Reservations / Reservation Lookup (the single largest module — landing + a handful of top-level report/calendar screens; the other ~90 BOOK screens are detail/edit/popup screens reached from these) |
| Owner Relations | OWN — `owner-management` | Owner Accounts |
| Owner Hub | OWP — `owner-portal` | Owner Home |
| Guest Hub | GST — `guest-portal` | Guest Home |
| Property Care | OPR — `garden-pool-operations`, MNT — `maintenance`, REN — `renovation`, TRN — `training` | Grounds & Pool Jobs, Repair Requests, Refurbishments, Staff Academy |
| Investors & Stock | FUND — `investment-fund`, INV — `inventory` | Investor Accounts, Funded Projects, Stock Levels |
| In-Stay Services | VSV — `villa-services` | Service Overview |
| Web & Media | CMS — `website-content`, EMT — `email-templates`, NOT — `notices`, TXT — `texts`, PHO — `photos`, VID — `videos`, OTA — `ota-content`, PAGE — `static-pages` | Property Web Pages, Photo Albums, Video Guides (sub-nav for the 8 sub-modules) |
| Finance & Admin | ACC — `accounting-hr` | Finance Summary, Account Structure, Attendance Log, Pay Runs, Goods Catalog, Goods Vendors |

Navigation style: **vertical sidebar** (Internal/Operations archetype default) — 12 business modules each need their own landing/CRUD/settings, which is exactly the "keep sidebar" case in `ui-kit-qna.md` even though several modules (BOOK, PROP) are individually data-grid-heavy.

## 6. Product archetype, mood, reference products

- **Archetype:** Internal/Operations for the ~530 back-office screens (Portfolio Setup, Reservations, Property Care, Investors & Stock, Finance & Admin, Configuration/Workforce) — internal staff, IT-savvy-to-office-competent, trained users, data density prioritized. **Owner Hub (31) and Guest Hub (11)** lean Public/Commercial in tone (warmer copy, more breathing room, no dense tables) while using the **identical** color tokens/components as the rest — this is a tone shift, not a different design system, per the client's explicit ask that PMS and CMS (and by extension every corner of PMS) stay visually unified.
- **Mood:** Modern — matches the CMS reference's rounded cards, soft Primary-dark-tinted shadows, and gradient sidebar.
- **Target users:** mixed — internal ops/finance/HR staff (office-competent, not necessarily IT specialists) for the bulk of the system; property owners and guests (general public) for the two portals.
- **Software type:** Internal (majority) with two embedded Public-facing portals.
- **Reference products:** Airtable (dense toolbar/table pattern for the ~400 CRUD screens — chip filter/sort/group toolbar per `screen-generation-guide.md`), Salesforce/HubSpot-style dashboards (Reservations/Finance KPI + activity panels), and the CMS reference itself as the primary layout anchor (sidebar, header, card, modal shapes must feel identical across both products).
- **Target platform:** Desktop/internal (same decision as the CMS reference) — the two portals get reasonable reflow via the existing `grid-2`/`grid-3`/`stat-grid` breakpoints already in the shared CSS, but this is not a mobile-first or PWA build. `reference/responsive-and-pwa.md` is not applied.
- **Interface language:** English, entirely — labels, breadcrumbs, buttons, placeholders, toasts, and all mock data (English/Western names for guests, owners, staff, vendors).
- **Support level:** office-competent default (clear labels, tooltips on non-obvious icon-only actions) for internal modules; guest-facing Guest Hub screens get fuller inline guidance/empty-state copy since that audience has zero training.

## 7. Industry-specific anti-patterns to avoid

- Villa/hospitality software already over-uses generic sunset-gradient hero imagery and stock "tropical" photography on internal admin screens — Azura Manager's internal modules stay data-dense and utilitarian like the CMS reference; warm/marketing visual treatment is reserved for Guest Hub and the Sign In screen only.
- Property/booking status badges must map to the real operational states in the sitemap (e.g. onboarding stages, booking confirmation states, maintenance ticket states) — never a generic "green=good/red=bad" applied without checking what state actually exists for that entity.
- Financial screens (FUND, ACC, INV, owner statements) must use `tabular-nums` and consistent decimal alignment for money — this is an operations company handling real owner payouts, not a marketing dashboard where approximate-looking numbers are acceptable.

## 8. Signature moment (Điểm nhấn riêng)

**Property Readiness panel** on the main Overview (and echoed, in full, only on the Property Records module landing page — nowhere else). This is derived directly from three real, documented fields unique to this exact codebase, not a generic "completion %" widget:
1. Properties with **no Concierge assigned** (from the `PROP-032` Portfolio Health "no concierge assigned" widget),
2. Properties **missing required photos** (`PROP-027`),
3. Properties **stuck in onboarding** (pending confirmation/communication/rules/extras — `PROP-021`).

No other PMS demo would combine exactly these three fields — they only exist because this client runs villas through a specific photography+concierge+onboarding pipeline before a property is bookable. Rendered as a ring/gauge ("N of M properties fully ready to sell") plus a 3-row breakdown, each row linking straight to its source screen (PROP-032 / PROP-027 / PROP-021). This is the one "designed" moment in the whole prototype; everything else stays disciplined/consistent per the rest of this brief.

## 9. Mock data conventions

- English/Western names throughout (guests, owners, staff, agencies, vendors).
- One fixed cast of recurring entities reused across screens (a handful of named villas, owners, guests, staff, bookings) — defined once in `assets/js/global.js` as `window.MM.MOCK_*` arrays (mirroring CMS's `window.CM.MOCK_VENDORS` pattern) and imported by every screen's own `script.js`, so the same "Villa Sapphire Cliff" or "Booking #BK-10234" looks identical whether it's on a list, the Overview's recent activity, or a form's dropdown.
- Status diversity required in every list: at least one overdue/at-risk/incomplete row, not all-green data.

## 10. Confirmed main workflows (get first, deepest attention — every screen still gets full interactivity per the user's explicit "build all with behavior" instruction)

1. Reservation lifecycle — BOOK, FUND/INV
2. Property records & owner relations — PROP, OWN, OWP
3. Property care — OPR, MNT, REN, TRN
4. Guest Hub experience — GST
