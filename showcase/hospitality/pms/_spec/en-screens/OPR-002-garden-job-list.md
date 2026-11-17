# OPR-002 — Garden Job List

**Type:** Full page
**Route:** operator/gardenJobList/:tab? + dashed-style pretty route: operator/garden-job-list
**Module:** OPR = Garden/Pool Operations

## Overview
Screen listing garden jobs that have been performed or are in progress, viewable via 2 tabs: "By Date" (by date, with a business unit filter) and "By Property" (by villa, with business unit + villa filters). Allows viewing details, downloading the PDF report, opening/locking owner access, and deleting records.

## Detailed Description

### Common filters
| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Business unit | `business_unit` | Select2 | Applies to both tabs; changing it reloads the page with the `business_unit` query parameter |
| 2 | Date ("By Date" tab only) | `date` (navigated via left/right arrow buttons or datepicker) | Datepicker | Defaults to the current date; filters `GardenJobs.date` |
| 3 | Villa ("By Property" tab only) | `villa` | Select2 (list of villas with `VillaDetail.is_garden = yes`) | Filters `GardenJobs.villa_id` |

### Displayed columns (both tabs; "By Property" tab additionally has a Date column)
| # | Column | Source Field Code | Notes |
|---|---|---|---|
| 1 | Property (villa) | `villa_name` | |
| 2 | Service | `garden_service_name` | Name of the garden service |
| 3 | Operator | `operators_name` | List of gardeners performing the job, concatenated from `gardener_ids` |
| 4 | Date ("By Property" tab only) | `date` | |
| 5 | Start | `start_time` (`actual_start_time`) | |
| 6 | End | `end_time` (`actual_end_time`) | |
| 7 | GPS | `gps` (OK/NOK) | Calculated from the distance between the start/end location and the villa's coordinates; > 200m results in NOK. Clicking it opens a modal with distance details |
| 8 | Plan | `planned` (Yes/No) | Based on `is_planned` |
| 9 | Actions | — | View, Download PDF, Delete, View comment |

## Functions / Actions
- **By Date / By Property tabs**: switches views (client-side, on the same page; data is pre-rendered in both the `garden_list_bydate` and `garden_list_byproperty` tables).
- **View (eye icon)**: opens OPR-016 — View Garden Job Details (`gardenView`).
- **Download PDF (download icon)**: opens the garden job report PDF (`files/garden-cleaning-pdf/...`) if a `document` exists.
- **Delete (trash icon)**: opens a delete confirmation modal (inline on the page, not a separate action); submits a hidden `is_delete=yes` + `garden_job_id`, deleting the related `GardenJobs` and `GardenCleaning` records.
- **View comment (comment icon)**: only shown when a `comment` exists; opens a tooltip/alert displaying the comment content (client-side).
- **Lock/Unlock owner access** ("owner_access" button, if present in the data): submits a hidden `is_owner_access=yes` + `button_name` (lock/unlock) to update `GardenJobs.is_access_to_owner`.
- **GPS badge**: clicking it opens a modal showing a Time / Distance to Villa table (start & end).

## Navigation
- Entered from: the "Garden" (garden operations) menu in the sidebar; or navigated back from OPR-001 after Finishing/Stopping a garden job.
- Leads to: OPR-016 — View Garden Job Details.
