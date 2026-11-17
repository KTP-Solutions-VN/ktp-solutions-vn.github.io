# INV-005-P1 — Approve Item Discard Request

**Type:** Popup (opened from INV-005)

**Route:** Submits via POST to `InventoryController::discard()` (`/inventory/discard`)

**Module:** INV = Inventory

## Overview
A modal for confirming approval of a request to discard a damaged item at a villa, deducting the quantity from that villa's stock.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Quantity | `quantity` | Text/number | Yes | Defaults to the requested discard quantity; additionally displays a line "Total available quantity is {available_stock}" |
| 2 | (hidden) ID | `id` | Hidden | — | `InventoryDiscardRequest` record ID |

## Functions / Actions
- **Approve (Save)**: deducts the quantity from the corresponding `VillaInventory.available_stock`; updates `InventoryDiscardRequest.status = Confirmed`; logs the Access Log and Inventory Item Log.
- **Cancel**: closes the modal without saving.

## Navigation
- Opened from: INV-005 (Approve button).
- After approval: reloads INV-005.
