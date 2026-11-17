# INV-002 — Add Item to Inventory

**Type:** Full page

**Route:** `InventoryController::add()` — `/inventory/add` (POST)

**Module:** INV = Inventory

## Overview
A form for initializing a new stock record (`InventoryStock`) for a (Business Unit, Item) pair that does not yet exist in inventory.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `bussiness_unit` | Select2 | Yes | List restricted to the user's `selected_business`, if set |
| 2 | Item | `inventory` | Select2 (list of `Item`) | Yes | Duplicate check via AJAX `inventory/check-inventory` |
| 3 | Stock Quantity | `quantity` | Text/number | Yes | Assigned to both `init_stock` and `available_stock` upon creation |

## Functions / Actions
- **Save**: checks for a duplicate Business Unit + Item pair before saving; if a duplicate exists, an error is shown ("Item already exists"); if valid, saves the `InventoryStock` record, logs the Access Log + Inventory Item Log, and navigates back to INV-001.
- **Cancel**: returns to INV-001 without saving.

## Navigation
- Entry point: INV-001 ("Add New" button).
- After saving/canceling: returns to INV-001.
