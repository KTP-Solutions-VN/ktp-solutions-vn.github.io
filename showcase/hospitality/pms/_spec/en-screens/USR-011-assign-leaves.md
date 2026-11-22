# USR-011 — Grant Time Off

**Type:** Full page

**Route:** `UserController::assignLeaves($id, $role)` — default `user/assignLeaves/:id/:role`

**Module:** Sign-in & Workforce

## Overview
A detail page allowing an additional leave period (start date - end date) to be granted to a specific staff member, while also displaying the history of their two most recent leaves and a list of other staff in the same department whose leave schedules overlap with the selected period (to avoid overlapping leave within the same department).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Leave Date Range | `leave` | Text (date-range picker) | Yes | Format "dd/mm/yyyy - dd/mm/yyyy" |
| 2 | Staff Member (hidden) | `user_id` | Hidden | — | Staff `id` (base64) passed from USR-010 |

**Display table (read-only):** staff name + 2 most recent leaves (start_date/end_date/total_days).

**Secondary table (ajax `getDepLeaveList`):** list of staff in the same department whose leave schedule overlaps with the selected date range, to help avoid granting overlapping leave.

## Functions / Actions
- **Submit:** calculates the number of leave days (`total_days`), saves a new `GrantedOff` record for the staff member, displays a success flash message, and returns to USR-010.
- Automatically checks for overlapping leave within the same department when a date range is selected (ajax).

## Navigation
- Opened from: USR-010 (the "Add Leave" button for each staff member).
- Navigates to: USR-010 (Leave History) after a successful save.
