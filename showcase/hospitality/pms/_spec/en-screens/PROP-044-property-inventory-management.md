# PROP-044 — Property Inventory Management

**Type:** Full page
**Route:** property/inventories/:villa_id
**Module:** PROP = Properties

## Overview
Page listing the inventory/supplies currently held at a Property: initial stock, available stock, and received quantity. Allows reporting damage/loss (creating a request to discard supplies sent to admin) or removing an item from the Property.

## Detailed Description

### Displayed Columns (`#zero_config` table)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | No. | — | Text | — | |
| 2 | Name | `item.name` | Text | — | Item name (via Item contain) |
| 3 | Initial Stock | `initial_stock`/`quantity` | Text | — | |
| 4 | Available Stock | `available_stock` | Text | — | |
| 5 | Received Item | `item_received` | Text | — | |
| 6 | Action | — | Icon button | — | "Damaged/Remove" icon (opens modal), "Delete" icon (opens delete modal) |

### Item Action Modal (`#exampleModal`)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Remark | `remark` | Select | No | Reason (list `$remark_array`) |
| 2 | Stock Quantity | `quantity` | Text | Yes (class `required`) | Quantity reported as damaged/discarded |
| 3 | Action (hidden) | `action` | Hidden | — | Value `delete` or `damaged` depending on the button clicked |
| 4 | Id (hidden) | `id` | Hidden | — | VillaInventory record Id |

## Functions / Actions
- "All Request" button → navigates to PROP-045 (Inventory Request) at `inventory-request/:villa_id`.
- Delete icon (`delete_inventory`) → opens a confirmation modal, submits `action=delete`: deletes the `VillaInventory` record, records an Activity Log and Inventory Log.
- Report Damage icon (`damaged`) → opens a modal to enter quantity and reason, submits `action=damaged`: creates an `InventoryDiscardRequest` record sending a discard request to admin, records a log.

## Navigation
- Opened from: PROP-035 (View Property Details) or the Property inventory management menu.
- Navigates to: PROP-045 (Inventory Request — All Request).
- Child popup: Item action modal (Delete/Damaged) — no dedicated code, an inline supporting operation.
