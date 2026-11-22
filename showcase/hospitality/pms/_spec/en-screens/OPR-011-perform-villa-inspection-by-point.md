# OPR-011 — Run Condition Check

**Type:** Full page
**Route:** operator/inspectionDetails?id=&last_id= + dashed-style pretty route: operator/inspection-details
**Module:** OPR = Upkeep Jobs

## Overview
Step-by-step (point-by-point) wizard screen for staff to perform the inspection points (inspection point) of an `Inspection` round: select the inspection item (Inspection Service), area (Location Service), capture an evidence photo, with the ability to Next/Back/Reset/Update each point, and Finish to complete the entire inspection round.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Inspection round code | `url_id` (`Inspection.inspection_key`) | Query string `id` | Yes | |
| 2 | Inspection item | `id_inspection_service` | Select (list of `InspectionService`) | Yes | |
| 3 | Area | `id_location_service` | Select (list of `LocationService`) | Yes | |
| 4 | Current point | "Point N" (`inspection_point`) | Display | — | Increments with Next |
| 5 | Evidence photo | `uploaded_inspection_img` | Image upload | Yes | Saved to `InspectionDetails.uploaded_inspection_img` |
| 6 | Description | `description` | Text | No | |
| 7 | Previous point ID (backward navigation) | `last_id` | Query string | No | Used when clicking Back |

## Functions / Actions
- **Reset**: clears the data of the current point.
- **Next**: saves `InspectionDetails` (AJAX `saveInspectionDetails`/`setNextClicked`), moves to the next point.
- **Back**: returns to the previous point (AJAX `backInspection`), shown only when `ShowBackButton` = true.
- **Update**: updates a saved point (AJAX `updateInspectionDetails`).
- **Finish**: completes the inspection round (AJAX `finishInspectionDetails`).

## Navigation
- Entered from: OPR-010 (clicking Start) or continuing a draft (`fetchDraftInspection`).
- Leads to: after Finish, returns to OPR-010 — Condition Checks.
