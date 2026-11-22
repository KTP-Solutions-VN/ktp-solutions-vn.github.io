# OPR-014 — Final Prep Rounds

**Type:** Full page
**Route:** operator/makeUp + dashed-style pretty route: operator/make-up
**Module:** OPR = Upkeep Jobs

## Overview
Screen for staff to select a business unit and villa to start a "Make Up" round (final cleaning/villa preparation). Structure and flow are similar to OPR-007 (Housekeeping Rounds) but dedicated to the make-up process.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business unit | `business_unit_id` | Select2 | Yes | |
| 2 | Villa | `villa_id` | Select2 (loaded via AJAX by BU) | Yes | |
| 3 | List of previous make-up rounds | — | Table (AJAX) | — | Villa, date, status, view/continue actions |

## Functions / Actions
- **Start**: creates a new `Cleaning`/make-up record, navigates to `operator/makeupDetails?id=` (OPR-015).
- Changing **Business unit**: reloads the villa list.

## Navigation
- Entered from: the "Final Prep Rounds" menu in the sidebar.
- Leads to: OPR-015 — Final Prep Checklist.
