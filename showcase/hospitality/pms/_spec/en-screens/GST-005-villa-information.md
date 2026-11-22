# GST-005 — Property Guide

**Type:** Full page
**Route:** `Guest::property()` — default `/guest/property`; pretty route (DashedRoute fallback): `/guest/property`
**Module:** Guest Hub

## Overview
The "Property Guide" item in the guest navigation menu (sets `active_menu = 2`). The action only sets `title_for_layout` and `active_menu` and then renders the view, **with no other business logic or data queries**.

## Detailed Description
The view file `plugins/Welcome/src/Template/Guest/property.ctp` is currently **empty (0 bytes)** — the page content has not been implemented; accessing it only displays the default layout shell (no header/banner/content as seen on other pages in this module).

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|------------|---------------------|----------|---------|
| — | (no fields defined yet) | — | — | — | View not yet implemented |

## Functions / Actions
- No actions are available since the view has no content.
- Technical note: a link to this action exists in the element `plugins/Welcome/src/Template/Element/left-sidebar.ctp` (a sidebar menu with 4 items: My Reservations, Property Guide, Local Holidays, Stay Policies, driven by `active_menu`), but this element **does not appear to be included** in the `Welcome/Layout/default.ctp` layout currently used by the Guest Hub (a mobile-first interface with Home/Logout icons) — this is likely a legacy navigation menu that was never cleaned up or never wired into the new interface.

## Navigation
No further navigation is available since the page has no content or links.
