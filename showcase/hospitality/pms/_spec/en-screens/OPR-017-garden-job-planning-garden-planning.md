# OPR-017 — Garden Round Planner

**Type:** Full page
**Route:** villa-services/gardenPlanning/:tab? + dashed-style pretty route: villa-services/garden-planning
**Module:** OPR = Upkeep Jobs

> Note: the view file `garden_planning.ctp` resides in the `Operator` theme folder, but the action that executes it belongs to `VillaServicesController::gardenPlanning()`, not `OperatorController`.

## Overview
A planning board for assigning garden jobs by day to each team configured in OPR-018: select the villa requiring garden work and assign it to an available slot of a team on the planning date; view a summary of workload (man-hours) for each team and overall ("Team-Total").

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business unit | `business_unit_id` | Select2 | Yes | |
| 2 | Planning date | `planning_date` | Datepicker | Yes | Defaults to the current date |
| 3 | Villa to be planned | `villa_id` (selection checkbox) | Selection table: Select, Villa, Due Date, Available, Man Hours, Slot | Yes | List of villas with unassigned garden schedules |

### Table per team (tabs team-1, team-2, ... and Team-Total)
| # | Column | Notes |
|---|---|---|
| 1 | Slot | Slot order within the team's day |
| 2 | Villa | Villa assigned to the slot |
| 3 | Availability | Time window during which the villa is available for work |
| 4 | Start / End | Expected start/end time of the slot |
| 5 | Hours | Expected number of work hours |

## Functions / Actions
- **Select business unit / date**: reloads planning data (POST) for the selected date and BU.
- **Assign villa to slot**: select a villa from the "pending planning" table, specify the slot/team to create a `GardenJobs` record linked to `garden_teams_id` and `team_index_id`.
- **Switch team tabs (team-1, team-2, ..., Team-Total)**: view the assignment schedule for each team individually or in aggregate.

## Navigation
- Entered from: the "Garden Round Planner" menu in the sidebar (upkeep jobs group).
- Leads to: no navigation to another page; slot assignment/removal is handled directly on the page (AJAX) and generates the data displayed in OPR-002 (Garden Rounds).
