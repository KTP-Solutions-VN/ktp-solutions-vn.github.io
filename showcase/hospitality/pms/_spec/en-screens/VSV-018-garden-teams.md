# VSV-018 — Garden Teams

**Type:** Full page

**Route:** `VillaServicesController::gardenTeams()` — defaults to `/villa-services/garden-teams`; saved via AJAX `saveGardenTeams`

**Module:** Villa Services — Garden

## Overview
A screen for setting up shifts and members for garden teams by date and Business Unit: each team has a start/end time, break duration, and a list of assigned staff.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select (select2) | Yes | |
| 2 | Date | `date_planning` | Text (datepicker, with back/forward arrow buttons) | Yes | |

### Each Team, Repeated for the Number of Existing Teams
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Start | `starttime_<n>` | Text (timepicker) | Yes | Shift start time |
| 2 | End | `endtime_<n>` | Text (timepicker) | Yes | Shift end time |
| 3 | Break (Hr) | `pause_<n>` | Text (number) | Yes | Number of break hours during the shift |
| 4 | Members | — | Display list + "+" button to add | No | Opens the "Add Member" modal |

### Add Member Modal
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Members | `members-select` | Select (dynamically loaded from `users` — staff with role "Garden" by BU) | Yes | |
| 2 | Team id (hidden) | `team-id` | Hidden | — | |

## Functions / Actions
- **Add Teams** (the "+" button at the end of the list): adds a new team to the form.
- **Add Member** (per team): opens the modal to select a member to assign to the team.
- **Save** (in the modal): saves the member to the team.
- **Validate**: submits all shift schedules and team members (AJAX `saveGardenTeams`).
- Changing Date/Business Unit → reloads the team data for the corresponding date/BU.

## Navigation
- Entered from: Main menu (Garden/Teams item), or related to the "Team" tab in VSV-017.
- Navigates to: no child page (actions performed via in-place modals).
