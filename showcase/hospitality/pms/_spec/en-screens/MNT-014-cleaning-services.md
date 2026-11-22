# MNT-014 — Housekeeping Standards

**Type:** Full page (with inline editing via modal/expand-collapse area on the same page)
**Route:** maintenance/cleaningServices (ajax GET on the same route returns JSON search results; `maintenance/getCleaningServiceData/:id` loads edit data; `maintenance/updateCleaningService` saves edits)
**Module:** Repair Desk

## Overview
Screen for managing cleaning services (`GardenService.type = cleaning`) together with the set of "Cleaning Service Standards" attached to each service — each standard consists of a name (legend) and an illustrative icon. The page displays summary statistics (number of services, total number of standards, number of business units covered, number of services without standards) and allows editing a service and managing its standards in place (data loaded via ajax, without navigating to another page).

## Detailed Description

### Summary Statistics
| # | Metric | Field Code | Notes |
|---|---|---|---|
| 1 | Number of active services | `services_count` | |
| 2 | Total number of standards | `total_standards` | |
| 3 | Number of business units covered / Total business units | `covered_bu_count` / `total_bu_count` | |
| 4 | Number of services without standards | `needs_attention` | |

### Filters / Search
| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Keyword | `q` | Text (ajax) | Searches by service name or standard name |

### Displayed Columns (list, 10 rows per page)
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Service Image | `service_image` | |
| 2 | Service Name | `name` | |
| 3 | Business Unit | `business_unit`, `business_unit_count` | |
| 4 | Number of Standards | `standards_count` | List `standards[]` (title + icon) |
| 5 | Status | `status` | |
| 6 | Created By | `created_by` → `CreatedUser` | |
| 7 | Actions | — | Edit (opens inline edit area), Delete |

### Inline Edit Area (loaded via ajax `getCleaningServiceData`)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Service ID | `id` | Hidden | Yes | |
| 2 | Service Name | `name` | Text | Yes | |
| 3 | Service Image | `image`/`cropped_image` | Image upload (crop) | No | |
| 4 | Business Unit | `business_unit[]` | Select2 multi | Yes | |
| 5 | Status | `svc_status` | Select | Yes | |
| 6 | Standards List | `standards_json` | Dynamic builder (legend + icon per row) | No | Deletes all previous standards and re-saves the new list on submit |

## Functions / Actions
- **Add New**: navigates to MNT-014-P1 — New Housekeeping Service (a separate page, not a modal).
- **Edit** (icon): loads the service data and standards via ajax into a hidden form area on the same page; the **Update Service** button submits to `updateCleaningService` (deletes all existing `CleaningServiceStandard` records and saves them again per `standards_json`).
- **Add New Standard** (within the edit area): adds a legend + icon row to the list before Update.
- **Delete Service**: opens a confirmation modal, deletes the `GardenService` and all related `CleaningServiceStandard` records (`deleteCleaningService`).
- **Search**: calls the same route via ajax GET (`q`), returning the JSON result list.

## Navigation
- Entered from: Repair Desk settings menu in the sidebar.
- Navigates to: MNT-014-P1 (New Housekeeping Service).

## Notes
- The file `edit_cleaning_service.ctp` is a legacy standalone view that is no longer linked from the UI (the edit function has been moved to the inline area on this same page) — not documented as a separate screen.
