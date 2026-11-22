# UI Kit Brief — CareJourney POS App

> Values follow the shared CareJourney brand brief used by the Admin, Storefront and POS prototypes. This file records how POS applies them plus its own deviation, entity, and signature-moment decisions. Do not re-derive colors/product name/mood/language — they are already decided upstream.

## Loại dự án
**Hệ thống quản lý — kiosk mode deviation.** No login, no dashboard, no sidebar. This is a dedicated touchscreen terminal app (think Square POS / Toast POS / pharmacy dispensing terminal), not a multi-module admin system. Entry point = the **Sales Terminal** screen directly.

## Product name & brand-mark
"CareJourney" — brand-mark "CJ" in a small rounded square, shown only in the top device-chrome status bar (not a full nav/logo block, since there is no persistent nav chrome here).

## Colors — v2 (current, retheme applied 2026-09-17 — see "v2 Retheme" note below)
- Primary (brand blue): `#4C5FFF` · light `#9DA7FF` · lightest `#EEF0FF` · CTA gradient pair `#6777FF` → `#3141C0` (small gradient on CTA buttons/brand-mark only, never a full nav fill)
- Secondary (brand green): `#019770` · lightest `#EBF7F4` · dark (computed hover shade, not an official token) `#016B52`
- Tertiary (neutral text/UI-chrome — replaces v1's "Primary-dark used for headings"): `#3E413D` · light `#696A74` · lighter `#A2A3AC` · lightest `#DCDCDC`
- Neutral gray (9-step, unchanged from v1 — not brand-tinted): 50 `#FAFAFA` · 100 `#F1EFF0` · 200 `#E3DFE1` · 300 `#CFC8CC` · 400 `#A79DA3` · 500 `#82777D` · 600 `#665B61` · 700 `#4B4146` · 800 `#332B2F` · 900 `#1E1719`
- Success: aliased to Secondary (`#019770` / bg `#EBF7F4`) — brand green instead of a generic success green
- Warning `#B4750A` / bg `#FCF0DA` — **unchanged**, verified still visually distinct from the new Primary/Secondary/Error family
- Error `#B52836` / bg `#FBECED` — **reserved exclusively for genuine patient-safety alerts (allergy conflicts)**, never for ordinary form validation (form errors use Warning/amber). Unchanged rule, hex updated to the v2 palette's error value.

### v1 colors (superseded, kept here for history only)
Primary `#4C5FFF` / Primary-dark `#00084A` / Primary-50 `#EEF0FF` / Primary-100 `#DCE0FF` / Accent `#019770` (accent-dark `#016B52`, accent-50 `#EBF7F4`) / Success `#1F9D63` / Error `#C23B3B`. These no longer appear anywhere in this app's CSS.

## Mood
Modern — clear rounded corners (cards/modals 16px, inputs/buttons 10px, pills/badges 999px), pronounced shadow tinted with Primary-dark, subtle gradient (Primary → Primary-dark) allowed on the top device-chrome bar and primary CTAs only.

## Typography
Heading: **Plus Jakarta Sans** (Google Fonts) · Body: **Inter** (Google Fonts). Scale: H1 32/700, H2 24/600, H3 20/600, Body 15/400, Caption/label 13/500, line-height 1.5 body.

## Icon system
Outline style (Lucide/Feather-equivalent), inline SVG, `currentColor`, stroke ~1.75px.

## Interface language
**English** — all labels, buttons, placeholders, toasts, and mock data. Screen folder names keep Vietnamese slugs (internal slugs only, not user-facing content).

## Industry anti-patterns applied
1. Red is reserved for clinical/allergy danger (see Colors above) — never for generic form validation errors (amber/warning used instead).
2. No gradient outside the locked Primary→Primary-dark pair — no generic "AI purple-pink" gradients.
3. No stock-photo illustrations — flat icon/illustration only where needed (mostly none, POS is data/action-dense).

## Target platform & viewport
Touch-optimized, full-screen, **fixed landscape terminal** (designed for ~1280×800). No responsive breakpoints. The page mats a neutral background and centers a fixed-aspect `.pos-device` frame (1280×800, rounded 20px, heavy shadow) to visually read as "a physical terminal on a counter," not a scrollable website. Minimum touch target height 56–64px on every interactive control. No browser-chrome feel — no URL-bar-style header. A top status bar exists but is themed as **device chrome**: store name, cashier name, live clock, session status pill — not a website nav bar.

## Navigation model (deviation — no sidebar/breadcrumb/dashboard)
- No login gate, no dashboard, no sidebar, no breadcrumb, no settings side-nav classes in `global.css`.
- Linear flow only, with fixed-position **Home** (return to the Sales Terminal) and **Cancel/Back** controls always in the same top-right corner across every screen.
- Full button variants, cards, badges, modals, toggles, form inputs, tabs, empty states and toasts are still fully implemented — only the nav chrome is dropped, not design-system quality.

## Product archetype
No archetype in the standard table applies cleanly. Applied blend: **visual boldness/rounding of the Modern mood** + **the data-accuracy/audit-trail discipline of Tài chính/Compliance nặng** (regulated pharmacy dispensing, health-record submission, mandatory audit logging of sensitive POS actions) — color is used to communicate state/risk precisely (override badges, allergy alerts, session variance), not for decoration.

## Reference products (layout inspiration, not copied verbatim)
Square POS / Toast POS (touch-tile sale screen, big cart panel, payment method buttons) and a hospital/pharmacy dispensing terminal pattern (patient safety banners, counseling checklists) — used to shape the Sales Terminal's tile+cart layout and the prescription popups' clinical form structure.

## Form container choices
- **Patient Intake** (~7 fields incl. allergy multi-select) → **full-screen popup card** styled as a pop-up over the Sales Terminal (specified as a pop-up form), since it needs to stay visually anchored to the in-progress sale.
- **Dispensing Record** (~5 fields) → **Pop-up Modal card** (same popup-over-sale treatment, smaller).
- **Medication Counseling** (~4 fields + checklist) → **Pop-up Modal card**, tabs not needed (single group).
- **Clinical Intervention** (~4 fields) → **Pop-up Modal card**, opened from Medication Counseling, returns to it (loop).
All four popups render as a centered card over a dimmed scrim of the underlying flow (implemented as separate pages, styled to read as a modal/pop-up rather than a full page navigation).

## Entities & data layer (`assets/data/`)
1. **`prescription.js`** → `DATA_PRESCRIPTION` — patient demographics/clinical info, allergy list, medication + qty prescribed/dispensed/remaining, dispensing status (Prescribed → Partially/Fully Dispensed → Counseling Documented → Record Submitted), counseling checklist/notes, intervention records array, health-record submission status/timestamp/reference.
2. **`product.js`** → `DATA_PRODUCT` — retail + pharmacy items, barcode, SKU, price, unit, `requiresPrescription` flag, stock qty.
3. **`transaction.js`** → `DATA_TRANSACTION` — completed POS sales, line items (with per-line override flag/reason/authorizer), payment method, cashier, linked prescription id, supervisor-override flag — feeds both Shift Close-Out and Pharmacy Reports.

## Main workflow (full interactivity)
Sales Terminal → Patient Intake (if Rx item) → Dispensing Record → Medication Counseling → Clinical Intervention (if an issue is found, loops back to Medication Counseling) → Shift Close-Out. All 7 screens ship real click-through state changes, `localStorage`-backed persistence, client-side validation, and a mock supervisor-PIN gate (`1234` for demo) — applied to every screen in this app since the whole sitemap IS the main workflow (plus Pharmacy Reports as a lightweight, still-interactive reporting screen with working tab/filter logic).

## Điểm nhấn riêng (Signature moment) — mandatory, POS-specific
**Chosen: Supervisor-Override Audit Trail.** Grounded in the compliance requirement that sensitive POS actions such as price overrides must be audit-logged — not a generic "healthcare POS" idea.
- On the **Sales Terminal**, any price change on a cart line requires the **Supervisor Authorization modal** (PIN `1234` for demo + reason field). Once authorized, that line gets a distinct amber "Supervisor Override" badge with a small shield-check icon, showing original price struck through → new price.
- Every authorized override is appended to a `pos_audit_log` entry (line item, original/new price, reason, authorizer, timestamp) and to the transaction record's `overrides` array.
- On **Shift Close-Out**, a dedicated "Supervisor Overrides This Session" panel lists every override from the session's transactions with full audit detail (who authorized, what changed, when) — a KPI card also counts total overrides for the shift.
- On **Pharmacy Reports**, the Health Record Uploads tab and the transaction table both surface override flags, so this one specific, dataset-grounded control (not decoration) is reused consistently at exactly these points — not repeated everywhere else.

## Motion
Minimal, motivated only: 100–150ms hover/press feedback, 200–300ms popup-card enter/exit, 400–600ms for the health-record submission success sequence. `ease-out` for entrances, `ease-in` for exits, no bounce/elastic. All non-essential motion wrapped in `prefers-reduced-motion: no-preference`.

## Browser-chrome theming & QA
`::selection`, scrollbar and `:focus-visible` themed in `global.css`. QA Track 1 (aesthetic) run on the Sales Terminal (anchor) before generating the rest; QA Track 2 (countable checklist) spot-checked across the Sales Terminal, Medication Counseling (popup) and Shift Close-Out before the final report.

## Customer & Rewards panel addition (2026-09-17)
Added after the user reviewed the built prototype and flagged that the Sales Terminal was
missing a way to look up/redeem customer reward points and enter a promotion/discount code —
needed because the POS must support promotional pricing, and by the "unified commerce" premise
that reward points and the Discount/Promotion entity (both originally scoped for Storefront)
should also work in-store. The Sales Terminal spec was updated first to document the requirement,
then implemented here to match the Storefront checkout (Details & Payment) UX pattern.

What was added, all on the existing Sales Terminal — no new screen/route:
- **Customer & Rewards panel**, inserted in the cart sidebar between the cart header and the cart
  line list. Default state: "No customer attached — Look up Customer" (walk-in stays fully valid/
  optional, nothing is forced). Tapping it opens a touch-keypad lookup modal (phone number or
  membership ID, numeric keypad + demo quick-pick chips) matched against a new local
  `assets/data/customer.js` (`DATA_CUSTOMER`) — deliberately reusing the same customer
  IDs/balances as the Storefront prototype's `DATA_KHACH_HANG` for CUS-1001..1003, so a member's
  points balance reads identically whether looked up online or in-store (demonstrates the
  real-time-synced-ledger business rule in the Sales Terminal spec).
- **Redeem Points**: once a customer with a positive balance is attached, a toggle + point input
  ("Use Max" quick action) appears. Redemption rate: **100 points = A$1.00** — this is not a new
  assumption, it's the rate already established by Storefront checkout's `script.js`
  (`loyaltyValue = points * 0.01`), reused verbatim for cross-channel consistency. Redemption is
  clamped so it can never exceed the customer's balance nor reduce the sale below zero (capped to
  the post-promo subtotal), with a visible amber cap message when the input is over-limit.
