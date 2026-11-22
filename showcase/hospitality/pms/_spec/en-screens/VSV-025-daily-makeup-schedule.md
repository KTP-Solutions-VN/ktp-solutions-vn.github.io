# VSV-025 — Daily Refresh Rota

**Type:** Full page

**Route:** `VillaServicesController::makeupTeams()` — defaults to `/villa-services/makeup-teams`; list loaded via AJAX `makeupAjax`, status updated via AJAX `updateMakeupDetails`/`updateAllMakeupDetails`

**Module:** In-Stay Services — Housekeeping (Room Refresh)

## Overview
A daily planning table for "make-up" cleaning (light cleaning while guests are staying, as opposed to full turnover cleaning), showing which villas need make-up cleaning today based on the current guest's check-in/check-out dates, allowing users to toggle a villa into the list and view the processing progress.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date | `date_planning` | Text (datepicker) | Yes | Defaults to the current date |
| 2 | Business Unit | `business_unit_id` | Select (select2) | Yes | |

### Villa List (DataTable, AJAX-loaded)
| # | Column | Notes |
|---|---|---|
| 1 | Property | Villa name |
| 2 | Check-in | Current guest's check-in date |
| 3 | Check-out | Expected check-out date |
| 4 | Makeup Today | On/off toggle; shows a button opening VSV-025-P1 while in progress; shows a "view report" badge once completed |

## Functions / Actions
- **Toggle "Makeup Today"** (per row): marks the villa as needing make-up cleaning today.
- **View details** (while in progress/completed): opens VSV-025-P1 (`makeupTeamsDetail`) or the "Cleaning Overview" modal (Done By, Started/Ended at, Duration, Photos/Comments) depending on status.
- Changing Date/Business Unit → reloads the list.

## Navigation
- Entered from: Main menu (Daily Refresh Rota item).
- Navigates to: VSV-025-P1 (Makeup progress details).
