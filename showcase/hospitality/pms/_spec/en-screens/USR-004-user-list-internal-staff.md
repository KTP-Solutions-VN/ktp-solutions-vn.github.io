# USR-004 — Team Directory

**Type:** Full page

**Route:** `UserController::list($tab)` — default `user/list/:tab`

**Module:** Sign-in & Workforce

## Overview
A list of all internal staff (`User.employment = Internal`) in the system, allowing filtering by geographic location/business unit, department, status, salary type, nationality, company, and branch, among others. Used by Superadmin/Admin/Business Unit Manager to manage personnel, view alerts for work permits nearing or past expiry, and serves as the entry point for adding, editing, deleting, and viewing user details.

## Detailed Description

**List table columns:**

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Full Name | `first_name` + `family_name` | |
| 3 | Usage Name | `usage_name` | |
| 4 | Emoticon/Avatar | `emoticon` | |
| 5 | Role | `user_role` | Multiple roles possible, comma-separated |
| 6 | User Type | `user_type` | Superadmin/Admin/Business Unit Manager/Team Leader/Employee, etc. |
| 7 | Created Date | `created_at` | Format: d M Y |
| 8 | Actions | — | View/Edit/Delete |

**Filters/Search:**

| # | Field Label | Field Code | Input Type | Notes |
|---|---|---|---|---|
| 1 | List Tab | `tab_name` | Hidden/tab | Default: `users` |
| 2 | Business Unit / Geographic Area | `bu` | Select | Source: business units per user permissions + `BusinessUnitZone` |
| 3 | Department | `dept` | Select | Source: `_getEmployeeRole()`, also includes "Management" and "_Test" groups |
| 4 | Location Type (geographic/branch) | `loc` | Select | `Goegraphical_location` or by Office |
| 5 | Status | `status` | Select/Radio | Active/Inactive (last selection stored in a cookie) |
| 6 | Salary Type | `salary_type` | Select | All/Daily/Monthly |
| 7 | Nationality | `nationality` | Select | Full list of countries |
| 8 | Company | `company` | Select | Source: `Company` table |
| 9 | Subsidiary | `subsidiary_id` | Select | Source: `CompanySubsidiary` |
| 10 | Office | `user_office` | Select | Based on the currently selected business unit |
| 11 | Access Level | `access_level` | Select | Source: `_getUserType()` |
| 12 | Export Staff List | `is_download_staff_list` | Checkbox | Triggers the download action `user/downloadUserReport` (outside the scope of this screen's documentation) |

## Functions / Actions
- **Add New:** opens USR-005 (New Team Member).
- **View Details:** opens USR-007 (Team Member Profile).
- **Edit:** opens USR-006 (Edit Team Member).
- **Delete:** calls `user/delete/:id`, with a confirmation prompt before deletion (deletes related data as well: UserBusinessUnit, UserRole, UserLanguage, UserPayroll).
- **Filter/Search:** submits the filter to reload the list.
- **Export HR Report:** triggers the file download action `user/downloadUserReport` when the export flag is enabled (a download action, with no dedicated screen).
- Work permit alerts: color-coded (red/orange/green) based on the number of days remaining until the next notification deadline.

## Navigation
- Entry point: main menu "Team Directory".
- Navigates to: USR-005 (Add), USR-006 (Edit), USR-007 (Team Member Profile).
