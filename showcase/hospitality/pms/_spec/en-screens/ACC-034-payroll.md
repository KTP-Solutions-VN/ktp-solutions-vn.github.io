# ACC-034 — Pay Runs

**Type:** Full page

**Route:** `AccountController::payroll()` — default `/account/payroll`

**Module:** Finance & Admin

## Overview
A list of employees (role "Employee") belonging to the selected Business Unit, used as a reference staff directory for payroll operations — it does not display payroll figures, only employee identification information.

## Detailed Description

List (DataTable `#zero_config`), retrieving `User` records with `UserBusinessUnit.user_type = Employee`, `User.status = Active`, `User.employment = Internal`, `UserRole.role_id = 27`:

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Name | `first_name family_name` | |
| 2 | Usual | `usage_name` | Preferred/usual name |
| 3 | Emoticon | `emoticon` | |
| 4 | User Type | `user_type` | |
| 5 | Created at | `created_at` (format `d M y H:i`) | |

Filter: **Business Unit** (`business_unit`) — select from BUs within user permissions (`_getAuthBasedBuVilla`), defaults to "All".

## Functions / Actions
- **Changing Business Unit:** reselecting the dropdown automatically reloads the page via GET `payroll?id=<business_unit>`, and also sets a cookie for the selected BU.
- No Add/Edit/Delete buttons on the page (the "Add new" button in the view is commented out and not active).
- The AJAX action `getUserTrackingLog()` (POST `/account/getUserTrackingLog`) exists in the controller (used to fetch `tracking_location` for a `UserClockIn` — currently hard-codes the date `2024-08-29`) but is **not called** from `payroll.ctp` or any other view/JS in the project — this appears to be leftover/dead code not yet wired into the UI.

## Navigation
- Entered from: Sidebar > Finance & Admin > Pay Runs (`active_menu = acc-payroll`).
- Navigates to: no sub-page/popup from this screen.
