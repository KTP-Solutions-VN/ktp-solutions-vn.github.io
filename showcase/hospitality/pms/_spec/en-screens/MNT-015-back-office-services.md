# MNT-015 — Back Office Services

**Type:** Full page
**Route:** maintenance/backOfficeServices
**Module:** Maintenance

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
- **Add New**: opens MNT-015-P1 — Add Back Office Service.
- **Edit** (icon): opens MNT-015-P2 — Edit Back Office Service.
- **Delete**: deletes the corresponding `GardenService` (`deleteBackOfficeService`).

## Navigation
- Entered from: Settings/Maintenance menu in the sidebar.
- Navigates to: MNT-015-P1 (Add), MNT-015-P2 (Edit).
