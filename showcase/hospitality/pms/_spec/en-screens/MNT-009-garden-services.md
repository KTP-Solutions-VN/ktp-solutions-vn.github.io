# MNT-009 — Garden Services

**Type:** Full page
**Route:** maintenance/gardenServices
**Module:** Maintenance

## Overview
Screen listing garden service categories (`GardenService.type = garden`) used to classify garden jobs. Each service has a name, illustrative image, applicable business unit(s), and status.

## Detailed Description

### Displayed Columns
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Business Unit | `business_unit_ids` → name | List of applicable BUs (JSON array) |
| 3 | Service Name | `name` | |
| 4 | Icon | `image` | Illustrative image |
| 5 | Status | `status` (active/inactive) | |
| 6 | Created By | `created_by` → `CreatedUser` | |
| 7 | Created Date | `created_at` | |
| 8 | Actions | — | Edit, Delete |

## Functions / Actions
- **Add New**: opens MNT-009-P1 — Add Garden Service.
- **Edit** (icon): opens MNT-009-P2 — Edit Garden Service.
- **Delete**: deletes the corresponding `GardenService` (`deleteGardenService`), reloads the list.

## Navigation
- Entered from: Settings/Maintenance menu in the sidebar.
- Navigates to: MNT-009-P1 (Add), MNT-009-P2 (Edit).
