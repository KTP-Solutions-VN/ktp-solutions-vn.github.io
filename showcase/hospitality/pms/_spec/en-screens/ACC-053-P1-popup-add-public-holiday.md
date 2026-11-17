# ACC-053-P1 — Popup: Add Public Holiday

**Type:** Popup (opened from ACC-053)

**Route:** `AccountController::addPublicHoliday()` — default `/account/add-public-holiday`

**Module:** Accounting & HR

## Overview
Form for adding a new public holiday for a specific country: enter the description, set HR rules (holiday type, OT multiplier, whether it counts toward salary/leave), and its demand-based pricing impact.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Country | `country_id` | Select2 (Thailand/France/Greece) | Yes (`required`) | |
| 2 | Date | `date` | Text + datepicker (`dd MM, yyyy`), `startDate` = today | Yes (`required`) | Validated via remote AJAX `checkUniqueDate` — prevents duplicate dates for the same country |
| 3 | Description | `description` | Textarea | Yes (class `required`) | |
| 4 | Comment | `comment` | Textarea | Yes (class `required`) | |
| 5 | Holiday Type | `holiday_type` | Select2 (Official/Observed/Special/Company) | Yes (`required`) | "HR Rule" group |
| 6 | OT Multiplier | `ot_multiplier` | Select2 (3.0×/2.0×/1.5×/None) | Yes (`required`) | "HR Rule" group |
| 7 | Paid Public Holiday | `paid_public_holiday` | Toggle switch (hidden input `yes`/`no`) | No, defaults to "no" | "Included in salary and leave calculations" |
| 8 | Demand Impact | `demand_impact` | Select2 (Peak/High/Medium/Low) | Yes (`required`) | "Pricing Impact" group |
| 9 | Suggested Price Rule | `suggested_price_rule` | Select2 (+25%/+15%/Manual/No impact) | Yes (`required`) | "Pricing Impact" group |
| 10 | Internal Note | `internal_note` | Textarea | Yes (class `required`) | |

## Functions / Actions
- **Save:** jQuery Validate validation (Date required + remote duplicate-date check via `checkUniqueDate`) → submits POST to the `addPublicHoliday` action itself; saves a new record to the `PublicHoliday` table, shows a success/error flash message, and redirects back to ACC-053 (`publicHolidays`).
- **Cancel:** returns to ACC-053.
- **checkUniqueDate (background AJAX, not a button):** POST `/account/checkUniqueDate` runs when Country or Date is changed to check whether that date already exists for the selected country (action `checkUniqueDate`, no dedicated view, returns `true`/`false`).

## Navigation
- Entered from: ACC-053 (Public Holidays) — "Add new" button.
- Navigates to: returns to ACC-053 after saving or canceling.
