# VSV-016 — Cleaning Teams

**Type:** Full page

**Route:** `VillaServicesController::cleaningTeams()` — defaults to `/villa-services/cleaning-teams`; team list loaded via AJAX `cleaningTeamsAjax`, saved via `saveCleaningTeams`/`saveCleaningTeamsNew`, edited via `updateCleaningTeams`, member deletion via `deleteCleaningTeamMember` (none have a dedicated view)

**Module:** Villa Services — Cleaning

## Overview
A screen for creating and managing cleaning teams by date and by Business Unit: assigning staff (cleaners) and vehicles to each team, viewing the list of created teams, and editing/removing members.

## Detailed Description

### Team Creation Form
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date | `date_planning` | Text (datepicker) | Yes | Date the team assignment applies to |
| 2 | Business Unit | `business_unit_id` | Select (select2) | Yes | Defaults to the first BU per authorization |
| 3 | Cleaner Name | `cleaners[]` | Multi-select (select2) | Yes | List of staff with role "Cleaning" by BU, excluding already-assigned staff |
| 4 | Vehicle | `id` (vehicle) | Select (select2) | Yes | |
| 5 | Team Name | `team_name` | Text | Yes | |

Buttons: **Reset** (clears the form), **Save** (saves the new team via AJAX).

### Team List (DataTable, AJAX-loaded by selected date/BU)
| # | Column | Notes |
|---|---|---|
| 1 | Business Unit | |
| 2 | Team Name | |
| 3 | Cleaners | List of member names |
| 4 | Date | |
| 5 | Vehicle | |
| 6 | Action | Edit button (opens edit modal), Delete member |

### Edit Team Modal
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Cleaner Name | `cleaner` | Select | Yes | |
| 2 | Vehicle | `vehicle_edit` | Select | Yes | |
| 3 | Team Name | `team_name` | Text | Yes | |

## Functions / Actions
- **Save** (form above): creates a new team for the selected date/BU.
- **Reset**: clears the entry form.
- **Edit** (per row): opens a modal to edit Cleaner/Vehicle/Team Name, saved via `updateCleaningTeams`.
- **Remove member**: calls `deleteCleaningTeamMember`.
- Changing Date/Business Unit → automatically reloads the team list (AJAX `cleaningTeamsAjax`, `fetchCleanerTeamId`, `getCleanerTeamName`).

## Navigation
- Entered from: Main menu (Cleaning/Teams item).
- Navigates to: no child page (actions performed via in-place modals).
