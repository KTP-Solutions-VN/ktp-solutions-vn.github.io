# OTA-001 — OTA Channel Listing Content (Listing Content)

**Type:** Full page

**Route:** `OtaContentController::listing($platformId)` — default `/ota-content/listing/:platformId`

**Module:** Website Content (CMS) = OTA Content

## Overview
Manages the "Content Elements" (standardized descriptive text snippets) assigned to the listing section of a specific OTA channel (Booking Platform), grouped by scope: Property, Unit, Residence, Shared, Account. Accessible to Superadmin only.

## Detailed Description

List (by scope block):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Order | `order_number` (drag-and-drop) | Drag-and-drop to reorder within the same scope, saved via AJAX `reorderListing` |
| 2 | Content Element | `name` | Name of the content element |
| 3 | Group | `group_key` | description/guest/policies/location/account |
| 4 | Length | `max_length` | "Maximum {n} characters" or "No limit" |
| 5 | Actions | — | Remove from listing (opens popup OTA-001-P2) |

No search filter; data is organized into 5 fixed scope blocks.

## Functions / Actions
- **Back to platforms:** returns to the Platforms tab of the Channels screen (`BusinessUnit::channels`, outside the scope of the CMS module).
- **Select Content Elements:** opens popup OTA-001-P1 to select/deselect Content Elements available for this OTA.
- **Drag-and-drop reordering:** calls AJAX `reorderListing/:platformId` (JSON, no dedicated view).
- **Remove an element from the listing:** opens confirmation popup OTA-001-P2, calls AJAX `removeAssignment` (JSON).

## Navigation
- Accessed from: the "Platforms" tab on the Channels screen (`BusinessUnit::channels`) — outside the scope of the assigned module.
- Navigates to: OTA-001-P1 (Select Content Element), OTA-001-P2 (Confirm Deletion).
