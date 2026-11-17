# VSV-025-P1 — Makeup Progress Details (Makeup Detail View)

**Type:** Popup (opened from VSV-025, as a dedicated page)

**Route:** `VillaServicesController::makeupTeamsDetail($id, $location)` — `/villa-services/makeup-teams-detail/<villa_clean_id>/makeup`

**Module:** Villa Services — Cleaning (Make-up)

## Overview
A read-only page showing the details of a specific make-up cleaning visit: start/end journey, the person who performed it, and the set of recorded photos + notes — structured similarly to VSV-026-P1 but applied to the Make-up business process.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa + coordinates | `Villas.name`, `VillaLocations.lat/lng` | Text (read-only) | — | |
| 2 | Time / Location / Distance | `VillasClean.start_time/end_time`, `start_location/end_location` | Table (read-only) | — | |
| 3 | Done by | `Users.usage_name/first_name/emoticon` | Text (read-only) | — | |
| 4 | Photos / Comments | `CleaningDetails.uploaded_cleaning_img`, `description` | Photo + text table (read-only) | — | |

## Functions / Actions
- No edit buttons — the page only displays already-recorded data.

## Navigation
- Entered from: VSV-025 — the "view details" button on a villa currently undergoing make-up cleaning.
- Navigates to: back to VSV-025.
