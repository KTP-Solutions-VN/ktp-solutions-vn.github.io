# ACC-053-P2 — Popup: Edit Public Holiday

**Type:** Popup (opened from ACC-053)

**Route:** `AccountController::editPublicHoliday($id)` — default `/account/edit-public-holiday/<id>` (`id` passed as base64 in the URL)

**Module:** Accounting & HR

## Overview
Form for editing an existing public holiday, pre-loaded from `PublicHoliday` by `id`; uses the same fields and validation rules as ACC-053-P1.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Country | `country_id` | Select2 (Thailand/France/Greece) | Yes (`required`) | Pre-loaded with the current value |
| — | (hidden id) | `id` | Hidden | — | `id` of the record being edited (used to exclude itself from the duplicate-date check) |
| 2 | Date | `date` | Text + datepicker (`dd MM, yyyy`), `startDate` = today | Yes (`required`) | Validated via remote AJAX `checkUniqueDate` (excludes the record being edited) |
| 3 | Description | `description` | Textarea | Yes (class `required`) | |
| 4 | Comment | `comment` | Textarea | Yes (class `required`) | |
| 5 | Holiday Type | `holiday_type` | Select2 (Official/Observed/Special/Company) | Yes (`required`) | "HR Rule" group |
| 6 | OT Multiplier | `ot_multiplier` | Select2 (3.0×/2.0×/1.5×/None) | Yes (`required`) | "HR Rule" group |
| 7 | Paid Public Holiday | `paid_public_holiday` | Toggle switch (hidden input `yes`/`no`) | No | "Included in salary and leave calculations" |
| 8 | Demand Impact | `demand_impact` | Select2 (Peak/High/Medium/Low) | Yes (`required`) | "Pricing Impact" group |
| 9 | Suggested Price Rule | `suggested_price_rule` | Select2 (+25%/+15%/Manual/No impact) | Yes (`required`) | "Pricing Impact" group |
| 10 | Internal Note | `internal_note` | Textarea | Yes (class `required`) | |

## Functions / Actions
- **Save:** jQuery Validate validation (Date required + remote duplicate-date check, excluding the record itself) → submits POST to the `editPublicHoliday` action itself; updates the `PublicHoliday` record (including `updated_at`), shows a success/error flash message, then redirects back to the previous page (`referer`, usually ACC-053).
- **Cancel:** returns to ACC-053.
- **checkUniqueDate (background AJAX):** POST `/account/checkUniqueDate` runs when Country or Date is changed, including `id` so it does not flag a duplicate against the record being edited itself.

## Navigation
- Entered from: ACC-053 (Public Holidays) — Edit icon on each row.
- Navigates to: returns to the previous page (usually ACC-053) after saving; Cancel returns to ACC-053.
