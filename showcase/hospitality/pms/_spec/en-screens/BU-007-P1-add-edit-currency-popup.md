# BU-007-P1 — Add/Edit Currency Popup

**Type:** Popup (opened from BU-007)

**Route:** Static Bootstrap modal (`#exampleModal`) in `currency.ctp`; submitted via POST to the same `BusinessUnitController::currency()` action.

**Module:** Business Unit

## Overview
A shared popup for adding a new currency or editing an existing one.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Currency Name | `name` | Text | Yes | |
| 2 | Code | `code` | Text | Yes | ISO currency code |
| 3 | Country | `country_id` | Select (select2) | Yes | |
| 4 | Symbol | `sign` | Text | Yes | |
| 5 | Action (hidden) | `action` | Hidden (`add`/`edit`) | — | |
| 6 | ID (hidden) | `id` | Hidden | — | Present only when editing |

## Functions / Actions
- **Save/Update** (label changes depending on the action): saves the `Currency` record.
- **Cancel:** closes the modal without saving.

## Navigation
- Opened from: BU-007 (Currency list) — "Add new" button (Superadmin only), Edit icon on each row.
- After submission: redirects back to BU-007 (`referer()`), displays a flash message.
