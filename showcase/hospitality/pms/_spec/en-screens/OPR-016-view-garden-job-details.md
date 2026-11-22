# OPR-016 — Garden Round Record

**Type:** Full page
**Route:** operator/gardenView/:id + dashed-style pretty route: operator/garden-view/:id
**Module:** OPR = Upkeep Jobs

## Overview
Read-only screen showing the details of a completed garden job: villa information, garden service, personnel (gardener), timing, and plan status. Similar to OPR-004 (Pool Round Record) but applied to garden jobs.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Villa | `data_array.villa.name` | Display text | |
| 2 | Garden service | `data_array.garden_service.name` | Display text | |
| 3 | Personnel | `data_array.operators_name` | Display text | Names concatenated from `gardener_ids` |
| 4 | Start/end time | `start_time`, `end_time` | Display text | |
| 5 | Plan | `is_planned` (Yes/No) | Display text | |
| 6 | Evidence photo table | `garden_cleaning` | Table: No., Photo, Description | Source: `GardenCleaning` |

## Functions / Actions
- View only; no editing actions on this screen.

## Navigation
- Entered from: the "View" (eye) icon on OPR-002 — Garden Rounds.
- Leads to: no further navigation; return to OPR-002 using the browser back button.
