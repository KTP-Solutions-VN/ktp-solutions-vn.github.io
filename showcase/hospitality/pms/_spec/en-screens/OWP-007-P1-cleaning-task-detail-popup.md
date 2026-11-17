# OWP-007-P1 — Cleaning Task Detail Popup

**Type:** Popup (opened from OWP-007)

**Route:** `ExternalUserController::planningTeamsDetail($id, $location)` — route of the form `.../planning-teams-detail/{villas_clean_id}/owner`, opened from OWP-007 (the "Cleaning" tab) in a new tab

**Module:** Owner Portal

## Overview

View the details of a single cleaning task for a property: timing, the staff member's start/end locations, distance to the property, images, and inspection notes taken after cleaning.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property name & coordinates | Villas.name + VillaLocations.lat/lng | Text (display) | — | |
| 2 | Start time | start_time | Time (display) | — | |
| 3 | Start location | start_location | Coordinates (display) | — | |
| 4 | Distance (start) | (calculated) | Number (display) | — | Distance from the start location to the property (meters) |
| 5 | End time | end_time | Time (display) | — | |
| 6 | End location | end_location | Coordinates (display) | — | |
| 7 | Distance (end) | (calculated) | Number (display) | — | Distance from the end location to the property (meters) |
| 8 | Performed by | Users.emoticon + usage_name + first_name | Text (display) | — | |
| 9 | Inspection images | CleaningDetails.uploaded_cleaning_img | List of images | — | |
| 10 | Inspection notes | CleaningDetails.description | Text (display) | — | |
| 11 | Duration | (calculated from start_time/end_time) | Text (display) | — | |
| 12 | Cleaning date | cleaned_date | Date (display) | — | |

## Functions / Actions

- View all cleaning task details (not editable)
- Close ("close" icon → returns to OWP-007, Cleaning tab)

## Navigation

- Opened from OWP-007 (the "Cleaning" tab, eye icon on each cleaning entry), opens in a new browser tab
- Close → returns to OWP-007
