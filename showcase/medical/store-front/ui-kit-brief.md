# UI Kit Brief — CareJourney Storefront

> Values below follow the shared CareJourney brand brief used by the Admin, Storefront and POS prototypes. This file records how Storefront specifically applies them. Do not re-derive color/product-name/mood/language.

## 1. Loại dự án & Loại phần mềm
- Loại dự án: **Hệ thống quản lý** (has accounts/auth, but public-facing — not a landing page).
- Loại phần mềm: **Public** (general public customers — event attendees, hospital tour visitors, online shoppers, retail shoppers).

## 2. Product name & logo
- Product name: **CareJourney** (never "Meridian Health" in the nav — the full company name is reserved for footer/about content).
- Logo/brand-mark: "CJ" wordmark in a small rounded square with a stylised leaf/heartbeat glyph, `Primary-dark` background, white text — top-left of the horizontal header nav (the only brand placement, per the Public archetype — no sidebar).

## 3. Mood
**Modern** — clear rounded corners (16px cards, 10px inputs/buttons), pronounced shadows, subtle Primary→Primary-dark gradient on the header CTA button and hero sections.

## 4. Interface language
**English**, for all display text (labels, buttons, placeholders, toasts, mock data). Screen folder/file slugs stay in Vietnamese (internal slugs, not user-facing).

## 5. Color palette (v2 — see "v2 Retheme" note in §20)
| Token | Value | Usage |
|---|---|---|
| `--primary` | `#4C5FFF` | Logo mark, active nav indicator, CTA buttons (`btn-primary`), links |
| `--primary-dark` | `#3E4ED1` (derived) | Hover/pressed states only — NOT headings, NOT nav background |
| `--primary-lightest` (`--primary-50`) | `#EEF0FF` | Subtle backgrounds, hover tints, hero band tint |
| `--primary-100` | `#DCE0FF` (derived tint) | Badge backgrounds, focus rings |
| `--secondary` (`--accent`) | `#019770` | Secondary CTA, success-adjacent accents, channel-tag (Hospital Tour) |
| `--secondary-lightest` (`--accent-50`) | `#EBF7F4` | Subtle green tints, hero band |
| `--tertiary` | `#3E413D` | **Headings, KPI numbers, emphasized/strong text** (replaces old Primary-dark role) |
| `--tertiary-light/-lighter/-lightest` | `#696A74` / `#A2A3AC` / `#DCDCDC` | Body text muted tones, borders/dividers, nav-chrome border |
| Neutral gray | 9-step `--gray-50`…`--gray-900`, rebuilt as true neutral from the Tertiary family | Text/border/background |
| `--error` | `#B52836` (+ `-light`/`-lighter`/`-bg`) | Genuinely serious situations only |
| Success / Warning / Info | standard semantic + `-bg` tints (unchanged) | Order status, form validation |

**Healthcare anti-pattern (locked):** Error/red reserved for genuinely serious situations (e.g. slot no longer available, payment failure) — never for ordinary form validation (uses Warning/amber instead), to avoid false alarm in a maternity/healthcare context.

## 6. Typography
- Heading: **Plus Jakarta Sans** (Google Fonts) — H1 32px/700, H2 24px/600, H3 20px/600.
- Body: **Inter** (Google Fonts) — Body 15px/400, Caption/label 13px/500, line-height 1.5.

## 7. Icons
Outline style (Lucide/Feather), inline SVG, `stroke-width:1.75`, `currentColor`.

## 8. Anti-patterns to avoid (industry-specific, locked)
1. No pastel "AI-gradient" purple-pink — any gradient anchors strictly to Primary→Primary-dark.
2. Red reserved for genuinely serious/clinical situations, not routine form errors (use Warning/amber).
3. No fake "smiling doctor" stock photography — flat icon/illustration placeholders instead.

## 9. Product archetype & navigation
- Archetype: **Public/Thương mại** (booking + e-commerce, direct customer sales).
- Navigation: **Horizontal header nav, no vertical sidebar.** Logo left, primary links (Store, Schedule a Visit, Member Benefits, Resources) center, search + cart + account avatar right. Mobile: hamburger → slide-in drawer reusing the same link structure.
- Content area: white/gray-50 surface. **v2:** the header is also white (`1px --tertiary-lightest` border-bottom instead of a Primary-dark fill) — see §20.

