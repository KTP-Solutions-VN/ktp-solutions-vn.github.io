# MNT-005 — View Maintenance Log Details

**Type:** Full page
**Route:** maintenance/view/:id
**Module:** Maintenance

## Overview
Screen displaying (readonly) the details of a maintenance log: villa information, category, description, priority, status, supporting photos, and processing history (log).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Villa | `data_array.villa.name` | Readonly text | |
| 2 | Category | `data_array.maintenance_category_id` → name | Readonly text | |
| 3 | Priority | `priority_text` | Readonly text/badge | |
| 4 | Status | `status` (Open/Pending/Closed/Rejected...) | Readonly badge | |
| 5 | Description | `description` | Readonly text | |
| 6 | Supporting Photos | `MaintenanceMedia` | Photo list | |
| 7 | Opened By / Open Date | `open_by`, `open_date`, `created_at` | Readonly text | |
| 8 | Processing History | `data_log` (`MaintenanceLog`) | Table: No., handler, comment, status, date | Includes a "Closed By/Close Date" column |

## Functions / Actions
- View only, no edit actions on this screen (navigate to Edit/Update at MNT-004 if needed).

## Navigation
- Entered from: MNT-001 — Maintenance Log List (view icon).
- Navigates to: may link to MNT-004 (Update Processing) or MNT-006 (Maintenance Cost).
