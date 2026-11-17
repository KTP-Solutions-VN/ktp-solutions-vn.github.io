# OPR-013 — Manage In-Progress Inspection

**Type:** Full page
**Route:** operator/inspectionTaskView?id= + dashed-style pretty route: operator/inspection-task-view
**Module:** OPR = Garden/Pool Operations

## Overview
Management screen for a villa inspection round that is in progress/incomplete: review the inspection points recorded so far, continue entering additional points, or edit existing points before finishing the inspection round.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Inspection round code | `id` (`inspection_key`) | Query string | |
| 2 | List of existing inspection points | `InspectionDetails` | List/card, each point can be clicked to edit | |

## Functions / Actions
- **View/edit each point**: edits the item/area/photo/description of a recorded point.
- **Continue inspection**: navigates to OPR-011 (`inspectionDetails`) to add a new point or complete the inspection round.

## Navigation
- Entered from: the "Manage" (edit pencil) icon on OPR-010 — Villa Inspection List (applies to in-progress/draft records).
- Leads to: OPR-011 — Perform Villa Inspection by Point (to continue/complete).
