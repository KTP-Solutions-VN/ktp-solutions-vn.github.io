# OPR-003 — Pool Rounds

**Type:** Full page
**Route:** operator/pools/:tab? + dashed-style pretty route: operator/pools
**Module:** OPR = Upkeep Jobs

## Overview
Screen listing pool cleaning/maintenance jobs that have been performed, viewable via 2 tabs: "By Date" (by date) and "By Property" (by villa), with business unit + date/villa filters. Structure and behavior are similar to OPR-002 (Garden Rounds) but applied to pools.

## Detailed Description

### Common filters
| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Business unit | `business_unit` | Select2 | Applies to both tabs; changing it reloads the page with the `business_unit` query parameter and also sets a business unit cookie |
| 2 | Date ("By Date" tab) | `date` | Datepicker, left/right arrow buttons | Defaults to the current date; filters by `PoolCleaning.start_time` |
| 3 | Villa ("By Property" tab) | `villa` | Select2 (villas with `VillaDetail.is_pool = yes`, status Open) | Filters `PoolCleaning.villa_id` |

### Displayed columns (both tabs; "By Property" tab additionally has a Date column)
| # | Column | Source Field Code | Notes |
|---|---|---|---|
| 1 | Property (villa) | `villa.name` | |
| 2 | Service | `garden_service.name` | |
| 3 | Operator | `operators_name` | Concatenated from `pool_worker_ids` |
| 4 | Start | `start_time` | |
| 5 | End | `end_time` | |
| 6 | GPS | `gps` (OK/NOK) | Clicking it opens a modal showing start/end distance to the villa's coordinates |
| 7 | Plan | `is_planned` (Yes/No) | |
| 8 | Actions | — | View details, Download PDF, Delete |

## Functions / Actions
- **By Date / By Property tabs**: switches views (data pre-rendered in both tables via the `operator/pool/by_date` and `operator/pool/by_property` elements).
- **View details (eye icon)**: opens OPR-004 — Pool Round Record (`poolView`).
- **Download PDF (download icon)**: downloads the report file if one exists.
- **Delete (trash icon)**: submits a hidden `is_delete=yes` via the `action_form` form, deleting the related `PoolCleaning` record (with a confirmation modal `exampleModal`).
- **GPS badge**: opens the `gps_modal` showing a Time / Distance to Villa table.

## Navigation
- Entered from: the "Pool Rounds" (upkeep jobs) menu in the sidebar.
- Leads to: OPR-004 — Pool Round Record.
