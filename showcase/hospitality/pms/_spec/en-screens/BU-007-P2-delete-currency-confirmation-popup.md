# BU-007-P2 — Delete Currency Confirmation Popup

**Type:** Popup (opened from BU-007)

**Route:** Static Bootstrap modal (`#exampleModal`, form section hidden) in `currency.ctp`; submitted via POST to the same `BusinessUnitController::currency()` action with `action=delete`.

**Module:** Business Unit

## Overview
A confirmation popup shown before permanently deleting a currency from the system.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Confirmation message | — | Static text | — | Displays the name of the currency to be deleted |
| 2 | ID (hidden) | `id` | Hidden | Yes | |
| 3 | Action (hidden) | `action` | Hidden (`delete`) | — | |

## Functions / Actions
- **Delete:** sends a POST to delete the `Currency` record, displays a success/error flash message.
- **Cancel:** closes the modal without deleting.

## Navigation
- Opened from: BU-007 (Currency list) — Delete icon on each row.
- After submission: redirects back to BU-007 (`referer()`).
