# ACC-041 — Wage Periods

**Type:** Full page

**Route:** `AccountController::wagePeriods()` — default `/account/wage-periods`

**Module:** Accounting & HR

## Overview
Manages the list of wage periods (`WagePeriod`) for a Business Unit by pay frequency (Bi-Monthly/Monthly): auto-generates the first wage period if none exists, auto-generates future periods in advance, allows editing the end date of the currently open period, and validates each period. If the Business Unit belongs to a "zone" that shares a common pay calendar, changes are automatically synced to the other BUs in that zone.

## Detailed Description

Table (no pagination, `DataTable` with paging/ordering disabled), sorted by `start_date` descending:

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Start Date | `start_date` (displayed as `D, d M y`) | |
| 2 | End Date | `end_date` (displayed as `D, d M y`) | Switches to an input field + datepicker when Edit is clicked; shows a red "Inconsistencies" warning if `is_error = true` (date mismatch versus other BUs in the same zone) |
| 3 | Days | computed at runtime as `_getDateDiff(start_date, end_date) + 1` | |
| 4 | Actions | — | Edit (hidden if the period's wages have already been paid `is_period_salary_paid`, or the row is in the past/black), Cancel (shown only while editing), Validate (hidden if already validated or not the next period eligible for validation) |

Row color (`row_color`): orange = not yet validated, green = validated (`is_validated = yes`), black = a period that ended in the past (no longer editable).

Filter:
- **Business Unit** (`business_unit_id`): select list based on user permissions.
- **Wage Frequency** (`wage_frequency`): Bi-Monthly / Monthly, defaults to `bi_monthly`.

## Functions / Actions
- **Change Business Unit/Wage Frequency:** automatically reloads via GET `wage-periods?business_unit_id=<id>&wage_frequency=<freq>`.
- **Edit (pencil icon) on the End Date column:** opens a datepicker for that period's end date; when the date is changed, the `start_date` of the immediately preceding period is automatically shifted (`setDatesOnEdit`) and the `Days` value for both affected rows is recalculated; the row color changes to orange and the Validate/Cancel buttons appear.
- **Validate:** submits a POST form to the `wagePeriods` action itself; saves `is_validated = yes` plus the edited dates for the `WagePeriod`. If the BU belongs to a `BusinessUnitZone`, the `start_date`/`end_date`/`is_validated` values are also synced to the corresponding record (`zone_row_id`) of the other BUs in the zone.
- **Cancel:** reloads the page, discarding unsaved changes.
- **Auto-generate default wage period:** if the BU + `bi_monthly` frequency combination has no `WagePeriod` yet, the system automatically creates 2 sample periods (04/11/2025–04/29/2025 and 03/28/2025–04/10/2025, already validated) — runs silently in the background, with no dedicated button.
- **Auto-generate future wage periods (`generateFutureWagePeriods`):** on every page load, the system automatically creates the next wage period(s) until there are at most 2 unvalidated future periods relative to the current period (recursive); the end date follows the end-of-month/mid-month rules taken from `getLastDateMonthlyWages`/`getLastDateBiMonthlyWages` in `CommonController`. There is no UI action for this — it runs silently on page load.
- **Zone sync:** if the BU belongs to a `BusinessUnitZone`, the system automatically creates/removes the corresponding `WagePeriod` records for each member BU (linked via `zone_row_id`) to keep the pay calendar consistent across the zone.

## Navigation
- Entered from: Sidebar > Account & HR > Wage Periods (`active_menu = acc-wagePeriods`).
- Navigates to: no sub-pages/popups; all actions are performed directly on the table.
