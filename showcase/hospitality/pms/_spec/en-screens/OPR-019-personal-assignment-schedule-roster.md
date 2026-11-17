# OPR-019 — Personal Assignment Schedule (Roster)

**Type:** Full page
**Route:** operator/roster + dashed-style pretty route: operator/roster
**Module:** OPR = Garden/Pool Operations

## Overview
Screen for housekeeping staff (cleaner) to look up their own team assignment schedule for today and tomorrow: displays status as assigned (with team name/member count/vehicle), pending assignment, on weekly day off (weekoff), or no data available (empty).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Date (today/tomorrow) | `dates` | Display text (d M Y) | Fixed at 2 days: today, tomorrow |
| 2 | Assignment status | `status` (assigned/pending/weekoff/empty) | Display text + color | Derived from `CleanerTeams`, `CleanerMembers`, `InspectionDetails`, `WeeklyOff` of the currently logged-in user |
| 3 | Team name | `team_name` | Display text | Only when assigned |
| 4 | Number of members | `tota_members` | Display text | Only when `assigned` |
| 5 | Vehicle | `vehicle` (license plate) | Display text | Only when the team has an assigned vehicle |

## Functions / Actions
- View only; no editing actions — this is a personal lookup screen.

## Navigation
- Entered from: the "Roster" menu in the sidebar (for housekeeping staff).
- Leads to: no further navigation.