## 10. Reference products (layout anchor, not brand-copy)
- **Zocdoc** — booking/slot-selection flow pattern (Select a Time Slot).
- **Sephora.com** — polished e-commerce product grid/detail/cart pattern (Browse the Catalog, Item Details, Shopping Cart).
- **Practo** — healthcare-specific commerce & membership pattern (FBP/NBP Enrollment, Account Overview).

## 11. Support level
General public audience, mixed tech literacy → full guidance: placeholder text on every input, inline helper text for non-obvious actions (e.g. slot capacity, guest checkout), empty states with a clear next action, no unexplained jargon.

## 12. Target platform
**Responsive** (mobile at events/hospital tours, desktop at home) — applied in `global.css`/`global.js`: mobile-first, 3 breakpoints (~640/768/1024px), 44×44px touch targets, table→card collapse, no hover-only affordances, hamburger+drawer nav under 768px.

## 13. Entry screens
- **Home** is the public entry point — browsing does not require sign-in (Public archetype, no gating).
- **Sign In or Create Account (One Meridian Pass)** is available from the header but not gating.
- **Account Overview** is the closest analog to a post-sign-in "Dashboard" — given the same visual-polish priority a Dashboard would get (stat cards for membership/points, shortcuts, recent orders).

## 14. Navigation structure (single functional area — "Customer Experience (Storefront)")
All 17 Storefront screens belong to one functional area. Horizontal nav does not use the accordion-group sidebar pattern; instead:
- **Header nav (public, always visible):** Store (Browse the Catalog) · Schedule a Visit (Browse the Catalog filtered to Hospital Tours) · Member Benefits (FBP/NBP Enrollment) · Resources (Info Article)
- **Account dropdown (avatar, top-right):** Account Overview · My Orders · Rewards Wallet · Sign Out (→ Sign In or Create Account)
- **Cart icon (top-right, badge = item count):** → Shopping Cart
- **Footer:** Store (category links + Full Catalog), Our Network (Meridian brand links — the full "Meridian Health" legal name appears here), Help (Account Overview, Order Status, Get in Touch).

## 15. Main workflows (interactivity scope)
- **Hospital tour / maternity package booking:** Home → Browse the Catalog → Item Details → Select a Time Slot → Shopping Cart → Details & Payment → Purchase Complete
- **E-commerce checkout (PRIMARY conversion flow):** Home → Browse the Catalog → Item Details → Shopping Cart → Details & Payment → Purchase Complete → My Orders, with bundle/special price shown on the catalog and item pages, GST computed in the cart and at payment, points earn/redeem at payment, and guest checkout as a branch of Details & Payment.
- **Staff-assisted checkout:** Details & Payment is the same guided-checkout screen staff use on tablets at event booths.

**Full interactivity** (validated forms, real localStorage-backed state, filter/sort, loading states): **Browse the Catalog, Item Details, Select a Time Slot, Shopping Cart, Details & Payment, Purchase Complete, Account Overview, My Orders, Order Status.**
**Static UI + correct navigation only:** Home (entry polish, but no workflow logic beyond nav/search-redirect), Sign In or Create Account, Info Article, FBP/NBP Enrollment, Update Profile, Communication Settings, Account Closure Request, Rewards Wallet (read-only ledger view).

## 16. Signature moment (mandatory, Storefront-specific) — cart grouped by channel
**Derived from:** the order rule that the cart is split by purchase source (event / hospital tour / online) and grouped by fulfillment method (delivery / on-site / booking-based).

**What it is:** the Shopping Cart auto-groups line items into distinct, colour-tagged **channel groups** — "Online", "Hospital Tour", "Event: Baby Expo 2026" — each rendered as its own card with its own fulfillment-method chip (Delivery / Self-Collection / Booking Confirmation) and its own running subtotal, rather than one flat list. This channel tag is **not decorative** — it is generated from each cart line's `purchaseSource`/`fulfillmentMethod` field in `assets/data/don-hang.js` mock data, and carries through as a small coloured **channel badge** on Purchase Complete, My Orders and Order Status — giving the customer (and, on the same guided-checkout screen used by staff, the booth staff) instant visual traceability of where each item originated across channels.
**Where it appears:** primarily the Shopping Cart; referenced (small badge only, not repeated at full weight) on Details & Payment, Purchase Complete, My Orders and Order Status.

