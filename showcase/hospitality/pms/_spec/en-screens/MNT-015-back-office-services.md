# MNT-015 — Admin Service Types

**Type:** Full page
**Route:** maintenance/backOfficeServices
**Module:** Repair Desk

## Overview
Screen listing back-office service categories (`GardenService.type = back-office`). Each service has a name, illustrative image, and status; it is applied by default to all business units when created.

## Detailed Description

### Displayed Columns
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Business Unit | `business_unit_ids` → name | |
| 3 | Service Name | `name` | |
| 4 | Icon | `image` | |
| 5 | Status | `status` | |
| 6 | Created By | `created_by` → `CreatedUser` | |
| 7 | Created Date | `created_at` | |
| 8 | Actions | — | Edit, Delete |

## Functions / Actions
- **Add New**: opens MNT-015-P1 — New Admin Service Type.
- **Edit** (icon): opens MNT-015-P2 — Edit Admin Service Type.
- **Delete**: deletes the corresponding `GardenService` (`deleteBackOfficeService`).

## Navigation
- Entered from: Repair Desk settings menu in the sidebar.
- Navigates to: MNT-015-P1 (Add), MNT-015-P2 (Edit).
