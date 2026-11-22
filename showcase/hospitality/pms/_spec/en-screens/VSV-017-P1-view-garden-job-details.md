# VSV-017-P1 — Garden Care Visit Detail

**Type:** Popup (opened from VSV-017, as a dedicated page)

**Route:** `VillaServicesController::gardenView($id)` — `/villa-services/garden-view/<garden_job_id>`

**Module:** In-Stay Services — Garden Care

## Overview
A read-only page displaying the details of a recorded garden visit: service, operator, timing, whether it was part of the plan, along with a set of before/after photos and descriptions.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Garden Service | `GardenJobs.garden_service` | Text (read-only) | — | |
| 2 | Operators Name | `operators_name` | Text (read-only) | — | Concatenated from the `gardener_ids` list |
| 3 | Start Time | `GardenJobs.start_time` | Text (read-only) | — | |
| 4 | End Time | `GardenJobs.end_time` | Text (read-only) | — | |
| 5 | Cleaning Date | `GardenJobs.date` | Text (read-only) | — | |
| 6 | Planned | `is_planned` → `planned` | Text (read-only) | — | Yes/No |
| 7 | Photo table (before/after) | `GardenCleaning` | Photo + description table (read-only) | — | Columns: No., Image, Description |

## Functions / Actions
- No edit buttons — the page only displays already-recorded data.

## Navigation
- Entered from: VSV-017 (Reports tab) — the "view details" button on each row.
- Navigates to: back to VSV-017.
