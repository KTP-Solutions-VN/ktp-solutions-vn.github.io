# VSV-004 — Departure Meter Reading

**Type:** Full page

**Route:** `VillaServicesController::checkOut()` — defaults to `/villa-services/check-out`

**Module:** In-Stay Services — Metering

## Overview
Lists the bookings checking out on the selected day, enabling staff to enter the end meter reading, calculate the electricity amount due, and record payment.

## Detailed Description

Filters: Business Unit (`business_unit`, select with "All"), Property/Villa (`villa`, select with "All"), Check-out Date (`check_out_date`, datepicker, defaults to today).

List of bookings checking out on the selected day:

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Property | `Villa.name` | |
| 2 | Guest | `Guest.first_name` | Excludes names listed in the `Exception` category |
| 3 | Check-in | `check_in_date` | |
| 4 | Check-out | `check_out_date` | +1 day relative to the stored value |
| 5 | Nights | `nights` | Calculated at runtime |
| 6 | Entered By (Check-in) | `check_in_by` | From `ElectricalBill.modified_by` |
| 7 | Last Updated By (Check-out) | `last_updated_by` | From `ElectricalBill.end_meter_modified_by` |
| 8 | Amount Received | `received` | `ElectricalBill.recieved` |
| 9 | Additional Fees | `additional_fees` | `ElectricalBill.additional_fees` |
| 10 | Note | `note` | `ElectricalBill.note` |
| 11 | Action | — | "Fill it now" → opens VSV-004-P1 (Record Departure Reading) |

If a specific villa is selected and that booking **has no start meter recorded** → a "No Start Meter" warning is displayed (blocking entry to the end meter step), and a noticeboard entry is logged to remind staff that the check-in step was missed.

## Functions / Actions
- **Filter by Business Unit / Property / Check-out Date** (POST submit).
- **Fill it now** (per row): opens VSV-004-P1 (`endMeter`) to enter the end meter reading, calculate the amount, and record payment.
- If the selected villa has exactly one matching booking with a start meter already recorded → automatically redirects directly to VSV-004-P1.

## Navigation
- Entered from: Main menu (Departure Meter Reading item) or after saving VSV-004-P1 (redirect back).
- Navigates to: VSV-004-P1 (Record Departure Reading).
