# USR-010 — Granted Leaves

**Type:** Full page

**Route:** `UserController::grantedLeaves()` — default `user/grantedLeaves`

**Module:** Login & System Users

## Overview
A screen listing, by department, staff members along with the history of their two most recent granted leaves, and allowing a screen to be opened for assigning new leave days to each staff member (USR-011).

## Detailed Description

**Filter:**

| # | Field Label | Field Code | Input Type | Notes |
|---|---|---|---|---|
| 1 | Department | `department` | Select2 | Source: `Role` (is_show=1) |

**Data Table (ajax `getUserLeaves` for the selected department):**

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Staff Name | `first_name` | |
| 2 | 2 Most Recent Leaves | `leaves` (start_date - end_date) | 2 columns; "No Leaves" if none exist |
| 3 | Add Leave | — | Button/link opening USR-011 for the corresponding staff member |

## Functions / Actions
- **Select Department:** reloads the staff list via ajax.
- **Add Leaves:** opens USR-011 (Assign Leave Days) for the selected staff member.

## Navigation
- Entry point: Users menu → Granted Leaves, or from USR-004.
- Navigates to: USR-011 (Assign Leave Days).
