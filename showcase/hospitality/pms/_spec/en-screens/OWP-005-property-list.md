# OWP-005 — My Portfolio

**Type:** Full page

**Route:** `ExternalUserController::list()` — friendly route: `/external-user/property/list` (config/Routes.php line 107)

**Module:** Owner Hub

## Overview

List of properties (villas) owned/managed by the currently logged-in Owner or Agency Staff, filterable by business unit and active/paused status.

## Detailed Description

List — displayed columns:

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Property name | Villa.name | Link to OWP-006 |
| 3 | Latest activity | latest_activity | From the linked Maintenance table |
| 4 | Next available date | next_available_date | |
| 5 | Status | Villa.status | Open / Paused / Closed |
| 6 | Actions | — | View details |

Filters/controls:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Show active/inactive properties | paused_stop_show | Toggle button (hidden input) | No | Toggles the filter between "Open" and "Paused/Closed", saved to the user session |

## Functions / Actions

- Toggle display of active / paused-closed properties
- View property details (click a row → OWP-006)

## Navigation

- Accessed from the main menu (My Portfolio) or redirected here after login (OWP-001)
- Click a row → OWP-006 Property Snapshot
