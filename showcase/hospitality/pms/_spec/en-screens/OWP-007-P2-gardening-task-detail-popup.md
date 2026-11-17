# OWP-007-P2 — Gardening Task Detail Popup

**Type:** Popup (opened from OWP-007)

**Route:** `ExternalUserController::gardenView($id)` — no dedicated friendly route, opened from OWP-007 (the "Garden" tab) in a new tab (default `/external-user/garden-view/{id}`)

**Module:** Owner Portal

## Overview

View the details of a single gardening task for a property: garden service, staff assigned, timing, scheduled status, and before/after gardening images.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property | villa.name | Text (display) | — | |
| 2 | Garden service | garden_service.name | Text (display) | — | |
| 3 | Performed by | operators_name | Text (display) | — | List of gardeners, "N/A" if empty |
| 4 | Actual start time | actual_start_time | Time (display) | — | |
| 5 | Actual end time | actual_end_time | Time (display) | — | |
| 6 | Gardening date | date | Date (display) | — | |
| 7 | Scheduled | is_planned / planned | Text (display) | — | "Yes"/"No" |
| 8 | Garden images | garden_cleaning[].images | List of images (table) | — | With descriptions |
| 9 | Image description | garden_cleaning[].description | Text (display) | — | "N/A" if empty |

## Functions / Actions

- View all gardening task details (not editable)
- Back ("close" icon → returns to the previous page)

## Navigation

- Opened from OWP-007 (the "Garden" tab, "View Details" icon on each task), opens in a new browser tab
- Back → OWP-007
