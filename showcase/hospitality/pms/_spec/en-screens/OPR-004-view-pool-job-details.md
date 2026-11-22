# OPR-004 — Pool Round Record

**Type:** Full page
**Route:** operator/poolView/:id + dashed-style pretty route: operator/pool-view/:id
**Module:** OPR = Upkeep Jobs

## Overview
Read-only screen showing the details of a completed pool job: villa information, service, personnel involved, timing, plan status, and a list of evidence photos/descriptions.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Villa | `data_array.villa.name` | Display text | |
| 2 | Service | `data_array.garden_service.name` | Display text | |
| 3 | Personnel | `data_array.operators_name` | Display text | Names concatenated from `pool_worker_ids` |
| 4 | Start/end time | `start_time`, `end_time` | Display text (H:i) | |
| 5 | Date | `start_time` | Display text (d M y) | |
| 6 | Plan | `is_planned` (Yes/No) | Display text | |
| 7 | Evidence photo table | `pool_cleaning_detail` | Table: No., Photo, Description | Source: `PoolCleaningDetail` |

## Functions / Actions
- View only; no editing actions on this screen.

## Navigation
- Entered from: the "View" (eye) icon on OPR-003 — Pool Rounds.
- Leads to: no further navigation; use the browser's back button to return to OPR-003.
