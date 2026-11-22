# OPR-018 — Garden Crew Setup

**Type:** Full page
**Route:** villa-services/gardenTeams + dashed-style pretty route: villa-services/garden-teams
**Module:** OPR = Upkeep Jobs

> Note: the view file `garden_teams.ctp` resides in the `Operator` theme folder, but the action that executes it belongs to `VillaServicesController::gardenTeams()`, not `OperatorController`.

## Overview
Screen for declaring the garden teams for a specific day and business unit: each team has a working time window (start/end time) and a list of members (gardeners) added to it; this data serves as input for OPR-017 (Garden Round Planner).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business unit | `business_unit_id` | Select2 | Yes | |
| 2 | Date | `date_planning` | Datepicker | Yes | |
| 3 | Team start time | `starttime_<n>` | Timepicker | Yes | Each team has a start/end pair |
| 4 | Team end time | `endtime_<n>` | Timepicker | Yes | |
| 5 | Team members | `member_id` (select then Add) | Select + list of added members | Yes (at least 1 per team) | Only shows users with the "Garden" role who are not already assigned to another team on the same day |

## Functions / Actions
- **Add Teams (+)**: adds a new team (empty time window + member list) to the form.
- **Add member to team**: select a user from the dropdown then add to that team's member list.
- **Remove member (trash icon)**: removes a member from the team.
- **Save**: sends AJAX `saveGardenTeams` to save the full configuration of teams/time windows/members for the selected date + BU (`GardenTeams` table, `members` column serialized).

## Navigation
- Entered from: the "Garden Crew Setup" menu in the sidebar (upkeep jobs group).
- Leads to: no navigation to another page; the data saved here is used by OPR-017 (Garden Round Planner) to assign villas to each team's slot.
