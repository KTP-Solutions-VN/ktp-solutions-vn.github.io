# VSV-007 — Utility Invoices

**Type:** Full page

**Route:** `VillaServicesController::monthlyBill()` — defaults to `/villa-services/monthly-bill` (POST to the same action for search/update)

**Module:** In-Stay Services — Metering

## Overview
A page for managing monthly electricity bills (for villas whose electricity is managed by paying the grid/provider directly — e.g., villas rented to long-term tenants). Allows viewing by villa (listing months since the electricity contract start date) or by month (listing all villas), and entering the end meter reading and bill amount for each period.

## Detailed Description

### Search Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Month | `month` | Select | No | Only applies when a villa is NOT selected; defaults to the current month |
| 2 | Business Unit | `business_unit` | Select | No | Filters villas by the user's authorized BU/zone |
| 3 | Villa | `villa` | Select (select2) | No | Selecting a villa switches to the by-month view (tab "month"), calculated from the villa's electricity contract start date |

### Data Table (2 display modes based on `tab`)
| # | Column | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property/Month | `villa_id[]` (hidden) | Text (read-only) | — | Villa name (villa tab) or month name (month tab) |
| 2 | End Date | `end_date[]` | Text (datepicker) | Yes (when entering) | Locked (disabled) if the period already has data (end_date/end_meter/bill not empty) |
| 3 | End Meter | `end_meter[]` | Text (number) | Yes (when entering) | End-of-period meter reading; locked under the same condition as End Date |
| 4 | Amount | `bill[]` | Text (number) | Yes (when entering) | Bill amount; locked under the same condition |
| 5 | Action | — | "Reset" button | — | Only enabled if the row already has data (unlocks the 3 fields for editing) |

- If the selected villa has not yet set up a start date/reading for electricity (`is_data = 0`) → a "Set up start meter" link is shown, leading to the villa's electricity service setup page (`Property::ServiceSetting`).

## Functions / Actions
- **Search**: submits a GET/POST search by Month/Business Unit/Villa.
- **Reset** (per row): unlocks the 3 fields (End Date/End Meter/Amount) to edit saved data.
- **Update**: submits the entire table (POST `action=update`) → saves each row into `ElectricalMonthlyBill` (creates new or updates based on villa_id + month/year derived from end_date), via the `addMonthlyBill` action (internal AJAX, no dedicated view).

## Navigation
- Entered from: Main menu (Utility Invoices item).
- Navigates to: the villa electricity service setup page (`Property::ServiceSetting`) when a villa has no start meter data.
