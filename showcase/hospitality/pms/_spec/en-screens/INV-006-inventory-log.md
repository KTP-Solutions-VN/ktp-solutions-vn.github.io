# INV-006 — Stock Movements

**Type:** Full page

**Route:** `InventoryController::logs()` — `/inventory/logs`

**Module:** INV = Stock Control

## Overview
A log of all activity related to inventory (adding/editing/deleting stock, approving receipt requests, approving discard requests, etc.), sourced from the `InventoryItemLog` table, sorted newest first.

## Detailed Description

**Display columns:**

| # | Column | Data Source | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Log Content | `InventoryItemLog.comment` | Sentence-form description of the activity (who did what, involving which item/villa/business unit) |

No dedicated filter.

## Functions / Actions
- View only — no editing or creation actions.

## Navigation
- Entry point: Stock Control menu (`active_menu = 154`).
- Does not navigate further to any other screen (the terminal screen in this flow).
