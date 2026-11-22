# INV-004-P1 — Approve Incoming Stock

**Type:** Popup (opened from INV-004)

**Route:** Submits via POST to `InventoryController::itemRequest()` (`/inventory/item-request`)

**Module:** INV = Stock Control

## Overview
A modal for confirming approval of a villa's item receipt request, transferring the quantity from the business unit's central inventory down to the villa's inventory.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Quantity | `quantity` | Text/number | Yes | Defaults to the requested quantity; additionally displays a line "Total available quantity is {available_stock}" |
| 2 | (hidden) ID | `id` | Hidden | — | `InventoryItemRequest` record ID |

## Functions / Actions
- **Approve (Save)**: adds the quantity to the villa's `VillaInventory.item_received`; subtracts `available_stock` from the corresponding business unit's `InventoryStock`; records the stock transfer history in `InventoryItemMovement`; updates `InventoryItemRequest.status = Confirmed`; logs the Access Log and Inventory Item Log.
- **Cancel**: closes the modal without saving.

## Navigation
- Opened from: INV-004 (Approve button).
- After approval: reloads INV-004.
