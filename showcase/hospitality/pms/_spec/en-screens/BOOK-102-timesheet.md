# BOOK-102 — Timesheet

**Type:** Full page

**Route:** Booking/timesheet (default: `/booking/timesheet`)

**Friendly route:** no dedicated route found in config/Routes.php

**Module:** Booking

## Overview

Table tracking daily clock-in/clock-out hours for all internal staff (Internal) within a business unit: clock-in/out times, GPS location, distance to the office/villa, sick leave status, and allows team leads/Superadmins to validate timesheet data.

## Detailed Description

**Filters:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | business_unit | Select | No | "All" + business units per the user's permissions/zone; writes the `default_bu` cookie when changed |
| 2 | Date | date | Text (date picker, readonly) | No | Defaults to the current date (`d-m-Y`) |

**Staff List (table):**

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Full Name | usage_name / first_name / family_name | Includes emoticon |
| 2 | Department | department | |
| 3 | Clock In | clock_in_time | Shown in blue if manually entered (manual), with "(Updated by ...)"; if not yet recorded, shows a "No" link allowing manual entry |
| 4 | Clock-in Location | clock_in_location | Link opening Google Maps |
| 5 | Clock Out | clock_out_time | "No" (red) if not yet checked out |
| 6 | Clock-out Location | clock_out_location | Link opening Google Maps |
| 7 | Validated | is_validated | "Validate" button shown once clock-out is recorded and the user has validation permission (Superadmin or `is_timesheet_validator = yes`) |
| 8 | Validated By | validated_by → validator_name | |
| 9 | Validated On | validated_on | |
| 10 | Created At | created_at | |
| 11 | Tracker | is_tracker | "Track" button opens a map modal showing the route; if on approved sick leave (`is_sick_leave`), shows a link to download the certificate; if on unpaid leave/day off (`is_user_day_off`), the column collapses to display "Day Off" |

Rows with `is_sick_leave = yes` are highlighted with an orange background.

## Functions / Actions

- Changing the Business Unit/Date submits the form to reload the page with the new filter criteria.
- Clicking the "No" cell for a missing clock-in time reveals a time input, saved via AJAX `addUserClockin` (also used to set "Day Off" via a separate button).
- The "Validate" button on each row calls AJAX `validateUser`, updating `is_validated=yes`, `validated_by`, and `validated_on` directly in the table.
- The "Track" button opens a map modal displaying `tracking_location` (the day's movement route built from office/villa coordinates).
- Link to download the sick leave certificate (when `is_certificate = yes`).

## Navigation

- Accessed from the main menu (Timesheet icon, "Booking-timesheet" item), shown based on `filterSidebar` permissions.
- Does not navigate to other pages within the Booking module; all operations are handled via AJAX directly on this page.
