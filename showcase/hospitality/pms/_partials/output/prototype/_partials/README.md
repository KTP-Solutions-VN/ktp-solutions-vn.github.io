# Shared shell partials — copy verbatim, do not redesign

These two files are extracted directly from the anchor screens (`screens/dashboard/index.html` and the Login split-panel) after they passed QA. **Every one of the remaining screens must reuse the sidebar/topbar markup byte-for-byte** from the matching partial below — this is what keeps 579 independently-generated screens looking like one product instead of 579 slightly-different reinterpretations of a sidebar.

## Which partial to use

- **`shell-module.html`** — use this for every screen at the standard depth `screens/<module-slug>/<code-slug>/index.html` (3 levels below `output/prototype/`, i.e. two `../../` to reach `screens/`, three `../../../` to reach `assets/`). This is what ~577 of the 579 screens use.
- **`shell-dashboard.html`** — reference only; this is the as-shipped Dashboard version (2 levels deep, `../../` to assets). Do not reuse structurally for module screens — reuse `shell-module.html` instead, which already has the correct extra `../` applied.

## What to paste

Paste the full contents of `shell-module.html` right after `<body>`, replacing everything from `<div class="app-shell">` through the `</header>` that immediately precedes `<main class="page-content">`. Then continue with your own `<main class="page-content">...</main></div>` for the screen's actual content, exactly like `screens/dashboard/index.html` does after its `</header>`.

## The 3 things to change per screen — nothing else in this block

1. **Active state.** Remove `active` from the Dashboard top item's class list. Add `active` to the one `.nav-item`/`.nav-subitem` whose href matches the current screen (only if that screen has a sidebar entry per `ui-kit-brief.md` §5 — most screens, e.g. edit/view-detail/popup screens, do NOT have a sidebar entry at all and none of the nav-items should be marked active for them; leave the sidebar with no active item, but the breadcrumb still identifies the module).
2. **Open group.** Add `open` to the `.nav-group` that contains the current screen's module (or the module it belongs to even if unlisted) — e.g. a PROP screen opens the "Master Data" group. Only one group should default-open; leave the rest collapsed as shipped.
3. **Logged-in persona (rare).** The topbar user block (avatar "DT" / "Daniel Tan" / "Business Unit Manager") is correct for every internal module. For **Owner Portal** screens, swap it to the relevant mock owner from `MM.MOCK_OWNERS` (e.g. avatar "RH" / "Richard Halstead" / "Property Owner"). For **Guest Portal** screens, swap to a mock guest from `MM.MOCK_GUESTS` and consider whether that screen even keeps the full internal sidebar (guest-facing screens may reasonably use a lighter top-nav instead — use judgment per `ui-kit-qna.md`'s Public/Commercial tone note in §6 of the brief, but stay within the same color tokens).

Do not:
- Reorder, rename, add, or remove sidebar groups/items — the 12-group structure in `ui-kit-brief.md` §5 is fixed for the whole prototype.
- Re-derive the flyout markup from scratch — copy it as-is; only its `active` class (if any) changes.
- Change icon SVGs, spacing, or the floating `.sidebar-toggle` button markup/position.

## Breadcrumb & page content (not part of the partial — build per screen)

Everything from `<main class="page-content">` onward is screen-specific: breadcrumb (`Home / <Group> / <Screen Name>`, using real "Opened From" ancestry from `en-pms-sitemap.md` where applicable), page header, and body content per `reference/screen-generation-guide.md`'s per-screen-type rules.
