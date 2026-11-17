# ACC-033 — Timesheet

**Type:** Full page

**Route:** `AccountController::timesheet()` — default `/account/timesheet`

**Module:** Accounting & HR

## Overview
Tracks daily clock-in/clock-out times for all internal employees (`employment = Internal`, `is_clock_in = yes`, excluding Superadmin and test staff) by Business Unit and by day; allows authorized users to validate clock times, manually correct clock-in times, and view the GPS location at clock-in/clock-out as well as the daily movement route on a map.

## Detailed Description

List (DataTable `#zero_config`, data grouped by `Department.name` then `User.usage_name`, retrieving only `UserClockIn` records for the day being viewed):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Name | `emoticon` + `usage_name` + `first_name family_name` | |
| 2 | Department | `department.name` | |
| 3 | Clock in | `user_clock_in.clock_in_time` (format `H:i`) | Shown in green + "(Updated by &lt;editor&gt;)" if `is_manual_clockin = yes`; merged cell (colspan 4) showing "Day off" if `is_user_day_off = yes`; shows "Sick leave" if `is_sick_leave = yes`; if no clock-in time exists and the viewer is Superadmin/Admin/Business Unit Manager/HR, shows a "No" link (red) to enter the time manually |
| 4 | Location (clock-in) | `user_clock_in.clock_in_location` | Link opening Google Maps + distance to the office (m) if calculable |
| 5 | Clock out | `user_clock_in.clock_out_time` (format `H:i`) | "No" (red) if not yet clocked out |
| 6 | Location (clock-out) | `user_clock_in.clock_out_location` | Google Maps link + distance (m) |
| 7 | Validated | `user_clock_in.is_validated` | "Yes" if validated; if not validated and clock-out time exists and the viewer has validation rights (`show_validate_button`), shows a "Validate" button |
| 8 | By | `user_clock_in.validator_name` | Name of the validator |
| 9 | On | `user_clock_in.validated_on` (format `d M y`) | Validation date |
| 10 | Created at | `user_clock_in.created_at` (format `d M y H:i`) | |
| 11 | Tracker | — | Shown only for Superadmin/Admin/Business Unit Manager: "Track" button (opens the route-tracking map modal `tracking_location`) if `is_tracker = yes`; or "Day off"/sick-leave certificate download link/"User tracking not enabled." (link to the User edit page) depending on status |

Filters above the table:
- **Business Unit** (`business_unit`): select "All" + list of BUs/zones per user permissions (`_getAuthBasedBuVilla`).
- **Date** (`date`): text + datepicker `dd-mm-yyyy`, defaults to today, future dates disabled (`endDate: new Date()`).

## Functions / Actions
- **Search:** submits GET, reloads the page with the selected `business_unit` + `date`.
- **Manually entering clock-in time:** click the "No" link (red) in the Clock in column → a time-picker appears → select a time → AJAX POST `/account/add-user-clockin` (action `addUserClockin`, no dedicated view) saves/updates `UserClockIn.clock_in_time`, marks `is_manual_clockin = yes`, sets `modified_by` to the editor.
- **Marking a day off:** a "Day off" button appears in the time-picker toolbar → calls the same AJAX `add-user-clockin` with `clock_in_time = user_day_off` to set `is_user_day_off = yes`.
- **Validate:** "Validate" button on an employee's row → AJAX POST `/account/validateUser` (action out of scope for this document) sets `is_validated = yes`, `validated_by`, `validated_on = today`.
- **Track:** opens a map modal (Google Maps) showing the GPS points recorded that day (`tracking_location`) along with the clock-in/clock-out locations.
- **Downloading sick-leave certificate:** link to download the `certificate` file when `is_sick_leave = yes` and `is_certificate = yes`.
- The `getUserWorkingStatus` AJAX action is **not** used on this screen (it is used on ACC-042 — Daily Wage).

## Navigation
- Entered from: Sidebar > Account & HR > Timesheet (`active_menu = acc-timesheet`).
- Navigates to: no dedicated popup page; Track/time-entry actions are all handled via modal/AJAX on the same page. The "User tracking not enabled." link opens the User edit page (`User::edit`) in a new tab.
