# PROP-055 — Reports Ready to Run

**Type:** Full page
**Route:** property/report-ready?business_unit=...
**Module:** PROP = Property Records

## Overview
Page for checking the conditions for generating a monthly Owner Revenue Report for each Property: based on the booking status for the month to determine "READY" (conditions met) or "READY AND SECURED" (conditions met and past the safe cancellation window) status, allowing the report to be generated directly on the page.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | Yes (class `required`) | Changing value → navigates to `report-ready?business_unit=...`, saved to cookie |

### Displayed Columns
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Property Name | `villa.name` | |
| 2 | Owner | `villa.owner.family_name` | |
| 3 | Status | `report_status` | Color icon: Green (READY AND SECURED, sent/ready), Orange (READY, safe window not yet reached), blank if conditions not met |
| 4 | Actions | — | "Generate Report" button (only shown if the report for that month has not yet been sent) |

## Functions / Actions
- Changing Business Unit → navigates to the page again with the new `business_unit` query.
- "Generate Report" button (file icon) — submits a form to `controller=Owner, action=generateReports` with `villa_id`, `business_unit`, `owner_id`, `date_range` (current month) to generate the revenue report for that Property (the action resides in OwnerController, outside the scope of PROP).

## Navigation
- Opened from: owner reports menu (outside the scope of the current code).
- Navigates to: `Owner/generateReports` (report generation action, outside the scope of PropertyController); related to PROP-054 (Report Dispatch Status), PROP-018 (Owner Bulletins), PROP-053 (Owner Reports by Unit) data.
- Child popup: None.
