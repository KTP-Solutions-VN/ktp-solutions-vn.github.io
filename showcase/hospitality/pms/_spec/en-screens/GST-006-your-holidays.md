# GST-006 — Local Holidays

**Type:** Full page
**Route:** `Guest::yourHolidays()` — default `/guest/your-holidays`; pretty route (DashedRoute fallback): `/guest/your-holidays`
**Module:** Guest Hub

## Overview
The "Local Holidays" item in the guest navigation menu (sets `active_menu = 3`). The action only sets `title_for_layout` and `active_menu` and then renders the view, **with no other business logic or data queries**.

## Detailed Description
The view file `plugins/Welcome/src/Template/Guest/your_holidays.ctp` is currently **empty (0 bytes)** — the page content has not been implemented; accessing it only displays the default layout shell.

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|------------|---------------------|----------|---------|
| — | (no fields defined yet) | — | — | — | View not yet implemented |

## Functions / Actions
- No actions are available since the view has no content.
- A link to this action exists in the legacy sidebar element (`left-sidebar.ctp`), but this element does not appear to be embedded in the current Guest Hub layout (see the similar note under GST-005).

## Navigation
No further navigation is available since the page has no content or links.
