# MNT-013 — Renovation Services

**Type:** Full page
**Route:** maintenance/renovationServices
**Module:** Maintenance

## Overview
Screen listing renovation service categories (`GardenService.type = renovation`), used as reference items when planning renovation projects (REN module). Each service has a name, illustrative image, applicable business unit(s), and status.

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
- **Add New**: opens MNT-013-P1 — Add Renovation Service.
- **Edit** (icon): opens MNT-013-P2 — Edit Renovation Service.
- **Delete**: deletes the corresponding `GardenService` (`deleteRenovationService`).

## Navigation
- Entered from: Settings/Maintenance menu in the sidebar.
- Navigates to: MNT-013-P1 (Add), MNT-013-P2 (Edit).
