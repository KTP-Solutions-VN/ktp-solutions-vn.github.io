# PROP-045 — Stock Requests

**Type:** Full page
**Route:** property/inventory-request/:villa_id
**Module:** PROP = Property Records

## Overview
Page listing all Inventory Item Requests submitted for a Property, allowing a request to be deleted (if not yet confirmed/returned) or confirmed as returned to the Azura warehouse (Return), automatically updating the related stock.

## Detailed Description

### Displayed Columns (`#zero_config` table)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | No. | — | Text | — | |
| 2 | Villa Name | `villa.name` | Text | — | Via Villa contain |
| 3 | Item Name | `item.name` | Text | — | Via Item contain |
| 4 | Quantity Requested | `quantity` | Text | — | |
| 5 | Status | `status` | Text | — | Pending/Confirmed/Returned |
| 6 | Requested Date | `created_at` (or equivalent) | Text | — | |
| 7 | Action | — | Icon button | — | Delete icon (only shown when status is other than Confirmed/Returned), Return icon (only shown when status = Confirmed) |

## Functions / Actions
- Delete icon (`delete_inventory`) → opens a confirmation modal, submits `action=delete`: deletes the `InventoryItemRequest` record, records an Activity Log/Inventory Log.
- Return-to-warehouse icon (`return_inventory`, `fa-reply`) → opens a modal to enter the returned quantity, submits `action=return`: decreases `item_received` in `VillaInventory`, increases `available_stock` in `InventoryStock`, creates an `InventoryItemMovement` record (from villa back to warehouse), updates the request status to "Returned", records a log.

## Navigation
- Opened from: PROP-044 (On-site Stock) — "All Request" button.
- Navigates to: No navigation to another page (redirects back to the same page after processing).
- Child popup: Delete/Return modal (no dedicated code, an inline supporting operation).
