# OPR-007 — Cleaning List

**Type:** Full page
**Route:** operator/cleaning + dashed-style pretty route: operator/cleaning
**Module:** OPR = Garden/Pool Operations

## Overview
Screen for housekeeping staff to select a business unit and villa to start a cleaning round. After clicking Start, the system creates a `Cleaning` record and navigates to OPR-008 (perform cleaning by inspection point).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business unit | `business_unit_id` | Select2 | Yes | Defaults based on cookie/user permissions |
| 2 | Villa | `villa_id` | Select2 (loaded via AJAX by BU) | Yes | |
| 3 | List of previous cleaning rounds | — | Table (DataTable, AJAX data) | — | Villa, date, status, View/Continue actions |

## Functions / Actions
- **Start**: creates a new `Cleaning` record (key `cleaning_key`), navigates to `operator/cleaningDetails?id=<cleaning_key>`.
- Changing **Business unit**: reloads the corresponding villa list.
- **List table**: view/continue an in-progress cleaning round by navigating to the corresponding `operator/cleaningDetails?id=`.

## Navigation
- Entered from: the "Cleaning" menu in the sidebar.
- Leads to: OPR-008 — Perform Cleaning by Inspection Point.
