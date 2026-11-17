# VSV-021 — Villa Inspection List

**Type:** Full page

**Route:** `VillaServicesController::inspection()` — defaults to `/villa-services/inspection`; table data loaded via AJAX `inspectionAjax`/`inspectionDetailAjax`

**Module:** Villa Services — Inspection

## Overview
A list of villa inspection reports by Business Unit/villa, allowing users to view/edit/continue a report, grant owner viewing access, archive, or delete a report.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select (select2) | Yes | Admin/Superadmin also see an "All" option |
| 2 | Property | `villa_id` | Select (select2) | No | Dynamically loaded based on the selected BU |
| 3 | Show Archive | `archieveCheck` | Checkbox | No | Shows archived reports |

### List (DataTable, AJAX-loaded)
| # | Column | Notes |
|---|---|---|
| 1 | No. | |
| 2 | Business Unit | |
| 3 | Property | |
| 4 | Task | Number of inspection items/tasks |
| 5 | Status | Report status (in progress/completed...) |
| 6 | Created By | |
| 7 | On | Creation date |
| 8 | Actions | View, Edit, Edit Progress, Unlock/Lock (owner viewing), Archive, Delete |

Each row can be expanded to show a nested table by inspection service (Service / item count / status / View button) — loaded via AJAX `inspectionDetailAjax`.

## Functions / Actions
- **View** (`view-inspection` / `view-inspection-expand`): opens VSV-021-P1 (`inspectionView`) — view report details or by individual service.
- **Edit** (`edit-inspection`): opens VSV-022 (`inspectionEdit`) — edit report setup.
- **Edit Progress** (`edit-inspection-progress`, `edit-inspection-disable*`): opens VSV-022-P1 (`inspectionEditDetails`), with variants `view=default` / `view=teamlead` depending on the user's role.
- **Unlock/Lock for owner**: POST updates `is_access_to_owner` (submits the main form, not AJAX).
- **Archive** (`archive-inspection`): confirms then calls AJAX `archieveInspection`.
- **Unarchive**: AJAX `unarchieveInspection` (when viewing the archived list).
- **Delete** (`delete-inspection`): confirms then calls AJAX to delete the report (`deleteInspectionreport`/`deleteInspection`).

## Navigation
- Entered from: Main menu (Inspection item).
- Navigates to: VSV-021-P1 (View inspection details), VSV-022 (Edit inspection setup), VSV-022-P1 (Perform/edit inspection progress).
