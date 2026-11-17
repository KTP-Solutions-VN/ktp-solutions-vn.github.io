# VSV-003 — Electricity Check-in (List)

**Type:** Full page

**Route:** `VillaServicesController::checkIn()` — defaults to `/villa-services/check-in`

**Module:** Villa Services — Electricity

## Overview
Lists the bookings checking in on the selected day (for villas with electricity management = yes), enabling staff to enter the start meter reading when guests check in.

## Detailed Description

Filters: Business Unit (`business_unit`, select with "All"), Property/Villa (`villa`, select with "All"), Check-in Date (`check_in_date`, datepicker, defaults to today).

List of bookings checking in on the selected day:

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Property | `Villa.name` | |
| 2 | Guest | `guest_name` (= `Guest.first_name` + `last_name`) | Excludes names listed in the `Exception` category (type=complete) |
| 3 | Check-in | `check_in_date` | |
| 4 | Check-out | `check_out_date` | +1 day relative to the stored value |
| 5 | Nights | `nights` | Calculated at runtime |
| 6 | Last Updated By | `last_updated_by` | From `ElectricalBill.modified_by` |
| 7 | Action | — | "Enter" button → opens VSV-003-P1 (Enter Start Meter Reading), opens a new tab |

Data retrieval conditions: `Booking.check_in_date = <filtered date>`, `status != Cancelled`, `Villa.status = Open`, villa must have `VillaService.service_settings.electricity_management = yes`.

## Functions / Actions
- **Filter by Business Unit / Property / Check-in Date** (POST submit, same action).
- **Enter** (per row): opens VSV-003-P1 (`startMeter`) to enter the start meter reading for that booking.
- If a specific villa is selected and there is no check-in booking that day → redirects directly to VSV-003-P1 (auto-redirect when exactly one booking matches the villa/date filter).

## Navigation
- Entered from: Main menu (Electricity/Check-in item) or after saving VSV-003-P1/VSV-004-P1 (redirect back).
- Navigates to: VSV-003-P1 (Enter Start Meter Reading).
