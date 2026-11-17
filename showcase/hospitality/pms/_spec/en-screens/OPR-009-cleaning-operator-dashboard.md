# OPR-009 — Cleaning Operator Dashboard

**Type:** Full page
**Route:** operator/cleaningOperator + dashed-style pretty route: operator/cleaning-operator
**Module:** OPR = Garden/Pool Operations

## Overview
Cleaning management dashboard for operations managers: tracks cleaning rounds that are in-progress and completed for a day/period, via 2 tabs "By Date" and "By Property"; allows quality rating, approving/handing over to the owner (release to owner), and deleting cleaning rounds/cleaning points.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Business unit | `business_unit_id` | Select2 | Sets the BU cookie |
| 2 | Date / Month-Year ("By Date" tab) | `date`, `month`, `year` | Datepicker/calendar | Defaults to the current date |
| 3 | Villa ("By Property" tab) | `property_id` | Select2 | |
| 4 | Cleaning service | `cleaning_service_id` | Select2 (`GardenService` type=cleaning) | |
| 5 | Handover status | `release_status_id` | Select (Not reviewed / Released to owner / Internal only) | |

### Displayed data blocks
| # | Block | Data Source | Notes |
|---|---|---|---|
| 1 | In-progress list | `Cleaning` by date | Includes total count |
| 2 | Completed list | `CompletedCleaning` by date | Includes total count and average supervisor rating |
| 3 | Villa statistics (photo, team) | `Villa` + `VillaImage`, `GardenTeams` | Card display per villa |

## Functions / Actions
- **By Date / By Property tabs**: switches view mode.
- **Delete cleaning round / cleaning point**: submits `page_action = cleaning_delete` or `point_delete` to delete `Cleaning`/`CleaningDetails`.
- **Rating**: AJAX `saveRating` to rate the quality of a cleaning round.
- **Release to Owner**: AJAX `releaseToOwner`, changes the handover status.
- **View cleaning points/team**: AJAX `getCleaningPointData`, `getStandardData`, `getTeam` load detailed data into the panels/blocks on the dashboard.

## Navigation
- Entered from: the "Cleaning Operator" menu (for managers) in the sidebar.
- Leads to: no fixed navigation to another page; status/rating update actions are handled via AJAX directly on the page.
