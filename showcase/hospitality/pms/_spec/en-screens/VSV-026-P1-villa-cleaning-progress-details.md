# VSV-026-P1 — Turnover Progress Detail

**Type:** Popup (opened from VSV-026, as a dedicated page)

**Route:** `VillaServicesController::planningTeamsDetail($id, $location)` — `/villa-services/planning-teams-detail/<villa_clean_id>/<location>`

**Module:** In-Stay Services — Housekeeping

## Overview
A read-only page showing the details of a specific villa cleaning visit: villa location, start/end journey (time, location, distance), the person who performed it, and the set of photos + notes (comments) uploaded during the cleaning process.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa + coordinates | `Villas.name`, `VillaLocations.lat/lng` | Text (read-only) | — | |
| 2 | Time / Location / Distance | `VillasClean.start_time/end_time`, `start_location/end_location` | Table (read-only) | — | Compares the cleaning start and end points |
| 3 | Done by | `Users.usage_name/first_name/emoticon` | Text (read-only) | — | Person who performed the cleaning |
| 4 | Photos / Comments | `CleaningDetails.uploaded_cleaning_img`, `description` | Photo + text table (read-only) | — | Each row is one photographed/noted item |
| 5 | Done by Admin (if applicable) | `VillasClean.is_from_admin`, `Users` | Text (read-only) | — | Shown when the record was created/marked complete by an admin rather than field staff |

## Functions / Actions
- No edit action buttons — the page only displays already-recorded data.

## Navigation
- Entered from: VSV-026 — the "Clean" button on a villa with cleaning in progress.
- Navigates to: back to VSV-026.
