# VSV-021-P1 — View Inspection Report Details (Inspection View)

**Type:** Popup (opened from VSV-021, as a dedicated page)

**Route:** `VillaServicesController::inspectionView()` — `/villa-services/inspectionView?id=<inspection_key>&keys=<list of keys, optional>`

**Module:** Villa Services — Inspection

## Overview
A page for viewing each inspection point of a report, in a sequential photo-browsing format (Previous/Next) along with the description, comments, and information on who performed it/the service/location; allows commenting, assigning tasks, or transferring an inspection point to another report.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa + inspection point | `Villa.name`, `inspection_point` | Text (read-only) | — | Title |
| 2 | By (Operator) | `user_full_name` | Text (read-only) | — | Person who performed the inspection point |
| 3 | Service | `service_image` | Text/icon (read-only) | — | Type of inspection service |
| 4 | Location | `location_image` | Text/icon (read-only) | — | Location within the villa |
| 5 | Inspection photo | `InspectionDetails.uploaded_inspection_img` | Image (read-only) | — | |
| 6 | Description | `InspectionDetails.description` | Text (read-only) | — | |
| 7 | Comment | `InspectionDetails.comment` | Text (read-only) | — | Includes commenter and date |
| 8 | Assign task info | `AssignTaskBy`, `assign_task_date` | Text (read-only) | — | Displayed if the point has been assigned a task |
| 9 | Navigation | `prevButton`/`nextButton` | Button | — | Moves between inspection points within the same report |

- If the inspection point has been transferred (`transfer_inspection_key` has a value) → only an "Inspection Link" button is displayed, leading to the destination report, instead of the usual actions.

## Functions / Actions
- **Previous / Next**: browse through the inspection points in the report.
- **Comment** (icon): opens a text field to enter a comment for the inspection point.
- **Assign Task** (icon): opens VSV-022-P1 in "add task" mode — link `/villa-services/add-inspection-task/<id>` (AJAX, no dedicated view).
- **Transfer Inspection** (icon): transfers this inspection point to another report/staff member — `/villa-services/transfer-inspection-point/<id>` (AJAX).
- **Delete** (icon, not available to Team Leader/Employee): deletes the inspection point (`deleteInspectionPoint`).

## Navigation
- Entered from: VSV-021 — the "View"/"View service details" button on each report.
- Navigates to: the destination report when the inspection point has been transferred; back to VSV-021.
