# MNT-001 — Repair Requests

**Type:** Full page
**Route:** maintenance/list
**Module:** Repair Desk

## Overview
Screen listing maintenance logs (Maintenance log) that are open/pending (status Open/Pending), viewable across 4 tabs: Property (by villa), Priority (by priority level), Due Date (by due date), Areas (by area). Includes an advanced search form (POST submit, "search" tab) filtering by multiple criteria.

## Detailed Description

### Search Filters (search form)
| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Area | `area_id` | Select | When selected, automatically retrieves the list of villas within the area (ajax `getAreaVilla`) if no specific villa is selected |
| 2 | Villa | `villa_id` | Select | Filters `Maintenance.villa_id IN` |
| 3 | Category | `maintenance_category_id` | Select (`MaintenanceCategory` list) | Filters `Maintenance.maintenance_category_id` |
| 4 | Opened By | `open_by` | Select (user list) | Filters `Maintenance.open_by` |
| 5 | Closed By | `close_by` | Select (user list) | Filters `Maintenance.close_by` |
| 6 | Open Date | `open_date` | Text/Datepicker | Filters by `substr(open_date,1,10)` |

### Displayed Columns/Cards (each tab, grouped by villa)
| # | Column | Source Field Code | Notes |
|---|---|---|---|
| 1 | Villa | `villa.name` | |
| 2 | Category | `maintenance_category_id` → category name | |
| 3 | Priority | `MaintenancePriority.name/color` | Displays a color badge per `MaintenancePriority.color` |
| 4 | Assignee | `user.emoticon`/`user_id` | Emoticon icon of the assigned handler; sad-face icon if unassigned |
| 5 | Due Date | `due_date` | Formatted as `d M`; highlighted in red if overdue |
| 6 | Next Availability Date | `next_availability` | Calculated from the villa's booking calendar (nearest available date) |
| 7 | Area (Areas tab only) | `area` | Retrieved via `VillaLocation` |

## Functions / Actions
- **4 Tabs**: switch views client-side (data `data_v`, `data_p`, `data_d`, `data_a` pre-rendered according to 4 different sort orders: by villa, by priority, by due date, by area).
- **Search**: submits a POST form, results grouped by villa (`search_data`), displayed on the "search" tab.
- **Add New** ("+" button): opens MNT-002 — New Repair Request.
- **Click on a row/card**: depending on status — opens MNT-003 (Accept/Reject, if status is Pending) or MNT-004 (Update Processing, if status is Open/already accepted).

## Navigation
- Entered from: "Repair Requests" menu in the sidebar.
- Navigates to: MNT-002 (Add New), MNT-003 (Accept Task), MNT-004 (Process), MNT-005 (View Details).