- **Promotion/Discount Code**: input + Apply button, validated against a new local
  `assets/data/promotion.js` (`DATA_PROMOTION`, same shape as Storefront's `DATA_MA_GIAM_GIA`) with
  distinct real-time error states for not-recognized / expired / not-yet-active / minimum-spend-not-met,
  and a success chip + toast on a valid code — mirroring Storefront checkout's apply/validate
  interaction pattern (adapted to this app's own `.field`/`.error-text` amber-only-for-form-errors
  convention, not literally copying Storefront's markup).
- Both discounts recompute the cart total live and appear as separate line items ("Promo (CODE)",
  "Loyalty redeemed (N pts)") in the cart summary above GST/Total.
- **Wired through to transaction records**: `assets/data/transaction.js`'s schema gained
  `promoCode`, `promoDiscountAmount`, `customerId`, `customerName`, `loyaltyPointsRedeemed`,
  `loyaltyDiscountAmount`. Both the Sales Terminal's own checkout path and the shared
  `POS.completeSale()` in `assets/js/global.js` (used by the Rx counseling popup flow to finalize
  prescription sales) populate these fields, so a sale that redeems points/applies a promo and then
  has to detour through the prescription popups still carries that detail through correctly.
  Shift Close-Out and Pharmacy Reports transaction tables now show a customer-name sub-line and
  ⭐/promo-code flag badges, and Shift Close-Out gained a sixth KPI card ("Loyalty & Promo") summing
  session-wide redemptions — confirmed working via a scripted browser click-through (Playwright)
  with zero console errors, including the full add-item → attach customer → redeem points (incl.
  over-limit clamp) → apply promo (incl. invalid/expired/min-spend-not-met/valid states) → charge →
  Shift Close-Out verification loop.

## v2 Retheme (2026-09-17)
CSS-only retheme, no HTML/JS/content changes. Trigger: the user reviewed the v1 build and said it looked too dark for a bright healthcare-service brand, and asked for a white background with blue/teal as accents only. New values: the v2 CareJourney palette (`--primary`/`--secondary`/`--tertiary`/`--error`).

What changed:
- `assets/css/global.css` `:root`: old Primary/Accent hex swapped for the v2 Primary (`#4C5FFF`), Secondary (`#019770`), and a new Tertiary neutral (`#3E413D`) role that now owns headings/emphasis text — old `--primary-50/100/dark` and `--accent/-dark/-50` names kept as aliases pointing at the new tints so every existing reference resolves correctly.
- `.pos-mat` (outer mat) and `.pos-device` (terminal panel) backgrounds changed from a dark `--gray-900` mat / off-white panel to a light `--gray-100` mat / pure white `#fff` panel — this was the single biggest contributor to the "too dark" impression, since it framed every screen.
- `.device-bar` (top status bar / device chrome) changed from a solid dark Primary gradient with white text to a white bar with a hairline `--tertiary-lightest` border and `--tertiary` text — Primary now shows up only as a small accent (brand-mark chip gradient, active-state color), per the brief's explicit override of the default "nav area must have solid-color fill" rule.
- All headings (`h1`–`h4`) and emphasis/strong text (prices, totals, table cell-strong, active tab/step, toast body) moved from `--primary-dark` to `--tertiary`.
- `btn-primary` keeps its small decorative gradient, now `--primary-gradient-from` (`#6777FF`) → `--primary-gradient-to` (`#3141C0`) instead of the old dark blue pair.
- `--success` is now aliased to `--secondary` (brand green) instead of a generic green, per the brief's "use Secondary for success states" rule.
- Swept all `screens/**/style.css` (`man-hinh-ban-hang-pos`, `dong-ca-thu-ngan`, `ghi-nhan-tu-van-duoc`, the shared `popup-flow.css`, plus `bao-cao-van-hanh-pos` and `ghi-nhan-quy-trinh-can-thiep` which needed no changes) for both hardcoded old hex and `var(--primary-dark/-50/-100)` references; all now use the new variables/aliases. No screen had hardcoded brand hex outside `global.css`.
- **Unchanged by design:** the Supervisor-Override Audit Trail signature moment (amber `badge-override`/`.line-icon-btn.is-override` on the Sales Terminal, the "Supervisor Overrides This Session" panel on Shift Close-Out, override flags on Pharmacy Reports) and the clinical allergy-alert banner still use the dedicated Warning (`#B4750A`, unchanged) and Error (`#B52836`, updated hex only) semantic colors respectively — the three-way visual distinction (Primary accent vs. amber override vs. red clinical alert) is preserved and, if anything, reads more clearly now that the rest of the UI is calmer/white.
