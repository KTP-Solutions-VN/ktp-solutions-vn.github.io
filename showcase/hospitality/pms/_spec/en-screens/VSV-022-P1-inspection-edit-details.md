# VSV-022-P1 — Process Inspection Items in Detail (Inspection Edit Details)

**Type:** Popup (opened from VSV-021 or VSV-022, as a dedicated page)

**Route:** `VillaServicesController::inspectionEditDetails()` — `/villa-services/inspectionEditDetails?id=<inspection_key>[&view=default|teamlead]`

**Module:** Villa Services — Inspection

## Overview
A card-based (kanban-style) processing screen for each item flagged in an inspection report: each card shows "before/after" photos, a description of the issue, the related service/location, the person responsible for handling it, and buttons to change the processing status (start, pause, complete, request re-approval, etc.). The interface and permitted actions vary by user role (Admin/BU Manager see everything and assign work; Team Leader/handling staff see only the work assigned to them).

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa / Inspection by | `Villa.name`, `Users` | Text (read-only) | — | Page header |
| 2 | Scope approval status | `InspectionManager` | Text (read-only) | — | "Confirm scope of work" or shows who confirmed it and when |
| 3 | Supervisor by department | `Cleaner/Maintenance/Purchasing/Renovation/Gardening` | Text (read-only) | — | Only shown for departments with flagged items |
| 4 | Before photo | `InspectionDetails.uploaded_inspection_img` | Image (read-only) | — | Per item card |
| 5 | After photo | `InspectionDetails.agent_uploaded_img` | Image (read-only) | — | Only shown when the Team Leader views an item that is in progress or completed |
| 6 | Description | `description` | Textarea/Text | Yes (when status = Help, entered by the Team Leader) | Read-only for other statuses |
| 7 | Select Service | `id_inspection_service_<key>` | Select (select2) | Yes (for roles other than Team Leader) | Changing the service reloads the corresponding list of responsible persons |
| 8 | Select Location | `id_location_service_<key>` | Select (select2) | Yes (for roles other than Team Leader) | |
| 9 | Operator/Agent | `agent[]` | Select (select2) | Yes (when the status allows assignment) | List by service role (Cleaning/Maintenance/Garden/Pool) or by cleaning team (Cleaning Team + date) |
| 10 | Operator Comment | — | Text (read-only) | — | Comment from the handling person upon completion/request for help |

### Action Buttons by Item Status (per card)
| # | Button | Field Code | Notes |
|---|---|---|---|
| 1 | Update | `update-btn` (value=`update`) | Saves changes to service/location/agent for the item |
| 2 | Ready | `update-btn` (value=`ready`) | Marks the item as ready for processing |
| 3 | Pause / Unpause | `pause-btn` / `unpause-btn` | Pauses/resumes processing of the item |
| 4 | Validate | `update-btn` (value=`validate`) | Confirms the item has been processed correctly |
| 5 | Rework | `delete-btn` (value=`rework`) | Requests rework |
| 6 | Delete | `delete-btn` (value=`delete`) | Removes the item from the report (`deleteInspectionPoint`) |
| 7 | Launch | `finish-btn` (value=`launch`) | Queues the item to launch processing |
| 8 | Approve (whole report) | `finish-btn` (value=`launch_approve`) | Only shown when all items are complete — approves and closes the report |

## Functions / Actions
- View details as listed in the table above; any change must be saved by clicking **Update** (a warning is shown: "Please remember to click the update button...").
- Navigate back via the back arrow button → returns to VSV-021.
- The `view=default`/`view=teamlead` parameter changes the display perspective (all items by default role, or from the Team Leader's perspective).

## Navigation
- Entered from: VSV-021 (Edit Progress) or VSV-022 (after clicking Start).
- Navigates to: back to VSV-021 after Back/Approve.
