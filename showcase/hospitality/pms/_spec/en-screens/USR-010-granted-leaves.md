# USR-010 — Leave History

**Type:** Full page

**Route:** `UserController::grantedLeaves()` — default `user/grantedLeaves`

**Module:** Sign-in & Workforce

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
- **Add Leaves:** opens USR-011 (Grant Time Off) for the selected staff member.

## Navigation
- Entry point: Workforce menu → Leave History, or from USR-004.
- Navigates to: USR-011 (Grant Time Off).
