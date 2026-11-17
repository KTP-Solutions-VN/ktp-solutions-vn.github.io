# BU-012 — Business Zone (Zoning)

**Type:** Full page

**Route:** `BusinessUnitController::zoning()` — default `/business-unit/zoning`

**Module:** Business Unit

## Overview
A list of "zones" created by the current user, used to group multiple Business Units together according to a custom geographic/management area.

## Detailed Description

List (DataTable `#zero_config0`):

| # | Column Name | Field code | Notes |
|---|---|---|---|
| 1 | Zone | `zone_name` | Auto-generated in the format `<usage_name>-01`, `-02`, etc. |
| 2 | Business Unit | `business_unit_ids` (JSON) → name | List of units belonging to the zone, joined by commas |
| 3 | Custom Name | `custom_name` | |
| 4 | Created Date | `created_at` | Format `d M y H:i` |
| 5 | Actions | — | Edit, Delete |

## Functions / Actions
- **Add new:** navigates to BU-013 (Add Business Zone).
- **Edit (pencil icon):** navigates to BU-014 (Edit Business Zone).
- **Delete (trash icon):** opens popup BU-012-P1 to confirm deletion (sets `is_deleted=1`, not a hard delete — zone numbers can be reused when creating a new zone, up to a maximum of 99 zones per user).

## Navigation
- Accessed from: Settings menu.
- Navigates to: BU-013 (Add), BU-014 (Edit), BU-012-P1 (delete confirmation popup).
