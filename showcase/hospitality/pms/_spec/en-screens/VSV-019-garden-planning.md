# VSV-019 — Garden Planning

**Type:** Full page

**Route:** `VillaServicesController::gardenPlanning($tab)` — defaults to `/villa-services/garden-planning/<tab>` (tab: `team-<n>` or `team-total`); data saved via AJAX `saveGardenPlanning`, loaded via `getPlanningAjax`

**Module:** Villa Services — Garden

## Overview
A planning page for assigning villas requiring garden care into time slots for each garden team, by date and Business Unit — a dedicated-page version of the "Planning" tab in VSV-017.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select | Yes | |
| 2 | Date | `date_planning` | Text (datepicker) | Yes | |
| 3 | Team tab | `u_tab` | Sub-tab | No | Switches between individual teams (`team-1`, `team-2`, ...) and the summary (`team-total`) |

### Schedule Table per Team (each slot)
| # | Column | Notes |
|---|---|---|
| 1 | Slot | Time slot order number |
| 2 | Villa | Villa assigned to the slot |
| 3 | Availability / Guest In | Whether the villa has guests or is vacant |
| 4 | Start / End / Hours | Planned time and man-hours |

### Villas Due for Care Table (for assignment into slots)
| # | Column | Notes |
|---|---|---|
| 1 | Select | Select a villa to assign |
| 2 | Villa | Villa name |
| 3 | Due Date | Date care is due |
| 4 | Available | Villa status (occupied/vacant) |
| 5 | Man Hours | Estimated man-hours |
| 6 | Slot | Slot the villa is planned to be assigned to |

## Functions / Actions
- **Switch team tab**: view the schedule of an individual team or the summary of all teams.
- **Assign villa to slot**: select a villa from the "due" table and assign it to an available slot for the team, saved via AJAX `saveGardenPlanning`.
- Changing Date/Business Unit → reloads the entire schedule and the list of villas due for care.

## Navigation
- Entered from: Main menu (Garden/Planning item), or related to the "Planning" tab in VSV-017.
- Navigates to: no child page.
