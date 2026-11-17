# INV-005 — Item Discard Requests

**Type:** Full page

**Route:** `InventoryController::discard()` — `/inventory/discard`

**Module:** INV = Inventory

## Overview
A list of requests to discard/remove damaged items (`InventoryDiscardRequest`) originating at villas, allowing approval to deduct the quantity from the villa's stock.

## Detailed Description

**Display columns:**

| # | Column | Data Source | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Villa Name | `VillaInventory.Villa.name` | |
| 3 | Item Name | `VillaInventory.Item.name` | |
| 4 | Requested Quantity | `InventoryDiscardRequest.quantity` | |
| 5 | Date Created | `InventoryDiscardRequest.created_at` | |
| 6 | Status | `InventoryDiscardRequest.status` | |
| 7 | Actions | — | Approve button — shown only when the status is not `Confirmed`/`Returned` |

No dedicated filter.

## Functions / Actions
- **Approve (check mark)**: opens the INV-005-P1 popup to confirm the quantity and approve the item discard.

## Navigation
- Entry point: Inventory menu (`active_menu = 153`).
- Navigates to: popup INV-005-P1.
