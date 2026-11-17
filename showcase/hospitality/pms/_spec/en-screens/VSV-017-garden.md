# VSV-017 — Garden — Overview Page

**Type:** Full page (tabbed)

**Route:** `VillaServicesController::garden($tab, $sub_tab)` — defaults to `/villa-services/garden/<tab>/<sub_tab>` (tab: `reports` | `team` | `planning`)

**Module:** Villa Services — Garden

## Overview
An overview page for managing the garden care service, consisting of 3 tabs: **Reports** (records of completed garden visits, viewable by date/by villa), **Team** (garden team list/roster), **Planning** (planning garden team assignments for villas due for care).

## Detailed Description

### Common Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` (query) | Select | No | |
| 2 | Date | `date` (query) | Date picker | No | Applies to the Reports/Planning tabs |
| 3 | Villa | `villa` (query) | Select | No | Only villas with `VillaDetail.is_garden = yes`; applies to the Reports tab |

### "Reports" Tab — "By Date" / "By Property" sub-tabs
| # | Column | Notes |
|---|---|---|
| 1 | Property | Villa name |
| 2 | Service | Type of garden service |
| 3 | Operator | Person/team who performed the service |
| 4 | Date (By Property sub-tab only) | Date performed |
| 5 | Start / End | Start/end time |
| 6 | GPS | Recorded location |
| 7 | Plan | Plan/frequency |
| 8 | Actions | View details (opens VSV-017-P1), grant/revoke owner viewing access (unlock/lock), Delete |

### "Team" Tab — Garden Team Roster
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Members select | `members-select` | Multi-select | No | Selects staff with role "Garden" by BU |

### "Planning" Tab — sub-tab per Team + "Team-Total"
| # | Column | Notes |
|---|---|---|
| 1 | Slot | Order of work time slots in the day |
| 2 | Villa | Villa requiring care (taken from villas due — `_getDueGardenVillas`) |
| 3 | Availability / Guest In | Whether the villa has guests or is vacant |
| 4 | Start / End / Hours | Planned time and man-hours |
| 5 (villas-due table) | Select / Villa / Due Date / Available / Man Hours / Slot | List of villas due for care, to be dragged/assigned into each team's slots |

## Functions / Actions
- Switch tabs/sub-tabs to view Reports, Team, Planning.
- **View details** (Reports tab, per row): opens VSV-017-P1 (`gardenView`).
- **Unlock/Lock for owner** (Reports tab): POST `is_owner_access=yes` — enables/disables owner viewing access to reports (`GardenJobs.is_access_to_owner`).
- **Delete** (Reports tab): POST `is_delete=yes` — deletes the related `GardenJobs` and `GardenCleaning` records.
- **Assign villa to slot** (Planning tab): saved via AJAX `saveGardenPlanning`.
- **Save team members** (Team tab): saved via AJAX `saveGardenTeams`.

## Navigation
- Entered from: Main menu (Garden item).
- Navigates to: VSV-017-P1 (View garden job details).
