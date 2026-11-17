# INV-001 — Inventory List

**Type:** Full page

**Route:** `InventoryController::list()` — `/inventory/list`

**Module:** INV = Inventory

## Overview
A list of inventory stock (`InventoryStock`) by business unit, allowing quantities to be added, deducted, or a stock row to be deleted.

## Detailed Description

**Display columns:**

| # | Column | Data Source | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Item Name | `Item.name` | |
| 3 | Business Unit | `BusinessUnit.name` | |
| 4 | Initial Stock | `InventoryStock.init_stock` | |
| 5 | Available Stock | `InventoryStock.available_stock` | |
| 6 | In Maintenance | `InventoryStock.in_maintenance` | |
| 7 | Date Created | `InventoryStock.created_at` | |
| 8 | Actions | — | (+), (-), Delete buttons |

No dedicated filter — displays all stock.

## Functions / Actions
- **Add New**: navigates to INV-002 (Add Item to Inventory).
- **(+) Add Stock**: opens the INV-001-P1 popup in "Add" mode (add-more).
- **(-) Reduce Stock**: opens the INV-001-P1 popup in "Subtract" mode (sub-more).
- **Delete**: opens the INV-001-P1 popup in "Delete" mode (delete).
- Every action is recorded in the Access Log and the Inventory Item Log (see INV-006).

## Navigation
- Entry point: Inventory menu (`active_menu = 151`).
- Navigates to: INV-002, popup INV-001-P1.
