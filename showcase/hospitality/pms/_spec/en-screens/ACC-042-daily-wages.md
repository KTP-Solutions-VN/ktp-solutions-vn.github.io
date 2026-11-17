# ACC-042 — Daily Wages

**Type:** Full page

**Route:** `AccountController::dailyWages()` — default `/account/daily-wages`

**Module:** Accounting & HR

## Overview
Calculates and pays daily wages for employees with `salary_type = daily` within a specific wage period (`WagePeriod`), based on time-clock data (`UserClockIn`); after calculation, confirms payment to save a snapshot into `UserSalary` and allows exporting to Excel.

## Detailed Description

The page has 2 display states depending on whether the wage period has been paid or not (`is_data_paid`, determined by whether a `UserSalary` record already exists for that period):

**A. NOT YET paid period** — a working table listing employees with `UserPayroll.salary_type = daily`, grouped by Business Unit:

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | NB | `employee_number` | |
| 2 | Name | `title first_name family_name` | |
| 3 | Nickname | `usage_name` | |
| 4 | Department | `department_id` → department name | |
| 5 | Starting Date | `user.starting_date` (format `d M y`) | |
| 6 | Months | calculated from `starting_date` to today | |
| 7 | Nationality | `user.nationality` | |
| 8 | Daily | `user_payroll.amount` (number format) | |
| 9+ | (date columns) | rendered dynamically after clicking **Calculate** | One column per day in the period, color-coded status per `getUserWorkingStatus` |

**B. Already-paid period** — read from `UserSalary` (the snapshot saved at payment time): adds a **Wages** column (`salary`) and a **Days** column (`working_days`) compared to table A, plus a "Grand total" row; the heading shows "Paid on &lt;date&gt;".

Filter:
- **Business Unit** (`business_unit`)
- **Wage Frequency** (`wage_frequency`): Bi-Monthly/Monthly
- **Period** (`period`): list of `WagePeriod` records that have started (`start_date <= today`) for the selected BU + frequency, defaulting to the latest period

Working-status column (`working_status`, color-coded):
- `OK` (green/orange depending on validation) — valid clock-in/out at the office
- `EXT` (green/orange) — clocked in outside the office (via Google Maps link)
- `SL` (green if supported by documentation, orange if not) — sick leave, counted up to 30 days/year with supporting documents or 3 days/year without
- `OFF` (green) — registered day off
- `ABS` (red) — no clock-in data

## Functions / Actions
- **Change Business Unit / Wage Frequency / Period:** automatically reloads the page with the corresponding query parameters.
- **Calculate:** AJAX POST to `/account/get-user-working-status` (action `getUserWorkingStatus`) — computes the `working_status` for each day in the period for every employee with `salary_type = daily` based on `UserClockIn`, calculates the number of working days and total wages (`working_days × daily_wage`); renders the additional dynamic date columns into the table along with hidden inputs (`working_status`, `working_days`, `salary`) to prepare for the payment submission. Shown only in state A.
- **To Pay:** enabled (`is_to_pay = true`) only when the wage period has ended or is ending and has not yet been paid, and only after Calculate has been clicked; opens a confirmation modal → submits a POST that saves a snapshot into the `UserSalary` table (`is_to_paid = yes`, `paid_on = today`, `paid_by = current user`) then reloads the page in state B.
- **Download** (shown only in state B): submits the `export_form` → the server exports an `.xlsx` Excel file (PHPExcel library, file name `WAGE-<BU code>-<period end date>.xlsx`), using the helper function `getExcelColumnName()` to compute Excel column names.

## Navigation
- Entered from: Sidebar > Account & HR > Daily Wages (`active_menu = acc-daily-wages`).
- Navigates to: no sub-pages/popups; all actions (Calculate, To Pay, Download) are handled via AJAX/submit directly on this page.
