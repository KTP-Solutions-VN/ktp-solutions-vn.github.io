# OWP-009 — Maintenance Log

**Type:** Full page

**Route:** `ExternalUserController::maintenanceLog($id)` — friendly route: `/external-user/property/log/:id` (config/Routes.php line 108)

**Module:** Owner Portal

## Overview

A list of the maintenance history of a property, displayed as an accordion by maintenance ticket, along with comments/updates over time.

## Detailed Description

List (accordion) — each item displays:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Issue description | description | Text | — | Accordion heading |
| 2 | Maintenance category | maintenance_category_id | Badge/Text | — | Looked up from MaintenanceCategory |
| 3 | Opened by | open_by | Badge/Text | — | |
| 4 | Created date | created_at | Date | — | |
| 5 | Closed by / status | close_by | Badge/Text | — | "Open" if not yet closed |
| 6 | Update comments (sub-log) | maintenance_log[].comment | Text | — | List of comments over time, with the author |

## Functions / Actions

- Expand/collapse (accordion) each maintenance ticket to view the update history
- No add/edit functionality available to the Owner (view only)

## Navigation

- Accessed from OWP-006/OWP-005 (via the friendly route `/external-user/property/log/:id`)
- No further navigation to other screens
