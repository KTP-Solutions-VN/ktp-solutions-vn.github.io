# INV-003 — Adjust Stock

**Type:** Full page

**Route:** `InventoryController::edit($id)` — `/inventory/edit/:id` (`id` is base64-encoded in the URL; POST to save)

**Module:** INV = Stock Control

## Overview
A form for editing an existing stock record (`InventoryStock`): changing the business unit, changing the item, or adjusting the initial stock quantity.

> Note: the controller and view for this screen exist in full, but the "Edit" button on INV-001 is currently commented out in the UI (`plugins/VillaManagement/src/Template/Inventory/list.ctp`, line ~96), so this screen is only accessible directly via the URL `/inventory/edit/{base64(id)}`.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `bussiness_unit` | Select2 | Yes | Defaults to the current value |
| 2 | Item | `inventory` | Select2 (list of `Item`) | Yes | Defaults to the current value; duplicate check via AJAX `inventory/check-inventory` |
| 3 | Stock Quantity | `quantity` | Text/number | Yes | Defaults to the current `init_stock`; the new value must be ≥ the quantity already used (`init_stock - available_stock`), otherwise an error is shown and the change is not saved |

## Functions / Actions
- **Save**: checks for a duplicate Business Unit + Item pair against other records; updates the `InventoryStock` record (adjusting `available_stock` by the quantity difference); logs the Access Log + Inventory Item Log; navigates back to INV-001.
- **Cancel**: returns to INV-001 without saving.

## Navigation
- Entry point: currently no direct link exists on the INV-001 UI (see note above).
- After saving/canceling: returns to INV-001.
