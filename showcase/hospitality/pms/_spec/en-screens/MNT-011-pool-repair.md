# MNT-011 — Pool Repair

**Type:** Full page
**Route:** maintenance/poolRepair
**Module:** Maintenance

## Overview
Screen listing pool repair service categories (`GardenService.type = pool-repair`). Each service has a name, illustrative image, applicable business unit(s), and status.

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
- **Add New**: opens MNT-011-P1 — Add Pool Repair Service.
- **Edit** (icon): opens MNT-011-P2 — Edit Pool Repair Service.
- **Delete**: deletes the corresponding `GardenService` (`deletePoolRepair`).

## Navigation
- Entered from: Settings/Maintenance menu in the sidebar.
- Navigates to: MNT-011-P1 (Add), MNT-011-P2 (Edit).
