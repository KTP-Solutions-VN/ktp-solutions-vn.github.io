# VSV-026 — Turnover Cleaning Rota

**Type:** Full page

**Route:** `VillaServicesController::planningTeams()` — defaults to `/villa-services/planning-teams`; villa/status list loaded via AJAX `planningTeamsAjax`, "Clean Today" status updated via AJAX `updateCleaningDetails`

**Module:** In-Stay Services — Housekeeping

## Overview
A daily villa cleaning planning table: shows which villas need cleaning today based on the most recent check-out/next check-in date, allows toggling a villa into the cleaning list, and shows cleaning status (not started/in progress/cleaned/reported).

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date | `date_planning` | Text (datepicker) | Yes | Defaults to the current date |
| 2 | Business Unit | `business_unit_id` | Select (select2) | Yes | Defaults to the first BU per authorization |
| 3 | Select All | `select_all` | Checkbox | No | Toggles all displayed villas on/off for the operator |

### Villa List (DataTable, AJAX-loaded by date/BU)
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Property | `Villas.name` | |
| 2 | Last Check-out | — | Most recent check-out date |
| 3 | Next Check-in | — | Next check-in date |
| 4 | Clean Today | `cleaning_status`, `villa_clean_id` | On/off toggle (not yet processed); if cleaning is in progress (`cleaning_status=3`) shows a "Clean" button opening VSV-026-P1; if already reported (`cleaning_status=4`) shows a "Cleaning Reported" badge |

## Functions / Actions
- **Toggle "Clean Today"** (per row): on = marks the villa as needing cleaning today (calls `updateCleaningDetails`); off = removes it from the list.
- **"Clean" button** (while in progress): opens VSV-026-P1 (`planningTeamsDetail`) showing cleaning progress details.
- **"Cleaning Reported" badge** (once completed): opens the "Cleaning Overview" modal in place — showing Done By, Started at, Ended at, Duration, Start/End location, and a Photos/Comments table.
- Changing Date/Business Unit → automatically reloads the list.

## Navigation
- Entered from: Main menu (Turnover Cleaning Rota item), or VSV-016 (related to the cleaning team topic).
- Navigates to: VSV-026-P1 (Villa cleaning progress details).
