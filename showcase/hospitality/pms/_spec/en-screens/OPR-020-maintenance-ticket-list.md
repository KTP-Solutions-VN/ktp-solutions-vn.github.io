# OPR-020 — Field Repair Reports

**Type:** Full page
**Route:** operator/maintenance + dashed-style pretty route: operator/maintenance
**Module:** OPR = Upkeep Jobs

## Overview
Screen listing published maintenance tickets (`status = publish`), filtered by business unit, with a count badge per BU, pagination, quick-view details via modal, and navigation to create/edit tickets.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Business unit | `bu_id` | Tab/count badge per BU | Filters `MaintenanceTicket.business_unit_id`; the total ticket count is shown in `totalCount` |

### Displayed columns
| # | Column | Source Field Code | Notes |
|---|---|---|---|
| 1 | Ticket | `ticket_number` | Ticket code (format `M000001`) |
| 2 | BU | `business_unit.name` | |
| 3 | Villa | `villas.name` | |
| 4 | Issue | `maintenance_subcategories`/`maintenance_problem_option` | Issue/problem |
| 5 | Priority | `final_priority_id` (via `MaintenancePriorities`) | Color-coded by priority level |
| 6 | Status | `status` | |
| 7 | Updated | `modified` | |
| 8 | Actions | — | Quick view (modal), Edit/Manage |

## Functions / Actions
- **+ New Ticket**: navigates to OPR-021 — Report Field Repair.
- **Quick view (MaintenanceView modal)**: displays ticket details (description, tried/checked, etc.) directly on the page without leaving it.
- **Edit/Manage (pencil icon)**: navigates via `window.location.href = editMaintenanceTicket/btoa(ticketId)` — opens OPR-022.
- **Filter by BU**: switches tab/area to filter the list and refresh pagination (AJAX, `disableAutoLayout` on AJAX requests).

## Navigation
- Entered from: the "Field Repair Reports" menu in the sidebar.
- Leads to: OPR-021 — Report Field Repair; OPR-022 — Manage Field Repair.
