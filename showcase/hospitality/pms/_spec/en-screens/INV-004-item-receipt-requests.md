# INV-004 — Item Receipt Requests

**Type:** Full page

**Route:** `InventoryController::itemRequest()` — `/inventory/item-request`

**Module:** INV = Inventory

## Overview
A list of item receipt requests from Villas (`InventoryItemRequest`), allowing approval to transfer items from the business unit's central inventory down to the villa.

## Detailed Description

**Display columns:**

| # | Column | Data Source | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Villa Name | `Villa.name` | |
| 3 | Item Name | `Item.name` | |
| 4 | Requested Quantity | `InventoryItemRequest.quantity` | |
| 5 | Date Created | `InventoryItemRequest.created_at` | |
| 6 | Status | `InventoryItemRequest.status` | |
| 7 | Actions | — | Approve button — shown only when the status is not `Confirmed`/`Returned` |

No dedicated filter.

## Functions / Actions
- **Approve (check mark)**: opens the INV-004-P1 popup to confirm the quantity and approve the stock transfer.

## Navigation
- Entry point: Inventory menu (`active_menu = 152`).
- Navigates to: popup INV-004-P1.
