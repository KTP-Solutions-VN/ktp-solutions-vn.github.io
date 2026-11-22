# INV-001-P1 — Adjust or Remove Stock

**Type:** Popup (opened from INV-001)

**Route:** Submits via POST to `InventoryController::list()` (`/inventory/list`, field `action` = `add-more` | `sub-more` | `delete`). A single modal is shared across all 3 actions.

**Module:** INV = Stock Control

## Overview
A modal for increasing/decreasing a stock quantity or permanently deleting a stock record (`InventoryStock`), opened from the (+)/(-)/Delete buttons on INV-001.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Reason | `reason` | Select | Yes (only for +/-, hidden for Delete) | "Add": Buy / Maintenance Return; "Subtract": Maintenance / Broken-Damaged |
| 2 | Quantity | `quantity` | Number | Yes (only for +/-, hidden for Delete) | For "Subtract", capped at the current `available_stock`; for "Maintenance Return", capped at `in_maintenance` |
| 3 | (hidden) ID | `id` | Hidden | — | `InventoryStock` record ID |
| 4 | (hidden) Action | `action` | Hidden | — | `add-more` / `sub-more` / `delete` |

## Functions / Actions
- **Add + reason Buy**: adds the quantity to both `init_stock` and `available_stock`.
- **Add + reason Maintenance Return**: adds to `available_stock`, subtracts from `in_maintenance`.
- **Subtract + reason Damaged**: subtracts from both `init_stock` and `available_stock` (permanent removal).
- **Subtract + reason Maintenance**: subtracts from `available_stock`, adds to `in_maintenance`.
- **Delete**: permanently deletes the `InventoryStock` record.
- Every action is recorded in the Access Log and adds an entry to the Inventory Item Log (INV-006).

## Navigation
- Opened from: INV-001 (+, -, Delete buttons on each stock row).
- After saving: reloads INV-001.
