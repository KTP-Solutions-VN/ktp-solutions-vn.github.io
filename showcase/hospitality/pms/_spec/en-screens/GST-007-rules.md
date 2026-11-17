# GST-007 — Rules

**Type:** Full page
**Route:** `Guest::rules()` — default `/guest/rules`; pretty route (DashedRoute fallback): `/guest/rules`
**Module:** Guest Portal

## Overview
The "Rules" item in the guest navigation menu (sets `active_menu = 4`). The action only sets `title_for_layout` and `active_menu` and then renders the view, **with no other business logic or data queries**.

## Detailed Description
The view file `plugins/Welcome/src/Template/Guest/rules.ctp` is currently **empty (0 bytes)** — the page content has not been implemented; accessing it only displays the default layout shell.

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|------------|---------------------|----------|---------|
| — | (no fields defined yet) | — | — | — | View not yet implemented |

## Functions / Actions
- No actions are available since the view has no content.
- Technical note: this action's `title_for_layout` value (`staticText['rules_text']`) appears to be reused (likely due to copy-pasted code) as the title for several other actions in the same controller (`bookings`, `accessPortal`, `restaurants`, `restaurant`, `landmark`) — this does not affect the displayed content since those views build their own banners, but it is worth flagging during a code review/refactor.

## Navigation
No further navigation is available since the page has no content or links.