## 17. Form container choices (locked per entity)
- **Update Profile:** Pop-up Modal with 2 tabs (Personal Details / Change Password) — ~4-5 fields per tab.
- **Communication Settings:** Pop-up Modal, toggle-switch list (Email/SMS/Phone/Push) — 4 fields.
- **Account Closure Request:** Pop-up Modal, small (reason select + acknowledgement checkbox + confirm).
- All three are implemented as their own screen file (styled as a centered modal over a dimmed backdrop of Account Overview), since each screen in this prototype is a standalone HTML file — "Close"/"Cancel" navigates back to `../tai-khoan-cua-toi/index.html`.

## 18. Data layer entities (`assets/data/`)
- `san-pham-dich-vu.js` → `DATA_SAN_PHAM_DICH_VU` (Product/Service — variants, `isCombo`/`comboItems`, `listPrice`/`specialPrice`)
- `don-hang.js` → `DATA_DON_HANG` (Order — line items incl. `purchaseSource`, `fulfillmentMethod`, GST, points applied)
- `khach-hang.js` → `DATA_KHACH_HANG` (Customer — FBP/NBP membership status, One Meridian Pass ID `CJP-…`)
- `ma-giam-gia.js` → `DATA_MA_GIAM_GIA` (Discount/Promotion)
- `lich-dat-dich-vu.js` → `DATA_LICH_DAT_DICH_VU` (Booking/Session — capacity, slots)
- `so-giao-dich-diem.js` → `DATA_SO_GIAO_DICH_DIEM` (Points ledger)

## 19. Motion
100-150ms hover/click feedback, 200-300ms in-page transitions (tabs, accordion), 400-600ms modal/entrance. `ease-out` for entrance, `ease-in` for exit, no bounce/elastic. Wrapped in a `prefers-reduced-motion` guard.

## 20. v2 Retheme (2026-09-17)
**Why:** the v1 palette (`#4C5FFF` blue Primary, `#00084A` Primary-dark) filled the header nav with a solid dark block, which the user flagged as "too dark, doesn't match a bright healthcare-service brand." Colors were moved to the v2 CareJourney palette (`--primary:#4C5FFF`, `--secondary:#019770`, `--tertiary:#3E413D`, `--error:#B52836`), and the page background/nav chrome is now white — Primary/Secondary are accent-only.

**What changed (CSS-only, `assets/css/global.css` — no HTML/JS/content touched):**
- `.site-header` background flipped from a `Primary-dark→Primary` gradient fill to solid white (`--surface`) with a 1px `--tertiary-lightest` border-bottom.
- Brand compensation for the now-white header: `.brand__mark` ("CJ" square) keeps a solid `Primary→Primary-dark` gradient fill; `btn-login-header` is now a solid-Primary CTA pill (was a white button, which would have vanished on a white header); the active nav-link gets a `Primary`-colored underline + text; cart badge/avatar use `Primary`/`Secondary` fills so the header still reads as "on brand" despite the white surface.
- All headings (`h1-h4`) and emphasized/strong text (`.stat-card__value`, `.cell-strong`, `.price-now`) moved from `--primary-dark` to `--tertiary` (#3E413D), per the brief's explicit "heading/emphasized text uses Tertiary, not Primary" rule.
- Home hero band changed from a full-bleed solid `Primary-dark→Primary` gradient to a soft `--primary-lightest → --secondary-lightest` tint band, with the gradient/solid color demoted to two small decorative circle accents only (per the brief's "tint everywhere, solid gradient only as one small decorative shape" rule for hero/section bands).
- Neutral gray scale (`--gray-50…900`) rebuilt as true neutral (derived from the `--tertiary` family) instead of the old blue-tinted grays, so shadows/borders/muted text no longer carry a color cast.
- `--accent`/`--accent-dark`/`--accent-50`/`--accent-100` kept as-is (variable names) but now alias to `--secondary` values, so every existing `btn-accent`/`badge-sale`/`stat-card--accent`/switch/stepper usage repoints automatically without touching component classes.

**Signature moment (cart grouped by channel) — adjusted, still reads clearly:** the Shopping Cart / Details & Payment / My Orders / Order Status screens color-tag purchase-source groups purely via CSS custom properties (`--channel-online`, `--channel-event`, `--channel-tour`) that the JS (`gio-hang/script.js` etc.) reads inline — no JS/HTML changed. Reassigned for harmony with the new palette: **Event → Primary blue**, **Hospital Tour → Secondary teal**, **Online → Tertiary neutral slate** (previously blue/amber/purple, which no longer related to the brand family). All three are visually distinct against the white cart background and stay within the same brand family.

## 21. Progress
See `progress.md` in this folder.
