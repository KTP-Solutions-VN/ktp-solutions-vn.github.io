# OPR-008 — Perform Cleaning by Inspection Point

**Type:** Full page
**Route:** operator/cleaningDetails?id=&last_id= + dashed-style pretty route: operator/cleaning-details
**Module:** OPR = Garden/Pool Operations

## Overview
Step-by-step (point-by-point) wizard screen for housekeeping staff to perform the cleaning items of a `Cleaning` round: each inspection point requires an evidence photo, with the ability to click Next to move to the following point, Back to return to the previous point, Reset the current point, or Finish to complete the entire cleaning round.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Cleaning round code | `url_id` (`Cleaning.cleaning_key`) | Query string `id` | Yes | Identifies the cleaning round in progress |
| 2 | Current point | "Point N" (`cleaning_point`) | Display (heading) | — | Increments with each Next step |
| 3 | Cleaning point evidence photo | `uploaded_cleaning_img` | Image upload | Yes (to click Next/Finish) | Saved to `CleaningDetails.uploaded_cleaning_img` |
| 4 | Description (if any) | `description` | Text | No | |
| 5 | Previous point ID (backward navigation) | `last_id` | Query string | No | Used when clicking Back |

## Functions / Actions
- **Reset**: clears the entered data for the current point.
- **Next**: saves `CleaningDetails` for the current point (AJAX `saveCleaningDetails`/`setNextClickedCleaning`), moves to the next point.
- **Back**: returns to the previous point (AJAX `backCleaning`), shown only when `ShowBackButton_cleaning` = true.
- **Update**: updates the saved data of a point (AJAX `updateCleaningDetails`), used when editing an already-completed point.
- **Finish**: completes the cleaning round (AJAX `finishCleaningDetails`), changes `Cleaning` to completed status.

## Navigation
- Entered from: OPR-007 (clicking Start) or continuing an in-progress cleaning round from the list.
- Leads to: after Finish, returns to OPR-007 — Cleaning List.
