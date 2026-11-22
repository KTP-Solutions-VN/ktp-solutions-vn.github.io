# OPR-012 — Condition Check Results

**Type:** Full page
**Route:** operator/inspectionView?id= + dashed-style pretty route: operator/inspection-view
**Module:** OPR = Upkeep Jobs

## Overview
Read-only screen showing the complete results of a completed villa inspection round: the list of inspection points with evidence photos, items, areas, and descriptions.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Inspection round code | `id` (`inspection_key`) | Query string | |
| 2 | List of inspection points | `InspectionDetails` (by `inspection_key`) | Table/card list | Each point: item, area, photo, description |

## Functions / Actions
- View only; no data-editing actions on this screen (used to review history/download the report).

## Navigation
- Entered from: the "View" (eye) icon on OPR-010 — Condition Checks (applies to completed records).
- Leads to: no further navigation; return to OPR-010 using the browser back button.
